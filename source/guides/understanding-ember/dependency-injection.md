Dependency Injection is a big part of what Ember provides as a framework. For eg - all children views share the controller instance , template functions are accessible everywhere. As per the accepted rules of MVC, Ember provides dependency injection out of the box. At the same time, it is flexible enough to provide ways to create custom dependency rules. 

####How is dependency injection done?

Ember wires all the parts of the application using a single instance of a `container` object. Ember creates the `container` during application creation. It then registers new objects created by the framework into the container's registry. The container also stores various rules for framework defined injections and application specific injections. The application now uses this `container` object to lookup registered objects. Once the lookup is successful, we have an instance/singleton/function object which can be readily inserted into another object. 

####How can custom injections be done?

Ember exposes dependency injection for usage with the following abstractions - 

1. `needs`
2. `App.inject` and `App.register`
3. Access the `container` inside the App initializer.

#####Needs

`needs` is an abstraction provided through the `container` object. It allows us to inject controllers inside other controllers.

```js
	App.CommentsController = Ember.ArrayController.extend({
	  needs: ['post']
	});
```

When the comments controller is created, Ember looks for controllers listed in `needs` list. It first resolves the string 'post' to the registered controller name. It next looks for the singleton instance in the container's cache.If it is unable to find any instance, a new instance is created and injected to the requesting controller under the `controllers` object.  The post controller can be accessed in the comments controller as 
`this.get('controllers.post');`
 

#####Using needs to create service.

Here, we will create an audioservice that is defined once but can be used by many other controllers to play audio.  
A controller object can be defined as -

```js
App.AudioController = Ember.Controller.extend({
  play:function(trackSrc){
    this.set('trackSrc', trackSrc);
    this.set('playnow', true);
  },
  trackSrc:"defaultTrack.mp3"
});
```

This object can be injected into any other controller as below - 

```js
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

When the index controller is created by Ember, it notes that there is a `needs` dependency and looksup/creates an instance of AudioController. This object is made available in a list called `controllers`

`needs:['audio']` leads to the audio controller being available in `this.get('controllers.audio')`

A view and template are defined to create the audio html tag.

```hbs
<audio id='audio' controls loop>
  <source {{bind-attr src=trackSrc}} type='audio/mpeg'></source>
</audio>
<div> Now Playing - {{trackSrc}} </div>
```
The `trackSrc` is a binding to the controller variable.  
The view picks up the element in the dom and plays the audio.

```js
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

Only one instance of this audio service can be defined in the application template using

```js
{{render 'audio'}}
```

This now enables us to play audio from any other controller by `needs:['audio']` and `this.get('controllers.audio').play(trackUrl);`

<a class="jsbin-embed" href="http://emberjs.jsbin.com/mayul/4/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

#####App.inject and App.register

`needs` provides a way of injecting only controller type. To inject any other type of object, Ember provides a thin abstraction on the container in the form of `App.register` and `App.inject`. We can create custom type of factories, register them to the container and inject them to other objects using this api.

A new object can be created as 

```js
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

```js
App.register('logger:main', App.Logger, {});
```

This snippet creates a new type called `logger`. The factoryname is `main`. The second parameter is the object definition. A third parameter of options can be passed to this api. They are -   

* `instantiate: boolean (default:false)` - Every lookup will create a new instance if set to true.
* `singleton:boolean (default:true)` - A single instance will be created if none and cached. Only the cached instance will be returned.

Injecting the logger into my controller and views.

```js
App.inject('controller', 'logger', 'logger:main');
App.inject('view', 'logger', 'logger:main');
```

This will inject the previously registered 'logger:main' into all objects of type `controller` and `view` as a variable named `logger`.

Further granularity can be achieved by 

```js
App.inject('controller:index', 'indexLogger', 'logger:main');
```

This will inject the logger instance only into the index controller.

Here is the full implementation of the above logger service.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/fajeriwu/1/embed?html,js,console,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

#####Application Initializers

If you are trying to write an Ember plugin, you would want your plugin instance to be injected to the application during initialization.This can be achieved by using Application initializers. 

During application creation, Ember runs any number of initializers which may be internally or externally hooked.

```js
Ember.onLoad('Ember.Application', function(Application){
  Application.initializer({
    name:'injectedPlugin',
    before:'plugin'
    initialize:function(container, application){
      //Use the container to register/lookup/inject any parts of your plugin.
    }
  });
});

```

A good example of the initializer way of injection is our very own Ember.Data. It manages to inject the `store` into all the controllers and routes of the application using the same pattern.

