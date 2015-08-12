function Pad(args){
  var defaults = {"slides": [new Slide()] };
  args = utilities.extend({}, defaults, args);
  this.params = {scales:[2,3,5,8,13,21], rgba: ["R","G","B","A"]};
  this.slides = args.slides
  this.zoom = 8
  this.color = [0,0,0,0]
  this.currentSlide = this.slides[0]
  this.$dom = $(HandlebarsTemplates['pads/show'](this));
  // this.setListeners();
};

Pad.prototype.setListeners = function(){
  $('#jsSlideShow').mousedown(this.startDraw.bind(this));
  $('#jsSlideShow').mousemove(this.dragPen.bind(this));
  $('#jsSlideShow').mouseup(this.stopDraw.bind(this));
  $('#jsSlideShow').mouseleave(this.stopDraw.bind(this));
  $("#jsZoomSelect").change(this.updateSize.bind(this));
  $("#jsColorSelect").change(this.updateColor.bind(this));
};

// Pad.prototype. = function(){};

