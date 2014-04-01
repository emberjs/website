Unit testing controllers is very simple using the unit test helper `moduleFor`.

***It can become very easy to let your controllers perform most of the business logic in an Ember application. It is considered best practice to extract out any logic that does not directly impact the template into it's own library.***

Because Ember.Controller just extends Ember.Object using 'ember-qunit' makes it simple to unit test our methods, actions, and computed properties

#### Testing Controller Methods

Lets take a look at a passing test for a method on a controller:

<a class="jsbin-embed" href="http://jsbin.com/hobuq/2/embed?javascript">Unit Testing Controllers "Methods"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

We start by looking at a simple array controller. It has a method `somFunc` that we would like to test.

```javascript

App.PostsController = Ember.ArrayController.extend({

  someFunc: function() {
    return 'someFunc return value';
  }

});

```

After initial testing setup, we start by using the `moduleFor` helper to setup our container for our `PostsController`

***Note moduleFor only needs to be setup once per module and not per test.***

```javascript

moduleFor('controller:posts', 'PostsController');

```
Next we write an assertion using the `qunit` test method

```javascript

test('someFunc returns expected value', function() {
  expect(1);
  var postsController = this.subject();
  equal(postsController.someFunc(), 'someFunc return value');
});

```

The `this.subject()` is a helper from the `ember-qunit` library that returns an instance of the `PostsController` we injected into the container.

```javascript

var postsController = this.subject();

```
Now we can use the `equal` assertion to test that our `someFunc` method on the instance returns what we expect.

```javascript
equal(postsController.someFunc(), 'someFunc return value');
```

Well that nice but what about actions? Let's look at how we can test an action on a controller.

#### Testing Controller Actions

Lets start again with a passing test.

<a class="jsbin-embed" href="http://jsbin.com/laqed/1/embed?javascript">Unit Testing Controllers "Actions"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

We have our PostsController again this time with some computed properties and an action `someAction`.

```javascript
App.PostsController = Ember.ArrayController.extend({

  somePropertySetByAction: 'You need to write tests',
  someOtherProperty: 'And write one for me too',

  someFunctionTriggeredByAction: function(stringPassed) {
    this.set('someOtherProperty', stringPassed);
  },

  actions: {

    someAction: function(stringPassed) {
      this.set('somePropertySetByAction', 'Testing is cool');
      this.someFunctionTriggeredByAction(stringPassed);
    }

  }

});

```
Our `someAction` does a few things. Its sets a property on the controller and also calls a method. Let's write a test!

Again start by using the `moduleFor` helper to setup our container for our `PostsController`

```javascript
moduleFor('controller:posts', 'PostsController');
```

Next write a test to check the action

```javascript
test('PostsController - someAction', function() {
  expect(4);
  var postsController = this.subject();

  equal(postsController.get('somePropertySetByAction'), 'You need to write tests', 'somePropertySetByAction has correct initial value');
  equal(postsController.get('someOtherProperty'), 'And write one for me too', 'someOtherProperty has correct initial value');

  postsController.send('someAction', 'Testing Rocks!');

  equal(postsController.get('somePropertySetByAction'), 'Testing is cool', 'somePropertySetByAction has correct updated value from action');
  equal(postsController.get('someOtherProperty'), 'Testing Rocks!', 'someOtherProperty has correct updated value from param passed to action');
});

```
A few things are going on here. First we get our controller instance

```javascript
var postsController = this.subject();
```
Next were checking the values before the action is triggered

```javascript
equal(postsController.get('somePropertySetByAction'), 'You need to write tests', 'somePropertySetByAction has correct initial value');
equal(postsController.get('someOtherProperty'), 'And write one for me too', 'someOtherProperty has correct initial value');

```
Now we trigger the action on the controller by using the `send` method passing in any params that our action may be expecting

```javascript
postsController.send('someAction', 'Testing Rocks!');
```
Finally we assert that our values have been updated by triggering our action.

```javascript
equal(postsController.get('somePropertySetByAction'), 'Testing is cool', 'somePropertySetByAction has correct updated value from action');
equal(postsController.get('someOtherProperty'), 'Testing Rocks!', 'someOtherProperty has correct updated value from param passed to action');

```

You're becoming a Javascript testing zealot! But what about computed properties? Well... The concepts our very similar, so lets take a look.

#### Testing Controller Computed Properties

Once again we start with a passing test.

<a class="jsbin-embed" href="http://jsbin.com/fixil/1/embed?javascript">Unit Testing Controllers "Computed Properties"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

Our PostsController with some computed properties we would like to test.

```javascript
App.PostsController = Ember.ArrayController.extend({

  someProperty: 'Original Value',

  someComputedProperty: function() {
    return this.get('someProperty') + ' concat stuff';
  }.property('someProperty'),

  someOtherComputedProperty: Ember.computed.alias('someProperty')

});

```

Setup your moduleFor and write a test. This time were testing that our `someProperty`, when set, triggers other properties to update. Pretty common use case.

