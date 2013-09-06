## Problem

You want to add CSS class names to your Ember Components.

## Solution

Set additional class names with the `classNames` property of subclassed components:

```js
App.AwesomeInputComponent = Ember.Component.extend({
  classNames: ['css-framework-fancy-class']  
})
```

```handlebars
{{awesome-input}}
```

```html
<div class="css-framework-fancy-class"></div>
```

## Discussion

If desired, you can apply multiple class names.

```js
classNames: ['bold', 'italic', 'blue']
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/ELiCOG/2/embed?live,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

See [Customizing a Component's Element](/guides/components/customizing-a-components-element/) for further examples.
