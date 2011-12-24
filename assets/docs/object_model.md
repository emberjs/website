## The Ember Object Model

Ember enhances the simple JavaScript object model to support bindings
and observers, as well as to support a more powerful mixin-based
approach to code sharing.

At its most basic, you create a new Ember class by using the `extend`
method on `Ember.Object`.

<pre class="brush: js;">
Person = Ember.Object.extend({
  say: function(thing) {
    alert(thing);
 }
});
</pre>

Once you have built a new class, you can create new instances of the
class by using the `create` method. Any properties defined on the class
will be available to instances.

<pre class="brush: js;">
var person = Person.create();
person.say("Hello") // alerts "Hello"
</pre>

When creating an instance, you can also add additional properties to the
class by passing in an object.

<pre class="brush: js;">
var tom = Person.create({
  name: "Tom Dale",

  helloWorld: function() {
    this.say("Hi my name is " + this.get('name'));
  }
});

tom.helloWorld() // alerts "Hi my name is Tom Dale"
</pre>

Because of Ember's support for bindings and observers, you will always
access properties using the `get` method, and set properties using the
`set` method.

When creating a new instance of an object, you can also override any
properties or methods defined on the class. For instance, in this case,
you could override the `say` method from the `Person` class.

<pre class="brush: js; highlight: [4,5,6,7,8];">
var yehuda = Person.create({
  name: "Yehuda Katz",

  say: function(thing) {
    var name = this.get('name');

    this._super(name + " says: " + thing);
  }
});
</pre>

You can use the `_super` method on the object (`super` is a reserved
word in JavaScript) to call the original method you overrode.

### Subclassing Classes

You can also create subclasses of classes you create by using the
`extend` method. In fact, when we created a new class above by calling
`extend` on `Ember.Object`, we were **subclassing** `Ember.Object`.

<pre class="brush: js;">
var LoudPerson = Person.extend({
  say: function(thing) {
    this._super(thing.toUpperCase());
  }
});
</pre>

When subclassing, you can use `this._super` to invoke methods you are
overriding.

### Reopening Classes

You don't need to define a class all at once. You can reopen a class and
define new properties using the `reopenClass` method.

<pre class="brush: js; highlight: 1">
Person.reopenClass({
  isPerson: true
});

Person.create().get('isPerson') // true
</pre>

When using `reopenClass`, you can also override existing methods and
call `this._super`.

<pre class="brush: js; highlight: [3,4,5];">
Person.reopenClass({
  // override `say` to add an ! at the end
  say: function(thing) {
    this._super(thing + "!");
  }
});
</pre>

### Computed Properties (Getters)

Often, you will want a property that is computed based on other
properties. Ember's object model allows you to define computed
properties easily in a normal class definition.

<pre class="brush: js; highlight: [6,7,8,9,10,11];">
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
</pre>

If you aren't using Ember's prototype extensions, you can use a slightly
more verbose version, wrapping the function in a call to `Ember.computed`:

<pre class="brush: js; highlight: [6,11];">
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: Ember.computed(function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');

    return firstName + ' ' + lastName;
  }).property('firstName', 'lastName')
});
</pre>

The `property` method defines the function as a computed property, and
defines its dependencies. Those dependencies will come into play later
when we discuss bindings and observers.

When subclassing a class or creating a new instance, you can override
any computed properties.

### Computed Properties (Setters)

You can also define what Ember should do when setting a computed
property. If you try to set a computed property, it will be invoked with
the key and value you want to set it to.

<pre class="brush: js; highlight: [8,15,16,17,18,19,20,21,22];">
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: Ember.computed(function(key, value) {
    // getter
    if (arguments.length === 1) {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');

      return firstName + ' ' + lastName;

    // setter
    } else {
      var name = value.split(" ");

      this.set('firstName', name[0]);
      this.set('lastName', name[1]);

      return value;
    }
  }).property('firstName', 'lastName')
});

var person = Person.create();
person.set('fullName', "Peter Wagenet");
person.get('firstName') // Peter
person.get('lastName') // Wagenet
</pre>

Ember will call the computed property for both setters and getters, and
you can check the number of arguments to determine whether it is being called
as a getter or a setter.

### Observers

Ember supports observing any property, including computed properties.
You can set up an observer on an object by using the `addObserver`
method.

<pre class="brush: js; highlight: [19,20,21];">
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: Ember.computed(function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');

    return firstName + ' ' + lastName;
  }).property('firstName', 'lastName')
});

var person = Person.create({
  firstName: "Yehuda",
  lastName: "Katz"
});

person.addObserver('fullName', function() {
  // deal with the change
});

person.set('firstName', "Brohuda"); // observer will fire
</pre>

Because the `fullName` computed property depends on `firstName`,
updating `firstName` will fire observers on `fullName` as well.

Because observers are so common, Ember provides a way to define
observers inline in class definitions.

<pre class="brush: js; highlight: 4;">
Person.reopenClass({
  fullNameChanged: function() {
    // this is an inline version of .addObserver
  }.observes('fullName')
});
</pre>

You can define inline observers by using the `Ember.observer` method if you
are using Ember without prototype extensions:

<pre class="brush: js; highlight: [2,4];">
Person.reopenClass({
  fullNameChanged: Ember.observer(function() {
    // this is an inline version of .addObserver
  }, 'fullName')
});
</pre>

### Bindings

A binding creates a link between two properties such that when one changes, the
other one is updated to the new value automatically. Bindings can connect
properties on the same object, or across two different objects. Unlike most other
frameworks that include some sort of binding implementation, bindings in
Ember.js can be used with any object, not just between views and models.

The easiest way to create a two-way binding is by creating a new property
with the string `Binding` at the end, then specifying a path from the global scope:

<pre class="brush: js; highlight: 6;">
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
</pre>

Note that bindings don't update immediately. Ember waits until all of your
application code has finished running before synchronizing changes, so you can
change a bound property as many times as you'd like without worrying about the
overhead of syncing bindings when values are transient.

#### One-Way Bindings

A one-way binding only propagates changes in one direction. Usually, one-way
bindings are just a performance optimization and you can safely use
the more concise two-way binding syntax (as, of course, two-way bindings are
de facto one-way bindings if you only ever change one side).

<pre class="brush: js; highlight: 6;">
App.user = Ember.Object.create({
  fullName: "Kara Gates"
});

App.userView = Ember.View.create({
  userNameBinding: Ember.Binding.oneWay('App.user.fullName')
});

// Changing the name of the user object changes
// the value on the view.
App.user.set('fullName', "Krang Gates");
// App.userView.fullName will become "Krang Gates"

// ...but changes to the view don't make it back to
// the object.
App.userView.set('fullName', "Truckasaurus Gates");
App.user.get('fullName'); // "Krang Gates"
</pre>

### What Do I Use When?

Sometimes new users are confused about when to use computed properties,
bindings and observers. Here are some guidelines to help:

1. Use *computed properties* to build a new property by synthesizing other
properties. Computed properties should not contain application behavior, and
should generally not cause any side-effects when called. Except in rare cases,
multiple calls to the same computed property should always return the same
value (unless the properties it depends on have changed, of course.)

2. *Observers* should contain behavior that reacts to changes in another
property. Observers are especially useful when you need to perform some
behavior after a binding has finished synchronizing.

3. *Bindings* are most often used to ensure objects in two different layers
are always in sync. For example, you bind your views to your controller using
Handlebars. You may often bind between two objects in the same layer. For
example, you might have an `App.selectedContactController` that binds to the
`selectedContact` property of `App.contactsController`.
