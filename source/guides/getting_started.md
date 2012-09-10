## Getting Started with Ember.js

In this guide, we'll show you how to build a simple todos app using Ember.js. You
can check the app [here](http://emberjs.com/examples/todos/). Also, you can look
the source code [here](https://github.com/emberjs/examples/tree/master/todos).

### 1. Installing Ember

Download the lastest [Ember.js Starter Kit](https://github.com/downloads/emberjs/starter-kit/starter-kit.0.9.7.1.zip)
if you haven’t already. Unzip it and open the directory in your favorite text editor.

### 2. Creating the Application Namespace

Every Ember app should have an instance of `Ember.Application`. This object will
serve as the globally-accessible namespace for all of the other classes and instances
in your app.

Open the JavaScript file located at `js/app.js`. Replace the default content with the
following:

```javascript
Todos = Ember.Application.create();
```

This code creates a namespace for your application called `Todos`.

### 3. Defining Your Model

In this tutorial, we want to create a list for managing todos. Users should be able
to create a new todo with a specific task, then check it off once it’s done.

Let’s define our model as a new subclass of `Ember.Object` in `app.js`:

```javascript
Todos.Todo = Em.Object.extend({
  title:  null,
  isDone: false
});
```

We’ve now defined a `Todo` class with two properties: `title` and `isDone`.

**Note:** The Ember rules for capitalization are pretty straight-forward. If it's a
class or a namespace, it's uppercase (`Todo`); if it's an instance, it's lowercase
(`myTodo`).

### 4. Managing the Model Using a Controller

In MVC frameworks like Ember, the controller layer bridges the model layer, which is
only concerned with a pure-data representation of objects, and the view layer, which is
only concerned with representing those objects.

Now that we know what our data looks like, let’s create a controller to manage it.
Since we want to maintain an ordered list of todos, we’ll use an instance of
`Em.ArrayController`:

```javascript
Todos.todosController = Em.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: []
});
```

Behind the scenes, `Em.ArrayController` acts as a proxy onto its `content` Array
property. Ember will propagate any modifications made to the `ArrayController` to the
`content` property.

Now we have an array controller with no content. Let’s add a method to create a new
todo:

```javascript
Todos.todosController = Em.ArrayController.create({
  // Initialize the array controller with an empty array
  content: [],

  // Creates a new todo with the passed title, then adds it to the array
  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });

    this.pushObject(todo);
  }
});
```

### 5. Doing It with Style

We’ve provided a simple stylesheet to give the application some style. Download the
[CSS file](https://github.com/emberjs/examples/blob/master/todos/css/todos.css)
and add it to your project’s `css` directory. Then include the next line to the
`<head>` tag in `index.html`:

```html
<link rel="stylesheet" href="css/todos.css">
```

### 6. Creating New Todos

We’ve got our model and controller set up, so let’s move on to the fun part: creating
the interface for our users. The first step is to create a text field into which the
user types the name of their todo. Ember uses Handlebars templates to quickly define
the application’s interface. While Handlebars makes it easy to markup HTML quickly,
you’ll see that it also has been extended to automatically take advantage of Ember's
bindings.

To start building our views, let’s open `index.html`.

First, add an `<h1>` tag with the name of the application:

```html
<h1>Todos</h1>
```

You’ll also see that the starter kit includes a default Handlebars template. Remove it
and replace it with the following Handlebars template, which emits a text field for our
users to type in:

```html
<script type="text/x-handlebars">
  {{view Em.TextField id="new-todo"
      placeholder="What needs to be done?"}}
</script>
```

Here we’ve specified a text field, with a unique id attribute (so it can be styled
via CSS), as well as a placeholder attribute that will be displayed in modern HTML5
browsers.

**For more information about using Handlebars, visit the [Handlebars website](http://www.handlebarsjs.com/).
To learn more about using Handlebars with Ember, make sure to check out the [Using Handlebars Templates guide](http://emberjs.com/#toc_describing-your-ui-with-handlebars).**

Now that we’ve got model, view, and controller represented, it’s time to open the app
in our browser and see how it looks.

Double click on your `index.html` file to open it in your browser. You should see your
application load. Once you’ve verified that the application is up and running, it’s
time to tell Ember how to handle events for your `<input>` tag.

When the user types in the field and presses the return key, we will create a new Todo
and have it inserted into the content of the array controller.

**In Ember, view objects are responsible for updating the DOM and handling events.
Among other things, this allows us to buffer changes to the DOM for maximum performance
and to support generic cross-platform event handling. Whenever you want to display
dynamic content or handle events, you will use a view object.**

Insert this code in `js/app.js` file:

```javascript
Todos.CreateTodoView = Em.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Todos.todosController.createTodo(value);
      this.set('value', '');
    }
  }
});
```

Since `CreateTodoView` will handle events for a text field, we create a subclass of
`Em.TextField`, which provides several conveniences for working with these input
controls. For example, you can access the `value` property and respond to higher
level events, such as `insertNewline`, when the user presses enter.

Now that we have defined our view, let’s update the template to use our new view
subclass. Switch back to `index.html` and update the view helper to say
`Todos.CreateTodoView` instead of `Em.TextField`.

```html
<script type="text/x-handlebars">
  {{view Todos.CreateTodoView id="new-todo"
      placeholder="What needs to be done?"}}
</script>
```

Now that we have UI to create new todos, let’s create the code to display them.
We’ll use the Handlebars `#collection` helper to display a list of items.
`#collection` will create an instance of `Em.CollectionView` that renders
every item in its underlying Array using the enclosed HTML.

```html
<script type="text/x-handlebars">
  {{view Todos.CreateTodoView id="new-todo"
      placeholder="What needs to be done?"}}

  {{#collection contentBinding="Todos.todosController"
      tagName="ul"}}
    {{content.title}}
  {{/collection}}
</script>
```

Notice that we’ve also told the collection to bind its `content` property to our
`todosController`. For every item in the array controller, the collection view will
create a new child view that renders the `{{content.title}}` template.

You set up bindings by creating a property whose name ends in `Binding`. In this case,
we bind `Todos.todosController` to the collection view’s `content` property. When one
end of a binding changes, Ember will automatically update the other end.

This is a good time to open `index.html` again (or reload if you still have it loaded
in your browser). It should look the same as before. Type a todo into the text field
and hit `return`.

Look at that! As soon as we create a new todo and insert it into the `ArrayController`
the view updates automatically.

You’ve now seen a little bit of the power of Ember. By using Ember’s bindings to
describe the relationship between your data and your views, you were able to change
the data layer and let Ember do the hard work of updating the view layer for you.

This is actually a core concept in Ember, not just something that demos well. Ember’s
binding system is designed with the view system in mind, which makes it easy to work
directly with your data and not need to worry about manually keeping your view layer
in sync. You will see this concept over and over again in the rest of this tutorial
and in other guides.

**More about setting up Bindings [here](http://emberjs.com/#toc_setting-up-bindings)**

### 7. Getting Things Done

We now have the ability to add todos, but no way to mark them as done. Before the
frustration of a never-ending todo list gets the better of us, let’s add the ability
to mark todos complete.

The first thing we need to do is add a checkbox to each todo list item. As was
mentioned earlier, if we want to handle events, such as user input, we need a view.
In this case, we are adding a checkbox and want to be notified whenever the value of
the checkbox is changed by the user. Let’s update the Handlebars template in
`index.html` to look like the following:

```html
<script type="text/x-handlebars">
  {{view Todos.CreateTodoView id="new-todo"
      placeholder="What needs to be done?"}}

  {{#collection contentBinding="Todos.todosController" tagName="ul"}}
    {{view Em.Checkbox titleBinding="content.title"
        valueBinding="content.isDone"}}
  {{/collection}}
</script>
```

Let’s take a second to talk about the bindings we just set up. For every item in its
underlying array, `Em.CollectionView` will create a new item view whose `content`
property contains the object the view should represent. In our case, there will be a
child view for each todo. Since the checkbox is a child view of each item view, when
we bind to `content.title`, we’re saying to bind to the `title` property of the Todo
object represented by the item view.

Under the hood, Ember binds an event handler to the change event of the checkbox
and updates value when the event occurs. This may change as needed for browser
compatibility, but working with a Ember property insulates you from those concerns.

Before you reload the browser to see the new checkbox todo list items, the stylesheet
we provided includes a CSS class meant to give completed todos a unique look. Let’s
bind the class of each item to the object’s `isDone` property.

We’ll use `itemClassBinding` property on the collection helper to set up this binding:

```html
{{#collection contentBinding="Todos.todosController"
    tagName="ul" itemClassBinding="content.isDone"}}
  {{view Em.Checkbox titleBinding="content.title"
      valueBinding="content.isDone"}}
{{/collection}}
```

This property sets up a binding on each of the item views. Each item will get the class
`is-done` if its associated content object’s `isDone` property is true. Ember will
automatically dasherize property names into class names.

**All views have a number of properties, including id, class, and classBinding. The
collection helper allows you to prefix any of those properties with item, which will
then apply to each of the child item views. For instance, if you use the `itemClass`
property on a collection, each item will get that class name.**

Now reload your application in the browser and try it out. As soon as you click a
todo’s checkbox, the text will become crossed out. Keep in mind you didn’t need to
update any views when marking the Todo as done; bindings did it for you. If a
different part of the app changes the Todo item’s `isDone` property, your list
item would automatically update without any more work on your part.

### 8. The More You Know

We can now create todos and mark them as being complete. While 76% of all statistics
are made up, let’s see if we can display more accurate information from the data we
have. At the top of our list, let’s display the number of todos remaining. Open
`index.html` and insert this new view before `{{#collection}}` helper:

```html
{{#view Todos.StatsView id="stats"}}
  {{remainingString}} remaining
{{/view}}
```

Handlebars expressions, like `{{remainingString}}`, allows us to automatically update
the DOM when a property on our view changes. In this case, we’re saying that
`Todos.StatsView` should always display the most up-to-date value to the view’s
`remainingString` property. As with the other bindings, this will be updated for us
automatically whenever the value changes.

Let’s go ahead and implement that view in `app.js` now:

```javascript
Todos.StatsView = Em.View.extend({
  remainingBinding: 'Todos.todosController.remaining',

  remainingString: function() {
    var remaining = this.get('remaining');

    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining')
});
```

`remainingString` contains a pluralized string, based on the number of remaining todos.
Here is another core piece of Ember in action, this one called a computed property.
Computed properties are properties whose value is determined by running a function.
For example, if `remaining` equals 1, `remainingString` will contain the string
"1 item", and if `remaining` is greater than 1, `remainingString` will contain
the string "X items".

We say that `remainingString` **depends on** `remaining` because it requires another
value to generate its own value. We list these **dependent keys** inside the
`property()` declaration.

We’ve also bound the view’s `remaining` property to the todosController‘s
`remaining` property. This means that, because of the dependency chain we’ve described,
if `Todos.todosController.remaining` changes, remainingString will automatically
update.

When we have information that views need but is based on aggregate information about
our models, the array controller is a good place to put it. Let’s add a new computed
property to `todosController` in `app.js`:


```javascript
Todos.todosController = Em.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: [],

  // Creates a new todo with the passed title, then adds it to the array.
  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });

    this.pushObject(todo);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone')
});
```

Here, we specify our dependent key using `@each`. This allows us to depend on
properties of the array’s items. In this case, we want to update the remaining property
any time `isDone` changes on a Todo.

**The `@each` property also updates when an item is added or removed.**

It’s important to declare dependent keys because Ember uses this information to know
when to update bindings. In our case, our `Todos.StatsView` updates any time
todosController’s remaining property changes.

As we build up our application, we create **declarative** links between objects. These
links describe how application state flows from the model layer to the HTML in the
presentation layer.

### 9. Clearing Completed Todos

As we populate our list with todos, we may want to periodically clear out those we’ve
completed. As you have learned, we will want to make that change to the
`todosController`, and let Ember automatically propagate those changes to the DOM.

Let’s add a new `clearCompletedTodos` method to `Todos.todosController`.

```javascript
Todos.todosController = Em.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: [],

  // Creates a new todo with the passed title, then adds it to the array.
  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });

    this.pushObject(todo);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  }
});
```

Next, let’s add a button to our template. Open `index.html` and add a `Ember.Button`
control inside the HTML for `StatsView` as shown here:

```html
{{#view Todos.StatsView id="stats"}}
  {{#view Ember.Button classBinding="isActive"
      target="Todos.todosController"
      action="clearCompletedTodos"}}
    Clear Completed Todos
  {{/view}}

  {{remainingString}} remaining.
{{/view}}
```

We’ve defined an instance of `Em.Button`, which calls a method on an object when it
is clicked. In this case we’ve told the button to call the `clearCompletedTodos` method
(its `action`) on the `Todos.todosController` object (its `target`).

We’ve also told it to add an `is-active` class to the view when it is clicked or
tapped. Every `Em.Button` has an `isActive` property that will be true when it is
in the process of being clicked. This allows us to display a visual cue to the user
that they have hit the right target.

Go back to your browser and try it out. Add some todos, then mark them done and
clear them. Because we previously bound the visual list to the `todosController`,
making a change through new means has the expected effect.

### 10. Marking All as Done

Let’s say you’ve decided to actually get all of your work done. Wouldn’t it be nice to
have a way to easily mark every todo as complete?

It turns out that, due to our application’s declarative nature, all the hard work is
already done. We just need a way to mark every Todo complete.

Let’s first create a new computed property on our controller that describes whether
or not every todo is done. It might look something like this:

```javascript
Todos.todosController = Em.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: [],

  // Creates a new todo with the passed title, then adds it to the array.
  createTodo: function(title) {
    var todo = Todos.Todo.create({ title: title });

    this.pushObject(todo);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  allAreDone: function() {
    return this.get('length') && this.everyProperty('isDone', true);
  }.property('@each.isDone')
});
```

**Ember has many enumerable helpers. `everyProperty(‘isDone’, true)` returns true if
every item in the array has an `isDone` property that evaluates to true. You can
find out more in the [Ember Enumerable API guide](http://emberjs.com/#toc_the-ember-enumerable-api)**

Next, open `index.html`, we’ll create a checkbox view to mark all items complete and
bind its value to the controller’s property:

```html
{{view Em.Checkbox class="mark-all-done"
    title="Mark All as Done"
    valueBinding="Todos.todosController.allAreDone"}}

{{#collection contentBinding="Todos.todosController"
...
```

If you were to reload your browser and use the app now, you’d notice that clicking all
of the checkboxes of your todos will cause the **“Mark All as Done”** checkbox to
become checked. However, it doesn’t work in the other direction: clicking **“Mark All
as Done”** has no effect.

So far, our computed properties have described how to calculate a value from dependent
properties. However, in this case, we want to accept a new value, and update dependent
properties to reflect it. Lets update our `allAreDone` computed property to also accept
a value.

```javascript
allAreDone: function(key, value) {
  if (value !== undefined) {
    this.setEach('isDone', value);
    return value;
  } else {
    return !!this.get('length') && this.everyProperty('isDone', true);
  }
}.property('@each.isDone')
```

When you set a computed property, your computed property function is called with the
property key as the first parameter and the new value as the second. To determine if
Ember is asking for the value or trying to set it, we examine the `value` parameter.
If it is defined, we iterate through each Todo and set its `isDone` property to the
new value.

Because bindings are bi-directional, Ember will set `allAreDone` to true when the user
clicks the **“Mark All as Done”** checkbox. Conversely, unchecking it will make Ember
set `allAreDone` to false, unchecking all todos.

Reload the app and add some todos. Click “Mark All as Done”. Wow! Each of the
individual check boxes gets checked off. If you uncheck one of them, the
“Mark All as Done” checkbox un-checks itself.

**When you use Ember, as you scale your UI, you never need to wonder whether a new
feature will work consistently with parts of the UI you already implemented. Since
you build your view layer to simply reflect the state of your models, you can make
changes however you want and see them update automatically.**