---
title: Ember.js 1.12 and 1.13 Beta (Glimmer!) Released
author: Yehuda Katz & Matthew Beale
tags: Releases, 2015
responsive: true
---

We are please to announce the release of Ember.js 1.12 and the first beta in the 1.13 series.

**1.13 beta is the first Ember.js release that includes Glimmer, the new Ember
rendering engine, as well as the final batch of Ember 2.0 features.** We will
discuss those details more below.

## New Features in Ember 1.12

Ember 1.12 is a relatively light release, and includes features that move Ember
closer to ES6 class syntax and the first parts of the internal implementation
needed for a stable release of the FastBoot addon.

#### New Computed Syntax

Per [RFC #11](https://github.com/emberjs/rfcs/pull/11), Ember is introducing a
new syntax for computed properties. This change better aligns computed property
syntax with JavaScript getters and setters and makes writing settable computed
properties developer friendly.

It also has the nice side effect of improving performance, as the old syntax,
with its two-in-one function signatures, was harder for JavaScript engines to
optimize.

The simplest syntax for a computed property is to define the getter as a function:

```javascript
export default Ember.Object.extend({

  height: 100,
  goldenRatioWidth: Ember.computed('height', function(){
    return this.get('height') * 1.618;
  })

});
```

This is still the way to write simple getters, the most common use-case for
computed properties, in Ember 1.12.

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

This syntax was functional but error-prone, verbose, and hard to understand
(for both humans and JavaScript engines).

In Ember 1.12, you can nicely separate the getter and setter into two different
functions.

```javascript
export default Ember.Object.extend({

  height: 100,
  goldenRatioWidth: Ember.computed('height', {
    get(key) {
      return this.get('height') * 1.618;
    },
    set(key, value) {
      this.set('height', value / 1.618);
      return value;
    }
  })

});
```

This also aligns Ember's API with JavaScript getters and setters, and
simplifies the path towards using JavaScript getters in Ember 2.0, after IE8
support is dropped.

For more information see the initial implementation in [#9527](https://github.com/emberjs/ember.js/pull/9527)

Many thanks to [@stefanpenner](https://twitter.com/stefanpenner) and
[@MiguelCamba](https://twitter.com/MiguelCamba) for championing and shipping
this feature.

One last thing: thanks to the experimental support for [JavaScript
decorators][decorators] in Babel, we are also planning a further improvement in
the near future:

```javascript
export default Ember.Object.extend({

  height: 100,

  @computed('height')
  get goldenRatioWidth(key) {
    return this.get('height') * 1.1618;
  }

  set goldenRatioWidth(key, value) {
    this.set('height', value / 1.618);
  }

});
```

[decorators]: https://github.com/wycats/javascript-decorators

#### Instance Initializers

The next feature, instance initializers, makes it possible for FastBoot
applications to run many requests concurrently.

Before FastBoot, you would only ever run applications one at a time. Even in
automated tests, tests were run one at a time, in serial, so one application
was destroyed before the next one was created.

In FastBoot, it is important for a single node server to be able to serve
a second request while the first one is fetching its data.

Thankfully, Ember already ensures that all state is stored in the container,
so in theory, all you need to do is give each request its own container
instance and you get concurrent requests in FastBoot.

In practice, there was a minor API change we needed to make in order to
make it work involving initializers. In Ember 1.11, initializers would
run on app boot (or once per test). Some initializers were setting up
code (and injection rules), which are the same across all FastBoot requests,
while other initializers were creating instances, which are different
across requests.

In Ember.js 1.12 application boot is separated into two phases:

* Application initializers run. At this phase of boot, the goal of initializers
  should be to register dependencies and injections. These initializers are doing
  work that is shared across all FastBoot requests, and therefore should not
  create instances. This phase runs *once*. Because these initializers may
  load code, they are allowed to defer application readiness and advance it.
* Instance initializers run next. This is the right time to do work that is
  specific to each FastBoot request. You can create instances and modify their
  state here. This phase runs when the browser application runs, for each
  integration test, and for each FastBoot request. These initializers run
  after code has loaded and are not allowed to defer readiness.

The two-phase initialization process is safer when multiple addons may be
registering factories and injections.

Ember-CLI 0.2.3 supports instance initializers. For example:

```javascript
// app/instance-initializers/sleep.js

export function initialize(application) {
  application.container.lookup('service:websocket').connect();
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

## Ember 1.13 Beta

And now, the big enchilada!

Together with the release of Ember 1.12, we are releasing the first beta of Ember 1.13.

Ember 1.13 is:

* the last minor release in the 1.x series
* the first release that includes the new **Glimmer rendering engine**

Just to recap; what is Glimmer?

* A new faster rendering engine that is especially fast at updates.
* An implementation of the React-inspired "just re-render it" programming model
  for components, with one-way data flow by default and better enforcement for
  data-down, actions-up.
* Supports angle-bracket components (`<my-component />`), ergonomic attributes
  (`<my-link href="{{url}}.html">go home</my-link>`), that hews closely to HTML
  syntax with a few small enhancements.

We'll be writing a blog post that expands on the programming model of Ember 2.0
and talks about the most important new features in the next few days, and full
docs are coming as well.

We'd like to give a big thank you to the entire community for all the nights and
weekends over the past few months getting Glimmer ([almost][almost]) over the
finish line. It's inspiring.

[almost]: https://www.isemberfastyet.com

#### The 1.13.x Series

In most cases, you should expect Glimmer to be faster at both initial rendering
and updates. If you find performance regressions in idiomatic usage in your app,
we definitely want to hear about it. Please file bugs.

The Glimmer rendering engine changes parts of Ember that have been largely
untouched since the days of SproutCore 2.0. In practice, this means that you
may be relying on implementation details of the pre-Glimmer implementation
that were not captured by tests, and that were not discovered during the
Canary period.

Because of the magnitude of the internal change, we expect the first few
Ember 1.13 betas to be less stable than other betas in the 1.x series. **We
need your help to find and fix compatibility regressions.**

Please report any incompatibilities that you discover. We will investigate and
consider shimming any regression that affects a significant number of apps,
even if the root cause is a change in internal implementation details.

We know that there will likely be some compatibility regressions, especially
in implementation details, that we do not catch during the 1.13 beta period.
We plan to continue to release point releases to the 1.13 series to fix
those details after 2.0 beta is released, and perhaps even for a while after
2.0 final is released.

**Our goal is to ensure that most applications can upgrade to Ember 1.13.x,
remove deprecations, and then upgrade to Ember 2.0 with minimal fuss.** If
a significant number of apps that are earnestly trying to upgrade this way
cannot, we will continue to fix problems that are blocking upgrades.

For an in-depth look into our transition plan for users with existing Ember 1.x
apps, please see the recent [Transition to Ember 2.0 in
Detail][transition-to-2.0] blog post.

[transition-to-2.0]: http://emberjs.com/blog/2015/05/10/run-up-to-two-oh.html

## CHANGELOGS

* [Ember 1.12.0 CHANGELOG][1.12-changelog]
* [Ember 1.13.0-beta.1 CHANGELOG][1.13-changelog]

[1.12-changelog]: https://github.com/emberjs/ember.js/blob/v1.12.0/CHANGELOG.md
[1.13-changelog]: https://github.com/emberjs/ember.js/blob/v1.13.0-beta.1/CHANGELOG.md
