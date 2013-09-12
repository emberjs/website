## Problem

You want to send data from your Ember application to a server.

## Solution

Use `ic.ajax.request` to send serialized Ember objects to the server.
`ic.ajax.request` wraps `Ember.$.ajax` and returns RSVP promises. It also
resolves promises with Ember.run to make the app more testable.

Below, I define a `save` method on user objects. It sends a POST request to the
`/users` endpoint of the backend with the user's properties as payload (e.g
`{ name: "Robert Smith", address: "1, Definity Loop", email: "robert.smith@gmail.com" }`):

```javascript
App.User = Ember.Object.extend({
  save: function() {
    return ic.ajax.request({
      url: '/users',
      type: 'POST',
      data: this.getProperties('name', 'address', 'email')
    });
  }
});

```

Returning a promise from methods that perform async operations is very customary
in Ember. This way, consumers of the method can attach their own success and
failure handlers as they see fit which provides a lot of flexibility.

In this case, let's assume the above `save` call was issued from a route's
action handler:

``` js
App.UsersNewRoute = Ember.Route.extend({
  (...)
  actions: {
    saveUser: function() {
      var user = this.controller.get('model'),
          route = this;

      user.save().then(function() {
        route.controller.set('message', 'User saved.');
        route.transitionTo('users');
      }).catch(function(errorReason) {
        route.controller.set('message', 'Oops, something went wrong.');
      });
    }
  }
});
```

If the save was successful, the app transitions to the `users` route and
display a message. Should anything fail in the process, an error message is
displayed.

The composability of promises makes it very easy to add additional
functionality. Let's assume that we have to keep track of the number of times
each user record was modified. Implementing that would be a matter of adding
another fulfillment handler to the above:

``` js
App.UsersNewRoute = Ember.Route.extend({
  (...)
  actions: {
    saveUser: function() {
      var user = this.controller.get('model'),
          route = this;

      user.save().then(function() {
        route.controller.set('message', 'User saved.');
        route.transitionTo('users');
      }).then(function() {
        user.incrementProperty('modificationsCount');
      }).catch(function(errorReason) {
        route.controller.set('message', 'Oops, something went wrong.');
      });
    }
  }
});
```

## Discussion

This is viable for scenarios when there are relatively few models with no
complex relationships between them. When your application grows above this
complexity, you might want to use a data persistence library to facilitate
communication with the backend for you.

Options include [ember-data](https://github.com/emberjs/data),
[ember-model](https://github.com/ebryn/ember-model) or [EPF](http://epf.io/).

