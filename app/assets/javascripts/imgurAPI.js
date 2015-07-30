var imgurAPI = (function(){
  var API = {};
  var urlPrefix = "https://api.imgur.com/3";
  API.getAlbums = function(args){
    // expects a username and token in args
    console.log(args)
    console.log("fetching albums.");
    var url = urlPrefix + "/account/" + args.username + "/albums";
    var request = $.ajax({
      type:"GET",
      url: url,
      headers:{
        Authorization: "Bearer "+args.token
      }
    })
    return new Promise(function(resolve, reject){
      request.done(function(response){
        resolve(response)
      })
      request.fail(function(response){
        console.log("fuck, it's borked")
        reject(response)
      })
    })
  };

  API.postAlbum = function(args){
    // expects a title and token in args
    console.log("Creating album.");
    var url = urlPrefix + "/album";
    var request = $.ajax({
      type:"POST",
      url: url,
      headers:{
        Authorization: "Bearer "+args.token
      },
      data:{
        title: args.title,
        layout: "vertical"
      }
    })
    return new Promise(function(resolve, reject){
      request.done(function(response){
        resolve(response);
      })
      request.fail(function(response){
        console.log("Imgur has gone pear shaped");
        reject(response);
      })      
    })
  };

  API.getAlbumContent = function(args){
    // expects albumID and token in args
    console.log("fetching images.");
    var url = urlPrefix + "/album/" + args.albumID + "/images";
    var request = $.ajax({
      type:"GET",
      url: url,
      headers:{
        Authorization: "Bearer "+args.token
      }
    })
    return new Promise(function(resolve, reject){
      request.done(function(response){
        resolve(response);
      })
      request.fail(function(response){
        console.log("Imgur has gone pear shaped");
        reject(response);
      })      
    })
  };
  
  API.postImageToAlbum = function(args){
    // args requires imageURL, albumID, name, token
    console.log("posting images.");
    var url = urlPrefix + "/image";
    // console.log(args.image)
    console.log(args.name)
    var data = {
      image: args.image,
      album: args.album,
      name: args.name,
      type: args.type
    }
    var request = $.ajax({
      type:"POST",
      url: url,
      data: data,
      headers:{
        Authorization: "Bearer "+args.token
      }
    })
    return new Promise(function(resolve, reject){
      request.done(function(response){
        resolve(response);
      })
      request.fail(function(response){
        console.log("Imgur has gone pear shaped");
        reject(response);
      })      
    })
  };

  API.deleteImage = function(args){
    // expects an image ID and token
    console.log(args)
    console.log("To space with you, devil-image!")
    var url = urlPrefix + "/image/" + args.id
    var request = $.ajax({
      type:"DELETE",
      url: url,
      headers:{
        Authorization: "Bearer "+args.token
      }
    })
    return new Promise(function(resolve, reject){
      request.done(function(response){
        resolve(response);
      })
      request.fail(function(response){
        console.log("Imgur has gone pear shaped");
        reject(response);
      })      
    })
  };

  return API
})()