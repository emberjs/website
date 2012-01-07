## Introduction

### What is Ember.js?

Ember is a JavaScript framework for creating ambitious web applications
that eliminates boilerplate and provides a standard application
architecture.

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

```html
{{person.name}} is {{person.age}}.
```

As with any templating system, when the template is initially rendered, it
will reflect the current state of the person. To avoid boilerplate, though,
Ember.js will also update the DOM automatically for you if the person's name
or age changes.

You specify your template once, and Ember.js makes sure it's always up to date.

#### Provides Architecture

Since web applications evolved from web pages, which were nothing more than
static documents, browsers give you just enough rope to hang yourself with.

Ember makes it easy to divide your application into models, views, and controllers,
which improves testability, makes code more modular, and helps new developers
on the project quickly understand how everything fits together. The days of
callback spaghetti are over.

Ember also supplies built-in support for state management, so you'll have
a way to describe how your application moves through various nested states
(like signed-out, signed-in, viewing-post, and viewing-comment) out of the box.

### How is Ember.js Different from Server-Side Frameworks?

Traditional web applications make the user to download a new page every time
they interact with the server. This means that every interaction is never faster
than the latency between you and the user, and usually slower. Using AJAX to
replace only parts of the page helps somewhat, but still requires a roundtrip to
your server every time your UI needs to update. And if multiple parts of the
page need to update all at once, most developers just resort to loading the page
over again, since keeping everything in sync is tricky.

Ember.js, like some other modern JavaScript frameworks, works a little differently.
Instead of the majority of your application's logic living on the server, an
Ember.js application downloads everything it needs to run in the initial page
load. That means that while your user is using your app, she never has to load
a new page and your UI responds quickly to their interaction.

One advantage of this architecture is that your web application uses the same
REST API as your native apps or third-party clients. Back-end developers can
focus on building a fast, reliable, and secure API server, and don't have to be
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

```javascript
MyApp.president = Ember.Object.create({
  name: "Barack Obama"
});

MyApp.country = Ember.Object.create({
  // Ending a property with 'Binding' tells Ember to
  // create a binding to the presidentName property.
  presidentNameBinding: 'MyApp.president.name'
});

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

### Auto-updating Templates

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
