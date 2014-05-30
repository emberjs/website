Testing with asynchronous calls and promises in Ember may seem tricky at first, but with a little explanation things should become clearer.

### Promises, Ember and the Run Loop

In order to fully explain testing promises & asynchronous code, it's important that you have a clear grasp of the Ember run loop. If you haven't yet done so, please read about them in the [Promises](/api/classes/Ember.RSVP.Promise.html) and [Understanding Ember run loop guide](/guides/understanding-ember/run-loop/).

Now that you grasp the general concepts regarding the run loop, recall from reading about the basics of testing Ember applications that the run loop is suspended when in testing mode.  This helps ensure the procedure of your code and the tests you write around that code. Note that in testing promises and asynchronous code, you're effectively "stepping through" your application in chunks.

When a promise runs, it schedules fulfillment/rejection to be executed by the run loop, therefore in order for promises to work the run loop must be on. In short: no run loop, no promise fulfillment/rejection.

Getting the results of a promise requires you to use the `then` method. Calling the `then` function on an existing promise:

``` javascript
// let's call the existing promise promise1, so you'd write:
promise1.then(fulfillmentCallback, rejectionCallback);

function fulfillmentCallback(successfulResults) {
  // do something wonderful with the results
}

function rejectionCallback(failureResults) {
  // tell someone important about the failure
}
```

In the case that `promise1` succeeds, then the `fulfillmentCallback` function will be called and passed the successful results of `promise1` as its argument. If the promise rejects (ie failure), then the `rejectionCallback` will be called with the failure reason as its argument.

If you pass in a function to `then` it casts the function into a promise and returns the promise.  The results of that promise will be what's returned from the function.

``` javascript
// let's call the existing promise promise1 and will have the result `3`, so you'd write:
var promise2 = promise1.then(function(results){
  return results + 2;
});

// the results of this promise would be 10
var promise3a = promise2.then(function(results){
  return results + 5;
});

// the results of this promise would be 6
var promise3b = promise2.then(function(results){
 return results + 1;
});

// or we can chain without the intermediary variables like so,
var promise4 = promise1.then(function(results){
  return results + 2;
}).then(function(results){
  return results + 5;
}).then(function(results){
  return results + 90;
}).then(function(results){
  alert(results); // this will alert `100`
});
```

If you pass a promise into `then` it will return the results of that promise.

``` javascript
// let's call the existing promises promise1 and promise2, so you'd write:
var promise3 = promise1.then(promise2);

promise3.then(function(result){
  // this will be the results from promise2
  // this callback won't be called until promise1 and promise2 have fulfilled
  alert(result);
});
```

***None of this will work if the run loop isn't running due to these callbacks and/or chained promises getting scheduled on the run loop.  ***

###Where the run loop and Promises intersect

####Promise Resolution

    var promise = new Ember.RSVP.Promise(function(resolve){
      // calling resolve will schedule an action to fulfill the promise 
      // and call observers/chained promises.
      resolve('hello world'); // Run loop needs to be on here
    });

####Chaining/Observing Promises

    // once the above promise has been resolved it will then notify 
    // the observers/chained promises to.
    promise.then(function(result){  // Run loop might* need to be on here
      alert(result);
    });

* Calling `then` (observing/chaining) only needs to be implicitely wrapped in a run call statement (eg `Ember.run(...)`) if there is a possibility you will chain/observe the promise after it's been fulfilled.  See the examples below which will help explain the different scenarios.

#####Walk through example of observing/chaining before the promise has fulfilled

1. Run loop is off (testing mode)
2. Code: Create Promise1 (new Ember.RSVP.Promise....)
3. Code: Observe Promise1 (promise.then(....))
4. Code: Begin run loop (this will only finish once the run loop has cleared out all of the scheduled items)
5. Code: Resolve Promise1 (this will scheduled a task in the run loop to fulfill the promise)
6. Run loop: run "fulfill the promise" task (which includes notifying all chained promises/observers of fulfillment)
7. Run loop is off since there are no more tasks

