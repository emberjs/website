# Ember.js Guide

## Introduction

### What is Ember.js?

Ember is a JavaScript framework that helps developers be more productive
by eliminating boilerplate and providing a strong MVC architecture.

#### Eliminate Boilerplate

There are some tasks that are common to every web application. For example,
taking data from the server, rendering it to the screen, then updating that
information when it changes.

Since the tools provided to do this by the browser are quite primitive, you
end up writing the same code over and over. Ember.js provides tools that let
you focus on your app instead of writing the same code you've written a hundred
times.

Because we've built dozens of applications ourselves, we've gone beyond the
obvious low-level event-driven abstractions, eliminating much of the
boilerplate associated with propagating changes throughout your application,
and especially into the DOM itself.

To help manage changes in the view, Ember.js comes with a templating engine
that will automatically update the DOM when the underlying objects change.

For a simple example, consider this template of a Person:

    {{person.name}} is {{person.age}}.

Obviously, when the template is initially rendered, it will reflect the
current state of the person. To avoid boilerplate, Ember.js will also
update the view automatically for you if the person's name or age changes.

You specify your template once, and we make sure it's always up to date.

#### Provides Architecture

Since web applications evolved from web pages, which were nothing more than
static documents, browsers give you just enough rope to hang yourself with.

Ember makes it easy to divide your application into models, views, and controllers,
which improves testability, makes code more modular, and helps new developers
on the project quickly understand how everything fits together. The days of
callback spaghetti are over.

Ember also supplies built-in support for state management, so you'll have
a way to describe how your application moves through various nested states
(like logged out, logged in, viewing post, viewing comment) out of the box.

<we will eventually want a paragraph about data here>

### How is Ember.js Different from Server-Side Frameworks?

Traditional web applications make the user to download a new page every time
they interact with the server. This means that every interaction is never faster
than the latency between you and the user, and usually slower. Using Ajax to
replace only parts of the page helps somewhat, but still requires a roundtrip to
your server every time your UI needs to update. And if multiple parts of the
page need to update all at once, most developers just resort to loading the page
over again, since keeping everything in sync is tricky.

Ember.js, like some other modern JavaScript frameworks, works a little differently.
Instead of the majority of your application's logic living on the server, an
Ember.js application downloads everything it needs to run in the initial page
load. That means that while your user is using your app, they never have to load
a new page and your UI responds quickly to their interaction.

One advantage of this architecture is that your web application uses the same
REST API as your native apps or third-party clients. Back-end developers can
focus on building a fast, reliable and secure API server and don't have to be
front-end experts, too.

### Ember.js at a Glance

These are the three features that make Ember a joy to use:

1. Bindings
2. Computed properties
3. Auto-updating templates

#### Bindings

Use bindings to keep properties between two different objects in sync. You just
declare a binding once, and Ember will make sure changes get propagated in either
direction.

Here's how you create a binding between two objects:

    MyApp.president = SC.Object.create({
      name: "Barack Obama"
    });

    MyApp.country = SC.Object.create({
      // Ending a property with 'Binding' tells SproutCore to
      // create a binding to the presidentName property.
      presidentNameBinding: 'MyApp.president.name'
    });

    MyApp.country.get('presidentName');
    // "Barack Obama"

Bindings allow you to architect your application using the MVC (Model-View-Controller)
pattern, then rest easy knowing that data will always flow correctly from layer to layer.

#### Computed Properties

Computed properties allow you to treat a function like a property:

    MyApp.president = SC.Object.create({
      firstName: "Barack",
      lastName: "Obama",

      fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');

        // Call this flag to mark the function as a property
      }.property()
    });

    MyApp.president.get('fullName');
    // "Barack Obama"

Treating a function like a property is useful because they can work with bindings, just
like any other property.

Many computed properties have dependencies on other properties. For example, in the above
example, the `fullName` property depends on `firstName` and `lastName` to determine its value.
You can tell Ember about these dependencies like this:

    MyApp.president = SC.Object.create({
      firstName: "Barack",
      lastName: "Obama",

      fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');

        // Tell SproutCore that this computed property depends on firstName
        // and lastName
      }.property('firstName', 'lastName')
    });

Make sure you list these dependencies so Ember knows when to update bindings that connect
to a computed property.

## Auto-updating Templates

