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

If you need some information about the current model in order to decide about
the redirection, you should use the `afterModel` hook, where the model is
already resolved.

```javascript

App.Router.map(function() {
  this.resource('posts');
  this.resource('post', { path: '/post/:post_id' });
});

App.PostsRoute = Ember.Route.extend({
  afterModel: function(posts, transition) {
    if (posts.length === 1) {
      this.transitionTo('post', posts[0]);
    }
  }
});
```

When transitioning to the `PostsRoute` it turns out that there is only one post,
the current transition is aborted in favor of redirecting to the `PostRoute`
with the single post object being its model.

