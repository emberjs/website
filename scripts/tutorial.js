Tutorial = SC.Application.create({
  rootElement: $('#tutorial')
});

Tutorial.tutorialController = SC.Object.create({
  javascript: null,
  template: null,

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
      '<body></body></html>'
    );

    this.set('iframe', iframe);
    return iframe;
  },

  boot: function(){
    var iframe = this.get('iframe') || this.resetIframe(),
        target = iframe.contentWindow;

    target.eval(this.get('javascript'));
    if (!target.MyApp){ throw "No app created!"; }

    target.MyApp.rootView = target.SC.View.create({
      template: target.SC.Handlebars.compile(this.get('template'))
    });
    target.MyApp.rootView.appendTo(target.document.body);
  }
});

Tutorial.stepsController = SC.TabController.create({
  stepNumber: 0,
  stepCount: 8, // Not including intro

  currentTab: function(){
    var stepNumber = this.get('stepNumber') || 0;
    return "step"+stepNumber;
  }.property('stepNumber').cacheable(),

  hasPrevious: function(){
    return this.get('stepNumber') > 0;
  }.property('stepNumber').cacheable(),
  
  hasNext: function(){
    return this.get('stepNumber') < this.get('stepCount');
  }.property('stepNumber', 'stepCount').cacheable(),

  previousTab: function(){
    if (this.get('hasPrevious')) {
      this.set('stepNumber', this.get('stepNumber') - 1);
    }  
  },

  nextTab: function(){
    if (this.get('hasNext')) {
      this.set('stepNumber', this.get('stepNumber') + 1);
    }      
  },

  /** HAX, body onload gets called too soon **/
  _currentTabDidChange: function(){
    if (!this._didPrettyPrint) {
      prettyPrint();
      this._didPrettyPrint = true;
    }
  }.observes('currentTab') 
});

Tutorial.editorTabController = SC.TabController.create({
  currentTab: 'jsTab'
});

Tutorial.TabView = SC.Button.extend({
  classNameBindings: ['active'],

  tagName: 'li',
  // TODO: The 'a' tag is for styling, remove it when we fix up the styles
  template: SC.Handlebars.compile("<a href='#' onclick='return false;'>{{title}}</a>"),
  type: null,

  targetObject: function() {
    var tabController = this.get('tabController');

    if (SC.typeOf(tabController) === "string") {
      return this.getPath(tabController);
    } else {
      return tabController;
    }
  }.property('tabController').cacheable(),
  
  action: 'changeTabTo',

  active: function(){
    return this.get('tabName') === this.getPath('targetObject.currentTab');
  }.property('tabName', 'targetObject.currentTab').cacheable()
});

Tutorial.AceEditorView = SC.AceEditorView.extend({
  _fixSize: function(){
    if (this.get('isVisible') && this.getPath('parentView.isVisible')) {
      var editor = this.get('editor');
      if (editor) { setTimeout(function(){ editor.resize(); }, 1); }
    }
  }.observes('isVisible', 'parentView.isVisible')
});

Tutorial.ConsoleView = SC.SandboxedConsoleView.extend({
  // TODO: Don't hardlink
  iframeDidChange: function(){
    this._iframe = Tutorial.tutorialController.get('iframe');
  }.observes('Tutorial.tutorialController.iframe'),

  resetSandbox: function(){
    Tutorial.tutorialController.resetIframe();
  }
});
