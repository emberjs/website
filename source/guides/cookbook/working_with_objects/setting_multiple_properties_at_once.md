### Problem
You want to set multiple properties on an object with a single method call.

### Solution
Use the `setProperties` method of `Ember.Object`.

```js
person.setProperties({
  name: 'Gavin',
  age: 36
})
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/uPaPEcO/2/edit?js,output">JS Bin</a>

