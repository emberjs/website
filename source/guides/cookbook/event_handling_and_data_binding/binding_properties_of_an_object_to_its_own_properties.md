## Problem
You want to connect the value of one property on an object to the value of another property on the same object, instead of a property of another object

## Solution
Use one of the Computed Property shorthands `Ember.computed.alias` or `Ember.computed.oneWay`

```js
App.Person = Ember.Object.extend({
	firstName : null,
	lastName : null,
	// works with get and set
	surname : Ember.computed.alias("lastName"),
	// works only with get
	surnameOneway : Ember.computed.oneWay("lastName")
});
```

## Discussion
With `Ember.computed.alias` you can access the aliased property exactly like the original property, which means you can use both `set` and `get`. If you only need an alias for the `get` case, you can use `Ember.computed.oneWay`, which is more performant as Ember only needs to observe one direction.

#### Example
<a class="jsbin-embed" href="http://jsbin.com/iFusaSe/5/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>