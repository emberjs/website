Your First Ember App
====================

First things first: create yourself a project structure.  Let's call
your app `hello`, just for originality's sake.

The directories you want will be:

    hello/
    hello/js
    hello/js/libs
    hello/css

For this example application, we'll assume that you're going to
download the dependencies and host them locally.  Once you've built
your app and want to deploy it, you might find it better to replace
these locally-hosted files with remote-hosted versions to reduce your
bandwidth costs, but locally-hosted is easier to get off the ground
with.

Next, we need to collect these dependencies.  They are:

- Jquery.  We'll be using version 1.7.2, available from
  [here](http://code.jquery.com/jquery-1.7.2.min.js).
- Handlebars. Version 1.0.rc.2, available
  [here](https://raw.github.com/wycats/handlebars.js/1.0.rc.2/dist/handlebars.js).
- Html5.js.  This isn't versioned, and fingers crossed the version
  [here](http://html5shiv.googlecode.com/svn/trunk/html5.js) will
  still work for you when you read this.
- Ember.js itself. The current version at time of writing is
  1.0.0-pre4, available
  [here](https://raw.github.com/emberjs/ember.js/release-builds/ember-1.0.0-pre.4.js).

Download each of these files into the `hello/js/libs` directory.  You should now have:

    hello/js/libs/jquery-1.7.2.min.js
    hello/js/libs/handlebars.js
    hello/js/libs/html5.js
    hello/js/libs/ember-1.0.0-pre.4.js

Your application code, where the JavaScript which comprises the logic
of your app will be, will go into `hello/js/app.js`.  Create an empty
file there for now.

`index.html`
------------

To contain and launch your app, you'll need a `hello/index.html` file.  A minimal
starting point is this:

    <!doctype html>
    <!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]--> <!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]--> <!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]--> <!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

      <title>Hello</title>
      <meta name="description" content="My First Ember.js App">
      <meta name="author" content="Your Name Here">

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <!--[if lt IE 9]>
      <script src="js/libs/html5.js"></script>
      <![endif]-->
    </head>
    <body>
      <script type="text/x-handlebars">
        <h1>Hello from Ember.js</h1>
      </script>

      <script src="js/libs/jquery-1.7.2.min.js"></script>
      <script src="js/libs/handlebars-1.0.0.beta.6.js"></script>
      <script src="js/libs/ember-1.0.0-pre.2.min.js"></script>
      <script src="js/app.js"></script>
    </body>
    </html>

Copy this verbatim into `hello/index.html`.

By way of brief explanation, let's break that down into its
significant parts so that we can separate the parts which are critical
to ember.js, and which parts are boilerplate needed for any modern
HTML page.

I'll do this out of order, so you can see the most interesting parts
first.

    <script type="text/x-handlebars">
      <h1>Hello from Ember.js</h1>
    </script>

This is the only part of this file which is specific to our
application.  It's the
[application template](application/the-application-template), which is
the first thing ember.js will output to the page for us.


    <script src="js/app.js"></script>

This loads our code, which as yet does nothing.


The remainder is concerned with setting up a valid html5 file, and
loading libraries we need.  Feel free to skip this on first reading,
but it's all good background knowledge if anything looks unfamiliar.


    <!doctype html>
    <!--[if lt IE 7 ]> <html lang="en" class="ie6"> <![endif]--> <!--[if IE 7 ]>    <html lang="en" class="ie7"> <![endif]--> <!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]--> <!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->

Doctype declaration and html open tag.  If you don't care about
Internet Explorer, this could be replaced by:

    <doctype html>
    <html lang="en">

for precisely the same effect.

      <meta charset="UTF-8">

Tells the browser that we know what we're doing, character-set-wise,
and that it doesn't have to guess.

      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

Tells Internet Explorer (after version 8) that it should use the
highest rendering mode available to it.  This means that users with IE
9 will benefit from all the facilities it has, without risking that it
will fall back to an earlier compatibility mode.

      <title>Hello</title>
      <meta name="description" content="My First Ember.js App">
      <meta name="author" content="Your Name Here">

