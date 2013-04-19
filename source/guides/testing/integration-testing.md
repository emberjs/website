## Integration Testing

Here is a suggested setup for JavaScript *client-side integration tests,*
which test your Ember app in isolation from the backend. Our tests:

* (re-)instantiate our app,
* simulate user input (with jQuery), and
* check that the results show up in the DOM correctly.

We can also modify and check the state of the application's models
directly, whenever it makes testing easier.

By exercising the entire Ember app, we test that all its (individually simple)
layers work together.

Integration tests have a reputation for being slow and brittle. These
client-side integration tests are not, however, because they do not
require coordinating the backend and the frontend, so they can cover the
bulk of our testing needs.

### Setup

We assume [Mocha](http://visionmedia.github.io/mocha/), but the instructions
should be analogous for other testing frameworks, like
[QUnit](http://qunitjs.com/).

```javascript
// Stop Ember from automatically scheduling run loops with setTimeout. It's
// non-deterministic, which is bad for tests.
Ember.testing = true;

// Re-enable automatic run loops when testing is over, for easy debugging in
// the console.
after(function() { // after all tests have finished
  Ember.testing = false;
});


App.reopen({
  // Use a separate root element so we don't interfere with the test reporter.
  rootElement: '#test-app-container'
});

// Wait to initialize until we are done setting up.
App.deferReadiness();

before(function(done) { // before any tests have started
  // Now that the DOM is ready, add the root element.
  $('body').append('<div id="test-app-container"></div>');

  Ember.run(function() {
    // We are done setting up. The app can now initialize.
    App.advanceReadiness();

    // This `before` handler blocks the test suite until the callback (done)
    // is called. App.then fires when the app has finished initializing.
    App.then(function() {
      done();
    });
  });
});


// Reset the entire app before each test.
beforeEach(function() {
  Ember.run(function() {
    App.reset();
  });
});


// Do not muck with the URL, or URL state will leak between tests.
App.Router.reopen({
  location: 'none'
});


// Use the fixture adapter to pick up fixtures from App.Blog.FIXTURES, etc.
App.Store.reopen({
  adapter: DS.FixtureAdapter.extend({
    // Make the adapter deterministic.
    simulateRemoteResponse: false
  })
});
```

#### Konacha

If you use [Konacha](https://github.com/jfirebaugh/konacha) (Mocha on Rails),
remember to additionally stop Konacha from clearing out the `<body>` element:

```javascript
// Disable Konacha's resetting. We bring our own reset for Ember.
Konacha.reset = function() { };
```

### The Run Loop

Because we have disabled the automatic scheduling of run loops (`Ember.testing
= true`), anything that affects the state of the Ember app has to be wrapped
in `Ember.run`, or you will get an error message ("assertion failed: You have
turned on testing mode, which disabled the run-loop's autorun. You will need
to wrap any code with asynchronous side-effects in an Ember.run"). For
example:

```javascript
Ember.run(function() { $('button.foo').click(); });
// Now test that things have appeared in the DOM.
```

`Ember.run` ensures that any state changes will have finished by the time it
returns.
