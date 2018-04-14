---
title: Ember Data v1.0.0-beta.12 Released
author: Stanley Stuart
tags: Ember Data, 2014, 1, Data
responsive: true
---

## New Core Contributors

Long-time contributors [Brendan McLoughlin][bmac] and [Sylvain Mina][sly7-7]
have been given collaborator status and will help us triage issues, merge pull
requests, and contribute bugfixes and documentation.

## New Features

### store.fetch

When using Ember Data, the most common pattern in the `model` hook is to call
`store.find` for your model:

```javascript
export default var PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  }
});
```

`store.find` will return the instance of the `Post` record if it has already
been fetched in the store. Sometimes, this is not desirable. For example, you
may not know if you have already loaded the post in another request via
sideloading, or you want the most up to date information. You could either
check if the record existed using
[store.hasRecordForId][store-has-record-for-id], or just always call
[reload][model-reload] on your model in the route's `afterModel`hook.

`store.fetch` wraps this common pattern by reloading a record if it exists in
the store, or reloads the record if it doesn't exist:

```javascript
model: function(params){
  return this.store.fetch('post', params.post_id);
}
```

Please give a warm thanks to [Tom Coquereau][thaume] for his [pull
request][store-fetch-pull-request] implementing this feature!

## Bugfixes

### relationship.createRecord() returns the record instead of a promise

Prior to Ember Data v1.0.0-beta.11, the following code would give you direct
access to a record:

```javascript
var post    = store.createRecord('post');
var comment = post.get('comments').createRecord('comment');
```

In beta.11, it returned a Promise, meaning you couldn't call things like
`set/get` on the resulting record. This regression has been fixed in beta.12
thanks to [Sébastien Grosjean][zen-coccoon].

## Breaking Changes

### Internet Explorer 8 Requires Ember 1.8

A bug in Ember 1.7's `Ember.create` method (which is a polyfill for
`Object.create`) combined with a bug in es5-shim's `Object.create` prevent us
from giving Ember Data users a good alternative to use. Internally, Ember Data
uses `Object.create` for efficient caches. Ember 1.8 ships a working
`Object.create` polyfill on `Ember.create` so if you are using Internet
Explorer 8 and Ember Data in production, you should upgrade to Ember 1.8 as
soon as you can.

If you are using browsers that provide `Object.create`, you do not need to do
any additional work here. This includes mobile browsers, evergreen browsers
(Chrome, Opera, Firefox), Safari, and IE9+.

### Ember 1.7 Support Will Be Completely Dropped in Beta.13

Ember Data relies heavily on JavaScript language-level shims (such as the
`Object.create` issue mentioned above) and other useful internals that Ember
provides. Rather than creating our own detection algorithms and more polyfills
for broken code in Ember 1.7, we are deciding to drop 1.7 support in the next
release of Ember Data. We do so in order to not increase the final size of
Ember Data's build. You should upgrade to Ember 1.8 as soon as you can.

### Observing `data` For Changes Has Been Removed

Although `model.get('data')` has been private in Ember Data for a long time, we
have noticed users may subscribe to changes on `data` for any change to the
model's attributes. This means that the following code:

```javascript
var Post = DS.Model.extend({
  doSomethingWhenDataChanges: function(){
    // do the work
  }.property('data')
});
```

**no longer works**. Instead, you should just watch each attribute like you
would with any `Ember.Object`:

```javascript
var Post = DS.Model.extend({
  name: DS.attr(),
  date: DS.attr(),
  doSomethingWhenDataChanges: function(){
    // do the work
  }.property('name', 'date')
});
```

This change fixed some bugs around observers. Thanks to [Christoffer
Persson][wecc] for helping to clean this up and fix some observer bugs around
this!

## Special Thanks

Thanks to [Christoffer Persson][wecc] for helping us implement bugfixes and API
changes, as well as triaging issues.

<!-- Links -->
[store-has-record-for-id]: http://emberjs.com/api/data/classes/DS.Store.html#method_hasRecordForId
[model-reload]: http://emberjs.com/api/data/classes/DS.Model.html#method_reload
[thaume]: https://github.com/thaume
[store-fetch-pull-request]:https://github.com/emberjs/data/pull/2478
[zen-coccoon]: https://github.com/ZenCocoon
[wecc]: https://github.com/wecc
[road-to-1]: http://emberjs.com/blog/2014/03/18/the-road-to-ember-data-1-0.html
[hjdivad]: https://github.com/hjdivad
[igor]: https://github.com/igorT
[stef]: https://github.com/stefanpenner
[pretender]: https://github.com/trek/pretender
[bmac]: https://github.com/bmac
[sly7-7]: https://github.com/sly7-7
