function Pad(args){
  var defaults = {"slides": [new Slide()] };
  args = utilities.extend({}, defaults, args);
  this.params = {scales:[2,3,5,8,13,21], rgba: [["R",0],["G",0],["B",0],["A",255]]};
  this.slides = args.slides
  this.zoom = 8
  this.color = [0,0,0,255]
  this.currentSlide = args.slides[0]
  this.paint = false
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
};

Pad.prototype.redraw = function(){
  this.scaleCanvas();
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
  }
}

Pad.prototype.slideCopy = function(){
  console.log("I'm making a copy")  
  Slide.copy(clientController.projectState.pad.currentSlide)
};
Pad.prototype.slideCreate = function(){
  console.log("I'm make a new slide from project defaults")
  Slide.blank(clientController.projectState.currentProject)
};
// Pad.prototype. = function(){};


