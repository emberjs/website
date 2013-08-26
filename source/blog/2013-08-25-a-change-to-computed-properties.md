---
title: Ember 1.0 RC7 Released
author: Tom Dale
tags: Releases, Recent Posts
---

The latest release of Ember.js contains a change to the way that observers and
computed properties interact. This may be a breaking change in apps that
relied on the previous behavior.

To understand the change, let's first look at an example of a computed
property.  Imagine we are trying to model [Schrödinger's famous
cat](http://en.wikipedia.org/wiki/Schr%C3%B6dinger's_cat) using an Ember.js
object.

```js
App.Cat = Ember.Object.extend({
  isDead: function() {
    return Math.rand() > 0.5;
  }.property()
});

var cat = App.Cat.create();
```

Given this cat object, is it alive or is it dead? Well, that's determined at random.
Before observing the cat, we might say that it's *both* alive *and* dead, or
perhaps neither.

In reality, whether or not our cat has shuffled off this mortal coil is only
determined the first time we ask for it:

```js
cat.get('isDead');
// true
// …or false, half the time
```

After we have asked the cat object for its `isDead` property, we can
categorically say which it is. But before we ask, the value of the
computed property doesn't really _exist_.

Now, let's introduce observers into the mix. If the value of a computed
property doesn't exist yet, should observers fire if one of its
dependent keys changes?

In previous versions of Ember.js, the answer was "yes." For example,
given this class:

```js
App.Person = Ember.Object.extend({
  observerCount: 0,

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  fullNameDidChange: function() {
    this.incrementProperty('observerCount');    
  }.observes('fullName')
});
```

Changing any of the dependent keys would trigger the observer:

```js
// WARNING: OLD BEHAVIOR DO NOT RELY ON THIS

var person = App.Person.create({
  firstName: "Yehuda",
  lastName: "Katz"
});

person.get('observerCount'); // => 0

person.set('firstName', "Tomhuda");
person.get('observerCount'); // => 1

person.set('lastName', "Katzdale");
person.get('observerCount'); // => 2
```

However, because the `fullName` property doesn't really "exist" until
it's requested, it is unclear if firing an observer is the correct
behavior.

A related problem affects computed properties if their dependent
keys contain a path. (Remember that dependent keys are just the property
names you pass to `.property()` when defining a CP.)

For example, imagine we are building a model to represent a blog post
that lazily loads the post's comments if they are used (in a template,
for instance).

```js
App.BlogPost = Ember.Object.extend({
  comments: function() {
    var comments = [];
    var url = '/post/' + this.get('id') + '/comments.json');

    $.getJSON(url) + '/comments.json').then(function(data) {
      data.forEach(function(comment) {
        comments.pushObject(comment);
      });
    });

    return comments;
  }.property()
});
```

Awesome! This will work as expected—a post's comments will only be loaded
over the network the first time we do `post.get('comments')` or use it
in a template:

```handlebars
<ul>
{{#each comments}}
  <li>{{title}}</li>
{{/each}}
</ul>
```

However, now we want to add a computed property that selects the first
comment from the array of loaded comments:

```js
App.BlogPost = Ember.Object.extend({
  comments: function() {
    var comments = [];
    var url = '/post/' + this.get('id') + '/comments.json');

    $.getJSON(url) + '/comments.json').then(function(data) {
      data.forEach(function(comment) {
        comments.pushObject(comment);
      });
    });

    return comments;
  }.property(),

  firstComment: function() {
    return this.get('comments.firstObject');
  }.property('comments.firstObject')
});
```

Now we have a problem! Because the `firstComment` computed property has
a dependency on `comments.firstObject`, it will `get()` the `comments`
property in order to set up an observer on `firstObject`.

As you can see, just adding this computed property now means that the
comments are loaded for *all* blog posts in the app—whether their
comments are ever used or not!

To determine what to do, we spent some time looking at real-world
Ember.js apps. What we discovered is that **this behavior carried with
it signficant performance penalties.**

1. Firing observers on unmaterialized computed properties means we have
   to set up listeners on all computed properties ahead of time, instead
   of lazily the first time they are computed.
2. Many computed properties that never get used are nonetheless computed
   because of path dependent keys.

To fix these issues, **RC8 makes the following changes**:

1. Observers that observe a computed property only fire after that
   property has been used at least once.
2. Observing a path (`"foo.bar.baz"`), or using a path as a dependent key,
   will not cause any parts of the path that are uncomputed to become
   computed.

The majority of Ember.js applications should not be affected by this
change, since:

1. Most apps that observe computed properties also `get()` those
   properties at object initialization time, thus triggering the correct
   behavior.
2. In the case of computed property dependent keys, the new behavior is
   what developers were expecting to happen all along.

If your applications are affected by this change, the fix is
straightforward: just `get()` the computed property in your class's
`init` method.

For example, to update the observer example above, we can retain the
pre-RC8 behavior by "precomputing" the `fullName` property:

```js
App.Person = Ember.Object.extend({
  init: function() {
    this.get('fullName');
    this._super();
  },

  observerCount: 0,

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  fullNameDidChange: function() {
    this.incrementProperty('observerCount');    
  }.observes('fullName')
});
```

If you find yourself writing code with lots of observers, you may be
writing non-idiomatic code. In general, you should only need to use
observers when you are bridging Ember code to other libraries that do
not support bindings or computed properties.

For example, if you were writing a component that wrapped a jQuery UI
widget, you might use an observer to watch for changes on the component
and reflect them on to the widget.

In your application code, however, you should be relying almost entirely
on computed properties.

We normally would not make changes of this nature this close to the 1.0
final release date. However, the performance improvements were so
dramatic we did not want to wait until Ember.js 2.0 to introduce the
change, and we are serious in our commitment to not breaking the API
post-1.0. This was our last chance to get these changes in before
putting the final stamp on the 1.0.

If you are having trouble upgrading your application, please join us in
the IRC channel or post on StackOverflow for help.
