$(document).ready(function(){
  if(window.location.hash){
    console.log("hash present")
    clientController.hashParser(window.location.hash)
  }else{ console.log("no hash present")}
  testCanvas = clientController.grabYatta()
});

clientController = (function(){
  var API = {}
  API.authState = {}
  var env = {albumTitle: "Spriter Nest Projects"}
  API.hashParser = function(string){
    string = string.slice(1)
    var terms = string.split("&")
    for(var index in terms){
      console.log(terms[index])
      var pair = terms[index].split("=")
      API.authState[pair[0]] = pair[1]
    };
    console.log(API.authState)
    window.history.pushState("authed", "authed", "/")
  };

  API.grabYatta = function(){
    console.log("grabbing")
    var img = $("img")[0]
    var canvas = $("<canvas/>")[0]
    canvas.width = img.width
    canvas.height = img.height  
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height)
    return canvas
  };

  API.setProjectsAlbumID = function(){
    if (API.authState.albumID){
      console.log("shit was so cache");
      return Promise.resolve(API.authState.albumID)
    }
    return imgurAPI.getAlbums(
      API.authState.account_username, 
      API.authState.access_token
    ).then(function(response){
      console.log("setter promise");
      var data = response.data;
      for(var index in data){
        if (data[index].title === env.albumTitle){
          API.authState.albumID = data[index].id;
        };
      };
      return API.authState.albumID
    })
  };

  API.makeProjectsAlbum = function(){
    if (!!API.authState.albumID){
      console.log("shit was so cache")
      return Promise.resolve(API.authState.albumID);
    };
    return imgurAPI.postAlbum(
      env.albumTitle, 
      API.authState.access_token
    ).then(function(response){
      API.authState.albumID = response.data.id
      return API.authState.albumID
    })
  }

  API.uploadCanvas = function(canvas){
    var img = canvas.toDataURL("image/png")
    // imgurAPI.postImageToAlbum
  };

  return API
})()