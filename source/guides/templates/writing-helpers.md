Sometimes, you may use the same HTML in your application multiple times. In those cases, you can register a custom helper that can be invoked from any Handlebars template.

For example, imagine you are frequently wrapping certain values in a `<span>` tag with a custom class. You can register a helper from your JavaScript like this:

```javascript
Ember.Handlebars.helper('highlight', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Ember.Handlebars.SafeString('<span class="highlight">' + escaped + '</span>');
});
```

If you return HTML from a helper, and you don't want it to be escaped,
make sure to return a new `SafeString`. Make sure you first escape any
user data!

Anywhere in your Handlebars templates, you can now invoke this helper:

```handlebars
{{highlight name}}
```

and it will output the following:

```html
<span class="highlight">Peter</span>
```

If the `name` property on the current context changes, Ember.js will
automatically execute the helper again and update the DOM with the new
value.

### Dependencies

Imagine you want to render the full name of an `App.Person`. In this
case, you will want to update the output if the person itself changes,
or if the `firstName` or `lastName` properties change.

```js
Ember.Handlebars.helper('fullName', function(person) {
  return person.get('firstName') + ' ' + person.get('lastName');
}, 'firstName', 'lastName');
```

You would use the helper like this:

```handlebars
{{fullName person}}
```

Now, whenever the context's person changes, or when any of the
_dependent keys_ change, the output will automatically update.

Both the path passed to the `fullName` helper and its dependent keys may
be full _property paths_ (e.g. `person.address.country`).

### Custom View Helpers

You may also find yourself rendering your view classes in multiple
places using the `{{view}}` helper. In this case, you can save yourself
some typing by registering a custom view helper.

For example, let’s say you have a view called `App.CalendarView`.
You can register a helper like this:

```javascript
Ember.Handlebars.helper('calendar', App.CalendarView);
```

Using `App.CalendarView` in a template then becomes as simple as:

```handlebars
{{calendar}}
```

Which is functionally equivalent to, and accepts all the same
arguments as:

```handlebars
{{view "calendar"}}
```
