## Actions (The `{{action}}` Helper)

You may want to trigger high level events in response to a simple user
event (like a click).

In general, these events will manipulate some property on the
controller, which will change the current template via bindings.

For example, imagine that you have a template that shows a blog post,
and supports expanding the post with additional information.

```handlebars
<!-- post.handlebars -->

<div class='intro'>
  {{intro}}
</div>

{{#if isExpanded}}
  <div class='body'>{{body}}</div>
  <button {{action contract}}>Contract</button>
{{else}}
  <button {{action expand}}>Show More...</button>
{{/if}}
```

In this case, the `post` controller would be an `Ember.ObjectController`
whose `content` is an instance of `App.Post`.

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

By default, the `{{action}}` helper triggers a method on the current
controller. You can also pass parameter paths to the method. The following
will call `controller.select( context.post )` when clicked:

```handlebars
<p><button {{action "select" post}}>✓</button> {{post.title}}</p>
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
pressed modifier keys. You can supply an `allowed-keys` option
to specify which keys should not be ignored.

```handlebars
<script type="text/x-handlebars" data-template-name='a-template'>
  <div {{action anActionName allowed-keys="alt"}}>
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
