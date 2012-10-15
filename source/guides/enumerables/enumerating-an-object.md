## The Enumerable Interface

### Callback Arguments

The callbacks to Enumerable methods take three arguments:

 * *item*: the item for the current iteration.
 * *index*: an Integer, counting up from 0.
 * *self*: the Enumerable itself.

### Enumeration

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
