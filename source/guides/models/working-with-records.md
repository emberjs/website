### Modifying Attributes

Once a record has been loaded, you can begin making changes to its
attributes. Attributes behave just like normal properties in Ember.js
objects. Making changes is as simple as setting the attribute you
want to change:

```js
var tyrion = this.store.find('person', 1);
// ...after the record has loaded
tyrion.set('firstName', "Yollo");
```

All of the Ember.js conveniences are available for
modifying attributes. For example, you can use `Ember.Object`'s
`incrementProperty` helper:

```js
person.incrementProperty('age');
// Happy birthday!
```

You can tell if a record has outstanding changes that have not yet been
saved by checking its `isDirty` property.

```js
person.get('isDirty');
//=> false

person.set('isAdmin', true);

person.get('isDirty');
//=> true
```
