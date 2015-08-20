function Slide (args){
  var defaults = {
    width:16 ,height:26, 
    projectID:null, project: new Project(), 
    pixels: null, ID: null,
    top: 0, left: 0
  };
  args = utilities.merge(defaults, args)
  this.width = args["width"] 
  this.height = args["height"]
  this.top = args["top"]
  this.left = args["left"]
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
  var args = {}
  args.userID = slide.project.userID
  args.projectID = slide.project.ID
  args.width = slide.width
  args.height = slide.height
  Slide.create(args).then(function(slideRecord){
    console.log("good route");
    console.log(slideRecord);
    slideRecord.ID = slideRecord.id;
    slideRecord.pixels = utilities.clone(slide.pixels);
    slideRecord.project = slide.project;
    return slideRecord
  }).then(function(slideRecord){
    newSlide = new Slide(slideRecord);
    var index = newSlide.project.slides.length
    newSlide.project.slides.push(newSlide);
    var tempLi = $(Handlebars.partials["pads/_slideLi"]({number: index}))
    $("#jsSlideIndex").find("ul").append(tempLi)
  })
}

Slide.blank = function(project){
  var args = {}
  args.userID = project.userID
  args.projectID = project.ID
  args.width = project.defaultWidth
  args.height = project.defaultHeight
  console.log(args)
  Slide.create(args).then(function(slideRecord){
    console.log("good route");
    console.log(slideRecord);
    slideRecord.ID = slideRecord.id;
    slideRecord.project = project;
    return slideRecord
  }).then(function(slideRecord){
    newSlide = new Slide(slideRecord);
    var index = newSlide.project.slides.length
    newSlide.project.slides.push(newSlide);
    var tempLi = $(Handlebars.partials["pads/_slideLi"]({number: index}))
    $("#jsSlideIndex").find("ul").append(tempLi)
  })
};

Slide.create = function(args){
  // args assums userID, projectID, width and height
  var user = "/users/"+args.userID;
  var project = "/projects/" + args.projectID;
  var url = (user+project+"/slides");
  var request = $.ajax({
    type:"POST",
    url:url,
    data:{width:args.width, height: args.height}
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
};