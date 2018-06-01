---
title: The Road to Ember Data 1.0
author: Tom Dale & Yehuda Katz
tags: Recent Posts, Ember Data, Data, 2014, Roadmap
responsive: true
---

**TL;DR** Ember Data 1.0 is coming soon. We have a few last features to land before we
can confidently make guarantees around not breaking the API. Specifically:

1. A guarantee that if one side of a two-way relationship changes, the other
   side will remain in sync, even if it hasn't loaded yet.

2. All relationships will become async, but DataBoundPromises will make them
   work well in observers, computed properties and in templates.

Just like how it took us a few attempts to get the router right—but now we've
got the best one in JavaScript—getting Ember Data right has taken longer than
we thought, but it's here and it's almost ready for a 1.0.

* * *


Ever since the 1.0 release, developers building apps on top of Ember.js have
appreciated the stability and forward-momentum that our commitment to [Semantic
Versioning](http://semver.org/) allows.

We frequently get asked, "Ember.js is great, but what about Ember Data?" Today,
we'd like to give you an update on where Ember Data is and where it's headed
soon.

First, the good news: there is only one major breaking change planned before
releasing Ember Data 1.0, and we are doing our best to minimize the impact that
that change will have on existing apps.

Other than that, we anticipate that the current feature set and API will serve
as a stable base for the foreseeable future. In other words, we don't
anticipate needing any more user-facing breaking changes in order to
accommodate future changes to the architecture.

So why haven't we released a 1.0 yet? There are two more features that we're
working on: an improved relationship architecture, and more consistent API when
dealing with relationships.

## A Single Source of Truth

Modeling relationships between records is easily the most difficult feature
we've added to Ember Data. Finding a common solution is complicated because of
how much JSON servers differ from one another. Things get even more interesting
when you introduce streaming changes over WebSockets.

The naïve approach is to declare that the problem is too domain-specific and
that each developer should hand-roll relationships via a simplistic abstraction
(like sugar around computed properties).

However, we have observed that everyone who tries to implement their own
domain-specific relationships quickly ends up with their own ad hoc
mini-framework. As we did with Ember, we wanted to look at the problems shared
across all of these applications, and tease out the core abstractions.

We wanted to build something that was powerful, to help save time for advanced
developers, while also being accessible to developers just getting started with
client-side web applications.

To take a simple example, sometimes a has-many relationship is stored in the
parent record's JSON representation:

```js
{
  "id": 1,
  "name": "Lord Grantham",
  "children": [2, 3, 4]
}
```

Other times, the same relationship may be saved as a foreign key on the children:

```js
{
  "id": 2,
  "name": "Lady Mary",
  "parent_id": 1
}
```

Often, the same application will represent the same relationship in both forms,
depending on whether the records are being loaded or saved.

I'll spare you the details, but the permutations get even more complex when you
introduce things like streaming changes from the server over a socket.

The point of highlighting the essential complexity here is to demonstrate that
we couldn't just hardcode support for each one; each representation will likely
co-exist and interoperate with multiple other representations.

One-way relationships aren't too bad--you can get pretty far with hand-rolled
solutions before inevitably hitting a wall. The real problem comes up when you
have two-way relationships: an article has many comments, but each comment also
belongs to the article.

Because both sides of the relationship aren't always loaded together, and
because each side may represent the relationship differently (a foreign key on
the comment and an array on the article), maintaining this link has
historically been very difficult for us.

It's especially complicated when you want to support updated data coming in
from the server. Imagine that refreshing the article provides a new set of
comments, but you also know that the user is in the middle of creating her own
comment. How do you make sure that the `comments` array takes both of those
facts into consideration?

At a high-level, the solution is this: instead of internally storing the
relationships as state on each record that needs to be synchronized, we
maintain a single entity in memory that represents the logical relationship
**between** the records. That entity exists regardless of which side of the
relationship the application has loaded.

For example, if you change the belongs-to relationship on a comment, you are
changing the has-many side even if the application has not yet loaded the
article. When the application finally does load the article, the local
belongs-to change is ready to apply.

The long and short of it is that the two sides of a two-way relationship will
remain in sync in Ember Data 1.0, regardless of the order the records were
loaded, the way they were loaded, or how the relationships were represented in
the payloads.

We are doing this work on the
[single-source-of-truth](https://github.com/emberjs/data/tree/single-source-of-truth)
branch (thank you [Igor Terzic](https://github.com/igort) for getting this over
the finish line!) and hope to merge it soon.

## Async Relationships

Currently in Ember Data, you must specify ahead of time whether relationships
are synchronous or asynchronous. Determining whether or not a relationship is
asynchronous requires knowing how the server will represent the data when
sending it to your application. That isn't fatal, but it does tightly couple
the semantics of your application to the server.

The fatal problem comes when you start refactoring your server API. For
example, in a has-many relationship, perhaps instead of inlining an array of
record IDs you instead send a URL where the client can retrieve the collection.

All of a sudden, your application starts breaking in very Zalgo-esque ways (of
note: if you have not read Isaac's [excellent essay on async
APIs](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony),
please do).

We strongly consider how easy or difficult refactorings are when designing
APIs, and in this case, we made a mistake. Making small changes to your server
API should not require widespread changes to the application that consumes it.

For what it's worth, not all refactorings are created equal. In this case, we
observed that real apps almost always shuffle around their payloads as they
grow, hitting this problem. (In other cases, if we see that real-world
applications rarely change in a particular way, we might prioritize convenience
over refactor-proofing.)

The solution is to treat **all** relationships as async, and use promises to
represent their values. By relying on Promises/A+'s guarantees around
asynchronicity, we can avoid releasing Zalgo into your application. In the
future, if the way you represent a relationship changes, or the order in which
the relationship becomes available changes, your application will continue to
function with no changes required.

Using a Promise in JavaScript is pretty simple: call `.then` on it and do
something with the returned value in the callback. But what if you want to use
an Ember Data relationship in a template or in a computed property? How would
that work?

Ember Data 1.0 introduces a subclass of Promise called `DataBoundPromise`. This
object allows you to observe properties on the Promise, just as you would on a
normal object. When the promise resolves, those properties will be updated to
match the underlying object. If you `get `a property from a `DataBoundPromise`
when it is unresolved, it will return `undefined`.

```js
var article = comment.get('article');

// If the promise has not yet resolved
article.get('title'); //=> undefined

// If the promise has resolved
article.get('title'); //=> "Ember Data Roadmap"
```

The basic idea is that when you're working within the context of Ember data bindings (templates, computed properties, observers), you can use a relationship as if it were a synchronous value, and let the data binding system handle the promise. This means that in many cases, this change won't affect your existing code, and will indeed improve your ability to work with asynchronous relationships in templates and computed properties (a major pain point today).

You should **not** rely on this behavior when you want to use the value in imperative JavaScript (outside of computed properties); in that case, always use the promise's `then()` method to ensure the value is available, lest you unleash Zalgo into your own apps. Only `.get` properties from a `DataBoundPromise` if you're relying on Ember's data binding functionality to update the template or computed property when the promise finally does resolve.

**TL;DR** Only use `get` on `DataBoundPromises` inside of observers or computed properties. Otherwise, always treat them as regular promises and use `.then`.

## Other Improvements

There are a number of outstanding bugs we'd like to get fixed before we feel comfortable declaring 1.0. Some of them involve tightening up behavior that is currently undefined, and others are bugs we want to make sure applications don't come to rely on.

Most notably, the current `RESTAdapter` calls the wrong `normalize` hook for embedded or sideloaded data in `pushPayload`. [Fixing this](https://github.com/emberjs/data/issues/1804) is a high priority and blocks the 1.0 release.

We are also committed to making sure that the documentation is up to the high quality standards people expect from Ember before we declare 1.0.

## What's Next

We are committed to following [Semantic Versioning](http://semver.org/), and want to make sure we have a solid base we can build on for the next few years.

We think the decision to iterate on Ember.js before locking down the API has given us a foundation that we can continue to iterate on for years, without breaking backwards compatibility. We want the same for Ember Data.

Once the issues we've outlined above are complete, we'll be releasing a 1.0 of Ember Data that will not see breaking changes for some time. We intend to keep the release of Ember.js and Ember Data in sync, so that the first version in the Ember Data 1.x series will be whatever the current version of Ember is at that time.

For example, if Ember.js 1.7 is the current stable version at the time of Ember Data's first stable release, it will be Ember Data 1.7.

As with Ember.js, we intend Ember Data to follow the same [Chrome-inspired six-week release process](/blog/2013/09/06/new-ember-release-process.html). That release process has paid dividends in terms of predictability and momentum, and the feedback has been overwhelmingly positive. Importantly, having separate stable, beta and canary releases also allows us to clearly [communicate which features are stable](http://emberjs.com/builds/#/beta) and ready for production, and which are still being worked on.

## A Framework for Data

As we outlined in [our keynote last week at Fluent](http://www.youtube.com/watch?v=jScLjUlLTLI), we believe that frameworks exist to make doing the right thing feel better than doing the wrong thing. By codifying best practices in code, frameworks allow their communities to build further abstractions, creating a virtuous cycle that grows more and more powerful over time.

**We think of Ember Data as a framework for managing your models and relationships.**

Relationships are difficult to get right, but by giving in to temptation and having everyone roll their own solutions, the community cannot build further abstractions on top of the concept of relationships.

Earlier on, when we started with Ember Data, we tried to codify good practices, but didn't provide a flexible enough primitive underneath as an escape valve. Because people are interacting with servers they don't always control, we realized that having a good escape valve was more important in Ember Data than usual.

In order to make sure that the community would still be able to build on top of the Ember Data abstraction, we tried our best to isolate the code that is different between applications to the Adapter. This means that if someone writes a plugin for Ember Data, they can assume that models and relationships will look the same in all apps that use it, even though application backends can vary considerably.

In earlier versions of Ember Data, we were too religious about this separation, forcing every application to bear significant costs in the adapter layer. When we rebooted Ember Data six months ago, we took a hard look at striking a better balance between these competing concerns. Based on the feedback we've gotten since then, we believe that Ember Data is now a great fit for applications that have very unique backends, as well as applications that want direction on how to build a backend that "just works" with Ember Data.

We are committed to getting things right before declaring 1.0. The router in Ember.js went through several similar iterations, which were painful at the time, but we believe the results speak for themselves. Adapting to real-world usage is an important part of our design process, and we will always prioritize thinking through problems carefully over rushing to ship.

Given that, we hope that you will trust us when we say that Ember Data is on the cusp of the level of quality that we demand from the 1.0 versions of our open source projects. If you start building now, you'll be very happy with the forward momentum that having a community with shared understanding will bring.

