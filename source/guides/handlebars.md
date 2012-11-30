## Describing Your UI with Handlebars

### Ember.View

You can use `Ember.View` to render a Handlebars template and insert it into the DOM.

To tell the view which template to use, set its `templateName` property. For example, if I had a `<script>` tag like this:

```handlebars
<html>
  <head>
    <script type="text/x-handlebars" data-template-name="say-hello">
      Hello, <b>{{name}}</b>
    </script>
  </head>
</html>
```

I would set the `templateName` property to `"say-hello"`.

```javascript
var view = Ember.View.create({
  templateName: 'say-hello',
  name: "Bob"
});
```

Note: For the remainder of the guide, the `templateName` property will be omitted from most examples. You can assume that if we show a code sample that includes an Ember.View and a Handlebars template, the view has been configured to display that template via the `templateName` property.

You can append views to the document by calling `appendTo`:

```javascript
  view.appendTo('#container');
```

As a shorthand, you can append a view to the document body by calling `append`:

```javascript
  view.append();
```

To remove a view from the document, call `remove`:

```javascript
  view.remove();
```

### Handlebars Basics

As you've already seen, you can print the value of a property by enclosing it in a Handlebars expression, or a series of braces, like this:

```handlebars
My new car is {{color}}.
```

This will look up and print the View's `color` property. For example, if your view looks like this:

```javascript
App.CarView = Ember.View.extend({
  color: 'blue'
});
```

Your view would appear in the browser like this:

```html
My new car is blue.
```

You can also specify global paths:

```handlebars
My new car is {{App.carController.color}}.
```

(Ember determines whether a path is global or relative to the view by checking whether the first letter is capitalized,
which is why your `Ember.Application` instance should start with a capital letter.)

All of the features described in this guide are __bindings aware__. That means that if the values used by your templates ever change, your HTML will be updated automatically. It's like magic.

In order to know which part of your HTML to update when an underlying property changes, Handlebars will insert marker elements with a unique ID. If you look at your application while it's running, you might notice these extra elements:

```html
My new car is
<script id="metamorph-0-start" type="text/x-placeholder"></script>
blue
<script id="metamorph-0-end" type="text/x-placeholder"></script>.
```

Because all Handlebars expressions are wrapped in these markers, make sure each HTML tag stays inside the same block. For example, you shouldn't do this:

```handlebars
<!-- Don't do it! -->
<div {{#if isUrgent}}class="urgent"{{/if}}>
```

If you want to avoid your property output getting wrapped in these markers, use the `unbound` helper:

```handlebars
My new car is {{unbound color}}.
```

Your output will be free of markers, but be careful, because the output won't be automatically updated!

```html
My new car is blue.
```


### Building a View Hierarchy

So far, we've discussed writing templates for a single view. However, as your application grows, you will often want to create a hierarchy of views to encapsulate different areas on the page. Each view is responsible for handling events and maintaining the properties needed to display it.

### {{view}}

To add a child view to a parent, use the `{{view}}` helper, which takes a path to a view class.

```javascript
// Define parent view
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann"
});

// Define child view
App.InfoView = Ember.View.extend({
  templateName: 'info',

  posts: 25,
  hobbies: "Riding bicycles"
});
```

```handlebars
User: {{firstName}} {{lastName}}
{{view App.InfoView}}
```

```handlebars
<b>Posts:</b> {{view.posts}}
<br>
<b>Hobbies:</b> {{view.hobbies}}
```

If we were to create an instance of `App.UserView` and render it, we would get
a DOM representation like this:

```html
User: Albert Hofmann
<div>
  <b>Posts:</b> 25
  <br>
  <b>Hobbies:</b> Riding bicycles
</div>
```

#### Relative Paths

Instead of specifying an absolute path, you can also specify which view class
to use relative to the parent view. For example, we could nest the above view
hierarchy like this:

```javascript
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann",

  infoView: Ember.View.extend({
    templateName: 'info',

    posts: 25,
    hobbies: "Riding bicycles"
  })
});
```

```handlebars
User: {{firstName}} {{lastName}}
{{view infoView}}
```

When nesting a view class like this, make sure to use a lowercase
letter, as Ember will interpret a property with a capital letter as a
global property.

### Setting Child View Templates

If you'd like to specify the template your child views use inline in
the main template, you can use the block form of the `{{view}}` helper.
We might rewrite the above example like this:

```javascript
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann"
});

App.InfoView = Ember.View.extend({
  posts: 25,
  hobbies: "Riding bicycles"
});
```

```handlebars
User: {{firstName}} {{lastName}}
{{#view App.InfoView}}
  <b>Posts:</b> {{view.posts}}
  <br>
  <b>Hobbies:</b> {{view.hobbies}}
{{/view}}
```

