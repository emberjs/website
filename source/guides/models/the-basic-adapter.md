The most basic way to use Ember Data is to make your own Ajax requests
using jQuery's Ajax helpers and process the data yourself before loading
it into your records.

The basic adapter allows you to implement hooks to talk to your backend,
then load the data returned into the store.

You provide the hooks to Ember Data by implementing a `sync` object on
each model:

```javascript
App.Person = DS.Model.extend({
  //...model definition...
});

App.Person.sync = {
  find: function(id, process) {
    // ...
  }
};
```

### Finding Records

When you use the `find` method on a model in your application, Ember
Data will invoke the `find` hook on your model's `sync` object.

```javascript
App.Person.find(1);

App.Person.sync = {
  find: function(id, process) {
    jQuery.getJSON("/people/" + id).then(function(json) {
      process(json).camelizeKeys().load();
    });
  }
}
```

This will load the JSON representation returned from the server for the
`Person` with the given `id`.

The `process` function passed into `find` wraps a JavaScript object and
provides conveniences for normalizing it. Once you are done working with
the JSON, you call `load` to load the normalized data into the record.

Ember Data expects that the JSON you load in will have keys with the
same name as the attributes and relationships that you have defined in
the model. For example, if you have a `Person` model:

```javascript
App.Person = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  age: DS.attr('number')
});
```

You need to load an object that looks like this:

```javascript
{
  firstName: "Peter",
  lastName: "Wagenet",
  age: 25
}
```

Because underscored keys are so common, the `process` wrapper provides
the `camelizeKeys` method to convert all keys from underscored keys
to `camelized` keys.

For other kinds of manipulations, the `process` wrapper provides a
`munge` method you can use to change the JSON object:

```javascript
App.Person.sync = {
  find: function(id, process) {
    jQuery.getJSON("/people/" + id).then(function(json) {
      process(json)
        .munge(function(json) {
          json.firstName = json.FIRST_NAME;
          json.lastName = json["name,last"];
        })
        .load();
    });
  }
}
```

You can modify the JSON before passing it to `process`. The `munge`
API is provided to make it easier to compose with other methods on
the `process` wrapper.

### Querying for Multiple Records

When you use the `query` method on a model, Ember Data will invoke
the `query` hook on your model's `sync` object.

```javascript
App.Person.query({ page: 1 });

App.Person.sync = {
  query: function(query, process) {
    jQuery.getJSON("/people", query).then(function(json) {
      process(json).camelizeKeys().load();
    });
  }
}
```

In the case of a query, the `process` wrapper will wrap an Array of
returned objects.
