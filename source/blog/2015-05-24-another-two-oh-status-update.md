---
title: Another Ember 2.x Status Update
author: Yehuda Katz
tags: Recent Posts, 2015
responsive: true
---

We're just a few weeks away from the release of Ember 1.13 and Ember 2.0 beta, and while there's been a lot of focus on those releases, the trains will keep rolling on June 12. There will be a 2.1 release 6 weeks hence, and a 2.2 release 6 weeks later.

With all of the focus on Ember 2.0, it's easy to forget that 2.0 is just a six-week release, with the added ability to remove some built-up cruft. Because of the symbolic nature of 2.0, discussions about the future have had an artificial end date of June 12, which is now just three weeks away.

This post gives some more details about what cruft will be removed in Ember 2.0, but, since the first features in Ember 2.1 will land in Canary just three weeks hence, what we plan to do in the early releases of Ember 2.x.

It's important to note that we've talked a lot about an improved "Ember 2 programming model" over the past several months, significantly inspired by React. While much of the model will be in place in Ember 2.0, the early releases of Ember 2.x (especially 2.1 and 2.2), will finish up some important features. This blog post details the expected timeline.

Of course, the six-week release cycle means that we ship on a train cycle, so the precise versions of specific features may change before they land in a final release.

## Removals

While we've spent a lot of time talking about the new features that Ember is getting over the next few months, the 2.0 release itself is more about removals and de-cruft-ification.

Some notable examples:

* Context-shifting helpers (`#with item` becomes `#with item as |i|`,
  `#each list` becomes `#each list as |item|`)
* Fake block params versions of helpers (`#with foo as bar` becomes
  `#with foo as |bar|`, `#each item in list` becomes
  `#each list as |item|`)
* The `ArrayPolyfills` and `EnumerableUtils` libraries are being
  pulled out into a library; most apps should prefer lodash or other
  utility libs.
* In `#each`, the options `itemController`, `itemViewClass`,
  `itemView`; superseded by using a component inside the loop
* In `#with`, the `controller` option
* The `Ember.Handlebars` namespace and all of its properties
* `bind-attr`, superseded by just using attributes
* The legacy names `bindAttr` and `linkTo`
* The `{{collection}}` helper
* The `{{template}}` helper; superseded by `{{partial}}`
* The `{{render}}` helper; superseded in most cases by components
* Manually rendering a string into the buffer in a view
* `Ember.Deferred`; superseded by normal promises
* The globals resolver, which will be moved into an external library;
  superseded in normal use by the ES6 module resolver

While top-level controllers will not be removed in 2.0 (see more below), we will remove all of the other uses of controllers from templates (such as `#with controller=`, `{{render}}`, `itemController` and others).

In all of these cases, we did significant work in the 1.x series, especially in 1.12 and 1.13, to make sure that the dominant use-cases for these features were addressed by existing or new features.

You can learn about all of the deprecations added in the 1.x era, along with the expected transition to the features that superseded them, in the [1.x deprecations guide][deprecation-guide].

[deprecation-guide]: http://emberjs.com/deprecations/v1.x/

## The Glimmer Engine

The Glimmer engine, with its improved performance and improved support for the "data down, actions up" model, landed in Ember 1.13 beta.

## Fast Re-Render

In Ember 1.12, calling rerender() on a component is an extremely expensive operation, and blows away all of the existing DOM (together with its internal state, such as selection, cursor, focus, scroll position and more).

**In Ember 1.13**, thanks to the Glimmer engine, you can safely invoke rerender() and it will only update the parts of the template that have actually changed.

This allows you to replace an entire data structure with a totally new POJO, rerender the component, and get highly performant updates that preserve the DOM.

## New Lifecycle Hooks

Because `rerender()` is now fast and reliable, any call to `component.set()` will trigger a re-render on the component. When a component re-renders, that may change the attributes of child components, which likewise are re-rendered.

As a result of the fact that `rerender()` is now such an important part of the programming model, **Ember 1.13 beta** got a bunch of new React-inspired lifecycle hooks:

* `didUpdateAttrs`, invoked when a component's attributes have changed
  but before the component is rendered.
* `willUpdate`, invoked before a component will rerender, whether
  the update was triggered by new attributes or by rerender.
* `didUpdate`, invoked after a component has been rerendered.
* `didReceiveAttrs`, invoked when a component gets attributes, either
  initially or due to an update.
* `willRender`, invoked before a component will render, either
  initially or due to an update, and regardless of how the rerender
  was triggered.
* `didRender`, invoked after a component has been rendered, either
  initially or due to an update.

These lifecycle hooks will fire on all components (but not views), regardless of invocation style (both curlies and angle bracket style).

## Angle Bracket Components

Angle bracket components (`<my-component>`) are a very important part of the Ember 2.x programming model. In addition to nicer syntax, they serve as an opt-in for component changes that we could not easily make compatibly, such as default one-way bindings.

We originally thought that angle-bracket components would land in time for Ember 1.13, and they have already landed on Canary, and were included in the first 1.13 beta release.

However, there were some late-breaking concerns, and we have decided to defer this feature so we can write an RFC and go through the regular process. We have already written an implementation of the RFC, which we will land on Canary and keep up to date with the RFC discussions.

Because we are so close to the Ember 2.0 branch point, **this feature is likely to land in Ember 2.1.**

## Routeable Components

The routeable components RFC was first published several months ago, and has been the subject of vigorous discussion. It is one of the most anticipated features of the Ember 2.x programming model.

---

(the following two paragraphs are a bit of insider baseball)

The primary reason to attempt to land this feature in Ember 2.0, despite the fact that its development is at a relatively early stage, was a desire to deprecate controllers for 2.0. In Ember, in order to deprecate a public API, we require an alternate path for all of the use-cases of the old feature. In order to remove a feature in 2.0, it would have needed to be deprecated in 1.13.

Together, that means that in order to remove controllers in 2.0, we needed to land routeable components, the transition from controllers, in 1.13. During the 1.13 canary cycle, it became obvious that removing controllers in 2.0 would be too aggressive, so the pressure to ship Routeable Components exactly in 2.0.0 is less.

---

The work on Routeable Components, as well as work to make it possible to move query parameters fully to routes, is ongoing.

There are less than three weeks left until the 2.0-beta branch point, and given that the feature has not yet landed in Canary (and the importance and magnitude of the feature), it will probably land in 2.1 at the earliest.

**It is extremely likely to land in 2.1, or 2.2 at the latest.**

The Routeable Component feature also includes a change that makes it possible to provide multiple asynchronous attributes to the component you are routing to, rather than just the `model` attribute. The `attrs` hook will run on every transition into the route, in contrast to the `model` hook, which doesn't run again in some cases.

## FastBoot

An early version of the FastBoot feature, suitable for SEO, is already available as an Ember addon that works with Ember 1.12. We expect the addon to work with the final release of 1.13.

Work on rehydrating FastBoot will begin very soon, and we hope to land it in Canary early in the 2.x release cycle.

## Engines

The Engines feature was first proposed as an [RFC][engines-rfc] last year, and work on the feature itself will likely begin very soon.

We expect the Engines feature to land in Canary early in the 2.x release cycle.

[engines-rfc]: https://github.com/tomdale/rfcs/blob/master/active/0000-engines.md