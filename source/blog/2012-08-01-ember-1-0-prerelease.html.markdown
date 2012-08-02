--- 
title: Ember 1.0 Prerelease
---

We're pleased to announce the Ember 1.0 Prerelease. It's been a couple
of months since our 0.9.8.1 release and a lot has changed. By making
this prerelease available we're giving you the opportunity to try out
the feature set for 1.0. Read on to learn what's new along with a few
caveats.

READMORE

## What's New

### Router

Talk about Router

### View Context Changes

Talk about Context changes

### Miscellaneous

* `getPath` and `setPath` have been merged into `get` and `set`
  respectively.
* `Ember.ObjectProxy` - this object proxies to its `content` property.
  Along with this comes `Ember.ObjectController`.
* The `#with` helper now supports assigning an objet to a custom
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
  to behave to make it behave more like `setProperties`. If this does
  happen, we will try to maintain backwards compatibility as far as
  possible.
* **Ember Data** - We hope to merge Ember Data into the core Ember project
  before the final 1.0 release.
* **Memory leaks** - There are some known memory leaks. We will fix these
  before the final 1.0 release. [Issue #1165](https://github.com/emberjs/ember.js/issues/1165)
* **Browser support** - We have only done limited testing on older
  browsers so far. We will do more comprehensive testing before the
  final release.

*Anything else?*
