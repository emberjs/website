#### Should I use a query or a filter to search records?

It depends on how many records you want to search and whether they have
been loaded into the store.

_Queries_ are useful for doing searches of hundreds, thousands, or even
millions of records. You just hand the search options to your server,
and it is responsible for handing you back the list of records that
match. Because the response from the server includes the ID of all of
the records that matched, it doesn't matter if the store hadn't loaded
them previously; it sees that they are not in the cache and can request
the records by ID if necessary.

The downside of queries is that they do not live update, they are
slower, and they require that your server support the kind of queries
that you wish to perform.

Because the server decides which records match the query, not the store,
queries do not live update. If you want to update them, you must
manually call `reload()` and wait for the server to respond. If you
create a new record on the client, it will not show up in the results
until you both save the new record to the server and reload the query
results.

Because the store must confer with your server to determine the results
of a query, it necessitates a network request. This can feel slow to
users, especially if they are on a slow connection or your server is
slow to respond. The typical speed of JavaScript web applications can
heighten the perceived slowness when the server must be consulted.

Lastly, performing queries requires collaboration between the store and
your server. By default, Ember Data will send the search options that
you pass as the body of an HTTP request to your server. If your server
does not support requests in this format, you will need to either change
your server to do so, or customize how queries are sent by creating a
custom adapter.

_Filters_, on the other hand, perform a live search of all of the records
in the store's cache. As soon as a new record is loaded into the store,
the filter will check to see if the record matches, and if so, add it to
the array of search results. If that array is displayed in a template,
it will update automatically.

Filters also take into account newly created records that have not been
saved, and records that have been modified but not yet saved. If you
want records to show up in search results as soon as they are created or
modified on the client, you should use a filter.

Keep in mind that records will not show up in a filter if the store
doesn't know about them. You can ensure that a record is in the store by
using the store's `push()` method.

There is also a limit to how many records you can reasonably keep in
memory and search before you start hitting performance issues.

Finally, keep in mind that you can combine queries and filters to take
advantage of their respective strengths and weaknesses. Remember that
records returned by a query to the server are cached in the store. You
can use this fact to perform a filter, passing it a query that starts
matching records into the store, and a filter function that matches the
same records.

This will offload searching all of the possible records to the server,
while still creating a live updating list that includes records created
and modified on the client.

```js
App.PostsFavoritedRoute = Ember.Route.extend({
  model: function() {
    var store = this.store;

    // Create a filter for all favorited posts that will be displayed in
    // the template. Any favorited posts that are already in the store
    // will be displayed immediately;
    // Kick off a query to the server for all posts that
    // the user has favorited. As results from the query are
    // returned from the server, they will also begin to appear.
    return store.filter('post', { favorited: true }, function(post) {
      return post.get('isFavorited');
    });
  }
});
```

#### How do I inform Ember Data about new records created on the backend?

When you request a record using Ember Data's `store.find` method, Ember
will automatically load the data into the store. This allows Ember to
avoid the latency of making a round trip to the backend next time
that record is requested. Additionally, loading a record into the
store will update any `RecordArray`s (e.g. the result of
`store.filter` or `store.all`) that should include that record. This
means any data bindings or computed properties that depend on the
`RecordArray` will automatically be synced to include the new or
updated record values.

Some applications may want to add or update records in the store
without requesting the record via `store.find`. To accomplish this you
can use the `DS.Store`'s `push` or `pushPayload`
methods. This is useful for web applications that have a channel
(such as [SSE](http://dev.w3.org/html5/eventsource/) or
[Web Sockets](http://www.w3.org/TR/2009/WD-websockets-20091222/)) to
notify it of new or updated records on the backend.

[push](/api/data/classes/DS.Store.html#method_push)
is the simplest way to load or update records in Ember Data's store.
When using `push` it is important to
[normalize](/api/data/classes/DS.Store.html#method_normalize)
the JSON object before pushing it into the store.

`push` only accepts one record at a time. If you would like to load an
array of records to the store you can call
[pushMany](/api/data/classes/DS.Store.html#method_pushMany).

```js
socket.on('message', function (message) {
  var modelName = message.model;
  store.push(modelName, store.normalize(modelName, message.data));
});
```

As of `v1.0.0-beta.14` the `push` method accepts partial attributes for
updating existing records. The `update` method is therefore deprecated.
Updating partial attributes is useful if your web application only
receives notifications of the changed attributes on a model.

[pushPayload](/api/data/classes/DS.Store.html#method_pushPayload)
is a convenience wrapper for `store#push` that will deserialize
payloads if the model's Serializer implements a `pushPayload`
method. It is important to note this method will not work with the
`JSONSerializer` because it does not implement a `pushPayload`
method.

```js
socket.on('message', function (message) {
  store.pushPayload(message.model, message.data);
});
```
