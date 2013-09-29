# Loading and Saving Data With jQuery's Ajax

The easiest way to get started with data hosted on an external service
is to fetch that data directly in the `model` hook of a route and to
save it in an action of your route.

## When to Use This Technique

You should use jQuery Ajax to communicate with your server if:

* You are getting started with Ember, and already understand basic Ajax
  and want to get some data into your app quickly and easily.
* You are working with simple models, with few relationships between
  them (or relationships that you load and save all at once).
* You don't have the same models represented in many places, or are
  willing to roll your own identity map when the situation arises.
* You are willing to make frequent Ajax requests as your user navigates
  around the page, or are willing to roll your own in-memory cache.

See the bottom of this guide for a brief description of other, more
advanced ways you can work with data, and links to guides about 

## Getting Data Into Your App

When your user enters a route, Ember will ask the associated
`Ember.Route` object to convert the current URL into a model.

For example, if you have a `posts` resource:

```js
App.Router.map(function() {
  this.resource('posts');
});
```

When the user goes to `/posts`, Ember will ask `App.PostsRoute` which
model to use. This method, called the "model hook", can return an Array,
which will then become the model for the `posts` template. 

```js
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return [...];
  }
});
```

That's all well and good, but it assumes that you have all of the data
already available. In practice, you will usually need to get it from the
server before proceeding.

The good news is that Ember allows you to return a *Promise*, a
JavaScript object that represents a value that will eventually arrive
(sometimes called an "eventual value").

You may be asking: that sounds cool, but how do I make an "eventual
value"? jQuery's Ajax methods all return Promises by default!

If you want to tell Ember that the model for a route is the result of
making an Ajax request instead of a value that you have locally, just
return a jQuery Ajax request.

```js
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("/posts");
  }
});
```

### Munging Data

If you want to do some data munging before setting the model, just do it
in the success handler of the Ajax request. Whatever value you return
from the success handler will become the model.

```js
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("/posts").then(function(json) {
      return json.map(function(post) {
        return { title: post.TTL, body: post.BDY };
      });
    });
  }
});
```

### Parameter-Based Models

All of that works great for routes that only have a single model
associated with them. But what about routes that use `:post_id` to allow
a single route to represent many different models?

```js
App.Router.map(function() {
  this.resource('posts');
  this.resource('post', { path: '/posts/:post_id' });
});
```

In this case, the model for URLs like `/posts/1` will be different based
on the actual value of `post_id`.

In this situation, the `model` method will receive the parameters
extracted from the URL, and should use it to return the specific model
in question.

First, if you already have the data locally:

```js
var posts = [{
  id: "1",
  title: "Rails is omakase",
  body: "..."
}, {
  id: "2",
  title: "The Parley Letter",
  body: "..."
}];

App.PostsRoute = Ember.Route.extend({
  // as before, just return the local list of posts
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  // we'll need to use the :post_id param to figure out which model to
  // use, and it's available in `params`
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});
```

Again, this case isn't very interesting. You'll normally get your data
from the server. As before, we can replace our code with an Ajax lookup.
Because jQuery provides promises by default, we can return the result of
a call to `$.getJSON`.

```js
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("/posts");
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return $.getJSON("/posts/" + params.post_id);
  }
});
```

Ember will automatically wait for these Ajax calls to complete before
rendering your templates, so the Ajax-based routes behave exactly the
same as the synchronous versions.

As a result, you can often start by prototyping with synchronous `model`
hooks, and upgrade to Ajax once your app is further along.

## Drilling in to Collections

In the Ajax examples below, drilling in to an individual post triggered
a second Ajax call. We will need to do that if the user enters the app
from an individual post's page, but if she entered from the index, we'd
prefer to use the post we already downloaded.

In order to achieve this, you can build a simple cache that will first
try to use loaded data before fetching.

```js
// A simple cache class
App.Cache = Ember.Object.extend({
  init: function() {
    this._models = {};
  },

  /**
    Fetch a model by ID and URL. If the model is already in the cache,
    return it. Otherwise, return an Ajax request for the URL. When the
    Ajax response comes back, put the model in the cache so we don't
    make another Ajax request later.
  */
  fetch: function(id, url) {
    var models = this._models;

    if (id in models) {
      return models[id];
    }

    return $.getJSON(url).then(function(json) {
      models[id] = json;
      return json;
    });
  },

  /**
    Fetch an Array of models by URL. Return an Ajax request for the URL.
    When the Ajax response comes back, but the models in the cache by
    their individual `id` property.
  */
  fetchAll: function(url) {
    return $.getJSON(url).then(function(json) {
      json.forEach(function(model) {
        models[model.id] = model;
      });
      return json;
    }
  }
});
```

Then, we can use the cache in our model hooks:

```js
App.CacheController = Ember.Controller.extend({
  init: function() {
    this.posts = App.Cache.create();
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.controllerFor('cache')
      .posts.fetchAll('/posts');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.controllerFor('cache')
      .posts.fetch(params.post_id, '/posts/' + params.post_id);
  }
});
```

By putting the cache in a controller, we make sure that using
`App.reset()` to reset the application (in tests, or when the user logs
out) will also clear the cache.

This is just a very simple caching implementation. If you have more
complex caching needs, or if you need relationships between models, you
probably will want to use Ember Data, which handles much more
sophisticated scenarios.

## Partial Models

## More Advanced Techniques

There are several more advanced techniques, which provide more power,
but which require more up-front learning. You might want to consider
using one of these techniques if you have complex relationships or a
need for in-memory caching of models.

You can learn more about how to use Ember Data in these guides.

* [Using Ember Data as an in-memory cache][1]. You can still write all
  your own Ajax code, and use Ember Data as an in-memory cache with
  relationship support and a structured Adapter API for organizing your
  Ajax code better.
* [Using the Ember Data REST Adapter][2]. If your server uses relatively
  conventional REST semantics, you can take advantage of the built-in
  REST Adapter, which will build your URLs, make Ajax requests with the
  appropriate headers and body, and deserialize the return value. It
  also provides a pattern for receiving multiple records at once, known
  as "sideloading".
* [Using the Ember Data ActiveModel Adapter][3]. If your server uses
  Rails-like semantics, such as underscored keys, you can take advantage
  of the ActiveModel Adapter, which will convert Rails conventions into
  Ember conventions.
