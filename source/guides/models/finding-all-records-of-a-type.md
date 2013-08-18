You can find all records for a given model by calling the store's
`findAll()` method:

```js
var posts = store.findAll('post');
```

This will return an instance of `DS.RecordArray`. Like with records, the
record array will start in a loading state with a `length` of `0`, but
you can immediately use it in your templates. When the server responds
with results, the templates will watch for changes in the length of the
array and update themselves automatically.

**Note** `DS.RecordArray` is not a JavaScript array, it is an object that
implements `Ember.Enumerable`. If you want to, for example, retrieve
records by index, you must use the `objectAt(index)` method. Since the
object is not a JavaScript array, using the `[]` notation will not work.
For more information, see [Ember.Enumerable][1] and [Ember.Array][2].

[1]: http://emberjs.com/api/classes/Ember.Enumerable.html
[2]: http://emberjs.com/api/classes/Ember.Array.html
