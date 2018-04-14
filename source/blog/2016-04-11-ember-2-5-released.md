---
title: Ember.js 2.4-LTS, 2.5, and 2.6 Beta Released
author: Matthew Beale
tags: Releases, 2016, 2, 2.4, 2.5, 2.6
responsive: true
---

Ember 2.4-LTS, the first Ember Long-Term Support release, lands today as Ember
2.4.5. Future versions of 2.4 will be considered part of the LTS channel.
The LTS channel comes with a commitment
that low-risk critical bugfixes and security patches will be backported to
these versions. Additionally, any change to commonly used private APIs must be deprecated
in at least one LTS release before removal, making LTS releases a slower
moving target for addons to support.

2.4-LTS will receive critical bugfixes for the next 6 release cycles (until
roughly November 2016) and security patches for the next 10 release cycles
(until roughly April 2017). For more information about how the LTS process works,
see the blog post [Announcing Ember's First LTS Release](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html).

Ember 2.5, a minor version release of Ember with backwards compatible
changes, is also released today.

Ember 2.6 beta, the branch of Ember that will be released as stable in
roughly six weeks, is released today.

### Notable deprecations in Ember 2.4-LTS

Ember 2.4-LTS deprecates two private APIs. Support for these private APIs will
be removed in Ember 2.6.

* The [ember-legacy-views](https://github.com/emberjs/ember-legacy-views) and [ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers)
  addons, which rely upon private API, will be supported on Ember 2.4-LTS with a deprecation notice. Although Ember 2.5 will also
  support these addons, 2.4-LTS will be a supported platform for much longer than
  2.5. Ember 2.6 and 2.8-LTS, when they are released, will not support these addons.
* Use of the `{{#render}}` helper in block form is deprecated. Block form usage was an
  un-documented and un-intended feature, and will be removed in Ember 2.6. In general,
  uses of `{{render}}` should be replaced with components.

### Changes in Ember 2.5

Ember 2.5 introduces several minor public API additions.

#### `Ember.assign`

`Ember.assign` is a polyfill for the ES2015 `Object.assign` feature. `assign`
copies the values of all enumerable own properties from one or more source
objects to a target object. For example:

```javascript
let a = {first: 'John'};
let b = {last: 'Lennon'};
let c = {band: 'The Beatles'};

Ember.assign(a, b, c);

// a === {first: 'John', last: 'Lennon', band: 'The Beatles'}
// b === {last: 'Lennon'}
// c === {band: 'The Beatles'}
```

For more specifics on `assign`, see the [Ember API documentation](http://emberjs.com/api/#method_assign)
and [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

#### Local Lookup Compatibility

As part of the new directory layout effort currently organized around the
[Module Normalization RFC](https://github.com/emberjs/rfcs/pull/124),
we intend to introduce a feature called
"local lookup". This feature will allow for the creation of components or helpers available
only in a single template, instead of being globally scoped as they must be
today. `lookup` and `resolve` in Ember 2.5 will accept an optional `source` property
on their `options` argument. This API change will allow local
lookup to be implemented outside of Ember via the
[ember-cli/ember-resolver](https://github.com/ember-cli/ember-resolver) library.

#### Native Event Test Helpers

Ember's acceptance test helpers, such as `click()`, have previously used
jQuery event triggers. In 2.5 this behavior has been altered to trigger
native events via [`dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent).
This change is expected to be completely backwards compatible and was
uncontroversial during the six week beta cycle. It allows the triggering of
non-jQuery event listeners in acceptance tests.

For more details on changes landing in Ember 2.5, review the
[Ember.js 2.5.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.5.0/CHANGELOG.md).

### Ember.js 2.6 beta

No new features are added in Ember core in 2.6. In
general the core team and
community have remained active around other highly visible parts of
the Ember stack (Ember Data, FastBoot, Glimmer, etc).

#### Notable Deprecations

The following deprecations are scheduled for release with Ember 2.6 and will be
removed in Ember 3.0:

* `Ember.String.htmlSafe(aString)` is the preferred API for marking a string
  XSS safe for the rendering layer. Use of `Ember.Handlebars.SafeString` as
  a constructor for safe strings is deprecated, and will be removed.
  See the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_use-ember-string-htmlsafe-over-ember-handlebars-safestring) for more details.
* The `didInitAttrs` hook for component lifecycles is deprecated in favor of
  simply using `init`. `didInitAttrs` had confusing timing
  issues, and `init` fulfills the same role. See the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_ember-component-didinitattrs) for more details.
* Passing a `model` argument to `{{render}}` is deprecated in favor of using
  a component for the same cases. For example `{{render 'chat' roomModel}}`
  can be refactored into a `chat-room` component.
  See the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_model-param-in-code-render-code-helper) for more details.

For more details on changes landing in 2.6 beta, review the
[Ember.js 2.6.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.6.0-beta.1/CHANGELOG.md).
