---
title: Core Team Meeting Minutes - 2014/03/07
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

#### Features pending 'Go' decision. [Tracking Issue](https://github.com/emberjs/ember.js/issues/4052)

  *  `ember-routing-add-model-option` [#4293](https://github.com/emberjs/ember.js/pull/4293)
    Resolution: Go

### PR's/Issues To Review

  * Query Params New - Sticky Params?

    Should query paramters remain on route change? When do we want it? All the time?
    How do we disable it? Proposals thus far:

    ```
    /r?sort=asc ← keep
    /r/ios?sort=hot ← keep? “model specific state”
    /r/gonewild ← keep? “model specific state”
    /r/foo?name=’something related to foo’
    ```

    or
    ```
    /blog/somepost?comments=true
    then navigate to
    /blog/someOtherPost?comments=true ← keep?
    /blog/someOtherPostthen ← don’t keep?
    // then navigate to
    /blog/somepost?comments=true ← kept from before? kept from last route? gone from last route?
    ```

    Possible opt-out via helper?
    ```
    {{link-to ‘Home’ ‘home’ (query-params sort=null)}}
    ```

    some options:
      * Preserve stickiness as the default, but add a (query-params-reset) subexpression helper
        (in addition to query-params) that can take 0 or more args and will reset any query params
        not explicitly specified in the helper invocation. The puts the stickiness in the control
        of the caller (the link-to helper).

      * Add a sticky option to the route query params config hash, which defaults to true. If set to
        false, any links into that route will reset (unless QP values are explicitly provided in the
        link-to helper), but any links to that route from within that route hierarchy will be sticky,
        which effectively makes it so that if you leave a route and come back into it via a link-to,
        the QPs specified as sticky:false will be reset. Keep in mind though that leaving a route and
        pressing the back button will be "sticky" since the previous values on the controller will be
        restored based on the previous URL.

      Example JSBin: http://emberjs.jsbin.com/ucanam/4102

      Resolution: Sticky by default, with appropriate escape valves to opt out per route change


  * [ES6 ember-metal, ember-runtime, ember-debug](https://github.com/emberjs/ember.js/pull/4374)

    Work is currently being done (by @thomasaboyt amongst others) on the es6-module-transpiler
    to remove the need for intermediate variables. This will both reduce filesize (less total
    output), and enable cycles support (since it is evaluated lazily).

    We believe there is more file size savings to be had in the way the view layer, and would like
    to be able to progress in the ES6 effort. Currently rebasing upon any change to ember-metal,
    ember-runtime, and ember-debug (rare) is difficult. I believe that we cannot maintain the long
    running pull-request branch for much longer and would like time to process/deal-with any issues
    that crop up from the swap (missing global exports for example) before branching the next beta
    series (2 weeks).

    RESOLUTION: Merge (pending specific issues that have already been noted), but before shipping another globals build we should deal with the file size issue. We have ~7 weeks until the 1.6 release.

  * [The `each` helper checks that the metamorph tags have the same parent.](https://github.com/emberjs/ember.js/pull/4404)

    This was generally approved in the 2014-02-28 meeting once some verbiage tweaks were made. @trek's suggested
    changes have been made, this is ready to go.

    Resolution: merge.

  * [FEATURE Ember.computed.instance](https://github.com/emberjs/ember.js/pull/4291)

    > A computed property that creates a new instance of source. `source` can be any
    > Class constructor, object, array, or a path to a local property.  Optionally you can
    > specify the initial value(s), if only `initialValue` is given and if it is a string, it
    > is treated as a local path.

  Resolution: make it an add on that’s not core. CPM.

  * [Deprecate edge-case get and normalizeTuple behavior before fixes](https://github.com/emberjs/ember.js/pull/4124)

    PR [#3852](https://github.com/emberjs/ember.js/pull/3852) changes some edge case behavior for get and normalizeTuple. Ahead of those changes, this commit introduces deprecation notices.

    * Deprecate get for local paths on global contexts, only if they
      return data.
    * Deprecate normalizeTuple calls that return a non-global contenxt
      and a simple global path.

  * [Deprecate global access from templates](https://github.com/emberjs/ember.js/pull/4459)

    PR by @mixonic:

    > Replaces #4358. These deprecations are narrow in scope, and only impact {{Global}} and
    > {{#each Global}}. They do not deprecate any other global access in templates. Deprecating
    > all global access from templates would a) need to be done helper-by-helper or b) would impact
    > the get and binding code at a lower level.
    >
    > @xtian I'm rewritten your first commit but preserved it here.
    >
    > @ebryn yo.

  * [Container throws if injection registered for already instantiated type](https://github.com/emberjs/ember.js/pull/4328)

    > Prior to this commit, the container would happily allow you to register an injection for a
    > type that had already been instantiated. This led to confusing-to-debug situations where an
    > injection is registered but a container-created instance doesn't have the injection applied.

    Comment from @stefanpenner

    > As you know I'm all for this change, but it may cause people some inconvenience. I personally
    > consider it a bugfix, but i would like @tomdale or @wycats's +1/-1.

    Resolution: @stefanpenner & @wycats will chat.

  * [Expose asObject to Ember.Handlebars.precompile](https://github.com/emberjs/ember.js/pull/4097)

    Comment from @rwjblue:

    > This was mentioned in the core team meeting on 2014-02-28. It was mentioned that this should be
    > changed upstream (in Handlebars itself), but as I reviewed (to let you know where that change
    > would be needed) I realized that this PR is simply exposing the functionality that already
    > exists within Handlebars, but is not exposed to `Ember.Handlebars.precompile`.

    > As such, I think that we should likely re-evaluate the prior decision.

    Resolution. Ship it. This just passes from Handlebars to Ember.Handlebars

