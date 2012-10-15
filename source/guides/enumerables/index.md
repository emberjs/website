## What Are Enumerables?

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
