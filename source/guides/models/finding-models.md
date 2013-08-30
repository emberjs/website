You can retrieve a record by passing its unique ID to the `find()` method:

```js
var post = App.Post.find(1);
```

If a record with that ID has already been created, it will be returned
immediately. This feature is sometimes called an _identity map_.

Otherwise, a new record will be created and put into the loading
state, then returned. Feel free to use this record in templates; because
everything in Ember.js is bindings-aware, templates will automatically
update as soon as the record finishes loading.

### Finding All Records

You can find all records for a given model by calling `find()` without
arguments:

```js
var posts = App.Post.find();
```

This will return an instance of `DS.RecordArray`. Like with records, the
record array will start in a loading state with a `length` of `0`, but
you can immediately use it in your templates. When the server responds
with results, the templates will watch for changes in the length of the
array and update themselves automatically.

Note: `DS.RecordArray` is not a JavaScript array, it is an object that
implements `Ember.Enumerable`. If you want to, for example, retrieve
records by index, you must use the `objectAt(index)` method. Since the
object is not a JavaScript array, using the `[]` notation will not work.
For more information, see [Ember.Enumerable][1] and [Ember.Array][2].

[1]: http://emberjs.com/api/classes/Ember.Enumerable.html
[2]: http://emberjs.com/api/classes/Ember.Array.html

### Queries

You can query the server by passing a hash  to `find()`.

```js
var people = App.Person.find({ name: "Peter" });
```

The contents of the hash is opaque to Ember Data; it is up to your
server to interpret it and return a list of records.
