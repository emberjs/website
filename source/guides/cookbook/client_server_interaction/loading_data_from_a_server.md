## Problem
You want to load data from a server and have it available in your Ember application for observation and manipulation.

## Solution
Use `jQuery.ajax` and convert the response into Ember observable objects. You use `reopen` to add a finder method to your model class. The general workflow of the finder method is the following:

1. You create an empty result object.
2. You make an asynchronous call to your API...
3. ... and in your success callback you fill your empty object.
4. You return your result object.

**Note the slight differences between returning an array and a single object.**

```javascript
App.User.reopenClass({
  findAll : function(){
    var result = [];
    $.ajax({
      url : '/users',
      dataType : 'json',
      success : function(response) {
        response.forEach(function(user){
           var model = App.User.create(user);
           result.addObject(model);
        });
      }
    });
    return result;
  },
  findById : function(id){
    var result = App.User.create();
    $.ajax({
      url : '/users/' + id,
      dataType : 'json',
      success : function(response) {
        result.setProperties(response);
      }
    });
    return result;
  }
});
```


## Discussion
Alternatively you could also return a promise (`Ember.Deferred`) with your finder methods. The code for this approach could look like the following:

```javascript
App.User.reopenClass({
  findAll : function(){
  	var promise = Ember.Deferred.create();
    
    $.ajax({
      url : '/users',
      dataType : 'json',
      success : function(response) {
      	var result = [];
        response.forEach(function(user){
           var model = App.User.create(user);
           result.addObject(model);
        });
        promise.resolve(result);
      }
    });
    return promise;
  },
  findById : function(id){
    var promise = Ember.Deferred.create();

    $.ajax({
      url : '/users/' + id,
      dataType : 'json',
      success : function(response) {
      	var result = App.User.create();
        result.setProperties(response);
        promise.resolve(result);
      }
    });
    return promise;
  }
});
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/UGuciwo/3/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
