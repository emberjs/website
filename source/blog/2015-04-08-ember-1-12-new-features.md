---
title: New Features in Ember.js 1.12
author: Matthew Beale
tags: Releases, Recent Posts
---

On April 26th [Ember.js 1.11 stable was released](/blog/2015/04/04/ember-1-11-1-released.html).
At the same time
Ember.js 1.12 began its beta cycle. Ember.js 1.12 will be released to stable around
May 1st, and will include these new features (as well as several deprecations to be
added before release):

#### New Computed Syntax

Per [RFC #11](https://github.com/emberjs/rfcs/pull/11), Ember is introducing a new syntax
for computed properties. This change
better aligns computed property syntax with ES getters and setters, avoids the performance
penalty of difficult-to-JIT varied function signatures, and make writing settable computed
properties developer friendly.

The simplest syntax for a computed property is to define the getter as a function:

```javascript
export default Ember.Object.extend({

  height: 100,
  goldenRatioWidth: Ember.computed('height', function(){
    return this.get('height') * 1.618;
  })

});
```

This syntax remains valid in 1.12, however it should be considered shorthand for the
explicit form of getter:

```javascript
export default Ember.Object.extend({

  height: 100,
  goldenRatioWidth: Ember.computed('height', {
    get() { // ES2015 syntax for `get: function() {`
      return this.get('height') * 1.618;
    }
  })

});
```

To create a settable computed property in Ember 1.11 an `if` statement was used
to differentiate the get from the set logic. For example:

```javascript
export default Ember.Object.extend({

  height: 100,
  goldenRatioWidth: Ember.computed('height', function(key, value){
    if (arguments.length > 1) {
      this.set('height', value / 1.618);
    } else {
      return this.get('height') * 1.618;
    }
  })

});
```

In Ember.js 1.12 the setter syntax allows a distinct function to be used:

```javascript
export default Ember.Object.extend({

  width: 100,
  goldenRatioWidth: Ember.computed('height', {
    get() {
      return this.get('height') * 1.618;
    },
    set(value) {
      this.set('height', value / 1.618);
    }
  });

});
```

For more information see the initial implementation in [#9527](https://github.com/emberjs/ember.js/pull/9527)

Many thanks to [@stefanpenner](https://twitter.com/stefanpenner) and
[@MiguelCamba](https://twitter.com/MiguelCamba) for championing and shipping
this feature.

#### Instance Initializers

In Ember.js 1.12 application boot is separated into two phases:

* Application initializers run. At this phase of boot, the goal of
  initializers should be to register dependencies and injections. Instantiating
  factories should be avoided, as they may not have all their dependencies
  present. This phase runs *once* per environment.
* Instance initializers run next. At this time factories may be instantiated
  and state modified. This phase runs *every time and application boots*.

The two-phase initialization process is safer when multiple addons may be
registering factories and injections. Additionally, it lays important
groundwork for FastBoot. In FastBoot, the application initializers will run
once when the node environment is started, but instance initializers will
run on every request handled.

Ember-CLI 0.2.3 supports instance initializers. For example:

```
// app/instance-initializers/sleep.js

export default function initialize(application) {
  application.deferReadiness();
  // Wait 3s before continuing to boot the app
  Ember.run.later(application, 'advanceReadiness', 3000);
}

export default {
  name: 'sleep',
  initialize: initialize
};
```

To define an instance initializer in globals mode use the `Ember.Application.instanceInitializer`
method. For more information about instance intializers see the
implementation in [#10256](https://github.com/emberjs/ember.js/pull/10256).

Thanks to [@tomdale](https://twitter.com/tomdale), [@wycats](https://twitter.com/wycats) and
[@dgeb](https://twitter.com/dgeb) for this feature and other
refactoring work around application initialization.

#### Initializer Context

Previously, the `this` scope of an initializer was simply the global scope.
[#10179](https://github.com/emberjs/ember.js/pull/10179) changed initializer
scopes to be the initializer object itself.

Thanks to [@gf3](https://twitter.com/gf3) for suggesting and adding this feature.
