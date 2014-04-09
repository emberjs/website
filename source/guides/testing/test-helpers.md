One of the major issues in testing web applications is that all code is event-driven, therefore has the potential to be asynchronous (ie output can happen out of sequence from input). This has the ramification that code can be executed in any order.

An example may help here: Let's say a user clicks two buttons, one after another and both load data from different servers. They take different times to respond.

When writing your tests, you need to be keenly aware of the fact that you cannot be sure that the response will return immediately after you make your requests, therefore your assertion code (the "tester") needs to wait for the thing being tested (the "testee") to be in a synchronized state. In the example above, that would be when both servers have responded and the test code can go about its business checking the data (whether it is mock data, or real data).

This is why all Ember's test helpers are wrapped in code that ensures Ember is back in a synchronized state when it makes its assertions. It saves you from having to wrap everything in code that does that, and it makes it easier to read your tests because there's less boilerplate in them

Ember includes several helpers to facilitate integration testing. There are two types of helpers: asynchronous and synchronous.

### Asynchronous Helpers

Asynchronous helpers are "aware" of (and wait for) asynchronous behavior within your application, making it much easier to write deterministic tests.

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

### Custom Test Helpers

`Ember.Test.registerHelper` and `Ember.Test.registerAsyncHelper` are used to register test helpers that will be injected when `App.injectTestHelpers` is called. The difference between `Ember.Test.registerHelper` and `Ember.Test.registerAsyncHelper` is that the latter will not run until any previous async helper has completed and any subsequent async helper will wait for it to finish before running.

The helper method will always be called with the current Application as the first parameter. Helpers need to be registered prior to calling `App.injectTestHelpers()`.

Here is an example of a non-async helper:

```javascript
Ember.Test.registerHelper('shouldHaveElementWithCount', 
  function(app, selector, n, context) {
    var el = findWithAssert(selector, context);
    var count = el.length;
    equal(n, count, 'found ' + count + ' times');
  }
);

// shouldHaveElementWithCount("ul li", 3);
```

Here is an example of an async helper:

```javascript
Ember.Test.registerAsyncHelper('dblclick', 
  function(app, selector, context) {
    var $el = findWithAssert(selector, context);
    Ember.run(function() {
      $el.dblclick();
    });
  }
);

// dblclick("#person-1")
```

Async helpers also come in handy when you want to group interaction
into one helper. For example:

```javascript
Ember.Test.registerAsyncHelper('addContact',
  function(app, name, context) {
    fillIn('#name', name);
    click('button.create');
  }
);

// addContact("Bob");
// addContact("Dan");
```

#### Example

Here is an example of using both `registerHelper` and `registerAsyncHelper`.

<a class="jsbin-embed" href="http://jsbin.com/yiven/2/embed?js,output">Custom Test Helpers</a>