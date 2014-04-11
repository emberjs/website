Unit testing controllers is very simple using the unit test helper [moduleFor](/guides/testing/unit) which is part of the ember-qunit framework.

***It can become very easy to let your controllers perform most of the business logic in an Ember application. It is considered best practice to extract out any logic that does not directly impact the template into its own library.***

Unit testing methods and computed properties follows previous patterns shown in [Unit Testing Basics](/guides/testing/unit-testing-basics) because Ember.Controller extends Ember.Object.

### Testing Controller Actions

Here we have a controller `PostsController` with some computed properties and an action `someAction`.

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
`someAction` sets a property on the controller and also calls a method. Let's write a test for it!

After initial testing setup, we start by using the `moduleFor` helper to setup a test container for our `PostsController`.

***Note moduleFor only needs to be setup once per module and not per test.***

```javascript
moduleFor('controller:posts', 'PostsController');
```
Next we use `this.subject()` to get an instance of the `PostsController` and write a test to check the action. `this.subject()` is a helper method from the `ember-qunit` library that returns a singleton instance of the module set up using `moduleFor`.

```javascript
test('PostsController - someAction', function() {
  expect(4);
  // get the controller instance
  var postCtrl = this.subject();

  // check the properties before the action is triggered
  equal(postCtrl.get('somePropertySetByAction'), 'You need to write tests', 'somePropertySetByAction has correct initial value');
  equal(postCtrl.get('someOtherProperty'), 'And write one for me too', 'someOtherProperty has correct initial value');

  // trigger the action on the controller by using the `send` method, passing in any params that our action may be expecting
  postCtrl.send('someAction', 'Testing Rocks!');

  // finally we assert that our values have been updated by triggering our action.
  equal(postCtrl.get('somePropertySetByAction'), 'Testing is cool', 'somePropertySetByAction has correct updated value from action');
  equal(postCtrl.get('someOtherProperty'), 'Testing Rocks!', 'someOtherProperty has correct updated value from param passed to action');
});

```

####Live Passing Test

<a class="jsbin-embed" href="http://jsbin.com/laqed/1/embed?javascript,output">Unit Testing Controllers "Actions"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

### Testing Controller Needs

`needs` allows a controller to access another controller. You might think things would become trickier when trying to unit test a controller that has a dependency on another controller. Fortunately, there's a simple solution:

Here we have a `PostsController` with a `needs` that interacts with our `OtherController`.

```javascript
App.PostsController = Ember.ArrayController.extend({

  needs: ['other'],
  otherController: Ember.computed.alias('controllers.other'),

  someProperty: Ember.computed.alias('otherController.someProperty'),
  someComputedProperty: Ember.computed.alias('otherController.someComputedProperty'),
  someOtherComputedProperty: Ember.computed.alias('otherController.otherAnotherComputedProperty')

});

it may look something like this

App.OtherController = Ember.Controller.extend({

  someProperty: 'Original Value',

  someComputedProperty: function() {
    return this.get('someProperty') + ' concat stuff';
  }.property('someProperty'),

  otherAnotherComputedProperty: Ember.computed.alias('someProperty')

});

```

This time when we setup our moduleFor we need to pass an options object as
our third argument that has the controller's `needs`.

```javascript
moduleFor('controller:posts', 'PostsController', {
  needs: ['controller:other']
});
```
Now let's write a test that sets a property on our `needs` controller that updates properties on our `PostsController`

```javascript
test('PostsController - Testing Needs', function() {
  expect(6);
  // grab an instance of `PostsController` and `OtherController`
  // note: we can grab `OtherController` using `otherController`
  // because of the Alias in `PostsController`
  var postCtrl = this.subject(),
      otherCtrl = postCtrl.get('otherController');

  // check the values before we set the property
  equal(postCtrl.get('someProperty'), otherCtrl.get('someProperty'), 'someProperty has correct initial value using needs');
  equal(postCtrl.get('someComputedProperty'), otherCtrl.get('someComputedProperty'), 'someComputedProperty has correct initial value using needs');
  equal(postCtrl.get('someOtherComputedProperty'), otherCtrl.get('otherAnotherComputedProperty'), 'someOtherComputedProperty has correct initial value using needs');

  // set the value of the computed that is on our `needs` controller.
  otherCtrl.set('someProperty', 'Testing is awesome!');

  // check that the properties have updated correctly.
  equal(postCtrl.get('someProperty'), otherCtrl.get('someProperty'), 'someProperty has correct updated value using needs');
  equal(postCtrl.get('someComputedProperty'), otherCtrl.get('someComputedProperty'), 'someComputedProperty has correct updated value using needs');
  equal(postCtrl.get('someOtherComputedProperty'), otherCtrl.get('otherAnotherComputedProperty'), 'someOtherComputedProperty has correct updated value using needs');
});

```

####Live Passing Test

<a class="jsbin-embed" href="http://jsbin.com/fixil/2/embed?javascript">Unit Testing Controllers "Needs"</a>
<script src="http://static.jsbin.com/js/embed.js"></script>
