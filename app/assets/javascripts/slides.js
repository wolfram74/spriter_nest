function Slide (args){
  var defaults = {
    width:16 ,height:26, 
    projectID:null, project: new Project()
  };
  args = utilities.merge(defaults, args)
  this.width = args["width"] 
  this.height = args["height"]
  this.projectID = args["projectID"]
  this.project = args["project"]
  this.penColor = args["penColor"]
  this.pixels = new Array(this.height)
  for(y = 0; y<this.height; y++){
    var row = new Array(this.width)
    for(x = 0; x<this.width; x++){
      var pixel = [0,0,0,0];
      row[x] = pixel;
    };
    this.pixels[y] = row
  };
 };