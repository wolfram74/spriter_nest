function Pad(args){
  var defaults = {"slides": [new Slide()] };
  args = utilities.extend({}, defaults, args);
  this.params = {scales:[2,3,5,8,13,21], rgba: [["R",0],["G",0],["B",0],["A",255]]};
  this.slides = args.slides
  this.zoom = 8
  this.color = [0,0,0,255]
  this.currentSlide = args.slides[0]
  this.paint = false
  this.animationQueue = []
  this.frame = 0
  this.$dom = $(HandlebarsTemplates['pads/show'](this));
  // this.setListeners();
  // this.redraw()
};

Pad.prototype.setListeners = function(){
  $('#jsSlideShow').on("mousedown","canvas", this.startDraw.bind(this));
  $('#jsSlideShow').mousemove("canvas", this.dragPen.bind(this));
  $('#jsSlideShow').mouseup("canvas", this.stopDraw.bind(this));
  $('#jsSlideShow').on("mouseleave", "canvas", this.stopDraw.bind(this));
  $("#jsSlideCreate").on("click", this.slideCreate.bind(this))
  $("#jsSlideCopy").on("click", this.slideCopy.bind(this))
  $("#jsZoomSelect").change(this.updateZoom.bind(this));
  $("#jsColorSelect").change(this.updateColor.bind(this));
  $("#jsSlideIndex").change(this.slideShow.bind(this));
  $("#jsProjectSave").on("click", this.projectSave.bind(this))
};

Pad.prototype.redraw = function(){
  this.scaleCanvas();
  if(!this.currentSlide){return "no slide"}
  var context = this.$dom.find("#jsSlideShow").find("canvas")[0].getContext("2d");
  for(var i=0; i < this.currentSlide.height; i++ ){
    for(var j=0; j < this.currentSlide.width; j++){
      context.fillStyle = utilities.colorString(this.currentSlide.pixels[i][j])
      context.fillRect(
        j*this.zoom, i*this.zoom, 
        this.zoom, this.zoom)
    };
  };
};

Pad.prototype.scaleCanvas = function(){
  if(!this.currentSlide){return "no slide"}
  var $canvas = this.$dom.find("#jsSlideShow").find("canvas")
  var slide = this.currentSlide
  var newH = this.zoom * (slide.height +1 )
  var newW = this.zoom * (slide.width +1 )
  $canvas.attr({height: newH, width: newW})
  var borders = [utilities.colorString([0,0,0,250]),utilities.colorString([0,0,0,50])]
  var ctx = $canvas[0].getContext("2d")
  for(var i=0; i< slide.height; i++ ){
    ctx.fillStyle = borders[i%2]
    ctx.fillRect(slide.width*this.zoom, i*this.zoom, this.zoom, this.zoom)
  };
  for(var j=0; j< slide.width; j++){
    ctx.fillStyle = borders[j%2]
    ctx.fillRect(j*this.zoom, slide.height*this.zoom, this.zoom, this.zoom)
  };
  return $canvas
};

Pad.prototype.setCell = function(x, y){
  this.currentSlide.setColorAt({
    "x":x, "y":y, 
    "penColor":this.color})
};
Pad.prototype.stopDraw = function(){
  this.paint = false
};

Pad.prototype.startDraw = function(e){
  var cellVec = this.cellLocation(e);
  this.paint = true;
  this.setCell(cellVec[0], cellVec[1]);
  this.redraw();
};

Pad.prototype.dragPen = function(e){
  if(this.paint){
    var cellVec = this.cellLocation(e);
    this.setCell(cellVec[0], cellVec[1]);
    this.redraw();
  }
};

Pad.prototype.cellLocation = function(event){
  var mouseX = event.pageX - event.target.offsetLeft;
  var mouseY = event.pageY - event.target.offsetTop; 
  var x = parseInt(mouseX / this.zoom);
  var y = parseInt(mouseY / this.zoom);
  return [x, y]
};

Pad.prototype.updateZoom = function(e){
  var change = $(e.target).serialize().split("=")
  this.zoom = parseInt(change[1])
  this.redraw()
};
Pad.prototype.updateColor = function(e){
  var change = $(e.target).serialize().split("=")
  var index = parseInt(change[0])
  var value = parseInt(change[1])
  this.color[index] = value
  $("#jsCurrentColor").css(
    {"background-color": utilities.colorString(this.color)})
};
Pad.prototype.slideShow = function(e){
  // debugger
  // triggers on type = radio and type = checkbox
  //  checkbox adds to animation queue, 
  var change =$(e.target).serialize().split("=") 
  var index = parseInt(change[1])
  if(e.target.type === "radio") {
    this.currentSlide = this.slides[index];
    this.redraw();
  }else if(e.target.type === "checkbox"){
    this.queueUpdate();
  }
}

Pad.prototype.queueUpdate = function(){
  console.log("firing up queue")
  this.animationQueue = []
  var slides = $("#jsSlideIndex").find("li")
  for(var index = 0; index < slides.length; index++){
    if(slides.eq(index).find("input").is(":checked")){
      this.animationQueue.push(index);
    };
  };
  console.log(this.animationQueue)
  // TFW your recursive set timeout works http://i.imgur.com/L3rMW6o.gifv
}

Pad.prototype.animationCycle = function(){
  var frames = this.animationQueue.length
  if(frames){
    this.frame+=1
    this.animateSlide(this.slides[this.animationQueue[this.frame%frames]])
  }
  setTimeout(function(){this.animationCycle()}.bind(this), 165)
};

Pad.prototype.animateSlide = function(slide){
  var $canvas = this.$dom.find("#jsAnimation").find("canvas")
  var pixelSize = 2
  $canvas.attr({height:slide.height*pixelSize,width:slide.width*pixelSize})
  var context = $canvas[0].getContext("2d");
  for(var i=0; i < slide.height; i++ ){
    for(var j=0; j < slide.width; j++){
      context.fillStyle = utilities.colorString(slide.pixels[i][j])
      context.fillRect(
        j*pixelSize, i*pixelSize, 
        1*pixelSize, 1*pixelSize)
    };
  };

};

Pad.prototype.slideCopy = function(){
  console.log("I'm making a copy")  
  Slide.copy(clientController.projectState.pad.currentSlide)
};
Pad.prototype.slideCreate = function(){
  console.log("I'm make a new slide from project defaults")
  Slide.blank(clientController.projectState.currentProject)
};

Pad.prototype.projectSave = function(e){
  console.log("Ok, let's get this going.")
  this.currentSlide.project.renderCanvas().then(function(canvas){
    console.log("canvas made");
    return clientController.setProjectsAlbumID()
  }).then(function(response){
    var data = clientController.projectState.canvas.toDataURL("image/png")
    return data.split(",")[1]
  }).then(function(urlHex){
    var args = {}
    args.img = urlHex
    args.name = clientController.projectState.currentProject.title || "default title"
    clientController.uploadImage(args).then(function(response){
      console.log(response)
      var args = {}
      args.userID = clientController.authState.userID
      args.activeRecordID = clientController.projectState.currentProject.ID
      args.imgurID = response.data.id
      return Project.updateImgurID(args)
    }).then(function(response){
      console.log("deleting now")
      var args = {}
      args.token = clientController.authState.access_token
      args.id = response.oldImgurID
      return imgurAPI.deleteImage(args)
    }).then(function(response){
      console.log(response);
      console.log("Fuck yeah, saved.")
    })
  })
};

// Pad.prototype. = function(){};
/*

*/

