---
title: Core Team Meeting Minutes - 2014/09/12
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


### HTMLBars
Most of this weeks discussion focused on our largest ongoing project: HTMLBars.
We're hoping HTMLBars is on track to make it into the 1.9 or 1.10 beta series.

The biggest outstanding issues are general cleanup, fixing behavior around
parts of the
[DOM where a browser will "helpfully" insert "missing" tags](https://github.com/emberjs/ember.js/pull/5571)
(like auto-insertion of `tbody` into a `table`),
and [Internet Explorer bugs and performance](https://github.com/tildeio/htmlbars/pull/91)
