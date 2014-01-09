In general, the dynamic segments of a URL are a serialized representation 
of a model, commonly for example the model's ID. However, sometimes you 
need to serialize other application state into the URL. This could be 
further parameters that affect the loading of the model from the server, 
e.g. what page of a result set you are viewing, or it could be 
information about client side state, e.g. sort order when the records 
are sorted on the client.
 
There can also be more global information that you want to serialize into 
the url, for example if you want to store an auth token in the URL, or 
filter all models in your application globally. It's also possible that
there are a lot of parameters that you want to serialize in the url that 
are inconvenient to store in normal dynamic segments. This might apply 
when you have a map view and need to store X, Y, and zoom coordinates
along with a set of visible layers on the map. Although this is possible
to do with dynamic segments, it can be inconvenient. For any of these use 
case, you can consider using query params instead.

### Query Parameters are Controller-Driven

Support for query parameters is built right into controllers, unlike
other aspects of the URL which are specified and managed entirely at
the router level. First class support for query params at the 
controller level allows for a simple yet powerful API for updating and
responding to changes in query params without requiring the developer to
manually install and manage bindings/observers to keep the URL and 
controller state in sync. 
 
### Specifying Query Parameters

Query params can be specified by route-driven controllers. Recall that,
given a route specified by `this.route('articles');`, the value resolved
from the `ArticlesRoute`'s `model` hook will be loaded into 
`ArticlesController` as its `model` property. While `ArticlesRoute` has
the option of loading data into different controllers in the
`setupController` hook, `ArticlesController` is considered to be the
"route-driven" controller in this case, and therefore has the ability to
specify query params. 

<aside>
  **Note:** The controller associated with a given route can be changed
  by specifying the `controllerName` property on that route.
</aside>

Let's say we'd like to add a `category` 
query parameter that will filter out all the articles that haven't
been categorized as popular. To do this, we specify `'category'`
as one of `ArticlesController`'s `queryParams`:

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: ['category'],
  category: null
});
```

This sets up a binding between the `category` query param in the URL,
and the `category` property on `ArticlesController`. In other words,
once the `articles` route has been entered, any changes to the
`category` query param in the URL will update the `category` property 
on `ArticlesController`, and vice versa.

Now we just need to define a computed property of our category-filtered
array that `articles` template will render:

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: ['category'],
  category: null,

  filteredArticles: function() {
    var category = this.get('category');
    var articles = this.get('model');

    if (category) {
      return articles.filterProperty('category', category);
    } else {
      return articles;
    }
  }.property('category', 'model')
});
```

With this code, we have established the following behaviors:

1. If the user navigates to `/articles`, `category` will be `null`, so
   the articles won't be filtered.
2. If the user navigates to `/articles?articles[category]=recent`, 
   `category` will be set to `"recent"`, so articles will be filtered.
3. Once inside the the `articles` route, any changes to the `category`
   property on `ArticlesController` will cause the URL to update the
   query param. By default, a query param property change won't cause a
   full router transition (i.e. it won't call `model` hooks and
   `setupController`, etc.); it will only update the URL.

### link-to Helper
 
The `link-to` helper supports specifying query params by way of the
`query-params` subexpression helper.
 
```handlebars
// Explicitly set target query para
{{#link-to 'posts' (query-params direction="asc")}}Sort{{/link-to}}
 
// Binding is also supported
{{#link-to 'posts' (query-params direction=otherDirection)}}Sort{{/link-to}}
```

In the above examples, `direction` is presumably a query param property
on `PostsController`, but it could also refer to a `direction` property
on any of the controllers associated with the `posts` route hierarchy,
matching the leaf-most controller with the supplied property name.

<aside>
  **Note:** Subexpressions are only available in Handlebars 1.3
  or later.
</aside>
 
The link-to helper takes into account query parameters when determining 
its "active" state, and will set the class appropriately. The active state
is determined by working out if you clicked on the link, would the query
params end up the same? You don't have to supply all of the current, 
active query params for this to be true.

