## The REST Adapter

By default, your store will use `DS.RESTAdapter` to load and save
records. The REST adapter assumes that the URLs and JSON associated with
each model are conventional; this means that, if you follow the rules,
you will not need to configure the adapter or write any code in order to
get started.

### URL Conventions

The REST adapter is smart enough to determine the URLs it communicates
with based on the name of the model. For example, if you ask for a
`Post` by ID:

```js
var post = App.Post.find(1);
```

The REST adapter will automatically send a `GET` request to `/posts/1`.
You can specify irregular pluralizations via the adapter's `configure`
API:

```js
DS.RESTAdapter.configure("plurals", {
  person: "people"
});
```

This will tell the REST adapter that requests for `App.Person` requests
should go to `/people/1` instead of `/persons/1`.

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

When requesting a record, the REST adapter expects your server to return
a JSON representation of the record that conforms to the following
conventions.

#### JSON Root

The primary record being returned should be in a named root. For
example, if you request a record from `/people/123`, the response should
be nested inside a property called `person`:

```js
{
  "person": {
    "first_name": "Jeff",
    "last_name": "Atwood"
  }
}
```

#### Underscored Attribute Names

Attribute names should be the underscored version of the attribute name
in your Ember Data models. For example, if you have a model like this:

```js
App.Person = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  isPersonOfTheYear: DS.attr('boolean')
});
```

The JSON returned from your server should look like this:

```js
{
  "person": {
    "first_name": "Barack",
    "last_name": "Obama",
    "is_person_of_the_year": true
  }
}
```

#### Relationships

References to other records should be done by ID. For example, if you
have a model with a `hasMany` relationship:

```js
App.Post = DS.Model.extend({
  comments: DS.hasMany('App.Comment')
});
```

The JSON should encode the relationship as an array of IDs:

```js
{
  "post": {
    "comments": [1, 2, 3]
  }
}
```

Any `belongsTo` relationships in the JSON representation should be the
underscored version of the Ember Data model's name, with the string
`_id` appended. For example, if you have a model:

```js
App.Comment = DS.Model.extend({
  post: DS.belongsTo('App.Post')
});
```

The JSON should encode the relationship as an ID to another record:

```js
{
  "comment": {
    "post_id": 1
  }
}
```

#### Sideloaded Relationships

To reduce the number of HTTP requests necessary, you can sideload
additional records in your JSON response. Sideloaded records live
outside the JSON root, and are represented as an array of hashes:

```js
{
  "post": {
    "id": 1,
    "title": "Rails is omakase",
    "comments": [1, 2, 3]
  },

  "comments": [{
    "id": 1,
    "body": "But is it _lightweight_ omakase?"
  },
  {
    "id": 2,
    "body": "I for one welcome our new omakase overlords"
  },
  {
    "id": 3,
    "body": "Put me on the fast track to a delicious dinner"
  }]
}
```
