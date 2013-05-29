## Defining a Store

Every application using Ember Data has a store. The store is the
repository that holds loaded models, and is responsible for retrieving
models that have not yet been loaded.

Typically, you will interact with models directly, not the store.
However, you do need to tell Ember.js that you want Ember Data to manage
your models. To do so, simply define a subclass of `DS.Store` on your
`Ember.Application`:

```js
App.Store = DS.Store.extend();
```

If you want to customize the store, you can do so when creating the
subclass. For example, if you wanted to use an adapter other than the
default `DS.RESTAdapter`, you would do so like this:

```js
App.Store = DS.Store.extend({
  adapter: 'App.MyCustomAdapter'
});
```
