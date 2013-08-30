## Problem

You're displaying formatted values in user inputs and need to remove the
decoration to set the attributes upstream.

## Solution

Make use of the [computed property's setter][setters] to remove the
display formatting and set the property to the proper value.

```js
formattedAmount: function(key, value) {
  if (arguments.length > 1) {
    // setter
    var cleanAmount = accounting.unformat(value);
    this.set('amount', cleanAmount);
  }
  
  return accounting.formatMoney(this.get('amount'));
}.property('amount')
```

### Example

<a class="jsbin-embed" href="http://jsbin.com/AqeVuZI/2/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

[setters]: http://emberjs.com/guides/object-model/computed-properties/

