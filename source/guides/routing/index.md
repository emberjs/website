## Routing

As users interact with your application, it moves through many
different states. Ember.js gives you helpful tools for managing
that state in a way that scales with your application.

To understand why this is important, imagine we are writing a web app
for managing a blog. At any given time, we should be able to answer
questions like: _Is the user currently logged in? Are they an admin
user? What post are they looking at? Is the settings screen open?  Are
they editing the current post?_

In Ember.js, each of the possible states in your application is
represented by an object. Because all of the questions we asked above—
_Are we logged in?  What post are we looking at?_ —are encapsulated by
these objects, answering them is both simple and accurate.

At any given time, your application has a _current state_. The current
state can change for one of two reasons:

1. The user interacted with a view, which generated an event that caused
   the current state to change.
2. The URL in the browser changed (or was loaded for the first time).

Every state in your router is also associated with a URL. When the
current state changes, the router updates the browser URL
automatically.

When your application changes to a new state, the state may do one or
more of the following:

1. Change the template on screen, or place a new template into an
   outlet.
2. Connect a template to a controller.
3. Configure a controller, including telling the controller that it
   should represent a model.
