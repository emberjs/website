## Problem
You want to increment or decrement a property.

## Solution
Use the `incrementProperty` or `decrementProperty` methods of `Ember.Object`.

To increment:
```js
person.incrementProperty('age');
```

To decrement:
```js
person.decrementProperty('age');
```

## Discussion
You can optionally specify a value to increment or decrement by:

```js
person.incrementProperty('age', 10);
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/uBiYELO/2/embed?live,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
