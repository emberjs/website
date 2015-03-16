To save a record you can call the record's `save()` method. This will
return a promise that will resolve if the record is successfully saved
to the server or reject if there is any error preventing the record
from saving successfully.

```javascript
store.find('post', 1).then(function (post) {
  post.get('title'); // => "Rails is Omakase"

  post.set('title', 'A new post');

  post.save(); // => PUT to '/posts/1'
});
```

#### Server Response to a updateRecord request

The `RESTAdapter` will attempt to build the URL by pluralizing and
camelCasing the record type name. It will then use jQuery to
serialized the filter object as query parameters in the url. For the
above example of `store.find('post', { tag: 'w3c' });` the url will be
`/posts/?tag=w3c`. The `RESTAdapter` will then make a `GET` ajax
request to the `/posts/?tag=w3c` url.


Ember Data maintains a state machiene for each record which allows
your Adapter to run different code for saving a newly created record
vs updating a record that already exists on your server. For example
the default `RESTAdapter` will send a `POST` request for creating new
records and a `PUT` request to update records that the sever already
knows about.

Records in Ember Data are persisted on a per-instance basis. Ember
Data maintains a state machiene for each record which allows your
Adapter to run different code for saving a newly created record vs
updating a record that already exists on your server. For example the
default `RESTAdapter` will send a `POST` request for creating new
records and a `PUT` request to update records that the sever already
knows about.



```javascript
var post = store.createRecord('post', {
  title: 'Rails is Omakase',
  body: 'Lorem ipsum'
});

post.save(); // => POST to '/posts'
```



### Promises

`save()` returns a promise, so it is extremely easy to handle success
 and failure scenarios.  Here's a common pattern:

```javascript
var post = this.store.createRecord('post', {
  title: 'Rails is Omakase',
  body: 'Lorem ipsum'
});

var self = this;

function transitionToPost(post) {
  self.transitionToRoute('posts.show', post);
}

function failure(reason) {
  // handle the error
}

post.save().then(transitionToPost).catch(failure);

// => POST to '/posts'
// => transitioning to posts.show route
```
