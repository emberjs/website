App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('https://api.github.com/repos/emberjs/ember.js/pulls').then(function(data) {
      return data.splice(0, 3);
    });
  }
});