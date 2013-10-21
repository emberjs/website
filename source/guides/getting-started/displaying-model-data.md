Next we'll update our application to display dynamic todos, replacing our hard coded section in the `todos` template.

Inside the file `js/router.js` implement a `TodosRoute` class with a `model` function that returns all the existing todos:

```javascript
// ... additional lines truncated for brevity ...
Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('todo');
  }
});
```

Because we hadn't implemented this class before, Ember.js provided a `Route` for us with the default behavior of rendering a matching template named `todos` using its [naming conventions for object creation](/guides/concepts/naming-conventions/).

Now that we need custom behavior (returning a specific set of models), we implement the class and add the desired behavior.

Update `index.html` to replace the static `<li>` elements with a Handlebars `{{each}}` helper and a dynamic `{{title}}` for each item.

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<ul id="todo-list">
  {{#each}}
    <li>
      <input type="checkbox" class="toggle">
      <label>{{title}}</label><button class="destroy"></button>
    </li>
  {{/each}}
</ul>
<!--- ... additional lines truncated for brevity ... -->
```

The template loops over the content of its controller. This controller is an instance of `ArrayController` that Ember.js has provided for us as the container for our models. Because we don't need custom behavior for this object yet, we can use the default object provided by the framework.

Reload your web browser to ensure that all files have been referenced correctly and no errors occur.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/EJISAne/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>
  
### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/87bd57700110d9dd0b351c4d4855edf90baac3a8)
  * [Templates Guide](/guides/templates/handlebars-basics)
  * [Controllers Guide](/guides/controllers)
  * [Naming Conventions Guide](/guides/concepts/naming-conventions)
