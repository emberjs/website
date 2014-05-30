As explained in the [routing guide][1], whenever you define a new route,
Ember.js attempts to find corresponding Route, Controller, View, and Template
classes named according to naming conventions. If an implementation of any of
these objects is not found, appropriate objects will be generated in memory for you.

[1]: /guides/routing/defining-your-routes

#### Generated routes

Given you have the following route:

```javascript
App.Router.map(function() {
  this.resource('posts');
});
```

When you navigate to `/posts`, Ember.js looks for `App.PostsRoute`.
If it doesn't find it, it will automatically generate an `App.PostsRoute` for you.


##### Custom Generated Routes
You can have all your generated routes extend a custom route.  If you define `App.Route`,
all generated routes will be instances of that route.



#### Generated Controllers

If you navigate to route `posts`, Ember.js looks for a controller called `App.PostsController`.
If you did not define it, one will be generated for you.

Ember.js can generate three types of controllers:
`Ember.ObjectController`, `Ember.ArrayController`, and `Ember.Controller`.

The type of controller Ember.js chooses to generate for you depends on your route's
`model` hook:

- If it returns an object (such as a single record), an [ObjectController][2] will be generated.
- If it returns an array, an [ArrayController][3] will be generated.
- If it does not return anything, an instance of `Ember.Controller` will be generated.


[2]: /guides/controllers/representing-a-single-model-with-objectcontroller
[3]: /guides/controllers/representing-multiple-models-with-arraycontroller


##### Custom Generated Controllers

If you want to customize generated controllers, you can define your own `App.Controller`, `App.ObjectController`
and `App.ArrayController`.  Generated controllers will extend one of these three (depending on the conditions above).



#### Generated Views and Templates

A route also expects a view and a template.  If you don't define a view,
a view will be generated for you.

A generated template is empty.
If it's a resource template, the template will simply act
as an `outlet` so that nested routes can be seamlessly inserted.  It is equivalent to:

```handlebars
{{outlet}}
```



