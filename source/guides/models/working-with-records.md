### Modifying Attributes

Once a record has been loaded, you can begin making changes to its
attributes. Attributes behave just like normal properties in Ember.js
objects. Making changes is as simple as setting the attribute you
want to change:

```js
this.store.find('post', 1).then(function(post) {
    // ...after the record has loaded
    post.set('title', 'A new post title');
});
```

All of the Ember.js conveniences are available for
modifying attributes. For example, you can use `Ember.Object`'s
`incrementProperty` helper:

```js
comment.incrementProperty('editCount'); // 2
```

You can tell if a record has outstanding changes that have not yet been
saved by checking its `isDirty` property. You can also see what parts of
the record were changed and what the original value was using the
`changedAttributes` function.  `changedAttributes` returns an object,
whose keys are the changed properties and values are an array of values
`[oldValue, newValue]`.

```js
post.get('isPublished');      //=> false
post.get('isDirty');      //=> false
post.set('isPublished', true);
post.get('isDirty');      //=> true
post.changedAttributes(); //=> { isPublished: [false, true] }
```

Changes can be reverted to the last known state from the backend using
a record's `rollback()` method.

```js
post.get('isDirty');      //=> true
post.changedAttributes(); //=> { isAdmin: [false, true] }

post.rollback();

post.get('isDirty');      //=> false
post.get('isAdmin');      //=> false
post.changedAttributes(); //=> {}
```
