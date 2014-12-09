In this step we'll update our application to allow a user to mark a todo as complete or incomplete and persist the updated information.

In `index.html` update your template to wrap each todo in its own controller by adding an `itemController` argument to the `{{each}}` Handlebars helper. Then convert our static `<input type="checkbox">` into a `{{input}}` helper:

```handlebars
{{! ... additional lines truncated for brevity ... }}
{{#each todo in model itemController="todo"}}
  <li {{bind-attr class="todo.isCompleted:completed"}}>
    {{input type="checkbox" checked=todo.isCompleted class="toggle"}}
    <label>{{todo.title}}</label><button class="destroy"></button>
  </li>
{{/each}}
{{! ... additional lines truncated for brevity ... }}
```

When this `{{input}}` is rendered it will ask for the current value of the controller's `isCompleted` property. When a user clicks this input, it will set the value of the controller's `isCompleted` property to either `true` or `false` depending on the new checked value of the input.

 Reload your web browser to ensure that all files have been referenced correctly and no errors occur. You should now be able to change the `isCompleted` property of a todo.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/gizopu/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/8d469c04c237f39a58903a3856409a2592cc18a9)
  * [Ember.Checkbox API documentation](/api/classes/Ember.Checkbox.html)
  * [Ember Controller Guide](/guides/controllers)
  * [Naming Conventions Guide](/guides/concepts/naming-conventions)
