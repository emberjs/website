This section covers some more advanced features of the router and its
capability for handling complex async logic within your app.

### A Word on Promises...

Ember's approach to handling asynchronous logic in the router makes
heavy use of the concept of Promises. In short, promises are objects that
represent an eventual value. A promise can either _fulfill_
(successfully resolve the value) or _reject_ (fail to resolve the
value). The way to retrieve this eventual value, or handle the cases
when the promise rejects, is via the promise's `then` method, which
accepts two optional callbacks, one for fulfillment and one for
rejection. If the promise fulfills, the fulfillment handler gets called
with the fulfilled value as its sole argument, and if the promise rejects, 
the rejection handler gets called with a reason for the rejection as its
sole argument. For example:

```js
var promise = fetchTheAnswer();

promise.then(fulfill, reject);

function fulfill(answer) {
  console.log("The answer is " + answer);
}

function reject(reason) {
  console.log("Couldn't get the answer! Reason: " + reason);
}
```

Much of the power of promises comes from the fact that they can be
chained together to perform sequential asynchronous operations:

```js
// Note: jQuery AJAX methods return promises
var usernamesPromise = Ember.$.getJSON('/usernames.json');

usernamesPromise.then(fetchPhotosOfUsers)
                .then(applyInstagramFilters)
                .then(uploadTrendyPhotoAlbum)
                .then(displaySuccessMessage, handleErrors);
```

In the above example, if any of the methods
`fetchPhotosOfUsers`, `applyInstagramFilters`, or
`uploadTrendyPhotoAlbum` returns a promise that rejects, 
`handleErrors` will be called with
the reason for the failure. In this manner, promises approximate an
asynchronous form of try-catch statements that prevent the rightward
flow of nested callback after nested callback and facilitate a saner
approach to managing complex asynchronous logic in your applications.

