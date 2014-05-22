## Enumerables

In Ember.js, an Enumerable is any object that contains a number of child
objects, and which allows you to work with those children using the
[Ember.Enumerable](/api/classes/Ember.Enumerable.html) API. The most common
Enumerable in the majority of apps is the native JavaScript array, which
Ember.js extends to conform to the Enumerable interface.

By providing a standardized interface for dealing with enumerables,
Ember.js allows you to completely change the way your underlying data is
stored without having to modify the other parts of your application that
access it.

For example, you might display a list of items from fixture data during
development. If you switch the underlying data from synchronous fixtures
to an array that fetches data from the server lazily, your view,
template and controller code do not change at all.

The Enumerable API follows ECMAScript specifications as much as
possible. This minimizes incompatibility with other libraries, and
allows Ember.js to use the native browser implementations in arrays
where available.

For instance, all Enumerables support the standard `forEach` method:

```javascript
[1,2,3].forEach(function(item) {
  console.log(item);
});

//=> 1
//=> 2
//=> 3
```

In general, Enumerable methods, like `forEach`, take an optional second
parameter, which will become the value of `this` in the callback
function:

```javascript
var array = [1,2,3];

array.forEach(function(item) {
  console.log(item, this.indexOf(item));
}, array)

//=> 1 0
//=> 2 1
//=> 3 2
```

### Enumerables in Ember.js

Usually, objects that represent lists implement the Enumerable interface. Some examples:

 * **Array** - Ember extends the native JavaScript `Array` with the
   Enumerable interface (unless you [disable prototype
   extensions.](/guides/configuring-ember/disabling-prototype-extensions/))
 * **Ember.ArrayController** - A controller that wraps an underlying array and
   adds additional functionality for the view layer.
 * **Ember.Set** - A data structure that can efficiently answer whether it
   includes an object.

### API Overview

In this guide, we'll explore some of the most common Enumerable
conveniences. For the full list, please see the [Ember.Enumerable API
reference documentation.](/api/classes/Ember.Enumerable.html)

#### Iterating Over an Enumerable

To enumerate all the values of an enumerable object, use the `forEach` method:

```javascript
var food = ["Poi", "Ono", "Adobo Chicken"];

food.forEach(function(item, index) {
  console.log('Menu Item %@: %@'.fmt(index+1, item));
});

// Menu Item 1: Poi
// Menu Item 2: Ono
// Menu Item 3: Adobo Chicken
```

#### Making an Array Copy

You can make a native array copy of any object that implements
`Ember.Enumerable` by calling the `toArray()` method:

```javascript
var states = Ember.Set.create();

states.add("Hawaii");
states.add("California")

states.toArray()
//=> ["Hawaii", "California"]
```

Note that in many enumerables, such as the `Ember.Set` used in this
example, the order of the resulting array is not guaranteed.

#### First and Last Objects

All Enumerables expose `firstObject` and `lastObject` properties
that you can bind to.

```javascript
var animals = ["rooster", "pig"];

animals.get('lastObject');
//=> "pig"

animals.pushObject("peacock");

animals.get('lastObject');
//=> "peacock"
```

#### Map

You can easily transform each item in an enumerable using the
`map()` method, which creates a new array with results of calling a
function on each item in the enumerable.

```javascript
var words = ["goodbye", "cruel", "world"];

var emphaticWords = words.map(function(item) {
  return item + "!";
});
// ["goodbye!", "cruel!", "world!"]
```

If your enumerable is composed of objects, there is a `mapBy()`
method that will extract the named property from each of those objects
in turn and return a new array:

```javascript
var hawaii = Ember.Object.create({
  capital: "Honolulu"
});

var california = Ember.Object.create({
  capital: "Sacramento"
});

var states = [hawaii, california];

states.mapBy('capital');
//=> ["Honolulu", "Sacramento"]
```

#### Filtering

Another common task to perform on an Enumerable is to take the
Enumerable as input, and return an Array after filtering it based on
some criteria.

For arbitrary filtering, use the `filter` method.  The filter method
expects the callback to return `true` if Ember should include it in the
final Array, and `false` or `undefined` if Ember should not.

```javascript
var arr = [1,2,3,4,5];

arr.filter(function(item, index, self) {
  if (item < 4) { return true; }
})

// returns [1,2,3]
```

When working with a collection of Ember objects, you will often want to filter a set of objects based upon the value of some property. The `filterBy` method provides a shortcut.

```javascript
Todo = Ember.Object.extend({
  title: null,
  isDone: false
});

todos = [
  Todo.create({ title: 'Write code', isDone: true }),
  Todo.create({ title: 'Go to sleep' })
];

todos.filterBy('isDone', true);

// returns an Array containing only items with `isDone == true`
```

If you want to return just the first matched value, rather than an Array containing all of the matched values, you can use `find` and `findBy`, which work just like `filter` and `filterBy`, but return only one item.

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

Just like the filtering methods, the `every` and `some` methods have analogous `isEvery` and `isAny` methods.

```javascript
people.isEvery('isHappy', true) // false
people.isAny('isHappy', true)  // true
```

