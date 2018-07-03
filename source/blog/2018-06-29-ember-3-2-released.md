---
title: Ember 3.2 Released
author: Robert Jackson, Melanie Sumner & Kenneth Larsen
tags: Releases, 2018, 3, 3.2
responsive: true
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

Ember.js 3.2 is an incremental, backwards compatible release of Ember with bugfixes, performance improvements, and minor deprecations. There is one (1) new feature and three (3) deprecations in this version.

#### New Features (1)

##### Block let template helper (1 of 1)

The new `let` template helper makes it possible to create new bindings in templates. It is like `with` but without the conditional rendering of the block depending on values passed to the block.

Let's say we need to capitalize the first name and last name in our template. We could do something like this:

```handlebars
Welcome back {{concat (capitalize person.firstName) ' ' (capitalize person.lastName)}}

Account Details:
First Name: {{capitalize person.firstName}}
Last Name: {{capitalize person.lastName}}
```

This could result in an error since we have to keep track of this throughout the template. Thankfully, this is now easier with the `let` helper:

```handlebars
{{#let (capitalize person.firstName) (capitalize person.lastName)
  as |firstName lastName|
}}
  Welcome back {{concat firstName ' ' lastName}}

  Account Details:
  First Name: {{firstName}}
  Last Name: {{lastName}}
{{/let}}
```

Now you can use `firstName` and `lastName` inside the `let` block with the comfort of knowing that the logic is in a single place. This is a neat way of introducing bindings in your templates without making them properties on the controller or component.

What is important to know about the `let` helper is that it only works as a block helper. This means that you cannot do like this:

```handlebars
{{let
  firstName=(capitalize person.firstName)
  lastName=(capitalize person.lastName)
}}
```

#### Deprecations (3)

Deprecations are added to Ember.js when an API will be removed at a later date. Each deprecation has an entry in the deprecation guide describing the migration path to more stable API. Deprecated public APIs are not removed until a major release of the framework.

Consider using the [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) addon if you would like to upgrade your application without immediately addressing deprecations.

##### Use of Ember.Logger (1 of 3)

Use of `Ember.Logger` is deprecated. You should replace any calls to `Ember.Logger` with calls to `console`.

In Microsoft Edge and IE11, uses of console beyond calling its methods may require more subtle changes than simply substituting console wherever `Logger` appears. In these browsers, they will behave as they do in other browsers when the development tools are open.

But, when run normally, calls to its methods must not be bound to anything other than  the console object. If not, you will receive an Invalid calling object exception. This is a known inconsistency with these browsers.

To avoid this, transform this:

```javascript
var print = Logger.log; // assigning method to variable
```

into this:

```javascript
// assigning method bound to console to variable
var print = console.log.bind(console);
```

Also, transform any of the following:

```javascript
Logger.info.apply(undefined, arguments); // or
Logger.info.apply(null, arguments); // or
Logger.info.apply(this, arguments); // or
```

into this:

```javascript
console.info.apply(console, arguments);
```

Finally, because node versions before version 9 don't support console.debug, you may want to transform the following:

```javascript
Logger.debug(message);
```

into this:

```javascript
if (console.debug) {
  console.debug(message);
} else {
  console.log(message);
}
```

**Note for Add-on Authors** - If your add-on needs to support both Ember 2.x and Ember 3.x clients, you will need to test for the existence of console before calling its methods. If you do much logging, you may find it convenient to define your own wrapper. Writing the wrapper as a service will provide for dependency injection by tests and perhaps even clients.

##### Private API Router#router renamed (2 of 3)

In order to avoid collisions with user-defined properties or methods, the `Router#router` private API has been renamed to `Router#_router`. If you want access to the router, you should inject the router service into the route like this:

```javascript
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service()
});
```

##### Define computed properties with defineProperty (3 of 3)

Use `defineProperty` (via `import { defineProperty } from '@ember/object';`) to define computed properties. Although uncommon, it is possible to assign computed properties directly to objects. This way they are implicitly computed from things like `Ember.get`. Assigning computed properties directly is deprecated to support ES5 getter computed properties, and you should replace these assignments with calls to `defineProperty`.

For example, the following:

```javascript
import { computed, get } from '@ember/object';
let object = {};
object.key = computed(() => 'value');
get(object, 'key') === 'value';
```

Should be changed to this:

```javascript
import { computed, defineProperty, get } from '@ember/object';
let object = {};
defineProperty(object, 'key', computed(() => 'value'));
get(object, 'key') === 'value';
```

