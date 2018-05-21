---
title: Ember 3.1 Beta Released
responsive: true
author: Matthew Beale
tags: Releases, 3, 3.1, 2018
---

Today we're releasing Ember 3.1-beta.1, including releases of Ember.js, Ember
Data, and Ember CLI.

Traditionally beta releases share a blog post with the
corresponding stable release, however to keep our messaging clear during the
transition we've split them up today. See the [Ember 3.0
Release Post](/blog/2018/02/14/ember-3-0-released.html) for more details on Ember 3.0.

## Ember.js

---

Ember.js is the core of the Ember framework. It provides routing, rendering, and
dependency injection features.

### Changes in Ember.js 3.1-beta.1

Ember 3.1-beta is an minor release containing several new features and bug
fixes. It includes a bump of Glimmer VM, Ember's rendering implementation,
to version 0.30.5. Per our release cycle, these features will be released as
3.1 stable in six weeks.

#### ES5 Getters for Computed Properties

Ember's object system has long used `set` and `get` to access properties.
These APIs came from the codebase's origins in SproutCore, and predated ES5's
`defineProperty`. In recent years native JavaScript setter and getter
implementations have become fast and mature.

Starting in Ember 3.1 (and described in [RFC
281](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md)) you
are now able to read the value of a computed property using a native ES5 getter.
For example, this component which uses computed properties:

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

* If you are calling `get` with a chained path. For example in `this.get('a.b.c')`
if `b` is `undefined` the return value is `undefined`. Converting this
to `this.a.b.c` when `b` is `undefined` would instead raise an exception.
* If your object is using `unknownProperty` you must continue to use `get`.
Using an ES5 getter on an object with `unknownProperty` will cause an
assertion failure in development.
* Ember Data returns promise proxy objects when you read an async relationship
and from other API. Ember proxy objects, including promise proxies, still
require that you call `get` to read values.

With these caveats in mind, how should you know if you can convert a `get`
call to a native getter? If you have code where `get` is called on `this` you
likely can convert it. If you have a `get` on another object,
`anything.get('foo')`, you should exercise caution when converting to a native
getter.

