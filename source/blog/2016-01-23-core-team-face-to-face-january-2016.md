---
title: Core Team Face to Face, January 2016
author: Tom Dale
tags: Core Team Meeting Minutes, Recent Posts, 2016
responsive: true
---

Ember is a truly community-driven framework, with contributors and core
team members who live all over the world and work for many different
companies. The vast majority of our collaboration happens online via
tools like GitHub.

That said, every quarter the Ember core team likes to meet face-to-face
for a high-bandwidth, high-intensity discussion about the future of the
framework. We focus on high priority issues, ways we can improve our
process, and setting the long-term vision for Ember.

A week ago, the core team descended on beautiful Spicewood, Texas
(about an hour outside of Austin) for two days of <s>hand to hand
combat</s> technical discussion.

Below, in no particular order, are summaries of the topics we discussed.
Nothing here should be considered final, and all decisions are subject
to change as we receive community feedback.

### Subteams

Ember includes everything you need to create a modern web application,
from build tools to a lightning fast rendering engine to comprehensive
documentation. Because of its scope, it can be difficult for any one
core team member to keep everything in their head (except maybe Yehuda).

As we've taken on new initiatives, we've often bootstrapped ad hoc
subteams to help carry out the day-to-day work. For example, Ember
Data, Ember CLI and the documentation subteams all have their own set
of committers who meet regularly to discuss their area of focus.

At the face-to-face, we discussed formalizing the subteams and granting
them more autonomy. Primarily, this increased autonomy will be achieved
through refinements to the RFC process, largely inspired by the [Rust
governance model][rust-governance-rfc].

To quote the Rust governance RFC:

> The basic idea is to supplement the core team with several "subteams".
> Each subteam is focused on a specific area, e.g., language design or
> libraries. Most of the RFC review process will take place within the
> relevant subteam, scaling up our ability to make decisions while
> involving a larger group of people in that process.
> To ensure global coordination and a strong, coherent vision for the
> project as a whole, each subteam is led by a member of the core team.

[rust-governance-rfc]: https://github.com/aturon/rfcs/blob/rust-governance/text/0000-rust-governance.md

Subteams are responsible for shepherding RFCs along, helping submitters
identify open or unresolved issues. Once a subteam deems an RFC
complete, it enters a week-long final comment period.  This serves as a
warning to community members that the time to get their feedback in is
coming to a close. After the week is up, the subteam will make a
decision about whether the RFC should be accepted or not.

For more information, see the [Rust governance
RFC][rust-governance-rfc], where the process and the motivation behind
it is outlined in detail. We will have more information about the
subteams soon.

### RFC Improvements

In addition to the changes noted above about subteams managing the RFC
process, we are also making several tweaks to the existing RFC format:

1. All RFCs **must** include Drawbacks and Alternatives sections. (`N/A`
   will no longer be accepted.)
2. We are introducing a new section to discuss naming and terminology.
3. We are introducing a new section that asks how the RFC changes the
   programming model, if at all. This is critical for ensuring the
   guides stay up-to-date with best practices.

More details on the RFC improvements will be posted soon.

### Documentation

We had a wide-ranging discussion about documentation. Generally,
documentation has been significantly improved but we always want to do
more to make sure developers have a great experience.

We discussed several relatively easy improvements that would be high
value:

1. Encourage more core team members to join in on the documentation
   subteam calls, particularly those shepherding new features that
   impact the programming model.
2. Suppress private classes from the API docs, which can feel
   overwhelming to new users.
3. Offer better cross-linking between API docs and guides.
4. Ensure that Google only indexes the latest version, so intrepid
   searchers do not end up on stale documents.

We also have some exciting improvements to the getting started
experience being worked on.

### Engines

As Ember adoption increases, one common question we get is: how can
multiple teams work on an Ember app without stepping on each others'
toes?

