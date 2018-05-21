---
title: Ember.js 1.9.0 and 1.10 Beta Released
author: Matthew Beale
tags: Releases, 2014, 1, 1.9, 1.10, Version 1.x
responsive: true
---

We are pleased to announce the release of both Ember.js 1.9.0 and the
first beta in the 1.10 series. This comes as the ninth cycle of our
release process that began just after 1.0 was released.

The 1.9 release represents the effort of at least 52 contributors across over 436 commits.

## The Road to Ember 2.0

In early November Tom, Yehuda, and the Ember.js Core Team shared [The Road to Ember 2.0](https://github.com/emberjs/rfcs/pull/15).
This RFC document acts as a map for the next several releases of Ember.js.

Ember.js 1.9 introduces several important deprecations that signal upcoming changes. Additionally, many view-layer internals are
refactored to take advantage of the "streams" observation pattern.

Ember.js 1.10 (beta) begins a series of releases that will
introduce new APIs while deprecating ones to be removed in 2.0.

To that end, and with much excitement, **we are extremely pleased to announce the introduction
of the HTMLBars templating engine into Ember.js 1.10**. This new rendering pipeline
marks a significant milestone for the framework, and by maintaining
complete API compatibility it demonstrates our commitment to stability without stagnation.

## New Features and Deprecations in Ember.js 1.9

#### Handlebars 2.0

As [announced in October](http://emberjs.com/blog/2014/10/16/handlebars-update.html), Ember.js 1.9
adds support for Handlebars 2.0 templates and removes support for Handlebars 1.x templates. This
change does not affect the template syntax or public API of Ember applications.

Projects using an Ember-CLI version less than 0.1.5 will require a bump
of the Handlebars dependency version:

```text
bower install --save handlebars#2.0.0
```

Additionally the template pre-compiler (installed via npm)
will require an update:

```
npm uninstall --save-dev broccoli-ember-hbs-template-compiler
npm install --save-dev ember-cli-htmlbars@0.6.0
```

Non-CLI applications will likewise require a bump of their Handlebars dependency version.

#### Streams

Data-binding in Ember.js has traditionally been based on the concept of a key-value
observer. In Ember 1.x, KVO observers fire immediately upon the change of a value,
giving them performance characteristics that cannot be changed until Ember 2.0. In
comparison, streams distinguish change notification from value calculation. The value of
a stream can be described as "lazy", as it is not computed until needed.

The addition of streams to Ember and their use throughout the view layer
improves the performance of rendering, simplifies many helpers, and prepares
Ember's codebase for HTMLBars.

Thanks to [@\_mmun](https://twitter.com/_mmun), [@ebryn](https://twitter.com/ebryn), and [@krisselden](https://twitter.com/krisselden) who wrote an Ember.js stream
implementation then updated every Handlebars helper to the new API.

#### Activate and Deactivate Events

Ember.js routes have long supported an `activate` and `deactivate` hook.
For example:

```app/routes/index.js
export default Ember.Route.extend({
  activate: function(){
    collectAnalytics();
  }
});
```

Ember.js 1.9 introduces corresponding events for these hooks.

```app/routes/index.js
export default Ember.Route.extend({
  collectAnalytics: function(){
    collectAnalytics();
  }.on('activate')
});
```

Thanks to [@pangratz](https://twitter.com/pangratz) for the addition of this feature.

#### pauseTest

When debugging an Ember acceptance test, it can be helpful to
pause and inspect the DOM or application state.
Ember.js 1.9 adds a new test helper for indefinitely pausing
test execution.

```javascript
test('clicking login authenticates', function(){
  visit('/');
  return pauseTest();
  // The test will never proceed to execute this click
  click('a:contains(Login)');
});
```

Thanks to [@katiegengler](https://twitter.com/katiegengler) for the addition of this feature.

#### key-up and key-down actions

The `{{input}}` and `{{textarea}}` helpers in Ember emit several
actions, including `enter`, `insert-newline`, `escape-press`, `focus-in`,
`focus-out`, and `key-press`.

This release introduces `key-up` and `key-down` actions. For example:

```handlebars
{{! call the `validateName` action on the current controller
    or component scope: }}
{{input value=name key-up="validateName"}}
```

#### Performance Improvements

Ember.js 1.9 comes with several performance improvements.

* The implementation of `_super` in Ember is fairly complex, and can
perform badly. Ember 1.9 uses a check against the string version of a
function to determine if all parts of the implementation are needed, or
if some work can be skipped.
* Additional improvements to the performance of `Ember.Map` have been made.

Thanks to [@stefanpenner](https://twitter.com/stefanpenner) for his continued
efforts on performance tuning.

#### Notable Deprecations

As Ember.js moves forward, various APIs are deprecated to allow for their
removal in a later major release (such as 2.0). The
[deprecations page](http://emberjs.com/deprecations/) summarizes
deprecations and demonstrates how to update to a new API.

Ember 1.9 deprecates context switching in templates. Templates with context
switching are difficult to read, and the concept is challenging for new
developers. The removal of context switching from templates in
Ember 2.0 aims to make scoping consistent and predictable. This deprecation
is a step toward that goal.

Two Ember helpers support context switching. The first is `{{each}}`:

```app/templates/people.hbs
{{! this context is the controller }}
{{#each model}}
  {{name}} {{! this context is each person }}
{{/each}}
```

The non-context switching version of this helper is now preferred:

```app/templates/people.hbs
{{! this context is the controller }}
{{#each person in model}}
  {{person.name}} {{! this context is still the controller }}
{{/each}}
```

The second helper is `{{with}}`:

```app/templates/person.hbs
{{! this context is the controller }}
{{#with model}}
  {{name}} {{! this context is the person }}
{{/with}}
```

The non-context switching version of this helper is now preferred:

```app/templates/person.hbs
{{! this context is the controller }}
{{#with model as person}}
  {{person.name}} {{! this context is still the controller }}
{{/with}}
```

## New Features and Deprecations in Ember.js 1.10

Ember.js 1.10 marks the migration of Ember's rendering pipeline from a
string-based process to a DOM-based one. **Existing application templates require
no modification to run HTMLBars**. New syntaxes enabled by Ember's DOM-based
rendering pipeline and HTMLBars will land over the next several releases.

Before branching into 1.10 beta, HTMLBars was available for nearly two weeks
behind a canary feature flag. We thank the community members who took time from
work or weekends to test the change and provide feedback.

Teasing apart the HTMLBars project to ship it incrementally has ensured
that existing codebases can make the jump without modification. This release
lays the infrastructural groundwork for features and even greater performance
improvements to come.

Input and feedback on the 1.10 beta from real-world use will help us ensure a
smooth transition to release.

To test your Ember-CLI codebase on Ember.js 1.10 and HTMLBars, follow these steps
to upgrade Ember:

```
rm -rf bower_components
bower install --save ember#beta
bower install
```

Then update your template compiler to HTMLBars:

```
npm uninstall --save-dev broccoli-ember-hbs-template-compiler
npm install --save-dev ember-cli-htmlbars
```

Over the beta cycle, we expect to see 3rd party libraries and
build pipelines update to support HTMLBars. If you manage a project
and have any difficulty, reach out to the community and core team
on the [forum](http://discuss.emberjs.com/) or `#ember-dev` IRC chatroom.

#### Block Params

Block parameters are a new feature introduced with 1.10. They address
two problems in Ember:

* The non-context switching version of `{{#each}}` and `{{#with}}` are inconsistent.
  `{{#each car in cars}}` and `{{#with model as car}}` have similar meaning but
  different syntaxes.
* Ember's components are strictly encapsulated. Values are explicitly passed
  in, and only actions are emitted from components. The inability to pass values
  makes composition of components difficult.

Block params add a template syntax that allows values to be yielded from
one helper or component to a child scope. The new syntax makes
the named value version of `{{#each}}` and `{{#with}}` consistent. For
example:

```handlebars
{{currentUser.name}} {{! available on the controller }}
{{#each cars as |car|}}
  {{#with car.manufacturer as |make|}}
    {{make.name}}
    {{currentUser.name}} {{! still the controller scope }}
  {{/with}}
{{/each}}
```

Preserving template scope context results in easier to read templates.

Any component in Ember 1.10 can use this feature. For example:

```app/templates/components/my-unordered-list.hbs
<ul>
  {{#each items as |item|}}
    <li>{{yield item}}</li>
  {{/each}}
</ul>
```

```app/templates/index.hbs
{{#my-unordered-list items=cars as |car|}}
  Auto: {{car.name}}
{{/my-unordered-list}}
```

The `my-unordered-list` component is called, passing `cars` as `items`. The
component template iterates through
each `item` in `items`, yielding to the calling template with a block
param. The calling template accepts the block param as `car` and displays the
car's name.

Many thanks to [@\_mmun](https://twitter.com/_mmun) for the implementation of this important new feature.

#### Renaming Release Files

A release of Ember.js consists of three files:

* `ember.prod.js` - an un-minified production build (no asserts)
* `ember.min.js` - a minified production build
* `ember.js` - a development build (with asserts)

The non-production build of Ember will not perform as well as the
production build. To ensure there is no confusion about using the
`ember.js` build in production, Ember.js 1.10 and later will use a
new filename:

* `ember.prod.js` - an un-minified production build (no asserts)
* `ember.min.js` - a minified production build
* `ember.debug.js` - a development build (with asserts)

An `ember.js` file will continue to be provided with a deprecation warning.

#### Notable Deprecations in 1.10

The following deprecations are scheduled for release with Ember.js 1.10:

* Setting the `childViews` property on a view definition will be deprecated in
  1.10. For example:

```js
var ChildB = Ember.View.extend();

export default Ember.ContainerView.extend({
  childViews: [ 'childA', ChildB ],
  childA: Ember.View.extend()
});
```

This use of `childViews` is inconsistent with other uses throughout Ember, and
as a result is difficult to implement with good performance. Explicitly creating
views upon initialization is preferred:

```js
var ChildB = Ember.View.extend();

export default Ember.ContainerView.extend({
  init: function(){
    this._super();
    this.pushObject(this.createChildView(this.childA));
    this.pushObject(this.createChildView(ChildB));
  },
  childA: Ember.View.extend()
});
```

* The `beforeObserver` feature is deprecated in Ember 1.10. Before observers
  are rarely used, but introduce significant overhead to the observer system
  in general. For observer use that requires the previous value of a property
  be known, implementing a cache is simple and more efficient. Read more about
  how to do this in [the deprecations page](http://emberjs.com/deprecations/v1.x#toc_deprecate-beforeobservers).
* Quote-less outlet names are deprecated in 1.10. An example of this is
  `{{outlet modal}}`, which would be re-written as `{{outlet "modal"}}`.
  This ensures the outlet helper is consistent with others, where unquoted
  words are values and not string literals.

As the features included in Ember 1.11 are developed, additional deprecations
may be added to the 1.10 release.

## Changelogs

+ [Ember.js 1.9.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.9.0/CHANGELOG.md)
+ [Ember.js 1.10.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.10.0-beta.1/CHANGELOG.md)
