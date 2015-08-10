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
