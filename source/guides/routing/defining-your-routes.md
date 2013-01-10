## Defining Your Routes

When your application starts, the router is responsible for displaying
templates, loading data, and otherwise setting up application state.
It does so by matching the current URL to the _routes_ that you've
defined.

```js
App.Router.map(function(match) {
  match("/about").to("about");
  match("/favs").to("favorites");
});
```

When the user visits `/`, Ember.js will render the `index` template.
Visiting `/about` renders the `about` template, and `/favs` renders the
`favorites` template.

Inside your templates, you can use `{{linkTo}}` to navigate between
routes, using the name that you provided in the `to()` method (or, in
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

You don't need to create an `App.IndexController` just yet; Ember.js
will create controllers for you.

The above examples show you how to customize `/`, which is implicitly
named `index`. Use the name provided to `to()` when customizing other
routes. For example, in the case of `/favs`:

```js
App.FavoritesRoute = Ember.Route.extend({
  setupController: function(controller) {
    // ...controller setup here
  }
});
```

### Nested Routes

You can define nested routes by passing an additional function to the
`to()` method:

```javascript
App.Router.map(function(match) {
  match('/posts').to('posts', function(match) {
    match('/new').to('new');
  });
});
```

This router creates three routes:

* `/`
* `/posts`
* `/posts/new`

Visiting `/` renders the `index` template into the `application`
template's outlet, as you would expect.

Visiting `/posts` is slightly different. It will first render the
`posts` template into the `application` template's outlet. Then, it will
render the `posts/index` template into the `posts` template's outlet.

Finally, visiting `/posts/new` will first render the `posts` template,
then render the `posts/new` template into its outlet.

Customizing routes or controllers uses a similar naming scheme. For
example, to customize `/posts/new`:

* The route is `App.PostsNewRoute`
* The controller is `App.PostsNewController`

This nested naming does not continue forever. A nested route's template
is always `<parent>/<current>`.

<!-- See [Nested Routes][1] for more information. -->

[1]: /guides/routing/nested-routes

### Dynamic Segments

One of the responsibilities of a route handler is to convert a URL
into a model.

For example, if we have the route `match('/blog_posts').to('blogPosts')`, our
route handler might look like this:

```js
App.BlogPostsRoute = Ember.Route.extend({
  model: function() {
    return App.BlogPost.all();
  }
});
```

The `posts` template will then receive a list of all available posts as
its context.

Because `/posts` represents a fixed model, we don't need any additional
information to know what to use.  However, if we want a route to
represent a single post, we would not want to have to hardcode every
possible post into the router.

Enter _dynamic segments_.

A dynamic segment is a portion of a URL that starts with a `:` and is
followed by an identifier.

```js
App.Router.map(function(match) {
  match('/posts').to('blogPosts');
  match('/posts/:blog_post_id').to('showBlogPost');
});

App.ShowBlogPostRoute = Ember.Route.extend({
  model: function(params) {
    return App.BlogPost.find(params.blog_post_id);
  }
});
```

Because this pattern is so common, the above model definition is the
default behavior.

For example, if the dynamic segment is `:blog_post_id`, Ember.js is smart
enough to know that it should use the model `App.BlogPost` (with the ID
provided in the URL). If you use the default `model`, the route will
call `App.BlogPost.find(params.blog_post_id)` for you.

Not coincidentally, this is exactly what Ember Data expects. So if you
use the Ember router with Ember Data, your dynamic segments will work
as expected out of the box.
