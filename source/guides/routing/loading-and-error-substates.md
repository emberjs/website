In addition to the techniques described in the
[Asynchronous Routing Guide](/guides/routing/asynchronous-routing/),
the Ember Router provides powerful yet overridable
conventions for customizing asynchronous transitions
between routes by making use of `error` and `loading`
substates.

## `loading` substates

The Ember Router allows you to return promises from the various
`beforeModel`/`model`/`afterModel` hooks in the course of a transition
(described [here](/guides/routing/asynchronous-routing/)).
These promises pause the transition until they fulfill, at which point
the transition will resume.

Consider the following:

```js
App.Router.map(function() {
  this.resource('foo', function() { // -> FooRoute
    this.route('slowModel');        // -> FooSlowModelRoute
  });
});

App.FooSlowModelRoute = Ember.Route.extend({
  model: function() {
    return somePromiseThatTakesAWhileToResolve();
  }
});
```

If you navigate to `foo/slow_model`, and in `FooSlowModelRoute#model`,
you return an AJAX query promise that takes a long time to complete.
During this time, your UI isn't really giving you any feedback as to
what's happening; if you're entering this route after a full page
refresh, your UI will be entirely blank, as you have not actually
finished fully entering any route and haven't yet displayed any
templates; if you're navigating to `foo/slow_model` from another
route, you'll continue to see the templates from the previous route
until the model finish loading, and then, boom, suddenly all the
templates for `foo/slow_model` load.

So, how can we provide some visual feedback during the transition?

Ember provides a default implementation of the `loading` process that implements
the following loading substate behavior.

```js
App.Router.map(function() {
  this.resource('foo', function() {       // -> FooRoute
    this.resource('foo.bar', function() { // -> FooBarRoute
      this.route('baz');                  // -> FooBarBazRoute
    });
  });
});
```

If a route with the path `foo.bar.baz` returns a promise that doesn't immediately
resolve, Ember will try to find a `loading` route in the hierarchy
above `foo.bar.baz` that it can transition into, starting with
`foo.bar.baz`'s sibling:

1. `foo.bar.loading`
2. `foo.loading`
3. `loading`

Ember will find a loading route at the above location if either a) a
Route subclass has been defined for such a route, e.g.

1. `App.FooBarLoadingRoute`
2. `App.FooLoadingRoute`
3. `App.LoadingRoute`

or b) a properly-named loading template has been found, e.g.

1. `foo/bar/loading`
2. `foo/loading`
3. `loading`

During a slow asynchronous transition, Ember will transition into the
first loading sub-state/route that it finds, if one exists. The
intermediate transition into the loading substate happens immediately
(synchronously), the URL won't be updated, and, unlike other transitions
that happen while another asynchronous transition is active, the
currently active async transition won't be aborted.

After transitioning into a loading substate, the corresponding template
for that substate, if present, will be rendered into the main outlet of
the parent route, e.g. `foo.bar.loading`'s template would render into
`foo.bar`'s outlet. (This isn't particular to loading routes; all
routes behave this way by default.)

Once the main async transition into `foo.bar.baz` completes, the loading
substate will be exited, its template torn down, `foo.bar.baz` will be
entered, and its templates rendered.

### Eager vs. Lazy Async Transitions

Loading substates are optional, but if you provide one,
you are essentially telling Ember that you
want this async transition to be "eager"; in the absence of destination
route loading substates, the router will "lazily" remain on the pre-transition route
while all of the destination routes' promises resolve, and only fully
transition to the destination route (and renders its templates, etc.)
once the transition is complete. But once you provide a destination
route loading substate, you are opting into an "eager" transition, which
is to say that, unlike the "lazy" default, you will eagerly exit the
source routes (and tear down their templates, etc) in order to
transition into this substate. URLs always update immediately unless the
transition was aborted or redirected within the same run loop.

This has implications on error handling, i.e. when a transition into
another route fails, a lazy transition will (by default) just remain on the
previous route, whereas an eager transition will have already left the
pre-transition route to enter a loading substate.

### The `loading` event

If you return a promise from the various `beforeModel`/`model`/`afterModel` hooks,
and it doesn't immediately resolve, a `loading` event will be fired on that route
and bubble upward to `ApplicationRoute`.

If the `loading` handler is not defined at the specific route,
the event will continue to bubble above a transition's pivot
route, providing the `ApplicationRoute` the opportunity to manage it.

