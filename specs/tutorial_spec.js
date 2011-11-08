describe("Tutorial", function(){
  describe("State", function(){
    var state;

    beforeEach(function(){
      state = Tutorial.State.create({
        javascript: 'JAVASCRIPTS',
        template:   'TEMPLATE',
        console:    'CONSOLE',
        consoleHistory: ['HISTORY']
      });
    });

    afterEach(function(){
      state.destroy();
    });

    it("should tell if it has errors", function(){
      expect(state.get('hasErrors')).toBe(false);
      SC.run(function(){ state.get('errors').pushObject('error!'); });
      expect(state.get('hasErrors')).toBe(true);
    });

    it("should get dirty", function(){
      expect(state.get('dirty')).toBe(false);

      var testDirty = function(attr, data){
        SC.run(function(){ state.set(attr, data || 'new'); });
        expect(state.get('dirty')).toBe(true);
        SC.run(function(){ state.set('dirty', false); });
      };

      testDirty('javascript');
      testDirty('template');
      testDirty('console');
      testDirty('consoleHistory', []);

      SC.run(function(){ state.get('consoleHistory').pushObject('item'); });
      expect(state.get('dirty')).toBe(true);
    });

    it("should be copyable", function(){
      SC.run(function(){
        state.set('dirty', true);
        state.set('errors', ['ERROR']);
      });

      var state2 = state.copy();

      expect(state2.get('javascript')).toBe(state.get('javascript'));
      expect(state2.get('template')).toBe(state.get('template'));
      expect(state2.get('console')).toBe(state.get('console'));
      expect(state2.get('dirty')).toBe(state.get('dirty'));
      expect(state2.get('consoleHistory')).toBe(state.get('consoleHistory'));
      expect(state2.get('errors')).toBe(state.get('errors'));

      state2.destroy();
    });

    it("should be deep copyable", function(){
      SC.run(function(){
        state.set('dirty', true);
        state.set('errors', ['ERROR']);
      });

      var state2 = state.copy(true);

      // toEqual should work, but for some reason it doesn't
      expect(state2.get('consoleHistory')).not.toBe(state.get('consoleHistory'));
      expect(state2.get('consoleHistory').length).toEqual(1);
      expect(state2.get('consoleHistory')[0]).toEqual(state.get('consoleHistory')[0]);
      expect(state2.get('errors')).not.toBe(state.get('errors'));
      expect(state2.get('errors').length).toEqual(1);
      expect(state2.get('errors')[0]).toEqual(state.get('errors')[0]);

      state2.destroy();
    });
  });

  describe("Step", function(){
    var step;

    beforeEach(function(){
      step = Tutorial.Step.create({
        template: 'TEMPLATE',
        code:     'a = 1'
      });
    });

    afterEach(function(){
      step.destroy();
    });

    it("should create template body", function(){
      expect(step.get('templateBody')).toMatch('TEMPLATE');
      expect(step.get('templateBody')).toMatch('<pre class="prettyprint lang-js">a = 1</pre>');
      expect(step.get('templateBody')).toMatch('Do it for me');

      SC.run(function(){ step.set('code', null); });

      expect(step.get('templateBody')).not.toMatch('<pre class="prettyprint lang-js">');
      expect(step.get('templateBody')).not.toMatch('Do it for me');
    });

    it("should set state when current", function(){
      var state = Tutorial.State.create({ javascript: 'JAVASCRIPT' }),
          previous = Tutorial.Step.create({ state: state });

      SC.run(function(){ step.set('previousStep', previous); });

      expect(step.get('state')).toBeNull();

      step.didBecomeCurrent();

      var newState = step.get('state');
      expect(newState.get('javascript')).toBe(state.get('javascript'));
      expect(newState).not.toBe(state);
    });
  });
});
