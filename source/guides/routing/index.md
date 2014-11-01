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
represented by a URL. Because all of the questions we asked above—
_Are we logged in?  What post are we looking at?_ —are encapsulated by
route handlers for the URLs, answering them is both simple and accurate.

At any given time, your application has one or more _active route
handlers_. The active handlers can change for one of two reasons:

1. The user interacted with a view, which generated an event that caused
   the URL to change.
2. The user changed the URL manually (e.g., via the back button), or the
   page was loaded for the first time.

When the current URL changes, the newly active route handlers may do one
or more of the following:

1. Conditionally redirect to a new URL.
2. Update a controller so that it represents a particular model.
3. Change the template on screen, or place a new template into an
   existing outlet.

###Logging Route Changes

As your application increases in complexity, it can be helpful to see exactly what is going on with the router. To have Ember write out transition events to the log, simply modify your `Ember.Application`:

```javascript
App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
```

###Specifying a Root URL
If your Ember application is one of multiple web applications served from the same domain, it may be necessary to indicate to the router what the root URL for your Ember application is. By default, Ember will assume it is served from the root of your domain.

If for example, you wanted to serve your blogging application from emberjs.com/blog/, it would be necessary to specify a root URL of `/blog/`.

This can be achieved by setting the rootURL on the router:

```js
App.Router.reopen({
  rootURL: '/blog/'
});
```
