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

For more about adding computed properties to your classes, see [Computed
Properties](/guides/object-model/computed-properties).

If you don't specify the type of the attribute, it will be whatever was
provided by the server. You can make sure that an attribute is always
coerced into a particular type by passing a `type` to `attr`:

```js
App.Person = DS.Model.extend({
  birthday: DS.attr('date')
});
```

The default adapter supports attribute types of `string`,
`number`, `boolean`, and `date`. Custom adapters may offer additional
attribute types, and new types can be registered as transforms. See the
[documentation section on the REST Adapter](/guides/models/the-rest-adapter).

**Please note:** Ember Data serializes and deserializes dates according to
                 [ISO 8601][]. For example: `2014-05-27T12:54:01`

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

Ember Data will do its best to discover which relationships map to one
another. In the one-to-many code above, for example, Ember Data can figure out that
changing the `comments` relationship should update the `post`
relationship on the inverse because `post` is the only relationship to
that model.

However, sometimes you may have multiple `belongsTo`/`hasMany`s for the
same type. You can specify which property on the related model is the
inverse using `DS.hasMany`'s `inverse` option:

```javascript
var belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

App.Comment = DS.Model.extend({
  onePost: belongsTo('post'),
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

You can also specify an inverse on a `belongsTo`, which works how you'd expect.

#### Reflexive relation

When you want to define a reflexive relation, you must either explicitly define
the other side, and set the explicit inverse accordingly, and if you don't need the
other side, set the inverse to null.

```javascript
var belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

App.Folder = DS.Model.extend({
  children: hasMany('folder', {inverse: 'parent'}),
  parent: belongsTo('folder', {inverse: 'children'})
});
```

or

```javascript
var belongsTo = DS.belongsTo,

App.Folder = DS.Model.extend({
  parent: belongsTo('folder', {inverse: null})
});
```

