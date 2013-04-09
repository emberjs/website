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

Ember allows you to name your outlets. For instance, this code allows
you to specify two outlets with distinct names:

```handlebars
<div class="toolbar">{{outlet toolbar}}</div>
<div class="sidebar">{{outlet sidebar}}</div>
```

So, if you want to render your posts into the `sidebar` outlet, use code
like this:

```js
App.PostsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'sidebar' });
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

If you want to render two different templates into outlets of two different rendered templates of a route:

```js
App.PostRoute = App.Route.extend({
  renderTemplate: function() {
    this.render('favoritePost', {   // the template to render
      into: 'posts',                // the template to render into
      outlet: 'posts',              // the name of the outlet in that template
      controller: 'blogPost'        // the controller to use for the template
    });
    this.render('comments', {
      into: 'favoritePost',
      outlet: 'comment',
      controller: 'blogPost'
    });
  }
});
```

## Rendering Warning

When a template tries to render, and the parent route did not render a
template, then you will see this warning:

"The immediate parent route did not render into the main outlet ..."

This means that the current route tried to render into the parent
route's template, but the parent route didn't render a template, or, if
it did, that the template which the parent route provided did not render
into the main template (i.e., a default `{{outlet}}`).

Ember provides this warning because it expects that you will want to
render into the main template.