Ember uses Handlebars, a semantic templating library. To take data from your JavaScript application
and put it into the DOM, create a `<script>` tag and put it into your HTML, wherever you'd like the
value to appear:

    <script type="text/x-handlebars">
      The President of the United States is {{MyApp.president.fullName}}.
    </script>

Here's the best part: templates are bindings-aware. That means that if you ever change the value of
the property that you told us to display, we'll update it for you automatically. And because you've
specified dependencies, changes to *those* properties are reflected as well.

Hopefully you can see how all three of these powerful tools work together: start with some primitive
properties, then start building up more sophisticated properties and their dependencies using computed
properties. Once you've described the data, you only have to say how it gets displayed once, and Ember
takes care of the rest. It doesn't matter how the underlying data changes, whether from an XHR request
or the user performing an action; your user interface always stays up-to-date. This eliminates entire
categories of edge cases that developers struggle with every day.

3.    Understanding MVC Architecture
  1.	What is MVC?
  2.	The Model Layer
  3.	The View Layer
  4.	The Controller Layer
  5.	Augmenting Controllers with Storyboards

## The Ember Object Model

Ember enhances the simple JavaScript object model to support bindings
and observers, as well as to support a more powerful mixin-based
approach to code sharing.

At its most basic, you create a new Ember class by using the `extend`
method on `SC.Object`.

    Person = SC.Object.extend({
      say: function(thing) {
        alert(thing);
      }
    });

Once you have built a new class, you can create new instances of the
class by using the `create` method. Any properties defined on the class
will be available to instances.

    var person = Person.create();
    person.say("Hello") // alerts "Hello"

When creating an instance, you can also add additional properties to the
class by passing in an object.

    var tom = Person.create({
      name: "Tom Dale",

      helloWorld: function() {
        alert("Hi my name is " + this.get('name'));
      }
    });

    tom.helloWorld() // alerts "Hi my name is Tom Dale"

Because of Ember's support for bindings and observers, you will always
access properties using the `get` method, and set properties using the
`set` method.

When creating a new instance of an object, you can also override any
properties or methods defined on the class. For instance, in this case,
you could override the `say` method from the `Person` class.

    var yehuda = Person.create({
      name: "Yehuda Katz",

      say: function(thing) {
        var name = this.get('name');

        this._super(name + " says: " + thing);
      }
    });

You can use the `_super` method on the object (`super` is a reserved
word in JavaScript) to call the original method you overrode.

### Subclassing Classes

You can also create subclasses of classes you create by using the
`extend` method. In fact, when we created a new class above by calling
`extend` on `SC.Object`, we were **subclassing** `SC.Object`.

    var LoudPerson = Person.extend({
      say: function(thing) {
        this._super(thing.toUpperCase());
      }
    });

When subclassing, you can use `this._super` to invoke methods you are
overriding.

### Reopening Classes

You don't need to define a class all at once. You can reopen a class and
define new properties using the `reopenClass` method.

    Person.reopenClass({
      isPerson: true
    });

    Person.create().get('isPerson') // true

When using `reopenClass`, you can also override existing methods and
call `this._super`.

    Person.reopenClass({
      // override `say` to add an ! at the end
      say: function(thing) {
        this._super(thing + "!");
      }
    });

### Computed Properties (Getters)

Often, you will want a property that is computed based on other
properties. Ember's object model allows you to define computed
properties easily in a normal class definition.

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');

        return firstName + ' ' + lastName;
      }.property('firstName', 'lastName')
    });

    var tom = Person.create({
      firstName: "Tom",
      lastName: "Dale"
    })

    tom.get('fullName') // "Tom Dale"

If you aren't using Ember's prototype extension, you can use a slightly
more verbose version, wrapping the function in a call to `SC.computed`:

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: SC.computed(function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');

        return firstName + ' ' + lastName;
      }).property('firstName', 'lastName')
    });

The `property` method defines the function as a computed property, and
defines its dependencies. Those dependencies will come into play later
when we discuss bindings and observers.

When subclassing a class or creating a new instance, you can override
any computed properties.

### Computed Properties (Setters)

