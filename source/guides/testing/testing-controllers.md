_Unit testing methods and computed properties follows previous patterns shown 
in [Unit Testing Basics] because Ember.Controller extends Ember.Object._

Unit testing controllers is very simple using the unit test helper 
[moduleFor](/guides/testing/unit) which is part of the ember-qunit framework.

### Testing Controller Actions

Here we have a controller `PostsController` with some computed properties and an 
action `setProps`.

```javascript
App.PostsController = Ember.ArrayController.extend({

  propA: 'You need to write tests',
  propB: 'And write one for me too',

  setPropB: function(str) {
    this.set('propB', str);
  },

  actions: {
    setProps: function(str) {
      this.set('propA', 'Testing is cool');
      this.setPropB(str);
    }
  }
});
```

`setProps` sets a property on the controller and also calls a method. To write a
test for this action, we would use the `moduleFor` helper to setup a test 
container:

```javascript
moduleFor('controller:posts', 'Posts Controller');
```

Next we use `this.subject()` to get an instance of the `PostsController` and 
write a test to check the action. `this.subject()` is a helper method from the 
`ember-qunit` library that returns a singleton instance of the module set up 
using `moduleFor`.

```javascript
test('calling the action setProps updates props A and B', function() {
  expect(4);
  
  // get the controller instance
  var ctrl = this.subject();

  // check the properties before the action is triggered
  equal(ctrl.get('propA'), 'You need to write tests');
  equal(ctrl.get('propB'), 'And write one for me too');

  // trigger the action on the controller by using the `send` method, 
  // passing in any params that our action may be expecting
  ctrl.send('setProps', 'Testing Rocks!');

  // finally we assert that our values have been updated 
  // by triggering our action.
  equal(ctrl.get('propA'), 'Testing is cool');
  equal(ctrl.get('propB'), 'Testing Rocks!');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/pulenamuwu/1/embed?output">Unit Testing
Controllers "Actions"</a>

### Testing Controller Needs

Sometimes controllers have dependencies on other controllers. This is 
accomplished by using [needs]. For example, here are two simple controllers. The
`PostController` is a dependency of the `CommentsController`:

```javascript
App.PostController = Ember.ObjectController.extend({
  // ...
});

App.CommentsController = Ember.ArrayController.extend({
  needs: 'post',
  title: Ember.computed.alias('controllers.post.title'),
});
```

This time when we setup our `moduleFor` we need to pass an options object as
our third argument that has the controller's `needs`.

```javascript
moduleFor('controller:comments', 'Comments Controller', {
  needs: ['controller:post']
});
```

Now let's write a test that sets a property on our `post` model in the 
`PostController` that would be available on the `CommentsController`.

```javascript
test('modify the post', function() {
  expect(2);

  // grab an instance of `CommentsController` and `PostController`
  var ctrl = this.subject(),
      postCtrl = ctrl.get('controllers.post');

  // wrap the test in the run loop because we are dealing with async functions
  Ember.run(function() {

    // set a generic model on the post controller
    postCtrl.set('model', Ember.Object.create({ title: 'foo' }));

    // check the values before we modify the post
    equal(ctrl.get('title'), 'foo');

    // modify the title of the post
    postCtrl.get('model').set('title', 'bar');

    // assert that the controllers title has changed
    equal(ctrl.get('title'), 'bar');

  });
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/loluhixoya/1/embed?output">Unit Testing Controllers "Needs"</a>

<script src="http://static.jsbin.com/js/embed.js"></script>

[Unit Testing Basics]: /guides/testing/unit-testing-basics
[needs]: /guides/controllers/dependencies-between-controllers
