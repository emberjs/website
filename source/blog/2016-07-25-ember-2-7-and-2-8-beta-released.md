---
title: Ember.js 2.7 and 2.8 Beta Released
author: Dan Gebhardt
tags: Releases, 2016, 2.7, 2.8, Version 2.x
responsive: true
---

Ember.js 2.7, a minor version release of Ember with backwards compatible
changes, is released today.

Ember.js 2.8 beta is also being released today. This branch will be released as
stable in roughly six weeks and will then go on to be the next [LTS release](/blog/2016/02/25/announcing-embers-first-lts.html)
roughly six weeks after that.

### Changes in Ember.js 2.7

Ember 2.7 introduces one new backward compatible API:

#### `Ember.computed.uniqBy`

In general, the core team is hesitant about adding any new computed macros
or array prototype extensions to the framework. Instead, we encourage developers
to adopt an addon such as [ember-cpm](https://github.com/cibernox/ember-cpm)
if they desire an expanded list of macros.

However contributor [@seanjohnson08](https://github.com/seanjohnson08) correctly
pointed out there is a logical gap in the APIs Ember provides today. Although
each of `find`, `map`, `filter`, and `reject` have a comparable `xxxBy` method
(for example `findBy`) no comparable method exists for `uniq`.

Ember 2.7 adds `uniqBy` as an computed property macro. For example:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  accidents: Ember.computed(function() {
    return [{
      description: 'Flipped over',
      car: { id: 1, make: 'Saturn' }
    },{
      description: 'Aliens',
      car: { id: 2, make: 'Toyota' }
    },{
      description: 'Road rage',
      car: { id: 1, make: 'Saturn' }
    }];
  }),
  carsInAccidents: Ember.computed.mapBy('accidents', 'car'),
  uniqueCarsInAccidents: Ember.computed.uniqBy('carsInAccidents', 'id')
});
```

`uniqBy` is also added as an array method. For example:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  accidents: Ember.computed(function() {
    return [{
      description: 'Flipped over',
      car: { id: 1, make: 'Saturn' }
    },{
      description: 'Aliens',
      car: { id: 2, make: 'Toyota' }
    },{
      description: 'Road rage',
      car: { id: 1, make: 'Saturn' }
    }];
  }),
  uniqueCarsInAccidents: Ember.computed('accidents.@each.car', function() {
    return this.get('accidents').mapBy('car').uniqBy('id');
  })
});
```

For more information on these methods, see the [API docs for the computed
macro](http://emberjs.com/api/classes/Ember.computed.html#method_uniqBy), [API
docs for the array
method](http://emberjs.com/api/classes/Ember.Array.html#method_uniqBy), and
[PR #12875](https://github.com/emberjs/ember.js/pull/12875) introducing these
changes.

#### Notable Deprecations

The following deprecations are scheduled for release with Ember 2.7:

* `Ember.Backburner` was private throughout the Ember 2.x series and will be
  removed after Ember 2.8, as mentioned in the
  [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_ember-backburner).

* `Ember.Binding` has not been needed for some time and is deprecated in favor
  of computed properties and services (depending on what you were binding to).
  It will be removed in Ember 3.0. See the
  [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_ember-binding)
  for more details.

For more details on changes landing in 2.7, review the
[Ember.js 2.7.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.7.0/CHANGELOG.md).

### Ember.js 2.8 Beta

Ember 2.8 beta introduces the following new backward compatible APIs:

#### Engines

As described in the [RFC](https://github.com/emberjs/rfcs/pull/10), "engines
allow multiple logical applications to be composed together into a single
application from the user's perspective."

The best way to use this feature in your apps is through the [ember-engines addon](http://github.com/dgeb/ember-engines).
To get started, check out the excellent [guides](https://github.com/dgeb/ember-engines/blob/master/guides/01-introduction.md)
written by [@trentmwillis](https://github.com/trentmwillis).

This release will introduce a set of low-level APIs for the core functionailty
along with the ususal semver guarentee. While the ember-engines addon itself
remains experimental, the introduction of these public APIs means that **ember-engines
is now usable with Ember.js 2.8 beta**.

Work on engines has proceeded over the past year in both Ember core as well as
the addon. Ember's architecture has been enhanced to provide the base classes
and hooks needed to support engines. The addon then makes use of these interfaces
to provide a smooth experience building and consuming engines.

Until now, none of the engine-related classes and hooks in Ember have been
exposed publicly. However, starting with Ember 2.8, the following APIs will be
made public:

* `Ember.Engine` class - The base class for `Ember.Application`. Its only public
  interface is related to initializers and instance initializers, which is
  then inherited by applications.

* `Ember.EngineInstance` class - The base class for `Ember.ApplicationInstance`.

* `mount` keyword - Allows for the mounting of routeless engines in templates.
  This keyword currently only takes one argument, the name of the engine.

* `mount` router DSL - Allows routable engines to be mounted at a location in
  a route map.

By making these APIs public, ember-engines and other addons will be able to
access them without a feature-flag in a (soon-to-be) stable release of Ember. By
accessing only public interfaces in Ember, an addon won't need to rely on
private overrides and can provide as stable an experience as possible.

We predict that engines will grow in popularity once work on lazy loading is
complete. By delaying the loading of engines until they're accessed, we can
decrease the initial payload size and startup time for applications. If you're
interested in helping to implement or test lazy loading of engines, please check
out the thorough [attack plan](https://github.com/dgeb/ember-engines/issues/154)
written up by [@nathanhammond](https://github.com/nathanhammond).

#### `Enumerable#includes` and `Array#includes`

In an effort to remain inline with ES standards, the methods
`Enumerable#contains` and `Array#contains` have been deprecated in favor of the
new methods `Enumerable#includes` and `Array#includes`.

Thanks to [@alexspeller](https://github.com/alexspeller) for the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0136-contains-to-includes.md)
that proposed this change.

Thanks as well to [@bmeurant](https://github.com/bmeurant) for the
[PR](https://github.com/emberjs/ember.js/pull/13553) that implemented the change.

#### `Ember.String.isHTMLSafe`

The new method `Ember.String.isHTMLSafe` detects if a string was decorated using
`Ember.String.htmlSafe`.

For example:

```javascript
var plainString = 'plain string',
    safeString = Ember.String.htmlSafe('<div>someValue</div>');

Ember.String.isHTMLSafe(plainString); // false
Ember.String.isHTMLSafe(safeString);  // true
```

Thanks to [@workmanw](https://github.com/workmanw) for the
[RFC](https://github.com/emberjs/rfcs/pull/139) that proposed this new API, as
well as the [PR](https://github.com/emberjs/ember.js/pull/13666) that
implemented it.

On a related note, please create safe strings with `Ember.String.htmlSafe`
instead of the deprecated `Ember.Handlebars.SafeString`. See the [deprecation
guide](http://emberjs.com/deprecations/v2.x/#toc_use-ember-string-htmlsafe-over-ember-handlebars-safestring)
for details.

#### `Ember.Test.checkWaiters`

The new method `Ember.Test.checkWaiters` provides a simple mechanism for test
tooling to determine whether all async test waiters have settled. This replaces
the intimate API `Ember.Test.waiters`, which has been deprecated and will be
removed in Ember 2.8 final.

Thanks to [@rwjblue](https://github.com/rwjblue) and
[@krisselden](https://github.com/krisselden) for implementing this method.

----

For more details on changes landing in 2.8 beta, review the
[Ember.js 2.8.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.8.0-beta.1/CHANGELOG.md).
