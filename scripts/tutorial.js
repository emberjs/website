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

  // TODO: Don't hardcode this
  codeControllerBinding: 'Tutorial.tutorialController',

  copyCode: function(skipScroll){
    // FIXME: Not the ideal place to put this
    if (!skipScroll) { Tutorial.scrollBodyToElement('#editor-tabs'); }

    var codeTarget = this.get('codeTarget'),
        code = this.get('code'),
        codeController = this.get('codeController');
    if (codeTarget && code && codeController) {
      var current = '';
      if (codeTarget !== 'console') {
        current = this.get(codeTarget+'State') || '';
        if (current) { current = current + "\n\n"; }
      }
      if (codeTarget === 'console') {
        codeController.set('console', current+code);
        codeController.evalConsole();
      } else {
        this.set(codeTarget+'State', current+code);
        //codeController.evalApp();
      }
    }
  },

  // State tracking

  javascriptState: null,
  templateState: null,

  error: null,

  validator: null,

  hasValidations: function(){
    return this.get('validator') || this.getPath('previousStep.hasValidations');
  }.property('validator', 'previousStep.hasValidations'),

  runValidations: function(){
    var previousStep = this.get('previousStep');
        result = previousStep ? previousStep.runValidations() : true;
    if (result === true) {
      var validator = this.get('validator');
      if (validator) { result = validator(this.getPath('codeController.evalContext')); }
    }

    return result;
  },

  validate: function(){
    if (!this.get('hasValidations')) { return true; }

    var codeController = this.get('codeController'),
        result;

    result = codeController.evalApp();
    if (result === true) { result = this.runValidations(); }

    if (result === true) {
      return true;
    } else {
      this.set('error', result || 'Unknown error');
      return false;
    }
  },

  didBecomeCurrent: function(){
    var previousStep = this.get('previousStep');
    if (previousStep) {
      if (!this.getPath('javascriptState')) {
        this.set('javascriptState', previousStep.get('javascriptState'));
      }
      if (!this.get('templateState')) {
        this.set('templateState', previousStep.get('templateState'));
      }
    }
  }

});


/************ CONTROLLERS ***********/

Tutorial.tutorialController = SC.Object.create({
  console: null,
  iframeContainer: SC.$('#tutorial-output'),
  iframe: null,

  resetIframe: function(){
    var current = this.get('iframe');
    if (current){ SC.$(current).remove(); }

    var iframe = SC.$('<iframe></iframe>').appendTo(this.get('iframeContainer'))[0];
    iframe.contentWindow.document.write(
      '<html><head>'+
        '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>'+
        '<script src="/scripts/sproutcore.js"></script></head>'+
        '<link href="/styles/iframe.css" rel="stylesheet">'+
      '<body></body></html>'
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
        step = this.get('currentStep');

    evalContext.SC.run(function(){
      try {
        evalContext.eval(step.get('javascriptState'));
      } catch (error) {
        return "JavaScript Error: "+error.toString();
      }

      if (evalContext.MyApp){
        try {
          var template = step.get('templateState');
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
    // Make sure binding has updated
    SC.run.schedule('sync', Tutorial.consoleController, 'runCommand');
  },

  currentStep: null,
  firstStep: null,
  lastStep: null,

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

    if (!currentStep) { this.set('currentStep', step); }
    if (!firstStep) { this.set('firstStep', step); }
    this.set('lastStep', step);
  },

  // Convenience
  previousStepBinding: 'currentStep.previousStep',
  nextStepBinding: 'currentStep.nextStep',
  hasPreviousStepBinding: SC.Binding.from('previousStep').bool(),
  hasNextStepBinding: SC.Binding.from('nextStep').bool(),

  gotoPreviousStep: function(){
    var previousStep = this.get('previousStep');
    if (previousStep) { this.set('currentStep', previousStep); }
  },

  gotoNextStep: function(){
    var currentStep = this.get('currentStep'),
        nextStep = this.get('nextStep');

    if (currentStep.validate() && nextStep) {
      this.set('currentStep', nextStep);
      nextStep.didBecomeCurrent();
    }
  },

  copyAndGotoNextStep: function(){
    this.get('currentStep').copyCode(true);
    this.gotoNextStep();
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
  valueBinding: "Tutorial.tutorialController.console",

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
