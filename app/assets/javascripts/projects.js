function Project (args){
  var defaults = {
    defaultWidth:16 ,defaultHeight:26, 
    colorDepth:256, userID:null, penColor:[0,0,0,0],
    ID: null, imgurID: null, spriteAtlas: null
  };
  args = utilities.merge(defaults, args)
  this.defaultWidth = args["defaultWidth"] 
  this.defaultHeight = args["defaultHeight"]
  this.colorDepth = args["colorDepth"]
  this.ID = args["ID"]
  this.imgurID = args["imgurID"]
  this.userID = args["userID"]
  this.penColor = args["penColor"]
  this.spriteAtlas = args["spriteAtlas"]
  this.slides = []
  this.animationQueue = []
  this.workingSlide = null
  this.sourceCanvas;
};

Project.prototype.newSlide = function(args){
  var defaults = {width: this.defaultWidth, 
    height: this.defaultHeight, project: this}
  args = utilities.extend({}, defaults, args)
  this.slides.push(new Slide(args))
  if (this.slides.length === 1){
    this.workingSlide = this.slides[0]
  };
};

Project.prototype.loadSlides = function(){
  var project = this;
  if (project.imageSrc() === null){
    return Promise.reject('no image found');
  };
  return new Promise(function(resolve, reject){
    project.makeSlides(function(){
      resolve(project);
    })
  });
};


Project.prototype.imageSrc = function(atlas){
  var images = $("*[db_id=" + this.ID + "]");
  return images.length ? images.attr('src') : null;
};

Project.prototype.makeSlides = function(callback){
  if (!this.spriteAtlas) return false;
  var atlas = this.spriteAtlas;
  var imageSrc = this.imageSrc();
  var project = this;
  // debugger
  this.readImage(imageSrc, function(canvas){
    for(var name in atlas){
      var args = atlas[name]
      args.ID = name
      args.projectID = project.ID
      args.project = project
      var pixels = canvas
        .getContext("2d").getImageData(
        args.left, args.top,
        args.width, args.height);
      var cells = []
      var row = -1
      var total = args.width*args.height
      for(var i =0; i < total ;i++ ){
        if(i%args.width === 0){
          row+=1
          cells.push([])
        }
        var pixel = pixels.data.subarray(i*4, (i+1)*4)
        cells[row].push(pixel)
      };
      args.pixels = cells
      project.slides.push(new Slide(args))
    };
    callback()
  })

  // var found = false
  // if(.length){
  //   console.log("found image!");
  //   found = true;
  //   this.readImage(function(){

  //   });
  // };
  // for(name in atlas){
  //   var args = atlas[name]
  //   args.ID = name
  //   args.projectID = this.ID
  //   if(found){
  //     var pixels = this.sourceCanvas
  //       .getContext("2d").getImageData(
  //       args.left, args.top,
  //       args.width, args.height)
  //     console.log(pixels)
  //   };
  //   this.slides.push(new Slide(args))
  // };
}

Project.prototype.readImage = function(imageSrc, callback){
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function(){
    var canvas = $('<canvas/>')[0];
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    callback(canvas);
  }.bind(this);
  img.src = imageSrc;
};

Project.prototype.setPenColor = function(rgbaArray){
  for(var i in this.penColor){
    this.penColor[i] = rgbaArray[i];
  };
};

Project.prototype.setWorkingSlide = function(index){
  this.workingSlide = this.slides[index]
};

Project.prototype.copySlide = function(index){
  var tempSlide = this.slides[index]
  this.newSlide({pixels: tempSlide.pixels})
};

Project.prototype.addAnimationQueue = function(index){
  this.animationQueue.push(this.slides[index])
}

Project.prototype.queueSlideMove = function(args){
  var subject = args["index"]
  var target = args["index"] + args["shift"]
  var temp = this.animationQueue[subject]
  this.animationQueue[subject] = this.animationQueue[target]
  this.animationQueue[target] = temp
};

Project.prototype.renderCanvas = function(){
  var $canvas = $("<canvas>")
  $canvas.attr({"width":630,"height":630})
  var context = $canvas[0].getContext("2d")
  var image = context.createImageData($canvas[0].width, $canvas[0].height)
  for(var slideInd = 0; slideInd < this.slides.length; slideInd++){
    var slide = this.slides[slideInd]
    var top = slide.top
    var left = slide.left
    for(var x = 0; x < slide.width; x++){
      for(var y = 0; y < slide.height; y++){
        var color = slide.pixels[y][x]
        var i = (left+x)+(top+y)*$canvas[0].width
        image.data[4*i+0]=color[0];
        image.data[4*i+1]=color[1];
        image.data[4*i+2]=color[2];
        image.data[4*i+3]=color[3];
      };
    };
  };
  context.putImageData(image, 0,0)
  clientController.projectState.canvas = $canvas[0]
  return new Promise(function(resolve, reject){
    resolve(clientController.projectState.canvas)
    reject("fuck, it's broked.")
  })
};

Project.find = function(id){
  var url = "/users/"+clientController.authState.userID + "/projects/"+id
  console.log(url)
  var request = $.ajax({
    type: "GET",
    url:url
  });
  return new Promise(function (resolve, reject){
    request.done(function(response){console.log(response);resolve(response)})
    request.fail(function(response){console.log("project load failure");reject(response)})
  })  
};

Project.cleanAROutput = function(projectData){
  var json = {
    defaultWidth: projectData.default_width
    , defaultHeight: projectData.default_height
    , colorDepth: projectData.color_depth
    , userID: projectData.user_id
    , penColor:[0,0,0,0]
    , ID: projectData.id
    , imgurID: projectData.imgur_id
    , spriteAtlas: projectData.sprite_atlas
  };
  return json
};