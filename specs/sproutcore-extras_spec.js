describe("SproutCore Extras", function(){
  var view, views, controller;

  var appendView = function(v) {
    v || (v = view);
    SC.run(function() { v.appendTo('#qunit-fixture'); });
  };

  var waitForQueue = function(queue){
    var done = false;
    SC.run.schedule(queue, function(){ done = true; });
    waitsFor(function(){ return done; });
  };

  var waitForRender = function(){ waitForQueue('render'); };
  var waitForSync   = function(){ waitForQueue('sync'); };

  beforeEach(function(){
    views = [];
    window.CustomNamespace = {};
  });

  afterEach(function(){
    if (view) { view.destroy(); }
    if (views) {
      views.forEach(function(v){ v.destroy(); });
    }
    if (controller) { controller.destroy(); }
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
        controller = SC.TabController.create();
        var sender = SC.Object.create({ tabName: 'testTab' });

        SC.run(function(){
          controller.changeTabTo(sender);
        });

        expect(controller.get('currentTab')).toBe('testTab');
      });
    });

    describe("view", function(){
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

  describe("console", function(){
    describe("controller", function(){
      beforeEach(function(){
        controller = SC.ConsoleController.create();
      });

      it("should validate input", function(){
        expect(controller.validateInput('a = 1')).toBe(true);
        expect(controller.validateInput('')).toBe(false);
      });

      it("should preprocess input", function(){
        expect(controller.preprocessInput('a = 1')).toBe('a = 1');

        controller._incompleteCommand = 'a =';
        expect(controller.preprocessInput('1')).toBe("a =\n1");
      });

      it("should process input", function(){
        expect(controller.processInput("CustomNamespace.test = 1")).toBe(1);
        expect(CustomNamespace.test).toBe(1);
      });

      it("should postprocess results", function(){
        expect(controller.postprocessResult(null)).toBe(null);
        expect(controller.postprocessResult(undefined)).toBe(null);
        expect(controller.postprocessResult(true)).toBe('true');
        expect(controller.postprocessResult({})).toBe('[object Object]');
        expect(controller.postprocessResult([1,2,3])).toBe('1,2,3');
      });

      it("should determine if error is from incomplete command", function(){
        var incompleteError, otherSyntaxError, differentError;
        try{ eval("a ="); }catch(e){ incompleteError = e; }
        try{ eval("a =;"); }catch(e){ otherSyntaxError = e; }
        differentError = new Error("Unexpected end of input");

        expect(controller.isIncompleteCommandError(incompleteError)).toBe(true);
        expect(controller.isIncompleteCommandError(otherSyntaxError)).toBe(false);
        expect(controller.isIncompleteCommandError(differentError)).toBe(false);
      });

      it("should process errors and handle incomplete commands", function(){
        var incompleteError = new SyntaxError("Unexpected end of input"),
            otherError = new Error("Errored!");

        expect(controller._incompleteCommand).toBeUndefined();
        expect(controller.processError("a =;", otherError)).toEqual({ value: "Error: Errored!", type: 'error' });
        expect(controller._incompleteCommand).toBeUndefined();
        expect(controller.processError("a =", incompleteError)).toBeNull();
        expect(controller._incompleteCommand).toBe("a =");
      });

      describe("handling input", function(){
        beforeEach(function(){
          controller.preprocessInput = jasmine.createSpy().andCallFake(function(input){ return "preprocessed:"+input; });
          controller.processInput = jasmine.createSpy().andCallFake(function(input){ return "processed:"+input; });
          controller.processError = jasmine.createSpy().andCallFake(function(input, error){ return "error:"+input+"/"+error; });
          controller.postprocessResult = jasmine.createSpy().andCallFake(function(result){ return "postprocessed:"+result; });
        });

        it("should handle valid code", function(){
          expect(controller.handleInput('a = 1')).toBe("postprocessed:processed:preprocessed:a = 1");
        });

        it("should handle input errors", function(){
          controller.processInput = jasmine.createSpy().andCallFake(function(){ throw "Errored!"; });
          expect(controller.handleInput('a =;')).toBe("error:preprocessed:a =;/Errored!");
        });
      });

      describe("running commands", function(){
        it("should not run empty commands", function(){
          controller.set('value', '');
          controller.runCommand();
          expect(controller.get('history')).toBeNull();
        });

        it('should clear the displayed value', function(){
          controller.set('value', 'CustomNamespace.test = 1');
          controller.runCommand();
          expect(controller.get('value')).toBe(null);
        });

        it("should add full history item", function(){
          controller.set('value', '"abcdef".toUpperCase();');
          controller.runCommand();
          expect(controller.getPath('history')).toEqual([
            {
              prompt: '> ',
              command: '"abcdef".toUpperCase();',
              results: [
                {
                  value: 'ABCDEF',
                  type: 'success'
                }
              ]
            }
          ]);
        });

        it('should handle non-object results', function(){
          controller.handleInput = jasmine.createSpy().andReturn("result");
          controller.set('value', 'dummy');
          controller.runCommand();
          expect(controller.getPath('history.0.results.0')).toEqual({ value: 'result', type: 'success' });
        });

        it('should handle an array of results', function(){
          var results = [
            { value: 'result1', type: 'data' },
            { value: 'result2', type: 'success' }
          ];

          controller.handleInput = jasmine.createSpy().andReturn(results);

          controller.set('value', 'dummy');
          controller.runCommand();

          expect(controller.getPath('history.0.results')).toEqual(results);
        });
      });

      describe("push history", function(){
        it('should set history if not set', function(){
          expect(controller.get('history')).toBeNull();
          controller.pushHistory('dummy');
          expect(controller.get('history')).toEqual(['dummy']);
        });

        it('should append to history and set position', function(){
          controller.set('history', ['item1']);
          controller.pushHistory('item2');
          expect(controller.get('history')).toEqual(['item1','item2']);
          expect(controller._currentHistoryPos).toBe(2);
          controller.pushHistory('item3');
          expect(controller.get('history')).toEqual(['item1','item2', 'item3']);
          expect(controller._currentHistoryPos).toBe(3);
        });
      });

      describe("navigating history", function(){
        beforeEach(function(){
          controller.set('history', [{ command: 'item1' }, { command: 'item2' }, { command: 'item3' }]);
          controller._currentHistoryPos = 3;
        });

        it("should go to previous if available", function(){
          expect(controller.get('value')).toBe(null);
          controller.historyPrevious();
          expect(controller.get('value')).toBe('item3');
          controller.historyPrevious();
          expect(controller.get('value')).toBe('item2');
          controller.historyPrevious();
          expect(controller.get('value')).toBe('item1');
          controller.historyPrevious();
          expect(controller.get('value')).toBe('item1');
        });

        it("should go to next if available", function(){
          controller._currentHistoryPos = 0;
          controller.historyNext();
          expect(controller.get('value')).toBe('item2');
          controller.historyNext();
          expect(controller.get('value')).toBe('item3');
          controller.historyNext();
          expect(controller.get('value')).toBeUndefined();
        });

        it("should store current", function(){
          controller.set('value', 'current');
          controller.historyPrevious();
          expect(controller.get('value')).toBe('item3');
          controller.historyNext();
          expect(controller.get('value')).toBe('current');
        });
      });
    });

    describe("sandboxed controller", function(){
      beforeEach(function(){
        controller = SC.SandboxedConsoleController.create();
      });

      it("should create iframe upon init", function(){
        waitForRender();
        runs(function(){
          expect(controller._iframe).toBeDefined();
          expect($.contains($('iframe'), controller._iframe)).toBe(true);
        });
      });

      it("should remove iframe upon destroy", function(){
        var len = $('iframe').length;
        controller.destroy();
        expect($('iframe').length).toBe(len-1);
      });

      it("should eval in iframe", function(){
        controller.processInput("window.testVar = 'testing'");
        expect(window.testVar).toBeUndefined();
        expect(controller._iframe.contentWindow.testVar).toBe('testing');
      });

      it("should handle incomplete command", function(){
        expect(controller.handleInput("a =")).toBeNull();
        expect(controller._incompleteCommand).toBe("a =");
      });

      it("should reset sandbox", function(){
        var originalIframe = controller._iframe;

        controller.processInput("testVar = 'testing'");
        expect(controller.processInput('window.testVar')).toBe('testing');

        controller.resetSandbox();

        expect(controller.processInput('window.testVar')).toBeUndefined();
        expect(controller._iframe).not.toEqual(originalIframe);
      });
    });

    describe("console input view", function(){
      beforeEach(function(){
        controller = SC.ConsoleController.create();
      });

      it("should get controllerObject from controller string", function(){
        view = SC.ConsoleInputView.create({
          controller: 'path.to.controller',
          path: { to: { controller: controller } }
        });

        expect(view.get('controllerObject')).toBe(controller);
      });

      it("should bind value to controller", function(){
        SC.run(function(){ view = SC.ConsoleInputView.create({ controllerObject: controller }); });

        SC.run(function(){ view.set('value', 'value1'); });
        expect(controller.get('value')).toBe('value1');

        SC.run(function(){ controller.set('value', 'value2'); });
        expect(view.get('value')).toBe('value2');
      });

      it("should change history on up and down arrow", function(){
        mockController = jasmine.createSpyObj('controller', ['historyPrevious', 'historyNext']);
        mockEvent = jasmine.createSpyObj('event', ['preventDefault']);
        view = SC.ConsoleInputView.create({ controllerObject: mockController });

        mockEvent.keyCode = 38; // Up Arrow
        view.keyDown(mockEvent);
        expect(mockController.historyPrevious.callCount).toBe(1);
        expect(mockController.historyNext.callCount).toBe(0);
        expect(mockEvent.preventDefault.callCount).toBe(1);

        mockEvent.keyCode = 40; // Down Arrow
        view.keyDown(mockEvent);
        expect(mockController.historyPrevious.callCount).toBe(1);
        expect(mockController.historyNext.callCount).toBe(1);
        expect(mockEvent.preventDefault.callCount).toBe(2);
      });

      it("should run command on newline", function(){
        mockController = jasmine.createSpyObj('controller', ['runCommand']);
        view = SC.ConsoleInputView.create({ controllerObject: mockController });

        view.insertNewline();
        expect(mockController.runCommand).toHaveBeenCalled();
      });
    });

    describe("console history view", function(){
      beforeEach(function(){
        controller = SC.ConsoleController.create();
      });

      it("should get controllerObject from controller string", function(){
        view = SC.ConsoleHistoryView.create({
          controller: 'path.to.controller',
          path: { to: { controller: controller } }
        });

        expect(view.get('controllerObject')).toBe(controller);
      });

      it("should display history", function(){
        view = SC.ConsoleHistoryView.create({ controllerObject: controller });
        SC.run(function(){
          controller.set('history', [
            {
              prompt: '> ',
              command: 'a = 1',
              results: [
                { type: 'echo', value: 'a = 1' },
                { type: 'success', value: '1' }
              ]
            },
            {
              prompt: '$ ',
              command: 'a =;',
              results: [{ type: 'error', value: 'Syntax Error' }]
            }
          ]);
        });

        appendView();

        var items = view.$('li'), el;

        expect(items.length).toBe(5);

        el = $(items.get(0));
        expect(el.attr('class')).toBe('command');
        expect(el.text()).toBe('> a = 1');

        el = $(items.get(1));
        expect(el.attr('class')).toBe('echo');
        expect(el.text()).toBe('a = 1');

        el = $(items.get(2));
        expect(el.attr('class')).toBe('success');
        expect(el.text()).toBe('1');

        el = $(items.get(3));
        expect(el.attr('class')).toBe('command');
        expect(el.text()).toBe('$ a =;');

        el = $(items.get(4));
        expect(el.attr('class')).toBe('error');
        expect(el.text()).toBe('Syntax Error');
      });
    });
  });
});
