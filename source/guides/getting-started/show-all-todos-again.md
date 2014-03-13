Next we can update the application to allow navigating back to the list of all todos. 

In `index.html` convert the `<a>` tag for 'All' todos into a Handlebars `{{link-to}}` helper:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<li>
  {{#link-to "todos.index" activeClass="selected"}}All{{/link-to}}
</li>
<li>
  {{#link-to "todos.active" activeClass="selected"}}Active{{/link-to}}
</li>
<li>
  {{#link-to "todos.completed" activeClass="selected"}}Completed{{/link-to}}
</li>
<!--- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that there are no errors. You should be able to navigate between urls for all, active, and completed todos.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/quriv/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/2f468676975c8f00057ce79fe3cb179655e5bbaf)
  * [link-to API documentation](/api/classes/Ember.Handlebars.helpers.html#method_link-to)
