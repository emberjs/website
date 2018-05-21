---
title: Ember.js 2.8 and 2.9 Beta Released
responsive: true
author: Godfrey Chan
tags: Releases, 2016, 2, 2.8, 2.9
---

Today, the Ember core team is happy to announce two new Ember.js releases –
Ember.js 2.8 and Ember.js 2.9 beta.

## Ember.js 2.8

Ember.js 2.8 is a minor release with only backwards compatible changes.

### LTS Candidate

The Ember.js 2.8 release is considered a release candidate for the LTS
(long-term support) channel. As described in the [original LTS announcement](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html),
the 2.8 branch will be moved into the LTS channel six weeks after today's
release. Although we don't anticipate any issues, this process ensures the LTS
releases will be rock solid.

### Engines

Ember.js 2.8 introduced a new [Engines](https://github.com/emberjs/rfcs/pull/10)
API, which allows multiple logical applications to be composed together into a
single application from the user's perspective.

The best way to use this feature in your apps is through the [ember-engines addon](http://github.com/dgeb/ember-engines).
To get started, check out the excellent [guides](https://github.com/dgeb/ember-engines/blob/master/guides/01-introduction.md)
written by [@trentmwillis](https://github.com/trentmwillis).

This release introduced a set of low-level APIs for the core functionality
along with the usual semver guarantees. While the ember-engines addon itself
remains experimental, the introduction of these public APIs means that
**ember-engines is now usable with Ember.js 2.8** without feature flags.

Work on engines has proceeded over the past year in both Ember core as well as
the addon. Ember's architecture has been enhanced to provide the base classes
and hooks needed to support engines. The addon then makes use of these
interfaces to provide a smooth experience building and consuming engines.

Until now, none of the engine-related classes and hooks in Ember have been
exposed publicly. However, starting with Ember.js 2.8, the following APIs are
now public:

- `Ember.Engine` class - The base class for `Ember.Application`. Its only
  public interface is related to initializers and instance initializers, which
  is then inherited by applications.

- `Ember.EngineInstance` class - The base class for `Ember.ApplicationInstance`.

- `{{mount}}` helper - Allows for the mounting of routeless engines in
  templates. This helper currently only takes one argument, the name of the
  engine, e.g. `{{mount "chat-engine"}}`.

- `mount` router DSL - Allows routable engines to be mounted at a location in
  a route map.

By making these APIs public, ember-engines and other addons will be able to
access them without a feature-flag. By accessing only public interfaces in
Ember, an addon won't need to rely on private overrides and can provide as
stable an experience as possible.

We predict that engines will grow in popularity once work on lazy loading is
complete. By delaying the loading of engines until they're accessed, we can
decrease the initial payload size and startup time for applications. If you're
interested in helping to implement or test lazy loading of engines, please
check out the thorough [attack plan](https://github.com/dgeb/ember-engines/issues/154)
written up by [@nathanhammond](https://github.com/nathanhammond).

### Other Notable Features

#### `Enumerable#includes` and `Array#includes`

In an effort to remain in line with ES standards, the methods `Enumerable#contains`
and `Array#contains` have been deprecated in favor of the new methods `Enumerable#includes`
and `Array#includes`.

Addon authors should use [ember-runtime-enumerable-includes-polyfill](https://github.com/rwjblue/ember-runtime-enumerable-includes-polyfill)
to fix the deprecation in a backwards-compatible way.

Thanks to [@alexspeller](https://github.com/alexspeller) for the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0136-contains-to-includes.md)
that proposed this change.

Thanks as well to [@bmeurant](https://github.com/bmeurant) for the [PR](https://github.com/emberjs/ember.js/pull/13553)
that implemented the change.

#### `Ember.String.isHTMLSafe`

The new method `Ember.String.isHTMLSafe` detects if a string was decorated
using `Ember.String.htmlSafe`.

For example:

```javascript
var plainString = 'plain string',
    safeString = Ember.String.htmlSafe('<div>someValue</div>');

Ember.String.isHTMLSafe(plainString); // false
Ember.String.isHTMLSafe(safeString);  // true
```

Thanks to [@workmanw](https://github.com/workmanw) for the [RFC](https://github.com/emberjs/rfcs/pull/139)
that proposed this new API, as well as the [PR](https://github.com/emberjs/ember.js/pull/13666)
that implemented it.

On a related note, please create safe strings with `Ember.String.htmlSafe`
instead of the using the deprecated `Ember.Handlebars.SafeString`. See the
[deprecation guide](http://emberjs.com/deprecations/v2.x/#toc_use-ember-string-htmlsafe-over-ember-handlebars-safestring)
for details.

#### `Ember.Test.checkWaiters`

The new method `Ember.Test.checkWaiters` provides a simple mechanism for test
tooling to determine whether all async test waiters have settled. This replaces
the intimate API `Ember.Test.waiters`, which has been removed in Ember.js 2.8.

Thanks to [@rwjblue](https://github.com/rwjblue) and [@krisselden](https://github.com/krisselden)
for implementing this method.

---

For more details on the changes landing in Ember.js 2.8, review the [Ember.js 2.8.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.8.0/CHANGELOG.md).

## Ember.js 2.9 beta

Ember.js 2.9 beta is also being released today. Per our usual [release cadence](http://emberjs.com/builds/#/beta),
it will be released to the stable channel in six weeks.

This release will not introduce any new features or deprecations. Instead, this
release will be focused around integrating the Glimmer 2 rendering engine into
Ember.

### Glimmer 2

In this year's [EmberConf keynote](https://www.youtube.com/watch?v=OInJBwS8VDQ&list=PL4eq2DPpyBblc8aQAd516-jGMdAhEeUiW),
Yehuda mentioned that we are working on a highly optimized rendering engine for
Ember called Glimmer 2. A few weeks ago, we announced the [Glimmer 2 alpha](http://emberjs.com/blog/2016/07/29/announcing-the-glimmer-2-alpha.html)
to invite our community to help test the new engine. Today, we are very excited
to announce that the Glimmer 2 engine will be included in the 2.9 beta release.

#### Compatibility First

As mentioned above, the initial Glimmer 2 integration does not expose any new
user-facing features. The primary goal of this release is maximal compatibility
– **we expect the final release to be a drop-in, completely backwards
compatible upgrade for virtually all Ember users**.

During the alpha testing period, the Ember core team and our community were
laser-focused and worked really hard to achieve this goal. Thanks to all the
alpha testers, addon authors and contributors who reported issues or chimed in
with patches, we are able to meet our compatibility target and feel confident
about including Glimmer 2 with the 2.9 release.

That being said, despite our [best efforts](https://github.com/emberjs/ember.js/issues/13127)
and the extensive alpha testing, we still might have gotten a few details
wrong, hence the beta releases. We would really appreciate it if you could
start testing your applications and report any regressions, if you have not
already done so. You may refer to the [master issue](https://github.com/emberjs/ember.js/issues/13949)
for a list of known issues.

It's also worth noting that the 2.8-LTS release (when available) will be the
final [LTS release](http://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html)
to include the current-generation rendering engine, which will be supported
with critical bugfixes until at least May 2017 and security patches until at
least October 2017.

#### New Template Serialization Format

Glimmer 2 adopted a new serialization format for the precompiled templates. The
new serialization format offers a few benefits – among them are reduced byte
size (hence download time) and parse time.

Take this simple template for example:

```handlebars
Hello {{name}}! {{#if isFriday}}Happy Friday!!!{{/if}}
```

In Ember.js 2.8, this template compiles into a JavaScript function with 2273
bytes, or 472 bytes minified and gzipped. At the time of writing, Ember.js 2.9
beta compiles the same template into a JSON string with 374 bytes, or 213 bytes
minified and gzipped. You can explore the difference in [this gist](https://gist.github.com/chancancode/6ddef7c343873e5c9c5ea99106cdc238).

There are a few caveats with the previous paragraph. First of all, the details
of the templates serialization is a private API that is subject to change
anytime and should not be relied on. Second, the reduction varies between
templates, depending on various factors such as the number of blocks used in
the template. Third, minification and gzip are usually applied to the entire
application bundle and they work a bit differently in those environments.

Nevertheless, these numbers offer a good ballpark estimates on what you could
expect. From our experience, the reduction generally scales well and holds up
in real-world scenarios.

Besides the byte size savings, the JSON serialization format also reduces parse
time and allows us to defer the work till the template is actually used.

This is an area that is still being actively worked on, and we expect the
serialization format to go through some more changes before the Ember.js 2.9
stable release.

#### Performance

One of the overarching goals of the Glimmer 2 project is to improve performance
in Ember. While compatibility is the immediate priority for this release,
performance remains an important secondary consideration.

Our conservative goal for this first release is to avoid introducing any
accidental performance regressions. Based on our testing, we have cleared that
goal with ample headroom.

As the benefits of Glimmer 2 begin to trickle in, we have already seen
noticeable improvements to rendering performance (both initial render and
re-rendering). Among other things, the `{{link-to}}` helper and `{{#each}}`
loops with big lists appear to be significantly faster. Component instantiation
has also seen some modest improvement.

However, we have also noticed a performance regression in the pre-render phase.
Specifically, we have seen a small increase in the `vendor.js` byte size and an
increased delay before the application gets to render anything. This regression
eats into the rendering improvements. We are actively working on these issues
and we expect them to be addressed before the final release in Ember 2.9.

Despite the caveats, our data suggest the savings from template byte size and
improved rendering performance more than offset the current issues. Therefore,
we expect most applications to see an overall improvement in performance upon
upgrading to the beta release.

It is worth noting that these observations are recorded from complex production
applications maintained by members of the core team (as opposed to isolated
synthetic benchmarks). Given the current state of affairs, we are hesitant to
circulate premature numbers that are specific to a handful of applications. We
plan to perform some thorough analysis as we get closer to the final release.

In the meantime, we encourage you to test the beta release against your own
applications. If you notice that certain common patterns have become slower,
please report them as bugs. As always – when running performance benchmarks,
**please make sure you are using the minified production build**
(`ember.min.js`). The debug builds contain a lot of helpful development aids
that impact performance negatively.

#### Future Work

While this release serves as an important milestone and proving ground for the
Glimmer 2 project, we are barely scratching the surface here. One of the
informal mandates of the Ember project is "we will keep on shipping", and this
is no exception.

The Glimmer 2 engine unlocks a whole new arena of performance optimizations.
Once the dust settles, we are committed to keep iterating on performance
improvements. Ultimately, our goal is to make the overhead of breaking up an
app into small, composable components negligible over time. We are optimistic
that there will still be ample headroom for further improvements in this area.

Besides performance, Glimmer 2 has laid a solid foundation for us to build on.

The project originally started when Tom, Yehuda and I spiked on implementing
"angle bracket components" in the HTMLBars ("Glimmer 1") engine over a year
ago. This exercise highlighted some fundamental misalignments between the
current rendering stack and the direction Ember is headed.

While HTMLBars handled basic templating, it left the implementation of many of
Ember's view layer features (notably components) up to Ember itself. Not only
did it make new features more difficult to implement, it made it hard to
implement them _efficiently_ out of the gate.

As Ember has moved towards components and "data-down, actions-up", we wanted to
do many optimizations that just weren't a good fit for the HTMLBars
architecture. The lessons we learned from the spike ultimately leading us down
the journey that is now known as the Glimmer 2 architecture. The underlying
technologies are very interesting, but I will save those details for another
time.

**As an Ember user, you can expect the new engine to unlock some long-awaited
features**, such as FastBoot rehydration, incremental rendering and a refreshed
approach to components once the initial integration is complete.

#### Thank You!

Since [forking HTMLBars](https://github.com/tildeio/glimmer/compare/rip-htmlbars...master),
the Glimmer repo has clocked over 850 commits, not to mention the [integration effort](https://github.com/emberjs/ember.js/issues?q=label:Glimmer2+is:closed)
that happened on the Ember side and also in the wider ecosystem. All of these
would not be possible without the help from our community.

Thank you to every one who helped us get here – from the [companies](http://emberjs.com/sponsors/)
who donated employees' time to the individual contributors who made personal
sacrifices to make this happen.

---

For more details on the changes landing in Ember.js 2.9 beta, review the [Ember.js 2.9.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.9.0-beta.1/CHANGELOG.md).
