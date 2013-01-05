## Controllers

A controller may have one or both of these responsibilities:

* Representing a model for a template.
* Storing application properties that do not need to be saved to the server.

Most of your controllers will be very small. Unlike other
frameworks, where the state of your application is spread amongst many
controllers, in Ember.js, we encapsulate that state in the router. This
allows your controllers to be lightweight and focused on one thing.

### Representing Models

Templates are always connected to controllers, not models. This makes it
easy to separate display-specific properties from model-specific
properties.

Often, however, it is convenient for your templates to be able to
retrieve properties directly from a model. Ember.js makes this easy with
`Ember.ObjectController` and `Ember.ArrayController`.

### Storing Application Properties

Often, your application will need to store information that does not
belong in the model. Any time you need to save information that does not
need to be persisted to the server, you should put it in a controller.

For example, imagine your application has a search field that is always
present. You would have a `SearchController` with a `query` property, to
which the search field would be bound.

If your user wants to search, she would type her query in the search
field, then hit the enter key.

When your router initiates the query to the server, it should retrieve
the current query from the `SearchController`, instead of trying to
retrieve it from the search field.
