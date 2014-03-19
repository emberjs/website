Ember supports observing any property, including computed properties.
You can set up an observer on an object by using the `observes`
method on a function:

```javascript
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,
  
  fullName: function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');

    return firstName + ' ' + lastName;
  }.property('firstName', 'lastName'),

  fullNameChanged: function() {
    // deal with the change
  }.observes('fullName').on('init')
});

var person = Person.create({
  firstName: 'Yehuda',
  lastName: 'Katz'
});

person.set('firstName', 'Brohuda'); // observer will fire
```

Because the `fullName` computed property depends on `firstName`,
updating `firstName` will fire observers on `fullName` as well.


### Observers and asynchrony

Observers in Ember are currently synchronous. This means that they will fire
as soon as one of the properties they observe changes. Because of this, it
is easy to introduce bugs where properties are not yet synchronized:

```javascript
Person.reopen({
  lastNameChanged: function() {
    // The observer depends on lastName and so does fullName. Because observers
    // are synchronous, when this function is called the value of fullName is
    // not updated yet so this will log the old value of fullName
    console.log(this.get('fullName'));
  }.observes('lastName')
});
```

This synchronous behaviour can also lead to observers being fired multiple
times when observing multiple properties:

```javascript
Person.reopen({
  partOfNameChanged: function() {
    // Because both firstName and lastName were set, this observer will fire twice.
  }.observes('firstName', 'lastName')
});

person.set('firstName', 'John');
person.set('lastName', 'Smith');
```

To get around these problems, you should make use of `Ember.run.once`. This will
ensure that any processing you need to do only happens once, and happens in the
next run loop once all bindings are synchronized:

```javascript
Person.reopen({
  partOfNameChanged: function() {
    Ember.run.once(this, 'processFullName');
  }.observes('firstName', 'lastName'),

  processFullName: function() {
    // This will only fire once if you set two properties at the same time, and
    // will also happen in the next run loop once all properties are synchronized
    console.log(this.get('fullName'));
  }
});

person.set('firstName', 'John');
person.set('lastName', 'Smith');
```

### Observers and object initialization

Observers never fire until after the initialization of an object is complete.

If you need an observer to fire as part of the initialization process, you
cannot rely on the side effect of set. Instead, specify that the observer
should also run after init by using `.on('init')`:

```javascript
App.Person = Ember.Object.extend({
  init: function() {
    this.set('salutation', "Mr/Ms");
  },

  salutationDidChange: function() {
    // some side effect of salutation changing
  }.observes('salutation').on('init')
});
```

### Unconsumed Computed Properties Do Not Trigger Observers

If you never `get` a computed property, its observers will not fire even if
its dependent keys change. You can think of the value changing from one unknown
value to another.

This doesn't usually affect application code because computed properties are
almost always observed at the same time as they are fetched. For example, you get
the value of a computed property, put it in DOM (or draw it with D3), and then
observe it so you can update the DOM once the property changes.

If you need to observe a computed property but aren't currently retrieving it,
just get it in your init method.


### Without prototype extensions

You can define inline observers by using the `Ember.observer` method if you
are using Ember without prototype extensions:

```javascript
Person.reopen({
  fullNameChanged: Ember.observer('fullName', function() {
    // deal with the change
  })
});
```

### Outside of class definitions

You can also add observers to an object outside of a class definition
using addObserver:

```javascript
person.addObserver('fullName', function() {
  // deal with the change
});
```
