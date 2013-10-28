Next we can update the application to allow navigating back to the list of all todos. 

In `index.html` convert the `<a>` tag for 'All' todos into a Handlebars `{{linkTo}}` helper:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<li>
  {{#linkTo "todos.index" activeClass="selected"}}All{{/linkTo}}
</li>
<li>
  {{#linkTo "todos.active" activeClass="selected"}}Active{{/linkTo}}
</li>
<li>
  {{#linkTo "todos.completed" activeClass="selected"}}Completed{{/linkTo}}
</li>
<!--- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that there are no errors. You should be able to navigate between urls for all, active, and completed todos.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/uYuGA/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/843ff914873081560e4ba97df0237b8595b6ae51)
  * [linkTo API documentation](/api/classes/Ember.Handlebars.helpers.html#method_linkTo)
