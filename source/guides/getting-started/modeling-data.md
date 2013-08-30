Next we will create a model class to describe todo items and a data store to track them locally. 

Create a file at `js/models/todo.js` and put the following code inside:

```javascript
Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});
```

This code creates a new class `Todo` and places it within your application's namespace. Each todo will have two attributes: `title` and `isCompleted`.

Create a file at `js/models/store.js` and put the following code inside:

```javascript
Todos.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});
```

This code creates a new class `Store` and places it within your application's namespace. The store will track local instances of `Todos.Todo`. It will persist these instances using the built-in `DS.FixtureAdapter`, an adapter for using fixture data in the early stages of development before long-term persistence is required.

You may place these files anywhere you like (even just putting all code into the same file), but this guide will assume you have separated them into their own files and named them as indicated.

Finally, update your `index.html` to include references to these new files:

```html
<!-- ... additional lines truncated for brevity ... -->
  <script src="js/models/store.js"></script>
  <script src="js/models/todo.js"></script>
</body>
<!-- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that all files have been referenced correctly and no errors occur.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/ovizun/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/979ba3a329b8157bb199fda4b8c6a43bab5b6900)
  * [Defining A Store Guide](/guides/models/defining-a-store)
  * [Defining Models Guide](/guides/models/defining-models)
