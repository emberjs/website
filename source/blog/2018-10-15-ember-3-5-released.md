---
title: Ember 3.5 Released
author: Melanie Sumner, Jen Weber, Chris Thoburn
tags: Releases, 2018, 3, 3.5
responsive: true
---

Today the Ember project is releasing version 3.5 of Ember.js, Ember Data, and Ember CLI.
Notable features include Ember CLI build performance improvements of up to 32% and new Ember Data powers for addon developers.

Additionally, versions 3.4 of Ember and Ember Data are now promoted to LTS, which stands for Long
Term Support. An LTS version of Ember continues to receive security updates
for 9 release cycles (54 weeks)
and bugfixes for 6 cycles (36 weeks).
LTS releases typically occur every four minor versions. 
The previous LTS version for Ember was 2.18. 3.4 is the first LTS for
Ember Data.

This release kicks off the 3.6 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.5
Ember.js 3.5 is an incremental, backwards compatible release of Ember with bugfixes. 
It is common for minor releases to provide bugfixes that pave the way for
release of new features in future releases.
There are zero (0) new features, zero (0) deprecations, and two (2) small 
bugfixes in this version.
Contributors to the Ember.js codebase itself should note that it now uses
Typescript 3.0 internally.

#### Bugfixes (2).

For more details on changes in Ember.js 3.5, please review the [Ember.js 3.5.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.5.0).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.5

This release cycle marks two major milestones for `ember-data`,
an LTS release and the `RecordData` interfaces.

#### LTS

The first milestone is the release of `3.4 LTS`, our very first `LTS` release! From here out, `ember-data` will follow the same LTS cycle and process as `Ember`.

#### New Features (1)

**RecordData**

The second milestone is the release of `3.5` which marks the first release containing the new [RecordData](https://github.com/emberjs/rfcs/pull/293) interfaces.
`RecordData` gives addon developers much-needed API access with more confidence and stability. Many commonly requested features (improved dirty-tracking, fragments, alternative Models) are now possible or easier to implement in addons.

Landing `RecordData` required significant refactoring of the internals of `ember-data`, and is intended to allow us to deprecate and remove use of the private but intimate `InternalModel` API.
Due to the nature of this change, we expect some applications may encounter regressions. This was the primary motivation for waiting to land this until after our first `LTS`. If you encounter issues upgrading from pre `3.5` versions to `3.5` or later, we recommend reporting them and making use of `LTS` until fixes are available.

We are tracking issues introduced by `RecordData` with the label [record-data](https://github.com/emberjs/data/labels/record-data)

We will also continue to target bugfixes for `LTS`, tracked by the label [lts-target](https://github.com/emberjs/data/labels/lts-target).

**RecordData use with ModelFragments**

While most community addons have been found to work with `RecordData` versions of `ember-data`, [ember-data-model-fragments](https://github.com/lytics/ember-data-model-fragments) does not currently. If you use this addon, it is likely you will want to stay on `ember-data` `3.4 LTS` until the community has released a version compatible with `RecordData`.

If you use `ember-data-model-fragments`, helping to refactor it to make use of `RecordData` (or supply bugfixes to `ember-data` if required) would be greatly appreciated.

#### Deprecations (0)

No new deprecations introduced in Ember Data 3.5.

For more details on Ember Data 3.5, please review the
[Ember Data 3.5.0 release page](https://github.com/emberjs/data/releases/tag/v3.5.0).

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

### Changes in Ember CLI 3.5

#### New Features (3)

**Upgraded to Broccoli v2.0.0! (1 of 3)**

Broccoli is an asset pipeline used by Ember. For quite a long time, tools in the Ember
Ecosystem relied on a fork of Broccoli. However, as of this release, Ember CLI now uses
[Broccoli 2.0](https://github.com/broccolijs/broccoli) directly! 
See [this Ember.js Times Reader's question](https://discuss.emberjs.com/t/readers-questions-why-does-ember-use-broccoli-and-how-is-it-different-from-webpack-rollup-parcel/15384) 
to learn more about what makes Broccoli awesome and why it is used instead Parcel or Webpack.
Many thanks to contributors and maintainers of Broccoli who helped with the migration.

**Build speed improvements up to 32% (2 of 3)**

Thanks to migrating to Broccoli 2, Ember devs should see some speed improvements in their
builds. Broccoli 2 allows Ember CLI to use the default system `temp` directory
rather than a `./tmp` directory local to a project folder. Depending on computer hardware,
users may see up to 32% improvements in build time. The system `temp` directory
on your computer has some optimizations in place that your apps now benefit from.

**Migration to ember-qunit (3 of 3)**

`ember-cli-qunit` was a very thin shim over `ember-qunit`.
Ember CLI now uses `ember-qunit` directly as a dependency.

#### Deprecations (0)

No new deprecations introduced in Ember CLI 3.5.

For more details on the changes in Ember CLI 3.5 and detailed upgrade
instructions, please review the [Ember CLI  3.5.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.5.0).

---

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
