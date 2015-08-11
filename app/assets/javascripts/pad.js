function Pad(args){
  var defaults = {}
  args = utilities.extend({}, defaults, args)
  this.$dom = $("<div></div>")
  this.prepDom()
};

Pad.prototype.prepDom = function(){
  this.prepZoom()
  this.prepColorSelect()
  this.prepSlideSelect()
  this.prepSlideView()
  this.prepAnimation()
}
Pad.prototype.prepZoom = function(){
  var scales = [2,3,5,8,13]
  var $zoom = $("<div></div>")
  $zoom.attr("id", "jsZoomSelect")
  var $form = $("<form action=''></form>")
  var $ul = $("<ul></ul>")
  function liMake(size){ 
    var $li = $("<li></li>");
    var $input = $("<input>")
    $input.attr({"type":"radio", "name": size, "value": size})
    $li.append( $input );
    $li.append($("<span></span>"))
    $li.find("span").text(size)
    return $li
  }
  for(var index in scales){ $ul.append( liMake(scales[index]) )}
  $form.append($ul)
  $zoom.append($form)
  this.$dom.append($zoom)

}
Pad.prototype.prepColorSelect = function(){
  var $color = $("<div></div>");
  $color.attr("id", "jsColorSelect");
  var $form = $("<form action=''></form>");
  var $ul = $("<ul></ul>");
  var rgba = ["R","G","B","A"];
  for(col in rgba){
    var $li = $("<li></li>");
    var $input = $("<input>");
    $input.attr({"type":"text", "name": col, "value":0});
    var $span = $("<span>"+rgba[col]+"</span>");
    $li.append($span);
    $li.append($input);
    $ul.append($li);
  }
  $form.append($ul)
  $color.append($form)
  this.$dom.append($color)
}

Pad.prototype.prepSlideView = function(){

};

Pad.prototype.prepAnimation = function(){}

Pad.prototype.prepSlideSelect = function(){}

// Pad.prototype. = function(){}

