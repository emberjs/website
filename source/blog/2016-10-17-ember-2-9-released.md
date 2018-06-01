---
title: Ember.js 2.8-LTS, 2.9 and 2.10 Beta Released
responsive: true
author: Matthew Beale, Yehuda Katz, Godfrey Chan
tags: Releases, 2016, 2.9, 2.10, Version 2.x
---

Today, we are releasing Ember 2.8-LTS (a long-term support release), Ember 2.9.0 and Ember 2.10 beta.

## Ember.js 2.8-LTS

Ember 2.8-LTS is our second long-term support release. You can install it by running `bower install --save ember#lts-2-8` in your projects.

The LTS channel is designed for Ember users who would like to upgrade less frequently, while still getting support from the project and the wider ecosystem. At the same time, it allows addon authors to know which versions of Ember to focus their effort on.

Per our [usual policy](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html), Ember 2.8-LTS is released six weeks after the [2.8.0 stable release](http://emberjs.com/blog/2016/09/08/ember-2-8-and-2-9-beta-released.html#toc_ember-js-2-8). This allows ample time to fix any reported regressions and ensures a rock solid LTS release. It will continue to receive critical bugfixes for six release cycles (roughly June 2017), and security patches for ten release cycles (roughly February 2018).

Meanwhile, Ember 2.4-LTS will continue to receive critical bugfixes for another two release cycles (roughly January 2017), and security patches for six release cycles (roughly June 2017). Users of Ember 2.4-LTS should make use of this overlapping period to transition over to Ember 2.8-LTS.

Most notably, as we have mentioned in the [Ember 2.4-LTS announcement](http://emberjs.com/blog/2016/04/11/ember-2-5-released.html#toc_notable-deprecations-in-ember-2-4-lts), applications who are using the legacy views and controllers addons will need to migrate away from these addons before they can upgrade.

---

For more details on the changes landing in Ember.js 2.8-LTS, please review the [Ember.js 2.8.2 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.8.2/CHANGELOG.md).

## Ember.js 2.9

In the [Ember 2.9 beta blog post](http://emberjs.com/blog/2016/09/08/ember-2-8-and-2-9-beta-released.html#toc_ember-js-2-9-beta), we announced our intention to include the new Glimmer 2 rendering engine in the 2.9 release. However, after careful consideration, we have decided to temporarily hold off on the integration.

**This means that 2.9 will ship with the same rendering engine as 2.8 and does not include any new features, notable changes or deprecations.**

When we moved ahead with Glimmer in the 2.9 beta channel in September, all of Ember's tests were passing, we had no known blockers and it was already working fine for a number of apps we tested (including some core team member's production apps). Due to the magnitude of the internal changes, we fully expected to find bugs not already covered by our initial testing, so we called for the community to beta test the release.

We got a lot of positive results during the beta period, and some of our community sites (such as [Ember Observer](https://emberobserver.com/) and [Ember Addons](https://www.emberaddons.com/)) have already migrated to using the beta in production. However, as more apps tested the beta, we began to see a few critical edge cases reported during the mid-to-late part of the beta cycle. We were able to fix a number of them, but at this point, there are still a [handful of open issues](https://github.com/emberjs/ember.js/milestone/29).

As we said in the [Ember 2.9 beta announcement](http://emberjs.com/blog/2016/09/08/ember-2-8-and-2-9-beta-released.html#toc_compatibility-first), the "primary goal of this release is maximal compatibility – **we expect the final release to be a drop-in, completely backwards compatible upgrade for virtually all Ember users**". Therefore, we decided to err on the side of caution and take another six weeks to ensure the smoothest possible experience for our users.

While it is quite rare for a feature to be backed out from the beta channel, we consider the ability to do so a strength of our [release process](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html#toc_the-beta-branch), and we would like to thank everyone who took the time to test their application against the beta channel.

---

For more details on the changes landing in Ember.js 2.9, please review the [Ember.js 2.9.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.9.0/CHANGELOG.md).

## Ember.js 2.10 beta

As mentioned above, we will continue the Glimmer 2 integration work in Ember 2.10 beta, with a focus on resolving the [remaining compatibility issues](https://github.com/emberjs/ember.js/milestone/29). You can [read about the integration](http://emberjs.com/blog/2016/09/08/ember-2-8-and-2-9-beta-released.html#toc_ember-js-2-9-beta) in the original announcement.

If you haven't already, we highly encourage you to test your application against 2.10 beta as soon as possible and report any issues you encounter. Given that it already went through a complete beta cycle and we were quite close to releasing it, we expect this to go smoothly for most apps.

---

For more details on changes landing in 2.10 beta, review the [Ember.js 2.10.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.10.0-beta.1/CHANGELOG.md).
