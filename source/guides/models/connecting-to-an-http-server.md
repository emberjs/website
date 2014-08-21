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
    <tr><th>Find</th><td>GET</td><td>/photos/123</td></tr>
    <tr><th>Find All</th><td>GET</td><td>/photos</td></tr>
    <tr><th>Update</th><td>PUT</td><td>/photos/123</td></tr>
    <tr><th>Create</th><td>POST</td><td>/photos</td></tr>
    <tr><th>Delete</th><td>DELETE</td><td>/photos/123</td></tr>
  </tbody>
</table>

### JSON Conventions

Given the following models:

```js
App.Post = DS.Model.extend({
  title:    DS.attr(),
  comments: DS.hasMany('comment'),
  user:     DS.belongsTo('user')
});

App.Comment = DS.Model.extend({
  body: DS.attr()
});
```

Ember Data expects that a `GET` request to `/posts/1` would
return the JSON in the following format:

```js
{
  "post": {
    "id": 1,
    "title": "Rails is omakase",
    "comments": ["1", "2"],
    "user" : "dhh"
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

To quickly prototype a model and see the expected JSON, try using the [Ember Data Model Maker](http://andycrum.github.io/ember-data-model-maker/) by Andy Crum.

### Customizing the Adapter

To customize the REST adapter, define a subclass of `DS.RESTAdapter` and
name it `App.ApplicationAdapter`. You can then override its properties
and methods to customize how records are retrieved and saved.

#### Customizing a Specific Model

It's entirely possible that you need to define options for just one model instead of an application-wide customization. In that case, you can create an adapter named after the model you are specifying:

```js
App.PostAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v2',
  host: 'https://api.example2.com'
});

App.PhotoAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1',
  host: 'https://api.example.com'
});
```

This allows you to easily connect to multiple API versions simultaneously or interact with different domains on a per model basis.

### Customizing URLs

#### URL Prefix

If your JSON API lives somewhere other than on the host root,
you can set a prefix that will be added to all requests.

For example, if you are using a versioned JSON API, a request for a
particular person might go to `/api/v1/people/1`.

In that case, set `namespace` property to `api/v1`.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
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

#### Custom HTTP Headers

Some APIs require HTTP headers, e.g. to provide an API key. Arbitrary
headers can be set as key/value pairs on the `RESTAdapter`'s `headers`
property and Ember Data will send them along with each ajax request.

For Example

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  headers: {
    'API_KEY': 'secret key',
    'ANOTHER_HEADER': 'Some header value'
  }
});
```

Requests for any resource will include the following HTTP headers.

```http
ANOTHER_HEADER: Some header value
API_KEY: secret key
```
