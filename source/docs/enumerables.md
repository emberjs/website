## The Ember Enumerable API

### What Are Enumerables?

In Ember, an Enumerable is any object that contains a number of child objects, and which allows you to work with those children using the Enumerable interface. The most basic Enumerable is the built-in JavaScript Array.

For instance, all Enumerables support the standard `forEach` method:

```javascript
[1,2,3].forEach(function(item) {
  console.log(item);
});
```

In general, Enumerable methods, like `forEach`, take an optional second parameter, which will become the value of `this` in the callback function:

```javascript
var array = [1,2,3];

array.forEach(function(item) {
  console.log(item, this.indexOf(item));
}, array)
```

Among other reasons, you will find this useful when using another Enumerable method as a callback to `forEach`:

```javascript
var array = [1,2,3];

array.forEach(array.removeObject, array);
```

NOTE: This second parameter helps work around a limitation of JavaScript which sets the value of `this` to `window` in methods used this way.

### Enumerables in Ember

In general, Ember objects that represent lists implement the Enumerable interface. Some examples:

 * *Array*: Ember extends the native JavaScript Array with the Enumerable interface.
 * *ArrayProxy*: A construct that wraps a native Array and adds additional functionality for the view layer.
 * *Set*: An object that can quickly answer whether it includes an object.

### The Enumerable Interface

#### Parameters

The callbacks to Enumerable methods take three arguments:

 * *item*: the item for the current iteration.
 * *index*: an Integer, counting up from 0.
 * *self*: the Enumerable itself.

#### Enumeration

To enumerate all the values of an enumerable object, use the `forEach` method:

```javascript
enumerable.forEach(function(item, index, self) {
  console.log(item);
});
```

To invoke some method on each element of an enumerable object, use the `invoke` method:

```javascript
Person = Ember.Object.extend({
  sayHello: function() {
    console.log("Hello from " + this.get('name'));
  }
});

var people = [
  Person.create({ name: "Juan" }),
  Person.create({ name: "Charles" }),
  Person.create({ name: "Majd" })
]

people.invoke('sayHello');

// Hello from Juan
// Hello from Charles
// Hello from Majd
```

#### First and Last

You can get the first or last object from an Enumerable by getting `firstObject` or `lastObject`.

```javascript
[1,2,3].get('firstObject') // 1
[1,2,3].get('lastObject')  // 3
```

#### Converting to Array

This one is simple. To convert an Enumerable into an Array, simply call its `toArray` method.

#### Transforming

You can transform an Enumerable into a derived Array by using the `map` method:

```javascript
['Goodbye', 'cruel', 'world'].map(function(item, index, self) {
  return item + "!";
});

// returns ["Goodbye!", "cruel!", "world!"]
```

#### Setting and Getting on Each Object

A very common use of `forEach` and `map` is to get (or set) a property on each element. You can use the `getEach` and `setEach` methods to accomplish these goals.

```javascript
var arr = [Ember.Object.create(), Ember.Object.create()];

// we now have an Array containing two Ember.Objects

arr.setEach('name', 'unknown');
arr.getEach('name') // ['unknown', 'unknown']
```

#### Filtering

Another common task to perform on an Enumerable is to take the Enumerable as input, and return an Array after sorting or filtering it based on some criteria.

For arbitrary filtering, use the (you guessed it) `filter` method. The filter method expects the callback to return `true` if Ember should include it in the final Array, and `false` or `undefined` if Ember should not.

```javascript
var arr = [1,2,3,4,5];

arr.filter(function(item, index, self) {
  if (item < 4) { return true; }
})

// returns [1,2,3]
```

When working with a collection of Ember objects, you will often want to filter a set of objects based upon the value of some property. The `filterProperty` method provides a shortcut.

```javascript
Todo = Ember.Object.extend({
  title: null,
  isDone: false
});

todos = [
  Todo.create({ title: 'Write code', isDone: true }),
  Todo.create({ title: 'Go to sleep' })
];

todos.filterProperty('isDone', true);

// returns an Array containing just the first item
```

If you want to return just the first matched value, rather than an Array containing all of the matched values, you can use `find` and `findProperty`, which work just like `filter` and `filterProperty`, but return only one item.

#### Sorting

You can sort an Enumerable based on the value of some property or list of properties using `sortProperty`. If you pass in multiple properties, Ember will sort items with the same value for the first property by the value of the second parameter, and so on.

```javascript
var todos = [
  Todo.create({ title: 'Write code', isDone: true }),
  Todo.create({ title: 'Go to sleep' }),
  Todo.create({ title: 'Eat lunch', isDone: true })
];

todos.sortProperty('isDone', 'title');

// returns an Array containing
// * Go to sleep
// * Eat lunch
// * Write code
```

Internally, the `sortProperty` method uses `Ember.compare`, which uses Ember's comparable semantics. You can override the default comparison behavior for a custom object by using the `Ember.Comparable` mixin.

#### Aggregate Information (All or Any)

If you want to find out whether every item in an Enumerable matches some condition, you can use the `every` method:

```javascript
Person = Ember.Object.extend({
  name: null,
  isHappy: false
});

var people = [
  Person.create({ name: 'Yehuda', isHappy: true }),
  Person.create({ name: 'Majd', isHappy: false })
];

people.every(function(person, index, self) {
  if(person.get('isHappy')) { return true; }
});

// returns false
```

If you want to find out whether at least one item in an Enumerable matches some conditions, you can use the `some` method:

```javascript
people.some(function(person, index, self) {
  if(person.get('isHappy')) { return true; }
});

// returns true
```

Just like the filtering methods, the `every` and `some` methods have analogous `everyProperty` and `someProperty` methods.

```javascript
people.everyProperty('isHappy', true) // false
people.someProperty('isHappy', true)  // true
```
