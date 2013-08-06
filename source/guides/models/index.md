## Models

Most Ember.js apps use [Ember Data][emberdata] to load records from a
remote server. Ember Data is a library, built with and for Ember.js,
designed to make it easy to retrieve records from a server, make changes
in the browser, then save those changes back to the server.

It provides many of the facilities you'd find in server-side ORMs like
ActiveRecord, but is designed specifically for the unique environment of
JavaScript in the browser.

Without any configuration, Ember Data can load and save records and
their relationships served via a RESTful JSON API, provided it follows
certain conventions.

We also understand that there are many existing APIs in the world, many
of them inconsistent and out of your control. Ember Data is designed to
be easily configurable to work with whatever persistence layer you want,
from the ordinary to the exotic.

Currently, Ember Data ships as a separate library from Ember.js.  Until
Ember Data is included as part of the standard distribution, you can get
a copy of the latest passing build from
[builds.emberjs.com][builds]:

* [Development][development-build]
* [Minified][minified-build]

[emberdata]: https://github.com/emberjs/data
[builds]: http://builds.emberjs.com
[development-build]: http://builds.emberjs.com/latest/ember-data.js
[minified-build]: http://builds.emberjs.com/latest/ember-data.min.js
