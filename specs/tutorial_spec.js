describe("Tutorial", function(){
  it("should allow users to reset the code manually");

  describe("Step", function(){
    describe("validation", function(){
      it("should return true if no errors", function(){
        var step = Tutorial.Step.create();
        expect(step.validate()).toBe(true);
      });

      it("should return false if errors", function(){
        var step = Tutorial.Step.create({
          validator: function(){
            this.get('errors').pushObject("ERROR");
          }
        });

        expect(step.validate()).toBe(false);
      });

      it("should pass context to validator", function(){
        var step = Tutorial.Step.create();
        step.validator = jasmine.createSpy();

        step.validate('context');

        expect(step.validator).toHaveBeenCalledWith('context');
      });

      it("should be cumulative", function(){
        var previousStep = Tutorial.Step.create({
              validator: function(){
                this.get('errors').pushObject("ERROR");
              }
            }),
            step = Tutorial.Step.create({
              previousStep: previousStep
            });

        spyOn(previousStep, 'validator').andCallThrough();
        spyOn(step, 'validator').andCallThrough();

        expect(step.validate('context')).toBe(false);
        expect(previousStep.validator).toHaveBeenCalledWith('context');
        expect(step.validator).not.toHaveBeenCalled();
      });
    });
  });

  describe("tutorialController", function(){
    beforeEach(function(){
      $('<div id="tutorial-output"></div>').appendTo(document.body);
    });

    afterEach(function(){
      $('#tutorial-output').remove();
      SC.run(function(){
        Tutorial.tutorialController.set('currentStep', null);
        Tutorial.tutorialController.set('iframe', null);
      });
    });

    describe("addStep", function(){
      var step;

      beforeEach(function(){
        step = Tutorial.Step.create({ codeType: 'javascript' });
      });

      it("should set step to lastStep", function(){
        SC.run(function(){ Tutorial.tutorialController.addStep(step); });
        expect(Tutorial.tutorialController.get('lastStep')).toBe(step);
      });

      it("should set step to currentStep if no currentStep", function(){
        SC.run(function(){ Tutorial.tutorialController.addStep(step); });
        expect(Tutorial.tutorialController.get('currentStep')).toBe(step);
      });

      it("should set lastStep's nextStep to new step", function(){
        var step2 = Tutorial.Step.create();
        SC.run(function(){ Tutorial.tutorialController.set('lastStep', step); });
        SC.run(function(){ Tutorial.tutorialController.addStep(step2); });
        expect(step.get('nextStep')).toBe(step2);
      });

      it("should set nextStep's previousStep to lastStep", function(){
        var step2 = Tutorial.Step.create();
        SC.run(function(){ Tutorial.tutorialController.set('lastStep', step); });
        SC.run(function(){ Tutorial.tutorialController.addStep(step2); });
        expect(step2.get('previousStep')).toBe(step);
      });

      it("should convert a hash into a Step", function(){
        SC.run(function(){ Tutorial.tutorialController.addStep({ name: 'test' }); });
        expect(Tutorial.tutorialController.get('currentStep') instanceof Tutorial.Step).toBe(true);
        expect(Tutorial.tutorialController.getPath('currentStep.name')).toBe('test');
      });
    });

    describe("nextStep", function(){
      var nextStep, currentStep;

      beforeEach(function(){
        nextStep = Tutorial.Step.create();
        currentStep = Tutorial.Step.create({ nextStep: nextStep });
        SC.run(function(){ Tutorial.tutorialController.set('currentStep', currentStep); });
      });

      describe("gotoNextStep", function(){
        it("should set currentStep to currentStep.nextStep from", function(){
          SC.run(function(){ Tutorial.tutorialController.gotoNextStep(); });
          expect(Tutorial.tutorialController.get('currentStep')).toBe(nextStep);
        });

        it("should set next step's starting js/template/console", function(){
          SC.run(function(){
            Tutorial.tutorialController.set('javascript', "a = 1");
            Tutorial.tutorialController.set('template', "TEMPLATE");
            Tutorial.tutorialController.set('consoleHistory', ["HISTORY"]);
          });
          SC.run(function(){ Tutorial.tutorialController.gotoNextStep(); });

          expect(nextStep.get('startingJavascript')).toBe("a = 1");
          expect(nextStep.get('startingTemplate')).toBe("TEMPLATE");
          expect(nextStep.get('startingConsoleHistory')).toEqual(["HISTORY"]);
        });

        it("should clear errors", function(){
          SC.run(function(){ nextStep.set('errors', ["ERROR"]); });
          SC.run(function(){ Tutorial.tutorialController.gotoNextStep(); });

          expect(nextStep.get('errors').length).toBe(0);
        });

        it("should evalCode", function(){
          spyOn(Tutorial.tutorialController, 'evalCode');

          Tutorial.tutorialController.gotoNextStep();

          expect(Tutorial.tutorialController.evalCode).toHaveBeenCalled();
        });

        it("should validate before advancing", function(){
          spyOn(currentStep, 'validate').andReturn(true);

          Tutorial.tutorialController.gotoNextStep();

          expect(currentStep.validate).toHaveBeenCalled();
          expect(Tutorial.tutorialController.get('currentStep')).toBe(nextStep);
        });

        it("should not advance if not valid", function(){
          spyOn(currentStep, 'validate').andReturn(false);

          Tutorial.tutorialController.gotoNextStep();

          expect(currentStep.validate).toHaveBeenCalled();
          expect(Tutorial.tutorialController.get('currentStep')).toBe(currentStep);
        });
      });

      it("should tell if hasNextStep", function(){
        expect(Tutorial.tutorialController.get('hasNextStep')).toBe(true);
        SC.run(function(){ Tutorial.tutorialController.gotoNextStep(); });
        expect(Tutorial.tutorialController.get('hasNextStep')).toBe(false);
        SC.run(function(){ Tutorial.tutorialController.set('currentStep', null); });
        expect(Tutorial.tutorialController.get('hasNextStep')).toBe(false);
      });
    });

    describe("previousStep", function(){
      var previousStep, currentStep;

      beforeEach(function(){
        previousStep = Tutorial.Step.create();
        currentStep = Tutorial.Step.create({ previousStep: previousStep });
        SC.run(function(){ Tutorial.tutorialController.set('currentStep', currentStep); });
      });

      describe("gotoPreviousStep", function(){
        it("should set currentStep to currentStep.previousStep", function(){
          SC.run(function(){ Tutorial.tutorialController.gotoPreviousStep(); });
          expect(Tutorial.tutorialController.get('currentStep')).toBe(previousStep);
        });

        it("should change js/template/console to starting values", function(){
          SC.run(function(){
            previousStep.set('startingJavascript', "a = 1");
            previousStep.set('startingTemplate', "TEMPLATE");
            previousStep.set('startingConsoleHistory', ["HISTORY"]);
          });
          SC.run(function(){ Tutorial.tutorialController.gotoPreviousStep(); });

          expect(Tutorial.tutorialController.get('javascript')).toBe("a = 1");
          expect(Tutorial.tutorialController.get('template')).toBe("TEMPLATE");
          expect(Tutorial.tutorialController.get('consoleHistory')).toEqual(["HISTORY"]);
        });

        it("should reset and evalCode", function(){
          spyOn(Tutorial.tutorialController, 'evalCode');

          Tutorial.tutorialController.gotoPreviousStep();

          expect(Tutorial.tutorialController.evalCode).toHaveBeenCalledWith(true);
        });
      });

      it("should tell if hasPreviousStep", function(){
        expect(Tutorial.tutorialController.get('hasPreviousStep')).toBe(true);
        SC.run(function(){ Tutorial.tutorialController.gotoPreviousStep(); });
        expect(Tutorial.tutorialController.get('hasPreviousStep')).toBe(false);
        SC.run(function(){ Tutorial.tutorialController.set('currentStep', null); });
        expect(Tutorial.tutorialController.get('hasPreviousStep')).toBe(false);
      });

      it("should show correct tab", function(){
        expect(Tutorial.editorTabController.get('currentTab')).toBe('javascript');
        SC.run(function(){
          Tutorial.tutorialController.set('currentStep', Tutorial.Step.create({ codeTarget: 'template' }));
        });
        expect(Tutorial.editorTabController.get('currentTab')).toBe('template');
      });
    });

    it("should copy step code", function(){
      var step = Tutorial.Step.create({ codeTarget: 'javascript', code: 'a = 1' });
      SC.run(function(){ Tutorial.tutorialController.set('currentStep', step); });

      expect(Tutorial.tutorialController.get('javascript')).toBeNull();

      SC.run(function(){ Tutorial.tutorialController.copyStepCode(); });

      expect(Tutorial.tutorialController.get('javascript')).toBe('a = 1');

      SC.run(function(){ Tutorial.tutorialController.copyStepCode(); });

      expect(Tutorial.tutorialController.get('javascript')).toBe("a = 1\n\na = 1");
    });

    it("should reset step", function(){
      var step;
      SC.run(function(){
        step = Tutorial.tutorialController.addStep({
          startingJavascript: "a = 1",
          startingTemplate: "TEMPLATE",
          startingConsoleHistory: ["HISTORY"],
          errors: ["ERROR"]
        });
        Tutorial.tutorialController.set('javascript', "b = 2");
        Tutorial.tutorialController.set('template', "TEMPLATE");
        Tutorial.tutorialController.set('consoleHistory', ["HISTORY"]);
      });
      spyOn(Tutorial.tutorialController, 'evalCode');

      Tutorial.tutorialController.resetStep();

      expect(Tutorial.tutorialController.evalCode).toHaveBeenCalledWith(true);
      expect(Tutorial.tutorialController.get('javascript')).toBe("a = 1");
      expect(Tutorial.tutorialController.get('template')).toBe("TEMPLATE");
      expect(Tutorial.tutorialController.get('consoleHistory')).toEqual(["HISTORY"]);
      expect(step.get('errors').length).toBe(0);
    });

    describe("iframe", function(){
      var iframe;

      beforeEach(function(){
        $('<div id="tutorial-output"></div>').appendTo(document.body);
        iframe = Tutorial.tutorialController.resetIframe();
      });

      it("should create iframe", function(){
        expect(iframe).toBeDefined();
        expect(Tutorial.tutorialController.get('iframe')).toBe(iframe);
        expect($('#tutorial-output iframe')[0]).toBe(iframe);
      });

      it("should have jQuery", function(){
        expect(iframe.contentWindow.jQuery).toBeDefined();
      });

      it("should have SproutCore", function(){
        expect(iframe.contentWindow.SC).toBeDefined();
      });

      it("should have CSS");
    });

    describe("eval", function(){
      var iframe;

      beforeEach(function(){
        iframe = Tutorial.tutorialController.resetIframe();
      });

      describe("javascript", function(){
        beforeEach(function(){
          spyOn(iframe.contentWindow, 'eval');
        });

        afterEach(function(){
          SC.run(function(){ Tutorial.tutorialController.set('javascript', null); });
        });

        it("should eval all javascript if not starting", function(){
          SC.run(function(){ Tutorial.tutorialController.set('javascript', 'JAVASCRIPT'); });
          Tutorial.tutorialController.evalCode();
          expect(iframe.contentWindow.eval).toHaveBeenCalledWith('JAVASCRIPT');
        });

        it("should only eval new javascript if starting matches", function(){
          SC.run(function(){
            Tutorial.tutorialController.set('javascript', 'JAVASCRIPT');
            Tutorial.tutorialController.set('currentStep', Tutorial.Step.create({ startingJavascript: 'JAVA' }));
          });
          Tutorial.tutorialController.evalCode();
          expect(iframe.contentWindow.eval).toHaveBeenCalledWith('SCRIPT');
        });

        it("should reset iframe if unable to find match", function(){
          spyOn(Tutorial.tutorialController, 'resetIframe').andReturn(iframe);
          SC.run(function(){
            Tutorial.tutorialController.set('javascript', 'a = 1');
            Tutorial.tutorialController.set('currentStep', Tutorial.Step.create({ startingJavascript: 'b = 2' }));
          });

          Tutorial.tutorialController.evalCode();

          expect(Tutorial.tutorialController.resetIframe).toHaveBeenCalled();
          expect(iframe.contentWindow.eval).toHaveBeenCalledWith('a = 1');
        });
      });

      describe("template", function(){
        var waitForIframeRender = function(){
          var rendered = false;
          iframe.contentWindow.SC.run.schedule('render', function(){ rendered = true; });
          waitsFor(function(){ return rendered; });
        };

        beforeEach(function(){
          waitsFor(function(){ return !!SC; });
          runs(function(){ iframe.contentWindow.eval("MyApp = SC.Application.create();"); });
        });

        afterEach(function(){
          SC.run(function(){ Tutorial.tutorialController.set('template', null); });
        });

        it("should create new rootView on MyApp", function(){
          runs(function(){
            SC.run(function(){ Tutorial.tutorialController.set('template', "TEMPLATE"); });
            Tutorial.tutorialController.evalCode();
          });

          waitForIframeRender();

          runs(function(){
            expect(iframe.contentWindow.MyApp.rootView).toBeDefined();
            expect(iframe.contentWindow.MyApp.rootView.$().text()).toBe('TEMPLATE');
          });
        });

        it("should not recreate the rootView if it already exists", function(){
          runs(function(){
            iframe.contentWindow.eval("MyApp.rootView = SC.View.create(); MyApp.rootView.appendTo(document.body);");

            SC.run(function(){ Tutorial.tutorialController.set('template', "TEMPLATE"); });

            Tutorial.tutorialController.evalCode();
          });

          waitForIframeRender();

          runs(function(){
            expect(iframe.contentWindow.MyApp.rootView).toBeDefined();
            expect(iframe.contentWindow.MyApp.rootView.$().text()).toBe('TEMPLATE');
          });
        });

        it("should not create a root view if no template", function(){
          runs(function(){ Tutorial.tutorialController.evalCode(); });

          waitForIframeRender();

          runs(function(){
            expect(iframe.contentWindow.MyApp.rootView).toBeUndefined();
          });
        });
      });

      describe("console", function(){
        it("should playback history if iframe was reset");
      });
    });
  });
});
