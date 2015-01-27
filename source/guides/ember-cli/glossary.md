Joining a web development community can be a challenge within itself, especially when all the resources you visit assume you're familiar with other technologies that you're not familiar with.

Our goal is to help you avoid that mess and come up to speed as fast as possible; you can consider us your internet friend.

## CDN
Content Delivery Network

This is typically a paid service you can use to get great performance for your app. You start by uploading a resource (image, JavaScript file, etc) to a company like Akamai or CloudFlare. That uploaded resource will have an absolute URL which you can reference anywhere in your app. This URL will which resolves differently for folks depending on where they're browsing.

Behind the scenes, the CDN will distribute your content geographically with the goal of end-users being able to fetch your content with the lowest latency possible. For example, if a user is in India, they'd likely get content served from India faster than from the United States.


## CoffeeScript, TypeScript
These are both languages which end up compiling to JavaScript; you're able to write your code using the syntax provided and when ready you compile/transpile your TypesScript or CoffeeScript into JavaScript.

[CoffeeScript vs TypeScript](http://www.stoutsystems.com/articles/coffeescript-versus-typescript/)


## Evergreen browsers
Browsers that update themselves (without user intervention).

[Evergreen Browsers](http://tomdale.net/2013/05/evergreen-browsers/)


## ES3, ES5, ES5.1, ES6, etc
The ES standing for EMCAScript and the numeral following being its spec version; basically the version of JavaScript.

Most browsers support at least ES5, and some even have ES6 support. You can check each browser's support (including yours) here:

* [ES5 support](http://kangax.github.io/compat-table/es5/)
* [ES6 support](http://kangax.github.io/compat-table/es6/")

[ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)


## LESS, Sass
Both LESS and Sass are types of CSS preprocessor markup intended to give you much more control over your CSS. During the build process, the LESS or Sass resources "compile" down to vanilla CSS (which is what the end-user downloads and use in their browser).

[Sass/Less Comparison](https://gist.github.com/chriseppstein/674726)


## Linter, linting, jslint, jshint
A validation tool which checks for common issues in your JavaScript. You'd usually use this in your build process to enforce quality in your codebase. A great example of something to check for: *making sure you've always got your semicolons*.

[An example of some of the options you can configure](http://jshint.com/docs/options/)


## Polyfill
This is concept that typically means providing JavaScript which tests for features that are missing (prototypes not defined, etc) and "fills" them by providing an implementation.


## Promise
Asynchronous calls typically return a promise (or deferred). This is an object which has a state: it can be given handlers for when it's fulfilled or rejected.

Ember makes use of these in places like the model hook for a route. Until the promise resolves, Ember is able to put the route into a "loading" state.

[An open standard for sound, interoperable JavaScript promises](https://promisesaplus.com/)


## SSR
Server Side Rendering

[Inside FastBoot: The Road to Server-Side Rendering](http://emberjs.com/blog/2014/12/22/inside-fastboot-the-road-to-server-side-rendering.html)


## Transpile
When related to JavaScript, this can be part of your build process which "transpiles" (converts) your ES6 syntax JavaScript to JavaScript that is supported by current browsers.

Besides ES6, you'll see a lot of content about compiling/transpiling CoffeeScript, a short-hand language which can "compile" to JavaScript.

* Ember CLI specifically uses the <a href="https://github.com/esnext/es6-module-transpiler">ES6 Module Transpiler


## Shadow DOM
**Not to be confused with Virtual DOM!** Shadow DOM is still a work in progress, but basically a proposed way to have an "isolated" DOM encapsulated within your app's DOM.

Creating a re-usable "widget" or control might be a good use-case for this. Browsers implement some of their controls using their own version of a shadow DOM.

* [W3C Working Draft](http://www.w3.org/TR/shadow-dom/)
* [What the Heck is Shadow DOM?](http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)


## Virtual DOM
Not to be confused with Shadow DOM. The concept of a virtual DOM means abstracting your code (or in our case, Ember) away from using the browser's DOM in favor of a "virtual" DOM that can easily be accessed for read/writes or even serialized.