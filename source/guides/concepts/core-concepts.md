To get started with Ember.js, there are a few core concepts you
should understand. 

Ember.js is designed to help developers build ambitiously large web
applications that are competitive with native apps. Doing so requires
both new tools and a new vocabulary of concepts. We've spent a lot of
time borrowing ideas pioneered by native application frameworks like
Cocoa and Smalltalk.

However, it's important to remember what makes the web special. Many
people think that something is a web application because it uses
technologies like HTML, CSS and JavaScript. In reality, these are just
implementation details.

Instead, **the web derives its power from the ability to bookmark and
share URLs.** URLs are the key feature that give web applications
superior shareability and collaboration. Today, most JavaScript
frameworks treat the URL as an afterthought, instead of the primary
reason for the web's success.

Ember.js, therefore, marries the tools and concepts of native
GUI frameworks with support for the feature that makes the web so
powerful: the URL.

### Concepts

#### Templates

A **template**, written in the Handlebars templating language, describes
the user interface of your application. Each template is backed by a
model, and the template automatically updates itself if the model changes.

In addition to plain HTML, templates can contain:

* **Expressions**, like `{{firstName}}`, which take information from
  the template's model and put it into HTML.
* **Outlets**, which are placeholders for other templates. As users
  move around your app, different templates can be plugged into the
  outlet by the router. You can put outlets into your template using the
  `{{outlet}}` helper.
* **Components**, custom HTML elements that you can use to clean up
  repetitive templates or create reusable controls.

#### Router

The **router** translates a URL into a series of nested templates, each
backed by a model. As the templates or models being shown to the user
change, Ember automatically keeps the URL in the browser's address bar
up-to-date.

This means that, at any point, users are able to share the URL of your
app. When someone clicks the link, they reliably see the same content as
the original user.

#### Components

A **component** is a custom HTML tag whose behavior you implement using
JavaScript and whose appearance you describe using Handlebars templates.
They allow you to create reusable controls that can simplify your
application's templates.

#### Models

A **model** is an object that stores _persistent state_. Templates are
responsible for displaying the model to the user by turning it into
HTML. In many applications, models are loaded via an HTTP JSON API,
although Ember is agnostic to the backend that you choose.


#### Route

A **route** is an object that tells the template which model it should
display.

#### Controllers

A **controller** is an object that stores _application state_. A
template can optionally have a controller in addition to a model, and
can retrieve properties from both.

---

These are the core concepts you'll need to understand as you develop
your Ember.js app. They are designed to scale up in complexity, so that
adding new functionality doesn't force you to go back and refactor major 
parts of your app.

Now that you understand the roles of these objects, you're equipped to
dive deep into Ember.js and learn the details of how each of these
individual pieces work.
