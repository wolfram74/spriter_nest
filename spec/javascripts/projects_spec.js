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
  it("projects have a animationQueue property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("animationQueue")).toBe(true);
  });
  it("projects have a penColor property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("penColor")).toBe(true);
  });
  it("projects have a workingSlide property", function(){
    var testProject = new Project()
    expect(testProject.hasOwnProperty("workingSlide")).toBe(true);
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
    expect(newSlide.height).toBe(testProject.defaultHeight);
    expect(newSlide.width).toBe(testProject.defaultWidth);
  });
  it("projects can set penColor", function(){
    var testProject = new Project({colorDepth:256})
    var oldColor = testProject.penColor
    testProject.setPenColor([1,2,3,4])
    expect(oldColor).toBe([0,0,0,0]);
    expect(testProject.penColor).toBe([1,2,3,4]);
  });
  it("projects can copy a preexisting slide", function(){
    var testProject = new Project()
    testProject.newSlide()
    testProject.setWorkingSlide(0)
    testProject.setPenColor([1,2,3,4])
    testProject.workingSlide.setColorAt({x:0, y:0})
    testProject.copySlide(0)
    var oldSlide = testProject.slides[0]
    var newSlide = testProject.slides[1]
    expect(newSlide.pixels[0][0]).toBe(oldSlide.pixels[0][0]);
  });
  it("projects can add slides to animationQueue", function(){
    var testProject = new Project()
    testProject.newSlide()
    testProject.setWorkingSlide(0)
    testProject.setPenColor([1,2,3,4])
    testProject.workingSlide.setColorAt({x:0, y:0})
    testProject.copySlide(0)
    testProject.setWorkingSlide(1)
    testProject.setPenColor([2,2,3,4])
    testProject.workingSlide.setColorAt({x:1, y:0})
    testProject.copySlide(1)
    testProject.setWorkingSlide(2)
    testProject.setPenColor([3,2,3,4])
    testProject.workingSlide.setColorAt({x:2, y:0})
    testProject.addAnimationQueue(1)
    testProject.addAnimationQueue(2)
    expect(testProject.animationQueue.length).toBe(2);
    expect(testProject.animationQueue[0].constructor.name).toBe("Slide");
    expect(testProject.animationQueue[0].pixels[0][1]).toBe([2,2,3,4]);
  });
  it("projects can switch order of slides in animationQueue", function(){
    var testProject = new Project()
    testProject.newSlide()
    testProject.setWorkingSlide(0)
    testProject.setPenColor([1,2,3,4])
    testProject.workingSlide.setColorAt({x:0, y:0})
    testProject.copySlide(0)
    testProject.setWorkingSlide(1)
    testProject.setPenColor([2,2,3,4])
    testProject.workingSlide.setColorAt({x:1, y:0})
    testProject.copySlide(1)
    testProject.setWorkingSlide(2)
    testProject.setPenColor([3,2,3,4])
    testProject.workingSlide.setColorAt({x:2, y:0})
    testProject.addAnimationQueue(1)
    testProject.addAnimationQueue(2)
    expect(testProject.animationQueue[0].pixels[0][1]).toBe([2,2,3,4]);
    testProject.queueSlideMoveUp(1)
    expect(testProject.animationQueue[0].pixels[0][2]).toBe([3,2,3,4]);
    expect(testProject.animationQueue[1].pixels[0][1]).toBe([2,2,3,4]);
    testProject.queueSlideMoveDown(0)
    expect(testProject.animationQueue[1].pixels[0][2]).toBe([3,2,3,4]);
    expect(testProject.animationQueue[0].pixels[0][1]).toBe([2,2,3,4]);
  });
})
