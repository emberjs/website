## Input Helpers

The `{{input}}` and `{{textarea}}` helpers in Ember are the easiest way to
create common form controls. The `{{input}}` helper wraps the built-in
[Ember.TextField][1] and [Ember.Checkbox][2] views, while `{{textarea}}` wraps
[Ember.TextArea][3]. Using these helpers, you can create these views with
declarations almost identical to how you'd create a traditional `<input>` or
`<textarea>` element.

[1]: /api/classes/Ember.TextField.html
[2]: /api/classes/Ember.Checkbox.html
[3]: /api/classes/Ember.TextArea.html

### Text fields

```handlebars
{{input value="http://www.facebook.com"}}
```

Will become:

```html
<input type="text" value="http://www.facebook.com"/>
```

You can pass the following standard `<input>` attributes within the input
helper:

* `value`
* `size`
* `name`
* `pattern`
* `placeholder`
* `disabled`
* `maxlength`
* `tabindex`

If these attributes are set to a quoted string, their values will be set
directly on the element, as in the previous example. However, when left
unquoted, these values will be bound to a property on the template's current
rendering context. For example:

```handlebars
{{input type="text" value=firstName disabled=entryNotAllowed size="50"}}
```

Will bind the `disabled` attribute to the value of `entryNotAllowed` in the
current context.

### Checkboxes

You can also use the `{{input}}` helper to create a checkbox by setting its
`type`:

```handlebars
{{input type="checkbox" name="isAdmin" checked=isAdmin}}
```

Checkboxes support the following properties:

* `checked`
* `disabled`
* `tabindex`
* `indeterminate`
* `name`

Which can be bound or set as described in the previous section.

### Text Areas

```handlebars
{{textarea value=name cols="80" rows="6"}}
```

Will bind the value of the text area to `name` on the current context.

`{{textarea}}` supports binding and/or setting the following properties:

* `rows`
* `cols`
* `placeholder`
* `disabled`
* `maxlength`
* `tabindex`

### Extending Built-In Controls

See the [Built-in Views][4] section of these guides to learn how to further
extend these views.

[4]: /guides/views/built-in-views
