--- 
title: Ember 1.0 Prerelease
author: Peter Wagenet
tags: Releases, Version 1.x, Prerelease, 2012, Router
responsive: true
---

We're pleased to announce the Ember 1.0 Prerelease. It's been a couple
of months since our 0.9.8.1 release and a lot has changed. By making
this prerelease available we're giving you the opportunity to try out
the feature set for 1.0. Read on to learn what's new along with a few
caveats.

READMORE

## What's New

### Router

Ember.js is all about giving you the tools to build ambitious apps on
the web. Here's the thing about ambitious apps: they usually have state.
Lots of state. And the bigger your app gets, the harder keeping all
of it in your head becomes.

Part of being an app on the web is taking advantages of the browser's
strengths. In particular, the fact that we have URLs to describe what
we see on our screen is an advantage over native applications. Your
users want to be able to share that URL on Twitter or Facebook and have
 their friends see what they're seeing.

Ember 1.0 Prerelease includes what we think is the most advanced tool
for modeling your application's state: `Ember.Router`. The router allows
you to describe the state of your application as discrete objects, which
means it's impossible for your application to ever get into a "bad
state." And because the URL is just a serialization of your
application's state, you just tell us how to build the URL and we'll
keep it up-to-date as your users move throughout the application.

We're still making tweaks to the router API to make it as easy as
possible for new users to pick up, but we think that modeling your apps
as discrete states is the way all apps will be built in the future. It's
still new but we believe in a few years it will be as relied on as
automated testing for building the most robust applications possible.

### View Context Changes

In apps built on earlier version of Ember, the `{{#view}}` helper
created a new context for the view. This meant that you had to
explicitly set the context on them. In 1.0, we've made this a bit
simpler. The `{{#view}}` helper no longer changes the context, instead
maintaining the parent context by default. Alternatively, we will use
the `controller` property if provided. You may also choose to directly
override the `context` property. The order is as follows:

1. Specified controller
2. Supplied context (usually by Handlebars)
3. `parentView`'s context (for a child of a ContainerView)

In the event that you do need to directly refer to a property on the
view, you can use the `view` keyword, i.e. `{{view.myProp}}`.

### Miscellaneous

* `getPath` and `setPath` have been merged into `get` and `set`
  respectively.
* `Ember.ObjectProxy` - this object proxies to its `content` property.
  Along with this comes `Ember.ObjectController`.
* The `#with` helper now supports assigning an object to a custom
  property name using the format `{{#with path.to.object as custom}}`
* The `#each` helper also allows for a custom property using the format
  `{{#each custom in path.to.array}}`.
* `Ember.SortableMixin` - this mixin can be added to array-like objects
  for sorting functionality.
* `Ember.Evented#one` has been added for one time events.
* `Ember.View#classNameBindings` and `bindAttr class` now support the
  double colon syntax: `myProperty:enabledClass:disabledClass`.
* `Ember.Object#canInvoke`, `tryInvoke` - simplifies checking to see if
  a method can be invoked on the object.
* jQuery 1.6 is no longer supported. You must use 1.7 or greater.
* Handlebars is no longer bundled with Ember. This allows you to more
  easily control your version as well as allowing for the runtime only
  version to be used.
* ViewStates are now deprecated.
* Binding transforms have been removed in favor of computed properties.
* Async state transitions have been removed in favor of transitional
  states.
* `Ember.StateManager#transitionTo` should be used instead of
  `goToState`.
* `Ember.Evented#fire` has been renamed to `trigger`.
* `Ember.Tabs` have been deprecated.
* Some existing deprecations have been removed entirely.

For a full list, see the [Changelog](https://github.com/emberjs/ember.js/blob/master/CHANGELOG).


## Known Issues

Since this is a prerelease, there are still some important known issues:

* **Router** - The Router API is not finalized. Conceptually, things
  are pretty stable, but API details are likely to change.
* **Ember.Object.create** - We are currently considering changing `create`
  to make it behave more like `setProperties`. If this does
  happen, we will try to maintain backwards compatibility as far as
  possible.
* **Ember Data** - We hope to merge Ember Data into the core Ember project
  before the final 1.0 release.
* **Memory leaks** - There are some known memory leaks. We will fix these
  before the final 1.0 release. [Issue #1165](https://github.com/emberjs/ember.js/issues/1165)
* **Browser support** - We have only done limited testing on older
  browsers so far. We will do more comprehensive testing before the
  final release.
* **Dependent Bindings** - Bindings that depend on other bindings may
  fail on initial connect unless properly ordered. [Issue #1164](https://github.com/emberjs/ember.js/issues/1164)
* **ContainerView and SortableMixin** - Using `ContainerView`, or its
  subclass `CollectionView` (which is used by the `#each` and
  `#collection` helpers), with `SortableMixin` may cause unexpected
  rendering errors. [Issue #800](https://github.com/emberjs/ember.js/issues/800)
