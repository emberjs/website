describe("SproutCore", function(){
  describe("stringToObject", function(){
    beforeEach(function(){
      spyOn(SC, 'getPath').andCallFake(function(target, path){ return target+'.'+path; });
    });

    it("should use SC.get path if a string is passed", function(){
      expect(SC.stringToObject('target', 'test.path')).toBe('target.test.path');
      expect(SC.getPath).toHaveBeenCalledWith('target', 'test.path');
    });

    it("should return the object if it's not a string", function(){
      var obj = { value: 1 };
      expect(SC.stringToObject('target', obj)).toBe(obj);
      expect(SC.getPath).not.toHaveBeenCalled();
    });
  });
});
