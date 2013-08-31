## Creating an Application

The first step to creating an Ember.js application is to make an
instance of `Ember.Application` and assign it to a global variable.

```javascript
window.App = Ember.Application.create();
```

Most people call their application `App`, but you can call it whatever
makes the most sense to you. Just make sure it starts with a capital
letter.

What does creating an `Ember.Application` instance get you?

1. It is your application's namespace. All of the classes in your
   application will be defined as properties on this object (e.g.,
   `App.PostsView` and `App.PostsController`). This helps to prevent
   polluting the global scope.
2. It adds event listeners to the document and is responsible for
   delegating events to your views. (See [The View
   Layer](/guides/understanding-ember/the-view-layer)
  for a detailed description.)
3. It automatically renders the [application
   template](/guides/templates/the-application-template).
4. It automatically creates a router and begins routing, choosing which
   template and model to display based on the current URL.
