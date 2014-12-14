### Debugging Ember and Ember Data

Here are some tips you can use to help debug your Ember application.

Also, check out the
[ember-extension](https://github.com/tildeio/ember-extension)
project, which adds an Ember tab to Chrome DevTools that allows you
to inspect Ember objects in your application.

## Routing

#### Log router transitions

```javascript
window.App = Ember.Application.create({
  // Basic logging, e.g. "Transitioned into 'post'"
  LOG_TRANSITIONS: true, 

  // Extremely detailed logging, highlighting every internal
  // step made while transitioning into a route, including
  // `beforeModel`, `model`, and `afterModel` hooks, and
  // information about redirects and aborted transitions
  LOG_TRANSITIONS_INTERNAL: true
});
```

#### View all registered routes

```javascript
Ember.keys(App.Router.router.recognizer.names)
```

####  Get current route name / path

Ember installs the current route name and path on your
app's `ApplicationController` as the properties
`currentRouteName` and `currentPath`. `currentRouteName`'s
value (e.g. `"comments.edit"`) can be used as the destination parameter of 
`transitionTo` and the `{{linkTo}}` Handlebars helper, while 
`currentPath` serves as a full descriptor of each
parent route that has been entered (e.g.
`"admin.posts.show.comments.edit"`).

```javascript
// From within a Route
this.controllerFor("application").get("currentRouteName");
this.controllerFor("application").get("currentPath");

// From within a controller, after specifying `needs: ['application']`
this.get('controllers.application.currentRouteName');
this.get('controllers.application.currentPath');

// From the console:
App.__container__.lookup("controller:application").get("currentRouteName")
App.__container__.lookup("controller:application").get("currentPath")
```

## Views / Templates

#### Log view lookups

```javascript
window.App = Ember.Application.create({
  LOG_VIEW_LOOKUPS: true
});
```

#### Get the View object from its DOM Element's ID

```javascript
Ember.View.views['ember605']
```

#### View all registered templates

```javascript
Ember.keys(Ember.TEMPLATES)
```

#### Handlebars Debugging Helpers

```handlebars
{{debugger}}
{{log record}}
```

## Controllers

#### Log generated controller 

```javascript
window.App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true
});
```

## Ember Data

#### View ember-data's type maps

```javascript
// all type maps in memory
App.__container__.lookup('store:main').typeMaps 

// specific type map in memory
App.__container__.lookup('store:main').typeMapFor(App.Color)

// map of id to record for all cached records for a type
App.__container__.lookup('store:main').typeMapFor(App.Color).idToRecord

// array of all cached records for a type
App.__container__.lookup('store:main').typeMapFor(App.Color).records

// grab a property off record id "33"
App.__container__.lookup('store:main').typeMapFor(App.Color).idToRecord["33"].get('color')
```

## Observers / Binding

#### See all observers for a object, key

```javascript
Ember.observersFor(comments, keyName);
```

#### Log object bindings

```javascript
Ember.LOG_BINDINGS = true
```

## Miscellaneous

#### Turn on resolver resolution logging

This option logs all the lookups that are done to the console. Custom objects
you've created yourself have a tick, and Ember generated ones don't.

It's useful for understanding which objects Ember is finding when it does a lookup
and which it is generating automatically for you.

```javascript
App = Ember.Application.create({
  LOG_RESOLVER: true
});
```

#### View an instance of something from the container

```javascript
App.__container__.lookup("controller:posts")
App.__container__.lookup("route:application")
```

#### Dealing with deprecations

```javascript
Ember.ENV.RAISE_ON_DEPRECATION = true
Ember.LOG_STACKTRACE_ON_DEPRECATION = true
```


#### Implement an Ember.onerror hook to log all errors in production

```javascript
Ember.onerror = function(error) {
  Ember.$.ajax('/error-notification', {
    type: 'POST',
    data: {
      stack: error.stack,
      otherInformation: 'exception message'
    }
  });
}
```

#### Import the console

If you are using imports with Ember, be sure to import the console:

```javascript
Ember = {
  imports: {
    Handlebars: Handlebars,
    jQuery: $,
    console: window.console
  }
};
```

#### Errors within an `RSVP.Promise`

There are times when dealing with promises that it seems like any errors
are being 'swallowed', and not properly raised. This makes it extremely
difficult to track down where a given issue is coming from. Thankfully,
`RSVP` has a solution for this problem built in.

You can provide an `onerror` function that will be called with the error
details if any errors occur within your promise. This function can be anything
but a common practice is to call `console.assert` to dump the error to the
console.

```javascript
Ember.RSVP.on('error', function(error) {
  Ember.Logger.assert(false, error);
});
```

#### Errors within `Ember.run.later` ([Backburner.js](https://github.com/ebryn/backburner.js))

Backburner has support for stitching the stacktraces together so that you can
track down where an erroring `Ember.run.later` is being initiated from. Unfortunately,
this is quite slow and is not appropriate for production or even normal development.

To enable this mode you can set:

```javascript
Ember.run.backburner.DEBUG = true;
```
