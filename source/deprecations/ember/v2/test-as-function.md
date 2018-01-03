---
id: ember-debug.deprecate-test-as-function
name: Function as test in Ember.deprecate, Ember.warn, Ember.assert
until: 2.5.0
since: 2.2
---

Calling `Ember.deprecate`, `Ember.warn` or `Ember.assert` with a function as test argument is deprecated.

You can no longer pass arguments of type `function` to these methods. Following calls will trigger deprecations:

```javascript
const message = 'Test message.';
const options = { id: 'test', until: '3.0.0' };

// passing function
Ember.deprecate(message, function() {
  return true;
}, options);

const myConstructor = {}.constructor;

// passing constructor (also a function)
Ember.warn(message, myConstructor, options);

// passing function with double arrow syntax
Ember.assert(message, () => true, options);
```

[Demo.](http://ember-twiddle.com/34d36b9121e017d2388f)

##### Refactoring

You have 3 options to refactor second argument from `function` to `boolean`:

1. Use [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
2. Use `!!Constructor` for constructors.
3. Pass `boolean` directly instead of wrapping it in function.

Example:

``` javascript
// ... message, options omitted for brevity

// passing IIFE (1)
Ember.deprecate(message, (function() {
	return true;
})(), options);

const myConstructor = {}.constructor;

// passing !!constructor (2)
Ember.warn(message, !!myConstructor, options);

// passing boolean directly (3)
Ember.assert(message, true, options);
```

[Demo.](http://ember-twiddle.com/ed90d0c7812914f09a3f)

In a future version functions will be treated as truthy values instead of being executed.
