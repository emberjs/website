---
title: Ember 3.6 Released
author: Melanie Sumner, Kenneth Larsen, Chris Garrett
tags: Releases, 2018, 3, 3.6
responsive: true
---

Today the Ember project is releasing version 3.6 of Ember.js, Ember Data, and Ember CLI. Highlights include public API support for ES6 classes and two new RouterService methods.

This release kicks off the 3.7 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.6
Ember.js 3.6 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There are 2 new features, 6 deprecations, and 13 bugfixes in this version.

#### New Features (2)

**Native Classes (1 of 2)**

The [ES Class](https://emberjs.github.io/rfcs/0240-es-classes.html) and [Native Class Constructor Update](https://emberjs.github.io/rfcs/0337-native-class-constructor-update.html) RFCs officially ship in 3.6! This feature means that usage of native classes has stabilized, and they are considered public API whose behavior will not change.

**Great, so I can use `class` syntax now?!**
Hold your horses! It's not _quite_ that simple yet.

The behavior of native classes is stable, but currently Ember does not support or recommend the usage of class fields or decorators, which are both still undergoing the TC39 process. TC39 (Technical Committee number 39) is a part of ECMA, the institution which standardizes the JavaScript language under the “ECMAScript” specification. Subsequent RFCs will have to be made to make these officially part of Ember.

<!--alex ignore hook-->
Without decorators or class fields, the benefits of class syntax are generally not worth the costs. Simple behaviors and features that we rely on day-to-day in Ember, such as service injections, computed properties, and actions, all require decorators. Even if you don't need any of these values, without class fields any class properties must be assigned in the `init` hook instead, and this would make it even _more_ difficult to update later on when class fields and decorators have shipped.

With this in mind, the official Ember recommendation is to continue using the standard `EmberObject.extend()` syntax for defining your factories if you are not risk tolerant. The guides will continue to use this syntax for the time being as well.

**So what's the point then?**

Stabilizing the behavior of classes gives early adopters an API to build on. For users who are more risk tolerant and want to be early adopters, community projects such as [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript) and [ember-decorators](https://github.com/ember-decorators/ember-decorators) are providing the transforms and decorators necessary to use class syntax today, and are dedicated to remaining stable and providing an update path through any changes that occur in TC39 as the proposals are finalized.

Early adopters have been helping tremendously to sort out the details here and make sure that the day the proposals advance, we are ready to land official support for them in Ember directly. Early adoption _does_ come with risks, so if you are considering it, be prepared to have to make changes in the future.

For users who aren't ready to adopt, that's OK - the EmberObject model will continue to be supported for some time to come. In addition, work is progressing on a [codemod](https://github.com/scalvert/ember-es6-class-codemod) which will transform the old class model to the new one seamlessly, making the transition easy from day one.

**Usage Notes**

There are a few notable changes and features for native classes:

* `new` syntax is not currently supported with classes that extend from `EmberObject`. You must continue to use the `create` method when making new instances of classes, even if they are defined using native class syntax. If you want to use `new` syntax, consider creating classes which do _not_ extend from `EmberObject`. Ember features, such as computed properties and decorators, will still work with base-less classes.
* Instead of using `this._super()`, you must use standard `super` syntax. See the [MDN docs on classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Super_class_calls_with_super) for more details.
* Native classes support using [constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor) to set up newly-created instances. Ember uses these to, among other things, support features that need to retrieve other entities by name, like Service injection and `getOwner`. To ensure your custom instance setup logic takes place after this important work is done, avoid using the `constructor` in favor of `init`.
* Using native classes, and switching back to the old Ember Object model is fully supported.
* For early adopters who are used to argument values and values passed to `create` being overriden, this is no longer the case! Class field values will be the default, and any value passed to a class on creation will override that value.

**Compatibility and Polyfill**

A polyfill for this behavior has been built which backports this behavior to both Ember 3.4 and 3.5. You can see it [here](https://github.com/pzuraq/ember-native-class-polyfill), or install it using ember-cli:

```sh
ember install ember-native-class-polyfill
```

We would like to add support for prior LTS versions (2.18 and 2.16) as well, so if you would like to contribute, ping us in the #st-native-classes channel on Discord or in the [Native Class Quest issue](https://github.com/emberjs/ember.js/issues/16927) on Github!

**Final stage of the router service RFC (2 of 2)**

<!--alex ignore rejects -->
Ember 3.6 introduces the final stages of the router service RFC. The includes two new methods: [`recognize(url)`](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md#new-method-url-recognition) that can return a `RouteInfo` based on the URL you pass and [`recognizeAndLoad(url)`](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md#new-method-recognize-and-load-models) that takes a string URL and returns a promise that resolves to a `RouteInfoWithAttributes` for the leaf-most route represented by the URL. The promise rejects if the URL is not recognized or an unhandled exception is encountered.

This final stage also introduces the new observable property `currentRoute`. It is guaranteed to change whenever a route transition happens (even when that transition only changes parameters and doesn't change the active route). You should consider its value deeply immutable -- we will replace the whole structure whenever it changes. The value of `currentRoute` is a `RouteInfo` representing the current leaf route.

Wrapping up this final stage we introduce two new events to the router service: `routeWillChange` and `routeDidChange`. They both receive a single `transition` argument which has been expanded to now include `to` and `from` properties. This allows you to understand where the transition is and where it is going. To see some examples of this be sure to read the [events section](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md#new-events-routewillchange--routedidchange) of the RFC.
Be sure to have a look at the [RFC itself](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md) for more info in the router service.

#### Deprecations (6)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

For more details on changes in Ember.js 3.6, please review the [Ember.js 3.6 release page](https://github.com/emberjs/ember.js/releases/tag/v3.6.0).

**new EmberObject (1 of 6)**

We are deprecating usage of `new EmberObject()` to construct instances of `EmberObject` and it's subclasses. This affects all classes that extend from `EmberObject` as well, including user defined classes and Ember classes such as:

* `Component`
* `Controller`
* `Service`
* `Route`
* `Model`

Instead, you should use `EmberObject.create()` to create new instances of classes that extend from `EmberObject`. If you are using native class syntax instead of `EmberObject.extend()` to define your classes, you can also refactor to _not_ extend from `EmberObject`, and continue to use `new` syntax.

To read more about this deprecation and how to refactor your existing code have a look at [the deprecations page](https://www.emberjs.com/deprecations/v3.x/#toc_object-new-constructor).

**Remove All Listeners/Observers (2 of 6)**

When using both the `removeListener` and `removeObserver` methods, users can omit the final string or method argument to trigger an undocumented codepath that will remove _all_ event listeners/observers for the given key. This functionality will be removed since it is uncommonly used, undocumented, and adds a fair amount of complexity to a critical path.

To read more about this deprecation and how to refactor your existing code have a look at [the deprecations page](https://www.emberjs.com/deprecations/v3.x/#toc_events-remove-all-listeners).

**Deprecate Ember.merge (3 of 6)**

Ever since `Ember.assign` was released, `Ember.merge` became mostly unnecessary. To cut down on duplication, we are now recommending using `Ember.assign` instead of `Ember.merge`.

If you need to support Ember <=2.4 you can use [ember-assign-polyfill](https://github.com/shipshapecode/ember-assign-polyfill) to make `Ember.assign` available to you.

To see a code example of switching from `Ember.merge` to `Ember.assign` please refer to the [deprecation app](https://deprecations-app-prod.herokuapp.com/deprecations/v3.x/#toc_ember-polyfills-deprecate-merge).


**HandlerInfos Removal (4 of 6)**

Due to the [router service RFC](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md) it is necessary to rename the private API `HandlerInfo` to `RouteInfo`. 

If you need to access information about the routes you are most likely better served by injecting the router service as it exposes a publically supported version of the `RouteInfo`s.
For help on how to do this please refer to the [deprecation app](https://deprecations-app-prod.herokuapp.com/deprecations/v3.x/#toc_remove-handler-infos).

**Deprecate Router Events (5 of 6)**

Currently, application-wide transition monitoring is spread out throughout the `Route` classes. This does not really belong here but in the `Router` service instead.

<!--alex ignore hooks-->
That is the reason for the existing `willTransition` and `didTransition` hooks/events on the Router. But they are not sufficient to capture all the detail people need.

In addition, they receive `handlerInfos` in their arguments, which are an undocumented internal implementation detail of router.js that doesn't belong in Ember's public API. Everything you can do with handlerInfos can be done with the `RouteInfo`.

For examples on how to transition both the `Route` and `Router` usages of `willTransition` and `didTransition`, please refer to the [deprecation app](https://deprecations-app-prod.herokuapp.com/deprecations/v3.x/#toc_deprecate-router-events).

**Transition State Removal (6 of 6)**

The `Transition` object is a public interface that actually exposed internal state used by router.js to perform routing.

Accessing `state`, `queryParams` or `params` on the `Transition` has been removed. If you need access to information about the routes, you are probably better served injecting the router service as it exposes a publically supported version of the `RouteInfo`s.

For information on how to do this please refer to the [deprecation app](https://deprecations-app-prod.herokuapp.com/deprecations/v3.x/#toc_transition-state).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.6

#### New Features (0)

No new features introduced in Ember Data 3.6.

#### Deprecations (0)

No new deprecations introduced in Ember Data 3.6.


For more details on changes in Ember Data 3.6, please review the
[Ember Data 3.6 release page](https://github.com/emberjs/data/releases/tag/v3.6).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data! To upgrade your projects using `yarn` run:

```bash
yarn upgrade ember-cli
```

To upgrade your projects using `npm` run:

```bash
npm install --save-dev ember-cli
```

After running the upgrade command, make sure to install (if you haven't already) ember-cli-update globally:

```bash
npm install -g ember-cli-update
```

This utility will help you to update your app or add-on to the latest Ember CLI version. You will probably encounter merge conflicts, in which the default behavior is to let you resolve conflicts on your own.

### Changes in Ember CLI 3.6

#### New Features (1)
**Prevent double builds in CI (1 of 1)**
Until version 3.6 the addon author (unless the addon was in an org) would always end up with two CI builds for every PR. One for the branch push and one for the PR update. This is now fixed in Ember CLI 3.6 (for TravisCI users).

#### Deprecations (0)
There's no deprecations in this version.

---

For more details on the changes in Ember CLI 3.6 and detailed upgrade
instructions, please review the [Ember CLI 3.6.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.6.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