The community-provided
[es5-getter-ember-codemod](https://github.com/rondale-sc/es5-getter-ember-codemod)
is a great way to convert your existing codebase to ES5 getters. It follows
the conservative guidelines and only converts `this.get`. Note that it cannot
make all possible conversions to the new API, nor can it ensure 100% of the
conversions it makes are correct. If your app has poor test coverage or you
lack any confidence in your ability to make regression checks, a manual
and gradual conversion process may be more appropriate.

Thanks to [Chris Garrett](https://twitter.com/pzuraq) for pushing forward
work on ES5 getters with support from [Godfrey
Chan](https://twitter.com/chancancode),
[Robert Jackson](https://twitter.com/rwjblue/), and [Kris
Selden](https://twitter.com/krisselden)). Thanks to [Jonathan
Jackson](https://twitter.com/rondale_sc/) for his work on the codemod.

#### Introducing Optional Features

Because major releases of Ember are not supposed to make breaking changes
without prior deprecation, the project has been extremely conservative about
changing behaviors that don't have a clear deprecation path. As a result, we've
had several quirks of the framework linger into the 3.x series.

To give the project a path forward when a breaking change is mandatory, we've
released the
[`@ember/optional-features`](https://github.com/emberjs/ember-optional-features)
addon. Today this addon is opt-in via installation as an NPM dependency. In a
future release of Ember it will become part of the default application
blueprint.

This addon does nothing by default, but provides a command-line interface to
enable and disable breaking changes in Ember. Two optional features are being
introduced in Ember 3.1.

To install ember-optional-features:

```bash
ember install @ember/optional-features
```

Thanks to [Godfrey Chan](https://twitter.com/chancancode) and [Robert
Jackson](https://twitter.com/rwjblue/) for their work on the optional features
system.

#### New Optional Feature: Application Template Wrapper

Ember applications have long created a wrapping `div` around their rendered
content: `<div class="ember-view">`. With ember-optional-features, this
functionality can now be disabled:

```
ember feature:disable application-template-wrapper
```

Disabling this feature will stop Ember from creating a `div` around the
application. This change may require alterations to your application's CSS, or
to any other code that depends upon the presence of the `div`.

Additionally, enabling this feature will prompt you to optionally run a codemod
to add the application `div` to the `application.hbs` of your application.

Although disabling this feature will eventually be the default for Ember,
leaving the feature enabled is not deprecated in this release. You can read more
details about this optional feature and the motivations for introducing it in
[RFC #280](https://github.com/emberjs/rfcs/blob/master/text/0280-remove-application-wrapper.md).

#### New Optional Feature: Template-only Glimmer Components

Ember components implicitly create an element in the DOM where they are
invoked, and the contents of their templates are then treated as "innerHTML"
inside that DOM element. For example, this component template:

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

The treatment of templates as "innerHTML" in Ember makes several parts of the
framework's API harder to learn. For example, setting a class on an element in
a template is straight forward, and any developer comfortable with HTML should
be comfortable doing so. However adding a class to the implicit component `div`
is more difficult, requiring the developer to create a JavaScript file for the
component and use the `classNames` property.

To resolve this tension, Glimmer components shift templates to be treated as
"outerHTML". There is no implicit `div`. All the DOM elements created by the
renderer are in a template.

The "Template-only Glimmer Component" feature provides a first practical step
in this direction. You can enable this feature by running:

```bash
ember feature:enable template-only-glimmer-components
```

Once enabled, any component template file without a corresponding JavaScript
file will behave like "outerHTML". For example the component file:

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

Enabling this feature may require changes to your application's CSS, or to any
other code dependent upon the presence of `div`s for JavaScript-free components.
In practice, most applications and nearly all addons use the Ember CLI generators
for new components, which include a JavaScript file. If your application
has template-only components which rely on a backing `EmberComponent` class, for
example, if they have an injected-by-type service, note that they would also lose access
to that backing class.

However, enabling this feature will prompt you to optionally run a codemod
which creates backing classes for all template-only components, meaning
both the implicit `div` and backing class are retained.

Although enabling this feature will eventually be the default for Ember, leaving
the feature disabled is not deprecated in this release. You can read more
details about this optional feature and the motivations for introducing it in
[RFC #278](https://github.com/emberjs/rfcs/blob/master/text/0278-template-only-components.md).

#### Positional Params Bug Fix

Ember introduced contextual components in Ember 2.3. Contextual components
close over arguments and are intended to do so in a manner consistent with
closures in JavaScript.

As the implementation of contextual components has been refined in the Glimmer
VM, a notable discrepancy has been noticed in how they handle positional
params. Given the following template:

```hbs
{{#with (component 'x-foo' 1 2 3) as |comp|}}
  {{component comp 4 5 6}}
{{/with}}
```

The params of `4, 5, 6` would *override* those of `1, 2, 3`. Normal closure
implementations would instead have appended the arguments to result in a
positional argument list of `1, 2, 3, 4, 5, 6`.

In Ember 3.1 we've corrected the implementation to act like a proper closure.
In researching the impact of this breaking bug fix we found no known public
addons or applications which would be impacted.

For more information about this change see
[emberjs/ember.js#15287](https://github.com/emberjs/ember.js/pull/15287).

For more details on the changes in Ember.js 3.1-beta.1, please review the
[Ember.js 3.1.0-beta.1 release page](https://github.com/emberjs/ember.js/releases/tag/v3.1.0-beta.1).

## Ember Data

---

Ember Data is the official data persistence library for Ember.js applications.

### Changes in Ember Data 3.1-beta.1

Ember Data 3.1-beta.1 contains minor bug fixes and improvements. For more
details on the changes in Ember Data 3.1-beta.1, please review the [Ember Data
3.1.0-beta.1 release page](https://github.com/emberjs/data/releases/tag/v3.1.0-beta.1).

## Ember CLI

---

Ember CLI is the command line interface for managing and packaging Ember.js
applications.

### Changes in Ember CLI 3.1.0-beta.1

Ember CLI contains minor bug fixes and improvements.

Additionally, it changes the default addon blueprint to align `npm test` with
the behavior of the app blueprint, which is running `ember test`.
Previously `npm test` in an addon would run `ember try:each`, which is now
available as `npm run test:all` (or `yarn test:all` for those running yarn).

For more details on the changes in Ember CLI 3.1.0-beta.1 and detailed upgrade
instructions, please review the [Ember CLI 3.1.0-beta.1 release page](https://github.com/ember-cli/ember-cli/releases/tag/v3.1.0-beta.1).

### Thank You!

As a community-driven open-source project with an ambitious scope, each of
these releases is a reminder that the Ember project would not have been
possible without your continued support. We are extremely grateful to our
contributors for their efforts.
