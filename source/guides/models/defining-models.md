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
attribute types, and new types can be registered as transforms. See the
[documentation section on the REST Adapter](/guides/models/the-rest-adapter).

### Relationships

Ember Data includes several built-in relationship types to help you
define how your models relate to each other.

#### One-to-One

To declare a one-to-one relationship between two models, use
`DS.belongsTo`:

```js
App.User = DS.Model.extend({
  profile: DS.belongsTo('profile')
});

App.Profile = DS.Model.extend({
  user: DS.belongsTo('user')
});
```

#### One-to-Many

To declare a one-to-many relationship between two models, use
`DS.belongsTo` in combination with `DS.hasMany`, like this:

```js
App.Post = DS.Model.extend({
  comments: DS.hasMany('comment')
});

App.Comment = DS.Model.extend({
  post: DS.belongsTo('post')
});
```

#### Many-to-Many

To declare a many-to-many relationship between two models, use
`DS.hasMany`:

```js
App.Post = DS.Model.extend({
  tags: DS.hasMany('tag')
});

App.Tag = DS.Model.extend({
  posts: DS.hasMany('post')
});
```

#### Explicit Inverses
From [This Week in Ember.JS, posted November 2, 2012](http://emberjs.com/blog/2012/11/02/this-week-in-ember-js.html)

Ember Data has always been smart enough to know that when you set a `belongsTo` relationship, the child record should be added to the parent's corresponding `hasMany` relationship.

Unfortunately, it was pretty braindead about *which* `hasMany` relationship it would update. Before, it would just pick the first relationship it found with the same type as the child.

Because it's reasonable for people to have multiple `belongsTo`/`hasMany`s for the same type, we added support for specifying an inverse:

```javascript
App.Comment = DS.Model.extend({
  onePost: DS.belongsTo("post"),
  twoPost: DS.belongsTo("post"),
  redPost: DS.belongsTo("post"),
  bluePost: DS.belongsTo("post")
});


App.Post = DS.Model.extend({
  comments: DS.hasMany('comment', {
    inverse: 'redPost'
  })
});
```

You can also specify an inverse on a `belongsTo`, which works how you'd expect.

#### Embedded Objects

When you have a data structure where the embedded data doesn't use or need ids, you have to specify that the `belongsTo` relationship is contained by the `hasMany` relationship.

To do this, you need to extend the adapter that your app is using to load the data with the embedded structure.

```javascript
App.Comment = DS.Model.extend({});

App.Post = DS.Model.extend({
  comments: DS.hasMany('comment')
});

App.Adapter.map('post', {
  comments: { embedded: 'always' }
});
```
