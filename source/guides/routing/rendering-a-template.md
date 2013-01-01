## Rendering a Template

One of the most important jobs of a route handler is rendering the
appropriate template to the screen.

By default, a route handler will render the template with the same name
into the `application` template's outlet.

```js
App.Router.map(function(match) {
  match('/posts').to('posts');
});

App.PostsRoute = Ember.Route.extend();
```

If you want to render a template other than the one associated with the
route handler, implement the `renderTemplates` hook:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplates: function() {
    this.render('favoritePost');
  }
});
```

If you want to use a different controller than the route handler's
controller:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplates: function() {
    var controller = this.controllerFor('favoritePost');

    this.render({ controller: controller });
  }
});
```

If you want to render the template into a different parent template:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplates: function() {
    this.render({ into: 'sidebar' });
  }
});
```

If you want to render the template into a different named outlet:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplates: function() {
    this.render({ outlet: 'posts' });
  }
});
```

All of the options described above can be used together in whatever
combination you'd like:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplates: function() {
    var controller = this.controllerFor('favoritePost');

    // Render the `favoritePost` template into
    // the `sidebar` template's outlet `posts`,
    // and display the `favoritePost` controller.
    this.render('favoritePost', {
      into: 'sidebar',
      outlet: 'posts',
      controller: controller
    });
  }
});
```
