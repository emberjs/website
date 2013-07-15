Ember includes several helpers to facilitate integration testing. These helpers are "aware" of (and wait for) asynchronous behavior within your application, making it much easier to write deterministic tests.

[QUnit](http://qunitjs.com/) is the default testing framework for this package, but others are supported through third-party adapters.

### Setup
In order to integration test the Ember application, you need to run the app within your test framework. Set the root element of the application to an arbitrary element you know will exist. It is useful, as an aid to test-driven development, if the root element is visible while the tests run. Note: Do not use #qunit-fixture.

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

### Helpers

* `visit(url)`
 - Visits the given route and returns a promise that fulfills when all resulting async behavior is complete.
* `find(selector, context)`
 - Finds an element within the app's root element and within the context (optional). Scoping to the root element is especially useful to avoid conflicts with the test framework's reporter.
* `fillIn(input_selector, text)`
 - Fills in the selected input with the given text and returns a promise that fulfills when all resulting async behavior is complete.
* `click(selector)`
  - Clicks an element and triggers any actions triggered by the element's `click` event and returns a promise that fulfills when all resulting async behavior is complete.
* `wait()`
  - Returns a promise that fulfills when all async behavior is complete.

### Writing tests

Almost every test has a pattern of visiting a route, interacting with the page (using the helpers), and checking for expected changes in the DOM.

Examples:

```javascript
test("root lists first page of posts", function(){
  visit("/").then(function() {
    equal(find(".post").length, 5, "The first page should have 5 posts");
    // Assuming we know that 5 posts display per page and that there are more than 5 posts
  });
});
```

The helpers that perform actions return a promise that fulfills when all asynchronous behavior has completed.

```javascript
test("creating a post displays the new post", function(){
  visit("/posts/new").then(function() {
    return fillIn(".post-title", "A new post");
  }).then(function() {
    return fillIn(".post-author", "John Doe");
  }).then(function() {
    return click("button.create");
  }).then(function() {
    ok(find("h1:contains('A new post')").length, "The post's title should display");
    ok(find("a[rel=author]:contains('John Doe')").length, "A link to the author should display");
  });
});
```

For convenience, helpers can be chained:

```javascript
test("creating a post displays the new post", function() {
  visit("/posts/new")
  .fillIn(".post-title", "A new post")
  .fillIn(".post-author", "John Doe")
  .click("button.create")
  .then(function() {
    ok(find("h1:contains('A new post')").length, "The post's title should display");
    ok(find("a[rel=author]:contains('John Doe')").length, "A link to the author should display");
  });
});
```

### Creating your own test helpers
`Ember.Test.registerHelper` is used to register a test helper that will be injected when `App.injectTestHelpers` is called.
The helper method will always be called with the current Application as the first parameter. Helpers that cause asynchronous behavior should return `wait()` to return a promise that will resolve when that asynchronous behavior is complete.

For example:

```javascript
Ember.Test.registerHelper('dblclick', function(app, selector, context) {
  var $el = findWithAssert(selector, context);
  Ember.run(function() {
    $el.dblclick();
  });
  return wait();
});
```

**(Please note: Only development builds of Ember include the testing package.)**
