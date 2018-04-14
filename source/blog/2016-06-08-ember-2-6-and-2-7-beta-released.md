---
title: Ember.js 2.6 and 2.7 Beta Released
author: Matthew Beale
tags: Releases, 2016, 2, 2.6, 2.7
responsive: true
---

Ember.js 2.6, a minor version release of Ember with backwards compatible
changes, is released today.

Ember.js 2.7 beta, the branch of Ember that will be released as stable in
roughly six weeks, is also being released today.

### Changes in Ember.js 2.6

No new features are added in Ember core in 2.6. In general the core team and
community have remained active around other highly visible parts of the Ember
stack (Ember Data, FastBoot, Glimmer, etc).

#### Notable Deprecations

The following deprecations are scheduled for release with Ember 2.6 and will be
removed in Ember 3.0:

* The `didInitAttrs` hook for component lifecycles is deprecated in favor of
  simply using `init`. `didInitAttrs` had confusing timing
  issues, and `init` fulfills the same role. See the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_ember-component-didinitattrs) for more details.
* Passing a `model` argument to `{{render}}` is deprecated in favor of using
  a component for the same cases. For example `{{render 'chat' roomModel}}`
  can be refactored into a `chat-room` component.
  See the [deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_model-param-in-code-render-code-helper) for more details.

For more details on changes landing in 2.6, review the
[Ember.js 2.6.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.6.0/CHANGELOG.md).

### Ember.js 2.7 Beta

Ember 2.7 beta introduces one new backward compatible API:

#### `Ember.computed.uniqBy`

In general, the core team is hesitant about adding any new computed macros
or array prototype extensions to the framework. Instead, we encourage developers
to adopt an addon such as [ember-cpm](https://github.com/cibernox/ember-cpm)
if they desire an expanded list of macros.

However contributor [@seanjohnson08](https://github.com/seanjohnson08) correctly pointed out there is a logical
gap in the APIs Ember provides today. Although each of `find`, `map`, `filter`,
and `reject` have a comparable `xxxBy` method (for example `findBy`) no
comparable method exists for `uniq`.

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

For more information on these methods, see the [API docs for the
computed macro](http://emberjs.com/api/classes/Ember.computed.html#method_uniqBy), [API docs for the array method](http://emberjs.com/api/classes/Ember.Array.html#method_uniqBy), and [PR #12875](https://github.com/emberjs/ember.js/pull/12875)
introducing these changes.

For more details on changes landing in 2.7 beta, review the
[Ember.js 2.7.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.7.0-beta.1/CHANGELOG.md).
