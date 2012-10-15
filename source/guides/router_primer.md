# Building Applications with Ember.js


## Introduction

<!--- {{{1 -->

Using the [Ember.Router][EmberRouter] is the preferred pattern for building large
applications in [Ember.JS][EmberSite].  Ember's approach is to conceive
of your application as a collection of states which can be accessed via
both unique internal specifiers (a "route path") _as well as_ by URL locations
that "route" to those states.

This approach has many advantages.  Perhaps the most important advantage is
that by employing the [State Machine][StateMachine] pattern, your application
remains easy to understand, expand, and debug.

This guide is designed to help the reader accomplish the following:

  * Understand key terminology
  * Set up an [Ember.Router][EmberRouter] in a series of small,
    incremental improvements upon a minimal, viable application

<!--- }}}1 -->

## Definitions

<!--- {{{1 -->

To prevent confusion, this guide will define the following key terms.

### Navigation

Navigation is (1) the act of following a link whose `href` attribute
corresponds to a URL or (2) entering a URL into some sort of HTTP
processing application.  Navigation occurs when:

* Lauren types `http://emberjs.com` into her browser
* Erik writes a Ruby script that accesses an application's RESTful
  API at `http://example.com/api/widgets/list`

### State

A *State* is a deterministic configuration of the application.  It can be
imagined as a set of variables, a set of rendered views, a set of instantiated
objects, etc.  `State`s are collected into [StateManager][StateManager]s.

### State Manager

A container that holds an arbitrary number of unique states.

### Router

While Ember supports having many `StateManagers` that address a wide variety
of purposes (handling what's in a status console, toggling lightbox effects,
etc.), a StateManager dedicated to bringing about certain application states is
a Router.  Fittingly, in the Ember source, a `Router` is a sublcass of
`StateManager`.

### Route

Just as a `Router` is a special case of a `StateManager`, a `Router`'s
consitituent `State`s are given the special designation of `Route`.

### RoutePath 

A `Route` is referred to by a unique specifier called a routePath.  Ember
*routePaths*  look like `root.index` or `posts.post.comment`.

### Routing

Routing is the act of mapping a URL onto a routePath.  Thus a correspondence
between URL and State emerges: `http://example.com/#/posts` would (sensibly)
map to `posts.index`.

### Routable URL

A routable URL is a URL that triggers a transition to a Route.  In Ember, by
default, this looks like `http://example.com/#/posts`,
`http://localhost:4567/#/cars`, `http://localhost:4567/#/post/show/1`.  

The relevant part of the url is the part that is featured after the `#/`.  In
the descriptions above, the Routable URLs will trigger the `Router` to change
state to either `posts`, `cars`, or `post.show`.  If the use of this
"hash-slash" delimiter is not desirable, it can easily be
changed<sup>[1](#location-manager)</sup>.

### Nesting

As mentioned previously, Routes can be nested.  When a route has sub-routes it
is called the *parent* route and its sub-routes are called *child* routes and /
or *leaf* routes.

**Parent routes are not-routable**.  Their children bear the responsibility of
constructing the state.  Otherwise said, all routable states **must be** leaf
routes.  A typical RoutePath for a nested route would be `post.show` and its
matching URL would be `#/post/show/1`.

<!--- }}}1 -->

## Intersection of Navigation URLs, Routes, and States

Given that there is a correspondence between navigational endpoints (URLs),
their routePaths, and those routes' "states," it is obvious that an Ember
application that uses the `Router` is a [State Machine][StateMachine] that uses
routePaths and / or URLs to change into the states.

## Summation of Definitions' Interplay and Looking Ahead

<!--- {{{1 -->

Given the preceeding definitions, we should be able to imagine an Ember
application that uses the `Router`.  While the exact how-to will come next, if we
wanted to talk about shoes and cars, we would imagine an application that does
something when handed URLs like:

  * http://example.com/app/#/shoes
  * http://example.com/app/#/shoe/blue-suede
  * http://example.com/app/#/cars

Given the association between a routable URL to a routePath thence to a
Route, it is logical to expect that we will build a Route that looks, as
a naive implementation, like:

    carsRoute: {
     route: '/cars'
    }

We also know that `Route`s are aggregated into a `Router`.  The only piece
missing, therefore, is something that translates the routable URL and then
loads up the applicate state associated with the routable URL's `Route`.  This
process of turning a string representation of application state is known as
"deserializing."  The reverse, representing the state of the application as a
string, which happens to be a URL that can conveniently be shared or
bookmarked, is known as "serializing."  As has been said elsewhere, "URLs are just a useful side effect of state change([_Source_][Trek]"

The `Router` is both the collection of `Route`s, but also bears the
responsibility of creating the necessary Model, Controller, View and instances
required to support a given set of functionality in a Route.

In the subsequent sections, therefore, this guide will demonstrate how to
construct a Router, an abstraction that:

* Defines a collection of `State`s, i.e. `Route`s
* Puts the browser into those states based on the routable URL
* Delegates model, controller, and view construction to its contained routes

With this general groundwork in place, we shall now undertake a series of
exercises that will create a basic routable application.

<!--- }}}1 -->

## Practical Application

### Instructional Method

<!-- {{{1 -->

#### Text

<!-- {{{2 -->

This guide attempts to allow the reader to follow the incremental building-up
of a router-driven application.  You should be able to follow along on your
tablet on the train and, with some focus, follow along.  As such the code is
*frequently* re-listed.

<!-- }}}2 -->

#### Hands-on Code

<!-- {{{2 -->

If you are in a situation where you have access to a computer, this guide also
has references to a [GitHub](http://github.com) project,
[Ember-Router-Application-Guide-Code][ERGC], whose commits match each of these
incremental steps.  As such, you can clone the repository, check out the commit
under discussion, adjust the code, try things out, and then move to the next
step.  Simply clone the project, follow its `README.md` you will have, in the
`workspace` subdirectory, the code that I demonstrate in the text listings.

In each of the text listings I will include GitHub URLs that show the diffs in
the code so that each step is easily digested.  GitHub links are noted by links
with the text content:  _Diff View_.

The code is housed in a minimal application framework built on Ruby and Sinatra
called [Halbert](https://github.com/sgharms/halbert).  If the terms "git,"
"Sinatra," and "Ruby" are all confusing to you, feel free to merely follow
along with the text and / or copy-and-paste the code listings into your
development environment.

<!-- }}}2 -->

<!-- }}}1 -->

### Step One: Minimum Non-Viable Router

<!--- {{{1 -->

[_Diff View_][StepOne]

```javascript
window.App = Ember.Application.create({
  ready: function(){
    console.log("Created App namespace");
  },

  Router: Ember.Router.extend({
  })
});

App.initialize();
```

This step:

1.  **Establishes an Ember application**:  `window.App = Ember.Application.create` creates an Ember.Application called `App`.  Creating this App object:
  1.  Provides a single location for all objects associated with this application so as to [avoid polluting the global namespace](https://www.google.com/search?q=don't+pollute+the+global+namespace) ([_Source_][Trek])
  1.  Creates a single listener for each user event (e.g. 'click') and [controls event delegation](https://www.google.com/search?q=event+delegation) ([_Source_][Trek])
1.  **Provides some diagnostic logging**:  Taking from the jQuery playbook, when the document is ready, the logger message fires
1.  **Declares our `Router` class**:  A property called `Router` is declared on `App`.  It is an instance of `Ember.Router` and will be the main area of changes in this guide

Refresh your browser that's viewing this code and you will receive the following error in your console:

<img src="/images/routing-primer/app-without-root-route.png">

An error appears:   `Uncaught Error: assertion failed: Failed to transition to
initial state "root" `.

As a legacy of Ember's history and inheritance chain, `State` is a synonym for
`Route` (see discussion above).  As such, the error message can be read as
saying that the application could not find an `Ember.Route` called `root`.  The
Router class of of an Ember application **must** contain an Ember.Route called
`root`.  Let's add it.

The amended code will look like the following:

[_Diff View_][StepOneOne]

```javascript
window.App = Ember.Application.create({
  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    root:  Ember.Route.extend({
    })
  })
});

App.initialize();
```

Refresh the browser.

<!--- }}}1 -->

### Step Two: Minimum Non-Viable Router Part II

<!--- {{{1 -->

Running the previous code *again* produces an error:  `Uncaught Error:
assertion failed: ApplicationView and ApplicationController must be defined on
your application` _but also_ shows signs of improvement: we see the
`console.log` message.

<img src="/images/routing-primer/no-app-controller-defined.png">

An `Ember.Application` using the `Router` **must** define **both**
`ApplicationController` and `ApplicationView`.  Why this is so will be made
clear multiple times throughout this guide.

These definitions are simple:

[_Diff View_][StepThree]

```javascript
ApplicationView: Ember.View.extend(),
ApplicationController: Ember.Controller.extend(),
```

Place these two declarations on the `App` object and refresh.

<!--- }}}1 -->

### Step Three: Minimum Viable Router

<!--- {{{1 -->

Ember no longer complains about missing critical data, **but** there are some
important modifications that should be made to move from "doesn't throw
exceptions" to a solid baseline.

#### Add an 'index' property

<!--- {{{2 -->

While a `Route` called `root` is the only thing **required** to boot up a
`Router` based application, that `Route` should be a "meta-Route," a Route that
holds Routes.  By convention the Route that `root` holds, that corresponds to
the base state of the application, should be called `index.` **The root Route
cannot be made routable.**  

[_Diff View_](https://github.com/sgharms/Halbert/commit/290ff2c636b6dc4218301967b020f1e48e9cf221)

<!--- {{{3 -->

```javascript
window.App = Ember.Application.create({

    ApplicationView: Ember.View.extend(),
    ApplicationController: Ember.Controller.extend(),

    Router: Ember.Router.extend({
      root:  Ember.Route.extend({
        index:  Ember.Route.extend({
          route:  '/'
        })
      })
    })
});
App.initialize();
```

<!--- }}}3 -->

<!--- }}}2 -->

#### Add a template to the ApplicationView

<!--- {{{2 -->

[_Diff View_](https://github.com/sgharms/Halbert/commit/935bb45542da2c2143d5e45b5eec10a7c3d3b361)

So that we start to see some visual feedback besides `console.log` messages, a
template property should be added to the `ApplicationView` class.

<!--- {{{3 -->

```javascript
window.App = Ember.Application.create({

    ApplicationView: Ember.View.extend({
      templateName:  'application'
    }),
    ApplicationController: Ember.Controller.extend(),

    Router: Ember.Router.extend({
      root:  Ember.Route.extend({
        index:  Ember.Route.extend({
          route:  '/'
        })
      })
    })
});
App.initialize();
```

<!--- }}}3 -->

This requires the addition of a template called 'application':

<!--- {{{3 -->

```handlebars
<script type="text/x-handlebars" data-template-name="application">
  <h1>Hi Ember</h1>
</script>
```

<!--- }}}3 -->

<!--- }}}2 -->

#### Logging and Debugging

<!--- {{{2 -->

Every `Ember.Route` fires an `enter` and `exit` callback.  Here is a suitable
place to insert logging and debugging data as has already appeared in this
application.

Setting the `enableLogging` property to `true` within the Router also helpfully
display's the Router's decision-making process.  When the browser's debug
console is open, the router will print helpful error messages beginning with
`STATEMANAGER`.

[_Diff View_]( https://github.com/sgharms/Halbert/commit/431b22657496f9c2775281e023ff864c3cf2ea94)

Lastly, as a point of formatting, Ember makes *liberal* use of vertical whitespace.  Just as vertical whitespace helps
separate logical "paragraphs" of operations in code, so too is it appropriate
to use vertical whitespace to create logical groupings of controllers and
views.  

<!-- }}}2 -->

An initial load of this application looks like the following:


<figure>
  <img src="/images/routing-primer/initial-load-router.png">
</figure>
<!--- }}}2 -->

<!--- }}}1 -->

## Step Four:  Application Construction in Ember

<!--- {{{1 -->

At this point one _technically_ has a functioning Router-based application.  The next steps hinge less on the Router, and more on Ember's approach to application construction.  These approaches become manifested in the Router's syntax as more advanced applications are built.

### Views

<!--- {{{2 -->

Views in Ember are responsible for:

* Determining the structure of a section of the application's rendered HTML, e.g. "this view should be of class person-name"
* Responding to delegated user events, e.g. "fade-in on mouseOver"
 
All views have a rendering context.  Inside of a View's template file, usage of `{{property}}` is evaluated against that context.  It is **not** the case that the view holds the context.  

<!--- }}}2 -->

### ApplicationView is Special

<!--- {{{2 -->

This view is the root view of all other views.  All other views will be
injected into it via a template concept called an `{{outlet}}` which will be
discussed later.  This is why, as demonstrated earlier, Ember considers it a
raise-worthy problem when it does not find the `ApplicationView` (or its partner,
`ApplicationController`).

<!--- }}}2 -->

### The Default Context For a View Is Its Controller

<!--- {{{2 -->

Given the preceeding discussion, it stands to reason that the default context
for ApplicationView would be ApplicationController.  As such, a value set in
ApplicationController, when referenced by handlebars inside of the
ApplicationView's template, should render to the screen.

In the following code listing the view renders content from its context _as
well as_ uses the context to determine whether a class should be applied to the
view.  

Make the following adjustments to your code.

[_Diff View_](https://github.com/sgharms/Halbert/commit/333059d11fda775794242b93091d34ed5ae461b5)

<!--- {{{3 -->

```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),
  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,
    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/'
      })
    })
  })
});

App.initialize();
```
<!--- }}}3 -->

<!--- {{{3 -->

```handlebars
<script type="text/x-handlebars" data-template-name="application">
  <h1>Hi Ember</h1>
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
</script>
```

<!--- }}}3 -->

The result is the following:

<figure>
  <img src="/images/routing-primer/contexts-and-content.png">
</figure>

Information is shared between the ApplicationView and the ApplicationController
The View stays focused on presentation while the Controller stays focused on
domain logic.  By setting `classNames` on the View we affect the CSS classes applied to the `Ember.View`.  By using `bindAttr` we tell the template to apply the class `is-slogan` if the context's evaluation of `isSlogan` returns `true`.

<!--- }}}2 -->

### Views Are Tightly Coupled To Their Controllers

<!--- {{{2 -->

Given the preceeding discussion, an opinion of Ember's designers, that is
enforced by the router is that for a given `BaseName` (e.g. "Application,"
"CustomerEntry," "My Items") there should be a BaseNameView and a
BaseNameController.  The base name "Application" is no different.  In this
respect.  Remember: Views hold UI behavior, their partner controllers hold
information about UI.

<!--- }}}2 -->

### Router-Controlled Views and their Controllers Are Instantiated in Ember.Application#initialize()

<!--- {{{2 -->

In the code listings thus far, a call to `App.initialize()` has always been the
last line of code.  The function of this call is multiple:

1.  It runs `.create()` on the `Router` instance and saves it as `App.router`.
1.  It iterates through the controller and view namespaces and, for each class found, it executes .create() on the class and sets that instance as a property on `App.router`
1. Each `create`d view is given a `controller` property that corresponds to its controller (thus setting up the context to be helpful by default so that templates look in the right place for data).

Again, thanks to the requirement that `ApplicationController` and
`ApplicationView` and the #initialize() method, developers are assured that
there is a primoridal view managed by a sensibly-named controller, onto which
other views can be plugged in.  Specifically the ApplicationView and
ApplicationController, post-initialize, are set to `App.router.applicationView`
and `App.router.applicationController`.  

<!--- }}}2 -->

<!--- }}}1 -->

### Step Four:  Add More Routes

<!--- {{{1 -->

Let us now expand on the application we've built so far.  We know how to build
a minimum viable application, how to define routes, and how to implement
debugging-grade instrumentation.  In the next listing, the `root.index`
routePath will be joined by two other routes: `root.shoes` and `root.cars`.

[_Diff View_](https://github.com/sgharms/Halbert/commit/e4b2b9922193d9b6bd821f0dba253395c0db9485)

<!--- {{{2 -->

```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),
  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,
    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/'
      }),
      shoes:  Ember.Route.extend({
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
      }),
      cars:  Ember.Route.extend({
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
      })
    })
  })
});

App.initialize();
```
<!--- }}}2 -->

It's worth noting here that the initial routes were added **within** the
declaration of the root route.   **Remember:**  all routes must be held within
the `root` Route.

With a refresh of this page you should see the same layout, but now there are
views wherewith to experiment.   The first means for moving state is by direct
programmatic invocation from the console.

<!--- }}}1 -->

### Step Five:  Programmatically Affecting State Change

<!--- {{{1 -->

Routes can be transitioned into programmatically by invoking
`Ember.Router#transitionTo('stateName')`.  The `Router` instance in the
currently running application can be accessed by entering: `App.get('router')`
in the console.  It is also helpful to issue
`App.get('router.currentState.name')` or `App.get('router.currentPath')` 
when you want to find out what the current, active `Route` is.

Per the code listing, Routes named `cars` and `shoes` were added.  To change to
the `cars` route, issue `App.get('router').transitionTo('cars')`.  Notice that
The [State Manager][StateManager] logging output states that the `cars
sub-state was entered`.  The console provides further tools wherewith to
ascertain the state of the router as shown in the image.

<img src="/images/routing-primer/change-states-noroute-defined.png">

The listing also shows that something important **did not** happen, the URL did
not change in a way that is relevant to the states.  Thanks to the
`window.location.href` it's clear to see that the URL slug did not change.
This did not happen because the `cars` and `shoes` `Route`s both **lack** the
`route` property.  Making the tiny changes in the next section will fix this
problem.

<!-- }}}1 -->

### Step Six:  Adding the route property

<!-- {{{1 -->

[_Diff View_](https://github.com/sgharms/Halbert/commit/2b84962891eff4dba4a4f2e1afbe99840fdbb17b)

This is a simple code change:

<!-- {{{2 -->

```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),
  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,
    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/'
      }),
      shoes:  Ember.Route.extend({
        route: '/shoes',
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
      })
    })
  })
});

App.initialize();
```
<!-- }}}2 -->

Now, when the `transitionTo` method is used, the application's state is
"_serialized_" into the URL slug.  Similarly, if we navigate to
`http://server/#/cars` the cars state is "_deserialized_."  While these URLs
map neatly to a defined `Route` name, URLs can feature dynamic segments or
nested segments as well.  The `Route` can define how to handle the serialize /
deserialize processes by defining `serialize()` and `deserialize()` methods on
the `Route`.  Advanced (de)serialization will be covered later in this guide.

<!-- }}}1 -->

We can likewise change to the other state with:
`App.router.transitionTo('root.shoes')`.  As expected, we enter that Route
state and see a change in the URL slug to `#/shoes`.

It is worth noting that when transferring between sibling states (`cars` to
`shoes`) the parent state was *not* entered.  This is confirmed both by the
state manager's debugging  output as well as by the non-execution of the
`root.index`'s `enter()` callback.  The following image demonstrates the
flexibility the router affords users.

<figure>
  <img src="/images/routing-primer/move-between-routes-transitionto-urlslug.png">
</figure>

With Routes with URLs in place, we can now work to make the views behave as
side-effects of the application state.

<!--- }}}1 -->

### Step Seven:  Wiring Up Views in Routes: The {{outlet}}

<!--- {{{1 -->

Above we mentioned that the primordial view is the `ApplicationView`.  We can
imagine that its associated template would likely have some skeletal, static
HTML in it:  a logo, a static footer, and some other assets.

But there are also going to be components whose structural position always
remains the same, but whose content changes.  We could imagine that a "top
navigation" area (or "View") will always happen in the same place, but whose
data source might contain different content when loaded (e.g. "logged-in
navigation" or "admin navigation");

The place where this appropriate-to-the-State View "plugs in" is an "`outlet`."
While "outlet" has many subtle meanings in English, in Ember case it means "the
place where Views get plugged in."

We denote an outlet by putting the Em.Handlebars helper `{{outlet}}` inside of
our Views' template code.  A template can have multiple outlets which are
differentiated by name (e.g. `{{outlet topNav }}` and `{{outlet leftNav}}`).
In many templates, however, there will be only one `{{outlet}}`.

In the following listing we add templates for the newest routes.  For each
Ember requires _basename_View, _basename_Controller, and a template for each
view.  This is a technique that has been demonstrated previously in this guide.
What is new will be the _linking_ of these new views into the existant
`ApplicationView`'s `{{outlet}}`.  Discussion of the "linking" method,
`connectOutlets` occurs after the code listings.

This is one of the most important steps in the guide.  While simple, it is
important and the diff view is very helpful.  

[_Diff
View_](https://github.com/sgharms/Halbert/commit/193c431005107714fbda96ee453f9030364e9225)

<!--- {{{2 -->
```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),

  CarsView:  Em.View.extend({
    templateName:  'cars'
  }),
  CarsController:  Em.ArrayController.extend(),


  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,
    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/'
      }),
      shoes:  Ember.Route.extend({
        route: '/shoes',
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('cars');
        }
      })
    })
  })
});

App.initialize();
```
<!--- }}}2 -->

And the templates:

<!--- {{{2 -->
```handlebars
<script type="text/x-handlebars" data-template-name="application">
  <h1>Hi Ember</h1>
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
  <hr/>

  {{outlet}}
</script>

<script type="text/x-handlebars" data-template-name="cars">
  <h1>Cars</h1>
  <p>Here in my car / I feel safest of all</p>
</script>
```

<!--- }}}2 -->

The application should look like this:

<img src="/images/routing-primer/initial-view-wireup.png">

The main change in this commit is the addition of the `{{outlet}}` in
ApplicationView and the addition of `connectOutlets` in the `cars` route.
Adding `{{outlet}}` to the template tells Ember: "This is a point that I want
to insert a view."  

Recall that `outlets` _can_ be named but, frequently, they are not.  When views
are extremely well decomposed, it is likely that one will attach a view A to
ApplicationView, some sub-view to A called "B", some sub views "B-prime" and
"B-double-prime to B", etc.

It is into the `outlet` defined in the template that we wish to "connect" a
view appropriate for the `cars` route.  One does so in a method called,
fittingly, `connectOutlets`.  This method is provided as a mixed-in method from
the Routable mixin.  While not heretofore explicitly stated, in terms of class
structure, the Router is a `StateManager` &plus; `Routable`.

Let's first look at the signature of `connectOutlets`:

    connectOutlets:  function(router, context){...}

`connectOutlets` is always passed one argument by default: the router itself
&ndash; the selfsame router in which the method is defined!  When inside
`connectOutlets`, if one neds to access other controllers, one should use the
`router.get('someController')` pattern.  Ember lazily loads many of its
components during its bootstrap process.  While
`App.get('router.fooController')` and `router.get('fooController')` point to
the same thing eventually, the latter is to be preferred within the router.

The `context` parameter contains any data `return`ed from the `deserialize`
method. During a deserialization process the resultant data structure may need
to be passed (and displayed) by one of the views connected in connectOutlets.
This parameter is a placeholder for that data.  While not a concern in the
current iteration of the app, it will be demonstrated later.

Let's flesh out our connectOutlets method some more:

    connectOutlets:  function(router, context){
        router.get('applicationController').connectOutlet('cars');
    }

> "Router, find me the instance of your class `App.ApplicationController` called
> `App.applicationController` which, by convention is associated with the view
> `App.ApplicationView` called `App.applicationView` whose template declaration
> defines an outlet. I wish to take an instance of `App.CarsView` and inject its
> template data into the outlet."

The amount of work done for so little typing is quite staggering! Clearly some
convention-over-configuration inference is being made during this invocation.
In its single-argument invocation uses this single string to derive:

  * A view source
  * A controller
  * Ember will assume the view with the outlet will have only one `{{outlet}}` call 
  * Ember will assume the view you're injecting will have the data it needs in its controller's `content` property

Another common invocation is to pass three arguments defining:

  * a named outlet: if both `{{outlet alpha}}` and `{{outlet beta}}` are
present, a string `'beta'` would tell Ember you want to inject onto the `beta`
outlet 
  * a name whence is derived a viewSource and controller
  * a data object that will be assigned to the controller's `content` attribute 
 
An example is `.connectOutlet('topNav', 'statesList', context.us_states);`
  
The most granular, and most declarative version is to pass a single configuration
Plain Old Javascript Object (POJO) with explicit parameters.  The specifics can be 
viewed in [connectOutlet API][ConnectOutletAPI].

To show the flexibility the Router affords via `connectOutlets`, the
application will now be built up using the techniques described in this
section.

As a brief aside, it might feel a bit bizarre to tell the *controller* to wire
up some other `baseName` to its view's `{{outlet}}` versus telling the view to
do this "plugging in" itself.  Ember's opinion is that the View should be,
despite its capability of being quite powerful, fairly limited (CSS class
calculation, event handling).  Therefore the *controller* should bear the
responsibility for performing the wiring.  As a code smell, if you find your
`Ember.View`s doing much more logic than pure view behavior, you might be
building in a fashion that's not entirely Ember-opinions compatible.

For those who have examined other Ember tutorials or developed some Ember app,
the question may have arisen:  "Sometimes I define a simple view in my
templates, or I might want to wire up a simple `Ember.View` into an outlet, do
I **have** to create a matching `Ember.Controller` for it?"  The answer is
"no."  When an `Ember.View` is attached to an outlet and it *does* not have its
own `Controller` for defining its context, it inherits the context of its
parent template.  A real-life example would be imagine an item that could be
"liked" by clicking on a glyph.  Handling the CSS and click logic could live on
this `FavoriteView` which is rendered into an `{{outlet}}` held by `ItemView`'s
template.  `ItemView`'s domain data should not be passed into the sub-template
`FavoriteView` by some manner of weird argument-passing contortion.  Rather
`FavoriteView` can simply, and happily, and, most importantly, _sensibly_ use
its parent view's context.<sup>[2](#view-preserves-context)</sup>




[_Diff
View_](https://github.com/sgharms/Halbert/commit/98e6f3ebc033937523ccd723e0d937a5d9465aca)

<!-- {{{2 -->
```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),

  CarsView:  Em.View.extend({
    templateName:  'cars'
  }),
  CarsController:  Em.ArrayController.extend(),

  ShoesView:  Em.View.extend({
    templateName:  'shoes'
  }),
  ShoesController:  Em.ArrayController.extend(),

  SalutationView:  Em.View.extend({
    templateName:  'salutation'
  }),
  SalutationController:  Em.ObjectController.extend(),

  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,
    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/',
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation', 
                                                            { greeting: "My Ember App" });
        }
      }),
      shoes:  Ember.Route.extend({
        route: '/shoes',
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation', 
                                                            { greeting: "Shoes Route" });
          router.get('applicationController').connectOutlet('body', 'shoes');
        }
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation', 
                                                            { greeting: "Cars Route" });
          router.get('applicationController').connectOutlet('body', 'cars');
        }
      })
    })
  })
});

App.initialize();
```

```handlebars
<script type="text/x-handlebars" data-template-name="application">
  {{outlet greeting}}
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
  {{outlet body}}
  {{outlet footer}}
</script>

<script type="text/x-handlebars" data-template-name="cars">
  <hr/>
  <h1>Cars</h1>
  <p>Here in my car / I feel safest of all</p>
</script>

<script type="text/x-handlebars" data-template-name="shoes">
  <hr/>
  <h1>Shoes</h1>
  <p><a href="http://youtu.be/v_Yx0X-eHn8">N&uuml; Shooz?</p>
</script>

<script type="text/x-handlebars" data-template-name="salutation">
  <h1>{{greeting}}</h1>
</script>
```
<!-- }}}2 -->

Change your code to look like this and issue `App.router.transitionTo('shoes')`
or `App.router.transitionTo('cars')` to change state and see how the
application's appearance changes.  Or, try affixing the `#/cars` slug to change
the state.  Ember's `outlet` metaphor makes building complex, scalable
applications surprisingly easy.  No longer must you troll through endless
template code removing (or adding) conditional clauses.  Simply create a new
view / controller pair, unplug the old, and plug in the new.

The Router's design with `{{outlet}}`s opens many exciting new possibilities:
A/B testing, "admin" interfaces versus "regular" interfaces, portable layouts,
etc.

Now that we've demonstrated how to wire up a substantial view quickly, we need
to provide a way, via the views, to affect Route state change, clearly using
`transitionTo` and typing in url slugs is not the way to go!  This is addressed
in the following section.


<!--- }}}1 -->

### Moving from Route to Route

<!--- {{{1 -->

Recall that we have already demonstrated that routes can be changed with calls
to `App.get('router').transitionTo('someState')`.  Ember also has the
capability of triggering this action as a result of a browser event: typically,
click.  This section will show how to change state as a result of an event.  

Looking at our application, let's transition from the `index` state to the
`cars` state.  We'll need the following inside of our `ApplicationView`'s
template:

    <p><a {{action goToCars href=true}}>Go To Cars</a>

And in the `Router` declaration:

    goToCars:  Ember.Route.transitionTo('root.cars')

The `{{action}}` Handlebars helper is used throughout Ember's Handlebars
templates to handle eventing in Ember (click, keyDown, [**etc.**][EventList]).

In Router-driven applications, if an action is not intercepted by a view, that
event will bubble up to the Route in which that view was rendered.  If that
Route is a sub-route of another Route the transition will be sought there all
the way up to the top-level `Route` definition, our &uuml;ber-container: `root`. 

This bubbling effect allows certain actions to remain private.  If certain
transitions should only be available for certain sub-sub-states, put the
transition on the sub-state and you've achieved a type of scoping.

In this example, Ember looks to App.ApplicationView to handle the click, it
does not.  The event then bubbles upward until it hits the `root` `Route` where
a transition is indeed found.

It is often desirable to have the `{{action}}` fire on the event of something
that is not a hyperlink: an image, a sprite, etc.  In these cases the
`href=true` component of the action can be elided.  When you want users to
follow a link (i.e you have embedded the `{{action}}` in a link OR when you
want the place whither they go to be bookmark-able, add the `href=true`
directive.

`Ember.Route.transitionTo('root.cars')` generates a function which does a
transition.  When Ember finds the proper transition it uses Javascript's
`call()` to invoke the function with the proper context.

Refresh the application and notice that by clicking on the 'Go To Cars' link,
one now changes state to the 'cars' view. Using this pattern basic app
traversal is now possible.

[_Diff View_](https://github.com/sgharms/Halbert/commit/87152ba404759897a0144cdbc4905f53016fcfa2)

<!-- {{{2 -->

```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),

  CarsView:  Em.View.extend({
    templateName:  'cars'
  }),
  CarsController:  Em.ArrayController.extend(),

  ShoesView:  Em.View.extend({
    templateName:  'shoes'
  }),
  ShoesController:  Em.ArrayController.extend(),

  SalutationView:  Em.View.extend({
    templateName:  'salutation'
  }),
  SalutationController:  Em.ObjectController.extend(),

  TraversalView:  Em.View.extend({
    templateName:  'traversal'
  }),
  TraversalController:  Em.ObjectController.extend(),

  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,

    goToCars:  Ember.Route.transitionTo('root.cars'),

    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/',
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "My Ember App" });
          router.get('applicationController').connectOutlet('body', 'traversal'); }
      }),
      shoes:  Ember.Route.extend({
        route: '/shoes',
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Shoes Route" });
          router.get('applicationController').connectOutlet('body', 'shoes');
        }
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Cars Route" });
          router.get('applicationController').connectOutlet('body', 'cars');
        }
      })
    })
  })
});

App.initialize();
```
<!-- }}}2 -->

<!-- {{{2 -->
```handlebars
<script type="text/x-handlebars" data-template-name="application">
  {{outlet greeting}}
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
  {{outlet body}}
  {{outlet footer}}
</script>

<script type="text/x-handlebars" data-template-name="cars">
  <hr/>
  <h1>Cars</h1>
  <p>Here in my car / I feel safest of all</p>
</script>

<script type="text/x-handlebars" data-template-name="shoes">
  <hr/>
  <h1>Shoes</h1>
  <p><a href="http://youtu.be/v_Yx0X-eHn8">N&uuml; Shooz?</p>
</script>

<script type="text/x-handlebars" data-template-name="salutation">
  <h1>{{greeting}}</h1>
</script>

<script type="text/x-handlebars" data-template-name="traversal">
  <p><a {{action goToCars href=true}}>Go To Cars</a>
</script>
```

<!-- }}}2 -->

By similar means, other `{{action}}` handlers and templates can be created so
that the application can be navigated by clicking, as well as by changing URL,
as well as by using `transitionTo`.  As a self-check, try to formulate how you
would like to wire up these state-changes. A code listing follows but try it
out yourself!

[_Diff
View_](https://github.com/sgharms/Halbert/commit/b26d039f51c294555bb986e159c08d6d89144dcc)

<!-- {{{2 -->

```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),

  CarsView:  Em.View.extend({
    templateName:  'cars'
  }),
  CarsController:  Em.ArrayController.extend(),

  ShoesView:  Em.View.extend({
    templateName:  'shoes'
  }),
  ShoesController:  Em.ArrayController.extend(),

  SalutationView:  Em.View.extend({
    templateName:  'salutation'
  }),
  SalutationController:  Em.ObjectController.extend(),

  TraversalView:  Em.View.extend({
    templateName:  'traversal'
  }),
  TraversalController:  Em.ObjectController.extend(),


  HomeView:  Em.View.extend({
    template:  Em.Handlebars.compile('<p><a {{action goHome href=true}}><em>Go Home</em></a></p>')
  }),
  HomeController:  Em.ObjectController.extend(),

  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,

    goToCars:  Ember.Route.transitionTo('cars'),
    goToShoes:  Ember.Route.transitionTo('shoes'),
    goHome:  Ember.Route.transitionTo('index'),

    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/',
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "My Ember App" });
          router.get('applicationController').connectOutlet('body', 'traversal'); }
      }),
      shoes:  Ember.Route.extend({
        route: '/shoes',
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Shoes Route" });
          router.get('applicationController').connectOutlet('body', 'shoes');
          router.get('applicationController').connectOutlet('footer', 'traversal');
          router.get('traversalController').connectOutlet('home');
        }
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Cars Route" });
          router.get('applicationController').connectOutlet('body', 'cars');
          router.get('applicationController').connectOutlet('footer', 'traversal');
          router.get('traversalController').connectOutlet('home');
        }
      })
    })
  })
});

App.initialize();
```
<!-- }}}2 -->

<!-- {{{2 -->
```handlebars
<script type="text/x-handlebars" data-template-name="application">
  {{outlet greeting}}
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
  {{outlet body}}
  {{outlet footer}}
</script>

<script type="text/x-handlebars" data-template-name="cars">
  <hr/>
  <h1>Cars</h1>
  <p>Here in my car / I feel safest of all</p>
</script>

<script type="text/x-handlebars" data-template-name="shoes">
  <hr/>
  <h1>Shoes</h1>
  <p><a href="http://youtu.be/v_Yx0X-eHn8">N&uuml; Shooz?</p>
</script>

<script type="text/x-handlebars" data-template-name="salutation">
  <h1>{{greeting}}</h1>
</script>

<script type="text/x-handlebars" data-template-name="traversal">
  <hr/>
  <p><a {{action goToCars href=true}}>Go To Cars</a>
  <p><a {{action goToShoes href=true}}>Go To Shoes</a>
  {{outlet}}
</script>
```
<!-- }}}2 -->

At this point you should be grinning because you're probably starting to feel
comfortable with the Router and Ember and are realizing how much power it gives
you with so little typing!

<!--}}}1-->

## Fetching Data

<!--- {{{1 -->

While the Router has, thus far, afforded this application many wonderful
features: discrete states, clarity of intention, a back button that works, etc.
a very big component is missing:  data.

Ember's opinion is that you should ask your Model classes how to retrieve
instances or collections of that model.  This should look *somewhat* similar to
those coming from Rails.  In the same way as one might express `Post.all` or
`Post.find(id)`, Ember perfers a similar method of declaration: the "fetching"
work should occur as a "class method" on an Ember model.

Class method, above, appears in quotes to note that we fully understand that no
such thing exists in the Javascript language per se.  Let's imagine a working
model for how data retrieval should work.   This process will be presented in a 
C-influenced style for reasons explained shortly:

1.  Construct an array of objects
1.  Said array of objects can be "pointed to" by a reference.  For clarity
    purposes this will be called `0x000016`
1.  Refer to the reference of objects by the variable name: `listOfShoes`
1.  Give the `ShoeView`'s `connectOutlet` arguments of (anOutlet,
    name, contextReference) where contextReference points to the reference of
    our array of objects, that is to the object at address `0x000016`, also
    known as `listOfShoes`
1.  Make this `listOfShoes` available by calling a method on a semantically
    appropriate object

To translate this model to be compatible with Ember's opinions, the `Router`
should be to call the method: `App.Shoe.all()` which returns a unique reference
address which, for the lifetime of the app, will be the source of data for the
`listOfShoesController` which will inform the `ShoesView`'s controller partner,
`ShoesController`. Since the content of the `content` variable is to be an
array, it makes sense that `ShoesController` should be an extension of the
`Em.ArrayController` class.  

#### Aside:  Sublcasses of Ember.Controller:  Ember.ArrayController and ObjectController

If one examines the sample code thus far, one will note that both
`ShoesController` and `CarsController` are, and have been, of type `ArrayController`
since the very beginning of this guide.  For controllers that don't manage a
collection of array-like data there is `Ember.ObjectController` whose content
variable is, unsurprisingly, an `Object`.

The chief virtue of these `Ember.Controller` subclasses is that in the
templates of the associated views of these controllers, one may issue a
Handlebars directive like `{{#each shoe in controller}}` and the view and the
controller will automatically proxy the controller's `content` attribute as the
enumerable thing (or dereferencable thing, in the case of
`Ember.ObjectController)` to the view.

As an example, one can issue from the console:
`App.get('router.shoesController.length')`.  Clearly a `shoesController`
doesn't have a length, but since it is an Ember.ArrayController, the
`App.ShoesController` class proxies that call to the array that's resident on
the `content` property.

#### Why the Focus on References?

In the discussion before the aside, much ado was made of this notion of
"references". When Ember views are linked up via the router the content
properties of the controllers are set to watch a specific Ember object. Per
our previous example, say, the object at address 0x000016.  

If one were to replace ShoesController.content with another array (a different
array reference), the view, which would still be watching the old reference,
**would not know to update itself**. This is a very common error for those
learning to use the Router and to integrate it with model-held data methods.

As such when data updates come the content at the controller's `content`
property must be _replaced_ or emptied and updated. The content address cannot
be changed by means of the Ember `set()` command.

Let's now add the code for fetching all the Shoes. While we're here, we'll
also add a `find` method that will let us look up a single Shoe by its ID. To
make this play nicely for demonstration purposes, we'll provide a stub object
data source.

<!-- {{{2 --> 
```javascript
App.Shoe = Ember.Object.extend();
App.Shoe.reopenClass({
  _listOfShoes:  Em.A(),
  _stubDataSource:  [
          { id: 'rainbow',   name: "Rainbow Sandals",
              price: '$60.00', description: 'San Clemente style' },
          { id: 'strappy',   name: "Strappy shoes",
              price: '$300.00', description: 'I heard Pénèlope Cruz say this word once.' },
          { id: 'bluesuede', name: "Blue Suede",
              price: '$125.00', description: 'The King would never lie:  TKOB⚡!' }
        ],

  all:  function(){
    var allShoes = this._listOfShoes;

    // Stub an ajax call; like a jQuery.ajax might have done...
    setTimeout( function(){
      allShoes.clear();
      allShoes.pushObjects( this._stubDataSource;);
    }, 2000);

    return this._listOfShoes;
  },
  find:  function(id){
    return this._stubDataSource.findProperty('id', id);
  }
});
```

<!-- }}}2 --> 

After the `App.create` (but before the `App.initialize`!), we add the previous
listing.  This code:

1.  Declares a class `App.Shoe`
1.  Provides a unique, "private" attribute  called `_listOfShoes`
1.  Provides an `all()` method.

Then the router is initialized and all the Routes are created and attached to
the `App.router` instance variable.  When the `shoes` route is entered.
`connectOutlets` fires and the following happens:

1.  `App.Shoe.all` is called
1.  A local reference (`allShoes`) to a persistent address (`App.Shoe._listOfShoes`) is gained 
1.  An asynchronous call is made (mocking an AJAX call) that updates in 2
    seconds' time
1.  The reference address to `App.Shoe._listOfShoes` is returned, a pointer to an
    empty array (`Em.A()`)
1.  In `connectOutlets` this data (an empty array reference) is sent to the
    `ShoesController`'s `content` property
1.  _Asynchronously_ _listOfShoes is updated ( it is empted by the `clear()`
    method and then loaded with the hard-coded array
1.  Ember's observers notice that there has been a change at the observed
    reference address and they tell the chain of views connected by
    `connectOutlet` to re-render with this new data

Thanks to Ember's bindings, when this is viewed in the browser, the
`listOfShoesView` renders an empty array ("do an each of my controller's content,
nothing in there, show nothing").  Two seconds later that reference's contents
change and the view is notified of this change ("do an each of my controller's
content, there are items in there, render them").

It might have been tempting to do the following in `all`:

<!--- {{{2 -->

```javascript
App.Shoe = Ember.Object.extend();
App.Shoe.reopenClass({
  _listOfShoes:  Em.A(),

  all:  function(){
    var allShoes = this._listOfShoes;

    // Mock an ajax call
    setTimeout( function(){
      this._listOfShoes = 
        [ ...data ... ]
      );
    }, 2000);

    return this._listOfShoes;
  }
});
```
<!--- }}}2 -->


By **assigning** a new object reference ID, we have left the view looking at
the **old** reference address but have put our new data at a **new** address.
**The view will not update** if you make this error.

The following code will lead to the `shoes` route having actual data.  This
listing is a lot of fun.  This code, when you click to the `shoes` route will
appear empty for 2 seconds (to simulate a very slow AJAX transaction) and then
violà: a listing of the shoes will appear.  This is the pattern that underlies
Ember data and which was wonderfully explained elsewhere by [Trek
Golwaki][Trek].

The `Shoes` route should look like the following:

<img src="/images/routing-primer/data-loaded-shoes-route.png">

[_Diff View_](https://github.com/sgharms/Halbert/commit/8d0e2757723f39191f00bf6741fb751b892b1742)

<!--- {{{2 -->
```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),

  CarsView:  Em.View.extend({
    templateName:  'cars'
  }),
  CarsController:  Em.ArrayController.extend(),

  ShoesView:  Em.View.extend({
    templateName:  'shoes'
  }),
  ShoesController:  Em.ArrayController.extend(),

  SalutationView:  Em.View.extend({
    templateName:  'salutation'
  }),
  SalutationController:  Em.ObjectController.extend(),

  TraversalView:  Em.View.extend({
    templateName:  'traversal'
  }),
  TraversalController:  Em.ObjectController.extend(),


  HomeView:  Em.View.extend({
    template:  Em.Handlebars.compile('<p><a {{action goHome href=true}}><em>Go Home</em></a></p>')
  }),
  HomeController:  Em.ObjectController.extend(),

  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,

    goToCars:  Ember.Route.transitionTo('cars'),
    goToShoes:  Ember.Route.transitionTo('shoes'),
    goHome:  Ember.Route.transitionTo('index'),

    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/',
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "My Ember App" });
          router.get('applicationController').connectOutlet('body', 'traversal'); }
      }),
      shoes:  Ember.Route.extend({
        route: '/shoes',
        enter: function ( router ){
          console.log("The shoes sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Shoes Route" });
          router.get('applicationController').connectOutlet('body', 'shoes', App.Shoe.all());
          router.get('applicationController').connectOutlet('footer', 'traversal');
          router.get('traversalController').connectOutlet('home');
        }
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Cars Route" });
          router.get('applicationController').connectOutlet('body', 'cars');
          router.get('applicationController').connectOutlet('footer', 'traversal');
          router.get('traversalController').connectOutlet('home');
        }
      })
    })
  })
});

App.Shoe = Ember.Object.extend();
App.Shoe.reopenClass({
  _listOfShoes:  Em.A(),

  all:  function(){
    var allShoes = this._listOfShoes;

    // Mock an ajax call; like a jQuery.ajax might have done...
    setTimeout( function(){
      allShoes.clear();
      allShoes.pushObjects(
        [ 
          { id: 'rainbow',   name: "Rainbow Sandals",
              price: '$60.00', description: 'San Clemente style' },
          { id: 'strappy',   name: "Strappy shoes",
              price: '$300.00', description: 'I heard Pénèlope Cruz say this word once.' },
          { id: 'bluesuede', name: "Blue Suede",
              price: '$125.00', description: 'The King would never lie:  TKOB⚡!' } 
        ]
      );
    }, 2000);

    return this._listOfShoes;
  }
});

App.initialize();
```
<!--- }}}2 -->

<!--- {{{2 -->
```handlebars
<script type="text/x-handlebars" data-template-name="application">
  {{outlet greeting}}
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
  {{outlet body}}
  {{outlet footer}}
</script>

<script type="text/x-handlebars" data-template-name="cars">
  <hr/>
  <h1>Cars</h1>
  <p>Here in my car / I feel safest of all</p>
</script>

<script type="text/x-handlebars" data-template-name="shoes">
  <hr/>
  <h1>Shoes</h1>
  <h1>Current Shoes</h1>

  <p>
    {{#each shoe in controller}}
     {{#with shoe}}
        <li style="color: #000">{{id}} | {{name}} | {{price}} : {{description}}</li>
     {{/with}}
    {{/each}}
  </p>
  
  <p><a href="http://youtu.be/v_Yx0X-eHn8">N&uuml; Shooz?</p>
</script>

<script type="text/x-handlebars" data-template-name="salutation">
  <h1>{{greeting}}</h1>
</script>

<script type="text/x-handlebars" data-template-name="traversal">
  <hr/>
  <p><a {{action goToCars href=true}}>Go To Cars</a>
  <p><a {{action goToShoes href=true}}>Go To Shoes</a>
  {{outlet}}
</script>
```
<!--- }}}2 -->

<!--- }}}1 -->

With a model in place that can do our data fetching, let's make it possible
to go from viewing a list of shoes, to viewing the details about a shoe.

<!-- }}}1 -->


## From a List of Shoes to a Shoe

Here's the plan:

1.  Make a click on the shoe listening do something
1.  Make a something that receives that noficiation change
1.  Make the notification say something like: such-and-such shoe's details
    should be shown

In Ember, this is surprisingly easy and should feel a bit familiar if you've
been following along with the guide thus far.  To successfully achieve these
goals, the `serialize()` and `deserialize()` methods will be covered as will
nested routes and dynamic segments.

### Add Action Signaling

In the handlebars template for `ShoesView`,  add an action call and
turn the list items' content into anchor tags;

    <li><a{{action showShoe this href=true}}>{{name}}</a></li>

Careful readers will note that there's a *new* argument in this action call.
The third word is "this" which, in this portion of Handlebars code, will refer
to the particular shoe which bears the `name` property used on this line.

This helpers says: "If someone clicks here, trigger the action (on the router)
called "showShoe" and pass this shoe to the handler.  Also make sure that this
action helper has a URL associated with it."  It is the object referred to by
`this` that will become the "context" in `serialize()` methods discussed below.

### Add a trigger

In the `root.shoes` route add:

    showShoe:  Em.Route.transitionTo('root.shoes.show')

### Implement serialize and deserialize

While the Route translation is working swimmingly there is one small problem.

The issue comes about because the linked items (i.e. the various shoes)  don't
know how to express their underlying `shoe` as a url.  They need to learn how
to `serialize` themselves to make such an expression.  If a Shoe were trying to
express how to find it in URL form, how would it point to itself?  We will
write that method for the route as such:

    serialize:  function(router, context){
      return {
        id: context.id
      }
    }

This method expresses that it expects to receive a `context` object, the "shoe"
object that was passed along as the second argument in the `{{action}}` call.
That item's `id` property will be used to fill in the dynamic portion of the
url slug specified in this `Route`'s `route` property (recall it was
'/shoe/:id')

It should not be surprising that a Route that explains how to serialize its
objects should also need to explain how to **de**serialize its items when a
meaningful URL is given.


    deserialize:  function(router, context){
      return App.Shoe.find( context.id );
    },

In this case, the `context` argument is built like the hash returned from
`serialize`.  `Deserialize` will take the context.id and use the "class method"
on `Shoe` to find the proper data object needed to construct this `Route`'s
state.

With these components in place, we are able to move from `shoes` to
`/shoes/shoe/strappy` or `/shoes/shoe/bluesuede`.

Here's the end result:

<img src="/images/routing-primer/shoe-route.png">

<!-- {{{2 -->
```javascript
window.App = Ember.Application.create({
  ApplicationView: Ember.View.extend({
    templateName:  'application',
    classNames: ['application-view']
  }),
  ApplicationController: Ember.Controller.extend({
    slogan: 'A framework for creating ambitious web applications',
    isSlogan: true
  }),

  CarsView:  Em.View.extend({
    templateName:  'cars'
  }),
  CarsController:  Em.ArrayController.extend(),

  ShoesView:  Em.View.extend({
    templateName:  'shoes'
  }),
  ShoesController:  Em.ArrayController.extend(),

  SalutationView:  Em.View.extend({
    templateName:  'salutation'
  }),
  SalutationController:  Em.ObjectController.extend(),

  ShoeView:  Em.View.extend({
    templateName:  'shoe'
  }),
  ShoeController:  Em.ObjectController.extend(),

  TraversalView:  Em.View.extend({
    templateName:  'traversal'
  }),
  TraversalController:  Em.ObjectController.extend(),


  HomeView:  Em.View.extend({
    template:  Em.Handlebars.compile('<p><a {{action goHome href=true}}><em>Go Home</em></a></p>')
  }),
  HomeController:  Em.ObjectController.extend(),

  ready: function(){
    console.log("Created App namespace");
  },
  Router: Ember.Router.extend({
    enableLogging:  true,

    goToCars:  Ember.Route.transitionTo('cars'),
    goToShoes:  Ember.Route.transitionTo('shoes.index'),
    goHome:  Ember.Route.transitionTo('index'),

    root:  Ember.Route.extend({
      index:  Ember.Route.extend({
        route:  '/',
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "My Ember App" });
          router.get('applicationController').connectOutlet('body', 'traversal'); }
      }),
      shoes:  Ember.Route.extend({
        showShoe:  Ember.Route.transitionTo('shoes.shoe'),

        route: '/shoes',
        index:  Ember.Route.extend({
          route: '/',
          enter: function ( router ){
            console.log("The shoes sub-state was entered.");
          },
          connectOutlets:  function(router, context){
            router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                              { greeting: "Shoes Route" });
            router.get('applicationController').connectOutlet('body', 'shoes', App.Shoe.all());
            router.get('applicationController').connectOutlet('footer', 'traversal');
            router.get('traversalController').connectOutlet('home');
          }
        }),
        shoe:  Ember.Route.extend({
          route: '/shoe/:id',
          enter: function ( router ){
            console.log("The shoe detail sub-state was entered.");
          },
          deserialize:  function(router, context){
            return App.Shoe.find( context.id );
          },
          serialize:  function(router, context){
            return {
              id: context.id
            }
          },
          connectOutlets:  function(router, aShoe){
            router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                              { greeting: "Shoes.Shoe Route" });
            router.get('applicationController').connectOutlet('body', 'shoe', aShoe);
            router.get('applicationController').connectOutlet('footer', 'traversal');
          }
        })
      }),
      cars:  Ember.Route.extend({
        route: '/cars',
        enter: function ( router ){
          console.log("The cars sub-state was entered.");
        },
        connectOutlets:  function(router, context){
          router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Cars Route" });
          router.get('applicationController').connectOutlet('body', 'cars');
          router.get('applicationController').connectOutlet('footer', 'traversal');
          router.get('traversalController').connectOutlet('home');
        }
      })
    })
  })
});

App.Shoe = Ember.Object.extend();
App.Shoe.reopenClass({
  _listOfShoes:  Em.A(),
  _stubDataSource:  [
          { id: 'rainbow',   name: "Rainbow Sandals",
              price: '$60.00', description: 'San Clemente style' },
          { id: 'strappy',   name: "Strappy shoes",
              price: '$300.00', description: 'I heard Pénèlope Cruz say this word once.' },
          { id: 'bluesuede', name: "Blue Suede",
              price: '$125.00', description: 'The King would never lie:  TKOB⚡!' }
        ],

  all:  function(){
    var allShoes = this._listOfShoes;

    // Stub an ajax call; like a jQuery.ajax might have done...
    var self = this;
    setTimeout( function(){
      allShoes.clear();
      allShoes.pushObjects( self._stubDataSource );
    }, 2000);

    return this._listOfShoes;
  },
  find:  function(id){
    return this._stubDataSource.findProperty('id', id);
  }
});

App.initialize();
```
<!-- }}}2 -->

<!-- {{{2 -->
```handlebars
<script type="text/x-handlebars" data-template-name="application">
  {{outlet greeting}}
  <p {{bindAttr class="isSlogan"}} >Ember is: {{slogan}}</p>
  {{outlet body}}
  {{outlet footer}}
</script>

<script type="text/x-handlebars" data-template-name="cars">
  <hr/>
  <h1>Cars</h1>
  <p>Here in my car / I feel safest of all</p>
</script>

<script type="text/x-handlebars" data-template-name="shoes">
  <hr/>
  <h1>Shoes</h1>
  <h1>Current Shoes</h1>

  <p>
    {{#each shoe in controller}}
     {{#with shoe}}
        <li style="color: #000">
         <a {{action showShoe this href=true}}> {{id}} | {{name}} | {{price}} : {{description}} </a> </li>
     {{/with}}
    {{/each}}
  </p>

  <p><a href="http://youtu.be/v_Yx0X-eHn8">N&uuml; Shooz?</p>
</script>

<script type="text/x-handlebars" data-template-name="salutation">
  <h1>{{greeting}}</h1>
</script>

<script type="text/x-handlebars" data-template-name="traversal">
  <hr/>
  <p><a {{action goToCars href=true}}>Go To Cars</a>
  <p><a {{action goToShoes href=true}}>Go To Shoes</a>
  {{outlet}}
</script>

<script type="text/x-handlebars" data-template-name="shoe">
  <h1>Vital facts about ID: {{id}}:  {{name}}</h1>
  <p>{{description}}</p>

</script>
```
<!-- }}}2 -->

<!-- }}}1 -->


## Conclusion

With this guide you should not have a feel for how to construct an application
using Ember.JS.  You have learned how to define a `Router`, how to define a
model class, and how each Ember application is conceived of as a finite series
of states.  You have learned to move between states by allowing the URL to
dictate the state, by handing an event on a trigger, or by a direct
console-based invocation of `Em.Routable` methods.  

You can certainly take this code base in other, interesting directions.  Here
are some ideas:

* Use Ember.Views to add style to the views and style them in CSS
* Try adding your own Routes so that you can get details on `cars`
* Learn more Handlebars helpers, experiment with `#with` and `#each`.

Have fun, experiment, and we look forward to seeing you in the IRC channel and
accepting your pull requests on GitHub.


----

## Footnotes


1.  <a id="location-manager"></a>The default location manager, "HashLocation,"  signifies various routes by
means of `/#/`.  To change this behavior, set the `location` property on the
Router to **any** `Ember.Object` that implements the methods specified in the
`Ember.Location` API.  For more information, consult the `Ember.Location`
[API][E.L.API].

[E.L.API]: https://github.com/emberjs/ember.js/blob/master/packages/ember-routing/lib/location/api.js "Ember.Location API Source Code"


2.  <a id="view-preserves-context"></a>This was not always the case in Ember.  Previously the Views preserved the
context.  As of Ember 0.9.8 the change was made to have the context cascade
down-over views until either template or the view's controller forcibly changed
the context.  This adds much flexibility and sense.

<!-- {{{1 -->

[ConnectOutletAPI]: https://github.com/emberjs/ember.js/blob/master/packages/ember-views/lib/system/controller.js#L102
[ERGC]: https://github.com/sgharms/Ember-Router-Application-Guide-Code
[EmberRoute]: https://github.com/emberjs/ember.js/blob/master/packages/ember-routing/lib/route.js "Ember.Route Source"
[EmberRouter]: https://github.com/emberjs/ember.js/blob/master/packages/ember-routing/lib/router.js "Ember.Router Source Code"
[EmberSite]: http://emberjs.com/ "Ember.JS Homepage"
[EmberState]: https://github.com/emberjs/ember.js/blob/master/packages/ember-states/lib/state.js "Ember.State Source Code"
[EventList]: http://docs.emberjs.com/symbols/Ember.View.html
[JoLiss]:  http://www.solitr.com/blog/
[OutletGuide]: http://emberjs.com/guides/outlets  "Ember Application Structure Guide"
[StateMachine]: http://en.wikipedia.org/wiki/Finite-state_machine "Wikipedia definition of a State Machine"
[StateManager]:  https://github.com/emberjs/ember.js/blob/master/packages/ember-states/lib/state_manager.js "Ember StateManager"
[StepOneOne]: https://github.com/sgharms/Halbert/commit/369f7ce14c72dd9f552e890642ea63b742dade72
[StepOne]: https://github.com/sgharms/Halbert/commit/c7f2f79f8a5b4f946ab6dc40850c0b7810ee5ef8
[StepThree]: https://github.com/sgharms/Halbert/commit/0dfbb4b1fadb29e95967b98be9ca13778843fa3d
[Trek]:  http://trek.github.com

<!-- }}}1 -->

## Acknowledgments

Big thanks to the Ember core team for enduring my many, many questions over
these last several weeks.  I owe a special thanks to Trek G. for his review of
this document, encouragement, and his efforts in documentation of this toolkit.
I also wish to call out [Jo Liss][JoLiss] whose frequent in-code documentation
annotations made it possible for this to be written.


<!-- vim: set wrap fdm=marker ft=markdown tw=79: -->
