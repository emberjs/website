_Unit testing methods and computed properties follows previous patterns shown 
in [Unit Testing Basics] because Ember.Route extends Ember.Object._

Testing routes can be done both via integration or unit tests. Integration tests 
will likely provide better coverage for routes because routes are typically used 
to perform transitions and load data, both of which are tested more easily in 
full context rather than isolation.

That being said, sometimes it is important to unit test your routes. For example, 
let's say we'd like to have an alert that can be triggered from anywhere within 
our application. The alert function `displayAlert` should be put into the 
`ApplicationRoute` because all actions and events bubble up to it from 
sub-routes, controllers and views.

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

This is made possible by using `moduleFor`.

In this route we've [separated our concerns](http://en.wikipedia.org/wiki/Separation_of_concerns):
The action `displayAlert` contains the code that is called when the action is 
received, and the private function `_displayAlert` performs the work. While not 
necessarily obvious here because of the small size of the functions, separating 
code into smaller chunks (or "concerns"), allows it to be more readily isolated 
for testing, which in turn allows you to catch bugs more easily.

Here is an example of how to unit test this route:

```javascript

moduleFor('route:application', 'Unit: route/application', {
  setup: function() {
    originalAlert = window.alert; // store a reference to the window.alert
  },
  teardown: function() {
    window.alert = originalAlert; // restore original functions
  }
});

test('Alert is called on displayAlert', function() {
  expect(1);

  // with moduleFor, the subject returns an instance of the route
  var route = this.subject(),
      expectedText = 'foo';

  // stub window.alert to perform a qunit test
  window.alert = function(text) {
    equal(text, expectedText, 'expected ' + text + ' to be ' + expectedText);
  }

  // call the _displayAlert function which triggers the qunit test above
  route._displayAlert(expectedText);
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/kazenefuku/1/embed?output">Custom Test Helpers</a>

<script src="http://static.jsbin.com/js/embed.js"></script>

[Unit Testing Basics]: /guides/testing/unit-testing-basics
[separated our concerns]: http://en.wikipedia.org/wiki/Separation_of_concerns
