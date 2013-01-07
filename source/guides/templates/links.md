## Links (The `{{linkTo}}` Helper)

You create a link to a route using the `{{linkTo}}` helper.

```js
App.Router.map(function(match) {
  match('/').to('index');
  match('/posts').to('posts');
  match('/posts/:post_id').to('post');
});
```

```handlebars
<!-- posts.handlebars -->

<ul>
{{#each post in posts}}
  <li>{{#linkTo "post" post}}{{post.title}}{{/linkTo}}</li>
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

The `{{linkTo}}` helper takes:

* The name of a route. In this example, it would be `index`, `posts`, or
  `post`.
* If the route has a dynamic segment, a model that represents the
  segment. By default, Ember.js will replace the segment with the
  value of the object's `id` property.
* An optional title which will be bound to the `a` title attribute

### Multiple Contexts

If the route is nested, you can supply a model for each dynamic
segment.

```js
App.Router.map(function(match) {
  match('/posts').to('posts', function(match) {
    match('/:post_id').to('post', function(match) {
      match('/').to('postIndex');
      match('/comments').to('comments');
      match('/comments/:comment_id').to('comment');
    });
  });
});
```

In the `postIndex` template:

```handlebars
<div class="post">
  {{body}}
</div>

<p>{{#linkTo 'comment' primaryComment}}Main Comment{{/linkTo}}</p>
```

Since only a single model was supplied, the link will inherit the
current post for the dynamic segment `:post_id`. The `primaryComment`
will become the new model for the `comment` route handler.

Alternatively, you could pass both a post and a comment to the helper:

```handlebars
<p>
  {{#linkTo 'comment' nextPost primaryComment}}
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
