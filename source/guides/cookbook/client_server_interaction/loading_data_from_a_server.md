## Problem
You want to load data from a server and have it available in your Ember application for observation and manipulation.

## Solution
Use `jQuery.ajax` and convert the response into Ember observable objects. You use `reopen` to add a finder method to your model class. There are two possible approaches to implement custom finder methods: with `promises` or without. 


### Approach without promise
The general workflow of the finder method without a promise looks like the following. With this approach you immediately get a object, with which you can start working.

1. You create an **empty result object**.
2. You make an asynchronous call to your API...
3. ... and in your success callback you **fill your empty object**.
4. You return your result object.

The flow mentioned above is not the sequence in which those actions are happening. In reality the points 1,2 and 4 are performed first. Then some time later, when the response returns from your server, 3 is executed. **So the real flow of actions is: 1 -> 2 -> 4 -> 3.**



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


### Approach with promise
Alternatively you could also return a promise (`Ember.Deferred`) with your finder methods. The workflow for this approach could looks like the following:

1. You **create a promise** (`Ember.Deferred`)
2. You make an asynchronous call to your API...
3. ... and in your success callback you **create the result object and resolve the promise with it**.
4. You return the promise.

The flow mentioned above is not the sequence in which those actions are happening. In reality the points 1,2 and 4 are performed first. Then some time later, when the response returns from your server, 3 is executed. **So the real flow of actions is: 1 -> 2 -> 4 -> 3.**

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

With this approach you wait for the finder method to complete its logic. You would use this approach like this:

```javascript
App.User.findAll().then(function(users){
  // do something with the retrieved users
});
```


#### Example

<a class="jsbin-embed" href="http://jsbin.com/UGuciwo/3/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>
