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
  <button {{action "contract"}}>Contract</button>
{{else}}
  <button {{action "expand"}}>Show More...</button>
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

### Target Bubbling

If the action is not found on the current controller, it will bubble up
to the current route handler. From there, it will bubble up to parent
route handlers until it reaches the application route.

Define actions on the route's `events` property.

```javascript
App.PostsIndex = Ember.Route.extend({
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
