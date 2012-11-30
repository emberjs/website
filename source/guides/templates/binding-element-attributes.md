## Binding Element Attributes

In addition to text, you may also want your templates to dictate the attributes
of your HTML elements. For example, imagine a view that contains a URL:

```javascript
App.LogoView = Ember.View.extend({
  logoUrl: 'http://www.mycorp.com/images/logo.png'
});
```

The best way to display the URL as an image in Handlebars is like this:

```handlebars
<div id="logo">
  <img {{bindAttr src="logoUrl"}} alt="Logo">
</div>
```

This generates the following HTML:

```html
<div id="logo">
  <img src="http://www.mycorp.com/images/logo.png" alt="Logo">
</div>
```

If you use `{{bindAttr}}` with a Boolean value, it will add or remove the specified attribute. For example, given this Ember view:

```javascript
App.InputView = Ember.View.extend({
  isDisabled: true
});
```

And this template:

```handlebars
<input type="checkbox" {{bindAttr disabled="isDisabled"}}>
```

Handlebars will produce the following HTML element:

```html
<input type="checkbox" disabled>
```

### Binding Class Names with {{bindAttr}}

The `class` attribute can be bound like any other attribute, but it also has some additional special behavior. The default behavior works like you'd expect:

```javascript
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});
```

```handlebars
<div {{bindAttr class="priority"}}>
  Warning!
</div>
```

This template will emit the following HTML:

```html
<div class="p4">
  Warning!
</div>
```

If the value to which you bind is a Boolean, however, the dasherized version of that property will be applied as a class:

```handlebars
<div {{bindAttr class="isUrgent"}}>
  Warning!
</div>
```

This emits the following HTML:

```html
<div class="is-urgent">
  Warning!
</div>
```

Unlike other attributes, you can also bind multiple classes:

```handlebars
<div {{bindAttr class="isUrgent priority"}}>
  Warning!
</div>
```

You can also specify an alternate class name to use, instead of just
dasherizing.

```handlebars
<div {{bindAttr class="isUrgent:urgent"}}>
  Warning!
</div>
```

In this case, if the `isUrgent` property is true, the `urgent` class
will be added. If it is false, the `urgent` class will be removed.

You can also specify a class name which shall be used when the property is `false`:

```handlebars
<div {{bindAttr class="isEnabled:enabled:disabled"}}>
  Warning!
</div>
```

In this case, if the `isEnabled` property is true, the `enabled` class will be added. If the property is false, the class `disabled` will be added.

This syntax allows the shorthand for only adding a class when a property is `false`, so this:

```handlebars
<div {{bindAttr class="isEnabled::disabled"}}>
  Warning!
</div>
```

Will add the class `disabled` when `isEnabled` is `false` and add no class if `isEnabled` is `true`.
