## Using initializers

When an Ember.js application starts up you often want to configure things like 3rd party libraries. Ember.js allows you to register initializers that will be called when the app starts up.


```javascript
Ember.Application.initializer({
  name: "initializerName",
 
  initialize: function(_, application) {
    // your initialization code
  }
});
```

A basic initializer requires two things, a name (which allows initializer ordering, see below) and an initialize function containing the code you want to run at startup time. The initialize function makes the application available for dependency injection (_the first argument is the container but it's use is considered harmful and should not be used_).


### Initializer ordering
It's often the case that your initializer must be run after another initializer e.g. your initializer needs access to the ember-auth to configure it. Ember allows you to specify 'before' and 'after' so that you may dictate the order in which the initializers are run.

```javascript
App.initializer({
  name: "first",
  initialize: function(_, application) {
    // called first
  }
});

App.initializer({
  after: "first",
  name: "second",
  before: "last",

  initialize: function(_, application) {
    // called after first but before last
  }
});

App.initializer({
  name: "last",

  initialize: function(_, application) {
    // called after second
  }
});
```


### Initializers for multiple ember apps

If you're loading multiple ember apps on the same page you may specify different initializers for each app. Note that for this to work you need to create a subclass of Ember.Application for each of your apps.

```javascript
AppABase = Ember.Application.extend();
AppBBase = Ember.Application.extend();

AppABase.initializer({
  name: "appAInitializer",
  initialize: function(_, application){

  }
});

AppBBase.initializer({
  name: "appBInitializer",
  initialize: function(_, application){

  }
});

AppA = AppABase.create({...});
AppB = AppBBase.create({...});
```


### Initializing services

If you have any additional services that you want to inject into controllers or routes then an initializer is the place to do it.

```javascript
Ember.Application.initializer({
  name: 'logger',
  
  initialize: function(_, application) {
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

For more details see [Dependency injection & service lookup](/guides/understanding-ember/dependency-injection-and-service-lookup).