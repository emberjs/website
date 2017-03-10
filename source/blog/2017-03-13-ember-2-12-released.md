---
title: Ember 2.12 and 2.13 Beta Released
author: Godfrey Chan, Brendan McLoughlin
tags: Releases
---

Today, the Ember project is releasing Ember.js, Ember Data and Ember CLI
version 2.12.0.

This also kicks off the 2.13 beta cycle for all sub-projects. We encourage our
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

TBK

#### Deprecations in Ember 2.12

TBK

#### Other Notable Changes

TBK

### Upcoming Changes in Ember.js 2.13

TBK

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.12

TBK

#### Deprecations in Ember Data 2.12

TBK

### Upcoming changes in Ember Data 2.13

TBK

#### Deprecations in Ember Data 2.13

TBK

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

- blueprints use ESLint instead of JSHint
- `npm` dependency dropped, will use system NPM if v3+ or print warning
- drop node 0.12
- `ember-data` dropped from addon blueprint, most addons don't use it
- `bower` dependency is installed lazily if Ember CLI needs it

#### Other Notable Changes

For more details on the changes in Ember CLI 2.12 and detailed upgrade
instructions, please review the [Ember CLI 2.12.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.12.0).

### Upcoming Changes in Ember CLI 2.13

- empty `bower.json` files removed from blueprints, keep the files if you still have bower deps
- yarn support via `--yarn` and `yarn.lock` auto detection

#### Other Notable Changes

For more details on the changes in Ember CLI 2.13.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.13.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.13.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
