Ember does a lot of behind-the-scenes work to maintain the relationships and connections between objects in your application. All of Ember's internal objects and those in your application namespace have references stored in another object named Container. This container is referred to under different circumstances during your application's lifecycle to retrieve needed objects. Ember also manages complex dependencies between these objects using the same container.


####What is Object Management in Ember?

Ember creates tons of objects for your definitions. For eg - the singleton router, instances of views that you/handlebars helpers defined and ofcourse your controller, models and templates.  
Management of these objects in the context of Ember would involve doing the following -  

* Keep track of all the objects defined.
* Retrieving stored objects vs Creating new objects where required vs Retrieve method as is.  

####When does dependency injection happen in Ember?  

The answer to this question is - All the time!  

* You can always access your controller from the corresponding view.
* You can always access your router from all the controllers.
* In your route when you say `setupController(controller, model)`, it may seem magical that `controller` and `model` objects are readily available to you. But this is injection and Ember does that for you.  

Ember does all of these tasks using a class called Container.

```js
var container = new Ember.Container();
```

Your whole application will only have one container that is created by Ember to hold all the component objects and connections between them.Ember accomplishes all the above magic through this container object. 

#####Keep track of all the objects defined.

When you define an object, say,    

```js
window.App = Ember.Application.create({
	rootElement:"#mainPage",
	LOG_TRANSITIONS: true,
	LOG_BINDINGS:true
});
```

Ember registers this 'factory' to the container's registry as `application:main`

```js
container.register('application:main', Ember.Application.create({
	rootElement:"#mainPage",
	LOG_TRANSITIONS: true,
	LOG_BINDINGS:true
});)
```
The parameters required to register are  

1. param1 - `application:main`
	Here the part before `:` is the `type` of the function definition.
	The part after `:` is the `name` of the particular definition.

2. param2 - This is the `function definition` that you provided. This is referred to as the `factory`  

#####Lookup Objects

The api `container.lookup` allows the application to retrieve objects from the container as and when required.  

```js
container.lookup('application:main');
```

The lookup basically resolves the string that you have passed to `type` and `name` and looks up the factory in the registry. Once the factory has been found, one of the following 3 things has to be decided before returning the object required.  

* Return the factory as it is (in case of a template function)
* Create a new instance of the factory (in case of a view)
* Return an existing instance of the factory (singleton) (in case of the router)

The choice of the above behaviors is made by defining options for the factory during register. The options are 
`{instantiate:true/false}` and `{singleton:true/false}`.  

* instantiate - set this to true if you want a different instance to be created at every lookup.
* singleton - set this to true if you want a singleton instance, that is, the lookup will create the instance only once and store it. Further lookups to this factory would return to you the same instance.  
The default option for both are false, in which case the container returns the factory object as it is during lookup.

At this point, it's good to mention that `the container object is available in all the objects that are looked up from it`. This is a useful thing to know and will be mentioned further down the road.  

####Dependency injection  

Injecting dependencies in the Ember contex is to make one object from the registry available in another object of the registry.If this is an instantiated object, then it will be available within the scope of the parent object.  

The two types of injection are - 

1. Controlled by the object  
Dependency injection inside an object is simply made by lookup of the required object from the container.

```js
App.IndexView = Ember.View.extend({
	router: function(){
		return this.container.lookup('router:main');
	}.property()
});
```
Since we know that `IndexView` will be initialised through the container for your application, `this.container` will give you the Application container, using which you can register/lookup new definitions/objects.  

2. Controlled by outside forces.
Injecting dependencies from outside an object allows you to maintain a modicum of decoupling between the two objects.

```js
App.GoogleAnalytics = Ember.Object.extend({
	/*methods to abstract analytics functionality*/
});

App.register('analytics:google', App.GoogleAnalytics, {singleton:true}); 
// Note- App.register and App.inject are facades over container.register/container.inject
App.inject('controller', 'analytics', 'analytics:google'); 
```
By doing so, we inject `analytics:google` as variable `analytics` in the returned of all factories of type `controller`.
We can also inject objects into a specific `type:name` factory like

```js
App.OtherAnalytics = Ember.Object.extend({
	/*methods to abstract analytics functionality*/
})
App.register('analytics:other', App.OtherAnalytics, {singleton:true});
App.inject('controller:mysplcontroller', 'analytics', 'analytics:other');
```
The advantages of relenquishing injection control to an outside authority, allows the `controllers` from having to keep knowledge of what kind of `analytics` module they need. Thus, the expectation is that `this.analytics.trackPage(data)` will work seamlessly across all controllers regardless of the identity of the injected object.











