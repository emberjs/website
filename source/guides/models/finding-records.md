The Ember Data store provides a simple interface for finding records of a single
type through the `store` object's `find` method.

The first argument to `store.find()` is always the record type. The optional second
argument determines if a request is made for all records, a single record, or a query.

## Finding All Records of a Type
To find all records for a type, call find with only the record type parameter:

```javascript
App.PostRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post').then(function(posts) {
      // Optionally do something with posts
      return posts;
    });
  }
});
```

`find` returns a `DS.PromiseArray` that fulfills to a `DS.RecordArray`
containing all the records returned by the adapter.

#### Server Response to a FindAll request

When using the default `RESTAdapter` and `RESTSerializer` Ember Data
will perform the following steps to attempt to request the `post` data
from your server.

First the `RESTAdapter` will attempt to build the URL it will use to
request the `post` data. It does this by pluralizing and camelCasing
the record type name. For the above example, `post` would become the
url `/posts`. The `RESTAdapter` will then make a `GET` XHR (or ajax)
request to the `/posts` url.

Once the `GET /posts` requests is fulfilled the adapter will return the
data from the response to Ember Data's store. The store will use the
`RESTSerializer` to extract the data and normalize it into a form the
store can understand.

Given the following model definitions:

```js
App.Post = DS.Model.extend({
  title: DS.attr('string'),
  tag: DS.attr('string'),
  comments: DS.hasMany('comment')
});

App.Comment = DS.Model.extend({
  body: DS.attr('string'),
  post: DS.belongsTo('post')
});
```

The `RESTSerializer` would expect the response from your server to
look like the following json:

```json
{
  "post": [{
    "id": 1,
    "title": "Rails is omakase",
    "tag": "rails",
    "comments": [1, 2]
  }, {
    "id": 2,
    "title": "I'm Running to Reform the W3C's Tag",
    "tag": "w3c",
    "comments": [3]
  }],
  "comments": [{
    "id": 1,
    "body": "FIRST",
    "post": 1,
  }, {
    "id": 2,
    "body": "Rails is unagi",
    "post": 1
  }, {
    "id": 3,
    "body": "Good luck!",
    "post": 3
  }]
}
```

One thing you may notice is this response contains the data for three
records instead of only the `post` record that was originally
requested. This is a pattern called "sideloading". Sideloading allows
your application to reduce the number of HTTP requests necessary to
load data by also including related records in the response. In the
above example we can see the post response is nested under the `post`
key and related comment records are nested under the `comments` key.

On the individual records in your payload, the `RESTSerializer`
expects every record to have a unique (per type) identifier under the
`id` property. It also expects all of the attributes and relationship
to use the same property names in the payload as the property names on
the model.



#### Customizing the Adapter FindAll request

Its not always possible to change your backend to match the format
Ember Data expects out of the box.

The adapter is the class responsible for communicating with your
backend. The built in `RESTAdapter` knows how to talk to REST APIs
using the HTTP Protocol. The `RESTAdapter` has several hooks that can
be used to customize the HTTP requests it makes for the findAll
request.

