In general, the dynamic segments of a URL are a serialized representation
of a model, commonly a model's ID. However, sometimes you
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
cases, you can consider using query params instead.

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
3. Once inside the `articles` route, any changes to the `category`
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

You can also add query params to URL transitions:

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
into a full transition when a controller query param property changes, 
you can use the optional `queryParams` configuration hash on the `Route`
associated with that controller, and set that query param's
`refreshModel` config property to `true`:


```js
App.ArticlesRoute = Ember.Route.extend({
  queryParams: {
    category: {
      refreshModel: true
    }
  },
  model: function(params) {
    // This gets called upon entering 'articles' route
    // for the first time, and we opt in refiring it
    // upon query param changes via `queryParamsDidChange` action

    // params has format of { category: "someValueOrJustNull" },
    // which we can just forward to the server.
    return this.store.findQuery('articles', params);
  }
});

App.ArticlesController = Ember.ArrayController.extend({
  queryParams: ['category'],
  category: null
});
```

### Update URL with `replaceState` instead

By default, Ember will use `pushState` to update the URL in the
address bar in response to a controller query param property change, but
if you would like to use `replaceState` instead (which prevents an
additional item from being added to your browser's history), you can
specify this on the `Route`'s `queryParams` config hash, e.g. (continued
from the example above):

```js
App.ArticlesRoute = Ember.Route.extend({
  queryParams: {
    category: {
      replace: true
    }
  }
});
```

Note that the name of this config property and its default value of
`false` is similar to the `link-to` helper's, which also lets
you opt into a `replaceState` transition via `replace=true`. 

### Map a controller's property to a different query param key

By default, specifying `foo` as a controller query param property will
bind to a query param whose key is `foo`, e.g. `?foo=123`. You can also map
a controller property to a different query param key using an optional
colon syntax similar to the `classNameBindings` syntax 
[demonstrated here](/guides/views/customizing-a-views-element/).

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: ['category:articles_category'],
  category: null
});
```

This will cause changes to the `ArticlesController`'s `category`
property to update the `articles_category` query param, and vice versa.

### Default values and deserialization

In the following example, the controller query param property `page` is
considered to have a default value of `1`. 

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: 'page',
  page: 1
});
```

This affects query param behavior in two ways:

1. The type of the default value is used to cast changed query param
   values in the URL before setting values on the controller. So, given
   the above example, if the user clicks the back button to change from
   `/?page=3` to `/?page=2`, Ember will update the `page` controller
   property to the properly cast number `2` rather than the string `"2"`, which it
   knows to do because the default value (`1`) is a number. This also
   allows boolean default values to be correctly cast when deserializing
   from URL changes.
2. When a controller's query param property is currently set to its
   default value, this value won't be serialized into the URL. So in the
   above example, if `page` is `1`, the URL might look like `/articles`,
   but once someone sets the controller's `page` value to `2`, the URL
   will become `/articles?page=2`.

## Examples

- [Search queries](http://emberjs.jsbin.com/ucanam/4059)
- [Sort: client-side, no refiring of model hook](http://emberjs.jsbin.com/ucanam/2937)
- [Sort: server-side, refire model hook](http://emberjs.jsbin.com/ucanam/4073)
- [Pagination + Sorting](http://emberjs.jsbin.com/ucanam/4075)
- [Boolean values](http://emberjs.jsbin.com/ucanam/4076/edit)
- [Global query params on app route](http://emberjs.jsbin.com/ucanam/4077/edit)
- [Opt-in to full transition via refreshModel:true](http://emberjs.jsbin.com/ucanam/4079/edit)
- [opt into replaceState via replace:true](http://emberjs.jsbin.com/ucanam/4080/edit)
- [w/ {{partial}} helper for easy tabbing](http://emberjs.jsbin.com/ucanam/4081)
- [link-to with no route name, only QP change](http://emberjs.jsbin.com/ucanam/4082#/about?showThing=true)
- [Complex: serializing textarea content into URL (and subexpressions))](http://emberjs.jsbin.com/ucanam/4083/edit)
- [Arrays](http://emberjs.jsbin.com/ucanam/4084)
- [Map to different URL key with colon syntax](http://emberjs.jsbin.com/ucanam/4090/edit)

