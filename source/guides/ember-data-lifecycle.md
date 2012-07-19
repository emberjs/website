# Ember Data Record Lifecycle

The goal of this guide is to walk you through the lifecycle of an Ember
Data record.

Throughout this guide, we will assume the existence of the following
model:

```javascript
Person = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  father: DS.belongsTo('Person'),

  name: function() {
    return this.get('firstName') + ' ' +
           this.get('lastName')
  }.property('firstName', 'lastName')
});
```

The guide will walk through the initial `find` on the model, how the
adapter loads the data in from the server, and how the server data is
materialized into an Ember Data record.

## Step 1: Finding a Record

When you request a record using `Person.find(1)`, Ember Data will ask
the store to find the record (`store.find(Person, 1)`).

<figure>
  <img src="/images/ember-data-guide/step1.png">
</figure>

If the adapter has not already loaded the record into the store, the
store will ask the adapter to fetch it.

<figure>
  <img src="/images/ember-data-guide/step2.png">
</figure>

Since the adapter's request is asynchronous, the store will return a new
`Person` instance immediately. At this point, the record has no backing
data.

<figure>
  <img src="/images/ember-data-guide/step3.png">
</figure>

## Step 2: Adapter Loads Data Into the Store

At some point later, the server will return some data to the adapter.

<figure>
  <img src="/images/ember-data-guide/step5.png">
</figure>

Once the adapter receives the data hash, it loads it into the store.
The store saves off the data hash for use later. The store will also
notify the record that the data hash is available.

This will, in turn, notify all attributes (`DS.attr`) and relationships
(`DS.hasMany` and `DS.belongsTo`).

<figure>
  <img src="/images/ember-data-guide/step6.png">
</figure>

## Step 3: Getting an Attribute

In response to the notification, the app will typically request some
attribute. In this case, imagine that the `Person` was represented by
the following template:

```handlebars
<p>{{name}}</p>
```

When the template renders, it will register an observer on the
`name` property, which depends on `firstName` and `lastName`. Once the
data hash loads in from the server, the registered observer will call
`person.get('name')` to update the DOM. This will call
`person.get('firstName')`.

<figure>
  <img src="/images/ember-data-guide/step7.png">
</figure>

## Step 4: Materialization

Because this is the first time the record needs its backend-provided
data, it will ask the store to load it in using `materializeData`.

<figure>
  <img src="/images/ember-data-guide/step8.png">
</figure>

The store will, in turn, ask the adapter to materialize the data. This
allows the adapter to apply adapter-specific mappings to the
backend-provided data hash.

<figure>
  <img src="/images/ember-data-guide/step9.png">
</figure>

Finally, the adapter asks its serializer object to perform the
materialization. In general, the adapter is responsible for working with
the backend, and the serializer is responsible for materializing
backend-provided data hashes into records, and serializing records into
JSON hashes for the backend.

<figure>
  <img src="/images/ember-data-guide/step10.png">
</figure>

The serializer is now responsible for extracting the information from
the backend-provided data hash and hydrating the record object. First,
it populates the record's `id`.

<figure>
  <img src="/images/ember-data-guide/step11.png">
</figure>

Next, it populates the record's attributes.

<figure>
  <img src="/images/ember-data-guide/step12.png">
</figure>

Finally, it populates the `belongsTo` association.

<figure>
  <img src="/images/ember-data-guide/step13.png">
</figure>

Once the adapter finishes materializing the record, it returns the
requested `firstName`.

Because the adapter has already populated the record, trying to `get`
its `lastName` will not trigger additional materialization.

## Identity Map

Additional requests for Person 1 will skip all of these steps, because
`store.find(Person, 1)` will see that it has already created an instance
for that record and return it.

This means that all requests for a record with the same model type and
ID will return the same object.

This feature is known as an "identity map", because it guarantees
JavaScript _identity_ for objects representing the same backend data.

## Practical Note

In the example above, we used a template that rendered the `Person`
object directly. As a result, we got partially loaded output that
automatically filled in as the data loaded.

You may want this behavior in some cases, but in most cases, your
template would look something like this:

```handlebars
{{#if isLoaded}}
  <p>{{name}}</p>
{{else}}
  <img src="/images/spinner.gif">
{{/if}}
```

When the adapter loads the backend-provided hash into the store, the
store moves the record into the loaded state, which changes its
`isLoaded` flag to true.

That will notify an observer set up by the template that `isLoaded` has
changed, which will cause the template to render the first branch
(containing `<p>{{name}}</p>`) instead of the spinner.

When it renders that branch, the template will trigger the same
`get('name')` that caused materialization in the above example.
