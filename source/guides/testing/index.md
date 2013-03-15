## Testing Ember.js Applications

### Testing Frameworks

This guide uses [QUnit][] for its tests. There are many other options available, depending on your preference. Given that the differences between testing frameworks is mostly syntactical, you should be able to translate this guide's QUnit tests into your preferred testing framework.

### Integration Testing vs. Unit Testing

When writing automated tests for any application, you can test at many different levels. For example, you might have tests to verify that a particular object does what it's supposed to do in absence of any dependencies. This is called a "unit test". You may want to test how an object interacts with other objects in the system, using what we call an "integration test". Further, you could even test how the app behaves from the outside, driving it with an browser and interacting with the web pages. This is typically referred to as an "acceptance test".

Because Ember.js of all the support Ember gives you via code generation, the easiest way to test is to use integration tests. Instead of trying to test an individual view, your tests will drive your app's router to load entire pages and test against the output. You can also test Ember models, and while these tests may look like unit tests, you still need your entire application to run the models, therefore they are still integration tests.

### A Warning

Being such a large framework still in its infancy, there are times when testing Ember.js can be quite frustrating. This guide will show you the path of least resistance to writing testable applications. As with everything else in Ember, if you choose to go outside our recommendations and conventions, you're going to have a bad time.

[QUnit]: http://qunitjs.com
