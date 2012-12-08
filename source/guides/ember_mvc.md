# Ember.js MVC

The Ember.js framework uses a model-view-controller (MVC) pattern of application architecture. Many other frameworks and platforms also use this pattern, so you may have heard of it before. Although the concepts are consistent across platforms, the implementation can vary heavily. Therefore, it is important to understand how Ember.js's MVC implementation differs from what you may be familiar with.

### MVC Basics

The purpose of the MVC pattern is to separate key concerns so that objects can more easily be tested, maintained, and reused.

The *model* is where most application data is kept. Models are generally specified in advance, using a schema or some other type of template in order to formalize and optimize data storage and retrieval. It is often implemented in the form of a data type, class, or database table. An example of a model would be a `User`, which is made up of `username` and `password` string fields. Many `User` objects can be created and stored, and they are usually not responsible for any application logic.

The *view* describes the presentation of various application components&mdash;usually parts of the *model*. Views are how a user sees and interacts with an application. They can be subject to whatever styling is possible in the given system, and hold no permanent state. There are many markup languages (e.g. HTML/CSS) and templating languages (e.g. Handlebars) with which views can be written. An example of a view would be a User edit page template that contains the code which handles the creation and styling of label and editing fields.

The *controller* acts as the link between *models* and *views*. It provides the business logic of the application, receiving input from the views and performing CRUD operations on the models. A controller would manage taking the username and password from a view object, comparing them to a model object, and replacing the current view with the next to show a logged-in state (or perhaps something else).


### Ember.js Implementation

Ember provides various objects to lay the foundation for easily implementing MVC functionality. For instance:

* DS.Model lets you describe your application's data structure, including relationships between models.
* Ember.View encapsulates templates of HTML, letting you write reusable and maintainable views for your application.
* Ember.ArrayController makes it easy to manage lists of objects, with convenience methods for iterating through the contents.
* Ember.js also adds a new piece of important architecture: A state manager which can mediate between the views, controllers, and data store. It can act as a map of your application and handle transitions as a user moves through it.

All of these objects descend from Ember.Object, which provides great features like binding support, observers, computed properties, and subclassing.


