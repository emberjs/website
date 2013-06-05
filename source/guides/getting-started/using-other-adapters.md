## Replacing the Fixture Adapter with Another Adapter

Finally we'll replace our fixture data with real persistence so todos will remain between application loads by replacing the fixture adapter with a `localstorage`-aware adapter instead.

Change `js/models/store.js` to:

```javascript
Todos.Store = DS.Store.extend({
  revision: 12,
  adapter: 'Todos.LSAdapter'
});

Todos.LSAdapter = DS.LSAdapter.extend({
  namespace: 'todos-emberjs'
});
```

The local storage adapter, written by Ryan Florence, can be downloaded [from its source](https://github.com/rpflorence/ember-localstorage-adapter). Add it to your project as `js/libs/local_storage_adapter.js`. You may place this file anywhere you like (even just putting all code into the same file), but this guide will assume you have created the file and named it as indicated.

In `index.html` include `js/libs/local_storage_adapter.js` as a dependency:

```html
<!--- ... additional lines truncated for brevity ... -->
<script src="js/libs/ember-data.js"></script>
<script src="js/libs/local_storage_adapter.js"></script>
<script src="js/application.js"></script>
 <!--- ... additional lines truncated for brevity ... -->
```

Reload your application. Todos you manage will now persist after the application has been closed.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/aqexej/3/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/4830fbe41ed41326ac26025cb98104a0c258dd03)
  * [LocalStorage Adapter on GitHub](https://github.com/rpflorence/ember-localstorage-adapter)
