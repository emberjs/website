---
title: Ember.js 1.13.0 and 2.0 Beta Released
author: Matthew Beale and Yehuda Katz
tags: Releases, 2015, Version 1.x
responsive: true
---

We are pleased to announce the release of both Ember.js 1.13.0 and the
first beta in the 2.0 series. This comes as the thirteenth cycle of our
release process that began just after 1.0 was released.

The 1.13 release represents the effort of at least 43 contributors
across over 680 commits.

**Ember 1.13 is the last release in the 1.x series and the first release that includes the Glimmer rendering engine.** It includes a number of deprecations that will ease the upgrade to Ember 2.0, which is due to land in six weeks.

**Ember 2.0 beta is the first release in the 2.x series.** This means that many features deprecated during the 1.x series will be removed in Ember 2.0. If you encounter any unexpected changes in features not marked as deprecated in 1.13 while testing Ember 2.0 beta, please report them immediately. We would like to fix these unintentional regressions before the final release of 2.0 in six weeks.

The release of Ember 2.0 beta also means that the first features in Ember 2.1 (most notably angle bracket components), are in their final canary stretch. Now is a good time to comment on RFCs and pull requests related to those features.

## New Features in Ember.js 1.13

The Glimmer rendering engine, [announced at EmberConf](https://www.youtube.com/watch?v=o12-90Dm-Qs&feature=youtu.be&t=47m21s) and introduced to Ember.js
Canary on [May 5th](/blog/2015/05/05/glimmer-merging.html), is released today
in Ember.js 1.13. Glimmer is the third overhaul of Ember's 1.x rendering
layer (wow, right?), and dramatically improves re-render performance in many
common scenarios. Additionally it lays important groundwork for the Ember 2.x
development model.

**We are tremendously excited to bring Glimmer to existing applications as
a 1.x compatible minor release.** The herculean efforts of the Ember core team,
addon authors, and community to achieve this release has been inspiring.
Thank you! You are too many to possibly name.

**1.13 also marks the final minor release of the Ember 1.x cycle.** As such,
it contains a number of deprecations ahead of Ember 2.0. Resolving these
deprecations in application code aligns that application with Ember's public
API in 2.0. In general, Ember apps running 1.13 without causing any deprecation notices
to fire should upgrade to 2.0 without changes.

The easiest way to work through deprecations is the **Ember Inspector**. Thanks to the work of Teddy Zeenny, deprecations will be routed to the "Deprecations" inspector pane, where you can get a grouped list of them as well as the line of code in your app that triggered the deprecation. You can also ask for a full stack trace of any deprecation.

#### Improved Rerender Performance

Previous iterations of Ember's rendering engine **relied** on granular observation for efficiency. When a piece of dynamic content was rendered, Ember registered observers, updating the content when the value changed.

While this was reasonably efficient in cases where the developer could easily use `set` (and the array equivalents) to mutate values, it had two related issues:

* This forced developers to represent all changes in terms of granular
  observers. In many cases this could be extremely awkward. This was
  especially problematic when working with Arrays, since (for example)
  representing a sort as a series of mutations is conceptually complex
  and can be cost-prohibitive.
* Ember itself was extremely inefficient when an entire object or
  array was replaced, despite the fact that this was often the most
  natural way to represent the change. This meant that while it was
  usually possible in theory to "just re-render" a component, it was,
  in practice, cost prohibitive (to say the least).

To address these issues, Glimmer adopts a value-diffing strategy, using a virtual tree of the dynamic areas of the DOM. This means that even if the original data structure (for example, an array) is completely replaced, the DOM is not updated unless the resulting rendered content has changed.

When updating an array with a new array (because you got a new array from the server, or because you produced a new array through `.sort()`), you will see a large improvement in performance, **making this kind of replacement plausible in Ember.**

Notably, the Ember strategy continues to support efficient updates via value observation, which we expect to be useful when communicating with services and models.

Glimmer's hybrid model can opportunistically take advantage of explicit mutation (via `set`) when it is used, while also supporting efficient re-renders of entire data structures, updating only the DOM  nodes that need to be changed.

The result is a stunning improvement in many rerender cases.

We would like to thank React for showing that full re-renders can be made efficient. While we did not use their precise Virtual DOM approach, their work with Virtual DOM was extremely influential to our approach in Glimmer.

Thanks to [@wycats](https://twitter.com/wycats) and [@tomdale](https://twitter.com/tomdale)
for their continued focus on improving
Glimmer's performance, and to [LinkedIn](http://www.linkedin.com) and
[Bustle](http://www.bustle.com/) for their
generous sponsorship of this work.

#### Component Lifecycle Hooks

A number of new component lifecycle hooks have been introduced to Ember 1.13.
Using these hooks allows you to write data down, action up (DDAU) style
components today, despite the two-way data binding of curly components.

On first render (in order):

* `didInitAttrs` runs after a component was created and passed attrs are guaranteed to be present. In Ember 1.13, the attributes will be available as `this.get('attrName')`.
* `didReceiveAttrs` runs after `didInitAttrs`, and it also runs on
  subsequent re-renders, which is useful for logic that is the same
  on all renders. It does not run when the component has been re-rendered from the inside.
* `willRender` runs before the template is rendered. It runs when the
  template is updated for any reason (both initial and re-render, and
  regardless of whether the change was caused by an attrs change or
  re-render).
* `didInsertElement` runs after the template has rendered and the
  element is in the DOM.
* `didRender` runs after `didInsertElement` (it also runs on subsequent
  re-renders).

On re-render (in order):

* `didUpdateAttrs` runs when the attributes of a component have changed
  (but not when the component is re-rendered, via `component.rerender`,
  `component.set`, or changes in models or services used by the
  template).
* `didReceiveAttrs`, same as above.
* `willUpdate` runs when the component is re-rendering for any reason,
  including `component.rerender()`, `component.set()` or changes in
  models or services used by the template.
* `willRender`, same as above
* `didUpdate` runs after the template has re-rendered and the DOM is
  now up to date.
* `didRender`, same as above.

Note that a component is re-rendered whenever:

1. any of its attributes change
2. `component.set()` is called
3. `component.rerender()` is called
4. a property on a model or service used by the template has changed
   (including through computed properties).

Because of the Glimmer engine, these re-renders are fast, and avoid
unnecessary work.

#### Closure Actions

In Ember 1.x, the actions system used bubbling as a solution for passing user
behavior to a parent scope. For example, when clicking a button an action
might bubble through several controllers then be handled on a route.

Action bubbling was difficult to debug, and plagued by an inability to have
a return value (since the return value of an action handler controlled further
bubbling).

Ember 2.x is component-driven, and replaces action bubbling with a function-passing
solution. This greatly simplifies working with actions (they are just functions),
enables return values, and introduces some powerful new currying capabilities.

For example, action `submit` is passed to `my-component` where it is called upon
click:

```app/controllers/index.js
import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    setName(name) {
      model.set('name', name);
    }
  }
});
```

```app/templates/index.hbs
{{my-component submit=(action 'setName')}}
```

```app/components/my-component.js
import Ember from "ember";

export default Ember.Component.extend({
  click() {
    this.attrs.submit(this.get('name'));
  }
});
```

Actions:

* Can be passed multiple arguments
* Return a value. For example `var result = this.attrs.submit();`
* Can curry. For example `submit=(action 'setName' 'Sal')` would pass `"Sal"` as
  the first argument to `setName` when `submit` is called. Actions can curry
  multiple times, adding arguments at each scope. For example `submit=(action attrs.actionPassedIn someProp)` just adds an argument to any already curried onto `actionPassedIn`.

Additionally the `action` helper has two options:

* `(action 'save' target=session)` would look at the `actions` hash on the
  `session` object instead of the current context.
* `(action 'save' value="currentTarget.value")` would read the path `currentTarget.value`
  off whatever the first argument to the called action is. This is handy for
  destructuring objects passed as the first argument (like DOM events).

#### Note: Angle Bracket Components

Ember 2.1 will (likely) ship with angle-bracket components, which will introduce one-way data flow **by default**, and provide an opt-in for two-way data flow. Existing components maintain the existing behavior (for compatibility). While the internals of Ember 2.0 support a distinction between one-way and two-way bindings, that distinction will remain largely internal until Ember 2.1.

#### New Ember.js Helper API

Ember's helper story prior to 1.13 has been inconsistent and neglected. In
1.13, we're introducing a new API for writing helpers along with a set of
constraints and features informed by real-world experience.

Ember helpers:

* Represent a single value
* Do not manage DOM or control flow
* Can recompute themselves, similar to how a component can rerender
* Can optionally access services
* Do not require a dash

Helpers come in two flavors. The first is a function-based API we call a
shorthand helper. For example, this shorthand helper joins a first and
last name:

```app/helpers/full-name.js
import Ember from "ember";

export default Ember.Helper.helper(function(params, hash) {
  return params.join(' ');
});
```

This helper can be used in a variety of contexts:

```handlebars
{{full-name "Daniel" model.lastName}}
{{my-component name=(full-name model.firstName "Smith")}}
{{! The following usage would set the model.name to the new full name
    when my-component calls the submit action. }}
{{my-component submit=(action (mut model.name) (full-name model.firstName "Smith"))}}
```

Helpers receive two arguments: `params` are the ordered params passed to a
helper, and `hash` contains the key-value options, for example `title="Mr."`.

This function version satisfies a wide array of use-cases and is quite powerful. In general, you should use this helper form unless you have a strong reason to do otherwise.

Some helpers, especially in addons, may require access to other parts of Ember (services), and
some control over their own invalidation and recomputation. In these cases, a helper class can be used.

For example, this helper computes a name based on a `name-builder` service. It
also recomputes whenever the `isAnonymized` state on that service changes:

```app/helpers/full-name.js
import Ember from "ember";

export default Ember.Helper.extend({
  // This service name is only an example
  nameBuilder: Ember.inject.service(),
  compute(params, hash) {
    return this.get('nameBuilder').build(params, hash.title);
  },
  rebuildName: Ember.observer('nameBuilder.isAnonymized', function() {
    this.recompute();
  })
});
```

For more information on the new helper API please see [RFC #53](https://github.com/emberjs/rfcs/blob/master/text/0053-helpers.md) on helpers and [RFC #58](https://github.com/emberjs/rfcs/pull/58)
on dashless helpers. Thanks to the addon community (especially [@jamesarosen](https://twitter.com/jamesarosen)) for bringing the
requirements for this API to our attention and testing changes with little notice.
Thanks to [@mixonic](https://twitter.com/mixonic)
and [@rwjblue](https://twitter.com/rwjblue) for the implementation.

#### Component Block Info

Ember.js 1.13 introduces two new template keywords that provide reflection on
how a component is called.

`hasBlock` will be true when a component is invoked in block form. For example
given this component:

```app/components/show-full-name.hbs
{{#if hasBlock}}
  {{yield fullName}}
{{else}}
  {{fullName}}
{{/if}}
```

Then these two usages would be valid:

```hbs
{{! app/index/template.hbs }}

Full name: {{show-full-name firstName=firstName lastName=lastName}}

{{#show-full-name firstName=firstName lastName=lastName as |fullName|}}
  Full name: {{fullName}}
{{/show-full-name}}
```

Additionally, `hasBlockParams` will be true if the component is invoked
with block params (invoke in block form with `as |someParam|`).

Thanks to [@mmun](https://twitter.com/_mmun) and [@rwjblue](https://twitter.com/rwjblue)
for implementing this feature.

#### Notable Deprecations in 1.13

In preparation for Ember 2.0, 1.13 introduces many deprecations. These include:

* All view APIs in Ember. [See deprecation guide](http://emberjs.com/deprecations/v1.x/#toc_ember-view)
  * `Ember.CoreView`, `Ember.View`, `Ember.CollectionView`, `Ember.ContainerView`
  * `{{view 'some-helper'}}`
  * The `{{view}}` keyword for accessing properties on a view
  * `Ember.Select` and `{{view "select"}}`. [See deprecation guide](http://emberjs.com/deprecations/v1.x/#toc_ember-select)
  * `Ember.LinkView` in favor of `Ember.LinkComponent`. [See deprecation guide](http://emberjs.com/deprecations/v1.x/#toc_ember-linkview)
* Options to the `{{#each` helper that trigger a legacy and poorly performing
  legacy layer. These options are: `itemView`, `itemViewClass`, `tagName`, `emptyView` and `emptyViewClass`.
* The `itemController` argument for `{{#each`.
* The `bind-attr` helper. Using helpers and HTMLBars-style attribute binding
  is preferred.
* Reading `this.get('template')` to check for a yielded block on components.
  Instead, use the `hasBlock` API.
* Non-block param `{{with`
* The `view` and `viewClass` params for `{{outlet}}`
* `Ember.reduceComputed` and `Ember.arrayComputed` in favor of plain normal
  array manipulations. [See deprecation guide](http://emberjs.com/deprecations/v1.x/#toc_ember-reducecomputed-ember-arraycomputed)

## Ember 2.0 beta

Last November, @wycats and @tomdale published [The Road to Ember 2.0](https://github.com/emberjs/rfcs/pull/15),
an RFC summarizing Ember's goals for a 2.0 release. At EmberConf, when some of
these changes were already complete and others not begun, they announced
our intent to ship 2.0 beta on June 12th.

Together, the features summarized in the 2.0 RFC describe a new way to
author Ember applications. Model-View-Controller is replaced by
Model-Route-Component-Service. Two-way bindings are replaced by data down,
actions up (DDAU).

Ember 2.0 will not introduce the entirety of our improved development model.
However it will take significant steps in that direction, and allow the
removal of public APIs that have been difficult to maintain while we
iterate forward.

Because of the focus on landing migration paths for 1.x codebases in 1.13,
2.0 will have few new features. Among them are:

#### each-in helper

The `each-in` helper allows the iteration of object properties. For example,
given this value for `items`:

```js
let items = {
  "Item 1": 1234,
  "Item 2": 3456
};
```

The following template will iterate the keys:

```hbs
{{#each-in items as |key value|}}
  <p>{{key}}: {{value}}</p>
{{/each-in}}
```

Note that this helper is unbound. Adding a new property to `items` will not
cause a rerender, but `.set('items', val)` will.

Thanks to [@tomdale](http://twitter.com/tomdale) and implementing this
feature, and to several others for helping push it to completion.

#### get helper

The `get` helper provides a bound way to fetch a single property from an object.
For example given these items:

```js
let items = {
  "Item 1": 1234,
  "Item 2": 3456
};
```

The following template display `1234`:

```hbs
{{get items 'Item 1'}}
```

This becomes more powerful when the second argument is a bound path:

```hbs
{{get items somePathWithAKey}}
```

Thanks to [@jmurphyau](https://twitter.com/jmurphyau) for implementing this feature.

#### Notable Breaking Changes in Ember 2.0

Ember 2.0 will remove a number of public APIs, all of which should have been
deprecated in the 1.13 release and have a viable migration path. The Ember
[Deprecation Guide](http://emberjs.com/deprecations/v1.x/) should provide a
clear migration path for commonly used APIs.

During the 2.0 beta cycle we will be removing and disabling already
deprecated APIs. Much of this work has not yet started, but the following
represents what we believe the breaking changes will be.

Many controller APIs are removed in Ember 2.0. Routeable controllers still
exist, but all other uses have been deprecated. This includes:

* `{{render "some-controller"}}`
* `{{each item itemController="some-controller"}}` - This usage can be replaced
  by nesting a component inside the item, and by using helpers.
* `Ember.ObjectController`
* `Ember.ArrayController`
* The `{{controller}}` keyword
* `needs:` on controllers

All view APIs are removed in Ember 2.0. This includes:

* `Ember.CoreView`, `Ember.View`, `Ember.ContainerView` and `Ember.CollectionView`
* `Ember._Metamorph`, `Ember._MetamorphView`
* The `{{view "some-view"}}` helper
* The `{{view}}` keyword
* `{{each itemView=`, `{{each itemViewClass=`, `{{each tagName=`, `{{each emptyView=`, `{{each emptyViewClass`
* `Ember.Select` and `{{view "select"}}`
* `Ember.Checkbox` is not removed, but will become a component instead of a view

The most commonly used parts of the `view` API will be supported into the forseeable future via a core-supported addon.

All Handlebars APIs are removed in Ember 2.0. This includes:

* `Ember.Handlebars.helper`, `Ember.Handlebars.makeBoundHelper` and `Ember.Handlebars.helper`
* `Ember.Handlebars.compile`

Several template helpers are removed in Ember 2.0. These include:

* `{{bindAttr}}`
* `{{bind-attr}}` (use HTMLBars-style attribute bindings instead)
* `{{bind}}`
* `{{template}}` (use `{{partial}}` instead)
* `{{linkTo}}` (use `{{link-to}}` instead)
* `{{collection items}}`
* Non-block params versions of `{{#each}}` and `{{#with}}`
* Legacy arguments to `{{#each}}`, `{{outlet}}`

The following routing APIs are removed:

* `#hash` paths with no forward leading slash

Other APIs:

* `Ember.tryFinally`
* `Ember.tryCatchFinally`
* `Ember.required`
* `Ember.Map#remove`
* `Ember.Set`
* `Ember.computed.defaultTo`
* `Ember.DeferredMixin`
* `Ember.Deferred` (use `Ember.RSVP.Promise` instead)
* `Ember.reduceComputed` and `Ember.arrayComputed` (use plain array manipulation)
* `Ember.Freezable` (use Object.freeze instead)

Additionally, IE8 is no longer supported in Ember 2.x. IE9+ is supported.

Many of these deprecated APIs will be moved into core-supported addons, or have already been moved.

## Changelogs

+ [Ember.js 1.13.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.13.0/CHANGELOG.md)
+ [Ember.js 2.0.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.0.0-beta.1/CHANGELOG.md)
