--- 
title: Ember 1.0 Prerelease
---

Today, Ember 1.0 Prerelease is out!

READMORE

## What's New

*Incomplete*

* Router
* Lots of bug fixes
* `getPath` merged into `get`
* Updated jQuery requirement to 1.7
* Unbundled Handlebars, allows for including runtime only
* ObjectProxy
* Deprecated: ViewStates
* Removed: Deprecated label wrapping behavior for Checkboxes
* Changes to default template context
* Turned on VIEW_PRESERVES_CONTEXT by default (are there any problems
  with using this?)
* Remove deprecated functionality from get/set.
* With/as helper
* Each/in helper
* Removed binding transforms in favor of computed properties
* Added array sorting
* Removed async transitions (were these in 0.9.8.1?)
* StateManager now favors `transitionTo` instead of `goToState`
* Changes to sendEvent signature
* Renamed fire to trigger
* Added one-time event listeners
* willWatch/didUnwatch
* Removed: Do not run functions passed to Ember.assert, Ember.warn, and Ember.deprecate
* Remove data-tag-name "feature" from `<script>` tags
* Deprecate Ember.Tabs
* Double colon class syntax
* canInvoke/tryToInvoke
* Remove deprecated support for text/html for handlebars

## Known Issues, Will Be Fixed

*Incomplete*

* Router API is not finalized, though conceptually it's pretty solid
* Ember Data is not yet merged
* Some memory leaks
* Possible changes to the operation of `Ember.Object.create`
* Not fully tested in older browsers

## Cleaned up CHANGELOG

This could use further cleaning

