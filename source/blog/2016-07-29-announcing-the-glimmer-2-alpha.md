---
title: Announcing The Glimmer 2 Alpha
author: Godfrey Chan
tags: Releases, 2016, Announcement, Glimmer
responsive: true
---

In this year's [EmberConf keynote](https://www.youtube.com/watch?v=OInJBwS8VDQ&list=PL4eq2DPpyBblc8aQAd516-jGMdAhEeUiW),  Yehuda mentioned that we are working on a highly optimized rendering engine for Ember called Glimmer 2.

On behalf of all the contributors who have lent a hand along the way, I am very excited to announce that we have just released Ember 2.9.0-alpha.1, the first official build with Glimmer 2 included.

## 🔑 A Key Milestone 🔑

During the alpha testing period, we will publish new alpha builds on a weekly cadence, following the [beta releases schedule](http://emberjs.com/builds/#/beta). The alpha releases will be cut from the master branch, but with all [experimental features](https://guides.emberjs.com/v2.7.0/configuring-ember/feature-flags/) other than `ember-glimmer` stripped from the builds.

The purpose of the alpha releases is to enable our community – especially the addon and tooling ecosystem – to start testing the new engine for compatibility and offer feedback. Needless to say, the alpha releases are not intended for production use.

To test your apps with the alpha builds, simply run `bower install --save ember#alpha` and follow the prompt to persist the resolution.

From Ember's perspective, integrating Glimmer 2 does not expose any new user-facing features. Even though it is a complete rewrite under the hood, **we expect the final release to be a drop-in, completely backwards compatible upgrade** for virtually all Ember users. Notably, we will follow our usual [SemVer](http://semver.org) guarantee and ensure all public APIs continue to function as advertised. At this point, we do not expect to introduce any new deprecations along with the initial release.

That being said, despite our [best efforts](https://github.com/emberjs/ember.js/issues/13127), we might not have gotten every detail right in our very first attempt, hence the alpha releases. We would really appreciate it if you could start testing your applications and report any regressions. You may refer to the [master issue](https://github.com/emberjs/ember.js/issues/13949) for a list of known issues.

It is worth noting that the version number (2.9.0-alpha.1) does not imply the new engine will be automatically included in the 2.9 final release. Just like any other changes, the Glimmer 2 integration is subject to the usual rigor and stability requirements of our [release process](http://emberjs.com/blog/2013/09/06/new-ember-release-process.html). The core team will make the final decision on when to promote the feature into beta and stable releases based on our learnings from the alpha period.

Based on current information, the 2.8-LTS release (when available) will likely be the final [LTS release](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html) to include the current-generation rendering engine, which will be supported with critical bugfixes until at least May 2017 and security patches until at least October 2017.

## 🚀 A Note On Performance 🚀

While one of the overarching goals of Glimmer 2 is to improve performance, the immediate priority in the alpha phase is maximal compatibility. We are barely scratching the surface with the possible optimizations unlocked by the new engine, and once the dust settles there will be ample headroom for further improvements.

That being said, you should start seeing some improvements in rendering performance with each alpha release, as well as reduced download/parsing time thanks to the new templates serialization format.

We are also aware of a few minor bugs that cause performance problems in the first alpha release, which we plan to address quickly. However, it is also possible that we inadvertently regressed performance in certain scenarios. If you noticed certain common patterns have become slower, please report them as bugs.

As always – when running performance benchmarks, **please make sure you are using the minified production build** (`ember.min.js`). The debug builds contain a lot of helpful development aids that are known to impact performance negatively.

## 🎁 A Whole Lot More To Come 🎁

Besides performance, Glimmer 2 has laid a solid foundation for us to build on.

The project originally started when Tom, Yehuda and I spiked on implementing "angle bracket components" in the HTMLBars ("Glimmer 1") engine over a year ago. This exercise highlighted some fundamental misalignments between the current rendering stack and the direction Ember is headed.

While HTMLBars handled basic templating, it left the implementation of many of Ember's view layer features (notably components) up to Ember itself. Not only did it make new features more difficult to implement, it made it hard to implement them _efficiently_ out of the gate.

As Ember has moved towards components and "data-down, actions-up", we wanted to do many optimizations that just weren't a good fit for the HTMLBars architecture. The lessons we learned from the spike ultimately leading us down the journey that is now known as the Glimmer 2 architecture. The underlying technologies are very interesting, but I will save those details for another time.

**As an Ember user, you can expect the new engine to unlock some long-awaited features**, such as FastBoot rehydration and a refreshed approach to components once the initial integration is complete.

## ❤️ A Big Thank You ❤️

Since [forking HTMLBars](https://github.com/tildeio/glimmer/compare/rip-htmlbars...master), the Glimmer repo has received over 700 commits, not to mention the [integration effort](https://github.com/emberjs/ember.js/issues?page=1&q=label%3AGlimmer2+is%3Aclosed) that happened on the Ember side, all of which would not be possible without the help from our community.

Thank you to every one who helped us get here – from the [companies](http://emberjs.com/sponsors/) who donated employees' time to the individual contributors who made personal sacrifices to make this happen.

With all of that out of the way – *happy alpha testing*! 🍾🎊🎉

---

## 📚 Further Reading/Watching 📚

- 🔜 Stay tuned for more *Inside Glimmer 2* articles from this blog
- 🚧 [Glimmer Architecture Guides](https://github.com/tildeio/glimmer/blob/master/guides/01-introduction.md)
- [Opening Keynote](https://www.youtube.com/watch?v=OInJBwS8VDQ&list=PL4eq2DPpyBblc8aQAd516-jGMdAhEeUiW&index=1) from EmberConf 2016
- [The Future of Ember Templating](https://www.youtube.com/watch?v=dpx9P1cz37k&list=PL4eq2DPpyBblc8aQAd516-jGMdAhEeUiW&index=23) from EmberConf 2016
- [Inside Glimmer 2: What Is A Compiler?](https://www.youtube.com/watch?v=vg5A_UOGShg)
- [Glimmer 2 Deep Dive](https://www.youtube.com/watch?v=vL8sCi1Bv6E)