You can also define what Ember should do when setting a computed
property. If you try to set a computed property, it will be invoked with
the key and value you want to set it to.

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: SC.computed(function(key, value) {
        // getter
        if (value === undefined) {
          var firstName = this.get('firstName');
          var lastName = this.get('lastName');

          return firstName + ' ' + lastName;

        // setter
        } else {
          var name = value.split(" ");

          this.set('firstName', name[0]);
          this.set('lastName', name[1]);

          return value;
        }
      }).property('firstName', 'lastName')
    });

    var person = Person.create();
    person.set('name', "Peter Wagenet");
    person.get('firstName') // Peter
    person.get('lastName') // Wagenet

Ember will call the computed property for both setters and getters, and
you can check the `value` to determine whether it is being called as a
getter or a setter.

### Observers

Ember supports observing any property, including computed properties.
You can set up an observer on an object by using the `addObserver`
method.

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: SC.computed(function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');

        return firstName + ' ' + lastName;
      }).property('firstName', 'lastName')
    });

    var person = Person.create
      firstName: "Yehuda",
      lastName: "Katz"
    });

    person.addObserver('fullName', function() {
      // deal with the change
    });

    person.set('firstName', "Brohuda"); // observer will fire

Because the `fullName` computed property depends on `firstName`,
updating `firstName` will fire observers on `fullName` as well.

Because observers are so common, Ember provides a way to define
observers inline in class definitions.

    Person.reopenClass({
      fullNameChanged: function() {
        // this is an inline version of .addObserver
      }.observes('fullName')
    });

You can define inline observers by using the `SC.observer` method if you
are using Ember without prototype extensions:

    Person.reopenClass({
      fullNameChanged: SC.observer(function() {
        // this is an inline version of .addObserver
      }, 'fullName')
    });

### Bindings

A binding creates a link between two properties such that when one changes, the
other one is updated to the new value automatically. Bindings can connect
properties on the same object, or across two different objects. Unlike most other
frameworks that include some sort of binding implementation, bindings in
Ember.js can be used with any object, not just between views and models.

The easiest way to create a two-way binding is by creating a new property
with the string `Binding` at the end, then specifying a path from the global scope:

    App.wife = SC.Object.create({
      householdIncome: 80000
    });
    
    App.husband = SC.Object.create({
      householdIncomeBinding: 'App.wife.householdIncome'
    });
    
    App.husband.get('householdIncome'); // 80000
    
    // Someone gets raise.
    App.husband.set('householdIncome', 90000);
    App.wife.get('householdIncome'); // 90000
  App.user = SC.Object.create({
    fullName: "Kara Gates"
  });

Note that bindings don't update immediately. Ember waits until all of your
application code has finished running before synchronizing changes, so you can change a bound property as many times as you'd like without worrying about the overhead of syncing bindings
when values are transient.

#### One-Way Bindings

A one-way binding only propagates changes in one direction. Usually, one-way
bindings are just a performance optimization and you can safely use
the more concise two-way binding syntax (as, of course, two-way bindings are
de facto one-way bindings if you only ever change one side).

    App.user = SC.Object.create({
      fullName: "Kara Gates"
    });

    App.userView = SC.View.create({
      userNameBinding: SC.Binding.oneWay('App.user.fullName')
    });
  
    // Changing the name of the user object changes
    // the value on the view.
    App.user.set('fullName', "Krang Gates");
    // App.userView.fullName will become "Krang Gates"
  
    // ...but changes to the view don't make it back to
    // the object.
    App.userView.set('fullName', "Truckasaurus Gates");
    // App.user.fullName will still be "Krang Gates"

### What Do I Use When?

Sometimes new users are confused about when to use computed properties,
bindings and observers. Here are some guidelines to help:

1. Use *computed properties* to build a new property by synthesizing other
properties. Computed properties should not contain application behavior, and
should generally not cause any side-effects when called. Except in rare cases,
multiple calls to the same computed property should always return the same
value (unless the properties it depends on have changed, of course.)

2. *Observers* should contain behavior that reacts to changes in another
property. Observers are especially useful when you need to perform some
behavior after a binding has finished synchronizing.

3. *Bindings* are most often used to ensure objects in two different layers
are always in sync. For example, you bind your views to your controller using
Handlebars. You may often bind between two objects in the same for layer. For
example, you might have an `App.selectedContactController` that binds to the
`selectedContact` property of `App.contactsController`.

## Describing Your UI with Handlebars

