---
title: Ember 2.13 and 2.14 Beta Released
author: 
tags: Releases
---

Today the Ember project is releasing version 2.13.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 2.14 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 2.13

Building on the addition of `factoryFor` in Ember 2.12, Ember 2.13 changes
the way dependency injection is implemented in the framework. Until 2.12,
dependencies were injected onto an instance using `extend` to create a subclass.
This created an excessive number of subclasses during the execution of an
application. In Ember 2.13 injections are passed to an object via `create`
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

#### Deprecations in Ember 2.13

A bit of cleanup has been done to reduce confusion (during implementation of the [router service](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md)) which resulted in adding a deprecation for accessing the private `router` property
of the router. This property has always been private API, but a number of addons have resorted to
using it due to lack of public API options (though the router service should address these remaining
cases). Please review the [deprecation guide](https://emberjs.com/deprecations/v2.x/#toc_ember-router-router-renamed-to-ember-router-_routermicrolib)
for more details.

For more details on the changes in Ember.js 2.13, please review the
[Ember.js 2.13.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.13.0).

### Upcoming Changes in Ember.js 2.14

TBK

For more details on the upcoming changes in Ember.js 2.14, please review the
[Ember.js 2.14.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.14.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.13

Ember Data 2.13 represents the work of 20 direct contributors
and over 120 commits.

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
[twokul](https://github.com/twokul) for their work on this feature and
[lindyhopchris](https://github.com/lindyhopchris) for his help
documenting the feature.

#### Deprecations in Ember Data 2.13

Ember Data 2.13 deprecates the `data-adapter`, `injectStore`,
`transforms`, and `store` Ember application initializers that Ember Data injects
into apps. The deprecation was proposed via [an RFC](https://github.com/emberjs/rfcs/blob/master/text/0181-deprecate-ember-data-initializers.md),
and the Ember Data team proactively submitted pull-requests for all usages of
these initializers in open source addons. 

For more details on the changes in Ember Data 2.13, please review the
[Ember Data 2.13.0 release page](https://github.com/emberjs/data/releases/tag/v2.13.0).

### Upcoming changes in Ember Data 2.14

In 2.14 Ember Data continues its internal refactorings and performance work without
impacting public APIs. It is shaping up nicely with reduced asset size (~ 3KB savings),
better warnings and errors around malformed JSONAPI payloads, and simplified internals.

#### Deprecations in Ember Data 2.14

Ember Data 2.14
[deprecates](https://github.com/emberjs/data/pull/4909/files) the
private method `didUpdateAll`. If you are using it in your codebase
please use the updated methods name `_didUpdateAll`.

For more details on the upcoming changes in Ember Data 2.14, please review the
[Ember Data 2.14.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.14.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.12.0...v2.13.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.12.0...v2.13.0).

### Changes in Ember CLI 2.13

TBK

For more details on the changes in Ember CLI 2.13 and detailed upgrade
instructions, please review the [Ember CLI 2.13.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.13.0).

### Upcoming Changes in Ember CLI 2.14

TBK

For more details on the changes in Ember CLI 2.14.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.14.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.14.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
