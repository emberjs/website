---
title: Ember 3.0 Released
responsive: true
author: Matthew Beale
tags: Releases, 2018, Version 3.x, 3.0
---

Today the Ember project is releasing version 3.0.0 of Ember.js, Ember Data, and
Ember CLI. Ember 3.0 doesn't introduce any new functionality, instead it focuses
the framework by removing long-deprecated APIs and support for legacy platforms.
Our plans for Ember 3.0 were announced in October 2017 in [The Road to Ember
3.0](https://www.emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html).

We're committed to giving every Ember codebase a path into the 3.x series.  With
this goal in mind, we froze API deprecations targeting Ember 3.0 back in July
2017 (Ember 2.14). We've provided a detailed [deprecation
guide](https://www.emberjs.com/deprecations/v2.x/) for all APIs removals, and
additionally extracted most of the features removed in 3.0 into an addon.

This blog post will help you understand what is being removed in 3.0 and what
migration strategies are available. If you're interested in trying Ember for the
first time today, get started by running:

```bash
yarn global add ember-cli # Or npm install -g ember-cli
ember new my-project
cd my-project
ember serve # Then visit http://localhost:4200
```

Additionally, today the 3.1 beta cycle begins for these same projects. We've
split out the beta release details into a separate [Ember 3.1-beta blog
post](/blog/2018/02/16/ember-3-1-beta-released.html) to keep this
one focused on app migration steps and guidance.

Finally, today we're also promoting Ember 2.18 to LTS ([2.18 release
post](/blog/2018/01/01/ember-2-18-released.html)). This is the last release of
Ember with support for IE9, IE10, PhantomJS, and for use via Bower. Per our LTS
policy, it will be supported with bug fixes for the next 5 release cycles
(September 2018) and security patches for the next 9 cycles (February 2019).

### Browser Support in 3.0

