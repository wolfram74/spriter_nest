var view = (function(){
  var API = {}

  API.indexProjects = function(data){
    return new Promise(function(resolve, reject){
      console.log(data);
      console.log("rendering projects index");
      resolve(data);
      reject(data);
    })
  }

  return API
})()