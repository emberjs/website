## Core Concepts

To get started with Ember.js, there are a few *core concepts* you'll
want to understand. 

We want developers to be able to build ambitiously large web
applications that are competitive with native apps. To do that, they
need both sophisticated tools *and* the right vocabulary of concepts to
help them communicate and collaborate, on teams or across the Internet. 

We've spent a lot of time borrowing liberally from ideas introduced
by native application frameworks, like Cocoa. When we felt those
concepts were more hindrance than help–or didn't fit within the unique
constraints of the web–we turned to other popular open source projects
like Ruby on Rails and Backbone.js for inspiration.

Ember.js, therefore, is a synthesis of the powerful tools of our native
forebears with the lightweight sensibilities of the modern web. 

### Concepts

#### Templates

A **template**, described using the Handlebars.js templating language, describes the user interface of your application. In addition to plain HTML, templates can embed:

* **Expressions**, like `{{firstName}}`, which take information from **controllers**, place them into HTML, and automatically keep them updated.
* **Outlets**, which are placeholders for other templates. As your user moves around your app, different templates can be plugged into the outlet by the router. You can put outlets into your template using the `{{outlet}}` helper.
* **Views**, which are responsible for handling user events.

#### Views

A **view** is embedded inside a template and is responsible for translating _primitive events_ (like clicks, taps, and swipes) into _semantic events_ that have meaning to your application and are sent to the **router**.

For example, a view would translate a `click` event into the more meaningful `deleteItem` event, which would be sent to the router. The behavior of your app in response to that event would depend on which state it's in.

#### Controllers

A **controller** is an object that stores _application state_. Templates are connected to controllers and translate the current state of the controller into HTML.

Controllers often act as _representations of **models** for templates_. In these cases, the controller passes the properties of the model to the template, and can transform or augment the model to present it in a way the template is expecting.

#### Models

A **model** represents _persistent state_. This is the stuff your users really care about—the data that is loaded from your server, then saved back when changes are made on the client. Models encapsulate the business logic of your application.

Usually, you'll use Ember Data to translate the _raw JSON payloads_ delivered by your API server into full-blown Ember.js objects with associations, computed properties, and more.

#### Router

The **router** is the object responsible for _managing application state_.

Client-side applications have lots of state that is changing constantly as your user clicks around. Managing the state and making sure you don't enter a _bad state_ is one of the hardest problems developers face when building these apps.

For example, imagine we are writing a web app for managing a blog. At any given time, we should be able to answer questions like: _Is the user currently logged in? Are they an admin user? What post are they looking at? Is the settings screen open? Are they editing the current post?_

Most other frameworks require you to deal with this stuff manually, often spreading out the current state among different objects in an ad hoc way. This leads to all kinds of complex edge cases you will need to address; one of the most infuriating bugs is when you find yourself with two properties that should be mutually exclusive. For example, we've all run into bugs where the `loggedIn` flag is set to `true` but somehow there is no `currentUser`!

In Ember.js, each _logical state_ in your application is represent by an _object_. All of the questions we asked above— _Are we logged in? What post are we looking at?_ —are represented by a discrete object, so it's *impossible* to ever be in the *wrong* state.

The _current state_ of your application can change for one of two reasons:

1. The user interacted with a _view_, which generated an event that caused the current state to change.
2. The URL in the browser changed (or was loaded for the first time).

Every state in your router is also associated with a URL. When what's on screen changes, the browser URL updates *automatically*.

When your application changes to a new _state_, the state may do one or more of the following:

1. Change the template on screen, or place a new template into an existing _outlet_.
2. Connect the template to a _controller_.
3. Configure a controller, including telling the controller that it should represent a _model_.

---

These are the core concepts you'll need to understand as you develop your Ember.js app. If you stick to these basics, we've designed the system to scale up in complexity, so that adding new functionality doesn't require you to go back and change the entire system.

Like in Cocoa and Ruby on Rails, we think it's important that multiple developers can look at a problem and come up with solutions that are more or less the same in design. Now that you understand these basics, you're equipped to dive deep into Ember.js and learn the details of how each of these individual pieces work.
