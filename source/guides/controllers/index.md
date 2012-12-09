## Controllers

A controller has one or more responsibilities:

* Representing a model for a template.
* Encapsulating behavior that operates on a model.
* Storing information that the application needs but that does not need
to be saved to the server.

Most of your controllers will be very small. Unlike other
frameworks, where the state of your application is spread amongst many
controllers, in Ember.js, we encapsulate that state in the router. This
allows your controllers to be lightweight and focused on one thing.
