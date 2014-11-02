A binding creates a link between two properties such that when one changes, the
other one is updated to the new value automatically. Bindings can connect
properties on the same object, or across two different objects. Unlike most other
frameworks that include some sort of binding implementation, bindings in
Ember.js can be used with any object, not just between views and models.

The easiest way to create a two-way binding is to use a computed alias, that
specifies the path to another object.

```javascript
wife = Ember.Object.create({
  householdIncome: 80000
});

Husband = Ember.Object.extend({
  householdIncome: Ember.computed.alias('wife.householdIncome')
});

husband = Husband.create({
  wife: wife
});

husband.get('householdIncome'); // 80000

// Someone gets raise.
husband.set('householdIncome', 90000);
wife.get('householdIncome'); // 90000
```

Note that bindings don't update immediately. Ember waits until all of your
application code has finished running before synchronizing changes, so you can
change a bound property as many times as you'd like without worrying about the
overhead of syncing bindings when values are transient.

## One-Way Bindings

A one-way binding only propagates changes in one direction. Often, one-way
bindings are just a performance optimization and you can safely use a two-way binding
(as, of course, two-way bindings are de facto one-way bindings if you only ever change
one side). Sometimes one-way bindings are useful to achieve specific behaviour such
as a default that is the same as another property but can be overriden (e.g. a
shipping address that starts the same as a billing address but can later be changed)

```javascript
user = Ember.Object.create({
  fullName: "Kara Gates"
});

UserView = Ember.View.extend({
  userName: Ember.computed.oneWay('user.fullName')
});

userView = UserView.create({
  user: user
});

// Changing the name of the user object changes
// the value on the view.
user.set('fullName', "Krang Gates");
// userView.userName will become "Krang Gates"

// ...but changes to the view don't make it back to
// the object.
userView.set('userName', "Truckasaurus Gates");
user.get('fullName'); // "Krang Gates"
```
