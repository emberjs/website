---
title: Ember 2.10 and 2.11 Beta Released
responsive: true
author: Godfrey Chan, Brendan McLoughlin, Nathan Hammond
tags: Releases, 2016, 2, 2.10, 2.11
---

Today, the Ember project is releasing Ember.js, Ember Data and Ember CLI
version 2.10.0.

This also kicks off the 2.11 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The
[ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

Starting with this release, we will be publishing a single, unified release
blog post summarizing all the changes for all three sub-projects in one place.
You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 2.10

Ember.js 2.10 is the first release to include [Glimmer 2](http://emberjs.com/blog/2016/07/29/announcing-the-glimmer-2-alpha.html),
a ground-up rewrite of Ember's rendering engine.

Despite all the changes that took place under-the-hood, we are committed to
making this a **drop-in, completely backwards compatible upgrade for virtually
all Ember.js users**. Over the past few months, we have been [hard at work](http://emberjs.com/blog/2016/10/17/ember-2-9-released.html#toc_ember-js-2-10-beta)
to make this a reality.

Thanks to everyone in the community who took the time to test their apps and
addons against the Glimmer 2 alpha and beta builds, this has been one of the
most rigorously tested releases in the history of the Ember project. We are
quite confident that upgrade will go smoothly for most apps. However, if you
encounter any issues, please do report them to the [issue tracker](https://github.com/emberjs/ember.js/issues/).

While this release is focused on compatibility and does not expose any new
capabilities, the new rendering engine has unlocked a lot of [new frontiers](http://emberjs.com/blog/2016/07/29/announcing-the-glimmer-2-alpha.html#toc_a-whole-lot-more-to-come)
for us, creating a much better foundation for adding new features as well as
room for future performance impovements. With the initial integration now out
of the way, we are quite excited to return our efforts to those areas in
upcoming releases.

#### Other notable changes

In addition to the Glimmer 2 integration, a few other notable changes are also
included in this release.

First, [Trent Willis](https://github.com/trentmwillis), [Nathan Hammond](https://github.com/nathanhammond)
and [Alex Speller](https://github.com/alexspeller) have contributed a series of
patches to address some long-standing issues and edge cases in the routing
layer, particularly in the area of query params.

Second, thanks to [Robert Jackson](https://github.com/rwjblue), we now use
[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
to [store object metadata](https://github.com/emberjs/ember.js/pull/13783) on
browsers that supports them. A pleasant side-effect of this internal change is
that Ember no longer adds an `__ember_meta__` property to every object.

Finally, it has come to our attention that it is quite common for developers to
accidentally mutate the arguments passed into a helper. This is problematic as
these objects are often shared or reused, causing subtle issues that are very
difficult to debug.

To help track down these kind of issues, these objects are now [frozen](https://github.com/emberjs/ember.js/pull/14244)
in the debug build before they are passed into helpers. As a result, you will
get an error if you attempt to modify these objects directly. It is recommended
that you clone these objects (e.g. using `Object.assign` and `Array#slice`)
before making any modifications to them.

(It has been brought to our attention that the last change might have an
[unintended consequence](https://github.com/emberjs/ember.js/pull/14649).
A fix is being worked on by [Matthew Beale](https://github.com/mixonic). Please
refer to the linked issue for a detailed description and suggested workaround.)

For more details on the changes in Ember.js 2.10, please review the
[Ember.js 2.10.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.10.0).

### Upcoming changes in Ember.js 2.11

Currently, no new features are planned for 2.11. However, there are a few
notable changes:

- Similar to the change to helper arguments, concatenated properties (such as
  `classNames` and `classNameBindings`) are now [frozen](https://github.com/emberjs/ember.js/pull/14389)
  in debug builds to help track down unintended mutations.

- The legacy `render` helper (i.e. `{{render 'foo'}}`) has been [deprecated](https://github.com/emberjs/ember.js/pull/14441).

- The private `Component#renderToElement` API has also been [deprecated](https://github.com/emberjs/ember.js/pull/14482).

For more details on the upcoming changes in Ember.js 2.11, please review the
[Ember.js 2.11.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.11.0-beta.1).

---

## Ember Data

Ember Data is the offical data persistence library for Ember.js applications.

### Changes in Ember Data 2.10

Ember Data 2.10 represents the work of more than 10 direct contributors with
over 20 commits.

There have been no user facing changes in Ember Data 2.10. Under the
hood, [Chris Thoburn](https://github.com/runspired) has instrumented
Ember Data with internal tools making it easier to track the
performance of Ember Data. This instrumentation is stripped from
production builds and should have no impact on existing
applications.

Chris also
[improved the messaging](https://github.com/emberjs/data/pull/4578)
around assertions and warnings when an adapter responds with no `id`
for a record.

For more details on the changes in Ember Data 2.10, please review the
[Ember Data 2.10.0 release page](https://github.com/emberjs/data/releases/tag/v2.10.0).

### Upcoming changes in Ember Data 2.11

Ember Data 2.11 is already shaping up to be a big release with many
performance and documentation improvements.

#### HasMany Computed Property Keys

One of the performance improvements included in Ember Data
2.11 fixes an issue where changes to the records of a
`DS.hasMany()` caused unnecessary work. As a result,
Ember Data would over-eagerly invalidate computed
properties that depended on these `hasMany` relationships. Due to the
nature of the fix application code depending on a relationship array
without watching the contents of that array may need to be updated. For
example you may need to update computed property keys that depended on
`record.someHasManyRelationshipName` to `record.someHasManyRelationshipName.[]`.

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

#### Move `ds-improved-ajax` out of `beta` channel

The `ds-improved-ajax` implemented in
[PR #3099](https://github.com/emberjs/data/pull/3099) aims to provide
public hooks on the `rest` adapter for customizing requests. For example
to specify the HTTP method or
provide custom HTTP headers per request. This feature has been available
in beta builds since the 2.8 beta cycle.

Unfortunately, this feature slipped into the code base without going
though a proper RFC process. Despite being enabled in the beta channel
for a while now, we decided that it should be disabled again in favour
of a feature which has gone though the RFC process and benefited from
valuable community feedback.

We are aware that it is quite rare for a feature to be backed out from
the beta channel but we consider the ability to do so a strength of
our release process. We would like to thank everyone who took the time
to test their applications against the beta channel and we would
highly appreciate your feedback on the proposed replacement to this
functionality in
[RFC #171](https://github.com/emberjs/rfcs/pull/171).

For more details on the upcoming changes in Ember Data 2.11, please review the
[Ember Data 2.11.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.11.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data! To upgrade
your projects using `yarn` run `yarn upgrade ember-cli`. To upgrade your
projects using `npm` run `npm install --save-dev ember-cli`. After running the
upgrade command run `ember init` inside of the project directory to apply the
blueprint changes. You can view those changes for [applications here](https://github.com/ember-cli/ember-new-output/compare/v2.9.1...v2.10.0)
and [addons here](https://github.com/ember-cli/ember-addon-output/compare/v2.9.1...v2.10.0).

### Changes in Ember CLI 2.10

Ember CLI 2.10 no longer supports Node.js 0.10 per the
[Ember Node.js LTS Support policy](http://emberjs.com/blog/2016/09/07/ember-node-lts-support.html).
Further, it is the last release which will officially support Node.js 0.12
which will be [removed from support at the end of this year](https://github.com/nodejs/LTS#lts-schedule).
Please make sure you begin your migration to a newer version of Node.js as soon
as possible.

#### Sorting of `package.json`

In order to guarantee consistency with `npm` and other tools Ember CLI now
[sorts `package.json` in accordance with the upstream patterns](https://github.com/ember-cli/ember-cli/pull/6272).
This may result in changes in execution order of the addons in your application
which should be non-breaking. If you experience issues you will
[need to specify `before` and/or `after` in your addon](https://ember-cli.com/extending/#configuring-your-ember-addon-properties).

#### Concatenation

Concatenation of assets has been implicit based upon file-system ordering. An
update to `broccoli-concat` which changed the walk order of the file system to
guarantee consistency and stable concatenation broke the implicit reliance we
had on that ordering. To ensure that we remain backwards compatible
[we have changed our invocation pattern to reproduce the intended behavior](https://github.com/ember-cli/ember-cli/pull/6081).
Child modules without specific ordering will now be sorted lexicographically
inside of your assets.

We also moved to a [system-independent line separator](https://github.com/ember-cli/ember-cli/issues/6300)
to guarantee that builds are reproducible across different operating systems.

#### `npm` Upgrade

[Dan Freeman](https://github.com/dfreeman) has [updated our bundled `npm` dependency](https://github.com/ember-cli/ember-cli/pull/6306)
to `npm@3`. This will change the resulting `node_modules` folder layout inside
of your application when you run `ember install`. This will likely only cause
problems if you tried to guess at the path to a module based upon install
behavior. If you need to identify the path to a module inside of the `node`
JavaScript world be sure you're using `require.resolve('module-name');`.

#### Testing Addons

Ember CLI 2.10 removes Ember.js 1.13 from the default testing matrix in the
addon blueprint. Given that we now have two LTS releases in the Ember.js 2.x
series, we no longer feel that supporting Ember.js 1.13 is a reasonable
default for newly-created addons. You may continue to support Ember.js 1.13 in
your addons (and in most cases it's simple to do) by adding it back into the
testing matrix.

For more details on the changes in Ember CLI 2.10 and detailed upgrade
instructions, please review the [Ember CLI 2.10.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.10.0).

### Upcoming changes in Ember CLI 2.11

In our continous incremental progress toward making `bower` optional inside of
Ember CLI we have moved to include Ember.js itself via
[`ember-source`](https://www.npmjs.com/package/ember-source)–provided via `npm`.
In 2.11 we will no longer have any packages provided by `bower` in a brand
new Ember.js application!

Ember CLI 2.11 will not officially support Node.js 0.12 per the
[Ember Node.js LTS Support policy](http://emberjs.com/blog/2016/09/07/ember-node-lts-support.html).
Please make sure you begin your migration to a newer version of Node.js as soon
as possible.

We have a litany of other smaller improvements in this release:

- We bundle a new and improved version of `ember-welcome-page`, the learning
team's addon for providing a quick start introduction for users.
- We [watch the `vendor` folder by default](https://github.com/ember-cli/ember-cli/pull/6436),
making rebuilds work for changes in that directory.
- Stefan Penner made it so we do a better job at [cleanup upon exit of Ember CLI](https://github.com/ember-cli/ember-cli/pull/6423)
preventing pollution of the `tmp` folder inside of your applications.
- Robert Jackson dramatically [reduced the number of merge steps](https://github.com/ember-cli/ember-cli/pull/6453) inside of the build,
speeding up the build process.

For more details on the changes in Ember CLI 2.11.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.11.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.11.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
