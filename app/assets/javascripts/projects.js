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
  if(!!args.spriteAtlas){
    this.makeSlides(args.spriteAtlas)
  };
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

Project.prototype.makeSlides = function(){}


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