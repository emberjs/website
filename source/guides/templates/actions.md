## Actions (The `{{action}}` Helper)

Your app will often need a way to let users interact with controls that
change application state. For example, imagine that you have a template
that shows a blog post, and supports expanding the post with additional
information.

You can use the `{{action}}` helper to make an HTML element clickable.
When a user clicks the element, the named event will be sent to your
application.

```handlebars
<!-- post.handlebars -->

<div class='intro'>
  {{intro}}
</div>

{{#if isExpanded}}
  <div class='body'>{{body}}</div>
  <button {{action 'contract'}}>Contract</button>
{{else}}
  <button {{action 'expand'}}>Show More...</button>
{{/if}}
```

```js
App.PostController = Ember.ObjectController.extend({
  // initial value
  isExpanded: false,

  expand: function() {
    this.set('isExpanded', true);
  },

  contract: function() {
    this.set('isExpanded', false);
  }
});
```

### Event Bubbling

By default, the `{{action}}` helper triggers a method on the template's
controller, as illustrated above.

If the controller does not implement a method with the same name as the
event, the event will be sent to the template's route.

Note that routes that handle events **must place event handlers inside
an `events` hash**. Even if a route has a method with the same name as
the event, it will not be triggered unless it is inside an `events` hash.

```js
App.PostRoute = Ember.Route.extend({
  events: {
    expand: function() {
      this.controllerFor('post').set('isExpanded', true);
    },

    contract: function() {
      this.controllerFor('post').set('isExpanded', false);
    }
  }
});
```

If neither the template's controller nor its associated route implement
a handler, the event will continue to bubble to any parent routes.
Finally, if an `ApplicationRoute` is defined, it will have an
opportunity to handle the event.

If a handler for the event is not implemented in the controller, the
route, any parent routes, or the `ApplicationRoute`, an exception will
be thrown.

![Event Bubbling](/images/template-guide/event-bubbling.png)

### Event Parameters

You can optionally pass arguments to the event handler. Any values
passed to the `{{action}}` helper after the event name will be passed to
the handler as arguments.

For example, if the `post` argument was passed:

```handlebars
<p><button {{action "select" post}}>✓</button> {{post.title}}</p>
```

The route's `select` event handler would be called with a single argument
containing the post model:

```js
App.PostController = Ember.ObjectController.extend({
  events: {
    select: function(post) {
      console.log(post.get('title'));
    }
  }
});
```

### Specifying the Type of Event

By default, the `{{action}}` helper listens for click events and triggers
the action when the user clicks on the element.

You can specify an alternative event by using the `on` option.

```handlebars
<p>
  <button {{action "select" post on="mouseUp"}}>✓</button>
  {{post.title}}
</p>
```

You should use the normalized event names [listed in the View guide][1].
In general, two-word event names (like `keypress`) become `keyPress`.

[1]: /guides/understanding-ember/the-view-layer/#toc_adding-new-events

### Specifying Whitelisted Modifier Keys

By default the `{{action}}` helper will ignore click event with
pressed modifier keys. You can supply an `allowedKeys` option
to specify which keys should not be ignored.

```handlebars
<script type="text/x-handlebars" data-template-name='a-template'>
  <div {{action anActionName allowedKeys="alt"}}>
    click me
  </div>
</script>
```

This way the `{{action}}` will fire when clicking with the alt key
pressed down.

### Stopping Event Propagation

By default, the `{{action}}` helper allows events it handles to bubble
up to parent DOM nodes. If you want to stop propagation, you can disable
propagation to the parent node.

For example, if you have a **✗** button inside of a link, you will want
to ensure that if the user clicks on the **✗**, that the link is not
clicked.

```handlebars
{{#linkTo 'post'}}
  Post
  <button {{action close bubbles=false}}>✗</button>
{{/linkTo}}
```

Without `bubbles=false`, if the user clicked on the button, Ember.js
will trigger the action, and then the browser will propagate the click
to the link.

With `bubbles=false`, Ember.js will stop the browser from propagating
the event.

### Target Bubbling

If the action is not found on the current controller, it will bubble up
to the current route handler. From there, it will bubble up to parent
route handlers until it reaches the application route.

Define actions on the route's `events` property.

```javascript
App.PostsIndexRoute = Ember.Route.extend({
  events: {
    myCoolAction: function() {
      // do your business.
    }
  }
});
```

This allows you to create a button that has different behavior based on
where you are in the application. For example, you might want to have a
button in a sidebar that does one thing if you are somewhere inside of
the `/posts` route, and another thing if you are inside of the `/about`
route.
