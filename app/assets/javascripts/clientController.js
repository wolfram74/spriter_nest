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

  API.createUser = function(){
    console.log("checking with server on user status")
    var home = window.location.origin
    var request = $.ajax({
      type: "POST",
      url: home+"/users",
      data: clientController.authState
    })
    return new Promise(function (resolve, reject){
      request.done(function(response){resolve(response)})
      request.fail(function(response){console.log("fffff");reject(response)})
    })
  }

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
    return imgurAPI.getAlbums({
      "username": API.authState.account_username, 
      "token": API.authState.access_token
    }).then(function(response){
      console.log("setter promise");
      var data = response.data;
      console.log(data)
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
    return imgurAPI.postAlbum({
          "title": env.albumTitle, 
          "token": API.authState.access_token
        }).then(function(response){
      API.authState.albumID = response.data.id
      return API.authState.albumID
    })
  }

  API.uploadImage = function(img){
    // console.log(img)
    var data = {
      image: img, 
      album: API.authState.albumID,
      name: "yatta",
      token: API.authState.access_token,
      type: "binary file"

    }
    return imgurAPI.postImageToAlbum(data)
  };

  return API
})()

function testPost(){
  clientController.setProjectsAlbumID().then(function(response){
    clientController.grabYatta()
    var data = clientController.projectState.projectCanvas.toDataURL("image/png")
    return data.split(",")[1]
  }).then(function(response){
    clientController.uploadImage(response).then(function(response){
      console.log(response)
    })
  })
};

function testGet(){
 clientController.setProjectsAlbumID().then(function(response){
  return imgurAPI.getAlbumContent({
      "albumID": clientController.authState.albumID,
      "token": clientController.authState.access_token
    })
 }).then(function(response){
  var images = response.data;
  for(index in images){
    var $img = $("<img/>")
    $img.attr("src", images[index].link.replace("p", "ps"))
    $img.data("imgur_id", images[index].id)
    $img.data("deletehash", images[index].deletehash)
    $("body").append($img)
  };
  function deleteParse(event){
    var $img = $(event.target);
    var data = {
      id: $img.data("imgur_id"), 
      token:clientController.authState.access_token
    };
    imgurAPI.deleteImage(data).then(function(response){console.log(response)})
  }
  $("body").on("click", "img", deleteParse)

 })
}
/*

var img = new Image();
img.crossOrigin = "Anonymous";
img.src = $("img")[1].src;
var canvas = $('<canvas/>')[0];
canvas.width = img.width;
canvas.height = img.height;
canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
canvas.getContext('2d').getImageData(50,100,1,1);

*/