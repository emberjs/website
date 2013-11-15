In general, the dynamic segments of a URL are a serialized representation of a model, commonly for example the model's ID. However, sometimes you need to serialize other application state into the URL. This could be further parameters that affect the loading of the model from the server, e.g. what page of a result set you are viewing, or it could be information about client side state, e.g. sort order when the records are sorted on the client.

There can also be more global information that you want to serialize into the url, for example if you want to store an auth token in the URL, or filter all models in your application globally. It's also possible that there is a lot of parameters that you want to serialize in the url that are inconvenient to store in normal dynamic segments. This might apply when you have a map view and need to store X, Y, and zoom coordinates along with a set of visible layers on the map. Although this is possible to do with dynamic segments, it can be inconvenient. For any of these use case, you can consider using query params instead.


### Specifying Query Parameters

Query params are baked right into your routes. This is essential so that the router and helpers can know what valid transitions and query parameter states are. Here is an example of defining which query params some routes respond to:

```javascript
App.Router.map(function() {
  this.resource('posts', {queryParams: ['sort', 'direction']}, function() {
    this.resource('post', {path: "/:id", queryParams: ['showDetails']});
  });
});
```

### Route Hooks

Query params are passed into the hooks on your routes when you have defined them. Only query params that have been defined to apply to the route in the router.map call will be passed in. If no query params are active for this route,
an empty object `{}` is passed in.

```javascript
App.PostsRoute = Ember.Route.extend({
  beforeModel:      function( queryParams, transition ) {},
  model:            function( params, queryParams, transition ) {},
  afterModel:       function( resolvedModel, queryParams, transition ) {},
  setupController:  function( controller, context, queryParams ) {},
  renderTemplate:   function( controller, context, queryParams ) {}
});
```

Only the query parameters that you specify to apply to a route are passed in, even if the parameters apply to parent routes.

```javascript
App.Router.map(function() {
  this.resource('posts', {queryParams: ['sort', 'direction']}, function() {
    this.resource('post', {path: "/:id", queryParams: ['showDetails', 'sort']});
  });
});

// If the user visits the URL:
// /posts/1?sort=name&direction=asc&showDetails=yes&otherQueryParam=something

App.PostsRoute = Ember.Route.extend({
  model: function( params, queryParams, transition ) {

    // queryParams is {sort: 'name', direction: 'asc'}
    // showDetails is not passed in because it's only registered on the child route
    // otherQueryParam is not passed in because it's not registered on any route

  }
});

App.PostRoute = Ember.Route.extend({
  model: function( params, queryParams, transition ) {
    // queryParams is {sort: 'name', showDetails: 'yes'}
    // direction is not passed in because it's only registered on the parent route
    // otherQueryParam is not passed in because it's not registered on any route
  }
});


```

<aside>
  **Note:** If you don't specify query params for a given route, then the parameters passed in to the route hooks remains unchanged.
</aside>

```javascript
// IndexRoute has no query params defined

App.IndexRoute = Ember.Route.extend({
    beforeModel:      function( transition ) {},
    model:            function( params, transition ) {},
    afterModel:       function( resolvedModel, transition ) {},
    setupController:  function( controller, context ) {},
    renderTemplate:   function( controller, context ) {}
});
```

### Transitioning Query Params

`transitionTo` now accepts a final argument, which is an object with the key `queryParams`.

```javascript
this.transitionTo('post', object, {queryParams: {showDetails: true}});
this.transitionTo('posts', {queryParams: {sort: 'title'}});

// if you just want to transition the query parameters without changing the route
this.transitionTo({queryParams: {direction: 'asc'}});
```

You can also use add query params to URL transitions:

```javascript
this.transitionTo("/posts/1?sort=date&showDetails=true");
```

### link-to Helper


The link-to helper supports specifying query params.

```handlebars
{{#link-to 'posts' direction=asc}}Sort{{/link-to}}

// Binding is also supported
{{#link-to 'posts' directionBinding=otherDirection}}Sort{{/link-to}}
```

The link-to helper takes into account query parameters when determining its "active" state, and will set the class appropriately. The active state is determined by working out if you clicked on the link, would the query params end up the same? You don't have to supply all of the current, active query params for this to be true.

### "Stickiness"

By default, query params are "sticky". This means that if you are on a url like `/posts?sort=name`, and you executed `transitionTo({queryParams: {direction: 'desc'}})` or clicked `{{#link-to 'posts' direction=desc}}`, the resulting url will be `/posts?sort=name&direction=desc`.

To clear query params, give a falsy value (but **not** `undefined`), e.g.
`transitionTo({queryParams: {direction: null}})` or `{{#link-to 'posts' direction=false}}`

It's also possible to clear all query params by passing false, e.g. `transitionTo({queryParams: false})` or `{{#link-to 'posts' queryParams=false}}`

### Boolean Query params

Boolean query params are serialized without the truth value, e.g. `transitionTo('posts', {queryParams: {sort: true}})` would result in the url `/posts?sort`

This is for two reasons:

1. passing false is the way to clear query parameters
2. The string "false" is truthy in javascript. i.e. `if ("false") { alert('oops'); }` will show an alert.
