A model is a class that defines the properties and behavior of the
data that you present to the user. Anything that the user expects to see
if they leave your app and come back later (or if they refresh the page)
should be represented by a model.

Make sure to include `ember-data.js` after `ember.js`

```html
<script type="text/javascript" src="ember.js"></script>
<script type="text/javascript" src="ember-data.js"></script>
```

For every model in your application, create a subclass of `DS.Model`:

```javascript
App.Person = DS.Model.extend();
```

After you have defined a model class, you can start finding and creating
records of that type. When interacting with the store, you will need to
specify a record's type using the model name. For example, the store's
`find()` method expects a string as the first argument to tell it what
type of record to find:

```js
store.find('person', 1);
```

The table below shows how model names map to model classes.

<table>
  <thead>
  <tr>
    <th>Model Name</th>
    <th>Model Class</th>
  </tr>
  </thead>
  <tr>
    <td><code>photo</code></td>
    <td><code>App.Photo</code></td>
  </tr>
  <tr>
    <td><code>adminUserProfile</code></td>
    <td><code>App.AdminUserProfile</code></td>
  </tr>
</table>

### Defining Attributes

You can specify which attributes a model has by using `DS.attr`.

```javascript
var attr = DS.attr;

App.Person = DS.Model.extend({
  firstName: attr(),
  lastName: attr(),
  birthday: attr()
});
```

Attributes are used when turning the JSON payload returned from your
server into a record, and when serializing a record to save back to the
server after it has been modified.

You can use attributes just like any other property, including as part of a
computed property. Frequently, you will want to define computed
properties that combine or transform primitive attributes.

```javascript
var attr = DS.attr;

App.Person = DS.Model.extend({
  firstName: attr(),
  lastName: attr(),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});
```

For more about adding computed properties to your classes, see
[Computed Properties](/guides/object-model/computed-properties).

Every Model in Ember Data has a special `id` attribute. You do not
need to manually define this property. This is how Ember Data will be
able to uniquely identify records when communicating with you
backend. The `id` attribute can be set for new records however once a
record has been saved Ember Data will not allow you to update the
value of the `id` attribute.

If you don't specify the type of the attribute, it will be whatever
was provided by the server. You can make sure that an attribute is
always coerced into a particular type by passing a `type` argument to
the `attr` function:

```js
App.Person = DS.Model.extend({
  birthday: DS.attr('date')
});
```

The default adapter supports attribute types of `string`,
`number`, `boolean`, and `date`. Custom adapters may offer additional
attribute types, and new types can be registered as transforms.

// TODO link to a section on how to define attribute transforms.


[ISO 8601]: http://en.wikipedia.org/wiki/ISO_8601

#### Options
`DS.attr` takes an optional hash as a second parameter:

- `defaultValue`: Pass a string or a function to be called to set the
                  attribute to a default value if none is supplied.

  Example

  ```JavaScript
  var attr = DS.attr;

  App.User = DS.Model.extend({
      username: attr('string'),
      email: attr('string'),
      verified: attr('boolean', {defaultValue: false}),
      createdAt: attr('string', {
          defaultValue: function() { return new Date(); }
      })
  });
  ```


### Defining Relationships

Ember Data includes several built-in relationship types to help you
define how your models relate to each other. Ember Data has two
methods for declaring relationships. `DS.belongsTo` is used to
indicate a property will hold a single record (or null). `DS.hasMany`
is used to indicate that a property will hold an array of records.

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

Ember Data will do its best to discover which relationships map to one
another. In the one-to-many code above, for example, Ember Data can figure out that
changing the `comments` relationship should update the `post`
relationship on the inverse because `post` is the only relationship to
that model.

However, sometimes you may have multiple `belongsTo`/`hasMany`s for
the same type. You can specify which property on the related model is
the inverse using `DS.belongsTo` or `DS.hasMany`'s `inverse`
option. Relationships without an inverse can be indicated as such by
including `{ inverse: null }`.

```javascript
var belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

App.Comment = DS.Model.extend({
  onePost: belongsTo('post', { inverse: null }),
  twoPost: belongsTo('post'),
  redPost: belongsTo('post'),
  bluePost: belongsTo('post')
});


App.Post = DS.Model.extend({
  comments: hasMany('comment', {
    inverse: 'redPost'
  })
});
```

#### Async Relationships

Ember Data expects relevant relationship data to be returned by your
server when it fetches your record. Often times this is not desirable
or practical. In these cases you can tell Ember Data that a
relationship asynchronous by setting the `async` option to true.

```js
App.User = DS.Model.extend({
  profile: DS.belongsTo('profile', { async: true })
});

App.Profile = DS.Model.extend({
  imageURL: DS.attr('string')
});
```

This means the first time you attempt to access a record's
relationship property Ember Data will make a requests to the server to
resolve that relationship. This changes the api slightly as now
accessing the relationship will return a `PromiseObject` for
`belongsTo` relationships and a `PromiseArray` or `hasMany`
relationships. `PromiseObject`s and `PromiseArray` are objects that
act like a promise but will also proxy to the promise's value once the
promise has resolved.

```js
// accessing `profile` the first time will trigger the store to ask the adapter for the profile data.
// `profile.imageURL` will be undefined until that request resolves.
user.get('profile.imageURL');

// You can use `.then` to ensure profile is loaded before attempting to access its data.
user.get('profile').then(function(profile) {
  // profile is now loaded
  profile.get('imageURL');
});
```

#### Reflexive relation

When you want to define a reflexive relation (a model that relation to
itself), you must explicitly define the inverse relationship. If there
is no inverse relationship then you can set the inverse to null.

##### One To Many Reflexive Relationship

```js
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

App.Folder = DS.Model.extend({
  children: hasMany('folder', {inverse: 'parent'}),
  parent: belongsTo('folder', {inverse: 'children'})
});
```

##### One To One Reflexive Relationship

```js
var belongsTo = DS.belongsTo;

App.User = DS.Model.extend({
  name: attr('string'),
  bestFriend: belongsTo('user', {async: true, inverse: 'bestFriend' }),
});
```

##### No Inverse Reflexive Relationship

```js
var belongsTo = DS.belongsTo,

App.Folder = DS.Model.extend({
  parent: belongsTo('folder', {inverse: null})
});
```

