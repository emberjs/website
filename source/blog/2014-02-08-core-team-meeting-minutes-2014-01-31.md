---
title: Core Team Meeting Minutes - 2014/01/31
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
@ebryn, @krisselden, @machty, @stefanpenner, @tomdale, @wifelette, @wycats

### Go/No-Go Feature Listing

  * `ember-routing-named-substates` [#3655](https://github.com/emberjs/ember.js/pull/3655)
      @krisselden: likes the feature a lot (we should “just doit”)
      @wycats: naming with globals is totally unsolvable.
      @machty: If FooLoading is ambiguous, we should just warn that global mode is not supported for this feature
      @tomdale: we need a separate task force for thinking about module mode only features.

      resolution: Tom and Stef will review


  * `ember-handlebars-caps-lookup` [#3218](https://github.com/emberjs/ember.js/pull/3218)

      resolution: check local first, warn and fallback to global seems like a good strategy

  * `ember-testing-simple-setup` [#3785](https://github.com/emberjs/ember.js/pull/3785)

      resolution: Tom and Stef will review

  * `version api docs`

    Often asked for. We should work with community, see if robert can own, and help delegate.

  * `query-params-new` [#4008](https://github.com/emberjs/ember.js/pull/4008)

    misleading bug reports, but eager loader of controllers was the original pain point that kept
    this a "No go"


  *  `composable-computed-properties` [#3696](https://github.com/emberjs/ember.js/pull/3696)

    @wycats: aliased to short words in the examples, should be documented to match this?
    @ebryn:: new CP work may have issues, @wycats and @ebryn and David should talk.

    resolution: @ebryn will talk to David about blocking

  * `ember-routing-auto-location` [#3725](https://github.com/emberjs/ember.js/pull/3725)

     resolution: Alex will make sure docs are good, then this becomes a "Go"

  * `ember-routing-bound-action-name` [#3936](https://github.com/emberjs/ember.js/pull/3936)

    resolution: "Go" but we need an intermediate release issuing deprecation warnings, a future release will have break. This future release may contain some helpful warning, and the release notes will contain this info.

### PR's/Issues To Review


* [FEATURE ember-routing-consistent-resources](https://github.com/emberjs/ember.js/pull/4251)

    Adds `.index`, `.loading`, and `.error` sub-routes for resources created even if no callback was provided.

    For example:

    ```javascript
     App.Router.map(function() {
       this.resource("home");
     });
    ```

    Prior to this feature `home.index` route would not be created for the above resource.
    It is possible that the current situation was intentional.

    resolution: "No go"

* [FEATURE ember-routing-inherits-parent-model](https://github.com/emberjs/ember.js/pull/4246)

    ```javascript
    App.Router.map(function() {
      this.resource('thing', { path: '/thing/:thing_id' }, function() {
        this.route('edit');
      });
    });
    ```

    If you wanted the Edit route's model to be the Thing loaded in the Thing route, you have to define a model hook on the Edit route to call this.modelFor('thing'), which is pretty repetitive and cumbersome.

    For this.route() routes that don't specify a model hook, the model for that route should default to the parent resource's model.

    This should be totally backwards compatible unless someone is doing something extremely strange.


    resolution: make this work only for routes, not resources for now. The interim solution.

* [FEATURE ember-document-title](https://github.com/emberjs/ember.js/pull/3689)

    Examples from @machty:

    * [Single static title](http://jsbin.com/ucanam/3299)
    * [Basic example of titleToken + title](http://jsbin.com/ucanam/3302)
    * [Basic example of titleToken + title (reversed)](http://jsbin.com/ucanam/3300)
    * [titleToken bound to controller/model properties](http://jsbin.com/ucanam/3303)
    * [Overriding doc.title format in deeper routes](http://jsbin.com/ucanam/3304)


    resolution: pause, until @wycats and @tomdale can review tokens behavior. Its getting close and we want this.

* [Convert Checkbox and Select to Components.](https://github.com/emberjs/ember.js/pull/3935)

    resolution: "No go", this is a breaking change.

* [Use `QUnit.module` instead of `module`.](https://github.com/emberjs/ember.js/pull/3838)

    Let's just confirm what to use as a prefix. Is `QUnit.module` OK, or should we create our own
    (perhaps `EmberDev.module` or something)?


    resolution: "Go"


