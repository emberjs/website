Unit tests are generally used to test a small piece of code and ensure that it
is doing what was intended. Unlike integration tests, they are narrow in scope
and do not require the Ember application to be running.

As it is the basic object type in Ember, being able to test a simple
`Ember.Object` sets the foundation for testing more specific parts of your
Ember application such as controllers, components, etc. Testing an `Ember.Object`
is as simple as creating an instance of the object, setting its state, and
running assertions against the object. By way of example lets look at a few
common cases.

### Testing Computed Properties

Let's start by looking at an object that has a `computedFoo` computed property
based on a `foo` property.

```javascript
App.SomeThing = Ember.Object.extend({
  foo: 'bar',
  computedFoo: function(){
    return 'computed ' + this.get('foo');
  }.property('foo')
});
```

Within the test we'll create an instance, update the `foo` property (which
should trigger the computed property), and assert that the logic in our
computed property is working correctly.

```javascript
module('Unit: SomeThing');

test('computedFoo correctly concats foo', function() {
  var someThing = App.SomeThing.create();
  someThing.set('foo', 'baz');
  equal(someThing.get('computedFoo'), 'computed baz');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/dubiyexiqe/1/embed?output">Unit Testing
Basics: Computed Properties</a>

### Testing Object Methods

Next let's look at testing logic found within an object's method. In this case
the `testMethod` method alters some internal state of the object (by updating
the `foo` property).

```javascript
App.SomeThing = Ember.Object.extend({
  foo: 'bar',
  testMethod: function() {
    this.set('foo', 'baz');
  }
});
```

To test it, we create an instance of our class `SomeThing` as defined above, 
call the `testMethod` method and assert that the internal state is correct as a 
result of the method call.

```javascript
module('Unit: SomeThing');

test('calling testMethod updates foo', function() {
  var someThing = App.SomeThing.create();
  someThing.testMethod();
  equal(someThing.get('foo'), 'baz');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/bobaropega/1/embed?output">Unit Testing
Basics: Method Side Effects</a>

In the event the object's method returns a value you can simply assert that the
return value is calculated correctly. Suppose our object has a `calc` method
that returns a value based on some internal state.

```javascript
App.SomeThing = Ember.Object.extend({
  count: 0,
  calc: function() {
    this.incrementProperty('count');
    return 'count: ' + this.get('count');
  }
});
```

The test would call the `calc` method and assert it gets back the correct value.

```javascript
module('Unit: SomeThing');

test('testMethod returns incremented count', function() {
  var someThing = App.SomeThing.create();
  equal(someThing.calc(), 'count: 1');
  equal(someThing.calc(), 'count: 2');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/vigehojahi/1/embed?output">Unit Testing
Basics: Method Side Effects</a>

### Testing Observers

Suppose we have an object that has a property and a method observing that property.

```javascript
App.SomeThing = Ember.Object.extend({
  foo: 'bar',
  other: 'no',
  doSomething: function(){
    this.set('other', 'yes');
  }.observes('foo')
});
```

In order to test the `doSomething` method we create an instance of `SomeThing`,
update the observed property (`foo`), and assert that the expected effects are present.

```javascript
module('Unit: SomeThing');

test('doSomething observer sets other prop', function() {
  var someThing = App.SomeThing.create();
  someThing.set('foo', 'baz');
  equal(someThing.get('other'), 'yes');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/yajejicopu/1/embed?output">Unit Testing Basics: Observers</a>

<script src="http://static.jsbin.com/js/embed.js"></script>
