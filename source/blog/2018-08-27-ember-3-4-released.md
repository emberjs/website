---
title: Ember 3.4 Released
author: Melanie Sumner, Kenneth Larsen
tags: Releases, 2018, 3, 3.4
responsive: true
---

Today the Ember project is releasing version 3.4 of Ember.js, Ember Data, and Ember CLI. This release kicks off the 3.5 beta cycle for all sub-projects. We encourage our community (especially addon authors) to help test these beta builds and report any bugs before they are published as a final release in six weeks' time. The [ember-try](https://github.com/ember-cli/ember-try) addon is a great way to continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.4

Ember.js 3.4 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There is one (1) new feature, three (3) deprecations, and eight (8) bugfixes in this version.

#### New Features (2)
Angle Bracket Invocation (1 of 2)

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

It's important to note that the classic invocation syntax isn't deprecated in favour of this new invocation. You're free to still use the classic invocation syntax but the angle bracket invocation do have a few advantages.

By using angle bracket invocation you introduce more clarity to your templates. The main advantage of the angle bracket invocation syntax is clarity. Because component invocation is often encapsulating important pieces of UI, a dedicated syntax would help visually distinguish them from other handlebars constructs, such as control flow and dynamic values. This can be seen in the example shown above – the angle bracket syntax made it very easy to see the component invocations as well as the `{{#each}}` loop, especially with syntax highlight.

To dive into the possibilities of this new features please refer to [the guides](#TODO)

Custom component manager (2 of 2)

The second new feature of Ember 3.4 is the custom component manager. This API will allow addon authors to provide special-purpose component base classes that their users can subclass from in apps. These components are invokable in templates just like any other Ember components (descendants of `Ember.Component`) today.

Component managers are registered with the `component-manger` type in the application's registry. Similar to services, component managers are singleton objects (i.e. `{ singleton: true, instantiate: true }`), meaning that Ember will create and maintain (at most) one instance of each unique component manager for every application instance.

To register a component manager, an addon will put it inside its `app` tree:
```js
// ember-basic-component/app/component-managers/basic.js

import EmberObject from '@ember/object';

export default EmberObject.extend({
  // ...
});
```
This allows the component manager to participate in the DI system – receiving injections, using services, etc. Alternatively, component managers can also be registered with imperative API. This could be useful for testing or opt-ing out of the DI system. For example:

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

For more information on how to use the custom component mananger please refer to [the RFC](https://github.com/emberjs/rfcs/blob/master/text/0213-custom-components.md).


#### Deprecations (1)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to a more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.


For more details on changes in Ember.js 3.4, please review the [Ember.js 3.4.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.4.0).


Use closure actions instead of `sendAction` (1 of 1)

In Ember 1.13 closure actions were introduced as a recommended replacement for `sendAction`. With `sendAction` the developer passes the name of an action, and when `sendAction` is called Ember.js would look up that action in the parent context and invoke it if present. This had a handful of caveats:

* Since the action is not looked up until it's about to be invoked, it's easier for a typo in the action's name to go undetected.

* Using `sendAction` you cannot receive the return value of the invoked action.

Closure actions solve those problems and on top are also more intuitive to use.

To read more about this deprecation and how to refactor your existing code have a look at [the deprecations page](https://emberjs.com/deprecations/v3.x#toc_ember-component-send-action).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.4


#### New Features (0)



#### Deprecations (0)



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

#### New Features (X)


#### Deprecations (X)

---

For more details on the changes in Ember CLI 3.4 and detailed upgrade
instructions, please review the [Ember CLI  3.4.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.4.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
