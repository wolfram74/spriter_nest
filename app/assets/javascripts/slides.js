function Slide (args){
  var defaults = {
    width:16 ,height:26, 
    projectID:null, project: new Project(), 
    pixels: null, ID: null
  };
  args = utilities.merge(defaults, args)
  this.width = args["width"] 
  this.height = args["height"]
  this.project = args["project"]
  this.projectID = this.project.ID
  if (!args["pixels"]){
    this.pixels = this.blankPixels()
  }else{
    this.pixels = args["pixels"]
  }
    this.ID = args["ID"]
};

Slide.prototype.setColorAt = function(args){
  var color = args.penColor || this.project.penColor
  var newVal = utilities.clone(color)
  this.pixels[args["y"]][args["x"]] = newVal
  // for(i in this.project.penColor){
  //   this.pixels[args["y"]][args["x"]][i] = this.project.penColor[i]
  // }
};

Slide.prototype.blankPixels = function(){
  var emptyRows = new Array(this.height);
  for(y = 0; y<this.height; y++){
    var row = new Array(this.width);
    for(x = 0; x<this.width; x++){
      var pixel = [0,0,0,0];
      row[x] = pixel;
    };
    emptyRows[y] = row
  };
  return emptyRows;
};

Slide.copy = function(slide){
  var user = "/users/"+slide.project.userID;
  var project = "/projects/" + slide.project.ID;
  var url = (user+project+"/slides");
  var request = $.ajax({
    type:"POST",
    url:url,
    data:{width:slide.width, height: slide.height}
  });
  return new Promise(function(resolve, reject){
    request.done(function(response){
      console.log(response);
      resolve(response)
    });
    request.fail(function(response){
      console.log(response);
      reject(response)
    });
  });
}

Slide.create = function(){
};