---
title: Ember.js 2.2 and 2.3 Beta Released
author: Matthew Beale
tags: Releases, 2015, Version 2.x
responsive: true
---

Ember.js 2.2, a minor version release of Ember with backwards compatible
changes, is released today. This release represents the work of over 60
contributors.

Ember.js 2.3 beta, the branch of Ember that will be released as stable in
roughly six weeks, is also being released today.

### Changes in Ember.js 2.2

Ember.js releases occur every six weeks, regardless of how significant the
changes are. 2.2 introduces no new features, but does include performance
improvements and bug fixes.

Notable improvements include a performance fix for Ember's `_super`
implementation under minification, and the skipping of `view` and `controller`
template locals logic when operating without the view and controller legacy
addons.

For more details on changes landing in 2.2, review the
[Ember.js 2.2.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.2.0/CHANGELOG.md).

### Ember.js 2.3 beta

Ember.js 2.3 beta is released today, and in six weeks it will become the
new stable version of Ember. This beta cycle introduces several new features
and a notable deprecation.

#### `visit` API

[Ember FastBoot](https://github.com/tildeio/ember-cli-fastboot) and new testing
APIs motivated the addition of a `visit` method for `Ember.Application` and
`Ember.ApplicationInstance` objects. Called on `Ember.Application` this
method accepts several configuration options.

For example, you might use this API to manually boot an Ember application
and then instruct it to visit a URL:

```js
import MyApp from 'my-app';

$(function() {
  let App = MyApp.create({ autoboot: false });
  let options = {
    // Prevent this application from updating the URL in the address bar
    location: 'none',
    // Override the default `rootElement` to render into a specific `div`
    // on the page
    rootElement: '#demo'
  };
  App.visit('/demo', options).then((/* appInstance */) => {
    $('#loading').fadeOut(); // Or any other logic after rendering
  });
});
```

Importantly, the addition of this API means **FastBoot
is now usable with Ember.js beta**. FastBoot itself remains experimental,
however this is the first time you can use it with a stock build of Ember.js.
The [README.md for ember-cli-fastboot](https://github.com/tildeio/ember-cli-fastboot)
is the best place to start if you want to try FastBoot.

You can read more about the `visit` API and its use cases in the [unpublished
`visit` API documentation](https://github.com/emberjs/ember.js/blob/0810d913f9d358e5d37d25a1efd2295ebaebc6e2/packages/ember-application/lib/system/application.js#L985-L1181).
Reviewing the main implementation PR at [emberjs/emberjs #12394](https://github.com/emberjs/ember.js/pull/12394) and the integration into FastBoot at
[tildeio/ember-cli-fastboot #71](https://github.com/tildeio/ember-cli-fastboot/pull/71)
may also be helpful.

Many thanks to [@tomdale](https://twitter.com/tomdale) and
[@chancancode](https://twitter.com/chancancode) for their work implementing
this API and for their continued work on FastBoot.

#### Hash Helper

The `(hash` helper creates an object from arguments passed to it during
invocation, and then returns that object. For example this usage would create an object with
the property `name`:

```handlebars
{{#with (hash name='Bob') as |person|}}
  Hello, my name is {{person.name}}
{{/with}}
```

This helper is introduced to make the new contextual components feature
more convenient, and it will often be used with the `{{yield` helper. For
example:

```app/templates/components/nice-person.hbs
{{yield (hash name='Bob')}}
```

```app/templates/index.hbs
{{#nice-person as |person|}}
  Hello, my name is {{person.name}}
{{/nice-person}}
```

See the [unpublished documentation](https://github.com/emberjs/ember.js/blob/04ec1c639e3ac7aa93ec24bf7fcf35e18c62fed6/packages/ember-htmlbars/lib/helpers/hash.js#L6-L31) for
for details on this helper, and read the contextual components section below
for further context.

Thanks to [@Serabe](https://twitter.com/serabe) for his implementation of this
feature and to [@MiguelCamba](https://twitter.com/MiguelCamba) for his fantastic
[ember-hash-helper-polyfill](https://github.com/cibernox/ember-hash-helper-polyfill)
addon. Using the polyfill you can start using `(hash` with Ember.js 1.13 or
later.

#### Contextual Components

The new contextual components feature allows for multiple components to
privately share data, but be invoked in a flexible manner. For example,
this `{{alert-box}}` component yields a contextual component composed
of the `alert-box-button` component and the attribute `onclick`:

```app/templates/components/alert-box.hbs
<div class="alert-box">
  {{yield (hash
    close-button=(component 'alert-box-button' onclick=(action 'close'))
  )}}
</div>
```

```app/templates/index.hbs
{{#alert-box as |box|}}
  Danger, Will Robinson!
  <div style="float:right">
    {{#box.close-button}}
      It's just a plain old meteorite.
    {{/box.close-button}}
  </div>
{{/alert-box}}
```

Contextual components are created using the nested form of the
`component` helper, and may be passed attrs and positional params. Contextual
components must be invoked with a `.` in their path, unless they are being
passed to the invoking `{{component` helper.

This new feature is a powerful tool for addon authors, allowing them to
yield components without having arguments to those components become de-facto
public API. In addition, when the local lookup feature of Ember's pods
architecture arrives the combination of these features will permit
completely private components to be yielded.

For more information about contextual components see the [unpublished
documentation](https://github.com/emberjs/ember.js/blob/04ec1c639e3ac7aa93ec24bf7fcf35e18c62fed6/packages/ember-htmlbars/lib/keywords/component.js#L52-L73). Further details about the API design decisions can be found in
[RFC #64](https://github.com/emberjs/rfcs/blob/master/text/0064-contextual-component-lookup.md).

Thanks again to [@Serabe](https://twitter.com/serabe) for his implementation
of this feature as well as [@mixonic](https://twitter.com/mixonic) and
[@\_mmun](https://twitter.com/_mmun) for their efforts on the RFC and design.

#### Introducing Owners and Deprecating Containers

Ember's container API is one of the more commonly used private APIs still
exposed. In Ember.js 2.1, a major refactor of application
boot removed access to the container from initializers and instance initializers,
creating public API alternatives.

**In Ember 2.3, accessing the `container` property on a framework-generated
object will be deprecated in favor of a public owner API.**

For example, this component will dynamically lookup an audio service based
on the `audioType` of its model:

```js
import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

// Usage:
//
//   {{play-audio model=audioModel}}
//
export default Component.extend({
  audioService: computed('model.audioType', function() {
    let owner = getOwner(this);
    let serviceName = this.get('model.audioType');
    return owner.lookup(`service:audio-${serviceName}`);
  }),
  click() {
    let player = this.get('audioService');
    player.play(this.get('model.file'));
  }
});
```

The return value of `getOwner` will be an [`Ember.ApplicationInstance`](http://emberjs.com/api/classes/Ember.ApplicationInstance.html)
for objects generated by the framework.

**This change means ember-qunit 0.4.16+ is required for use with Ember 2.3.**

For more information about migrating code from using `container` to `getOwner`,
see the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_injected-container-access).
Further details about the API design decisions can be found in
[emberjs/emberjs #11874](https://github.com/emberjs/ember.js/pull/11874)
and [emberjs/emberjs #12555](https://github.com/emberjs/ember.js/issues/12555).

Many thanks to [@dgeb](https://twitter.com/dgeb) for his tireless efforts
implementing this feature, and for his time buildling consensus around
improvements to the Ember dependency injection API. Additionally credit is
due to [@rwjblue](https://twitter.com/rwjblue) for his upgrade PRs to
[Ember Data](https://github.com/emberjs/data/pull/3912), [Liquid-Fire](https://github.com/ef4/liquid-fire/pull/388), and [Ember-i18n](https://github.com/jamesarosen/ember-i18n/pull/336).
These provide a good example of how to upgrade any addon or app codebase.

For more details on changes landing in 2.3, review the
[Ember.js 2.3.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.3.0-beta.1/CHANGELOG.md).
