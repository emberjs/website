---
title: Ember Data v1.0.0-beta.9 Released
author: Stanley Stuart
tags:  Ember Data, 2014, Version 1.x
responsive: true
---

Since Ember Data v1.0.0-beta.8, a lot has changed. Since we didn't write a blog
post for beta.8, this blog post will contain features in both beta.8 and beta.9.

## New Release Schedule

Since the first beta release for Ember Data 1.0, Ember Data has typically been
released when we felt like critical features or bugfixes were merged. Due to the
ever changing nature of Ember Data, we'd like to reward Ember Data users for
keeping up with changes by providing more frequent releases until a release
candidate emerges. Beginning Monday, August 18th 2014, Ember Data will release a
new beta version **every 3 weeks**. The builds will be available on the [builds
page][builds-page], Bower, Rubygems, and soon, NPM.

## Breaking Changes

### Object.create shim required

Ember Data now requires an `Object.create` polyfill for environments without
`Object.create` or incorrect `Object.create` implementations such as **Internet
Explorer 8**. Ember.js will be shipping with an Object.create polyfill in 1.8.0.
If you are using stable builds of Ember, we recommend using
[ES5Shim][es5-shim]'s  [es5-sham.js][es5-sham] file available on NPM and Bower.
You can refer to [Kangax's Compatibility Tables][es5-compat-object-create] to
see if you need the shim.

Ember Data uses `Object.create` under the hood for faster and collision-free
caches.

### Dates Serialized with ISO8601 by Default

Due to the [various ways][xkcd-iso8601] dates can be serialized across the wire,
Ember Data has decided to use the well-known, well-supported, and accurate
[ISO8601][iso8601] format. Although the JavaScript programming language has had
support for ISO8601 strings since [ECMAScript5][es5-iso], environment such as
Internet Explorer 8 do not support `Date.prototype.toISOstring`. However, Ember
Data does include a shim so you need no further work here except to make sure
your backend is supporting ISO8601.

### RESTAdapter.prototype.findMany changed behavior and method signature

You should see the [findMany][find-many] documentation if you have overridden
the `findMany` method in your adapter.

### HasMany Coalescing Now Opt-In

See the section below on "Coalescing Find Requests" for more information.
Previously, if you did not sideload data for a hasMany relationship, but
did provide IDs, Ember Data would attempt to get all the records in one request.

For example:

```javascript
// Given this payload:
{
  "author": {
    "id": "1",
    "name": "Lon Ingram",
    "post_ids": ["1", "2", "3"]
  }
}

this.store.getById('author', '1').get('posts');

// $.ajax GET /posts?ids[]=1&ids[]=2&ids[]=3
```

Unless you opt in, Ember Data will instead fire 3 requests:

```javascript
this.store.getById('author', '1').get('posts');

// $.ajax GET /posts/1
// $.ajax GET /posts/2
// $.ajax GET /posts/3
```

See the section below on "Coalescing Find Requests" for more information.

## New Features and Improvements

### Embedded Records Mixin

#### Deserializing Relationships

Thanks to Igor Terzic, Brendan Mcloughlin, and Bill Heaton, the
`DS.EmbeddedRecordsMixin` was extracted out of `DS.ActiveModelSerializer` in
Ember Data v1.0.0-beta.8 so that users of `JSONSerializer`, `RESTSerializer`, and
`ActiveModelSerializer` could easily serialize and deserialize relationships. To
use the code in your app, you can include the `EmbeddedRecordsMixin` into your
serializer:

```javascript
App.PostSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin);
```

This means that your `PostSerializer` will now correctly bring in data for
relationships if they are embedded in the response, rather than sideloaded.

For example, here is the previous JSON data response Ember Data expected for the
RESTAdapter:

```javascript
// GET /posts/1
{
  "post": {
    "id": "1",
    "name": "The Mother We Share Lyrics",
    "authorId": "1"
  },
  "authors": [
    {
      "id": "1",
      "name": "CHVRCHES"
    }
  ]
}

this.store.find('post', '1').then(function(post){
  console.log(post.get('author.name')); // => CHVRCHES
});
```

Now, if you mixin the EmbeddedRecordsMixin, Ember Data will understand the
following payload:

```javascript
// GET /posts/1
{
  "post": {
    "id": "1",
    "name": "The Mother We Share Lyrics",
    "author": {
      "id": "1",
      "name": "CHVRCHES"
    }
  }
}

this.store.find('post', '1').then(function(post) {
  console.log(post.get('author.name')); // => CHVRCHES
});
```

These settings are configurable. See the section below on "Serializing
Relationships."

#### Serializing Relationships

The EmbeddedRecordsMixin also has support for sending information about
relationships to the server. To override the defaults, you can configure the
EmbeddedRecordsMixin by defining an `attrs` object on your serializer
definition. For example, to serialize the complete record when serializing to
the server:

```javascript
App.PostSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    author: {
      serialize: 'records'
    }
  }
});

var post = this.store.getById('post', '1');
post.set('name', 'Recover Lyrics');
post.save();

// POST /posts/1
{
  "post": {
    "name": "Recover Lyrics",
    "author": {
      "id": "1",
      "name": "CHVRCHES"
    }
  }
}
```

To see even more ways to customize serializing and deserializing behavior, check
out the [documentation][embedded-docs] for the `EmbeddedRecordsMixin`.

### Coalescing Find Requests

One feature we're particularly excited about is the ability to coalesce find
requests for the same record type.

To introduce this feature, I'll explain the basic concept behind Ember.js's "Run
Loop". Typically in JavaScript code that re-renders whenever the data changes,
changing the data multiple times within the same turn of the JavaScript event
loop would cause multiple re-renders. Ember uses a microlibrary called
[Backburner][backburner] to reduce the number of writes by only rendering once
per "run loop". For more information, you can view the README on the Backburner
on the repository and view the Ember.js [Run Loop Guide][run-loop-guide].

Without "Coalescing Find Requests" turned on, the previous code would result in
multiple network requests:

```javascript
this.store.find('post', '1');
this.store.find('post', '2');
this.store.find('post', '3');

// $.ajax GET /posts/1
// $.ajax GET /posts/2
// $.ajax GET /posts/3
```

On the server-side, this is frequently referred to as an [N+1
query][n-plus-one-query].

By coalescing (also known as batching) these requests, Ember Data will observe
that you requested several records of the same type and only send one request
instead of 3.

```javascript
this.store.find('post', '1');
this.store.find('post', '2');
this.store.find('post', '3');

// $.ajax GET /posts?ids[]=1&ids[]=2&ids[]=3
```

**Coalescing find requests is currently turned off by default**. To turn it on,
you can use the following code:

```javascript
DS.RESTAdapter.reopen({
  coalesceFindRequests: true
});
```

To override how the records are requested, you may override the `findMany` and
`findHasMany` methods on your adapter.

### Ember Inflector is Now a Standalone Package

Ember Inflector is Ember's approach for a Rails-compatible API for inflecting
strings. This provides methods such as `Ember.String.pluralize` and
`Ember.String.singularize`, and hooks for defining your own inflections.
Previously, the Ember Inflector package was contained in Ember Data's repository
and released alongside Ember Data. It has been pulled out to a [separate
repository][ember-inflector]. Although Ember Inflector is still included in the
Ember Data release, you may now use it in projects that do not use Ember Data.
Ember Inflector is currently released as a 1.0 semver package.

### Ember Inflector String Caching

Ember Inflector now caches lookups of strings by default. This means that you
should only pay the cost of transforming a string (via `pluralize` and
`singularize`) once as the values are now stored using an in-memory cache. If
you have memory concerns, you may want to monitor lookups and disable the cache
by calling `Ember.Inflector.inflector.disableCache()` at the beginning of your
app code.

### Improved Uncountable / Irregular Definitions for Singularize

We would like to express our deep appreciation to [Olivia Briggs][olivia-briggs]
for adding better support for uncountable/irregular singular words in
Ember-Inflector. You should now not need definitions for `dasherized` and
`underscore` versions of your inflections.

### Handlebars Helpers for Inflections

You can now use `pluralize` and `singularize` in your Handlebars templates:

```handlebars
{{pluralize "octopus"}}
{{singularize "oxen"}}
```

The Handlebars helpers are bound, so they will stay up to date if you bind to a
property:

```handlebars
{{pluralize type}}
```

### Performance Improvements

Thanks to [Stefan Penner][stef] from the Ember.js core team, your apps should be
faster when used with Ember Data. We'd also like you to try out Ember 1.8
beta in your apps with Ember Data 1.0.0-beta.9 for additional performance
improvements.

We have more performance improvements around the corner! Keep an eye out for
Stef landing some commits on improving `pushPayload` calls and a [commit
to Backburner][backburner-commit] improving many hot code paths in Ember Data.

### Better Support for Nested Records.
`buildURL` now takes a record, on which you can look up the relationship if you
need to build a nested URL. For example:

```javascript
App.CommentAdapter = DS.RestAdapter.extend({
  buildURL: function(type, id, record) {
    return '/posts/' + record.get('post.id') + '/comments/' + id;
  }
})
```

### Added support for preloading records

For more information, go to [Store documentation][store-docs].

## Special Thanks

We'd like to thank the following members of the Ember.js community for their
continued contributions to Ember Data:

* Igor Terzic as the project's main steward (@terzicigor)
* Brendan McLoughlin (@BezoMaxo) for responding to and triaging issues, and
  contributing documentation, bug fixes, and improvements.
* Ilya Radchenko (@knownasilya)
* Bradley Priest (@bradleypriest)
* Bill Heaton (@pixelhandler)
* Paul Chavard (@tchak)
* Sylvain Mina (GH @sly7-7)
* Ryunosuke Sato (@tricknotes)
* Alexandre de Oliveira (@kurko) for his awesome work on the
  [ember-localstorage-adapter][ember-localstorage-adapter] and
  [ember-indexeddb-adapter][ember-indexeddb-adapter].
* Jonathan Collins (Github @jcollins1991)
* Stefan Penner (@stefanpenner)
* Tom Dale (@tomdale)
* Yehuda Katz (@wycats)

We’d also like to thank Instructure and PrecisionNutrition for sponsoring
some of Igor’s development on Ember Data.

## Tools

* [Ember Data Model Maker][ember-data-model-maker]

<!-- Links -->
[builds-page]: http://emberjs.com/builds/#/beta
[embedded-docs]: http://emberjs.com/api/data/classes/DS.EmbeddedRecordsMixin.html
[es5-shim]: https://github.com/es-shims/es5-shim
[es5-sham]: https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
[xkcd-iso8601]: http://xkcd.com/1179/
[iso8601]: http://en.wikipedia.org/wiki/ISO_8601
[es5-iso]: http://es5.github.io/#x15.9.5.43
[backburner]: https://github.com/ebryn/backburner.js/
[run-loop-guide]: http://emberjs.com/guides/understanding-ember/run-loop/
[n-plus-one-query]: https://secure.phabricator.com/book/phabcontrib/article/n_plus_one/
[es5-compat-object-create]: http://kangax.github.io/compat-table/es5/#Object.create
[ember-inflector]: https://github.com/stefanpenner/ember-inflector
[stef]:https://twitter.com/stefanpenner
[olivia-briggs]: https://github.com/ofbriggs
[find-many]: http://emberjs.com/api/data/classes/DS.RESTAdapter.html#method_findMany
[ember-localstorage-adapter]: https://github.com/kurko/ember-localstorage-adapter
[ember-indexeddb-adapter]: https://github.com/kurko/ember-indexeddb-adapter
[ember-data-model-maker]: http://andycrum.github.io/ember-data-model-maker/
[pixelhandler]: https://twitter.com/pixelhandler
[backburner-commit]: https://github.com/ebryn/backburner.js/pull/97
[store-docs]: https://github.com/emberjs/data/blob/master/packages/ember-data/lib/system/store.js#L356
