SC.stringToObject = function(target, str){
  return (typeof str === 'string') ? SC.getPath(target, str) : str;
}

/******** TABS ********/

SC.TabController = SC.Object.extend({
  currentTab: null,

  changeTabTo: function(sender) {
    this.set('currentTab', sender.get('tabName'));
  }
});

SC.TabPaneView = SC.View.extend({
  tabName: null,

  controller: null,

  controllerObject: function() {
    return SC.stringToObject(this, this.get('controller'));
  }.property('controller').cacheable(),

  isVisible: function() {
    return this.get('tabName') === this.getPath('controllerObject.currentTab');
  }.property('tabName', 'controllerObject.currentTab').cacheable()
});


/*********** ACE ***********/

// Fix for multiple editors
// https://github.com/ajaxorg/ace/pull/525
require("ace/renderloop").RenderLoop.prototype.setTimeoutZero = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.setTimeout
).bind(window);

SC.AceEditorView = SC.View.extend({
  classNames: ['sc-ace-editor'],

  /**
  * Current value of the editor
  */
  value: null,

  /**
  * @private
  * Updates editor to reflect value
  */
  valueDidChange: function(){
    var session = this.get('session');
    if (session) {
      var value = this.get('value');
      if (!this._valueSetInternally) { session.setValue(value || ''); }
      this._valueSetInternally = false;
    }
  }.observes('value'),

  /**
  * @private
  * Updates value property to reflect editor
  */
  editorValueDidChange: function(){
    var session = this.get('session');
    if (session){
      // Need a delay here to make sure we get the updated value
      SC.run.schedule('sync', this, function(){
        var value = this.get('value'),
            newValue = session.getValue();
        if (value !== newValue) {
          this._valueSetInternally = true;
          this.set('value', newValue);
        }
      });
    }
  },

  /**
  * If disabled, view becomes readOnly
  */
  disabled: false,

  disabledDidChange: function(){
    var editor = this.get('editor');
    if (editor) { editor.setReadOnly(this.get('disabled')); }
  }.observes('disabled'),

  /**
  * Editor language for syntax highlighting.
  * Any language available to Ace.
  * JavaScript file must already be loaded and available.
  */
  language: null,

  /**
  * Language Mode object for use by Ace
  */
  languageMode: function(){
    var language = this.get('language');
    if (!language) { return null; }

    // The require here is defined by Ace
    return require("ace/mode/"+language).Mode;
  }.property('language').cacheable(),

  /**
  * Ace editor session
  */
  session: function(){
    var editor = this.get('editor');
    return editor ? editor.getSession() : null;
  }.property('editor').cacheable(),

  /**
  * Initialize Ace editor on element creation
  */
  didInsertElement: function(){
    var editor = ace.edit(this.get('element'));
    if (editor) {
      this.set('editor', editor);
      this.disabledDidChange();
      this.languageModeDidChange();

      var session = editor.getSession(), self = this;
      session.setValue(this.get('value') || '');
      session.on('change', function(){ self.editorValueDidChange(); });
    }
  },

  /**
  * Update editor language mode accordingly
  */
  languageModeDidChange: function(){
    var session = this.get('session'),
        languageMode = this.get('languageMode');
    if (session && languageMode) { session.setMode(new languageMode); }
  }.observes('languageMode'),

  /**
  * Hack to fix size on Ace editor when it's been hidden
  */
  _fixSize: function(){
    if (this.get('isVisible')) {
      var editor = this.get('editor');
      if (editor) {
        SC.run.schedule('render', editor, editor.resize);
      }
    }
  }.observes('isVisible')
});


/*********** CONSOLE **************/

SC.ConsoleController = SC.Object.extend({
  /**
  * The current value typed at the prompt
  */
  value: null,

  /**
  * Set to true to prevent code execution
  */
  disabled: false,

  /**
  * The current prompt
  */
  prompt: '> ',

  /**
  * Command history
  *
  * Format:
  *
  *   [
  *     {
  *       prompt:  '...',
  *       command: '...',
  *       results: [
  *         { value: '...', type: '...' },
  *         ...
  *       ],
  *     },
  *     ...
  *   ]
  */
  history: null, // Will be set to an array

  /**
  * The following batch of functions may be overwritten to tweak
  * controller behavior for different languages.
  */

  /**
  * Check to see if input should be run
  */
  validateInput: function(input){
    return !!input;
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
  * Returns true if error is related to an incomplete command
  */
  isIncompleteCommandError: function(error) {
    return error.constructor === SyntaxError && error.message === "Unexpected end of input";
  },

  /**
  * Process errors in running
  */
  processError: function(input, error){
    if (this.isIncompleteCommandError(error)) {
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
    if (this.get('disabled')) { return; }

    var value = this.get('value');

    if (this.validateInput(value)) {
      this.set('value', null);

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
        prompt:  this.get('prompt'),
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

    if (!history) {
      history = [];
      this.set('history', history);
    }

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

SC.SandboxedConsoleController = SC.ConsoleController.extend({

  createIframe: function(){
    return $('<iframe style="display:none;"></iframe>').appendTo(document.body)[0];
  },

  removeIframe: function(){
    if (this._iframe) {
      SC.$(this._iframe).remove();
      this._iframe = null;
    }
  },

  resetSandbox: function(){
    this.removeIframe();
    this._iframe = this.createIframe();
  },

  processInput: function(input){
    return this._iframe.contentWindow.eval(input);
  },

  isIncompleteCommandError: function(error) {
    return error.constructor === this._iframe.contentWindow.SyntaxError && error.message === "Unexpected end of input";
  },

  init: function(){
    this._super();

    var self = this;
    SC.$.ready(function(){ self.resetSandbox(); });
  },

  destroy: function(){
    this.removeIframe();
    this._super();
  }

});

SC.ConsoleInputView = SC.TextArea.extend({

  controller: null,

  controllerObject: function() {
    return SC.stringToObject(this, this.get('controller'));
  }.property('controller').cacheable(),

  valueBinding: 'controllerObject.value',

  disabledBinding: 'controllerObject.disabled',

  classNameBindings: ['multiline'],

  /**
  * Handle up and down key for use in history
  */
  keyDown: function(evt){
    if (evt.keyCode === 38) { // Up
      this._delegateToController('historyPrevious');
      evt.preventDefault();
    } else if (evt.keyCode === 40) { // Down
      this._delegateToController('historyNext');
      evt.preventDefault();
    }
  },

  /**
  * Run command with enter key
  */
  insertNewline: function(evt){
    if (!evt.shiftKey && !evt.altKey) {
      this._delegateToController('runCommand');
    }
  },

  /**
  * Helper to delegate commands to controller
  */
  _delegateToController: function(cmd){
    var controller = this.get('controllerObject'),
        func       = controller && controller[cmd];
    if (func){ return func.apply(controller, Array.prototype.slice.call(arguments, 1)); }
  },

  /**
  * Switch to textarea if multi-line
  */
  multiline: function(){
    var value = this.get('value');
    return value && value.indexOf("\n") > -1;
  }.property('value').cacheable()

});

SC.ConsoleHistoryView = SC.View.extend({
  template: SC.Handlebars.compile(
    '<ul class="history">'+
      '{{#each controllerObject.history}}'+
        '<li class="command">{{prompt}}{{command}}</li>'+
        '{{#each results}}'+
          '<li {{bindAttr class="type"}}>{{value}}</li>'+
        '{{/each}}'+
      '{{/each}}'+
    '</ul>'
  ),

  controller: null,

  controllerObject: function() {
    return SC.stringToObject(this, this.get('controller'));
  }.property('controller').cacheable(),

});
