## Creating New Model Instance

Next we'll update our static HTML `<input>` to an Ember view that can expose more complex behaviors.  Update `index.html` to replace the new todo `<input>` with an `Ember.TextField`:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<h1>todos</h1>
{{view Ember.TextField id="new-todo" placeholder="What needs to be done?"
       valueBinding="newTitle" action="createTodo"}}
<!--- ... additional lines truncated for brevity ... -->
```

This will render an `<input>` element at this location with the same `id` and `placeholder` attributes applied. It will also connect the `newTitle` property of this template's controller to the `value` attribute of the `<input>`. When one changes, the other will automatically update to remain synchronized.

Additionally, we connect user interaction (pressing the `<enter>` key) to a method `createTodo` on this template's controller.

Because we have not needed custom controller behavior until this point, Ember.js provided a default controller object for this template. To handle our new behavior, we can implement the controller class Ember.js expects to find [according it its naming conventions](/guides/concepts/naming-conventions) and add our custom behavior. This new controller class will automatically be associated with this template for us.

Add a `js/controllers/todos_controller.js` file. You may place this file anywhere you like (even just putting all code into the same file), but this guide will assume you have created the file and named it as indicated.

Inside `js/controllers/todos_controller.js` implement the controller Ember.js expects to find [according it its naming conventions](/guides/concepts/naming-conventions):

```javascript
Todos.TodosController = Ember.ArrayController.extend({
  createTodo: function () {
    // Get the todo title set by the "New Todo" text field
    var title = this.get('newTitle');
    if (!title.trim()) { return; }

    // Create the new Todo model
    var todo = Todos.Todo.createRecord({
      title: title,
      isCompleted: false
    });

    // Clear the "New Todo" text field
    this.set('newTitle', '');

    // Save the new model
    todo.save();
  }
});
```

This controller will now respond to user interaction by using its `newTitle` property as the title of a new todo whose `isCompleted` property is false.  Then it will clear its `newTitle` property which will synchronize to the template and reset the textfield. Finally, it persists any unsaved changes on the todo.

In `index.html` include `js/controllers/todos_controller.js` as a dependency:

```html
<!--- ... additional lines truncated for brevity ... -->
   <script src="js/models/store.js"></script>
   <script src="js/models/todo.js"></script>
   <script src="js/controllers/todos_controller.js"></script>
 </body>
 <!--- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that all files have been referenced correctly and no errors occur. You should now be able to add additional todos by entering a title in the `<input>` and hitting the `<enter>` key.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/irutag/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script> 

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/39443bce54a8a7465221ae443b83d3c4a1e3980f)
  * [Ember.TextField API documention](/api/classes/Ember.TextField.html)
  * [Ember Controller Guide](/guides/controllers)
  * [Naming Conventions Guide](/guides/concepts/naming-conventions)
