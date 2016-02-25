---
title: Announcing Ember's First LTS Release
author: Matthew Beale
---

This fall Ember's core team merged [RFC #56](https://github.com/emberjs/rfcs/blob/master/text/0056-improved-release-cycle.md#proposal-lts-releases).
This RFC, titled "Refining the Release Process", laid out several lessons taken
from Ember's 1.13 to 2.0 transition. It proposed steps to improve both the stability
of releases and the migration paths between them.

The creation of Long-Term Support releases, or LTS releases, is one of those steps
we're excited to take action on.

**Ember 2.4 will be the first LTS release of the core framework**. Additionally,
we've updated the [emberjs.com/builds](http://emberjs.com/builds/) page
with better guidance about when and how to use each of the channels.

### The LTS Release Process

LTS releases provide improved stability, security, and addon compatibility.
The tradeoff is that they also land less frequently: Every four minor version
releases, a new LTS is formalized. For example 2.4 will be the first LTS
release, so 2.8 will be the second LTS release.

2.4 will be declared LTS six weeks after it is released as a stable version.
This delay means 2.4 will be battle-tested in production by many applications
before it is finalized as an LTS.

For example, the expected release of Ember 2.4 stable (currently in
beta) is on February 26th. Given this date and a perfect six-week release
cycle, the projected supported timeline for each release channel is as follows.

![LTS release timeline](/images/blog/2016-02/Releases@3x.svg)

In reality release dates will drift by several days, however the guidance
above should provide a sense of scale for the cadence of LTS releases (roughly
twice a year).

### The LTS Channel

What makes an LTS release different than a stable Ember release? LTS releases
come with guarantees about API stability and security:

* Security fixes will always be back-ported to the most recent LTS release. [Read
  more about Ember's security policy](http://emberjs.com/security/).
* Release notes for each LTS will contain a summary of features and
  deprecations added since the previous LTS. This will likely consist of a
  number of links to documentation, guides, and release notes for stable
  releases.
* Addons and applications should constrain themselves to using Ember's public
  API. However, in practice we recognize that experimentation and use of
  "intimate" APIs is a reality. To ensure addons and apps using these
  intimate API have a migration path forward, any change to a heavily used
  private API will be deprecated in at least one LTS.
* We encourage addon authors to maintain support for the latest LTS release, in
  addition to tracking changes in the stable releases.

In practice, since these releases still abide by [semantic versioning](http://semver.org/),
upgrading from LTS
release to LTS release should not be significantly more work than upgrading
along the six-week release cycle.

Upgrading less frequently will mean, of course, that a developer will wait
longer to take advantage of new features. Additionally, it means the changes in
best practices between releases (and in the number of deprecations) may feel
more significant.

### Legacy View and Controller Addons

Ember has provided the [ember-legacy-views](https://github.com/emberjs/ember-legacy-views)
and [ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers)
addons since Ember 1.13. For large codebases, these addons provide
a slower off-ramp for legacy view and controller features. Big apps
can move to Ember 2.0 without the complete removal of views.

These addons rely on several private APIs expected to undergo significant
refactoring in Ember 2.5 or 2.6. Therefore, the Ember 2.4 LTS will likely
be the last LTS to support these addons. They will become
unsupported in September or October with the release of Ember 2.8 LTS.
