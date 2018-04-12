---
title: Ember 3.1 and 3.2 Beta Released
author: Ricardo Mendes
tags: Releases
responsive: true
---

Today the Ember project is releasing version 3.1.0 of Ember.js, Ember Data, and Ember CLI.

This release kicks off the 3.2 beta cycle for all sub-projects. We encourage our
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

### Changes in Ember.js 3.1

Ember 3.1 is a minor release containing several new features and bug fixes. It includes a bump of Glimmer VM, Ember's rendering implementation, to version 0.30.5.

#### ES5 Getters for Computed Properties (1 of 5)

Ember's object system has long used `set` and `get` to access properties. These APIs came from the codebase's origins in SproutCore, and predated ES5's `defineProperty`. In recent years native JavaScript setter and getter implementations have become fast and mature.

Starting in Ember 3.1 (and described in [RFC281](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md)) you are now able to read the value of a computed property using a native ES5 getter. For example, this component which uses computed properties:

```js
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  name: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  message: computed('name', function() {
    return `Hello ${this.get('name')}!`;
  });

});
```

Can be re-written using ES5 getters:

```js
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  name: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),

  message: computed('name', function() {
    return `Hello ${this.name}!`;
  })

});
```

Legacy `get` features are not deprecated or removed in 3.1. In fact there are
several cases where you must still use `get`:

- If you are calling `get` with a chained path. For example in `this.get('a.b.c')` if `b` is `undefined` the return value is `undefined`. Converting this
to `this.a.b.c` when `b` is `undefined` would instead raise an exception.
- If your object is using `unknownProperty` you must continue to use `get`. Using an ES5 getter on an object with `unknownProperty` will cause an assertion failure in development.
- Ember Data returns promise proxy objects when you read an async relationship and from other API. Ember proxy objects, including promise proxies, still require that you call `get` to read values.

With these caveats in mind, how should you know if you can convert a `get` call to a native getter? If you have code where `get` is called on `this` you likely can convert it. If you have a `get` on another object, `anything.get('foo')`, you should exercise caution when converting to a native getter.

