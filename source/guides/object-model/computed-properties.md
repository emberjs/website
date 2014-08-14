## What are Computed Properties?

In a nutshell, computed properties let you declare functions as properties. You create one by defining a computed property as a function, which Ember will automatically call when you ask for the property. You can then use it the same way you would any normal, static property.

It's super handy for taking one or more normal properties and transforming or manipulating their data to create a new value. 

### Computed properties in action

We'll start with a simple example:

```javascript
App.Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});

var ironMan = App.Person.create({
  firstName: "Tony",
  lastName:  "Stark"
});

ironMan.get('fullName'); // "Tony Stark"
```
Notice that the `fullName` function calls `property`. This declares the function to be a computed property, and the arguments tell Ember that it depends on the `firstName` and `lastName` attributes.

Whenever you access the `fullName` property, this function gets called, and it returns the value of the function, which simply calls `firstName` + `lastName`.

#### Alternate invocation

At this point, you might be wondering how you are able to call the `.property` function on a function.  This is possible because Ember extends the `function` prototype.  More information about extending native prototypes is available in the [disabling prototype extensions guide](/guides/configuring-ember/disabling-prototype-extensions/). If you'd like to replicate the declaration from above without using these extensions you could do so with the following:

```javascript
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  })
```

### Chaining computed properties

You can use computed properties as values to create new computed properties. Let's add a `description` computed property to the previous example, and use the existing `fullName` property and add in some other properties:

```javascript
App.Person = Ember.Object.extend({
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

var captainAmerica = App.Person.create({
  firstName: 'Steve',
  lastName: 'Rogers',
  age: 80,
  country: 'USA'
});

captainAmerica.get('description'); // "Steve Rogers; Age: 80; Country: USA"
```

### Dynamic updating

Computed properties, by default, observe any changes made to the properties they depend on and are dynamically updated when they're called. Let's use computed properties to dynamically update. 

```javascript
captainAmerica.set('firstName', 'William');

captainAmerica.get('description'); // "William Rogers; Age: 80; Country: USA"
```

So this change to `firstName` was observed by `fullName` computed property, which was itself observed by the `description` property.

Setting any dependent property will propagate changes through any computed properties that depend on them, all the way down the chain of computed properties you've created.

### Setting Computed Properties

You can also define what Ember should do when setting a computed property. If you try to set a computed property, it will be invoked with the key (property name), the value you want to set it to, and the previous value.

```javascript
App.Person = Ember.Object.extend({
  firstName: null,
  lastName: null,

  fullName: function(key, value, previousValue) {
    // setter
    if (arguments.length > 1) {
      var nameParts = value.split(/\s+/);
      this.set('firstName', nameParts[0]);
      this.set('lastName',  nameParts[1]);
    }

    // getter
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});


var captainAmerica = App.Person.create();
captainAmerica.set('fullName', "William Burnside");
captainAmerica.get('firstName'); // William
captainAmerica.get('lastName'); // Burnside
```

Ember will call the computed property for both setters and getters, so if you want to use a computed property as a setter, you'll need to check the number of arguments to determine whether it is being called as a getter or a setter. Note that if a value is returned from the setter, it will be cached as the property’s value.
