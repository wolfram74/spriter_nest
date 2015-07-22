utilities = (function(){
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

imgurAPI = (function(){
  var API = {};
  var urlPrefix = "https://api.imgur.com/3";
  API.getAlbums = function(username, token){
    return new Promise(function(resolve, reject){
      console.log("fetching albums.");
      var url = urlPrefix + "/account/" + username + "/albums";
      var request = $.ajax({
        type:"GET",
        url: url,
        headers:{
          Authorization: "Bearer "+token
        }
      })
      request.done(function(response){
        resolve(response)
      })
      request.fail(function(response){
        console.log("fuck, it's borked")
        reject(response)
      })
    })
  };

  API.postAlbum = function(title, token){
    console.log("Creating album.");
    var url = urlPrefix + "/album";
    var call = $.ajax({
      type:"POST",
      url: url,
      headers:{
        Authorization: "Bearer "+token
      },
      data:{
        title: title,
        layout: "vertical"
      }
    })
    call.done(function(response){
      console.log("Imgur has gone ok");
    })
    call.fail(function(response){
      console.log("Imgur has gone pear shaped");
    })
    call.always(function(response){
      console.log(response);
    })
    return call
  };

  API.getAlbumContent = function(albumID, token){
    console.log("fetching images.");
    var url = urlPrefix + "/album/" + albumID + "/images";
    var call = $.ajax({
      type:"GET",
      url: url,
      headers:{
        Authorization: "Bearer "+token
      }
    })
    call.done(function(response){
      console.log("Imgur has gone ok");
    })
    call.fail(function(response){
      console.log("Imgur has gone pear shaped");
    })
    call.always(function(response){
      console.log(response);
    })
    return call
  };
  
  API.postImageToAlbum = function(args){
    // args requires imageURL, albumID, name, token
    console.log("posting images.");
    var url = urlPrefix + "/image";

    var call = $.ajax({
      type:"GET",
      url: url,
      data: args,
      headers:{
        Authorization: "Bearer "+token
      }
    })
    call.done(function(response){
      console.log("Imgur has gone ok");
    })
    call.fail(function(response){
      console.log("Imgur has gone pear shaped");
    })
    call.always(function(response){
      console.log(response);
    })
    return call
  };

  return API
})()
