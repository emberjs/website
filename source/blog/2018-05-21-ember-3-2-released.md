---
title: Ember 3.2 and 3.3 Beta Released
author: Ricardo Mendes
tags: Releases
---

Today the Ember project is releasing version 3.2.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 3.3 beta cycle for all sub-projects. We encourage our
community (especially addon authors) to help test these beta builds and report
any bugs before they are published as a final release in six weeks' time. The
[ember-try](https://github.com/ember-cli/ember-try) addon is a great way to
continuously test your projects against the latest Ember releases.

You can read more about our general release process here:

- [Release Dashboard](http://emberjs.com/builds/)
- [The Ember Release Cycle](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
- [The Ember Project](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
- [Ember LTS Releases](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)

---

## Ember.js

Ember.js is the core framework for building ambitious web applications.

### Changes in Ember.js 3.2

Ember.js 3.2 is an incremental, backwards compatible release of Ember with
bugfixes, performance improvements, and minor deprecations.

#### Deprecations in Ember 3.2

Deprecations are added to Ember.js when an API will be removed at a later date.

Each deprecation has an entry in the deprecation guide describing the migration
path to more stable API. Deprecated public APIs are not removed until a major
release of the framework.

Consider using the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon if you would like to upgrade your application without immediately addressing
deprecations.

Three new deprecations are introduces in Ember.js 3.2:

1. Use of `Ember.Logger` is deprecated. You should replace any calls to `Ember.Logger` with calls to `console`. 

In Microsoft Edge and IE11, uses of console beyond calling its methods may require more subtle changes than simply substituting console wherever `Logger` appears. In these browsers, they will behave as they do in other browsers when the development tools are open. 

But, when run  normally, calls to its methods must not be bound to anything other than  the console object. If not, you will receive an Invalid calling object exception. This is a known inconsistency with these browsers. 

To avoid this, transform the following:

```
var print = Logger.log; // assigning method to variable
```

to:

```
// assigning method bound to console to variable
var print = console.log.bind(console);
```

Also, transform any of the following:

```
Logger.info.apply(undefined, arguments); // or
Logger.info.apply(null, arguments); // or
Logger.info.apply(this, arguments); // or
```

to:

```
console.info.apply(console, arguments);
```

Finally, because node versions before version 9 don't support console.debug, you may want to transform the following:

```
Logger.debug(message);
```

to:

```
if (console.debug) {
  console.debug(message);
} else {
  console.log(message);
}
```

**Add-on Authors**

If your add-on needs to support both Ember 2.x and Ember 3.x clients, you will need to test for the existence of console before calling its methods. If you do much logging, you may find it convenient to define your own wrapper. Writing the wrapper as a service will provide for dependency injection by tests and perhaps even clients.

2. The `Router#route` private API has been renamed to `Router#_route`. This is to avoid collisions with user-defined properties or methods.

If you want access to the router, you should inject the router service into the route like this:

```
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service()
});
```

3. Use defineProperty to define computed properties. 

Although uncommon, it is possible to assign computed properties directly to objects. This way they are implicitly computed from eg Ember.get. 

Assigning computed properties directly is deprecated to support ES5 getter computed properties. You should replace these assignments with calls to defineProperty.

For example, the following:

```
let object = {};
object.key = Ember.computed(() => 'value');
Ember.get(object, 'key') === 'value';
```

Should be changed to:

```
let object = {};
Ember.defineProperty(object, 'key', Ember.computed(() => 'value'));
Ember.get(object, 'key') === 'value';
```

For more details on changes in Ember.js 3.2, please review the
[Ember.js 3.2.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.2.0).

### Upcoming Changes in Ember.js 3.3

Ember.js 3.3 will introduce two new features:

* TODO
* TODO

#### Deprecations in Ember.js 3.3

Two new deprecations are introduces in Ember.js 3.3:

* TODO
* TODO

For more details on the upcoming changes in Ember.js 3.3, please review the
[Ember.js 3.3.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v3.3.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.2

#### Deprecations in Ember Data 3.2

Two new deprecations are introduces in Ember Data 3.2:

* TODO
* TODO

For more details on changes in Ember Data 3.2, please review the
[Ember Data 3.2.0 release page](https://github.com/emberjs/data/releases/tag/v3.2.0).


### Upcoming changes in Ember Data 3.3


#### Deprecations in Ember Data 3.3

For more details on the upcoming changes in Ember Data 3.3, please review the
[Ember Data 3.3.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v3.3.0-beta.1).

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
blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v3.1.0...v3.2.0)
and [addons](https://github.com/ember-cli/ember-addon-output/compare/v3.1.0...v3.2.0).

### Changes in Ember CLI 3.2

#### Deprecations in Ember CLI 3.2

Two new deprecations are introduces in Ember CLI 3.2:

* TODO
* TODO

For more details on the changes in Ember CLI 3.2 and detailed upgrade
instructions, please review the [Ember CLI  3.2.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.2.0).

### Upcoming Changes in Ember CLI 3.3

#### Deprecations in Ember CLI 3.3

For more details on the changes in Ember CLI 3.3.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.3.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.3.0-beta.1).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
