`store.find()` allows you to find all records, single records, and query for records.
 The first argument to `.find` is always the type of record in question. E.g. `post`. The second
 argument is optional and can either be a plain object of search options or an id. Below are some examples:

### Finding All Records of a Type


```js
var posts = store.find('post');
```

This will return an instance of `DS.RecordArray`. As with records, the
record array will start in a loading state with a `length` of `0`.
When the server responds with results, any references to the record array
will update automatically.

**Note** `DS.RecordArray` is not a JavaScript array, it is an object that
implements `Ember.Enumerable`. If you want to, for example, retrieve
records by index, you must use the `objectAt(index)` method. Since the
object is not a JavaScript array, using the `[]` notation will not work.
For more information, see [Ember.Enumerable][1] and [Ember.Array][2].

[1]: http://emberjs.com/api/classes/Ember.Enumerable.html
[2]: http://emberjs.com/api/classes/Ember.Array.html

**Another Note** To get a list of records already loaded into the store, without firing
another network request, use `store.all('post')` instead.

### Finding a Single Record

You can retrieve a record by passing its model and unique ID to the `find()`
method. The ID can be either a string or a number. This will return a promise that
fulfills with the requested record:

```js
store.find('post', 1).then(function(post) {
  post.set('title', "My Dark Twisted Fantasy");
});
```

#### Integrating with the Route's Model Hook

As discussed in [Specifying a Route's
Model](/guides/routing/specifying-a-routes-model), routes are
responsible for telling their template which model to render.

`Ember.Route`'s `model` hook supports asynchronous values
out-of-the-box. If you return a promise from the `model` hook, the
router will wait until the promise has fulfilled to render the
template.

This makes it easy to write apps with asynchronous data using Ember
Data. Just return the requested record from the `model` hook, and let
Ember deal with figuring out whether a network request is needed or not:

```js
App.Router.map(function() {
  this.resource('post', { path: ':post_id' });
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('post', params.post_id);
  }
});
```

In fact, this pattern is so common, the above `model` hook is the
default implementation for routes with a dynamic segment. If you're
using Ember Data, you only need to override the `model` hook if you need
to return a model different from the record with the provided ID.

### Querying For Records

You can query the server by calling the store's `find()` method and
passing a hash of search options. This method returns a promise that
fulfills with an array of the search results.

For example, we could search for all `person` models who have the name of
`Peter`:

```js
store.find('person', { name: "Peter" }).then(function(people) {
  console.log("Found " + people.get('length') + " people named Peter.");
});
```

The hash of search options that you pass to `find()` is opaque to Ember
Data. By default, these options will be sent to your server as the body
of an HTTP `GET` request.

**Using this feature requires that your server knows how to interpret
query responses.**
