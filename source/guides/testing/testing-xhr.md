By the end of this document, the reader should understand:

Working with asynchronous calls can be tricky at first, but understanding how promises can help alleviate some of the confusion.

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
