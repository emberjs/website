Next we'll update our template to indicate when all todos have been completed. In `index.html` replace the static checkbox `<input>` with `Ember.Checkbox`:

```handlebars
<!--- ... additional lines truncated for brevity ... -->
<section id="main">
  {{outlet}}

  {{view Ember.Checkbox id="toggle-all" checkedBinding="allAreDone"}}
</section>
<!--- ... additional lines truncated for brevity ... -->
```

This checkbox will be checked when the controller property `allAreDone` is `true` and unchecked when the property `allAreDone` is `false`.

In `js/controllers/todos_controller.js` implement the matching `allAreDone` property:

```javascript
// ... additional lines truncated for brevity ...
allAreDone: function (key, value) {
  return !!this.get('length') && this.everyProperty('isCompleted', true);
}.property('@each.isCompleted')
// ... additional lines truncated for brevity ...
```

This property will be `true` if the controller has any todos and every todo's `isCompleted` property is true. If the `isCompleted` property of any todo changes, this property will be recomputed. If the return value has changed, sections of the template that need to update will be automatically updated for us.

Reload your web browser to ensure that there are no errors and the behavior described above occurs. 

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/aqurok/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>
    
### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/41b9e0b07edcf20fef76970944fb7345af2a8853)
  * [Ember.Checkbox API documentation](/api/classes/Ember.Checkbox.html)
