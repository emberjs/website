---
title: Ember Data v1.0.0-beta.15 Released
author: Brendan McLoughlin
tags: Ember Data, 2015, Version 1.x
responsive: true
---


We are pleased to announce the release Ember Data 1.0.0-beta.15. It
includes many bug fixes as well as several new features. As always
this release can be obtained from npm (for use with ember-cli),
rubygems, or bower. The builds are also available as static files at
emberjs.com/builds

The 1.0.0-beta.15 release represents the effort of at least 30
contributors across over 168 commits.

## Improvements

### Snapshot API

In Ember Data serializers will now be given a snapshot instance
instead of a record instance when serializing records. A snapshot
represents the frozen state of a record at a particular moment in
time. Its initial purpose is to be passed to serializers instead of
the real record. This allows the serializer to examine the current
state of that record in the moment without triggering side-effects,
like loading relationships.

The snapshot has a different API from a record for accessing
properties so you will know you are working with a snapshot. Using
`snapshot.get` is still supported for compatibility however it will
log a deprecated warning to encourage you to use the new apis.

To access attributes you should now use the `attr` function.

```js
// Ember Data 1.0.0-beta.14.1
post.get('title');
// Ember Data 1.0.0-beta.15
postSnapshot.attr('title');
```

To access a belongsTo relationship you should use `.belongsTo()` method.

```js
// Ember Data 1.0.0-beta.14.1
post.get('author');
// Ember Data 1.0.0-beta.15
postSnapshot.belongsTo('author');
```

To access a hasMany relationship you should use `.hasMany()` method.

```js
// Ember Data 1.0.0-beta.14.1
post.get('comments');
// Ember Data 1.0.0-beta.15
postSnapshot.hasMany('comments');
```


Please give a warm thanks to [Christoffer Persson][wecc] for all his
work implementing this feature!

### Errors on arbitrary properties

Previously, Ember Data would only attach errors to a record's error
object if they matched a property that was already on the record. Now
thanks to [Alex Speller][alexspeller]'s
[work](https://github.com/emberjs/data/pull/1984) any error returned
by the backend can be attached to the error object.

Please note that if your backend is returning an error property that
is not an attribute on the record you will need to manually clear it
before the record can transition out of the error state.

### Sort query params in ajax calls.

When developing APIs, it is common to use a caching mechanism, like
Varnish, to cache requests to public API endpoints, and those tools
use the URL string to determine if they have a cached response.

As an example, if one user requests `/posts?sort=price&category=pets`
and another requests `/posts?category=pets&sort=price`, the cached
request won't be used in the second call.

Ember Data's `RESTAdapter` will now sort the query parameters by their
field name when making an ajax request.

It is possible to disable this behavior, by setting `sortQueryParams`
to be false on your adapter.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1',
  sortQueryParams: false
});
```

Thanks to [Miguel Camba][cibernox] for implementing this feature.

<!-- Links -->
[wecc]: https://github.com/wecc
[alexspeller]: https://github.com/alexspeller
[cibernox]: https://github.com/cibernox