The answer to that question is engines. Just over a year ago, Yehuda and I
submitted [RFC #10: Engines][engines-rfc], describing a way to break
apart a large Ember app into several, smaller apps that can be merged
together into a cohesive whole.

[engines-rfc]: https://github.com/emberjs/rfcs/pull/10

Engines have taken a while to get right, because they touch almost every
part of Ember. Dan Gebhardt and Robert Jackson have been working
tirelessly on this, and recently released the experimental
[ember-engines][ember-engines] addon that you can begin using today.

[ember-engines]: https://github.com/dgeb/ember-engines

The addon currently relies on monkey-patching several private Ember
classes. Now that the addon is out, we plan to upstream these changes
back into Ember itself. Our hope is to get the these building blocks
into Ember (and stable) as fast as possible, so the addon will work with
non-Canary releases. After that, we will continue to iterate on the design
and user-facing API in the addon.

For more about engines, see [the slides from Dan's talk at Boston Ember introducing the
ember-engines addon][dans-talk].

[dans-talk]: https://speakerdeck.com/dgeb/introducing-ember-engines

### Better App Componentization

Developers love Ember components because they help break up your UI into
small pieces that you can easily reason about.

On the other end of the spectrum, engines allow you to break up
monolithic apps into a smaller set of apps that you can develop
individually, then compose together into one large app.

But what about medium-size apps? These apps may not have enough people
working on them that they'd want to break it apart using engines, but
they _are_ starting to accumulate many UI components. Reasoning about
which components are used where is getting difficult.

The answer to this problem is something that we've called the pods
architecture. It allows you to organize your app by feature, rather than
by type, so you can quickly see all of the pieces that bring a feature
to life.

We have several significant improvements to pods coming soon, including
the ability to scope UI components to a single pod. Stay tuned for more
details.

### Universal Event Dispatch

This is still a pie-in-the-sky idea, but we discussed whether it would
be possible to create a universal event dispatch engine.

To understand what an event dispatch engine is, you should
first understand the idea of [event delegation][event-delegation].

[event-delegation]: https://learn.jquery.com/events/event-delegation/

The basic idea is this: as your app runs, many components will be added
and removed from the DOM. Those components have event handlers:
functions that get run when the user clicks on the component, for example.

Rather than setting up a listener for each component, then tearing it
down when the component is removed, Ember installs a single listener for
each possible event on the root document.

Then, when the user interacts with a component, we rely on the fact that
the DOM event will eventually bubble up to the document, and thus and
the event handler Ember has installed. Once there, we reverse-engineer
which component the bubbled event originated from. Once we've found the
component, we invoke its event handler.

This works well but there's one problem for people that embed multiple
Ember apps on the same page: each Ember app installs its own set of
event listeners. We can optimize startup performance for these cases by
having a set of event listeners that each Ember app instance can share.

But it's not just Ember that would benefit. Other libraries like React
use event delegation as well. We discussed whether it would be possible
to create a dispatch engine that was low-level enough that all of the
React, Ember, etc. apps running on a single page could share it, and only pay the
cost of installing event listeners once.

We don't have anything concrete here yet but want to put together a plan
and start socializing it with other library implementors. Even if we
don't get their buy-in, at least we can improve the boot performance of
multiple Ember apps on a single page.

### Smoothing the 1.x to 2.0 Upgrade

The strength of Ember is in its community and in its ecosystem. We
increase the vibrancy of both by doing everything in our power to smooth
the upgrade process and ensure the vast majority of apps can make the
transition to new versions of the framework.

The 1.13 to 2.0 transition was our first time managing a community
migration across major version boundaries. We had a long discussion
about what went right and what went wrong, and what we can learn as we
begin to think about what an Ember 3.0 might look like.

More importantly, we discussed what factors are still keeping some apps
on 1.12 and 1.13, and what we can do to address them.

Of course, some teams are happy to stick with a 1.x version that works
for them; we won't be able to get everyone to upgrade to 2.x, at least
right away. Rather, our goal is that anyone on 1.12 or 1.13 who _wants_
to be on 2.x should have a way to get there.

One of the biggest issues we've heard reported is that, while the new
Glimmer engine in 1.13 is much faster in some scenarios, there are
several performance regressions in other scenarios.

Naturally, teams are hesistant to upgrade if their app is impacted by a
performance regression. But if they cannot upgrade to 1.13, which
contains the deprecation warnings needed to make a smooth transition to 2.x, how
can they ever get there?

The answer, of course, is to use 1.12 for deploying to production, but
switch to 1.13 temporarily while developing to get the list of
deprecations to fix.

Unfortunately, 1.13 introduced several new public APIs to replace
private APIs for things like registering Handlebars helpers. Despite
being private, those APIs were nonetheless in use by apps and addons.
This can make it difficult to switch between versions: 1.12 has private
APIs for something 1.13 has public APIs for, but no version has both.

To remedy this situation, we're taking a two-pronged approach:

1. For commonly used private APIs that were removed in 1.13, we will
   backport their public API versions to a 1.12 patch release.
2. We will continue to investigate performance regressions in 1.13.

Note that many of the initial performance regressions have already been
fixed in the 1.13.x series. **We encourage teams that tested under early
1.13 releases to run their performance analysis again with the latest
patch release.**

Ideally, most teams should be able to move to 1.13 on the way to 2.0. If
that's not possible, we'll at least make it possible for an app to
switch seamlessly between 1.12 and 1.13. Core team member Erik Bryn has
also committed to writing an upgrade guide based on his real-world
experiences upgrading several large apps, and we look forward to seeing
that.

### Long-Term Support Release

Developers on the bleeding edge love the rhythm of Ember's six week
release cycle. That cadence leads to a steady pace of new features,
while also taking the pressure off contributors; they don't feel the
need to rush features because there's always a new release on the
horizon.

That said, we've heard from developers at more conservative
organizations that the pace of new releases can feel overwhelming. Those
developers are happy with the features they have, but are apprehensive
about _not_ upgrading because they don't want to be left behind.

To help those developers, [we announced in the Ember 2.0 release blog
post][ember-2-0-post] that we would be introducing Long-Term Support
(LTS) releases. We are gearing up for our first LTS release and hammered
out some more details at the face-to-face meeting.  You should expect to
see the first LTS release in the next few months.

[ember-2-0-post]: http://emberjs.com/blog/2015/08/13/ember-2-0-released.html

For more details on the LTS release process, see [RFC #56: Release Cycle
Improvements][lts-rfc].

[lts-rfc]: https://github.com/emberjs/rfcs/pull/56

### Ember 3.0 Deprecations

One of the mistakes we made during the 2.0 transition was rushing
last-minute deprecations into 1.13. We felt a sense of urgency, since
not getting a deprecation in meant it couldn't be removed for at least
another year, or whenever Ember 3.0 was released.

Unfortunately, this created a feeling of significant churn, and the list
of deprecations to fix became overwhelming. For many apps, the promise
that they could fix all of the deprecations in a single sprint rang hollow.

To make up for the 1.13 deprecation onslaught, we've held off
introducing major new deprecations into any of the 2.x releases so far.

Enough time has now passed that we feel comfortable starting to think
about introducing new deprecations. That said, we've learned several
important lessons from Deprecationocalypse and we will do our best to
avoid a repeat of the situation.

At the face-to-face, we agreed on the following policies to reduce pain
for developers:

1. Now that we have a plan for major version releases and have lived
   through one such transition, we will start implementing deprecations
   earlier in the cycle rather than rushing them in at the last minute.
2. We will try to only introduce a handful of deprecations per release,
   so that no one release feels overwhelming and the upgrade cost can be
   paid over the entire major version cycle.
3. Deprecations will not be merged into master until a deprecation guide
   has been written.
4. Deprecation guides will be more holistic and include more than one
   example. Ideally, deprecation guides would contain code snippets from
   open source Ember apps and addons that show how to make the change in
   a real-world context.
5. We will collaborate with the docs team early on to ensure that
   deprecated features are not being used in the guides.

### FastBoot

FastBoot development continues at a rapid pace and we hope to have a
stable release soon.

As anyone who's attempted to do server-side rendering of client-side
JavaScript knows, being able to render a component's HTML on the server
is a critical but very small part of the overall story. While we've had
server rendering of Handlebars templates working for the better part of
a year, integrating server-side rendering into the application
architecture and ecosystem takes a lot of work.

Our hope with FastBoot is that it's so easy to use, the majority of
Ember users enable it. We don't want server-side rendering to be
something you can kind of do with weeks and weeks of work; we want it to
be as simple as installing an addon via npm. It's going to take the
support of the entire community to do that.

Expect more updates from us about FastBoot soon, particularly about how
you can start making sure your addons are FastBoot-compatible.

### Performance

One topic that touched almost all of the other conversations was
performance. We continue to make improved boot, rendering, and build
performance our top priority.

In addition to creating a performance subteam, we are beginning the
infrastructure work to allow Svelte Builds&mdash;builds of Ember that
have all code related to deprecated features removed. This allows
developers who have eliminated the deprecation warnings in their code to
benefit from a significantly reduced file size.

We also have several on-going initiatives to improve the Glimmer rendering
engine that we hope will start paying dividends soon.

### Ember as a Stable Core

If there was one thing that became obvious to me at this meeting, it is
that Ember has become a stable core on top of which developers can build
amazing web applications&mdash;without fearing they will be left behind.

The key to _Stability without Stagnation_ is the ability to experiment
outside of the core framework.  Because of the addon ecosystem, unified
community and our strong shared conventions, new features can start off
as addons that are free to boldly experiment. Once the experiments have
been proven, they can be incorporated back into the mainstream developer
experience.

The thinking behind the [Extensible Web Manifesto][extensible-web] has
influenced us greatly. The key idea of the EWM is that browser vendors
should focus on exposing the smallest set of raw capabilities&mdash;the
DOM, geolocation, background workers, the camera, bytes and
buffers&mdash;then let the open source community iterate on libraries
and frameworks that make those raw capabilities easier to use for a
broader audience.

[extensible-web]: https://extensiblewebmanifesto.org

While low-level API gives you maximum flexibility, it doesn't always
make it pleasant to build large apps. However, these unpleasant building
blocks have unlocked frameworks and libraries like jQuery, Ember,
Angular and React.

By focusing first on raw capabilities before ease-of-use, you keep the
scope constrained. You can ship features faster, and by exposing just
the building blocks, you can let experimentation and competition in the
ecosystem find an API that developers love&mdash;without breaking
backwards compatibility.

The same thing is starting to happen in Ember. Two illustrative examples
are FastBoot and Engines. With FastBoot, we made only the minimum set of
changes needed to the core framework.  Primarily, that was cleaning up
application boot and introducing `ApplicationInstance`, and adding a
low-level API for programmatically routing and rendering an app (the
`visit()` API).

Despite the fact that FastBoot 1.0 has not yet shipped, because of their
small scope, the low-level framework features needed to make it work are
already in release versions of Ember. This means that FastBoot will work
with any release of the framework that has the `visit()` API, starting
with Ember 2.3.

And because the majority of FastBoot's developer-facing API lives in an
addon, we can rapidly iterate separate from Ember's typical six week
release cycle.

And, as described in the above Engines section, the `ember-engines`
addon is taking a similar approach. We'll figure out the minimum set of
changes needed to the core framework to make them work, then rapidly
incorporate them into a stable release. The bulk of the code will live
in a separate addon, making it easy to add or remove.  And if someone
doesn't like how engines work, they too will have access to the
low-level building blocks that are needed to create a competitor.

None of this would be possible without a community and framework that
rallies behind finding shared solutions as much as possible. Early
adopters of Ember experienced significant churn as we were figuring out
what the stable core was. Now we are reaping the benefits of that
experimentation in a big way, as we can now build even higher on top of
the solid foundation we've built together.

A common refrain in the JavaScript ecosystem is that opinionated
software boxes you in, and that you're better off spending weeks picking
the set of libraries that fit the particular needs of your application.
But it has been our experience that building a strong community around a
shared set of solutions leads to applications that are more maintainable
over the long run, and don't leave you itching to throw away everything
and rewrite it in a year or two.

As the set of things needed to build a modern web app
grows&mdash;Service Workers, Web Workers, offline sync, push
notifications, OS integration, server-side rendering, fast re-rendering, WebSockets,
reliable deployment, CSS postprocessing, and animation, to name just a
few&mdash;we think Ember will be better positioned than ever to help
developers build amazing things. Soon, it will just flat out not be
feasible to do everything yourself.

Thank you for being a part of the Ember community. It's going to be a
very exciting 2016.
