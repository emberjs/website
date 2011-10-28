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


SC.ConsoleInputView = SC.TextField.extend({
  /**
  * Handle up and down key for use in history
  */
  keyDown: function(evt){
    if (evt.keyCode === 38) { // Up
      this._delegateToParent('historyPrevious');
      evt.preventDefault();
    } else if (evt.keyCode === 40) { // Down
      this._delegateToParent('historyNext');
      evt.preventDefault();
    }
  },

  /**
  * Run command with enter key
  */
  insertNewline: function(){
    this._delegateToParent('runCommand');
  },

  /**
  * Helper to delegate commands to parent
  */
  _delegateToParent: function(cmd){
    var parentView = this.get('parentView'),
        func       = parentView && parentView[cmd];
    if (func){ return func.apply(parentView, Array.prototype.slice.call(arguments, 1)); }
  }
});

SC.ConsoleView = SC.View.extend({
  template: SC.Handlebars.compile(
    '<ul class="history">'+
      '{{#each history}}'+
        '<li class="command">{{../promptLabel}} {{command}}</li>'+
        '{{#each results}}'+
          '<li {{bindAttr class="type"}}>{{value}}</li>'+
        '{{/each}}'+
      '{{/each}}'+
    '</ul>'+
    '{{view SC.ConsoleInputView valueBinding="value" placeholderBinding="promptPlaceholder"}}'
  ),

  /**
  * The prompt
  */
  promptLabel:    '> ',
 
  /**
  * Placeholder text for prompt
  */
  promptPlaceholder: 'Type a command',

  /**
  * The current value typed at the prompt
  */ 
  value: null,

  /**
  * Command history
  *
  * Format:
  *
  *   [
  *     {
  *       command: '...',
  *       results: [
  *         { value: '...', type: '...' },
  *         ...
  *       ],
  *     },
  *     ...
  *   ]
  */ 
  history: [],


  /**
  * Check to see if input should be run
  */
  validateInput: function(input){
    return input !== "";
  },

  /**
  * Prepare input to be run
  */
  preprocessInput: function(input){
    if (this._incompleteCommand) {
      input = this._incompleteCommand + "\n" + input;
      this._incompleteCommand = null;
    }
    return input;
  },

  /**
  * Run input
  */ 
  processInput: function(input){
    return eval(input);
  },

  /**
  * Format result for output
  */ 
  postprocessResult: function(ret){
    return ret != null ? ret.toString() : null;
  },

  /**
  * Process errors in running
  */ 
  processError: function(input, error){
    if (error.constructor === SyntaxError && error.message === "Unexpected end of input") {
      this._incompleteCommand = input;
      return null;
    } else {
      return {
        value: error.toString(),
        type: 'error'
      }
    }
  },

  /**
  * Handle input, running through processors, etc.
  */
  handleInput: function(input){
    var result;

    input = this.preprocessInput(input);

    try {
      result = this.processInput(input);
    } catch (error) {
      return this.processError(input, error);
    }

    return this.postprocessResult(result);
  },

  // Internal

  /**
  * @private
  * Run command, normalize output, add to history
  */
  runCommand: function(){
    var value = this.get('value');

    if (this.validateInput(value)) {
      this.set('value', '');

      results = this.handleInput(value);

      if (results) {
        if (typeof results !== 'object') {
          results = {
            value: results,
            type:  'success'
          };
        }

        if (results.constructor !== Array) {
          results = [results];
        }
      }

      this.pushHistory({
        command: value,
        results: results
      });
    }
  },
 
   
  _currentHistoryPos: null,

  /**
  * Push item to history.
  */
  pushHistory: function(item){
    var history = this.get('history');
    history.pushObject(item);
    this._currentHistoryPos = history.get('length');
  },

  /**
  * Get previous item from history, storing current value
  */
  historyPrevious: function(){
    var history = this.get('history');
    if (this._currentHistoryPos > 0) {
      if (this._currentHistoryPos === history.get('length')){
        this._currentValue = this.get('value');
      }
      this._currentHistoryPos--;
      this.set('value', history.objectAt(this._currentHistoryPos).command);
    }
  },

  /**
  * Get next item from history, or load original value
  */
  historyNext: function(){
    var history = this.get('history'),
        length = history.get('length');
    if (this._currentHistoryPos < length) {
      this._currentHistoryPos++;
      if (this._currentHistoryPos === length) {
        this.set('value', this._currentValue);
      } else {
        this.set('value', history.objectAt(this._currentHistoryPos).command);
      }
    }
  }

});
