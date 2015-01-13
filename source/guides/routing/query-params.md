Query parameters are optional key-value pairs that appear to the right of
the `?` in a URL. For example, the following URL has two query params,
`sort` and `page`, with respective values `ASC` and `2`:

    http://example.com/articles?sort=ASC&page=2

Query params allow for additional application state to be serialized
into the URL that can't otherwise fit into the _path_ of the URL (i.e.
everything to the left of the `?`). Common use cases for query params include
representing the current page, filter criteria, or sorting criteria.

### Specifying Query Parameters

Query params can be declared on route-driven controllers, e.g. to
configure query params that are active within the `articles` route,
they must be declared on `ArticlesController`.

**Note:** The controller associated with a given route can be changed
by specifying the `controllerName` property on that route.

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
array that the `articles` template will render:

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: ['category'],
  category: null,

  filteredArticles: function() {
    var category = this.get('category');
    var articles = this.get('model');

    if (category) {
      return articles.filterBy('category', category);
    } else {
      return articles;
    }
  }.property('category', 'model')
});
```

With this code, we have established the following behaviors:

1. If the user navigates to `/articles`, `category` will be `null`, so
   the articles won't be filtered.
2. If the user navigates to `/articles?category=recent`,
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
// Explicitly set target query params
{{#link-to 'posts' (query-params direction="asc")}}Sort{{/link-to}}

// Binding is also supported
{{#link-to 'posts' (query-params direction=otherDirection)}}Sort{{/link-to}}
```

In the above examples, `direction` is presumably a query param property
on the `PostsController`, but it could also refer to a `direction` property
on any of the controllers associated with the `posts` route hierarchy,
matching the leaf-most controller with the supplied property name.

**Note:** Subexpressions are only available in Handlebars 1.3
or later.

The link-to helper takes into account query parameters when determining
its "active" state, and will set the class appropriately. The active state
is determined by calculating whether the query params end up the same after
clicking a link. You don't have to supply all of the current,
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
    // for the first time, and we opt into refiring it upon
    // query param changes by setting `refreshModel:true` above.

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
a controller property to a different query param key using the
following configuration syntax:

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: {
    category: "articles_category"
  },
  category: null
});
```

This will cause changes to the `ArticlesController`'s `category`
property to update the `articles_category` query param, and vice versa.

Note that query params that require additional customization can
be provided along with strings in the `queryParams` array.

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: [ "page", "filter", {
    category: "articles_category"
  }],
  category: null,
  page: 1,
  filter: "recent"
});
```

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

1. Query param values are cast to the same datatype as the default
   value, e.g. a URL change from `/?page=3` to `/?page=2` will set
   `ArticlesController`'s `page` property to the number `2`, rather than
   the string `"2"`. The same also applies to boolean default values.
2. When a controller's query param property is currently set to its
   default value, this value won't be serialized into the URL. So in the
   above example, if `page` is `1`, the URL might look like `/articles`,
   but once someone sets the controller's `page` value to `2`, the URL
   will become `/articles?page=2`.

### Sticky Query Param Values

By default, query param values in Ember are "sticky", in that if you
make changes to a query param and then leave and re-enter the route, the
new value of that query param will be preserved (rather than reset to
its default). This is a particularly handy default for preserving sort/filter
parameters as you navigate back and forth between routes.

Furthermore, these sticky query param values are remembered/restored
according to the model loaded into the route. So, given a `team` route
with dynamic segment `/:team_name` and controller query param "filter",
if you navigate to `/badgers` and filter by `"rookies"`, then navigate
to `/bears` and filter by `"best"`, and then navigate to `/potatoes` and
filter by `"lamest"`, then given the following nav bar links,

```handlebars
{{#link-to 'team' 'badgers '}}Badgers{{/link-to}}
{{#link-to 'team' 'bears'   }}Bears{{/link-to}}
{{#link-to 'team' 'potatoes'}}Potatoes{{/link-to}}
```

the generated links would be

```html
<a href="/badgers?filter=rookies">Badgers</a>
<a href="/bears?filter=best">Bears</a>
<a href="/potatoes?filter=lamest">Potatoes</a>
```

This illustrates that once you change a query param, it is stored and
tied to the model loaded into the route.

If you wish to reset a query param, you have two options:

1. explicitly pass in the default value for that query param into
   `link-to` or `transitionTo`
2. use the `Route.resetController` hook to set query param values back to
   their defaults before exiting the route or changing the route's model

In the following example, the controller's `page` query param is reset
to 1, _while still scoped to the pre-transition `ArticlesRoute` model_.
The result of this is that all links pointing back into the exited route
will use the newly reset value `1` as the value for the `page` query
param.

```js
App.ArticlesRoute = Ember.Route.extend({
  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
      controller.set('page', 1);
    }
  }
});
```

In some cases, you might not want the sticky query param value to be
scoped to the route's model but would rather reuse a query param's value
even as a route's model changes. This can be accomplished by setting the
`scope` option to `"controller"` within the controller's `queryParams`
config hash:

```js
App.ArticlesController = Ember.ArrayController.extend({
  queryParams: [{
    showMagnifyingGlass: {
      scope: "controller"
    }
  }]
});
```

The following demonstrates how you can override both the scope and the
query param URL key of a single controller query param property:

```js
App.ArticlesController = Ember.Controller.extend({
  queryParams: [ "page", "filter",
    {
      showMagnifyingGlass: {
        scope: "controller",
        as: "glass",
      }
    }
  ]
});
```

## Examples

- [Search queries](http://jsbin.com/tukoye)
- [Sort: client-side, no refiring of model hook](http://jsbin.com/joboje)
- [Sort: server-side, refire model hook](http://jsbin.com/hiyalu)
- [Pagination + Sorting](http://jsbin.com/fayug)
- [Boolean values. False value removes QP from URL](http://jsbin.com/sisebi)
- [Global query params on app route](http://jsbin.com/duhof)
- [Opt-in to full transition via refresh()](http://jsbin.com/yanigu)
- [update query params by changing controller QP property](http://jsbin.com/zerojo)
- [update query params with replaceState by changing controller QP property](http://emberjs.jsbin.com/birugi)
- [w/ {{partial}} helper for easy tabbing](http://jsbin.com/baguc)
- [link-to with no route name, only QP change](http://jsbin.com/rujawi)
- [Complex: serializing textarea content into URL (and subexpressions))](http://emberjs.jsbin.com/tudiz)
- [Arrays](http://jsbin.com/gacihe)
