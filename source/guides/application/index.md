## Creating an Application

The first step in creating an Ember.js application is to make an
instance of `Ember.Application`:

```javascript
window.App = Ember.Application.create();
```

Here we've called our application `App`, but you can call it whatever
makes the most sense for your application.

Having an application object is important for several reasons:

1. It is your application's namespace. All of the classes in your application will
   be defined as properties on this object (e.g., `App.PostsView` and
   `App.PostsController`). This helps to prevent polluting of the global scope.
2. It adds event listeners to the document and is responsible for
   sending events to your views.
3. It automatically renders the [_application
   template_](/guides/application/the-application-template), the root-most
   template, into which your other templates will be rendered.
4. It automatically creates a router and begins routing, based on the
   current URL.
