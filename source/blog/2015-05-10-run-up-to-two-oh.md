---
title: The Transition to Ember 2.0 in Detail
author: Yehuda
tags: Compatibility, Recent Posts, 2015
responsive: trues
---

As we approach the eve of the release of Ember 1.13-beta, it's a good
time to talk about the transition plan for those of us who have Ember
1.11 and 1.12 applications.

The high level:

* Ember 1.13-beta.1 will be released early this week. It will come with the
  new Glimmer engine and a series of new deprecations, preparing for
  cruft removal in Ember 2.0.
* Ember 1.13 will ship with support for **angle bracket components**,
  which also serve as the opt-in for one-way data flow and the entirety
  of the other React-inspired programming model improvements.
* We will continue to fix regressions caused by the Glimmer engine
  throughout the 1.13 beta cycle.
* We plan to release Ember 2.0-beta.1 on June 12, as announced at
  EmberConf.
* **We will release a point release of Ember 1.13 (likely 1.13.1)
  together with the release of Ember 2.0.** This release will continue
  to fix regressions caused by the Glimmer engine, and help smooth the
  transition to Ember 2.0.
* **We will likely release additional point releases of Ember 1.13 to
  help address unexpected difficulties in the transition to Ember 2.0.**
  For the most part, this will likely include new deprecations with
  light backporting of features needed to complete a transition away
  from deprecated features in 1.13.

The Glimmer engine represents the third phase of major performance work
on Ember in the past year (preceded by `metal-views` in 1.8 and HTMLBars
in 1.10). Now that it's landed, we're going to move into the next phase
of major performance improvements. Expect to see more about that once
Ember 2.0 has shipped.

### Dealing With Glimmer Regressions

We landed Glimmer in Canary, and given that it's a completely rewritten
rendering engine, we're quite happy with the results so far.

That said, we expect to continue seeing compatibility fallout,
especially in heavily-used private APIs, over the next several months.

As a result, **we plan to continue releasing point releases in the 1.13
series as we learn about additional incompatibilities.** We will
continue to do this after Ember 2.0, to try to make sure that everyone
who wants to upgrade to Ember 1.13 and remove deprecations (as a
precursor to an Ember 2.0 upgrade) can do so.

### Add-On Compatibility and Private APIs

Ember 1.x add-ons quite often use private APIs. This was necessary for
many of the most ambitious add-ons (like Liquid Fire), and these add-ons
were a boon for Ember users.

While Glimmer cannot maintain compatibility for every private API used
by add-ons, we are committed to helping existing add-ons find new
approaches that work post-Glimmer, ideally in the form of public APIs.

We know that many Ember 1.x apps (including apps by members of the core
team) will not be able to upgrade to Ember 1.13 and Glimmer until
popular existing add-ons can support 1.13. We don't plan to put the 1.13
series to bed until people with 1.12 apps who are trying to upgrade to
deprecation-free 1.13 in earnest can do so successfully.

## The Roll Out of New Features

Over the past six months, we've talked about a lot of new features that
we plan to work on during this time-frame.

Since the 1.8.0 release (October 2014), we landed a large chunk of the
features we started to talk about as precursors to 2.0.

**In Ember 1.13, we will land the last chunk of 2.0 precursor features,
including the Glimmer rendering engine and React-style data flow.**

The Glimmer rendering engine is fully backwards compatible with the
Ember 1.12 public API, and we continue to do work to ensure
compatibility with real-world apps and addons that are using popular
private APIs.

The new data flow model, including one-way data flow by default,
separation of attributes from component state, opt-in mutable bindings,
and callback-style actions are all opt-in through the use of another big
new feature: **angle-bracket components**.

We do not plan to remove curly-brace components (with their legacy
semantics) in Ember 2.0, **so you can take your time upgrading your
components to the new semantics and still upgrade to Ember 2.0**. In the
sections that follow, I will lay out the most important changes and talk
about the transition path.

### 2.0 Precursor Features Already Landed By 1.12

* **elimination of metamorph tags** landed in Ember 1.8.0
* **metal-views** landed in Ember 1.8.0, providing full support for SVG
  documents, including components in SVG.
* the **HTMLBars** engine landed in 1.10, which prepared the codebase
  for Glimmer
* **block params** and **chained else** in templates landed in 1.10
* **services** landed in 1.10
* **curly attributes / elimination of `bind-attr`** (`<a
  href="{{src}}">`), the first big fruits of HTMLBars, landed in 1.11
* the **dynamic {{component}} helper** landed in 1.11
* **instance initializers**, a precursor to FastBoot, landed in 1.12

### Ember 1.13 and the Glimmer Engine

The Glimmer engine is shorthand for a whole bunch of new features. While
most of the public discussion has focused on performance, it also
integrates many of the programming model improvements pioneered by
React.

#### One-Way Values By Default

First of all, starting in Ember 2.0, template bindings are one-way by
default. Because we know that it will take some time to refactor your
applications to explicitly opt-in to two-way bindings as needed, we have
decided to make this new behavior a consequence of opting in to new
angle-bracket components.

