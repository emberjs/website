---
title: Stabilizing Ember Data
author: Tom Dale & Yehuda Katz
tags: Recent Posts, Ember Data, 2013, Adapter, 1
responsive: true
---

Yesterday, we gave you an update on our progress making Ember.js easier
to use. One thing we didn't discuss was our plan for Ember Data.

It's no secret that, while many developers are building awesome apps
with Ember.js, Ember Data still causes lots of frustration due to bugs
and a changing, complex API. Documentation about it is also mixed in
with Ember.js documentation, making it difficult for new developers to
understand what is stable and what is not.

To be clear, Ember Data is not a dependency of Ember.js.
[Discourse](https://github.com/discourse/discourse), for example, uses
its own, simple wrapper around
[`$.ajax`](https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/models/model.js).

Even though Ember Data is not a dependency of Ember.js, loading data
from the server is an extremely important part of most web applications,
and it's a problem that every Ember.js application will have to deal
with.

Our long-term goal is simple: we don't think most web developers should
have to write any custom XHR code for loading data. Strong conventions
on the client and strong conventions on the server should allow them to
communicate automatically.

We know we're not there yet.

In order for this to work, there are many necessary features that must
be rock-solid across all sorts of different persistence layers—local
storage, relational databases, and key-value stores, to name a few. To
top it off, the asynchronous environment of the browser (with an often
unreliable internet connection) adds significant complexity, and means
we can't simply port the solutions to these problems that have been
pioneered on the server.

Getting all of these features working well together is a challenging
problem, and we have not been able to deliver everything we thought we
could in a reasonable amount of time.

Additionally, many developers are writing web applications that need to
consume an existing JSON API that evolved organically and is not
consistently named or structured. The API we have provided so far is
suboptimal for this task.

To make the experience of writing an Ember Data application less
frustrating, we're doing two things:

1. We're identifying a subset of features that already work reliably.
2. We're introducing a new, simpler API for working with remote data
   that makes fewer assumptions. You still get to use the model API
   in Ember Data, but can "bring your own `$.ajax`" to load and store
   records.

Right now, what gets documented is somewhat ad-hoc. Going forward, we
will heavily document the stable features. Finding documentation about
an Ember Data feature on the emberjs.com website will be your indication
that we consider it stable and safe to use.

Over time, after we have put new features through their paces and
written extensive documentation, the set of stable features will grow.
In other words, we are refocusing on a small core of practical features,
which we will slowly iterate towards our long-term, ambitious goal.

## The Basic Adapter

The Ember Data adapter layer, which is responsible for finding and
saving records, is currently designed to make it easy to build reusable
adapters, like the ones people have written for
[Parse](https://github.com/clintjhill/ember-parse-adapter) or
[CouchDB](https://github.com/pangratz/ember-couchdb-adapter). It is not
well-suited for delegating out to `$.ajax` to work with an API
that is not 100% consistent.

To make it easier to use Ember Data with any kind of JSON data, we
are introducing the Basic Adapter, which simply delegates to a `sync`
object on your model.

Let's look at an example of using the Basic Adapter with the Twitter API.

First, note that the syntax for defining a model hasn't changed
(historically, this has been one of the most stable parts of Ember
Data):

```javascript
var attr = DS.attr, hasMany = DS.hasMany, belongsTo = DS.belongsTo;

App.User = DS.Model.extend({
  defaultProfileImage: attr('boolean'),
  description: attr('string'),
  screenName: attr('string'),
  isVerified: attr('boolean'),
  createdAt: attr('date'),

  tweets: hasMany('App.Tweet')
});

App.Tweet = DS.Model.extend({
  coordinates: attr('point'),
  createdAt: attr('date'),
  isFavorited: attr('boolean'),
  retweetCount: attr('number'),
  text: attr('string'),
  isTruncated: attr('boolean'),

  replyTo: belongsTo('App.User'),
  user: belongsTo('App.User')
});
```

Finding records also hasn't changed:

```javascript
// use the Promise API
App.User.find(userId).then(function(user) {
  return user.get('tweets');
}).then(function(tweets) {
  // do something with `tweets`
});
```

When you request the `User` and then its `tweets`, Ember Data will make
calls to your models' `sync` object.

```javascript
App.User.sync = {
  find: function(id, process) {
    $.getJSON("/users/show", { screen_name: id }).then(function(user) {        
      process(user)                 
        .primaryKey('screen_name')
        .camelizeKeys()
        .applyTransforms('twitter')
        .load();
    });
  },

  findTweets: function(user, name, process) {
    var screenName = user.get('id');

    $.getJSON("/statuses/user_timeline", { screen_name: screenName }).then(function(timeline) {
      process(timeline)
        .primaryKey('id_str')
        .camelizeKeys()
        .applyTransforms('twitter')
        .munge(function(json) {
          json.isTruncated = json.truncated;
          json.replyTo = json.inReplyToScreenName;
        })
        .load();
    });
  }
};
```

As you can see, in each of the hooks on the `sync` object, the last
argument passed in is a function called `process`. You use this function to
load JSON data returned from the XHR into the store. It also includes
several conveniences for common transformations, like camelizing
property names and transforming values like dates.

Of course, you are not required to use these conveniences. You can write
whatever imperative code you'd like to transform the JSON returned from
the server into the form that Ember Data is expecting. Here is the above
example re-written without using the chained conveniences.

```javascript
findTweets: function(user, name, process) {
  var screenName = user.get('id');

  $.getJSON("/statuses/user_timeline", { screen_name: screenName }).then(function(timeline) {
    var tweets = timeline.map(function(json) {
      // Map primary key
      json.id = json.id_str;

      // Camelize property names
      for (var prop in json) {
        var value = json[prop];
        delete json[prop];
        json[camelize(prop)] = value;
      }

      // Convert string-formatted date to object
      json.createdAt = Date.parse(json.createdAt);

      // Convert hash to JavaScript object
      json.coordinates = new Twitter.Point(json.coordinates);
      
      // Rename properties
      json.isTruncated = json.truncated;
      json.replyTo = json.inReplyToScreenName;
      
      return json;
    });

    process(tweets).load();
  });
}
```

## Timeline

We have been working on this new API part-time for the past few weeks.
You can see our progress on Ember Data's master branch, by looking at
[the tests][1] or [the implementation][2].

[1]: https://github.com/emberjs/data/tree/master/packages/ember-data/tests/integration/adapters/basic_adapter
[2]: https://github.com/emberjs/data/blob/master/packages/ember-data/lib/adapters/basic_adapter.js

Over the next few weeks, we will be writing documentation that will be
available in the [Ember.js Guides](/guides/). Once a
few people have had the opportunity to use the Basic Adapter and
sanity-check our work, we will start cutting beta releases of Ember
Data. We think that this will be a lot easier for new developers than "make
a build from master."

Our thanks go out to [John McDowall](http://mcdowall.info), who has been
tracking our progress on Basic Adapter and writing documentation to go
with it.

Finally, we'd like to give a big thanks to
[Addepar](https://addepar.com/) for financially supporting us
while we do this work. They are big users of and contributors to Ember
Data, and we couldn't do it without them.
