---
title: This Week in Ember.js
date:  2012/11/02
tags: Recent Posts, 1, Roadmap, 2012
author: Tom Dale
responsive: true
---

There's a lot of work happening on Ember.js and sometimes it's hard to keep track of what's going on. Here's what me and Yehuda got done this week.

READMORE

### Meetup

The SF Ember.js Meetup on Tuesday (which we actually held in Mountain
View this month) was a success! It was sponsored by our friends at
Addepar, who are also [funding me and Yehuda to work on Ember Data for
the next few months](https://addepar.com/ember/). So, big thanks to them!

Tony Sherbondy gave an overview of the Addepar app and described how
Ember.js has helped them. The biggest "a-ha" moment for me was when he
described how they completely changed out the table view that powers big
chunks of the UI, and didn't have to make any changes in the rest of the
app. It's exactly this type of encapsulation that makes Ember a win, and
I'm glad to see it happening in real life.

I gave a talk on Ember Data, and discussed some of the new APIs we'll be
working on over the next few months. Yehuda gave a talk about the router
proposal. The pork belly buns from the Chairman Bao
food truck were epic. I got a little drunk.

### Per-Type Adapters

You can now register different adapters on the store per-type. You can
read more about this feature in [this Gist](https://gist.github.com/4004913).

This feature is done and on `master`!

### Explicit Inverses

Ember Data has always been smart enough to know that when you set a `belongsTo` relationship, the child record should be added to the parent's corresponding `hasMany` relationship.

Unfortunately, it was pretty braindead about *which* `hasMany` relationship it would update. Before, it would just pick the first relationship it found with the same type as the child.

Because it's reasonable for people to have multiple `belongsTo`/`hasMany`s for the same type, we added support for specifying an inverse:

```javascript
App.Comment = DS.Model.extend({
  onePost: DS.belongsTo("App.Post"),
  twoPost: DS.belongsTo("App.Post"),
  redPost: DS.belongsTo("App.Post"),
  bluePost: DS.belongsTo("App.Post")
});


App.Post = DS.Model.extend({
  comments: DS.hasMany('App.Comment', {
    inverse: 'redPost'
  })
});
```

You can also specify an inverse on a `belongsTo`, which works how you'd expect.

### Mappable Refactor

We noticed that a lot of configuration APIs we were introducing in the
adapter layer wanted to treat the adapter or serializer object like a
map, but there were some slightly different semantics than the standard
`Ember.Map` implementation.

This refactor greatly cleans up the implementation and increases the
amount of code shared between classes.

It's a little hard to explain, but hopefully the inline documentation
plus the actual usage in the framework should make it clear what I mean.

Unfortunately I totally spaced and forgot to push this, and it's on a
computer I don't have access to at the moment. Look for this in a few
weeks!


### Core Concepts Guide

Many people getting started with Ember.js tell me that each of the
individual pieces make sense, but they're not sure how all of those
pieces fit together.

We're making a big push towards improving our documentation as we head
towards the 1.0 release, and this is one of the first things I want to
address.

To that end, I wrote a "Core Concepts" guide that I hope you will find
helpful. It's not up yet (I'm still working on a branch of the website)
but you can [view the Markdown on GitHub](https://github.com/emberjs/website/blob/doc-refactor/source/guides/getting-started/core-concepts.md).

We want to make Ember.js as easy for new developers to pick up as
possible, so your feedback about our documentation, as always, is
extremely important. Please review and let me know what you think!

---

Finally, I'd like to give a shoutout to Trek Glowacki for doing an
awesome job [repping the Ember.js community on the JS Jabber
podcast](http://javascriptjabber.com/034-jsj-ember-js/). I had no idea
how sexy his voice was.  If you haven't listened yet, it's worth your
time. (Feel free to troll him about not knowing how the run loop works.
;)

Me, Yehuda and the rest of the Tilde team will be in Hawaii next week
for our company offsite. We should have wi-fi and be generally
available, but we have plenty of luaus, boat cruises, and zip line
adventures planned, so if we're less available than usual, that's the
reason.

That's it for this week,  
Tom Dale  
[@tomdale](https://twitter.com/tomdale)
