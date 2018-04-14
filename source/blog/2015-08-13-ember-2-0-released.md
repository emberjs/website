---
title: Ember.js 2.0 Released
author: Yehuda Katz and Matthew Beale
tags: Releases, 2015
responsive: true
---

Ember 2.0 is not a traditional major release. After thirteen point releases in
almost two years, we're taking a turn to focus entirely on sweeping out
built-up cruft as a foundation for continued progress.

**Ember 2.0 only removes features that were deprecated as of Ember 1.13, so
apps that run on Ember 1.13 without any deprecation warnings should run
without issues on Ember 2.0.**

New applications should begin using Ember 2.0 today. Apps requiring Ember-Data
should use Ember-Data 2.0.0-beta.1 (2.0 release coming shortly!).

#### New Features in Ember.js 2.0

* ***&lt;This space intentionally left blank!&gt;***

Major releases of most libraries try to do two things. They introduce new APIs,
and remove deprecated ones. Our release focuses on doing one thing well:
**Instead of introducing new features, the goal of Ember 2.0 is to remove
accumulated cruft.**

Since Ember 1.0, adherence to semantic versioning has helped us grow an amazing
community. Ember powers extremely ambitious applications, and most of those
applications have been able to move forward over 13+ releases as new features
arrived.

We are committed to giving every Ember codebase a path into 2.x. To ensure
this, we've flagged everything removed in 2.0 with a deprecation in the 1.x
series. **If your app runs on Ember 1.13 without raising deprecations, it
should run on 2.0.** There are no new features to adapt to or adopt.

In the first few releases in Ember 2.x, we plan to land a variety of exciting
features. We are all the more excited that thousands of existing apps will be
ready to use them immediately. More about this below.

#### Removed APIs

Internally, we've taken to calling Ember 2.0 a "garbage collection" release.
Two years is a lot of framework development, and there are many things dropped
in today's release.

Developers migrating forward will find these resources helpful:

