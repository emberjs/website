---
title: Ember.js 1.13.0 and 2.0 Beta Released
author: Matthew Beale
tags: Releases
---

We are pleased to announce the release of both Ember.js 1.13.0 and the
first beta in the 2.0 series. This comes as the thirteenth cycle of our
release process that began just after 1.0 was released.

The 1.13 release represents the effort of at least 43 contributors
across over 680 commits.

## New Features in Ember.js 1.13

The Glimmer rendering engine, [announced at EmberConf](LINK VIDEO) and introduced to Ember.js
Canary on [May 5th](/blog/2015/05/05/glimmer-merging.html), is released today
in Ember.js 1.13. Glimmer is the third overhaul of Ember's 1.x rendering
layer (wow, right?), and dramatically improves rerender performance in many
common scenarios. Additionally it lays important groundwork for the Ember 2.x
development model.

**We are tremendously excited to bring Glimmer to existing applications as
a 1.x compatible minor release.** The herculean efforts of the Ember core team,
addon authors, and community to achieve this release has been inspiring.
Thank you! You are too many to possibly name.

**1.13 also marks the final minor release of the Ember 1.x cycle.** As such,
it contains a number of deprecations ahead of Ember 2.0. Resolving these
deprecations in application code aligns that application with Ember's public
API in 2.0. Any Ember app running 1.13 without causing a deprecation notice
to fire should upgrade to 2.0 without any changes.

#### Improved Rerender Performance

Previous iterations of Ember's rendering layer were based on granular
observation. Where a piece of dynamic content was rendered (such as a
new array, or new component) the old DOM and possibly-invalid child views
were discarded and new DOM and views created from scratch. Additionally,
granular observation was computationally expensive to initialize and maintain
for a large set of values.

Glimmer replaces this approach with a value-diffing strategy.
During render, each occurrence of dynamic content (for example a component,
and each helper, or a data binding) generates a value representing its
render state. Upon rerender, this tree of values is walked. Clean nodes are
presumed to already be correctly rendered, dirtied nodes have their value
recomputed and children values (which may or may not have dirtied) walked.

The result is a stunning improvement in many rerender cases.

A port of the "dbmonster" demo to Ember.js performs XX% better with 1.13 than
with Ember 1.12.

DBMONSTER VIDEO

Ember's performance in real world apps is similarly impacted. For example,
an application managed by Ray Tiley of XX COMPANY has seen a SOMEX improvement
in the speed of page transitions:

RAYTILEYVIDEO

