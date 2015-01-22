## Deprecate Access to Instance Initializers

When we initially designed Ember, we only had the use case of apps that
run in the browser in mind. In that world, you would load your app and
then it would run until the user closed the tab or navigated away.

For testing, we quickly realized that we would need some way to "reset"
the application between each test without reloading the page and
starting from scratch. To that end, we isolated all of the state in an
application into an object called the container that could be thrown
away after each test had completed.

We wanted a shared way for both apps and add-ons to initialize
applications when they booted and loaded. In particular, it was
important for people to get access to that container to make objects
available to the app at runtime. To do so, we introduced the initializer
API.

For example, Ember Data uses this API to ensure that all of your
controllers and routes have access to the store object.

As we have been working on the FastBoot effort to allow Ember apps to
run on the server, we realized that the assumption that there would only
be one instance of the app running at once no longer held.

In particular, we realized that "app boot" was actually two distinct
phases:

1. Loading all of your application code and registering objects with the
   application (such as the store in the Ember Data example)
2. Instantiating objects when the app starts running

When the application boots up for the first time, we need to run Step 1
above, but it would be wasteful to run it for every request going to
your FastBoot server.

We also realized that a huge number of real-world initializers were
simply registering classes and injections, while a smaller fraction of
initializers are doing work that truly needs to be done per run.

By separating out these two kinds of work, we could improve the
performance of cases where a single application was used multiple times,
each with a fresh set of state.

This applies to FastBoot, of course, but is also applies to integration
tests. Today, integration tests spend time executing code in
initializers that don't change between test runs, simply because of the
possibility that the initializer may also set up instances.

Thankfully, the `initializer` infrastructure already clearly marks the
boot-up phase of your application (both in your own code and in
add-ons), so we only need to make a small tweak to `initializer`s for
FastBoot to work.

This change makes the difference between initializers that set up code
and initializers that set up instances explicit.

The old `App.initializer` API now receives a `registry`, which can be
freely used to set up code using the `register` API and the various
`inject` APIs.

A new `App.instanceInitializer` API receives an `ApplicationInstance`
object. When migrating code, the most important property on the
`ApplicationInstance` is `container`, which you can use to get new
instances and set state on them.

Migrating code to the new structure is fairly mechanical. Change code
that looks like:

```js
App.initializer({
  name: "clock",

  initialize: function(container) {
    container.register("clock:main", Clock);
    var clock = container.lookup("clock:main");
    clock.setStartTime(Date.now());
  }
});
```

To:

```js
App.initializer({
  name: "clock",

  initialize: function(registry) {
    registry.register("clock:main", Clock);
  }
});

App.instanceInitializer({
  name: "clock",

  initialize: function(instance) {
    var clock = instance.container.lookup("clock:main");
    clock.setStartTime(Date.now());
  }
});
```

Some things to remember:

1. All `instanceInitializer`s run after `initializer`s and do not share a
  namespace. You can use the same name in both, and don't have to use
  `before` or `after` to make sure that instance initializers run
  second.
2. The deprecated `registry.lookup` works by maintaining a 1:1 mapping
  between Application and a default `ApplicationInstance`. This is
  fundamentally incompatible with FastBoot, and you will need to clear
  this deprecation warning before you will be able to use any of the
  FastBoot features.

While FastBoot and the improved testing performance have not yet landed,
these changes allow us to continue work on those APIs after Ember 2.0.
It also future-proofs Ember for more situations where a single
`Application` has multiple runs over its lifetime.
