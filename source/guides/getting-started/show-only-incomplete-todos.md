Next we'll update the application so a user can navigate to a url where only todos that are not complete are displayed.

In `index.html` convert the `<a>` tag for 'Active' todos into a Handlebars `{{link-to}}` helper and remove the active class from the `<a>` tag for 'All':

```handlebars
{{! ... additional lines truncated for brevity ... }}
<li>
  <a href="all">All</a>
</li>
<li>
  {{#link-to "todos.active" activeClass="selected"}}Active{{/link-to}}
</li>
<li>
  <a href="completed">Completed</a>
</li>
{{! ... additional lines truncated for brevity ... }}
```

In `js/router.js` update the router to recognize this new path and implement a matching route:

```javascript
Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    // additional child routes will go here later
    this.route('active');
  });
});

// ... additional lines truncated for brevity ...
Todos.TodosActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});
```

The model data for this route is the collection of todos whose `isCompleted` property is `false`. When a todo's `isCompleted` property changes this collection will automatically update to add or remove the todo appropriately.

Normally transitioning into a new route changes the template rendered into the parent `{{outlet}}`, but in this case we'd like to reuse the existing `todos/index` template. We can accomplish this by implementing the `renderTemplate` method and calling `render` ourselves with the specific template and controller options.

Reload your web browser to ensure that there are no errors and the behavior described above occurs.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/gaqey/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/2a1d35293a52e40d0125f552a1a8b2c01f759313)
  * [link-to API documentation](/api/classes/Ember.Handlebars.helpers.html#method_link-to)
  * [Route#renderTemplate API documentation](/api/classes/Ember.Route.html#method_renderTemplate)
  * [Route#render API documentation](/api/classes/Ember.Route.html#method_render)
  * [Ember Router Guide](/guides/routing)
