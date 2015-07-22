$(document).ready(function(){
  if(window.location.hash){
    console.log("hash present")
    clientController.hashParser(window.location.hash)
  }else{ console.log("no hash present")}
});

clientController = (function(){
  var API = {}
  API.authState = {}
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

  
  return API
})()