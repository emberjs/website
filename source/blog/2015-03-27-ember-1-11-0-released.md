---
title: Ember.js 1.11.0 and 1.12 Beta Released
author: Matthew Beale
tags: Releases, 2015, Version 1.x
responsive: true
---

We are pleased to announce the release of both Ember.js 1.11.0 and the
first beta in the 1.12 series. This comes as the eleventh cycle of our
release process that began just after 1.0 was released.

The 1.11 release represents the effort of at least 87 contributors
across over 646 commits.

## New Features in Ember.js 1.11

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

For SVG attributes and the style attribute, we've made an exception to this pattern
and simply use `setAttribute` at all times.
Despite these exceptions, the property-first rule is a good way to describe what is
happening behind the scenes. In practice, the binding syntax feels natural.

Many thanks to [@mixonic](http://twitter.com/mixonic), [@\_mmun](http://twitter.com/_mmun),
and [@wycats](http://twitter.com/wycats) for their effort on the design and implementation
of this feature.

#### Escaping Content in HTMLBars

Bound attribute syntax introduces several new uses of mustaches
(the `{{` syntax used in Ember templates). These new uses
come with new security considerations.

Two notable new considerations are mustache use inside style
contexts, and inside JavaScript contexts. For example, without
escaping this
binding would be vulnerable to an XSS attack (via ActiveX
controls) in IE8:

```handlebars
<div style="width: {{userProvidedWidth}}px;"></div>
```

Implementing CSS and JavaScript context-sensitive escaping
will require further research and development. In Ember 1.11,
bound `style` attributes will warn when the value is not marked safe.

```handlebars
{{! No escaping strategy, log a warning }}
<a style="width: {{someProperty}}px"></a>
```

The examples that follow are intended to demonstrate how this
works in practice. For example these bindings Just Work:

```handlebars
{{! Works as expected }}
<a class="{{someProperty}}"></a>

{{! Works as expected, and escapes unsafe urls }}
<a href="{{someProperty}}"></a>

{{! Works as expected, and escapes unsafe urls }}
<img src="{{someProperty}}"></a>
```

Warnings about unsafe bindings other than `style` will be introduced
before Ember 2.0.

```handlebars
{{! No escaping strategy in 1.11 }}
<a onmouseover="alert('{{someProperty}}');"></a>

{{! No escaping strategy in 1.11 }}
<style>width: {{someProperty}}px</style>
```

Strings that are known to be adequately escaped can be
passed through the `htmlSafe` function to mark them safe.

```javascript
import Ember from "ember";

export default Ember.Component.extend({
  layout: Ember.HTMLBars.compile("<a style='width: {{someProperty}}px'>"),
  someProperty: function(){
    return Ember.String.htmlSafe(this.get('someKnownSafeProperty'));
  }.property('someKnownSafeProperty')
});
```

A less savory alternative is to use the `{{{` "escaped mustache" style. There are
plans to improve escaped content as we approach 2.0.

#### Inline if

In 1.11 Ember's `if` helper can be used in the inline form:

```handlebars
{{if isEnabled 'active' 'disabled'}}
```

Thanks to [@eaf4](https://twitter.com/eaf4) and [@marciojunior\_me](https://twitter.com/marciojunior_me) for
implementing this feature.

#### Each with Index

The `each` helper will support an `index` block param in Ember 1.11:

```handlebars
{{#each people as |person index|}}
  {{! The first index value will be 0 }}
  <div>{{index}}: {{person.name}}</div>
{{/each}}
```

Thanks to [@timmyce](https://twitter.com/timmyce) and [@\_mmun](https://twitter.com/_mmun) for
implementing this feature.

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
{{else if isBlue}}
  {{x-blue}}
{{else if isGreen}}
  {{x-green}}
{{/if}}
```

Can now be replaced by a computed property and the `component` helper.

```handlebars
{{component colorComponentName}}
```

The property `colorComponentName` should either have a value of `x-red`, or `x-blue` etc. As
the value of the property changes, the rendered component will also change.

A big thank you to [@lukemelia](https://twitter.com/lukemelia) for shipping
this new feature.

#### Performance Improvements

Ember.js 1.10 has favorable rendering performance compared to previous releases. We're
pleased that Ember 1.11 builds upon that progress. Compared to 1.10, common list
rendering scenarios have improved by about twenty percent and view instance
creation is over twice as fast. These measurements were made using the
[ember-performance](https://github.com/eviltrout/ember-performance) repo.

Progress continues on the [Glimmer rendering engine](https://github.com/emberjs/ember.js/pull/10501)
announced at EmberConf 2015. This dramatic performance improvement is expected to
land in Ember.js 1.13.

#### Notable Deprecations in 1.11

The following deprecations are scheduled for release with Ember.js 1.11:

* The `ObjectController` will be removed in Ember 2.0. In Ember 1.11,
  both explicitly using an `ObjectController` and using the proxying behavior
  of a generated `ObjectController` will raise deprecation warnings. See the
  [deprecation guide](/guides/deprecations#toc_objectcontroller) for more details.
* Initializing instances (via `container.lookup`) in initializers is deprecated. For
  initialization that requires instances Ember has introduced "instance initializers". See
  the [deprecation guide](/guides/deprecations#toc_access-to-instances-in-initializers)
  for more information, as well as this [documentation PR](https://github.com/emberjs/website/pull/1951)
  and [the implementation PR](https://github.com/emberjs/ember.js/pull/10256).
* Not a deprecation, but related: The `{{bind}}` template helper was a private
  helper, and has been deprecated
  since Ember 1.10. It has been removed in Ember.js 1.11.

## Changelogs

+ [Ember.js 1.11.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.11.0/CHANGELOG.md)
+ [Ember.js 1.12.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.12.0-beta.1/CHANGELOG.md)
