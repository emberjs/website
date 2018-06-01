---
title: Core Team Meeting Minutes - 2014/02/14
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
#### ES6ifying core
Last month we completed the migration of [ember-data](https://github.com/emberjs) to the ES6 module syntax. This lets us use [clearer dependency declarations](https://github.com/emberjs/data/blob/master/packages/ember-data/lib/serializers/rest_serializer.js#L5-L8), stay clear of module syntax battles (you can export to whichever module format best conforms to your deeply held beliefs on JavaScript modules), and continues our pattern of bringing future JavaScript features to you today.

Work has started on the [porting Ember.js to ES6 module syntax as well!](https://github.com/emberjs/ember.js/commit/8c0a52cb10efbaede8e14cca24fa5c05bcf121ff).

Thanks to @thomasABoyt and @Square for work on the [ES6 Module Transpiler](https://github.com/square/es6-module-transpiler), @fivetanley for converting ember-data, and @rwjblue for starting the process in Ember.js core.

Resolution: @rwjblue hands off the grunt work to @trek and @fivetanley so he's not overextended. @rwjblue says "you're good to start with ember-metal"


#### Ghost.js Admin
The fine folks at [Ghost](https://ghost.org/) have hit a complexity ceiling with their current admin interface (a mixed client/server rendering solution with Backbone tossed in). They're [discussing various solutions for a rewrite](https://github.com/TryGhost/Ghost/issues/2144) and Ember.js is among the options.

The core team discussed devoting some time to helping the Ghost team evaluate Ember.js as a possible solution.
If you'd like to help or weigh in – especially if you're a current Ghost user or developer – please go comment: [https://github.com/TryGhost/Ghost/issues/2144](https://github.com/TryGhost/Ghost/issues/2144)

Resolution: @trek will devote some time to helping the Ghost team. Possibly on a small spike.

#### Getting rid of old Stack Overflow questions/answers
We frequently get comments about older Stack Overflow questions and answers. Answers
related to pre-release versions of Ember have a high likelihood of no longer being valid.
Stack Overflow has a policy of not deleting questions related to older versions of software,
but we think pre-release software is exceptional for a few reasons:
    
  * pre-release software is often undocumented and unfinished, leading people to use
    Stack Overflow as a place to find answers at higher rates than for relased software
  * people should not continue using pre-release software for long after an official
    release, so there is little value in having those answers around for future reference
  * good questions might have wildly different answers before and after a 1.0 release
    but there's no way for a new user to know
  * some questions themselves will no longer make sense as features are added or removed

An example of a question that should be deleted is this [question related to Ember.Button](http://stackoverflow.com/questions/8672287/ember-js-how-to-use-em-button). Ember.Button has long been deprecated and removed. The pattern for actions has changed significantly since that question was asked in December 2011. However, someone wondering how to handle buttons in Ember who searches for "ember and buttons stackoverflow" will get this question as a top result.


We're working to do some form of cleanup for questions like these. The first step is to compile a list of ones the community feels should be removed. With that list we'll apply some form of cleanup.

Resolution: @trek will get this list created somehow.

#### Features pending 'Go' decision.
The core team reviewed the following pull requests for future inclusion in the 1.6.x beta series:

  *  `ember-routing-named-substates` [#3655](https://github.com/emberjs/ember.js/pull/3655)
    
      @stefanpenner and @tomdale still need to pow-wow on this.

      Resolution: @stefanpenner and @tomdale will speak.

  *  `ember-testing-simple-setup` [#3785](https://github.com/emberjs/ember.js/pull/3785)

    @stefanpenner and @tomdale still need to pow-wow on this.

    Resolution: @stefanpenner and @tomdale will speak.

  *  `query-params-new` [#4008](https://github.com/emberjs/ember.js/pull/4008)
    
    @wycats and @machty continued discussion on lazy loading. Goal is to get it in during this beta cycle
  
    Resolution: @machty & @stefanpenner have a man-date to discuss lazy loading.

  *  `composable-computed-properties` [#3696](https://github.com/emberjs/ember.js/pull/3696)
  
  Still blocked on [computed.literal](https://github.com/emberjs/ember.js/pull/4185)


  Resolution: The original behavior wasn't intended. Changing now might be breaking change
  in some people's apps. We'll put it through a multi-cycle deprecation/removal path.

  *  `ember-metal-computed-empty-array` [#4219](https://github.com/emberjs/ember.js/pull/4219)

  Resolution: "Go". Upgrade to a Bugfix is it doesn't require a flag.

  *  `ember-runtime-test-friendly-promises` [#4176](https://github.com/emberjs/ember.js/pull/4176)

  Resolution: Peter will try in [Skylight](https://www.skylight.io/)'s tests and
  offer feedback

  *  `ember-routing-inherits-parent-model` [#4246](https://github.com/emberjs/ember.js/pull/4246)

  Resolution: Already conceptually a "Go". @machty will make nestable routes in the next week or so so this can be merged.


  * [BUGFIX beta Still update HTML5 history if the previous state was null](https://github.com/emberjs/ember.js/pull/4235)

  iframes may set null values onto the HTML5 history state. The router will sometimes pick up the null value as current
  instead of the window's nominal state (which was set by Ember). The old logic required that a prior state be present, 
  this logic allows a null state to be replaced or pushed over.


  Resolution: A clear "Go".
  
