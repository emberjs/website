TodoMVC allows users to toggle all existing todos into either a complete or incomplete state. It uses the same checkbox that becomes checked when all todos are completed and unchecked when one or more todos remain incomplete.

To implement this behavior update the `allAreDone` property in `js/controllers/todos_controller.js` to handle both getting and setting behavior:

```javascript
// ... additional lines truncated for brevity ...
allAreDone: function(key, value) {
  if (value === undefined) {
    return !!this.get('length') && this.isEvery('isCompleted', true);
  } else {
    this.setEach('isCompleted', value);
    this.invoke('save');
    return value;
  }
}.property('@each.isCompleted')
// ... additional lines truncated for brevity ...
```

If no `value` argument is passed this property is being used to populate the current value of the checkbox. If a `value` is passed it indicates the checkbox was used by a user and we should set the `isCompleted` property of each todo to this new value.

The count of remaining todos and completed todos used elsewhere in the template automatically re-render for us if necessary.

Reload your web browser to ensure that there are no errors and the behavior described above occurs.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/jipil/1/embed?output">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/47b289bb9f669edaa39abd971f5e884142988663)
  * [Ember.Checkbox API documentation](/api/classes/Ember.Checkbox.html)
  * [Computed Properties Guide](/guides/object-model/computed-properties/)
