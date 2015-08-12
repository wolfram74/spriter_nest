describe('utilities meta tests', function(){
  it("can run tests", function(){
    expect(true).toBe(true);
  });
})

describe("utilities module", function(){
  it("#replaceAt", function(){    
    var test ="fart"
    expect(utilities.replaceAt(test, 2, "s")).toBe("fast");
    expect(utilities.replaceAt(test, 0, "d")).toBe("dart");
  });
  it("#merge", function(){    
    var obj1 = {a: 1, b:2}
    var obj2 = {b:4, c:3}
    expect(utilities.merge(obj2, obj1)).toEqual({a: 1, b:2, c:3});
    expect(utilities.merge(obj1, obj2)).toEqual({a: 1, b:4, c:3});
  });
  it("#colorString", function(){    
    var col1 = [100,32,43,51]
    var col2 = [1,2,3,102]
    expect(utilities.colorString(col1)).toEqual("rgba(100,32,43,0.2)");
    expect(utilities.colorString(col2)).toEqual("rgba(1,2,3,0.4)");
  });
  it("#extend", function(){    
    var obj1 = {a: 1, b:2}
    var obj2 = {b:4, c:3}
    expect(utilities.extend({}, obj2, obj1)).toEqual({a: 1, b:2, c:3});
    expect(utilities.extend({}, obj1, obj2)).toEqual({a: 1, b:4, c:3});
  });
})
