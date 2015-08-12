function Pad(args){
  var defaults = {}
  args = utilities.extend({}, defaults, args)
  this.params = {scales:[2,3,5,8,13], rgba: ["R","G","B","A"]}
  this.$dom = $(HandlebarsTemplates['pads/show'](this))
  // this.prepDom()
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
  $preview = $("<div id = 'jsCurrentColor'></div>")
  $color.append($preview)
  this.$dom.append($color)
}

Pad.prototype.prepSlideSelect = function(){
  var $gallery = $("<div></div>")
  $gallery.attr("id","jsSlideSelect")
  $form = $("<form action=''></form>")
  $gallery.append($form)
  this.$dom.append($gallery)

}

Pad.prototype.prepSlideView = function(){
  var $stage = $("<div></div>")
  $stage.attr("id","jsSlideView")
  $stage.append($("<canvas>"))
  this.$dom.append($stage)
};

Pad.prototype.prepAnimation = function(){
  var $animation = $("<div></div>")
  $animation.attr("id","jsAnimation")
  $animation.append($("<canvas>"))
  var $queue = $("<div></div>")
  $queue.attr("id","jsAnimationQueue")
  $animation.append($queue)
  this.$dom.append($animation)

}

// Pad.prototype. = function(){}