```handlebars
{{!-- title is a mutable two-way binding --}}
{{my-component title=model.name}}

{{!-- title is just an (immutable) value --}}
<my-component title={{model.name}} />
```

At the moment, we have not yet decided when precisely to drop two-way
bindings by default, and whether to continue to include the support in a
plugin once we have dropped it. The specifics will depend largely on how
difficult the upgrade to angle-bracket components proves to be.

We expect angle-bracket components to land as part of Ember 1.13 on June
12.

#### Fast Re-Render

In Ember 1.12, calling `rerender()` on a component is an extremely
expensive operation, and blows away all of the existing DOM (together
with its internal state, such as selection, cursor, focus, scroll
position and more).

In Ember 1.13, thanks to the Glimmer engine, you can safely invoke
`rerender()` and it will only update the parts of the template that have
actually changed.

This allows you to replace an entire data structure with a totally new
POJO, `rerender` the component, and get highly performant updates that
preserve the DOM.

As in React, if you modify a property on the component that is used in
the template ("state" in React), the component will be `rerendered()`,
so the most common way to trigger a (fast) re-render is to set a
property on the component that is used by the component's template.

Notably, this model is quite similar to the binding model used in Ember
1.12, with some small changes that eliminate the possibility of creating
complex graphs of two-way bindings by accident.

#### New Lifecycle Hooks

Instead of having to register observers on "bindings" and try to reflect
the changes into your DOM, which can be fairly error-prone and
confusing, Ember 1.13 introduces a series of new lifecycle hooks that
execute whenever a component's attributes change.

Attribute changes can happen either via observation, such as when a
service has changed, or through the data-down/actions-up data flow
pattern enabled by `component.rerender()` and `component.set()`.

In Ember 1.12, you might write something like this:

```js
Component.extend({
  didInsertElement() {
    this.$().button({
      text: this.get('value'),
      disabled: this.get('disabled')
    });
  },
  valueDidChange: observer('value', function() {
    this.$().option('text', this.get('value'))
  }),

  disabledDidChange: observer('disabled', function() {
    this.$().option('disabled', this.get('disabled'))
  })
})
```

One problem with this code is that the observer can fire at any time,
and it executes both when the value is changed from inside the component
and when it is changed from the outside.

As we'll see in the next section, conflating changes coming from the
inside with changes coming from the outside can make it difficult to
reason about the data flow, and makes it very easy for code in your
component to accidentally trigger observers that were intended for
changes coming from the *outside*.

Starting with Ember 1.13, you will be able to express the same concept
more clearly:

```js
Component.extend({
  didInsertElement() {
    this.$().button({
      text: this.attrs.value,
      disabled: this.attrs.disabled
    });
  },

  didUpdateElement() {
    this.$().options({
      text: this.attrs.value,
      disabled: this.attrs.disabled
    });
  }
});
```

A full description of the new lifecycle hooks will be included with the
documentation of Ember 1.13, but they will allow you to perform work in
response to a change in attributes both before and after rendering has
taken place. You will also be able to do work for initial render only,
for updates only, or both.

#### The `attrs` Property

