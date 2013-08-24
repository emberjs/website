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
      return $.ajax('/examples/'+name+'/'+file, {
        dataType: 'text'
      });
    });

    Ember.RSVP.all(files).then(function(files) {
      files = files.map(function(file, i) {
        return {
          name: fileNames[i],
          contents: file
        }
      });

      return files;
    }).then(function(files) {
      generateViewerApp($viewer, files);
      //generateOutputApp($output, files);
    });
  });
});

Ember.Handlebars.helper('syntax-highlight', function(value, options) {
  var highlighted = hljs.highlightAuto(value).value;
  var output = "<div class='highlight'>" + highlighted + "</div>";
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

function generateOutputApp($elem, files) {
  var templates = {}, scripts = [];

  files.forEach(function(file) {
    var fileParts = file.name.split('.'),
        name = fileParts[0],
        extension = fileParts[1];

    if (extension === 'hbs') {
      if (name.substr(0, 10) === "templates/") {
        name = name.substr(10);
      }

      templates[name] = Ember.Handlebars.compile(file.contents);
    } else if (extension === 'js') {
      scripts.push(file.contents);
    }
  });

  var DemoApp = Ember.Application.create({
    rootElement: $elem,

    resolver: Ember.DefaultResolver.extend({
      resolveTemplate: function(name) {
        return templates[name.name];
      }
    })
  });

  scripts.forEach(function(script) {
    console.log(script);
    eval(script);
  });
}
