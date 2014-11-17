Dependency injection and service lookup are two important framework concepts. The first, **dependency injection**, refers to a dependent object being injected onto another object during instantiation. For example, all route objects have the property `router` set on them during instantiation. We say that the dependency of the router has been injected onto the route object.

```JavaScript
App.IndexRoute = Ember.Route.extend({
  actions: {
    showPath: function(){
      // Dependency injection provides the router object to the route instance.
      alert(this.router.get('currentPath'));
    }
  }
});
```

Sometimes an Ember.js library will use dependency injection to expose its API to developers. An example of this is Ember-Data, which injects its store into all routes and controllers.

```JavaScript
App.IndexController = Ember.ObjectController.extend({
  actions: {
    findItems: function(){
      var controller = this;
      // Dependency injection provides the store object to the controller instance.
      this.store.find('item').then(function(items){
        controller.set('items', items);
      });
    }
  }
});
```

These are just two examples of how dependency injection, or DI, is used in Ember applications.

The second tool, **service lookup**, describes when a dependency is created or fetched on demand. Service lookup is the simpler pattern, and will be discussed first. Fundamentally, these two patterns share the same goals:

* Isolate responsibilities in an application
* Avoid the use of global variables and instances (important for testing)
* Allow a single object instance to represent state, but share that state with other objects.

### Lightweight Services with `needs`

A common use-case for service lookup is that of a singleton service. Often, these services will live near application state, and thus Ember provides an API that makes controller services easy to write.

For example, a session service can easily be made available to this index controller:

```javascript
var App = Ember.Application.create();
App.SessionController = Ember.Controller.extend({
  isAuthenticated: false
});
// The index controller may need access to that state:
App.IndexController = Ember.Controller.extend({
  needs: ['session'],
  // Using needs, the controller instance will be available on `controllers`
  isLoggedIn: Ember.computed.alias('controllers.session.isAuthenticated')
});
```

The `controllers` computed property returns a hash of the controllers listed in `needs`. Controllers in Ember.js are singletons, meaning the same instance is always returned when they are requested.

A second controller can take advantage of this singleton nature to access the same session object:

```javascript
App.SignInController = Ember.Controller.extend({
  needs: ['session'],
  isLoggedIn: Ember.computed.alias('controllers.session.isAuthenticated'),
  actions: {
    signIn: function(){
      // There is an alias to the session property, so this change propagates
      // to the session object then the IndexController.
      this.set('isLoggedIn', true);
    }
  }
});
```

The session object returned in both classes is the same. `needs` provides us an easy way to share state across controllers.

### Services with DOM via `needs`

The `needs` array can fetch any singleton controller in an Ember application. This can be combined with the `render` helper to create services that also have access to the DOM.

Let's build a controller that manages audio playback and makes it available to other controllers.

First, we create `AudioController` and attach it to the DOM by using the `render` helper. This helper renders a template, and backs that template with a controller of the same name.

```handlebars
{{! application.hbs }}
{{render "audio"}}
{{outlet}}
```

And we must create an `audio.hbs` template to render:

```handlebars
{{! audio.hbs }}
<audio id="audio" controls loop>
  <source {{bind-attr src=currentSrc}} type="audio/mpeg"></source>
</audio>
<div>{{currentSrc}}</div>
```

The `render` helper will back this template with a controller of the same name. We create that controller, and have it maintain the `currentSrc` property:

```javascript
App.AudioController = Ember.Controller.extend({
  currentSrc: null,
  play: function(src){
    this.set('currentSrc', src);
  }
});
```

To allow other controllers to play audio, we use the `needs` array to look up our new service:

```javascript
App.IndexController = Ember.Controller.extend({
  needs: ['audio'],
  actions: {
    selectSrc: function(src){
      this.get('controllers.audio').play(src);
    }
  }
});
```

When the index controller calls `this.get('controllers.audio')`, the audio service is returned. Other controllers can also use `needs` to access the `audio` service.

A functional version of this example is provided below:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/depar/1/embed?js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

Services are a simple way to share behavior between controllers and isolate responsibilities in an application. `needs` is an easy and quick way to create services and share them between an application's controllers.