As described above, conflating the attributes (values provided by the
component's caller) with the component's own state can cause confusion,
especially when combined with mutable attributes.

In particular, a seemingly innocuous change to a piece of component
state can trigger a cascade of changes to child components, sibling
components, and even parent components.

Beginning with angle-bracket components in Ember 1.13, a component's
attributes will be available in `this.attrs` rather than on the
component itself.

So when a component is invoked this way:

```handlebars
<my-component title={{model.name}} />
```

The component will see `this.attrs.title` as the current value of
`model.name`. Whenever `model.name` changes via observation, or when the
parent component is re-rendered, `my-component`'s lifecycle hooks will
be triggered, and it will see a new version of `model.name`.

#### The `mut` Helper

But what if you want to allow the child component to modify the property
explicitly.

The `mut` helper will produce an object that contains both a `value`
property and an `update` method.

Imagine a component that will increment a `count` property whenever the
component is clicked.

You might write such a component this way in Ember 1.12:

```handlebars
{{my-counter count=activatedCount}}
```

```js
// my-counter.js
export default Component.extend({
  click: function() {
    this.set('count', this.get('count') + 1);
  }
});
```

While this is fairly terse, the code in the component and its invocation
is fairly unclear.  While it is modifying a property in a parent
component, nothing about the JavaScript code makes that clear. And while
the code that invokes `my-counter` is allowing its `activatedCount`
property to be modified (which is rather unusual), nothing about the
invocation makes that clear.

Especially in larger components, and when combined with an observer on
`count`, the expected behavior can become quite obtuse and it can become
hard to follow the precise, expected data flow.

In Ember 1.13, you can write the same component this way:

```handlebars
<my-counter count={{mut activatedCount}} />
```

```my-counter.js
export default Component.extend({
  click: function() {
    this.attrs.count.update(this.attrs.count.value + 1);
  }
});
```

The call to `{{mut activatedCount}}` packages up an object containing
both its current value and a callback that allows the receiving
component to modify it. There are only a handful of additional
characters, but the intent of the code is far clearer, both when the
component is invoked and when the component is updating the attribute.

In other words, `{{mut}}` just produces a regular JavaScript value that
contains both the current value and a way to update it. The lifecycle
hooks will fire at the same times as well.

#### The `action` Helper

Finally, the behavior of actions in Ember 1.12 is quite magical. You
pass an action string into a component, and `sendAction` triggers the
action in the environment that provided the string.

Frustratingly, it is impossible to pass a component that wants to
trigger an action an alternative function, because actions are strings,
not functions.

Even in Ember 1.12, you can always pass a function into a component, but
if you simply do something like: `<my-component on-playing={{actions.playing}} />`,
the `this` in the function will be wrong (you want it to be the
component). In addition, you want a way to pass arguments into the
function (i.e. "[currying][currying]").

[currying]: https://en.wikipedia.org/wiki/Currying

Starting in Ember 1.13, a new `action` helper provides you with a way to
do both of these things:

```parent-component.hbs
{{#each users as |user|}}
  <big-button on-active={{action 'selectedUser' user}} />

  {{!-- equivalent --}}
  <big-button on-active={{action actions.selectedUser user}} />
{{/each}}
```

```parent-component.js
export default Component.extend({
  actions: {
    selectedUser(user) {
      // this is the component
      // user is the user from the current iteration of the loop
    }
  }
});
```

```big-button.js
export default Component.extend({
  click: function() {
    this.attrs['on-active']();
  }
});
```

Because `big-button` is simply invoking a function, the invoking
component can provide whatever function it wants.

Another nice touch, `action` works seamlessly with `mut`. This means
that from the component's perspective, it's just calling a callback, but
the code that calls the component can easily pass in a callback that
updates one of its values.

```handlebars
<my-text on-enter={{action 'pressedEnter'}} />
<my-text on-enter={{action (mut currentText)}} />
```

```my-text.js
export default Component.extend({
  keyUp(event) {
    if (event.which === 13) {
      this.attrs['on-enter'](this.$().val());
    }
  }
});
```

In this case, `this.attrs['on-enter']` is simply a function. The
`action` helper packages up a method in the component's `actions` hash,
currying `this` (and other arguments). It also converts a `mut` object
into a function that can be invoked.

A component that wishes to support mutable bindings as actions need only
invoke the callback with a new value. Actions from the `actions` hash,
and even regular functions passed as `on-enter={{func}}` will work just
fine.

### Routeable Components

Finally, routeable components are under active development, but there is
still some uncertainty about precisely when they will land.

The complete feature has two parts:

* The ability to fully define query parameters outside the controller
  (in the route). Alex Matchneer and Trek Glowacki are actively working
  on this feature.
* The ability to have a route dispatch directly to a component, rather
  than to a controller and a template. Erik Bryn is actively working on
  this feature.

We intend to land both of these parts in the 1.x series, but there is a
good chance that they will land in 1.13.1, which will be released in
parallel with 2.0-beta. As I said in the beginning of this post, we will
likely backport a few features to the 1.13.x series in order to ease the
transition. Because of the proximity to Ember 2.0 and the impact of this
change on the programming model, routable components are a good
candidate for backporting.

Whenever we land these features precisely, we are committed to making
sure that there is a clear way to upgrade to the last point release of
1.13, clear all deprecations, and then painlessly upgrade to 2.0.

## Conclusion

Now that we have landed the Glimmer engine, we will be focusing our
energy over the next few months on the release of Ember 2.0-beta on June
12 and Ember 2.0 final on July 24.

The 1.13 release is the final minor version in the 1.x series. In order
to aid the transition to Ember 2.0, we plan to release several point
releases of 1.13 (1.13.1, 1.13.2, etc.) that will attempt to fix
regressions caused by Glimmer and do some light backporting of features
that will aid in the transition.

Note that Glimmer itself implemented the full Ember 1.x test suite, so
many of the regressions are simple bugs, related to untested features,
or related to private APIs. Based on experience over the past week
attempting to integrate Canary into existing applications, we feel
relatively optimistic about the plan of record for Ember 2.0, and where
we are in the process.

For obvious reasons (the recent merge of Glimmer), Ember 1.13-beta will
be an unusually unstable beta release, but we are hopeful that the
release of Ember 1.13.0 on June 12 will have shaken out the bulk of any
problems.

**If you have an app, the best thing you can do right now to help is try
to upgrade it to Canary.** Not all add-ons work yet, but that gap is
closing every day, and the more information we can uncover through
real-app testing, the faster this will go.

I would like to thank the whole Ember community for your enthusiasm and
effort around the Ember 2.0 release. Maintaining a focus on
compatibility while making major changes is hard, but well worth it.

Let's make this happen!
