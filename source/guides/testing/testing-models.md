_Unit testing methods and computed properties follows previous patterns shown 
in [Unit Testing Basics] because DS.Model extends Ember.Object._

[Ember Data] Models can be tested using the `moduleForModel` helper.

Let's assume we have a `Player` model that has `level` and `levelName` 
attributes. We want to call `levelUp()` to increment the `level` and assign a 
new `levelName` when the player reaches level 5.

```javascript
App.Player = DS.Model.extend({
  level:     DS.attr('number', { defaultValue: 0 }),
  levelName: DS.attr('string', { defaultValue: 'Noob' }),
  
  levelUp: function() {
    var newLevel = this.incrementProperty('level');
    if (newLevel === 5) {
      this.set('levelName', 'Professional');      
    }
  }
});
```

Now let's create a test which will call `levelUp` on the player when they are
level 4 to assert that the `levelName` changes. We will use `moduleForModel`:

```javascript
moduleForModel('player', 'Player Model');

test('levelUp', function() {
  // this.subject aliases the createRecord method on the model
  var player = this.subject({ level: 4 });

  // wrap asynchronous call in run loop
  Ember.run(function() {
    player.levelUp();
  });

  equal(player.get('level'), 5);
  equal(player.get('levelName'), 'Professional');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/roqurabiva/1/embed?output">Unit Testing
Ember Data Models</a>

## Testing Relationships

For relationships you probably only want to test that the relationship
declarations are setup properly.

Assume that a `User` can own a `Profile`.

```javascript
App.Profile = DS.Model.extend({});

App.User = DS.Model.extend({
  profile: DS.belongsTo('profile')
});
```

Then you could test that the relationship is wired up correctly
with this test.

```javascript
moduleForModel('user', 'User Model', {
  needs: ['model:profile']
});

test('profile relationship', function() {
  var User = this.store().modelFor('user');
  var relationship = Ember.get(User, 'relationshipsByName').get('profile');

  equal(relationship.key, 'profile');
  equal(relationship.kind, 'belongsTo');
});
```

#### Live Example

<a class="jsbin-embed" href="http://jsbin.com/luvoyibeba/1/embed?output">Unit Testing Models (Relationships : One-to-One)</a>

<script src="http://static.jsbin.com/js/embed.js"></script>

_Ember Data contains extensive tests around the functionality of
relationships, so you probably don't need to duplicate those tests.  You could
look at the [Ember Data tests] for examples of deeper relationship testing if you
feel the need to do it._

[Ember Data]: https://github.com/emberjs/data
[Unit Testing Basics]: /guides/testing/unit-testing-basics
[Ember Data tests]: https://github.com/emberjs/data/tree/master/packages/ember-data/tests
