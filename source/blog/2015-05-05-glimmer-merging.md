---
title: Glimmer's In Canary, Test Your Apps!
author: Yehuda
tags: Compatibility, Recent Posts, 2015
responsive: true
---

After months of work, **Glimmer is landing in Canary today**.

What this means:

* The test suite passes.
* We have tested Glimmer on our own apps, and, for the most part, apps boot and
  run correctly.
* There are still known issues (see below), including with the test helpers.
* At this point, we need community help to identify compatibility issues not
  covered by the test suite.
* We expect to continue improving compatibility with the pre-Glimmer engine for
  some time, as new issues come to light.

Glimmer is the new rendering engine the Ember community has been working on for
the past several months. It is the first ground-up change to the templating
engine since SproutCore 2.0, and takes advantage of the groundwork laid by
HTMLBars to dramatically improve re-rendering performance. It also sets the
stage for more performance improvements during the 2.x series, and
React-inspired improvements to the Ember programming model. Best of all, we are
landing Glimmer in Ember 1.13, compatible with the full public API of Ember
1.x.

It's also worth noting that while our apps feel faster, not every
performance benchmark will necessarily show marked improvement. There
will be more on this below, but the Glimmer refactor focused primarily
on dramatic improvements to re-rendering performance and programming
model improvements.

Initial render of component-heavy pages shows some improvement in most
of our tests, but you should expect to see the biggest improvements when
re-rendering lists, especially when you are not using deprecated
functionality.

Once we land Glimmer, you will probably see a variety of different
benchmarks testing various aspects of Ember. We expect to see benchmarks
showing that there are still pathologically slow scenarios in Ember,
especially in areas that we did not focus on improving. We expect to
continue to improve performance across Ember throughout the 2.x series,
and discuss that more below.

Also note that while we took great pains to support features present in
Ember 1.12 (including many long-deprecated features), that compatibility
often comes with significant performance costs. In some cases, seemingly
similar constructs (e.g. `{{#each posts as |post|]}` vs. `{{#each posts
itemController='post' as |post|}}`) have significantly different
internal implementation, and the Ember 2.0 version has vastly better
performance.

Finally, there will be an upcoming guide in the next week or so that
describes the new features of the Glimmer engine (`attrs`, new lifecycle
hooks, keys in `#each`), but at the moment we are focusing on
compatibility with 1.x and testing the 1.x API with existing
applications.

Please follow these instructions to test Ember-CLI apps with Canary:

* [http://www.ember-cli.com/#using-canary-build-instead-of-release](http://www.ember-cli.com/#using-canary-build-instead-of-release)

## Known Issues

There are several known issues that you should consider when evaluating
Glimmer:

* There are still a few memory leaks that we have identified and are
  quickly addressing.
* The concept of `controller` in templates and actions in Ember 1.x was
  fairly nuanced. Glimmer started with a simpler model and layered
  compatibility on top. There are known gaps in the compatibility layer
  that we are still addressing.
* There are still a number of issues in the testing helpers (especially
  the faux unit tests that use "isolated containers") that are causing
  apps that work correctly to fail tests. We are working to fix the test
  helpers, and should have that work done before we release 1.13 beta.
* There are likely a number of not-yet-known compatibility issues in
  Glimmer. You should assume that the vast majority of issues you
  encounter when testing Glimmer over the next few weeks will be addressed
  before the final release.
* The compatibility layer is quite slow in some areas, making the
  overall Glimmer engine slower than we would like. We have plans to
  improve overall performance through the canary and beta cycle, and
  then of course in the 2.0 release cycle.
* **In general, the Glimmer effort was an attempt to improve
  re-rendering performance, especially in large lists.** It also laid
  the groundwork for significant performance work in initial render and
  throughout the framework, but that work is not yet done. Expect to see
  continued performance improvements in Ember throughout the 2.x cycle
  as a result of this change.

The most critical of these caveats should be addressed before we release 1.13
beta, and we expect to continue work on the remaining issues throughout the
1.13 beta cycle.

Because of the magnitude of this change, and the proximity to the Ember 2.0
"cruft removal" pass, we plan to aggressively fix reported bugs during the 1.13
beta period. There will be another post describing our 1.13 and 2.0 release
plans with more precision in the next few weeks.

## Performance Gains

The biggest performance gains in Glimmer come from moving to a simpler
rendering model, built on top of HTMLBars.

First, this allowed us to remove **all** internal views for constructs
like `{{foo}}`, `{{#if bar}}` and even in `{{#each posts as |post|}}`.
This view removal has an impact on initial render, because these
constructs are very common in real-world templates.

Second, as we have discussed extensively, this allows us to
significantly improve the performance of re-rendering, which makes it
practical to re-render lists with entirely new arrays with very good
performance. Previously, achieving reasonable performance was very
difficult, and even when possible, came with significant bookkeeping
overhead.

Interestingly, we have found that when testing real apps, the
performance gains are much more widespread than we expected, in large
part because of the simplification of the overall model.

**Glimmer's performance in real applications has pleasantly surprised
us, exceeding the improvements we've seen in benchmarks designed to
stress-test pathological cases.**

When upgrading to Glimmer, please pay special attention to the
real-world performance of your application **in production mode** and
after clearing any deprecations with performance warnings.

## Deprecated Features

Throughout the 1.x series, Ember has deprecated features we intended to
remove in 2.0. That process has continued with Ember 1.13, which will
contain Glimmer.

However, it's worth noting that Glimmer is the first major change to
many parts of the view layer since SproutCore 2! As a result,
perfect compatibility, especially in private APIs, was more
challenging.

During the process of building Glimmer, we found various semantics of
"controller"s to be the most challenging. For the most part, this is
because the concept of controller has a number of different meanings
depending on context (routes, `{{render}}`, `{{#each posts
itemController='post'}}`, `{{#each posts itemController='post' as
|post|}}`, `{{#with someController}}`, etc.).

Controllers and components both manage a template's "context" (called
"self" in Glimmer) and serve as a target for actions. Mirroring these
semantics, which are effectively derived from implementation details of
Ember 1.x's rendering engine, has been a challenge. We're confident they
are very close, but encourage you to open an issue if they have changed.

Glimmer, through HTMLBars, has a much clearer concept of "scope", and
features like `{{yield}}` work directly with that scope object. We were
able to get the Ember test suite passing by implementing the old
semantics on top of the new scope concept, but **we are aware that we
have gaps in our implementation.**

Please let us know if you find controller semantics that we have
implemented incorrectly. Bug reports would help, JSBins would help more,
and pull requests with failing tests would help even more.

Finally, for the best experience with Glimmer, you should try to move
your application away from `itemController`, `{{render}}` and other
constructs that manipulate the controller from the template. We know
that this is not always possible (our applications all still make
use of some cases of these features),  which is why we worked so hard on
compatibility.

That said, you'll get better performance and a quicker upgrade path to
2.0 if you work on eliminating uses of these features soon. Implementing
them correctly added enough complexity that we will want to move
somewhat aggressively in 2.x to enable us to further improve
performance.
