### Problem

You're displaying formatted values in user inputs as currency with
[Accounting.js][accounting] and need to remove the decoration to set the
attributes upstream.

### Solution

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

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/AqeVuZI/2/embed?live,js,output">JS Bin</a>

[setters]: /guides/object-model/computed-properties/
[accounting]: http://josscrowcroft.github.io/accounting.js/

