## Observers

Ember supports observing any property, including computed properties.
You can set up an observer on an object by using the `addObserver`
method.

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

var person = Person.create({
  firstName: "Yehuda",
  lastName: "Katz"
});

person.addObserver('fullName', function() {
  // deal with the change
});

person.set('firstName', "Brohuda"); // observer will fire
```

Because the `fullName` computed property depends on `firstName`,
updating `firstName` will fire observers on `fullName` as well.

Because observers are so common, Ember provides a way to define
observers inline in class definitions.

```javascript
Person.reopen({
  fullNameChanged: function() {
    // this is an inline version of .addObserver
  }.observes('fullName')
});
```

You can define inline observers by using the `Ember.observer` method if you
are using Ember without prototype extensions:

```javascript
Person.reopen({
  fullNameChanged: Ember.observer(function() {
    // this is an inline version of .addObserver
  }, 'fullName')
});
```
