# Ember.js MVC

The Ember.js framework uses a model-view-controller (MVC) pattern of application architecture. Many other frameworks and platforms also use this pattern, so you may have heard of it before. Although the concepts are consistent across platforms, the implementation can vary heavily. Therefore, it is important to understand how Ember.js's MVC implementation differs from what you may be familiar with.

### MVC Basics

The purpose of the MVC pattern is to separate key concerns so that objects can more easily be tested, maintained, and reused.

The *model* is where most application data is kept. Models are generally specified in advance, using a schema or some other type of template in order to formalize and optimize data storage and retrieval. It is often implemented in the form of a data type, class, or database table. An example of a model would be a `User`, which is made up of `username` and `password` string fields. Many `User` objects can be created and stored, and they are usually not responsible for any application logic.

The *view* describes the presentation of various application components—usually parts of the *model*. Views are how a user sees and interacts with an application. They can be subject to whatever styling is possible in the given system, and hold no permanent state. There are many markup languages (e.g. HTML/CSS) and templating languages (e.g. Handlebars) with which views can be written. An example of a view would be a User edit page template that contains the code which handles the creation and styling of label and editing fields.

The *controller* acts as the link between *models* and *views*. It provides the business logic of the application, receiving input from the views and performing CRUD operations on the models. A controller would manage taking the username and password from a view object, comparing them to a model object, and replacing the current view with the next to show a logged-in state (or perhaps something else).


### Ember.js Implementation

Ember provides various objects to lay the foundation for easily implementing MVC functionality. For instance:

* DS.Model lets you describe your application's data structure, including relationships between models.
* Ember.View encapsulates templates of HTML, letting you write reusable and maintainable views for your application.
* Ember.ArrayController makes it easy to manage lists of objects, with convenience methods for iterating through the contents.
* Ember.js also adds a new piece of important architecture: A state manager which can mediate between the views, controllers, and data store. It can act as a map of your application and handle transitions as a user moves through it.

All of these objects descend from Ember.Object, which provides great features like binding support, observers, computed properties, and subclassing.


### Differences from Ruby on Rails

A common misconception about Ember.js's MVC implementation is that it must be similar to that of Ruby on Rails. This is incorrect. 

The reason for this difference is due to Ruby on Rails being a server-side framework, whereas Ember is a client-side framework.[1]

Ember runs in the browser, so it can detect and respond to browser events such as mouse clicks, finger taps, scrolling, key presses, etc. The view objects that receive these events can then send them to controller objects, which can work with the data model to save changes. Everything happens client-side, in the browser, and ember-data takes care of sending and receiving appropriate data to and from the server API.

<figure>
  <img alt="Ember.js MVC Diagram" src="/images/ember_mvc/embermvc.png">
</figure>

Rails, on the other hand, runs on the server. As such, it can only communicate with the client through HTTP requests. Rather than receive direct user events, the server takes HTTP requests as input (GET /, POST /user/1, etc.), reads the route and maps it to a controller action. The controller then interacts with the model and the view templates to construct a response (usually in the form of an HTML document) to send back over HTTP. The user is always interacting with what is basically a flat page, assembled on demand for them based on their requests.

<figure>
  <img alt="Rails MVC Diagram" src="/images/ember_mvc/railsmvc.png">
</figure>

It is important to keep this difference in mind when architecting your applications. 

[1] Although it is possible to use Ember.js on the server side, that is beyond the scope of this guide.
# Ember.js MVC