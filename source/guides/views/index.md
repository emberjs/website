Because Handlebars templates in Ember.js are so powerful, the majority
of your application's user interface will be described using them. If
you are coming from other JavaScript libraries, you may be surprised at
how few views you have to create.

Views in Ember.js are typically only created for the following reasons:

* When you need sophisticated handling of user events
* When you want to create a re-usable component

Often, both of these requirements will be present at the same time.

### Event Handling

The role of the view in an Ember.js application is to translate
primitive browser events into events that have meaning to your
application.

For example, imagine you have a list of todo items. Next to each todo is
a button to delete that item:

![Todo List](/guides/views/images/todo-list.png)

The view is responsible for turning a _primitive event_ (a click) into a
_semantic event_: delete this todo! These semantic events are first sent 
up to the controller, or if no method is defined there, your application's 
router, which is responsible for reacting to the event based on the 
current state of the application.


![Todo List](/guides/views/images/primitive-to-semantic-event.png)
