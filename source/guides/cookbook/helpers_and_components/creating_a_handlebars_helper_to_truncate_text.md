### Problem

You want to truncate string to a specified length inside your Handlebars templates.

### Solution

Write a custom Handlebars helper that can truncates text.

### Discussion

The Handlebars helper is very simple. It takes two parameters: str (string) and len (length).

```js
Ember.Handlebars.helper('truncate', function(str, len) {
  if (str.length > len) {
    return str.substring(0, len - 3) + '...';
  } else {
    return str;
  }
});
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/APoDiLA/1/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>