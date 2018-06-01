---
title: "Inside FastBoot: The Road to Server-Side Rendering"
author: "Yehuda Katz & Tom Dale"
tags: Recent Posts, 2014
responsive: true
---

Using JavaScript to write fast, interactive web applications has exploded in popularity over the past few years. JavaScript apps offer many strengths over traditional server-rendered applications. Most notably, rich interactions and lightning-fast responses to user clicks allow for UIs that previously were only the domain of native apps.

The first JavaScript-heavy applications were productivity apps, and the experience of loading an app on the web, even with a spinner, was far better than the equivalent experience of downloading and installing a native app.

Increasingly, though, content-rich destinations such as news or video sites are starting to move to JavaScript to gain the benefits of improved interactivity. Unlike productivity apps, where the user logs in once at the beginning of the day and stays logged in, content sites are loaded many times per day, often via search engines or social sharing.

In this context, where the JavaScript app looks like a "normal" web page, loading spinners or long delays feel out-of-place and not very web-like. Indeed, this is the reason that [Twitter migrated from a client-side JavaScript approach back to server-rendered content](https://blog.twitter.com/2012/improving-performance-on-twittercom).

Being able to boot JavaScript apps on the server and "rehydrate" in the browser has been considered a Holy Grail for some time. However, most  attempts have focused solely on rendering the view layer on the server into HTML. This is an important step, but this alone does not sufficiently solve the problem.

Solving the whole problem involves not just the view layer, but the entire lifecycle of booting an application: routing, fetching models, and rendering. By leaning heavily on Ember's conventional application structure, we can move this complexity out of each application and into the framework.

We are building this feature into Ember.js, **and we're calling it FastBoot**.

FastBoot will allow you to deliver the HTML and CSS for a page in your Ember app right away, then allow the JavaScript to take over once it has finished loading. Your Ember app will behave no differently than server-rendered apps when it comes to search engines, mobile users, cURL, or users with JavaScript disabled.

For everyone else, you'll still have the responsiveness and interactivity users have come to expect from Ember apps.

Because of the Ember community's strong focus on conventional app structure, we believe that we can make server rendering so simple to enable and deploy that, in the long run, very few Ember apps would choose not to use it.

In this series of blog posts, we will demystify our efforts, and talk about implementation details. We will also give you a sense of our progress. Like every Ember feature, FastBoot will be landing a bit at a time, so every new release will unlock more capabilities. As features land, we will talk about how you can take advantage of them in your own apps.

**The Journey So Far**

From the beginning, we knew that we would eventually want to tackle running JavaScript apps on the server, but we didn't want to bet Ember on a boil-the-ocean effort to solve every aspect of client-side development at once.

That being said, we have always kept this feature in mind as we were architecting the framework. We carefully isolated all parts of the system that depend on a full-fledged browser environment.

Even during the most recent HTMLBars effort, which is inherently a DOM-based rendering engine, we made sure to use an [abstraction](https://github.com/tildeio/htmlbars/blob/master/packages/morph/lib/dom-helper.js) whenever we touched the DOM, so that we could swap it out for something else on the server. Similarly, when we designed the router, all communication with the URL went through a "[location](https://github.com/emberjs/ember.js/blob/master/packages/ember-routing/lib/location/api.js)" abstraction, instead of touching the URL bar directly. The routing microlibraries we built ([router.js](https://github.com/tildeio/router.js) and [route-recognizer](https://github.com/tildeio/route-recognizer)) were designed from the beginning to be decoupled from the DOM.

Because of this, we were able to get the Ember framework executing in Node in just a day of work, and were able to get an app completely booted and routing in under a week.

**Abstracting Feature Detection**

One of the first problems we encountered when trying to execute Ember in node was top-level feature detection. Because Ember previously assumed it was running inside a browser, it inadvertently relied on the existence of basic DOM APIs, like `window`, the `document` and `navigator`.

While the vast majority of the subsequent code was resilient to environments without a DOM, the feature detection and helpful assertion messages ("you're using an old version of jQuery") was sloppy because it historically wasn't expecting to run in Node.

To address this issue, we moved all top-level assumptions into [an `environment` abstraction](https://github.com/emberjs/ember.js/blob/master/packages/ember-metal/lib/environment.js). If you look at it, it's really boring; it just lets top-level code throughout the framework quickly short-circuit if basic DOM facilities are missing.

**The Container and Session**

Ember's powerful dependency injection ("DI") system has been a boon for managing application state, supporting the transition from globals to modules, and ensuring tests are fast and robust.

Rather than storing application state globally (either in a global variable or as a property on a global object like `App`), all state in an idiomatic Ember app is stored inside an object called the "container". This makes it easy to throw away state between each automated test, ensuring you're testing what you think you're testing and not the side-effects of a previous test. It also improves the speed of tests, allowing you to run your test suite as you develop instead of waiting hours for a CI server.

The container also serves as a registry of your application code, and its "resolver" paved the way for Ember to move from globals-based code to [JavaScript modules](http://jsmodules.io/) by abstracting lookups (e.g. Ember asking for a controller named "users") from the actual location of code.

The good news is that this means that the internals of Ember always look up (and create) objects through the container. 

Unfortunately, we made a minor mistake in our original design. Currently, every application has only a single container. This assumption works fine when running your application in the browser, since you only load and run the application once per browser page load.

This also works fine in tests, with the exception that we are doing more work than absolutely necessary between each test run. In essence, we conflated the "code registry" and "application state" responsibilities into the same container object. Between test runs, we throw away the container to reset application state, but by also throwing out the code registry, which doesn't change between tests, we are throwing the baby out with the bath water.

![Architecture diagram showing state and code registry inside same Application object](/images/blog/2014-12-22-inside-fastboot-the-road-to-server-side-rendering/old-school.png)

When running on the server, however, we realized that a single Ember application needs to be able to continue serving requests even if a previous request is waiting for an async operation (such as fetching a model) to complete.

This means that we needed to tweak our approach and allow applications to host multiple of what we call "sessions" at a time. Sessions allow us to separate the code registry (which doesn't change once the app is booted) from the application state.

![Architecture diagram showing state extracted into Session objects](/images/blog/2014-12-22-inside-fastboot-the-road-to-server-side-rendering/new-school.png)

This approach also has a side-benefit for testing: it allows us to reduce the amount of work we need to do between each test.

Both of these efforts (breaking out an environment and the design of the session) are incremental pieces that provide value on their own, and [have already landed on master](https://github.com/emberjs/ember.js/pull/9981) thanks to the tireless work of [Dan Gebhardt](https://twitter.com/dgeb). Working with [LinkedIn](https://www.linkedin.com) and [Bustle](http://www.bustle.com) closely has helped us to work through the initial requirements, and identify steps that we could take that would help enterprising teams make progress while we take the next steps.

**Next Steps**

In the coming weeks, we are going to dive head-first into HTMLbars, getting it ready for its new life running inside a Node.js environment. We'll start by making sure that the [`DOMHelper`](https://github.com/tildeio/htmlbars/blob/master/packages/morph/lib/dom-helper.js) abstraction is used everywhere that interacts with the DOM, providing us a chokepoint to implement a fake DOM on the server that builds up strings of HTML instead of interacting with a real DOM.

We plan on keeping you updated with more posts in the Inside FastBoot series as we continue to make progress, so please stay tuned for more!
