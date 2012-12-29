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
than `index`, you can define a handler called `App.IndexState` and
override the `renderTemplates` method:

```javascript
App.IndexRoute = Ember.State.extend({
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
    match('/new').to('newPost');
  });
});
```

When the router matches a 

### Dynamic Segments

Some routes represent a specific model. To know _which_ model
in particular, you can define a route with a _dynamic segment_.
This segment changes based on the ID of the model currently associated
with the state.

For example, these might be the routes for a blog app that can display
either a list of posts, or a particular post:

```javascript
App.Router.map(function(match) {
  match('/posts').to('posts');
  match(/post/:post_id').to('post');
});
```

When the user visits `/post/123`, Ember.js will automatically provide
your state with the model returned by `App.Post.find(123)`.

