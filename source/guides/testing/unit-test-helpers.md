---
alias: guides/testing/unit/
---

### Globals vs Modules

In the past, it has been difficult to test portions of your Ember application
without loading the entire app as a global. By having your application written
using modules ([CommonJS], [AMD], etc), you are able to require just code that
is to be tested without having to pluck the pieces out of your global
application.

### Unit Testing Helpers

[Ember-QUnit] is the default *unit* testing helper suite for Ember. It can and
should be used as a template for other test framework helpers. It uses your
application's resolver to find and automatically create test subjects for you
using the `moduleFor` and `test` helpers.

A test subject is simply an instance of the object that a particular test is
making assertions about. Usually test subjects are manually created by the
writer of the test.

<!--
* [Ember-QUnit](https://github.com/rwjblue/ember-qunit) - Unit test helpers
  written for QUnit
* [Ember-Mocha](#) - Unit test helpers written for Mocha (to be written)
* [Ember-Jasmine](#) - Unit test helpers written for Jasmine (to be written)
-->

***The unit testing section of this guide will use the Ember-QUnit library, but
the concepts and examples should translate easily to other frameworks.***

### Available Helpers

By including [Ember-QUnit], you will have access to a number of test helpers.

* `moduleFor(fullName [, description [, callbacks]])`
 - **fullName**: The full name of the unit, (ie. `controller:application`,
    `route:index`, etc.)
 - **description**: the description of the module
 - **callbacks**: normal QUnit callbacks (setup and teardown), with addition to
    needs, which allows you specify the other units the tests will need.

* `moduleForComponent(name [, description [, callbacks]])`
 - **name**: the short name of the component that you'd use in a template, (ie.
    `x-foo`, `ic-tabs`, etc.)
 - **description**: the description of the module
 - **callbacks**: normal QUnit callbacks (setup and teardown), with addition to
    needs, which allows you specify the other units the tests will need.

* `moduleForModel(name [, description [, callbacks]])`
 - **name**: the short name of the model you'd use in store
    operations (ie. `user`, `assignmentGroup`, etc.)
 - **description**: the description of the module
 - **callbacks**: normal QUnit callbacks (setup and teardown), with addition to
    needs, which allows you specify the other units the tests will need.

* `test`
 - Same as QUnit `test` except it includes the `subject` function which is used
   to create the test subject.
* `setResolver`
 - Sets the resolver which will be used to lookup objects from the application
   container.

### Unit Testing Setup

In order to unit test your Ember application, you need to let Ember know it is in
test mode. To do so, you must call `Ember.setupForTesting()`.

```javascript
Ember.setupForTesting();
```

The `setupForTesting()` function call makes ember turn off its automatic run
loop execution. This gives us an ability to control the flow of the run loop
ourselves, to a degree. Its default behaviour of resolving all promises and
completing all async behaviour are suspended to give you a chance to set up
state and make assertions in a known state. In other words, you know that if you
run "visit" to get to a particular URL, you can be sure the URL has been visited
and that's the only behaviour that has transpired. If we didn't use this mode,
our assertions would most likely be executed before the async behaviour had taken place, so
our assertion results would be unpredictable.

With a module-based application, you have access to the unit test helpers simply
by requiring the exports of the module. However, if you are testing a global
Ember application, you are still able to use the unit test helpers. Instead of
importing the `ember-qunit` module, you need to make the unit test helpers
global with `emq.globalize()`:

```javascript
emq.globalize();
```

This will make the above helpers available globally.

### The Resolver

The Ember resolver plays a huge role when unit testing your application. It
provides the lookup functionality based on name, such as `route:index` or
`model:post`.

If you do not have a custom resolver or are testing a global Ember application,
the resolver should be set like this:

***Make sure to replace "App" with your application's namespace in the following line***

```javascript
setResolver(Ember.DefaultResolver.create({ namespace: App }))
```

Otherwise, you would require the custom resolver and pass it to `setResolver`
like this _(ES6 example)_:

```javascript
import Resolver from './path/to/resolver';
import { setResolver } from 'ember-qunit';
setResolver(Resolver.create());
```

[CommonJS]: http://wiki.commonjs.org/wiki/CommonJS  "CommonJS"
[AMD]: http://requirejs.org/docs/whyamd.html "AMD"
[Ember-QUnit]: https://github.com/rwjblue/ember-qunit "Ember QUnit"
