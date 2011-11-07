describe("SproutCore Extras", function(){
  var view, views = [];

  var appendView = function(v) {
    v || (v = view);
    SC.run(function() { v.appendTo('#qunit-fixture'); });
  };

  var waitForRender = function(){
    var rendered = false;
    SC.run.schedule('render', function(){ rendered = true; });
    waitsFor(function(){ return rendered; });
  };

  afterEach(function(){
    if (view) { view.destroy(); }
    if (views) {
      views.forEach(function(v){ v.destroy(); });
    }
  });

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
        view = SC.TabPaneView.create({
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

        // for teardown
        views.push(view1, view2);

        expect(view1.get('isVisible')).toBe(true);
        expect(view2.get('isVisible')).toBe(false);

        SC.run(function(){ controller.set('currentTab', 'tab2'); });

        expect(view1.get('isVisible')).toBe(false);
        expect(view2.get('isVisible')).toBe(true);
      });
    });
  });

  describe("Ace Editor", function(){
    it("should have custom class", function(){
      view = SC.AceEditorView.create();
      expect(view.get('classNames').contains('sc-ace-editor'));
    });

    it("should set editor property", function(){
      view = SC.AceEditorView.create();
      expect(view.get('editor')).toBeFalsy();
      appendView();
      expect(view.get('editor')).toBeTruthy();
    });

    it("should update value when user types in editor");
    it("should update editor when value is changed");

    it("should return current session", function(){
      view = SC.AceEditorView.create();
      appendView();
      expect(view.get('session')).toBe(view.get('editor').getSession());
    });

    describe("language", function(){
      beforeEach(function(){
        var originalRequire = window.require;

        spyOn(window, 'require').andCallFake(function(path){
          if (path.substr(0,9) !== 'ace/mode/') { return originalRequire.apply(window, arguments); }

          var mockMode = function(){};
          mockMode.path = mockMode.prototype.path = path;
          return { Mode: mockMode };
        });
      });

      it("should handle language changes", function(){
        view = SC.AceEditorView.create({
          language: 'html',
          languageModeDidChange: function(){} // Ace won't like our mock object
        });
        appendView();

        expect(view.get('languageMode').path).toBe("ace/mode/html");
        expect(window.require.mostRecentCall.args).toEqual(["ace/mode/html"]);

        SC.run(function(){
          view.set('language', 'javascript');
        });

        expect(view.get('languageMode').path).toBe("ace/mode/javascript");
        expect(window.require.mostRecentCall.args).toEqual(["ace/mode/javascript"]);
      });

      it("should update editor language when languageMode is updated", function(){
        view = SC.AceEditorView.create();
        spyOn(view, 'languageModeDidChange').andCallThrough();
        appendView();

        expect(view.languageModeDidChange).toHaveBeenCalled();

        var session = view.get('session');
        spyOn(session, 'setMode');

        SC.run(function(){ view.set('language', 'javascript'); });

        expect(session.setMode.mostRecentCall.args[0].path).toBe('ace/mode/javascript');
      });

    });

    it("should display editor even if it was originally hidden", function(){
      view = SC.AceEditorView.create({
        isVisible: false,
        afterRender: function(buffer){
          buffer.style('width', '200px');
          buffer.style('height', '100px');
        }
      });

      // Put somewhere visible
      SC.run(function() { view.append(); });

      expect(view.$('.ace_content').width()).toBe(0);

      SC.run(function(){ view.set('isVisible', true); });

      waitForRender();
      runs(function(){
        expect(view.$('.ace_content').width()).toBe(150);
      });
    });
  });
});
