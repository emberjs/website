## Problem
You have a Ember.TextField instance that you would like become focused after it's been inserted

## Solution
Subclass `Ember.TextField` and define an arbitrarily named method marked with
`.on('didInsertElement')`. Inside the method apply `focus` to the text field by accessing the view's jQuery `$` property.

## Discussion
Create an Ember application:

```javascript
var App = Ember.Application.create();
```

Create a custom text field view by inheriting from the built in `Ember.TextField`:

```javascript
App.SomeView = Ember.TextField.extend({});
```

Define an arbitrarily named method for your view that listens for the `didInsertElement` change event. Your view is notified of this event when the view's DOM node is inserted into the page:

```javascript
App.SomeView = Ember.TextField.extend({
  focusMyTextField: function() {
    // DOM manipulation happens in here, explained in the next step
  }.on('didInsertElement')
});
```

Next, Apply focus to the view's DOM element within the body of your method using jQuery via `this.$().focus()`. Note that `this.$()` provides access to the DOM element of this view only, not the whole page. `focus` is a standard jQuery method.

```javascript
App.SomeView = Ember.TextField.extend({
  focusMyTextField: function() {
    this.$().focus();
  }.on('didInsertElement')
});
```

Finally, output your view to a template:

```handlebars
{{view App.SomeView}}
```

The result is an HTML text field that automatically has keyboard focus when the template renders.

#### Example

<a class="jsbin-embed" href="http://jsbin.com/ePiCiVa/7/embed?html,js,output>JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>