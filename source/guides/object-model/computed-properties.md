## What is Computed Property?

In a nutshell, it's a way to transform one or more properties into another single property. It's technically a `function` but it acts like a property. 

Here's a very well-known example:

```javascript
Person = Ember.Object.extend({
  firstName: null,
  lastName: null,
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});
var ironMan = Person.create({
  firstName: "Tony",
  lastName:  "Stark"
});
ironMan.get('fullName') // "Tony Stark"
```

The code above defines a computed property `fullName` with dependencies `firstName` and `lastName` and whenever it gets called, it returns `firstName` + `lastName`. Very simple.

Let's take a look at another example, say we want to add a description computed property to `Person`. It will aggregate other properties like `fullName`, `age`, `country`:

```javascript
Person = Ember.Object.extend({
  firstName: null,
  lastName: null,
  age: null,
  country: null,
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),
  description: function() {
    return this.get('fullName') + '; Age: ' + this.get('age') + '; Country: ' + this.get('country');
  }.property('fullName', 'age', 'country')
});
var captainAmerica = Person.create({
  fullName: 'Steve Rogers',
  age: 80,
  country: 'USA'
});
captainAmerica.get('description'); // "Steve Rogers; Age: 80; Country: USA"
```

### Cacheable

By default, all computed properties are cacheable. That means that once you requested the value of computed property (basically, called `get` on it), it's going to compute and cache its value:

```javascript
captainAmerica.get('description'); // computes the value and returns"Steve Rogers; Age: 80; Country: USA"
captainAmerica.get('description'); // returns cached "Steve Rogers; Age: 80; Country: USA"
```

If you want to force computed property's computation, you're going to have to invalidate its cache by changing any of the properties that CP depends on:

```javascript
captainAmerica.set('country', 'United States of America');
captainAmerica.get('description'); // computes the value and returns"Steve Rogers; Age: 80; Country: United States of America"
```

or just call `volatile` to turn caching off:

```javascript
Person = Ember.Object.extend({
  firstName: null,
  lastName: null,
  age: null,
  country: null,
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),
  description: function() {
    return this.get('fullName') + '; Age: ' + this.get('age') + '; Country: ' + this.get('country');
  }.property('fullName', 'age', 'country').volatile()
});
var captainAmerica = Person.create({
  fullName: 'Steve Rogers',
  age: 80,
  country: 'USA'
});
captainAmerica.get('description'); // computes the value every time you call get and returns "Steve Rogers; Age: 80; Country: USA"
```
**Note**, although `volatile` is a part of `Ember`'s public API, it's rarely used. It's not recommended to disable caching of your computer properties for performance reasons.

### Read Only

This property is `false` by default. You won't be able to set the value of the computed property if you call `readOnly` on it:

```javascript
Person = Ember.Object.extend({
  description: function() {
    // implementation
  }.property('fullName', 'age', 'country').readOnly()
});
var captainAmerica = Person.create();
captainAmerica.set('description', 'hero'); // "Cannot Set: description on: <(unknown mixin):ember133>"
```

### Alternative syntax for defining CP

This code:

```javascript
Person = Ember.Object.extend({
  firstName: null,
  lastName: null,
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  })
});
```

does exactly the same thing, as this one:

```javascript
Person = Ember.Object.extend({
  firstName: null,
  lastName: null,
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});
```

with the difference the first example works if you have `EXTEND_PROTOTYPES` set to `false`.

## How is CP different from Observers and Bindings?

The concept of `observer` is pretty simple. You have something that you want to track the change of. You add an observer to it, so next time it changes, a certain event is going to be fired, notifying you that that something has been changed.

There are two types of observers: `before` (observesBefore) and `after` (observes). When observer event (callback) is fired, it's called with two arguments: `obj` and `keyName`. It doesn't pass the value of the property to the event (callback). The reason for that is that property (or whatever you're watching) might be lazily computed.

`Observers` are used by CP internally to invalidate CP's cache when its dependancy keys were changed. Observers (like CPs) don't use runloop magic (fired "right away").

`Observers` are not going to fire if the value was not change (changing existing `lastName` from `Stark` to `Stark` won't trigger the observer callback).

`Bindings` is internal concept that is not meant to be used. I'm not saying you can't, it's better not to. Typically, you don't even need to use it in your application, using CP is plenty enough.

`Bindings` are meant to keep a property of two objects in sync. Their update (sync) happens through run loop, so there might be a point of time when two objects have the same property with different value and only by the end of a `sync` queue those values are going to be the same.

For example, in Ember those two objects are controller and view (any time a controller's property changes, view's property changes as well).

## Recent changes to CPs

[Mr. Kris Selden](https://github.com/kselden) [changed](https://github.com/emberjs/ember.js/commit/a360130fa367ed0ae0d1a34921b7f86291c76d79) the way CPs work. So, following his example:

```html
<p>{{fullName}}</p>
```

```javascript
fullName: function () {
  return this.get('firstName') + ' ' + this.get('lastName');
}.property('firstName', 'lastName')
```

Sets to `firstName` or `lastName` will not cause changes to `fullName` until the template is rendered (until CP will be gotten).

After being rendered, only the first set to a dependent key will cause a change, until the template consumes `fullName` again when it updates its binding.