Testing with asynchronous calls, promises, and Ember may seem tricky at first, but with a little explanation we hope to alleviate some confusion. 

Promises (TODO link http://emberjs.com/api/classes/Ember.RSVP.Promise.html) in Ember work in conjunction with the run loop (TODO link http://emberjs.com/guides/understanding-ember/run-loop/).

There are two important sections of the promise that works with the run loop.  

####The first is when the promise resolves.  

    var promise = new Ember.RSVP.Promise(function(resolve){
      // this will schedule an action to fulfill the promise and call observers/chained promises.
      resolve('hello world'); 
    });

####The second is when you attempt to chain a promise (which will become an observer if the promise has yet to fulfill).

Using the promise from above

    // once the above promise has resolved it will then schedule in the actions queue the chained promise/observers.
    promise.then(function(result){
      alert(result);
    });

When you are using Ember in non-testing mode the run loop is actively running, so you don't need to worry about wrapping these events in the run loop.  In testing mode the run loop is passive and must be turned on manually.

####Examples of how to properly setup promises to work with the run loop

Here we are setting up a promise, and intentionally using `setTimeout` to mimic a delayed response from a fake server.  Once our fake server has responded we need to spin up the run loop manually, by wrapping the statement in a run command.

    var promise = new Ember.RSVP.Promise(function(resolve){
      setTimeout(function(){
        Em.run(function(){ resolve('hello world'); });
      }, 20);
    });

If we imagine that this promise has already resolved, but in the code you want to chain another promise you will once again want to wrap the chained promise in a run loop.

    Em.run(function(){
      promise.then(function(result){
        alert(result);
      });
    });


// remove most of this
Ember uses promises in an asynchronous fashion in conjunction with the run loop.  As a promise is resolved the promise schedules a task to fulfill the promise in the run loop asynchronously.  This is the first reason the run loop must be running in order for your promise to properly resolve.  As you can imagine, most ajax calls do not resolve immediately, in this case once your ajax has resolved the promise must be resolved within the run loop in order to schedule the fulfillment of the promise.  Additionally chained promises must also be placed in the run loop due to the fact that they will also be scheduled to run asynchronously, regardless of whether or not the promise has already fulfilled.

ic-ajax is an Ember-friendly `jQuery-ajax` wrapper, which is very convenient for building up fixture data and mocking ajax calls for unit/integration testing.

###Simple ic-ajax example:

<script src="http://static.jsbin.com/js/embed.js"></script>

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/363/embed?output">Using ic-ajax</a>

###Example using Ember Data:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/361/embed?output">Using ic-ajax</a>

###Integration using ic-ajax and Ember Data

<a class="jsbin-embed" href="http://emberjs.jsbin.com/OxIDiVU/365/embed?output">Using ic-ajax</a>

* ??? what is endorsed by ember?
