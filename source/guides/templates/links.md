## Links (The `{{linkTo}}` Helper)

You create a link to a route using the `{{linkTo}}` helper.

```js
App.Router.map(function() {
  this.resource("posts", function(){
    this.route("post", { path: "/:post_id" });
  });
});
```

```handlebars
<!-- posts.handlebars -->

<ul>
{{#each post in posts}}
  <li>{{#linkTo posts.post post}}{{post.title}}{{/linkTo}}</li>
{{/each}}
</ul>
```

If the model for the `posts` template is a list of three posts, the
rendered HTML would look something like this:

```html
<ul>
  <li><a href="/posts/1">Infinity Madness</a></li>
  <li><a href="/posts/2">Hexadecimal Weirdness</a></li>
  <li><a href="/posts/3">Slashes!</a></li>
</ul>
```

When the rendered link matches the current route, and the same object instance is passed into the helper, then the link is given `class="active"`.

The `{{linkTo}}` helper takes:

* The name of a route. In this example, it would be `index`, `posts`, or
  `post`.
* If the route has a [dynamic segment](/guides/routing/defining-your-routes/#toc_dynamic-segments),
  a model that represents the segment. By default, Ember.js will replace the segment with the
  value of the object's `id` property.
* An optional title which will be bound to the `a` title attribute

### Multiple Contexts

If the route is nested, you can supply a model for each dynamic
segment.

```js
App.Router.map(function() {
  this.resource("posts", function(){
    this.resource("post", { path: "/:post_id" }, function(){
      this.route("comments");
      this.route("comment", { path: "/comments/:comment_id" });
    });
  });
});
```

In the `postIndex` template:

```handlebars
<div class="post">
  {{body}}
</div>

<p>{{#linkTo post.comment primaryComment}}Main Comment{{/linkTo}}</p>
```

Since only a single model was supplied, the link will inherit the
current post for the dynamic segment `:post_id`. The `primaryComment`
will become the new model for the `comment` route handler.

Alternatively, you could pass both a post and a comment to the helper:

```handlebars
<p>
  {{#linkTo post.comment nextPost primaryComment}}
    Main Comment for the Next Post
  {{/linkTo}}
</p>
```

In this case, the models specified will populate both the `:post_id`
and `:comment_id`. The specified `nextPost` will become the new
model for the `post` handler and the `primaryComment` will become the
new model for the `comment` handler.

When transitioning to a new URL, the router will only execute the
handler if:

* the handler became newly active, or
* the model for the handler changes
