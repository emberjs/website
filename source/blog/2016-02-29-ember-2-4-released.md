---
title: Ember.js 2.4 and 2.5 Beta Released
responsive: true
author: Matthew Beale
tags: Releases, 2016, 2, 2.4, 2.5
responsive: true
---

Ember.js 2.4, a minor version release of Ember with backwards compatible
changes, is released today. After an additional six-week maturation cycle
as a stable release version, 2.4 will be declared Ember's first Long-Term
Support (LTS) release. For more about the LTS process and what you should
expect, see last week's post
[Announcing Ember's First LTS Release](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html).

Ember.js 2.5 beta, the branch of Ember that will be released as stable in
roughly six weeks, is also being released today.

### Changes in Ember.js 2.4

No new features are added in Ember core in 2.4. Instead this release
is primarily comprised of bugfixes making it an excellent LTS candidate. In
general the core team and
community have remained active around other highly visible parts of
the Ember stack (Ember CLI, Ember Data, FastBoot, Glimmer, etc).

In six weeks, the current release build of 2.4 will become Ember's first
LTS release. Builds on the LTS channel will receive critical bugfixes covering the
subsequent six release cycles (~36 weeks), and security patches for the subsequent
ten release cycles (~60 weeks). If your organization intends to remain on the
LTS channel, we strongly suggest you attempt updating your application to
2.4 and open any issues in the next six weeks.

For more details on changes landing in 2.4, review the
[Ember.js 2.4.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.4.1/CHANGELOG.md).

### Ember.js 2.5 beta

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

For more specifics on `assign`, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

#### Local Lookup Compatibility

As part of the "pods" directory layout, we intend to introduce a feature called
"local lookup". This feature will allow for the creation of components available
only in a single template, instead of being globally scoped as they must be
today. `lookup` and `resolve` in Ember 2.5 will accept an optional `source` property
on their `options` argument. This API change will local
lookup to be implemented outside of Ember via the
[ember-cli/ember-resolver](https://github.com/ember-cli/ember-resolver) library.

#### Native Event Test Helpers

Ember's acceptance test helpers, such as `click()` have previously used
jQuery event triggers. In 2.5 this behavior has been altered to trigger
native events via [`dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent).
This change is expected to be completely backwards compatible, and enable
the triggering of non-jQuery event listeners in acceptance tests.

For more details on changes landing in 2.5, review the
[Ember.js 2.5.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.5.0-beta.1/CHANGELOG.md).

### Update: Ember 2.4.1 Released

Shortly after Ember 2.4.0 was released, we have identified a regression that
caused incorrect deprecation warnings to be emitted. Specifically, we intended
to emit deprecation warnings when either (or both) of the legacy addons are
installed. Instead, the check was inverted, causing the deprecation warnings to
be emitted only if the addons are _not_ installed.

Ember 2.4.1 has been released to address this error.

It should be noted that the production builds for 2.4.0 are _not_ affected by
this regression, since deprecation warnings are only present in development
builds.
