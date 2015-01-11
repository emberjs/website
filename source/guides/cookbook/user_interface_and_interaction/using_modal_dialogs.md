### Problem
You want to show part of your UI in a modal dialog.

### Solution
Render a specific controller into a named `modal` outlet in your application
template.

### Discussion
You can use a route's `render` method to render a specific controller and
template into a named outlet. In this case we can setup our application template
to handle the main outlet and a modal outlet:

```handlebars
{{outlet}}
{{outlet 'modal'}}
```

Then you can render a controller and template into the `modal` outlet.  Sending
an action in a template will propagate to the application route's actions.

In a template:

```handlebars
<button {{action 'openModal' 'myModal'}}>Open modal</button>
```

In your application route:

```javascript
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    openModal: function(modalName) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    }
  }
});
```

When closing a modal, you can use the route's `disconnectOutlet` method to remove
the modal from the DOM.

```javascript
  closeModal: function() {
    return this.disconnectOutlet({
      outlet: 'modal',
      parentView: 'application'
    });
  }
```

It may also be helpful to use a `modal-dialog` component to handle common markup
and interactions such as rendering an overlay and handling clicks outside of the
modal.

#### Example

This example shows:

  1. Rendering a pop-up modal in a named outlet.
  1. Sending a specific model to the modal controller.
  1. Wrapping the common modal markup and actions in a component.
  1. Handling events to close the modal when the overlay is clicked.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/peyogo/2/embed?html,js,output">
  Recipe: Using a Modal Dialog
</a>
