Aside from using Ember Test helpers to create integration tests in an
asynchronous enviroment, good test coverage requires traditional unit testing.

Unit tesing be a challenge in an async testing enviroment, using the Ember Test
helpers can assist in preparing to execute unit tests.

In some of the unit test modules below... the `visit()` helper is used to force
Ember Data Fixtures to become ready for testing. In addition to `App.reset()`
some setup may be needed to ask the route to setup the expected application
state, so `visit()` is called during the setup routine.

There is one caveat with this case study and using `App.reset()`. The Ordr App 
is reset with each unit test so the unit test is executed in isolation from 
other tests but the Ordr application code is also running. Instead of resesting 
the application, it may be desireable for the tests of a production application 
to use a new Ember.Application with only the required objects that will be unit 
tested. Then the unit tests would be executed in isolation from the 
application's start routine. This guide does not cover this topic and continues 
to use only the Ordr applicaiton for the unit tests.

### Ember.run

The following tests have code that should be executed with the confines of an 
[Ember.run] loop (or queue). When the application is in testing mode the 
automatic invocation of an [Ember.run] queue is disabled. So when creating a 
model or changing properties that are bound or observed, this activity requires 
execution in the scope of an `Ember.run` (callback) function.

### Food Controller Unit Test Module

This tests insures a food can be added to the tab (order). The example tests 
below use a custom helper to lookup the food controller instance 
`getFoodController()`.  

A food record is created within an [Ember.run] queue which helps organize the 
"act" segment of a test. It's common practice in test-driven development 
organize tests in 3 steps: 1-Arrange, 2-Act, 3-Assert.

```javascript
module('Ordr App unit tests: Food Controller', {
  setup: function () {
    App.reset();
    visit('/tables/1');
  }
});

test('Add food to tabItems', function() {
  expect(7);

  var controller = getFoodController();
  ok(controller, 'Food controller is ok');
  ok(controller.addFood, 'Food controller has addFood action');

  var tabItems = controller.get('controllers.table.tab.tabItems');
  ok(tabItems, 'Food controller can access food items');
  equal(tabItems.get('content').length, 0, 'tabItems are empty');

  var cheese, foods = [];
  Ember.run(function () {
    cheese = App.Food.createRecord({
      id: 500,
      name: 'cheese',
      imgUrl: '',
      cents: 100
    });
    controller.addFood(cheese);
    tabItems.get('content').forEach(function(food){
      foods.push( food.record.toJSON() );
    });
  });
  equal(tabItems.get('content').length, 1, 'Added food to tabItems');
  equal(foods.length, 1, 'tabItems has one food');
  equal(foods[0].cents, 100, 'added food cost is 100 cents');
});
```

### Handlebars Helper Unit Test Module

The example tests below exercise the display format of money using a Handlebars 
helper to convert cents to dollars, e.g. 350 cents display as "3.50". Conditions 
are tested to confirm output when the cents value is not a number and when the 
cents value is a number. The helper outputs "0.00" by default, otherwise formats 
the cents as dollars (two decimal places).

```javascript
module('Ordr App unit tests: Handlebars Helper', {
  setup: function () {
    App.reset();
  }
});

test('money helper renders default text', function() {
  expect(2);

  var view, cents;
  Ember.run(function () {
    view = Ember.View.create({
      template: Ember.Handlebars.compile('{{money cents}}')
    });
    view.appendTo('#qunit-fixture');
    cents = view.get('cents');
  });
  equal(cents, null, 'Value is not a null');
  strictEqual(view.$().text(), '0.00', 'Renders 0.00 when NaN');
});

test('money helper renders number converted to money format', function() {
  expect(2);

  var view, cents;
  Ember.run(function () {
    view = Ember.View.create({
      template: Ember.Handlebars.compile('{{money view.cents}}'),
      cents: 777
    });
    view.appendTo('#qunit-fixture');
    cents = view.get('cents');
  });
  equal(cents, 777, 'Value is 777');
  strictEqual(view.$().text(), '7.77', 'Renders 7.77 given 777');
});

```

### Models Unit Test Module

**Warning: This application uses Ember Data, "Use with caution"**

In the schema for the Ordr application...

* A Table belongs to a Tab (order)
* A Tab has many TabItems and a computed property for `cents` subtotal
* A TabItem belongs to a Food
* A Food has a `cents` property that is copied to a TabItem
  (a food price can change but the price in the order is final)

See the [Fire up Ember.js video] page for a diagram of the above models.

