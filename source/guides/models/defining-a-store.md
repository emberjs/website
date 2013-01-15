## Defining a Store

Every application using Ember Data has a store. The store is the
repository that holds loaded models, and is responsible for retrieving
models that have not yet been loaded.

Typically, you will interact with models directly, not the store.
However, you do need to tell Ember.js that you want Ember Data to manage
your models. To do so, simply define a subclass of `DS.Store` on your
`Ember.Application`:

```js
App.Store = DS.Store.extend({
  revision: 11
});
```

Note the `revision` property defined here. This is the API revision
number, and is used by Ember Data to notify you of breaking changes to
the public API. This will be removed once Ember Data reaches 1.0. See
the [Breaking Changes document][1] for more information.

[1]: https://github.com/emberjs/data/blob/master/BREAKING_CHANGES.md

If you want to customize the store, you can do so when creating the
subclass. For example, if you wanted to use an adapter other than the
default `DS.RESTAdapter`, you would do so like this:

```js
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'App.MyCustomAdapter'
});
```

### Multiple Adapters
In some instances it can be necessary to need different adapters for
different models in your project. The Store object supports registering
multiple adapters like so:

```js
App.Store.registerAdapter('App.Post', DS.RESTAdapter.extend({
  // implement adapter
}));
```
