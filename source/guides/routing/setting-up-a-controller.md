Changing the URL may also change which template is displayed on
screen. Templates, however, are usually only useful if they have some
source of information to display.

In Ember.js, a template retrieves information to display from a
controller.

Two built-in controllers—`Ember.ObjectController` and
`Ember.ArrayController`—make it easy for a controller to present a
model's properties to a template, along with any additional
display-specific properties.

To tell one of these controllers which model to present, set its
`model` property in the route handler's `setupController` hook.

```js
App.Router.map(function() {
  this.resource('post', { path: '/posts/:post_id' });
});

App.PostRoute = Ember.Route.extend({
  // The code below is the default behavior, so if this is all you
  // need, you do not need to provide a setupController implementation
  // at all.
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
```

The `setupController` hook receives the route handler's associated
controller as its first argument. In this case, the `PostRoute`'s
`setupController` receives the application's instance of
`App.PostController`.

To specify a controller other than the default, set the route's
`controllerName` property:

```js
App.SpecialPostRoute = Ember.Route.extend({
  controllerName: 'post'
});
```

As a second argument, it receives the route handler's model. For more
information, see [Specifying a Route's Model][1].

[1]: /guides/routing/specifying-a-routes-model

The default `setupController` hook sets the `model` property of the
associated controller to the route handler's model.

If you want to configure a controller other than the controller
associated with the route handler, use the `controllerFor` method:

```js
App.PostRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('topPost').set('model', model);
  }
});
```
