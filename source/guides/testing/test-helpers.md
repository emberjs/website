One of the major hurdles to testing web applications is that all javascript code
is event driven. Event driven code is asynchronous, which means that your code can
be executed out of the intended order.

Here's a simple example of asynchronicity: A user clicks two buttons, one after
the other. The buttons load data from two different servers. One server takes 1
second to respond, and the other takes 100ms.

How can you be sure that both servers have returned data before making assertions
about your application's state in your tests?

Simple -- the assertion code (the "tester") needs to wait for the code being 
tested (the "testee") to return to a synchronized state. In the button example
above, the system is synchronized when both servers have returned data to your
application.

Ember includes several helpers to facilitate integration testing. There are two 
types of helpers: **asynchronous** and **synchronous**.

All of Ember's test helpers ensure that your application is back in a synchronized
state when your test makes its assertions. This saves you from having to wrap
your code with boilerplate test code that makes your tests more difficult to read.

### Asynchronous Helpers

Asynchronous helpers are "aware" of asynchronous behavior within your application,
and wait for it to complete before proceeding, making it possible to write
deterministic tests.

* `visit(url)`
  - Visits the given route and returns a promise that fulfills when all resulting 
    async behavior is complete.
* `fillIn(selector, context, text)`
  - Fills in the selected input with the given text and returns a promise that 
    fulfills when all resulting async behavior is complete.
* `click(selector)`
  - Clicks an element and triggers any actions triggered by the element's `click` 
    event and returns a promise that fulfills when all resulting async behavior 
    is complete.
* `keyEvent(selector, type, keyCode)`
  - Simulates a key event type, e.g. `keypress`, `keydown`, `keyup` with the 
    desired keyCode on element found by the selector.
* `triggerEvent(selector, type, options)`
  - Triggers the given event, e.g. `blur`, `dblclick` on the element identified 
    by the provided selector.
* `andThen(callback)`
  - Waits for all async helpers to complete, then runs the `callback` function.
    Use `andThen` to run synchronous helpers in order to make assertions about
    your application.

### Synchronous Helpers

Synchronous helpers are performed immediately when triggered.

* `find(selector, context)`
  - Finds an element within the app's root element and within the context 
    (optional). Scoping to the root element is especially useful to avoid 
    conflicts with the test framework's reporter, and this is done by default
    if the context is not specified.
* `currentPath()`
  - Returns the current path.
* `currentRouteName()`
  - Returns the currently active route name.
* `currentURL()`
  - Returns the current URL.

### Using sync and async helpers together

All of your tests will include both synchronous and asynchronous helpers.
Here's an example of how the different test helpers are intended to work
together.

```javascript
test("simple test", function(){
  expect(1); // Ensure that we will perform one assertion

  visit("/posts/new");
  fillIn("input.title", "My new post");
  click("button.submit");

  // Wait for asynchronous helpers above to complete
  andThen(function() {
    equal(currentRouteName(), "post");
    equal(currentPath(), "post");
    equal(currentURL(), "/posts/my-new-post");

    equal(find("ul.posts li:last").text(), "My new post");
  });
});
```

### Custom Test Helpers

`Ember.Test.registerHelper` and `Ember.Test.registerAsyncHelper` are used to 
register test helpers that will be injected when `App.injectTestHelpers` is 
called. The difference between `Ember.Test.registerHelper` and 
`Ember.Test.registerAsyncHelper` is that the latter will not run until any 
previous async helper has completed and any subsequent async helper will wait 
for it to finish before running.

The helper method will always be called with the current Application as the 
first parameter. Helpers need to be registered prior to calling 
`App.injectTestHelpers()`.

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

<a class="jsbin-embed" href="http://jsbin.com/bahas/embed?output">Custom Test Helpers</a>
