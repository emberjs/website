## Introduction

As users interact with your application, they move through many
different _states_. Determining the current state and making sure the
application doesn't enter a _bad state_ is one of the hardest problems
developers face when building these apps.

For example, imagine we are writing a web app for managing a blog. At
any given time, we should be able to answer questions like: _Is the user
currently logged in? Are they an admin user? What post are they looking
at? Is the settings screen open? Are they editing the current post?_

In Ember.js, each state in your application is represented by
an _object_. All of the questions we asked above— _Are we logged in?
What post are we looking at?_ —are represented by this object, so
it's *impossible* to ever be in the wrong state.

The current state of your application can change for one of two
reasons:

1. The user interacted with a _template_, which generated an event that
   caused the current state to change.
2. The URL in the browser changed (or was loaded for the first time).

Every state in your router is also associated with a URL. When what's on
screen changes, the browser URL updates *automatically*.

When your application changes to a new _state_, the state may do one or
more of the following:

1. Change the template on screen, or place a new template into an
   existing _outlet_.
2. Connect the template to a _controller_.
3. Configure a controller, including telling the controller that it
   should represent a _model_.
