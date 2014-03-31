Ember includes several helpers to facilitate integration testing. These helpers are "aware" of (and wait for) asynchronous behavior within your application, making it much easier to write deterministic tests.

[QUnit](http://qunitjs.com/) is the default testing framework for this package, but others are supported through third-party adapters.

### Setup
In order to integration test the Ember application, you need to run the app within your test framework. Set the root element of the application to an arbitrary element you know will exist. It is useful, as an aid to test-driven development, if the root element is visible while the tests run. You can potentially use #qunit-fixture, typically used to contain fixture html for use in tests, but you will need to override css to make it visible.

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

With QUnit, `setup` and `teardown` functions are defined in each test module's configuration. These functions are called for each test in the module. If you are using a framework other than QUnit, use the hook that is called before each individual test.

Before each test, reset the application: `App.reset()` completely resets the state of the application.

```javascript
module("Integration Tests", {
  setup: function() {
    App.reset();
  }
});
```

### Asynchronous Helpers

Asynchronous helpers will wait for other asynchronous helpers triggered prior to complete before starting.

* `visit(url)`
 - Visits the given route and returns a promise that fulfills when all resulting async behavior is complete.
* `fillIn(input_selector, text)`
 - Fills in the selected input with the given text and returns a promise that fulfills when all resulting async behavior is complete.
* `click(selector)`
  - Clicks an element and triggers any actions triggered by the element's `click` event and returns a promise that fulfills when all resulting async behavior is complete.
* `keyEvent(selector, type, keyCode)`
  - Simulates a key event type, e.g. `keypress`, `keydown`, `keyup` with the desired keyCode on element found by the selector.
* `triggerEvent(selector, type, options)`
  - Triggers the given event, e.g. `blur`, `dblclick` on the element identified by the provided selector.

### Synchronous Helpers

Synchronous helpers are performed immediately when triggered.

* `find(selector, context)`
 - Finds an element within the app's root element and within the context (optional). Scoping to the root element is especially useful to avoid conflicts with the test framework's reporter.
* `currentPath()`
  - Returns the current path.
* `currentRouteName()`
  - Returns the currently active route name.
* `currentURL()`
  - Returns the current URL.

### Wait Helpers

The `andThen` helper will wait for all preceding asynchronous helpers to complete prior to progressing forward. Let's take a look at the following example.

```javascript
test("simple test", function(){
  expect(1); // Ensure that we will perform one assertion

  visit("/posts/new");
  fillIn("input.title", "My new post");
  click("button.submit");

  // Wait for asynchronous helpers above to complete
  andThen(function() {
    equal(find("ul.posts li:last").text(), "My new post");
  });
});
```

Note that in the example above we are using the `andThen` helper. This will wait for the preceding asynchronous test helpers to complete and then calls the function which was passed to it as an argument.

### Writing tests

Almost every test has a pattern of visiting a route, interacting with the page (using the helpers), and checking for expected changes in the DOM.

Examples:

```javascript
test("root lists first page of posts", function(){
  visit("/");
  andThen(function() {
    equal(find(".post").length, 5, "The first page should have 5 posts");
    // Assuming we know that 5 posts display per page and that there are more than 5 posts
  });
});
```

The helpers that perform actions use a global promise object and automatically chain onto that promise object if it exists. This allows you write your tests without worrying about async behaviour your helper might trigger.

```javascript
test("creating a post displays the new post", function(){
  visit("/posts/new");
  fillIn(".post-title", "A new post");
  fillIn(".post-author", "John Doe");
  click("button.create");
  andThen(function() {
    ok(find("h1:contains('A new post')").length, "The post's title should display");
    ok(find("a[rel=author]:contains('John Doe')").length, "A link to the author should display");
  });
});
```

### Creating your own test helpers
`Ember.Test.registerHelper` and `Ember.Test.registerAsyncHelper` are used to register test helpers that will be injected when `App.injectTestHelpers` is called. The difference between `Ember.Test.registerHelper` and `Ember.Test.registerAsyncHelper` is that the latter will not run until any previous async helper has completed and any subsequent async helper will wait for it to finish before running.

The helper method will always be called with the current Application as the first parameter. Helpers need to be registered prior to calling `App.injectTestHelpers()`. 

For example:

```javascript
Ember.Test.registerAsyncHelper('dblclick', function(app, selector, context) {
  var $el = findWithAssert(selector, context);
  Ember.run(function() {
    $el.dblclick();
  });
});
```

### Test adapters for other libraries
If you use a library other than QUnit, your test adapter will need to provide methods for `asyncStart` and `asyncEnd`. To facilitate asynchronous testing, the default test adapter for QUnit uses methods that QUnit provides: (globals) `stop()` and `start()`.

**(Please note: Only development builds of Ember include the testing package. The ember-testing package is not included in the production build of Ember. The package can be loaded in your dev or qa builds to facilitate testing your application. By not including the ember-testing package in production, your tests will not be executable in a production environment.)**
