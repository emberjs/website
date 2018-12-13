---
title: Ember VER Released
author: Melanie Sumner, Kenneth Larsen
tags: Releases, 2018, 3, VER
responsive: true
---

Today the Ember project is releasing version VER of Ember.js, Ember Data, and Ember CLI. This release kicks off the 3.5 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

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

First new feature (1 of 2)

Second new feature (2 of 2)


#### Deprecations (0)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

For more details on changes in Ember.js VER, please review the [Ember.js VER.0 release page](https://github.com/emberjs/ember.js/releases/tag/vVER.0).

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

You may upgrade Ember CLI easily using the ember-cli-update project:

```bash
npm install -g ember-cli-update
ember-cli-update
```

This utility will help you to update your app or add-on to the latest Ember CLI version. You will probably encounter merge conflicts, in which the default behavior is to let you resolve conflicts on your own. For more information on the `ember-cli-update` project, see [the github README](https://github.com/ember-cli/ember-cli-update).

While it is recommended to keep Ember CLI versions in sync with Ember and Ember Data, this is not required. After updating ember-cli, you can keep your current version(s) of Ember or Ember Data by editing `package.json` to revert the changes to the lines containing `ember-source` and `ember-data`.

### Changes in Ember CLI VER

#### New Features (X)


#### Deprecations (X)

---

For more details on the changes in Ember CLI VER and detailed upgrade
instructions, please review the [Ember CLI  VER.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/vVER.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