### transitionTo

`Route#transitionTo` (and `Controller#transitionToRoute`) now 
accepts a final argument, which is an object with 
the key `queryParams`.

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

### Opting into a full transition

Keep in mind that if the arguments provided to `transitionTo` 
or `link-to` only correspond to a change in query param values,
and not a change in the route hierarchy, it is not considered a 
full transition, which means that hooks like `model` and
`setupController` won't fire by default, but rather only 
controller properties will be updated with new query param values, as
will the URL. 

But some query param changes necessitate loading data from the server,
in which case it is desirable to opt into a full-on transition. To opt
into a full transition, you can provide a handler for the
`queryParamsDidChange` action that calls `Route#refresh`, e.g.:

```js
App.ArticlesRoute = Ember.Route.extend({
  model: function(params) {
    // This gets called upon entering 'articles' route
    // for the first time, and we opt in refiring it
    // upon query param changes via `queryParamsDidChange` action

    // params has format of { category: "someValueOrJustNull" },
    // which we can just forward to the server.
    return this.store.findQuery('articles', params);
  },
  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});

App.ArticlesController = Ember.ArrayController.extend({
  queryParams: ['category'],
  category: null
});
```

`Route#refresh` is a general purpose method that essentially invalidates
the data currently loaded data into a route hierarchy, causing `model`
hooks on the route you call it on (and any child routes) to refire. If
the new models returned from the hooks are different from what was
previously loaded, `setupController` hooks will refire as well, similar
to what would happen when navigating between `/users/123` and
`/users/456`.

In the case of query parameters, we can use `Route#refresh` to opt into
a full transition in response to a query param change which otherwise
would have only caused controller properties to update.

<aside>
  **Note:** `Route#refresh` is general purpose, but resides behind the
  `query-params-new` feature flag along with all of the API being
  described by this guide.
</aside>

### "Stickiness"
 
By default, query params are "sticky". This means that if you are on a
url like `/posts?sort=name`, and you executed 
`transitionTo({queryParams: {direction: 'desc'}})` or clicked 
`{{#link-to 'posts' (query-params direction=desc)}}`, the resulting url will be 
`/posts?sort=name&direction=desc`.
 
To clear query params, give a falsy value, e.g.
`transitionTo({queryParams: {direction: null}})` or 
`{{#link-to 'posts' (query-params direction=false)}}`

### Boolean Query params
 
Boolean query params are serialized without the truth value,
e.g. `transitionTo('posts', {queryParams: {sort: true}})` 
would result in the url `/posts?sort`
 
This is for two reasons:
 
1. passing false is the way to clear query parameters
2. The string "false" is truthy in javascript. i.e. 
`if ("false") { alert('oops'); }` will show an alert.

## Examples

- [Search queries](http://emberjs.jsbin.com/ucanam/3008)
- [Sort: client-side, no refiring of model hook](http://emberjs.jsbin.com/ucanam/2937)
- [Sort: server-side, refire model hook](http://emberjs.jsbin.com/ucanam/2942)
- [Pagination + Sorting](http://emberjs.jsbin.com/ucanam/2950)
- [Boolean values. False value removes QP from URL](http://emberjs.jsbin.com/ucanam/2708/edit)
- [Global query params on app route](http://emberjs.jsbin.com/ucanam/2719/edit)
- [Opt-in to full transition via refresh()](http://emberjs.jsbin.com/ucanam/2711/edit)
- [replaceUrl by changing controller QP property](http://emberjs.jsbin.com/ucanam/2710/edit)
- [w/ {{partial}} helper for easy tabbing](http://emberjs.jsbin.com/ucanam/2706)
- [link-to with no route name, only QP change](http://emberjs.jsbin.com/ucanam/2718#/about?about[showThing])
- [Complex: serializing textarea content into URL (and subexpressions))](http://emberjs.jsbin.com/ucanam/2703/edit)
- [Arrays](http://emberjs.jsbin.com/ucanam/2849)

