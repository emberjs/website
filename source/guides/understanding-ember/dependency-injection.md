Ember.js provides a complete dependency injection and service lookup toolset via
containers. Internally, Ember applications uses a container to organize basic
framework components. For example, all route objects have the property `router`
set on them upon instantiation. When using Ember-Data, there is a `store` property
made available on all controller and route objects. Ember uses dependency injection
and service lookup to allow the layers of its MVC architecture to communicate.

#### How does dependency injection work?

Ember wires all parts of an application together using a single instance of the
`Ember.Container` object. When Ember needs to find a component (like a template or
model), it requests that component by name from the container (`template:index`
or `route:application`). If the container does not already have the requested
factory, it uses a resolver to discover that factory (in a variable like
`Ember.TEMPLATES['index']` or `App.ApplicationRoute`). After optionally adding
dependencies to the requested factory, the factory is cached and returned.

To accomplish most of your goals, using the container directly should not be necessary.
Instead Ember provides a set of high-level APIs on top of the container to use dependency injection in your application.

There two APIs suggested for application use:

* `needs`, a way to inject controllers onto other controllers
* `App.register/inject`, an API for arbitrary factory registration and dependency
  injection

##### Simple Dependency Injection with needs

A common use-case for dependency injection is that of a singleton service. For
instance, a controller maintaining the session state may be exposed to many other
controllers.

```javascript
var App = Ember.Application.create();
App.SessionController = Ember.Controller.extend({
  isAuthenticated: false
});
// The index controller may need access to that state:
App.IndexController = Ember.Controller.extend({
  needs: ['session']
  // Using needs, the controller instance will be available on `controllers`
  isLoggedIn: Ember.computed.alias('controllers.session.isAuthenticated')
});
```

When the `IndexController` is instantiated (likely by the route when rendering the
corresponding template), Ember will look for controllers matching those listed in
`needs`. Controllers in Ember are singletons (except item controllers, which should
be disregarded for this explanation), so if an instance is already available it is
returned. If not, the controller is resolved, instantiated, and cached before being
returned from the container. This instance is then added to the `controllers` object.

##### Exmample Use of Needs: An Audio Playback Service

To demonstrate how `needs` can create light-weight services, let's build a controller
that manages audio playback and makes it available to another controller.

HTML5 audio tags provide an easy way to play audio on the web. In the application
template, we will use the `render` helper to render a template containing the audio
tag. `render` backs its template with a controller of the same name.

```hbs
{{! application.hbs }}
{{render "audio"}}
{{outlet}}
```

```hbs
{{! audio.hbs }}
<audio id="audio" controls loop>
  <source {{bind-attr src=currentSrc}} type="audio/mpeg"></source>
</audio>
<div>{{currentSrc}}</div>
```

The controller itself will maintain the `currentSrc` property:

```javascript
App.AudioController = Ember.Controller.extend({
  currentSrc: null,
  play: function(src){
    this.set('currentSrc', src);
  }
});
```

This `AudioController` can be referenced by other controllers via
`needs`:

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

In the same manner, any other controller could access the `audio` controller
instance.

A functional version of this demo is provided below:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/depar/1/embed?js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

##### Defining New Framework Components

`needs` only provides a way of injecting controller objects onto other
controller objects. To inject any other type of object, Ember provides a
thin abstraction on the container in the form of `App.register` and `App.inject`.
We can create custom factory types, register them into the container and
inject them to other objects using this API.

Here, a logger class is defined:

```javascript
App.Logger = Ember.Object.extend({
  allMessages:[],
  error:function(msg){
    var fullMessage = "error:" + msg;
    this.get('allMessages').push(fullMessage);
    console.log(fullMessage);
  },
  warn:function(msg){
    var fullMessage = "warn:" + msg;
    this.get('allMessages').push(fullMessage);
    console.log(fullMessage);
  },
  info:function(msg){
    var fullMessage = "info:" + msg;
    this.get('allMessages').push(fullMessage);
    console.log(fullMessage);
  }
});
```

Now, to register it

```javascript
App.register('logger:main', App.Logger, {});
```

This snippet creates a new type called `logger`. The factory's name is `main`.
The second parameter is the object definition. A third parameter of options
can be passed to this API. They are -

* `instantiate: boolean (default:false)` - Every lookup will create a new
  instance if set to true.
* `singleton:boolean (default:true)` - A single instance will be created and
  re-used for all injections.

Now inject the logger into the controller and views.

```javascript
App.inject('controller', 'logger', 'logger:main');
App.inject('view', 'logger', 'logger:main');
```

This will inject the previously registered 'logger:main' into all objects
of type `controller` and `view` as a variable named `logger`.

Further granularity can be achieved by

```javascript
App.inject('controller:index', 'indexLogger', 'logger:main');
```

This will inject the logger instance onto the index controller, and no
other controllers.

Here is the full implementation of the above logger service.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/fajeriwu/1/embed?html,js,console,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>
