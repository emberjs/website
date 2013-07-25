### Debugging Ember and Ember Data

Here are some tips you can use to help debug your Ember application.

#### Log router transitions

```javascript
window.App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
```

#### Log view lookups

```javascript
window.App = Ember.Application.create({
  LOG_VIEW_LOOKUPS: true
});
```

#### LOG generated controller 

```javascript
window.App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true
});
```

#### Log object bindings

```javascript
Ember.LOG_BINDING = true
```

#### View all registered routes

```javascript
 Ember.keys(App.Router.router.recognizer.names)
 ```

#### View all registered templates

 ```javascript
Ember.keys(Ember.TEMPLATES)
 ```

#### Get the state history of an ember-data record

```javascript
record.stateManager.get('currentPath')
```

#### Get the View object for a generated ember `div` by its div id

```javascript
Ember.View.views['ember605']
```

#### Log state transitions

```javascript
record.set("stateManager.enableLogging", true)
```

#### View an instance of something from the container

```javascript
App.__container__.lookup("controller:posts")
App.__container__.lookup("route:application")
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

#### See all observers for a object, key

```javascript
Ember.observersFor(comments, keyName);
```

#### Dealing with deprecations

```javascript
Ember.ENV.RAISE_ON_DEPRECATION = true
Ember.LOG_STACKTRACE_ON_DEPRECATION = true
```

#### Handlebars

```handlebars
{{debugger}}
{{log record}}
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
