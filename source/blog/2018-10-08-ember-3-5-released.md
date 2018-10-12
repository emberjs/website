---
title: Ember 3.5 Released
author: Melanie Sumner, Jen Weber
tags: Releases, 2018, 3, 3.5
responsive: true
---

Today the Ember project is releasing version 3.5 of Ember.js, Ember Data, and Ember CLI. This release kicks off the 3.6 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

Additionally, 3.4 is now promoted to LTS, which stands for Long
Term Support. An LTS version of Ember continues to receive security updates
for 9 release cycles (54 weeks)
and bugfixes for 6 cycles (36 weeks).
LTS releases typically occur every four minor versions. 
The previous LTS version was 2.18.

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

Ember Data 3.5 is a re-release of Ember Data 3.4. Re-releases occur when
a library's feature development does not align with the
release schedule of the other main libraries (CLI and Ember.js framework), 
so the last stable release is used.

#### New Features (0)

No new features introduced in Ember Data 3.5.

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

##### Upgraded to Broccoli v2.0.0! (1 of 3)

Broccoli is an asset pipeline used by Ember. For quite a long time, tools in the Ember
Ecosystem relied on a fork of Broccoli. However, as of this release, Ember CLI now uses
[Broccoli 2.0](https://github.com/broccolijs/broccoli) directly! 
See [this Ember.js Times Reader's question](https://discuss.emberjs.com/t/readers-questions-why-does-ember-use-broccoli-and-how-is-it-different-from-webpack-rollup-parcel/15384) 
to learn more about what makes Broccoli awesome and why it is used instead Parcel or Webpack.
Many thanks to contributors and maintainers of Broccoli who helped with the migration.

##### Build speed improvements up to 32% (2 of 3)

Thanks to migrating to Broccoli 2, Ember devs should see some speed improvements in their
builds. Broccoli 2 allows Ember CLI to use the default system `temp` directory
rather than a `./tmp` directory local to a project folder. Depending on computer hardware,
users may see up to 32% improvements in build time. The system `temp` directory
on your computer has some optimizations in place that your apps now benefit from.

##### Migration to ember-qunit (3 of 3)

`ember-cli-qunit` was a very thin shim over `ember-qunit`.
Ember CLI now uses `ember-qunit` directly as a dependency.

#### Deprecations (0)

No new deprecations introduced in Ember CLI 3.5.

---

For more details on the changes in Ember CLI 3.5 and detailed upgrade
instructions, please review the [Ember CLI  3.5.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.5.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
