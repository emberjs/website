---
title: Core Team Meeting Minutes - 2014/01/27
author: Trek Glowacki
tags: Core Team Meeting Minutes, Roadmap, 2014
---

Although most of our collaboration takes place on Github, IRC 
(`#emberjs` on freenode.net), and our [Discourse site](http://discuss.emberjs.com/)
the [Ember.js Core Team](/team) meets privately every 
Friday at 2pm EST/11am PST through Google Hangout for a weekly 
discussion of all things Ember.

If you have a topic you'd like to see covered, contact your favorite
core team member and let them know!

This week's core team meeting was rescheduled from Friday, January 24 to Monday, January 27
due to the Google outage that affected Google Hangouts.

#### Attendees
@ebryn, @krisselden, @machty, @stefanpenner, @tomdale, @trek, @wagenet, @wycats

### Topics

#### Issues Discussion:
The core team discussed the following Github Issues

  * `ember-routing-auto-location` [#3725](https://github.com/emberjs/ember.js/pull/3725).

    resolution:

    * assign @stefanpenner
    * should be good for the next beta.
    * needs someone to audit + try for real
    * is it ok if we have /#/foo and /foo  in the wild? How does this affect SEO
    * document that backend support is needed and that your app will not have 
      canonical URLs (i.e. every URL will have two versions in the wild: `/#/foo` and `/foo`)

  * Bound Action Lookup [#3936](https://github.com/emberjs/ember.js/pull/3936)

    We added default fall back to allow a static string action name if a property isn't found,
    but it is possible that this will break things if you have a property AND an action named
    the same thing. This could be enabled similar to the `ember-routing-drop-deprecated-action-style`
    feature which will need to have a `null` value in `features.json` (which will allow folks to 
    opt-in via `EmberENV`) until 2.0 if we are concerned with the SemVer implications.

    resolution: Ensure docs are updated so unquoted style is not used before shipping.

  * `ember-views-bindable-attributes` [#4170](https://github.com/emberjs/ember.js/pull/4170)

    We like the idea generally but there are doubts having a a separate API, we should explore pushing it into a single API. Differences between this and `attributeBindings` are too subtle, we should not fragment

    This has been converted to a Mixin that is only used for `Ember.TextField` and `Ember.TextArea` currently. It allows for us to use all HTML5 attributes, but only actually setup observers/bindings for the ones that are present at the first render. This has a significant developer happiness impact, and we hope that we can get comfortable with it enough to enable in 1.5 beta series.
    
    resolution: @ebryn will talk to Robert


  * Replace `module` with *something* else. [#3838](https://github.com/emberjs/ember.js/pull/3838)
  
    This is due to an issue under Node (since `module` is a reserved word). It ultimately doesn't matter what we decide on, but if we want the test suite to run under Node (for `ember-runtime` and `ember-metal` specifically, but also possibly `ember-data`) we need to use something that isn't a keyword.

    resolution: QUnit.module, but check for prior art. (@stefanpenner)

  * Update Backburner (and Docs). [#4120](https://github.com/emberjs/ember.js/pull/4120)

    Contains potentially breaking change to `throttle` to default to running immediately (from [ebryn/backburner.js#55](https://github.com/ebryn/backburner.js/pull/55) ).
   
    resolution: it was a bug, breaking it is fine.

  * [https://github.com/emberjs/ember.js/issues/3256](https://github.com/emberjs/ember.js/issues/3256)
  
    resolution: bindingPaths to globals should be canned, so we won't support additional features built on
    on this behavior.



