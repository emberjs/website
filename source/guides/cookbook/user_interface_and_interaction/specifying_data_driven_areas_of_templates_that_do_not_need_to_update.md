## Problem
You have a section of your application's view that is based on a data but you don't need the template to update

## Solution
Use the `{{unbound}}` Handlebars helper.

```js
{{unbound firstName}}
{{lastName}}
```

### Discussion
This approach has significant performance advantages, because Ember does not need to watch the given property.

#### Example

<a class="jsbin-embed" href="http://jsbin.com/UDAnuLu/2/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>