For a more powerful way to connect Ember.js components, let's look at **dependency injection**.

### Dependency Management in Ember.js

When an Ember application starts running, it will create and use a single instance of the
`Ember.Container` object. This container object is responsible for managing factories and the dependencies between them. At the level of the container, a factory can be any framework component. The index template is a factory with the name `template:index`, and the application route is a factory with the name `route:application`. The container understands how to use these factories (are they singleton? Should they be instantiated?) and manages their dependencies.

Factory names have two parts segmented by a `:`. The first segment is the framework component type, and the second is the name of the component requested. Hence, an application view would be named `view:application`.

If the container does not already have a requested factory, it uses a resolver to discover that factory. The resolver is responsible for mapping the factory name of `view:application` to the global variable of `App.ApplicationView`. Tools like ember-cli may use alternative rules for resolving factories. After optionally adding dependencies to the requested factory, that factory is cached and returned.

Ember's container should be viewed as an implementation detail, and is not part of the supported public API.

### Dependency Injection with `register/inject`

Instead of accessing the container directly, Ember provides an API for registering factories and managing injections on the application instance.

There are two ways to access this API. Many Ember applications can access this API directly on the application instance:

```JavaScript
App = Ember.Application.create();

App.register('logger:main', {
  log: function(m) {
    console.log(m);
  }
}, { instantiate: false });

App.inject('route', 'logger', 'logger:main');
```

But ember-cli applications (and libraries) will need to use a more flexible hook, an initializer:

```JavaScript
Ember.Application.initializer({
  name: 'logger',
  
  initialize: function(container, application) {
    var logger = {
      log: function(m) {
        console.log(m);
      }
    };
    
    application.register('logger:main', logger, { instantiate: false });
    application.inject('route', 'logger', 'logger:main');
  }
});
```

Initializers can be declared at any time before an application is instantiated, making them easier to declare than directly registering factories on the application.

Any dependency injection is comprised of two parts. The first is the **factory registration**:

```JavaScript
var logger = {
  log: function(m) {
    console.log(m);
  }
};

application.register('logger:main', logger, { instantiate: false });
```

The `register` function adds the factory (`logger`) into the container. It adds it with the full name of `logger:main`, and with the option not to instantiate. When the factory is injected onto another object, it will be injected "as-is".

Often, it is preferable to register a factory that can be instantiated:

```JavaScript
var Logger = Ember.Object.extend({
  log: function(m) {
    console.log(m);
  }
});

application.register('logger:main', Logger);
```

This class will be instantiated before it is used by the container. This gives it the important benefit of being able to accept injections of its own.

The second part of dependency injection is, you guessed it, the **dependency injection**:

```JavaScript
application.inject('route', 'logger', 'logger:main');
```

This is an example of a *type injection*. Onto all factories of the type `route` the property, `logger` will be injected with the factory named `logger:main`. Routes in this example application can now access the logger:

```JavaScript
App = Ember.Application.extend();

App.Logger = Ember.Object.extend({
  log: function(m) {
    console.log(m);
  }
});

App.IndexRoute = Ember.Route.extend({
  activate: function(){
    // The logger property is injected into all routes
    this.logger.log('Entered the index route!');
  }
});

Ember.Application.initializer({
  name: 'logger',
  
  initialize: function(container, application) {
    application.register('logger:main', App.Logger);
    application.inject('route', 'logger', 'logger:main');
  }
});

App.create();
```

Injections can also be made on a specific factory by using its full name:

```JavaScript
application.inject('route:index', 'logger', 'logger:main');
```

Injections can be made onto all of Ember's major framework classes, including views, helpers, components, controllers, routes, and the router.

**Note:** For injections into models (if not using ember-cli), you need to enable the `MODEL_FACTORY_INJECTIONS` 
flag before you initialize your application. You can do this like so:

```JavaScript
Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.create({
  // Enable any options
});
```

What follows is a full implementation of the above logger service:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/fajeriwu/1/embed?html,js,console,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

Dependency injection and service lookup are two powerful tools in your Ember.js toolset, and every mature Ember application will require their use.
