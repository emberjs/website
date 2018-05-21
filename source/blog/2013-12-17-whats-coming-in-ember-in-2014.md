---
title: What's Coming in Ember in 2014
author: Tom Dale
tags: Recent Posts, Roadmap, 2013
responsive: true
---

Every few months, the Ember core team likes to get together to discuss
issues face-to-face and set our priorities for the following quarter.

This time, we all converged on Portland, Oregon for the weekend to
figure out where to focus our energy in 2014.

## Build Tools & Modules

We spent the majority of our time discussing a unified plan that
combines ES6 modules with fast, robust, full-featured build tools for
Ember developers.

One thing I love about the Ember community is that it values quality
over raw implementation speed. For us, it's more important [to solve
problems than to solve
scenarios](http://merrickchristensen.com/articles/scenario-vs-problem-solving.html),
because scenario solving leads to fragmented solutions that don't scale
or compose as your app grows.

So far, we've held off on endorsing any particular build tool because,
while we've investigated all of them thoroughly, the currently-available
options all have fatal flaws that make them unpleasant to use as your
app gets larger.

Many people have also been asking us about modules. When we started
Ember, there were no popular module formats. Since then, both CommonJS
modules on the server and AMD modules in the browser have exploded in
popularity. While both are great options, their ecosystems are
disconnected and the two communities frequently engage in emacs/vi-style
holy wars.

Fortunately, TC39, the committee in charge of maintaining JavaScript,
recognized the need for a unified module system. ES6 modules offer the
best of both AMD and CommonJS modules while being integrated directly
into the language.

Just as the Ember community was one of the first to fully embrace
JavaScript promises, we have spent the last few months working on making
ES6 modules a reality and bringing them to production.

Two notable projects have come out of this work:

* [ES6 Module Transpiler](http://www.thomasboyt.com/2013/06/21/es6-module-transpiler),
  which can transpile JavaScript written in the ES6 module syntax down
  into browser globals, AMD or CommonJS.
* [Ember App Kit](http://embersherpa.com/articles/introduction-to-ember-app-kit/), a foundation
  for building Ember apps that uses ES6 modules (via the transpiler)
  instead of globals.

It's important to note that we have been planning for module support for
some time. In fact, one of the last features that was blocking our
initial 1.0 release was to have the entire framework go through an object
called the _resolver_.

The resolver is the part of our dependency injection system that is
responsible for determining naming conventions. For example, imagine a
user visits your Ember application at `/posts`. By default, Ember will
look for a template called `posts`, ask the `App.PostsRoute` for a
model, and hook it all up to the `App.PostsController`. But these
globals are not hardcoded into the framework—instead, there's a default
resolver that encapsulates all of these naming conventions.

To write an Ember app that uses modules, it's as simple as swapping out
the default resolver for one that requires named modules instead of
looking for globals.

In order to make it really nice, however, we believe we need
command-line tools to smooth the process of creating, developing, and
deploying apps.

Our focus for the first quarter of 2014 will be to develop first-class
build tools that leverage existing tools where they fit our needs, and
write new ones where the current options fall down. We'll make modules a
first-class citizen, and soon every developer who starts using Ember
will also be using ES6 modules. We're excited about a world where
browser and server JavaScript packages live together in harmony.

To give you an idea of what we're thinking, here are some example CLI
commands and their effects. Note that this is all under heavy
development and is subject to change.

### Initializing an App

```sh
ember new my-app
```

This initializes a new Ember.js project and generates stub directories,
an app, a router, etc.

### Starting the Development Server

```sh
ember server
```

### Running Tests

```sh
ember test
```

Runs the QUnit tests using Karma (PhantomJS plus available
browsers), although we are planning migrate to testem as we've found its
output easier to work with.

You can also host the QUnit test harness for manual testing by
running:

```sh
ember test:server
```

## Adding Packages

The Ember CLI supports bower natively. Just use the commands
you're used to:

```sh
bower install moment
```

The lingua franca module format in Ember is ES6 modules. We will do the
work to ensure that bower modules are usable by Ember apps
automatically, by shimming AMD, CommonJS and browser global packages:

1. Provide a `shim.json` and `shim` directory for AMD shims
2. Name anonymous module based on filesystem location (including
   versions)
3. Concatenate modules into app.js (with source map)
4. Inherit source maps from bower (if provided)

Even if a library was shipped as AMD, you would be able to use it as
though it was an ES6 module:

```js
import md from "markdown";
```

Every time a file changes, the final concatenated file loaded by the
browser (app.js, app.css, etc.) is locked and any HTTP requests for it
block until the new version is compiled.

## Enhanced Inspector Features

If you're developing your app using the Ember CLI tools, the Chrome and
Firefox inspectors get even better. The development server will open a
socket that the inspector can connect to that will provide additional
environmental information to the browser extension.

There are lots of exciting things you can do once your browser and
development tools are talking to each other, but some of the ideas we've
tossed around are:

* Seeing a list of installed bower packages
* Seeing the results of test runs
* Linting and auditing your codebase
* Configuring package.json using visual editor

## Filesystem Layout

Here is a rough example of the kind of layout you might see when
initializing a new Ember app via the CLI:

```
app/
  controllers/
  models/
  fonts/
  …
config/
  shim.json
vendor/
  underscore.js    // bower installed
  markdown.js
lib/
  ember-histogram/ // incubator for packages
    skylight/
    bower.json
modules/           // non-MVC stuff
  underscore.js
```

### "Pod" Directory Structure

Right now, many Ember projects have adopted a Rails-style directory
layout where everything is grouped by type:

```
app/
  controllers/
    post.js
    posts.js
    index.js
  models/
    post.js
    user.js
  templates/
    post.handlebars
    posts.handlebars
    index.handlebars
```

We discussed moving this to a layout where related features are
grouped together in "pods" of functionality:

```
app/
  config/
    application.js
  serializers/
  models/
    post.js
    user.js
  mixins/
pods/
  post/
    controller.js
    template.handlebars
  posts/
    controller.js
    template.handlebars
  index/
    controller.js
    template.handlebars
components/
  google-map/
    component.handlebars
    component.js
    component.css
```

This proposed directory structure is still up for lots of discussion.
We've been looking at many different real world apps to see if this
makes managing the source code for Ember apps any easier.

## Slimming Down Ember.js (Project Svelte)

We believe there are several areas in the Ember codebase that have the
potential to be slimmed down substantially. We'd like to pick a target
filesize and have a sprint to get the total built framework size under
that target.

We haven't picked a target size yet, but we tossed around the 50k figure.
We'll have more information about this once we've made a list of good
candidates for slimming action.

## Distributing Components

There are a number of open issues around distributing reusable,
third-party components and libraries of components. Typically we defer
to the [Web Components spec](http://www.w3.org/TR/components-intro/), but
there are areas where the spec does not currently provide any guidance.
As we deal with them, we are keen to provide feedback to the Web Components
spec authors with how we have chosen to solve the problems.

Other limitations are due to certain features not being available in
older browsers, and we are working on polyfilling and working around
those issues so that you can enjoy the power of Web Components today in
browsers all the way back to IE8.

### Namespacing

Right now, Ember components share a global namespace. If I have a
component called `area-graph` and you have a component called
`area-graph` and I want to use your component in my app, we will have a
collision.

Soon, components in packages will be addressable by a fully-qualified path.

Here's a notional area graph component:

```handlebars
{{area-graph@d3 xValue=responseTimes}}
```

If you find yourself typing the fully-qualified path often, you will be
able to alias the helper in the lexical scope of the Handlebars template:

```handlebars
{{import "area-graph" from "d3"}}
```

We may also add a syntax for making all helpers in a package available:

```handlebars
{{import "d3"}}
```

### Template Versioning/Compilation

Handlebars compiles templates down into an intermediate AST. This AST
can change between Handlebars versions. Additionally, Handlebars syntax
may be extended, or change in version 2.0. 

Given that components are distributed on bower, should they be shipped
with their templates pre-compiled, or should we leave it up to ember-cli
to compile them on-demand?

Currently, we are leaning towards shipping templates in their raw source
form, but we need to do some more investigation.

### Scoped CSS

`<style scoped>` is not available today in many browsers. Distributed
components will get a uuid associated with them, and all of their CSS
rules will be wrapped in a selector that limits them to elements with
that uuid as a class name.


## Item Controller

Instead of doing `{{#each itemController="postItem"}}`, you can just
define `App.PostsItemController` (or the `app/controllers/posts-item`
module) and it will be wired up automatically.


## HTMLBars

HTMLBars is on track and will hopefully be available behind a feature
flag sometime in the new year. Yehuda spent some time going over the
implementation with Kris Selden and Alex Matchneer. They are going to be
taking over the effort of integrating the HTMLBars compiler into Ember
proper.

If you're not familiar with HTMLBars, it is a compiler that knows about
both HTML5 and Handlebars syntax. This is important for two reasons.

First, it will allow us to deprecate the `{{bind-attr}}` Handlebars
helper. Instead of this:

```handlebars
<img {{bind-attr src=imageUrl}}>
```

You will be able to say:

```handlebars
<img src="{{imageUrl}}">
```

Second, it will also allow us to eliminate the ugly metamorph.js script
tags that we currently use to track bound values in the DOM.

Here's what the DOM looks like before HTMLBars:

<img
src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/with-metamorph.png">

And after:

<img src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/without-metamorph.png">

## Eliminate jQuery Dependency

Once we move over to HTMLBars, the interaction between Ember.js and the
DOM gets smaller. We can probably treat jQuery as an optional dependency
and only use it if it is available via globals or as an AMD module. We
just want to make sure that we remove components/views using jQuery if its
available so that jQuery UI widgets that have stored data in the DOM via
jQuery.data() get cleaned up appropriately.

## Animation

We're still working on having animation support be built in to the
framework, but we don't have any specific API proposals to share at this
time. As always, we prioritize getting the API correct the first time
rather than having to re-do it in a later release.

## IE8 Support

Despite the imminent End of Life status of Windows XP, we will continue
supporting Internet Explorer 8. We know many Ember.js users still need
to target enterprise and education customers, who will be on IE8 for
some time.

## EmberConf

EmberConf 2014: It's happening. We'll have more details available very
soon, but I will say that you should keep March as free as you can.

## EmberDart

Just kidding.

## How You Can Help

As we've said before, Ember is a completely community-driven project.
I'd like to thank all of the core team members who pay out-of-pocket for
travel and accommodation so they can be at these meetings.

It has been extremely rewarding to watch the Ember community grow, and
also to see it assume a position of leadership in the JavaScript
community.

We need your help to keep pushing the boundaries of what's possible in
the browser. If you'd like to get started helping out, please join us in
`#emberjs-dev` on Freenode, where our helpful community can point you in
the right direction. (If you just need help with developing your Ember
app, please keep those questions in `#emberjs`.)

If there's anything we've forgotten to mention here, please feel free to
let us know what you'd like to see in the comments below!

## Ember Data

We've got lots of exciting stuff coming in Ember Data. Expect an update
on our roadmap there in a separate blog post soon.

<img src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/1.jpg">
<img src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/2.jpg">
<img src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/3.jpg">
<img src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/4.jpg">
<img src="/images/blog/2013-12-17-whats-coming-in-ember-in-2014/5.jpg">
