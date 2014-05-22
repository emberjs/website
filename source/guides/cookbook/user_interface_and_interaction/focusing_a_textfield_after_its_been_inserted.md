### Problem
You have an Ember.TextField instance that you would like become focused after it's been inserted.

### Solution
Subclass `Ember.TextField` and define a method marked with
`.on('didInsertElement')`. Inside this method apply `focus`
to the text field by accessing the components's jQuery `$` property:

```javascript
App.FocusInputComponent = Ember.TextField.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});
```

For the component's template:

```handlebars
Focus Input component!
```

```handlebars
{{focus-input}}
```

### Discussion
Custom components provide a way to extend native HTML elements with new behavior
like autofocusing.

Our App.FocusInputComponent is an extension of the Ember.TextField component
with a `becomeFocused` method added. After it is added to the DOM, every
component in Ember.js has access to an underlying jQuery object. This object wraps
the component's element and provides a unified, cross-browser interface for DOM
manipulations like triggering focus.

Because we can only work with these DOM features once an Ember.js component has
been added to the DOM we need to wait for this event to occur. Component's have a
`didInsertElement` event that is triggered when the component has been added to the
DOM.

By default Ember.js extends the native `Function.prototype` object to include a
number of additional functions, the `on` function among them.  `on` gives us a declarative
syntax for signify that a method should be called when a specific event has fired. In this case,
we want to call our new `becomeFocused` method when the `didInsertElement` is fired for an instance 
of our component.

Prototype extension can be disabled by setting the `Ember.EXTEND_PROTOTYPES` property to false.

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OlUGODo/4/edit?html,js,output">JS Bin</a>
