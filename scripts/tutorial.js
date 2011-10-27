// Simple little hack to track new apps we create
SC.Application.applications = {};
SC.Application.reopen({
  init: function(){
    this._super();
    var rootElement = SC.$(this.get('rootElement')),
        id = rootElement.selector || rootElement[0].tagName;
    SC.Application.applications[id] = this;
  }
});  

Tutorial = SC.Application.create({
  rootElement: $('#tutorial')
});

Tutorial.tutorialController = SC.Object.create({
  javascript: null,
  template: null,

  boot: function(){
    // Free up the div if we've run this before
    var existing = SC.Application.applications['#tutorial-app'];
    if (existing) { existing.destroy(); }

    var MyApp = eval("(function(){ "+this.get('javascript')+"; window.MyApp = MyApp; return MyApp; })()");
    if (!MyApp){ throw "No app created!"; }

    MyApp.rootView = SC.View.create({
      template: SC.Handlebars.compile(this.get('template'))
    });
    MyApp.rootView.appendTo(MyApp.get('rootElement'));
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

Tutorial.JSConsoleView = SC.ConsoleView.extend({
});
