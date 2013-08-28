Before your application can display a model, it must first load it from
the server. Of course, since network requests can be expensive, it is
important to only request a given record once. 

To keep track of which records are loaded and which still need to be
fetched, every controller and route in your application has access to a
**store**. You can think of the store as a cache of all of the records
available in your app.

### Getting Records into the Store

There are two ways of getting records into the store.

First, you can manually push records into the store. This is useful if,
for example, you have a streaming API that notifies your application of
new records as soon as they are created.

For more about pushing records into the store, see:

* [Pushing Records into the
  Store](/guides/models/pushing-records-into-the-store)
* [Connecting to a Streaming
  API](/guides/models/connecting-to-a-streaming-api)

Second, you can ask the store for a record. If the store doesn't already
have the record loaded, it will ask its _adapter_ to load it from the
server. The record that your server returns will be pushed into the
store automatically.

Note that if the record _has_ been loaded, the store returns it
immediately without making an unnecessary network request.

### Accessing the Store

Once you include the Ember Data library in your application, all of your
controllers and routes will automatically gain access to a new property
called `store`. This instance of `DS.Store` is created for you
automatically and is shared among all of the objects in your
application.

You will use the store to retrieve records, as well to create new ones.
For example, we might want to find an `App.Person` model with the ID of
`1` from our route's `model` hook:

```js
App.IndexRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    return store.find('person', 1)
  }
});
```

For more about finding records, see [Finding a
Record](/guides/models/finding-a-record).

If you want to customize the store, you can do so by creating a subclass
of `DS.Store`.

For example, if you want to use an adapter other than the default
`DS.RESTAdapter`, you would would define a new subclass like this:

```js
App.Store = DS.Store.extend({
  adapter: 'my-custom-adapter'
});
```
