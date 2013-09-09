You don't need to define a class all at once. You can reopen a class and
define new properties using the `reopen` method.

```javascript
Person.reopen({
  isPerson: true
});

Person.create().get('isPerson') // true
```

When using `reopen`, you can also override existing methods and
call `this._super`.


```javascript
Person.reopen({
  // override `say` to add an ! at the end
  say: function(thing) {
    this._super(thing + "!");
  }
});
```

`reopen` is used to add instance methods and properties that are shared across all instances of a class. It does not add
methods and properties to a particular instance of a class as in vanilla JavaScript (without using prototype).

But when you need to create class methods or add properties to the class itself you can use `reopenClass`.

```javascript
Person.reopenClass({
  createMan: function() {
    return Person.create({isMan: true})
  }
});

Person.createMan().get('isMan') // true
```
