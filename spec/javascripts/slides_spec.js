describe('slides meta tests', function(){
  it("can run tests", function(){
    expect(true).toBe(true);
  });
})
describe('slides property tests', function(){
  it("slides have a project_id property", function(){
    var testSlide = new Slide()
    expect(testSlide.hasOwnProperty("projectID")).toBe(true);
  });
  it("slides have an x proportion", function(){
    var testSlide = new Slide()
    expect(testSlide.hasOwnProperty("width")).toBe(true);
  });
  it("slides have a y proportion", function(){
    var testSlide = new Slide()
    expect(testSlide.hasOwnProperty("height")).toBe(true);
  });
  it("slides have a pixels property", function(){
    var testSlide = new Slide()
    expect(testSlide.hasOwnProperty("pixels")).toBe(true);
  });
  it("pixels have an rgba property", function(){
    var testSlide = new Slide()
    expect(testSlide.pixels[0][0].constructor.name).toBe("Array");
    expect(testSlide.pixels[0][0].length).toBe(4);
  });
})
