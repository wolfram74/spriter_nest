describe('projects meta tests', function(){
  it("can run tests", function(){
    expect(true).toBe(true);
  });
})

describe('projects property tests', function(){
  it("projects have a user_id property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("userID")).toBe(true);
  });
  it("projects have a default x proportion", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("defaultWidth")).toBe(true);
  });
  it("projects have a default y proportion", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("defaultHeight")).toBe(true);
  });
  it("projects have a color depth property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("colorDepth")).toBe(true);
  });
  it("projects have a slides property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("slides")).toBe(true);
  });
})

describe('projects behavior tests', function(){
  it("projects can generate a new slide", function(){
    var testProject = new Project()
    var startingLength = testProject.slides.length
    testProject.newSlide()
    var newLength = testProject.slides.length
    var product = testProject.slides.pop()
    expect(newLength-startingLength).toBe(1);
    expect(product.constructor.name).toBe("Slide");
  });
  it("projects give slides default proportions", function(){
    var testProject = new Project({defaultWidth: 75})
    testProject.newSlide()
    var newSlide = testProject.pop()
    expect(testProject.hasOwnProperty("defaultWidth")).toBe(true);
  });
  it("projects have a default y proportion", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("defaultHeight")).toBe(true);
  });
  it("projects have a color depth property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("colorDepth")).toBe(true);
  });
  it("projects have a slides property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("slides")).toBe(true);
  });
})
