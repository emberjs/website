Unit tests are generally used to test a small piece of code and ensure that it is doing what was
intended. Unlike integration tests, they are narrow in scope and do not require the Ember
application to be running.

### Globals vs Modules

In the past, it has been difficult to test portions of your Ember application without loading the
entire app as a global. By having your application written using modules (CJS, AMD, etc), you are able
to require the code that is to be tested without having to pluck the pieces off of your global
application.

### Unit Testing Helpers

[Ember-QUnit](https://github.com/rpflorence/ember-qunit) is the default *unit* testing helper suite for
Ember. It can and should be used as a template for other test framework helpers.

<!--
* [Ember-QUnit](https://github.com/rpflorence/ember-qunit) - Unit test helpers written for QUnit
* [Ember-Mocha](#) - Unit test helpers written for Mocha (to be written)
* [Ember-Jasmine](#) - Unit test helpers written for Jasmine (to be written)
-->

***The unit testing section of this guide will use the Ember-QUnit library, but the concepts and
examples should translate easily to other frameworks.***

### Available Helpers

By including [Ember-QUnit](), you will have access to a number of test helpers.

* `moduleFor(fullName, description, callbacks)`
 - description goes here ....
* `moduleForComponent(fullName, description, callbacks)`
 - description goes here ....
* `moduleForModel(fullName, description, callbacks)`
 - description goes here ....
* `test`
 - description goes here ....
* `setResolver`
 - description goes here ....

### Unit Testing Setup

In order to unit test the Ember application, you need to let Ember know it is in test mode. To do so, you must call `Ember.setupForTesting()`.

```javascript
Ember.setupForTesting();
```

With a module-based application, you have access to the unit test helpers simply by requiring the exports of the module. However, if you are testing a global Ember application, you are still able to use the unit test helpers. Instead of importing the `ember-qunit` module, you need to make the unit test helpers global with `emq.globalize()`:

```javascript
emq.globalize();
```

This will make the above helpers available globally.

### The Resolver

The Ember resolver plays a huge role when unit testing your application. It provides the lookup functionality based on name, such as `route:index` or `model:post`.

If you are testing a global Ember application, the `App.__container__` serves as the resolver.

```javascript
setResolver(App.__container__)
```

If you are using modules, you would require the `ember-qunit` module and call `setResolver` directly on it.

```javascript
var resolver = require('path/to/test/resolver')['default'];
require('ember-qunit').setResolver(resolver);
```
