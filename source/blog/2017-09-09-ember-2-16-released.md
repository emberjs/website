---
title: Ember 2.16 and 2.17 Beta Released
author: Matthew Beale
tags: Releases
---

Today the Ember project is releasing version 2.16.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 2.17 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 2.16

Ember.js 2.16 is an incremental, backwards compatible release of Ember with
bugfixes, performance improvements, and minor deprecations.

#### Deprecations in Ember 2.16

Deprecations are added to Ember.js when an API will be removed at a later date.

Each deprecation has an entry in the deprecation guide describing the migration
path to more stable API. Deprecated public APIs are not removed until a major
release of the framework.

Consider using the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon if you would like to upgrade your application without immediately addressing
deprecations.

Two new deprecations are introduces in Ember.js 2.16:

* TODO
* TODO

For more details on changes in Ember.js 2.16, please review the
[Ember.js 2.16.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.16.0).

### Upcoming Changes in Ember.js 2.17

Ember.js 2.17 will introduce two new features:

* TODO
* TODO

#### Deprecations in Ember.js 2.17

Two new deprecations are introduces in Ember.js 2.17:

* TODO
* TODO

For more details on the upcoming changes in Ember.js 2.17, please review the
[Ember.js 2.17.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.17.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.16

Ember Data 2.16 is a bugfix release. It contains no new features but
it does have several bugfixes for [build warnings](https://github.com/emberjs/data/pull/5196),
[header parsing](https://github.com/emberjs/data/pull/5029) and
[outdated dependecies](https://github.com/emberjs/data/pull/5044).

#### Deprecations in Ember Data 2.16

There are no new deprecations introduced in Ember Data 2.16.

For more details on changes in Ember Data 2.16, please review the
[Ember Data 2.16.0 release page](https://github.com/emberjs/data/releases/tag/v2.16.0).


### Upcoming changes in Ember Data 2.17

Due to a late start in the Ember Data 2.16 beta cycle the Ember Data
2.17.0-beta.1 release is currently the same code as 2.16.0. The beta
releases will continue to receive beta bugfixes and it is expected to
diverge from Ember Data 2.16.0 by the time 2.17.0 is released in 6
weeks.

#### Deprecations in Ember Data 2.17

There are no planned deprecations introduced in Ember Data 2.17.

For more details on the upcoming changes in Ember Data 2.17, please review the
[Ember Data 2.17.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.17.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data!
There is a new experimental tool for Ember CLI upgrades called
[ember-cli-update](https://github.com/kellyselden/ember-cli-update.git).
To use it, run this command to install it globally:

```
npm install -g ember-cli-update
```

Then run:

```
ember-cli-update
```

It runs your system git merge tool if it finds a conflict. This can be pretty
overwhelming for beginners, so you can run

```
ember-cli-update --ignore-conflicts
```

to handle the conflicts yourself.

If this new tool is giving you problems, you can still upgrade your projects
manually. To upgrade your projects using `yarn` run:

```
yarn upgrade ember-cli
```

To upgrade your projects using `npm` run:

```
npm install --save-dev ember-cli
```

After running the
upgrade command run `ember init` inside of the project directory to apply the
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.15.0...v2.16.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.15.0...v2.16.0).

### Changes in Ember CLI 2.16

#### New projects use modules API by default

Newly generated Ember CLI apps and addons will be using the new ES6 modules API.
The conversion table is [here](https://github.com/ember-cli/ember-rfc176-data#contents).
The new modules API has been working for a while, but it is now the standard for Ember projects.
To get this new format in your existing projects, you can run
[ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod)
to in your project manually, or have it done for you when updating your project with
[ember-cli-update](https://github.com/kellyselden/ember-cli-update).

#### Addon API for Custom Transforms

Ember CLI 2.16.0 supports addon import transformations via
`importTransforms`, an implementation of [RFC 108](https://github.com/kratiahuja/rfcs/blob/add-import-api/active/0000-add-custom-transform.md).
This allows addons to register custom transformations to be run for vendor
resources included via `app.import`.  This is an advanced feature for addon
authors.  It is particularly useful for
[FastBoot](https://github.com/ember-fastboot/fastboot) to allow FastBoot-aware
addons to use a declarative API for conditionally importing code in Node.js or
browser environments.

Thanks to [@kratiahuja](https://github.com/kratiahuja) for proposing and implementing this feature.

#### Internal bundler added

This internal refactor is going to be critical to our future tree-shaking endeavors.

Thanks to [@twokul](https://github.com/twokul) for proposing and implementing this feature.

#### Deprecations in Ember CLI 2.16

Two new deprecations are introduces in Ember CLI 2.16:

* TODO
* TODO

For more details on the changes in Ember CLI 2.16 and detailed upgrade
instructions, please review the [Ember CLI  2.16.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.16.0).

### Upcoming Changes in Ember CLI 2.17

#### Internal assembler and strategies added

A strategy will describe a custom transform for input tree. An assembler will build the final output, given a list of transforms.

This internal refactor is going to be critical to our future tree-shaking endeavors.

Thanks to [@twokul](https://github.com/twokul) for proposing and implementing this feature.

#### Deprecations in Ember CLI 2.17

For more details on the changes in Ember CLI 2.17.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.17.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.17.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
