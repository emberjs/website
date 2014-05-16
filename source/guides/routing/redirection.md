### Transitioning and Redirecting

Calling `transitionTo` from a route or `transitionToRoute` from a controller
will stop any transition currently in progress and start a new one, functioning
as a redirect. `transitionTo` takes parameters and behaves exactly like the [link-to](/guides/templates/links) helper:

* If you transition into a route without dynamic segments that route's `model` hook
will always run.

* If the new route has dynamic segments, you need to pass either a _model_ or an _identifier_ for each segment.
Passing a model will skip that segment's `model` hook.  Passing an identifier will run the `model` hook and you'll be able to access the identifier in the params. See [Links](/guides/templates/links) for more detail.

### Before the model is known

If you want to redirect from one route to another, you can do the transition in
the `beforeModel` hook of your route handler.

```javascript
App.Router.map(function() {
  this.resource('posts');
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('posts');
  }
});
```

### After the model is known

If you need some information about the current model in order to decide about
the redirection, you should either use the `afterModel` or the `redirect` hook. They
receive the resolved model as the first parameter and the transition as the second one,
and thus function as aliases. (In fact, the default implementation of `afterModel` just calls `redirect`.)

```javascript

App.Router.map(function() {
  this.resource('posts');
  this.resource('post', { path: '/post/:post_id' });
});

App.PostsRoute = Ember.Route.extend({
  afterModel: function(posts, transition) {
    if (posts.get('length') === 1) {
      this.transitionTo('post', posts.get('firstObject'));
    }
  }
});
```

When transitioning to the `PostsRoute` if it turns out that there is only one post,
the current transition will be aborted in favor of redirecting to the `PostRoute`
with the single post object being its model.

### Based on other application state

You can conditionally transition based on some other application state.

```javascript
App.Router.map(function() {
  this.resource('topCharts', function() {
    this.route('choose', { path: '/' });
    this.route('albums');
    this.route('songs');
    this.route('artists');
    this.route('playlists');
  });
});

App.TopChartsChooseRoute = Ember.Route.extend({
  beforeModel: function() {
    var lastFilter = this.controllerFor('application').get('lastFilter');
    this.transitionTo('topCharts.' + (lastFilter || 'songs'));
  }
});

// Superclass to be used by all of the filter routes below
App.FilterRoute = Ember.Route.extend({
  activate: function() {
    var controller = this.controllerFor('application');
    controller.set('lastFilter', this.templateName);
  }
});

App.TopChartsSongsRoute = App.FilterRoute.extend();
App.TopChartsAlbumsRoute = App.FilterRoute.extend();
App.TopChartsArtistsRoute = App.FilterRoute.extend();
App.TopChartsPlaylistsRoute = App.FilterRoute.extend();
```

In this example, navigating to the `/` URL immediately transitions into
the last filter URL that the user was at. The first time, it transitions
to the `/songs` URL.

Your route can also choose to transition only in some cases. If the
`beforeModel` hook does not abort or transition to a new route, the remaining
hooks (`model`, `afterModel`, `setupController`, `renderTemplate`) will execute
as usual.
