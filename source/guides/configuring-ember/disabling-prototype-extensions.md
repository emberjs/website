By default, Ember.js will extend the prototypes of native JavaScript
objects in the following ways:

* `Array` is extended to implement the `Ember.Enumerable`,
  `Ember.MutableEnumerable`, `Ember.MutableArray` and `Ember.Array`
  interfaces. This polyfills ECMAScript 5 array methods in browsers that
  do not implement them, adds convenience methods and properties to
  built-in arrays, and makes array mutations observable.
* `String` is extended to add convenience methods, such as
  `camelize()` and `fmt()`. 
* `Function` is extended with methods to annotate functions as
  computed properties, via the `property()` method, and as observers,
  via the `observes()` or `observesBefore()` methods.

This is the extent to which Ember.js enhances native prototypes. We have
carefully weighed the tradeoffs involved with changing these prototypes,
and recommend that most Ember.js developers use them. These extensions
significantly reduce the amount of boilerplate code that must be typed.

However, we understand that there are cases where your Ember.js
application may be embedded in an environment beyond your control. The
most common scenarios are when authoring third-party JavaScript that is
embedded directly in other pages, or when transitioning an application
piecemeal to a more modern Ember.js architecture.

In those cases, where you can't or don't want to modify native
prototypes, Ember.js allows you to completely disable the extensions
described above.

To do so, simply set the `EXTEND_PROTOTYPES` flag to `false`:

```javascript
window.EmberENV = {};
EmberENV.EXTEND_PROTOTYPES = false;
```

Or you can choose class which you want to disable prototype extension.
``` javascript
EmberENV.EXTEND_PROTOTYPES = {
  String: false,
  Array: true
};
```

Note that the above code must be evaluated **before** Ember.js loads. If
you set the flag after the Ember.js JavaScript file has been evaluated,
the native prototypes will already have been modified.

### Life Without Prototype Extension

In order for your application to behave correctly, you will need to
manually extend or create the objects that the native objects were
creating before.

#### Arrays

Native arrays will no longer implement the functionality needed to
observe them. If you disable prototype extension and attempt to use
native arrays with things like a template's `{{#each}}` helper, Ember.js
will have no way to detect changes to the array and the template will
not update as the underlying array changes.

Additionally, if you try to set the model of an
`Ember.ArrayController` to a plain native array, it will raise an
exception since it no longer implements the `Ember.Array` interface.

You can manually coerce a native array into an array that implements the
required interfaces using the convenience method `Ember.A`:

```javascript
var islands = ['Oahu', 'Kauai'];
islands.contains('Oahu');
//=> TypeError: Object Oahu,Kauai has no method 'contains'

// Convert `islands` to an array that implements the
// Ember enumerable and array interfaces
Ember.A(islands);

islands.contains('Oahu');
//=> true
```

#### Strings

Strings will no longer have the convenience methods described in the
[Ember.String API reference.](/api/classes/Ember.String.html). Instead,
you can use the similarly-named methods of the `Ember.String` object and
pass the string to use as the first parameter:

```javascript
"my_cool_class".camelize();
//=> TypeError: Object my_cool_class has no method 'camelize'

Ember.String.camelize("my_cool_class");
//=> "myCoolClass"
```

#### Functions

To annotate computed properties, use the `Ember.computed()` method to
wrap the function:

```javascript
// This won't work:
fullName: function() {
  return this.get('firstName') + ' ' + this.get('lastName');
}.property('firstName', 'lastName')


// Instead, do this:
fullName: Ember.computed('firstName', 'lastName', function() {
  return this.get('firstName') + ' ' + this.get('lastName');
})
```

Observers are annotated using `Ember.observer()`:

```javascript
// This won't work:
fullNameDidChange: function() {
  console.log("Full name changed");
}.observes('fullName')


// Instead, do this:
fullNameDidChange: Ember.observer('fullName', function() {
  console.log("Full name changed");
})
```

