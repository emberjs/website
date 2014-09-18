Next we'll update our template's hard-coded count of remaining todos to reflect the actual number of remaining todos. Update `index.html` to use two properties:

```handlebars
{{! ... additional lines truncated for brevity ... }}
<span id="todo-count">
  <strong>{{remaining}}</strong> {{inflection}} left
</span>
{{! ... additional lines truncated for brevity ... }}
```

Implement these properties as part of this template's controller, the `Todos.TodosController`:

```javascript
// ... additional lines truncated for brevity ...
actions: {
  // ... additional lines truncated for brevity ...
},

remaining: function() {
  return this.filterBy('isCompleted', false).get('length');
}.property('@each.isCompleted'),

inflection: function() {
  var remaining = this.get('remaining');
  return remaining === 1 ? 'item' : 'items';
}.property('remaining')
// ... additional lines truncated for brevity ...
```

The `remaining` property will return the number of todos whose `isCompleted` property is false. If the `isCompleted` value of any todo changes, this property will be recomputed. If the value has changed, the section of the template displaying the count will be automatically updated to reflect the new value.

The `inflection` property will return either a plural or singular version of the word "item" depending on how many todos are currently in the list. The section of the template displaying the count will be automatically updated to reflect the new value.

 Reload your web browser to ensure that no errors occur. You should now see an accurate number for remaining todos.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/cotoyu/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/b418407ed9666714c82d894d6b70f785674f7a45)
  * [Computed Properties Guide](/guides/object-model/computed-properties/)
