---
title: Ember Data v1.13 Released
author: Igor Terzic and the Ember Data Team
tags: Recent Posts, Releases
---

We are proud to announce the release of Ember Data 1.13. This
represents the first stable release of Ember Data since its creation
over 3 years ago. 

As we explained in the [THE EMBER 2.X PROJECT](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
blog post, going forward Ember Data will be syncing up it's releases and version numbers with Ember.js releases. 

**Ember Data 1.13 is the first release of Ember Data that syncs its
  version with a version of Ember.js.** It will be followed by Ember Data 2.0, which will be released alongside Ember.js 2.0 **Ember Data 1.13 is fully backwards compatible with Ember Data beta.19, allowing for a smooth upgrade path**

###Ember Data 1.13 overview

Ember Data 1.13 is a massive release we are very proud of.
The highlight of the Ember Data 1.13 release is a total overhaul of Ember Data's internal data format and Serializer to follow JSON API. 

Two years ago Tom Dale and Yehuda Katz [published](http://emberjs.com/blog/2013/05/03/ember-data-progress-update.html) a vision for how Ember Data should look in the future and articulated the need for a single, ubuqituous JSON API standard.

We are very happy to see the vision for a single, ubuqituous JSON API standard come to life in the form of the [JSON API 1.0 release](jsonapi.org).

JSON API and Ember Data have been interwined since JSON API's inception
@DanGebhart gives the origins of JSON API in his 1.0 announcment:
> Yehuda Katz wrote the first draft of the JSON API specification in May 2013 after hammering out the details in a long discussion with Steve Klabnik at RailsConf. JSON API began as a codification of the shared expectations of a single server library for Rails, ActiveModel::Serializers, and a single JavaScript client library, Ember Data

While Ember Data has supported JSON API since one of early versions of JSON API through a community [adapter](https://github.com/kurko/ember-json-api) started by 
@daliwali and maintained by @kurko, now that JSON API has reached 1.0 it is time for Ember Data to uphold it's part of the bargain and make using JSON API a first class experience in Ember Data. 

We have done exactly that, and Ember Data 1.13 adds support throughout the ED stack for JSON Api:

- **Ember Data 1.13 ships with a fully supported JSONApiAdapter and Serializer.** In 2.0, these will become the default Adapter and Serializer
- **`JSONSerializer` and `RestSerializer` have been refactored and streamlined to return JSON API payloads**
- **`store.push` now accepts JSON API compliant payload**

Switching to the JSON API format unlocks many new features which will be added in the 2.0 cycle, including better first class pagination, filtering and metadata support.

While **using JSONSerializer, RESTSerializer and ActiveModelSerializer is not deprecated**, we consider JSON API to be the happiest of the happy paths for using Ember Data, and if you are creating a new app today and have control over the API you should be using JSON API, because it is a well designed and comprehensive solution for JSON serialization.

Other major changes in Ember Data 1.13 include:

- [Refactored and simplified Find methods](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_simplified-find-methods)
- [Adapter level control for identity map caching](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_new-adapter-hooks-for-better-caching)
- [Refactored and simplified Serializer APIs]()
- [Switch to using JSONAPI as the internal data storage format](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_new-serializer-api)
- [Native JSONAPI Serializer](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_json-api-support)
- [Better Errors handling](http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_new-errors-api)



##Upgrade guide

Ember Data 1.13 is backwards compatible with the beta cycle ED, and there are no
breaking changes between Ember Data 1.13 and Ember Data beta.19. Ember Data follows Ember.js's lead in not removing any features in this release. The upgrade path should be familiar to Ember.js users, upgrade, remove deprecations, upgrade again.

**You should update your codebase to Ember Data 1.13, remove all the deprecations
and then move to Ember Data 2.0. It is critically important to do this process stepwise**, as it will give you easy to follow deprecation warnings, and otherwise
your app might fail in hard to debug ways.

If you have customized your serializer, you should upgrade to Ember Data 1.13, 
check the upgrade guide to see if you need to make any changes, and then set a
temporary flag on your Serializer: `isNewSerializerApi`. This will opt you into
the new serializer api. Once you are on the Ember Data 2.0 train, new serializer Api
is the defualt one, and there is no need for a flag.

We will be publishing a detailed step by step upgrade guide alongs with Ember.js
deprecations guides and Ember-Watson helpers that will automatically upgrade some
of the deprecations for you.


##Release logistics

**Ember Data 1.13 is the last release of Ember Data that supports IE8
  and the 1.x series of Ember.js. Ember Data 2.0beta.1 will be released shortly, and it will follow the Ember.js release train.** Ember Data 2.0 will not work with Ember.js 1.x series.
  

We would like to extend a special thanks to the many contributors who
have helped out with this release. We would also like to recognize the
following contributors who helped with multiple issues leading up to
this release. If you would like to help, please joing #dev-ember-data room in the 
Ember.js community Slack room

- [@turbo87](https://github.com/turbo87)
- [@erickelly](https://github.com/erickelly)
- [@pangratz](https://github.com/pangratz)
- [@sly7-7](https://github.com/sly7-7)
- [@yratanov](https://github.com/yratanov)
- [@tchak](https://github.com/tchak)
- [@thaume](https://github.com/thaume)
- [@mikehollis](https://github.com/mikehollis)
- [@tricknotes](https://github.com/tricknotes)


As always this release can be obtained from npm (for
use with ember-cli), rubygems, or bower. The builds are also available
as static files at [http://emberjs.com/builds]().


## New Features:

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
deprecated and are replaced with conistently named methods. New methods follow a simple convention: If they are async and potentially go to the server, they start with `find`, and if they only get store local data wihout sideeffects they start with `peek`.
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

\* A query usually does not return all the records of a type, so doesn't end in `All` 

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



## Better caching defaults for `findAll` and `findRecord`

In Ember Data beta.19 calling `store.find(type, id)` would fetch the
fresh data from the server the first time find was called, and then every next time
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
where you want to ensure you have  the freshest data (the old `store.fetch` behavior) or you do not want a background update to happen (the old `store.find(type, id)` behavior). 

Because of that, `findRecord` and `findAll` accept `reload: true` and `backgroundReload: false` as options in order to modify their default behavior.

If, for example you want to charge user for a purchase, and want to make sure you
get their latest account balance, you can pass a `reload: true` option that will
ensure we get the freshest data before continuing:

```js
//visiting /users/1/confirm-payment
model: function() {
  store.findRecord('user', 1, { reload: true });
}
```			

For example if you are showing the user a settings modal and want to opt out from
background updates in order to keep the UI stable you can pass `backgroundReload: false` as a flag:

```js
//visiting /users/1/open-modal
model: function() {
  store.findRecord('user', 1, { backgroundReload: false });
}
```			


All of these behaviors are also shared by `findAll` ->
```js
store.findAll('user');  //goes to the server the first time
store.findAll('user');  //after that returns from cache, but updates in background
store.findAll('user', { reload: true });  //enforces getting fresh data
store.findAll('user', { backgroundReload: false });  //opts out of background updating
```

#### `fetchById` and `fetchAll` replaced by `findRecord` and `findAll`

Having these two methods, with customizable flags allows us to get rid of:
`store.fetchById` and `store.fetchAll`.

```js
store.fetchById(type, id) -> store.findRecord(type, id, { reload: true });
store.fetchAll(type, id) -> store.findAll(type, { reload: true });
```


### New adapter hooks for better caching

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
listing all the new store apis and the methods they repalce.


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
  </tbody>
</table>



## JSON API Support

### JSON API Adapter and Serializer

Ember Data 1.13 comes with support for [JSON-API](http://jsonapi.org/)
1.0. There is a new `DS.JSONAPIAdapter` and `DS.JSONAPISerializer`
that support working with JSON-API backends. In Ember Data 2.0 the
JSON-API adapter and serializer will be the default adapter loaded by
Ember Data.


### Internal Format Change to JSON API

In Ember Data beta.19, you communicated updates to the store by calling
`store.push(type, id)`. We have now changed `store.push` so it receives a 
JSON API object, `store.push({JSON API compound document})` 

For example
```js
store.push('user', { id:1, name: 'Pangratz' })
```

becomes

```js
store.push({ data: {
  id:1, 
  type: 'user', 
  attributes: { 
    name: 'Pangratz' 
  }
}})
```

This allows for much better and fine grained meta handling, and ensures we do
not have to support, maintain and document a completely custom JSON format
as we had to until now, but can just reference the [JSON API spec](http://jsonapi.org/)

We will be publishing an Ember Watson helper that will be rewriting all the uses
of `store.push` inside your tests to the new format, as well as addon with helpers
that convert the old `store.push` format into the new format.


### New Serializer API for custom Serializer authors

If you made a `store.findRecord('user', 1)` request in Ember Data beta.19
and your server payload looked like:

```js
user: { id:1, name: 'Wecc', accounts: [1,2] },
accounts: [ {id:1, email: 'wecc@sweden.com`},
	{id:2, email: 'wecc@greece.co.gr`}]
```
Your serializer would get the payload passed in an `extract` hook and it's job was to:
 
- normalize and `store.push` everything that is not the `primary record`, in this
	case the array of sideloaded accounts
- normalize and return the primary data, in this case the `user` data

Having these two ways of pushing data to the store, with both returning primary record data
from `extract` hooks but also doing `store.push` with other data was both confusing,
hard to debug and optimize and also prevented us from implementing proper metadata support, especialy for sidelaoded arrays and records.

In Ember Data 1.13 this process has been greatly simplified. **In 1.13 Serializers
should just make the whole payload conform to the JSON API spec, and return the whole payload** They should no longer `store.push` themselves.

In order to be backwards compatible, we created a new hook `normalizeResponse` which
Serializers should now implement, and just return JSON API form that hook.

For example a Serializer responsible for normalizing the above sample payload would just transform it to:

```js
data: { 
	id:1, 
	type: 'user', 
	attributes: { name: 'Wecc' }, 
	relationships: { accounts: { data: [1, 2] } }
},
included: [{ 
	id:1,
	type: 'account',
	email: 'wecc@sweden.com'
}, {
	id:2,
	type: 'account',
	email: 'wecc@ greece.co.gr'
}]
```

We will be posting a detailed Serializer transition guide shortly.

### New JSONSerializer and RESTSerializer API

As we rewrote JSONSerializer and RestSerializer to implement the new
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

- `normalizeResponse` - entry method to the Serializer and responsible for normalizing any response, gets the full payload returns JSONAPI compound document
- `normalizeFindRecordResponse` - a normalizeResponse for a specific operation
- `normalize` - normalizes data for a single record, returns JSONAPI compound document
    - `extractId` | `extractAttributes` | `extractRelationships` - normalize delegates to these methods to extract the id, attributes and relationships from the payload. They receive the full payload, and return the subsets of data for id, attributes and relationships, conforming to the JSON API spec
- extractMeta - extracts the metadata for a payload

   

#### Transition to the new JSONSerializer and RESTSerializer APIs

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


## New Errors API

Error handling and validations is an important part of any ambitious
application. Ember-Data had a support for what we called invalid
errors from the very beginning. Invalid errors are a type of errors
that can be corrected by the user, means a "correct and retry" cycle
is encouraged for this type of errors. But there a other type of
errors that can occur in the adapter. A network can be down or you can
reach the quota on your `localStorage`. We wanted to provide some
better semantics to users  on how to handle this type of
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

### isDirty renamed to hasDirtyAttributes

`record.rollback()` has been deprecated to
`record.rollbackAttributes()`. This new name more closely matches its
behavior and will allow for a new `record.rollback()` to be introduced
in the future that rolls back relationships in addition to attributes.

### Preloading record data on find


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
