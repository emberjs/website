---
title: Core Team Meeting Minutes - 2014/02/07
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
@ebryn, @krisselden, @machty, @stefanpenner, @tomdale, @trek, @wagenet, @wycats

### Topics

#### Features pending 'Go' decision.
The core team reviewed the following pull requests for inclusion in the 1.5.x beta series:

  * `ember-routing-named-substates` [#3655](https://github.com/emberjs/ember.js/pull/3655)

    Tom and Stef still need to discuss how to handle module mode + new semantics next week.

    Resolution: Tom and Stef will discuss this week. No, for real this time.

  * `ember-handlebars-caps-lookup` [#3218](https://github.com/emberjs/ember.js/pull/3218)

     Needs follow up from [@xtian](https://github.com/xtian).

     Resolution: Ping @xtian

  * `ember-testing-simple-setup` [#3785](https://github.com/emberjs/ember.js/pull/3785)

    Tom and Stef still need to review.

    Resolution: Tom and Stef will review.

  * `query-params-new` [#4008](https://github.com/emberjs/ember.js/pull/4008)

    There are still some decisions around [lazy loading code](https://code.stypi.com/stefanpenner/lazy-loading)
    and query params.

    resolution: Alex and Stef will discuss lazy stuff.

  * `composable-computed-properties` [#3696](https://github.com/emberjs/ember.js/pull/3696)

    resolution:  stefan will work with David monday or tuesday to get this in. A "Go" then.


  * `ember-routing-inherits-parent-model` [#4246](https://github.com/emberjs/ember.js/pull/4246)
    
    resolution: "Go", already in beta

  * `ember-handlebars-log-primitives` [#4252](https://github.com/emberjs/ember.js/pull/4252)
    
    resolution: "Go"

  * `ember-document-title` [#3689](https://github.com/emberjs/ember.js/pull/3689)

    Examples from @machty of current behavior:

     * [Single static title](http://jsbin.com/ucanam/3299)
     * [Basic example of titleToken + title](http://jsbin.com/ucanam/3302)
     * [Basic example of titleToken + title (reversed)](http://jsbin.com/ucanam/3300)
     * [titleToken bound to controller/model properties](http://jsbin.com/ucanam/3303)
     * [Overriding doc.title format in deeper routes](http://jsbin.com/ucanam/3304)
    
    resolution: Still "No go", tokenization needs some polish related to nested resources

#### Features currently slated for 1.5.0 beta series
The core team reviewed the following pull requests for already enabled in canary builds for inclusion in the 1.5.x beta series. All still have a "Go" vote.

  * `ember-testing-routing-helpers` [#3711](https://github.com/emberjs/ember.js/pull/3711)
  * `ember-testing-triggerEvent-helper` [#3792](https://github.com/emberjs/ember.js/pull/3792)
  * `computed-read-only` [#3879](https://github.com/emberjs/ember.js/pull/3879)
  * `ember-metal-is-blank` [#4049](https://github.com/emberjs/ember.js/pull/4049)
  * `ember-eager-url-update` [#4122](https://github.com/emberjs/ember.js/pull/4122)
  * `ember-routing-auto-location` [#3725](https://github.com/emberjs/ember.js/pull/3725)
  * `ember-routing-bound-action-name` [#3936](https://github.com/emberjs/ember.js/pull/3936)


#### Feature Process
We reviewed the a proposed change to the process for adding features. This isn't a major departure, just an iteration
on what we are currently doing:

Process:

* Feature is submitted via PR.
    * Confirm `features.json` and `FEATURES.md` have entries.
    * That PR is reviewed, and generally confirmed to be a solid idea
    * PR is merged so makes it into a canary build
* Feature is added to [Features Pending 'Go' Decision](https://github.com/emberjs/ember.js/issues/4052) Issue
* New Issue is created with a check-list of items to be completed prior to receiving a 'Go' vote. 
  This should include at least the following entries:
    * Security Audit
    * Core Team Sign-off
  * Should be given a special tag (to make it easy to find later)
  * Should be assigned to the original feature contributor
  * This can serve as the proper place to ask for changes/fixes to the feature
  * Once the feature has gotten a 'Go' decision
    * The issue is closed.
    * It is added to `features.json` with a value of `true`.

resolution: "Go" and CONTRIBUTOR.md should be update accordingly.

#### Security Process
Currently we do security releases all the way back to 1.0.x. At some point that will be untenable (not yet though).
There was some discussions about Long Term Support release structures: every odd/even becomes LTS, or even 5th release, or we only support previous three revisions (which would be all releases in the last 4.5 months with our current release model).
