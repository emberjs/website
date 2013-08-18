Before your application can display a model, it must first load it from
the server. Of course, since network requests can be expensive, it is
important to only request a given record once. 

In Ember Data, instead of making network requests yourself, you'll ask
the **store** to give you records. If the record has not been loaded
yet, the store will make a network request to retrieve it. Otherwise, if
the record _has_ been loaded, the store returns it immediately without
making an unnecessary network request.

Once you include the Ember Data library in your application, all of your
controllers and routes will automatically gain access to a new property
called `store`. This instance of `DS.Store` is created for you
automatically and is shared among all of the objects in your
application.

You will use the store to retrieve records, as well to create new
ones. For example, we might want to find an `App.Person` model with the ID of `1`
from our route's `model` hook:

```js
App.IndexRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    return store.find('person', 1)
  }
});
```

If you want to customize the store, you can do so by creating a subclass
of `DS.Store`. For example, if you wanted to use an adapter other than the
default `DS.RESTAdapter`, you would would create a new `Store` on your
`Ember.Application`:

```js
App.Store = DS.Store.extend({
  adapter: 'my-custom-adapter'
});
```