``` javascript
new Ember.RSVP.Promise(function(resolve){
  // resolve will run ~10 ms after the then has been called and is observing
  Ember.run.later(this, resolve, 'hello', 10);
}).then(function(result){
  alert(result);
});
```

 
#####Walk through example of observing/chaining after the promise has fulfilled

1. Run loop is off (testing mode)
2. Code: Create Promise1
4. Code: Begin run loop (this will finish once all scheduled tasks have been executed)
5. Code: Resolve Promise1 (this will add a scheduled task to fulfill the promise)
6. Run loop: run "fulfill the promise" task (which includes notifying all chained promises/observers of fulfillment)
7. Run loop is off since there are no more tasks
8. Code: Observe Promise1 (since the promise has already fulfilled, schedule an async task to notify this observer of fulfillment)
9. Uncaught Error: Assertion Failed: You have turned on testing mode, which disabled the run-loop's autorun. You will need to wrap any code with asynchronous side-effects in an Ember.run

``` javascript
var promise = new Ember.RSVP.Promise(function(resolve){
  // this will run before the then has happened below
  // and finish the triggered run loop
  Ember.run(this, resolve, 'hello');
});

// incorrect the run loop isn't on any more
promise.then(function(result){
  alert(result);
});
  
// correct, start the run loop again
Ember.run(function(){
  promise.then(function(result){
    alert(result);
  });
});
```

###Testing promises and the run loop

