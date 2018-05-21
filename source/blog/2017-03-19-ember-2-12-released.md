---
title: Ember 2.12 and 2.13 Beta Released
responsive: true
author: Matthew Beale, Brendan McLoughlin, Robert Jackson
tags: Releases, 2018, 2, 2.12, 2.13
---

Today the Ember project is releasing version 2.12.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 2.13 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 2.12

The
2.12.0 release is an Ember.js Long-Term Support candidate. In six weeks, the 2.12.x series
will become the latest LTS release and six weeks after that the 2.8 LTS branch
will no longer receive bugfix patches.

For more information about Ember's LTS policies, see the
[announcement blog
post](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html) and
[builds page](http://emberjs.com/builds/).

Ember 2.12 implements the `factoryFor` API as described in [RFC #150](https://github.com/emberjs/rfcs/blob/master/text/0150-factory-for.md).
This public API replaces the intimate API of `_lookupFactory`, and additionally
discourages developers from setting properties on classes returned from the
container. For more information about this API see the [API
docs](http://emberjs.com/api/classes/ContainerProxyMixin.html#method_factoryFor)
and [`_lookupFactory` deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_migrating-from-_lookupfactory-to-factoryfor).

Addon authors and others should consider if the
[ember-factory-for-polyfill](https://github.com/rwjblue/ember-factory-for-polyfill)
addon can help them avoid the deprecation warning for `_lookupFactory`.

Additionally, this release of Ember contains an incremental performance
improvement for the Glimmer rendering engine (you may have seen it
referred to as the "binary VM"). By avoiding runtime
compilation of syntax objects, initial rendering performance will benefit.

#### Deprecations in Ember 2.12

- The `Ember.K` utility function is deprecated per [RFC #178](https://github.com/emberjs/rfcs/blob/master/text/0178-deprecate-ember-k.md).
  See the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_code-ember-k-code)
  and pull request [#14751](https://github.com/emberjs/ember.js/pull/14751)
  for additional details.

- Arguments to the component lifecycle hooks of `didInitAttrs`, `didReceiveAttrs`, and `didUpdateAttrs`
  are deprecated. These arguments were private and undocumented. Please see
  [RFC #191](https://github.com/emberjs/rfcs/blob/master/text/0191-deprecate-component-lifecycle-hook-args.md)
  for further context and discussion.
  Please note that
  this only deprecates the usage of the arguments passed to this hook, not the
  hooks themselves. See pull request [#14711](https://github.com/emberjs/ember.js/pull/14711)
  for additional details.

For more details on the changes in Ember.js 2.12, please review the
[Ember.js 2.12.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.12.0).

### Upcoming Changes in Ember.js 2.13

Building on the addition of `factoryFor` in Ember 2.12, Ember 2.13 will change
the way dependency injection is implemented in the framework. Until 2.12,
dependencies were injected onto an instance using `extend` to create a subclass.
This created an excessive number of subclasses during the execution of an
application. In Ember 2.13 injections will be passed to an object via `create`
during instantiation. This results in a notable performance improvement
that grows in impact with the complexity of an application.

See [RFC #150](https://github.com/emberjs/rfcs/blob/master/text/0150-factory-for.md)
and pull request [#14360](https://github.com/emberjs/ember.js/pull/14360) for
more details about this change.

Additionally, this release contains a further refinement on the "binary VM"
change landed in 2.12. By using integers for common Glimmer wire-format strings,
compiled template sizes in 2.13 will see an incremental size reduction.

In addition to these and other improvements, several changes arising
from the [RFC](https://github.com/emberjs/rfcs) process have been implemented:

- [RFC issue #146](https://github.com/emberjs/rfcs/issues/146) advocated for the
  addition of `resumeTest` as a compliment to `pauseTest`. This was implemented
  in [#13663](https://github.com/emberjs/ember.js/pull/13663).
- [RFC #186](https://github.com/emberjs/rfcs/blob/master/text/0186-track-unique-history-location-state.md)
  describes the addition of `uuid` as a property on `HistoryLocation` adapters
  for the router. This addition makes it possible to track scroll locations
  to a point in browsing history. See pull request [#14011](https://github.com/emberjs/ember.js/pull/14011)
  for more details.

For more details on the upcoming changes in Ember.js 2.13, please review the
[Ember.js 2.13.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.13.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.12

Ember Data 2.12 represents the work of 19 direct contributors
and over 90 commits.

Ember Data 2.12 continues to reflect our focus on performance improvements, and
we are happy to report this is the fastest release of Ember Data yet.

A new `serializeId()` method has been added to `JSONSerializer`,
`RESTSerializer` and `JSONAPISerializer`. This is useful if you are
working with a backend that requires your ids to be something other
than a string. For example:

```app/serializers/application.js
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  serializeId(snapshot, json, primaryKey) {
    var id = snapshot.id;
    json[primaryKey] = parseInt(id, 10);
   }
});
```

For more information see the [`serializeId` API
docs](http://emberjs.com/api/data/classes/DS.JSONSerializer.html#method_serializeId).

#### Deprecations in Ember Data 2.12

Ember Data 2.12 contains no new deprecations.

For more details on the changes in Ember Data 2.12, please review the
[Ember Data 2.12.0 release page](https://github.com/emberjs/data/releases/tag/v2.12.0).

### Upcoming changes in Ember Data 2.13

The `ds-extended-errors` ([#3586](https://github.com/emberjs/data/pull/3586) [#4287](https://github.com/emberjs/data/pull/4287)) feature has been enabled on the beta branch for Ember Data 2.13.

This feature introduces an `extend` method on errors which allows
users to create their own custom errors that extend from
`DS.AdapterError`.

```js
const MyCustomError = DS.AdapterError.extend({ message: "My custom error." });
```

The feature also introduces some new errors to rest adapter which will
be used to reject the adapter promises based on http status of the API
response.

* [401] `DS.UnauthorizedError`
* [403] `DS.ForbiddenError`
* [404] `DS.NotFoundError`
* [409] `DS.ConflictError`
* [500] `DS.ServerError`

Thanks to [tchak](https://github.com/tchak) and
[twokul](https://github.com/tchak) for their work on this feature and
[lindyhopchris](https://github.com/lindyhopchris) for his help
documenting the feature.

For more details on the upcoming changes in Ember Data 2.13, please review the
[Ember Data 2.13.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.13.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.11.0...v2.12.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.11.0...v2.12.0).

### Changes in Ember CLI 2.12

#### Switch to ESLint

Ember CLI will now generate new projects with an ESLint setup. This changes the default linting system from JSHint (which has been used
since we initially added linting support to Ember CLI) to ESLint. The new project setup uses a fairly simple `.eslinrc.js` relying
largely on ESLint's own `recommended`.

Using JSHint in projects and addons generated by prior versions of Ember CLI is still supported, but we recommend that you update to
ESLint as you upgrade your project and addons to newer Ember CLI versions.

#### Reduced Dependencies

In order to avoid inconsistencies and issues due to supporting many `npm` client versions, Ember CLI has had `npm` as a dependency
for quite some time. This is used for both `ember new foo` (to initially install dependencies for a newly generated application) and
to install packages via `ember install ember-cli-template-lint` (to install the addon specified). Having `npm` as a dependency
introduces roughly 19MB to a freshly generated application's `node_modules` size. As the `npm` client has become more stable (3.x series and
newer) this has seemed more and more wasteful.

Starting with Ember CLI 2.12, `npm` is no longer a dependency. If a suitable version of `npm` is present on the system,
it will be used. If `npm` is not found, or a version older than `3.0.0` is found, Ember CLI will emit an error when you run commands that would utilize
`npm` (e.g. `ember install`, `ember new`, `ember addon`, `ember init`).

Similarly, Ember CLI had a dependency on `bower` in order to support the `bower install` phase while generating new projects and installing
addons.
As of Ember CLI 2.11 a new application has no dependencies via `bower.json`. This means the dependency on `bower` itself is also potential bloat.
Having `bower`
as a dependency added roughly 21MB to a new application's total `node_modules` size. In Ember CLI 2.12, bower is only added as a dependency if a command
requires `bower`.

Combined, these changes result in a `node_modules` size reduction of approximately 40MB for newly generated applications.

#### Other Notable Changes

* `ember-data` has been removed from the addon blueprint.
* Properly call `preprocessTree` / `postprocessTree` for addons.
* Split serving assets into separate internal addons. This enables work to push ember-cli-fastboot towards 1.0.0.

For more details on the changes in Ember CLI 2.12 and detailed upgrade
instructions, please review the [Ember CLI 2.12.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.12.0).

### Upcoming Changes in Ember CLI 2.13

#### Add support for using `yarn`

Ember CLI projects have been able to utilize `yarn` for dependency management for quite some time, however it was not well supported by
the default generators. In 2.13 Ember CLI is now "yarn aware", and will use `yarn` for tasks such as `ember install` if it detects that
`yarn` is installed and a `yarn.lock` exists in the project. You can even instruct `ember new` to generate a new project with a `yarn.lock`
for you via `ember new foo --yarn`.

#### Enable Instrumentation Hooks

Ember CLI has had the ability to generate custom instrumentation output for builds for a few years now (introduced on 2015-08-24), but
this information has not been readily accessible. In 2.13 ember-cli exposes this information to addons that implement the `instrumentation`
hook. This allows addons to access many things that were previously very difficult (e.g. reliable build time reporting).

Thanks to [@hjdivad](https://github.com/hjdivad) for proposing and implementing this feature. Please read through [the RFC](https://github.com/ember-cli/rfcs/blob/master/complete/0091-addon-instrumentation-experimental-hooks.md)
for more details.

#### Targets

In order to allow addons to understand the desired target platforms of the app that they are operating in, a new file has been added
to all generated projects: `config/targets.js`. This file exposes the supported targets so that tooling such as [autoprefixer](https://github.com/postcss/autoprefixer) 
and [babel-preset-env](https://github.com/babel/babel-preset-env) can properly understand the level of transpilation that is needed.

The default `config/targets.js` looks like:

```js
module.exports = {
  browsers: [
    'ie 9',
    'last 1 Chrome versions',
    'last 1 Firefox versions',
    'last 1 Safari versions'
  ]
};
```

The target information is exposed to addons via `this.project.targets`.

Thanks to [@cibernox](https://github.com/cibernox) for proposing and implementing this feature. Please read through [the RFC](https://github.com/ember-cli/rfcs/blob/master/complete/0095-standardise-targets.md)
for more insight.

#### Babel 6

Babel 6 was introduced on stage during EmberCamp London way back on 2015-10-29. However, Ember CLI and its ecosystem
have continued to use the aging and nearly unsupported Babel 5. Babel 6 was a massive shift for Babel and the migration posed quite a
challenge for ember-cli.

After much work, Babel 6 support has been added to Ember CLI internally and for newly generated projects (both applications and addons).
The latest beta of `ember-cli-babel@6` takes advantage of the new `project.targets` API along with [`babel-preset-env`](https://github.com/babel/babel-preset-env)
to allow applications to have significantly better control of exactly what is transpiled. `babel-preset-env` utilizes the [caniuse](http://caniuse.com/) and
[@kangax](https://github.com/kangax)'s [ES6 compatibility database](https://kangax.github.io/compat-table/es6/) to know which features are available natively and which
require transpilation. For example, with the proper targets configuration `ember-cli-babel` will no longer transpile `const` / `let`, 
`() => { }` functions, `class`, etc.

The work done in `ember-cli-babel` allows both `ember-cli-babel@5` and `ember-cli-babel@6` to coexist peacefully, so it is safe for addon authors
to begin updating their internal `ember-cli-babel` dependency so that applications can take advantage of more of these `babel@6` features.

Please test your applications and addons with `ember-cli-babel@6` and report any issues you encounter. Due to the large number of changes required 
internally, we would like a larger than normal beta testing base to ensure things are as stable as possible before 2.13.0 is released.

#### Other Notable Changes

* `bower.json` is no longer included in a newly generated project.
* Fix command interruption issues on windows.
* Added `filesToRemove` property for custom blueprints.

For more details on the changes in Ember CLI 2.13.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.13.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.13.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
