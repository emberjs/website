## Problem

You want to validate your form text fields. The validation should only
apply when the user focused out of the input (so that a blank form won't
be all-red until user focuses each field).

## Solution

Create a new component and define a `focusOut` hook, which will record
that the field has been focused, and add a computed property named
`hasError`, which will return validation result only if the field has
been focused. The component expects to get the validation result as the
`valid` property.

```javascript
App.ValidatedInputComponent = Ember.Component.extend({
  beenFocused: false,
  valid: null,
  hasError: function() {
    if (this.get('beenFocused')) {
      return !this.get('valid');
    }
  }.property('valid', 'beenFocused'),
  focusOut: function() {
    this.set('beenFocused', true);
  }
});
```

And in the template of the component, put an `{{input}}` and wrap it
into a div, which would have the class of `has-error` bound to
`hasError`. 

```html
<script type="text/x-handlebars" data-template-name="components/validated-input">
  <div {{bindAttr class="hasError :form-group"}}>
    {{input type=type value=value size=size pattern=pattern name=name placeholder=placeholder disaled=disabled maxlength=maxlength tabindex=tabindex class=input-class}}
  </div>
</script>
```

The use like this:

```handlebars
{{validated-input value=name valid=nameValid placeholder="Name" type="text" input-class="form-control"}}
```

## Discussion

Essentially, what we need to achieve is to have a component which wraps
the input field with a div that has the `has-error` class if the
validation fails (after the field has been focused). The validation
result is passed to the component through the `valid` property.

As there is no way to take existing `Ember.TextField` component and wrap
it with a layout (because `<input>` is a self-closing element, so it has
no content, and so there is nothing to wrap; and Ember can't wrap the
element itself this way), we are creating a new component,
`ValidatedInputComponent`.

It renders a wrapped input field. The wrapper has the `has-error` class
if `hasError` property of the component is true. It's true only when
the validation fails and the field has been focused at.

#### Example

<a class="jsbin-embed" href="http://jsbin.com/UpaXeta/3/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
