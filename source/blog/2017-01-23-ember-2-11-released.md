---
title: Ember 2.11 and 2.12 Beta Released
responsive: true
author: Godfrey Chan, Nathan Hammond, Brendan McLoughlin
tags: Releases, 2017, 2.11, 2.12, Version 2.x
---

*Updated on December 19, 2017 to include information about Ember.js 2.4-LTS.*

Today, the Ember project is releasing Ember.js, Ember Data and Ember CLI
version 2.11.0.

This also kicks off the 2.12 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The
[ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

This release also marks the conclusion of critical bugfixes support for Ember.js
2.4-LTS and we strongly recommend LTS users to migrate to 2.8-LTS immediately.
2.4-LTS will continue to receive security patches for another four releases
(around July 2017). 2.4-LTS was released in April of 2016, and was the first
Long-Term Support release of Ember.js. We're pleased with the impact of LTS
releases on the Ember project and look forward to continuing the practice.

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

Among other improvements and thanks to the work of [Gavin Joyce](https://github.com/gavinjoyce/),
this release provides a [much improved](https://github.com/emberjs/ember.js/pull/14723)
"backtracking re-render" assertion message. The new message provides actionable
information that can help track down the source of a backtracking re-render.
If you had previously encountered this assertion while
upgrading to 2.10, we recommend giving 2.11 a try.

Additionally, the [last-minute issue regarding frozen helper arguments](https://github.com/emberjs/ember.js/pull/14649)
mentioned in the [2.10 blog post](/blog/2016/11/30/ember-2-10-released.html) has been
fixed in this release.

Starting with 2.11, Ember.js releases will be available on npm via the
[`ember-source`](https://www.npmjs.com/package/ember-source) package. Please
refer the Ember CLI section below for more details.

Finally, following the mitigation section in the recent [security incident
report](/blog/2016/12/14/security-incident-aws-s3-key-exposure.html), this is
also the first Ember.js release to be published by our automated build system.

#### Other Notable Changes

- Concatenated properties (such as `classNames` and `classNameBindings`) are
  now [frozen](https://github.com/emberjs/ember.js/pull/14389) in debug builds
  to prevent unintended and unsupported mutations.

- The legacy `render` helper (i.e. `{{render 'foo'}}`) has been deprecated
  ([issue](https://github.com/emberjs/ember.js/pull/14441), [deprecation
  guide](http://emberjs.com/deprecations/v2.x/#toc_code-rendertoelement-code)).

- The private `Component#renderToElement` API has also been deprecated
  ([issue](https://github.com/emberjs/ember.js/pull/14482), [deprecation
  guide](http://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper)).

For more details on the changes in Ember.js 2.11, please review the
[Ember.js 2.11.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.11.0).

### Upcoming Changes in Ember.js 2.12

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
  deprecates the `Ember.K` utility function. See pull request [#14751](https://github.com/emberjs/ember.js/pull/14751)
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

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.11

Ember Data 2.11 represents the work of 15 direct contributors
and over 70 commits.

Ember Data 2.11 continues to expand on the performance improvements
started in Ember Data
2.10. [Chris Thoburn](https://github.com/runspired) and
[Stefan Penner](https://github.com/stefanpenner) contributed several
pull requests that allow Ember Data to defer work until it is needed by an
application or avoid the work all together if it is never
needed. Overall the process of pushing records into the store in Ember
Data 2.11 is about twice as fast as it was in 2.10.

The Ember Data 2.11 release concludes an effort to audit the existing
API docs for Ember Data. The Ember Data community has checked all of
the API docs and ensured they are clear and contain code examples of
how to use the API. You can see the improved documentation
[here](http://emberjs.com/api/data/).

#### Deprecations in Ember Data 2.11

Ember Data now issues deprecation warnings for
`store#serialize()`. Instead, it is recommended that you use
`record.serialize()` in place of
`store.serialize(record)`.

`store#lookupAdapter()` and `store#lookupSerializer()` have also been
deprecated starting in Ember 2.11. These methods were never publicly
documented. In their place we recommend you use `store#adapterFor()`
and `store#serializerFor()` respectively.

`store#recordIsLoaded()` is deprecated in favor of
`store#hasRecordForId()`, as the logic in these two methods has been
identical since
[March 2015](https://github.com/emberjs/data/pull/2875).

All of the deprecated methods mentioned above will be supported until
Ember Data 3.0. Until then they will log a deprecation warning to
encourage use of the recommended replacement APIs.

#### Issues with Ember Data Model Fragments

Due to internal refactoring, Ember Data 2.11 has
compatibility issues with older versions of the popular
[Ember Data Model Fragments](https://www.npmjs.com/package/ember-data-model-fragments)
addon. If you are using this addon it
is recommended that you upgrade to
[Ember Data Model Fragments 2.11](https://github.com/lytics/ember-data-model-fragments/pull/227)
at the same time as you upgrade Ember Data.

For more details on the changes in Ember Data 2.11, please review the
[Ember Data 2.11.0 release page](https://github.com/emberjs/data/releases/tag/v2.11.0).

### Upcoming changes in Ember Data 2.12

Ember Data 2.12 contains further performance improvements, and is
looking to be the fastest ever release of Ember Data.

A new `serializeId()` method has been added to `JSONSerializer`,
`RESTSerializer` and `JSONAPISerializer`. This is useful if you are
working with a backend that requires your ids to be something other
than a string.

```app/serializers/application.js
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  serializeId(snapshot, json, primaryKey) {
    var id = snapshot.id;
    json[primaryKey] = parseInt(id, 10);
   }
});
```

#### Deprecations in Ember Data 2.12

There are no planned deprecations for Ember Data 2.12.

For more details on the upcoming changes in Ember Data 2.11, please review the
[Ember Data 2.12.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.12.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.10.0...v2.11.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.10.0...v2.11.0).

### Changes in Ember CLI 2.11

Ember CLI 2.11 no longer supports Node.js 0.12 per the
[Ember Node.js LTS Support policy](http://emberjs.com/blog/2016/09/07/ember-node-lts-support.html).
This also applies to a litany of sub-projects in the Ember community. Please
upgrade your Node.js version. We recommend adopting the most-recently-released
Node.js LTS.

Following the mitigation section in the recent [security incident
report](/blog/2016/12/14/security-incident-aws-s3-key-exposure.html) we have
begun the process of migrating repositories in the [ember-cli GitHub organization](https://github.com/ember-cli)
to be published automatically via their automated build systems. Ember CLI
itself has not yet been migrated and as such continues to follow our
[manual release process](https://github.com/ember-cli/ember-cli/blob/master/RELEASE.md).

#### Ember No Longer Supplied Via `bower`

We've been preparing for this moment for over a year now, but using `bower` is
now completely optional inside of Ember CLI! Beginning with 2.11 we now provide
Ember via the [`ember-source` npm package](https://www.npmjs.com/package/ember-source).
This means that when you run `ember new` after installing 2.11 you can expect
to have an empty (but present) `bower.json` file. Further work in 2.12 has been
done to remove `bower` itself as a dependency. Addon developers please ensure
that you're able to successfully test your addons with `ember-try`.

#### Updated `ember-welcome-page`

The Learning Team has spent an incredible amount of time and energy improving
the new user experience. As part of that we've updated the `ember-welcome-page`
addon to the newest version which they have released. We're calling this out
because it adds `application.hbs` back into the default blueprint and includes
assets in a non-production build. Make sure that you always ship a _production_
build when you publish your application; otherwise you will also include the
assets from `ember-welcome-page` into your application.

#### Other Notable Changes

We have a litany of other smaller improvements in this release:

- We [watch the `vendor` folder by default](https://github.com/ember-cli/ember-cli/pull/6436),
making rebuilds work for changes in that directory. This may have performance
consequences, please monitor the resource consumption in your applications to
ensure that we have not regressed.
- Stefan Penner and David Hamilton made it so we do a better job at
[cleanup upon exit of Ember CLI](https://github.com/ember-cli/ember-cli/pull/6423).
This work prevents the pollution of the `tmp` folder inside of your applications.
- Robert Jackson dramatically [reduced the number of merge steps](https://github.com/ember-cli/ember-cli/pull/6453)
inside of the build, speeding up the build process.

For more details on the changes in Ember CLI 2.11 and detailed upgrade
instructions, please review the [Ember CLI 2.11.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.11.0).

### Upcoming Changes in Ember CLI 2.12

We adopted the standard six week release cycle for Ember CLI shortly following
EmberConf 2016. This constant cadence allows us to get the improvements we've
collectively been working on into our applications. Ember CLI 2.12 will be the
most work we've ever had in a single release cycle and we're ecstatic to get all
300+ commits (not including merges or upstream changes!) into your hands.

#### Babel

We've made changes in the way you configure Babel in your applications and also
now require that addons which need Babel transpilation supply their own
`ember-cli-babel` dependency. The root application is _no longer_ wholly
responsible for the transpilation of all dependent addons. There is a
deprecation message which should guide you through the steps to make the
necessary changes in your application. This also means that addons themselves
are responsible for transpiling their code into AMD modules.

We no longer overload the `babel` key inside of `ember-cli-build.js` to
conditionally use certain arguments for `babel` and others for
`ember-cli-babel`. This is categorically better, and we've provided deprecation
messages to help guide you to the new correct usage pattern.

Rather than trying to walk through how to make these changes, please test this
out during the beta period and let us know if the messages are able to guide you
to the newly correct setup.

#### ESLint All The Things!

Tobias Bieniek has been on a mission; we've now completed the move to ESLint
as the newly recommended linting tool for Ember applications. After upgrading to
Ember CLI 2.12 and running `ember init` you will be presented with options to
remove the existing `ember-cli-jshint` and rules and adopt `ember-cli-eslint`.
The process should be relatively straightforward, though you'll have to migrate
your styling rules from JSHint to ESLint. Please test it out and let us know how
it works in your applications during the beta period.

#### Nested Addon `preprocessTree` and `postprocessTree` Invocation

In an oversight, we did not invoke `preprocessTree` and `postprocessTree`
against addon trees which were nested inside of other addons preventing them
from interacting with their parent addons in the ideal manner. This has been
fixed but it is possible that this bug-fix will change the build outcome of your
applications. We manually reviewed all public addons and didn't identify any
likely issues, please report back with any problems you discover in your private
addons.

#### Performance

One of the major themes for this release cycle has been a focus on the build
performance of Ember CLI. We've added instrumentation to understand where we're
spending time and have begun the consistent incremental work required to bring
build times down without changing the build output. This has been a team effort
with contributions from David Hamilton, Robert Jackson, Stefan Penner, Trent
Willis, and more.

#### Global `npm` Usage

Rather than bundling our own copy of `npm` into Ember CLI we now delegate to the
system-installed version of `npm`. This should dramatically reduce the install
time for your `node_modules` directory. Note that we have set the minimum
supported version to be `npm@3`. If you need to update the version on your
system you can do so by running `npm install -g npm`.

#### Developers, Developers, Developers, Developers

We've made a tremendous number of behind-the-scene changes to Ember CLI in
2.12. Our goal is to make contributing to Ember CLI simpler and quicker. Some
of the improvements include:

- We've adopted ESLint for Ember CLI itself, painted a few bikesheds, and
now have a much more consistent codebase. PR comments around code style should
come with an associated style rule change to enforce that behavior so that it
is consistent given the multitude of reviewers we have.
- Now that we have dropped support for Node.js 0.12 we have begun adoption of
all of the nice things we weren't previously able to use; most-specifically
**ES6 classes**! We've modified `core-object` as well in order to make it
compatible with ES6 classes.
- We've adopted Yarn for development of Ember CLI. We now use it for CI and are
using this to lay a foundation for making `yarn` a default and _supported_
option for package management in applications.
- By virtue of a lot of work in CI and on caching test run times have been
reduced to seven minutes. Check out [PackageCache](https://github.com/ember-cli/ember-cli/blob/master/tests/helpers/package-cache.js)
which got us most of the reward. More work is being done to allow offline tests.
- We've introduced an experiments API which allows us to incrementally land
invasive changes behind an experiment flag. The experiment flag prevents their
use except on the `canary` branch. This allows us to experiment with API shape
and understand problems without committing to publishing a feature. Currently
the instrumentation changes are behind an experiment flag which allows us to
understand the needs and write a [much more complete RFC](https://github.com/ember-cli/rfcs/pull/90).

We will continue this effort in upcoming releases.

#### Other Notable Changes

- `ember new` and `ember addon` correctly support the `--directory` argument and
allow you to specify an existing empty directory.
- Removed `ember-data` and `ember-cli-app-version` from the default
`ember addon` blueprint.
- Duplicate calls to `.import('assetname.js)'` will no longer include the asset
in the output file twice.
- Given that we no longer require `bower` in the default scenario, we now lazily
install it into your application the first time that you need it.
- Krati Ahuja split and removed the internal `serve-files` addon which was
responsible for serving of assets in `ember serve`. This enables progress on
FastBoot.

For more details on the changes in Ember CLI 2.12.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.12.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.12.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
