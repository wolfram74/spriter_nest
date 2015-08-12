function Pad(args){
  var defaults = {}
  args = utilities.extend({}, defaults, args)
  this.params = {scales:[2,3,5,8,13], rgba: ["R","G","B","A"]}
  this.$dom = $(HandlebarsTemplates['pads/show'](this))
};

// Pad.prototype. = function(){}

