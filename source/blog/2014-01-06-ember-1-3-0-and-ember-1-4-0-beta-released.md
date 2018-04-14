---
title: Ember 1.3.0 and 1.4 Beta Released
author: Robert Jackson
tags: Releases, 2014, 1, 1.3, 1.4
responsive: true
---

We are pleased to announce that both Ember.js 1.3.0 and the first beta in the 1.4 series
have just been released. This comes as the third cycle of our six-week release
process that began just after 1.0 was released.

### New in 1.3

#### Non-array Dependencies for ReduceComputed

Generally, using `reduceComputed` is all about efficiently computing the resulting value, but
occasionally you might need to recompute every time. It is now possible to instruct
`reduceComputed` to completely recompute when an item is added/removed (instead of calling
the `addedItem` and `removedItem` callbacks).

This is done by using either non-array dependent keys or adding `.[]` to an array dependency.

Take a look at the following example:

```javascript
Ember.Object.extend({
  // When `string` is changed, `computed` is completely recomputed.
  string: 'a string',

  // When an item is added to `array`, `addedItem` is called.
  array: [],

  // When an item is added to `anotherArray`, `computed` is completely
  // recomputed.
  anotherArray: [],

  computed: Ember.reduceComputed('string', 'array', 'anotherArray.[]', {
    addedItem: addedItemCallback,
    removedItem: removedItemCallback
  })
});
```

#### Testing

Testability of Ember applications is an ongoing priority, and the 1.3 release
contains a number of updates that result in a dramatic improvement.

##### Custom `wait()` Hooks

You can now specify custom hooks to notify the asynchronous test helpers when all
async actions have completed. Under Ember 1.2 if you need to wait for an IndexDB
action, the default `wait` implementation would not wait until that
action finished. Now you can simply register your own hook that will instruct wait
that it is truly time to continue.

For example:

```javascript
Ember.Test.registerWaiter(function() {
  return hasPendingTransactions() == 0;
});
```

This instructs the `wait` helper that the async actions are not finished until
`hasPendingTransactions` is zero.

You can find more details [here](https://github.com/emberjs/ember.js/pull/3433).

##### Lazy Routing

Under Ember.js 1.2 routing is started as soon as you boot your application and *before*
you call `visit`. This results in duplicate routing which slows down your tests and also
potentially causes your tests to be less isolated.

Under Ember.js 1.3 routing isn't started until you call `visit` for the first time. This
provides a couple of improvements to the way you test:

* You do not need to call `App.advanceReadiness()` in your test setup since the application
  is automatically in a deferred state until calling `visit`.
* `App.reset()` now leaves the application in the same state as `App.setupForTesting()` (a
  deferred state).

You can find more details [here](https://github.com/emberjs/ember.js/pull/3695).

##### Stubbable `controllers` Property

Prior to Ember 1.3 you could not easily stub out any dependencies specified with `needs`.
Now you can unit test controllers and stub their dependencies all within
`TheControllerClass.create()` instead of having to use a container, register stubbed
dependencies, and instantiate the controller via `container.lookup()`.

Simplified example:

```javascript
var BrotherController = Ember.Controller.extend({
  needs: 'sister',
  foo: Ember.computed.alias('controllers.sister.foo')
});

var broController = BrotherController.create({
  controllers: {
    sister: { foo: 5 }
  }
});

equal(broController.get('foo'), 5, "`needs` dependencies can be stubbed");
```

Previously, specifying `controllers` to `BrotherController` would have resulted in an error,
and now under Ember.js 1.3 this works as expected.

#### Promise Improvements

Ember.js 1.3 has updated to `RSVP` 3.0.3 which brings considerable performance improvements, a number
of new features, and significantly improved documentation coverage.

`RSVP` has added a number of features that allow external tooling to be able to inspect and track the labels, states, and
values of promises. These improvements will be extremely useful when used with the next major
version of the [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi).
Which will allow you to see a tree of promises and inspect their names, state, and fulfilled/rejected values.

`RSVP` added a number of additional methods to `Promise`:

* `Promise.cast` - Coerces the given argument into a promise, or returns the argument if it is
  already a promise.
* `Promise.catch` - `catch` is essentially syntactic sugar for `then(undefined, onRejection)` which
  makes it the same as the `catch` block of a `try`/`catch` statement.
* `Promise.finally` - The callback provided to `Promise.finally` will be invoked regardless of the
  promises fate (both fulfilled and rejected promises). This is essentially similar to native
  `try`/`catch`/`finally` statements.
* `Promise.race` - Will return a new promise which will be settled with the value of
  the first promise that settles. In other words: given an array of promises `Promise.race`
  will return the value from the first argument that settles (like the winner in a "race").

Please review [the documentation](/api/classes/RSVP.html) for more information.

#### Other Improvements

As usual, there are a ton of bug fixes and small improvements in this
release. You can see a list of all the changes in the CHANGELOG:

* [Ember.js 1.3.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.3.0/CHANGELOG.md)
* [Ember.js 1.4.0 beta 1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.4.0-beta.1/CHANGELOG.md)
