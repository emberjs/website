Next we'll update the application so a user can navigate to a url where only todos that have already been completed are displayed.

In `index.html` convert the `<a>` tag for 'Completed' todos into a Handlebars `{{link-to}}` helper:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<li>
  <a href="all">All</a>
</li>
<li>
  {{#link-to "todos.active" activeClass="selected"}}Active{{/link-to}}
</li>
<li>
  {{#link-to "todos.completed" activeClass="selected"}}Completed{{/link-to}}
</li>
<!--- ... additional lines truncated for brevity ... -->
```

In `js/router.js` update the router to recognize this new path and implement a matching route:

```javascript
Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    // additional child routes
    this.route('active');
    this.route('completed');
  });
});

// ... additional lines truncated for brevity ...

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});
```

The model data for this route is the collection of todos whose `isCompleted` property is `true`. When a todo's `isCompleted` property changes this collection will automatically update to add or remove the todo appropriately.

Normally transitioning into a new route changes the template rendered into the parent `{{outlet}}`, but in this case we'd like to reuse the existing `todos/index` template. We can accomplish this by implementing the `renderTemplate` method and calling `render` ourselves with the specific template and controller options.

Reload your web browser to ensure that there are no errors and the behavior described above occurs.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/OzUvuPu/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/bba939a11197552e3a927bcb3a3adb9430e4f331)
  * [link-to API documentation](/api/classes/Ember.Handlebars.helpers.html#method_link-to)
  * [Route#renderTemplate API documentation](/api/classes/Ember.Route.html#method_renderTemplate)
  * [Route#render API documentation](/api/classes/Ember.Route.html#method_render)
  * [Ember Router Guide](/guides/routing)
