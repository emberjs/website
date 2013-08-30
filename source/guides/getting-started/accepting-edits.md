In the previous step we updated TodoMVC to allow a user to toggle the display of a text `<input>` for editing a todo's title. Next, we'll add the behavior that immediately focuses the `<input>` when it appears, accepts user input and, when the user presses the `<enter>` key or moves focus away from the editing `<input>` element, persists these changes, then redisplays the todo with its newly updated text.

Create a new file `js/views/edit_todo_view.js`. You may place this file anywhere you like (even just putting all code into the same file), but this guide will assume you have created the file and named it as indicated.

In `js/views/edit_todo_view.js` create an extension of `Ember.TextField`:

```javascript
Todos.EditTodoView = Ember.TextField.extend({
  classNames: ['edit'],

  insertNewline: function () {
    this.get('controller').acceptChanges();
  },

  focusOut: function () {
    this.get('controller').acceptChanges();
  },

  didInsertElement: function () {
    this.$().focus();
  }
});
```

In `index.html` require this new file:

```html
<!--- ... additional lines truncated for brevity ... -->
  <script src="js/controllers/todo_controller.js"></script>
  <script src="js/views/edit_todo_view.js"></script>
</body>
<!--- ... additional lines truncated for brevity ... -->
```

This view implements the `<input>` behavior described above. When the `<input>` is inserted into the page, it will immediately gain focus through its `didInsertElement` event. Pressing the `<enter>` key  will trigger the `insertNewline` event, calling a method `acceptChanges` on this view's instance of `TodoController`. Moving focus away from from the `<input>` will trigger the `focusOut` event, calling a method `acceptChanges` on this view's instance of `TodoController`.

A CSS class `edit` is applied for styling.

In `index.html` replace the static `<input>` element with `Todos.EditTodoView` and connect the `value`:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
{{#if isEditing}}
  {{view Todos.EditTodoView valueBinding="title"}}
{{else}}
<!--- ... additional lines truncated for brevity ... -->
```

This will insert an `<input>` element into our page with the behaviors we added above. Additionally, it will bind the `value` property of this `<input>` to the `title` property of this instance of `TodoController`. We will not implement a `title` property on the controller so it will retain the default behavior of proxying all requests to its `model`. 


In `js/controllers/todo_controller.js`, add the method `acceptChanges` that we called from `EditTodoView`:

```javascript
// ... additional lines truncated for brevity ...
acceptChanges: function () {
  this.set('isEditing', false);
  this.get('model').save();
},
// ... additional lines truncated for brevity ...
```

This method will set the controller's `isEditing` property to false and commit all changes made to the todo.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/ecicok/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/70eb45e2e69e6bbc30a7d8b69812c6696bbc8cd3)
  * [Controller Guide](/guides/controllers)
  * [Ember.TextField API documentation](/api/classes/Ember.TextField.html)
