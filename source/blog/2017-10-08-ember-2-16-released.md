---
title: Ember 2.16 and 2.17 Beta Released
author: Matthew Beale
tags: Releases
---

Today the Ember project is releasing version 2.16.0 of Ember.js, Ember Data, and Ember CLI.

After six weeks as a stable release, Ember.js 2.16 will be promoted to an Ember
[long term support](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)
release.

This also release kicks off the 2.17 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time.

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 2.16

Ember.js 2.16 continues to improve the framework with minor bug fixes.
Additionally there is a major change in conventional usage. As of Ember.js
2.16, newly generated Ember applications will use the JavaScript modules API
described in detail below.

No APIs are deprecated as part of these changes. Although we encourage
applications to upgrade to the new modules API, we plan to wait until
the module API is proven and more addons across the community are upgraded
before introducing a deprecation for the `Ember` namespace object.

#### Ember.js Modules API

In Ember.js 2.16 the recommended way to access framework code in Ember
applications is via the JavaScript modules API described in
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
opportunities for performance work such as tree-shaking.

Adopting a new
convention for importing the framework is a big task that impacts application
code, documentation, generators/blueprints, and more. We've made the following
changes to prepare for the shift in usage:

* The [Ember.js
API documentation](https://emberjs.com/api/ember/2.16/namespaces/Ember) and
[Ember guides](https://guides.emberjs.com/v2.16.0/) have been updated to reflect the new API.
* The [application
blueprints](https://github.com/ember-cli/ember-cli/tree/master/blueprints/app)
for newly generated applications have been updated. You can review
the output of the new application generators in the
[ember-new-output](https://github.com/ember-cli/ember-new-output) repo.
* A migration strategy for existing applications has been authored.

#### Updating your application

Existing applications can move to adopt the new import style immediately.
Upgrading to Ember CLI and Ember.js 2.16 is recommended.
To update an application:

* Upgrade Ember CLI to 2.16.0, specifically the ember-cli-babel dependency
  must be upgraded to v6.8.0 or greater.
  https://github.com/kellyselden/ember-cli-update
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
package. This provides
an earlier design of Ember's module API. This package continues
to work and will be provided by default in new Ember applications, however it will
be removed in a future version of Ember CLI. Migrating to the new modules
API is a good time to remove an usage of these legacy modules.

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
* Run the ember-modules-codemod as described above. This will convert the
  `'ember'` imports to their modern module API equivilents.

Your application not no longer contains any usage of the legacy modules.

#### Updating your addons

To provide addon users the best experience, we suggest you take the following
steps as an addon maintainer (or contributor!):

* Upgrade your ember-cli-babel dependency to v6.8.0 or greater. This will permit your addon
  to use the new modules in the `addon/` and `test/` directories.
* Ensure the `app/` and `test-support/` directories (both part of the dependent
  app's build) contain only re-exports from the `addon/` directory. The files
  in `app/` should avoid importing any Ember APIs in any manner. In this
  way an addon will be decoupled from the consuming application's build and runtime
  Ember API support.

Taking these steps will ensure addon users have a smooth path from previous
versions of Emner to 2.16 and beyond.

If you have questions please join us in [`#-ember-cli` on the Ember.js
Community Slack](https://embercommunity.slack.com/messages/C045BNHAP/).

#### Deprecations in Ember.js 2.16

One new deprecation is introduced in Ember.js 2.16:

* For historical reasons, Ember controllers have a private property `content`
  that aliases the `model` property. Relying on this legacy behavior is
  deprecated and will be unsupported in Ember 2.17. See the
  [deprecation guide](https://www.emberjs.com/deprecations/v2.x/#toc_controller-content-alias)
  for more details.

For more details on changes in Ember.js 2.16, please review the
[Ember.js 2.16.0 release page](https://github.com/emberjs/ember.js/releases/tag/v2.16.0).

### Upcoming Changes in Ember.js 2.17

Ember.js 2.17 will contain no new features. Instead it will primarially
include bug fixes, performance, and stability work.

For more details on the upcoming changes in Ember.js 2.17, please review the
[Ember.js 2.17.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v2.17.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 2.16

Ember Data 2.16 is a bugfix release. It contains no new features but
it does have several bugfixes for [build warnings](https://github.com/emberjs/data/pull/5196),
[header parsing](https://github.com/emberjs/data/pull/5029) and
[outdated dependecies](https://github.com/emberjs/data/pull/5044).

There are no new deprecations introduced in Ember Data 2.16.

For more details on changes in Ember Data 2.16, please review the
[Ember Data 2.16.0 release page](https://github.com/emberjs/data/releases/tag/v2.16.0).

### Upcoming changes in Ember Data 2.17

Due to a late start in the Ember Data 2.16 beta cycle the Ember Data
2.17.0-beta.1 release is currently the same code as 2.16.0. The beta
releases will continue to receive beta bugfixes and it is expected to
diverge from Ember Data 2.16.0 by the time 2.17.0 is released in 6
weeks.

#### Deprecations in Ember Data 2.17

There are no planned deprecations introduced in Ember Data 2.17.

For more details on the upcoming changes in Ember Data 2.17, please review the
[Ember Data 2.17.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v2.17.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v2.15.0...v2.16.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v2.15.0...v2.16.0).

### Changes in Ember CLI 2.16

Ember CLI 2.16 is primarially contains bug fixes and performance improvements.
It contains no major new functionality.

Other changes include:

* Project configuration is now cached as a performance optimization. See
  [ember-cli/ember-cli#7333](https://github.com/ember-cli/ember-cli/pull/7333),
  [ember-cli/ember-cli#7309](https://github.com/ember-cli/ember-cli/pull/7309),
  and
  [ember-cli/ember-cli#7270](https://github.com/ember-cli/ember-cli/pull/7270)
  for more details.
* `ember install` now supports scoped npm packages, for example `ember install @cardstack/git`.
  See [ember-cli/ember-cli#7109](https://github.com/ember-cli/ember-cli/pull/7109) for more details.
* Several internal refactorings were undertaken that begin support for the
  unmerged [Ember CLI strategies
  RFC](https://github.com/ember-cli/rfcs/pull/110).

No new deprecations are added in Ember CLI 2.16.

For more details on the changes in Ember CLI 2.16 and detailed upgrade
instructions, please review the [Ember CLI  2.16.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.16.0).

### Upcoming Changes in Ember CLI 2.17

Ember CLI 2.17 introduces no major functionality changes or deprecations.

For more details on the changes in Ember CLI 2.17.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 2.17.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v2.17.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
