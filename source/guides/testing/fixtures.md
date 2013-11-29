Using fixture data while testing allows tests to execute quickly and is a nice 
alternative to mocking AJAX responses with yet another testing library.

Below is the fixture data to support the Ordr application and tests, using the 
[FixtureAdapter] to populate [model] data.

```javascript
App.Table.FIXTURES = [{
  id: 1,
  tab: 1
}, {
  id: 2,
  tab: 2
}, {
  id: 3,
  tab: 3
}, {
  id: 4,
  tab: 4
}, {
  id: 5,
  tab: 5
}, {
  id: 6,
  tab: 6
}];

App.Tab.FIXTURES = [{
  id: 1,
  tabItems: []
}, {
  id: 2,
  tabItems: []
}, {
  id: 3,
  tabItems: []
}, {
  id: 4,
  tabItems: [400, 401, 402, 403, 404]
}, {
  id: 5,
  tabItems: []
}, {
  id: 6,
  tabItems: []
}];

App.TabItem.FIXTURES = [{
  id: 400,
  cents: 1500,
  food: 1
}, {
  id: 401,
  cents: 300,
  food: 2
}, {
  id: 402,
  cents: 700,
  food: 3
}, {
  id: 403,
  cents: 950,
  food: 4
}, {
  id: 404,
  cents: 2000,
  food: 5
}];

App.Food.FIXTURES = [{
  id: 1,
  name: 'Pizza',
  imageUrl: 'img/pizza.png',
  cents: 1500
}, {
  id: 2,
  name: 'Pancakes',
  imageUrl: 'img/pancakes.png',
  cents: 300
}, {
  id: 3,
  name: 'Fries',
  imageUrl: 'img/fries.png',
  cents: 700
}, {
  id: 4,
  name: 'Hot Dog',
  imageUrl: 'img/hotdog.png',
  cents: 950
}, {
  id: 5,
  name: 'Birthday Cake',
  imageUrl: 'img/birthdaycake.png',
  cents: 2000
}];
```
_Source code of the Ordr application by PeepCode, used by permission._

It's not recommended to use the fixture adapter for a production application, 
the tutorial uses fixture data as an example that a browser application can be 
worked on in parallel to the development of a server application which will 
provide the data via an API. 

Using fixture data is an ideal way to facilitate testing of data that, in 
production, comes down the wire via AJAX requests.

### Mocking Models

When using Ember Data with asynchronous testing, things can get crazy.
If your testing suite becomes loaded with intermitent test failures due
to the [model lifecycle], it may be a good idea to mock your models in
your unit tests (when the model is _not_ the subject of the test). See below:

```javascript
App.Model = {
  find: Em.K,
  transaction: { commit: Em.K, rollback: Em.K },
  createRecord: Em.K
};
App.SomeModel = App.Model;
```

When mocking the `DS.Model` interface you can also use spies to assert 
your application works with the model.

[FixtureAdapter]: /guides/models/the-fixture-adapter/ "Fixture Adapter section of the Model guide"
[model]: /guides/models/ "Model guide"
[model lifecycle]: /guides/models/model-lifecycle/ "Models must be loaded and saved asynchronously"