The community-provided [es5-getter-ember-codemod](https://github.com/rondale-sc/es5-getter-ember-codemod) is a great way to convert your existing codebase to ES5 getters. It follows the conservative guidelines and only converts `this.get`. Note that it cannot make all possible conversions to the new API, nor can it ensure 100% of the conversions it makes are correct. If your app has poor test coverage or you lack any confidence in your ability to make regression checks, a manual and gradual conversion process may be more appropriate.

Thanks to [Chris Garrett](https://twitter.com/pzuraq) for pushing forward work on ES5 getters with support from [Godfrey Chan](https://twitter.com/chancancode), [Robert Jackson](https://twitter.com/rwjblue/), and [Kris Selden](https://twitter.com/krisselden)). Thanks to [Jonathan Jackson](https://twitter.com/rondale_sc/) for his work on the codemod.

#### Introducing Optional Features (2 of 5)

Because major releases of Ember are not supposed to make breaking changes without prior deprecation, the project has been extremely conservative about changing behaviors that don't have a clear deprecation path. As a result, we've had several quirks of the framework linger into the 3.x series.

To give the project a path forward when a breaking change is mandatory, we've released the [`@ember/optional-features`](https://github.com/emberjs/ember-optional-features) addon. Today this addon is opt-in via installation as an NPM dependency. In a future release of Ember it will become part of the default application blueprint.

This addon does nothing by default, but provides a command-line interface to enable and disable breaking changes in Ember. Two optional features are being introduced in Ember 3.1.

To install ember-optional-features:

```bash
ember install @ember/optional-features
```

Thanks to [Godfrey Chan](https://twitter.com/chancancode) and [Robert Jackson](https://twitter.com/rwjblue/) for their work on the optional features system.

#### New Optional Feature: Application Template Wrapper (3 of 5) 

Ember applications have long created a wrapping `div` around their rendered content: `<div class="ember-view">`. With ember-optional-features, this functionality can now be disabled:

```
ember feature:disable application-template-wrapper
```

Disabling this feature will stop Ember from creating a `div` around the application. This change may require alterations to your application's CSS, or to any other code that depends upon the presence of the `div`.

Additionally, enabling this feature will prompt you to optionally run a codemod to add the application `div` to the `application.hbs` of your application.

Although disabling this feature will eventually be the default for Ember, leaving the feature enabled is not deprecated in this release. You can read more details about this optional feature and the motivations for introducing it in [RFC #280](https://github.com/emberjs/rfcs/blob/master/text/0280-remove-application-wrapper.md).

#### New Optional Feature: Template-only Glimmer Components (4 of 5)

Ember components implicitly create an element in the DOM where they are invoked, and the contents of their templates are then treated as "innerHTML" inside that DOM element. For example, this component template:

```app/templates/components/hello-world.hbs
Hello World!
```

When invoked as:

```app/templates/index.hbs
<section>
  {{hello-world}}
</section>
```

Would render with an implicit `div`:

```html
<section>
  <div class="ember-view">
    Hello World!
  </div>
</section>
```

The treatment of templates as "innerHTML" in Ember makes several parts of the framework's API harder to learn. For example, setting a class on an element in a template is straight forward, and any developer comfortable with HTML should be comfortable doing so. However adding a class to the implicit component `div` is more difficult, requiring the developer to create a JavaScript file for the component and use the `classNames` property.

To resolve this tension, Glimmer components shift templates to be treated as "outerHTML". There is no implicit `div`. All the DOM elements created by the renderer are in a template.

The "Template-only Glimmer Component" feature provides a first practical step in this direction. You can enable this feature by running:

```bash
ember feature:enable template-only-glimmer-components
```

Once enabled, any component template file without a corresponding JavaScript file will behave like "outerHTML". For example the component file:

```app/templates/components/hello-world.hbs
Hello World!
```

Without any corresponding JavaScript file, and invoked as:

```app/templates/index.hbs
<section>
  {{hello-world}}
</section>
```

Would render without an implicit div, as follows:

```html
<section>
  Hello World!
</section>
```

Enabling this feature may require changes to your application's CSS, or to any other code dependent upon the presence of `div`s for JavaScript-free components. In practice, most applications and nearly all addons use the Ember CLI generators for new components, which include a JavaScript file. If your application has template-only components which rely on a backing `EmberComponent` class, for example, if they have an injected-by-type service, note that they would also lose access to that backing class.

However, enabling this feature will prompt you to optionally run a codemod which creates backing classes for all template-only components, meaning both the implicit `div` and backing class are retained.

Although enabling this feature will eventually be the default for Ember, leaving the feature disabled is not deprecated in this release. You can read more details about this optional feature and the motivations for introducing it in [RFC #278](https://github.com/emberjs/rfcs/blob/master/text/0278-template-only-components.md).

#### Positional Params Bug Fix (5 of 5)

Ember introduced contextual components in Ember 2.3. Contextual components close over arguments and are intended to do so in a manner consistent with closures in JavaScript.

As the implementation of contextual components has been refined in the Glimmer VM, a notable discrepancy has been noticed in how they handle positional params. Given the following template:

```hbs
{{#with (component 'x-foo' 1 2 3) as |comp|}}
  {{component comp 4 5 6}}
{{/with}}
```

The params of `4, 5, 6` would *override* those of `1, 2, 3`. Normal closure implementations would instead have appended the arguments to result in a positional argument list of `1, 2, 3, 4, 5, 6`.

In Ember 3.1 we've corrected the implementation to act like a proper closure. In researching the impact of this breaking bug fix we found no known public addons or applications which would be impacted.

For more information about this change see
[emberjs/ember.js#15287](https://github.com/emberjs/ember.js/pull/15287).

### Deprecations in Ember 3.1

Deprecations are added to Ember.js when an API will be removed at a later date.

Each deprecation has an entry in the deprecation guide describing the migration
path to more stable API. Deprecated public APIs are not removed until a major
release of the framework.

Consider using the
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
addon if you would like to upgrade your application without immediately addressing
deprecations.

**Two** new deprecations are introduced in Ember.js 3.1:

1. Calling `array.get('@each')` is deprecated. `@each` may only be used as dependency key.
2. The private APIs `propertyWillChange` and `propertyDidChange` will be removed after the first LTS of the 3.x cycle. You should remove any calls to `propertyWillChange` and replace any calls to `propertyDidChange` with `notifyPropertyChange`. This applies to both the Ember global version and the EmberObject method version.

For example, the following:

```javascript
Ember.propertyWillChange(object, 'someProperty');
doStuff(object);
Ember.propertyDidChange(object, 'someProperty');

object.propertyWillChange('someProperty');
doStuff(object);
object.propertyDidChange('someProperty');
```

Should be changed to:

```javascript
doStuff(object);
Ember.notifyPropertyChange(object, 'someProperty');

doStuff(object);
object.notifyPropertyChange('someProperty');
```

If you are an addon author and need to support both Ember applications greater than 3.1 *and* less than 3.1 you can use the polyfill [ember-notify-property-change-polyfill](https://github.com/rondale-sc/ember-notify-property-change-polyfill).

For more details on changes in Ember.js 3.1, please review the
[Ember.js 3.1.0 release page](https://github.com/emberjs/ember.js/releases/tag/v3.1.0).

### Upcoming Changes in Ember.js 3.2

#### New Features

Ember.js 3.2 will introduce one new feature:

1. Enabled block `let` handlebars helper by default - [emberjs/rfcs#286](https://github.com/emberjs/rfcs/blob/master/text/0286-block-let-template-helper.md)

#### Deprecations

**Three** new deprecations are introduced in Ember.js 3.2:

1. Use of `Ember.Logger` is deprecated. You should replace any calls to `Ember.Logger` with calls to `console`. Read more about this deprecation on the [deprecation page.](https://emberjs.com/deprecations/v3.x#toc_ember-console-deprecate-logger)
2. The `Router#route` private API has been renamed to `Router#_route` to avoid collisions with user-defined properties or methods. Read more about this deprecation on the [deprecation page.](https://emberjs.com/deprecations/v3.x#toc_ember-routing-route-router)
3. Update: replace directly assigned computed properties. Use `defineProperty` to define computed properties. Read more about this deprecation on the [deprecation page.](https://emberjs.com/deprecations/v3.x#toc_ember-meta-descriptor-on-object)

For more details on the upcoming changes in Ember.js 3.2, please review the
[Ember.js 3.2.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v3.2.0-beta.1).

---

## Ember Data

Ember Data is the official data persistence library for Ember.js applications.

Ember Data 3.1 contains bug fixes and build improvements for Ember Data.

### Changes in Ember Data 3.1

#### New Features

[#5273](https://github.com/emberjs/data/pull/5273) client-side-delete semantics `unloadRecord`

#### Deprecations

**Two** new deprecations are introduced in Ember Data 3.1.

* `Ember.Map` was a private API provided by Ember (for quite some time). Unfortunately, ember-data made `Ember.Map` part of its public API surface via documentation blocks. `Ember.Map` will be deprecated and removed from Ember "soon" [(https://github.com/emberjs/rfcs/pull/237)](https://github.com/emberjs/rfcs/pull/237) and we would like to confirm that Ember Data will work without deprecation before and after that happens.`Ember.Map` differs from native `Map` in a few ways:
    * `Ember.Map` has custom `copy` and `isEmpty` methods which are not present in native `Map`
    * `Ember.Map` adds a static `create` method (which simply instantiates itself with `new Ember.Map()`)
    * `Ember.Map` does not accept constructor arguments
    * `Ember.Map` does not have:
      * `@@species`
      * `@@iterator`
      * `entries`
      * `values` This implementation adds a deprecated backwards compatibility for:
          * `copy`
          * `isEmpty`

This is needed because `Map` requires instantiation with `new` and by default Babel transpilation will do `superConstructor.apply(this, arguments)` which throws an error with native `Map`. The desired code (if we lived in an "only native class" world) would be:

  ```js
  export default class MapWithDeprecations extends Map {
    constructor(options) {
      super();
      this.defaultValue = options.defaultValue;
    }
    get(key) {
      let hasValue = this.has(key);
      if (hasValue) {
        return super.get(key);
      } else {
        let defaultValue = this.defaultValue(key);
        this.set(key, defaultValue);
        return defaultValue;
      }
    }
  }
  ```

For more details on changes in Ember Data 3.1, please review the
[Ember Data 3.1.0 release page](https://github.com/emberjs/data/releases/tag/v3.1.0).

### Upcoming changes in Ember Data 3.2

#### Lazy Relationship Payloads (1 of 4)

[#5230](https://github.com/emberjs/data/pull/5230) [BUGFIX] enable lazy-relationship payloads to work with polymorphic relationships

#### Ember Data Feature Flag Removal (2 of 4)

Ember Data 3.2 removes [all current feature flags](https://github.com/emberjs/data/pull/5384) for Ember Data. These feature flags have gone stale and Ember Data is going to
attempt to go a different direction with some of the planned changes for 2018. Many of these feature flags have been around for a long time. If your app depends on enabling these feature flag to run, please reach out to the Ember Data team by opening a github issue on the [Ember Data repo](https://github.com/emberjs/data/issues) and the Ember Data team will try to assist with the transition.

#### Feature Flag `ds-improved-ajax` (3 of 4)

During the Ember Data 3.2 beta cycle, the Ember Data team is planning on releasing an addon that will support the `ds-improved-ajax` API.

#### Feature Flag `ds-pushpayload-return` (4 of 4)

If you rely on the `ds-pushpayload-return` feature flag you can use the following pattern to manually serialize the API response and push the record into the store.

```js
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

### Deprecations in Ember Data 3.2

There are no new deprecations planned for Ember Data 3.2.

For more details on the upcoming changes in Ember Data 3.2, please review the [Ember Data 3.2.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v3.2.0-beta.1).

---

## Ember CLI

Ember CLI is the command line interface for managing and packaging Ember.js applications.

### Upgrading Ember CLI

You may upgrade Ember CLI separately from Ember.js and Ember Data! You can do this either with yarn or npm. 

To upgrade your projects using `yarn`, run:

```bash
yarn upgrade ember-cli
```

To upgrade your projects using `npm`, run:

```bash
npm install --save-dev ember-cli
```

After running the upgrade command, run `ember init` inside of the project directory to apply the blueprint changes.

You can preview those changes for [applications](https://github.com/ember-cli/ember-new-output/compare/v3.0.0...v3.1.0) and [addons](https://github.com/ember-cli/ember-addon-output/compare/v3.0.0...v3.1.0).

### Changes in Ember CLI 3.1

#### New Features

- Updates to blueprints & addons- replace `test` with `test:all`. The command `test` will now run `ember test` (like it does in apps); the `test:all` command will use `ember-try` to run tests in all configured scenarios [(#7601)](https://github.com/ember-cli/ember-cli/pull/7601).
- Yarn related changes: 
  - `yarn.lock` file detection improved - Use yarn instead of npm when part of a yarn workspace root [(#7492)](https://github.com/ember-cli/ember-cli/pull/7492).
- Ability to install optional dependencies when creating a new project [(#7573)](https://github.com/ember-cli/ember-cli/pull/7573).
- Glimmer blueprint fixes:
  - Added feature flag to `project.isModuleUnification` [(#7586)](https://github.com/ember-cli/ember-cli/pull/7586).
  - Added `project.isModuleUnification()` [(#7541)](https://github.com/ember-cli/ember-cli/pull/7541).

#### Deprecations

No new deprecations are introduced in Ember CLI 3.1:

For more details on the changes in Ember CLI 3.1 and detailed upgrade instructions, please review the [Ember CLI  3.1.0 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.1.0).

### Upcoming Changes in Ember CLI 3.2

- Qunit-dom <!-- in beta qunit-dom is a big deal, needs maybe an example and definitely links to docs etc. -->
  - `qunit-dom` will be added by default to all apps and addons, if you don't (plan to) use it, you don't have to add it. https://github.com/simplabs/qunit-dom-codemod exists to ease migration.
  - Added `qunit-dom` dependency by default for blueprints/addons [(#7605)](https://github.com/ember-cli/ember-cli/pull/7605).
- Experiments with more efficient transpilation <!-- there is probably something to say about the transpilation improvements -->
  - add delayed transpilation [(#7501)](https://github.com/ember-cli/ember-cli/pull/7501).
  - compile all addons at once optimization [#7650](https://github.com/ember-cli/ember-cli/pull/7650).
- More comprehensive detect if ember-cli is being run within CI or not. [(#7637)](https://github.com/ember-cli/ember-cli/pull/7637) - see https://github.com/watson/ci-info/.
- Module Unification Continues...
  - Module Unification Addon blueprint [(#7658)](https://github.com/ember-cli/ember-cli/pull/7658).
  - Module Unification Addons [(#7490)](https://github.com/ember-cli/ember-cli/pull/7490).
  - Improve logic for if addon is module-unification [(#7660)](https://github.com/ember-cli/ember-cli/pull/7660).
  - MU addons must generate a MU dummy app [(#7667)](https://github.com/ember-cli/ember-cli/pull/7667).
  - Use a recent release of Ember canary for MU [(#7678)](https://github.com/ember-cli/ember-cli/pull/7678).

### Deprecations in Ember CLI 3.2

- Deprecate ember-cli-babel 5.x [(#7676)](https://github.com/ember-cli/ember-cli/pull/7676). Babel 6 support has been out for a long time now and works quite well. Babel 5 support is deprecated and will be dropped soon.

For more details on the changes in Ember CLI 3.2.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.2.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.2.0-beta.1).

Thank you to [@GavinJoyce](https://github.com/GavinJoyce), [@Turbo87](https://github.com/Turbo87), [@cibernox](https://github.com/cibernox), [@iezer](https://github.com/iezer), [@kellyselden](https://github.com/kellyselden), [@raytiley](https://github.com/raytiley), [@t-sauer](https://github.com/t-sauer), and [@thetimothyp](https://github.com/thetimothyp)
for your incredible work on ember-cli!

## Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases serve as a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
