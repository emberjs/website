Testing is a core part of Ember framework and development cycle.

Let's assume you are writing an Ember application which serves as a blog. This application would likely include models such as `user` and `post`. It would also include interactions such as _login_ and _create post_. Let's finally assume that you would like to have tests in place for your application. 

There are two different classifications of tests that you will need: **Integration** and **Unit**.

### Integration Tests

Integration tests are used to test user interaction and application flow. With the example scenario above, some integration tests you may write are:

* A user is able to log in via the login form.
* A user is able to create a blog post.
* A visitor does not have access to the admin panel.

### Unit Tests

Unit tests are used to test isolated functions or "units" without worrying about it's dependencies. Some examples of unit tests for the scenario above may be:

* A user with the role of 'admin' can edit a post.
* A post requires a title.
* A user can have many posts.

### Testing Frameworks

[QUnit](http://qunitjs.com/) is the default testing framework for this package, but others are supported through third-party adapters.