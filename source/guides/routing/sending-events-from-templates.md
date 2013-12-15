Use the `{{action}}` helper to attach a handler in your view class to an event triggered on an element.

To attach an element's `click` event to the `edit()` handler in the current view:

```handlebars
<a href="#" {{action 'edit' on="click"}}>Edit</a>
```

Because the default event is `click`, this could be written more concisely as:

```handlebars
<a href="#" {{action 'edit'}}>Edit</a>
```

Although the view containing the `{{action}}` helper will be targeted by default, it is possible to target a different view:

```handlebars
<a href="#" {{action 'edit' target="parentView"}}>Edit</a>
```

The action handler can optionally accept a jQuery event object, which will be extended to include `view` and `context` properties. These properties can be useful when targeting a different view with your action. For instance:

```javascript
App.ListingView = Ember.View.extend({
  templateName: 'listing',

  edit: function(event) {
    event.view.set('isEditing', true);
  }
});
```

Any of the templates discussed above will produce an HTML element like this:

```html
<a href="#" data-ember-action="3">Edit</a>
```

Ember will delegate the event you specified to your target view's handler based upon the internally assigned `data-ember-action` id.

