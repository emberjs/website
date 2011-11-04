Tutorial = SC.Application.create({
  rootElement: $('#tutorial'),

  scrollBodyToElement: function(element){
    element = SC.$(element);
    if (element.length === 0) { return; }

    var body = SC.$('body'),
        elementHeight = element.height(),
        windowHeight = SC.$(window).height(),
        currentOffset = body.scrollTop(),
        maximumOffset = element.offset().top - 10,
        minimumOffset = maximumOffset + elementHeight - windowHeight + 20;

    if (currentOffset > maximumOffset || elementHeight > windowHeight) {
      body.animate({ scrollTop: maximumOffset  }, 200);
    } else if (currentOffset < minimumOffset) {
      body.animate({ scrollTop: minimumOffset }, 200);
    }
  },

  ready: function(){
    this._super();
    Tutorial.tutorialController.resetIframe();
  }
});

/************ MODELS ***************/

Tutorial.State = SC.Object.extend(SC.Copyable, {

  javascript: null,
  template: null,
  console: null,
  consoleHistory: null,

  errors: [],

  hasErrors: function(){
    return this.get('errors').length > 0;
  }.property('errors.[]').cacheable(),

  dirty: false,

  _gotDirty: function(){
    this.set('dirty', true);
  }.observes('javascript', 'template', 'console', 'consoleHistory.[]'),

  copy: function(deep){
    var basicAttrs = Tutorial.State.BASIC_ATTRIBUTES,
        deepAttrs = Tutorial.State.DEEP_ATTRIBUTES,
        data = {};

    if (deep) {
      deepAttrs.forEach(function(attr){
        data[attr] = JSON.parse(JSON.stringify(this.get(attr)));
      }, this);
    } else {
      basicAttrs = basicAttrs.concat(deepAttrs);
    }

    basicAttrs.forEach(function(attr){ data[attr] = this.get(attr); }, this);

    return this.constructor.create(data);
  }

});

Tutorial.State.BASIC_ATTRIBUTES = ['javascript', 'template', 'console', 'dirty'];
Tutorial.State.DEEP_ATTRIBUTES  = ['consoleHistory', 'errors'];


Tutorial.Step = SC.Object.extend({
  // Linked List
  nextStep: null,
  previousStep: null,

  // Template string
  template: '',

  // Body of template
  templateBody: function(){
    var template     = this.get('template') || '',
        code         = this.get('code'),
        codeLanguage = this.get('codeLanguage');

    if (code) {
      var escapedCode = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                            .replace(/{/g, "&#123;").replace(/}/g, "&#125;");
      template += "<pre class=\"prettyprint lang-"+codeLanguage+"\">"+escapedCode+"</pre>\n"+
                  "{{#view SC.Button classNames=\"small btn\" target=\"Tutorial.tutorialController\" action=\"copyAndGotoNextStep\"}}Do it for me{{/view}}"
    }

    return template;
  }.property('template', 'code', 'codeLanguage').cacheable(),

  // Template to show in view
  templateObject: function(){
    return SC.Handlebars.compile(this.get('templateBody'));
  }.property('templateBody').cacheable(),

  // 'javascript', 'template', 'console'
  codeTarget: null,

  // Code language
  codeLanguage: 'js',

  // Code to insert
  code: null,

  state: null,

  didBecomeCurrent: function(){
    if (!this.get('state')) {
      var previousState = this.getPath('previousStep.state'),
          state = previousState ? SC.copy(previousState, true) : Tutorial.State.create();
      this.set('state', state);
    }
  }

});


/************ CONTROLLERS ***********/

