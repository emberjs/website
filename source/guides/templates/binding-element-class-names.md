An HTML element's `class` attribute can be bound like any other
attribute:

```handlebars
<div {{bind-attr class="priority"}}>
  Warning!
</div>
```

If the controller's `priority` property is `"p4"`, this template will emit the following HTML:

```html
<div class="p4">
  Warning!
</div>
```

### Binding to Boolean Values

If the value to which you bind is a Boolean, Ember.js will apply the
dasherized version of the property name as a class:

```handlebars
<div {{bind-attr class="isUrgent"}}>
  Warning!
</div>
```

If `isUrgent` is true, this emits the following HTML:

```html
<div class="is-urgent">
  Warning!
</div>
```

If `isUrgent` is false, no class name is added:

```html
<div>
  Warning!
</div>
```

If you want to explicitly provide a class name (instead of Ember.js
dasherizing the property name), use the following syntax:

```handlebars
<div {{bind-attr class="isUrgent:urgent"}}>
  Warning!
</div>
```

Instead of the dasherized name, this will produce:

```html
<div class="urgent">
  Warning!
</div>
```

You can also specify a class name to add when the property is `false`:

```handlebars
<div {{bind-attr class="isEnabled:enabled:disabled"}}>
  Warning!
</div>
```

In this case, if the `isEnabled` property is `true`, the `enabled`
class will be added. If the property is `false`, the class `disabled`
will be added.

This syntax can also be used to add a class if a property is `false`
and remove it if the property is `true`, so this:

```handlebars
<div {{bind-attr class="isEnabled::disabled"}}>
  Warning!
</div>
```

Will add the class `disabled` when `isEnabled` is `false` and add no
class if `isEnabled` is `true`.

### Static Classes

If you need an element to have a combination of static and bound
classes, you should include the static class in the list of bound
properties, prefixed by a colon:

```handlebars
<div {{bind-attr class=":high-priority isUrgent"}}>
  Warning!
</div>
```

This will add the literal `high-priority` class to the element:

```html
<div class="high-priority is-urgent">
  Warning!
</div>
```

Bound class names and static class names cannot be combined. The
following example **will not work**:

```handlebars
<div class="high-priority" {{bind-attr class="isUrgent"}}>
  Warning!
</div>
```

### Binding Multiple Classes

Unlike other element attributes, you can bind multiple classes:

```handlebars
<div {{bind-attr class="isUrgent priority"}}>
  Warning!
</div>
```

This works how you would expect, applying the rules described above in
order:

```html
<div class="is-urgent p4">
  Warning!
</div>
```

