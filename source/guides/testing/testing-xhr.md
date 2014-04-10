###Promise, Ember, and the run loop

Testing with asynchronous calls, [Promises](/api/classes/Ember.RSVP.Promise.html), and Ember may seem tricky at first, but with a little explanation we hope to alleviate some confusion. 

Promises work in conjunction with the [run loop](/guides/understanding-ember/run-loop/). In order for your promises to properly work the run loop must be running during a few key parts in the code. Specifically these are when the promise is resolved, and when you attach observes through the `then` method (also known as chaining promises).  

####Promise Resolution

    var promise = new Ember.RSVP.Promise(function(resolve){
      // this will schedule an action to fulfill the promise 
      // and call observers/chained promises.
      resolve('hello world'); 
    });

####Chaining Promises

Using the promise from above

    // once the above promise has resolved it will then schedule 
    // in the actions queue the chained promise.
    promise.then(function(result){
      alert(result);
    });

This only needs to be running in the run loop if you attach to the promise after it's been fulfilled.

###Testing promises and the run loop

When you are using Ember in non-testing mode the run loop is actively running, so you don't need to worry about wrapping these events in the run loop.  In testing mode the run loop is passive and must be turned on manually.  While testing using asynchronous code not in the run loop will often result in this error `Uncaught Error: Assertion Failed: You have turned on testing mode, which disabled the run-loop's autorun. You will need to wrap any code with asynchronous side-effects in an Ember.run`.

####General Example

Here we are setting up a promise, and intentionally using `setTimeout` to mimic a delayed response from a fake server.  Once our fake server has responded we need to spin up the run loop manually, by wrapping the statement in a run command.

    var promise = new Ember.RSVP.Promise(function(resolve){
      setTimeout(function(){
        Em.run(this, resolve, 'hello world');
      }, 20);
    });

If we imagine that the above promise has already resolved, but in the code you want to chain another promise you will once again want to wrap the chained promise in a run loop.

    Em.run(function(){
      promise.then(function(result){
        alert(result);
      });
    });

####Synchronous Example using promises

If you're using a promise, but it resolves immediately then you can simply follow the ideas above.  In this example we wrap the resolve and the chained promise (due to the promise resolving immediately).

<script src="http://static.jsbin.com/js/embed.js"></script>
<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/45/embed?output">Simple promise example</a>


####Asynchronous Example using promises

If you're using a promise, but it resolves after the test would finish you'll need to use the `stop` and `start` global methods.  These methods will give you the ability to tell qunit to stop on the current test and start on command.  In this example we delay and wrap the resolve.  Since the chained promise is attached before the promise is resolved you won't need to wrap it in the run loop.

<a class="jsbin-embed" href="http://jsbin.com/qoyinucu/46/embed?output">Async promise example</a>


###ic-ajax

All this being said, the most common example is when you're making an asynchronous call to a server.

ic-ajax is an Ember-friendly `jQuery-ajax` wrapper, which is very convenient for building up fixture data and mocking ajax calls for unit/integration testing.

####Simple ic-ajax example:

Imagine you wanted to request a list of colors from a server.  Using ic-ajax you would use the following syntax

    ic.ajax.request('/colors');

This of course is an asynchronous call which will return a promise, which upon resolution will contain the list of colors.  The convenient thing about ic-ajax is it wraps the resolve of your ajax call in the run loop so you don't need to worry about it.  We're going to set up some fixture data that can be returned instead of making an ajax call.

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


<a class="jsbin-embed" href="http://jsbin.com/OxIDiVU/366/embed?output">Using ic-ajax</a>

####Simple ic-ajax example with Ember Data:

Ember Data can be dealt with just as easily, you will just need to define the fixtures in the same format that Ember Data is expecting it.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/361/embed?output">Using ic-ajax</a>

####Integration test using ic-ajax and Ember Data

Often while doing integration tests you don't actually want to hit the server.  Using the previously established patterns you can set up fixture data which will be used in place of real ajax calls.  Below a simple test using ic-ajax and Ember Data has been provided.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/365/embed?output">Using ic-ajax</a>