This guide doesn't intend to fully delve into all the different ways
promises can be used, but if you'd like a more thorough introduction,
take a look at the readme for [RSVP](https://github.com/tildeio/rsvp.js), 
the promise library that Ember uses. 

### The Router Pauses for Promises

When transitioning between routes, the Ember router collects all of the
models (via the `model` hook) that will be passed to the route's
controllers at the end of the transition. If the `model` hook (or the related
`beforeModel` or `afterModel` hooks) return normal (non-promise) objects or 
arrays, the transition will complete immediately. But if the `model` hook 
(or the related `beforeModel` or `afterModel` hooks) returns a promise (or 
if a promise was provided as an argument to `transitionTo`), the transition 
will pause until that promise fulfills or rejects.

**Note:** The router considers any object with a `then` method
defined on it to be a promise.

If the promise fulfills, the transition will pick up where it left off and
begin resolving the next (child) route's model, pausing if it too is a
promise, and so on, until all destination route models have been
resolved. The values passed to the `setupController` hook for each route
will be the fulfilled values from the promises.

A basic example:

```js
App.TardyRoute = Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(function() {
        resolve({ msg: "Hold Your Horses" });
      }, 3000);
    });
  }, 

  setupController: function(controller, model) {
    console.log(model.msg); // "Hold Your Horses"
  }
});
```

When transitioning into `TardyRoute`, the `model` hook will be called and
return a promise that won't resolve until 3 seconds later, during which time
the router will be paused in mid-transition. When the promise eventually
fulfills, the router will continue transitioning and eventually call
`TardyRoute`'s `setupController` hook with the resolved object.

This pause-on-promise behavior is extremely valuable for when you need
to guarantee that a route's data has fully loaded before displaying a
new template. 

### When Promises Reject...

We've covered the case when a model promise fulfills, but what if it rejects? 

By default, if a model promise rejects during a transition, the transition is
aborted, no new destination route templates are rendered, and an error
is logged to the console.

You can configure this error-handling logic via the `error` handler on
the route's `actions` hash. When a promise rejects, an `error` event
will be fired on that route and bubble up to `ApplicationRoute`'s
default error handler unless it is handled by a custom error handler
along the way, e.g.:

```js
App.GoodForNothingRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.reject("FAIL");
  },

  actions: {
    error: function(reason) {
      alert(reason); // "FAIL"

      // Can transition to another route here, e.g.
      // this.transitionTo('index');

      // Uncomment the line below to bubble this error event:
      // return true;
    }
  }
});
```

In the above example, the error event would stop right at
`GoodForNothingRoute`'s error handler and not continue to bubble. To
make the event continue bubbling up to `ApplicationRoute`, you can
return true from the error handler.

### Recovering from Rejection

Rejected model promises halt transitions, but because promises are chainable,
you can catch promise rejects within the `model` hook itself and convert 
them into fulfills that won't halt the transition.

```js
App.FunkyRoute = Ember.Route.extend({
  model: function() {
    return iHopeThisWorks().then(null, function() {
      // Promise rejected, fulfill with some default value to
      // use as the route's model and continue on with the transition
      return { msg: "Recovered from rejected promise" };
    });
  }
});
```

### beforeModel and afterModel

The `model` hook covers many use cases for pause-on-promise transitions,
but sometimes you'll need the help of the related hooks `beforeModel`
and `afterModel`. The most common reason for this is that if you're
transitioning into a route with a dynamic URL segment via `{{link-to}}` or
`transitionTo` (as opposed to a transition caused by a URL change), 
the model for the route you're transitioning into will have already been
specified (e.g. `{{#link-to 'article' article}}` or
`this.transitionTo('article', article)`), in which case the `model` hook
won't get called. In these cases, you'll need to make use of either
the `beforeModel` or `afterModel` hook to house any logic while the
router is still gathering all of the route's models to perform a
transition.

#### `beforeModel`

Easily the more useful of the two, the `beforeModel` hook is called
before the router attempts to resolve the model for the given route. In
other words, it is called before the `model` hook gets called, or, if
`model` doesn't get called, it is called before the router attempts to
resolve any model promises passed in for that route.

Like `model`, returning a promise from `beforeModel` will pause the
transition until it resolves, or will fire an `error` if it rejects.

The following is a far-from-exhaustive list of use cases in which
`beforeModel` is very handy:

- Deciding whether to redirect to another route before performing a
  potentially wasteful server query in `model`
- Ensuring that the user has an authentication token before proceeding
  onward to `model`
- Loading application code required by this route 

```js
App.SecretArticlesRoute  = Ember.Route.extend({
  beforeModel: function() {
    if (!this.controllerFor('auth').get('isLoggedIn')) {
      this.transitionTo('login');
    }
  }
});
```

[See the API Docs for `beforeModel`](/api/classes/Ember.Route.html#method_beforeModel)

#### `afterModel`

The `afterModel` hook is called after a route's model (which might be a
promise) is resolved, and follows the same pause-on-promise semantics as
`model` and `beforeModel`. It is passed the already-resolved model 
and can therefore perform any additional logic that
depends on the fully resolved value of a model.

```js
App.ArticlesRoute = Ember.Route.extend({
  model: function() {
    // App.Article.find() returns a promise-like object
    // (it has a `then` method that can be used like a promise)
    return App.Article.find();
  },
  afterModel: function(articles) {
    if (articles.get('length') === 1) {
      this.transitionTo('article.show', articles.get('firstObject'));
    }
  }
});
```

You might be wondering why we can't just put the `afterModel` logic
into the fulfill handler of the promise returned from `model`; the
reason, as mentioned above, is that transitions initiated 
via `{{link-to}}` or `transitionTo` likely already provided the
model for this route, so `model` wouldn't be called in these cases.

[See the API Docs for `afterModel`](/api/classes/Ember.Route.html#method_afterModel)

### More Resources

- [Embercasts: Client-side Authentication Part 2](http://www.embercasts.com/episodes/client-side-authentication-part-2)
- [RC6 Blog Post describing these new features](/blog/2013/06/23/ember-1-0-rc6.html)

