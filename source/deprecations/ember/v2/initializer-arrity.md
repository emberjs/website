---
id: ember-application.app-initializer-initialize-arguments
name: Initializer Arity
until: 3.0.0
since: 2.1
---

In prior versions of Ember initializers have taken two arguments (generally labeled as
`container` and `application`). Starting with Ember 2.1 providing two arguments to an
`initializer` will trigger a deprecation.

The following initializer for Ember 2.0 will trigger a deprecation:

```javascript
export function initialize(container, application) {
  application.inject('route', 'service:session');
}

export default {
  name: 'inject-session',
  initialize: initialize
}
```

To clear the deprecation, remove the first argument (`container` in the above example):

```javascript
export function initialize(application) {
  application.inject('route', 'service:session');
}

export default {
  name: 'inject-session',
  initialize: initialize
}
```

In some cases an addon might need to support both versions of Ember with the same initializer,
one way to do this without triggering a deprecation would be the following (using the same
example as above):

```javascript
export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('route', 'service:session');
}

export default {
  name: 'inject-session',
  initialize: initialize
}
```
