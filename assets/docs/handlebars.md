## Describing Your UI with Handlebars

### Handlebars

Ember comes bundled with [Handlebars](http://www.handlebarsjs.com), a semantic templating language. These templates look like regular HTML, with embedded expressions.

You should store your Handlebars templates inside your application's HTML file. At runtime, Ember will compile these templates so they are available for you to use in your views.

To immediately insert a template into your document, place it inside a `<script>` tag within your `<body>` tag:

<pre class="brush: xml;">
&lt;html>
  &lt;body>
    &lt;script type="text/x-handlebars">
      Hello, <b>{{MyApp.name}}</b>
    &lt;/script>
  &lt;/body>
&lt;/html>
</pre>

To make a template available to be used later, give the `<script>` tag a name attribute:

<pre class="brush: xml;">
&lt;html>
  &lt;head>
    &lt;script type="text/x-handlebars" data-template-name="say-hello">
      Hello, <b>{{MyApp.name}}</b>
    &lt;/script>
  &lt;/head>
&lt;/html>
</pre>

### Ember.View

You can use Ember.View to render a Handlebars template and insert it into the DOM.

To tell the view which template to use, set its `templateName` property. For example, if I had a `<script>` tag like this:

<pre class="brush: xml;">
&lt;html>
  &lt;head>
    &lt;script type="text/x-handlebars" data-template-name="say-hello">
      Hello, <b>{{name}}</b>
    &lt;/script>
  &lt;/head>
&lt;/html>
</pre>

I would set the `templateName` property to `"say-hello"`.

<pre class="brush: js;">
var view = Em.TemplateView.create({
  templateName: 'say-hello',
  name: "Bob"
});
</pre>

NOTE: For the remainder of the guide, the `templateName` property will be omitted from most examples. You can assume that if we show a code sample that includes an Ember.View and a Handlebars template, the view has been configured to display that template via the `templateName` property.

### Handlebars Basics

As you've already seen, you can print the value of a property by enclosing it in a Handlebars expression, or a series of braces, like this:

<pre class="brush: xml;">
My new car is {{color}}.
</pre>

This will look up and print the TemplateView's `color` property. For example, if your view looks like this:

<pre class="brush: js;">
App.CarView = Ember.View.extend({
  color: 'blue'
});
</pre>

Your view would appear in the browser like this:

<pre class="brush: xml;">
My new car is blue.
</pre>

All of the features described in this guide are __bindings aware__. That means that if the values used by your templates ever change, your HTML will be updated automatically. It's like magic.

In order to know which part of your HTML to update when an underlying property changes, Handlebars will insert marker elements with a unique ID. If you look at your application while it's running, you might notice these extra elements:

<pre class="brush: xml;">
My new car is <span id="sc232">blue</span>.
</pre>

Because all Handlebars expressions are wrapped in these markers, make sure each HTML tag stays inside the same block. For example, you shouldn't do this:

<pre class="brush: xml;">
<!-- Don't do it! -->
<div {{#if isUrgent}}class="urgent"{{/if}}>
</pre>

If you want to avoid your property output getting wrapped in these markers, use the `unbound` helper:

<pre class="brush: xml;">
My new car is {{unbound color}}.
</pre>

Your output will be free of markers, but be careful, because the output won't be automatically updated!

<pre class="brush: xml;">
My new car is blue.
</pre>

### {{#if}}, {{else}}, and {{#unless}}

Sometimes you may only want to display part of your template if a property
exists. For example, let's say we have a view with a `person` property that
contains an object with `firstName` and `lastName` fields:

<pre class="brush: js;">
App.SayHelloView = Ember.View.extend({
  person: Ember.Object.create({
    firstName: "Joy",
    lastName: "Clojure"
  })
});
</pre>

In order to display part of the template only if the `person` object exists, we
can use the `{{#if}}` helper to conditionally render a block:

<pre class="brush: xml;">
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{/if}}
</pre>

NOTE: Handlebars will not render the block if the argument passed evaluates to
`false`, `undefined`, `null` or `[]` (i.e., any "falsy" value).

If the expression evaluates to falsy, we can also display an alternate template
using `{{else}}`:

<pre class="brush: xml;">
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{else}}
  Please log in.
{{/if}}
</pre>

To only render a block if a value is falsy, use `{{#unless}}`:

<pre class="brush: xml;">
{{#unless hasPaid}}
  You owe: ${{total}}
{{/unless}}
</pre>

`{{#if}}` and `{{#unless}}` are examples of block expressions. These allow you
to invoke a helper with a portion of your template. Block expressions look like
normal expressions except that they contain a hash (#) before the helper name,
and require a closing expression.

### {{#with}}

Sometimes you may want to invoke a section of your template with a context
different than the Em.View. For example, we can clean up the above template by
using the `{{#with}}` helper:

<pre class="brush: xml;">
{{#with person}}
  Welcome back, <b>{{firstName}} {{lastName}}</b>!
{{/with}}
</pre>

NOTE: {{#with}} changes the _context_ of the block you pass to it. The context
is the object on which properties are looked up. By default, the context is the
Em.View to which the template belongs.

### Binding Element Attributes with {{bindAttr}}

In addition to text, you may also want your templates to dictate the attributes
of your HTML elements. For example, imagine a view that contains a URL:

<pre class="brush: js;">
App.LogoView = Ember.View.extend({
  logoUrl: 'http://www.mycorp.com/images/logo.png'
});
</pre>

The best way to display the URL as an image in Handlebars is like this:

<pre class="brush: xml;">
<div id="logo">
  <img {{bindAttr src="logoUrl"}} alt="Logo">
</div>
</pre>

This generates the following HTML:

<pre class="brush: xml;">
<div id="logo">
  <img src="http://www.mycorp.com/images/logo.png" alt="Logo">
</div>
</pre>

If you use `{{bindAttr}}` with a Boolean value, it will add or remove the specified attribute. For example, given this Ember view:

<pre class="brush: js;">
App.InputView = Ember.View.extend({
  isSelected: true
});
</pre>

And this template:

<pre class="brush: xml;">
<input type="checkbox" {{bindAttr checked="isSelected"}}>
</pre>

Handlebars will produce the following HTML element:

<pre class="brush: xml;">
<input type="checkbox" checked>
</pre>

### Binding Class Names with {{bindAttr}}

The `class` attribute can be bound like any other attribute, but it also has some additional special behavior. The default behavior works like you'd expect:

<pre class="brush: js;">
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});

<div {{bindAttr class="priority"}}>
  Warning!
</div>
</pre>

This template will emit the following HTML:

<pre class="brush: xml;">
<div class="p4">
  Warning!
</div>
</pre>

If the value to which you bind is a Boolean, however, the dasherized version of that property will be applied as a class:

<pre class="brush: xml;">
<div {{bindAttr class="isUrgent"}}>
  Warning!
</div>
</pre>

This emits the following HTML:

<pre class="brush: js;">
<div class="is-urgent">
  Warning!
</div>
</pre>

Unlike other attributes, you can also bind multiple classes:

<pre class="brush: js;">
<div {{bindAttr class="isUrgent priority"}}>
  Warning!
</div>
</pre>

#### Building a View Hierarchy

So far, we've discussed writing templates for a single view. However, as your application grows, you will often want to create a hierarchy of views to encapsulate different areas on the page. Each view is responsible for handling events and maintaining the properties needed to display it.

#### {{view}}

To add a child view to a parent, use the `{{view}}` helper, which takes a path to a view class.

<pre class="brush: js;">
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
</pre>

<pre class="brush: xml;">
User: {{firstName}} {{lastName}}
{{view App.InfoView}}
</pre>

<pre class="brush: xml;">
<b>Posts:</b> {{posts}}
<br>
<b>Hobbies:</b> {{hobbies}}
</pre>

If we were to create an instance of `App.UserView` and render it, we would get
a DOM representation like this:

<pre class="brush: xml;">
User: Albert Hofmann
<div>
  <b>Posts:</b> 25
  <br>
  <b>Hobbies:</b> Riding bicycles
</div>
</pre>

#### Relative Paths

Instead of specifying an absolute path, you can also specify which view class
to use relative to the parent view. For example, we could nest the above view
hierarchy like this:

<pre class="brush: js;">
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann",

  InfoView: Ember.View.extend({
    templateName: 'info',

    posts: 25,
    hobbies: "Riding bicycles"
  })
});
</pre>

<pre class="brush: xml;">
User: {{firstName}} {{lastName}}
{{view InfoView}}
</pre>

#### Setting Child View Templates

If you'd like to specify the template your child views use (instead of having
to place them in a separate Handlebars file), you can use the block form of the
`{{view}}` helper. We might rewrite the above example like this:

<pre class="brush: js;">
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann"
});

App.InfoView = Ember.View.extend({
  posts: 25,
  hobbies: "Riding bicycles"
});
</pre>

<pre class="brush: xml;">
User: {{firstName}} {{lastName}}
{{#view App.InfoView}}
  <b>Posts:</b> {{posts}}
  <br>
  <b>Hobbies:</b> {{hobbies}}
{{/view}}
</pre>

When you do this, it may be helpful to think of it as assigning views to
portions of the page. This allows you to encapsulate event handling for just
that part of the page.

#### Setting Up Bindings

So far in our examples, we have been setting static values directly on the
views. But to best implement an MVC architecture, we should actually be binding
the properties of our views to the controller layer.

Let's set up a controller to represent our user data:

<pre class="brush: js;">
App.userController = Ember.Object.create({
  content: Ember.Object.create({
    firstName: "Albert",
    lastName: "Hofmann",
    posts: 25,
    hobbies: "Riding bicycles"
  })
});
</pre>

Now let's update `App.UserView` to bind to `App.userController`:

<pre class="brush: js;">
App.UserView = Ember.View.extend({
  templateName: 'user',

  firstNameBinding: 'App.userController.content.firstName',
  lastNameBinding: 'App.userController.content.lastName'
});
</pre>

When we only have a few bindings to configure, like with `App.InfoView`, it is
sometimes useful to be able to declare those bindings in the template. You can
do that by passing additional arguments to the `{{#view}}` helper. If all
you're doing is configuring bindings, this often allows you to bypass having to
create a new subclass.

<pre class="brush: xml;">
User: {{firstName}} {{lastName}}
{{#view App.InfoView postsBinding="App.userController.content.posts"
        hobbiesBinding="App.userController.content.hobbies"}}
  <b>Posts:</b> {{posts}}
  <br>
  <b>Hobbies:</b> {{hobbies}}
{{/view}}
</pre>

NOTE: You can actually pass __any__ property as a parameter to {{view}}, not
just bindings. However, if you are doing anything other than setting up
bindings, it is generally a good idea to create a new subclass.

#### Modifying a View's HTML

When you append a view, it creates a new HTML element that holds its content.
If your view has any child views, they will also be displayed as child nodes
of the parent's HTML element.

By default, new instances of `Ember.View` create a `<div>` element. You can
override this by passing a `tagName` parameter:

<pre class="brush: xml;">
{{view App.InfoView tagName="span"}}
</pre>

You can also assign an ID attribute to the view's HTML element by passing an `id` parameter:

<pre class="brush: xml;">
{{view App.InfoView id="info-view"}}
</pre>

This makes it easy to style using CSS ID selectors:

</pre>css
/** Give the view a red background. **/
#info-view {
  background-color: red;
}
</pre>

You can assign class names similarly:

<pre class="brush: xml;">
{{view App.InfoView class="info urgent"}}
</pre>

You can bind class names to a property of the view by using `classBinding` instead of `class`. The same behavior as described in `bindAttr` applies:

<pre class="brush: js;">
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});
</pre>

