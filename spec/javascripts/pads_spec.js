describe("pads meta tests", function(){
  it("can run tests", function(){
    expect(true).toEqual(true)
  })
})

describe("pad properties", function(){
  var pad;
  beforeEach(function(){
    pad = new Pad()
  })
  describe("pads virtual dom", function(){
    it("has a virtual dom",function(){
      expect(pad.$dom.is("div")).toEqual(true)
    })

    it("virtual dom contains zoom selector",function(){
      expect(pad.$dom.find("#jsZoomSelect").is("div")).toEqual(true)
    })
    it("zoom selector contains a form",function(){
      var zoom = pad.$dom.find("#jsZoomSelect")
      expect(!!zoom.find("form").length).toEqual(true)
    })
    it("zoom selector form contains a list items",function(){
      var zoom = pad.$dom.find("#jsZoomSelect")
      expect(!!zoom.find("form").find("li").length).toEqual(true)
    })

    it("virtual dom contains color selector",function(){
      expect(pad.$dom.find("#jsColorSelect").is("div")).toEqual(true)
    })
    it("color selector contains a form",function(){
      var color = pad.$dom.find("#jsColorSelect")
      expect(!!color.find("form").length).toEqual(true)
    })
    it("color selector form contains a list items",function(){
      var color = pad.$dom.find("#jsColorSelect")
      expect(!!color.find("form").find("li").length).toEqual(true)
    })
    it("color selector shows present color",function(){
      var color = pad.$dom.find("#jsColorSelect")
      expect(!!color.find("#jsCurrentColor").length).toEqual(true)
      expect(color.find("#jsCurrentColor").is("div")).toEqual(true)
    })

    it("virtual dom contains slide selector",function(){
      expect(pad.$dom.find("#jsSlideIndex").is("div")).toEqual(true)
    })
    it("slide selector contains a form",function(){
      var selector = pad.$dom.find("#jsSlideIndex")
      expect(!!selector.find("form").length).toEqual(true)
    })

    it("virtual dom contains slide main stage",function(){
      expect(pad.$dom.find("#jsSlideShow").is("div")).toEqual(true)
    })
    it("slide main stage contains a canvas",function(){
      var stage = pad.$dom.find("#jsSlideShow")
      expect(!!stage.find("canvas").length).toEqual(true)
    })

    it("virtual dom contains animation section",function(){
      expect(pad.$dom.find("#jsAnimation").is("div")).toEqual(true)
    })
    it("animation contains animation screen",function(){
      var animation = pad.$dom.find("#jsAnimation")
      expect(!!animation.find("canvas").length).toEqual(true)
    })
    it("animation contains animation queue",function(){
      var animation = pad.$dom.find("#jsAnimation")
      expect(animation.find("#jsAnimationQueue").is("div")).toEqual(true)
    })
  })
  describe("pads instance variables", function(){
    it("knows it's collection of slides",function(){
      expect(pad.hasOwnProperty("slides")).toBe(true)
    })
    it("knows it's pen color",function(){
      expect(pad.hasOwnProperty("color")).toBe(true)      
    })
    it("knows it's zoom size",function(){
      expect(pad.hasOwnProperty("zoom")).toBe(true)
    })
  })
})

describe("pad behaviors", function(){
  describe("general features",function(){
    it("can change slide's color values",function(){
      var test = new Pad()
      test.color = [10,20,30,40]
      var initColor = test.currentSlide.pixels[0][0]
      test.setCell(0,0)
      expect(test.currentSlide.pixels[0][0]).toEqual([10,20,30,40])
      expect(test.currentSlide.pixels[1][0]).toEqual(initColor)
    });
  });
  describe("canvas component",function(){
    it("changes size based on zoom.",function(){
      var test = new Pad()
      var height0 = test.$dom.find("#jsSlideShow").find("canvas").attr("height")
      test.zoom = 13
      var height1 = test.scaleCanvas().attr("height")
      test.zoom = 2
      var height2 = test.scaleCanvas().attr("height")
      expect(height0).not.toEqual(height1)
      expect(parseInt(height1)).toBeGreaterThan(parseInt(height2))
    });
    it("reflects changes made to slide",function(){
      var test = new Pad()
      var $can = test.$dom.find("#jsSlideShow").find("canvas")
      var ctx = $can.getContext("2d")
      var initcolor = ctx.getImageData(0,0,1,1)      
    });
  })
})