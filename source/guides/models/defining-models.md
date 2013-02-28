## Defining Models

For every type of model you'd like to represent, create a new subclass of
`DS.Model`:

```javascript
App.Person = DS.Model.extend();
```

### Attributes

You can specify which attributes a model has by using `DS.attr`. You can
use attributes just like any other property, including as part of a
computed property.

```javascript
var attr = DS.attr;

App.Person = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  birthday: DS.attr('date'),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});
```

By default, the REST adapter supports attribute types of `string`,
`number`, `boolean`, and `date`. Custom adapters may offer additional
attribute types.

### Relationships

Ember Data includes several built-in relationship types to help you
define how your models relate to each other.

#### One-to-One

To declare a one-to-one relationship between two models, use
`DS.belongsTo`:

```js
App.User = DS.Model.extend({
  profile: DS.belongsTo('App.Profile')
});

App.Profile = DS.Model.extend({
  user: DS.belongsTo('App.User')
});
```

#### One-to-Many

To declare a one-to-many relationship between two models, use
`DS.belongsTo` in combination with `DS.hasMany`, like this:

```js
App.Post = DS.Model.extend({
  comments: DS.hasMany('App.Comment')
});

App.Comment = DS.Model.extend({
  post: DS.belongsTo('App.Post')
});
```

#### Many-to-Many

To declare a many-to-many relationship between two models, use
`DS.hasMany`:

```js
App.Post = DS.Model.extend({
  tags: DS.hasMany('App.Tag')
});

App.Tag = DS.Model.extend({
  posts: DS.hasMany('App.Post')
});
```
