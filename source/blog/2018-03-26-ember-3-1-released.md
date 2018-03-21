---
title: Ember 3.1 and 3.2 Beta Released
author: Ricardo Mendes
tags: Releases
---

Today the Ember project is releasing version 3.1.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 3.2 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 3.1

Ember.js 3.1 is an incremental, backwards compatible release of Ember with
bugfixes, performance improvements, and minor deprecations.

#### Deprecations in Ember 3.1

Deprecations are added to Ember.js when an API will be removed at a later date.

Each deprecation has an entry in the deprecation guide describing the migration
path to more stable API. Deprecated public APIs are not removed until a major
release of the framework.

Consider using the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon if you would like to upgrade your application without immediately addressing
deprecations.

Two new deprecations are introduces in Ember.js 3.1:

* TODO
* TODO

For more details on changes in Ember.js 3.1, please review the
[Ember.js 3.1.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.1.0).

### Upcoming Changes in Ember.js 3.2

Ember.js 3.2 will introduce two new features:

* TODO
* TODO

#### Deprecations in Ember.js 3.2

Two new deprecations are introduces in Ember.js 3.2:

* TODO
* TODO

For more details on the upcoming changes in Ember.js 3.2, please review the
[Ember.js 3.2.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v3.2.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.1

#### Deprecations in Ember Data 3.1

Two new deprecations are introduces in Ember Data 3.1:

* TODO
* TODO

For more details on changes in Ember Data 3.1, please review the
[Ember Data 3.1.0 release page](https://github.com/emberjs/data/releases/tag/v3.1.0).


### Upcoming changes in Ember Data 3.2


#### Deprecations in Ember Data 3.2

For more details on the upcoming changes in Ember Data 3.2, please review the
[Ember Data 3.2.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v3.2.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v3.0.0...v3.1.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v3.0.0...v3.1.0).

### Changes in Ember CLI 3.1

#### Deprecations in Ember CLI 3.1

Two new deprecations are introduces in Ember CLI 3.1:

* TODO
* TODO

For more details on the changes in Ember CLI 3.1 and detailed upgrade
instructions, please review the [Ember CLI  3.1.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.1.0).

### Upcoming Changes in Ember CLI 3.2

#### Deprecations in Ember CLI 3.2

For more details on the changes in Ember CLI 3.2.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.2.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.2.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.