---
title: Ember Data Meeting Minutes - 2014/06/25
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
  [@terzicigor](https://twitter.com/terzicigor) -->

[@tomdale](https://twitter.com/tomdale),
[@wycats](https://twitter.com/wycats),
[@terzicigor](https://twitter.com/terzicigor)

### Serializer refactor
We discussed how best to refactor the existing serializers, especially the work lead by [@BMac](https://twitter.com/BezoMaxo) to break up the
Rest Serializer into a JSON Serializer + a Sideloading mixin. While working on it, there were several issues raised, including the problem of
how to make sure that mixins that extend the JSON Serializer(Embedded records mixin right now, and Sideloading mixin in the future) have their
hooks called in the right order and that they do not interfere with each other.

Decided that the refactor into a mixin is a good idea.
Tom raised the idea of having a serialization pipeline, but we decided to punt on that for now.
Decided to wait on more use cases before deciding whether/and how to reorganize the hooks such that mixins are easier to use/write.

### Zalgo Promise Proxy
Discussed how to address the problem of serializing async relationships.
[@terzicigor](https://twitter.com/terzicigor) and [@stefanpenner](https://twitter.com/stefanpenner) have previously come up with the idea of having
a Zalgo Proxy, a proxy that would be passed to the serialize hook and would proxy access to relationships as synchronous.

Decided it is a good idea but needs to be fully specced out and needs a better name.

### Sync setting of async relationships

Discussed the problem of how to set/bind two async relationships. For example currently binding an async belongsTo
to an async hasMany does not work because the binding tries to set a promiseProxy and not a model.

Decided to make template bindings work with promises, while not letting users manually set a promise.
Will require some Ember-Metal work to get working

### Explore a way for nicely getting a sync version of a model
Decided to explore a nice way of calling then on a model and/or several relationships at once which would return a promise
that would resolve once all the relationships are loaded.

### Think about how to incorporate async wait from ES7
[@wycats](https://twitter.com/wycats) was very excited about the possibility of having Ember-Data support async wait from ES7.
Said it could make dealing with asynchronicity much nicer. No conclusion, due to a lack of time for someone to investigate.


