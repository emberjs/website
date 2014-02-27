Unit testing controllers is very simple using the unit test helper `moduleFor`.

***It can become very easy to let your controllers perform most of the business logic in an Ember application. It is considered best practice to extract out any logic that does not directly impact the template into it's own library.***

Let's assume we have an application which displays a list of books with a search box above. When you type into the search box, it will filter the books by title to match the search text.

<a class="jsbin-embed" href="http://jsbin.com/qixov/1/embed?output">Unit Testing Controllers</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

Here is the route for the example app above:

```javascript
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
      { title: 'Eloquent JavaScript', author: 'Marijn Haverbecke' },
      { title: 'The Book of JavaScript, 2nd Edition', author: 'Dave Thau!' },
      { title: 'JavaScript, The Definitive Guide, 6th Ed.', author: 'David Flanagan' },
      { title: 'Effective JavaScript', author: 'David Herman' },
      { title: 'Pro JavaScript Performance', author: 'Tom Barker' },
      { title: 'High-Performance JavaScript', author: 'Nicholas Zakas' }
    ];
  }
});
```

Here is the controller that we will be testing from the example app above:

```javascript
App.IndexController = Ember.ArrayController.extend({
  searchText: null,
  
  filteredBooks: function() {
    var searchText  = this.get('searchText');
    if (Em.isEmpty(searchText)) {
      return this.get('content');
    } else {
      return this.get('content').filter(function(book) {
        var title = book.title.toLowerCase();
        console.log(title);
        return title.match(searchText.toLowerCase());
      });
    }
  }.property('content.@each', 'searchText')
});
```

Unit testing controllers is done using `moduleFor`. In this example, we are testing to ensure that when the value of `searchText` changes, the `filteredResults` filter out any books that do not have the title matching the text.

```javascript
emq.globalize();
setResolver(App.__container__);
App.setupForTesting();

var originalAlert; 

moduleFor('route:application', 'Unit: route/application', {
  setup: function() { 
    originalAlert = window.alert;
  },
  teardown: function() {
    window.alert = originalAlert;
  }
});

test('Alert is called on displayAlert', function() {
  expect(1);
  var route = this.subject();
  var expectedText = 'foo';
  window.alert = function(text) {
    equal(text, expectedText, 'expected ' + text + ' to be ' + expectedText);
  }
  route._displayAlert(expectedText);
});
```

<a class="jsbin-embed" href="http://jsbin.com/gahoy/4/embed?output">Unit Testing Controllers</a>
<script src="http://static.jsbin.com/js/embed.js"></script>