Dependency Injection is a big part of what Ember provides as a framework. For
example, all routes can access the router of an application. When using Ember-Data
there is a `store` property made available on all controllers and routes. Ember
uses dependency injection and lookup to allow the layers of its MVC architecture
to communicate. At the same time, the dependency injection tools provided by Ember
make it easy to create custom dependency rules.

#### How does dependency injection work?

Ember wires all parts of an application together using a single instance of the
`Ember.Container` object. When Ember needs to find a component (like a template or
model), it requests that component by name from the container (`template:index`
or `route:application`). If the container does not already have the requested
factory, it uses a resolver to discover that factory (in a variable like
`Ember.TEMPLATES['index']` or `App.ApplicationRoute`). After optionally adding
dependencies to the requested factory, the factory is cached and returned.

To accomplish most of your goals, using the container directly should not be necessary.
Instead Ember provides a set of high-level APIs on top of the container itself.

There are two APIs we will consider here:

* `needs`, a way to inject controllers onto other controllers
* `App.register/inject`, an API for arbitrary factory registration and dependency
  injection

##### Simple Dependency Injection with needs

A common use-case for dependency injection is that of a singleton service. For
instance, a controller maintaining the session state may exposed to many other
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
`needs`. Controllers in Ember are singletons (excepting item controllers, which should
be disregarded for this explanation), so if an instance is already available it is
returned. If not the controller is resolved, instantiated, and cached before being
returned from the container. This instance is then added to the `controllers` object.

##### In Practice: A Service for Audio Playback

Here, we will create an audioservice that is defined once but can be used by many
other controllers to play audio. A controller object can be defined as -

```javascript
App.AudioController = Ember.Controller.extend({
  play:function(trackSrc){
    this.set('trackSrc', trackSrc);
    this.set('playnow', true);
  },
  trackSrc:"defaultTrack.mp3"
});
```

This object can be injected into any other controller as below -

```javascript
App.IndexController = Ember.Controller.extend({
  needs:['audio'],
  first:'Sound1.mp3',
  second:"Sound2.mp3",
  actions:{
    play:function(songUrl){
      this.get('controllers.audio').play(songUrl);
    }
  }
});
```

When the index controller is created by Ember, it notes that there is a `needs`
dependency and looksup/creates an instance of AudioController. This object is made
available in a list called `controllers`

`needs:['audio']` leads to the audio controller being available in
`this.get('controllers.audio')`

A view and template are defined to create the audio html tag.

```hbs
<audio id='audio' controls loop>
  <source {{bind-attr src=trackSrc}} type='audio/mpeg'></source>
</audio>
<div> Now Playing - {{trackSrc}} </div>
```

The `trackSrc` is a binding to the controller variable. The view picks up the
element in the dom and plays the audio.

```javascript
App.AudioView = Ember.View.extend({
  templateName:'audio',
  playAudio:function(){
    if(this.get('controller.playnow')){
      Ember.run.schedule('afterRender', function(){
        //Play the audio after the src in audio tag has been updated.
      });
    this.set('controller.playnow', false);
    }
  }.observes('controller.playnow')
});
```

A template is created for users to play songs.

```hbs
<div class='link' {{action 'play' first}}>First Song</div>
<div class='link' {{action 'play' second}}>Second Song</div>
```

Only one instance of this audio service can be defined in the application template
using

```javascript
{{render 'audio'}}
```

This now enables us to play audio from any other controller by `needs:['audio']`
and `this.get('controllers.audio').play(trackUrl);`

<a class="jsbin-embed" href="http://emberjs.jsbin.com/mayul/4/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

##### Defining New Framework Components

`needs` provides a way of injecting only controller type. To inject any other
type of object, Ember provides a thin abstraction on the container in the form
of `App.register` and `App.inject`. We can create custom type of factories,
register them to the container and inject them to other objects using this api.

A new object can be created as

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

This snippet creates a new type called `logger`. The factoryname is `main`.
The second parameter is the object definition. A third parameter of options
can be passed to this api. They are -

* `instantiate: boolean (default:false)` - Every lookup will create a new
  instance if set to true.
* `singleton:boolean (default:true)` - A single instance will be created
  if none and cached. Only the cached instance will be returned.

Injecting the logger into my controller and views.

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

This will inject the logger instance only into the index controller.

Here is the full implementation of the above logger service.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/fajeriwu/1/embed?html,js,console,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>
