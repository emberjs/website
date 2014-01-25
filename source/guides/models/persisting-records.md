Records in Ember Data are persisted on a per-instance basis.
Call `save()` on any instance of `DS.Model` and it will make a network request.

Here are a few examples:

```javascript
var post = store.createRecord('post', {
  title: 'Rails is Omakase',
  body: 'Lorem ipsum'
});

post.save(); // => POST to '/posts'
```

```javascript
var post = store.find('post', 1);

post.get('title') // => "Rails is Omakase"

post.set('title', 'A new post');

post.save(); // => PUT to '/posts/1'
```

### Promises

`save()` returns a promise, so it is extremely easy to handle success and failure scenarios.
 Here's a common pattern:

```javascript
var post = store.createRecord('post', {
  title: 'Rails is Omakase',
  body: 'Lorem ipsum'
});

var self = this,
    success = function(post) {
      self.transitionToRoute('posts/show', post);
    }, fail = function() {
      // handle the error
    };

post.save().then(sucess, fail);

// => POST to '/posts'
// => transitioning to posts.show route
```

Promises even make it easy to work with failed network requests:

```javascript
var post = store.createRecord('post', {
  title: 'Rails is Omakase',
  body: 'Lorem ipsum'
});

var onSuccess = function(post) {
  this.transitionToRoute('posts/show', post);
};

var onFail = function(post) {
  // deal with the failure here
};

post.save().then(onSuccess, onFail);

// => POST to '/posts'
// => transitioning to posts.show route
```

You can read more about promises [here](https://github.com/tildeio/rsvp.js), but here is another
example showing how to retry persisting:

```javascript
function retry(callback, nTimes) {
  // if the promise fails
  return callback().fail(function(reason) {
    // if we haven't hit the retry limit
    if (nTimes-- > 0) {
      // retry again with the result of calling the retry callback
      // and the new retry limit
      return retry(callback, nTimes);
    }
 
    // otherwise, if we hit the retry limit, rethrow the error
    throw reason;
  });
}
 
// try to save the post up to 5 times
retry(function() {
  return post.save();
}, 5);
```
