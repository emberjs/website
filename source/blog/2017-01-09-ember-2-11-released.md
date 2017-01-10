---
title: Ember 2.11 and 2.12 Beta Released
author:
tags: Releases
---

Today, the Ember project is releasing Ember.js, Ember Data and Ember CLI
version 2.11.0.

This also kicks off the 2.12 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 2.11

Ember.js 2.11 continues to build on the foundation of Glimmer 2, incorporating
many bug fixes to improve compatibility and stability since 2.10.

Among other improvements, thanks to the work of [Gavin Joyce](https://github.com/gavinjoyce/),
this release provides a [much improved](https://github.com/emberjs/ember.js/pull/14723)
"backtracking re-render" assertion message that provides more helpful and
actionable information. If you had previously encountered this assertion while
upgrading to 2.10, we recommend giving 2.11 a try as this should help locate
the root cause much more quickly.

Additionally, the [last-minute issue](https://github.com/emberjs/ember.js/pull/14649)
mentioned in the [2.10 blog post](/blog/2016/11/30/ember-2-10-released.html) has been
fixed in this release as well.

Starting from this release, Ember.js releases will be available on npm via the
[`ember-source`](https://www.npmjs.com/package/ember-source) package. Please
refer the Ember CLI section below for more details.

Finally, following the mitigation section in the recent [security incident
report](/blog/2016/12/14/security-incident-aws-s3-key-exposure.html), this is
also the first Ember.js release to be published by our automated build system.

#### Other notable changes

- Concatenated properties (such as `classNames` and `classNameBindings`) are
  now [frozen](https://github.com/emberjs/ember.js/pull/14389) in debug builds
  to help track down unintended mutations.

- The legacy `render` helper (i.e. `{{render 'foo'}}`) has been [deprecated](https://github.com/emberjs/ember.js/pull/14441).

- The private `Component#renderToElement` API has also been [deprecated](https://github.com/emberjs/ember.js/pull/14482).

For more details on the changes in Ember.js 2.11, please review the
[Ember.js 2.11.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.11.0).

### Upcoming changes in Ember.js 2.12

Ember.js 2.12 will serve as the basis of the next [LTS release](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)
and includes additional stability, compatibility and performance improvements.

In addition to those improvements, it also implemented several changes arising
from the [RFC](https://github.com/emberjs/rfcs) process:

- [RFC #150](https://github.com/emberjs/rfcs/blob/master/text/0150-factory-for.md)
  adds `factoryFor` as a public API to replace the widely used `_lookupFactory`
  private API, which is now deprecated. In addition to providing a public API
  for a sorely needed feature, it also unlocks the opportunity to eliminate one
  of the major performance hotspot in the Ember.js object-model. This will
  happen in a future release once the community has had the chance to migrate to
  the new API. See pull request [#14360](https://github.com/emberjs/ember.js/pull/14360)
  for additional details.

- [RFC #178](https://github.com/emberjs/rfcs/blob/master/text/0178-deprecate-ember-k.md)
  deprecates the `Ember.K` utility function. See pull request [#14360](https://github.com/emberjs/ember.js/pull/14360)
  for additional details.

- [RFC #191](https://github.com/emberjs/rfcs/blob/master/text/0191-deprecate-component-lifecycle-hook-args.md)
  deprecates the private arguments passed to the component lifecycle hooks
  (`didInitAttrs`, `didReceiveAttrs` and `didUpdateAttrs`). Please note that
  this only deprecates the usage of the arguments passed to this hook, not the
  hooks themselves. See pull request [#14711](https://github.com/emberjs/ember.js/pull/14711)
  for additional details.

For more details on the upcoming changes in Ember.js 2.12, please review the
[Ember.js 2.12.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.12.0-beta.1).

---

## Ember Data

Ember Data is the offical data persistence library for Ember.js applications.

### Changes in Ember Data 2.11

TBK

For more details on the changes in Ember Data 2.11, please review the
[Ember Data 2.11.0 release page](https://github.com/emberjs/data/releases/tag/v2.11.0).

### Upcoming changes in Ember Data 2.12

TBK

#### Deprecations in Ember Data 2.12

TBK

For more details on the upcoming changes in Ember Data 2.11, please review the
[Ember Data 2.12.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.12.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data! To upgrade
your projects using `yarn` run `yarn upgrade ember-cli`. To upgrade your
projects using `npm` run `npm install --save-dev ember-cli`. After running the
upgrade command run `ember init` inside of the project directory to apply the
blueprint changes. You can view those changes for [applications here](https://github.com/ember-cli/ember-new-output/compare/v2.10.0...v2.11.0)
and [addons here](https://github.com/ember-cli/ember-addon-output/compare/v2.10.0...v2.11.0).

### Changes in Ember CLI 2.11

Ember CLI 2.11 no longer supports Node.js 0.12 per the
[Ember Node.js LTS Support policy](http://emberjs.com/blog/2016/09/07/ember-node-lts-support.html).
Please make sure you begin your migration to a newer version of Node.js as soon
as possible.

TBK

For more details on the changes in Ember CLI 2.11 and detailed upgrade
instructions, please review the [Ember CLI 2.11.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.11.0).

### Upcoming changes in Ember CLI 2.12

TBK

For more details on the changes in Ember CLI 2.12.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.12.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.12.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
