---
title: Core Team Meeting Minutes - 2014/02/21
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
@ebryn, @krisselden, @machty, @tomdale, @trek, @wagenet, @wycats


### Topics
#### Old Stack Overflow questions
Last week we started the process of cleaning up old questions on Stack Overflow by
collecting a list of questions and evaluating whether the question still made
sense and, if so, whether selected answer was still the best available answer.

Initially we were using Stack Overflow's existing tagging functionality to collect this
list but the Stack Overflow admins [suggested that we find some other way](http://meta.stackoverflow.com/a/221612/238614).
They didn't have any suggestions for using Stack Overflow to speed this process,
so we created a list of all Ember.js questions to date with some minimal semantics
around correctness.

If you're looking to help, please [check out this document](https://docs.google.com/spreadsheet/ccc?key=0Aie5my_LJZzOdFB3SnAtZHFZcENic3hrMmxHdWkzeXc&usp=drive_web#gid=0)
and give us feedback on some older Stack Overflow questions and answers!

#### ES6ifying core
This work continues [here](https://github.com/emberjs/ember.js/pull/4374).

#### Features pending 'Go' decision.
The core team reviewed the following pull requests for future inclusion in
the 1.6.x beta series:


*  `ember-testing-simple-setup` [#3785](https://github.com/emberjs/ember.js/pull/3785)

    While its heart is in the right place, we think this is a bandaid on top of a
    testing infrastructure that needs a bottoms-up rethink.

    While we don't think the implementation needs to change dramatically, per se,
    someone needs to sit down and write a proposal for how the testing infrastructure
    should work.

    Resolution: Revert.



*  `query-params-new` [#4008](https://github.com/emberjs/ember.js/pull/4008)

    @stefanpenner and @machty met in person on Tuesday to discuss an API that supported
    lazy loading of routes and will continue the conversation as these changes are made.

    Resolution: Not ready just yet. We don’t  want to serialize default values into the
    URL. False params should be represented as “=false”, rather than merely being absent
    from URL (which was ambiguous). So, this example JSBin from the docs is wrong:
    http://emberjs.jsbin.com/ucanam/2708.




