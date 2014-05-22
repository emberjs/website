During a route transition, the Ember Router passes a transition
object to the various hooks on the routes involved in the transition.
Any hook that has access to this transition object has the ability
to immediately abort the transition by calling `transition.abort()`, 
and if the transition object is stored, it can be re-attempted at a 
later time by calling `transition.retry()`.

### Preventing Transitions via `willTransition`

When a transition is attempted, whether via `{{link-to}}`, `transitionTo`,
or a URL change, a `willTransition` action is fired on the currently
active routes. This gives each active route, starting with the leaf-most
route, the opportunity to decide whether or not the transition should occur.

Imagine your app is in a route that's displaying a complex form for the user
to fill out and the user accidentally navigates backwards. Unless the
transition is prevented, the user might lose all of the progress they
made on the form, which can make for a pretty frustrating user experience.

Here's one way this situation could be handled:

```js
App.FormRoute = Ember.Route.extend({
  actions: {
    willTransition: function(transition) {
      if (this.controller.get('userHasEnteredData') &&
          !confirm("Are you sure you want to abandon progress?")) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        return true;
      }
    }
  }
});
```

When the user clicks on a `{{link-to}}` helper, or when the app initiates a 
transition by using `transitionTo`, the transition will be aborted and the URL
will remain unchanged. However, if the browser back button is used to 
navigate away from `FormRoute`, or if the user manually changes the URL, the 
new URL will be navigated to before the `willTransition` action is 
called. This will result in the browser displaying the new URL, even if 
`willTransition` calls `transition.abort()`.

### Aborting Transitions Within `model`, `beforeModel`, `afterModel`

The `model`, `beforeModel`, and `afterModel` hooks described in
[Asynchronous Routing](/guides/routing/asynchronous-routing)
each get called with a transition object. This makes it possible for
destination routes to abort attempted transitions.

```js
App.DiscoRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (new Date() < new Date("January 1, 1980")) {
      alert("Sorry, you need a time machine to enter this route.");
      transition.abort();
    }
  }
});
```

### Storing and Retrying a Transition

Aborted transitions can be retried at a later time. A common use case
for this is having an authenticated route redirect the user to a login
page, and then redirecting them back to the authenticated route once
they've logged in. 

```js
App.SomeAuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('auth').get('userIsLoggedIn')) {
      var loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});

App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      // Log the user in, then reattempt previous transition if it exists.
      var previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      } else {
        // Default back to homepage
        this.transitionToRoute('index');
      }
    }
  }
});
```