For more details on changes in Ember.js 3.2, please review the [Ember.js 3.2.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.2.0).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.2

There are four (4) new features and zero (0) deprecations in the Ember Data 3.2 release.

#### New Features (4)

##### Lazy Relationship Payloads (1 of 4)

In Ember Data 2.14 lazy-relationship parsing was introduced. Because this parsing used left-side/right-side keying, this meant it was not compatible with polymorphic relationships.

With Ember Data 3.2 this is [now fixed](https://github.com/emberjs/data/pull/5230).

##### Ember Data Feature Flag Removal (2 of 4)

The current feature flags for Ember Data has gone stale, therefore they are all [removed in Ember Data 3.2](https://github.com/emberjs/data/pull/5384). Ember Data is going to attempt to go in a different direction with some of the planned changes for 2018.

If your app depends on enabling these feature flag to run, please reach out to the Ember Data team by opening a github issue on the [Ember Data repo](https://github.com/emberjs/data/issues) and the Ember Data team will try to assist with the transition.

##### Feature Flag `ds-improved-ajax` (3 of 4)

The Ember Data team has released an addon that will support the `ds-improved-ajax` API.

##### Feature Flag `ds-pushpayload-return` (4 of 4)

If you rely on the `ds-pushpayload-return` feature flag, you can use the following pattern to manually serialize the API response and push the record into the store.

```javascript
export function pushPayload(store, modelName, rawPayload) {
   let ModelClass = store.modelFor(modelName);
   let serializer = store.serializerFor(modelName);

   let jsonApiPayload = serializer.normalizeResponse(store, ModelClass, rawPayload, null, 'query');

  return store.push(jsonApiPayload);
}
```

```diff
+import { pushPayload } from '<app-name>/utils/push-payload';

...

-this.get('store').pushPayload(modelName, rawPayload);
+pushPayload(this.get('store'), modelName, rawPayload);
```

#### Deprecations (0)

There are no deprecations introduced in Ember Data 3.2.

For more details on changes in Ember Data 3.2, please review the
[Ember Data 3.2.0 release page](https://github.com/emberjs/data/releases/tag/v3.2.0).

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

After running the upgrade command run `ember init` inside of the project directory to apply the blueprint changes. You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v3.1.0...v3.2.0) and [addons](https://github.com/ember-cli/ember-addon-output/compare/v3.1.0...v3.2.0).

### Changes in Ember CLI 3.2

There is one (1) new features and one (1) deprecation in the Ember CLI 3.2 release.

#### New Features (1)

##### qunit-dom (1 of 1)

In order to make DOM assertions more readable, the [qunit-dom](https://github.com/simplabs/qunit-dom/) dependency will be added **by default** to all apps and addons. Opt out by removing it from your package.json file. See [https://github.com/simplabs/qunit-dom-codemod](https://github.com/simplabs/qunit-dom-codemod) to ease migration.

This is, to put it quite simply, totally awesome. It means that this code:

```javascript
assert.equal(this.element.querySelector('.title').textContent.trim(), 'Hello World!');
```

becomes this:

```javascript
assert.dom('.title').hasText('Hello World!');
```

See what I mean? Totally awesome. <3

#### Deprecations (1)

##### ember-cli-babel 5 (1 of 1)

This release of Ember CLI [deprecates `ember-cli-babel` 5.x](https://github.com/ember-cli/ember-cli/pull/7676). Babel 6 support has been out for a long time now and works quite well. Babel 5 support is deprecated and is expected to be dropped soon.

For more details on the changes in Ember CLI 3.2.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.2.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.2.0-beta.1).

Thank you to [@GavinJoyce](https://github.com/GavinJoyce), [@Turbo87](https://github.com/Turbo87), [@cibernox](https://github.com/cibernox), [@iezer](https://github.com/iezer), [@kellyselden](https://github.com/kellyselden), [@raytiley](https://github.com/raytiley), [@t-sauer](https://github.com/t-sauer), and [@thetimothyp](https://github.com/thetimothyp)
for your incredible work on ember-cli!

For more details on the changes in Ember CLI 3.2 and detailed upgrade
instructions, please review the [Ember CLI  3.2.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.2.0).

## Thank You!

As a community-driven open-source project with an ambitious scope, each of these releases serve as a reminder that the Ember project would not have been possible without your continued support. We are extremely grateful to our contributors for their efforts.
