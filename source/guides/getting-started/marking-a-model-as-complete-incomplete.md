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

Implement the controller for each todo by matching the name used as the `itemController` value to a class in your application `Todos.TodoController`. Create a new file at `js/controllers/todo_controller.js` for this code. You may place this file anywhere you like (even just putting all code into the same file), but this guide will assume you have created the file and named it as indicated.

Inside `js/controllers/todo_controller.js` add code for `Todos.TodoController` and its `isCompleted` property:

```javascript
Todos.TodoController = Ember.ObjectController.extend({
  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')
});
```

When called from the template to display the current `isCompleted` state of the todo, this property will [proxy that question](http://emberjs.com/api/classes/Ember.ObjectController.html) to its underlying `model`. When called with a value because a user has toggled the checkbox in the template, this property will set the `isCompleted` property of its `model` to the passed value (`true` or `false`), persist the model update, and return the passed value so the checkbox will display correctly.

The `isCompleted` function is marked a [computed property](/guides/object-model/computed-properties/) whose value is dependent on the value of `model.isCompleted`.

In `index.html` include `js/controllers/todo_controller.js` as a dependency:

```html
<!--- ... additional lines truncated for brevity ... -->
   <script src="js/models/todo.js"></script>
   <script src="js/controllers/todos_controller.js"></script>
   <script src="js/controllers/todo_controller.js"></script>
 </body>
 <!--- ... additional lines truncated for brevity ... -->
```

 Reload your web browser to ensure that all files have been referenced correctly and no errors occur. You should now be able to change the `isCompleted` property of a todo.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/gizopu/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/8d469c04c237f39a58903a3856409a2592cc18a9)
  * [Ember.Checkbox API documentation](/api/classes/Ember.Checkbox.html)
  * [Ember Controller Guide](/guides/controllers)
  * [Computed Properties Guide](/guides/object-model/computed-properties/)
  * [Naming Conventions Guide](/guides/concepts/naming-conventions)
