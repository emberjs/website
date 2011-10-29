Tutorial = SC.Application.create({
  rootElement: $('#tutorial'),

  ready: function(){
    this._super();
    Tutorial.tutorialController.resetIframe();
  }
});

/************ MODELS ***************/

Tutorial.Step = SC.Object.extend({
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
                  "{{#view SC.Button classNames=\"small btn\" target=\"parentView.step\" action=\"copyCode\"}}Do it for me{{/view}}"
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

  copyCode: function(){
    var codeTarget = this.get('codeTarget'),
        code = this.get('code'),
        codeController = this.get('codeController');
    if (codeTarget && code && codeController) {
      var current = '';
      if (codeTarget !== 'console') {
        current = codeController.get(codeTarget) || '';
        if (current) { current = current + "\n\n"; }
      }
      codeController.setAndEval(codeTarget, current+code);
    }
  }
});


/************ CONTROLLERS ***********/

Tutorial.tutorialController = SC.Object.create({
  javascript: null,
  template: null,
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

  evalApp: function(){
    var iframe = this.get('iframe') || this.resetIframe(),
        target = iframe.contentWindow;

    target.eval(this.get('javascript'));
    if (target.MyApp){
      var template = this.get('template');
      if (template) {
        target.MyApp.rootView = target.SC.View.create({
          template: target.SC.Handlebars.compile(template)
        });
        target.MyApp.rootView.appendTo(target.document.body);
      }
    }
  },

  setAndEval: function(key, value){
    this.set(key, value);
    if (key === 'console') {
      // Make sure binding has updated
      SC.run.schedule('sync', Tutorial.consoleController, 'runCommand');
    } else {
      this.evalApp();
    }
  }
});

Tutorial.stepsController = SC.TabController.create({
  steps: [
    Tutorial.Step.create({
      template: "<strong>Welcome.</strong> To get a feel for Amber, follow along this quick tutorial."
    }),
    Tutorial.Step.create({
      template: "<strong>Step 1:</strong> Create your app",
      codeTarget: 'javascript',
      code: "MyApp = SC.Application.create();"
    }),
    Tutorial.Step.create({
      template: "<strong>Step 2:</strong> Create a model",
      codeTarget: 'javascript',
      code: "// model\n"+
            "MyApp.Person = SC.Object.extend({\n"+
            "  firstName: null,\n"+
            "  lastName: null\n"+
            "});"
    }),
    Tutorial.Step.create({
      template: "<strong>Step 3:</strong> Create an array",
      codeTarget: 'javascript',
      code: "// controller\n"+
            "MyApp.people = [];"
    }),
    Tutorial.Step.create({
      template: "<strong>Step 4:</strong> Create a view and append it",
      codeTarget: 'template',
      codeLanguage: 'html',
      code: "<!-- view -->\n"+
            "People:\n"+
            "<ul>\n"+
            "{{#each MyApp.people}}\n"+
            "  <li>{{firstName}} {{lastName}}</li>\n"+
            "{{/each}}\n"+
            "</ul>"
    }),
    Tutorial.Step.create({
      template: "<strong>Step 5:</strong> Add yourself to the array",
      codeTarget: 'console',
      code: "me = MyApp.Person.create({\n"+
            "  firstName: \"Yehuda\",\n"+
            "  lastName: \"Katz\"\n"+
            "});\n"+
            "MyApp.people.pushObject(me);"
    }),
    Tutorial.Step.create({
      template: "<strong>Step 6:</strong> Add someone else to the array",
      codeTarget: 'console',
      code: "tom = MyApp.Person.create({\n"+
            "  firstName: \"Tom\",\n"+
            "  lastName: \"Dale\",\n"+
            "});\n"+
            "MyApp.people.pushObject(tom);"
    }),
    Tutorial.Step.create({
      template: "<strong>Step 7:</strong> Modify yourself",
      codeTarget: 'console',
      code: "me.set('firstName', 'Brohuda');"
    }),
    Tutorial.Step.create({
      template: "<strong>Congratulations!</strong> You've just created your first Amber application!"
    })
  ],

  currentStepIndex: 0,

  currentStep: function(){
    return this.get('steps').objectAt(this.get('currentStepIndex'));
  }.property('currentStepIndex').cacheable(),

  hasPrevious: function(){
    return this.get('currentStepIndex') > 0;
  }.property('currentStepIndex').cacheable(),

  hasNext: function(){
    return this.get('currentStepIndex') < this.getPath('steps.length')-1;
  }.property('currentStepIndex', 'steps.length').cacheable(),

  previousTab: function(){
    if (this.get('hasPrevious')) {
      this.set('currentStepIndex', this.get('currentStepIndex') - 1);
    }
  },

  nextTab: function(){
    if (this.get('hasNext')) {
      this.set('currentStepIndex', this.get('currentStepIndex') + 1);
    }
  }

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

    if (this.getPath('step.code')) {
      // Run prettyPrint again now that code is visible
      SC.run.schedule('render', this, function(){ prettyPrint(); });
    }
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
