TodoMVC displays a button for removing todos next to each todo when its `<li>` is hovered. Clicking this button will remove the todo and update the display of remaining incomplete todos and remaining completed todos appropriately.

In `index.html` update the static `<button>` element to include an `{{action}}` Handlebars helper:

```handlebars
{{! ... additional lines truncated for brevity ... }}
<button {{action "removeTodo"}} class="destroy"></button>
{{! ... additional lines truncated for brevity ... }}
```

This will call the `removeTodo` action defined in the previous chapter and will delete the todo locally and then persist this data change.

Because the todo is no longer part of the collection of all todos, its `<li>` element in the page will be automatically removed for us. If the deleted todo was incomplete, the count of remaining todos will be decreased by one and the display of this number will be automatically re-rendered. If the new count results in an inflection change between "todo" and "todos" this area of the page will be automatically re-rendered.

Reload your web browser to ensure that there are no errors and the behaviors described above occurs.

**Note**: The current action may be invoked twice (via `acceptChanges`) leading to an exception. For details on how to handle this situation, please see [the latest version of the TodoMVC source](https://github.com/tastejs/todomvc/blob/gh-pages/examples/emberjs/js/controllers/todo_controller.js).

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/kebigu/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/14e1f129f76bae8f8ea6a73de1e24d810678a8fe)
  * [action API documentation](/api/classes/Ember.Handlebars.helpers.html#method_action)
