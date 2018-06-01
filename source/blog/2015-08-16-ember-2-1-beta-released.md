---
title: Ember.js 2.1 Beta Released
author: Matthew Beale
tags: Releases, 2015, Version 2.x
responsive: true
---

Ember.js 2.1 beta is released today. As a minor release, Ember 2.1 will be
backwards compatible with Ember 2.0. Any changes to the API will be additive.
This continues Ember's commitment to [Semantic Versioning](http://semver.org/)
we began with the 1.0 release.

In addition it means many of the first features for Ember 2.2, most notably angle
bracket components, have landed in Canary behind a feature flag. If you're
interested in help us progress with those features, now is a good time to
try them out.

On to the changes coming in our late September/early October release.

## New Features in Ember.js 2.1

Ember.js 2.1 will be a minor release of Ember. This means changes to the API are
made in an additive, backwards compatible manner. In roughly six weeks, these
features will be part of the 2.1 stable version.

A summary of the new features in today's release follows.

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

For more information on the `{{get}}` helper, reference the implementation
in [PR #11196](https://github.com/emberjs/ember.js/pull/11196) and
[PR #11691](https://github.com/emberjs/ember.js/pull/11691).

Big thanks to [@jmurphyau](https://twitter.com/jmurphyau) for the
implementation of this feature, and for his excellent
[ember-get-helper](https://github.com/jmurphyau/ember-get-helper) addon that
demonstrated how useful this helper would be. Trying his
[ember-truth-helpers](https://github.com/jmurphyau/ember-truth-helpers) addon
is highly recommended.

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

For more information on the `{{each-in}}` helper, reference
[PR #11171](https://github.com/emberjs/ember.js/pull/11171).

Thanks to [@tomdale](https://twitter.com/tomdale) for the
implementation of this feature, and thanks to
[@miguelcamba](https://twitter.com/miguelcamba) for his followup PRs.

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
* `next` is a caller for the previously registered handler. Often, this is the
  default handler.
* `options.id` is an id in the format `package-name.specific-deprecation`

Deprecation handlers will also be provided:

* `options.until` is the version of Ember this feature and deprecation will be
  removed in

As of Ember 2.0, `deprecate` and `warn` calls must provide an `id` option,
and `deprecate` calls must additionally provide an `until` option.
Addons not providing this data during
2.x will trigger a deprecation warning.

For more information see [RFC #65](https://github.com/emberjs/rfcs/blob/master/text/0065-deprecation-warning-handlers.md)
and the implementation in [PR #11833](https://github.com/emberjs/ember.js/pull/11833).
This API can be used with older versions of Ember via the
[ember-debug-handlers-polyfill](https://github.com/rwjblue/ember-debug-handlers-polyfill),
though `id` and `until` data is not provided until Ember 2.0.

Thanks to [@rwjblue](https://twitter.com/rwjblue) for
shipping this API and the polyfill addon, and to [@mixonic](https://twitter.com/mixonic)
for the RFC.

#### Registry and Container Reform

The Ember.js registry and container are some of the most extensively used
private APIs in the framework. They
provided one of the only ways to lookup arbitrary objects from Ember's
dependency container.

In 2.x, we are committed to stabilizing this part of the framework and
offering public APIs. This first step creates a normalized way to interact
with `register` and `lookup` that we expect to last through the 2.x cycle
and beyond.

`Ember.Application` instances are passed as the first argument to `initializer`
hooks in 2.1. `initializer` hooks are where dependencies between object types
can be configured, and factories can be registered. Several public APIs will
exist on `Ember.Application` instances, some of them new:

* `register` - register a factory
* `inject` - inject a factory into another factory, or all factories of a type
* `unregister` - remove a factory from registration
* `resolveRegistration` - fetch a registed factory
* `hasRegistration` - check for a registered factory
* `registerOption`, `registeredOption`, `registerOptions`, `registeredOptions`,
  `registerOptionsForType`, `registeredOptionsForType` which manage options
  for a factory (is it a singleton, can it be instantiated).

`Ember.ApplicationInstance` instances are passed as the first argument to
`instanceInitializer` hooks in 2.1. `instanceInitializer` hooks are where
objects and classes can be fetched out of the configured and booted application.
Two new relevent public APIs will exist on `Ember.ApplicationInstance`s:

* `lookup` - fetch an instance of a factory (with dependencies)

For more information about these changes read
[RFC #46](https://github.com/emberjs/rfcs/blob/master/text/0046-registry-reform.md)
and the initial implementation in
[PR #11440](https://github.com/emberjs/ember.js/pull/11440). To better
understand dependency management in Ember and how to use these APIs, see the
section on [dependency management](http://guides.emberjs.com/v1.13.0/understanding-ember/dependency-injection-and-service-lookup/#toc_dependency-management-in-ember-js) in
the 1.13 guides.

This feature also introduces two minor deprecations:

* Calling `appInstance.container.lookup` on the first argument to an instance
  initializer is deprecated in favor of `appInstance.lookup`.
* Expecting two arguments for an initializer hook is deprecated

Deprecations flag where we expect to change an API in the future. It is not
recommended that you use deprecated functionality, but you can also safely
silence a deprecation message and continue to use that functionality until
its removal date.

Huge thanks to [@dgeb](https://twitter.com/dgeb) for
his tireless work on the RFC and implementation for this work, as well as
his patience building consensus around changes to Ember's internals.

For more details on changes landing in 2.1, review the
[Ember.js 2.1.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.1.0-beta.1/CHANGELOG.md).
