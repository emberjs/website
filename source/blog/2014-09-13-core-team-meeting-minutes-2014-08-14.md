---
title: Core Team Meeting Minutes - 2014/08/14
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
  [@mixonic](https://twitter.com/mixonic)
  [@_mmun](https://twitter.com/_mmun),
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
[@mixonic](https://twitter.com/mixonic)
[@_mmun](https://twitter.com/_mmun),
[@rwjblue](https://twitter.com/rwjblue),
[@trek](https://twitter.com/trek),
[@stefanpenner](https://twitter.com/stefanpenner),
[@wagenet](https://twitter.com/wagenet),
[@tomdale](https://twitter.com/tomdale),
[@wycats](https://twitter.com/wycats)

### Explore using Lodash
We reviewed a [PR that replaces Ember builtin array extensions internals with Lodash](https://github.com/emberjs/ember.js/pull/5019).

Assuming no performance regressions, we're in favor.

### Guides and API versioned and subdomained
Currently the Guides and API are not versioned, which increasingly leads to
pain around new feature documentation. The plan is to beging publishing guides
and API to a subdomains and version them:

  * http://guides.emberjs.com/ (defaults to latest)
  * http://guides.emberjs.com/1.8
  * http://api.ember.js.com/ (defaults to latest)
  * http://api.ember.js.com/1.8
