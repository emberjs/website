//= require ember.debug
//= require ember-template-compiler.js
//= require moment
//= require js-md5
//= require ../../vendor/highlight
//= require ./load-examples

function buildLineNumbers(source) {
  var byLine = source.split("\n"),
      output = [];

  for (var i = 1; i < byLine.length; i++) {
    output.push(i + "\n");
  }

  return "<pre>"+output.join('')+"</pre>";
}

function generateViewerApp($elem, files) {
  // Scope the application to the example's
  // DOM element by setting rootElement.
  var App = Ember.Application.create({
    rootElement: $elem
  });


  App.ApplicationRoute = Ember.Route.extend({
    model: function() {
      return files;
    },

    setupController: function(controller, model) {
      controller.set('model', model);
      controller.set('selectedTab', model[0]);
    }
  });

  App.ApplicationController = Ember.Controller.extend({
    actions: {
      selectTab: function(tab) {
        this.set('selectedTab', tab);
      }
    }
  });

  App.TabItemComponent = Ember.Component.extend({
    tagName: 'span',

    click: function(e){
      e.preventDefault();
      this.sendAction('selectTab', this.get('item'));
    },

    isSelected: Ember.computed('selectedTab', 'item', function() {
      return this.get('item') === this.get('selectedTab');
    })

  });

  App.SyntaxHighlightHelper = Ember.Helper.helper(function(value, options) {
    var highlighted = hljs.highlightAuto(value[0]).value;
    var lineNumbers = buildLineNumbers(highlighted);

    var output = '<table class="CodeRay"><tr><td class="line-numbers">';
    output += lineNumbers;
    output += '</td><td class="code"><pre>' + highlighted + '</pre></td></tr></table>';

    output = "<div class='example-highlight'>" + output + "</div>";
    return new Ember.String.htmlSafe(output);
  });
}

function registerComponent(container, name, application) {
  Ember.assert("You provided a template named 'components/" + name + "', but custom components must include a '-'", name.match(/-/));

  application.register('component:' + name, 'layout', 'template:components/' + name);

  var fullName = 'component:' + name;
  var Component = container.lookupFactory(fullName);

  if (!Component) {
    container.register('component:' + name, Ember.Component);
    Component = container.lookupFactory(fullName);
  }

  Ember.Helper.helper(name, Component);
}

function generateOutputApp($elem, files) {
  var templates = {}, scripts = [];

  files.forEach(function(file) {
    var fileParts = file.name.split('.'),
        name = fileParts[0],
        extension = fileParts[1];

    if (extension === 'hbs') {
      if (name.substr(0, 10) === "templates/") {
        name = name.substr(10);
        file.name = name + '.' + extension;
      }

      templates[name] = Ember.Handlebars.compile(file.contents);
    } else if (extension === 'js') {
      scripts.push(file.contents);
    }
  });

  var App = Ember.Application.create({
    rootElement: $elem,
    ready: function() {
      for (var name in templates) {
        if (name.substr(0, 11) === "components/") {
          registerComponent(this.__container__, name.substr(11, name.length), App);
        }
      }
    },
    Resolver: Ember.DefaultResolver.extend({
      resolveTemplate: function(name) {
        return templates[name.name];
      }
    })
  });

  App.Router.reopen({
    location: 'none'
  });

  scripts.forEach(function(script) {
    eval(script);
  });
}