Hopefully there should be no surprises here.

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

This is used to limit the rendering of the page to the screen width
for mobile browsers.

      <!--[if lt IE 9]>
        <script src="js/libs/html5.js"></script>
      <![endif]-->

If we have a less recent version of Internet Explorer, this
conditional script tag will provide certain html5 facilities we
wouldn't otherwise have access to.


      <script src="js/libs/jquery-1.7.2.min.js"></script>
      <script src="js/libs/handlebars-1.0.0.beta.6.js"></script>
      <script src="js/libs/ember-1.0.0-pre.2.min.js"></script>

Finally, these load the libraries we need for ember to work before we
load the `hello/js/app.js` file.


`app.js`
--------

To prove that we've got all our paths right, closed all our open tags
and generally given ourselves a solid base to build from, just put
this line into `hello/js/app.js` for the moment:

    window.App = Ember.Application.create();

Now, open `hello/js/index.html` in a web browser.  You should see
"Hello from Ember.js" emblazoned across the window in glorious \<h1\>.


Your First Controller (and Template)
------------------------------------

Controllers in Ember.js are those objects which handle *application
state*.  They present data for Templates to render.  We haven't so far
got a controller, nor would our template do anything with it if we
did.  Now, in `hello/index.html`, make the application template look
like this:

    <script type="text/x-handlebars">
      <h1>Hello, {{you}}!</h1>
    </script>

Simple enough: this will replace the `{{you}}` with something named
`you`, and we're in the application template so that data must come
from the application controller.

Add this to `hello/js/app.js`, after the `window.App` line:

    App.ApplicationController = Ember.Controller.extend({
      you: "Your Name Here"
    });

Refresh `hello/index.html` in the browser, and you'll see that the
value we marked as `you` in our new `App.ApplicationController` is dropped
into the template where we'd expect.

It's important to note that the name `ApplicationController` is magic:
every Ember.js application has one, and it's effectively the
entry point for your application.

The name `App` is *not* magic.  It's just a namespace, and you can
call your app's namespace whatever you like.  I've picked `App` here
as a reasonable default.


Interactivity
-------------

In Ember.js, Actions communicate things the user does to the
controller.  Let's say we want a button which chops one letter at a
time off the `you` value we created before.  The function to do this
is a JavaScript builtin - `String.slice()` - but we need to hook it up
so the controller presents it in a way that the template can get at
it.

We do this by attaching it as a method to the controller.  Replace the
current `ApplicationController` definition on `hello/js/app.js` with
this:

    App.ApplicationController = Ember.Controller.extend({
      you: "Your Name Here",
      chompchompchomp: function() {
        this.set( "you", this.you.slice(1) );
      }
    });

Now, we just need to hook up the template.  Add this below the
`<h1>...</h1>` tags in `hello/index.html`:

    <button {{action "chompchompchomp"}}>Chomp</button>

Refresh `hello/index.html` again, and you'll see we now have, as
expected, a button underneath our text.  Click it, and with each click
the string gets shorter.

Again, there's magic going on here.  Note what we haven't had to do:
we haven't had to access the DOM, or wire up an event handler.
Ember.js has done all that for us.  Our initial `{{you}}` in the
template, combined with the `you: "..."` in the controller definition,
are enough for Ember.js to create a connection that we can take
advantage of - in this case, by calling the `set(...)` function to
trigger updating both the value in the controller, and the displayed
value in the DOM.  If you haven't come across the term "data binding"
before, this is what it means.


Swapping out whole templates
----------------------------

It's all very well being able to change strings, but often you'll want
to change large chunks of the DOM at once.  Ember has the concept of
Routes for controlling what exactly gets rendered.  If you're familiar
with Rails or Sinatra routes, Ember routes are somewhat similar, but
different enough to catch you out.

As a simple example, let's say that we want to be able to flip between
two ways of displaying a string: monospaced and italic.

