SC.TabController = SC.Object.extend({
  currentTab: null,

  changeTabTo: function(sender) {
    this.set('currentTab', sender.get('tabName'));
  }
});

SC.TabPaneView = SC.View.extend({
  tabControllerObject: function() {
    var tabController = this.get('tabController');

    if (SC.typeOf(tabController) === "string") {
      return this.getPath(tabController);
    } else {
      return tabController;
    }
  }.property('tabController').cacheable(),

  isVisible: function() {
    return this.get('tabName') === this.getPath('tabControllerObject.currentTab');
  }.property('tabName', 'tabControllerObject.currentTab').cacheable()
});

SC.AceEditorView = SC.View.extend({
  classNames: ['editor'],
 
  value: null,

  valueDidChange: function(){
    var session = this.get('session');
    if (session) {
      var value = this.get('value');
      if (!this._valueSetInternally) { session.setValue(value); }
      this._valueSetInternally = false;
    }
  }.observes('value'),

  editorValueDidChange: function(){
    var session = this.get('session');
    if (session){
      // Need a delay here to make sure we get the updated value
      SC.run.schedule('render', this, function(){
        var value = this.get('value'),
            newValue = session.getValue();
        if (value !== newValue) {
          this._valueSetInternally = true;
          this.set('value', newValue);
        }
      });
    }
  },

  language: null,

  languageMode: function(){
    var language = this.get('language');
    if (!language) { return null; }

    // The require here is defined by Ace
    return require("ace/mode/"+language).Mode;
  }.property('language').cacheable(),

  session: function(){
    var editor = this.get('editor');
    return editor ? editor.getSession() : null;
  }.property('editor').cacheable(),

  didInsertElement: function(){
    var editor = ace.edit(this.get('element'));
    if (editor) {
      this.set('editor', editor);
      this.languageModeDidChange();

      var session = editor.getSession(), self = this;
      session.setValue(this.get('value') || '');
      session.on('change', function(){ self.editorValueDidChange(); });
    }
  },

  languageModeDidChange: function(){
    var session = this.get('session'),
        languageMode = this.get('languageMode');
    if (session && languageMode) { session.setMode(new languageMode); }
  }.observes('languageMode'),

  _fixSize: function(){
    if (this.get('isVisible')) {
      var editor = this.get('editor');
      if (editor) {
        SC.run.schedule('render', editor, editor.resize);
      }
    }
  }.observes('isVisible')
});

SC.ConsoleView = SC.View.extend({

  promptLabel: '> ',

  animateScroll: true,

  promptHistory: true,

  welcomeMessage: 'Run code against your app',

  commandValidate: function(line){
    return line !== "";
  },

  preprocessLine: function(line){
    if (this._incompleteCommand) {
      line = this._incompleteCommand+"\n"+line;
      this._incompleteCommand = null;
    }
    return line;
  },

  commandEval: function(line){
    return eval(line);
  },

  commandRun: function(line){
    var ret = this.commandEval(line);
    return (ret != null) ? ret.toString() : true;
  },

  commandError: function(line, error) {
    if (error.constructor === SyntaxError && error.message === "Unexpected end of input") {
      this._incompleteCommand = line;
      return true;
    }

    return {
      msg: error.toString(),
      className: "jquery-console-message-error"
    };
  },

  commandHandle: function(line){
    var line = this.preprocessLine(line);
    try {
      return this.commandRun(line);
    } catch (error) {
      return this.commandError(line, error);
    }
  },

  didInsertElement: function(){
    var self = this;
    var console = this.$().console({
      promptLabel: this.get('promptLabel'),
      commandValidate: function(line){
        return self.commandValidate(line);
      },
      commandHandle: function(line){
        return self.commandHandle(line);
      },
      animateScroll:  this.get('animateScroll'),
      promptHistory:  this.get('promptHistory'),
      welcomeMessage: this.get('welcomeMessage')
    });
    this.set('console', console);
  }
});
