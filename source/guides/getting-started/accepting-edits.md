In the previous step we updated TodoMVC to allow a user to toggle the display of a text `<input>` for editing a todo's title. Next, we'll add the behavior that immediately focuses the `<input>` when it appears, accepts user input and, when the user presses the `<enter>` key or moves focus away from the editing `<input>` element, persists these changes, then redisplays the todo with its newly updated text.

To accomplish this, we'll create a new custom component and register it with Handlebars to make it available to our templates.

Create a new file `js/views/edit_todo_view.js`. You may place this file anywhere you like (even just putting all code into the same file), but this guide will assume you have created the file and named it as indicated.

In `js/views/edit_todo_view.js` create an extension of `Ember.TextField` and register it as
a [helper](/api/classes/Ember.Handlebars.html#method_helper):

```javascript
Todos.EditTodoView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);
```

In `index.html` require this new file:

```html
<!--- ... additional lines truncated for brevity ... -->
  <script src="js/controllers/todo_controller.js"></script>
  <script src="js/views/edit_todo_view.js"></script>
</body>
<!--- ... additional lines truncated for brevity ... -->
```

In `index.html` replace the static `<input>` element with our custom `{{edit-todo}}` component, connecting the `value` property, and actions:

```handlebars
{{! ... additional lines truncated for brevity ... }}
{{#if todo.isEditing}}
  {{edit-todo class="edit" value=todo.title focus-out="acceptChanges"
                           insert-newline="acceptChanges"}}
{{else}}
{{! ... additional lines truncated for brevity ... }}
```

Pressing the `<enter>` key  will trigger the `acceptChanges` event on the instance of `TodoController`. Moving focus away from the `<input>` will trigger the `focus-out` event, calling a method `acceptChanges` on this view's instance of `TodoController`.

Additionally, we connect the `value` property of this `<input>` to the `title` property of this instance of `TodoController`. We will not implement a `title` property on the controller so it will retain the default behavior of [proxying all requests](/guides/controllers/#toc_representing-models) to its `model`.

A CSS class `edit` is applied for styling.

In `js/controllers/todo_controller.js`, add the method `acceptChanges` that we called from `EditTodoView`:

```javascript
// ... additional lines truncated for brevity ...
actions: {
  editTodo: function() {
    this.set('isEditing', true);
  },
  acceptChanges: function() {
    this.set('isEditing', false);

    if (Ember.isEmpty(this.get('model.title'))) {
      this.send('removeTodo');
    } else {
      this.get('model').save();
    }
  },
  removeTodo: function () {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  }
},
// ... additional lines truncated for brevity ...
```

This method will set the controller's `isEditing` property to false and commit all changes made to the todo.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/gureki/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/a7e2f40da4d75342358acdfcbda7a05ccc90f348)
  * [Controller Guide](/guides/controllers)
  * [Ember.TextField API documentation](/api/classes/Ember.TextField.html)
