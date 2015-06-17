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