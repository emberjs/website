Finally we'll replace our fixture data with real persistence so todos will remain between application loads by replacing the fixture adapter with a `localstorage`-aware adapter instead.

Change `js/application.js` to:

```javascript
window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'todos-emberjs'
});
```

The local storage adapter, written by Ryan Florence, can be downloaded [from its source](https://raw.github.com/rpflorence/ember-localstorage-adapter/master/localstorage_adapter.js). Add it to your project as `js/libs/localstorage_adapter.js`. You may place this file anywhere you like (even just putting all code into the same file), but this guide will assume you have created the file and named it as indicated.

In `index.html` include `js/libs/localstorage_adapter.js` as a dependency:

```html
<!--- ... additional lines truncated for brevity ... -->
<script src="js/libs/ember-data.js"></script>
<script src="js/libs/localstorage_adapter.js"></script>
<script src="js/application.js"></script>
 <!--- ... additional lines truncated for brevity ... -->
```

Reload your application. Todos you manage will now persist after the application has been closed.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/pewiki/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/81801d87da42d0c83685ff946c46de68589ce38f)
  * [LocalStorage Adapter on GitHub](https://github.com/rpflorence/ember-localstorage-adapter)
