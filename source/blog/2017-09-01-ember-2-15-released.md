---
title: Ember 2.15 and 2.16 Beta Released
responsive: true
author: Matthew Beale
tags: Releases, 2017, 2
---

*Updated on December 19, 2017 to include information about Ember.js 2.8-LTS.*

Today the Ember project is releasing version 2.15.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 2.16 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The
[ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

This release also marks the conclusion of critical bugfixes support for Ember.js
2.8-LTS, which was released in October 2016. We strongly recommend LTS users to
migrate to 2.12-LTS immediately. 2.8-LTS will continue to receive security patches
for another four releases (around May 2017).

At the same time, this release also concludes security patch support for Ember.js
2.4-LTS, which was released in April of 2016.

We're pleased with the impact of LTS releases on the Ember project and look forward
to continuing the practice.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 2.15

Ember.js 2.15.0 is an incremental, backwards compatible release of Ember with
bug fixes, performance improvements, and minor deprecations.

#### Public Router Service: Phase 1

Initial support for the public router service API
(described in [RFC #95](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md))
is included in this release. The effort on this feature has been split
into two phases:

**Phase 1** is completed in 2.15.0.

* Implement a public service named `'router'`.
* Expose the `currentRouteName`,
  `currentURL`, `location`, and `rootURL` on the service.
* Additionally expose
  `transitionTo` and `replaceWith` as methods on the service.
* Provide the method `urlFor` to the service for generating URLs based on a
  route name and models.

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

For more details on these APIs see the [RouterService API
documentation](https://www.emberjs.com/api/ember/2.15/classes/RouterService).

**Phase 2** is pending implementation of the new public `RouteInfo` API. It is
not included in Ember 2.15.0.

* Expand the service with the methods `isActive`, `recognize`, and
  `recognizeAndLoad`.
* Deprecate the `willTransition` and `didTransition` router hooks (not the
  route actions of the same name). Replace them with events emitted by the
  router service which have improved timing and public API arguments:
  `routeWillChange` and `routeDidChange`.

Addons that wish to use the router service API and support Ember releases prior to
2.15.0 should consider the
[ember-router-service-polyfill](https://github.com/rwjblue/ember-router-service-polyfill).


#### `{{mount}}` helper `model` argument

Ember 2.15.0 implements
[RFC #225](https://github.com/status200/rfcs/blob/ember-engines-mount-params/text/0000-ember-engines-mount-params.md) with some minor tweaks. The `{{mount}}`
helper, used to invoke an Ember engine, now accepts the named argument of
`model` for an engine's application controller.

For example, in an application you might pass some values from a template:

```handlebars
<div>
 <h1>Application template!</h1>
 {{mount 'admin' model=(hash
    title='Secret Admin'
    signInButton=(component 'sign-in-button')
 )}}
</div>
```

And in an engine access those values on the `model` property:

```admin/app/templates/application.hbs
<h2>Admin area: {{model.title}}</h2>
<div>
  Please sign in: {{model.signInButton}}
</div>
```

#### Other changes in 2.15

Other changes include:

* Ember 2.15.0 blueprints will no longer generate names for initializers and
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

No new deprecations are included in Ember 2.15.0

For more details on changes in Ember.js 2.15.0, please review the
[Ember.js 2.15.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.15.0).

### Upcoming Changes in Ember.js 2.16-beta

Ember.js 2.16-beta continues to improve the framework with minor bug fixes.
Additionally there is a major change in conventional usage coming in 2.16.

#### Ember.js Modules API

In Ember.js 2.16 the recommended way to access framework code in Ember
applications will be via the JavaScript modules API described in
[RFC #176](https://github.com/emberjs/rfcs/blob/master/text/0176-javascript-module-api.md). For example this basic component definition in 2.15.0:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  title: 'The Curious Case'
});
```

Would in 2.16 conventions be written as:

```js
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  title: 'The Curious Case'
});
```

JavaScript modules make the framework easier to document, make the distinction
between public and private API much easier to maintain, and provide
opportunities for performance work such as tree-shaking. Adopting a new
convention for importing the framework is a big task that impacts application
code, documentation, generators/blueprints, and more.

#### Updating your application

To help us test the migration path, existing applications can move to adopt
the new import style immediately. Using 2.16-beta of Ember is suggested, but
not actually required. To update an application:

* Upgrade ember-cli-babel to v6.8.0 or greater. This may require you to upgrade
  ember-cli generally depending on your current version.
* Install and run the
  [ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod).
  This command will migrate legacy code that imports the `'ember'` package to
  the new modules, updating files in place.

```sh
npm install ember-modules-codemod -g
cd my-ember-app
ember-modules-codemod
```

You're using the new import API!

Many applications use the
[ember-cli-shims](https://github.com/ember-cli/ember-cli-shims)
package. This provides the module for `import Ember from 'ember'`. It also
provides an earlier design of Ember's module API. This package continues
to work, however in 2.16 it will no longer be a dependency for new
Ember applications.

The
[eslint-plugin-ember](https://github.com/ember-cli/eslint-plugin-ember)
package provides a linting rule that can remove usage of the legacy modules
provided by ember-cli-shims.
To run this follow these steps:

* Install eslint-plugin-ember v4.3.0 or greater as a dev dependency for your
  application.
* Follow the eslint-plugin-ember
  [usage instructions](https://github.com/ember-cli/eslint-plugin-ember#-usage)
  and update your `.eslintrc.js` appropriately.
  For more detailed instructions, see this excellent blog post:
  [How To Use Ember’s New Module Import Syntax Today](https://medium.com/@Dhaulagiri/embers-javascript-modules-api-b4483782f329)
* Run `./node_modules/.bin/eslint --fix` to convert ember-cli-shims module usage to plain `'ember'`
  imports.
* Run the ember-modules-codemod as described above.

By trying these migration steps on your applications, you can provide valuable
feeback to improve the final process announced with 2.16.

#### Preparing your Addon for 2.16

To prepare your addons for Ember 2.16, we encourage you to take the following
steps during the beta cycle:

* Upgrade your ember-cli-babel dependency to v6.8.0. This will permit your addon
  to use the new modules in the `addon/` and `test/` directories.
* Ensure the `app/` and `test-support/` directories (both part of the dependent
  app's build) contain only re-exports.

This will ensure applications have a path forward in 2.16 to drop
ember-cli-shims from their dependencies.

If you have questions please join us in [`#-ember-cli` on the Ember.js
Community Slack](https://embercommunity.slack.com/messages/C045BNHAP/).

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

Ember Data 2.14 contained a number of performance improvements summarized
in the [2.14 release
post](https://emberjs.com/blog/2017/07/06/ember-2-14-released.html#toc_changes-in-ember-data-2-14).
Most of the development effort in the beta cycle has been to address regressions
introduced by those changes. 2.15.0 contains no new features or deprecations,
but does include the same bugfixes as can be found in 2.14.11.

For details on changes in Ember Data 2.15.0, please review the
[Ember Data 2.15.0 release page](https://github.com/emberjs/data/releases/tag/v2.15.0).

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

#### Chrome by default

Ember CLI will configure new apps to run tests in [headless Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md)
by default, instead of PhantomJS.

PhantomJS has served the wider JavaScript community well for a long time, being
a practical alternative to running browsers headless via tools like Xvbf. It
has, however, been a proxy for what we really want to test– the browsers that
users are running.

Now that we can easily test in headless Chrome the motivation for using
PhantomJS has diminished, and as a result it is [no longer actively maintained](https://groups.google.com/d/msg/phantomjs/9aI5d-LDuNE/5Z3SMZrqAQAJ).

#### app.import files within node_modules

Ember CLI has an API for importing individual files into the built assets, by
calling `app.import` within `ember-cli-build.js`. This API now supports
importing files from within `node_modules`, making it easier to consume
dependencies using only npm, rather than a more complicated mix of npm and
bower.

#### Node.js 8 Support

Per the Ember CLI [Node.js version support policy](https://github.com/ember-cli/ember-cli/blob/cac87e69f8c636d8b64889a6e214e987428c8dc7/docs/node-support.md), Ember CLI officially supports Node 8 as the active Node.js version and will continue to do so throughout its upcoming [Active LTS window](https://github.com/nodejs/LTS/tree/d9cb7b3059a478a6e33649cfb0a202cf456b2e28#nodejs-long-term-support-working-group).

As part of this support, Ember CLI will no longer report warnings when run under
Node 8.

#### Improved Error Messages

The improved error messages promised in the 2.14.0 release [blog post](https://www.emberjs.com/blog/2017/07/06/ember-2-14-released.html#toc_upcoming-changes-in-ember-cli-2-15) is shipping with Ember CLI 2.15.0.  No more checking the console for template compilation errors 🎉!

#### Other Notable Changes

Work has begun on internal changes to support tree-shaking.  This is still in
its early stages but is a focus of current development.

For more details on the changes in Ember CLI 2.15 and detailed upgrade
instructions, please review the [Ember CLI  2.15.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.15.0).

### Upcoming Changes in Ember CLI 2.16

#### Addon API for Custom Transforms

Ember CLI 2.16.0 will support addon import transformations via
`importTransforms`, an implementation of [RFC 108](https://github.com/kratiahuja/rfcs/blob/add-import-api/active/0000-add-custom-transform.md).
This allows addons to register custom transformations to be run for vendor
resources included via `app.import`.  This is an advanced feature for addon
authors.  It is particularly useful for
[FastBoot](https://github.com/ember-fastboot/fastboot) to allow FastBoot-aware
addons to use a declarative API for conditionally importing code in Node.js or
browser environments.

Thanks to [@kratiahuja](https://github.com/kratiahuja) for proposing and implementing this feature.

For more details on the changes in Ember CLI 2.16.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.16.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.16.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
