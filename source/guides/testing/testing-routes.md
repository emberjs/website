Testing routes can be done both via integration and unit tests. Integration tests will likely provide better tests for routes because the routes typically are used to perform transitions and load data, all of which is more easily tested via integration tests.

Unit tests are possible using `moduleFor`. A common example of what may be tested in a route would be actions which are bubbled up to from nested routes.

Because Ember.Route just extends Ember.Object using 'ember-qunit' makes it simple to unit test our methods and actions.

####Testing before model example

Lets take a look at a passing test for a Route method:

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/1/embed?javascript">Unit Testing Route "Methods"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

We start by looking at a simple route with a beforeModel method (hook)

```javascript
App.IndexRoute = Ember.Route.extend({

  beforeModel: function(transition){
    if(transition.targetName === 'foo'){
      this.transitionTo('bar');
    }
  },
  model: function() {
    return this.store.find('post');
  }
});
```
After initial testing setup, we start by using the `moduleFor` helper to setup our container for our `IndexRoute`

***Note moduleFor only needs to be setup once per module and not per test.***

```javascript
moduleFor('route:index', 'IndexRoute');
```
Next we write an assertion using the `qunit` test method

```javascript
test('transition is aborted if model is undefined', function() {
  expect(1);
  var indexRoute = this.subject(),
      transition = {
        targetName : 'foo'
      };

  //  stub up transitionTo and validate that transitionTo 'bar' is called
  indexRoute.transitionTo = function(location){
    equal(location, 'bar', 'route attempted to transition login');
  },

  indexRoute.beforeModel(transition);

});
```
The `this.subject()` is a helper from the `ember-qunit` library that returns an instance of the `IndexRoute` we injected into the container. For this test we are also mocking a transition object that is expected by beforeModel method.

```javascript

var indexRoute = this.subject(),
    transition = { targetName : 'foo' };

```

Now we can override our transitionTo method and assert the location when we call the beforeModel hook with the stubbed transition object.

```javascript

indexRoute.transitionTo = function(location){
  equal(location, 'bar', 'route attempted to transition login');
}

indexRoute.beforeModel(transition);

```

Again this is a way to unit test a method on a Route, but these hooks are better candidates for Integration testing.

####Testing after model example

Lets take a look at a passing test for an afterModel:

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/1/embed?javascript">Unit Testing Route "Methods"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

We start by looking at a simple route with an afterModel hook

```javascript
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  },
  afterModel: function(model, transition){
    if(model === undefined){
      transition.abort();
    }
  }
});
```
After initial testing setup, we start by using the `moduleFor` helper to setup our container for our `IndexRoute`

***Note moduleFor only needs to be setup once per module and not per test.***

```javascript
moduleFor('route:index', 'IndexRoute');
```
Next we write an assertion using the `qunit` test method

```javascript
test('transition is aborted if model is undefined', function() {
  expect(1);
  var indexRoute = this.subject(),
      aborted = false,
      transition = {
        abort : function() { aborted = true; }
      };

  indexRoute.afterModel(undefined, transition);
  ok(aborted, "Make sure that if undefined is sent into afterModel");
});
```
The `this.subject()` is a helper from the `ember-qunit` library that returns an instance of the `IndexRoute` we injected into the container. For this test we are also mocking a transition object that is used by afterModel.

```javascript
var indexRoute = this.subject(),
    aborted = false,
    transition = {
      abort : function() { aborted = true; }
    };

```

Now we can call our afterModel method and passed undefined as the model and our stubbed transition object.

```javascript
indexRoute.afterModel(undefined, transition);
ok(aborted, "Make sure that if undefined is sent into afterModel");

```

