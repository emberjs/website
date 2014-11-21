TodoMVC allows users to double click each todo to display a text `<input>` element where the todo's title can be updated. Additionally the `<li>` element for each todo obtains the CSS class `editing` for style and positioning.

We'll update the application to allow users to toggle into this editing state for a todo. In `index.html` update the contents of the `{{each}}` Handlebars helper to:

```handlebars
 {{! ... additional lines truncated for brevity ... }}
{{#each todo in model itemController="todo"}}
  <li {{bind-attr class="todo.isCompleted:completed todo.isEditing:editing"}}>
    {{#if todo.isEditing}}
      <input class="edit">
    {{else}}
      {{input type="checkbox" checked=todo.isCompleted class="toggle"}}
      <label {{action "editTodo" on="doubleClick"}}>{{todo.title}}</label><button class="destroy"></button>
    {{/if}}
  </li>
{{/each}}
 {{! ... additional lines truncated for brevity ... }}
```

The above code applies three new behaviors to our application: it applies the CSS class `editing` when the controller's `isEditing` property is true and removes it when the `isEditing` property is false. We add a new `{{action}}` helper to the `<label>` so double-clicks will call `editTodo` on
this todo's controller. Finally, we wrap our todo in a Handlebars `{{if}}` helper so a text `<input>` will display when we are editing and the todos title will display when we are not editing.

Inside `js/controllers/todo_controller.js` we'll implement the matching logic for this template behavior:

```javascript
Todos.TodoController = Ember.ObjectController.extend({
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    }
  },

  isEditing: false,

// ... additional lines truncated for brevity ...
```

Above we defined an initial `isEditing` value of `false` for controllers of this type and said that when the `editTodo` action is called it should set the `isEditing` property of this controller to `true`.  This will automatically trigger the sections of template that use `isEditing` to update their rendered content.

Reload your web browser to ensure that no errors occur. You can now double-click a todo to edit it.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/tucapa/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/616bc4f22900bbaa2bf9bdb8de53ba41209d8cc0)
  * [Handlebars Conditionals Guide](/guides/templates/conditionals)
  * [bind-attr API documentation](/api/classes/Ember.Handlebars.helpers.html#method_bind-attr)
  * [action API documentation](/api/classes/Ember.Handlebars.helpers.html#method_action)
  * [bind and bindAttr article by Peter Wagenet](http://www.emberist.com/2012/04/06/bind-and-bindattr.html)
