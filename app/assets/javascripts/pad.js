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
  this.redraw()
};

Pad.prototype.setListeners = function(){
  $('#jsSlideShow').mousedown(this.startDraw.bind(this));
  $('#jsSlideShow').mousemove(this.dragPen.bind(this));
  $('#jsSlideShow').mouseup(this.stopDraw.bind(this));
  $('#jsSlideShow').mouseleave(this.stopDraw.bind(this));
  $("#jsZoomSelect").change(this.updateSize.bind(this));
  $("#jsColorSelect").change(this.updateColor.bind(this));
};

Pad.prototype.redraw = function(){};
Pad.prototype.scaleCanvas = function(){
  var $canvas = this.$dom.find("#jsSlideShow").find("canvas")
  var slide = this.currentSlide
  var newH = this.zoom * (slide.height +1 )
  var newW = this.zoom * (slide.width +1 )
  console.log([newH, newW])
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
// Pad.prototype.colorString = function(colorVec){};
// Pad.prototype. = function(){};



