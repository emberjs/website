---
title: Ember 3.8 Released
author: Melanie Sumner, Kenneth Larsen, Anne-Greeth van Herwijnen
tags: Releases, 2018, 3, 3.8
responsive: true
---

Today the Ember project is releasing version 3.8 of Ember.js, Ember Data, and Ember CLI. This release kicks off the 3.8 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.8

The 3.8.0 release is an Ember.js Long-Term Support candidate. In six weeks, the 3.8.x series will become the latest LTS release and six weeks after that the 3.4 LTS branch will no longer receive bugfix patches.

For more information about Ember's LTS policies, see the [announcement blog post](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html) and [builds page](http://emberjs.com/builds/).

Ember.js 3.8 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There are two (2) new feature, four (4) deprecations, and six (6) bugfixes in this version.

#### New Features (2)

**Element Modifier Manager (1 of 2)**

<!-- alex ignore special -->
A modifier manager is an object that is responsible for coordinating the lifecycle events that occurs when invoking, installing and updating an element modifier. This new feature is introduced as a  very low-level API. Most likely you will never - as an Ember app developer - need to use this but it might come in handy for some add-on developers. In this way, the Ember app developers will benefit from this feature by subclassing these special modifiers provided by addons.

If you're interested in learning more about how to use this new feature, then please refer to the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0373-Element-Modifier-Managers.md).

**Array helper (2 of 2)**

Ember 3.8 introduces the `{{array}}` helper to create an array in a template. This helper works in similar fashion to the already existing `{{hash}}` helper.

The helper would be invoked as `{{array arg1 ... argN}}` and return the value `[arg1, ..., argN]`. For example, `{{array 'a' 'b' 'c'}}` would return the value `['a', 'b', 'c']`.

Read the [original RFC](https://github.com/emberjs/rfcs/blob/master/text/0318-array-helper.md) for more information.

#### Deprecations (5)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

For more details on changes in Ember.js 3.8, please review the [Ember.js 3.8.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.8.0).

**Computed Property Overridability (1 of 5)**

Ember's computed properties are overridable by default if no setter is defined. This behavior is bug prone and has been deprecated. `readOnly()`, the modifier that prevents this behavior, will be deprecated once overridability has been removed. Please have a look at [the deprecations app](https://emberjs.com/deprecations/v3.x#toc_computed-property-override) for more information on this deprecation.

**Computed Property `.property()` Modifier (2 of 5)**

`.property()` is a modifier that adds additional property dependencies to an existing computed property. To update, move the dependencies to the main computed property definition and you shouldn't see a deprecation warning any more. For more information please refer to [the deprecations app](https://emberjs.com/deprecations/v3.x#toc_computed-property-property).

**Computed Property Volatility (3 of 5)**

`.volatile()` is a computed property modifier which makes a computed property recalculate every time it is accessed, instead of caching. It also prevents property notifications from ever occuring on the property, which is generally not the behavior that developers are after. Volatile properties are usually used to simulate the behavior of native getters, which means that they would otherwise behave like normal properties.

To update, consider upgrading to native class syntax and using native getters directly instead. There's guide on how to do this in the [deprecations app](https://emberjs.com/deprecations/v3.x#toc_computed-property-volatile).

**Deprecate `@ember/object#aliasMethod` (4 of 5)**

`@ember/object#aliasMethod` is a little known and rarely used method that allows user's to add aliases to objects defined with EmberObject. The deprecation warning can be removed by refactoring it into having one function call the other directly. To see how to do this, please refer to the [deprecations app](https://emberjs.com/deprecations/v3.x#toc_object-alias-method)

**Component Manager Factory Function (5 of 5)**

`setComponentManager` no longer takes a string to associate the custom component class and the component manager. Instead you must pass a factory function that produces an instance of the component manager. For more information please refer to the [deprecations app](https://emberjs.com/deprecations/v3.x#toc_component-manager-string-lookup)

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.8

While no new features or deprecations were introduced in Ember Data 3.8, there were a few fixes that users should find helpful:

- documentation: updated release instructions, fixed broken links, clarified load/reload behavior, and added `Reference` and `AdapterError` documentation.
- updated `_scheduleFetch` to use `_fetchRecord` for `belongsTo` relationship - without this, it would trigger one find-request per `belongsTo` relationship, instead of correctly coalescing them together.

For more details on changes in Ember Data 3.8, please review the
[Ember Data 3.8.0 release page](https://github.com/emberjs/data/releases/tag/v3.8.0).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js applications.

### Upgrading Ember CLI

You may upgrade Ember CLI easily using the ember-cli-update project:

```bash
npm install -g ember-cli-update
ember-cli-update
```

This utility will help you to update your app or add-on to the latest Ember CLI version. You will probably encounter merge conflicts, in which the default behavior is to let you resolve conflicts on your own. For more information on the `ember-cli-update` project, see [the github README](https://github.com/ember-cli/ember-cli-update).

While it is recommended to keep Ember CLI versions in sync with Ember and Ember Data, this is not required. After updating ember-cli, you can keep your current version(s) of Ember or Ember Data by editing `package.json` to revert the changes to the lines containing `ember-source` and `ember-data`.

### Changes in Ember CLI 3.8

Here are some of the fixes in ember-cli 3.8 that community members may find useful to know about:

- documentation: more links to the contributing guide were added, so users can more easily find out how to contribute
- `{{content-for}}` was updated to allow the use of this on the same line if different types are specified (i.e., `{{content-for 'head'}} {{content-for 'head-footer'}}`)
- gitignore was updated to ignore Yarn .pnp files
- the `tests` directory will be ignored when tests are turned off

For more details on each of these, and a full list of the changes in Ember CLI 3.8, as well as detailed upgrade
instructions, please see the [Ember CLI 3.8.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.8.0).

## Thank You

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
