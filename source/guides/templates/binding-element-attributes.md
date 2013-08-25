## Binding Element Attributes

In addition to normal text, you may also want to have your templates
contain HTML elements whose attributes are bound to the controller.

For example, imagine your controller has a property that contains a URL
to an image:

```handlebars
<div id="logo">
  <img {{bindAttr src=logoUrl}} alt="Logo">
</div>
```

This generates the following HTML:

```html
<div id="logo">
  <img src="http://www.example.com/images/logo.png" alt="Logo">
</div>
```

If you use `{{bindAttr}}` with a Boolean value, it will add or remove
the specified attribute. For example, given this template:

```handlebars
<input type="checkbox" {{bindAttr disabled=isAdministrator}}>
```

If `isAdministrator` is `false`, Handlebars will produce the following
HTML element:

```html
<input type="checkbox" disabled>
```

If `isAdministrator` is `true`, Handlebars will produce the following:

```html
<input type="checkbox">
```
