## Describing Your UI with Handlebars

### Handlebars

Ember comes bundled with [Handlebars](http://www.handlebarsjs.com), a semantic templating language. These templates look like regular HTML, with embedded expressions.

You should store your Handlebars templates inside your application's HTML file. At runtime, Ember will compile these templates so they are available for you to use in your views.

To immediately insert a template into your document, place it inside a `<script>` tag within your `<body>` tag:

```html
<html>
  <body>
    <script type="text/x-handlebars">
      Hello, <b>{{MyApp.name}}</b>
    </script>
  </body>
</html>
```

To make a template available to be used later, give the `<script>` tag a `data-template-name` attribute:

```html
<html>
  <head>
    <script type="text/x-handlebars" data-template-name="say-hello">
      Hello, <b>{{MyApp.name}}</b>
    </script>
  </head>
</html>
```

### Ember.View

You can use `Ember.View` to render a Handlebars template and insert it into the DOM.

To tell the view which template to use, set its `templateName` property. For example, if I had a `<script>` tag like this:

```html
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

```html
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

```html
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

```html
<!-- Don't do it! -->
<div {{#if isUrgent}}class="urgent"{{/if}}>
```

If you want to avoid your property output getting wrapped in these markers, use the `unbound` helper:

```html
My new car is {{unbound color}}.
```

Your output will be free of markers, but be careful, because the output won't be automatically updated!

```html
My new car is blue.
```

### {{#if}}, {{else}}, and {{#unless}}

Sometimes you may only want to display part of your template if a property
exists. For example, let's say we have a view with a `person` property that
contains an object with `firstName` and `lastName` fields:

```javascript
App.SayHelloView = Ember.View.extend({
  person: Ember.Object.create({
    firstName: "Joy",
    lastName: "Clojure"
  })
});
```

In order to display part of the template only if the `person` object exists, we
can use the `{{#if}}` helper to conditionally render a block:

```html
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{/if}}
```

Handlebars will not render the block if the argument passed evaluates to
`false`, `undefined`, `null` or `[]` (i.e., any "falsy" value).

If the expression evaluates to falsy, we can also display an alternate template
using `{{else}}`:

```html
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{else}}
  Please log in.
{{/if}}
```

To only render a block if a value is falsy, use `{{#unless}}`:

```html
{{#unless hasPaid}}
  You owe: ${{total}}
{{/unless}}
```

`{{#if}}` and `{{#unless}}` are examples of block expressions. These allow you
to invoke a helper with a portion of your template. Block expressions look like
normal expressions except that they contain a hash (#) before the helper name,
and require a closing expression.

### {{#with}}

Sometimes you may want to invoke a section of your template with a context
different than the Ember.View. For example, we can clean up the above template by
using the `{{#with}}` helper:

```html
{{#with person}}
  Welcome back, <b>{{firstName}} {{lastName}}</b>!
{{/with}}
```

`{{#with}}` changes the _context_ of the block you pass to it. The context
is the object on which properties are looked up. By default, the context is the
Ember.View to which the template belongs.

### Binding Element Attributes with {{bindAttr}}

In addition to text, you may also want your templates to dictate the attributes
of your HTML elements. For example, imagine a view that contains a URL:

```javascript
App.LogoView = Ember.View.extend({
  logoUrl: 'http://www.mycorp.com/images/logo.png'
});
```

The best way to display the URL as an image in Handlebars is like this:

```html
<div id="logo">
  <img {{bindAttr src="logoUrl"}} alt="Logo">
</div>
```

This generates the following HTML:

```html
<div id="logo">
  <img src="http://www.mycorp.com/images/logo.png" alt="Logo">
</div>
```

If you use `{{bindAttr}}` with a Boolean value, it will add or remove the specified attribute. For example, given this Ember view:

```javascript
App.InputView = Ember.View.extend({
  isDisabled: true
});
```

And this template:

```html
<input type="checkbox" {{bindAttr disabled="isDisabled"}}>
```

Handlebars will produce the following HTML element:

```html
<input type="checkbox" disabled>
```

### Binding Class Names with {{bindAttr}}

The `class` attribute can be bound like any other attribute, but it also has some additional special behavior. The default behavior works like you'd expect:

```javascript
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});
```

```html
<div {{bindAttr class="priority"}}>
  Warning!
</div>
```

This template will emit the following HTML:

```html
<div class="p4">
  Warning!
</div>
```

If the value to which you bind is a Boolean, however, the dasherized version of that property will be applied as a class:

```html
<div {{bindAttr class="isUrgent"}}>
  Warning!
</div>
```

This emits the following HTML:

```html
<div class="is-urgent">
  Warning!
</div>
```

Unlike other attributes, you can also bind multiple classes:

```javascript
<div {{bindAttr class="isUrgent priority"}}>
  Warning!
</div>
```

You can also specify an alternate class name to use, instead of just
dasherizing.

```javascript
<div {{bindAttr class="isUrgent:urgent"}}>
  Warning!
</div>
```

In this case, if the `isUrgent` property is true, the `urgent` class
will be added. If it is false, the `urgent` class will be removed.

### Handling Events with {{action}}

Use the `{{action}}` helper to attach a handler in your view class to an event triggered on an element.

To attach an element's `click` event to the `edit()` handler in the current view:

```javascript
<a href="#" {{action "edit" on="click"}}>Edit</a>
```

Because the default event is `click`, this could be written more concisely as:

```javascript
<a href="#" {{action "edit"}}>Edit</a>
```

Although the view containing the `{{action}}` helper will be targeted by default, it is possible to target a different view:

```javascript
<a href="#" {{action "edit" target="parentView"}}>Edit</a>
```

The action handler can optionally accept a jQuery event object, which will be extended to include `view` and `context` properties. These properties can be useful when targeting a different view with your action. For instance:

```javascript
App.ListingView = Ember.View.extend({
  templateName: 'listing',

  edit: function(event) {
    event.view.set('isEditing', true);
  }
});
```

Any of the templates discussed above will produce an HTML element like this:

```html
<a href="#" data-ember-action="3">Edit</a>
```

Ember will delegate the event you specified to your target view's handler based upon the internally assigned `data-ember-action` id.


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

```html
User: {{firstName}} {{lastName}}
{{view App.InfoView}}
```

```html
<b>Posts:</b> {{posts}}
<br>
<b>Hobbies:</b> {{hobbies}}
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

```html
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

```html
User: {{firstName}} {{lastName}}
{{#view App.InfoView}}
  <b>Posts:</b> {{posts}}
  <br>
  <b>Hobbies:</b> {{hobbies}}
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

```html
User: {{firstName}} {{lastName}}
{{#view App.UserView postsBinding="App.userController.content.posts"
        hobbiesBinding="App.userController.content.hobbies"}}
  <b>Posts:</b> {{posts}}
  <br>
  <b>Hobbies:</b> {{hobbies}}
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

```html
{{view App.InfoView tagName="span"}}
```

You can also assign an ID attribute to the view's HTML element by passing an `id` parameter:

```html
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

```html
{{view App.InfoView class="info urgent"}}
```

You can bind class names to a property of the view by using `classBinding` instead of `class`. The same behavior as described in `bindAttr` applies:

```javascript
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});
```

```html
{{view App.AlertView classBinding="isUrgent priority"}}
```

This yields a view wrapper that will look something like this:

```html
<div id="sc420" class="sc-view is-urgent p4"></div>
```

### Displaying a List of Items

If you need to enumerate over a list of objects, use Handlebar's `{{#each}}` helper:

```javascript
App.PeopleView = Ember.View.extend({
  people: [ { name: 'Yehuda' },
            { name: 'Tom' } ]
});
```

```html
<ul>
  {{#each people}}
    <li>Hello, {{name}}!</li>
  {{/each}}
</ul>
```

This will print a list like this:

```html
<ul>
  <li>Hello, Yehuda!</li>
  <li>Hello, Tom!</li>
</ul>
```

If you want to create a view for every item in a list, you can bind a property of the view to
the current context. For example, this example creates a view for every item in a list and sets
the `content` property to that item:

```html
{{#each App.peopleController}}
  {{#view App.PersonView contentBinding="this"}}
    {{content.firstName}} {{content.lastName}}
  {{/view}}
{{/each}}
```

### Writing Custom Helpers

Sometimes, you may use the same HTML in your application multiple times. In those case, you can register a custom helper that can be invoked from any Handlebars template.

For example, imagine you are frequently wrapping certain values in a `<span>` tag with a custom class. You can register a helper from your JavaScript like this:

```javascript
Handlebars.registerHelper('highlight', function(property) {
  var value = Ember.getPath(this, property);
  return new Handlebars.SafeString('<span class="highlight">'+value+'</span>');
});
```

If you return HTML from a helper, and you don't want it to be escaped,
make sure to return a new `SafeString`.

Anywhere in your Handlebars templates, you can now invoke this helper:

```html
{{highlight name}}
```

and it will output the following:

```html
<span class="highlight">Peter</span>
```

NOTE: Parameters to helper functions are passed as names, not their current values. This allows you to optionally set up observers on the values. To get the current value of the parameter, use Ember.getPath, as shown above.

### Included Views

Ember comes pre-packaged with a set of views for building a few basic controls like text inputs, check boxes, and select lists.

They are:

####Ember.Button
	
```javascript
	var button = Ember.Button.create({
    		target: 'MyApp.myActionObject',
    		action: 'myAction'
  	});
```
####Ember.Checkbox
	
```html
		{{view Ember.Checkbox titleBinding="content.title" valueBinding="content.isDone"}}
```
	
####Ember.TextField
	
```javascript
	App.myText = Ember.TextField.extend({
	    formBlurredBinding: 'App.adminController.formBlurred',
	    change: function(evt) {
	      this.set('formBlurred', true);
	    }
	  });
```
	
####Ember.Select
	
```html
	{{view Ember.Select viewName="select"
                          contentBinding="app.peopleController"
                          optionLabelPath="content.fullName"
                          optionValuePath="content.id"
                          prompt="Pick a person:"
                          selectionBinding="app.selectedPersonController.person"}}
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
App.myText = Ember.TextField.extend({
    formBlurredBinding: 'App.adminController.formBlurred',
    change: function(evt) {
      this.set('formBlurred', true);
    }
  });
```

You can then use this view as a sub view and capture the events.  In the following example, a change to the Name input would blurr the form and cause the save button to appear.

```html
<script id="formDetail" data-template-name='formDetail' type="text/x-handlebars">
    <form>
        <fieldset>
           <legend>Info:</legend>                 
           
                   {{view App.myText name="Name" id="Name"  valueBinding="myObj.Name"}} 
	               <label for="Name">Name</label><br/>
                   
                   {{#if formBlurred}}
                    <a href="#" {{action "syncData" on="click"}}>Save</a>
                    {{/if}}
               
        </fieldset>
    </form>
</script>
```
