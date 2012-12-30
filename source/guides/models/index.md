## Models

In most Ember.js apps, models are handled by [Ember Data][1]. Ember Data
is a library, built with and for Ember.js, designed to make it easy to
retrieve records from a server, make changes in the browser, then save
those changes back to the server.

It provides many of the facilities you'd find in server-side ORMs like
ActiveRecord, but is designed specifically for the unique environment of
JavaScript in the browser.

Without any configuration, Ember Data can load and save records and
relationships served via a RESTful JSON API, provided it follows certain
conventions.

We also understand that there exist many web service APIs in the world,
many of them crazy, inconsistent, and out of your control. Ember Data is
designed to be configurable to work with whatever persistence layer you
want, from the ordinary to the exotic.

[1]: https://github.com/emberjs/data
