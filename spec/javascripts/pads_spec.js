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
      expect(pad.$dom.find("jsZoomSelect").is("div")).toEqual(true)
    })
    it("virtual dom contains color selector",function(){
      expect(pad.$dom.find("jsColorSelect").is("div")).toEqual(true)
    })
    it("virtual dom contains slide selector",function(){
      expect(pad.$dom.find("jsSlideSelect").is("div")).toEqual(true)
    })
  })
})

describe("pad behaviors", function(){})