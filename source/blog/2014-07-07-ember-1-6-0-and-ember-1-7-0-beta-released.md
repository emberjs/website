---
title: Ember 1.6.0 and 1.7 Beta Released
author: Robert Jackson
tags: Releases, 2014, 1, 1.6, 1.7
responsive: true
---

We are pleased to announce that both Ember.js 1.6.0 and the first beta in the 1.7 series
have just been released. This comes as the sixth cycle of our release process that began
just after 1.0 was released.

### Delays Detailed

As many of you know, the 1.6 release is the first to be published after converting the
codebase to ES6 modules. The 1.6+ builds are now transpiled by the [es6-module-transpiler](https://github.com/square/es6-module-transpiler)
into AMD and use a [small AMD loader](https://github.com/stefanpenner/loader.js) to handle
loading the transpiled modules. Unfortunately, adding the additional loader overhead on
boot has a fairly significant performance impact on boot speed of older mobile clients
(approximately 5-10% boot time penalty).

This regression was brought to our attention just before 1.6.0 was intended to ship (late
May), and we decided to hold the release until a fix could be applied. In retrospect this
was absolutely the wrong decision. The fix has taken much longer than originally anticipated
and in the meantime folks are stuck with 1.5.1. Many of our users either are not affected
or do not care about this regression, and they are forced to use beta/canary channels for
certain bug fixes that have already been made.

As a group the core team has decided that this type of delay is absolutely unacceptable and
apologize for the lack of clarity into what is going on.

### New features in 1.6

#### Ember.computed.empty

`Ember.computed.empty` has been updated to automatically respect arrays without forcing users to use `array.[]`
as the dependent key.

#### Test Friendly Promises

With 1.5.1 you were forced to wrap any Promise `resolve` and/or `reject` calls in an `Ember.run` loop
while in testing, but the same code did not need to be wrapped in a run loop for normal operation.

In 1.6.0 you do not need to do this promise run loop wrapping simply for the purposes of testing.

#### Ember.Route.prototype.render Now has a model Option

Previously, you would need to set the model explicitly on the other controller using 
`controllerFor` (while trying to render a different template with `renderTemplate#render`).

Now `render` has an option to set the model that set the controller's content after the controller has been
looked-up.

Before:

```javascript
App.HomeRoute = Ember.Route.extend({
  renderTemplate: function(controller, model){
    this.controllerFor('bio').set('content', model);
    this.render('bio');
  }
});
```

After:

```javascript
App.HomeRoute = Ember.Route.extend({
  renderTemplate: function(controller, model){
    this.render('bio', {
      model: model
    });
  }
});
```

### Other Notable Changes

* Add better debugging for Resolver Lookup

A `LOG_RESOLVER` flag can now be added to your application instance to get nice logging output
showing each lookup the resolver is doing, including which were "hits" and which were "misses"
(checked items are "hits"):

```
[ ] route:application ..........................................  App.ApplicationRoute
[✓] route:index ................................................  App.IndexRoute
[ ] controller:application .....................................  App.ApplicationController
```

* Ensure context is unchanged when using keywords with `itemController` for `{{each}}` or `controller` for `{{with}}`.

Previously the following code would bind `this` in the template block to the
itemController's content (even though the keyword form of `{{each}}` or `{{with}}` is used). In 1.6.0
the context of the  block will correctly be unchanged, and the `post` property will be wrapped in the `post` controller.

```
{{#each post in posts itemController='post'}}
  {{this}} - Should be the surrounding context, NOT changed to that of the itemController.
{{/each}}

{{#with post as somethingElse controller='post'}}
  {{this}} - Should be the surrounding context, NOT changed to that of the controller specified.
{{/with}}
```

* Fix swallowed rejections in asynchronous route hooks (this may mean that errors that were previously completely
  swallowed are now surfaced in your application).
* `Ember.copy` and `Ember.isEqual` now support `Date` objects.
* Backburner and RSVP now use the `Ember.onerror` handler if present to log errors.
* An error is now thrown when injecting a factory into all factories of the same type.

### Query Params in 1.7 Beta

Thanks to the tireless work of [@machty](https://github.com/machty) and team, query params support has finally landed and is
enabled by default in the 1.7 beta series! Please test and report any issues you come across.

### Other Improvements

As usual, there are a ton of bug fixes and small improvements in this
release. You can see a list of all the changes in the CHANGELOG:

* [Ember.js 1.6.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.6.0/CHANGELOG.md)
* [Ember.js 1.7.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.7.0-beta.1/CHANGELOG.md)
