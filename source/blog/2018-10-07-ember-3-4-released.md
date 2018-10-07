---
title: Ember 3.4 Released
author: Melanie Sumner, Kenneth Larsen, David Baker, Jessica Jordan
tags: Releases, 2018, 3, 3.4
responsive: true
---

Today the Ember project is releasing version 3.4 of Ember.js, Ember Data, and Ember CLI. This release kicks off the 3.5 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

**NOTE:** Due to some bugs found once people started using the release version of Ember-CLI 3.4, we delayed this blog post while we ironed out issues. At this point, things are pretty stable and upgrading should be fine.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.4

The 3.4.0 release is an Ember.js Long-Term Support candidate. In six weeks, the 3.4.x series will become the latest LTS release and six weeks after that the 2.18 LTS branch will no longer receive bugfix patches.

For more information about Ember's LTS policies, see the [announcement blog post](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html) and [builds page](http://emberjs.com/builds/).

Ember.js 3.4 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There is one (1) new feature, three (3) deprecations, and eight (8) bugfixes in this version.

#### New Features (2)

**Angle Bracket Invocation (1 of 2)**

In Ember 3.4 it is now possible to use angle bracket invocation. This means that you're now able to replace the classic invocation syntax:

```hbs
{{site-header user=this.user class=(if this.user.isAdmin "admin")}}

{{#super-select selected=this.user.country as |option|}}
  {{#each this.availableCountries as |country|}}
    {{#s.option value=country}}{{country.name}}{{/s.option}}
  {{/each}}
{{/super-select}}
```

with the angle bracket invocation syntax:

```hbs
<SiteHeader @user={{this.user}} class={{if this.user.isAdmin "admin"}} />

<SuperSelect @selected={{this.user.country}} as |Option|>
  {{#each this.availableCountries as |country|}}
    <Option @value={{country}}>{{country.name}}</Option>
  {{/each}}
</SuperSelect>
```

**It's important to note that the classic invocation syntax is not deprecated in favour of this new invocation.** You're still free to use the classic invocation syntax; but users should be aware that angle bracket invocation does have a few advantages.

The main advantage of the angle bracket invocation syntax is clarity. Because component invocation is often encapsulating important pieces of UI, a dedicated syntax would help visually distinguish them from other handlebars constructs, such as control flow and dynamic values. This can be seen in the example shown above – the angle bracket syntax made it very easy to see the component invocations as well as the `{{#each}}` loop, especially with syntax highlight.

Guides will be updated to reflect the new syntax in the coming weeks.

**Custom Component Manager (2 of 2)**

Ember 3.4 ships with the new Custom Component Manager feature enabled by default. This feature gives addon authors access to a low-level API for creating component bases classes which addon users can re-use and extend components from. Addon authors gain finer-grained control over the semantics of the components exported from their addons by the means of the component manager API.

A component manager can be registered in two different ways - declaratively or imperatively. For an implicit registration you may create a new file in the `app/component-managers` directory:

```js
// ember-basic-component/app/component-managers/basic.js

import EmberObject from '@ember/object';

export default EmberObject.extend({
  // ...
});

```

