---
id: ember-view.current-state
name: Ember.Component#currentState
until: 2.3.0
since: 2.1
---

The `currentState` property on `Ember.Component` instances is a private property that Ember uses
internally to deal with the various states a component can be in (in DOM, pre-render, destroying, etc). Unfortunately,
this removes a pretty common term (`currentState` might be used for many things in a user-land component).

In Ember 2.1 the internal `.currentState` property has been moved to `_currentState` to avoid conflicts.

Please keep in mind that `.currentState` / `._currentState` is still private and should not be used/relied upon
outside of Ember internals.
