---
title: Ember Data v1.13 Released
author: Igor Terzic and the Ember Data Team
tags: Ember Data, 2015
responsive: true
---

We are proud to announce the release of Ember Data 1.13. This
represents the first stable release of Ember Data since its creation
over 3 years ago. 

As we explained in the [The Ember 2.x Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
blog post, going forward Ember Data will be syncing up its releases and version numbers with Ember.js releases. 

**Ember Data 1.13 is the first release of Ember Data that syncs its
  version with a version of Ember.js.** It will be followed by Ember Data 2.0, which will be released alongside Ember.js 2.0. **Ember Data 1.13 is fully backwards compatible with Ember Data beta.19, allowing for a smooth upgrade path.**

### Ember Data 1.13 Overview

Ember Data 1.13 is a massive release we are very proud of.
The highlight of the Ember Data 1.13 release is a total overhaul of Ember Data's internal format and Serializer API to follow JSON API. 

Two years ago Tom Dale and Yehuda Katz [published](http://emberjs.com/blog/2013/05/03/ember-data-progress-update.html) a vision for how Ember Data should look in the future and articulated the need for a single, ubiquitous JSON API standard.

We are very happy to see the vision for that JSON API standard come to life in the form of the [JSON API 1.0 release](http://jsonapi.org).

JSON API and Ember Data have been intertwined since JSON API's inception.
[@dgeb](https://github.com/dgeb) gives the origins of JSON API in his [1.0 announcement](http://www.cerebris.com/blog/2015/06/04/jsonapi-1-0/):
> Yehuda Katz wrote the first draft of the JSON API specification in May 2013 after hammering out the details in a long discussion with Steve Klabnik at RailsConf. JSON API began as a codification of the shared expectations of a single server library for Rails, ActiveModel::Serializers, and a single JavaScript client library, Ember Data.

Ember Data has long supported JSON API through a community [adapter](https://github.com/kurko/ember-json-api) started by [@0x8890](https://twitter.com/0x8890) and maintained by [@kurko](https://github.com/kurko). However, now that JSON API has reached 1.0, it's time for Ember Data to uphold its part of the bargain and make using JSON API a first-class experience.

We have done exactly that, and Ember Data 1.13 adds support throughout the Ember Data stack for JSON API:

- **Ember Data 1.13 ships with a fully supported JSON API Adapter and Serializer.** In 2.0, these will become the default Adapter and Serializer.
- **`JSONSerializer` and `RESTSerializer` have been refactored and streamlined to return JSON API payloads.**
- **`store.push` now accepts JSON API compliant payload.**
- Ember Data `InvalidError` objects now accept JSON API error objects

Switching to the JSON API format unlocks many new features which will be added in the 2.0 cycle, including first-class pagination, filtering and metadata support.

While **using JSONSerializer, RESTSerializer and ActiveModelSerializer is not deprecated**, we consider JSON API to be the happiest of the happy paths for using Ember Data, and if you are creating a new app today and have control over the API you should be using JSON API, because it is a well designed and comprehensive solution for JSON serialization. **If your app is using the vanilla JSONSerializer or RESTSerializer, you will not have to make any changes, and your app will continue to work.** The existing serializers have been updated in a backwards compatible way to return JSON API data to the store.

Other major changes in Ember Data 1.13 include:

- [Refactored and simplified find methods](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_simplified-find-methods)
- [Adapter level control for identity map caching](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_new-adapter-hooks-for-better-caching)
- [Refactored and simplified Serializer APIs](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_new-serializer-api-for-custom-serializer-authors)
- [Switch to using JSON API as the internal data storage format](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_internal-format-change-to-json-api)
- [Native JSON API Serializer](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_json-api-support)
- [Better error handling](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_new-errors-api)

## Upgrade Guide

Ember Data 1.13 is backwards-compatible with previous beta versions, and there are no
breaking changes between Ember Data 1.13 and Ember Data beta.19. Ember Data follows Ember.js's lead in not removing any features in this release. The upgrade path should be familiar to Ember.js users: upgrade, remove deprecations, upgrade again.

**You should update your codebase to Ember Data 1.13, remove all the deprecations
and then move to Ember Data 2.0. It is critically important to do this process step by step**, as it will give you easy to follow deprecation warnings.
Otherwise, your app might fail in hard-to-debug ways.

If you have customized your serializer, you should upgrade to Ember Data 1.13, 
check the upgrade guide to see if you need to make any changes, and then set a
temporary flag on your Serializer: `isNewSerializerAPI`. This will opt you into
the new serializer API. Once you are on the Ember Data 2.0 train, new Serializer API
is the default one, and there is no need for a flag.

We will be publishing a detailed step by step upgrade guide along with Ember.js
deprecations guides and [ember-watson](https://github.com/abuiles/ember-watson) helpers that will automatically upgrade some
of the deprecations for you.

## Release Logistics

**Ember Data 1.13 is the last release of Ember Data that supports IE8
  and the 1.x series of Ember.js. Ember Data 2.0-beta.1 will be released shortly, and it will follow the Ember.js release train.** Ember Data 2.0 will not work with the Ember.js 1.x series.

We would like to extend a special thanks to the many contributors who
have helped out with this release. We would also like to recognize the
following contributors who helped with multiple issues leading up to
this release. If you would like to help, please join #dev-ember-data in the 
[Ember Community](https://ember-community-slackin.herokuapp.com/) on Slack.

- [@turbo87](https://github.com/turbo87)
- [@HeroicEric](https://github.com/HeroicEric)
- [@pangratz](https://github.com/pangratz)
- [@sly7-7](https://github.com/sly7-7)
- [@yratanov](https://github.com/yratanov)
- [@tchak](https://github.com/tchak)
- [@thaume](https://github.com/thaume)
- [@mikehollis](https://github.com/mikehollis)
- [@tricknotes](https://github.com/tricknotes)

We would also like to thank the companies which generously sponsored some of the work
that has gone into Ember Data:

- [DockYard](https://dockyard.com/)
- [Precision Nutrition](http://www.precisionnutrition.com/)
- [BookingSync](http://bookingsync.com)

As always this release can be obtained from npm (for
use with ember-cli), rubygems, or bower. The builds are also available
as static files at [http://emberjs.com/builds]().

## New Features

## Simplified Find Methods

Ember Data methods on the store have grown organically over the life
of the project. Originally, Ember Data started with `store.find(type)`
to request all records for a type and `store.find(type, id)` to
request a specific record. Later Ember Data added ways to issue a
query to the server via `store.find(type, {query})` or always reload a
record from the backend using `store.fetchById(type, id)` and
`store.fetchAll(type)`.

We realized the overloaded `store.find` method and inconsistent naming
of other methods is confusing for both new and existing developers. As a result, we have renamed many of the existing
store methods to make them more consistent and approachable for all
developers.

In particular, `store.find`, `store.all`, `store.getById` have been 
deprecated and are replaced with consistently named methods. New methods follow a simple convention: If they are async and potentially go to the server, they start with `find`, and if they only get store local data without side-effects they start with `peek`.
If they return a single record they end in `Record` and if they return all the records they end in `All` .

#### Reorganized Find Methods

<table>
  <thead>
    <tr>
      <th></th>
      <th>Async from server/store</th>
      <th>Sync from store</th>
      <th>Query server</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Single Record</b></td>
      <td><code>findRecord(type,id)</code></td>
      <td><code>peekRecord(type, id)</code></td>
      <td><code>queryRecord(type, {query})</code></td>
    </tr>
    <tr>
      <td><b>All Records</b></td>
      <td><code>findAll(type)</code></td>
      <td><code>peekAll(type)</code></td>
      <td><code>query(type, {query})*</code></td>
    </tr>
  </tbody>
</table>

\* A query usually does not return all the records of a type, so doesn't end in `All`.

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

## Better Caching Defaults for `findAll` and `findRecord`

In Ember Data beta.19 calling `store.find(type, id)` would fetch the
fresh data from the server the first time find was called, and then every time after that
return cached data. If the user always needed fresh data, they had to
know to call `store.fetchRecord`, and if they needed to background update
they would have to make multiple calls and be careful about what they return from
a route's `model:` hook.

Calling `store.find(type)` had the exact opposite behavior, where it would
always go to the server, and the user had to know to use `store.all(type)`
to only use local data. Mimicking the caching behavior of `find(type, id)`
when using `find(type)` was not at all straightforward for new developers to write.

Having observed many Ember apps in the wild, we have realized that neither
of these two behaviors are the most common use case and deserving of being the default. The most commonly desired behavior we have seen in Ember apps is:

- First time `store.find` is called, fetch new data
- Next time return cached data
- Fetch new data in the background and update

This is the behavior of the new `findRecord` and `findAll` methods. 

The first time you call `findRecord` and `findAll` they behave the same as
the old `find` method:

```js
//visiting /users/1 for the first time
model: function() {
  //We do not already have the user, so
  //store.findRecord returns a promise that resolves
  //after it has fetched the user from the server
  return this.store.findRecord('user', 1);
}
```

However if you already have the data cached locally, they resolve immediately
while fetching new data in the background:

```js
//visiting /users/1 for the second time
model: function() {
  //We already have the user, so store.findRecord
  //will resolve immediately with cached data, but will
  //send off a request in the background to update the user record
  //and once the user is updated your template will show the new changes
  return this.store.findRecord('user', 1);
}
```

While this is a great default data retrieval strategy, there are certain cases
where you want to ensure you have the freshest data (the old `store.fetch` behavior).

Because of that, `findRecord` and `findAll` accept `reload: true` an option in order to modify their default behavior.

If, for example you want to charge user for a purchase, and want to make sure you
get their latest account balance, you can pass a `reload: true` option that will
ensure we get the freshest data before continuing:

```js
//visiting /users/1/confirm-payment
model: function() {
  return this.store.findRecord('user', 1, { reload: true });
}
```

All of these behaviors are also shared by `findAll`:

```js
store.findAll('user');  //goes to the server the first time
store.findAll('user');  //after that returns from cache, but updates in background
store.findAll('user', { reload: true });  //enforces getting fresh data
```

#### `fetchById` and `fetchAll` Replaced by `findRecord` and `findAll`

Having these two methods, with customizable flags allows us to get rid of:
`store.fetchById` and `store.fetchAll`.

```js
store.fetchById(type, id) -> store.findRecord(type, id, { reload: true });
store.fetchAll(type, id) -> store.findAll(type, { reload: true });
```

### New Adapter Hooks for Better Caching

While `store.findRecord` and `store.findAll` now have sensible caching defaults
and are easy to override in specific places in the app, oftentimes your app and
adapter layer have specific knowledge related to caching. For example, your backend
might have given you an `expires` header, or you may not want to try fetching background updates if the network is down. To support these use cases, we have added new adapter
hooks to customize caching app wide beyond just passing options to `findRecord` and `findAll`.

Now, whenever you call `findRecord` or `findAll`, and the record is already cached in the store, the store will ask the adapter whether it needs to immediately reload it, or if it needs to update it in the background.

For example, if you are building an events ticketing system, in which users can only reserve tickets for 20 minutes at a time, and want to ensure that in each route you have data that is no more than 20 minutes old you could write:

```js
shouldReloadRecord: function(store, ticketSnapshot) {
  let timeDiff = moment().diff(ticketSnapshot.attr('lastAccessedAt')).minutes();
  if (timeDiff > 20) {
    return true;
  } else {
    return false;
  }
},
```

This method would ensure that whenever you do `findRecord('ticket')` you will
always get a ticket that is no more than 20 minutes old. In case the cached
version is more than 20 minutes old, `findRecord` will not resolve until you fetched
the latest version. By default this hook returns false, as most UIs should not block
user interactions while waiting on data update.

You can also customize whether you should try and do a background update. For example, if you do not want to fetch complex data over a mobile connection, or
if the network is down, you can implement `shouldBackgroundReloadRecord`

```js
shouldBackgroundReloadRecord: function(store, snapshot) {
  if (window.navigator.connection === 'cellular' ||
  	window.navigator.connection === 'none') {
  	return false;
  } else {
    return true;
  }
}
```

`Adapter#shouldBackgroundReloadRecord` is called by the store when the
store is resolving the `findRecord` promise with a cached record. If
this method returns `true` the store will attempt to reload the record
from the adapter in the background. The default implementation for
this method in Ember Data 1.13 is to always return `false`, in order
to ease the upgrade path. However in
Ember Data 2.0 this will be changed to always return `true`.

Symmetric methods have also been added for `store.findAll`.

```js
shouldReloadAll: function(store, snapshotRecordArray)
shouldBackgroundReloadAll: function(store, snapshotRecordArray)
```

[@eccegordo](https://github.com/eccegordo) put together this table
listing all the new store apis and the methods they replace.

<table>
  <thead>
    <tr>
      <th>Ember beta.19</th>
      <th>Ember 1.13</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>store.getById(type, id)</code></td>
      <td><code>store.peekRecord(type, id)</code></td>
    </tr>
    <tr>
      <td><code>store.all(type)</code></td>
      <td><code>store.peekAll(type)</code></td>
    </tr>
    <tr>
      <td><code>store.find(type, id)</code></td>
      <td><code>store.findRecord(type, id, options)</code></td>
    </tr>
    <tr>
      <td><code>store.find(type)</code></td>
      <td><code>store.findAll(type, options)</code></td>
    </tr>
    <tr>
      <td>N/A</td>
      <td><code>store.queryRecord(type, query)</code></td>
    </tr>
    <tr>
      <td><code>store.find(type, { query })</code></td>
      <td><code>store.query(type, query)</code></td>
    </tr>
    <tr>
      <td><code>store.fetch(type, id)</code></td>
      <td><code>store.findRecord(type, id, {reload: true})</code></td>
    </tr>
  </tbody>
</table>

## JSON API Support

### JSON API Adapter and Serializer

Ember Data 1.13 comes with support for [JSON API](http://jsonapi.org/)
1.0. There is a new `DS.JSONAPIAdapter` and `DS.JSONAPISerializer`
that support working with JSON API backends. In Ember Data 2.0 the
JSON API Adapter will be the default loaded by Ember Data.

### Internal Format Change to JSON API

In Ember Data beta.19, you communicated updates to the store by calling
`store.push(type, id)`. We have now changed `store.push` so it receives a 
JSON API object, `store.push({JSON API compound document})` 

For example

```js
store.push('user', { id: 1, name: 'Pangratz' });
```

becomes

```js
store.push({
  data: {
    id: '1', 
    type: 'user', 
    attributes: { 
      name: 'Pangratz' 
    }
  }
});
```

This allows for much better and fine grained meta handling, and ensures we do
not have to support, maintain and document a completely custom JSON format
as we had to until now, but can just reference the [JSON API specification](http://jsonapi.org/).

We will be publishing an [ember-watson](https://github.com/abuiles/ember-watson) helper that will be rewriting all the uses
of `store.push` inside your tests to the new format, as well as addon with helpers
that convert the old `store.push` format into the new format.

### New Serializer API for custom Serializer authors

If you made a `store.findRecord('user', 1)` request in Ember Data beta.19
and your server payload looked like:

```js
{
  user: { id: 1, name: 'wecc', accounts: [1, 2] },
  accounts: [
    { id: 1, email: 'wecc@sweden.se' },
    { id: 2, email: 'wecc@greece.gr' }
  ]
}
```

Your serializer would get the payload passed in an `extract` hook and its job was to:
 
- normalize and `store.push` everything that is not the `primary record`, in this
	case the array of sideloaded accounts
- normalize and return the primary data, in this case the `user` data

Having these two ways of pushing data to the store, with both returning primary record data
from `extract` hooks but also doing `store.push` with other data was both confusing,
hard to debug and optimize and also prevented us from implementing proper metadata support, especially for sideloaded arrays and records.

In Ember Data 1.13 this process has been greatly simplified. **In 1.13 Serializers
should just make the whole payload conform to the JSON API spec, and return the whole payload**. They should no longer `store.push` themselves.

In order to be backwards compatible, we created a new hook `normalizeResponse` which
Serializers should now implement, and just return JSON API from that hook.

For example a Serializer responsible for normalizing the above sample payload would just transform it to:

```js
{
  data: { 
    id: '1', 
    type: 'user', 
    attributes: {
      name: 'wecc'
    }, 
    relationships: {
      accounts: {
        data: [
          { id: '1', type: 'account' },
          { id: '2', type: 'account' }
        ]
      }
    }
  },
  included: [{ 
    id: '1',
    type: 'account',
    attributes: {
      email: 'wecc@sweden.se'
    }
  }, {
    id: '2',
    type: 'account',
    attributes: {
      email: 'wecc@greece.gr'
    }
  }]
}
```

We will be posting a detailed Serializer transition guide shortly.

### New JSONSerializer and RESTSerializer API

As we rewrote JSONSerializer and RESTSerializer to implement the new
Serializer API we also simplified and greatly improved their own APIs.
Previously the possible places to modify a response for `store.find('user', 1)` were

- `extract`
- `extractFind`
- `extractSingle`
- `normalizePayload`
- `normalizeHash`
- `normalize`
- `extractMeta`
- `normalizeRelationships`
- `normalizeAttributes`

The new Serializer API allowed us to simplify these. If you receive a response 
to `store.findRecord('user', 1)` in Ember Data 1.13 you can customize your response
in

- `normalizeResponse` - entry method to the Serializer and responsible for normalizing any response, gets the full payload, returns a JSON API compound document
- `normalizeFindRecordResponse` - a normalizeResponse for a specific operation
- `normalize` - normalizes data for a single record, returns a JSON API compound document
    - `extractId` | `extractAttributes` | `extractRelationships` - normalize delegates to these methods to extract the id, attributes and relationships from the payload. They receive the full payload for a single record and return the subsets of data for id, attributes and relationships, conforming to the JSON API specification.
- extractMeta - extracts the metadata for a payload

#### Transition to the new JSONSerializer and RESTSerializer APIs

If you have a custom serializer you will need to make some new changes
to your serializer to get it ready for Ember Data 2.0.

##### Custom `extract` Methods

If you have custom `extract` hooks you need to do two things:

First, rename:

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

Second, make sure that your `extract` hooks return a full JSON API compound document
([http://jsonapi.org/format/#document-top-level](http://jsonapi.org/format/#document-top-level)) with the primary
resource(s) in a `data` array or object and eventual sideloaded
resources in a `included` array. Every resource object
([http://jsonapi.org/format/#document-resource-objects](http://jsonapi.org/format/#document-resource-objects)) has to
follow the JSON API format with `id`, `type`, attributes in
`attributes` and relationships in `relationships`. For the full
specification of the JSON API format see
[http://jsonapi.org/format/](http://jsonapi.org/format/).

##### Custom `extractMeta` Method

If you have a custom `extractMeta` method you have to make sure it
returns the meta data instead of calling `store.setMetadataFor()` (or
relying on `_super` to do so).

##### Custom `normalize` Method

If you have a custom `normalize()` method you need to update this to
return a full JSON API Document
([http://jsonapi.org/format/#document-top-level](http://jsonapi.org/format/#document-top-level)) with the primary
resource object
([http://jsonapi.org/format/#document-resource-objects](http://jsonapi.org/format/#document-resource-objects)) located in
`data`.

##### Opt Into the New Serializer API

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
[community JSON API adapter](https://github.com/kurko/ember-json-api).

## New Errors API

Similarly to the find APIs, our error handling APIs have grown over time,
and the switch to JSON API has given us a great opportunity for cleanup
and standardisation. [@tchak](https://twitter.com/tchak13) has done a great job rewriting our
Errors API to be JSON API compatible, while keeping backwards support for
REST/JSON/ActiveModel adapters. There are two main changes in Ember Data 1.13
error handling:

- Cleaner adapter hooks for errors
- Using JSON API Error object format

###Cleaner adapter hooks for errors

Previously, if you were subclassing the `RestAdapter` you could overwrite
`ajaxSuccess` and `ajaxError` hooks to implement custom error handling.
However, potential errors come in many flavors. For example, you could be receiving responses with a status code of `200` with the body of `{ error: error }`. In this case it was not intuitive to write error handling code in a method called `ajaxSuccess`. Because of this and many other examples, we realized that `ajaxSuccess` and `ajaxError` were not the
correct level at which to implement error handling.

 In Ember Data 1.13 we are introducing a new, simpler adapter hook:
`handleResponse` while deprecating `ajaxSuccess` and
`ajaxError`. 

The responsibility of `handleResponse` is to take the returned status,
response headers and payload, and decide whether to pass the payload through as
a success, or to return an instance of `AdapterError` or `InvalidError`.

For example, if your API engineers for some unknown reason decided to return
`200 OK` with an error message, you could subclass your adapter to handle this:

```js
handleResponse: function(status, headers, payload) {
  if (status === 200 && payload.errors) {
    return new InvalidError(payload.errors);
  }
  return this._super(...arguments);
}
```

You could also subclass two helper methods, `isInvalid` and `isSuccess`
to customize when you adapter considers a request succesful or invalid.

Default implementation of `isInvalid` returns
true if http status code is `422`, however, you may desire other
semantics, for example checking the `code` property on a JSON API
error object.

This refactor also allows us to abstract away the jQuery `jqXHR` object, which
was tying Ember Data's Rest Adapter too closely with jQuery's implementation of ajax. New hooks take three arguments instead of `jqXHR`: status code, a hash of
response headers and parsed payload. It makes them agnostic about the
underlying implementation and will allow us to easily use methods like
[fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en)
in the future.

###Using JSON API Error object format
Similarly to the rest of Ember Data 1.13, we have refactored the error handling to use JSON API. JSON API has specified an
[error objects](http://jsonapi.org/format/#error-objects)
format. Starting with Ember Data 1.13 we are using JSON API format to
communicate errors from the adapter to the store. 
We are deprecating the current Ruby on Rails inspired
format for creating `InvalidError` objects and replacing it with
proper JSON API objects. The old format is supported with a
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
    detail: 'is invalid'
  }
]);
```

Thanks to [@tchak](https://github.com/tchak) and
[@twokul](https://github.com/twokul) for working on the design and
implementation of the new API.

## Significant Deprecations

In addition to new features, Ember Data 1.13 introduces deprecations for
features and behavior that will be removed in Ember Data 2.0.

### Async Relationships

In Ember Data 2.0 relationships will be asynchronous by default. Sync
relationships will still be supported but you will need to manually
opt into them by setting `{ async: false }` on your
relationships. Ember Data 1.13 will log a deprecation warning you if
you have any relationships where the `async` property is not
explicitly set. Additionally you can use
[ember-watson](https://github.com/abuiles/ember-watson) to help
identify cases in your codebase where you have relationships without
an explicit `async` property.

### DS.Store#filter Moved to an Addon

With Ember Data 2.0 and the commitment to semver we found we were not
happy with the state of the current `store.filter()` method. It
currently only supports a limited number of uses cases and often is a
source of memory leaks in long running applications. In order to give
Ember Data time to iterate on a better filter API the current
`store.filter` method has been deprecated and its functionality is
being moved into an addon
[https://github.com/ember-data/ember-data-filter/](https://github.com/ember-data/ember-data-filter).

In Ember 2.0, if you would like to use the current `store.filter`
method you will need to include the ember-data-filter addon with your
application.

### DS.ActiveModelAdapter Moved to an Addon

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

### `store.push` Changes

Previously, Ember Data allowed users to add a record to the store
using `store.push('model-name', {})`. This format has been deprecated
and now `store.push` will take a JSON API document as its first and
only argument. This new change will allow Ember Data to get better
performance in Ember Data 2.0 by deferring the creation of DS.Model
instances until they are needed by user code. `store.pushMany` has
also been deprecated because you can push multiple records using in a
JSON API document.

### `rollback` Renamed to `rollbackAttributes`

`record.rollback()` has been deprecated to
`record.rollbackAttributes()`. This new name more closely matches its
behavior and will allow for a new `record.rollback()` to be introduced
in the future that rolls back relationships in addition to attributes.

### `isDirty` Renamed to `hasDirtyAttributes`

`record.isDirty()` has been deprecated to
`record.hasDirtyAttributes()`. This new name more closely matches its
behavior and will allow for a new `record.hasDirtyRelationships()` to be introduced
in the future that allows you to check dirtiness of relationships.

### Preloading Record Data on Find

If you previously used the preload argument to `store.find` it has
been moved into the preload key on `findRecord`'s options argument

```js
// Deprecated
store.find('comment', 1, { post: 1 });

// Ember Data 1.13 style
store.findRecord('comment', 1, { preload: { post: 1 }});
```

## Changelog

[Ember Data 1.13](https://github.com/emberjs/data/blob/3bce36295a6e9f1bbe4824505046d22dc04d056d/CHANGELOG.md#release-113-june-16-2015)