Tutorial.tutorialController = SC.Object.create({
  iframeContainer: SC.$('#tutorial-output'),
  iframe: null,

  resetIframe: function(){
    var current = this.get('iframe');
    if (current){ SC.$(current).remove(); }

    var iframe = SC.$('<iframe></iframe>').appendTo(this.get('iframeContainer'))[0];
    iframe.contentWindow.document.write(
      '<html>'+
        '<head>'+
          '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>'+
          '<script src="/scripts/sproutcore.js"></script>'+
          '<link href="/styles/iframe.css" rel="stylesheet">'+
        '</head>'+
        '<body></body>'+
      '</html>'
    );

    this.set('iframe', iframe);
    return iframe;
  },

  evalContext: function(){
    return this.get('iframe').contentWindow;
  }.property('iframe').cacheable(),

  evalApp: function(){
    this.resetIframe();
    var evalContext = this.get('evalContext'),
        state = this.get('state');

    evalContext.SC.run(function(){
      try {
        evalContext.eval(state.get('javascript'));
      } catch (error) {
        return "JavaScript Error: "+error.toString();
      }

      if (evalContext.MyApp){
        try {
          var template = state.get('template');
          if (template) {
            evalContext.MyApp.rootView = evalContext.SC.View.create({
              template: evalContext.SC.Handlebars.compile(template)
            });
            evalContext.MyApp.rootView.appendTo(evalContext.document.body);
          }
        } catch (error) {
          return "Template Error: "+error.toString();
        }
      }
    });

    return true;
  },

  evalConsole: function(){
    var evalContext = this.get('evalContext'),
        history = this.getPath('state.consoleHistory');

    // Playback
    if (history) {
      history.forEach(function(item){
        var success = item.results.some(function(r){ return r.type === 'success'; });
        if (success) {
          try {
            evalContext.eval(item.command);
          } catch(error) {
            console.warn("Unable to play back command:", item.command, error);
          }
        }
      });
    }

    // Run any un-run commands
    Tutorial.consoleController.runCommand();

    return true;
  },

  evalState: function(force){
    var state = this.get('state');

    //if (state.get('dirty') || force) {
      state.set('errors', []);

      var result = this.evalApp();
      if (result === true) { result = this.evalConsole(); }

      if (result !== true) {
        state.set('errors', [result]);
      }

      this.set('dirty', false);
    //}
  },

  currentStep: null,
  firstStep: null,
  lastStep: null,

  // Convenience
  stateBinding: 'currentStep.state',
  previousStepBinding: 'currentStep.previousStep',
  nextStepBinding: 'currentStep.nextStep',
  hasPreviousStepBinding: SC.Binding.from('previousStep').bool(),
  hasNextStepBinding: SC.Binding.from('nextStep').bool(),

  addStep: function(step){
    if (!(step instanceof Tutorial.Step)) {
      step = Tutorial.Step.create(step);
    }

    var currentStep = this.get('currentStep'),
        firstStep = this.get('firstStep'),
        lastStep = this.get('lastStep');

    if (lastStep){
      lastStep.set('nextStep', step);
      step.set('previousStep', lastStep);
    }

    if (!currentStep) {
      this.set('currentStep', step);
      step.didBecomeCurrent();
    }

    if (!firstStep) { this.set('firstStep', step); }

    this.set('lastStep', step);
  },

  gotoPreviousStep: function(){
    var previousStep = this.get('previousStep');
    if (previousStep) {
      this.set('currentStep', previousStep);
      SC.run.schedule('sync', this, this.evalState);
    }
  },

  gotoNextStep: function(){
    var currentStep = this.get('currentStep'),
        nextStep = this.get('nextStep');

    if (!nextStep) { return };

    // Without this SC.run.next, the iframe may not be ready
    SC.run.next(this, function(){
      if (this.validate()) {
        // Without this SC.run.schedule, the console won't be up to date and won't get run
        SC.run.schedule('sync', this, function(){
          this.set('currentStep', nextStep);
          nextStep.didBecomeCurrent();
          SC.run.schedule('sync', this, this.evalState);
        });
      }
    });
  },

  copyCode: function(){
    var step = this.get('currentStep'),
        state = step.get('state'),
        codeTarget = step.get('codeTarget'),
        code = step.get('code')
    if (codeTarget && code) {
      if (codeTarget !== 'console') {
        var current = state.get(codeTarget);
        if (current) { code = current + "\n\n" + code; }
      }
      state.set(codeTarget, code);
    }
  },

  copyAndGotoNextStep: function(){
    this.copyCode();
    this.gotoNextStep();
  },

  // Validation

  errors: [],

  hasErrors: function(){
    return this.get('errors').length > 0;
  }.property('errors.[]').cacheable(),

  validator: null,

  validateStep: function(step){
    var previous = step.get('previousStep'),
        result = previous ? this.validateStep(previous) : true;

    if (result === true) {
      var validator = step.get('validator');
      if (validator) { result = validator(this.get('evalContext')); }
    }

    return result;
  },

  validate: function(){
    var state = this.get('state'),
        errors = [];

    this.evalState();

    if (state.get('hasErrors')) {
      errors = errors.concat(state.get('errors'));
    } else {
      var result = this.validateStep(this.get('currentStep'));
      if (result !== true) { errors.push(result); }
    }

    this.set('errors', errors);

    return errors.length === 0;
  }

});