Unlike other frameworks that require you to have separate code paths for first generating your user interface and then updating it when parts change, Amber.js augments the Handlebars templating library to perform all of these updates for you.

With Amber, you describe your interface using a template. The framework takes care of ensuring that the template is converted to HTML and placed in the DOM. And, because the templates are bindings-aware, if any of the data underlying your template changes, your template will re-render just the changed portion and update the DOM automatically, without you having to write a single line of code.

### Handlebars

SproutCore comes bundled with [Handlebars](http://www.handlebarsjs.com), a semantic templating language. These templates look like regular HTML, with embedded expressions.

You should store your Handlebars templates inside your application's HTML file. At runtime, SproutCore will compile these templates so they are available for you to use in your views.

To immediately insert a template into your document, place it inside a `<script>` tag within your `<body>` tag:
  
<pre>
&lt;html>
	&lt;body>
 		&lt;script type="text/x-handlebars">
   			Hello, &lt;b>{{MyApp.name}}&gt;/b>
 		&lt;/script>
	&lt;/body>
&lt;/html>
</pre>

To make a template available to be used later, give the `<script>` tag a name attribute:

<pre>
&lt;html>
 	&lt;head>
 		&lt;script type="text/x-handlebars" data-template-name="say-hello">
   			Hello, &lt;b>{{MyApp.name}}&gt;/b>
 		&lt;/script>
 	&lt;/head>
&lt;/html>
</pre>

### Am.View

You can use Am.View to render a Handlebars template and insert it into the DOM.

To tell the view which template to use, set its +templateName+ property. For example, if I had a +<script>+ tag like this:

<html>
  <head>
    <script type="text/x-handlebars" data-template-name="say-hello">
      Hello, <b>{{name}}</b>
    </script>
  </head>
</html>
 
I would set the +templateName+ property to +"say-hello"+.

<javascript>
var view = Am.TemplateView.create({
  templateName: 'say-hello',
  name: "Bob"
});
</javascript>

NOTE: For the remainder of the guide, the +templateName+ property will be omitted from most examples. You can assume that if we show a code sample that includes an Am.View and a Handlebars template, the view has been configured to display that template via the +templateName+ property.

h3. Handlebars Basics

As you've already seen, you can print the value of a property by enclosing it in a Handlebars expression, or a series of braces, like this:

<html>
My new car is {{color}}.
</html>

This will look up and print the TemplateView's +color+ property. For example, if your view looks like this:

<javascript>
App.CarView = Am.View.extend({
  color: 'blue'
});
</javascript>

Your view would appear in the browser like this:

<html>
My new car is blue.
</html>

All of the features described in this guide are __bindings aware__. That means that if the values used by your templates ever change, your HTML will be updated automatically. It's like magic.

In order to know which part of your HTML to update when an underlying property changes, Handlebars will insert marker elements with a unique ID. If you look at your application while it's running, you might notice these extra elements:

<html>
My new car is <span id="sc232">blue</span>.
</html>

Because all Handlebars expressions are wrapped in these markers, make sure each HTML tag stays inside the same block. For example, you shouldn't do this:

<html>
<!-- Don't do it! -->

<div {{#if isUrgent}}class="urgent"{{/if}}>
</html>

If you want to avoid your property output getting wrapped in these markers, use the +unbound+ helper:

<html>
My new car is {{unbound color}}.
</html>

Your output will be free of markers, but be careful, because the output won't be automatically updated!

<html>
My new car is blue.
</html>


h4. {{#if}}, {{else}}, and {{#unless}}

Sometimes you may only want to display part of your template if a property exists. For example, let's say we have a view with a +person+ property that contains an object with +firstName+ and +lastName+ fields:

<javascript>
App.SayHelloView = Am.View.extend({
  person: Am.Object.create({
    firstName: "Joy",
    lastName: "Clojure"
  })
});
</javascript>

In order to display part of the template only if the +person+ object exists, we can use the +{{#if}}+ helper to conditionally render a block:

<html>
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{/if}}
</html>

NOTE: Handlebars will not render the block if the argument passed evaluates to +false+, +undefined+, +null+ or +[]+ (i.e., any "falsy" value).

If the expression evaluates to falsy, we can also display an alternate template using +{{else}}+:

<html>
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{else}}
  Please log in.
{{/if}}
</html>

To only render a block if a value is falsy, use +{{#unless}}+:

<html>
{{#unless hasPaid}}
  You owe: ${{total}}
{{/unless}}
</html>

+{{#if}}+ and +{{#unless}}+ are examples of block expressions. These allow you to invoke a helper with a portion of your template. Block expressions look like normal expressions except that they contain a hash (#) before the helper name, and require a closing expression.

h4. {{#with}}

Sometimes you may want to invoke a section of your template with a context different than the Am.View. For example, we can clean up the above template by using the +{{#with}}+ helper:

<html>
{{#with person}}
  Welcome back, <b>{{firstName}} {{lastName}}</b>!
{{/with}}
</html>

NOTE: {{#with}} changes the _context_ of the block you pass to it. The context is the object on which properties are looked up. By default, the context is the Am.View to which the template belongs.

h4. Binding Element Attributes with {{bindAttr}}

In addition to text, you may also want your templates to dictate the attributes of your HTML elements. For example, imagine a view that contains a URL:

<javascript>
App.LogoView = Am.View.extend({
  logoUrl: 'http://www.mycorp.com/images/logo.png'
});
</javascript>

The best way to display the URL as an image in Handlebars is like this:

<html>
<div id="logo">
  <img {{bindAttr src="logoUrl"}} alt="Logo">
</div>
</html>

This generates the following HTML:
<html>
<div id="logo">
  <img src="http://www.mycorp.com/images/logo.png" alt="Logo">
</div>
</html>

If you use +{{bindAttr}}+ with a Boolean value, it will add or remove the specified attribute. For example, given this SproutCore view:

<javascript>
App.InputView = Am.View.extend({
  isSelected: true
});
</javascript>

And this template:
<html>
<input type="checkbox" {{bindAttr checked="isSelected"}}>
</html>

Handlebars will produce the following HTML element:

<html>
<input type="checkbox" checked>
</html>

h4. Binding Class Names with {{bindAttr}}

The +class+ attribute can be bound like any other attribute, but it also has some additional special behavior. The default behavior works like you'd expect:

<javascript>
App.AlertView = Am.View.extend({
  priority: "p4",
  isUrgent: true
});
</javascript>

<html>
<div {{bindAttr class="priority"}}>
  Warning!
</div>
</html>

This template will emit the following HTML:

<html>
<div class="p4">
  Warning!
</div>
</html>

If the value to which you bind is a Boolean, however, the dasherized version of that property will be applied as a class:

<html>
<div {{bindAttr class="isUrgent"}}>
  Warning!
</div>
</html>

This emits the following HTML:

<html>
<div class="is-urgent">
  Warning!
</div>
</html>

Unlike other attributes, you can also bind multiple classes:

<html>
<div {{bindAttr class="isUrgent priority"}}>
  Warning!
</div>
</html>

h4. Localized Strings with {{loc}}

SproutCore has built-in support for localized applications. To emit a localized version of a string, use the +{{loc}}+ helper:

<html>
{{loc myLocalizedString}}
</html>

h3. Building a View Hierarchy

So far, we've discussed writing templates for a single view. However, as your application grows, you will often want to create a hierarchy of views to encapsulate different areas on the page. Each view is responsible for handling events and maintaining the properties needed to display it.

h4. {{view}}

To add a child view to a parent, use the +{{view}}+ helper, which takes a path to a view class.

<javascript>
// Define parent view
App.UserView = Am.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann"
});

// Define child view
App.InfoView = Am.View.extend({
  templateName: 'info',

  posts: 25,
  hobbies: "Riding bicycles"
});
</javascript>

<html filename="user.handlebars">
User: {{firstName}} {{lastName}}
{{view App.InfoView}}
</html>

<html filename="info.handlebars">
<b>Posts:</b> {{posts}}
<br>
<b>Hobbies:</b> {{hobbies}}
</html>

If we were to create an instance of <code>App.UserView</code> and render it, we would get a DOM representation like this:

<html>
User: Albert Hofmann
<div>
  <b>Posts:</b> 25
  <br>
  <b>Hobbies:</b> Riding bicycles
</div>
</html>

h4. Relative Paths

Instead of specifying an absolute path, you can also specify which view class to use relative to the parent view. For example, we could nest the above view hierarchy like this:

<javascript>
App.UserView = Am.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann",

  InfoView: Am.View.extend({
    templateName: 'info',

    posts: 25,
    hobbies: "Riding bicycles"
  })
});
</javascript>

<html filename="user.handlebars">
User: {{firstName}} {{lastName}}
{{view InfoView}}
</html>

h4. Setting Child View Templates

If you'd like to specify the template your child views use (instead of having to place them in a separate Handlebars file), you can use the block form of the +{{view}}+ helper. We might rewrite the above example like this:

<javascript>
App.UserView = Am.View.extend({
  templateName: 'user',

  firstName: "Albert",
  lastName: "Hofmann"
});

App.InfoView = Am.View.extend({
  posts: 25,
  hobbies: "Riding bicycles"
});
</javascript>

<html filename="user.handlebars">
User: {{firstName}} {{lastName}}
{{#view App.InfoView}}
  <b>Posts:</b> {{posts}}
  <br>
  <b>Hobbies:</b> {{hobbies}}
{{/view}}
</html>

When you do this, it may be helpful to think of it as assigning views to portions of the page. This allows you to encapsulate event handling for just that part of the page.

h4. Setting Up Bindings

So far in our examples, we have been setting static values directly on the views. But to best implement an MVC architecture, we should actually be binding the properties of our views to the controller layer.

Let's set up a controller to represent our user data:

<javascript>
App.userController = Am.Object.create({
  content: Am.Object.create({
    firstName: "Albert",
    lastName: "Hofmann",
    posts: 25,
    hobbies: "Riding bicycles"
  })
});
</javascript>

Now let's update <code>App.UserView</code> to bind to <code>App.userController</code>:

<javascript>
App.UserView = Am.View.extend({
  templateName: 'user',

  firstNameBinding: 'App.userController.content.firstName',
  lastNameBinding: 'App.userController.content.lastName'
});
</javascript>

When we only have a few bindings to configure, like with <code>App.InfoView</code>, it is sometimes useful to be able to declare those bindings in the template. You can do that by passing additional arguments to the +{{#view}}+ helper. If all you're doing is configuring bindings, this often allows you to bypass having to create a new subclass.

<html filename="user.handlebars">
User: {{firstName}} {{lastName}}
{{#view App.InfoView postsBinding="App.userController.content.posts"
        hobbiesBinding="App.userController.content.hobbies"}}
  <b>Posts:</b> {{posts}}
  <br>
  <b>Hobbies:</b> {{hobbies}}
{{/view}}
</html>

NOTE: You can actually pass __any__ property as a parameter to {{view}}, not just bindings. However, if you are doing anything other than setting up bindings, it is generally a good idea to create a new subclass.

h4. Modifying a View's HTML

When you append a view, it creates a new HTML element that holds its content. If your view has any child views, they will also be displayed as child nodes of the parent's HTML element.

By default, new instances of <code>SC.View</code> create a +<div>+ element. You can override this by passing a +tagName+ parameter:

<html>
{{view App.InfoView tagName="span"}}
</html>

You can also assign an ID attribute to the view's HTML element by passing an +id+ parameter:

<html>
{{view App.InfoView id="info-view"}}
</html>

This makes it easy to style using CSS ID selectors:

<css>
/** Give the view a red background. **/
#info-view {
  background-color: red;
}
</css>

You can assign class names similarly:

<html>
{{view App.InfoView class="info urgent"}}
</html>

You can bind class names to a property of the view by using +classBinding+ instead of +class+. The same behavior as described in +bindAttr+ applies:

<javascript>
App.AlertView = SC.View.extend({
  priority: "p4",
  isUrgent: true
});
</javascript>

<html>
{{view App.AlertView classBinding="isUrgent priority"}}
</html>

This yields a view wrapper that will look something like this:

<html>
<div id="sc420" class="sc-view is-urgent p4"></div>
</html>

h3. Displaying a List of Items

If you need to display a basic list of items, use Handlebar's +{{#each}}+ helper:

<javascript>
App.PeopleView = SC.View.extend({
  people: [ SC.Object.create({ name: 'Steph' }),
            SC.Object.create({ name: 'Tom' }) ]
});
</javascript>

<html>
{{#each people}}
  Hello, {{name}}!
{{/each}}
</html>

This will print a list like this:

<html>
<ul>
  <li>Hello, Steph!</li>
  <li>Hello, Tom!</li>
</ul>
</html>

h4. SC.CollectionView

Sometimes you will need each item in your list to handle events. In that case, you will need more sophistication than what +{{#each}}+ can provide. You can use the +{{#collection}}+ helper to create a new <code>SC.CollectionView</code>. You can bind the instance of <code>SC.CollectionView</code> to an array, and it will create a new <code>SC.View</code> for each item.

Usually, you will bind the collection to an <code>SC.ArrayProxy</code>, like this:

<javascript>
App.peopleController = SC.ArrayProxy.create({
  content: ['Steph', 'Tom', 'Ryan', 'Chris', 'Jill']
});
</javascript>

<html>
{{#collection contentBinding="App.peopleController"}}
  Hi, {{content}}!
{{/collection}}
</html>

NOTE: The template you pass to the block helper will look up properties relative to each child view. To access the item in the array that the view should represent, refer to the +content+ property via {{content}}.

Remember that under the hood, <code>SC.CollectionView</code> creates a new view for each item in the bound array. By default, each new view will be an instance of <code>SC.View</code>. You can tell the collection which type of view to create instances of by subclassing <code>SC.CollectionView</code> and supplying a custom class:

<javascript>
App.PeopleCollectionView = SC.CollectionView.extend({
  itemViewClass: SC.View.extend({
    mouseDown: function(evt) {
      window.alert('You clicked on ' + this.get('content'));
    }
  })
});
</javascript>

<html>
{{#collection App.PeopleCollectionView contentBinding="App.peopleController"}}
  Hi, {{content}}!
{{/collection}}
</html>

If you run this code, you should see an alert every time you click on one of the items.

The +{{#collection}}+ helper takes the same options as +{{#view}}+, as described above. For example, you can set an HTML +id+ attribute on the container of <code>SC.CollectionView</code> like this:

<html>
{{collection App.MyCollectionView id="my-collection"}}
</html>

What if you want to set the class name of every child view, though? If you prepend an option with +item+, that option will instead be set on the child. For example, let's say you wanted to set a class name on each item in your collection:

<html>
{{collection App.MyCollectionView itemClass="collection-item"}}
</html>

h3. Writing Custom Helpers

Sometimes, you may use the same HTML in your application multiple times. In those case, you can register a custom helper that can be invoked from any Handlebars template.

For example, imagine you are frequently wrapping certain values in a +<span>+ tag with a custom class. You can register a helper from your JavaScript like this:
  
<javascript>
Handlebars.registerHelper('highlight', function(property) {
  var value = SC.getPath(this, property);
  return '<span class="highlight">"+value+'</span>';
});
</javascript>

Anywhere in your Handlebars templates, you can now invoke this helper:

<html>
{{highlight name}}
</html>

and it will output the following:

<html>
<span class="highlight">Peter</span>
</html>

NOTE: Parameters to helper functions are passed as names, not their current values. This allows you to optionally set up observers on the values. To get the current value of the parameter, use SC.getPath, as shown above.

h3. Changelog

* May 5, 2011: Initial version by "Tom Dale":credits.html#tomdale
* July 21, 2011: Corrections made for SC2 by "Erik Bryn":credits.html#ebryn

  9.	Mixins
  10.	Arrays and Enumerables
  11.	Understanding the Run Loop
5.	Describing Your UI with Handlebars
  1.	What is Handlebars?
  2.	Displaying Templates
  3.	Handlebars In-Depth
  4.	Am.View
  5.	The View Rendering Pipeline
  6.	Form Helpers
6.	Handling User Events
  1.	Implementing Handlers on Views
  2.	Event Bubbling
  3.	Registering Custom Events
  4.	Customizing Am.Application
7.	Testing
  1.	What is unit testing?
  2.	What is integration testing?
  3.	Using Jasmine
  4.	Mocking Events and Remote Services
  5.	Run Loop Considerations
8.	Getting Data into Your App
  1.	Content TBD
9.	Managing Assets and Deploying to Production
  1.	Multiple Files and Dependency Resolution
  2.	Concatenation
  3.	Minification
  4.	Deploying Static Assets: Best Practices
  5.	Profiling for Performance