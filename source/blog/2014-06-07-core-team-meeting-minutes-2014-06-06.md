---
title: Core Team Meeting Minutes - 2014/06/06
author: Trek Glowacki
tags: Core Team Meeting Minutes, 2014
responsive: true
---

Although most of our collaboration takes place on Github, IRC
(`#emberjs` on freenode.net), and our [Discourse site](http://discuss.emberjs.com/)
the [Ember.js Core Team](/team) meets privately every
Friday at 2pm EST/11am PST through Google Hangout for a weekly
discussion of all things Ember.

If you have a topic you'd like to see covered, contact your favorite
core team member and let them know!

#### Attendees

<!--   [@ebryn](https://twitter.com/ebryn),
  [@krisselden](https://twitter.com/krisselden),
  [@machty](https://twitter.com/machty),
  [@rwjblue](https://twitter.com/rwjblue),
  [@trek](https://twitter.com/trek),
  [@stefanpenner](https://twitter.com/stefanpenner),
  [@wagenet](https://twitter.com/wagenet),
  [@tomdale](https://twitter.com/tomdale),
  [@wifelette](https://twitter.com/wifelette),
  [@wycats](https://twitter.com/wycats) -->


[@ebryn](https://twitter.com/ebryn),
[@krisselden](https://twitter.com/krisselden),
[@machty](https://twitter.com/machty),
[@trek](https://twitter.com/trek),
[@stefanpenner](https://twitter.com/stefanpenner),
[@wagenet](https://twitter.com/wagenet),
[@tomdale](https://twitter.com/tomdale)

### Where have all the minutes gone, long time passing?
Many people have reached out on twitter wondering where the meeting
minutes for May have gone. We'd like to apologize: many of us were
traveling, attending conferences, and/or handling cross-state moves during May.
Meetings have still been taking place, topics discussed, and advanced thought
leadership generated, but attendance and note taking have been sporadic.

### Ember 1.6/1.7.beta Delayed
We've been delaying the release of Ember 1.6 and the start of the 1.7.beta
branch for a few weeks to address outstanding issues that have been reported
and to ensure certain features make it into the 1.7.beta cycle.

There are two main concerns:

#### Module Performance Regression
Despite what the anti-framework crowd might think, Ember.js was written from the
start to be composed of many smaller, single purpose modules. Some of these are
pulled in from external repositories and some are contained inside
the Ember.js repository itself.

Modularity was part of the Ember.js story even when there wasn't a great way to distribute
or consume modules for the browser. Today, the landscape is much improved with an official
module specification for ES6 and tooling to transpile from this format to the several
competing community formats until the browsers gain native support.

A month ago, we completed our migration to the ES6 module format and
[Square's ES6 module transpiler](https://github.com/square/es6-module-transpiler), transpiling to
[AMD style](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) modules.

Unfortunately, even with an extremely [minimal loader](https://github.com/stefanpenner/loader.js),
the number of module load calls adds up: An AMD build of Ember.js accesses the loader ~ 1300 times.

On desktop the performance change is negligible, but on lower power mobile devices can cause
a ~300ms addition to load time over previous builds of Ember.js.

Thankfully, the ES6 module transpiler is being augmented to address this concern and we should be
able to output a build that does not require a loader for Ember.js internals. Everyone
should be sure to thank [Brian Donovan](https://twitter.com/eventualbuddha) and [Square](https://twitter.com/squareeng) for their amazing work on bringing ES6 modules to us today.

#### Query Parameters
When we released 1.0 we pledged to follow [Semantic Versioning](http://semver.org/) and not break public-facing API until 2.0. Because of this, we're hesitant to release extensions to Ember.js's
public API until we feel confident supporting it for the foreseeable future. We've taken several stabs
at adding query parameters to our router. People have been very happy with the [latest incarnation](/guides/routing/query-params/) available on canary builds, but there have been a few
edge cases we wanted to address. The last of these (providing a hook for overriding parameter resets
on route exit) is about to land and we should hopefully include query parameters in the first 1.7.beta release.

If you're thinking "pft, how hard is it to tack a `?` to the end of a URL?", there's a great [EmberConf presentation](https://www.youtube.com/watch?v=Syv_OTzHOr0) about the road to discovering what exactly query parameters are trying to express in a long running, stateful application.





