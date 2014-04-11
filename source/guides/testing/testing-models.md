Testing models can be done using the `moduleForModel` test helper.

## Testing Functions

Let's assume we have a `Player` model that has `level` and `levelName`
attributes, and we want to call `levelUp()` to increment the `level`
and assign a new `levelName` at level 5.

```javascript
App.Player = Ember.Object.extend({
  level: 0,
  levelName: 'Noob',
  levelUp: function() {
    var properties = { level: this.get('level') + 1 };
    if(properties.level == 5){
      properties.levelName = "Professional";
    }
    this.setProperties(properties);
  }
});
```

It's easy to create a `Player` object and test the method.

```javascript
moduleForModel('player', 'Player Model', {});

test('levelUp', function() {
  var player = App.Player.create({ level: 4 });

  player.levelUp();

  equal(player.get('level'), 5, 'level should increment');
  equal(player.get('levelName'),"Professional",'levelName should change');
});
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/weyol/2/embed?js,output">Unit Testing Models (Functions)</a><script src="http://static.jsbin.com/js/embed.js"></script>

## Testing Computed Properties

Let's assume we have a person model with a `fullName` computed property.

```javascript
App.Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,
  // the computed property
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});
```
Then we can write a simple test to ensure that `fullName` is computed
correctly and that it is updated when either `firstName` or `lastName`
change.

```javascript
// Globalize ember-qunit. For more info, see http://emberjs.com/guides/testing/unit#toc_unit-testing-setup
emq.globalize();
// Set the resolver for the global context. For more info, see http://emberjs.com/guides/testing/unit#toc_the-resolver
setResolver(App.__container__)
// Place Ember in test mode. For more info, see http://emberjs.com/guides/testing/unit#toc_unit-testing-setup
App.setupForTesting();

moduleForModel('person', 'moduleForModel with person', {});

test('fullName', function() {
  // First create a person and assert that the fullName is computed
  var ironMan = App.Person.create({
    firstName: "Tony",
    lastName:  "Stark"
  });

  equal(ironMan.get('fullName'), "Tony Stark");

  // Then change the name and assert that the fullName is updated
  ironMan.setProperties({
    firstName: "Pepper",
    lastName: "Potts"
  });

  equal(ironMan.get('fullName'), "Pepper Potts");
});
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/dapux/1/embed?js,output">Unit Testing Models (Computed Properties)</a><script src="http://static.jsbin.com/js/embed.js"></script>


## Testing Relationships

For relationships you probably only want to test that the relationship
declarations are setup properly.

Assume that a `User` can own a `Profile`.

```javascript
App.Profile = DS.Model.extend({});

App.User = DS.Model.extend({
  profile: DS.belongsTo(App.Profile)
});
```

Then you could test that the relationship is wired up correctly
with this test.

```javascript
// Globalize ember-qunit. For more info, see http://emberjs.com/guides/testing/unit#toc_unit-testing-setup
emq.globalize();
// Set the resolver for the global context. For more info, see http://emberjs.com/guides/testing/unit#toc_the-resolver
setResolver(App.__container__)
// Place Ember in test mode. For more info, see http://emberjs.com/guides/testing/unit#toc_unit-testing-setup
App.setupForTesting();

moduleForModel('user', 'User Model', {
  needs: ['model:profile']
});

test('profile relationship', function() {
  var relationships = Ember.get(App.User, 'relationships');
  deepEqual(relationships.get(App.Profile), [
    { name: "profile", kind: "belongsTo" }
  ]);
});
```

#### Example

<a class="jsbin-embed" href="http://jsbin.com/zoxoz/1/embed?js,output">Unit Testing Models (Relationships : One-to-One)</a><script src="http://static.jsbin.com/js/embed.js"></script>

Ember Data contains extensive tests around the functionality of
relationships, so you probably don't need to duplicate those tests.  You could
look to the Ember Data tests for examples of deeper relationship testing if you
feel the need to do it.
