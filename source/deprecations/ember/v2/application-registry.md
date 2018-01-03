---
id: ember-application.app-instance-registry
name: Ember.Application#registry / Ember.ApplicationInstance#registry
until: 3.0.0
since: 2.1
---

When the container and registry were split, the registry was added to `Ember.Application` instances (provided to
initializers as the first argument in 2.1) and `Ember.ApplicationInstance` instances (provided to instance initializers
as the first argument). Unfortunately, this was done without making it clear that the `.registry` property on
`Ember.Application` instances was private. This lead quite a few addons and applications to directly use the registry.

During the 2.1 cycle a new feature (`ember-registry-container-reform`) was enabled to provide more
public API's to access the `registry` functionality (without exposing all of the private internals).

The following list can be used to migrate from `app.registry.*` usage to the new public API's:

* `app.registry.resolve` -> `app.resolveRegistration`
* `app.registry.register` -> `app.register`
* `app.registry.unregister` -> `app.unregister`
* `app.registry.has` -> `app.hasRegistration`
* `app.registry.option` -> `app.registerOption`
* `app.registry.options` -> `app.registerOptions`
* `app.registry.getOptions` -> `app.registeredOptions`
* `app.registry.optionsForType` -> `app.registerOptionsForType`
* `app.registry.getOptionsForType` -> `app.registeredOptionsForType`
* `app.registry.injection` -> `app.inject`