When you are using Ember normally (ie when not in testing mode), the run loop is actively running, so you don't need to worry about wrapping these events in calls to Ember.run(). In testing mode, the run loop is passive and must be triggered manually.  Testing asynchronous code not wrapped in calls to Ember.run will result in the error: `Uncaught Error: Assertion Failed: You have turned on testing mode, which disabled the run-loop's autorun. You will need to wrap any code with asynchronous side-effects in an Ember.run`.

####General Example

Here we are setting up a promise, and intentionally using `setTimeout` to mimic a delayed response from a fake server.  Once our fake server has responded we need to invoke the run loop manually, by wrapping the statement in a run call.

    var promise = new Ember.RSVP.Promise(function(resolve){
      setTimeout(function(){
        Ember.run(this, resolve, 'hello world');
      }, 20);
    });

If you were to pass the above promise around to multiple methods, and they choose to observe/chain to the promise, it is likely that at some point the promise may already be resolved.  In that case you will need to wrap the observer/chained promise in a run call.

    Ember.run(function(){
      promise.then(function(result){
        alert(result);
      });
    });

####Synchronous Example using promises

If you're using a promise, but it resolves immediately then you can simply follow the pattern above of wrapping the resolve and observer/chained promises in a run call without harm.  In this example we wrap the resolve and the observer (due to the promise resolving immediately) in a run call.

<script src="http://static.jsbin.com/js/embed.js"></script>
<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/45/embed?js,output">Simple promise example</a>


####Asynchronous Example using promises

If you're using a promise, but there's a chance it might resolves after the test would finish you'll need to use the `stop` and `start` global qunit methods.  These methods will give you the ability to tell qunit to stop the test run on the current test (makes qunit wait) and start again when ready.  In this example we delay execution and wrap the resolve in a run call.  Since the chained promise begins observing before the promise has been resolved you won't need to wrap  the chained promise in a run call.

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/46/embed?js,output">Async promise example</a>

## AJAX

AJAX requests are the most prevelant use case where you will be creating promises.  While testing it's likely you will want to mock your AJAX requests to the server.  Below we've included examples for [ic-ajax](https://github.com/instructure/ic-ajax). Feel free to use other mocking libraries such as [Mockjax](https://github.com/appendto/jquery-mockjax), but it's important to note, that Mockjax and other libraries are unaware of the run loop and won't wrap their resolve in a run call.  This may resolve in promises being run outside the realm of the run loop and will result in errors.

###ic-ajax

[ic-ajax] is an Ember-friendly `jQuery-ajax` wrapper, which is very convenient for building up fixture data and mocking ajax calls for unit/integration testing. The most common use case for promises is when you're making an asynchronous call to a server, and ic-ajax can help alleviate having to worry about wrapping `resolve` in a run call.

####Simple ic-ajax example:

Imagine you wanted to request a list of colors from a server.  Using ic-ajax you would use the following syntax

    var promise = ic.ajax.request('/colors');

This is an asynchronous call which returns a promise. When the promise has resolved, it will contain the list of colors. The convenient thing about ic-ajax is that it wraps the resolve of your ajax call in a call to Ember.run so you don't need to worry about it. We're going to set up some fixture data that can be returned instead of making an ajax call to fake the server so we can test our code

    ic.ajax.defineFixture('/colors', {
      response: [
        {
          id: 1,
          color: "red"
        },
        {
          id: 2,
          color: "green"
        },
        {
          id: 3,
          color: "blue"
        }
      ],
      jqXHR: {},
      textStatus: 'success'
    });


<a class="jsbin-embed" href="http://jsbin.com/OxIDiVU/366/embed?js,output">Using ic-ajax</a>

####Simple ic-ajax example with Ember Data:

Ember Data can be dealt with just as easily, you will just need to define the fixtures in the same format that Ember Data is expecting it.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/361/embed?js,output">Using ic-ajax</a>

####Integration test using ic-ajax and Ember Data

Often while doing integration tests, you don't actually want to hit the server because its state won't be consistent. Using the previously established patterns you can set up fixture data which will be returned in place of real ajax call responses so you can isolate your code as being the only thing under test. Below we'e provided you with a simple example test using ic-ajax and Ember Data.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/365/embed?js,output">Using ic-ajax</a>

###jquery-mockjax

[jquery-mockjax](https://github.com/appendto/jquery-mockjax) is a `jQuery` plugin that provides the ability to simulate ajax requests.

####Simple jquery-mockjax example:

Imagine you wanted to request a list of colors from a server.  Using vanilla `jQuery` you would use the following syntax

    $.getJSON('/colors', function(response){ /* ... */ });

This is an asynchronous call which will pass the server's response to the callback provided. Unlike `ic-ajax`, with vanilla `jQuery` you need to wrap the callback syntax in a promise.

    var promise = new Ember.RSVP.Promise(function(resolve){
      $.getJSON('/colors', function(data){
        resolve(data.response);
      });
    });

We're going to set up some fixture data that can be returned instead of making an ajax call to fake the server so we can test our code

    $.mockjax({
      type: 'GET',
      url: '/colors',
      status: '200',
      dataType: 'json',
      responseText: {
        response: [
          {
            id: 1,
            color: "red"
          },
          {
            id: 2,
            color: "green"
          },
          {
            id: 3,
            color: "blue"
          }
         ]
      }
    });

As you can see, there is a lot of flexibility in the `jquery-mockjax` api. You can specify not only the url and the response but the method, status code and data type. For the full jquery-mockax api check [their docs](https://github.com/appendto/jquery-mockjax).

<a class="jsbin-embed" href="http://emberjs.jsbin.com/wotib/1/embed?js,output">Using jquery-mockjax</a>

####Simple jquery-mockjax example with Ember Data:

Ember Data can be dealt with just as easily. You will just need to define the fixtures in the format that Ember Data is expecting.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/vojas/5/embed?js,output">Using jquery-mockjax</a>

####Integration test using jquery-mockjax and Ember Data

Often while writing integration tests, you don't actually want to hit the server because its state won't be consistent. Using the previously established patterns you can set up fixture data which will be returned in place of real ajax call responses so you can isolate your code as being the only thing under test. Below we've provided you with a simple example test using jquery-mockjax and Ember Data.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/hoxub/5/embed?js,output">Using jquery-mockjax</a>
