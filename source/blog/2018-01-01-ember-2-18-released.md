---
title: Ember 2.18 and 3.0 Beta Released
author: Ricardo Mendes, Matthew Beale, Brendan McLoughlin
responsive: true
tags: Releases, Version 2.x, Version 3.x, 2.18, 3.0, 2018
---

Today the Ember project is releasing version 2.18.0 of Ember.js, Ember Data,
and Ember CLI.

**After 2.5 years and 18 minor releases, Ember 2.18 marks the end of the project's 2.x series**.
To ensure a smooth upgrade path going into the 3.x series, 2.18 has been
declared an LTS candidate. In six weeks the latest 2.18 build will succeed
Ember 2.16.2 as the latest LTS release. As an LTS, it will
receive bug fixes until Ember 3.5 is released.

**Today we also kick off the 3.0 beta cycle for all sub-projects.** Ember 3.0
introduces no new features. Instead, it removes support for deprecated public APIs,
all of which have been deprecated since at least Ember 2.14 (released July 2017).
Extended support for removed Ember.js APIs will be provided via an
optional addon through Ember 3.4.

Ember 3.0 removes support for Microsoft Internet Explorer 9,
IE 10, and PhantomJS. This includes support for these platforms by Ember.js,
Ember Data, and Ember CLI. For more details about this decision see
[RFC 252](https://github.com/emberjs/rfcs/blob/master/text/0252-browser-support-changes.md)
and the discussion on [RFC PR #252](https://github.com/emberjs/rfcs/pull/252).

We need the help of the Ember community (especially addon authors) to test
the 3.0 beta builds and transition path for 2.x codebases. If you encounter any
unexpected changes while testing Ember 3.0 beta, especially in features not
previously marked as deprecated by 2.14, please open an issue on the appropriate repo.

You can read more about our detailed transition plans through Ember 3.5
in
[The Road to Ember 3.0](https://www.emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html)
and below.

You can read more about our general release process here:

* [Release Dashboard](http://emberjs.com/builds/)
* [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
* [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
* [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core of the Ember framework. It provides routing,
rendering, and dependency injection features.

### Changes in Ember.js 2.18

Ember.js 2.18 is an incremental and backwards compatible release which
includes minor bug fixes. No new features or public API deprecations are
introduced.

2.18 is light on changes because we want the final release of the 2.x cycle to
be as stable and battle-tested as possible. 2.18 is an LTS candidate, which means
that after six weeks it will be promoted to an LTS release. As an LTS release it
will receive bug fixes until Ember 3.5 is released and security patches until
Ember 3.9 is released.

2.18 is the final release of Ember.js to support IE9, IE10, and PhantomJS. It is
also the final release published for Bower.

"Intimate API" refers to API surface that maintainers never intended to become
public, but which still has some small use in the wild. 2.18.0 adds an intimate
API deprecation for passing `targetObject` to a component invocation. Support
for this API will be removed in Ember 3.5. See
[PR #14590](https://github.com/emberjs/ember.js/pull/14590) for more details.

For more details on changes in Ember.js 2.18, please review the
[Ember.js 2.18.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.18.0).

### Upcoming Changes in Ember.js 3.0

Ember.js 3.0 is the first release in the 3.x series. It introduces no new
public API or deprecations. Instead, it is comprised of bug fixes and the removal of
previously deprecated public API from the 2.x cycle. This release drops support
for IE9, IE10, and PhantomJS.

#### Removed APIs in Ember.js 3.0

The public APIs removed in 3.0-beta.1 do not yet represent the complete list
of removals planned for 3.0 stable.
For an exhaustive list of planned 3.0 removals and migration guidance see the
[Ember.js 2.x deprecation guide](https://www.emberjs.com/deprecations/v2.x/)
(any entry "until: 3.0") and the quest issue
[emberjs/ember.js#15876](https://github.com/emberjs/ember.js/issues/15876).

The list of public API removals included in 3.0-beta.1 are:

* The `{{render}}` helper has been removed. Any remaining usage should be
  [migrated to components](https://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper).
* `didInitAttrs` is removed and can be [replaced with `init`](https://www.emberjs.com/deprecations/v2.x/#toc_ember-component-didinitattrs)
* Declaring an observer with dependent keys after the callback is removed. Dependent keys should be passed before the callback as described in the [API docs](https://emberjs.com/api/ember/2.17/classes/@ember%2Fobject/methods/observer?anchor=observer).
* `Enumerable#contains` and `Array#contains` methods are removed. Instead usage should be [replaced with `includes`](https://www.emberjs.com/deprecations/v2.x/#toc_enumerable-contains).
* `{{link-to}}` unwrapped the `model` property from passed controllers. This
  behavior has been removed.
* Specifying `defaultLayout` on a component rather than [`layout`](https://www.emberjs.com/deprecations/v2.x/#toc_ember-component-defaultlayout) has been removed.
* `Ember.Handlebars.SafeString` has been removed. Instead, use [`Ember.String.htmlSafe`](https://www.emberjs.com/deprecations/v2.x/#toc_use-ember-string-htmlsafe-over-ember-handlebars-safestring) or the `import { htmlSafe } from '@ember/string'`.
* `Ember.K` has been removed. Usage should be replaced with [inline functions](https://www.emberjs.com/deprecations/v2.x/#toc_deprecations-added-in-2-12).
* Support for legacy initializers with two arguments (container, application)
  has been removed in favor of
  [a single argument of `application`](https://emberjs.com/deprecations/v2.x/#toc_initializer-arity).

Further planned public API removals for 3.0 include:

* Ember's legacy binding system, including `Ember.Binding` and the `fooBinding`
  micro-syntax. See the [migration guide](https://emberjs.com/deprecations/v2.x/#toc_ember-binding) for details.
* Ember's `Map`, `MapWithDefault`, and `OrderedSet` classes. These should be
  replaced with native features or with implementations from other libraries.

Please see [emberjs/ember.js#15876](https://github.com/emberjs/ember.js/issues/15876)
for more details (including about previously deprecated private or intimate
API removals) and updates during the beta cycle.

#### Transitioning to 3.x with ember-2-legacy

Public APIs removed in Ember.js 3.0 have each been ported to the
[ember-2-legacy](https://github.com/emberjs/ember-2-legacy) addon. This addon
makes it possible for applications to adopt 3.0 even if they still
require features unsupported by the core of the framework.

This addon will not include support for removed intimate or private APIs, nor
will it enable support for IE9, IE10, PhantomJS, or Bower. In [The Road to Ember
3.0](https://www.emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html#toc_transitioning-to-3-0)
we committed to support this addon through Ember.js 3.4, the first LTS
candidate of the 3.x cycle.

#### Other Ember.js 3.0 Changes

Ember.js 3.0 removes support for IE9,
IE 10, and PhantomJS. For more details about this decision see
[RFC 252](https://github.com/emberjs/rfcs/blob/master/text/0252-browser-support-changes.md)
and the discussion on [RFC PR #252](https://github.com/emberjs/rfcs/pull/252).

Finally, Ember.js 3.0 will not be published for Bower.

For more details on the upcoming changes in Ember.js 3.0, please review the
[Ember.js 3.0.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v3.0.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.18

Ember Data 2.18 contains no new features. The changes introduced in
Ember Data 2.18 mostly focus on bug fixes and improved documentation.

One public API deprecation targeting **Ember Data 4.0** is introduced in Ember Data 2.18:

* Support for "production-like" values of `EMBER_ENV` [will be removed](https://github.com/emberjs/data/pull/5239).
For example, custom production names like `production-qa` should be replaced with `production`

For more details on changes in Ember Data 2.18, please review the
[Ember Data 2.18.0 release page](https://github.com/emberjs/data/releases/tag/v2.18.0).

### Upcoming changes in Ember Data 3.0

Ember Data 3.0 contains major improvements in the testing blueprints
that are shipped with Ember Data and used by Ember CLI when you use
`ember generate` `model`, `adapter`, or `serializer`.  Big thanks to
[@alexander-alvarez](https://github.com/alexander-alvarez) for all his
work on the [QUnit Blueprints Quest
Issue](https://github.com/emberjs/data/issues/5292).

There are no deprecations introduced in Ember Data 3.0.

For more details on the upcoming changes in Ember Data 3.0, please review the
[Ember Data 3.0.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v3.0.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Changes in Ember CLI 2.18

Ember CLI 2.18 is an incremental release featuring bug fixes and improvements.
This release does not introduce any new deprecations.

#### ESLint configuration changes

Newly generate Ember applications will now have only a single `.eslintrc.js`
file. This file uses the "overrides" feature of ESLint to customize rules
appropriately for test or Node files.

For more details see:

* [ember-cli/ember-cli#7443](https://github.com/ember-cli/ember-cli/pull/7443) Use overrides for a single `.eslintrc.js`.
* [ember-cli/ember-cli#7455](https://github.com/ember-cli/ember-cli/pull/7455) Add eslint-plugin-ember to default linting config.

#### Node 7 removed from CI testing matrix

According to the [Node support policy](https://github.com/ember-cli/ember-cli/blob/master/docs/node-support.md) of the Ember CLI project,
Node 7 is removed from the testing matrix.
If you are developing an application using Ember CLI, it is recommended that you upgrade your Node to one of the [active LTS](https://github.com/nodejs/Release) versions to guarantee security updates.

#### Addon dependencies when using npm link

Previously, if you were npm-linking an addon that had itself npm-linked a dependency, Ember CLI would fail to find it. This is now fixed.

#### `crossdomain.xml` removed for new applications

`crossdomain.xml` was originally introduced to limit vulnerabilities when
using the Flash Player.
It did this by declaring which hosts the Flash Player could connect to outside
the one hosting the file.
Browsers have since disabled Flash for security reasons, rendering the file moot.
Ember CLI 2.18 will no longer generate the file for new applications.

For more details on the changes in Ember CLI 2.18 and detailed upgrade
instructions, please review the [Ember CLI 2.18.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.18.0).

### Upcoming Changes in Ember CLI 3.0

Ember CLI 3.0 will feature a much improved README for the addon blueprint.
The improvements include:

* An automatically generated "Installation" section
* An empty "Usage" section
* A "License" section
* [Setext headings](http://spec.commonmark.org/0.28/#setext-heading) to emphasize sections when in raw text mode.

Ember CLI 3.0 does not introduce any new deprecations.

For more details on the changes in Ember CLI 3.0.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.0.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.0.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
