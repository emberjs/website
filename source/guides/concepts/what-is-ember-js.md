## What is Ember.js?

Ember.js is a JavaScript framework for creating ambitious web
applications. It helps you:

1. Write less code with templates that automatically update.
2. Retrieve models, with rich relationships, from your server.
3. Conventional app structure helps your app grow without messy code.

### Enhancing JavaScript

### Eliminating Boilerplate

There are some things that every web app developer has to do. For
example, everyone has written code that loads data from a server,
renders it to the screen, then updates if it changes.

Since the tools provided to do this by the browser are quite primitive,
you end up writing the same code over and over. Ember.js provides tools
that let you focus on your app instead of writing the same code you've
written a hundred times.

Because we've built many applications ourselves, we've extracted
patterns that go beyond low-level event-driven abstractions. We've
eliminated much of the boilerplate associated with propagating changes
throughout your application, and especially into the DOM itself.

For example, to help manage changes in the view, Ember.js comes with a
templating engine that will automatically update the DOM when the
object it is bound to changes.

For a simple example, consider this template:

```handlebars
User {{person.name}} is {{person.age}} years old.
```

As with any templating system, when the template is initially rendered,
it will reflect the current state of the person.  In Ember.js, though,
we also update the DOM automatically for you if the person's name or age
changes—no re-render or update code needed. Just specify your template
once, and Ember makes sure it stays up-to-date.

Templates are just one example. As you read through these guides, you'll
see how Ember.js allows you to forget about stuff that you'd have to
handle manually in other frameworks—from data persistence to memory
management.

### Application Architecture

Since web applications evolved from web pages, which were nothing more
than static documents, the primitive APIs supplied by the browser give
you just enough rope to hang yourself with.

Ember.js helps you build your app with a clear separation of concerns in
mind, leading to code that is more modular, more testable, and more
consistent.

We also supply built-in support for state management, so you'll have
a way to describe how your application moves through various nested states
(like signed-out, signed-in, viewing-post, and viewing-comment) out of the box.

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

```javascript
MyApp.president = Ember.Object.create({
  name: "Barack Obama"
});

MyApp.country = Ember.Object.create({
  // Ending a property with 'Binding' tells Ember to
  // create a binding to the presidentName property.
  presidentNameBinding: 'MyApp.president.name'
});

// Later, after Ember has resolved bindings...
MyApp.country.get('presidentName');
// "Barack Obama"
```

Bindings allow you to architect your application using the MVC (Model-View-Controller)
pattern, then rest easy knowing that data will always flow correctly from layer to layer.

#### Computed Properties

Computed properties allow you to treat a function like a property:

```javascript
MyApp.president = Ember.Object.create({
  firstName: "Barack",
  lastName: "Obama",

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');

  // Call this flag to mark the function as a property
  }.property()
});

MyApp.president.get('fullName');
// "Barack Obama"
```

Computed properties are useful because they can work with bindings, just
like any other property.

Many computed properties have dependencies on other properties. For example, in the above
example, the `fullName` property depends on `firstName` and `lastName` to determine its value.
You can tell Ember about these dependencies like this:

```javascript
MyApp.president = Ember.Object.create({
  firstName: "Barack",
  lastName: "Obama",

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');

  // Tell Ember that this computed property depends on firstName
  // and lastName
  }.property('firstName', 'lastName')
});
```

Make sure you list these dependencies so Ember knows when to update bindings that connect
to a computed property.

#### Auto-updating Templates

Ember uses Handlebars, a semantic templating library. To take data from your JavaScript application
and put it into the DOM, create a `<script>` tag and put it into your HTML, wherever you'd like the
value to appear:

```html
<script type="text/x-handlebars">
  The President of the United States is {{MyApp.president.fullName}}.
</script>
```

Here's the best part: templates are bindings-aware. That means that if you ever change the value of
the property that you told us to display, we'll update it for you automatically. And because you've
specified dependencies, changes to *those* properties are reflected as well.

Hopefully you can see how all three of these powerful tools work together: start with some primitive
properties, then start building up more sophisticated properties and their dependencies using computed
properties. Once you've described the data, you only have to say how it gets displayed once, and Ember
takes care of the rest. It doesn't matter how the underlying data changes, whether from an XHR request
or the user performing an action; your user interface always stays up-to-date. This eliminates entire
categories of edge cases that developers struggle with every day.

### Differences from Server-Side MVC

A common misconception about Ember.js's MVC implementation is that it must be similar to that of Ruby on Rails. This is incorrect. 

The reason for this difference is due to Ruby on Rails being a server-side framework, whereas Ember is a client-side framework.[1]

Ember runs in the browser, so it can detect and respond to browser events such as mouse clicks, finger taps, scrolling, key presses, etc. The view objects that receive these events can then send them to controller objects, which can work with the data model to save changes. Everything happens client-side, in the browser, and ember-data takes care of sending and receiving appropriate data to and from the server API.

<figure>
  <img alt="Ember.js MVC Diagram" src="/images/ember_mvc/embermvc.png">
</figure>

Rails, on the other hand, runs on the server. As such, it can only communicate with the client through HTTP requests. Rather than receive direct user events, the server takes HTTP requests as input (GET /, POST /users/1, etc.), reads the route and maps it to a controller action. The controller then interacts with the model and the view templates to construct a response (usually in the form of an HTML document) to send back over HTTP. The user is always interacting with what is basically a flat page, assembled on demand for them based on their requests.

<figure>
  <img alt="Rails MVC Diagram" src="/images/ember_mvc/railsmvc.png">
</figure>

It is important to keep this difference in mind when architecting your applications. 

[1] Although it is possible to use Ember.js on the server side, that is beyond the scope of this guide.
