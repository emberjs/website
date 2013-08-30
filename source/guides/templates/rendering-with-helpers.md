Ember provides several helpers that allow you to render other views and templates in different ways.

### The `{{partial}}` Helper

`{{partial}}` takes the template to be rendered as an argument, and renders that template in place.

`{{partial}}` does not change context or scope.  It simply drops the given template into place with the current scope.  

```handlebars
<script type="text/x-handlebars" data-template-name='_author'>
  Written by {{author.firstName}} {{author.lastName}}
</script>

<script type="text/x-handlebars" data-template-name='post'>
  <h1>{{title}}</h1>
  <div>{{body}}</div>
  {{partial "author"}}
</script>
```

```html
<div>
  <h1>Why You Should Use Ember.JS</h1>
  <div>Because it's awesome!</div>
  Written by Yehuda Katz
</div>
```

The partial's `data-template-name` must start with an underscore (e.g. `data-template-name='_author'` or `data-template-name='foo/_bar'`)

### The `{{view}}` Helper

This helper works like the partial helper, except instead of providing a template to be rendered within the current template, you provide a view class.  The view controls what template is rendered.

```javascript
App.AuthorView = Ember.View.extend({
  // We are setting templateName manually here to the default value
  templateName: "author",

  // A fullName property should probably go on App.Author, 
  // but we're doing it here for the example
  fullName: (function() {
    return this.get("author").get("firstName") + " " + this.get("author").get("lastName");
  }).property("firstName","lastName")
})
```

```handlebars
<script type="text/x-handlebars" data-template-name='author'>
  Written by {{view.fullName}}
</script>

<script type="text/x-handlebars" data-template-name='post'>
  <h1>{{title}}</h1>
  <div>{{body}}</div>
  {{view App.AuthorView authorBinding=author}}
</script>
```

```html
<div>
  <h1>Why You Should Use Ember.JS</h1>
  <div>Because it's awesome!</div>
  Written by Yehuda Katz
</div>
```

When using `{{partial "author"}}`:

* No instance of App.AuthorView will be created
* The given template will be rendered

When using `{{view App.AuthorView}}`:

* An instance of App.AuthorView will be created
* It will be rendered here, using the template associated with that view (the default template being "author")

For more information, see [Inserting Views in Templates](/guides/views/inserting-views-in-templates)

### The `{{render}}` Helper

`{{render}}` takes two parameters:

* The first parameter describes the context to be setup
* The optional second parameter is a model, which will be passed to the controller if provided

`{{render}}` does several things:

* When no model is provided it gets the singleton instance of the corresponding controller
* When a model is provided it gets a unique instance of the corresponding controller
* Renders the named template using this controller
* Sets the model of the corresponding controller 

Modifying the post / author example slightly:

```handlebars
<script type="text/x-handlebars" data-template-name='author'>
  Written by {{firstName}} {{lastName}}. 
  Total Posts: {{postCount}}
</script>

<script type="text/x-handlebars" data-template-name='post'>
  <h1>{{title}}</h1>
  <div>{{body}}</div>
  {{render "author" author}}
</script>
```

```javascript
App.AuthorController = Ember.ObjectController.extend({
  postCount: function() { 
    return App.Post.countForAuthor(this.get("model"));
  }.property("model","App.Post.@each.author")
})
```

In this example, render will:

* Get an instance of App.AuthorView if that class exists, otherwise uses a default generated view
* Use the corresponding template (in this case the default of "author")
* Get (or generate) the singleton instance of AuthorController
* Set the AuthorController's model to the 2nd argument passed to render, here the author field on the post
* Render the template in place, with the context created in the previous steps.

`{{render}}` does not require the presence of a matching route.  

`{{render}}` is similar to `{{outlet}}`. Both tell Ember to devote this portion of the page to something.

`{{outlet}}`: The router determines the route and sets up the appropriate controllers/views/models.
`{{render}}`: You specify (directly and indirectly) the appropriate controllers/views/models.



Note: `{{render}}` cannot be called multiple times for the same route when not specifying a model.  For that you'll need `{{control}}`.

### The `{{control}}` Helper

`{{control}}` works like render, except it uses a new controller instance for every call, instead of reusing the singleton controller.

This helper is currently under heavy development, and will likely change soon.

Note: The `{{control}}` helper is currently disabled by default. To enable it set `ENV.EXPERIMENTAL_CONTROL_HELPER = true` before requiring Ember.

### Comparison Table

#### General

<table>
  <thead>
  <tr>
    <th>Helper</th>
    <th>Template</th>
    <th>Model</th>
    <th>View</th>
    <th>Controller</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>{{partial}}</code></td>
    <td>Specified Template</td>
    <td>Current Model</td>
    <td>Current View</td>
    <td>Current Controller</td>
  </tr>
  <tr>
    <td><code>{{view}}</code></td>
    <td>View's Template</td>
    <td>Current Model</td>
    <td>Specified View</td>
    <td>Current Controller</td>
  </tr>
  <tr>
    <td><code>{{render}}</code></td>
    <td>View's Template</td>
    <td>Specified Model</td>
    <td>Specified View</td>
    <td>Specified Controller</td>
  </tr>
  </tbody>
</table>

#### Specific

<table>
  <thead>
  <tr>
    <th>Helper</th>
    <th>Template</th>
    <th>Model</th>
    <th>View</th>
    <th>Controller</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>{{partial author}}</code></td>
    <td><code>author.hbs</code></td>
    <td>Post</td>
    <td><code>App.PostView</code></td>
    <td><code>App.PostController</code></td>
  </tr>
  <tr>
    <td><code>{{view App.AuthorView}}</code></td>
    <td><code>author.hbs</code></td>
    <td>Post</td>
    <td><code>App.AuthorView</code></td>
    <td><code>App.PostController</code></td>
  </tr>
  <tr>
    <td><code>{{render author author}}</code></td>
    <td><code>author.hbs</code></td>
    <td>Author</td>
    <td><code>App.AuthorView</code></td>
    <td><code>App.AuthorController</code></td>
  </tr>
  </tbody>
</table>
