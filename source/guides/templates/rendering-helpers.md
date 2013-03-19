## Rendering Helpers

Ember provides several helpers that allow you to render other views and templates in different ways.

### The `{{partial}}` Helper

`{{partial}}` takes the template to be rendered as an argument, and renders that template in place.

`{{partial}}` does not change context or scope.  It simply drops the given template into place with the current scope.  

```handlebars
<script type="text/x-handlebars" data-template-name='author'>
  Written by {{author.firstName}} {{author.lastName}}
</script>

<script type="text/x-handlebars" data-template-name='post'>
  <h1>{{title}}</h1>
  <div>{{body}}</div>
  {{partial "author"}}
</script>
```

Note: in cases where you may have used `{{template}}` in the past, you should likely use `{{partial}}` instead.

### The `{{view}}` Helper

This helper works like the partial helper, except instead of providing a template to be rendered within the current template, you provide a view class.  The view controls what template is rendered.

```handlebars
<script type="text/x-handlebars" data-template-name='author'>
  Written by {{firstName}} {{lastName}}. 
</script>

<script type="text/x-handlebars" data-template-name='post'>
  <h1>{{title}}</h1>
  <div>{{body}}</div>
  {{view App.AuthorView}}
</script>
```

For more information, see [Inserting Views in Templates](/guides/views/inserting-views-in-templates)

### The `{{render}}` Helper

`{{render}}` takes two parameters:

* The first parameter describes the context to be setup
* The optional second parameter is a model, which will be passed to the controller if provided

`{{render}}` does several things:

* Gets the singleton instance of the corresponding controller
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
    // some logic
  }.property("model")
})
```

In this example, render will:

* Gets an instance of App.AuthorView if that class exists, otherwise uses a default generated view
* Use the corresponding template (in this case the default of "author")
* Get (or generate) the singleton instance of AuthorController
* Set the AuthorController's model to the 2nd argument passed to render, here the author field on the post
* Render the template in place, with the context created in the previous steps.

Note: `{{render}}` cannot be called multiple times for the same route.  For that you'll need `{{control}}`.

### The `{{control}}` Helper

`{{control}}` works like render, except it uses a new controller instance for every call, instead of reusing the singleton controller.

This helper is currently under heavy development, and will likely change soon.