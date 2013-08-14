## Models

Most Ember.js apps use [Ember Data][emberdata] to load records from a
remote server. Ember Data is a library that integrates tightly with
Ember.js to make it easy to retrieve records from a server, make changes
in the browser, then save those changes back.

It provides many of the facilities you'd find in server-side ORMs like
ActiveRecord, but is designed specifically for the unique environment of
JavaScript in the browser.

Without any configuration, Ember Data can load and save records and
their relationships served via a RESTful JSON API, provided it follows
certain conventions.

We also understand that you may have to integrate your Ember.js app with
existing APIs, many of them inconsistent and out of your control. Ember
Data is designed to be easily configurable to work with whatever
persistence layer you want, from the ordinary to the exotic.

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

### Core Concepts

Learning to use Ember Data is easiest once you understand some of the
concepts that underpin its design.

#### Store

The **store** is the central repository of records in your application.
Both your application's controllers and routes have access to this
shared store; when they need to display or modify a record, they will
first ask the store for it.

#### Models

A **model** is a class that defines the properties and behavior of the
data that you present to the user. Anything that the user expects to see
if they leave your app and come back later (or if they refresh the page)
should be represented by a model.

For example, if you were writing a web application for placing orders at
a restaurant, you might have models like `Order`, `LineItem`, and
`MenuItem`.

Models define the type of data that will be provided by your server. For
example, a `Person` model might have a `firstName` attribute that is a
string, and a `birthday` attribute that is a date.

A model also describes its relationships with other objects. For
example, an `Order` may have many `LineItems`, and a `LineItem` may
belong to a particular `Order`.

Models don't have any data itself; it just defines the properties and
behavior of specific instances, which are called _records_.

#### Record

A **record** is an instance of a model that contains data loaded from a
server. Your application can also create new records and save them back
to the server.

Records are uniquely identified by two things:

1. Their model type
2. An ID

Put another way, a record pairs the behavior, properties and
relationships described in a model with a particular set of data that is
identified by a unique ID.

For example, if you were writing a contact management app, you might
have a model called `Person`. An individual contact in your app might
have a type of `Person and an ID of `1` or `steve-buscemi`.

#### Automatic Caching

The store automatically caches records for you, returning the same
instance if it had already been loaded. This minimizes the number of
round-trips to the server, and allows your application to render UI to
the user as fast as possible.

For example, the first time your application asks the store for a
`person` record with an ID of `1`, it will fetch that information from
your server.

However, the next time your app asks for a `person` with ID `1`,
the store will notice that it had already retrieved that information
from the server and had cached it locally.

Instead of sending another request for the same information, it will
give your application the same record it had provided it the first time.
This feature—always returning the same record object, no matter how many times
you look it up—is sometimes called an _identity map_.

Using an identity map is important because it ensures that changes you
make in one part of your UI are propagated to other parts of the UI. It
also means that you don't have to manually keep records in sync—you can
ask for a record by ID and not have to worry about whether other parts
of your application have already asked for and loaded it.
