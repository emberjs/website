---
title: Ember Data Meeting Minutes - 2014/07/02
author: Igor Terzic
tags: Recent Posts, 2014, Ember Data, Data
responsive: true
---

Although most of our collaboration takes place on Github, IRC
(`#emberjs` on freenode.net), and our [Discourse site](http://discuss.emberjs.com/)
the Ember Data team meets privately every
Wednesday at 11am PST through Google Hangout for a weekly
discussion of all things Ember-Data.

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
  [@wycats](https://twitter.com/wycats)
  [@hjdivad](https://twitter.com/hjdivad)
  [@terzicigor](https://twitter.com/terzicigor) -->

[@tomdale](https://twitter.com/tomdale),
[@wycats](https://twitter.com/wycats),
[@terzicigor](https://twitter.com/terzicigor)

### PushPayload discussion
We discussed the [PushPayload proposal](http://discuss.emberjs.com/t/adding-a-function-to-ed-store-to-normalize-push-a-single-type/5321)

@wycats concluded that the original decision for `pushPayload` on the store to accept a `type` argument was a mistake.
Decided that instead of creating several new hooks, the best course of actions seems to be to add a `normalize` method to the store.

Thus instead of doing `pushAndNormalize` from the discuss proposal, one can do

`store.push(type, store.normalize(type, payload))`

It also seems nice to have a `normalize` method on the store as the inverse of `serialize` which already exists on the model.

### Group Coalescing
[@hjdivad](https://twitter.com/hjdivad) and [@terzicigor](https://twitter.com/terzicigor) recently added a
[groupedRecordsForFindMany](https://github.com/emberjs/data/commit/60b518e5b012c9dc1427256d635f46fc91bee019) hook on the findCoalescing
branch to enable users to decide how to group coalesced requests.

The hook was given a +1. We also realized that this hook will also solve the problem of [URLs being too long for findMany](https://github.com/emberjs/data/issues/651)





