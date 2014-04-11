###Promise, Ember and the run loop

Testing with asynchronous calls and [Promises](/api/classes/Ember.RSVP.Promise.html) in Ember may seem tricky at first, but with a little explanation things should become clearer.

In order to fully explain testing Promises & asynchronous code, it's important that you have a clear grasp of the Ember run loop. If you haven't yet done so, please read about them in the [Understanding Ember run loop guide](/guides/understanding-ember/run-loop/).

Now that you grasp the general concepts regarding the run loop, recall from reading about the basics of testing Ember applications that the run loop is suspended when in testing mode.  This helps ensure the procedure of your code and the tests you write around that code. Note that in testing Promises and asynchronous code, you're effectively "stepping through" your application in chunks.

When a Promise runs, its logic is triggered to execute by the run loop's scheduler, therefore in order for Promises to work the run loop must execute. In short: no run loop, no Promise resolution/rejection.

Using the "then" function (eg promise1.then(fulfillmentCallback, rejectionCallback)) gives you access to the results or rejection of the promise. Let's call this observing the promise.  Additionally you can "chain" two promises together (eg promise1.then(promise2, promise3)): promise1 will resolve or reject.  If promise 1 resolves promise 2 will be executed, if promise 1 rejects promise 3 will be executed.  Both of these situations involve a callback which is scheduled asynchronously on the run loop.

####Promise Resolution

    var promise = new Ember.RSVP.Promise(function(resolve){
      // calling resolve will schedule an action to fulfill the promise
      // and call observers/chained promises.
      resolve('hello world');
    });

####Chaining/Observing Promises

Using the promise from above

    // once the above promise has been resolved it will then schedule
    // the observers/chained promises in the run loop.
    promise.then(function(result){
      alert(result);
    });

*Note: Chaining/Observing only needs to be implicitely wrapped in a run call statement (eg `Ember.run(...)`) if there is a possibility you will chain/observe the promise after it's been fulfilled.  Walking through a quick example will help explain why.

#####Walkthrough Example of Observing/Chaining before the promise has fulfilled

1. Run loop is off
2. Code: Create Promise1
3. Code: Observe Promise1
4. Code: Begin run loop (this will only finish once the run loop has cleared out all of the scheduled items)
5. Code: Resolve Promise1 (this will scheduled a task in the run loop to fulfill the promise)
6. Run loop: run "fulfill the promise" task (which includes notifying all chained promises/observers of fulfillment)
7. Run loop is off since there are no more tasks

#####Walkthrough Example of Observing/Chaining before the promise has fulfilled

1. Run loop is off
2. Code: Create Promise1
4. Code: Begin run loop (this will finish once all scheduled tasks have been executed)
5. Code: Resolve Promise1 (this will add a scheduled task to fulfill the promise)
6. Run loop: run "fulfill the promise" task (which includes notifying all chained promises/observers of fulfillment)
7. Run loop is off since there are no more tasks
8. Code: Observe Promise1 (since the promise has already fulfilled, schedule an async task to notify this observer of fulfillment)
9. Uncaught Error: Assertion Failed: You have turned on testing mode, which disabled the run-loop's autorun. You will need to wrap any code with asynchronous side-effects in an Ember.run


###Testing promises and the run loop

When you are using Ember normally (ie when not in testing mode), the run loop is actively running, so you don't need to worry about wrapping these events in calls to Ember.run(). In testing mode, the run loop is passive and must be triggered manually.  Testing asynchronous code not wrapped in calls to Ember.run will result in the error: `Uncaught Error: Assertion Failed: You have turned on testing mode, which disabled the run-loop's autorun. You will need to wrap any code with asynchronous side-effects in an Ember.run`.

####General Example

Here we are setting up a promise, and intentionally using `setTimeout` to mimic a delayed response from a fake server.  Once our fake server has responded we need to invoke the run loop manually, by wrapping the statement in a run call.

    var promise = new Ember.RSVP.Promise(function(resolve){
      setTimeout(function(){
        Em.run(this, resolve, 'hello world');
      }, 20);
    });

If you were to pass the above promise around to multiple methods, and they choose to observe/chain to the promise, it is likely that at some point the promise may already be resolved.  In that case you will need to wrap the observer/chained promise in a run call.

    Em.run(function(){
      promise.then(function(result){
        alert(result);
      });
    });

####Synchronous Example using promises

If you're using a promise, but it resolves immediately hen you can simply follow the pattern above of wrapping the `resolve` and observer/chained promises in a run call without harm.  In this example we wrap the resolve and the observer (due to the promise resolving immediately) in a run call.

<script src="http://static.jsbin.com/js/embed.js"></script>
<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/45/embed?js,output">Simple promise example</a>


####Asynchronous Example using promises

If you're using a promise, but there's a change it might resolve after the test has finished, you'll need to use the `stop` and `start` global methods.  These methods will give you the ability to tell qunit to stop the test run on the current test (puts qunit into a holding pattern) and start again when ready.  In this example we delay and wrap the resolve.  Since the chained promise is attached before the promise is resolved you won't need to wrap it in the run loop.

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/46/embed?js,output">Async promise example</a>


###ic-ajax

[ic-ajax](https://github.com/instructure/ic-ajax) is an Ember-friendly `jQuery-ajax` wrapper, which is very convenient for building up fixture data and mocking ajax calls for unit/integration testing. The most common use case for Promises is when you're making an asynchronous call to a server, and ic-ajax can help alleviate having to worry about wrapping `resolve` in a run call.

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
