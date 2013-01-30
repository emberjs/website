## Specifying a Route's Model

In the router, each URL is associated with one or more _route handlers_.
The route handler is responsible for converting the URL into a model
object, telling a controller to represent that model, then rendering a
template bound to that controller.

### Singleton Models

If a route does not have a dynamic segment, you can hardcode which model
should be associated with that URL by implementing the route handler's
`model` hook:

```js
App.Router.map(function() {
  this.resource('posts');
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});
```

By default, the value returned from your `model` hook will be assigned
to the `model` property of the `posts` controller. You can change this
behavior by implementing the [setupControllers hook][1]. The `posts`
controller is the context for the `posts` template.

[1]: /guides/routing/setting-up-a-controller

### Dynamic Models

If a route has a dynamic segment, you will want to use the parameters to
decide which model to use:

```js
App.Router.map(function() {
  this.resource('post', { path: '/posts/:post_id' });
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return App.Post.find(params.post_id);
  }
});
```

Because this pattern is so common, the above `model` hook is the
default behavior.

For example, if the dynamic segment is `:post_id`, Ember.js is smart
enough to know that it should use the model `App.Post` (with the ID
provided in the URL). Specifically, unless you override `model`, the route will
return `App.Post.find(params.post_id)` automatically.

Not coincidentally, this is exactly what Ember Data expects. So if you
use the Ember router with Ember Data, your dynamic segments will work
as expected out of the box.
