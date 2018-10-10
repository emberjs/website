---
title: Ember Data v1.0.0-beta.19 Released
author: Stanley Stuart
tags: Ember Data, 2015, Version 1.x
responsive: true
---

Ember Data 1.0.0-beta.19 contains a lot of bugfixes from the comunity!
Thank you for helping us push toward a stable release of Ember Data!

## New Features

### Snapshots have changedAttributes

`changedAttributes`, which represents the changes that have happened
since the model was last synced with the server, are now available on
the snapshot in your adapters and serializers, instead of just on
`DS.Model` instances.

## Breaking Changes

### Passing Classes to Store Methods

Previously, you were allowed to pass a classes directly to store methods
like `store.push`:

```javascript
var record = store.push(App.Post, {id: 1});
```

While this isn't a very popular way and generally not recommended in the
documentation, it did remain the preferred way to do things in Ember
Data's tests for a long time. As we move toward to using Ember's
Dependency Injection framework for consistency, passing these classes
directly to store methods has been removed. Instead, you should pass a
dasherized string:

```javascript
var record = store.push('post', {id: 1});
```

To help you upgrade through this change easily, we've written an [Ember
Watson command](https://github.com/abuiles/ember-watson#ember-watsonconvert-ember-data-model-lookups).
You can use this command-line tool in both Ember-CLI projects and
"globals mode" style projects.

### Services depending on the store

In order to fix deprecations warning induced by Ember 1.12, the store service is now injected as an
[instanceInitializer](http://emberjs.com/blog/2015/05/13/ember-1-12-released.html#toc_instance-initializers).
As a consequence, if you had initializers depending on the store, you should move  
them to an instance initializer as well, and mark it as `after: 'ember-data'`.

## Important Deprecations

### Fixture Adapter Removed

Support for the Fixture Adapter has been deprecated. After some thought,
the Ember Data team decided it was not the right approach for
integration-style tests. We recommend using an AJAX/data transport
stubbing strategy like [Pretender](https://github.com/trek/pretender) or
[sinon](http://sinonjs.org/).

We'll be including docs on integration test strategies using Pretender in the
final release.

The Fixture Adapter now lives as an [addon](https://github.com/emberjs/ember-data-fixture-adapter).

## Internet Explorer 8

<s>This will be the last release to support Internet
Explorer 8. Future versions of Ember Data will not support Internet
Explorer 8</s>

Update:
[Ember Data 1.13](/blog/2015/06/18/ember-data-1-13-released.html) has
been released with support for IE8. Ember Data 1.13 is the last
version of Ember Data that supports IE8. Ember Data 2.0 supports IE9+.
