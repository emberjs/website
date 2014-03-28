Testing models can be done using the `moduleForModel` test helper.

## Testing Functions

TBD

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
emq.globalize();
setResolver(App.__container__);
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
emq.globalize();
setResolver(App.__container__);
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
