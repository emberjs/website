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
