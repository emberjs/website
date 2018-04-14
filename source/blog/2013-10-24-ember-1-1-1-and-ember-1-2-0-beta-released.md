---
title: Ember 1.1.1 and 1.2 Beta Released
author: Tom Dale
tags: Releases, 1.1, 2013
responsive: true
---

Hot off the heels of our 1.0 release, we've got two new bundles of
goodness for you to try out today.

First up is Ember.js 1.1.1, the inaugural stable release after our
[switch to a Chrome-like six week release
cycle](/blog/2013/09/06/new-ember-release-process.html).

Because this is the kickoff release of the new process, there are very
few new features and the delta between 1.0 and 1.1.1 is very small. This
release is composed primarily of bug fixes and performance improvements,
so we recommend you upgrade right away.

For a list of exactly what's new, see the [CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.1.1/CHANGELOG).

(If you're wondering why 1.1.1 and not 1.1, there was [a regression
introduced in Ember.Object.create() that could break 1.0-compatible
apps](https://github.com/emberjs/ember.js/issues/3596) that we didn't
notice until after we'd tagged the 1.1 release.)

To coincide with the stable release, we've also got a new beta release
of Ember 1.2. Beta releases are intended to get more eyeballs on new
features that look ready to go, but may have bugs or edge cases that we
haven't yet sussed out.

The only changes between a beta release and the stable version should be
bug fixes and removing features that originally looked ready but didn't
end up making the cut.

For a full list of the new features in Ember 1.2 beta, see the [CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.2.0-beta.1/CHANGELOG).

As always, Ember 1.1 and 1.2 beta are available at
[emberjs.com/builds](/builds). If you're feeling particularly
adventurous, you can also grab a Canary build to see what we're in the
middle of working on, though do note that all new APIs in Canary are
subject to change. To see what features are available to be enabled, see
[FEATURES.md](https://github.com/emberjs/ember.js/blob/master/FEATURES.md).

We're excited about kicking off the new release process because we think
that it will allow us to deliver a higher-quality product more
frequently. We also believe that using feature flags in our Canary
builds will allow us to more easily experiment with new APIs, which
translates to more features faster.

As always, if you find bugs or need help, please [file an issue on
GitHub](https://github.com/emberjs/ember.js/issues).

Lastly, my sincere thanks to everyone who has contributed features, bug
reports and bug fixes to this release.

In particular, I'd like to call out [Robert Jackson
(@rwjblue)](https://twitter.com/rwjblue) and [Thomas Boyt
(@thomasABoyt)](https://twitter.com/thomasABoyt) for their superheroic
efforts on the infrastructure required to make this type of release
process work smoothly.

Early on, Yehuda and I made a bet that investing in making Ember.js a
community project would pay dividends. We've sometimes questioned that
decision when going up against better-funded competitors, but this
release, I think, vindicates our decision.

This is [a truly community-driven release](https://github.com/emberjs/ember.js/pulse/monthly), and both Yehuda and I were
hands-off through most of it. I am deeply grateful to everyone who
sacrificed hours of their nights and weekends to help us build something
that matters.

If you'd like to be a part of it, we have a welcoming and helpful
community, and we'd love to have you join. Come see us in #emberjs on
Freenode to ask questions and get involved.

Enjoy the new releases, and go forth and build great things!
