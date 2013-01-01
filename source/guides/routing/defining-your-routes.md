## Defining Your Routes

When your application starts, the router is responsible for displaying
templates, loading data, and otherwise setting up application state.
It does so by matching the current URL to the _routes_ that you've
defined.

Most applications will start by defining what happens when the user
navigates to `/`, the application's home page:

```javascript
App.Router.map(function(match) {
  match('/').to('index');
});
```

The above example tells Ember.js to map the route `/` to the `index`
_route handler_. By default, this renders the template of the same name.

You can customize the behavior of a route handler by defining an
`Ember.Route`. For example, if you wanted to render a template other
than `index`, you can define a handler called `App.IndexRoute` and
override the `renderTemplates` method:

```javascript
App.IndexRoute = Ember.Route.extend({
  renderTemplates: function() {
    this.render('other-template');
  }
});
```

You can define as many routes inside the `map` function as you'd like:

```javascript
App.Router.map(function(match) {
  match('/').to('index');
  match('/posts').to('posts');
  match('/user/favorites').to('starredSongs');
});
```

Visiting `/posts` would render the `posts` template, and visiting
`/user/favorites` would render the `starredSongs` template. If you
wanted to customize the behavior of these routes, you would define
`App.PostsRoute` and `App.StarredSongsRoute`, respectively.

### Nested Routes

You can define nested routes by passing an additional function to the
`to()` method:

```javascript
App.Router.map(function(match) {
  match('/').to('index');
  match('/posts').to('posts', function(match) {
    match('/').to('postIndex');
    match('/new').to('newPost');
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
render the `postIndex` template into the `posts` template's outlet.

Finally, visiting `/posts/new` will first render the `posts` template,
then render the `newPost` template into its outlet.

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
