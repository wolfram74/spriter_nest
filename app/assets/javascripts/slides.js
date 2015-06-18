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
  console.log("running setColorAt")
  console.log(this.project.penColor, this.project.userID,"pen and user id" )
  var newVal = utilities.clone(this.project.penColor)
  this.pixels[args["y"]][args["x"]] = newVal
  // for(i in this.project.penColor){
  //   this.pixels[args["y"]][args["x"]][i] = this.project.penColor[i]
  // }
  console.log(args["y"], args["x"])
  console.log(this.pixels[args["y"]][args["x"]], "pixel")
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