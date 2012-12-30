## Classes and Instances

At its most basic, you create a new Ember class by using the
`extend` method on `Ember.Object`.

```javascript
Person = Ember.Object.extend({
  say: function(thing) {
    alert(thing);
  }
});
```

Once you have built a new class, you can create new instances of the
class by using the `create` method. Any properties defined on the
class will be available to instances.

```javascript
var person = Person.create();
person.say("Hello") // alerts "Hello"
```

When creating an instance, you can also add additional properties to the
instance by passing in an object.

```javascript
var tom = Person.create({
  name: "Tom Dale",

  helloWorld: function() {
    this.say("Hi my name is " + this.get('name'));
  }
});

tom.helloWorld() // alerts "Hi my name is Tom Dale"
```

Because of Ember's support for bindings and observers, you will always
access properties using the `get` method, and set properties using the
`set` method.

When creating a new instance of an object, you can also override any
properties or methods defined on the class. For instance, in this case,
you could override the `say` method from the `Person` class.

```javascript
var yehuda = Person.create({
  name: "Yehuda Katz",

  say: function(thing) {
    var name = this.get('name');

    this._super(name + " says: " + thing);
  }
});
```

You can use the `_super` method on the object (`super` is a reserved
word in JavaScript) to call the original method you overrode.

### Subclassing Classes

You can also create subclasses of classes you create by using the
`extend` method. In fact, when we created a new class above by calling
`extend` on `Ember.Object`, we were **subclassing** `Ember.Object`.

```javascript
var LoudPerson = Person.extend({
  say: function(thing) {
    this._super(thing.toUpperCase());
  }
});
```

When subclassing, you can use `this._super` to invoke methods you are
overriding.