* destroy previous currentView
* Change {{action}} API for more explicit contexts
* Add connectControllers convenience
* Assert that transitionTo at least matched a state
* Delay routing while contexts are loading
* Also rename trySetPath to trySet
* Replaced getPath/setPath with get/set
* Remove LEGACY_HANDLEBARS_TAG flag
* Add two new core methods to allow invoking possibly unknown methods on objects
* Change ternary syntax to double colon sytax
* Add tests for ternary operator in class bindings
* Test for defined Router lacking App(View|Controller)
* Allow alternate clicks for href handling - Fixes #1096
* Respect initialState when transitioning to parent of current state - Fixes #1144
* add reverseObjects
* Fixing rootURL when path is empty
* HistoryLocation appends paths to router rootURL
* Make Ember.Logger support the 'info' and 'debug' methods on fallback (for IE8).
* Support currentView on init if ContainerView is created with one
* {{bindAttr class="this"}} now works; fixes #810
* Allow connectOutlet(outletName, name, context) syntax
* turn on mandatory setter for ember-debug if not set
* Change the default setUnknownProperty to define it before setting.
* {{view}} now evaluates the context of class bindings using the same rules applied to other bindings
* dataTransfer property for drag and drop events
* require jQuery 1.7, no longer accept 1.6
* add mandatory setter assertion
* Add date comparison to Ember.compare
* We use jquery event handling for hashchange/popstate
* Deprecate Ember.Tabs - Fixes #409
* Remove data-tag-name "feature" from <script> tags
* Only register Ember.View.views for non virtual views
* Add support for tabindex in Ember Controls.
* Only push new history when initialURL has changed
* Support basic States inside of Routes
* Refactor context handling for States and Routes
* Make Map copyable
* Assert that path passed to urlFor is valid
* Do not run functions passed to Ember.assert, Ember.warn, and Ember.deprecate
* Allowing developer to turn off verbose stacktrace in deprecation warnings
* Ember.Route.serialize must return a hash
* lazy setup of ComputedProperties
* change convention from var m = meta(obj) to var meta = metaFor(obj)
* add hook for desc for willWatch and didUnwatch
* Call transitionEvent for each nested state - Fixes #977
* Define a 'store' property in ControllerMixin, to avoid proxy-like handling at router initialization (controllers store injection).
* if there is no context, allow for views without controllers
* Add MapWithDefault
* serialize route states recursively
* urlForEvent for a route with a dynamic part doesn't serialize the context
* Don't stopPropagation on action handling by default
* Implement a route's navigateAway event
* Change app.stateManager to app.router
* Allow a one-time event listener on Ember.Evented
* Rename `fire` to `trigger`
* change sendEvent signature from sendEvent(obj, name, …) to sendEvent(obj, name, params) to avoid copying the arguments. Conflicts:
* Deprecate Ember.ViewState
* remove Ember.MixinDelegate
* Call preventDefault on events handled through {{action}}
* Call transitionEvent on initialStates as well as targeted state
* During apply not applyPartial, chains maybe setup, this makes sure they are updated.
* allow computed properties to be overridden
* Change connectOutlet API to prefer Strings
* Fix bug with Ember.Router#route not reflecting redirections in location
* Give Ember.Select prompt an empty value
* Create Ember.ArrayPolyfills
* Rename ArrayUtils to EnumerableUtils
* Use transitionTo rather than goToState
* Improve ArrayUtils by removing unnecessary slices
* Use evented system for dom events on views
* Fix switchToUnwatched so ObjectProxy tests pass.
* Skip mixin properties with undefined values
* Make defineProperty override native properties
* Fix unsupported method errors in older browsers
* Improved Ember.create shim
* Can't use lib/ember.js because we use that for precompiling, so let's use dist/distold instead
* Use `getPath` instead of `get` in computed macros in order to allow 'foo.bar' dependencies
* A route's `serialize` should handle null contexts
* Router.location cannot be null or undefined
* Use 'hash' as default location implementation on Router
* Clean up location stubbing in routable_test
* Instantiate Ember.Location implementation from Router
* Add NoneLocation
* Add options hash syntax to connectOutlet.
* Added 'ember-select' CSS class to Ember.Select, as per the convention with other included views.
* Fix Ember.setPath when used on Ember.Namespaces
* Remove async transitions.
* Enumerate all properties per injection.
* Injections can specify the order they are run.
* Make sortable test deterministic
* Improve invalidation of view's controller prop
* Cleaning up in history location
* Removing lastSetURL from setURL
* Fix bug with computed properties setters not triggering observers when called with a previous value
* Fix failing test
* Adding popstate tests for history based location
* Splitting location implementations from Location
* Use accessors for eventTransitions
* Finish implementation of Sortable mixin
* Move sorting into separate mixin
* Crude sorting on ArrayController
* Split ArrayProxy into content and arrangedContent
* Fix broken upload_latest task by specifying version for github_api
* Add some convenience computed property macros to replace the major usages of binding transforms
* Initial pushState based location implementation
* Support #each foo in this and #with this as bar
* `collection` should take emptyViewClass as string
* Don't update the route if we're routing
* Don't special-case the top-level '/'
* Make routing unwind properly
* Replace occurances of goToState with transitionTo.
* No longer support RunLoop instantiation without `new`.
* Improve naming and code style
* Guard mergeMixins parameters more generally
* Guard against implicit function application by Ember.assert
* Use Ember.assert instead of throw
* Guard against undefined mixins
* Remove unused local variables
* Update gems
* Enable selection by value in Ember.Select.
* Update build URL
* Fix issue with Ember.Select when reselecting the prompt
* Call setupStateManager in initialize, not in didBecomeReady
* Let ES5 browsers actually work
* Lookup event transitions recursively in the ancestor states.
* Support global paths in the with/as helper. Fixes #874
* Views should inherit controllers from their parent
* Semi-hackish memory management for Ember.Application
* Transition to root to enable the back-button
* Insert ApplicationView by default
* Respect href parameter for {{action}}
* Allow setting `target` on `ObjectController`
* Remove deprecated functionality from get/set
* urlFor should raise an error when route property is not defined
* fix build by checking VIEW_PRESERVES_CONTEXT
* Only call formatURL if a location is defined
* URL generation takes into account location type
* Rename templateContext to context
* Change default template context to controller
* Removes deprecated label wrapping behavior and value property of Ember.Checkbox
* ControllerObject class can be initialized with target, controllers and view properties
* Add Ember.State.transitionTo
* Wire up {{action}} to emit URLs
* Use standard StateManager send/sendRecursively and convert state method arguments to include options hash when necessary.
* Correct state transition name to reflect StateMachine state nesting.
* Add urlFor to Router
* make transitionEvent on state manager configurable
* The router's initialState is `root`
* Add redirectsTo in routes
* Make identical assertion messages distinguishable
* Check that tests don't leave open RunLoops behind
* Better Handlebars log helper
* Disallow automatic creating of RunLoops during testing; Require manual Ember.run setup.
* ObjectController
* rename location `style` to `implementation` and add `registerImplementation` method to ease custom implementations
* some sugar for Router initialization
* Fix initialization with non routable stateManager
* bindAttr should work with global paths
* Unbundled Handlebars
* Add Ember.Controller and `connectOutlet`
* Initial implementation of outlets
* Implement modelType guessing.
* Add support for modelType in the router