Again, in this test, the setup of the models using fixtures is forced by using 
`visit()` to trigger a route that results in the setup of application state 
under test, specifically the models that rely on fixture data. (This may be an 
anti-pattern, but seemed necessary at this time for testing the models using the
`DS.Model#createRecord` method provided by Ember Data.)

The model tests below confirm that the relationships for "belongs to" and "has 
many" are working as expected. If this Order application was not yet written, 
creating the tests below would help to generate the needed relationships and to 
learn how Ember Data relationships actually work.

Some functions and variables follow the tests, which facilitate the creation of 
various models that will be setup across the various tests in the Models module 
below.

```javascript
module('Ordr App unit tests: Models', {
  setup: function () {
    App.reset();
    visit('/tables/4');
  }
});

test('Tab model has total of all items for table 4', function() {
  expect(3);

  ok(App.Tab, 'Food model ok');
  var tab = getFoodController().get('controllers.table.tab');
  ok(tab, 'tab instance ok');

  var total = 0;
  tab.get('tabItems.content').forEach(function(food){
    total += food.record.get('cents');
  });
  strictEqual(tab.get('cents'), total, '5450 cents is the total of the tab');
});

test('Food model created with name, imageUrl and cents', function() {
  expect(5);

  ok(App.Food, 'Food model ok');
  var food;
  Ember.run(function () {
    food = createCheese();
  });
  ok(food, 'created food item');
  equal(food.get('name'), 'Cheese', 'Food Name is Cheese');
  equal(food.get('imageUrl'), 'img/cheese.png', 'Url is img/cheese.png');
  equal(food.get('cents'), 400, 'cents is 400');

  Ember.run(function () {
    food.destroy();
  });
});

test('TabItem model created with food model and cents', function() {
  expect(2);

  ok(App.TabItem, 'TabItem model ok');
  var tabItem;
  Ember.run(function () {
    tabItem = createTabItem(createCheese(), 400);
  });
  equal(tabItem.get('cents'), 400, 'created tabItem with 400 cents');

  Ember.run(function () {
    tabItem.destroy();
  });
});

test('Tab model created with food models', function() {
  expect(3);

  ok(App.Tab, 'Tab model ok');
  var tab, foods = [], foodsSum;
  Ember.run(function () {
    tab = createTabWithCheeseAndCrackers();
  });
  tab.get('tabItems.content').forEach(function(food){
    foods.push(food.record.get('cents'));
  });
  foodsSum = foods.reduce(function (prev, cur) {
    return prev + cur;
  });
  equal(foods.length, 2, 'created tab with two items');
  equal(foodsSum, tab.get('cents'), 'total of tab is 750');

  Ember.run(function () {
    tab.destroy();
  });
});

test('Table', function() {
  expect(2);

  ok(App.Table, 'Table model ok');
  var table;
  Ember.run(function () {
    table = createTable(createTabWithCheeseAndCrackers());
  });
  equal(table.get('tab.tabItems.content').length, 2, 'created table with tab which already has 2 items');

  Ember.run(function () {
    table.destroy();
  });
});
```

At the end of each test the model(s) genereted are destroyed. QUnit's `teardown` 
routine can be used for common tasks like this.

Below are the functions and variables used to assist creating model instances 
during unit testing of the various model classes.

```javascript
var foodId = 100;

function createFood(name, url, cents){
  return App.Food.createRecord({
    id: foodId ++,
    name: name,
    imageUrl: url,
    cents: cents
  });
}

function createCheese(){
  return createFood('Cheese', 'img/cheese.png', 400);
}

function createCrackers(){
  return createFood('Crackers', 'img/crackers.png', 350);
}

var tabItemId = 500;

function createTabItem(food, cents){
  return App.TabItem.createRecord({
    id: tabItemId ++,
    food: food,
    cents: cents
  });
}

var tabId = 100;

function createTabWithCheeseAndCrackers(){
  var tab = App.Tab.createRecord({
    id: tabId ++
  });
  var tabItems = tab.get('tabItems');
  tabItems.createRecord({
    id: tabItemId ++,
    food: createCheese(),
    cents: 400
  });
  tabItems.createRecord({
    id: tabItemId ++,
    food: createCrackers(),
    cents: 350
  });
  return tab;
}

var tableId = 100;

function createTable(tab){
  return App.Table.createRecord({
    id: tableId ++,
    tab: tab
  });
}

```

[Ember.run]: http://emberjs.com/api/classes/Ember.run.html "wrap your code inside this call"
[Fire up Ember.js video]: https://peepcode.com/products/emberjs "Ember.js Tutorial video by Peepcode"
