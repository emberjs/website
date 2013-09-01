//= require ../../vendor/handlebars-1.0
//= require ../../vendor/ember-1.0-rc-8
//= require ../../vendor/moment
//= require ../../vendor/highlight
//= require ../../vendor/md5

$(function loadExamples() {
  // Find all of the examples on the page
  var $examples = $('.example-app');

  // For each example, create a new Ember.Application
  $examples.each(function() {
    var $viewer = $('<div class="example-viewer"></div>');
    var $output = $('<div class="example-output"></div>');

    $(this).append($viewer)
           .append($output);

    // Extract configuration options for the example
    // from attributes on the element
    var name = this.getAttribute('data-name'),
        fileNames = this.getAttribute('data-files');

    fileNames = fileNames.split(' ');

    var files = fileNames.map(function(file) {
      return $.ajax('/javascripts/app/examples/'+name+'/'+file, {
        dataType: 'text'
      });
    });

    Ember.RSVP.all(files).then(function(files) {
      files = files.map(function(file, i) {
        return {
          name: fileNames[i],
          contents: file
        };
      });

      return files;
    }).then(function(files) {
      generateViewerApp($viewer, files);
      generateOutputApp($output, files);
    });
  });
});

function buildLineNumbers(source) {
  var byLine = source.split("\n"),
      output = [];

  for (var i = 1; i < byLine.length; i++) {
    output.push(i + "\n");
  }

  return "<pre>"+output.join('')+"</pre>";
}

Ember.Handlebars.helper('syntax-highlight', function(value, options) {
  var highlighted = hljs.highlightAuto(value).value;
  var lineNumbers = buildLineNumbers(highlighted);

  var output = '<table class="CodeRay"><tr><td class="line-numbers">';
  output += lineNumbers;
  output += '</td><td class="code"><pre>' + highlighted + '</pre></td></tr></table>';

  output = "<div class='example-highlight'>" + output + "</div>";
  return new Ember.Handlebars.SafeString(output);
});

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

  App.ApplicationController = Ember.ArrayController.extend({
    selectTab: function(tab) {
      this.set('selectedTab', tab);
    }
  });

  App.TabItemController = Ember.ObjectController.extend({
    needs: 'application',

    isSelected: function() {
      return this.get('model') === this.get('controllers.application.selectedTab');
    }.property('controllers.application.selectedTab')
  });
}

function registerComponent(container, name) {
  Ember.assert("You provided a template named 'components/" + name + "', but custom components must include a '-'", name.match(/-/));

  container.injection('component:' + name, 'layout', 'template:components/' + name);

  var fullName = 'component:' + name;
  var Component = container.lookupFactory(fullName);

  if (!Component) {
    container.register('component:' + name, Ember.Component);
    Component = container.lookupFactory(fullName);
  }

  Ember.Handlebars.helper(name, Component);
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
          registerComponent(this.__container__, name.substr(11, name.length));
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
