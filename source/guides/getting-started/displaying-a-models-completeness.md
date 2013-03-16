## Displaying a Model's Complete State

TodoMVC strikes through completed todos by applying a CSS class `completed` to the `<li>` element. Update `index.html` to apply a CSS class to this element when a todo's `isCompleted` property is true:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<li {{bindAttr class="isCompleted:completed"}}>
  <input type="checkbox" class="toggle">
  <label>{{title}}</label><button class="destroy"></button>
</li>
<!--- ... additional lines truncated for brevity ... -->
```

This code will apply the CSS class `completed` when the todo's `isCompleted` property is `true` and remove it when the property becomes `false`.

The first fixture todo in our application has a `isCompleted` property of `true`. Reload the application to see the first todo is now decorated with a strike-through to visually indicate it has been completed.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/iqofac/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script> 
  
### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/19d08dd3b294187fadbe57860cf68fc0dc629ad8)
  * [bindAttr API documentation](/api/classes/Ember.Handlebars.helpers.html#method_bindAttr)
  * [bind and bindAttr article by Peter Wagenet](http://www.emberist.com/2012/04/06/bind-and-bindattr.html)