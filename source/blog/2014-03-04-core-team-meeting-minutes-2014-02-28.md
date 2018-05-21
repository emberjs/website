---
title: Core Team Meeting Minutes - 2014/02/28
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
#### Hello, Ghost
A few weeks ago [@jacob4u2 reached out over twitter](https://twitter.com/jacob4u2/status/434059022220541952)
to let us know the popular Node.js-based blogging platform [Ghost](https://ghost.org/) was looking to
reinvent their admin interface and were discussing various browser JavaScript libraries. The
[ensuing discussion](https://github.com/TryGhost/Ghost/issues/2144) is a great read.

This week the Ghost team announced [they'd be rebuilding in Ember.js](http://dev.ghost.org/hello-ember/).
We're super geeked to see Ghost join [Balanced](https://www.balancedpayments.com/),
[TravisCI](https://travis-ci.org/), [Discourse](http://www.discourse.org/), and the rest of the
great community of open source projects adopting Ember.js.

Thanks to everyone who chimed in on the discussion and the Ember.js community members who
helped with advice, feedback, and tender loving care on Github, Twitter, and IRC.

Resolution:

* @ebryn is going to do a video walkthrough of how he'd organize Ghost's admin interface
* @rwjblue and @trek have been in #Ghost IRC and will keep that up
* We'll ask the Ghost to team to draw our attention to PRs/Issues related to the migration


#### ES6ifying core
The migration of ember-metal, ember-runtime, and ember-debug to ES6-style modules is
[completed but not yet merged](https://github.com/emberjs/ember.js/pull/4374).  In making
large changes we're always especially cautious about accidentally breaking existing
features, reducing performance, or increasing file size. Modularizing doesn't appear to have
an effect on build speed or runtime performance, but did lead to a 5k min/gzip size increase
that we're not happy with.

We're currently tracking down the various causes of size bloat and doing some cleanup
to bring build size back to its previous size.

Resolution:

* @rwjblue is going to do some cleanup and work with the transpiler
  maintainers to add some output improvements.


#### Features pending 'Go' decision.
The core team reviewed the following pull requests for future inclusion in
the 1.6.x beta series:

*  `ember-routing-named-substates` [#3655](https://github.com/emberjs/ember.js/pull/3655)
    Still blocked on module vs global object lookup form, which causes naming collisions.

    Resolution: will remain on canary until we've moved to modules and have a modular
    loader.

*  `ember-handlebars-caps-lookup` [#3218](https://github.com/emberjs/ember.js/pull/3218)
    The original author has become unresponsive.

    Resolution: approach @mixonic to take over.


*  `ember-routing-add-model-option` [#4293](https://github.com/emberjs/ember.js/pull/4293)

    Resolution: It’s a go.



#### PR's/Issues To Review

* [Do not setup listeners for destroyed Arrays](https://github.com/emberjs/ember.js/pull/4436)

    Sometimes due to timing in test suites, an array that has become
    destroyed (most likely due to a call to DS.Store#unloadAll in Ember Data)
    is assigned to an array proxy. This leads to an intermittent problem
    where an assertion is raised due to a destroyed array-like object
    no longer being considered an array by Ember.

    The root cause is that Ember.isArray relies on Ember.Array.detect to
    determine "Array-ness", and when Ember.Array.detect is used on a
    destroyed object false is returned because the meta information has
    been removed.

    Resolution: this error is the symptom, needs further investigation.
    @stefanpenner will investigate, and consult @krisselden and @ebryn

* [Resolve target issue on actions and with-controller](https://github.com/emberjs/ember.js/pull/4401)

    Fixes issues where actions inside a {{with controller='foo'}}
    block bypass the `FooController`'s action handling.

    Resolution: @ebryn, @krisselden, @wycats should review. Future changes that touch
    scope manipulation must be reviewed by @ebryn, @krisselden,  @wycats.

* [The `each` helper checks that the metamorph tags have the same parent.](https://github.com/emberjs/ember.js/pull/4404)

    In some cases, the browser may add or fix tags, which change the
    parentage of metamorph tags. This problem happens frequently when the
    developer doesn't not include the TBODY tag inside a table for example.
    This prevents the framework to update or clean the underlying DOM
    elements.

    This helps to detect the issue described in #4273.

    Resolution: @trek will offer some feedback on wording. This should be a total non-issue
    once we can emit HTMLBars.


* [Expose asObject to Ember.Handlebars.precompile](https://github.com/emberjs/ember.js/pull/4097)

    Resolution: This belongs in handlebars, so reopen on Handlebars repo


* [FEATURE ember-handlebars-radio-buttons Implement radio buttons](https://github.com/emberjs/ember.js/pull/4352)

    Resolution: hold off and talk about this at the next face to face.


* [Deprecate edge-case get and normalizeTuple behavior before fixes](https://github.com/emberjs/ember.js/pull/4124)

    PR [#3852](https://github.com/emberjs/ember.js/pull/3852) changes some edge case behavior for get and normalizeTuple. Ahead of those changes, this commit introduces deprecation notices.

    Resolution:

    * Deprecate get for local paths on global contexts, only if they
    return data.
    * Deprecate normalizeTuple calls that return a non-global context
    and a simple global path.



