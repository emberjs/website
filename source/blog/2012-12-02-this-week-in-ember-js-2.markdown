---
title: This Week in Ember.js 2
---

There's been a lot of exciting changes going in the Ember.js community, here's a recap of some of the biggest updates.

READMORE

### Data Format Agnosticism

While we believe the vast majority of Ember.js apps will be using JSON for
communication, there's no reason to restrict it so.

To this end we've made two changes to `DS.Store`:

  1. A new `extractId` method has been added to the adapter for extracting the
     ID from a data hash, by default this simply asks for `data.id`.
  2. Any method with the term `JSON` has been renamed to use `Data` instead,
     for instance `DS.Serializer`'s `toJSON` method has been renamed to `toData`.

If you are using the built-in `DS.RESTAdapter`, these changes do not affect you.

Check out [BREAKING_CHANGES](https://github.com/emberjs/data/blob/master/BREAKING_CHANGES.md)
for more information.

### Adapter Dirtiness Hooks

In line with the efforts to decouple Ember.js from REST specifics, we've made
some more changes to how the adapter dirties records in relationships.

Previously the store would dirty all the objects involved when a relationship was modified
and let the adapter decide what to do with the records on `commit`.

As of revision 9, Ember now provides a series of adapter dirtiness hooks:

* `dirtyRecordsForAttributeChange`
* `dirtyRecordsForBelongsToChange`
* `dirtyRecordsForHasManyChange`

By firing these hooks at the time of dirtying, the adapter can mark the
appropriate objects as dirty and move on.

If you are using the built-in `DS.RESTAdapter`, these changes do not affect you.

Check out [BREAKING_CHANGES](https://github.com/emberjs/data/blob/master/BREAKING_CHANGES.md)
for more information.

### New Router API

Work is currently being done on the new Router API, check out the progress on
the [new-router](https://github.com/emberjs/ember.js/tree/new-router) branch.

Check out a quick rundown of the changes in [this gist](https://gist.github.com/3981133).

TODO: Tom, I don't really know much about the new router, you may want to put
your thoughts in here.

We believe that this is the final step to make Ember an easily accessible
framework for new developers.

### View default context

Although it has been deprecated for a while, we've [finally removed](https://github.com/emberjs/ember.js/commit/ed38ab3777733597ac5abd33ce26c3edeb2d7d13)
the defaulting of a view's context to itself if none was provided. This should
not be an issue for most applications out there, but may break example snippets
around the place.

### Meetups

Zendesk is hosting the [SF Ember.js Meetup](http://www.meetup.com/Ember-SF/events/89198892/)
on Tuesday 2 December, if you're in the area please head along and
hang out with fellow emberinõs.

Likewise, Tom Dale and Yehuda Katz will be making an
appearance at the [Seattle Ember.js DecEMBER Meetup](http://www.meetup.com/Ember-js-Seattle-Meetup/events/68465172/)
on Thursday 6 December.

That's all for this week,  
Bradley Priest  
[@bradleypriest](https://twitter.com/bradleypriest)
