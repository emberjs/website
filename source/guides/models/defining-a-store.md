## Defining a Store

In Ember Data, the **store** is the object that holds loaded models, and
is responsible for retrieving models that have not yet been loaded.

Once you include the Ember Data library in your application, all of your
controllers and routes will gain access to a new property called
`store`. This instance of `DS.Store` is created for you automatically
and is shared among all of the objects in your application. This will be
your primary interface for 

```js
App.IndexRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    return store.find('person')
  }
});
```
If you want to customize the store, you can do so when creating the
subclass. For example, if you wanted to use an adapter other than the
default `DS.RESTAdapter`, you would do so like this:

```js
App.Store = DS.Store.extend({
  adapter: 'App.MyCustomAdapter'
});
```
