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

Currently, Ember Data ships as a separate library from Ember.js, while
we expand the adapter API to support more features. The API described in
this section tends to be stable, however.  Until Ember Data is included
as part of the standard distribution, you can get your copy of the latest
passing build from the "master" branch from [builds.emberjs.com][builds]:

* [Development][development-build]
* [Minified][minified-build]

[builds]: http://builds.emberjs.com
[development-build]: http://builds.emberjs.com.s3.amazonaws.com/ember-data-latest.js
[minified-build]: http://builds.emberjs.com.s3.amazonaws.com/ember-data-latest.min.js
