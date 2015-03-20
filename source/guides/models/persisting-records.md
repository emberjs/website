To save a record you can call the record's `save()` method. This will
return a promise that will resolve if the record is successfully saved
to the server or reject if there is any error preventing the record
from saving successful. save()` returns a promise, so it is extremely
easy to handle success and failure scenarios.  Here's a common
pattern:


```javascript
store.find('post', 1).then(function (post) {
  post.get('title'); // => "Rails is Omakase"

  post.set('title', 'A new post');

  function transitionToPost(post) {
    self.transitionToRoute('posts.show', post);
  }

  function failure(reason) {
    // handle the error
  }

  post.save().then(transitionToPost).catch(failure);
});
```

#### UpdateRecord Request

Just like with the find requests the `RESTAdapter` will attempt to
build the URL by pluralizing and camelCasing the record type name. It
will then add a slash followed by the value of the id of the
record. For the post record in the above example the `RESTAdapter`
would generate the a url `/posts/1`. Ther RESTAdapter will then use
the HTTP `PUT` verb to send the serialized record to the `/posts/1`
url.

The default `RESTSerializer` will serialize the post record using the
same format that it expects to receive when loading the record. The
only difference is the `RESTSerializer` will not include any
sideloaded records in the update payload.

```json
{
  "post": [{
    "id": 1,
    "title": "A new post",
    "tag": "rails",
    "comments": [1, 2]
  }]
}
```


#### Server Response to a updateRecord request

The server is expected to respond with the serialized record now that
it has been updated. You may also include sideloaded records in the
response to an update request.


```json
{
  "post": [{
    "id": 1,
    "title": "A new post",
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



#### Customizing the Adapter updateRecord request

Ember Data's store calls the Adapter's `updateRecord` method to update
a record that already exists on the backend server. You can override
this method to change how Ember Data talks with your backend when
updating a record.

```js
App.PostAdapter = DS.Adapter.extend({
  updateRecord: function(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, snapshot);

    var id = get(record, 'id');

    // fictional backend that requires a PATCH instead of a PUT
    return this.ajax('posts/' + id, "PATCH", { data: data });
  }
});
```

#### Customizing extracting the Find response with the Serializer

Ember Data uses the RESTSerializer's `extractUpdateRecord` method to
extract the payload returned by the server. You can override this
method on your serializer to transform the data into the format that
the `RESTSerializer` expects.

```js
App.PostSerializer = DS.RESTSerializer.extend({
  extractUpdateRecord: function(store, type, payload, id, requestType) {
    // Modify payload to make it match the format the RESTSerializer expects
    // Then call _super to let the RESTSerializer handle the rest for you
    return this._super(store, type, payload, id, requestType);
  }
});
```
