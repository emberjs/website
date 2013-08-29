## Problem

You want to add CSS class names to your Ember Components.

## Solution

Set additional class names with the `classNames` property of subclassed components:

```js
classNames: ['stooge']
```

## Discussion

You can take it a step further by applying classes based on data being passed in to the component. This is done by binding the class attribute using `classNameBindings`.

```js
classNameBindings: ['isRelated:relative'],
isRelatedBinding: "stooge.isRelated" // value resolves to boolean
```

<a class="jsbin-embed" href="http://jsbin.com/olorAco/1/embed?live,js">JS Bin</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

See [Customizing a Component's Element](/guides/components/customizing-a-components-element/) for further examples.