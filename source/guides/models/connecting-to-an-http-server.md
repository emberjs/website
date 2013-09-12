If your Ember application needs to load JSON data from an HTTP
server, this guide will walk you through the process of configuring
Ember Data to load records in whatever format your server returns.

The store uses an object called an _adapter_ to know how to
communicate over the network. By default, the store will use
`DS.RESTAdapter`, an adapter that communicates with an HTTP server by
transmitting JSON via XHR.

This guide is divided into two sections. The first section covers what
the default behavior of the adapter is, including what URLs it will
request records from and what format it expects the JSON to be in.

The second section covers how to override these default settings to
customize things like which URLs data is requested from and how the JSON
data is structured.

### URL Conventions

The REST adapter uses the name of the model to determine what URL to
send JSON to.

For example, if you ask for an `App.Photo` record by ID:

```js
App.PhotoRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('photo', params.photo_id);
  }
});
```

The REST adapter will automatically send a `GET` request to `/photos/1`.

The actions you can take on a record map onto the following URLs in the
REST adapter:

<table>
  <thead>
    <tr><th>Action</th><th>HTTP Verb</th><th>URL</th></tr>
  </thead>
  <tbody>
    <tr><th>Find</th><td>GET</td><td>/people/123</td></tr>
    <tr><th>Find All</th><td>GET</td><td>/people</td></tr>
    <tr><th>Update</th><td>PUT</td><td>/people/123</td></tr>
    <tr><th>Create</th><td>POST</td><td>/people</td></tr>
    <tr><th>Delete</th><td>DELETE</td><td>/people/123</td></tr>
  </tbody>
</table>

### JSON Conventions

Given the following models:

```js
var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.Post = DS.Model.extend({
  title: attr(),
  comments: hasMany('comment'),
  user: belongsTo('user')
});

App.Comment = DS.Model.extend({
  body: attr()
});
```

Ember Data expects that a `GET` request to `/posts/1` would
return the JSON in the following format:

```js
{
  "post": {
    "id": 1
    "title": "Rails is omakase",
    "comments": ["1", "2"],
    "_links": {
      "user": "/people/dhh"
    },
  },

  "comments": [{
    "id": "1",
    "body": "Rails is unagi"
  }, {
    "id": "2",
    "body": "Omakase O_o"
  }]
}
```

### Customizing the Adapter

To customize the REST adapter, define a subclass of `DS.RESTAdapter` and
name it `App.ApplicationAdapter`. You can then override its properties
and methods to customize how records are retrieved and saved.

### Customizing URLs

#### URL Prefix

If your JSON API lives somewhere other than on the host root,
you can set a prefix that will be added to all requests.

For example, if you are using a versioned JSON API, a request for a
particular person might go to `/api/v1/people/1`.

In that case, set `namespace` property to `/api/v1`.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: '/api/v1'
});
```

Requests for a `person` with ID `1`  would now go to `/api/v1/people/1`.

#### URL Host

If your JSON API runs on a different domain than the one serving your
Ember app, you can change the host used to make HTTP requests.

Note that in order for this to work, you will need to be using a browser
that supports [CORS](http://www.html5rocks.com/en/tutorials/cors/), and
your server will need to be configured to send the correct CORS headers.

To change the host that requests are sent to, set the `host` property:

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://api.example.com'
});
```

Requests for a `person` with ID `1` would now target `https://api.example.com/people/1`.
