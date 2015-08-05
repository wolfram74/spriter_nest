var view = (function(){
  var API = {}

  API.indexProjects = function(data){
    return new Promise(function(resolve, reject){
      console.log(data);
      console.log("rendering projects index");
      $("#introHeader").hide();
      console.log(data[0].title);
      var $index = $(HandlebarsTemplates['projects/index'](data));
      $("#stage").append($index);
      resolve(data);
      reject(data);
    })
  };

  API.showProject = function(data){

  };

  return API
})()