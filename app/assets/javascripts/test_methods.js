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

function testProjectGet(){
  var home = window.location.origin
  var request = $.ajax({
    url: home+"/users/1/projects/1",
    type: "GET"
  })

  request.done(function(results){
    console.log(results)
  })
  return "derped"
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