Tutorial.tutorialController.addStep({
  template: "<strong>Welcome.</strong> To get a feel for Amber, follow along this quick tutorial."
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 1:</strong> Create your app",
  codeTarget: 'javascript',
  code: "MyApp = SC.Application.create();",
  validator: function(context){
    if (context.MyApp instanceof context.SC.Application) { return true; }
    return "Couldn't find valid MyApp instance";
  }
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 2:</strong> Create a model",
  codeTarget: 'javascript',
  code: "// model\n"+
        "MyApp.Person = SC.Object.extend({\n"+
        "  firstName: null,\n"+
        "  lastName: null\n"+
        "});",
  validator: function(context){
    if (context.MyApp.Person && context.MyApp.Person.superclass === context.SC.Object) { return true; }
    return "Couldn't find valid MyApp.Person class";
  }
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 3:</strong> Create an array",
  codeTarget: 'javascript',
  code: "// controller\n"+
        "MyApp.people = [];",
  validator: function(context){
    if (context.MyApp.people && context.MyApp.people.constructor === context.Array) { return true; }
    return "Couldn't find Array named MyApp.people";
  }
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 4:</strong> Create a view and append it",
  codeTarget: 'template',
  codeLanguage: 'html',
  code: "<!-- view -->\n"+
        "People:\n"+
        "<ul>\n"+
        "{{#each MyApp.people}}\n"+
        "  <li>{{firstName}} {{lastName}}</li>\n"+
        "{{/each}}\n"+
        "</ul>",
  validator: function(context){
    var rootView = context.MyApp && context.MyApp.rootView,
        eachView = rootView && context.MyApp.rootView.get('_childViews').find(function(v){
          return ((v instanceof context.SC.CollectionView) &&
                  (v.getPath('contentBinding._from') === 'MyApp.people'));
        });

    if (eachView) {
      return true;
    } else {
      return "No {{#each MyApp.people}} helper found";
    }
  }
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 5:</strong> Add yourself to the array",
  codeTarget: 'console',
  code: "me = MyApp.Person.create({\n"+
        "  firstName: \"Yehuda\",\n"+
        "  lastName: \"Katz\"\n"+
        "});\n"+
        "MyApp.people.pushObject(me);"
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 6:</strong> Add someone else to the array",
  codeTarget: 'console',
  code: "tom = MyApp.Person.create({\n"+
        "  firstName: \"Tom\",\n"+
        "  lastName: \"Dale\",\n"+
        "});\n"+
        "MyApp.people.pushObject(tom);"
});

Tutorial.tutorialController.addStep({
  template: "<strong>Step 7:</strong> Modify yourself",
  codeTarget: 'console',
  code: "me.set('firstName', 'Brohuda');"
});

Tutorial.tutorialController.addStep({
  template: "<strong>Congratulations!</strong> You've just created your first Amber application!"
});


Tutorial.editorTabController = SC.TabController.create({
  currentTab: 'javascript'
});

Tutorial.consoleController = SC.SandboxedConsoleController.create({
  valueBinding: "Tutorial.tutorialController.state.console",
  historyBinding: "Tutorial.tutorialController.state.consoleHistory",

  iframeDidChange: function(){
    this._iframe = Tutorial.tutorialController.get('iframe');
  }.observes('Tutorial.tutorialController.iframe'),

  resetSandbox: function(){
    Tutorial.tutorialController.resetIframe();
  }
});



/************ VIEWS ************/

Tutorial.StepsView = SC.View.extend({
  step: null,

  tabController: null,

  template: function(){
    return this.getPath('step.templateObject');
  }.property('step.templateObject').cacheable(),

  // This shouldn't be necessary
  templateDidChange: function(){
    this.rerender();

    SC.run.schedule('render', this, function(){
      // Run prettyPrint again now that code is visible
      if (this.getPath('step.code')){ prettyPrint(); }

      Tutorial.scrollBodyToElement(this.$());
    });
  }.observes('template'),

  codeTargetDidChange: function(){
    var tabController = this.get('tabController'),
        codeTarget = this.getPath('step.codeTarget');
    if (tabController && codeTarget) {
      tabController.set('currentTab', codeTarget);
    }
  }.observes('step.codeTarget')

});

Tutorial.TabView = SC.Button.extend({
  classNameBindings: ['active'],

  tagName: 'li',
  // TODO: The 'a' tag is for styling, remove it when we fix up the styles
  template: SC.Handlebars.compile("<a href='#' onclick='return false;'>{{title}}</a>"),
  type: null,

  targetObject: function() {
    return SC.stringToObject(this, this.get('controller'));
  }.property('controller').cacheable(),

  action: 'changeTabTo',

  active: function(){
    return this.get('tabName') === this.getPath('targetObject.currentTab');
  }.property('tabName', 'targetObject.currentTab').cacheable()
});

Tutorial.AceEditorView = SC.AceEditorView.extend({
  // Also observe parent visibility
  _fixSize: function(){
    if (this.get('isVisible') && this.getPath('parentView.isVisible')) {
      var editor = this.get('editor');
      if (editor) { setTimeout(function(){ editor.resize(); }, 1); }
    }
  }.observes('isVisible', 'parentView.isVisible')
});
