---
title: The Transition to Ember 2.0 in Detail
author: Yehuda
tags: Compatibility, Recent Posts
---

As we approach the eve of the release of Ember 1.13-beta, it's a good
time to talk about the transition plan for those of us who have Ember
1.11 and 1.12 applications.

The high level:

* Ember 1.13-beta.1 will be released on Monday. It will come with the
  new Glimmer engine and a series of new deprecations, preparing for
  cruft removal in Ember 2.0.
* We will continue to fix regressions caused by the Glimmer engine
  throughout the 1.13 beta cycle.
* We plan to release Ember 2.0-beta.1 on June 12, as announced at
  EmberConf.
* **We will release a point release of Ember 1.13 (likely 1.13.1)
  together with the release of Ember 2.0.** This release will continue
  to fix regressions caused by the Glimmer engine, and help smooth the
  transition to Ember 2.0.
* **We will likely release additional point releases of Ember 1.13 to
  help address unexpected difficulties in the transition to Ember 2.0.**
  For the most part, this will likely include new deprecations with
  light backporting of features needed to complete a transition away
  from deprecated features in 1.13.

## Glimmer Fallout

We landed Glimmer in Canary, and given that it's a completely rewritten
rendering engine, we're quite happy with the results so far.

That said, we expect to continue seeing compatibility fallout,
especially in heavily-used private APIs, over the next several months.

As a result, **we plan to continue releasing point releases in the 1.13
series as we learn about additional incompatibilities.** We will
continue to do this after Ember 2.0, to try to make sure that everyone
who wants to upgrade to Ember 1.13 and remove deprecations (as a
precursor to an Ember 2.0 upgrade) can do so.

### Add-On Compatibility and Private APIs

Ember 1.x add-ons quite often use private APIs. This was necessary for
many of the most ambitious add-ons (like Liquid Fire), and these add-ons
were a boon for Ember users.

While Glimmer cannot maintain compatibility for every private API used
by add-ons, we are committed to helping existing add-ons find new
approaches that work post-Glimmer, ideally in the form of public APIs.

We know that many Ember 1.x apps (including apps by members of the core
team) will not be able to upgrade to Ember 1.13 and Glimmer until
popular existing add-ons can support 1.13. We don't plan to put the 1.13
series to bed until people with 1.12 apps who are trying to upgrade to
deprecation-free 1.13 in earnest can do so successfully.
