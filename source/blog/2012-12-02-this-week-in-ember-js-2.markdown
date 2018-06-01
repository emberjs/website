---
title: This Week in Ember.js
date: 2012/12/02
tags: Recent Posts, Roadmap, Version 1.x, 2012
author: Bradley Priest
responsive: true
---

There's been a lot of exciting changes going in the Ember.js community, here's a recap of some of the biggest updates.

READMORE

### Data Format Agnosticism

While we believe the vast majority of Ember.js apps will be using JSON for
communication, there's no reason to restrict it so.

To this end we've made two changes to Ember Data's `DS.Store`:

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

Managing state in intermediate- to large-scale applications is a major
challenge for web developers. In fact, that's part of the reason so many
people love Ember.js—tools like the router built-in to the framework
make dealing with complex state manageable.

Still, we've heard the feedback loud and clear that the current router
API is too hard to understand, complicated to maintain, and aesthetically
unpleasing.

Because we think the router is the centerpiece of Ember, we've been working hard to get this right.

Implementation has been started on a new router API. You can check out the progress on
the [new-router](https://github.com/emberjs/ember.js/tree/new-router) branch.

Check out a quick rundown of the changes in [this gist](https://gist.github.com/3981133).

We believe that this is the final step to make Ember an easily accessible
framework for new developers.

### View default context

Although it has been deprecated for a while, we've [finally removed](https://github.com/emberjs/ember.js/commit/ed38ab3777733597ac5abd33ce26c3edeb2d7d13)
the defaulting of a view's context to itself if none was provided. This should
not be an issue for most applications out there, but may break example snippets
around the place.

### Meetups

Zendesk is hosting the [SF Ember.js Meetup](http://www.meetup.com/Ember-SF/events/89198892/)
on Tuesday 4 December, if you're in the area please head along and
hang out with fellow Emberenõs.

Likewise, Tom Dale and Yehuda Katz will be making an
appearance at the [Seattle Ember.js DecEMBER Meetup](http://www.meetup.com/Ember-js-Seattle-Meetup/events/68465172/)
on Thursday 6 December.

That's all for this week,  
Bradley Priest  
[@bradleypriest](https://twitter.com/bradleypriest)
