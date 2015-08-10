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
      expect(!!zoom.find("form").length).toEqual(true)
    })
    it("color selector shows present color",function(){
      var color = pad.$dom.find("#jsColorSelect")
      expect(!!zoom.find("#jsCurrent color").length).toEqual(true)
    })

    it("virtual dom contains slide selector",function(){
      expect(pad.$dom.find("#jsSlideSelect").is("div")).toEqual(true)
    })

    it("virtual dom contains slide main stage",function(){
      expect(pad.$dom.find("#jsSlideView").is("div")).toEqual(true)
    })

    it("virtual dom contains animation screen",function(){
      expect(pad.$dom.find("#jsAnimation").is("div")).toEqual(true)
    })
  })
})

describe("pad behaviors", function(){})