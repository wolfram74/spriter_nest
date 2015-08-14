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
  this.readImage(imageSrc, function(canvas){
    for(var name in atlas){
      var args = atlas[name]
      args.ID = name
      args.projectID = project.ID
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