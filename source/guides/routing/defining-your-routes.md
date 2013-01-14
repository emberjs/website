## Defining Your Routes

When your application starts, the router is responsible for displaying
templates, loading data, and otherwise setting up application state.
It does so by matching the current URL to the _routes_ that you've
defined.

```js
App.Router.map(function() {
  this.route("about", { path: "/about" });
  this.route("favorites", { path: "/favs" });
});
```

When the user visits `/`, Ember.js will render the `index` template.
Visiting `/about` renders the `about` template, and `/favs` renders the
`favorites` template.

Note that you can leave off the path if it is the same as the route
name. In this case, the following is equivalent to the above example:

```js
App.Router.map(function() {
  this.route("about");
  this.route("favorites", { path: "/favs" });
});
```

Inside your templates, you can use `{{linkTo}}` to navigate between
routes, using the name that you provided to the `route` method (or, in
the case of `/`, the name `index`).

```handlebars
{{#linkTo "index"}}<img class="logo">{{/linkTo}}

<nav>
  {{#linkTo "about"}}About{{/linkTo}}
  {{#linkTo "favorites"}}Favorites{{/linkTo}}
</nav>
```

The `{{linkTo}}` helper will also add an `active` class to the link that
points to the currently active route.

You can customize the behavior of a route by creating an `Ember.Route`
subclass. For example, to customize what happens when your user visits
`/`, create an `App.IndexRoute`:

```javascript
App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    // Set the IndexController's `title`
    controller.set('title', "My App");
  }
});
```

The `IndexController` is the starting context for the `index` template.
Now that you've set `title`, you can use it in the template:

```handlebars
<!-- get the title from the IndexController -->
<h1>{{title}}</h1>
```

(If you don't explicitly define an `App.IndexController`, Ember.js will
automatically generate one for you.)

Ember.js automatically figures out the names of routes and controllers based on
the name you pass to `this.route`.

<table>
  <thead>
  <tr>
    <th>URL</th>
    <th>Route Name</th>
    <th>Controller</th>
    <th>Route</th>
    <th>Template</th>
  </tr>
  </thead>
  <tr>
    <td><code>/</code></td>
    <td><code>index</code></td>
    <td><code>App.IndexController</code></td>
    <td><code>App.IndexRoute</code></td>
    <td><code>index</code></td>
  </tr>
  <tr>
    <td><code>/about</code></td>
    <td><code>about</code></td>
    <td><code>App.AboutController</code></td>
    <td><code>App.AboutRoute</code></td>
    <td><code>about</code></td>
  </tr>
  <tr>
    <td><code>/favs</code></td>
    <td><code>favorites</code></td>
    <td><code>App.FavoritesController</code></td>
    <td><code>App.FavoritesRoute</code></td>
    <td><code>favorites</code></td>
  </tr>
</table>

### Resources

You can define groups of routes that work with a resource:

```javascript
App.Router.map(function() {
  this.resource('posts', { path: '/posts' }, function() {
    this.route('new');
  });
});
```

As with `this.route`, you can leave off the path if it's the same as the
name of the route, so the following router is equivalent:

```javascript
App.Router.map(function() {
  this.resource('posts', function() {
    this.route('new');
  });
});
```

This router creates three routes:

<table>
  <thead>
  <tr>
    <th>URL</th>
    <th>Route Name</th>
    <th>Controller</th>
    <th>Route</th>
    <th>Template</th>
  </tr>
  </thead>
  <tr>
    <td><code>/</code></td>
    <td><code>index</code></td>
    <td><code>App.IndexController</code></td>
    <td><code>App.IndexRoute</code></td>
    <td><code>index</code></td>
  </tr>
  <tr>
    <td>N/A</td>
    <td><code>posts</code><sup>1</sup></td>
    <td><code>App.PostsController</code></td>
    <td><code>App.PostsRoute</code></td>
    <td><code>posts</code></td>
  </tr>
  <tr>
    <td><code>/posts</code></td>
    <td><code>posts.index</code></td>
    <td><code>App.PostsIndexController</code></td>
    <td><code>App.PostsIndexRoute</code></td>
    <td><code>posts/index</code></td>
  </tr>
  <tr>
    <td><code>/posts/new</code></td>
    <td><code>posts.new</code></td>
    <td><code>App.PostsNewController</code></td>
    <td><code>App.PostsNewRoute</code></td>
    <td><code>posts/new</code></td>
  </tr>
</table>

<small><sup>1</sup> Transitioning to `posts` or creating a link to
`posts` is equivalent to transitioning to `posts.index` or linking to
`posts.index`</small>

Routes nested under a resource take the name of the resource plus their
name as their route name. If you want to transition to a route (either
via `transitionTo` or `{{#linkTo}}`, make sure to use the full route
name (`posts.new`, not `new`).

Visiting `/` renders the `index` template, as you would expect.

Visiting `/posts` is slightly different. It will first render the
`posts` template. Then, it will render the `posts/index` template into the
`posts` template's outlet.

Finally, visiting `/posts/new` will first render the `posts` template,
then render the `posts/new` template into its outlet.

<!-- See [Nested Routes][1] for more information. -->

[1]: /guides/routing/nested-routes

NOTE: You should use `this.resource` for URLs that represent a **noun**,
and `this.route` for URLs that represent **adjectives** or **verbs**
modifying those nouns.

### Dynamic Segments

One of the responsibilities of a resource's route handler is to convert a URL
into a model.

For example, if we have the resource `this.resource('/blog_posts');`, our
route handler might look like this:

```js
App.BlogPostsRoute = Ember.Route.extend({
  model: function() {
    return App.BlogPost.all();
  }
});
```

The `blog_posts` template will then receive a list of all available posts as
its context.

Because `/blog_posts` represents a fixed model, we don't need any
additional information to know what to use.  However, if we want a route
to represent a single post, we would not want to have to hardcode every
possible post into the router.

Enter _dynamic segments_.

A dynamic segment is a portion of a URL that starts with a `:` and is
followed by an identifier.

```js
App.Router.map(function() {
  this.resource('posts');
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
