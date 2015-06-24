---
title: Ember Data v1.13 Released
author: Ember Data Team
tags: Recent Posts, Releases
---

We are proud to announce the release of Ember Data 1.13. This
represents the first stable release of Ember Data since its creation
over 3 years ago. As always this release can be obtained from npm (for
use with ember-cli), rubygems, or bower. The builds are also available
as static files at [http://emberjs.com/builds]().

**Ember Data 1.13 is the first release of Ember Data that syncs its
  version with a version of Ember.js.**

**Ember Data 1.13 is also the last release of the current series of
  releases, and has no breaking changes from 1.0.0-beta.19.2.** It
  wraps up the long beta cycle, and adds a number of deprecations that
  prepare Ember Data for its 2.0 release on July 24.

**Ember Data 1.13 is the last release of Ember Data that supports IE8
  and the 1.x series of Ember.js.**

To prepare yourself for Ember Data 2.0 on July 24, first upgrade to
Ember Data 1.13 and fix deprecation warnings reported in your
application.

We would like to extend a special thanks to the many contributors who
have helped out with this release. We would also like to recognize the
following contributors who helped with multiple issues leading up to
this release.

- [@turbo87](https://github.com/turbo87)
- [@erickelly](https://github.com/erickelly)
- [@pangratz](https://github.com/pangratz)
- [@sly7-7](https://github.com/sly7-7)
- [@yratanov](https://github.com/yratanov)
- [@tchak](https://github.com/tchak)
- [@thaume](https://github.com/thaume)
- [@mikehollis](https://github.com/mikehollis)
- [@tricknotes](https://github.com/tricknotes)

## New Features

### Simplified Find Methods

Ember Data methods on the store have grown organically over the life
of the project. Originally, Ember Data started with `store.find(type)`
to request all records for a type and `store.find(type, id)` to
request a specific record. Later Ember Data added ways to issue a
query to the server via `store.find(type, {query})` or always reload a
record from the backend using `store.fetchById(type, id)` and
`store.fetchAll(type)`.

We realized the overloaded `store.find` method and inconsistent naming
of other methods is confusing for new developer approaching Ember Data
for the first time. As a result, we have renamed many of the existing
store methods to make them more consistent and approachable for all
developers.

#### getById and all renamed to peekRecord and peekAll

We have renamed the synchronous methods on the store to `peekRecord`
and `peekAll`. `peek` was chosen because it conveys the idea that you
are peeking into the store's record cache without triggering a side
effect. The `Record` and `All` suffixes were added for consistency
with the new `find` methods (mentioned below) and because the suffixes
convey the type of object that will be returned.

`store.getById(type, id)` has been renamed to `store.peekRecord(type,
id)`. `getById` will continue work in Ember Data 1.13 with deprecation
warnings and it will be removed in Ember Data 2.0.

`store.all(type)` has been renamed to
`store.peekAll(type)`. `store.all` will still work in Ember Data 1.13
with deprecation warnings and it will be removed in Ember Data 2.0.

#### find split into findRecord and findAll

The `store.find` method is being deprecated and split into several new
methods.

###### FindRecord

```js
store.find(type, id)
```

is being replaced with:

```js
store.findRecord(type, id, [options]);
```

If you previously used the preload argument to `store.find` it has
been moved into the preload key on `findRecord`'s options argument

```js
// Deprecated
store.find('comment', 1, { post: 1 });

// Ember Data 2.0 style
store.findRecord('comment', 1, { preload: { post: 1 }});
```

###### FindAll

```js
store.find(type)
```

is being replaced with:

```js
store.findAll(type, [options]);
```


#### fetchById and fetchAll replaced by findRecord and findAll

As part of the simplification of the store API we have decided to
deprecate the existing `store.fetchById` and `store.fetchAll`
methods. Their functionality will be supported by passing `{reload:true}`
 to the new `findRecord` and `findAll` methods in the options
parameter.

- `store.fetchById(type, id)` has been deprecated and replaced by:

```js
store.findRecord(type, id, { reload: true });
```

- `store.fetchAll(type)` has been deprecated and replaced by:

```js
store.findAll(type, { reload: true });
```


#### query and queryRecord

The final use case for the old `store.find` method was issuing queries
to the server. This usage of `store.find(type, { query })` has been
deprecated and replaced by a new `query` method
on the store.

```js
store.query(type, { query });
```

In addition to `store.query` we have also added a `queryRecord` for
issuing arbitrary queries to the backend where the expected response
is a single record.

```js
store.queryRecord(type, { query });
```

Thanks to [@thaume](http://github.com/thaume) for his work implementing this feature.


[@eccegordo](https://github.com/eccegordo) put together this table
listing all the new store apis and the methods they repalce.


<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Arguments</th>
      <th>Replaces</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>peekRecord</code></td>
      <td><code>store.peekRecord(type, id)</code></td>
      <td><code>store.getById(type, id)</code></td>
    </tr>
    <tr>
      <td><code>peekAll</code></td>
      <td><code>store.peekAll(type)</code></td>
      <td><code>store.all(type)</code></td>
    </tr>
    <tr>
      <td><code>findRecord</code></td>
      <td><code>store.findRecord(type, id, options)</code></td>
      <td><code>store.find(type, id)</code></td>
    </tr>
    <tr>
      <td><code>findAll</code></td>
      <td><code>store.findAll(type, options)</code></td>
      <td><code>store.find(type)</code></td>
    </tr>
    <tr>
      <td><code>queryRecord</code></td>
      <td><code>store.queryRecord(type, query)</code></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>query</code></td>
      <td><code>store.query(type, query)</code></td>
      <td><code>store.find(type, { query })</code></td>
    </tr>
  </tbody>
</table>


### New Adapter Hooks

Currently, Ember Data fetches record data from the server the first
time a record with a given ID is requested. Subsequent requests
(e.g. leaving and re-entering the same route) use locally cached
data. The advantage of this model is that it keeps conferring with the
server to a minimum. Once data is loaded, the client can render new
routes with the model data that it has cached, without a network
roundtrip.

Unfortunately, this model is surprising to new developers. When
navigating between pages, they expect the most up-to-date
representation to be fetched and displayed every time.

Second, even for developers who understand what is happening, it is
very easy for long-lived applications to accumulate stale information,
particularly if the model they are displaying updates
frequently. Developers must somehow disambiguate between the first
time a model is looked up, and allowing it to proceed, and detecting
when a cached model is being used and updating it manually.

In Ember Data 2.0 we will be changing the store to refreshed cached
records in the background when they are requested by a call
to`store.findRecord` or `store.findAll`. This new strategy will
preserve the speed of client-side navigation. Once data for a record
is cached, transitioning to any route that relies on it is nearly
instantaneous and has no network bottleneck. However, because it
triggers a background update, even users who expect a new fetch every
time will not be surprised as, ideally after a few milliseconds, the
new data will arrive and be persisted into the DOM.

In order to support this new default strategy and make it
customizable. We are introducing 4 new adapter methods.

The first 2 adapter methods are `shouldReloadRecord` and
`shouldBackgroundReloadRecord`. These methods may be called by the
store when it is loading a record using `store.findRecord`.

`Adapter#shouldReloadRecord` is called by the store when a record is
found in the store's cache. If it returns true the store will reload
the record from the backend and it will wait to resolve the promise
until the reload is complete. `shouldReloadRecord` is never checked if
the record is not in the store or if the user passed `{ reload: true}`
in the options argument to `findRecord`. The default implementation
for this method in both Ember Data 1.13 and Ember Data 2.0 is to
always return false. However, custom adapters may want to override
this method to support reloading stale records.

```js
  /**
    @method shouldReloadRecord
    @param {DS.Store} store
    @param {DS.Snapshot} snapshot
    @return {Boolean}
  */
  shouldReloadRecord: function(store, snapshot),
```

`Adapter#shouldBackgroundReloadRecord` is called by the store when the
store is resolving the `findRecord` promise with a cached record. If
this method returns `true` the store will attempt to reload the record
from the adapter in the background. The default implementation for
this method in Ember Data 1.13 is to always return `false`. However in
Ember Data 2.0 this will be changed to always return `true`.

```js
  /**
    @method shouldBackgroundReloadRecord
    @param {DS.Store} store
    @param {DS.Snapshot} snapshot
    @return {Boolean}
  */
  shouldBackgroundReloadRecord: function(store, snapshot),
```

Symmetric methods have also been added for `store.findAll`.

`Adapter#shouldReloadAll` is called by the store after
`store.findAll`is called. If it returns true the store will reload the
record from the backend and it will wait to resolve the promise until
the reload is complete. `shouldReloadAll` is never checked if the
record is not in the store or if the user passed `{ reload: true}` in
the options argument to `findAll`. The default implementation for this
method in Ember Data 1.13 is to always return `true`. However in Ember
Data 2.0 this will be changed to return `true` when there are records
in the store of the requested type.

```js
  /**
    @method shouldReloadAll
    @param {DS.Store} store
    @param {DS.SnapshotRecordArray} snapshotRecordArray
    @return {Boolean}
  */
  shouldReloadAll: function(store, snapshotRecordArray),
```

`Adapter#shouldBackgroundReloadAll` is called by the store when the
store is resolving the `findAll` because `shouldReloadAll` returned
true. If this method returns `true` the store will attempt to reload
the record from the adapter in the background. The default
implementation for this method in both Ember Data 1.13 and Ember Data
2.0 is to always return `true`.

```js
  /**
    @method shouldBackgroundReloadAll
    @param {DS.Store} store
    @param {DS.SnapshotRecordArray} snapshotRecordArray
    @return {Boolean}
  */
  shouldBackgroundReloadAll: function(store, snapshotRecordArray),
```

### JSON-API Support

Ember Data 1.13 comes with support for [JSON-API](http://jsonapi.org/)
1.0. There is a new `DS.JSONAPIAdapter` and `DS.JSONAPISerializer`
that support working with JSON-API backends. In Ember Data 2.0 the
JSON-API adapter and serializer will be the default adapter loaded by
Ember Data.

### New Serializer API

The internal data format that Ember Data's expects its serializers to
return has evolved over the 3.5 years of the project. Unfortunately,
this has resulted in some strange gotcha's around use cases like meta
data, polymorphic relationships and relationship links, especially
when these features are combined. Another problem with Ember Data's
internal format has been its lack of documentation which has made it
has made it hard to create custom serializers for Ember Data without
already having a strong understanding of the Ember Data codebase.

In order to solve these problems Ember Data is fully embracing
JSON-API. `store.push` now takes a JSON-API document and serializers
are expected to return a JSON-API document when normalizing the
adapter response. JSON-API solves many of the gotchas Ember Data's
internal format has struggles with over the years and it is a
[well documented format](http://jsonapi.org/format/) that serializer
authors can target without having to know about Ember Data's
internals.

Ember Data 1.13 supports the old format (with deprecations) and the
new JSON-API format to make it easy to transition.

#### Transition to the new Serializer API

If you have a custom serializer you will need to make some new changes
to your serializer to get it ready for Ember Data 2.0.

#### Custom extract methods

If you have custom `extract` hooks you need to do two things:

Rename:

- `extract()              => normalizeResponse()`
- `extractFindAll()       => normalizeFindAllResponse()`
- `extractFind()          => normalizeFindRecordResponse()`
- `extractFindMany()      => normalizeFindManyResponse()`
- `extractFindBelongsTo() => normalizeFindBelongsToResponse()`
- `extractFindHasMany()   => normalizeFindHasManyResponse()`
- `extractFindQuery()     => normalizeQueryResponse()`
- `extractQueryRecord()   => normalizeQueryRecordResponse()`
- `extractCreateRecord()  => normalizeCreateRecordResponse()`
- `extractDeleteRecord()  => normalizeDeleteRecordResponse()`
- `extractUpdateRecord()  => normalizeUpdateRecordResponse()`
- `extractSave()          => normalizeSaveResponse()`
- `extractSingle()        => normalizeSingleResponse()`
- `extractArray()         => normalizeArrayResponse()`

Make sure that your `extract` hooks return a full JSON-API Document
([http://jsonapi.org/format/#document-top-level]()) with the primary
resource(s) in a `data` array or object and eventual sideloaded
resources in a `included` array. Every resource object
([http://jsonapi.org/format/#document-resource-objects]()) has to
follow the JSON-API format with `id`, `type`, attributes in
`attributes` and relationships in `relationships`. For the full
specification of the JSON-API format see
[http://jsonapi.org/format/]().

##### Custom extractMeta method

If you have a custom `extractMeta` method you have to make sure it
returns the meta data instead of calling `store.setMetadataFor()` (or
relying on `_super` to do so).

##### Custom normalize method

If you have a custom `normalize()` method you need to update this to
return a full JSON-API Document
([http://jsonapi.org/format/#document-top-level]()) with the primary
resource object
([http://jsonapi.org/format/#document-resource-objects]()) located in
`data`.

##### Opt into the new Serializer API

To tell Ember Data that you are ready to use the new Serializer API,
add `isNewSerializerAPI: true` when extending `JSONSerializer` or
`RESTSerializer`. The new `JSONAPISerializer` uses the new Serializer
API by default. The `isNewSerializerAPI` flag is **only** required for
Ember Data 1.13 and will be removed in Ember Data 2.0. The new
`JSONAPISerializer` only supports the new Serializer API.

Thanks to [@wecc](https://github.com/wecc) for his hard work on
implementing this feature in a backwards compatible way.

We would also like thank [@kurko](https://github.com/kurko)
for his efforts maintaining the
[community JSON-API adapter](https://github.com/kurko/ember-json-api).

### New Errors API

Error handling is an important part of any ambitious
application. Ember-Data had a support for what we called invalid
errors from the very beginning. Invalid errors are a type of errors
that can be corrected by the user, means a "correct and retry" cycle
is encouraged for this type of errors. But there a other type of
errors that can occur in the adapter. A network can be down or you can
reach the quota on your `localStorage`. We wanted to provide some
better semantics to adapter authors on how to handle this type of
errors and expos an api to application authors to react on them.

In Ember-Data 1.13 we introduced a new adapter hook:
`handleResponse`. At the same time we deprecating `ajaxSuccess` and
`ajaxError`.

There been quite a bit of discussion on what an error in the context
of an adapter actually mean and how much control should we allow to
the application on deciding given a particular response. At some point
we made changes to support returning `InvalidError` from
`ajaxSuccess`. This is why today we replacing both hooks
(`ajaxSuccess` and `ajaxError`) with just one (`handleResponse`). The
default implementation will use a couple of new hooks (`isSuccess` and
`isInvalid`) to decide if a response is a success or an error of
certain type. It allows for more control over how your application
handles errors. Default implementation of `isInvalid` is to return
true if http status code is 422, however, you may desire other
semantics, for example checking the `code` property on a JSON-API
error object.

We also wanted for quite some time to abstract `jQuery.ajax`
semantics. We used to reject from the adapter with `jqXHR` object and
leave the application to deal with it. This strategy has a few
drawbacks. It made life hard for application authors by making the
switch from one adapter to another a lot of work. It also made life of
adapter authors hard by failing to provide them a common set of error
types that can be shared across different backends. A `TimeoutError`
for example can express a common type of error across a wide range of
backends. New hooks take three arguments: status code, a hash of
response headers and parsed payload. It makes them agnostic about the
underlying implementation and will allow to easily use of
[fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en)
in the future.


We made a decision in Ember Data to use the JSON-API format as out
internal representation of data. Naturally, we decided to do the same
for errors. JSON-API has specified an
[error objects](http://jsonapi.org/format/#error-objects)
format. Starting with Ember-Data 1.13 we are using JSON-API format to
communicate errors from the adapter to the store. Also RESTAdapter and
JSONAPISerializer supports out of the box JSON-API errors objects in
the error response payload. It means that the Ruby on Rails inspired
format we were using as payload for `InvalidError` is replaced with
proper JSON-API objects. The old format is supported with a
deprecation warning in 1.13.

Deprecated format:

```js
new DS.InvalidError({
  first_name: ['is invalid']
});
```

New format:

```js
new DS.InvalidError([
  {
    source: { pointer: 'data/attributes/first_name' },
    details: 'is invalid'
  }
]);
```

Thanks to [@tchak](https://github.com/tchak) and
[@twokul](https://github.com/twokul) for working on the design and
implementation of the new API.

## Significant Deprecations

In addition to new features, Data 1.13 introduces deprecations for
features and behavior that will be removed in Ember Data 2.0.

### Async Relationships

In Ember Data 2.0 relationships will be asynchronous by default. Sync
relationships will still be supported but you will need to manually
opt into them by setting `{ async: false }` on your
relationships. Ember Data 1.13 will log a deprecation warning you if
you have any relationships where the `async` property is not
explicitly set. Additionally you can use
[ember watson](https://github.com/abuiles/ember-watson) to help
identify cases in your codebase where you have relationships without
an explicit `async` property.

### DS.Store#filter moved to an addon

With Ember Data 2.0 and the commitment to semver we found we were not
happy with the state of the current `store.filter()` method. It
currently only supports a limited number of uses cases and often is a
source of memory leaks in long running applications. In order to give
Ember Data time to iterate on a better filter API the current
`store.filter` method has been deprecated and its functionality is
being moved into an addon
[https://github.com/ember-data/ember-data-filter/]().

In Ember 2.0, if you would like to use the current `store.filter`
method you will need to include the ember-data-filter addon with your
application.

### DS.ActiveModelAdapter moved to an addon

`DS.ActiveModelAdapter` and `DS.ActiveModelSerializer` has also been
[moved to an addon](https://github.com/ember-data/active-model-adapter). It
will continue to be supported by the Ember Data team, however, it will
no longer ship with Ember Data by default in Ember Data 2.0.

### Custom Stores

Over the years, Ember Data has supported a number of namespaces where
custom stores can be defined. In order to make things conceptually
simpler Ember Data 2.0 will require custom stores to be define as a
service.

If you have a custom store in your Ember CLI app defined in
`app/store.js` you will need to move it to `app/services/store.js`. If
you have a custom store in your globals app you will need to move it
to `App.StoreService`.


### JSON API Adapter Default

In Ember Data 2.0 the default adapter will be the `JSONAPIAdapter`. In
Ember Data 1.13 when loading the default `RESTAdapter` there will be a
deprecation warning.

To silence the warning and continue using the `RESTAdapter` you will
need to set the `RESTAdapter` as your application adapter.

```app/adapters/application.js
import DS from 'ember-data';

export default DS.RESTAdapter;
```

### store.push changes

Previously, Ember Data allowed users to add a record to the store
using `store.push('model-name', {})`. This format has been deprecated
and now `store.push` will take a JSON API document as its first and
only argument. This new change will allow Ember Data to get better
performance in Ember Data 2.0 by deferring the creation of DS.Model
instances until they are needed by user code. `store.pushMany` has
also been deprecated because you can push multiple records using in a
JSON API document.


### rollback renamed to rollbackAttributes

`record.rollback()` has been deprecated to
`record.rollbackAttributes()`. This new name more closely matches its
behavior and will allow for a new `record.rollback()` to be introduced
in the future that rolls back relationships in addition to attributes.


## Changelog

[Ember Data 1.13](https://github.com/emberjs/data/blob/3bce36295a6e9f1bbe4824505046d22dc04d056d/CHANGELOG.md#release-113-june-16-2015)
