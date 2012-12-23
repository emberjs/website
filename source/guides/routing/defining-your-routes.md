## Defining Your Routes

When your application starts, the router is responsible for recognizing
the current URL and selecting the current _state_. This state object is
responsible for rendering templates, finding models, configuring
controllers, and responding to actions from templates and views.

Most applications will start by defining what happens when the user
navigates to `/`, the application's home page:

```javascript
App.Router.map(function(match) {
  match('/').to('index');
});
```

The above example tells Ember.js to map the route `/` to the state
`index`, which by default renders the template of the same name.

You can customize the behavior of a state by defining an `Ember.State`.
For example, because the above route maps to the `index` state, you
would define a state called `App.IndexState`:

```javascript
App.IndexState = Ember.State.extend({
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
  match('/author').to('author');
});
```

These would correspond to `App.IndexState`, `App.PostsState` and
`App.AuthorState`, respectively.

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

### Nested States
