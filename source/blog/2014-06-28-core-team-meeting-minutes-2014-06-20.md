---
title: Core Team Meeting Minutes - 2014/06/20
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

[@krisselden](https://twitter.com/krisselden),
[@machty](https://twitter.com/machty),
[@rwjblue](https://twitter.com/rwjblue),
[@trek](https://twitter.com/trek),
[@stefanpenner](https://twitter.com/stefanpenner),
[@wagenet](https://twitter.com/wagenet),
[@tomdale](https://twitter.com/tomdale),
[@wycats](https://twitter.com/wycats)


### Features pending 'Go' decisions

  * [ember-routing-consistent-resources](https://github.com/emberjs/ember.js/pull/4251)

    This PR adds .index, .loading, and .error sub-routes for resources created even
    if no callback was provided so `this.resource('foo')` and
    `this.resource('foo', function(){})` behave identically.

    Resolution:  'Go'.
