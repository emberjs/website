Integration tests are generally used to test important workflows within your application. They emulate user interaction and confirm expected results.

### Setup

In order to integration test the Ember application, you need to run the app within your test framework. Set the root element of the application to an arbitrary element you know will exist. It is useful, as an aid to test-driven development, if the root element is visible while the tests run. You can potentially use #qunit-fixture, which is typically used to contain fixture html for use in tests, but you will need to override css to make it visible.

```javascript
App.rootElement = '#arbitrary-element-to-contain-ember-application';
```

This hook defers the readiness of the application, so that you can start the app when your tests are ready to run. It also sets the router's location to 'none', so that the window's location will not be modified (preventing both accidental leaking of state between tests and interference with your testing framework).

```javascript
App.setupForTesting();
```

This injects the test helpers into the window's scope.

```javascript
App.injectTestHelpers();
```

With QUnit, `setup` and `teardown` functions can be defined in each test module's configuration. These functions are called for each test in the module. If you are using a framework other than QUnit, use the hook that is called before each individual test.

After each test, reset the application: `App.reset()` completely resets the state of the application.

```javascript
module('Integration Tests', {
  teardown: function() {
    App.reset();
  }
});
```

### Test adapters for other libraries

If you use a library other than QUnit, your test adapter will need to provide methods for `asyncStart` and `asyncEnd`. To facilitate asynchronous testing, the default test adapter for QUnit uses methods that QUnit provides: (globals) `stop()` and `start()`.

**Please note:**

The `ember-testing` package is not included in the production builds, only development builds of Ember include the testing package. The package can be loaded in your dev or qa builds to facilitate testing your application. By not including the ember-testing package in production, your tests will not be executable in a production environment.
