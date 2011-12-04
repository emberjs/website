## The Amber Object Model

Amber enhances the simple JavaScript object model to support bindings
and observers, as well as to support a more powerful mixin-based
approach to code sharing.

At its most basic, you create a new Amber class by using the `extend`
method on `SC.Object`.

    Person = SC.Object.extend({
      say: function(thing) {
        alert(thing);
      }
    });

Once you have built a new class, you can create new instances of the
class by using the `create` method. Any properties defined on the class
will be available to instances.

    var person = Person.create();
    person.say("Hello") // alerts "Hello"

When creating an instance, you can also add additional properties to the
class by passing in an object.

    var tom = Person.create({
      name: "Tom Dale",

      helloWorld: function() {
        alert("Hi my name is " + this.get('name'));
      }
    });

    tom.helloWorld() // alerts "Hi my name is Tom Dale"

Because of Amber's support for bindings and observers, you will always
access properties using the `get` method, and set properties using the
`set` method.

When creating a new instance of an object, you can also override any
properties or methods defined on the class. For instance, in this case,
you could override the `say` method from the `Person` class.

    var yehuda = Person.create({
      name: "Yehuda Katz",

      say: function(thing) {
        var name = this.get('name');

        this._super(name + " says: " + thing);
      }
    });

You can use the `_super` method on the object (`super` is a reserved
word in JavaScript) to call the original method you overrode.

### Subclassing Classes

You can also create subclasses of classes you create by using the
`extend` method. In fact, when we created a new class above by calling
`extend` on `SC.Object`, we were **subclassing** `SC.Object`.

    var LoudPerson = Person.extend({
      say: function(thing) {
        this._super(thing.toUpperCase());
      }
    });

When subclassing, you can use `this._super` to invoke methods you are
overriding.

### Reopening Classes

You don't need to define a class all at once. You can reopen a class and
define new properties using the `reopenClass` method.

    Person.reopenClass({
      isPerson: true
    });

    Person.create().get('isPerson') // true

When using `reopenClass`, you can also override existing methods and
call `this._super`.

    Person.reopenClass({
      // override `say` to add an ! at the end
      say: function(thing) {
        this._super(thing + "!");
      }
    });

### Computed Properties (Getters)

Often, you will want a property that is computed based on other
properties. Amber's object model allows you to define computed
properties easily in a normal class definition.

    Person = SC.Object.extend({
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
    })

    tom.get('fullName') // "Tom Dale"

If you aren't using Amber's prototype extension, you can use a slightly
more verbose version, wrapping the function in a call to `SC.computed`:

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: SC.computed(function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');

        return firstName + ' ' + lastName;
      }).property('firstName', 'lastName')
    });

The `property` method defines the function as a computed property, and
defines its dependencies. Those dependencies will come into play later
when we discuss bindings and observers.

When subclassing a class or creating a new instance, you can override
any computed properties.

LEARN MORE: Computed Properties

### Computed Properties (Setters)

You can also define what Amber should do when setting a computed
property. If you try to set a computed property, it will be invoked with
the key and value you want to set it to.

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: SC.computed(function(key, value) {
        // getter
        if (value === undefined) {
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
    person.set('name', "Peter Wagenet");
    person.get('firstName') // Peter
    person.get('lastName') // Wagenet

Amber will call the computed property for both setters and getters, and
you can check the `value` to determine whether it is being called as a
getter or a setter.

### Observers

Amber supports observing any property, including computed properties.
You can set up an observer on an object by using the `addObserver`
method.

    Person = SC.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,

      fullName: SC.computed(function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');

        return firstName + ' ' + lastName;
      }).property('firstName', 'lastName')
    });

    var person = Person.create
      firstName: "Yehuda",
      lastName: "Katz"
    });

    person.addObserver('fullName', function() {
      // deal with the change
    });

    person.set('firstName', "Brohuda"); // observer will fire

Because the `fullName` computed property depends on `firstName`,
updating `firstName` will fire observers on `fullName` as well.

Because observers are so common, Amber provides a way to define
observers inline in class definitions.

    Person.reopenClass({
      fullNameChanged: function() {
        // this is an inline version of .addObserver
      }.observes('fullName')
    });

You can define inline observers by using the `SC.observer` method if you
are using Amber without prototype extensions:

    Person.reopenClass({
      fullNameChanged: SC.observer(function() {
        // this is an inline version of .addObserver
      }, 'fullName')
    });

