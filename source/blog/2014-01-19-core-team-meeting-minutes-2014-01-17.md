---
title: Core Team Meeting Minutes - 2014/01/17
author: Trek Glowacki
tags: Core Team Meeting Minutes, Roadmap, 2014
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
@ebryn, @krisselden, @machty, @stefanpenner, @tomdale, @trek, @wagenet, @wycats, @wifelette

### Pending Go/No-Go
We received feedback that too many flagged features in canary were
not getting enough discussion from the core team early in the release cycle.

This was delaying useful features making it into scheduled beta releases.

To tighten up the feedback loop, the core team will regularly
review features on our canary builds and work with authors sooner to address concerns.

The current list of features on master but not enabled in the 1.4 family of beta builds
can be found on this Github issue: 
[https://github.com/emberjs/ember.js/issues/4052](https://github.com/emberjs/ember.js/issues/4052)

The following features look good in their current incarnation and will likely receive a "go"
vote:

  * [ember-testing-routing-helpers](https://github.com/emberjs/ember.js/pull/3711)
  * [computed-read-only](https://github.com/emberjs/ember.js/pull/3879)
  * [ember-metal-is-blank](https://github.com/emberjs/ember.js/pull/4049)
  * [ember-eager-url-update](https://github.com/emberjs/ember.js/pull/4122)

#### [string-humanize](https://github.com/emberjs/ember.js/pull/3224) and [string-parameterize](https://github.com/emberjs/ember.js/pull/3953)
There is a concern that this increases the surface area of API and the size of the framework
without providing enough benefit that is unique to Ember.js. If the package manager ecosystem
for browser JavaScript were more mature, these would clear cases for community contribution.
String inflection is notoriously hard to get correct, especially with internationalization,
and the common case is already handled by existing libraries. 
@trek [even maintains one](https://github.com/trek/fleck)

Resolutions:
  
  * Revert.


#### [ember-handlebars-caps-lookup](https://github.com/emberjs/ember.js/pull/3218)
A bare capitalized word in Handlebars should look up on current scope.
`{{CONSTANT}}` and `{{#each CONSTANT}}` did global lookup mostly by side effect, 
this was not intended API, but we need to think through backwards compatibility
issues for people who used this as part of their app design.
  
Some proposed ideas:

  * try local lookup first
  * try global lookup and issue a deprecation warning ("will be removed in 2.0")

Resolutions:
  
  * Revert.
  * @wycats will talk to the author about a revert and our preferred way forward for this
    behavior

#### [ember-testing-triggerEvent-helper](https://github.com/emberjs/ember.js/pull/3792)

Looks good but needs some revision:

  * Needs mechanism for customizing event with additional data (i.e. which key is being pressed)
  * Possibly have `keyEvent` event helper use `triggerEvent` internally

Resolutions:

  * @ebryn will provide feedback on the PR

#### [composable-computed-properties](https://github.com/emberjs/ember.js/pull/3696)
Possibly still needs some work (there some unhandled todos)? Will be a "go" when
these are addressed.

Resolutions:

  * @trek will ask about the status of remaining todos

#### [query-params-new](https://github.com/emberjs/ember.js/pull/4008)
@wycats and @machty chatted about some last minute issues. This PR should be good soon.
The removal of query prefixing should provide a nicer query string  (the `[]` prefixing only
happens if two controllers in same hierarchy have the same parameter name).

Resolutions:

  * @machty will keep chugging along


#### [ember-routing-loading-error-substates](https://github.com/emberjs/ember.js/pull/3655)
Currently `state/loading` and `state_loading` both reify into StateLoading under the current
resolver. Custom resolvers (like those in EmberAppKit) don't have this issue, but the global
resolver does. We can't make this work until modularization is done.
