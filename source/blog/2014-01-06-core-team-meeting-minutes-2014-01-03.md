---
title: Core Team Meeting Minutes - 2014/01/03
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
@ebryn, @krisselden, @machty, @stefanpenner, @trek, @wagenet, @wycats

### Go/No-Go for 1.4
It's that time in the [beta release cycle](/builds/#/beta) where the core team
gives a "go" or "no-go" vote to feature-flagged beta functionality.


#### query-params-new: no-go

  * needs more people trying this
  * doc/guides need to be updated.

#### with-controller: go

  * make sure to add parentController immediately after merge (@kselden)
  * address https://github.com/emberjs/ember.js/issues/4050 (@stefanpenner)
  * ensure lookupFactory and creates with content
    ```
    {{#with foo controller=’someController}}
    ```

#### ember-metal-with-proxy: go

  * rename to Ember.run.bind and merge (@stefanpenner)

#### ember-metal-run-method: no-go

  * @krisselden and @wycats are worried that this will be used inappropriately
  * people should use `.run` at the root of a frame, not randomly throughout it
