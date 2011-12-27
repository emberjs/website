## Views In-Depth

Now that you're familiar with using Handlebars, let's go more in-depth on
how to both handle events, and customize views to your needs.

### Handling Events

Instead of having to register event listeners on elements you'd like to
respond to, simply implement the name of the event you want to respond to
as a method on your view.

For example, imagine we have a template like this:

```html
{{#view App.ClickableView}}
This is a clickable area!
{{/view}}
```

Let's implement App.ClickableView such that when it is
clicked, an alert is displayed:

```javascript
App.ClickableView = Ember.View.extend({
  click: function(evt) {
    alert("ClickableView was clicked!");
  }
});
```

Events bubble up from the target view to each parent view in
succession, until the root view is reached. At any point you can stop propagation by returning `false`:

```javascript
doubleClick: function(evt) {
  alert("Double clicked!");
  return false;
}
```

### Hierarchy

You can construct hierarchies of views arbitrarily deep. A view can access its parent view by retrieving
the `parentView` property, and can access an array of its child views via the `childViews` property.

Note that both of these values are read-only. If you want to manually manage views in JavaScript (instead of creating them
using the {{view}} helper in Handlebars), see the Ember.ContainerView documentation below.

### Manually Managed Views with Ember.ContainerView

Usually, views create their child views by using the `{{view}}` helper. Sometimes it is useful to manually manage a view's
child views. If you create an instance of `Ember.ContainerView`, the `childViews` array is editable. Views that you add
are rendered to the page, and views that you remove are removed from the DOM.

```javascript
var container = Ember.ContainerView.create();
container.append();

var coolView = App.CoolView.create(),
    childViews = container.get('childViews');

childViews.pushObject(coolView);
```

As a shorthand, you can specify the child views as properties and the child views as a list of keys. When the
container view is created, these views will be instantiated and added to the child views array:

```javascript
var container = Ember.ContainerView.create({
  childViews: ['firstView', 'secondView'],
  
  firstView: App.FirstView,
  secondView: App.SecondView
});
```

### Render Pipeline

Before your views are turned into DOM elements, they first exist as a string representation. As views render, they turn
each of their child views into strings and concatenate them together.

If you'd like to use something other than Handlebars, you can override a view's `render` method to return a custom
string of HTML.

```javascript
App.CoolView = Ember.View.create({
  render: function() {
    return "<b>This view is so cool!</b>";
  }
});
```

This makes it easy to support template engines other than Handlebars; though do note that if you override rendering,
values will not update automatically. Any updates will be your responsibility.

### Customizing the HTML Element

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

If isUrgent is changed to false, then the `is-urgent` class name will be removed.

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

If the bound value is a string, that value will be added as a class name without
modification.

