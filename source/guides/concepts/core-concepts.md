## Core Concepts

To get started with Ember.js, you should understand the conceptual vision and
the core building blocks of an Ember app.

Ember.js is designed to help developers efficiently build ambitiously
large web applications which perform like native apps. To do this, we've
spent a lot of time bringing ideas pioneered by native application
frameworks like Cocoa and Smalltalk to the web.

It's important to remember, however, what makes the web special. Many
people think that something is a web application because it uses
technologies like HTML, CSS and JavaScript. In reality, these are just
implementation details.

**The web derives its power from the ability to bookmark and
share pages.** URLs are the key feature that give web applications this
superior shareability and collaboration. Unfortunately, most JavaScript
frameworks treat the URL as an afterthought, instead of the primary
reason for the web's success.

**Ember.js marries the tools and concepts of native GUI frameworks with
support for the feature that makes the web so powerful: the URL.**

### Building Blocks of An Ember Application

The point of a framework is to give you well-defined places to express
your application logic.  In Ember, most of your app logic will be
partitioned between the following six types of objects:

#### Templates

A **template**, written in the Handlebars templating language, describes
the user interface of your application. It consists of HTML and the Handlebars
constructs described below.  A template is often backed by a model, and will
automatically update when the model changes.

Handlebars constructs include:

* **Expressions**: like `{{firstName}}` (where firstName is a property of a model)
  allow you to easily display your models in HTML.
* **Helpers:** perform a variety of powerful functions. Helper such as `{{#if}}` and
  `{{#each}}` give your templates basic flow control, while others such as `{{outlet}}`,
  `{{render}}` and `{{template}}` allow you to easily compose and reuse templates.
  In addition to Ember's rich set of built-in helpers, you can create your own.
* **Components**: custom HTML elements that you can use to clean up
  repetitive templates or create reusable controls.

#### Models

A **model** is an object that stores _persistent state_. Models generally
don't concern themselves with display logic - this responsibility
is offloaded to other Ember constructs, particularly templates. In many
applications, models are loaded via an HTTP JSON API (though Ember
is backend-agnostic).

#### Router

The **router** maps URLs to handlers, i.e. **routes**.

#### Routes

A **route** generally corresponds to a URL and coordinates what gets shown
to the user.  Its responsibilities include retrieving models, updating
controllers, and choosing which templates to display.

#### Controllers

A **controller** is an object that stores _application state_. Controllers
are often used to decorate models, providing the template with computed or
formatted values which aren't part of the model's persistent state per se.
They often track state such as whether a model is being edited.  Along with
routes and views, they can also handle user-generated events

#### Views

Though Handlebars templates will capture most your UI logic, views
facilitate handling sophisticated interactions.  They also allow you to
create reusable components. Ember comes with a number of reusable
views for wrapping HTML elements such as textfields, checkboxes and selects.

----
These are the core objects you will use to develop Ember.js apps.
They are designed to separate concerns and manage complexity, so that
adding new functionality doesn't force you refactor major parts of your app.

Now that you have been introduced to the basic Ember building blocks, the next
sections of the guide will describe how to use them in greater depth.
