Next we will split our single template into a set of nested templates so we can transition between different lists of todos in reaction to user interaction.

In `index.html` move the entire `<ul>` of todos into a new template named `todos/index` by adding a new Handlebars template `<script>` tag inside the `<body>` of the document:

```html
<!--- ... additional lines truncated for brevity ... -->
<body>
<script type="text/x-handlebars" data-template-name="todos/index">
  <ul id="todo-list">
    {{#each todo in model itemController="todo"}}
      <li {{bind-attr class="todo.isCompleted:completed todo.isEditing:editing"}}>
        {{#if todo.isEditing}}
          {{edit-todo class="edit" value=todo.title focus-out="acceptChanges" insert-newline="acceptChanges"}}
        {{else}}
          {{input type="checkbox" checked=todo.isCompleted class="toggle"}}
          <label {{action "editTodo" on="doubleClick"}}>{{todo.title}}</label><button {{action "removeTodo"}} class="destroy"></button>
        {{/if}}
      </li>
    {{/each}}
  </ul>
</script>
<!--- ... additional lines truncated for brevity ... -->
```

Still within `index.html` place a Handlebars `{{outlet}}` helper where the `<ul>` was previously:


```handlebars
{{! ... additional lines truncated for brevity ... }}
<section id="main">
  {{outlet}}

  <input type="checkbox" id="toggle-all">
</section>
{{! ... additional lines truncated for brevity ... }}
```

The `{{outlet}}` Handlebars helper designates an area of a template that will dynamically update as we transition between routes. Our first new child route will fill this area with the list of all todos in the application.

In `js/router.js` update the router to change the `todos` mapping, with an additional empty function parameter so it can accept child routes, and add this first `index` route:

```javascript
Todos.Router.map(function () {
  this.resource('todos', { path: '/' }, function () {
    // additional child routes will go here later
  });
});

// ... additional lines truncated for brevity ...

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});
```

When the application loads at the url `'/'` Ember.js will enter the `todos` route and render the `todos` template as before. It will also transition into the `todos.index` route and fill the `{{outlet}}` in the `todos` template with the `todos/index` template.  The model data for this template is the result of the `model` method of `TodosIndexRoute`, which indicates that the
model for this route is the same model as for the `TodosRoute`.

This mapping is described in more detail in the [Naming Conventions Guide](/guides/concepts/naming-conventions).

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/teheni/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/3bab8f1519ffc1ca2d5a12d1de35e4c764c91f05)
  * [Ember Router Guide](/guides/routing)
  * [Ember Controller Guide](/guides/controllers)
  * [outlet API documentation](/api/classes/Ember.Handlebars.helpers.html#method_outlet)
