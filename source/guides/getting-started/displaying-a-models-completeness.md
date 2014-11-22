TodoMVC strikes through completed todos by applying a CSS class `completed` to the `<li>` element. Update `index.html` to apply a CSS class to this element when a todo's `isCompleted` property is true:

```handlebars
{{! ... additional lines truncated for brevity ... }}
<li {{bind-attr class="todo.isCompleted:completed"}}>
  <input type="checkbox" class="toggle">
  <label>{{todo.title}}</label><button class="destroy"></button>
</li>
{{! ... additional lines truncated for brevity ... }}
```

This code will apply the CSS class `completed` when the todo's `isCompleted` property is `true` and remove it when the property becomes `false`.

The first fixture todo in our application has an `isCompleted` property of `true`. Reload the application to see the first todo is now decorated with a strike-through to visually indicate it has been completed.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/sejelu/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/b15e5deffc41cf5ba4161808c7f46a283dc2277f)
  * [bind-attr API documentation](/api/classes/Ember.Handlebars.helpers.html#method_bind-attr)
  * [bind and bind-attr article by Peter Wagenet](http://www.emberist.com/2012/04/06/bind-and-bindattr.html)
