$(document).ready(function(){
  if(window.location.hash){
    console.log("hash present")
    clientController.hashParser(window.location.hash)
    .then(function(){
      return clientController.createUser()
    })
    .then( function(user){
      console.log(user)
      clientController.authState["userID"] = user.id
      return clientController.getProjects(user)
    })
    .then(function(projects){
      view.indexProjects(projects)
      $("#stage").on("click", "img", clientController.showProjects)
      console.log(["these are results", projects])
      return projects
    })
  }else{ console.log("no hash present")}
});

var clientController = (function(){
  var API = {}
  API.authState = {}
  API.projectState = {}
  var env = {albumTitle: "Spriter Nest Projects"}

  API.hashParser = function(string){
    string = string.slice(1)
    var terms = string.split("&")
    for(var index in terms){
      var pair = terms[index].split("=")
      API.authState[pair[0]] = pair[1]
    };
    console.log(API.authState)
    window.history.pushState("authed", "authed", "/")
    return new Promise(function(resolve, reject){
      resolve(API.authState);
      reject({"error":"unauthed"})
    })
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
  };

  API.getProjects = function(args){
    var home = window.location.origin
    var url = home+"/users/"+API.authState.userID + "/projects"
    var request = $.ajax({
      type: "GET",
      url: url
    });
    return new Promise(function (resolve, reject){
      request.done(function(response){resolve(response)})
      request.fail(function(response){console.log("project load failure");reject(response)})
    })  
  };

  API.showProjects = function(event){
    var id = $(event.target).attr("db_id")
    Project.find(id)
    .then(function(project){
      API.projectState.currentProject = new Project(Project.cleanAROutput(project))
      // var project = API.projectState.currentProject
      // var test = new Pad({slides: project.slides})
      // view.showProject(test)

      return API.projectState.currentProject
    }).then(function(project){
      // project.loadSlides()
      return project.loadSlides()
    }).then(function(project){
      return API.projectState.pad = new Pad({slides: project.slides})  
    }).then(function(pad){
      view.showProject(pad)
    });
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
