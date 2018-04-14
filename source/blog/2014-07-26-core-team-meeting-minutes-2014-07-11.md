---
title: Core Team Meeting Minutes - 2014/07/11
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
[@rwjblue](https://twitter.com/rwjblue),
[@trek](https://twitter.com/trek),
[@stefanpenner](https://twitter.com/stefanpenner),
[@wagenet](https://twitter.com/wagenet),
[@tomdale](https://twitter.com/tomdale),
[@wycats](https://twitter.com/wycats)

### Path to Core
Members of the community who have a sustained and significant contribution to
Ember.js are invited to join the core team and help us guide the framework's
future direction. Members we'd like to add are put on the "path to core" and
given greater autonomy for a trial period before being officially invited.

Contributors on path to core are given commit access to the Ember.js
repositories and attend our weekly core team meetings and periodic
face to face meetings.

Today we're happy to announce that two Ember.js contributors are on the path
to core: Matthew Beale (who most of you will know as
[@mixonic](https://twitter.com/mixonic)) and Martin Mu&ntilde;oz
([@_mmun](https://twitter.com/_mmun)). Matthew and Martin have both been
pushing hard on [htmlbars](https://github.com/tildeio/htmlbars), the
underlying library that will power Ember.js's rewritten view layer.


### Features Pending Go/No-Go

   * [ember-metal-is-present](https://github.com/emberjs/ember.js/pull/5136)

      Resolution: this is excellent addon material. Revert.

   * [event-dispatcher-can-disable-event-manager](https://github.com/emberjs/ember.js/pull/5116)

      Resolution: event dispatcher is being deprecated, but we'll have hooks for
                  libraries like (Hammer.js)[http://hammerjs.github.io/] to
                  integrate with. Revert.

   * [ember-routing-linkto-target-attribute]

      Resolution: This is a Go.

### Issues for Discussion

  * [Fix {{#with view.foo as bar}} #5115](https://github.com/emberjs/ember.js/pull/5115)

    This is a bug. Merged.

  * [Fix usage of document.body.contains](https://github.com/emberjs/ember.js/pull/5089)

    This is not required in metal-views, so the problem should go away. The suggested
    polyfill with feature flag for 1.7 OK until that time.

  * [Force remove `required` attribute for IE8](https://github.com/emberjs/ember.js/pull/4936)

    Scumbag IE. This is merged

  * [Actions should be looked up via `Ember.get`](https://github.com/emberjs/ember.js/pull/4920)

    `:-1:` as is, need to re-work and add a 're-bubble' phase that checks `actionMissing`
    good idea, but seems like it may require a lot of work.

