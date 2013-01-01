## Redirecting to a Different URL

If you want to redirect from one route to another, simply implement the
`redirect` hook in your route handler.

```javascript
App.Router.map(function(match) {
  match('/').to('index');
  match('/posts').to('posts');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});
```

You can conditionally transition based on some other application state.

```javascript
App.Router.map(function(match) {
  match('/topCharts').to('topCharts', function(match) {
    match('/').to('choose');
    match('/albums').to('albums');
    match('/songs').to('songs');
    match('/artists').to('artists');
    match('/playlists').to('playlists');
  });
});

App.ChooseRoute = Ember.Route.extend({
  redirect: function() {
    var lastFilter = this.controllerFor('application').get('lastFilter');
    this.transitionTo(lastFilter || 'songs');
  }
});

// Superclass to be used by all of the filter routes below
App.FilterRoute = Ember.Route.extend({
  enter: function() {
    var controller = this.controllerFor('application');
    controller.set('lastFilter', this.templateName);
  }
});

App.SongsRoute = App.FilterRoute.extend();
App.AlbumsRoute = App.FilterRoute.extend();
App.ArtistsRoute = App.FilterRoute.extend();
App.PlayistsRoute = App.FilterRoute.extend();
```

In this example, navigating to the `/` URL immediately transitions into
the last filter URL that the user was at. The first time, it transitions
to the `/songs` URL.

Your route can also choose to transition only in some cases. If the
`redirect` hook does not transition to a new route, the remaining hooks
(`model`, `setupControllers`, `renderTemplates`) will execute as usual.
