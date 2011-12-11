window.Tutorial = SC.Application.create({
  rootElement: '#content',

  ready: function(){
    this._super();
    SC.run.schedule('render', function(){
      Tutorial.tutorialController.resetIframe();
    });
  }
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
  classNameBindings: ['current'],

  tagName: 'li',
  template: SC.Handlebars.compile("<a href='#' onclick='return false;'>{{title}}</a>"),
  type: null,

  targetObject: function() {
    return SC.stringToObject(this, this.get('controller'));
  }.property('controller').cacheable(),

  action: 'changeTabTo',

  current: function() {
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
Tutorial.tutorialController.addStep({
  body: "<h3>Core Concepts</h3>\n<p><strong>Here are the two key features that make SproutCore so powerful:</strong></p>\n<p><strong>Bindings:</strong> Bindings create a bidirectional link between two properties. If the property of one object changes, the property on the other object updates automatically.</p>\n<p><strong>Computed Properties</strong>: Computed properties allow you to treat a function as a property. This allows you to synthesize a new property from multiple input properties, and have it update automatically any time one of those input properties changes.</p>\n<p>This tutorial will show you how to use these two concepts to build a todo app with astonishingly little code.</p>"
});Tutorial.tutorialController.addStep({
  body: "<h3>Create the Namespace</h3>\n<p>The following code creates a namespace for your application (called Todos), which is also an instance of SC.Application.</p>\n<p>It is important that every SproutCore app creates an instance of SC.Application, because it is responsible for routing browser events to your views.</p>",
  codeTarget: "javascript",
  code: "Todos = SC.Application.create();",
  validator: function(context){
if (!(context.Todos instanceof context.SC.Application)) {
  this.addError("Couldn't find valid MyApp instance");
}
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Defining Your Model</h3>\n<p>In this tutorial, we want to create a list for managing todos. Users should be able to create a new todo with a specific task, then check it off once it’s done.</p>\n<p>Let’s define our model as a new subclass of SC.Object, inserting the code after the <code>Todos</code> object is created. The following code will define a class with two properties: <code>title</code>, a String; and <code>isDone</code>, a Boolean.</p>",
  codeTarget: "javascript",
  code: "Todos.Todo = SC.Object.extend({\n  title: null,\n  isDone: false\n});",
  validator: function(context){
if (!context.Todos.Todo || context.Todos.Todo.superclass !== context.SC.Object) {
  this.addError("Couldn't find valid Todo class");
}
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Managing the Model Using a Controller</h3>\n<p>Now that we know what our data looks like, let’s create a controller to manage it. Since we want to maintain an ordered list of todos, we’ll use an instance of <code>SC.ArrayProxy</code>.</p>\n<p>In MVC frameworks, like SproutCore, the controller layer bridges the model layer, which is only concerned with a pure-data representation of objects, and the view layer, which is only concerned with representing those objects.</p>",
  codeTarget: "javascript",
  code: "Todos.todosController = SC.ArrayProxy.create({\n  // Initialize the array controller with an empty array.\n  content: []\n});",
  validator: function(context){
if (!(context.Todos.todosController instanceof context.SC.ArrayProxy)) {
  this.addError("Couldn't find valid todosController");
}
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Managing the Model Using a Controller (cont)</h3>\n<p>Now we have an array controller with no content. Let’s add a method to create a new todo. The following code replaces the code we added in our last step.</p>\n<p>NOTE: SC.ArrayProxy acts as a proxy onto its content Array. SproutCore will propagate any modifications made to the ArrayProxy to the content Array.</p>",
  codeTarget: "javascript",
  code: "Todos.todosController = SC.ArrayProxy.create({\n  // Initialize the array controller with an empty array.\n  content: [],\n  // Creates a new todo with the passed title, then adds it\n  // to the array.\n  createTodo: function(title) {\n    var todo = Todos.Todo.create({ title: title });\n    this.pushObject(todo);\n  }\n});\n",
  replacesCode: "Todos.todosController = SC.ArrayProxy.create({\n  // Initialize the array controller with an empty array.\n  content: []\n});",
  validator: function(context){
if (!(context.Todos.todosController.createTodo instanceof context.Function)) {
  this.addError("Couldn't find createTodo method");
}
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Creating New Todos with a Text Field</h3>\n<p>We’ve got our model and controller set up, so let’s move on to the fun part: creating the interface for our users. The first step is to create a text field into which the user types the name of their todo. SproutCore uses Handlebars templates to quickly define the application’s interface. While Handlebars makes it easy to markup HTML quickly, you’ll see that it also has been extended to automatically take advantage of SproutCore’s bindings.</p>\n<p>Here we’ll define a text field with a unique id attribute (so it can be styled via CSS), as well as a placeholder attribute that will be displayed in modern HTML5 browsers. For the ease of the tutorial, we'll set up this template in a view for you.</p>",
  codeTarget: "template",
  code: "{{view SC.TextField id=\"new-todo\" placeholder=\"What needs to be done?\"}}",
  validator: function(context){
// TODO: Make this more specific
if (context.$('input#new-todo').length !== 1) {
  this.addError("Couldn't find text field");
}
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Creating New Todos with a Text Field (cont)</h3>\n<p>Now that we’ve got model, view, and controller represented, we'll start seeing some output.</p>\n<p>In SproutCore, view objects are responsible for updating the DOM and handling events. Among other things, this allows us to buffer changes to the DOM for maximum performance and to support generic cross-platform event handling. Whenever you want to display dynamic content or handle events, you will use a view object.</p>"
});Tutorial.tutorialController.addStep({
  body: "<h3>Creating New Todos with a Text Field (cont)</h3>\n<p>Now it’s time to tell SproutCore how to handle events for your &lt;input&gt; tag. When the user types in the field and presses the return key, we will create a new Todo and have it inserted into the content of the array controller.</p>\n<p>Since CreateTodoView will handle events for a text field, we create a subclass of SC.TextField, which provides several conveniences for working with these input controls. For example, you can access the value property and respond to higher level events, such as insertNewline, when the user presses enter.</p>",
  codeTarget: "javascript",
  code: "Todos.CreateTodoView = SC.TextField.extend({\n  insertNewline: function() {\n    var value = this.get('value');\n    if (value) {\n      Todos.todosController.createTodo(value);\n      this.set('value', '');\n    }\n  }\n});\n",
  validator: function(context){
if (!context.Todos.CreateTodoView || context.Todos.CreateTodoView.superclass !== context.SC.TextField) {
  this.addError("Couldn't find CreateTodoView");
}
// TODO: Check for insertNewline as well
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Creating New Todos with a Text Field (cont)</h3>\n<p>Now that we have defined our view, let’s update the template to use our new view subclass. All we need to do is swap <code>Todos.CreateTodoView</code> for <code>SC.TextField</code>.</p>",
  codeTarget: "template",
  code: "{{view Todos.CreateTodoView id=\"new-todo\" placeholder=\"What needs to be done?\"}}",
  replacesCode: "{{view SC.TextField id=\"new-todo\" placeholder=\"What needs to be done?\"}}",
  validator: function(context){
// TODO: Write this
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Display Your Todos</h3>\n<p>Now that we have UI to create new todos, let’s create the code to display them. We’ll use the Handlebars <code>#each</code> helper to display a list of items. <code>#each</code> renders every item in its underlying Array using the enclosed HTML.<p>",
  codeTarget: "template",
  code: "<ul>\n  {{#each Todos.todosController}}\n    <li>{{title}}</li>\n  {{/each}}\n</ul>",
  validator: function(context){
// TODO: Write this
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Display Your Todos (cont)</h3>\n<p>Now is a good time to test out this code. Type a todo into the text field and hit return.</p>\n<p>Look at that! As soon as we create a new todo and insert it into the array controller, the view updates automatically.</p>\n<p>You’ve now seen a little bit of the power of SproutCore. By using SproutCore’s bindings to describe the relationship between your data and your views, you were able to change the data layer and let SproutCore do the hard work of updating the view layer for you.</p>\n<p>This is actually a core concept in SproutCore, not just something that demos well. SproutCore’s binding system is designed with the view system in mind, which makes it easy to work directly with your data and not need to worry about manually keeping your view layer in sync. You will see this concept over and over again in the rest of this tutorial and in other guides.</p>"
});Tutorial.tutorialController.addStep({
  body: "<h3>Getting Things Done</h3>\n<p>We now have the ability to add todos, but no way to mark them as done. Before the frustration of a never-ending todo list gets the better of us, let’s add the ability to mark todos complete.</p>\nThe first thing we need to do is add a checkbox to each todo list item. As was mentioned earlier, if we want to handle events, such as user input, we need a view. In this case, we are adding a checkbox and want to be notified whenever the value of the checkbox is changed by the user. Let’s update the Handlebars template to look like the following:<p>",
  codeTarget: "template",
  code: "<li>{{view SC.Checkbox titleBinding=\"title\" valueBinding=\"isDone\"}}</li>",
  replacesCode: "<li>{{title}}</li>",
  validator: function(context){
// TODO: Write this
}
});Tutorial.tutorialController.addStep({
  body: "<h3>Getting Things Done (cont)</h3>\n<p>So far so good, but lets add some styling for a todo that's marked as done.</p>\n<p>For this we can use the <code>bindAttr</code> helper which will automatically update an elements attributes based on the value of a binding. Here, we bind the class attribute. If <code>isDone</code> is true then the class will be added. Amber automatically dasherizes class names for us.</p>",
  codeTarget: "template",
  code: "<li {{bindAttr class=\"isDone\"}}>\n  {{view SC.Checkbox titleBinding=\"title\" valueBinding=\"isDone\"}}\n</li>",
  replacesCode: "<li>{{view SC.Checkbox titleBinding=\"title\" valueBinding=\"isDone\"}}</li>"
});Tutorial.tutorialController.addStep({
  afterCode: "{{view Todos.CreateTodoView id=\"new-todo\" placeholder=\"What needs to be done?\"}}",
  code: "<div id=\"stats\">\n  {{Todos.todosController.length}} items\n</div>",
  body: "<h3>The More You Know</h3>\n<p>We can now create todos and mark them as being complete. While 76% of all statistics are made up, let’s see if we can display more accurate information from the data we have. At the top of our list, let’s display the number of todos we have.</p>",
  codeTarget: "template"
});Tutorial.tutorialController.addStep({
  afterCode: "content: [],",
  code: "remaining: function() {\n  return this.filterProperty('isDone', false).get('length');\n}.property('@each.isDone'),",
  body: "<h3>The More You Know (cont)</h3>\n<p>Ok, that works, but it would be more useful to know how many items we have left, not just how many we have total. Let's add a property called 'remaining' to our controller to tell us how many undone items there are.</p>\n<p>Here, we specify our dependent key using @each. This allows us to depend on properties of the array’s items. In this case, we want to update the remaining property any time isDone changes on a Todo. We'll also be notified when an item is added to or removed from the array.</p>\n<p>It’s important to declare dependent keys because SproutCore uses this information to know when to update bindings. In our case, our StatsView updates any time todosController’s remaining property changes.</p>\n<p>We'll add the following to our todosController after the <code>content: []</code> line.</p>",
  codeTarget: "javascript"
});Tutorial.tutorialController.addStep({
  code: "Todos.StatsView = SC.View.extend({\n  remainingBinding: 'Todos.todosController.remaining',\n  remainingString: function() {\n    var remaining = this.get('remaining');\n    return remaining + (remaining === 1 ? \" item\" : \" items\");\n  }.property('remaining')\n});\n",
  body: "<h3>The More You Know (cont)</h3>\n<p>Now lets change set up our view to use this new property.</p>\n<p>While we're at it, lets also fix pluralization. Right now, if you only have one item, it will say \"1 items\", not so polished. To handle this, we'll create a new view that handles pluralization.</p>",
  codeTarget: "javascript"
});Tutorial.tutorialController.addStep({
  replacesCode: "<div id=\"stats\">\n  {{Todos.todosController.length}} items\n</div>",
  code: "{{#view Todos.StatsView id=\"stats\"}}\n  {{remainingString}} remaining\n{{/view}}",
  body: "<h3>The More You Know (cont)</h3>\n<p>Finally, we'll add our new view to the template.</p>",
  codeTarget: "template"
});