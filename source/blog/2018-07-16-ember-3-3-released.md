---
title: Ember 3.3 Released
author: Melanie Sumner, Brendan McLoughlin
tags: Releases, 2018, 3, 3.3
responsive: true
---

Today the Ember project is releasing version 3.3.0 of Ember.js, Ember Data, and Ember CLI. We know, 3.2 seems like it just came out yesterday! But we wanted to (stay? get back?) on track. So 3.3.0 is here! 

This release kicks off the 3.4 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.3

Ember.js 3.3 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There are one (1) new feature, three (3) deprecations, and eight (8) bugfixes in this version.

#### New Features (1)

**Implement optional jQuery Integration (1 of 1)**

See [emberjs/rfcs#294](https://github.com/emberjs/rfcs/blob/master/text/0294-optional-jquery.md) to get more prose

#### Deprecations (3)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

**Operation "make jQuery optional" continues (1 of 3)**
We implemented a deprecation that removes access from `jQuery.Event#originalEvent`
Read the full RFC: [emberjs/rfcs#294](https://github.com/emberjs/rfcs/blob/master/text/0294-optional-jquery.md).

**deprecation of three private, unused classes (2 of 3)**
Implemented deprecation of `Ember.Map`, `Ember.MapWithDefault`, and `Ember.OrderedSet` because not only were they private classes, they had also remained unused in Ember for some time now. Read the full (rendered) RFC: [emberjs/rfc#237](https://github.com/Serabe/rfcs/blob/dbc64fd66c602c68cfe03e91bfa2d031f4907423/text/0000-deprecation-ember-map.md)

**deprecation of copy/copyable (3 of 3)**
We've implemented deprecation of `Ember.copy` and `Ember.Copyable` - the `copy` function and `Copyable` mixin of `@ember/object/internals`. Ember isn't using it internally- it's leftover from SproutCore(!), and we're at the point where we realized we could clean this one up. 

Shallow copies of the form `copy(x)` or `copy(x, false)` can be replaced mechanically with `Object.assign({}, x)`. 

If you're using it in your addon, you might want to read the entire text of the RFC for advice on how to replace this in your addon: [emberjs/rfcs#322](https://github.com/lupestro/rfcs/blob/a7db06396cdd080e06f1b99fd728ab8a4e191a79/text/0322-deprecate-copy-copyable.md).

For more details on changes in Ember.js 3.3, please review the [Ember.js 3.3.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.3.0).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.3

Since Ember Data 3.2 was just released two weeks, ago we did not feel
confident that the changes in the beta branch had recieved enough
testing. As a result, we have decided to re-release Ember Data 3.2 as
Ember Data 3.3 to maintain the release train cadence. Ember Data
3.3.0-beta.1 will be released again as 3.4.0-beta.1 so it can continue
to be evaludated for a full beta cycle.

#### New Features (0)

There are no new features in Ember Data 3.3.0.

#### Deprecations (0)

There are no deprecations introduced in Ember Data 3.3.

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
