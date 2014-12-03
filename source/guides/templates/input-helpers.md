## Input Helpers

The `{{input}}` and `{{textarea}}` helpers in Ember.js are the easiest way to
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

<table>
  <tr><td>`readonly`</td><td>`required`</td><td>`autofocus`</td></tr>
  <tr><td>`value`</td><td>`placeholder`</td><td>`disabled`</td></tr>
  <tr><td>`size`</td><td>`tabindex`</td><td>`maxlength`</td></tr>
  <tr><td>`name`</td><td>`min`</td><td>`max`</td></tr>
  <tr><td>`pattern`</td><td>`accept`</td><td>`autocomplete`</td></tr>
  <tr><td>`autosave`</td><td>`formaction`</td><td>`formenctype`</td></tr>
  <tr><td>`formmethod`</td><td>`formnovalidate`</td><td>`formtarget`</td></tr>
  <tr><td>`height`</td><td>`inputmode`</td><td>`multiple`</td></tr>
  <tr><td>`step`</td><td>`width`</td><td>`form`</td></tr>
  <tr><td>`selectionDirection`</td><td>`spellcheck`</td><td>&nbsp;</td></tr>
</table>

If these attributes are set to a quoted string, their values will be set
directly on the element, as in the previous example. However, when left
unquoted, these values will be bound to a property on the template's current
rendering context. For example:

```handlebars
{{input type="text" value=firstName disabled=entryNotAllowed size="50"}}
```

Will bind the `disabled` attribute to the value of `entryNotAllowed` in the
current context.

### Actions

To dispatch an action on specific events, such as `enter` or `key-press`, use the following

```handlebars
{{input value=firstName action="updateFirstName" on="key-press"}}
```

[Event Names](/api/classes/Ember.View.html#toc_event-names) must be dasherized when assigned to `on`.

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
* `autofocus`
* `form`


Which can be bound or set as described in the previous section.

### Text Areas

```handlebars
{{textarea value=name cols="80" rows="6"}}
```

Will bind the value of the text area to `name` on the current context.

`{{textarea}}` supports binding and/or setting the following properties:

* `value`
* `name`
* `rows`
* `cols`
* `placeholder`
* `disabled`
* `maxlength`
* `tabindex`
* `selectionEnd`
* `selectionStart`
* `selectionDirection`
* `wrap`
* `readonly`
* `autofocus`
* `form`
* `spellcheck`
* `required`

### Extending Built-In Controls

See the [Built-in Views][4] section of these guides to learn how to further
extend these views.

[4]: /guides/views/built-in-views
