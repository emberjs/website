## Transitioning to show only incomplete todos

Next we'll update the application so a user can navigate to a url where only todos that are not complete are displayed.

In `index.html` convert the `<a>` tag for 'Active' todos into a Handlebars `{{linkTo}}` helper:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<li>
  <a href="all" class="selected">All</a>
</li>
<li>
  {{#linkTo todos.active activeClass="selected"}}Active{{/linkTo}}
</li>
<li>
  <a href="completed">Completed</a>
</li>
<!--- ... additional lines truncated for brevity ... -->
```

In `js/router.js` update the router to recognize this new path and implement a matching route:

```javascript
Todos.Router.map(function () {
  this.resource('todos', { path: '/' }, function () {
    // additional child routes    
    this.route('active');
  });
});

// ... additional lines truncated for brevity ...

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function(){
    return Todos.Todo.filter(function (todo) {
      if (!todo.get('isCompleted')) { return true; }
    });
  },
  renderTemplate: function(controller){
    this.render('todos/index', {controller: controller});
  }
});
```

The model data for this route is the collection of todos whose `isCompleted` property is `true`. When a todo's `isCompleted` property changes this collection will automatically update to add or remove the todo appropriately.

Normally transitioning into a new route changes the template rendered into the parent `{{outlet}}`, but in this case we'd like to reuse the existing `todos/index` template. We can can accomplish this by implementing the `renderTemplate` method and calling `render` ourselves with the specific template and controller options.

Reload your web browser to ensure that there are no errors and the behavior described above occurs.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/asixij/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/88d7880e8f7f68c8dc7e6b933d099bf10b191dd6)
  * [linkTo API documentation](/api/classes/Ember.Handlebars.helpers.html#method_linkTo)
  * [Route#renderTemplate API documentation](/api/classes/Ember.Route.html#method_renderTemplate)
  * [Route#render API documentation](/api/classes/Ember.Route.html#method_render)
  * [Ember Router Guide](/guides/routing)