Thanks to [@wycats](https://twitter.com/wycats) and [@tomdale](https://twitter.com/tomdale)
for their continued focus on improving
Glimmer's performance, and to [LinkedIn](http://www.linkedin.com) and
[Bustle](http://www.bustle.com/) for their
generous sponsorship of this work.

#### attrs, mut and auto-mut

In Ember 1.13, components will now have an `attrs` property set with the
passed values. For example:

```hbs
{{my-component name="Susan"}}
```

```js
// app/components/my-component.js
import Ember from "ember";

export default Ember.Component.extend({
  click() {
    console.log(this.getAttr('name')); // -> logs "Susan"
    console.log(this.attrs.name); // -> logs "Susan"
    // The old behavior still works:
    console.log(this.get('name')); // -> logs "Susan"
  }
});
```

The Glimmer rendering engine uses one-way binding at its core. In order to
implement the current two-way binding behavior of components, Glimmer requires
the addition of mutable values. We call these `mut` objects, since the `mut`
helper will be used to create them once angle components land.

`mut` objects represent a mutable value. They have a current value, and a
function that can update that value.

* `someMut.value` is the current value of the mutable value
* `someMut.update(newValue)` updates the value of the mutable value

Conceptually, a `mut` simply sets the new value to whatever it is wrapping
then triggers a rerender at whatever template
created the `mut`.

Curly components use "auto-mut" to emulate two-way binding. Any bound attribute
is wrapped as a `mut` object before being set on `attrs`. For example, making
the `name` attribute bound results in a `mut` object being set to `attrs.name`:

```hbs
{{my-component name=model.name}}
```

```js
// app/components/my-component.js
import Ember from "ember";

export default Ember.Component.extend({
  click() {
    // getAttr always returns a value, regardless of if an attr is a mut
    console.log(this.getAttr('name')); // -> logs model.name's value
    // Note that `name` is a mut object:
    console.log(this.attrs.name.value); // -> logs model.name's value
    // The old behavior still works:
    console.log(this.get('name')); // -> logs model.name's value
  }
});
```

We do not suggest you use the `attrs` API directly in 1.13. Please consider
the following suggestions:

* Using `get` to access passed values is required for
  backwards compatibility with Ember 1.x curly components.
* `getAttr` is ideal for components you
  plan to port to angle components. This API will be present on angle
  components.
* `this.attrs`, because of the auto-mut behavior, is cumbersome for curly
  components. We encourage you to not use this API with curly components.

An addon will be released that allows use of the `getAttr`
APIs with versions of Ember before 1.13. This should allow addon authors
to use this API for any app on Ember 1.x.

##### mut and setAttr

To set a two-way bound value passed to a component, the `setAttr` API has been
introduced. This API wraps calling `.update(newValue)` on the `mut` object, and again will be
available in an addon for backwards compatibility. For example:

```hbs
{{my-component name=model.name}}
```

```js
// app/components/my-component.js
import Ember from "ember";

export default Ember.Component.extend({
  click() {
    this.setAttr('name', 'Cindy');
    // The old behavior still works:
    this.set('name', 'Cindy');
    // Note that `name` is a mut object:
    this.attrs.name.update('Cindy');
  }
});
```

In general, it is suggested you use `setAttr` for mutating a two-way binding.

#### Component lifecycle hooks

A number of new component lifecycle hooks have been introduced to Ember 1.13.
Using these hooks allows you to write data down, action up (DDAU) style
components today, despite the two-way data binding of curly components.

On first render (in order):

* `didInitAttrs` runs after passed attrs are guaranteed to be up to date. This
  is more reliable than trying to ensure that attrs are always available
  on `init`. By passed attrs, we mean both the propagation of passed values
  onto the component instance, ala `component.get('name')`, and `component.attrs`.
* `didReceiveAttrs` runs after `didInitAttrs` (it also runs on
  subsequent re-renders, which is useful for logic that is the same
  on all renders).
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

```js
// app/controllers/index.js
import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    setName(name) {
      model.set('name', name);
    }
  }
});
```

```hbs
{{! app/templates/index.hbs }}
{{my-component submit=(action 'setName')}}
```

```js
// app/components/my-component.js
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

##### Interaction with mut

Actions can of course be used to express any user interaction: saving a model,
toggling UI state, etc. One use-case we have found common in Ember 1.x is
updating a property, for example updating the `name` on a model.

For this reason, we've make `mut` objects "actionable". When passed to the
action helper, they know how to curry themselves into a function where the
first argument is set as their value. For example, this code sets the
model's name to "Gretchen" upon click:

```hbs
{{! app/templates/index.hbs }}
{{my-component submit=(action (mut model.name))}}
```

```js
// app/components/my-component.js
import Ember from "ember";

export default Ember.Component.extend({
  click() {
    this.attrs.submit('Gretchen');
  }
});
```

This nicely isolates the component from knowing whether a mutable value is
set or some other action is being performed.

Thanks to [@mixonic](https://twitter.com/mixonic) and [@rwjblue](https://twitter.com/rwjblue)
for their implementation of this feature, as well as to [@wycats](https://twitter.com/wycats)
and [@KingstonTime](https://twitter.com/KingstonTime) for their thoughtful
feedback.

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

```js
// app/helpers/full-name.js
import Ember from "ember";

export default Ember.Helper.helper(function(params, hash) {
  return params.join(' ');
});
```

This helper can be used in a variety of contexts:

```hbs
{{full-name "Daniel" model.lastName}}
{{my-component name=(full-name model.firstName "Smith")}}
{{! The following usage would set the model.name to the new full name
    when my-component calls the submit action. }}
{{my-component submit=(action (mut model.name) (full-name model.firstName "Smith"))}}
```

Helpers receive two arguments: `params` are the ordered params passed to a
helper, and `hash` contains the key-value options, for example `title="Mr."`.

Some helpers may require access to other parts of Ember (services), and
some control over their own invalidation and recomputation. In these cases,
a full class-based helper can be used.

For example, this helper computes a name based on a `name-builder` service. It
also recomputes whenever the `isAnonymized` state on that service changes:

```js
// app/helpers/full-name.js
import Ember from "ember";

export default Ember.Helper.extend({
  // This service name is only an example
  nameBuilder: Ember.service.inject(),
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

```hbs
{{! app/components/show-full-name }}
{{if hasBlock}}
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

* All view APIs in Ember
  * `Ember.CoreView`, `Ember.View`, `Ember.CollectionView`, `Ember.ContainerView`
  * `{{view 'some-helper'}}`
  * The `{{view}}` keyword for accessing properties on a view
  * `Ember.Select` and `{{view "select"}}`.
Options to the `{{#each` helper that trigger a legacy and poorly performing
* Options to the `{{#each` helper that trigger a legacy and poorly performing
  legacy layer. These options are: `itemView`, `itemViewClass`, `tagName`, `emptyView` and `emptyViewClass`.
* The `itemController` argument for `{{#each`.
* The `bind-attr` helper. Using helpers and HTMLBars-style attribute binding
  is preferred.
* Reading `this.get('template')` to check for a yielded block on components.
  Instead, use the `hasBlock` API.
* Non-block param `{{with`
* The `view` and `viewClass` params for `{{outlet}}`

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
cause a rerender.

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

During the 2.0 beta cycle we will be removing and disabling  already
deprecated APIs. Much of this work has not yet started, but the following
represents what we believe the breaking changes will be.

Many controller APIs are removed in Ember 2.0. Routeable controller still
exist, but all other uses should have been deprecated. This includes:

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

All Handlebars APIs are removed in Ember 2.0. This includes:

* `Ember.Handlebars.helper`, `Ember.Handlebars.makeBoundHelper` and `Ember.Handlebars.helper`
* `Ember.Handlebars.compile`

Several template helpers are removed in Ember 2.0. These include:

* `{{bindAttr}}`
* `{{bind-attr}}`
* `{{bind}}`
* `{{template}}`
* `{{linkTo}}`
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
* `Ember.Deferred`

Additionally, IE8 is no longer supported in Ember 2.x. IE9+ is supported.

## Changelogs

+ [Ember.js 1.13.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.13.0/CHANGELOG.md)
+ [Ember.js 2.0.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v2.0.0-beta.1/CHANGELOG.md)

