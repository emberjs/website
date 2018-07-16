---
title: Ember 3.3 Released
author: Melanie Sumner
tags: Releases, 2018, 3, 3.3
responsive: true
---

Today the Ember project is releasing version 3.3.0 of Ember.js, Ember Data, and Ember CLI- a little later than planned, for sure! Thank you for your support and patience. 

This release kicks off the 3.3 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.3

Ember.js 3.3 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There is xxxx () new feature and xxxx () deprecations in this version.

#### New Features ()


#### Deprecations ()

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.


For more details on changes in Ember.js 3.3, please review the [Ember.js 3.3.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.3.0).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.3

There are xxxx () new features and xxxx () deprecations in the Ember Data 3.3 release.

#### New Features ()

#### Deprecations ()

There are xxxx deprecations introduced in Ember Data 3.3.

For more details on changes in Ember Data 3.3, please review the
[Ember Data 3.3.0 release page](https://github.com/emberjs/data/releases/tag/v3.3.0).

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

After running the upgrade command run `ember init` inside of the project directory to apply the blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v3.1.0...v3.3.0) and [addons](https://github.com/ember-cli/ember-addon-output/compare/v3.1.0...v3.3.0).

### Changes in Ember CLI 3.3

There are xxxx (x) new features and xxx (x) deprecation in the Ember CLI 3.3 release.

#### New Features and Updates ()


#### Deprecations ()

---

There were some other bug fixes in this version release that were not included in this blog post. For more details on the changes in Ember CLI 3.3.0 and detailed upgrade instructions, please review the [Ember CLI 3.3.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.3.0).

Thank you to [](), [](), and []() for your incredible work on ember-cli!

For more details on the changes in Ember CLI 3.3 and detailed upgrade
instructions, please review the [Ember CLI  3.3.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.3.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
