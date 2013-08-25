App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return [{ name: "In Rainbows", artist: "Radiohead" }];
  }
});
