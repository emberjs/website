Since models must be loaded and saved asynchronously, there are several
possible states that a record may be in at a given time. Each instance
of `DS.Model` has a set of Boolean properties that you can use to
introspect the current state of the record.

* **isLoaded** The adapter has finished retrieving the current state of
  the record from its backend.
* **isDirty** The record has local changes that have not yet been saved
  by the adapter. This includes records that have been created (but not
  yet saved) or deleted.
* **isSaving** The record has been sent to the adapter to have its
  changes saved to the backend, but the adapter has not yet confirmed
  that the changes were successful.
* **isDeleted** The record was marked for deletion. When `isDeleted`
  is true and `isDirty` is true, the record is deleted locally
  but the deletion was not yet persisted. When `isSaving` is
  true, the change is in-flight. When both `isDirty` and
  `isSaving` are false, the change has been saved.
* **isError** The adapter reported that it was unable to save
  local changes to the backend. This may also result in the
  record having its `isValid` property become false if the
  adapter reported that server-side validations failed.
* **isNew** The record was created locally and the adapter
  did not yet report that it was successfully saved.
* **isValid** No client-side validations have failed and the
  adapter did not report any server-side validation failures.

Additionally, you can subscribe to events that are emitted when a record
changes state. For example, you can run some code when a record becomes
loaded:

```js
record.on('didLoad', function() {
  console.log("Loaded!");
});
```

Valid events are:

* `didLoad`
* `didCreate`
* `didUpdate`
* `didDelete`
* `becameError`
* `becameInvalid`


### Record States

#### Loading

A record typically starts off in the loading state. This means Ember
Data has not yet received information from the adapter about what values
its attributes and relationships should have. You can put the record
into templates and they will automatically update once the record
becomes loaded.

Attempting to modify a record in the loading state will raise an
exception.

#### Loaded/Clean

A record that is both loaded and clean means that is has received
information about its attributes and relationships from the server, and
no changes have been made locally on the client.

#### Dirty

A dirty record has outstanding changes to either its attributes or
relationships that have not yet been synchronized with the adapter.

#### In-Flight

A record that is in-flight is a dirty record that has been given to the
adapter to save the changes made locally. Once the server has
acknowledged that the changes have been saved successfully, the record
will become clean.

#### Invalid

A record becomes invalid if the adapter is notified by the server that
it was not able to be saved because the backend deemed it invalid.

#### Error

A record enters the error state when the adapter is unable to save it
for some reason other than invalidity.
