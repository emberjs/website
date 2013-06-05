## Links (The `{{linkTo}}` Helper)

You create a link to a route using the `{{linkTo}}` helper.

```js
App.Router.map(function() {
  this.resource("photos", function(){
    this.route("edit", { path: "/:photo_id" });
  });
});
```

```handlebars
<!-- photos.handlebars -->

<ul>
{{#each photo in photos}}
  <li>{{#linkTo photos.edit photo}}{{photo.title}}{{/linkTo}}</li>
{{/each}}
</ul>
```

If the model for the `photos` template is a list of three photos, the
rendered HTML would look something like this:

```html
<ul>
  <li><a href="/photos/1">Happy Kittens</a></li>
  <li><a href="/photos/2">Puppy Running</a></li>
  <li><a href="/photos/3">Mountain Landscape</a></li>
</ul>
```

When the rendered link matches the current route, and the same
object instance is passed into the helper, then the link is given
`class="active"`.

The `{{linkTo}}` helper takes:

* The name of a route. In this example, it would be `index`, `photos`, or
  `photos.edit`.
* If the route has a [dynamic segment](/guides/routing/defining-your-routes/#toc_dynamic-segments),
  a model that represents the segment. By default, Ember.js will replace the segment with the
  value of the object's `id` property.
* An optional title which will be bound to the `a` title attribute

### Multiple Contexts

If the route is nested, you can supply a model for each dynamic
segment.

```js
App.Router.map(function() {
  this.resource("photos", function(){
    this.resource("photo", { path: "/:photo_id" }, function(){
      this.route("comments");
      this.route("comment", { path: "/comments/:comment_id" });
    });
  });
});
```

In the `photoIndex` template:

```handlebars
<div class="photo">
  {{body}}
</div>

<p>{{#linkTo photo.comment primaryComment}}Main Comment{{/linkTo}}</p>
```

Since only a single model was supplied, the link will inherit the
current photo for the dynamic segment `:photo_id`. The `primaryComment`
will become the new model for the `comment` route handler.

Alternatively, you could pass both a photo and a comment to the helper:

```handlebars
<p>
  {{#linkTo photo.comment nextPhoto primaryComment}}
    Main Comment for the Next Photo
  {{/linkTo}}
</p>
```

In this case, the models specified will populate both the `:photo_id`
and `:comment_id`. The specified `nextPhoto` will become the new
model for the `photo` handler and the `primaryComment` will become the
new model for the `comment` handler.

When transitioning to a new URL, the router will only execute the
handler if:

* the handler became newly active, or
* the model for the handler changes
