A binding creates a link between two properties such that when one changes, the
other one is updated to the new value automatically. Bindings can connect
properties on the same object, or across two different objects. Unlike most other
frameworks that include some sort of binding implementation, bindings in
Ember.js can be used with any object, not just between views and models.

The easiest way to create a two-way binding is by creating a new property
with the string `Binding` at the end, then specifying a path from the global scope:

```javascript
App.wife = Ember.Object.create({
  householdIncome: 80000
});

App.husband = Ember.Object.create({
  householdIncomeBinding: 'App.wife.householdIncome'
});

App.husband.get('householdIncome'); // 80000

// Someone gets raise.
App.husband.set('householdIncome', 90000);
App.wife.get('householdIncome'); // 90000
```

Note that bindings don't update immediately. Ember waits until all of your
application code has finished running before synchronizing changes, so you can
change a bound property as many times as you'd like without worrying about the
overhead of syncing bindings when values are transient.

## One-Way Bindings

A one-way binding only propagates changes in one direction. Usually, one-way
bindings are just a performance optimization and you can safely use
the more concise two-way binding syntax (as, of course, two-way bindings are
de facto one-way bindings if you only ever change one side).

```javascript
App.user = Ember.Object.create({
  fullName: "Kara Gates"
});

App.userView = Ember.View.create({
  userNameBinding: Ember.Binding.oneWay('App.user.fullName')
});

// Changing the name of the user object changes
// the value on the view.
App.user.set('fullName', "Krang Gates");
// App.userView.userName will become "Krang Gates"

// ...but changes to the view don't make it back to
// the object.
App.userView.set('userName', "Truckasaurus Gates");
App.user.get('fullName'); // "Krang Gates"
```
