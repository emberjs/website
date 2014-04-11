Almost every test has a pattern of visiting a route, interacting with the page 
(using the helpers), and checking for expected changes in the DOM.

Examples:

```javascript
test('root lists first page of posts', function(){
  visit('/posts');
  andThen(function() {
    equal(find('ul.posts li').length, 3, 'The first page should have 3 posts');
  });
});
```

The helpers that perform actions use a global promise object and automatically 
chain onto that promise object if it exists. This allows you to write your tests 
without worrying about async behaviour your helper might trigger.

```javascript
module('Integration: Transitions', {
  setup: function() {
    App.reset();
  }
});

test('add new post', function() {
  visit('/posts/new');
  fillIn('input.title', 'My new post');
  click('button.submit');
  
  andThen(function() {
    equal(find('ul.posts li:last').text(), 'My new post');
  });
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/vusaz/17/embed?output">Custom Test Helpers</a>
<script src="http://jsbin.com/vusaz/17/"></script>

### Testing transitions

Suppose we have an application which requires authentication and when a visitor
visits a certain URL as an unauthenticated user, we expect them to be transitioned
to a login page.

```javascript
App.ProfileRoute = Ember.Route.extend({
  beforeModel: function() {
    var user = this.modelFor('application');
    if (Em.isEmpty(user)) {
      this.transitionTo('login');
    }
  }
});
```

We could use the route helpers to ensure that when the restricted URL is visited,
the user would be redirected to the login page.

```javascript
module('Integration: Transitions', {
  setup: function() {
    App.reset();
  }
});

test('redirect to login if not authenticated', function() {
  visit('/');
  click('.profile');
  
  andThen(function() {
    equal(currentRouteName(), 'login');
    equal(currentPath(), 'login');
    equal(currentURL(), '/login');
  });
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/goruc/3/embed?output">Testing Transitions</a>
<script src="http://jsbin.com/goruc/3/"></script>