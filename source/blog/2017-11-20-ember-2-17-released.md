---
title: Ember 2.16-LTS, Ember 2.17 and 2.18 Beta Released
responsive: true
author: Ricardo Mendes, Brendan McLoughlin
tags: Releases, 2017, 2, 2.17, 2.18
---

*Updated on December 19, 2017 to include information about Ember.js 2.16-LTS.*

Today the Ember project is releasing Ember.js 2.16 LTS (a long-term support
release) and version 2.17.0 of Ember.js, Ember Data, and
Ember CLI.

This release also kicks off the 2.18 beta cycle for all sub-projects. We encourage
our community (especially addon authors) to help test these beta builds and
report any bugs before they are published as a final release in six weeks' time.
The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

Despite an initial delay on these releases, and an additional delay on this announcement,
the [Ember 3.0 Release Schedule](https://emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html#toc_the-ember-3-0-release-schedule) is unchanged.
This means that Ember 2.18 and the first beta of Ember 3.0 will be release on January 1st, 2018.

You can read more about our general release process here:

* [Release Dashboard](http://emberjs.com/builds/)
* [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
* [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
* [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Ember.js 2.16-LTS

Ember 2.16-LTS is the latest long-term support release. You can install it
by upgrading `ember-source` to `~2.16.2` in your `package.json`.

The LTS channel is designed for Ember users who would like to upgrade less
frequently, while still getting support from the project and the wider
ecosystem. At the same time, it allows addon authors to know which versions
of Ember to focus their effort on.

Per our [usual policy](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html),
Ember 2.16-LTS is released six weeks after the
[2.16.0 stable release](https://www.emberjs.com/blog/2017/10/11/ember-2-16-released.html).
This allows ample time to fix any reported regressions and ensures a rock
solid LTS release. It will continue to receive critical bugfixes for six
release cycles (roughly August 2018), and security patches for ten release
cycles (roughly Janurary 2019).

Meanwhile, Ember 2.12-LTS will continue to receive critical bugfixes for another
two release cycles (roughly Feburary 2018), and security patches for six release
cycles (roughly August 2018). Users of Ember 2.12-LTS should make use of this
overlapping period to transition over to Ember 2.16-LTS.

---

For more details on the changes landing in Ember.js 2.16-LTS, please review the
[Ember.js 2.16.2 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.16.2/CHANGELOG.md).

### Changes in Ember.js 2.17

Ember.js 2.17 is an incremental, backwards compatible release of Ember with
bugfixes and performance improvements.

Some of the more notorious fixes were:

* The `filter`/`map`/`sort` computed properties now [properly expand dependent keys using braces, like `items.@each.{prop1,prop2}`](https://github.com/emberjs/ember.js/pull/15855).
* Unhandles rejections are [no longer thrown twice](https://github.com/emberjs/ember.js/pull/15871).
* Passing `false` to `link-to`'s `activeClass` no longer [erroneously appends transitioning classes](https://github.com/emberjs/ember.js/pull/15265).
* Not passing all query params to `RouterService`'s `transitionTo` no longer [throws an error](https://github.com/emberjs/ember.js/pull/15613).

#### Deprecations in Ember 2.17

There were no new deprecations introduced in 2.17.

For more details on changes in Ember.js 2.17, please review the
[Ember.js 2.17.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.17.0).

### Upcoming Changes in Ember.js 2.18

Ember.js 2.18 will see the [removal of the `router.router` deprecations](https://github.com/emberjs/ember.js/pull/15754) and respective code.

#### Deprecations in Ember.js 2.18

One new deprecation was introduced in Ember.js 2.18:

* [`targetObject`](/deprecations/v2.x/#toc_code-targetobject-code).

For more details on the upcoming changes in Ember.js 2.18, please review the
[Ember.js 2.18.0-beta.1](https://github.com/emberjs/ember.js/releases/tag/v2.18.0-beta.1) and [Ember.js 2.18.0-beta.2](https://github.com/emberjs/ember.js/releases/tag/v2.18.0-beta.2) release pages.

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.17

Ember.js 2.17 will contain no new features. The changes introduced in
Ember Data 2.17 mostly focus on bug fixes, improved documentation and
build improvments to support changes in the ember-cli ecosystem and
fix a regression in support for build using Node 4.x.

#### Deprecations in Ember Data 2.17

No new deprecations are introduced in Ember Data 2.17.

For more details on changes in Ember Data 2.17, please review the
[Ember Data 2.17.0 release page](https://github.com/emberjs/data/releases/tag/v2.17.0).

### Upcoming changes in Ember Data 2.18

No major new features are planned for Ember Data 2.18. The Ember Data
2.18 is expected to focus on bug fixes around relationships. Some of
the bigger bug fixes are expected to be backported to older releases
durring the 2.18 beta cycle.

#### Deprecations in Ember Data 2.18

No new deprecations are planned in Ember Data 2.18.

For more details on the upcoming changes in Ember Data 2.18, please review the
[Ember Data 2.18.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.18.0-beta.1).

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

After running the upgrade command run `ember init` inside of the project
directory to apply the blueprint changes. You can preview those changes for
[applications](https://github.com/ember-cli/ember-new-output/compare/v2.15.0...v2.17.0)
and
[addons](https://github.com/ember-cli/ember-addon-output/compare/v2.15.0...v2.17.0).

### Changes in Ember CLI 2.17

Ember CLI previously displayed a warning when you removed `ember-cli-shims`, but
the dependency is no longer needed if none of your dependencies are using the
old shims and all of them are using `ember-cli-babel` 6.6.0 or above. Due to
that, the warning has been removed in the new release.

With the release of Ember 2.17, Ember 2.16 becomes an LTS release. To ensure
that the default `ember-try` configurations are up to date for new applications,
Ember 2.8 LTS was retired from the configuration and Ember 2.16 was added.

Ember CLI has been using headless Chrome for `ember test` for a while. In Ember
CLI 2.17 you now have the option to run your tests in a browser window using
`ember test --server`.

#### Node.js 9 Support

Per the Ember CLI Node.js version support policy, Ember CLI officially supports
Node 9 as the active Node.js version and will continue to do so throught its
[Active window](https://github.com/ember-cli/ember-cli/blob/026cefd5de36c0ae448883067450f51f2e127bbf/docs/node-support.md).

As part of this support, Ember CLI will no longer report warnings when run under
Node 9.

Node 7 will report warnings as its support period has terminated.

#### Other Notable Changes

* The build pipeline went through an internal refactoring to make it more
  flexible and composable.
* Fixed bug where the `app/` tree was being linted even if it was not present.
* Ensured `test-support` and `addon-test-support` trees are linted.

#### Deprecations in Ember CLI 2.17

No new deprecations were added in Ember CLI 2.17.

### Upcoming Changes in Ember CLI 2.18

The next version of Ember CLI will see some user experience improvements.

`crossdomain.xml` will no longer be generated for new applications. The file was
an artifact from a time when Flash was a popular vector for security exploits.
Now that that is no longer a concern, the file is not necessary.

The `livereload` URL was removed from the output of `ember server`. Users would
get confused because this URL is printed right away when running the development
server, but the actual URL the application is running under will only be shown
when the build is finished. Users would click the `livereload` URL and be
greeted with a blank page and errors.

If you used `npm link` with a dependency that had itself `npm link`
dependencies, they would be silently dropped in previous versions of Ember CLI.
This is now addressed.

#### Deprecations in Ember CLI 2.18

There are no deprecations planned for Ember CLI 2.18.

For more details on the changes in Ember CLI 2.18.0-beta.1 and detailed upgrade
instructions, please review the
[Ember CLI 2.18.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.18.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these
releases serve as a reminder that the Ember project would not have been possible
without your continued support. We are extremely grateful to our contributors
for their efforts.
