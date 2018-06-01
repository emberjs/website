---
title: Announcing Ember's First LTS Release
author: Matthew Beale, Yehuda Katz, Godfrey Chan
tags: Recent Posts, 2016, Roadmap, Announcement
responsive: true
---

Currently, Ember uses [release channels](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html)
to help users balance between a desire for new features (canary or beta
channels) with stability (the release channel). While semver guarantees mean
that upgrades are quite straightforward, some users aren't able to upgrade
every six weeks. To address [these needs](https://github.com/emberjs/rfcs/blob/master/text/0056-improved-release-cycle.md#problems-with-the-1x-model),
we are announcing a new <abbr title="Long-Term Support">LTS</abbr> release
channel.

**Ember 2.4 will be the first LTS release of the core framework, and will
continue every four releases thereafter.** Additionally, we've updated the
[emberjs.com/builds](http://emberjs.com/builds/) page with better guidance
about when and how to use each of the channels.

<img src="/images/blog/2016-02/lts-tomster.png" class="no-background float-right" alt="LTS Tomster" width="200">

For our users, LTS releases allow you to upgrade less frequently while still
getting support from the Ember project and the wider ecosystem.

For addon authors, LTS releases allow you to know which versions of Ember to
focus effort on.

As a project, Ember will provide security and critical bugfixes for the most
recent LTS release, in addition to the most recent release (as we do today).
We will also avoid breaking heavily used private APIs without first
deprecating them in a previous LTS release.

You can read more about the problems we tried to solve and details about how
it works in [RFC #56](https://github.com/emberjs/rfcs/blob/master/text/0056-improved-release-cycle.md#proposal-lts-releases).

### The LTS Release Process

The existing release channels allow you to make a tradeoff. On canary, you get
features as quickly as they land, but get no guarantees about those features.
On the stable release channel, you have to wait 12 weeks for features to
stabilize and make their way through the beta process, but you are rewarded
with semver guarantees.

While this provides all the flexibility you need to make stability vs. features
tradeoff, there is another orthogonal dimension: how often you can schedule
time to upgrade. LTS releases give the community an alternative, sanctioned
schedule that works better for users who prefer a slower pace.

By synchronizing the timing that these users upgrade, the community can decide
to focus energy on specific versions, rather than a scattershot attempt to
support every possible combination. This should result in more consistent
support and easier upgrades for users on the LTS channel.

The Ember 2.4 branch will be moved into the LTS release channel six weeks after
Ember 2.4.0. In other words, Ember 2.4 LTS will ship at the same time as Ember
2.5.0. This means that features begin on Canary, spend six weeks on beta before
making it into the stable channel, and spend another six weeks on the stable
channel before making it into the LTS release channel.

This same process repeats every four releases, meaning that the next release on
the LTS channel will be Ember 2.8 LTS, which will ship at the same time as
Ember 2.9.0.

For example, the expected release of Ember 2.4 stable (currently in beta) is on
February 26th. To give you a sense for the cadence of our release channels, the
projected release timeline is as follows.

![LTS release timeline](/images/blog/2016-02/Releases@3x.svg)

**LTS releases will receive critical bugfixes for 6 release cycles (36 weeks).**
This means we will support Ember 2.4 LTS with critical bugfixes until Ember
2.10.0 is released, around November 4, 2016.

**LTS releases will receive security patches for 10 release cycles (60 weeks).**
This means we will support Ember 2.4 LTS with security patches at least until
Ember 2.14.0 is released, around April 21, 2017.

As you can see in the above diagram, Ember 2.8 LTS is projected to ship around
September 23, 2016. This gives you plenty of time to complete the migration to
the next LTS release once it comes out. As always, because Ember 2.8 is semver
compatible with Ember 2.4, the upgrade should be relatively smooth.

By the time 2.8 rolls around in roughly six months, any addons that make use
of the private `view` APIs should have had a chance to update.

### The LTS Guarantees

What makes an LTS release different than a stable Ember release? LTS releases
come with guarantees about API stability and security:

- Because each LTS release will receive security fixes for 60 weeks, we will
  backport them to at least the two most recent LTS releases. [Read more about
  Ember's security policy](http://emberjs.com/security/).

- Release notes for each LTS will contain a summary of features and
  deprecations added since the previous LTS. This will likely consist of a
  number of links to documentation, guides, and release notes for stable
  releases.

- Addons and applications should constrain themselves to using Ember's public
  APIs. However, in practice we recognize that experimentation and use of
  "intimate" APIs is a reality. To ensure addons and apps using these intimate
  APIs have a migration path forward, any change to a heavily used private APIs
  will receive a deprecation warning in at least one LTS release. This gives
  LTS users and the addon community about six months to migrate away. For
  example, the `view` APIs (private in Ember 2.x) will be marked as deprecated
  in Ember 2.4 LTS, and removed before Ember 2.8 LTS.

- We encourage addon authors to maintain support for the latest LTS release, in
  addition to tracking changes in the stable releases.

In practice, since these releases still abide by [semantic versioning](http://semver.org/),
upgrading from LTS release to LTS release should not be significantly more work
than upgrading along the six-week release cycle.

Upgrading less frequently will mean, of course, that a developer will wait
longer to take advantage of new features. Additionally, it means the changes in
best practices between releases (and in the number of deprecations) may feel
more significant.

### Legacy View and Controller Addons

Ember has provided the [ember-legacy-views](https://github.com/emberjs/ember-legacy-views)
and [ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers)
addons since Ember 1.13. For large codebases, these addons provide a slower
off-ramp for legacy view and controller features. Big apps can move to Ember
2.0 without the complete removal of views.

These addons rely on several private APIs expected to undergo significant
refactoring in Ember 2.5 or 2.6. Therefore, the Ember 2.4 LTS will likely be
the last LTS to support these addons. They will become unsupported in September
or October with the release of Ember 2.8 LTS.

### See You Soon

LTS releases are just one of the many things we've been working on; the core
team has had a _long_ couple of months and we're excited to share everything.
There will be more announcements and plans shared at [EmberConf](http://emberconf.com/)
(March 29-30 in Portland), looking forward to seeing so many of you there!

<img src="/images/blog/2016-02/release-tomsters.png" class="no-background" alt="The Release Tomsters Family">
