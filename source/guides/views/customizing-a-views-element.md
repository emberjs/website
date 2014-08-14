A view is represented by a single DOM element on the page. You can change what kind of element is created by
changing the `tagName` property.

```javascript
App.MyView = Ember.View.extend({
  tagName: 'span'
});
```

You can also specify which class names are applied to the view by setting its `classNames` property to an array of strings:

```javascript
App.MyView = Ember.View.extend({
  classNames: ['my-view']
});
```

If you want class names to be determined by the state of properties on the view, you can use class name bindings. If you bind to
a Boolean property, the class name will be added or removed depending on the value:

```javascript
App.MyView = Ember.View.extend({
  classNameBindings: ['isUrgent'],
  isUrgent: true
});
```

This would render a view like this:

```html
<div class="ember-view is-urgent">
```

If `isUrgent` is changed to `false`, then the `is-urgent` class name will be removed.

By default, the name of the Boolean property is dasherized. You can customize the class name
applied by delimiting it with a colon:

```javascript
App.MyView = Ember.View.extend({
  classNameBindings: ['isUrgent:urgent'],
  isUrgent: true
});
```

This would render this HTML:

```html
<div class="ember-view urgent">
```

Besides the custom class name for the value being `true`, you can also specify a class name which is used when the value is `false`:

```javascript
App.MyView = Ember.View.extend({
  classNameBindings: ['isEnabled:enabled:disabled'],
  isEnabled: false
});
```

This would render this HTML:

```html
<div class="ember-view disabled">
```

You can also specify to only add a class when the property is `false` by declaring `classNameBindings` like this:

```javascript
App.MyView = Ember.View.extend({
  classNameBindings: ['isEnabled::disabled'],
  isEnabled: false
});
```

This would render this HTML:

```html
<div class="ember-view disabled">
```

If the `isEnabled` property is set to `true`, no class name is added:

```html
<div class="ember-view">
```


If the bound value is a string, that value will be added as a class name without
modification:

```javascript
App.MyView = Ember.View.extend({
  classNameBindings: ['priority'],
  priority: 'highestPriority'
});
```

This would render this HTML:

```html
<div class="ember-view highestPriority">
```

#### Attribute Bindings on a View

You can bind attributes to the DOM element that represents a view by using `attributeBindings`:

```javascript
App.MyView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: "http://emberjs.com"
});
```

You can also bind these attributes to differently named properties:

```javascript
App.MyView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['customHref:href'],
  customHref: "http://emberjs.com"
});
```

### Customizing a View's Element from Handlebars

When you append a view, it creates a new HTML element that holds its content.
If your view has any child views, they will also be displayed as child nodes
of the parent's HTML element.

By default, new instances of `Ember.View` create a `<div>` element. You can
override this by passing a `tagName` parameter:

```handlebars
{{view "info" tagName="span"}}
```

You can also assign an ID attribute to the view's HTML element by passing an `id` parameter:

```handlebars
{{view "info" id="info-view"}}
```

This makes it easy to style using CSS ID selectors:

```css
/** Give the view a red background. **/
#info-view {
  background-color: red;
}
```

You can assign class names similarly:

```handlebars
{{view "info" class="info urgent"}}
```

You can bind class names to a property of the view by using `classBinding` instead of `class`. The same behavior as described in `bind-attr` applies:

```javascript
App.AlertView = Ember.View.extend({
  priority: "p4",
  isUrgent: true
});
```

```handlebars
{{view "alert" classBinding="isUrgent priority"}}
```

This yields a view wrapper that will look something like this:

```html
<div id="ember420" class="ember-view is-urgent p4"></div>
```