* The [1.x Deprecation Guide](http://emberjs.com/deprecations/v1.x/) contains
  a summary and migration path for many deprecations since Ember 1.7.
  Additionally, this guide is linked to from deprecation messages in your
  browser's console.
* The [Ember Inspector](https://github.com/emberjs/ember-inspector#ember-inspector-)
  is an essential tool for debugging Ember apps, and provides some tooling for
  managing deprecations.
* Core team members [Robert Jackson](https://twitter.com/rwjblue) and
  [Matthew Beale](https://twitter.com/mixonic) published the
  [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
  addon in July. This tool helps to manage upgrades to your codebase through
  deprecation messages. Watch Robert present on upgrade workflows in this
  [NYC meetup video](https://www.youtube.com/watch?v=ltzN4v-ymo4&feature=youtu.be&t=1h25m55s).
* The [ember-debug-handlers-polyfill](https://github.com/rwjblue/ember-debug-handlers-polyfill)
  addon provides a future-safe API for writing your own upgrade tooling.

Some of the major API removals follow.

**Views** have been removed in Ember 2.0. Components, which provide better
isolation and scoping semantics, fulfill the use-cases views were introduced
for.

We recognize that existing apps will not complete their migration away from
views for several months, so we have published the
[ember-legacy-views](https://github.com/emberjs/ember-legacy-views)
compatibility addon, that will allow you to spread out the transition over more
releases. We are committed to maintain support for this addon until at least
Ember 2.6.

If you are building a new application, the use-case for views have completely
been subsumed by Components. Existing apps should refactor away from the
`{{view}}` helper and `Ember.View`s in favor of Components.

However, existing applications that make use of top-level Views do not need to
immediately refactor those views to components. The future Routable Components
will provide a softer transition path for this use-case and we commit to
support the compatibility addon until the community has had a chance to
transition to Routable Components.

Similarly, the use-cases for **Controllers** have largely been eliminated.

As with views, we have published the
[ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers)
compatibility addon that you can use to spread out the transition. This addon
will also be maintained until at least Ember 2.6.

If you are building a new application, you should almost never need controllers
except to manage query parameters and communicate with the route (ala
`transitionTo`). For these cases, Ember 2.0 retains support for top-level
controllers with no addon required. While we plan to completely replace these
use-cases during the 2.x series, everything that works without the
compatibility addon will continue to work until 3.0.

Existing applications should refactor away from using the `{{controller}}`
property, use of proxying controllers (`ArrayController` and
`ObjectController`), `itemController`, etc.

However, existing applications that make use of top-level Controllers do not
need to immediately eliminate those controllers. As with top-level views, the
future Routable Components will provide a softer transition for this use-case
and we commit to support the compatibility addon until the community has had a
chance to transition to Routable Components.

**ReduceComputed and ArrayComputed** have been made obsolete by the Glimmer
rendering engine introduced in Ember 1.13. These APIs allowed array operations
to be performed without creating new arrays. Glimmer's value diffing makes this
unnecessary. Computed property macros that operate on arrays are still present,
but they are simply not backed by `ReduceComputed`.

**Context shifting in templates** (`{{#each}}` and `{{#with}}` without block
params) is removed in Ember 2.0. For any template, there is now only one this
and it cannot be changed for part of that template by any helper. This makes
templates easier to reason about, and unlocks opportunities for performance
improvements.

**IE8 support** has been dropped for Ember 2.0. For the 2.x series, IE9+ will
be supported.

**Legacy Handlebars helpers** are removed in favor of the `Ember.Helper` API.
This API does not provide a mechanism for helpers to take a block, but does
introduce support for nested helpers which can be used in concert with built-in
helpers (like `{{#if}}` and `{{#each}}`) to achieve the same ends.

Please see the [CHANGELOG.md](https://github.com/emberjs/ember.js/releases/tag/v2.0.0)
for an authoritative list of cleanups.

#### The Road Ahead

Over the last few releases of Ember 1.x, we added a large number of new
features. These additions, including a whole new rendering engine, were
introduced while maintaining backwards compatibility. Unsurprisingly,
maintaining support for the semantics of two rendering engines (among other
things) introduced a large amount of cruft. Continuing to provide backwards
compatible legacy APIs has a non-trivial impact on the performance of Ember
applications, and on the project’s momentum.

Ember 2.0 allowed us to purge much of that built-up cruft. That was no small
task; removing code, documenting deprecations, and building new workflows for
managing these changes would not have happened without lots of hands. It was an
incredible effort, and we'd like to thank the community for making it happen.

With the garbage collection sweep out of our way, we can continue to expand on
the foundation solidified in Ember’s 1.x series.

##### Improved Release Cadence

Since Ember 1.0, we have followed [Semantic Versioning](http://semver.org/),
working very hard to maintain public API compatibility while adding new
features. In the lead-up to breaking changes in Ember 2.0, we made a number of
mistakes that caused our users to experience a great deal of churn.

While we successfully followed our existing policies regarding deprecation
before removal, and ensured that each deprecated feature had a viable
replacement, we did not do a good job of distinguishing between different kinds
of deprecations. Additionally, many deprecations landed very late and all at
once. These factors combined made the entire process feel overwhelming.

The feeling of "churn" is contrary to all our release process goals. In
addition to the continued maintenance of a six-week release cycle, we have a
number of tweaks to the process planned for 2.x. These are intended to help us
avoid a similar problem late in the 2.x cycle.

Some examples of improvements are:

* **LTS (Long-Term Support) Releases** ([RFC #56](https://github.com/emberjs/rfcs/pull/56)),
  which can give users who want to upgrade less often than every six week a
  sanctioned way to do so.
* **Mandatory docs**. No new features will be added to the Ember 2.0 release
  channel without accompanying documentation.
* **More informative deprecations**. All deprecations will include which
  release their behavior will be removed in, as well as a link to transition
  instructions.
* **Improved deprecation tooling**. More informative deprecations allow us to
  make the Ember inspector's deprecation pane smarter, and more useful for
  incrementally working through deprecations. In particular, we can avoid
  nagging you (by default) about removals that will not happen until far in the
  future. For more information see
  [RFC #65](https://github.com/emberjs/rfcs/pull/65) and the included comments.
* **Svelte Builds**, which allow you to ask Ember CLI not to include deprecated
  features you are no longer using. This will reduce pressure on future major
  releases.

#### Ember 2.x Themes

In addition to a better release process, you can look forward to several
high-level areas of improvement throughout the 2.x series.

**Alignment with JavaScript**. Throughout 2.x, we will continue our efforts to
align Ember with ES6 and future versions of JavaScript. As the JavaScript
decorator proposal stabilizes, and as transpilers improve their
implementations, we plan to adapt computed properties and other APIs to that
syntax.

**JavaScript Modules**. We will also continue to evolve further towards a
modules development style and away from a globals style. Among other things,
this will allow us to more aggressively automate the removal of dead code
paths.

**Stabilization and Integration**. The Ember ecosystem will continue to
stabilize and integrate tightly. Ember-Data and Ember CLI will be versioned in
lockstep with Ember itself. Putting these projects on the "release train" with
Ember will mean they adhere to the same backwards compatible and incremental
change policies as Ember did through 1.x.

**Ember Data**. With the release of Ember 2.0, Ember Data is now a stable part
of Ember's releases. It will adhere to Semantic Versioning policies like Ember
itself, and every release of Ember will include a compatible release of Ember
Data. Along those lines, Ember Data will not make any breaking changes until
3.0.

##### New Features in the Pipeline

Many of our other plans have already been proposed via the RFC process and
discussions on GitHub, but here's a recap.

We are actively working on the implementation of these features, and expect
them to land gradually over several releases.

**Angle-Bracket Components and One-Way Data Flow**. Ember 2.x will transition
to angle-bracket components. For example `<my-button>` instead of
`{{my-button}}`. These will operate with one-way binding as part of a larger
transition to a "data down, actions up", or "DDAU", style of programming that
you will read about as features land. We expect these components to land in
2.2 and be refined over the next few releases. See
[RFC #60](https://github.com/emberjs/rfcs/pull/60) and
[PR #12011](https://github.com/emberjs/ember.js/pull/12011) for more details
about our progress.

**Pods**. We are also actively working on finalizing the pods directory layout
for applications, which makes it easier to group related parts of your
application together. This change will be completely opt-in, and existing
layouts will continue to work.

**Routable Components**. After angle-bracket components and the pods layout
land, we will be able to transition the last few use-cases for controllers to
the much-anticipated Routable Components.
[RFC #38](https://github.com/emberjs/rfcs/pull/38) and
[PR #11939](https://github.com/emberjs/ember.js/pull/11939) track our progress
so far.

**FastBoot**, Ember's alpha release server-side pre-rendering library, will
continue to improve and stabilize over the 2.x lifecycle. Find it on GitHub as
[ember-cli-fastboot](https://github.com/tildeio/ember-cli-fastboot).
