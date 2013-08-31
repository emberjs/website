## Problem
You want to rescue any error when loading data inside `model` hook in your routes.  
For example if you trying to load currentUser and you server responses with 401 then by default any execution after this call will hang.

## Solution
You should return a promise from you model hook that will be resolved anyway.

```javascript
model: function() {
  return new Em.RSVP.Promise(function(resolve, reject) {
    MyModel.find().then(resolve, resolve);
  })
}
```
