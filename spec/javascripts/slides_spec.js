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
describe('slides behavior tests', function(){
  it("slides can have a color set at a pixel", function(){
    var testProject = new Project({defaultWidth: 10, defaultHeight:10, colorDept: 256})
    testProject.newSlide()
    testProject.setWorkingSlide(0)
    testProject.setPenColor([1,2,3,4])
    testProject.workingSlide.setColorAt({x:0, y:0})
    expect(testProject.pixels[0][0]).toBe([1,2,3,4]);
  });
})
