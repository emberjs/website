## Rendering a Template

One of the most important jobs of a route handler is rendering the
appropriate template to the screen.

By default, a route handler will render the template into the closest
parent with a template.

```js
App.Router.map(function() {
  this.resource('posts');
});

App.PostsRoute = Ember.Route.extend();
```

If you want to render a template other than the one associated with the
route handler, implement the `renderTemplate` hook:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('favoritePost');
  }
});
```

If you want to use a different controller than the route handler's
controller, pass the controller's name in the `controller` option:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ controller: 'favoritePost' });
  }
});
```

If you want to render the template into a different named outlet:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'posts' });
  }
});
```

All of the options described above can be used together in whatever
combination you'd like:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplate: function() {
    var controller = this.controllerFor('favoritePost');

    // Render the `favoritePost` template into
    // the outlet `posts`, and display the `favoritePost`
    // controller.
    this.render('favoritePost', {
      outlet: 'posts',
      controller: controller
    });
  }
});
```

NOTE: When a template tries to render, and the parent route did not render a template, then you will see this warning:

"The immediate parent route did not render into the main outlet ..."

This means that the the current route tried to render into the parent routes template, but the parent route didn't render a template, or if it did, the template did not render 'into' the main template (a default {{outlet}}). For the case of the following routes: Application > Posts > Post, if the posts route does not have a template, the post template will render into the application template.

This default behavior could be what you expect, or it could be unexpected and the warning is there to point out the potential unexpected behavior.
