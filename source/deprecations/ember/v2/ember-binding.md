---
id: ember-metal.binding
name: Ember.Binding
until: 3.0.0
since: 2.7
---
`Ember.Binding` has not been needed for some time and is deprecated in favor of
computed properties and services (depending on what you were binding to). It is
recommended that you take the following actions:

1. Refactor global bindings to services
2. Refactor `oneWay` bindings to `readOnly` computed properties
3. Refactor all other bindings to `alias` computed properties

The [guide on services]
(https://guides.emberjs.com/v2.5.0/applications/services/) is a good place
to start for creating and consuming services to replace your global bindings.
In general though, you will replace your global with a service and consume it
like this:

```js
export default Ember.Component.extend({
  // will load the service in file /app/services/cool-service.js
  coolService: Ember.inject.service()
});
```

This would replace a binding that may have looked like this:

```js
export default Ember.Component.extend({
  boringObjectBinding: 'MyApp.boringObject'
});
```

Refactoring local bindings to computed properties can be achieved with
less work:

If you had this:

```js
export default Ember.Component.extend({
  thingContainer: …,
  thingOneBinding: Ember.Binding.oneWay('thingContainer.thingOne'),
  thingTwoBinding: 'thingContainer.thingTwo'
});
```

You could change it to this:

```js
export default Ember.Component.extend({
  thingContainer: …,
  thingOne: Ember.computed.readOnly('thingContainer.thingOne'),
  thingTwo: Ember.computed.alias('thingContainer.thingTwo')
});
```

See the [guide on computed properties]
(https://guides.emberjs.com/v2.5.0/object-model/computed-properties/) for
further reading.