When you do this, it may be helpful to think of it as assigning views to
portions of the page. This allows you to encapsulate event handling for just
that part of the page.

### Setting Up Bindings

So far in our examples, we have been setting static values directly on the
views. But to best implement an MVC architecture, we should actually be binding
the properties of our views to the controller layer.

Let's set up a controller to represent our user data:

```javascript
App.userController = Ember.Object.create({
  content: Ember.Object.create({
    firstName: "Albert",
    lastName: "Hofmann",
    posts: 25,
    hobbies: "Riding bicycles"
  })
});
```

Now let's update `App.UserView` to bind to `App.userController`:

```javascript
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstNameBinding: 'App.userController.content.firstName',
  lastNameBinding: 'App.userController.content.lastName'
});
```

When we only have a few bindings to configure, like with `App.UserView`, it is
sometimes useful to be able to declare those bindings in the template. You can
do that by passing additional arguments to the `{{#view}}` helper. If all
you're doing is configuring bindings, this often allows you to bypass having to
create a new subclass.

```handlebars
User: {{firstName}} {{lastName}}
{{#view App.UserView postsBinding="App.userController.content.posts"
        hobbiesBinding="App.userController.content.hobbies"}}
  <b>Posts:</b> {{view.posts}}
  <br>
  <b>Hobbies:</b> {{view.hobbies}}
{{/view}}
```

NOTE: You can actually pass __any__ property as a parameter to {{view}}, not
just bindings. However, if you are doing anything other than setting up
bindings, it is generally a good idea to create a new subclass.

### Modifying a View's HTML

When you append a view, it creates a new HTML element that holds its content.
If your view has any child views, they will also be displayed as child nodes
of the parent's HTML element.

By default, new instances of `Ember.View` create a `<div>` element. You can
override this by passing a `tagName` parameter:

```handlebars
{{view App.InfoView tagName="span"}}
```

You can also assign an ID attribute to the view's HTML element by passing an `id` parameter:

```handlebars
{{view App.InfoView id="info-view"}}
```

This makes it easy to style using CSS ID selectors:

```css
/** Give the view a red background. **/
  #info-view {
    background-color: red;
  }
```

You can assign class names similarly:

```handlebars
{{view App.InfoView class="info urgent"}}
```

You can bind class names to a property of the view by using `classBinding` instead of `class`. The same behavior as described in `bindAttr` applies:

```javascript
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});
```

```handlebars
{{view App.AlertView classBinding="isUrgent priority"}}
```

This yields a view wrapper that will look something like this:

```html
<div id="sc420" class="sc-view is-urgent p4"></div>
```



### Included Views

Ember comes pre-packaged with a set of views for building a few basic controls like text inputs, check boxes, and select lists.

They are:

####Ember.Checkbox
	
```handlebars
    <label>
      {{view Ember.Checkbox checkedBinding="content.isDone"}}
      {{content.title}}
    </label>
```
	
####Ember.TextField
	
```javascript
	App.MyText = Ember.TextField.extend({
	    formBlurredBinding: 'App.adminController.formBlurred',
	    change: function(evt) {
	      this.set('formBlurred', true);
	    }
	  });
```
	
####Ember.Select
	
```handlebars
	{{view Ember.Select viewName="select"
                          contentBinding="App.peopleController"
                          optionLabelPath="content.fullName"
                          optionValuePath="content.id"
                          prompt="Pick a person:"
                          selectionBinding="App.selectedPersonController.person"}}
```
	
####Ember.TextArea
	
```javascript
	var textArea = Ember.TextArea.create({
      		valueBinding: 'TestObject.value'
    		});
```
	

If you would like to add one of these controls to your view, you are encouraged to extend from these controls.

Events do not bubble from a subview to a parent view so extending these views is the only way to capture those events.

Example:

```javascript
App.MyText = Ember.TextField.extend({
    formBlurredBinding: 'App.adminController.formBlurred',
    change: function(evt) {
      this.set('formBlurred', true);
    }
  });
```

You can then use this view as a sub view and capture the events.  In the following example, a change to the Name input would blurr the form and cause the save button to appear.

```handlebars
<script id="formDetail" data-template-name='formDetail' type="text/x-handlebars">
    <form>
        <fieldset>
           <legend>Info:</legend>                 
           
                   {{view App.MyText name="Name" id="Name"  valueBinding="myObj.Name"}} 
	               <label for="Name">Name</label><br/>
                   
                   {{#if formBlurred}}
                    <a href="#" {{action "syncData" on="click"}}>Save</a>
                    {{/if}}
               
        </fieldset>
    </form>
</script>
```
