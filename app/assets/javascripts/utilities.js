var utilities = (function(){
  var API = {};
  API.merge = function merge(baseObject, injectedObject){
    newObject = API.clone(baseObject);
    for(var key in injectedObject){
      newObject[key] = injectedObject[key];
    };
    return newObject;
  };

  API.replaceAt = function(string, index, newvalue){
    return string.substring(0,index) + newvalue + string.substring(index+newvalue.length);
  };

  API.clone = function(obj) {
    var copy; // can handle plain Objects, Arrays, Dates, Strings, Numbers, or Booleans comprised of the previous 6 types.
    // copied from top answer to http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  };
  
  API.extend = function(){
    var args = [].slice.call(arguments, 0);
    var left = args.shift();
    args.forEach(function(right){
      for (var i in right){
        left[i] = right[i];
      }
    });
    return left;
  };
  return API
})()

