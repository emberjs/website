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

describe("Tabs", function(){
  describe("controller", function(){
    it("should change tab", function(){
      var controller = SC.TabController.create(),
          sender = SC.Object.create({ tabName: 'testTab' });

      SC.run(function(){
        controller.changeTabTo(sender);
      });

      expect(controller.get('currentTab')).toBe('testTab');
    });
  });

  describe("view", function(){
    var controller;
    beforeEach(function(){
      controller = SC.TabController.create();
    });

    it("should get controllerObject from controller string", function(){
      var view = SC.TabPaneView.create({
        controller: 'path.to.controller',
        path: { to: { controller: controller } }
      });

      expect(view.get('controllerObject')).toBe(controller);
    });

    it("should set visibility from controller's currentTab", function(){
      controller.set('currentTab', 'tab1');
      var view1 = SC.TabPaneView.create({
            controllerObject: controller,
            tabName: 'tab1'
          }),
          view2 = SC.TabPaneView.create({
            controllerObject: controller,
            tabName: 'tab2'
          });

      expect(view1.get('isVisible')).toBe(true);
      expect(view2.get('isVisible')).toBe(false);

      SC.run(function(){ controller.set('currentTab', 'tab2'); });

      expect(view1.get('isVisible')).toBe(false);
      expect(view2.get('isVisible')).toBe(true);
    });
  });
});
