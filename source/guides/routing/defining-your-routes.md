When your application starts, the router is responsible for displaying
templates, loading data, and otherwise setting up application state.
It does so by matching the current URL to the _routes_ that you've
defined.

The [map](http://emberjs.com/api/classes/Ember.Router.html#method_map) method
of your Ember application's router can be invoked to define URL mappings. When
calling `map`, you should pass a function that will be invoked with the value
`this` set to an object which you can use to create
[routes](http://emberjs.com/guides/routing/defining-your-routes/) and
[resources](http://emberjs.com/guides/routing/defining-your-routes/#toc_resources).

```javascript
App.Router.map(function() {
  this.route('about', { path: '/about' });
  this.route('favorites', { path: '/favs' });
});
```

Now, when the user visits `/about`, Ember.js will render the `about`
template. Visiting `/favs` will render the `favorites` template.

**Heads up!** You get a few routes for free: the `ApplicationRoute` and
the `IndexRoute` (corresponding to the `/` path).
[See below](#toc_initial-routes) for more details.

Note that you can leave off the path if it is the same as the route
name. In this case, the following is equivalent to the above example:

```javascript
App.Router.map(function() {
  this.route('about');
  this.route('favorites', { path: '/favs' });
});
```

Inside your templates, you can use `{{link-to}}` to navigate between
routes, using the name that you provided to the `route` method (or, in
the case of `/`, the name `index`).

```handlebars
{{#link-to 'index'}}<img class="logo">{{/link-to}}

<nav>
  {{#link-to 'about'}}About{{/link-to}}
  {{#link-to 'favorites'}}Favorites{{/link-to}}
</nav>
```

The `{{link-to}}` helper will also add an `active` class to the link that
points to the currently active route.

You can customize the behavior of a route by creating an `Ember.Route`
subclass. For example, to customize what happens when your user visits
`/`, create an `App.IndexRoute`:

```javascript
App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    // Set the IndexController's `title`
    controller.set('title', 'My App');
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

Ember.js automatically figures out the names of the routes and controllers based on
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
    <td><code>IndexController</code></td>
    <td><code>IndexRoute</code></td>
    <td><code>index</code></td>
  </tr>
  <tr>
    <td><code>/about</code></td>
    <td><code>about</code></td>
    <td><code>AboutController</code></td>
    <td><code>AboutRoute</code></td>
    <td><code>about</code></td>
  </tr>
  <tr>
    <td><code>/favs</code></td>
    <td><code>favorites</code></td>
    <td><code>FavoritesController</code></td>
    <td><code>FavoritesRoute</code></td>
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
    <td><code>IndexController</code></td>
    <td><code>IndexRoute</code></td>
    <td><code>index</code></td>
  </tr>
  <tr>
    <td>N/A</td>
    <td><code>posts</code><sup>1</sup></td>
    <td><code>PostsController</code></td>
    <td><code>PostsRoute</code></td>
    <td><code>posts</code></td>
  </tr>
  <tr>
    <td><code>/posts</code></td>
    <td><code>posts.index</code></code></td>
    <td><code>PostsController</code><br>↳<code>PostsIndexController</code></td>
    <td><code>PostsRoute</code><br>↳<code>PostsIndexRoute</code></td>
    <td><code>posts</code><br>↳<code>posts/index</code></td>
  </tr>
  <tr>
    <td><code>/posts/new</code></td>
    <td><code>posts.new</code></td>
    <td><code>PostsController</code><br>↳<code>PostsNewController</code></td>
    <td><code>PostsRoute</code><br>↳<code>PostsNewRoute</code></td>
    <td><code>posts</code><br>↳<code>posts/new</code></td>
  </tr>
</table>

<small><sup>1</sup> Transitioning to `posts` or creating a link to
`posts` is equivalent to transitioning to `posts.index` or linking to
`posts.index`</small>

NOTE: If you define a resource using `this.resource` and **do not** supply
a function, then the implicit `resource.index` route is **not** created. In
that case, `/resource` will only use the `ResourceRoute`, `ResourceController`,
and `resource` template.

Routes nested under a resource take the name of the resource plus their
name as their route name. If you want to transition to a route (either
via `transitionTo` or `{{#link-to}}`), make sure to use the full route
name (`posts.new`, not `new`).

Visiting `/` renders the `index` template, as you would expect.

Visiting `/posts` is slightly different. It will first render the
`posts` template. Then, it will render the `posts/index` template into the
`posts` template's outlet.

Finally, visiting `/posts/new` will first render the `posts` template,
then render the `posts/new` template into its outlet.

NOTE: You should use `this.resource` for URLs that represent a **noun**,
and `this.route` for URLs that represent **adjectives** or **verbs**
modifying those nouns. For example, in the code sample above, when
specifying URLs for posts (a noun), the route was defined with
`this.resource('posts')`. However, when defining the `new` action
(a verb), the route was defined with `this.route('new')`.

### Multi-word Model Names

For multi-word models all the names are camel cased except for the dynamic segment. For example, a model named `BigMac` would have a resource path of `/bigMacs/:big_mac_id`, route named `bigMac`, template named `bigMac`.

### Dynamic Segments

One of the responsibilities of a resource's route handler is to convert a URL
into a model.

For example, if we have the resource `this.resource('posts');`, our
route handler might look like this:

```javascript
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});
```

The `posts` template will then receive a list of all available posts as
its context.

Because `/posts` represents a fixed model, we don't need any
additional information to know what to retrieve.  However, if we want a route
to represent a single post, we would not want to have to hardcode every
possible post into the router.

Enter _dynamic segments_.

A dynamic segment is a portion of a URL that starts with a `:` and is
followed by an identifier.

```javascript
App.Router.map(function() {
  this.resource('posts');
  this.resource('post', { path: '/post/:post_id' });
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  }
});
```

Because this pattern is so common, the above `model` hook is the
default behavior.

For example, if the dynamic segment is `:post_id`, Ember.js is smart
enough to know that it should use the model `App.Post` (with the ID
provided in the URL). Specifically, unless you override `model`, the route will
return `this.store.find('post', params.post_id)` automatically.

Not coincidentally, this is exactly what Ember Data expects. So if you
use the Ember router with Ember Data, your dynamic segments will work
as expected out of the box.

If your model does not use the `id` property in the URL, you should
define a serialize method on your route:

```javascript
App.Router.map(function() {
  this.resource('post', {path: '/posts/:post_slug'});
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    // the server returns `{ slug: 'foo-post' }`
    return Ember.$.getJSON('/posts/' + params.post_slug);
  },

  serialize: function(model) {
    // this will make the URL `/posts/foo-post`
    return { post_slug: model.get('slug') };
  }
});
```

The default `serialize` method inserts the model's `id` into the route's
dynamic segment (in this case, `:post_id`).

### Nested Resources

You can nest both routes and resources:

```javascript
App.Router.map(function() {
  this.resource('post', { path: '/post/:post_id' }, function() {
    this.route('edit');
    this.resource('comments', function() {
      this.route('new');
    });
  });
});
```

This router creates five routes:

<div style="overflow: auto">
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
      <td><code>post</code></td>
      <td><code>App.PostController</code></td>
      <td><code>App.PostRoute</code></td>
      <td><code>post</code></td>
    </tr>
    <tr>
      <td><code>/post/:post_id<sup>2</sup></code></td>
      <td><code>post.index</code></td>
      <td><code>App.PostIndexController</code></td>
      <td><code>App.PostIndexRoute</code></td>
      <td><code>post/index</code></td>
    </tr>
    <tr>
      <td><code>/post/:post_id/edit</code></td>
      <td><code>post.edit</code></td>
      <td><code>App.PostEditController</code></td>
      <td><code>App.PostEditRoute</code></td>
      <td><code>post/edit</code></td>
    </tr>
    <tr>
      <td>N/A</td>
      <td><code>comments</code></td>
      <td><code>App.CommentsController</code></td>
      <td><code>App.CommentsRoute</code></td>
      <td><code>comments</code></td>
    </tr>
    <tr>
      <td><code>/post/:post_id/comments</code></td>
      <td><code>comments.index</code></td>
      <td><code>App.CommentsIndexController</code></td>
      <td><code>App.CommentsIndexRoute</code></td>
      <td><code>comments/index</code></td>
    </tr>
    <tr>
      <td><code>/post/:post_id/comments/new</code></td>
      <td><code>comments.new</code></td>
      <td><code>App.CommentsNewController</code></td>
      <td><code>App.CommentsNewRoute</code></td>
      <td><code>comments/new</code></td>
    </tr>
  </table>
</div>

<small><sup>2</sup> `:post_id` is the post's id.  For a post with id = 1, the route will be:
`/post/1`</small>

The `comments` template will be rendered in the `post` outlet.
All templates under `comments` (`comments/index` and `comments/new`) will be rendered in the `comments` outlet.

The route, controller, and view class names for the comments resource are not prefixed with `Post`. Resources
always reset the namespace, ensuring that the classes can be re-used between multiple parent resources and that
class names don't get longer the deeper nested the resources are.

You are also able to create deeply nested resources in order to preserve the namespace on your routes:

```javascript
App.Router.map(function() {
  this.resource('foo', function() {
    this.resource('foo.bar', { path: '/bar' }, function() {
      this.route('baz'); // This will be foo.bar.baz
    });
  });
});
```

This router creates the following routes:

<div style="overflow: auto">
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
      <td><code>/foo</code></td>
      <td><code>foo.index</code></td>
      <td><code>App.FooIndexController</code></td>
      <td><code>App.FooIndexRoute</code></td>
      <td><code>foo/index</code></td>
    </tr>
    <tr>
      <td><code>/foo/bar</code></td>
      <td><code>foo.bar.index</code></td>
      <td><code>App.FooBarIndexController</code></td>
      <td><code>App.FooBarIndexRoute</code></td>
      <td><code>foo/bar/index</code></td>
    </tr>
    <tr>
      <td><code>/foo/bar/baz</code></td>
      <td><code>foo.bar.baz</code></td>
      <td><code>App.FooBarBazController</code></td>
      <td><code>App.FooBarBazRoute</code></td>
      <td><code>foo/bar/baz</code></td>
    </tr>
  </table>
</div>

### Initial routes

A few routes are immediately available within your application:

  - `App.ApplicationRoute` is entered when your app first boots up. It renders
    the `application` template.

  - `App.IndexRoute` is the default route, and will render the `index` template
    when the user visits `/` (unless `/` has been overridden by your own
    custom route).

Remember, these routes are part of every application, so you don't need to
specify them in `App.Router.map`.

### Wildcard / globbing routes

You can define wildcard routes that will match multiple routes. This could be used, for example,
if you'd like a catchall route which is useful when the user enters an incorrect URL not managed
by your app.

```javascript
App.Router.map(function() {
  this.route('catchall', {path: '/*wildcard'});
});
```

Like all routes with a dynamic segment, you must provide a context when using a `{{link-to}}`
or `transitionTo` to programatically enter this route.

```javascript
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    error: function() {
      this.transitionTo('catchall', 'application-error');
    }
  }
});
```

With this code, if an error bubbles up to the Application route, your application will enter
the `catchall` route and display `/application-error` in the URL.
