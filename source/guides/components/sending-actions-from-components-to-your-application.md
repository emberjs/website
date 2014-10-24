When a component is used inside a template, it has the ability to send
actions to that template's controller and routes. These allow the
component to inform the application when important events, such as the
user clicking a particular element in a component, occur.

Like the `{{action}}` Handlebars helper, actions sent from components
first go to the template's controller. If the controller does not
implement a handler for that action, it will bubble to the template's
route, and then up the route hierarchy. For more information about this
bubbling behavior, see [Action
Bubbling](/guides/templates/actions/#toc_action-bubbling).

Components are designed to be reusable across different parts of your
application. In order to achieve this reusability, it's important that
the actions that your components send can be specified when the component
is used in a template.

In other words, if you were writing a button component, you would not
want to send a `click` action, because it is ambiguous and likely to
conflict with other components on the page. Instead, you would want to
allow the person using the component to specify which action to send
when the button was clicked.

Luckily, components have a `sendAction()` method that allows them to
send actions specified when the component is used in a template.

### Sending a Primary Action

Many components only send one kind of action. For example, a button
component might send an action when it is clicked on; this is the
_primary action_.

To set a component's primary action, set its `action` attribute in
Handlebars:

```handlebars
{{my-button action="showUser"}}
```

This tells the `my-button` component that it should send the `showUser`
action when it triggers its primary action.

So how do you trigger sending a component's primary action? After
the relevant event occurs, you can call the `sendAction()` method
without arguments:

```js
App.MyButtonComponent = Ember.Component.extend({
  click: function() {
    this.sendAction();
  }
});
```

In the above example, the `my-button` component will send the `showUser`
action when the component is clicked.

### Sending Parameters with an Action

You may want to provide additional context to the route or controller
handling an action. For example, a button component may want to tell a
controller not only that _an_ item was deleted, but also _which_ item.

To send parameters with the primary action, call `sendAction()` with the
string `'action'` as the first argument and any additional parameters
following it:

```js
this.sendAction('action', param1, param2);
```

For example, imagine we're building a todo list that allows the user to
delete a todo:

```js
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return {
      todos: [{
        title: "Learn Ember.js"
      }, {
        title: "Walk the dog"
      }]
    };
  },

  actions: {
    deleteTodo: function(todo) {
      var todos = this.modelFor('index').todos;
      todos.removeObject(todo);
    }
  }
});
```

```handlebars
{{! index.handlebars }}

{{#each todo in todos}}
  <p>{{todo.title}} <button {{action "deleteTodo" todo}}>Delete</button></p>
{{/each}}
```

We want to update this app so that, before actually deleting a todo, the
user must confirm that this is what they intended. We'll implement a
component that first double-checks with the user before completing the
action.

In the component, when triggering the primary action, we'll pass an
additional argument that the component user can specify:

```js
App.ConfirmButtonComponent = Ember.Component.extend({
  actions: {
    showConfirmation: function() {
      this.toggleProperty('isShowingConfirmation');
    },

    confirm: function() {
      this.toggleProperty('isShowingConfirmation');
      this.sendAction('action', this.get('param'));
    }
  }
});
```

```handlebars
{{! templates/components/confirm-button.handlebars }}

{{#if isShowingConfirmation}}
  <button {{action "confirm"}}>Click again to confirm</button>
{{else}}
  <button {{action "showConfirmation"}}>{{title}}</button>
{{/if}}
```

Now we can update our initial template and replace the `{{action}}`
helper with our new component:

```handlebars
{{! index.handlebars }}

    {{#each todo in todos}}
      <p>{{todo.title}} {{confirm-button title="Delete" action="deleteTodo" param=todo}}</p>
    {{/each}}
```

Note that we've specified the action to send by setting the component's
`action` attribute, and we've specified which argument should be sent as
a parameter by setting the component's `param` attribute.

<a class="jsbin-embed" href="http://jsbin.com/mucilo/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Sending Multiple Actions

Depending on the complexity of your component, you may need to let users
specify multiple different actions for different events that your
component can generate.

For example, imagine that you're writing a form component that the user
can either submit or cancel. Depending on which button the user clicks,
you want to send a different action to your controller or route.

You can specify _which_ action to send by passing the name of the event
as the first argument to `sendAction()`. For example, you can specify two
actions when using the form component:

```handlebars
{{user-form submit="createUser" cancel="cancelUserCreation"}}
```

In this case, you can send the `createUser` action by calling
`this.sendAction('submit')`, or send the `cancelUserCreation` action by
calling `this.sendAction('cancel')`.

<a class="jsbin-embed" href="http://jsbin.com/qafaq/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Actions That Aren't Specified

If someone using your component does not specify an action for a
particular event, calling `sendAction()` has no effect.

For example, if you define a component that triggers the primary action
on click:

```js
App.MyButtonComponent = Ember.Component.extend({
  click: function() {
    this.sendAction();
  }
});
```

Using this component without assigning a primary action will have no
effect if the user clicks it:

```handlebars
{{my-button}}
```

### Thinking About Component Actions

In general, you should think of component actions as translating a
_primitive event_ (like a mouse click or an `<audio>` element's `pause`
event) into actions that have meaning within your application.

This allows your routes and controllers to implement action handlers
with names like `deleteTodo` or `songDidPause` instead of vague names
like `click` or `pause` that may be ambiguous to other developers when
read out of context.

Another way to think of component actions is as the _public API_ of your
component. Thinking about which events in your component can trigger
actions in their application is the primary way other developers will
use your component. In general, keeping these events as generic as
possible will lead to components that are more flexible and reusable.
