---
title: Core Team Meeting Minutes - 2014/03/14
author: Trek Glowacki
tags: Core Team Meeting Minutes, 2014, Roadmap
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
@ebryn, @krisselden, @machty, @rwjblue, @stefanpenner, @tomdale, @trek, @wycats

### Topics

### Go/No-Go Feature Listing
  *  `query-params-new` [#4008](https://github.com/emberjs/ember.js/pull/4008)
     Still a no-go, while @machty and @wycats hash out the specifics


### PR's/Issues To Review
* [canSetInnerHTML: IE cannot set innerHTML on several tags](https://github.com/emberjs/ember.js/pull/4496)

  IE doesn't support .innerHTML = on COL, COLGROUP, FRAMESET, HTML, STYLE, TABLE, TBODY, TFOOT, THEAD, TITLE, or TR.

  Resolution: definitely a bug, but this will be fixed with HTMLbars so we'd rather wait for that to
  land instead of fixing now

* [Overwrite observers and listeners in Ember.CoreObject.create().](https://github.com/emberjs/ember.js/pull/4360)

  Modifies mixin inclusion code in `makeCtor` to remove any observers/listeners setup on the property or key prior
  to adding the property.

  My concern is the modification in this particular code path.

  Resolution: this used to be how create worked, but we moved away with this for performance reasons. `.extend`
  is intended for design-time use, not runtime: use `.extend().create() or `.createWithMixins()`

* [Use injected test helpers instead of local functions.](https://github.com/emberjs/ember.js/pull/4520)

  Since we are injecting the application with our helpers (into the App.testHelpers hash), we should be using
  that helper and not simply calling the function in local scope.

  As the tests show, this allows a user to override the internal helpers with a tailored version for their scenarios.

  Resolution: make it possible but still private API. Assert on attempting to override built-in helpers.