There are two ways to create a custom adapter for you application. You
could define an `ApplicationAdapter` to make global changes to all the
requests in your project or you could create a model specific adapter
to customize just the requests used for that model. When you have both
a model specific adapter and an `ApplicationAdapter` in your project
the model specific adapter will always get priority.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  // Application specific overrides go here
});
```

Model specific adapters follow the naming convention of "ModelName" + "Adapter".

```js
App.PostAdapter = DS.RESTAdapter.extend({
  // Post specific overrides go here
});
```

Ember Data's store calls the Adapter's `findAll` method to requests
all the records for a given type. Overriding this method will allow
you to change how Ember Data makes this request.

```js
App.PostAdapter = DS.Adapter.extend({
  findAll: function(store, type, sinceToken) {
    return this.ajax('posts', 'POST'); // fictional legacy backend requires POST instead of GET
  }
});
```

For more information on all the adapter customization possibilities
such as prefixing the url with a namespace, changing the rules about
pluralizing model names in the route or make a request to a different
host check out the
[customizing adapters guide](/guides/models/customizing-adapters).


#### Customizing extracting the FindAll response with the Serializer

The Adapter only cares about communicating with the server it doesn't
know anything about how to parse the response payload that the server
returns. In Ember Data's architecture that job falls to the
`Serializer`.

Similar to the Adapter you can override Ember Data's Serializer
globally by defining an `ApplicationSerializer` or for just one model
with a model specific serializer.

```js
App.ApplicationSerializer = DS.RESTSerializer.extend({
    // Application specific overrides go here
});
```

or for just the `Post` model.

```js
App.PostSerializer = DS.RESTSerializer.extend({
    // Post specific overrides go here
});
```

Ember Data uses the RESTSerializer's `extractFindAll` method to
normalize the payload returned by the server.

```js
App.PostSerializer = DS.RESTSerializer.extend({
  extractFindAll: function(store, type, payload, id, requestType) {
    // Modify payload to make it match the format the RESTSerializer expects
    // Then call _super to let the RESTSerializer handle the rest for you
    return this._super(store, type, payload, id, requestType);
  }
});
```

You may recall from the example above that Ember Data expects the
server to return a payload that looks something like this:

```json
{
  "post": [{
    "id": 1,
    "title": "Rails is omakase",
    "tag": "rails",
    "comments": [1, 2]
  }, {
    "id": 2,
    "title": "I'm Running to Reform the W3C's Tag",
    "tag": "w3c",
    "comments": [3]
  }],
  "comments": [{
    "id": 1,
    "body": "FIRST",
    "post": 1,
  }, {
    "id": 2,
    "body": "Rails is unagi",
    "post": 1
  }, {
    "id": 3,
    "body": "Good luck!",
    "post": 3
  }]
}
```

If you are using Ember Data's built in `RESTSerializer` the store will
end up calling `extractFindAll` to normalize the payload response. This
normalize payload is the format you should target if you are writing a
customized serializer for your own backend. Below is an example of
that the normalized object returned by the serializer should look
like.

```json
[
  {
    "id": 1,
    "title": "Rails is omakase",
    "tag": "rails",
    "comments": [1, 2]
  },
  {
    "id": 2,
    "title": "I'm Running to Reform the W3C's Tag",
    "tag": "w3c",
    "comments": [3]
  }
]
```

Right away you may notice some differences between this format and the
sideloaded payload shown above. First this normalized format is an
array instead of an object. This is because the `findAll` request can
potentially return zero, one or many records. You may also notice that
the side loaded relationships are missing. The `extractFindAll` method
has will pull records out of the response payload, normalize them and
pushed them into the store so they are ready to use when needed but
because they are not the main records this request was for they are
not going to be include directly in the result returned by the
`store.findAll` function so they are not included in the return value
from `extractFindAll`.

Each object in the array must follow this format for it to be
correctly converted into a record.

    - must have a unique `id` property
    - to update an `attr` or relationships on the record you must have a matching property name in the normalized object 
    - `belongsTo` relationships must contain a record id or null
    - `hasMany` relationships must contain an array of record ids.

Properties that are defined on the model but are omitted in the
normalized object will not be updated. Properties that are included in
the normalized object but not defined on the Model will raise a
warning unless the `TODO find out the name of this flag` flag is set
to `false`.

For more information on serializer customization such as changing the
id property or converting an underscore_case properties to camelCase
please check out the
[customizing serializers guide](/guides/models/customizing-serializers).



### Finding a Single Record

If you provide a number or string as the second argument to
`store.find()`, Ember Data will assume that you are passing in an ID
and attempt to retrieve a record of the type passed in as the first
argument with that ID. This will return a promise that fulfills with
the requested record:

```javascript
App.PostRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post', 1).then(function(post) {
      // Do something with post...
      return post;
    });
  }
});
```

#### Server Response to a Find request

Just like with `findAll` request the `RESTAdapter` will attempt to
build the URL by pluralizing and camelCasing the record type name. It
will then add a slash followed by the value of the id pasted into the
`find` method call. For the above example of `store.find('post', 1);`
the url will be `/posts/1`.The `RESTAdapter` will then make a `GET`
ajax request to the `/posts/1` url.

The server is expected to return the record with the matching id in
addition to any records related to the primary record. For the Post
and Comment models defined above the json response to
`store.find('post', 1);` might looks something like this:

```json
{
  "post": [{
    "id": 1,
    "title": "Rails is omakase",
    "tag": "rails",
    "comments": [1, 2]
  }],
  "comments": [{
    "id": 1,
    "body": "FIRST",
    "post": 1,
  }, {
    "id": 2,
    "body": "Rails is unagi",
    "post": 1
  }]
}
```

#### Customizing the Adapter Find request

Ember Data's store calls the Adapter's `find` method to request a
record with a specific type and id. Overriding this method will allow
you to change how Ember Data makes this request.

```js
App.PostAdapter = DS.Adapter.extend({
  find: function(store, type, id) {
    return this.ajax('posts/' + id, 'POST'); // fictional legacy backend requires POST instead of GET
  }
});
```

#### Customizing extracting the Find response with the Serializer

Ember Data uses the RESTSerializer's `extractFind` method to normalize
the payload returned by the server.

```js
App.PostSerializer = DS.RESTSerializer.extend({
  extractFind: function(store, type, payload, id, requestType) {
    // Modify payload to make it match the format the RESTSerializer expects
    // Then call _super to let the RESTSerializer handle the rest for you
    return this._super(store, type, payload, id, requestType);
  }
});
```

Unlike the previous example of the normalize json, Ember Data expects
`extractFind` to just return a single object instead of an array. This
is because the `store.find(type, id)` API is only expected to return
one object.

```json
{
    "id": 1,
    "title": "Rails is omakase",
    "tag": "rails",
    "comments": [1, 2]
}
```

### Querying For Records

If you provide a plain object as the second argument to `find`, Ember
Data will make a `GET` request with the object serialized as query
params. This method returns `DS.PromiseArray` in the same way as
`find` with no second argument.

For example, we could search for all `post` models who have the tag of
`w3c`:

```javascript
App.PostRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post', { tag: 'w3c' }).then(function(w3cPosts) {
      // Optionally do something with w3cPosts
      return w3cPosts;
    });
  }
});
```


#### Server Response to a FindQuery request

Just like with `findAll` request the `RESTAdapter` will attempt to
build the URL by pluralizing and camelCasing the record type name. It
will then use jQuery to serialized the filter object as query
parameters in the url. For the above example of `store.find('post', {
tag: 'w3c' });` the url will be `/posts/?tag=w3c`. The `RESTAdapter`
will then make a `GET` ajax request to the `/posts/?tag=w3c` url.

The server is expected to return any records that match the bases on
the query parameters in addition to any records related to the
matching records. For the Post and Comment models defined above the
json response to `store.find('post', { tag: 'w3c' });` might looks
something like this:

```json
{
  "post": [{
    "id": 2,
    "title": "I'm Running to Reform the W3C's Tag",
    "tag": "w3c",
    "comments": [3]
  }],
  "comments": [{
    "id": 3,
    "body": "Good luck!",
    "post": 3
  }]
}
```


#### Customizing the Adapter FindQuery request

Ember Data's store calls the Adapter's `findQuery` method to request a
record with a specific type and query object. Overriding this method will allow
you to change how Ember Data makes this requests.

```js
App.PostAdapter = DS.Adapter.extend({
  findQuery: function(store, type, query) {
    // fictional legacy backend requires POST instead of GET
    return this.ajax(this.buildURL(type.typeKey), 'POST', { data: query });
  }
});
```

#### Customizing extracting the FindQuery response with the Serializer

Ember Data uses the RESTSerializer's `extractFindQuery` method to normalize
the payload returned by the server.

```js
App.PostSerializer = DS.RESTSerializer.extend({
  extractFindQuery: function(store, type, payload, id, requestType) {
    // Modify payload to make it match the format the RESTSerializer expects
    // Then call _super to let the RESTSerializer handle the rest for you
    return this._super(store, type, payload, id, requestType);
  }
});
```

Just like with the `extractFindAll`, Ember Data expects `extractFindQuery`
to return an array of normalized objects. 

```json
[{
  "id": 2,
  "title": "I'm Running to Reform the W3C's Tag",
  "tag": "w3c",
  "comments": [3]
}]
```