<pre class="brush: xml;">
{{view App.AlertView classBinding="isUrgent priority"}}
</pre>

This yields a view wrapper that will look something like this:

<pre class="brush: xml;">
<div id="sc420" class="sc-view is-urgent p4"></div>
</pre>

### Displaying a List of Items

If you need to enumerate over a list of objects, use Handlebar's `{{#each}}` helper:

<pre class="brush: js;">
App.PeopleView = Ember.View.extend({
  people: [ { name: 'Yehuda' },
            { name: 'Tom' } ]
});
</pre>

<pre class="brush: xml;">
<ul>
  {{#each people}}
    <li>Hello, {{name}}!</li>
  {{/each}}
</ul>
</pre>

This will print a list like this:

<pre class="brush: xml;">
<ul>
  <li>Hello, Yehuda!</li>
  <li>Hello, Tom!</li>
</ul>
</pre>

#### Ember.CollectionView

Sometimes you will need each item in your list to handle events. In that case, you will need more sophistication than what `{{#each}}` can provide. You can use the `{{#collection}}` helper to create a new `Ember.CollectionView`. You can bind the instance of `Ember.CollectionView` to an array, and it will create a new `Ember.View` for each item.

Usually, you will bind the collection to an `Ember.ArrayController`, like this:

<pre class="brush: js;">
App.peopleController = Ember.ArrayProxy.create({
  content: ['Steph', 'Tom', 'Ryan', 'Chris', 'Jill']
});
</pre>

<pre class="brush: xml;">
{{#collection contentBinding="App.peopleController"}}
  Hi, {{content}}!
{{/collection}}
</pre>

NOTE: The template you pass to the block helper will look up properties relative to each child view. To access the item in the array that the view should represent, refer to the `content` property via {{content}}.

Remember that under the hood, `Ember.CollectionView` creates a new view for each item in the bound array. By default, each new view will be an instance of `Ember.View`. You can tell the collection which type of view to create instances of by subclassing `Ember.CollectionView` and supplying a custom class:

<pre class="brush: js;">
App.PeopleCollectionView = Ember.CollectionView.extend({
  itemViewClass: Ember.View.extend({
    mouseDown: function(evt) {
      window.alert('You clicked on ' + this.get('content'));
    }
  })
});
</pre>

<pre class="brush: xml;">
{{#collection App.PeopleCollectionView contentBinding="App.peopleController"}}
  Hi, {{content}}!
{{/collection}}
</pre>

If you run this code, you should see an alert every time you click on one of the items.

The `{{#collection}}` helper takes the same options as `{{#view}}`, as described above. For example, you can set an HTML `id` attribute on the container of `Ember.CollectionView` like this:

<pre class="brush: xml;">
{{collection App.MyCollectionView id="my-collection"}}
</pre>

What if you want to set the class name of every child view, though? If you prepend an option with `item`, that option will instead be set on the child. For example, let's say you wanted to set a class name on each item in your collection:

<pre class="brush: xml;">
{{collection App.MyCollectionView itemClass="collection-item"}}
</pre>

### Writing Custom Helpers

Sometimes, you may use the same HTML in your application multiple times. In those case, you can register a custom helper that can be invoked from any Handlebars template.

For example, imagine you are frequently wrapping certain values in a `<span>` tag with a custom class. You can register a helper from your JavaScript like this:

<pre class="brush: js;">
Handlebars.registerHelper('highlight', function(property) {
  var value = Ember.getPath(this, property);
  return '<span class="highlight">"+value+'</span>';
});
</pre>

Anywhere in your Handlebars templates, you can now invoke this helper:

<pre class="brush: xml;">
{{highlight name}}
</pre>

and it will output the following:

<pre class="brush: xml;">
<span class="highlight">Peter</span>
</pre>

NOTE: Parameters to helper functions are passed as names, not their current values. This allows you to optionally set up observers on the values. To get the current value of the parameter, use Ember.getPath, as shown above.
