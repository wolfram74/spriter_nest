$(document).ready(function(){
  if(window.location.hash){
    console.log("hash present")
    clientController.hashParser(window.location.hash)
  }else{ console.log("no hash present")}
});

clientController = (function(){
  var API = {}
  API.authState = {}
  API.projectState = {}
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
    clientController.projectState.projectCanvas = canvas
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

  API.uploadImage = function(img){
    console.log(img)
    var data = {
      image: img, 
      album: API.authState.albumID,
      name: "yatta",
      token: API.authState.access_token,
      type: "base64"

    }
    imgurAPI.postImageToAlbum(data)
  };

  return API
})()

function testPrep(){
  clientController.setProjectsAlbumID().then(function(response){
    clientController.grabYatta()
    var data = clientController.projectState.projectCanvas.toDataURL("image/png")
    data = data.replace(/\+/g,"%2B")
    data = data.replace(/\//g,"%2F")
    data = data.replace(/=/g,"%3D")
    return data
  }).then(function(response){
    console.log(response)
    clientController.uploadImage(response)
  })
};