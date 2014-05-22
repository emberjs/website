TodoMVC displays a button for removing todos next to each todo when its `<li>` is hovered. Clicking this button will remove the todo and update the display of remaining incomplete todos and remaining completed todos appropriately.

In `index.html` update the static `<button>` element to include an `{{action}}` Handlebars helper:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<button {{action "removeTodo"}} class="destroy"></button>
<!--- ... additional lines truncated for brevity ... -->
```

In `js/controllers/todo_controller.js` implement the `removeTodo` method referenced in the template's `{{action}}` Handlebars helper:

```javascript
// ... additional lines truncated for brevity ...
actions: {
  // ... additional lines truncated for brevity ...
  removeTodo: function() {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  }
}
// ... additional lines truncated for brevity ...
```

This method will delete the todo locally and then persist this data change.

Because the todo is no longer part of the collection of all todos, its `<li>` element in the page will be automatically removed for us. If the deleted todo was incomplete, the count of remaining todos will be decreased by one and the display of this number will be automatically re-rendered. If the new count results in an inflection change between "item" and "items" this area of the page will be automatically re-rendered.

Reload your web browser to ensure that there are no errors and the behaviors described above occurs.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/eREkanA/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/14e1f129f76bae8f8ea6a73de1e24d810678a8fe)
  * [action API documention](/api/classes/Ember.Handlebars.helpers.html#method_action)
