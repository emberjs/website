Often, you will want a property that is computed based on other
properties. Ember's object model allows you to define computed
properties easily in a normal class definition.

```javascript
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');

   return firstName + ' ' + lastName;
  }.property('firstName', 'lastName')
});

var tom = Person.create({
  firstName: "Tom",
  lastName: "Dale"
});

tom.get('fullName') // "Tom Dale"
```

The `property` method defines the function as a computed property, and
defines its dependencies. Those dependencies will come into play
later when we discuss bindings and observers.

When subclassing a class, you can override any computed properties.

### Setting Computed Properties

You can also define what Ember should do when setting a computed
property. If you try to set a computed property, it will be invoked
with the key (property name), the value you want to set it to, and the previous
value.

```javascript
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: function(key, value, oldValue) {
    // getter
    if (arguments.length === 1) {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');

      return firstName + ' ' + lastName;

    // setter
    } else {
      if (oldValue === value) { return value; }

      var name = value.split(" ");

      this.set('firstName', name[0]);
      this.set('lastName', name[1]);

      return value;
    }
  }.property('firstName', 'lastName')
});

var person = Person.create();
person.set('fullName', "Peter Wagenet");
person.get('firstName') // Peter
person.get('lastName') // Wagenet
```

Ember will call the computed property for both setters and getters, and
you can check the number of arguments to determine whether it is being called
as a getter or a setter.

