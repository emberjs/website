## Core Concepts

To get started with Ember.js, there are a few core concepts you
should understand. 

We want developers to be able to build ambitiously large web
applications that are competitive with native apps. To do that, they
need both sophisticated tools *and* the right vocabulary of concepts to
help them communicate and collaborate.

We've spent a lot of time borrowing liberally from ideas introduced
by native application frameworks, like Cocoa. When we felt those
concepts were more hindrance than help–or didn't fit within the unique
constraints of the web–we turned to other popular open source projects
like Ruby on Rails and Backbone.js for inspiration.

Ember.js, therefore, is a synthesis of the powerful tools of our native
forebears with the lightweight sensibilities of the modern web. 

### Concepts

#### Templates

A **template**, written in the Handlebars templating language, describes
the user interface of your application. In addition to plain HTML,
templates can contain:

* **Expressions**, like `{{firstName}}`, which take information from
  controllers, place them into HTML, and automatically keep them
  updated.
* **Outlets**, which are placeholders for other templates. As your user
  moves around your app, different templates can be plugged into the
  outlet by the router. You can put outlets into your template using the
  `{{outlet}}` helper.
* **Views**, which are responsible for handling user events. You can put
  views into your templates using the `{{view}}` helper.

#### Views

A **view** is embedded inside a template and is responsible for
translating _primitive events_ (like clicks, taps, and swipes) into
_semantic events_ that have meaning to your application and are sent to
the router.

For example, a view might translate a `click` event into the more
meaningful `deleteItem` event, which would be sent to the router. The
behavior of your app in response to that event would depend on the
currently active route handlers.

#### Controllers

A **controller** is an object that stores _application state_. Templates
are connected to controllers and translate the current state of the
controller into HTML.

Controllers often act as representations of models** for templates. In
these cases, the controller passes the properties of the model to the
template, and can transform or augment the model to present it in a way
the template is expecting.

#### Models

A **model** is an object that stores _persistent state_. This is the
data that your application operates on and what gives it value to your
users.  These objects are usually loaded from your server, then saved
back when changes are made on the client.

Usually, you'll use Ember Data to translate the _raw JSON payloads_
delivered by your API server into full-blown Ember.js objects with
associations, computed properties, and more.

#### Router

The **router** is the object responsible for _managing application state_.

When your user starts your application, it will look at the URL and make
sure that the right set of templates is displayed, as well as pairing
those templates with the right model objects.

As you move around the different states of your application, the
router automatically keeps the URL up-to-date. Users can save the URL
and re-enter the application at this state later, or share the app in
its current state with others.

---

These are the core concepts you'll need to understand as you develop your Ember.js app. If you stick to these basics, we've designed the system to scale up in complexity, so that adding new functionality doesn't require you to go back and change the entire system.

We think it's important that multiple developers can look at a problem
and, using the patterns of the framework, arrive at the same solution.
Now that you understand the roles of these objects, you're equipped to
dive deep into Ember.js and learn the details of how each of these
individual pieces work.