Ember 3.0 (including Ember.js, Ember Data, and Ember CLI) drops support for
Internet Explorer 9, IE 10, and PhantomJS. If you still require support for
these browsers, Ember 2.18-LTS will be supported with bug fixes until September
2018 and security fixes until February 2019 in alignment with our [LTS
policy](/blog/2016/02/25/announcing-embers-first-lts.html#toc_the-lts-release-process).

If your application requires support for these browsers and you would like to
eventually adopt Ember 3.x, we encourage you to use the LTS window to plan a
transition for your users in the coming months.

The first LTS of Ember 3.x will be Ember 3.4. Any migration steps we describe
for moving between Ember 2.18 and 3.0 will also apply to 2.18-LTS and 3.4-LTS.

For further details about this decision see [RFC #252](https://github.com/emberjs/rfcs/blob/master/text/0252-browser-support-changes.md)
and [The Road to Ember 3.0: Browser Support in
3.0](https://www.emberjs.com/blog/2017/10/03/the-road-to-ember-3-0.html#toc_browser-support-in-3-0).

### Global Build and Bower Support in 3.0

Ember 3.0 completes a re-orientation of the project away from script tag driven
development. This follows a general trend in JavaScript, where frameworks and
applications have embraced ahead of time (AOT) compilation to improve
performance and development experience (DX).

Nearly all Ember applications already use Ember CLI for development, and most
also use Ember CLI addons to bring in libraries and build-time features. As of
their 3.0 releases, both Ember.js and Ember Data are only available as Ember CLI
addons. This makes the codebases easier to maintain, and allows improvements we
make to Ember's packaging to apply to 3rd party addons.

The legacy, script tag driven use of Ember via a "globals" build is removed in
3.0.

Builds of Ember.js and Ember Data for use with a `<script>` tag are no longer
published as of 3.0. This includes:

* Builds published to Bower as `components/ember` and `components/ember-data`.
* Builds published to S3, for example at
`http://builds.emberjs.com/release/shas/1f05c15cfc6d9df5882f9ff7cc985f50fe68f98f/ember.min.js`
* Builds published to CDNs, for example at
`https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.16.2/ember.debug.js`

Instead applications should make Ember a dependency via NPM or Yarn:

* `ember-source` is the Ember NPM package.
* `ember-data` is the Ember Data NPM package.

Most applications should already be using these packages. An exception is that
many addons (and some applications) use ember-try to test against multiple
versions of Ember, and may reference the Bower builds for testing beta and canary
releases.

We've started published tarballs containing the NPM package for each commit to
Ember.js and Ember Data. This allows you to migrate an addon's ember-try
configuration away from Bower. The
[ember-source-channel-url](https://github.com/ember-cli/ember-source-channel-url)
addon provides an API for fetching the appropriate URL for a given channel.
The latest version of Ember CLI's addon blueprint uses this API out of the box,
so most addons simply need to upgrade to Ember CLI 3.0 to complete their move
away from Bower.

## Changes in Ember.js 3.0

---

Ember.js is the core of the Ember framework. It provides routing, rendering, and
dependency injection features.

Ember.js 3.0 introduces no new public API or deprecations. Instead, it is
comprised of bug fixes and the removal of previously deprecated public API from
the 2.x cycle. This release drops support for IE9, IE10, PhantomJS, and Bower.

### Updates to the Testing Defaults

In Ember 3.0 we've changed the default blueprint for generated tests to use the
new testing API specified in [RFC #232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md)
and [RFC #268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

You can find the final documentation for these test helpers at:

* [github.com/emberjs/ember-test-helpers/blob/master/API.md](https://github.com/emberjs/ember-test-helpers/blob/master/API.md)

And additionally the [Ember.js Testing
Guides](https://guides.emberjs.com/v3.0.0/testing/) have been updated.

The testing API available in previous Ember releases remains supported and
un-deprecated in 3.0. If you would like to migrate tests using the old APIs
to the new API, upgrade Ember CLI and Ember then run the
[ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod) script to
automate most of the change.

### Computed Property Getter Assertion

Ember's computed property system requires the use of the `.get(` method to read
the value of a computed property. For example:

```js
emberObject.get('someComputedProperty'); // returns the value
```

In some cases, application code may have
incorrectly been relying on the presence of a value for the property itself,
for example:

```js
emberObject.someComputedProperty; // an instance of ComputedPropertyDescriptor
```

The return value in this case is not the computed property's value, but an
instance of an internal Ember class.

In Ember 3.0 reading a computed property without using `get` will cause an
assertion failure in development. This addition of this assertion will help
applications correct their currently incorrect usage, and in later 3.x releases
allow us to remove the requirement to use `get` to read a computed property's
value.

### APIs Removed in 3.0

Below we've listed some of the most significant API removals in Ember.js 3.0.
For a more in-depth summary see [The Road to Ember 3.0: APIs Removed in Ember.js
3.0](/blog/2017/10/03/the-road-to-ember-3-0.html#toc_apis-removed-in-ember-js-3-0),
and for an exhaustive list of removals, see the [Ember.js 2.x deprecation
guide](/deprecations/v2.x/).

* The `{{render}}` helper has been removed. Any remaining usage should be
  [migrated to components](/deprecations/v2.x/#toc_code-render-code-helper).
* `didInitAttrs` is removed and can be [replaced with `init`](/deprecations/v2.x/#toc_ember-component-didinitattrs)
* Declaring an observer with dependent keys after the callback is removed. Dependent keys should be passed before the callback as described in the [API docs](/api/ember/2.17/classes/@ember%2Fobject/methods/observer?anchor=observer).
* `Enumerable#contains` and `Array#contains` methods are removed. Instead usage should be [replaced with `includes`](/deprecations/v2.x/#toc_enumerable-contains).
* `{{link-to}}` unwrapped the `model` property from passed controllers. This
  behavior has been removed.
* Specifying `defaultLayout` on a component rather than [`layout`](/deprecations/v2.x/#toc_ember-component-defaultlayout) has been removed.
* `Ember.Handlebars.SafeString` has been removed. Instead, use [`Ember.String.htmlSafe`](/deprecations/v2.x/#toc_use-ember-string-htmlsafe-over-ember-handlebars-safestring) or the `import { htmlSafe } from '@ember/string'`.
* `Ember.K` has been removed. Usage should be replaced with [inline functions](/deprecations/v2.x/#toc_deprecations-added-in-2-12).
* Support for legacy initializers with two arguments (container, application)
  has been removed in favor of
  [a single argument of `application`](/deprecations/v2.x/#toc_initializer-arity).
* Ember's legacy binding system, including `Ember.Binding` and the `fooBinding`
  micro-syntax. See the [migration guide](/deprecations/v2.x/#toc_ember-binding) for details.
* Ember's `Map`, `MapWithDefault`, and `OrderedSet` classes. These should be
  replaced with native features or with implementations from other libraries.

For more details on the changes in Ember.js 3.0, please review the
[Ember.js 3.0.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.0.0).

## Changes in Ember Data 3.0

---

Ember Data is the official data persistence library for Ember.js applications.

Ember Data 3.0 contains small bug fixes and updated test generators for the new
testing APIs. Additionally this release removes previously deprecated APIs.

Below we've listed some of the most significant API removals in Ember Data 3.0.
For a more in-depth summary see [The Road to Ember 3.0: APIs Removed in Ember
Data
3.0](/blog/2017/10/03/the-road-to-ember-3-0.html#toc_apis-removed-in-ember-data-3-0),
and for an exhaustive list of removals, see the [Ember Data 2.x deprecation
guide](/deprecations/ember-data/v2.x/).

* Using Ember-Data via `window.DS` is no longer supported, use `import DS from
'ember-data'` and the modules API for Ember Data. For more details see the deprecation guide [Global version of `DS`](/deprecations/ember-data/v2.x/#toc_global-version-of-ds).
* The opt-in flag for a `Date.parse` polyfill is a noop in Ember Data 3.0, and
the `Ember.Date.parse` API is removed. For more details see the deprecation guides [`Ember.Date.parse`](/deprecations/ember-data/v2.x/#toc_ember-date-parse) and [Date prototype extension](/deprecations/ember-data/v2.x/#toc_date-prototype-extension).
* Several APIs have effectively been relocated since Ember 2.0, and their old
implementationed have been removed. See the deprecation guides for [`store.hasRecordForId`](/deprecations/ember-data/v2.x/#toc_recordisloaded), [`store.adapterFor`](/deprecations/ember-data/v2.x/#toc_lookupadapter), [`store.serializerFor`](/deprecations/ember-data/v2.x/#toc_lookupserializer) and [`model.serialize`](/deprecations/ember-data/v2.x/#toc_store-serialize).
* Several initializers which Ember Data no longer uses have been removed. See
the deprecation guide for [Unused Initializers](/deprecations/ember-data/v2.x/#toc_unused-initializers).

For more details on the changes in Ember Data 3.0, please review the
[Ember Data 3.0.0 release page](https://github.com/emberjs/data/releases/tag/v3.0.0).

## Changes in Ember CLI 3.0

---

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

Ember CLI 3.0 makes it easier to use `async` and `await` by including the addon
[ember-maybe-import-regenerator](https://github.com/machty/ember-maybe-import-regenerator)
in the default app blueprint.

Below we've listed some of the most significant API removals in Ember CLI 3.0.
For a more in-depth summary see [The Road to Ember 3.0: APIs Removed in Ember
CLI
3.0](/blog/2017/10/03/the-road-to-ember-3-0.html#toc_apis-removed-in-ember-cli-3-0),
and for an exhaustive list of removals, see the [Ember CLI 2.x deprecation
guide](/deprecations/ember-cli/v2.x/).

* Support for base URL configuration is removed. For more
details on how to migrate away from `baseURL`, see the deprecation guide [Base
URL](/deprecations/ember-cli/v2.x/#toc_base-url).
* Support for `Brocfile.js` is be removed. For more details see the deprecation
guide [Migrate from `Brocfile.js` to `ember-cli-build.js`](/deprecations/ember-cli/v2.x/#toc_migrate-from-brocfile-js-to-ember-cli-build-js).

For more details on the changes in Ember CLI 3.0 and detailed upgrade
instructions, please review the [Ember CLI 3.0.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.0.0).

## Migrating to Ember 3.0

---

To ensure as many applications as possible make the transition from 2.x to
3.x, all public APIs removed in Ember.js 3.0 have been extracted into the
[ember-2-legacy](https://github.com/emberjs/ember-2-legacy) addon. This addon
will be supported through Ember.js 3.4, the first LTS of the 3.x series.

The addon maintains support for all APIs in the [Ember.js 2.x deprecations
guide](https://www.emberjs.com/deprecations/v2.x/). Please note that these are
only APIs from Ember.js itself, and there is no extended support addon for
features removed from Ember Data or Ember CLI.

Applications that need to upgrade through several versions may want to consider
the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon to isolate individual deprecations.

### Thank You!

This summer the Ember project will mark five years since Ember 1.0 was
released. Every six weeks since 1.0 (well, *nearly* every six weeks) we've
had a new set of incremental improvements to announce. That is some impressive
stuff! Thank you for your
continued contribution to this project, and for your participation in creating
a great set of tools for building on the web.
