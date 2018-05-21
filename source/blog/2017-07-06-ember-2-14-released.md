---
title: Ember 2.14 and 2.15 Beta Released
responsive: true
author: Matthew Beale, Chris Thoburn, Alex Navasardyan
tags: Releases, 2, 2017, 2.14, 2.15
---

Today the Ember project is releasing version 2.14.0 of Ember.js, Ember Data, and Ember CLI. You may have noticed we're a few weeks late on this release, as the
start of summer may have left us a little distracted 😅.

This release kicks off the 2.15 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 2.14

Ember.js 2.14.0 is an incremental, backwards compatible release of Ember with
bug-fixes, performance improvements, and minor deprecations.

A notable change that began in Ember 2.13.0 and continues in 2.14.0 is improved packaging of the
framework itself. This includes adoption of [Babel](https://babeljs.io/) 6 and using
[Rollup](https://rollupjs.org/) on internal Ember packages.

The 2.14.0 release of Ember.js comes in as 7k smaller than 2.13.3 (minified
and gzipped). Additionally, initial render time of real world apps continues to
improve. This benchmark shows time-to-initial render of
[emberaddons.com](http://emberaddons.com/) measured using
[ember-macro-benchmark](https://github.com/krisselden/ember-macro-benchmark):

![](/images/blog/2017-07-03/initial-render.png)

We're continuing to make similar improvements across the Ember project
libraries. By measuring the impact of these changes as we make them, we
will ensure complicated build changes avoid unintended regressions.

#### Deprecations in Ember 2.14

Deprecations are added to Ember.js when an API will be removed at a later date.

Each deprecation has an entry in the deprecation guide describing the migration
path to more stable API. Deprecated public APIs are not removed until a major
release of the framework.

Consider using the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon if you would like to upgrade your application without immediately addressing
deprecations.

Two new deprecations are introduces in Ember 2.14.0:

* `Ember.MODEL_FACTORY_INJECTIONS` is deprecated. This flag enabled DI behavior
  required by Ember Data prior to changes landed in Ember 2.11. It is intimate
  API scheduled for removal in Ember 2.17.0. If your application sets this
  flag you can safely remove it. See the [deprecation guide
  entry](https://www.emberjs.com/deprecations/v2.x/#toc_ember-model_factory_injections-removed) and the [implementation PR](https://github.com/emberjs/ember.js/pull/15204)
  for more details.
* Use of the `eventManager` property on components and the `canDispatchToEventManager`
  property on `EventManager`s has been deprecated. These rarely used and
  undocumented parts of the already obscure event manager API where designed for
  touch-event use cases that now have other and better solutions. See the
  [deprecation
  guide](https://www.emberjs.com/deprecations/v2.x/#toc_custom-eventmanger-deprecated)
  and
  [deprecation PR](https://github.com/emberjs/ember.js/pull/15078) for more
  details.

For more details on changes in Ember.js 2.14.0, please review the
[Ember.js 2.14.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.14.0).

### Upcoming Changes in Ember.js 2.15

Ember.js 2.15.0 will introduce two new features:

* [RFC #225](https://github.com/emberjs/rfcs/pull/225) adds the argument
  `model` to the `{{mount}}` engine helper. For example `{{mount 'admin'
  model=(hash user=user)}}` would provide the object with `{user}` as a `model`
  property on the engine's application route. See the [implementation
  PR](https://github.com/emberjs/ember.js/pull/15174) and
  [followup PR](https://github.com/emberjs/ember.js/pull/15325/files) for more
  details.
* Implementation phase 1 for [RFC #95](https://github.com/emberjs/rfcs/pull/95),
  the routing service.
  This RFC describes a first-class
  public API routing service. Amongst other changes, the service provides a way for
  Ember components to interact with routing state and controls. This initial
  phase of the work includes all of the routing RFC besides the `RouteInfo`
  objects. See the
  major [implementation](https://github.com/emberjs/ember.js/pull/14805)
  [pull](https://github.com/emberjs/ember.js/pull/14980)
  [requests](https://github.com/emberjs/ember.js/pull/15414) for more details.

For more details on the upcoming changes in Ember.js 2.15, please review the
[Ember.js 2.15.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.15.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.14

Ember Data 2.14 brings with it a number of performance related optimizations.
Ember Data 2.14.0 was released on June 18th, and the current released
version is 2.14.3.

In addition to a large number of minor tweaks, three changes stand out:

#### File-size Improvements

Starting in Ember Data 2.14.0, builds of Ember Data use Rollup
to produce a single micro-lib module. This helps with parse/eval time at boot
and reduces both the pre and post-gzip sizes by ~23Kb and ~3Kb respectively. We
also used Babel 6 and some manual tuning to further reduce the transpiled size.

#### Lazy Relationships

Previously, Ember Data would immediately create the connections between records
necessary for relationships.  This is unnecessary overhead if these
relationships aren't immediately accessed. In Ember Data 2.14.0 relationship
connections are established only upon access to the relationship.

#### Deferred serializer lookup

Previously, Ember Data would lookup the serializer for a requested data type
immediately after making the network request. This strategy allowed the cost of
serializer instantiation to be paid while waiting for the network to resolve.
However, this strategy essentially traded initial render performance for a
faster load of non-critical data. In this release, we're re-tuned this part of
the system to be more friendly to initial rendering by deferring serializer
lookup until data returns from the network.

#### Known Issues

Unfortunately, changes in Ember Data 2.14 appear to have introduced a number of
regressions in less well defined areas of Ember Data's usage. If you experience
trouble after upgrading to 2.14, we suggest locking to 2.13 and either
commenting on an existing issue or opening a new issue as appropriate.

See the [Ember Data issues](https://github.com/emberjs/data/issues) for more
information.

#### Deprecations in Ember Data 2.14

Several private but non-underscored methods ("intimate" API) have been
deprecated in favor of underscored variants.  `didUpdateAll` is now
`_didUpdateAll`.  `buildInternalModel` is now `_buildInternalModel`. These
APIs will be removed in Ember Data 2.15.0. See [PR #4949
](https://github.com/emberjs/data/pull/4909) for more details.

For more details on the changes in Ember Data 2.14, please review the
[Ember Data release
changelog](https://github.com/emberjs/data/blob/release/CHANGELOG.md#release-2142-june-19-2017)

For more details on the upcoming changes in Ember Data 2.15, please review the
[Ember Data 2.15.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.15.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data. To upgrade
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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.13.0...v2.14.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.13.0...v2.14.0).

### Changes in Ember CLI 2.14

Majority of the changes in this release happened under the hood to improve documentation as well as code cleanup and better integration with `yarn`.

#### NPM 5 and Node 8 support

Ember CLI now supports Node 8 and npm 5 out of the box, make sure to try it out! Some developers reported issues with `node@8.1.0` where Ember CLI would hang indefinitely. After upgrading to version `node@8.1.2`+ this issue no longer appeared.

#### Specifying a blueprint for a new app

Ember CLI 2.14.0 brings support for initial blueprint packages as an argument to
`ember new`. This empowers other projects to better utilize Ember CLI as a part
of their own ecosystem. In addition it permits experimentation with non-default
Ember application setups.

For example to generate an [`ember-cli-deploy`](http://ember-cli-deploy.com/)
plugin use the `@ember-cli-deploy/plugin-blueprint` package ([repo on
GitHub](https://github.com/ember-cli-deploy/plugin-blueprint)):

```
ember new my-new-deploy-plugin -b @ember-cli-deploy/plugin-blueprint
```

The package will be downloaded from NPM and used to provide the initial
blueprint for your Ember CLI app.

Two other examples of this feature being used in the wild are:

- Generate a new [Glimmer.js](https://glimmerjs.com/) application. See [glimmerjs/glimmer-blueprint](https://github.com/glimmerjs/glimmer-blueprint).
- Experiment with Ember's "Module Unification" filesystem layout by using the [ember-module-unification-blueprint](https://github.com/emberjs/ember-module-unification-blueprint) package.

#### Other Notable Changes

+ Node 7.x on Windows is now supported.
+ By default, Ember CLI collects usage information. Documentation has now been
added describing what is collected and who has access to this information.
  See
  [Analytics.md](https://github.com/ember-cli/ember-cli/blob/master/Analytics.md)
  for more information.
+ A flag `--no-welcome` has been added for `ember new` and `ember init`. Use
  this flag to skip the inclusion of `ember-welcome-page` as a dependency in
  newly created projects.
+ The Ember CLI team recommends Ember Addons use the lowest supported Node release when
  running CI. As of this release, that means Node 4.x.

For more details on the changes in Ember CLI 2.14.0 and detailed upgrade
instructions, please review the [Ember CLI 2.14.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.14.0).

### Upcoming Changes in Ember CLI 2.15

Ember CLI 2.15.0 will introduce improved error messages that appear in your browser.
This change means less checking of the console for build errors. For example:

![](/images/blog/2017-07-03/error.png)

For more details on the changes in Ember CLI 2.15.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.15.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.15.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
