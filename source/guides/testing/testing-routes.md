Testing routes can be done both via integration and unit tests. Integration tests will likely provide better tests for routes because the routes typically are used to perform transitions and load data, all of which are more easily tested via integration tests.

It's possible to unit test routes using `moduleFor`. Actions that have bubbled up from nested routes would be a common thing to unit test in routes.

For example, let's say we'd like to have an alert that can be triggered from anywhere within our application. The alert function `displayAlert` should be put into the `ApplicationRoute` because all actions & events bubble up to it from any sub-route, controller or view.

```javascript
App.ApplicationRoute = Em.Route.extend({
  actions: {
    displayAlert: function(text) {
      this._displayAlert(text);
    }
  },

  _displayAlert: function(text) {
    alert(text);
  }
});
```

In this route, we have an action `displayAlert` which calls a _private_ function on the route. This allows us to keep our action logic minimal and makes the logic inside `_displayAlert` more testable.

Here is an example of how to unit test this route:

```javascript
// common unit testing setup
emq.globalize();
setResolver(App.__container__);
App.setupForTesting();

// we need to store a reference to the window.alert function in order to be able 
// to stub the action and then restore it afterwards to its original function
var originalAlert; 

moduleFor('route:application', 'Unit: route/application', {
  setup: function() { 
    originalAlert = window.alert; // save original function
  },
  teardown: function() {
    window.alert = originalAlert; // restore original functions
  }
});

test('Alert is called on displayAlert', function() {
  expect(1);

  // with moduleFor, the subject returns an instance of the route
  var route = this.subject();

  var expectedText = 'foo';

  // stub window.alert to perform a qunit test
  window.alert = function(text) {
    equal(text, expectedText, 'expected ' + text + ' to be ' + expectedText);
  }

  // call the _displayAlert function which triggers the qunit test above
  route._displayAlert(expectedText);
});
```

#### Example

Here's the above example:

<a class="jsbin-embed" href="http://jsbin.com/witac/2/embed?output">Custom Test Helpers</a>
<script src="http://static.jsbin.com/js/embed.js"></script>