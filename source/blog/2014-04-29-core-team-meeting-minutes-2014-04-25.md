---
title: Core Team Meeting Minutes - 2014/04/25
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
[@rwjblue](https://twitter.com/rwjblue),
[@trek](https://twitter.com/trek),
[@stefanpenner](https://twitter.com/stefanpenner),
[@wagenet](https://twitter.com/wagenet),
[@wycats](https://twitter.com/wycats)

### Topics

### Build Tools Redux Progresss
When Ember.js took its first tentative steps into the world there existed no
ecosystem of build tools for ambitious applications in the browser. Instead,
we needed to [build these tools](https://github.com/livingsocial/rake-pipeline)
from scratch.

The build tools story is significantly improved from those days! We're fortunate enough to
have several competing systems, all JavaScript based, that help streamline this workflow.

Work is [in progress](https://github.com/rwjblue/ember.js/tree/broccolify) to unify our builds
and better declare and manage our external dependencies.

### PR's/Issues To Review

*  `ember-routing-linkto-target-attribute` [#4718](https://github.com/emberjs/ember.js/pull/4718)

    Resolution: Good to merge into Canary, but not a "Go" yet.

*  `ember-routing-will-change-hooks` [#4760](https://github.com/emberjs/ember.js/pull/4760)

    Resolution: Good to merge into Canary, but not a "Go" yet.

* [Fix view keyword in component block](https://github.com/emberjs/ember.js/pull/4770)

  Fixes [#3520](https://github.com/emberjs/ember.js/pull/3520) by setting the concreteView
  of the virtual view created to yield inside a component block.

  Resolution: Don't merge. Not the real fix.

* [Cannot use the property name `states` in views](https://github.com/emberjs/ember.js/issues/4764)
_states

  Resolution: Fix by making `states` into `_states`. States is considered private API,
  so this should not be a breaking change.

* Async Testing Helpers

  1.4 contained bug fixes in the async test helpers that broke plugins relying on the broken
  behavior (e.g. [the third party httpRespond helper](https://github.com/trek/ember-testing-httpRespond))

  Currently, async is not granular enough, so it's not possible to have test helpers that
  assert while async is working (which httpRespond would need).

  Testing Async helpers need some love. In the past when parts of the ecosystem have needed
  help we've suggested teams of motivated and capable individuals to investigate and improve
  our process. Past successful examples of this include the Ember Inspector and the build tools
  team. We probably need someone to take point on really making the test experience in Ember
  as great as the rest of the framework.

  Resolution: Assemble a Testing Task Force.
