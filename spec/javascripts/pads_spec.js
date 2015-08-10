describe("pads meta tests", function(){
  it("can run tests", function(){
    expect(true).toEqual(true)
  })
})

describe("pad properties", function(){
  describe("pads virtual dom", function(){
    var pad;
    beforeEach(function(){
      pad = new Pad()
    })
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

    it("virtual dom contains color selector",function(){
      expect(pad.$dom.find("#jsColorSelect").is("div")).toEqual(true)
    })
    it("color selector contains a form",function(){
      var color = pad.$dom.find("#jsColorSelect")
      expect(!!color.find("form").length).toEqual(true)
    })
    it("color selector shows present color",function(){
      var color = pad.$dom.find("#jsColorSelect")
      expect(!!color.find("#jsCurrentColor").length).toEqual(true)
      expect(color.find("#jsCurrentColor").is("div")).toEqual(true)
    })

    it("virtual dom contains slide selector",function(){
      expect(pad.$dom.find("#jsSlideSelect").is("div")).toEqual(true)
    })
    it("slide selector contains a form",function(){
      var selector = pad.$dom.find("#jsSlideSelect")
      expect(!!selector.find("form").length).toEqual(true)
    })

    it("virtual dom contains slide main stage",function(){
      expect(pad.$dom.find("#jsSlideView").is("div")).toEqual(true)
    })
    it("slide main stage contains a canvas",function(){
      var stage = pad.$dom.find("#jsSlideView")
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
})

describe("pad behaviors", function(){})