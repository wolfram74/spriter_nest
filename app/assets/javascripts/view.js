var view = (function(){
  var API = {}

  API.indexProjects = function(data){
    return new Promise(function(resolve, reject){
      console.log(data);
      console.log("rendering projects index");
      $("#introHeader").hide();
      var $index = $(HandlebarsTemplates['projects/index'](data));
      $("#stage").append($index);
      resolve(data);
      reject(data);
    })
  };

  API.showProject = function(pad){
    $("#stage").children().hide()
    $("#stage").append(pad.$dom)
    pad.redraw()
    pad.setListeners()
    pad.animationCycle()
  };

  return API
})()