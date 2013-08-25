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

#### Get the state history of an ember-data record

```javascript
record.stateManager.get('currentPath')
```

#### Log state transitions

```javascript
record.set("stateManager.enableLogging", true)
```

#### View ember-data's identity map

```javascript
// all records in memory
App.__container__.lookup('store:main').recordCache 

// attributes
App.__container__.lookup('store:main').recordCache[2].get('data.attributes')

// loaded associations
App.__container__.lookup('store:main').recordCache[2].get('comments')
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


#### Implement a `Ember.onerror` hook to log all errors in production

```javascript
Ember.onerror = function(error) {
  Em.$.ajax('/error-notification', 'POST', {
    stack: error.stack,
    otherInformation: 'exception message'
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
