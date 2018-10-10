---
title: Core Team Meeting Minutes - 2014/03/21
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
@ebryn, @krisselden, @machty, @rwjblue, @stefanpenner, @trek, @wycats, @wifelette

### Topics

#### PRs/Issues To Review
We reviewed the following PRs and Issues:

  *  `query-params-new` [#4008](https://github.com/emberjs/ember.js/pull/4008)

    Nothing new here. We're working very hard to get this correct the first time
    and have something to demo at EmberConf.

  * Move instanceMetas into object's meta [#4559](https://github.com/emberjs/ember.js/pull/4559)

    InstanceMetas for objects' ReduceComputedPropertys are stored on the RCP instance (ie. on the descriptor) as `this._instanceMetas[key]` where key = guidOfTheObject + ':' + propertyName (see http://git.io/t9bKxA). The RCP can't know when the object is garbage collected, hence the _instanceMetas array grows unbounded.

    Resolution: if David Hamilton +1’s, we merge as a bugfix.

  * Allow multiple arguments to be passed to EmberStringUtils.fmt() [#4518](https://github.com/emberjs/ember.js/pull/4518)

    This allows you to use Ember.String.fmt with the same multi-arg signature as String#fmt:

    ```javascript
    Ember.String.fmt('%@ %@', 'John', 'Doe')
    // vs
    Ember.String.fmt(['%@ %@', 'John', 'Doe'])
    ```

    Resolution: Seems reasonable. Merge

* Deprecate App.Store in favor of App.ApplicationStore [#1808](https://github.com/emberjs/data/pull/1808)

  This makes the application level store lookup much closer to the reset of our conventions (ala `App.ApplicationAdapter` and `App.ApplicationSerializer`).

  This change also allows specifying a custom store when using non-global resolver (i.e. EAK/ember-cli). Previously, we were only looking for a property `Store` hung off of the application instance. Now you can have a module named (in the case of stock EAK setup):
   `app/stores/application` or `app/application/store.js` (pods structure).

  A deprecation warning was added, and the prior technique still works so this is not a breaking change (although I believe that we should remove before the prior lookup prior to 1.0).

  Resolution: Seems reasonable. Merge



