TodoMVC allows users to delete all completed todos at once by clicking a button. This button is visible only when there are any completed todos, displays the number of completed todos, and removes all todos from the application when clicked.

In this step, we'll implement that behavior. In `index.html` update the static `<button>` for clearing all completed todos:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
{{#if hasCompleted}}
  <button id="clear-completed" {{action "clearCompleted"}}>
    Clear completed ({{completed}})
  </button>
{{/if}}
<!--- ... additional lines truncated for brevity ... -->
```

In `js/controllers/todos_controller.js` implement the matching properties and a method that will clear completed todos and persist these changes when the button is clicked:

```javascript
// ... additional lines truncated for brevity ...
hasCompleted: function () {
  return this.get('completed') > 0;
}.property('completed'),

completed: function () {
  return this.filterProperty('isCompleted', true).get('length');
}.property('@each.isCompleted'),

clearCompleted: function () {
  var completed = this.filterProperty('isCompleted', true);
  completed.invoke('deleteRecord');

  this.get('store').commit();
}
// ... additional lines truncated for brevity ...
```

Reload your web browser to ensure that there are no errors and the behavior described above occurs. 

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/obagub/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/0ba41cdcbca5cf36bd052d75b91f9dd1b405154c)
  * [Handlebars Conditionals Guide](/guides/templates/conditionals)
  * [Enumerables Guide](/guides/enumerables)
