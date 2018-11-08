---
title: Ember VER Released
author: Melanie Sumner, Kenneth Larsen
tags: Releases, 2018, 3, VER
responsive: true
---

Today the Ember project is releasing version VER of Ember.js, Ember Data, and Ember CLI. This release kicks off the 3.6 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js VER
Ember.js VER is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There is COUNT (#) new feature, COUNT (#) deprecations, and COUNT (#) bugfixes in this version.

#### New Features (2)

**Native Classes (1 of 2)**

The [ES Class](https://emberjs.github.io/rfcs/0240-es-classes.html) and [Native Class Constructor Update](https://emberjs.github.io/rfcs/0337-native-class-constructor-update.html) RFCs officially ship in 3.6! This feature means that usage of native classes has stabilized, and they are considered public API whose behavior will not change.

**Great, so I can use `class` syntax now?!**
Hold your horses! It's not _quite_ that simple yet.

The behavior of native classes is stable, but currently Ember does not support or recommend the usage of class fields or decorators, which are both still undergoing the TC39 process. Subsequent RFCs will have to be made to make these officially part of Ember.

<!--alex ignore hook-->
Without decorators or class fields, the benefits of class syntax are generally not worth the costs. Simple behaviors and features that we rely on day-to-day in Ember, such as service injections, computed properties, and actions, all require decorators. Even if you don't need any of these values, without class fields any class properties must be assigned in the `init` hook instead, and this would make it even _more_ difficult to update later on when class fields and decorators have shipped.

With this in mind, the official Ember recommendation is to continue using the standard `EmberObject.extend()` syntax for defining your factories if you are not risk tolerant. The guides will continue to use this syntax for the time being as well.

**So what's the point then?**

Stabilizing the behavior of classes gives early adopters a API to build on. For users who are more risk tolerant and want to be early adopters, projects such as [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript) and [ember-decorators](https://github.com/ember-decorators/ember-decorators) are providing the transforms and decorators necessary to use class syntax today, and are dedicated to remaining stable and providing an update path through any changes that occur in TC39 as the proposals are finalized.

Early adopters have been helping tremendously to sort out the details here and make sure that the day the proposals advance, we are ready to land official support for them in Ember directly. Early adoption _does_ come with risks, so if you are considering it, be prepared to have to make changes in the future.

For users who aren't ready to adopt, that's OK - the EmberObject model will continue to be supported for some time to come. In addition, work is progressing on a [codemod](https://github.com/scalvert/ember-es6-class-codemod) which will transform the old class model to the new one seamlessly, making the transition easy from day one.

**Usage Notes**

There are a few notable changes and features for native classes:

* `new` syntax is not currently supported with classes that extend from `EmberObject`. You must continue to use the `create` method when making new instances of classes, even if they are defined using native class syntax. If you want to use `new` syntax, consider creating classes which do _not_ extend from `EmberObject`. Ember features, such as computed properties and decorators, will still work with base-less classes.
* Instead of using `this._super()`, you should must standard `super` syntax. See the [MDN docs on classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Super_class_calls_with_super) for more details.
* Native classes support using [constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor) to set up newly-created instances. Ember uses these to, among other things, support features that need to retrieve other entities by name, like Service injection and `getOwner`. To ensure your custom instance setup logic takes place after this important work is done, avoid using the `constructor` in favor of `init`.
* Using native classes, and switching back to the old Ember Object model is fully supported.
* For early adopters who are used to argument values and values passed to `create` being overriden, this is no longer the case! Class field values will be the default, and any value passed to a class on creation will override that value.

**Compatibility and Polyfill**

A polyfill for this behavior has been built which backports this behavior to both Ember 3.4 and 3.5. You can see it [here](https://github.com/pzuraq/ember-native-class-polyfill), or install it using ember-cli:

```sh
ember install ember-native-class-polyfill
```

We would like to add support for prior LTS versions (2.18 and 2.16) as well, if you would like to contribute ping us in the #st-native-classes channel on Discord or in the [Native Class Quest issue](https://github.com/emberjs/ember.js/issues/16927) on Github!

Second new feature (2 of 2)


#### Deprecations (6)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

For more details on changes in Ember.js VER, please review the [Ember.js VER.0 release page](https://github.com/emberjs/ember.js/releases/tag/vVER.0).

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

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data VER

#### New Features (0)

No new features introduced in Ember Data VER.

#### Deprecations (0)

No new deprecations introduced in Ember Data VER.


For more details on changes in Ember Data VER, please review the
[Ember Data VER.0 release page](https://github.com/emberjs/data/releases/tag/vVER.0).

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

### Changes in Ember CLI VER

#### New Features (X)


#### Deprecations (X)

---

For more details on the changes in Ember CLI VER and detailed upgrade
instructions, please review the [Ember CLI  VER.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/vVER.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
