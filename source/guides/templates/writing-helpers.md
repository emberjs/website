## Writing Custom Helpers

Sometimes, you may use the same HTML in your application multiple times. In those case, you can register a custom helper that can be invoked from any Handlebars template.

For example, imagine you are frequently wrapping certain values in a `<span>` tag with a custom class. You can register a helper from your JavaScript like this:

```javascript
Handlebars.registerHelper('highlight', function(property, options) {
  var value = Ember.Handlebars.getPath(this, property, options);
  return new Handlebars.SafeString('<span class="highlight">'+value+'</span>');
});
```

If you return HTML from a helper, and you don't want it to be escaped,
make sure to return a new `SafeString`.

Anywhere in your Handlebars templates, you can now invoke this helper:

```handlebars
{{highlight name}}
```

and it will output the following:

```html
<span class="highlight">Peter</span>
```

NOTE: Parameters to helper functions are passed as names, not their current values. This allows you to optionally set up observers on the values. To get the current value of the parameter, use Ember.getPath, as shown above.
