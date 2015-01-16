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
  teardown: function() {
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

<a class="jsbin-embed" href="http://jsbin.com/habekupomu/1/embed?output">Testing User
Interaction</a>

### Testing Transitions

Suppose we have an application which requires authentication. When a visitor
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

We could use the route helpers to ensure that the user would be redirected to the login page
when the restricted URL is visited.

```javascript
module('Integration: Transitions', {
  teardown: function() {
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

<a class="jsbin-embed" href="http://jsbin.com/hiyicadewi/1/embed?output">Testing Transitions</a>

<script src="http://static.jsbin.com/js/embed.js"></script>