When developing an addon and exporting a component manager itself, please follow the respective directory structure conventions by defining the manager in the `addon/component-managers` directory and re-exporting it from `app/component-managers` (for a similar example, please review the [conventions for defining and exporting addon components](https://ember-cli.com/extending/#addon-components)).

For an imperative registration of a component manager, you can create a new initializer as follows:

```js
// ember-basic-component/app/initializers/register-basic-component-manager.js

const MANAGER = {
 // ...
};

export function initialize(application) {
 // We want to use a POJO here, so we are opt-ing out of instantiation
 application.register('component-manager:basic', MANAGER, { instantiate: false });
}

export default {
 name: 'register-basic-component-manager',
 initialize
};
```
Next, you can create a new component class depending on this component manager using the `setComponentManager` util as follows:

```js
// ember-basic-component/app/components/foo-bar.js

import EmberObject from '@ember/object';
import { setComponentManager } from '@ember/component';

export default setComponentManager('basic', EmberObject.extend({
  // ...
}));
```

Finally, users of the `ember-basic-component` addon in this example, will be able to reuse and extend that component just like any other classic component:

```js
// an-addon-users-app/app/components/foo-bar-custom.js

import FooBar from 'ember-basic-component/components/foo-bar';

export default FooBar.extend({
  // addon user's configuration of the custom FooBar component
});
```

For more details on the lifecycle methods and optional settings for the Custom Component Manager API, please review the [original RFC](https://github.com/emberjs/rfcs/blob/master/text/0213-custom-components.md#component-lifecycle).


#### Deprecations (2)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

For more details on changes in Ember.js 3.4, please review the [Ember.js 3.4.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.4.0).

**Use closure actions instead of `sendAction` (1 of 2)**

In Ember 1.13 closure actions were introduced as a recommended replacement for `sendAction`. With `sendAction` the developer passes the name of an action, and when `sendAction` is called Ember.js would look up that action in the parent context and invoke it if present. This had a handful of caveats:

- Since the action is not looked up until it's about to be invoked, it's easier for a typo in the action's name to go undetected.
- Using `sendAction` you cannot receive the return value of the invoked action.

Closure actions solve those problems and are also more intuitive to use.

To read more about this deprecation and how to refactor your existing code have a look at [the deprecations page](https://emberjs.com/deprecations/v3.x#toc_ember-component-send-action).

**Ember 2 Legacy (2 of 2)**

 Version 3.4 is the last version of Ember that will work with the polyfill addon for features that were deprecated in 2.x. If you have been using [ember-2-legacy](https://github.com/emberjs/ember-2-legacy), it's time to move forward.

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.4

Ember Data 3.4 is the first Ember Data LTS release. As a result the
Ember Data team has focused on stability for this release. We've
released a ton of bug fixes (and backported many of these fixes to
older 3.x releases) to address many known issues that have been
reported over the last several months.

#### New Features (0)

No new features introduced in Ember Data 3.4.

#### Deprecations (0)

No new deprecations introduced in Ember Data 3.4.


For more details on changes in Ember Data 3.4, please review the
[Ember Data 3.4.0 release page](https://github.com/emberjs/data/releases/tag/v3.4.0).

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

### Changes in Ember CLI 3.4

Ember CLI 3.4 is an [LTS release candidate](https://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html). This means that this release version will receive critical bugfixes for the upcoming 6 release cycles (36 weeks), as well as security patches for the next 10 release cycles (60 weeks).

Ember CLI 3.4.0 is also effectively fast-forwarded to 3.4.1 due to an essential patch release. Read more about it in the [changelog](https://github.com/ember-cli/ember-cli/releases/tag/v3.4.1).

#### New Features (2)

**Added Support for Node 10 (1 of 2)**

Ember CLI 3.4 now supports Node 10. Simultaneously, Node 4 has been dropped from Ember CLI's support matrix. When upgrading to Ember CLI 3.4, please make sure to use it together with Node 6 and above.

**Template Linting (2 of 2)**

Ember CLI 3.4 adds automatic template linting to your application via _ember-template-lint_ according to the [recommmended list of rules](https://github.com/ember-template-lint/ember-template-lint/blob/master/lib/config/recommended.js). Ember CLI will generate a `TemplateLint` test file for each of your templates to your test suite automatically to be run via `ember test`.

You can also use the new command `npm run lint:hbs` or `yarn run lint:hbs` respectively to run the linter.


#### Deprecations (0)

No new deprecations introduced in Ember CLI 3.4.

---

For more details on the changes in Ember CLI 3.4 and detailed upgrade
instructions, please review the [Ember CLI  3.4.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.4.1).

## Latest Patch Releases

Several patch versions of Ember.js, Ember Data, and Ember CLI have been published since the release of version 3.4. Please upgrade to the following, latest patch releases to benefit from important bug fixes:

- [Ember 3.4.4](https://github.com/emberjs/ember.js/releases/tag/v3.4.4)
- [Ember CLI 3.4.3](https://github.com/ember-cli/ember-cli/releases/tag/v3.4.3)
- [Ember Data 3.4.2](https://github.com/emberjs/data/releases/tag/v3.4.2)

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
