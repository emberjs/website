## Problem
You want to set multiple properties on an object with a single method call.

## Solution
Use the `setProperties` method of `Ember.Object`.

```js
person.setProperties({
  name: 'Gavin',
  age: 36
})
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/uBiYELO/3/embed?live,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

