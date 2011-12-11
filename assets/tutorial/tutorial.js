window.Tutorial = SC.Application.create({
  rootElement: '#content'
});

/**** MODELS ****/

Tutorial.Step = SC.Object.extend({
  controller: null,

  body: null,

  codeTarget: null,
  codeLanguage: 'javascript',
  code: null,
  validator: SC.K,

  startingJavascript: null,
  startingTemplate: null,
  startingConsoleHistory: null,

  isCurrent: function(){
    return Tutorial.tutorialController.get('currentStep') === this;
  }.property('Tutorial.tutorialController.currentStep').cacheable(),

  errors: null,

  addError: function(error) {
    this.get('errors').pushObject(error);
  },

  validate: function(context) {
    // TODO: Clean this up
    var steps = Tutorial.tutorialController.get('steps'),
        stepIndex = steps.indexOf(this),
        previousStep = stepIndex > 0 ? steps.objectAt(stepIndex-1) : null,
        errors = [];

    this.set('errors', errors);

    if (previousStep) {
      previousStep.validate(context);
      errors.pushObjects(previousStep.get('errors'));
    }

    if (errors.length === 0) {
      this.validator(context);
    }

    return errors.length === 0;
  }
});

/**** CONTROLLERS ****/

Tutorial.tutorialController = SC.Object.create({
  javascript: null,
  template: null,
  consoleHistory: null,

  steps: [],
  currentIndex: -1,

  stepWidth: 540, // Including padding and margin

  containerWidth: function(){
    return this.get('stepWidth') * this.getPath('steps.length');
  }.property('stepWidth', 'steps.length').cacheable(),

  scrollPosition: function(){
    var index = this.get('currentIndex'),
        stepWidth = this.get('stepWidth');
    if (index < 0) { index = 0; }
    return index * stepWidth;
  }.property('stepWidth', 'currentIndex').cacheable(),

  currentStep: function(){
    var steps = this.get('steps'),
        currentIndex = this.get('currentIndex');
    if (currentIndex > -1) { return steps.objectAt(currentIndex); }
  }.property('steps.[]', 'currentIndex').cacheable(),

  addStep: function(step) {
    if (!(step instanceof Tutorial.Step)) {
      step = Tutorial.Step.create(step);
    }

    var steps = this.get('steps'),
        currentIndex = this.get('currentIndex');

    steps.addObject(step);

    if (currentIndex < 0) { this.set('currentIndex', 0); }

    return step;
  },

  hasNextStep: function() {
    return this.get('currentIndex') < this.getPath('steps.length') - 1;
  }.property('steps.length', 'currentIndex').cacheable(),

  hasPreviousStep: function() {
    return this.get('currentIndex') > 0;
  }.property('currentIndex').cacheable(),

  gotoNextStep: function() {
    console.log('gotoNextStep');
    if (this.get('hasNextStep')) {
      var currentStep = this.get('currentStep');

      this.evalCode();

      if (currentStep.get('codeTarget') === 'console') {
        Tutorial.consoleController.runCommand();
      }

      var iframe = this.get('iframe'),
          context = iframe ? iframe.contentWindow : null;

      if (currentStep.validate(context)) {
        this.incrementProperty('currentIndex');
        var nextStep = this.get('currentStep');
        nextStep.beginPropertyChanges();
        nextStep.set('startingJavascript', this.get('javascript'));
        nextStep.set('startingTemplate', this.get('template'));
        nextStep.set('startingConsoleHistory', SC.copy(this.get('consoleHistory')));
        nextStep.set('errors', []);
        nextStep.endPropertyChanges();
      }
    }
  },

  gotoPreviousStep: function() {
    if (this.get('hasPreviousStep')) {
      this.decrementProperty('currentIndex');

      var previousStep = this.get('currentStep');

      this.beginPropertyChanges();
      this.set('javascript', previousStep.get('startingJavascript'));
      this.set('template', previousStep.get('startingTemplate'));
      this.set('consoleHistory', SC.copy(previousStep.get('startingConsoleHistory')));
      this.endPropertyChanges();

      this.evalCode(true);
    }
  },

  resetStep: function() {
    var currentStep = this.get('currentStep');
    if (currentStep) {
      this.beginPropertyChanges();
      this.set('javascript', currentStep.get('startingJavascript'));
      this.set('template', currentStep.get('startingTemplate'));
      this.set('consoleHistory', currentStep.get('startingConsoleHistory'));
      currentStep.set('errors', []);
      this.endPropertyChanges();

      this.evalCode(true);
    }
  },

  currentStepDidChange: function() {
    var codeTarget = this.getPath('currentStep.codeTarget');
    if (codeTarget) { Tutorial.editorTabController.set('currentTab', codeTarget); }
  }.observes('currentStep'),

  copyStepCode: function() {
    var currentStep = this.get('currentStep'),
        codeTarget = currentStep.get('codeTarget'),
        code = currentStep.get('code');

    if (codeTarget && code) {
      var codeBefore = currentStep.get('codeBefore'),
          codeAfter  = currentStep.get('codeAfter');

      if (codeBefore) { code = codeBefore+code; }
      if (codeAfter)  { code = code+codeAfter; }

      var replacesCode = currentStep.get('replacesCode'),
          afterCode = currentStep.get('afterCode'),
          current = this.get(codeTarget) || '';

      if (replacesCode) {
        if (current.indexOf(replacesCode) > -1) {
          code = current.replace(replacesCode, code);
        } else {
          alert("Unable to do this step for you. Sorry!");
          return false;
        }
      } else if (afterCode) {
        var matchIdx = current.indexOf(afterCode)
        if (matchIdx > -1) {
          var beforeLen = matchIdx+afterCode.length;
          code = current.slice(0, beforeLen)+"\n"+code+"\n"+current.slice(beforeLen);
        } else {
          alert("Unabled to do this step for you. Sorry!");
          return false;
        }
      } else {
        if (current){ current += "\n\n"; }
        code = current+code;
      }
      this.set(codeTarget, code);
    }
    return true;
  },

  copyStepCodeAndAdvance: function() {
    // Runloop is necessary for the console commands to get run properly
    var copied = SC.run(this, this.copyStepCode);
    if (copied) { this.gotoNextStep(); }
  },

  // For development use only
  _fastForwardSteps: function(amount) {
    if (amount < 1) { return; }
    var self = this;
    SC.run.later(function(){
      self.copyStepCodeAndAdvance();
      self._fastForwardSteps(amount-1);
    }, 1000);
  },

  iframeContainer: '#tutorial-output',

  iframe: null,

  resetIframe: function() {
    var current = this.get('iframe');
    if (current){ SC.$(current).remove(); }

    var container = SC.$(this.get('iframeContainer')),
        iframe = SC.$('<iframe></iframe>').appendTo(container)[0];

    iframe.contentWindow.document.write(
      '<html>'+
        '<head>'+
          '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>'+
          '<script src="/scripts/sproutcore.js"></script>'+
          '<link href="/tutorial/todos.css" rel="stylesheet">'+
        '</head>'+
        '<body></body>'+
      '</html>'
    );

    this.set('iframe', iframe);
    return iframe;
  },

  evalCode: function(iframeNeedsReset) {
    var iframe = this.get('iframe');
    if (!iframe) { iframeNeedsReset = true; }

    // Prep Javascript
    var startingJavascript = this.getPath('currentStep.startingJavascript'),
        javascript = this.get('javascript'),
        javascriptForEval;

    if (!startingJavascript || iframeNeedsReset) {
      javascriptForEval = javascript;
    } else if (javascript.substr(0,startingJavascript.length) === startingJavascript) {
      javascriptForEval = javascript.substr(startingJavascript.length);
    } else {
      // All the code seems to have changed, redo it all
      javascriptForEval = javascript;
      iframeNeedsReset = true;
    }

    // Reset if needed
    if (iframeNeedsReset) { iframe = this.resetIframe(); }

    var context = iframe.contentWindow;

    // Run Javascript
    if (javascriptForEval) {
      try {
        context.eval(javascriptForEval);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    if (context.Todos) {
      // Hack since this doesn't get called correctly
      if (!context.Todos.isReady) {
        context.Todos.ready();
        context.Todos.isReady = true;
      }

      // Run Template
      var template = this.get('template');
      if (context.Todos.rootView) {
        context.SC.run(function() {
          context.Todos.rootView.set('template', template ? context.SC.Handlebars.compile(template) : null);
          context.Todos.rootView.rerender();
        });
      } else if (template) {
        context.SC.run(function() {
          context.Todos.rootView = context.SC.View.create({
            template: context.SC.Handlebars.compile(template)
          });
          context.Todos.rootView.appendTo(context.document.body);
        });
      }
    }

    // Playback previous console if needed
    var consoleHistory = this.get('consoleHistory');
    if (consoleHistory && iframeNeedsReset) {
      consoleHistory.forEach(function(item) {
        var success = item.results && item.results.some(function(r){ return r.type === 'success'; });
        if (success) {
          try {
            context.eval(item.command);
          } catch(error) {
            console.warn("Unable to play back command:", item.command, error);
          }
        }
      });
    }
  }

});

Tutorial.editorTabController = SC.TabController.create({
  currentTab: 'javascript'
});

Tutorial.consoleController = SC.SandboxedConsoleController.create({
  valueBinding: "Tutorial.tutorialController.console",
  historyBinding: "Tutorial.tutorialController.consoleHistory",

  iframeDidChange: function() {
    this._iframe = Tutorial.tutorialController.get('iframe');
  }.observes('Tutorial.tutorialController.iframe'),

  resetSandbox: function() {
    Tutorial.tutorialController.resetIframe();
  }
});

/**** VIEWS ****/

Tutorial.InstructionsView = SC.View.extend({
  classNames: ['instructions'],

  scrollLeft: 0,

  scrollLeftDidChange: function(){
    console.log('scrollLeftDidChange', this.get('scrollLeft'));
    this.$().scrollLeft(this.get('scrollLeft'));
  }.observes('scrollLeft')
});

Tutorial.StepsContainerView = SC.View.extend({
  classNames: ['steps-container'],
  attributeBindings: ['style'],

  width: 0,

  style: function(){
    return "width: %@px".fmt(this.get('width'));
  }.property('width').cacheable()
});

Tutorial.StepView = SC.View.extend({
  classNames: ['step'],
  classNameBindings: ['step.isCurrent:active'],

  step: null
});

// The main purpose of this is styling
Tutorial.TabView = SC.Button.extend({
  classNameBindings: ['active'],

  tagName: 'li',
  template: SC.Handlebars.compile("<a href='#' onclick='return false;'>{{title}}</a>"),
  type: null,

  targetObject: function() {
    return SC.stringToObject(this, this.get('controller'));
  }.property('controller').cacheable(),

  action: 'changeTabTo',

  active: function() {
    return this.get('tabName') === this.getPath('targetObject.currentTab');
  }.property('tabName', 'targetObject.currentTab').cacheable()
});

Tutorial.PrettyPrintView = SC.View.extend({
  tagName: 'pre',

  classNames: ['prettyprint'],
  classNameBindings: ['languageClass'],

  language: null,

  languageClass: function() {
    var language = this.get('language');
    switch(language) {
      case 'javascript':
        return 'lang-js';
      case 'template':
        return 'lang-html'
      default:
        return 'lang-'+language;
    }
  }.property('language').cacheable(),

  didInsertElement: function() {
    prettyPrint();
  }
});

Tutorial.AceEditorView = SC.AceEditorView.extend({
  // Also observe parent visibility
  _fixSize: function() {
    if (this.get('isVisible') && this.getPath('parentView.isVisible')) {
      var editor = this.get('editor');
      if (editor) { setTimeout(function(){ editor.resize(); }, 1); }
    }
  }.observes('isVisible', 'parentView.isVisible')
});

/**** MOAR ****/

/*
Tutorial.loadSteps = function() {
  Tutorial.tutorialController.addStep({
    body: "<strong>Welcome.</strong> To get a feel for Amber, follow along this quick tutorial."
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Create your app</strong>",
    codeTarget: 'javascript',
    code: "MyApp = SC.Application.create();",
    validator: function(context) {
      if (!(context.MyApp instanceof context.SC.Application)) {
        this.addError("Couldn't find valid MyApp instance");
      }
    }
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Create a model</strong>",
    codeTarget: 'javascript',
    code: "// model\n"+
          "MyApp.Person = SC.Object.extend({\n"+
          "  firstName: null,\n"+
          "  lastName: null\n"+
          "});",
    validator: function(context) {
      if (!context.MyApp.Person || context.MyApp.Person.superclass !== context.SC.Object) {
        this.addError("Couldn't find valid MyApp.Person class");
      }
    }
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Create an array</strong>",
    codeTarget: 'javascript',
    code: "// controller\n"+
          "MyApp.people = [];",
    validator: function(context) {
      if (!context.MyApp.people || context.MyApp.people.constructor !== context.Array) {
        this.addError("Couldn't find Array named MyApp.people");
      }
    }
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Create a view and append it</strong>",
    codeTarget: 'template',
    codeLanguage: 'html',
    code: "<!-- view -->\n"+
          "People:\n"+
          "<ul>\n"+
          "{{#each MyApp.people}}\n"+
          "  <li>{{firstName}} {{lastName}}</li>\n"+
          "{{/each}}\n"+
          "</ul>",
    validator: function(context) {
      var rootView = context.MyApp && context.MyApp.rootView,
          eachView = rootView && context.MyApp.rootView.get('_childViews').find(function(v) {
            return ((v instanceof context.SC.CollectionView) &&
                    (v.getPath('contentBinding._from') === 'MyApp.people'));
          });

      if (!eachView) {
        this.addError("No {{#each MyApp.people}} helper found");
      }
    }
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Add yourself to the array</strong>",
    codeTarget: 'console',
    code: "me = MyApp.Person.create({\n"+
          "  firstName: \"Yehuda\",\n"+
          "  lastName: \"Katz\"\n"+
          "});\n"+
          "MyApp.people.pushObject(me);",
    validator: function(context) {
      if (!(context.me instanceof context.MyApp.Person)) {
        this.addError("Expected 'me' to be an instance of MyApp.Person");
      } else if (!context.MyApp.people.contains(context.me)) {
        this.addError("MyApp.people should contain 'me'");
      }
    }
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Add someone else to the array</strong>",
    codeTarget: 'console',
    code: "friend = MyApp.Person.create({\n"+
          "  firstName: \"Tom\",\n"+
          "  lastName: \"Dale\",\n"+
          "});\n"+
          "MyApp.people.pushObject(friend);",
    validator: function(context) {
      if (!(context.friend instanceof context.MyApp.Person)) {
        this.addError("Expected 'friend' to be an instance of MyApp.Person");
      } else if (!context.MyApp.people.contains(context.friend)) {
        this.addError("MyApp.people should contain 'friend'");
      }
    }
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Modify yourself</strong>",
    codeTarget: 'console',
    code: "me.set('firstName', 'Peter');\n"+
          "me.set('lastName', 'Wagenet');"
  });

  Tutorial.tutorialController.addStep({
    body: "<strong>Congratulations!</strong> You've just created your first Amber application!"
  });
};
*/
