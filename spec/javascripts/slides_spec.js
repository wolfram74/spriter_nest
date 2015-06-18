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
    var testProject = new Project({defaultWidth: 2, defaultHeight:2, colorDept: 256, userID: 4})
    testProject.setWorkingSlide(0)
    var color = [1,2,3,4];
    testProject.newSlide()
    testProject.setPenColor(color)

    expect(testProject.slides[0].project).toBe(testProject)

    console.log(testProject.penColor, testProject.userID, "new pen color, expecting", color)
    // debugger
    testProject.workingSlide.setColorAt({x:0, y:0})
    console.log(testProject.workingSlide.pixels)
    expect(testProject.workingSlide.pixels[0][0]).toEqual(color);
  });
})