```javascript
test('PostsController - Testing Computed Properties', function() {
  expect(6);
  var postsController = this.subject();

  equal(postsController.get('someProperty'), 'Original Value', 'someProperty has correct initial value');
  equal(postsController.get('someComputedProperty'), postsController.get('someProperty') + ' concat stuff', 'someComputedProperty has correct initial value');
  equal(postsController.get('someOtherComputedProperty'), postsController.get('someProperty'), 'someOtherComputedProperty has correct initial value');

  postsController.set('someProperty', 'Testing is awesome!');

  equal(postsController.get('someProperty'), 'Testing is awesome!', 'someProperty has correct computed value');
  equal(postsController.get('someComputedProperty'), postsController.get('someProperty') + ' concat stuff', 'someComputedProperty has correct computed value');
  equal(postsController.get('someOtherComputedProperty'), postsController.get('someProperty'), 'someOtherComputedProperty has correct computed value');
});

```

Again we start with a controller instance

```javascript
var postsController = this.subject();
```
Next were checking values before we call `set` on our `someProperty` which should trigger updates to other properties.

```javascript
equal(postsController.get('someProperty'), 'Original Value', 'someProperty has correct initial value');
equal(postsController.get('someComputedProperty'), postsController.get('someProperty') + ' concat stuff', 'someComputedProperty has correct initial value');
equal(postsController.get('someOtherComputedProperty'), postsController.get('someProperty'), 'someOtherComputedProperty has correct initial value');

```
Now we call `set` on our `someProperty` that were testing.

```javascript
postsController.set('someProperty', 'Testing is awesome!');
```
Finally we assert that our values have been updated from updating our `someProperty`.

```javascript
equal(postsController.get('someProperty'), 'Original Value', 'someProperty has correct initial value');
equal(postsController.get('someComputedProperty'), postsController.get('someProperty') + ' concat stuff', 'someComputedProperty has correct initial value');
equal(postsController.get('someOtherComputedProperty'), postsController.get('someProperty'), 'someOtherComputedProperty has correct initial value');

```

Hopefully you can see how easy it is to Unit test. But wait... what about `needs`? What if I want to test that everything is working?

#### Testing Controller Needs

Lets start again with a passing test

<a class="jsbin-embed" href="http://jsbin.com/fixil/2/embed?javascript">Unit Testing Controllers "Needs"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

Our `PostsController` with a `needs` that interacts our `OtherController`.

```javascript
App.PostsController = Ember.ArrayController.extend({

  needs: ['other'],
  otherController: Ember.computed.alias('controllers.other'),

  someProperty: Ember.computed.alias('otherController.someProperty'),
  someComputedProperty: Ember.computed.alias('otherController.someComputedProperty'),
  someOtherComputedProperty: Ember.computed.alias('otherController.otherAnotherComputedProperty')

});

App.OtherController = Ember.Controller.extend({

  someProperty: 'Original Value',

  someComputedProperty: function() {
    return this.get('someProperty') + ' concat stuff';
  }.property('someProperty'),

  otherAnotherComputedProperty: Ember.computed.alias('someProperty')

});

```

This time when we setup our moduleFor we need to pass an object as our third argument that has our `needs`.

```javascript
moduleFor('controller:posts', 'PostsController', {
  needs: ['controller:other']
});
```
Now lest write a test that sets a property on our `needs` controller that updates properties on our `PostsController`

```javascript
test('PostsController - Testing Needs', function() {
  expect(6);
  var postsController = this.subject(),
      otherController = postsController.get('otherController');

  equal(postsController.get('someProperty'), otherController.get('someProperty'), 'someProperty has correct initial value using needs');
  equal(postsController.get('someComputedProperty'), otherController.get('someComputedProperty'), 'someComputedProperty has correct initial value using needs');
  equal(postsController.get('someOtherComputedProperty'), otherController.get('otherAnotherComputedProperty'), 'someOtherComputedProperty has correct initial value using needs');

  otherController.set('someProperty', 'Testing is awesome!');

  equal(postsController.get('someProperty'), otherController.get('someProperty'), 'someProperty has correct updated value using needs');
  equal(postsController.get('someComputedProperty'), otherController.get('someComputedProperty'), 'someComputedProperty has correct updated value using needs');
  equal(postsController.get('someOtherComputedProperty'), otherController.get('otherAnotherComputedProperty'), 'someOtherComputedProperty has correct updated value using needs');
});

```

First we are grabbing an instance of our `PostsController` and also getting the associated controller.

```javascript
var postsController = this.subject(),
    otherController = postsController.get('otherController');
```

Next we check our values before we set the property

```javascript
equal(postsController.get('someProperty'), otherController.get('someProperty'), 'someProperty has correct initial value using needs');
equal(postsController.get('someComputedProperty'), otherController.get('someComputedProperty'), 'someComputedProperty has correct initial value using needs');
equal(postsController.get('someOtherComputedProperty'), otherController.get('otherAnotherComputedProperty'), 'someOtherComputedProperty has correct initial value using needs');

```

Now we set the value of the computed that is on our `needs` controller.

```javascript
otherController.set('someProperty', 'Testing is awesome!');
```

Finally check that our assertions give us what we need.

```javascript
equal(postsController.get('someProperty'), otherController.get('someProperty'), 'someProperty has correct updated value using needs');
equal(postsController.get('someComputedProperty'), otherController.get('someComputedProperty'), 'someComputedProperty has correct updated value using needs');
equal(postsController.get('someOtherComputedProperty'), otherController.get('otherAnotherComputedProperty'), 'someOtherComputedProperty has correct updated value using needs');

```

Now you are an expert at unit testing Ember controllers.


