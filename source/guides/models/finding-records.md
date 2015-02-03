The Ember Data store provides a simple interface for finding records of a single
type through the `store` object's `find` method. Internally, the `store`
uses `find`, `findAll`, and `findQuery` based on the supplied arguments.

The first argument to `store.find()` is always the record type. The optional second
argument determines if a request is made for all records, a single record, or a query.

### Finding All Records of a Type

```javascript
var posts = this.store.find('post'); // => GET /posts
```

To get a list of records already loaded into the store, without making
another network request, use `all` instead.

```javascript
var posts = this.store.all('post'); // => no network request
```

`find` returns a `DS.PromiseArray` that fulfills to a `DS.RecordArray` and `all`
directly returns a `DS.RecordArray`.

It's important to note that `DS.RecordArray` is not a JavaScript array.
It is an object that implements [`Ember.Enumerable`][1]. This is important
because, for example, if you want to retrieve records by index, the `[]` notation
will not work--you'll have to use `objectAt(index)` instead.

[1]: /api/classes/Ember.Enumerable.html

### Finding a Single Record

If you provide a number or string as the second argument to `store.find()`,
Ember Data will assume that you are passing in an ID and attempt to retrieve a record of the type passed in as the first argument with that ID. This will
return a promise that fulfills with the requested record:

```javascript
var aSinglePost = this.store.find('post', 1); // => GET /posts/1
```

### Querying For Records

If you provide a plain object as the second argument to `find`, Ember Data will
make a `GET` request with the object serialized as query params. This method returns
`DS.PromiseArray` in the same way as `find` with no second argument.

For example, we could search for all `person` models who have the name of
`Peter`:

```javascript
var peters = this.store.find('person', { name: "Peter" }); // => GET to /persons?name=Peter
```

### Integrating with the Route's Model Hook

As discussed in [Specifying a Route's Model][3], routes are
responsible for telling their template which model to render.

[3]: /guides/routing/specifying-a-routes-model

`Ember.Route`'s `model` hook supports asynchronous values
out-of-the-box. If you return a promise from the `model` hook, the
router will wait until the promise has fulfilled to render the
template.

This makes it easy to write apps with asynchronous data using Ember
Data. Just return the requested record from the `model` hook, and let
Ember deal with figuring out whether a network request is needed or not.

```javascript
App.Router.map(function() {
  this.resource('posts');
  this.resource('post', { path: ':post_id' });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  }
})
```
