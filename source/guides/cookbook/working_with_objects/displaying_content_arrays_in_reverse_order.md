## Problem
You want to display an Ember content array from an ArrayController in descending order instead of ascending order (the default).

## Solution
1. Convert the built-in content array to a normal JavaScript array, then reverse it.
   You use Ember's @each property to mirror the reverse change to the content array.
2. User the built-in `sortProperties` and `sortAscending` properties to reverse the order.

## Discussion

One way to achieve that is to extend `Ember.ArrayController` with a new function called `reverse`.
You will also have to create a computed property:
```javascript
reversedArray: function() {
    return this.toArray().reverse();
  }.property('myArray.@each')
```

Once you do that, you will be able to use `reversedArray` property in your Handlebars template: `{{#each reversedArray}}{{/each}}`.

Another way to do it is to leverage out of the box EmberJs functionality and to use `sortProperties` and `sortAscending` properties.
Just specify them on your controller, like so:
```javascript
App.MyController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false
});
```

And in your template you will be able to consume a reversed array, like this: `{{#each arrangedContent}}{{/each}}`.

### Example

<a class="jsbin-embed" href="http://jsbin.com/opid/3/embed?html,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>