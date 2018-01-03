---
id: ember-application.app-instance-container
name: Ember.ApplicationInstance#container
until: 3.0.0
since: 2.1
---

When instance initializers were added, using `appInstance.container.lookup` was suggested in lieu of using the first argument
to initializers. Unfortunately, the `container` system has always been private and the previous initializer deprecation led
users down the wrong path.

During the 2.1 cycle a new feature (`ember-registry-container-reform`) was enabled to provide more
public API's for accessing the container for looking up instances without exposing all of the private internals.

Please refactor from using `appInstance.container.lookup` to `appInstance.lookup`.

Before:

```app/initializers/preload-store.js
export function initialize(appInstance) {
  let store = appInstance.container.lookup('service:store');

  store.pushPayload(`<payload here>`);
}

export default {
  name: 'preload-store',
  initialize: initialize
}
```

After:

```app/instance-initializers/preload-store.js
export function initialize(appInstance) {
  let store = appInstance.lookup('service:store');

  store.pushPayload(`<payload here>`);
}

export default {
  name: 'preload-store',
  initialize: initialize
}
```
