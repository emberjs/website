---
title: "Inside FastBoot: Faking the DOM in Node"
author: "Yehuda Katz & Tom Dale"
tags: Recent Posts, Inside FastBoot, 2015
responsive: true
---

As we [announced in the inaugural blog post in our Inside FastBoot
series](/blog/2014/12/22/inside-fastboot-the-road-to-server-side-rendering.html), we
have begun working on giving Ember.js developers the ability to run
their apps in Node.js. Once complete, this feature will allow your users
to see HTML and CSS right away, with the JavaScript downloading
in the background and taking over once it has fully loaded.

Before the holidays, we had already succeeded in getting the Ember.js
framework loading in Node.js (where it cannot rely on things like the
DOM) without throwing any exceptions. We also were able to get Ember
apps booting, parsing URLs, and completing most of the functionality
necessary to start the app, including loading controllers, routes and
models, etc.

This week, we've made good progress on the next major piece of
functionality: allowing HTMLbars templates to render in Node.js where,
again, there is no native DOM available.

So how does HTMLbars, a DOM-based templating library, work in an
environment without a DOM?

As it turns out, we can introduce a "virtual DOM" into the server-side
environment, implemented in pure JavaScript. That's exactly what we've
done, thanks to the work of Kris Selden and his [simple-dom](https://github.com/krisselden/simple-dom)
library.

Importantly, `simple-dom` implements a very, very small subset of the WHATWG
DOM specification, optimized for performance, and for the requirements
of the Ember view layer. For example, it does not implement any part of
the DOM that would require the use of accessors; it's just an attempt to
faithfully represent the DOM as a **data structure**, not its complete
API surface. (If you need the whole enchilada, check out something like
[jsdom](https://github.com/tmpvar/jsdom), which is much more complete.)

While working on FastBoot, we have created a series of integration tests
we run in Node.js that verify everything is working correctly. In those
tests, we swap out the code that accesses the DOM (encapsulated inside
an object we call a `DOMHelper`) with a version that uses a `Document`
provided by `simple-dom` rather than relying on the global `document`.

This week, with our implementation of "the little DOM that could," we were
able to get more and more sophisticated templates rendering to a string.

First, we started with just a simple template that printed a string:
`<h1>Hello</h1>`.

Then we moved on to bound expressions, so `<h1>Hello {{location}}</h1>`
became `<h1>Hello World</h1>`.

Yesterday, we got `{{#if}}` helpers and nested components working as
well.  (Other helpers likely work, we just have not written tests for
them yet.)

Now that we have bare-bones rendering in place, we are theoretically
able to start booting Ember apps in Node.js, connecting their router
with a server-side routing library like Express, and serving up requests
as they come in.

Next week, we'll begin working on giving Ember CLI the ability to
compile Ember apps to be consumed by Node.js. Once that's in place, our
plan is to start updating all of the tests in Ember's test suite that
flex the templating and view layers, ensuring that they pass in a
DOM-less environment.

Our goal is to have something alpha quality but useable as soon as
possible, so those with simpler apps can start taking advantage and
helping us test right away. As people run into incompatibilities in the
real world, we can incorporate fixes into the codebase and our test
suite and rapidly increase the number of compatible apps.

If you're interested in following along at home, you may want to star
these repos on GitHub to watch our progress:

* [https://github.com/emberjs/ember.js](https://github.com/emberjs/ember.js)
* [https://github.com/krisselden/simple-dom](https://github.com/krisselden/simple-dom)
* [https://github.com/tildeio/htmlbars](https://github.com/tildeio/htmlbars)

We'll have more for you in future posts in the Inside FastBoot series,
cataloging implementation challenges and successes, so stay tuned for
more.
