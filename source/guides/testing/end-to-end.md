Below are examples of integration, or _"end-to-end"_, tests of a browser
application. (Examples do not include testing of live data from a server).

With integration tests executed via JavaScript, not only are test reports 
generated fast, but also various components of the application are tested to 
confirm they work as designed.

Unit tests can be used to confirm each component of the application
_can_ work as designed; however, integration tests confirm that the components 
_do_ behave as expected (i.e. they are working together as designed).

A healthy combination of both unit and integration tests, executed via a 
JavaScript test runner in a browser or in a headless runner (e.g. phantomjs), 
facilitates the practice of test-driven development; and helps to ensure that 
development of Ember.js applications can scale and behave as **ambitious** as 
promised by the Ember.js application framework.

### Testing the PeepCode Ordr Application

See the [Fire up Ember.js video] page for reference of the application design, 
the tutorial page has diagrams that describe the Ordr application.

In the test modules below `App.reset()` is called during the `setup` routine of
each test, so every test executes in isolation from the other tests, resetting
the application each time.

#### Tables Integration Test Module

Tables have a tab (think of this as an order) listing food items. The 
application uses the UI pattern for a "Master–detail interface". There are six 
(6) tables, each of them have a tab (order with list items). Note that
the model relationship may be defined differently than may appear to the
user of the application. In the application source code, a Food may have 
TabItems and a Tab may have a Table; but this doesn't matter from the
perspective of an integration test.

The module below has three (3) integration tests and use the `visit` helper 
provided by the Ember Test package.

The custom `path()` helper is not part of the Ember testing package and
serves as an example of using your own custom test helpers.

```javascript
module('Ordr App integration tests: Tables', {
  setup: function () {
    App.reset();
  }
});

test('Initial Redirect', function(){
  expect(1);
  visit('/').then(function () {
    equal(path(), 'tables.index', 'Redirects to /tables');
  });
});

test('Displays six tables', function(){
  expect(1);
  visit('/tables').then(function () {
    equal(find('#tables a').length, 6, 'Six tables display');
  });
});

test('Table 2, food menu', function () {
  expect(3);
  visit('/tables/2').then(function () {
    equal(find('div.nine h2').text(), 'Table 2', 'Table 2 heading displayed');
    equal(find('#customer-tab li h3:first').text(), 'Click a food to add it', 'Has call to action text');
    equal(find('#menu li > a').length, 5, 'Has food menu with 5 choices');
  });
});
```

#### Tabs Integration Test Module

The module below uses the following test helpers provided by the Ember
test package:

* `visit` (`then`), `click`

The integration tests visit various routes for a few of the tables and exercises 
the application behaviors of adding food items to a tab (order). Also, a test 
confirms that the state of the tab(s) remains between visits of a couple tables. 
One table has data pre-populated (data defined in the fixures for table #4).

```javascript
module('Ordr App integration tests: Tabs', {
  setup: function () {
    App.reset();
  }
});

test('Tables 1 and 3, adding foods to the tabs', function(){
  expect(5);
  visit('/tables/1').then(function (){
    equal(find('div.nine h2').text(), 'Table 1', 'Table 1 heading displayed');
    return click('#menu li:eq(0) > a');
  }).then(function(){
    equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Added pizza to tab');
    equal(find('#total span').text(), '$15.00', 'Total price updated with pizza price');
    visit('/tables/3').then(function (){
      equal(find('div.nine h2').text(), 'Table 3', 'Table 3 heading displayed');
      visit('/tables/1').then(function (){
        equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Pizza still in tab');
      });
    });
  });
});

test('Table 4, already had foods added to the tab', function(){
  expect(3);
  visit('/tables/4').then(function (){
    var actual = [],
        expectedFoods = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';

    find('#customer-tab > li').each(function (){
      actual.push( find(this).text() );
    });
    equal(find('div.nine h2').text(), 'Table 4', 'Table 4 heading displayed');
    equal(actual.join('').replace(/\s/g, ''), expectedFoods, 'Pizza, Pancakes, Fries, Hot Dogs, Cake already added');
    equal(find('#total span').text(), '$54.50', 'Already has $54.50 in foods in the tab');
  });
});
```

[Fire up Ember.js video]: https://peepcode.com/products/emberjs "Ember.js Tutorial video by Peepcode"
