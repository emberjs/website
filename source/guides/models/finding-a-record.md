You can retrieve a record by passing its model and unique ID to the `find()`
method. This will return a promise that resolves to the requested
record:

```js
store.find('post', 1).then(function(post) {
  post.set('title', "My Dark Twisted Fantasy");
});
```

### Integrating with the Route's Model Hook

As discussed in [Specifying a Route's
Model](/guides/routing/specifying-a-routes-model), routes are
responsible for telling their template which model to render.

`Ember.Route`'s `model` hook supports asynchronous values
out-of-the-box. If you return a promise from the `model` hook, the
router will wait until the promise has resolved to a record.

This makes it easy to write apps using Ember Data. Just return the
requested record from the `model` hook, and let Ember deal with figuring
out whether a network request is needed or not:

```js
App.Router.map(function() {
  this.resource('post', { path: ':post_id' });
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('post', params.post_id);
  }
});
```

In fact, this pattern is so common, the above `model` hook is the
default implementation for routes with a dynamic segment. If you're
using Ember Data, you only need to override the `model` hook if you need
to return a model different from the record with the provided ID.
