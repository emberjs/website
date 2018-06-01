---
title: This Week in Ember
date: 2013/01/18
tags: Recent Posts, EmberCamp, 2013, Roadmap, Version 1.x
author: Tom Dale & Yehuda Katz
responsive: true
---

It's been a big month for Ember.js, and we're excited about the progress
that we've made. With so much going on, it can be hard to
keep up-to-date with the project, so here's what you need to know.

READMORE

## Ember Camp

While we have an incredible network of local meetup groups, [Ember
Camp][1] is the first national event for the Ember
community.

We've been working hard on making sure that this event is both fun and
educational, and we'll be announcing the lineup of speakers soon.
Unfortuately, tickets have sold out, so if you didn't get yours this
time, make sure you grab a ticket next year!

While Ember Camp is happening, keep an eye on this website and on [our
Twitter account][2]. There will be several announcements you won't want
to miss!

[1]: http://www.embercamp.com
[2]: https://twitter.com/emberjs

## PeepCode

We were fortunate enough to get to spend a day with Geoffrey Grosenbach,
reviewing his in-progress PeepCode screencast about Ember.js. He spent a
lot of time getting to know Ember in-depth, and we think the final
product will be invaluable for new developers getting started with the
framework.

<center>
<blockquote class="twitter-tweet"><p>Finished an Ember.js demo app, filming screencast tomorrow, will publish next week. Fun stuff! <a href="https://t.co/Sq4q85Ql" title="https://peepcode.com/system/uploads/2013/peepcode-emberjs-demo.png">peepcode.com/system/uploads…</a></p>&mdash; PeepCode (@peepcode) <a href="https://twitter.com/peepcode/status/291350861207187456" data-datetime="2013-01-16T01:07:13+00:00">January 16, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

## The Road to 1.0

If you've been tracking `master` over the last month, you know that we
have made many large improvements to Ember.js in quick succession. Some
of these involved API changes that were not backwards compatible.

We appreciate your patience as we round the corner to a 1.0 release. We
take feedback about "developer ergonomics" extremely seriously, and
we're not willing to rush out a release if we're not satisfied that the
API is as good as we can make it.

Thanks for all your excellent feedback on earlier iterations of the
router API. Learning about how you found the API confusing or hard to
use drove our work on the final version that is shipping in `pre4`.

### The Router

The first iteration of the Ember.js router (which some have colloquially
begun referring to as "v1") allowed us to begin fleshing out some
conventions around application structure. Previously, application
structure was mostly done on an ad hoc basis, but common conventions
emerged in the community, which we rolled into "Router v1."

However, despite the fact that developers appreciated conventions around
app structure, their reaction to the first version of the API could
generously be described as _horrified_. Indeed, the router for large
applications began to look like the twisted amalgams of views in old
SproutCore applications. We knew we had to head back to the drawing
board with the lessons we had learned.

The reaction to "v2" of our router proposal, in contrast, has been
overwhelmingly positive. While we've had to make several tweaks over the
past month to make sure the API is as intuitive as possible, the overall
concepts behind the API have remained stable.

We believe that we've finally worked out all of the kinks, and do not
have any plans to make any further backwards-incompatible changes to the
router API before the final 1.0 release.

To learn what this router API is all about, head over to the [Routing
guide][3].

[3]: http://www.emberjs.com/guides/routing/

### API Freeze

In the run-up to Ember 1.0, we have chosen to aggressively make API
changes in response to your feedback in an effort to make the 1.0 API as
good as possible.

The reward for putting up with that level of churn is that we plan to
keep things very stable after 1.0. As we get close to that milestone, we
are starting to freeze portions of the API.

As of today, we will no longer make changes to the API that affect
high-level tutorials, screencasts or our introductory-level
documentation, unless such a change is necessary to address a critical
bug.

When we release the first RC, we will no longer make changes that affect
any part of the documented API–again–unless such a change is necessary
to address a critical bug.

In keeping with [SemVer][4], once we release the final 1.0, we will
not make breaking, backwards-incompatible changes to publicly documented
APIs until Ember 2.0. We may deprecate APIs, and print deprecation
warnings in the debug build, but things will continue to work.

In order to facilitate these API freezes, we are planning on taking
several steps:

1. We will convert high-profile screencasts and much of our public
   documentation into integration tests. "Your commit broke the PeepCode
   screencast" is something that Travis will tell contributors.
2. We will freeze the Ember 1.0 tests and run them against all builds of
   Ember in the 1.x series. This will notify us if we make a
   potentially backwards-incompatible change, and we can examine if it
   is the result of an API change or simply brittle tests. If we have to
   modify an old test, we will announce it here.

[4]: http://semver.org/

## Documentation

Perhaps the most widespread feedback we received from developers was:
_"Ember.js looks really cool, but your documentation sucks."_ We heard
you loud and clear.

We recently launched the [completely redesigned Guides][5], and due to
their more focused nature, have been able to rapidly iterate on them.
Since deploying the new site, the bounce rate has dropped dramatically
and engagement with any particular page has nearly doubled.

We have lots more great documentation coming your way as we approach the
1.0 release, and we think the design work that [Matt Grantham][6] did on
the new guides will make them much easier for new developers to approach.

We are also working on improving the API reference documentation. In
particular, [Stefan Penner][7] has been putting in a heroic effort to
bring them up to a similarly polished look-and-feel as the guides.

[5]: http://www.emberjs.com/guides/
[6]: http://www.heropixel.com
[7]: https://twitter.com/stefanpenner

## Thanks

We've been working on Ember.js for just over a year now, and it's no
understatement to say that it has attracted some of the best and
brightest web engineers on the planet. It has been extremely gratifying
to see our ideas take form, and we can't wait to see what 2013 holds for
web applications.

Big thanks to all of [our contributors][8], who have poured hours of
their nights and weekends into helping us make one of the best tools for
writing ambitious web applications. We quite literally could not have
done it without you.

Wishing you all the best in the new year,  
Yehuda Katz & Tom Dale

[8]: https://github.com/emberjs/ember.js/graphs/contributors
