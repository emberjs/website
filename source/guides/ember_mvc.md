# Ember.js MVC

The Ember.js framework uses a model-view-controller (MVC) pattern of application architecture. Many other frameworks and platforms also use this pattern, so you may have heard of it before. Although the concepts are consistent across platforms, the implementation can vary heavily. Therefore, it is important to understand how Ember.js' MVC implementation differs from what you may be familiar to.

### MVC Basics

The purpose of the MVC pattern is to separate key concerns so that they can more easily be tested, maintained, and re-used.

The *model* is where most application data is kept. Models are generally specificed in advance, using a schema or some other type of template in order to formalize and optimze the data's storage and retrieval. It is often implemented in the form of a data type, class, or database table. An example of a model would be a `User`, which is made of up a `username` and `password` string fields. Many user objects can be created and stored, and they are usually not responsible for any application logic.

The *view* describes the presentation of various application components – usually parts of the *model*. Views are how a user sees and interacts with an application. They can be subject to whatever styling is possible in the given system, and hold no permanent state. There are many markup languages (HTML/CSS) and templating languages (Handlebars) which views can be written. An example of a view would be a User edit page template that contained the code which handles the creation and styling of label and editing fields.

The *controller* acts as the link between *models* and *views*. It provides the business logic of the application, recieving input from the views and performing CRUD operations on the models. A controller would manage taking the user name and password from a view object, comparing them to a model object, and replacing the current view with the next to show a logged in state (or perhaps something else.)


### Ember.js Implementation

Ember provides various objects to lay foundations for easily implementing MVC functionality.

DS.Model lets you describe your application's data structure, including relationships, 

Ember.View encasulates templates of HTML, letting you write reusable and maintable views for your application.

Ember.ArrayController makes it easy to manage lists of objects, with convenience methods for iterating through the contents.

Ember.js also adds a new peice of important architecture: A state manager which can mediate between the views, controllers, and data store. It can act as a map of your application and handle transitions as a user moves through it.

All of these objects descend from Ember.Object, which provide great features like binding support, observers, computed properties, and subclassing.


### Differences from Ruby on Rails

A common misconception about Ember.js' MVC implementation is that it must be similar to that of Ruby on Rails. This is incorrect. 

The reason for this difference is due to Ruby on Rails being a server-side framework, where as Ember is a client-side framework.[1]

Ember runs in the browser, so it can detect and respond to browser events such as mouse clicks, finger taps, scrolling, key presses, etc. The view objects that recieve these events can then send them to controller objects, which can work with the data model to save changes. Everything happens client-side, in the browser, and ember-data takes care sending and receiving appropirate data to and from the server API.

![Ember.js MVC Diagram](/images/ember_mvc/embermvc.png)

Rails, on the otherhand, runs on the server. As such, it can only comminicate with the client through HTTP requests. Rather than recieve direct user events, the server takes HTTP requests as input (GET /, POST /user/1, etc.), reads the route and maps it to a controller action. The controller then interacts with the model and the view templates to contruct response (usually in the form of an HTML document) to send back over HTTP. The user is always interacting with what is basically a flat page, assembled on demand for them based on their requests.

![Rails MVC Diagram](/images/ember_mvc/railsmvc.png)

It is important to keep this difference in mind when architecting your applications. 

[1] Alought it is possible to use Ember.js server-side, that is beyond the scope of this guide.
