Sometimes, especially when nesting resources, we find ourselves needing
to have some kind of connection between two controllers. Let's take this
router as an example:

```javascript
App.Router.map(function() {
  this.resource("post", { path: "/posts/:post_id" }, function() {
    this.resource("comments", { path: "/comments" });
  });
});
```

If we visit a `/posts/1/comments` URL, our `Post` model will get
loaded into a `PostController`'s model, which means it is not directly
accessible in the `CommentsController`. We might however want to display
some information about it in the `comments` template.

To be able to do this we define our `CommentsController` to `need` the `PostController`
which has our desired `Post` model.

```javascript
App.CommentsController = Ember.ArrayController.extend({
  needs: "post"
});
```

This tells Ember that our `CommentsController` should be able to access
its parent `PostController`, which can be done via `controllers.post`
(either in the template or in the controller itself).

```handlebars
<h1>Comments for {{controllers.post.title}}</h1>

<ul>
  {{#each comment in comments}}
    <li>{{comment.text}}</li>
  {{/each}}
</ul>
```

We can also create an aliased property to give ourselves a shorter way to access
the `PostController` (since it is an `ObjectController`, we don't need
or want the `Post` instance directly).

```javascript
App.CommentsController = Ember.ArrayController.extend({
  needs: "post",
  post: Ember.computed.alias("controllers.post")
});
```


If you want to connect multiple controllers together, you can specify an
array of controller names:

```javascript
App.AnotherController = Ember.Controller.extend({
  needs: ['post', 'comments']
});
```

For more information about dependecy injection and `needs` in Ember.js,
see the [dependency injection guide](/guides/understanding-ember/dependency-injection-and-service-lookup).
For more information about aliases, see the API docs for
[aliased properties](/api/#method_computed_alias).
