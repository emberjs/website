## Adding Layouts to Views

Views can have a secondary template that wraps their main template. Like templates,
layouts are Handlebars templates that will be inserted inside the
view's tag.

To tell a view which layout template to use, set its `layoutName` property.

To tell the layout template where to insert the main template, use the Handlebars `{{yield}}` helper.
The HTML contents of a view's rendered `template` will be inserted where the `{{yield}}` helper is.

First, you define the following layout template:

```html
<script type="text/x-handlebars" data-template-name="my_layout">
  <div class="content-wrapper">
    {{yield}}
  </div>
</script>
```

And then the following main template:

```html
<script type="text/x-handlebars" data-template-name="my_content">
  Hello, <b>{{view.name}}</b>!
</script>
```

Finally, you define a view, and instruct it to wrap the template with the defined layout:

```javascript
AViewWithLayout = Ember.View.extend({
  name: 'Teddy',
  layoutName: 'my_layout',
  templateName: 'my_content'
});
```

This will result in view instances containing the following HTML

```html
<div class="content-wrapper">
  Hello, Teddy!
</div>
```

#### Applying Layouts in Practice

Layouts are extremely useful when you have a view with a common wrapper and behavior, but its main template might change.
One possible scenario is a Popup View.

You can define your popup layout template:

```html
<script type="text/x-handlebars" data-template-name="popup">
  <div class="popup">
    <button class="popup-dismiss">x</button>
    <div class="popup-content">
    {{yield}}
    </div>
  </div>
</script>
```

Then define your popup view:

```javascript
App.PopupView = Ember.View.extend({
  layoutName: 'popup'
});
```

Now you can re-use your popup with different templates:

```html
{{#view App.PopupView}}
  <form>
    <label for="name">Name:</label>
    <input id="name" type="text" />
  </form>
{{/view}}

{{#view App.PopupView}}
  <p> Thank you for signing up! </p>
{{/view}}
```