Replace the entire content of `hello/js/app.js` with the following:

    window.App = Ember.Application.create();

    App.you = "Your Name Here";

    App.Router.map(function(){
      this.route("italic");
    });

Now, Replace the template in `hello/index.html` with these templates:

    <script type="text/x-handlebars">
      <h1>Text Formatter</h1>
      {{outlet}}
    </script>

    <script data-template-name="index" type="text/x-handlebars">
      {{#linkTo italic}}Italicise{{/linkTo}}
      <br>
      Your monospaced text is: <div><code>{{App.you}}</code></div>
    </script>

    <script data-template-name="italic" type="text/x-handlebars">
      {{#linkTo index}}Monospace{{/linkTo}}
      <br>
      Your italicised text is: <div><em>{{App.you}}</em></div>
    </script>

Refresh the browser.  You'll see that you first have a link called
`Italicise`, with monospaced text.  Click the link, and the `italic`
template gets rendered: the link text changes to `Monospace`, and the
text is italicised.

Points to note:

- We've added an `{{outlet}}` declaration to the first template - the
  application template.  This tells Ember where to render the templates
  we're interested in swapping out.
- The next two templates have different `data-template-name`
  attributes: `index` and `italic`.  The first is magic: a template
  called `index` will be loaded into the application template's
  `{{outlet}}` first.  The second name is arbitrary.
- Each `linkTo` call references the name of the other template.
- Importantly, the references to `{{you}}` in the template have
  changed to `{{App.you}}`. Since we want both templates to render
  with the same data, we need to make a reference to a shared
  location, and the `App` namespace is globally visible.  Yes, this
  means we've created a global variable.  We'll fix that in a bit.

You might well be asking "Well, where did our `ApplicationController` go?"
And you would be right to wonder.  The answer is that if you're not
doing any customisation, `App.ApplicationController` doesn't need to
be explicitly defined.  One gets created for you automatically.

The second oddity is our `App.Router.map()` call.  Why, you might
think, does it only define an `italic` route?  Surely an `index` route
would need to be defined as well?  Again, in the case of the `index`
route, if you don't need to customise it, you don't need to define
one.  As with `ApplicationController`, every app needs one, so it's
created for you if you don't specify it.

In the same vein, you have probably spotted that our application
template doesn't have a `data-template-name` attribute.  Again, this
is implicit.  This:

    <script type="text/x-handlebars">

is identical to this:

    <script data-template-name="application" type="text/x-handlebars">

As an aside, watch what happens to the URL when you click each link.
Each click updates the URL, and this means your back button still
works.


Operating on shared data
------------------------

Let's go back to our `chompchompchomp` button.  Say we want to bring
that back, and make sure that both the `index` and the `italic` routes
render the same, chomped text.

Make your application template look like this:

    <script type="text/x-handlebars">
      <h1>Text Formatter</h1>
      <div><button {{action "chompchompchomp"}}>Chomp</button></div>
      {{outlet}}
    </script>

Now, bring the ApplicationController back, with a modified
`chompchompchomp` method:

    App.ApplicationController = Ember.Controller.extend({
      chompchompchomp: function() {
        App.set( "you", App.you.slice(1) );
      }
    });

Refresh the browser, and click the `Chomp` button.  As before, the
text shortens.  Now, click the `Italicise` link: you'll see that the
shortened string is printed in italic.

This magic is possible because `App` is an instance of
`Ember.Application`, which in turn is an `Ember.Observable`. This
mixin provides the `set` method for pushing change events through
Ember.js' object graph.

By way of comparison, replace the `App.set(...` line with the following:

    App.you = App.you.slice(1);

This is a direct property assignment, and doesn't trigger any events.
Reload, and click `Chomp` a couple of times.  It looks like nothing is
happening, but now click `Italic`: you'll see that the chomped string
is displayed.  This shows that the data *is* being modified, and it's
redrawn each time you click the links.
