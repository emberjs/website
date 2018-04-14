---
title: Ember.js 1.8.0 and 1.9 Beta Released
author: Matthew Beale
tags: Releases, 2014, 1, 1.8, 1.9
responsive: true
---

We are pleased to announce that both Ember.js 1.8.0 and the first beta in the
1.9 series have been released. This comes as the eighth cycle of our release
process that began just after 1.0 was released.

This release represents the effort of at least 40 contributors across over 600 commits.

## Major rendering-layer refactor ("metal-views")

In previous versions of Ember.js, the HTML of a page was created (via
Handlebars) and assembled (via the render tree) using string concatenation. In
Ember.js 1.8, fragments of a page are still created (via Handlebars) as
strings, but are then parsed into DOM and assembled as a DOM tree.

Metal-views is the first part of the HTMLBars effort to land in Ember. It is
an important step towards the complete removal of strings from the Ember.js
rendering pipeline.

Introducing HTMLBars into Ember incrementally demonstrates the community's
commitment to semantic versioning, and to improving the framework without
abandoning existing codebases.

Some of the immediate benefits of this refactor are:

* The removal of recursion from the rendering layer. This decreases garbage
collection pressure during rendering and allows the re-use of objects during
render (for example, the render buffer).
* Improved HTML namespace and contextual element tracking. This introduces
support for components, data-binding, and logic within inline SVG documents.
[Example JSBin](http://jsbin.com/woxes/8/)
* Prior versions of Ember.js relied upon script tags to mark
regions of data bound content. For example a simple template of `{{name}}`
might be rendered into the page as:

```html
<script id="metamorph-1-start" type="text/x-placeholder"></script>
Bob
<script id="metamorph-1-end" type="text/x-placeholder"></script>
```

These script tags could interfere with `:first-child` and other CSS selectors,
and were a general nuisance. In Ember.js 1.8 the library powering these
bindings ([metamorph.js](https://github.com/tomhuda/metamorph.js/)) has been
replaced with a completely re-written engine that uses blank text nodes
([morph.js](https://github.com/tildeio/htmlbars/blob/master/packages/morph/lib/morph.js)). One of the major touted benefits of HTMLBars, the Ember team is
happy to make this a reality in 1.8.

Many thanks to [@krisselden](https://twitter.com/krisselden),
[@ebryn](https://twitter.com/ebryn), [@mmun](https://twitter.com/_mmun),
[@mixonic](https://twitter.com/mixonic), and all developers who took time to
test their applications on 1.8 beta. Delivering this update without breaking
1.x API compatibility took a significant community effort.

## Performance Improvements

Ember.js 1.8 comes with several performance improvements in other parts of the
codebase.

* Ember.js APIs often require the use of a string to lookup a class or route.
Often these strings must be passed through a normalization step before they are
used, such as pluralizing, singularizing, or changing snake\_case to camelCase.
1.8 introduces several caches for these operations, resulting in common
operations being performed far fewer times.
* The refactoring of commonly de-optimized functions in v8 and other browsers.
* The conversion of `MANDATORY_SETTER` from a runtime flag into a build-time
feature flag. This allows relevant code paths in `get` and `set` to be slimmer
in production builds.

Thanks to [@stefanpenner](https://twitter.com/stefanpenner/) and
[@twokul](https://twitter.com/twokul) for their continued efforts on
performance tuning.

## Notable Deprecations

As Ember.js moves forward, various APIs are deprecated to allow for their
removal in a later major release (such as 2.0). With this release a
[deprecations page](http://emberjs.com/deprecations/) has been added to
the Ember.js website. This guide will help developers refactor their code away
from old APIs.

Four notable deprecations are added with the release of 1.8.

* `Ember.Set` is a class for managing an unordered collection of objects ([api
docs](http://emberjs.com/api/classes/Ember.Set.html)). It is a private API and
thus subject to change, however several libraries have chosen to use it despite
this. Since the addition of this API to Ember, the ES6 draft has matured in its
description of a native JavaScript Set class. `Ember.Set` is not compatible
with the upcoming API, and is now deprecated.
* In an effort to more closely align `Ember.Map` with ES6, the `remove` method
has been deprecated in favor of `delete`.
* The `currentWhen` property on links is deprecated in favor of `current-when`.
This property name more closely tracks how component properties will be used in the
future.
* Old versions of Ember.js, the guides, and the API documentation suggested
looking up views as globals. For example `{{view App.SomeView}}`. In
Ember.js 1.8 this style of view lookup is deprecated in favor of using a
string, similar to how other class lookups behave in Ember. [See
this page](http://emberjs.com/deprecations/v1.x#toc_global-lookup-of-views)
for details about transitioning away from global view lookups.
* URLs containing a hash and no `/`, such as `/foo#bar` are handled by the
router's `hash` location handler. When using the `auto` location handler, the
presence of `#` will cause the `hash` handler to be chosen over the `history`
handlers, despite the lack of a leading `/` in the path (for example `/foo#/bar`.
This makes using anchors with the `history` handler impossible. Ember.js
1.9 will correct this bug, and in 1.8 a deprecation is raised.

## Breaking Changes

Ember.js strives to maintain strict API compatibility across minor releases.
In cases of API inconsistency or where behavior is unspecified, breaking changes
may be introduced to resolve the issue. Additionally, deprecated APIs may
be removed if they were from a previous major release (such as pre-1.0
deprecations).

In this release there are several small breaking changes that may impact your
application.

* `didInsertElement` is now always called on a child view before it is called
on a rendering parent view. In previous releases of Ember.js `didInsertElement`
would often be called first on a parent view, however this behavior was
inconsistent. In general, developers are encouraged
to consider scheduling work into the `afterRender` queue if it includes
accessing DOM not immediately under that view's control.
* Actions defined directly on the controller object
and not in the `actions:` hash have been deprecated since Ember.js 1.0. In
Ember.js 1.8 support for those actions has been removed.
* `Ember.Map` has been tweaked to more closely match the ES6 spec for `Map`. The
`forEach` callback now takes `value,key,map` as arguments. Previously it was passed
`key,value`. This API is private, but several libraries have chosen to use it
despite this. Ember-Data now includes [a polyfill](https://github.com/emberjs/data/blob/master/packages/ember-data/lib/system/map.js). `Ember.OrderedSet`, a super class of `Ember.Map`, has
also had minor ES6 cleanups applied.
to allow consistent usage across the pre-1.8 and 1.8 API.
* Ember.js has long had an run-time flag called `MANDATORY_SETTER`. With this
flag enabled, attempts to set an observed object property without the use of
`Ember.set()` would throw an error (a desirable behavior for development
builds). This runtime flag has been changed to a
standard build-time feature flag named `mandatory-setter`, allowing it to
be removed from production builds entirely.

## Ember.js 1.9 beta

As with any minor release of Ember.js, the current canary branch is forked
to become the next beta. This ensures a constant graduation of features and
improvements from master to release. Builds of beta are made available every
week for six weeks, then promoted to release.

In Ember.js 1.9 several new features and changes will be introduced.

* "Streams" are a new Ember.js internal that replace bindings at the lowest
level of the Ember rendering pipeline. They greatly simplify the implementation
of template helpers and are yet another important step toward the landing of
HTMLBars.
* Handlebars 2.0 will be required for Ember.js 1.9. See [this summary
of the transition](http://emberjs.com/blog/2014/10/16/handlebars-update.html)
for more details.
* Further performance improvements and bugfixes.

## Changelogs

+ [Ember.js 1.8.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.8.0/CHANGELOG.md)
+ [Ember.js 1.9.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.9.0-beta.1/CHANGELOG.md)
