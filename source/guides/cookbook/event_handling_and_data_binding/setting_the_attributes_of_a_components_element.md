## Problem

You want to set the attributes on your Ember Components.

## Solution

Declare additional `attributeBindings` on the Component class.

```js
attributeBindings: ['cx', 'cy', 'r', 'fill']
```

## Discussion

This example (an SVG `circle` element) is somewhat contrived.
You may be better served simply using `bindAttr` in cases like this.

As soon as you find yourself needing to wrap a complex element into
a component, `attributeBindings` will prove invaluable.

#### Example

<a class="jsbin-embed" href="http://jsbin.com/uWinoXe/1/embed?live,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

See [Customizing a Component's Element](/guides/components/customizing-a-components-element/) for further examples.

