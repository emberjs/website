## Views In-Depth

Now that you're familiar with using Handlebars, let's go more in-depth on
how to both handle events, and customize views to your needs.

### Handling Events

Instead of having to register event listeners on elements you'd like to
respond to, simply implement the name of the event you want to respond to
as a method on your view.

For example, imagine we have a template like this:

<pre class="brush: xml;">
{{#view App.ClickableView}}
This is a clickable area!
{{/view}}
</pre>

Let's implement App.ClickableView such that when it is
clicked, an alert is displayed:

<pre class="brush: js;">
App.ClickableView = Ember.View.extend({
  click: function(evt) {
    alert("ClickableView was clicked!");
  }
});
</pre>

Events bubble up from the target view to each parent view in
succession, until the root view is reached. At any point you can stop propagation by returning `false`:

<pre class="brush: js; highlight: 3;">
doubleClick: function(evt) {
  alert("Double clicked!");
  return false;
}
</pre>

### Hierarchy

You can construct hierarchies of views arbitrarily deep. A view can access its parent view by retrieving
the `parentView` property, and can access an array of its child views via the `childViews` property.

Note that both of these values are read-only. If you want to manually manage views in JavaScript (instead of creating them
using the {{view}} helper in Handlebars), see the Ember.ContainerView documentation below.

### Manually Managed Views with Ember.ContainerView

Usually, views create their child views by using the `{{view}}` helper. Sometimes it is useful to manually manage a view's
child views. If you create an instance of `Ember.ContainerView`, the `childViews` array is editable. Views that you add
are rendered to the page, and views that you remove are removed from the DOM.

<pre class="brush: js;">
var container = Ember.View.create();
container.append();

var coolView = App.CoolView.create(),
    childViews = container.get('childViews');

childViews.pushObject(coolView);
</pre>

### Render Pipeline

Before your views are turned into DOM elements, they first exist as a string representation. As views render, they turn
each of their child views into strings and concatenate them together.

If you'd like to use something other than Handlebars, you can override a view's `render` method to return a custom
string of HTML.

<pre class="brush: js;">
App.CoolView = Ember.View.create({
  render: function() {
    return "<b>This view is so cool!</b>";
  }
});
</pre>

This makes it easy to support template engines other than Handlebars; though do note that if you override rendering,
values will not update automatically. Any updates will be your responsibility.
