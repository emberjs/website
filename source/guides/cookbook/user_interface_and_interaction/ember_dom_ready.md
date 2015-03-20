### Problem
You need to be able to run some code when the DOM is ready after transitioning to a route.

### Solution
`Ember.Route` can be extended, before the application object is created, so a callback function can be supplied to resolved transitions. The callback function can have global DOM ready code and/or DOM ready code that is specific to an instance of a route.

```js
Ember.Route = Ember.Route.extend({
  beforeModel: function(transition) {
    var context = this;

    transition.then(function() {
      Ember.run.scheduleOnce('afterRender', context, function() {
        /*
         * Add your global DOM ready code here, i.e., DOM ready code
         * that should be run after every route transition
         */

        /*
         * Check if this particular route has an "afterRender" method and call it.
         * This allows for each route to run specific DOM ready code.
         */
        if (this.afterRender) {

          this.afterRender();
        }
      });
    });
  }
});

window.App = Ember.Application.create();
```

Optionally, you can define an `afterRender` method for each route so only DOM ready code specific to that route can be run.

```js
App.SomeRoute = Ember.Route.extend({
  afterRender: function() {
    // Run some DOM ready code specific to this route
  }
});
```

### Discussion
The pattern described above has one main drawback. If you need to define a `beforeModel` method for a route, you need to call `this._super` before any other code to avoid breaking the DOM ready functionality.

```js
App.SomeRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    // You need to call this._super in order for "afterRender" to be called
    this._super.call(this, transition);

    // Now your "beforeModel" code can go here
  },
  afterRender: function() {
    // Run some DOM ready code specific to this route
  }
});
```