```js
App.FooSlowModelRoute = Ember.Route.extend({
  model: function() {
    return somePromiseThatTakesAWhileToResolve();
  },
  actions: {
    loading: function(transition, originRoute) {
      //displayLoadingSpinner();

      // Return true to bubble this event to `FooRoute`
      // or `ApplicationRoute`.
      return true;
    }
  }
});
```

The `loading` handler provides the ability to decide what to do during
the loading process. If the last loading handler is not defined
or returns `true`, Ember will perform the loading substate behavior.

```js
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    loading: function(transition, originRoute) {
      displayLoadingSpinner();

      // substate implementation when returning `true`
      return true;
    }
  }
});
```

## `error` substates

Ember provides an analogous approach to `loading` substates in
the case of errors encountered during a transition.

Similar to how the default `loading` event handlers are implemented,
the default `error` handlers will look for an appropriate error substate to
enter, if one can be found.

```js
App.Router.map(function() {
  this.resource('articles', function() { // -> ArticlesRoute
    this.route('overview');              // -> ArticlesOverviewRoute
  });
});
```

For instance, an error thrown or rejecting promise returned from
`ArticlesOverviewRoute#model` (or `beforeModel` or `afterModel`)
will look for:

1. Either `ArticlesErrorRoute` or `articles/error` template
2. Either `ErrorRoute` or `error` template

If one of the above is found, the router will immediately transition into
that substate (without updating the URL). The "reason" for the error
(i.e. the exception thrown or the promise reject value) will be passed
to that error state as its `model`.

If no viable error substates can be found, an error message will be
logged.


### `error` substates with dynamic segments

Routes with dynamic segments are often mapped to a mental model of "two
separate levels." Take for example:

```js
App.Router.map(function() {
  this.resource('foo', {path: '/foo/:id'}, function() {
    this.route('baz');
  });
});

App.FooRoute = Ember.Route.extend({
  model: function(params) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
       reject("Error");
    });
  }
});
```

In the URL hierarchy you would visit `/foo/12` which would result in rendering
the `foo` template into the `application` template's `outlet`. In the event of
an error while attempting to load the `foo` route you would also render the
top-level `error` template into the `application` template's `outlet`. This is
intentionally parallel behavior as the `foo` route is never successfully
entered. In order to create a `foo` scope for errors and render `foo/error`
into `foo`'s `outlet` you would need to split the dynamic segment:

```js
App.Router.map(function() {
  this.resource('foo', {path: '/foo'}, function() {
    this.resource('elem', {path: ':id'}, function() {
      this.route('baz');
    });
  });
});
```

[Example JSBin](http://jsbin.com/tujepi)


### The `error` event

If `ArticlesOverviewRoute#model` returns a promise that rejects (because, for
instance, the server returned an error, or the user isn't logged in,
etc.), an `error` event will fire on `ArticlesOverviewRoute` and bubble upward.
This `error` event can be handled and used to display an error message,
redirect to a login page, etc.


```js
App.ArticlesOverviewRoute = Ember.Route.extend({
  model: function(params) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
       reject("Error");
    });
  },
  actions: {
    error: function(error, transition) {

      if (error && error.status === 400) {
        // error substate and parent routes do not handle this error
        return this.transitionTo('modelNotFound');
      }

      // Return true to bubble this event to any parent route.
      return true;
    }
  }
});
```

In analogy with the `loading` event, you could manage the `error` event
at the Application level to perform any app logic and based on the
result of the last `error` handler, Ember will decide if substate behavior
must be performed or not.

```js
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    error: function(error, transition) {

      // Manage your errors
      Ember.onerror(error);

      // substate implementation when returning `true`
      return true;

    }
  }
});
```


## Legacy `LoadingRoute`

Previous versions of Ember (somewhat inadvertently) allowed you to define a global `LoadingRoute`
which would be activated whenever a slow promise was encountered during
a transition and exited upon completion of the transition. Because the
`loading` template rendered as a top-level view and not within an
outlet, it could be used for little more than displaying a loading
spinner during slow transitions. Loading events/substates give you far
more control, but if you'd like to emulate something similar to the legacy
`LoadingRoute` behavior, you could do as follows:

```js
App.LoadingView = Ember.View.extend({
  templateName: 'global-loading',
  elementId: 'global-loading'
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    loading: function() {
      var view = this.container.lookup('view:loading').append();
      this.router.one('didTransition', view, 'destroy');
    }
  }
});
```

[Example JSBin](http://jsbin.com/leruqa)

This will, like the legacy `LoadingRoute`, append a top-level view when the
router goes into a loading state, and tear down the view once the
transition finishes.
