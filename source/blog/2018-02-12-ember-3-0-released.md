---
title: Ember 3.0 and 3.1 Beta Released
author: Ricardo Mendes
tags: Releases
---

Today the Ember project is releasing version 3.0.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 3.1 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The
[ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.0

Ember 3.0
introduces no new features. Instead, it removes support for deprecated public APIs,
all of which have been deprecated since at least Ember 2.14 (released July 2017).
Extended support for removed Ember.js APIs will be provided via an
optional addon through Ember 3.4.

Ember 3.0 removes support for Microsoft Internet Explorer 9,
IE 10, and PhantomJS. This includes support for these platforms by Ember.js,
Ember Data, and Ember CLI. For more details about this decision see
[RFC 252](https://github.com/emberjs/rfcs/blob/master/text/0252-browser-support-changes.md)
and the discussion on [RFC PR #252](https://github.com/emberjs/rfcs/pull/252).

You can read more about our detailed transition plans through Ember 3.5
in
[The Road to Ember 3.0](https://www.emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html)
and below.

## API Removals in 3.0

All APIs to be removed in Ember 3.0 are already deprecated today. By removing support for these features we achieve two goals for our major release. First, we make it simpler for Ember to strip code that supports these features if you don’t use them. Second, we make it possible for Ember to remove the code supporting these features entirely, opening the door to refactoring that improves the clarity and simplicity of our implementations.
<hr>

### APIs Removed in Ember.js 3.0

Below we’ve listed some of the most significant API removals in Ember.js 3.0. For an exhaustive list of removals, see the [Ember.js 2.x deprecation guide](/deprecations/v2.x/).

#### Legacy registry and container access.

A large undertaking of the 2.x cycle was to improve Ember’s boot process, enabling features like [Ember Fastboot](https://ember-fastboot.com/) and improving the performance of Ember’s dependency injection system.

In Ember 2.0 there was still no public API for registering dependencies or interacting with the DI container. Instead, you would often see code that referenced the `registry` or `container` properties on application objects or other objects instantiated by the framework. In Ember 3.0 these legacy systems will be removed in favor of APIs on the application object, application instance object, and the “owner” API.

For more details, please see the deprecation guide:

- [Initializer arity](/deprecations/v2.x/#toc_initializer-arity)
- [`Ember.Application#registry` / `Ember.ApplicationInstance#registry`](/deprecations/v2.x/#toc_ember-application-registry-ember-applicationinstance-registry)
- [`Ember.ApplicationInstance#container`](/deprecations/v2.x/#toc_ember-applicationinstance-container)
- [Injected `container` access](/deprecations/v2.x/#toc_injected-container-access)
- [Migrating from `_lookupFactory` to `factoryFor`](/deprecations/v2.x/#toc_migrating-from-_lookupfactory-to-factoryfor)

#### Legacy deprecate API

Ember’s deprecation APIs improved in 2.0. The goal was to provided more information to tools like [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) and the [Ember inspector](https://github.com/emberjs/ember-inspector). All calls to a deprecation API must now include an `id` and `until` parameter. This permits them to be filtered by tooling. In the 3.x series we plan to use this improved data to implement “svelte” builds of Ember, where deprecated but unused code paths in the framework are removed during an application build.

For more details, see the deprecation guide:

- [Function as test in `Ember.deprecate`, `Ember.warn`, `Ember.assert`](/deprecations/v2.x/#toc_function-as-test-in-ember-deprecate-ember-warn-ember-assert)
- [Ember debug function options](/deprecations/v2.x/#toc_ember-debug-function-options)

#### Legacy data binding API

For a long time, Ember has provided two systems for applications to perform data-binding in JavaScript. The first uses computed properties and it is still idiomatic today. For example, you’ll often see `Ember.computed.alias` in application code. This system remains without any deprecation.

The second system uses the `Ember.Binding` namespace or any property with the postfix of `Binding` on an object. For example:

```js
export default Ember.Component.extend({
  wowBinding: 'MyApp.wowObject',
  thingContainer: {},
  amazingBinding: Ember.Binding.oneWay('thingContainer.firstAmazingThing'),
  wasThisReallyTheAPIBinding: 'thingContainer.yesThisWasTheAPI'
});
```

This second system will be removed in Ember 3.0. For more details, see the deprecation guide:

- [`Ember.Binding`](/deprecations/v2.x/#toc_ember-binding)

#### Legacy {{render}} helper

Ember’s `{{render}}` helper presaged the idea of component-driven rendering architecture as we now know it. Despite this, it was also an API coupled to Ember’s `Controller` system, was subject to edge cases where the context of a template was difficult to discern, and additionally was entangled with Ember’s routing system. Through the 2.x cycle we’ve worked to ensure each use-case for `{{render}}` has a viable solution in Ember’s component-driven system.

Fully deprecated since Ember 2.11, in 3.0 the `{{render}}` helper will be removed. Please see the deprecation guide for more details:

- [`{{#render}}` helper with a block](/deprecations/v2.x/#toc_render-helper-with-block)
- [Model param in `{{render}}` helper](/deprecations/v2.x/#toc_model-param-in-code-render-code-helper)
- [`{{render}}` helper](/deprecations/v2.x/#toc_code-render-code-helper)
- [Rendering into a `{{render}}` helper that resolves to an `{{outlet}}`](/deprecations/v2.x/#toc_rendering-into-a-render-helper-that-resolves-to-an-outlet)

#### Legacy Ember.K utility

Ember has historically provided a short-to-type noop function for use as a stub on parent classes or in other situations where a noop might be useful. With the advent of ECMAScript 2015 [method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) and [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), this kind of utility has become more confusing than convenient.

In Ember 3.0 the `Ember.K` function will be removed. For more details, please see the deprecation guide:

- [`Ember.K`](/deprecations/v2.x/#toc_code-ember-k-code)

#### Consuming Ember through Bower

Ember.js 3.0 and later releases will no longer be published to bower. If you still use bower today, we strongly suggest you begin the migration of your dependencies to npm.

<hr>

In the past, we have failed to make clear what this means for users of globals mode. We apologize for this lack of clarity.

In short, globals builds of any kind will no longer be maintained or published. Not only will they not be availabe in bower, but you
will likely not find them on CDNs or by download from the emberjs.com website. While the initial release of Ember 3.0 does contain
a globals build of bower as part of the ember-source npm package, this too will disappear before long. What this means is,
if you need to continue using globals mode in Ember 3.0, as a part of your build process, you will need to compile a build of Ember itself
using ember-cli. We know this will cause considerable hardship to users of globals mode, but this is important in order to be able to make
progress on some long awaited features such as splitting Ember into smaller packages and tree shaking.

<hr>

#### Deprecations in Ember 3.0

Deprecations are added to Ember.js when an API will be removed at a later date.

Each deprecation has an entry in the deprecation guide describing the migration
path to more stable API. Deprecated public APIs are not removed until a major
release of the framework.

Consider using the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon if you would like to upgrade your application without immediately addressing
deprecations.

Two new deprecations are introduces in Ember.js 3.0:

* TODO
* TODO

For more details on changes in Ember.js 3.0, please review the
[Ember.js 3.0.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.0.0).

### Upcoming Changes in Ember.js 3.1

Ember.js 3.1 will introduce two new features:

* TODO
* TODO

#### Deprecations in Ember.js 3.1

Two new deprecations are introduces in Ember.js 3.1:

* TODO
* TODO

For more details on the upcoming changes in Ember.js 3.1, please review the
[Ember.js 3.1.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v3.1.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.0

#### Deprecations in Ember Data 3.0

Two new deprecations are introduces in Ember Data 3.0:

* TODO
* TODO

For more details on changes in Ember Data 3.0, please review the
[Ember Data 3.0.0 release page](https://github.com/emberjs/data/releases/tag/v3.0.0).


### Upcoming changes in Ember Data 3.1


#### Deprecations in Ember Data 3.1

For more details on the upcoming changes in Ember Data 3.1, please review the
[Ember Data 3.1.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v3.1.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data! To upgrade
your projects using `yarn` run:

```
yarn upgrade ember-cli
```

To upgrade your projects using `npm` run:

```
npm install --save-dev ember-cli
```

After running the
upgrade command run `ember init` inside of the project directory to apply the
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v3.-1.0...v3.0.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v3.-1.0...v3.0.0).

### Changes in Ember CLI 3.0

#### Deprecations in Ember CLI 3.0

Two new deprecations are introduces in Ember CLI 3.0:

* TODO
* TODO

For more details on the changes in Ember CLI 3.0 and detailed upgrade
instructions, please review the [Ember CLI  3.0.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.0.0).

### Upcoming Changes in Ember CLI 3.1

#### Deprecations in Ember CLI 3.1

For more details on the changes in Ember CLI 3.1.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.1.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.1.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
