---
title: Ember 2.15 and 2.16 Beta Released
author: Matthew Beale
tags: Releases
---

Today the Ember project is releasing version 2.15.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 2.16 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The
[ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

This release also marks the conclusion of security patch support for Ember.js
2.4-LTS. 2.4-LTS was released in April of 2016, and was the first Long-Term
Support release of Ember.js. We're pleased with the impact of LTS releases on
the Ember project and look forward to continuing the practice.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 2.15

Ember.js 2.15 is an incremental, backwards compatible release of Ember with
bug fixes, performance improvements, and minor deprecations.

#### Public Router Service: Phase 1

Initial support for the public router service API
(described in [RFC #95](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md))
is included in this release. The effort on this feature has been split
into two phases:

**Phase 1**, completed in 2.15.

* Implement a public service that exposes `currentRouteName`,
  `currentURL`, `location`, and `rootURL` properties.
* Additionally expose
  `transitionTo` and `replaceWith` as methods on the service.
* Add the method `urlFor` to the service for generating URLs based on a
  route name and models.

**Phase 2**, pending implementation of the new public `RouteInfo` API. Not
included in Ember 2.15.

* Expand the service with the methods `isActive`, `recognize`, and
  `recognizeAndLoad`.
* Deprecate the `willTransition` and `didTransition` router hooks (not the
  route actions of the same name). Replace them with events emitted by the
  router service which have improved timing and public-API arguments:
  `routeWillChange` and `routeDidChange`.

Addons wish to use the router service API and support Ember releases prior to
2.15 should consider the
[ember-router-service-polyfill](https://github.com/rwjblue/ember-router-service-polyfill).

An example of this API would be to transition to another route from a
component:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service(),

  actions: {
    save(model) {
      model.save().then(() => {
        if (this.isDestroyed) { return; }
        this.get('router').transitionTo('index');
      });
    }
  }

});
```

#### `{{mount}}` helper `model` argument

Ember 2.15 implements
[RFC #225](https://github.com/status200/rfcs/blob/ember-engines-mount-params/text/0000-ember-engines-mount-params.md) with some minor tweaks. The `{{mount}}`
helper, used to invoke an Ember engine, now accepts the named argument of
`model` to provide a the model of the engine's application controller.

For example, in an application you might pass some values from a template:

```hbs
<div>
 <h1>Application template!</h1>
 {{mount 'admin' model=(hash
    title='Secret Admin'
    signInButton=(component 'sign-in-button')
 )}}
</div>
```

And in an engine access those values on the `model` property:

```hbs
{{! admin/app/templates/application.hbs }}
<h2>Admin area: {{model.title}}</h2>
<div>
  Please sign in: {{model.signInButton}}
</div>
```

#### Other changes in 2.15

Other changes include:

* Ember 2.15 blueprints will no longer generate names for initializers and
  instance initializers.
* The deprecated API `_lookupFactory` has been removed in this release. See
  the [deprecation
  guide](https://www.emberjs.com/deprecations/v2.x/#toc_migrating-from-_lookupfactory-to-factoryfor)
  for details about moving away from this API.
* The Glimmer-VM rendering engine has been updated in this release, matching
  Ember's rendering engine to that of the Glimmer.js library at its EmberConf
  release. Included are VM improvement such as the "stack VM", improved
  assertion stripping in production builds, and a more complete Glimmer-VM
  implementation of the `(component` helper.

No new deprecations are included in Ember 2.15

For more details on changes in Ember.js 2.15, please review the
[Ember.js 2.15.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.15.0).

### Upcoming Changes in Ember.js 2.16-beta

Ember.js 2.16-beta continues to improve the framework with minor bug fixes.
Additionally there is a major change in usage coming in 2.16:

#### Ember.js Modules API

In Ember.js 2.16 the recommended way to access framework code in Ember
applications will be via the JavaScript modules API described in
[RFC #176](https://github.com/emberjs/rfcs/blob/master/text/0176-javascript-module-api.md). For example this basic component definition in 2.15:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  title: 'The Curious Case'
});
```

Would in 2.16 conventions be written as:

```js
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: inject(),
  title: 'The Curious Case'
});
```

JavaScript modules make the framework easier to document, make the distinction
between public and private API much easier to maintain, and provide
opportunities for performance work such as tree-shaking. Adopting a new
convention for importing the framework is a big task that impacts application
code, documentation, generators/blueprints, and more.

#### Updating your pre-2.16 application

Existing applications can move to adopt the new import style immediately. To
update an application:

* Upgrade ember-cli-babel to v6.7.2 or greater. This may require you to upgrade
  ember-cli generally depending on your current version.
* Install and run the
[ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod).
This
command will migrate legacy code that imports the `'ember'` package to the
new modules, updating files in place.

```
npm install ember-modules-codemod -g
cd my-ember-app
ember-modules-codemod
```

You're using the new import API!

Some applications have used the
[ember-cli-shims](https://github.com/ember-cli/ember-cli-shims) package which
implemented an earlier design of Ember's module API. This package continues
to work, however it should not be considered conventional. The
[eslint-plugin-ember](https://github.com/ember-cli/eslint-plugin-ember)
package provides a rule that supports removing the ember-cli-shims modules.
To migrate these apps use the following steps:

* Install eslint-plugin-ember v4.2.0 or greater as a dev dependency for your
  application.
* Follow the eslint-plugin-ember
  [usage instructions](https://github.com/ember-cli/eslint-plugin-ember#-usage)
  and update your `.eslintrc.js` appropriately.
* Run `eslint --fix` to convert ember-cli-shims module usage to plain `'ember'`
  imports.
* Install the ember-modules-codemod and run it as described above.

By starting to convert applications in the 2.16-beta cycle you can provide
valuable feedback about the process and scripts involved.

#### Deprecations in Ember.js 2.16-beta

One new deprecation is introduced in Ember.js 2.16-beta:

* For historical reasons, Ember controllers have a private property `content`
  that aliases the `model` property. Relying on this legacy behavior is
  deprecated and will be unsupported in Ember 2.17. See the
  [deprecation guide](https://www.emberjs.com/deprecations/v2.x/#toc_controller-content-alias)
  for more details.

For more information on the upcoming changes in Ember.js 2.16, please review the
[Ember.js 2.16.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.16.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.15

#### Deprecations in Ember Data 2.15

Two new deprecations are introduces in Ember Data 2.15:

* TODO
* TODO

For more details on changes in Ember Data 2.15, please review the
[Ember Data 2.15.0 release page](https://github.com/emberjs/data/releases/tag/v2.15.0).


### Upcoming changes in Ember Data 2.16


#### Deprecations in Ember Data 2.16

For more details on the upcoming changes in Ember Data 2.16, please review the
[Ember Data 2.16.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.16.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.14.0...v2.15.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.14.0...v2.15.0).

### Changes in Ember CLI 2.15

#### Deprecations in Ember Data 2.15

Two new deprecations are introduces in Ember Data 2.15:

* TODO
* TODO

For more details on the changes in Ember CLI 2.15 and detailed upgrade
instructions, please review the [Ember CLI  2.15.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.15.0).

### Upcoming Changes in Ember CLI 2.16

#### Deprecations in Ember CLI 2.16

For more details on the changes in Ember CLI 2.16.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.16.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.16.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
