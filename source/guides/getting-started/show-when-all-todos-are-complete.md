Next we'll update our template to indicate when all todos have been completed. In `index.html` replace the static checkbox `<input>` with an `{{input}}`:

```handlebars
{{! ... additional lines truncated for brevity ... }}
<section id="main">
  {{outlet}}
  {{input type="checkbox" id="toggle-all" checked=allAreDone}}
</section>
{{! ... additional lines truncated for brevity ... }}
```

This checkbox will be checked when the controller property `allAreDone` is `true` and unchecked when the property `allAreDone` is `false`.

In `js/controllers/todos_controller.js` implement the matching `allAreDone` property:

```javascript
// ... additional lines truncated for brevity ...
allAreDone: function(key, value) {
  return !!this.get('length') && this.isEvery('isCompleted');
}.property('@each.isCompleted')
// ... additional lines truncated for brevity ...
```

This property will be `true` if the controller has any todos and every todo's `isCompleted` property is true. If the `isCompleted` property of any todo changes, this property will be recomputed. If the return value has changed, sections of the template that need to update will be automatically updated for us.

Reload your web browser to ensure that there are no errors and the behavior described above occurs. 

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/IcItARE/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/9bf8a430bc4afb06f31be55f63f1d9806e6ab01c)
  * [Ember.Checkbox API documentation](/api/classes/Ember.Checkbox.html)
