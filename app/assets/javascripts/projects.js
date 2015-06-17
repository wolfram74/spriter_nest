function Project (args){
  var defaults = {
    defaultWidth:16 ,defaultHeight:26, 
    colorDepth:256, userID:null, penColor:[0,0,0,0]
  };
  args = utilities.merge(defaults, args)
  this.defaultWidth = args["defaultWidth"] 
  this.defaultHeight = args["defaultHeight"]
  this.colorDepth = args["colorDepth"]
  this.userID = args["userID"]
  this.penColor = args["penColor"]
  this.slides = []
  this.animationQueue = []
  this.workingSlide = null
};

Project.prototype.newSlide = function(args){
  var defaults = {width: this.defaultWidth, height: this.defaultHeight, project: this}
  args = utilities.merge(defaults, args)
  this.slides.push(new Slide(args))
  if (this.slides.length === 1){
    this.workingSlide = this.slides[0]
  };
};