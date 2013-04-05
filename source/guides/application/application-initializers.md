## Application Initializers

Application Initializers allow you to register blocks of code that execute
when your Ember application is initializing. With an Initializer, you can 
access Ember's underlying container and inject other objects, register global
DOM ```onReady``` event blocks or anything that is useful to setting up your
application. 

The Initializer requires a ```name``` attribute and an ```initialize``` method. 

A basic Application Initializer looks like this:

```javascript
Ember.Application.initializer({
  name: "initializerName",
 
  initialize: function(container, application) {
    ... code ...
  }
});
```

Initializers can also specify dependencies by using a ```after``` attribute 
which references the name of the Initializer it should run after. 

### Looking up objects in the Container &amp; Injecting Types

You can look up objects in the Container inside the ```initialize``` method like so:

```javascript
store = container.lookup('store:main')
```

Then you could inject a controller into all other loaded controllers in the container:

```javascript
  controller = container.lookup('controller:currentUser').set('content', user)
  container.typeInjection('controller', 'currentUser', 'controller:currentUser')
```

### Defining global DOM onReady blocks

If you need code to be executed when the DOM is ready and want a clean place to integrate
it into your Ember app, you can use an initializer like so:

```javascript
Ember.Application.initializer({
  name: "initializerName",
 
  initialize: function(container, application) {
    $(function(){
      /* Look up an attribute in a meta tag */
      attributes = $('meta[name="current-user"]').attr('content')

      /* Do something with it */
    });
  }
});
```

