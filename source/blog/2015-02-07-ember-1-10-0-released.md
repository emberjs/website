---
title: Ember.js 1.10.0 and 1.11 Beta Released
author: Matthew Beale
tags: Releases, 2015, Version 1.x
responsive: true
---

We are pleased to announce the release of both Ember.js 1.10.0 and the
first beta in the 1.11 series. This comes as the tenth cycle of our
release process that began just after 1.0 was released.

The 1.10 release represents the effort of at least 50 contributors
across over 553 commits.

## The HTMLBars Templating Engine

Throughout 2014 the Ember.js community has poured its shared effort into
a new templating solution. This new library, dubbed HTMLBars, makes available
features and performance improvements impossible to support with Handlebars
(the previous library). We are delighted to announce the inclusion of
the HTMLBars templating engine in Ember.js 1.10.

HTMLBars will enable the implementation of several APIs described in
[The Road to Ember 2.0](https://github.com/emberjs/rfcs/pull/15), and contributes
to our continued improvement of rendering performance. Additionally,
it will allow us to continue supporting all Ember 1.x template syntax.

This long-term effort would not have succeeded without the continued
contributions of the Ember community and core team. In no particular
order and with apologies to anyone we've missed we would like to thank
[@krisselden](http://twitter.com/krisselden), [@wycats](http://twitter.com/wycats),
[@\_mmun](http://twitter.com/_mmun), [@nerd20](http://twitter.com/nerd20),
[@mixonic](http://twitter.com/mixonic), [@ebryn](http://twitter.com/ebryn),
[@salzhrani](https://twitter.com/salzhrani), [@rwjblue](http://twitter.com/rwjblue),
[@tomdale](http://twitter.com/tomdale), [oneeman](http://github.com/oneeman),
[@kpdecker](http://twitter.com/kpdecker) and the many alpha and beta
testers who provided feedback and bug reports. You are the stuff "stability without
stagnation" is made of.

## New Features in Ember.js 1.10

#### HTMLBars 0.8.5

Ember.js 1.10 is dependent on HTMLBars 0.8.5. To ease this and later template
library version changes, Ember's template compiler will be packaged as a
part of the release files. For example, a JSBin in Ember 1.9 would need to be
updated from:

```html
<script src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v2.0.0.js"></script>
<script src="http://builds.emberjs.com/tags/v1.9.1/ember.js"></script>
```

to

```html
<script src="http://builds.emberjs.com/tags/v1.10.0/ember-template-compiler.js"></script>
<script src="http://builds.emberjs.com/tags/v1.10.0/ember.debug.js"></script>
```

The `ember-template-compiler.js` is only required for template compilation. The
runtime dependencies for HTMLBars are built into the framework file.

To smoothly upgrade to 1.10 and HTMLBars, Ember-CLI users should update to a
version at or after 0.1.12, remove
their application's Handlebars dependency, and modify the Brocfile to not load Handlebars.
[This diff](https://github.com/rwjblue/components-in-subdirs/commit/78e7ed2d072f42d9cf0fd3d9fc2376f106ab762e)
shows the changes needed to upgrade an Ember-CLI app to 1.10.

Ember App-Kit users should upgrade to Ember-CLI.

Ember-Rails users should upgrade to version 0.16.1, then remove their Handlebars
dependency.

Developers of applications that follow a non-standard build pipeline should
review the instructions [published by Robert Jackson this week](/blog/2015/02/05/compiling-templates-in-1-10-0.html)
and join the conversation at [discuss.emberjs.com](http://discuss.emberjs.com/)
or on IRC.

#### Performance Improvements

Ember.js 1.8 introduced a performance regression that we expected to re-coup in
the 1.10 release. In December the team at [Discourse](http://www.discourse.org/) created the
[ember-performance](https://github.com/eviltrout/ember-performance) repo.
This project aids Ember developers in profiling and measuring performance in the
framework.

Using these benchmarks, we're pleased to report a twelve percent improvement
in common rendering scenarios between 1.7 and 1.10, and as much as a fifty
percent improvement between 1.9 and 1.10.

Better rendering and general framework performance continue to be a priority for
the core team and community. Specific goals include reactive rendering for
HTMLBars, more optimized metal views, limiting observation, and refinements to the Ember
object model.

#### Chained Else Blocks

HTMLBars is built using the Handlebars parser, and will continue to gain
features related to template syntax. Ember 1.10 features support for chained
else helpers, the most common use being `else if`. An example:

```handlebars
{{#if isAtWork}}
  Ship that code!
{{else if isReading}}
  You can finish War and Peace eventually...
{{/if}}
```

Chained else helpers work with any `else`, including those of `with` and `each`
helpers.

You can read more about the implemetation [in the Handlebars repo](https://github.com/wycats/handlebars.js/pull/892).
Thanks to [@kpdecker](http://twitter.com/kpdecker) for this improvement.

#### Block Params

Ember 1.10 introduces block parameters. Block params provide consistent
scope to templates, and allow components to pass internal values to a downstream
scope.

For example:

```handlebars
{{currentUser.name}} {{! available on the controller }}
{{#each cars as |car|}}
  {{#with car.manufacturer as |make|}}
    {{make.name}}
    {{currentUser.name}} {{! still the controller scope }}
  {{/with}}
{{/each}}
```

Preserving template context results in easier to read templates, and passing
variables into child scopes allows for new patterns of component composition.

Block params are passed from a template via the `yield` helper. For example, this
component yields the `fullName` and `age` values:

```app/components/x-customer.js
export default Ember.Component.extend({

  fullName: function(){
    var customer = this.get('customer');
    return [customer.get('firstName'), customer.get('lastName')].join(' ');
  }.property('customer.firstName', 'customer.lastName'),

  age: function(){
    return (new Date() - this.get('birthday')) / (86400000 * 365);
  }.property('birthday')

});
```

```app/components/x-customer.hbs
<div class="customer">
  {{yield fullName age}}
</div>
```

```app/templates/index.hbs
<div class="layout">
  {{#x-customer customer=model birthday=model.birthday as |fullName age|}}
    Hello, {{fullName}}. You are {{age}} years old.
  {{/x-customer}}
</div>
```

Many thanks to [@\_mmun](https://twitter.com/_mmun) for the implementation of this new feature.

#### Injected Properties

Ember 1.x has exposed two APIs for managing dependency injection. The first is
the application initializer API, using `register` and `inject` methods on an
application instance. The second allows configuration of an injection on
controllers via `needs`. You can read more about these patterns in
[the dependency injection guide](/guides/understanding-ember/dependency-injection-and-service-lookup/).

The new injected properties offer a more declarative API for dependency injection.

Use `Ember.inject.service()` to inject a service with the same name as the property
it is injected as. In this example, the `storage` service is injected onto the
`storage` property:

```javascript
export default Ember.Component.extend({
  storage: Ember.inject.service()
});
```

Passing a name to the `service()` method allows a different service to be injected.
For example:

```javascript
export default Ember.Component.extend({
  storage: Ember.inject.service('local-storage')
});
```

In addition to injecting services, controllers can be injected with `Ember.inject.controller`.

Importantly, these injections are lazy. When used within a unit test, a stubbed service can
be passed during `create`. For example:

```javascript
test("a value is saved on storage", function(){
  expect(1);
  var component = this.subject({
    storage: {
      write: function(){
        ok(true, 'value was written');
      }
    }
  });

  var element = this.append();
  element.click();
});
```

Refer to the [API documentation](/api/#method_inject_service) to read about this new feature in
detail.

Thanks to [slindberg](https://github.com/slindberg) for his implementation of this feature.

#### Notable Deprecations

As Ember.js moves forward, various APIs are deprecated to allow for their
removal in a later major release (such as 2.0). The
[deprecations page](/deprecations/) summarizes
deprecations and demonstrates how to update to a new API.

* The explicit `{{bind}}` helper has been deprecated. This helper has
  long been marked private, and was a legacy Sproutcore
  feature. This helper will be removed in Ember 1.11.
* Quote-less outlet names are deprecated in 1.10. An example of this is
  `{{outlet modal}}`, which should be re-written as `{{outlet "modal"}}`.
  This ensures the outlet helper is consistent with others, where unquoted
  words are values and not string literals.
* The `beforeObserver` feature is deprecated in Ember 1.10. Before observers
  are rarely used, but introduce significant overhead to the observer system
  in general. For observer use that requires the previous value of a property
  be known, implementing a cache is simple and more efficient. Read more about
  how to do this on [the deprecations page](/deprecations/v1.x#toc_deprecate-beforeobservers).
* Observing the `childViews` array of a `ContainerView` is deprecated.
* Setting the `childViews` property on a view definition is deprecated in
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

## New Features in Ember.js 1.11 beta

Ember.js 1.11 beta continues a series of releases iterating the framework
toward our 2.0 goals. In six weeks, these and a few other features will
be declared stable.

#### Inline if

In 1.11 Ember's `if` helper can be used in the inline form:

```handlebars
{{if isEnabled 'active' 'disabled'}}
```

Thanks to [@marciojunior\_me](https://twitter.com/marciojunior_me) for
implementing this feature.

#### Each with Index

The `each` helper will support an `index` block param in Ember 1.11:

```handlebars
{{#each people as |person index|}}
  {{! The first index value will be 0 }}
  <div>{{index}}: {{person.name}}</div>
{{/each}}
```

Thanks to [@\_mmun](https://twitter.com/_mmun) for
implementing this feature.

#### Bound Attribute Syntax

Current Ember developers are familiar with the `bind-attr` syntax, used
to declare an attribute binding on an HTML element. An original
motivation for HTMLBars was to improve on this syntax.

Ember 1.11 introduces a more intuitive API for attribute binding. For
example, here the `color` variable is bound to the class of a div:

```handlebars
<div class="{{color}}"></div>
```

The inline if helper can also be used in these contexts:

```handlebars
<div class="{{color}} {{if isEnabled 'active' 'disabled'}}"></div>
```

For some attributes, like the `disabled` boolean, passing a literal value
is desirable. An example:

```handlebars
<input disabled={{isDisabled}}>
```

To allow the data-binding of non-string values to boolean properties and
custom element properties, bound attributes are implemented with a
**property-first** setter.

When binding to an attribute, Ember first checks to see if that attribute is a
property of the element's DOM node (with normalization of capitalization). If it
is, the value is set with a property. For example:

```handlebars
<input disabled={{isDisabled}}>
```

```js
// disabled is a property of input elements, so...
input.disabled = true;
```

If the attribute is not present as a property, then its value is set as an
attribute:

```handlebars
<div class={{color}}>
```

```js
// class is not a property of div elements, do...
div.setAttribute('class', 'red');
```

For SVG attributes and the style attribute, we've made a exceptions to this pattern.
Despite these exceptions, the property-first rule is a good way to describe what is
happening behind the scenes. In practice, the binding syntax feels natural.

Many thanks to [@mixonic](http://twitter.com/mixonic), [@\_mmun](http://twitter.com/_mmun),
and [@wycats](http://twitter.com/wycats) for their effort on the design and implementation
of this feature.

#### Named Substates

Two routing substates exist for Ember routes. The `loading` substate will be entered
if the async hooks of a route are still processing, and the `error` substate will be
entered when an async hook promise is rejected.

Substates are sibling routes. When the `new` route of `cars.new` is loading, the `cars.loading`
substate is entered. The `application` route has no parent namespace to nest its siblings.
This makes using the `loading` and `error` substates impossible for an application route.

Named substates add a new lookup method for substates. The name of the route is pre-pended
onto the substate. So a valid loading substate for `application` can be defined as
`application_loading`.

Thanks to [@machty](http://twitter.com/machty) for landing this feature.

#### Component Helper

Ember components can be bound via the `component` helper. For example this logic
in a template:

```handlebars
{{#if isRed}}
  {{x-red}}
{{/if}}
{{if isBlue}}
  {{x-blue}}
{{/if}}
{{if isGreen}}
  {{x-green}}
{{/if}}
```

Can now be replaced by a computed property and the `component` helper.

```handlebars
{{component colorComponentName}}
```

The property `colorComponentName` should have a value of `x-red`, `x-blue` etc. As
the value of the property changes, the rendered component will also change.

A big thank you to [@lukemelia](https://twitter.com/lukemelia) for shipping
this new feature.

#### Notable Deprecations in 1.11

The following deprecations are scheduled for release with Ember.js 1.11:

* The `ObjectController` will be removed in Ember 2.0. In Ember 1.11,
  both explicitly using an `ObjectController` and using the proxying behavior
  of a generated `ObjectController` will raise deprecation warnings.

As the features included in Ember 1.12 are developed, additional deprecations
may be added to the 1.11 release.

## Changelogs

+ [Ember.js 1.10.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.10.0/CHANGELOG.md)
+ [Ember.js 1.11.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.11.0-beta.1/CHANGELOG.md)

*Using Ember? Please take ten minutes to share your
feedback by participating in the [2015 Ember Community Survey](http://goo.gl/forms/6yIsF3TNsQ). Open
until February 20th.*
