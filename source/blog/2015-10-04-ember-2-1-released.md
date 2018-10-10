---
title: Ember.js 2.1 and 2.2 Beta Released
author: Matthew Beale
tags: Releases, 2015, Version 2.x
responsive: true
---

Ember.js 2.1, a minor version release of Ember with additive features only, is released today. This release represents the work of over 82 direct contributors, and over 850 commits.

Ember.js 2.2 beta, the branch of Ember that will be released as stable in roughly six weeks, is also being released today.

## New Features in Ember.js 2.1

Changes to the Ember's API in 2.1 are backwards compatible. A summary of the new features in today's release follows.

#### `{{get}}` Helper

The `{{get}}` helper allows dynamic property lookup on objects in templates.
For example, these two usages are equivalent:

```handlebars
{{user.name}}
{{get user "name"}}
```

A property with a value of a string can be passed as the second argument,
making both the object and the property being read dynamic. For example:

```handlebars
{{get user somePropertyName}}
```

For documentation on `get`, reference the [API documentation](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_get).

Big thanks to [@jmurphyau](https://twitter.com/jmurphyau) for the
implementation of this feature, and for his excellent
[ember-get-helper](https://github.com/jmurphyau/ember-get-helper) addon that
demonstrated how useful this helper would be. Using his
[ember-truth-helpers](https://github.com/jmurphyau/ember-truth-helpers) addon
in 1.13 codebases is highly recommended.

#### `{{each-in}}` Helper

The `{{each-in}}` helper iterates keys and values of an object. It is similar
conceptually to the `for (key in object) {` syntax of JavaScript. For example,
this code would display a list of all property names and values on the `user`
object:

```handlebars
<ul>
{{#each-in user as |key value|}}
  <li>{{key}}: {{value}}</li>
{{/each-in}}
</ul>
```

When using `{{each-in}}`, the iterated list of keys will be unbound. If a new
property is set on `user` with `user.newProp = 'newVal';`, the new property
will not appear.

For documentation on the `{{each-in}}` helper, see the [API documentation](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_each-in).

Thanks to [@tomdale](https://twitter.com/tomdale) for the
implementation of this feature, and thanks to
[@miguelcamba](https://twitter.com/miguelcamba) for his followup PRs.

#### Registry and Container Reform

The Ember.js registry and container are some of the most extensively used
private APIs in the framework. They
provided one of the only ways to lookup arbitrary objects from Ember's
dependency container.

We are committed to stabilizing this part of the framework and
offering public APIs. This first step creates a normalized way to interact
with `register` and `lookup` that we expect to last through the 2.x cycle
and beyond.

In 2.1, `Ember.Application` instances are passed as the first argument to `initializer`
hooks. `initializer` hooks are where dependencies between object types
can be configured, and factories can be registered. Several public APIs will
exist on `Ember.Application` instances, some of them new:

* `register` - register a factory
* `inject` - inject a factory into another factory, or all factories of a type
* `unregister` - remove a factory from registration
* `resolveRegistration` - fetch a registered factory
* `hasRegistration` - check for a registered factory
* `registerOption`, `registeredOption`, `registerOptions`, `registeredOptions`,
  `registerOptionsForType`, `registeredOptionsForType` which manage options
  for a factory (is it a singleton, can it be instantiated).

`Ember.ApplicationInstance` instances are passed as the first argument to
`instanceInitializer` hooks in 2.1. `instanceInitializer` hooks are where
factories can be fetched out of the configured and booted application.
One relevant public APIs exists on `Ember.ApplicationInstance`s:

* `lookup` - fetch an instance of a factory (with dependencies)

You can find updates to the guides regarding initializers in the revamped [Application Concerns](http://guides.emberjs.com/v2.1.0/applications/applications-and-instances/) section. The
API documentation is similarly updated at the [ember-application namespace](http://emberjs.com/api/modules/ember-application.html), [Ember.Application](http://emberjs.com/api/classes/Ember.Application.html) class, and [Ember.ApplicationInstance](http://emberjs.com/api/classes/Ember.ApplicationInstance.html) class.

This feature also introduces two minor deprecations:

* Expecting two arguments for an initializer hook is deprecated
* Calling `appInstance.container.lookup` on the first argument to an instance
  initializer is deprecated in favor of `appInstance.lookup`.

Deprecations flag where we expect to change an API in the future. It is not
recommended that you use deprecated functionality, but you can also safely
silence a deprecation message and continue to use that functionality until
its removal date.

A huge thanks to the tireless [@dgeb](https://twitter.com/dgeb) for his work on the
RFC, implementation, and documentation for these changes. They represent a significant
improvement in Ember's dependency injection system.

#### Deprecate and Warn Handlers

In the run up to Ember 2.0, it became clear that the tooling for management of
deprecations was poor. One of the reasons for this was the lack of a public,
documented API for deciding how a deprecations and warnings should be handled.
2.1 introduces a proper API for our tooling to build upon.

The default behavior of a deprecation or warning is to log to the console. To change
this behavior, register a handler and write custom logic. For example this
handler would throw an exception for any deprecation messages with the word
`should` in them:

```js
Ember.Debug.registerDeprecationHandler((message, options, next) => {
  if (message.indexOf('should') !== -1) {
    throw new Error('Deprecation message with should: '+message);
  } else {
    // defer to whatever handler was registered before this one
    next(message, options);
  }
});
```

In this example, all warnings are silenced:

```js
// next is not called, so no warnings get the default behavior
Ember.Debug.registerWarnHandler(() => {});
```

Handlers are provided with the following data through arguments:

* `message` is the text logged by default
* `options` is an object containing at minimum the property `id` in the format `package-name.specific-deprecation`
* `next` is a caller for the previously registered handler. Often, this is the
  default handler.

Deprecation handlers will also be provided:

* `options.until` is the version of Ember this feature and deprecation will be
  removed in

As of Ember 2.0, `deprecate` and `warn` calls must provide an `id` option,
and `deprecate` calls must additionally provide an `until` option.
Addons not providing this data during
2.x will trigger a deprecation warning.

For more information see the [Ember.Debug](http://emberjs.com/api/classes/Ember.Debug.html)
API documentsion. This API can be used with previous versions of Ember via the
[ember-debug-handlers-polyfill](https://github.com/rwjblue/ember-debug-handlers-polyfill),
though `id` and `until` data is not provided until Ember 2.0.

Thanks to [@rwjblue](https://twitter.com/rwjblue) for
shipping this API and the polyfill addon, and to [@mixonic](https://twitter.com/mixonic)
for the RFC.

For more details on changes landing in 2.1, review the
[Ember.js 2.1.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.1.0/CHANGELOG.md).

## Ember.js 2.2 beta

No new features are slated for Ember 2.2. During the canary cycle leading to this beta, the core team and community have been primarily focused on performance improvements or feature work still behind a feature flag.

For more details on changes landing in 2.2, review the
[Ember.js 2.2.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.2.0-beta.1/CHANGELOG.md).
