Periodically, various APIs in Ember.js may be deprecated. During a minor
release, for instance when upgrading from version 1.9 to 1.10, you may see new
deprecations fire in your codebase. Until a major revision such as 2.0 lands,
code firing such deprecations is still supported by the Ember community. After
the next major revision lands, the supporting code may be removed. This style
of change management is commonly referred to as [Semantic Versioning](http://semver.org/).

What follows is a list of deprecations introduced to Ember.js during the 1.x
cycle.

### Deprecations Added in 1.7

#### Deprecate observing container views like arrays.

ContainerViews have been observable as arrays, where the items in
the array are childViews. This introduces complexity into container
views despite the feature being a rarely used one.

#### Deprecate Ember.DeferredMixin and Ember.Deferred.

`Ember.DeferredMixin` and `Ember.Deferred` have been deprecated in favor
of using `RSVP.Promise`s.

#### Deprecate `.then` on Ember.Application.

As part of the `Ember.DeferredMixin` deprecation, using `.then` on an
Ember.Application instance itself has been deprecated.

You can use the `ready` hook or initializers to defer/advance readiness
instead.

### Deprecations Added in 1.8

#### Global lookup of views

Previous to Ember 1.8, views would commonly be fetched from the global
scope:

```handlebars
{{view App.SomeView}}
{{each item in items itemViewClass=App.SomeView}}
```

Since Ember 1.8, views are more appropriately resolved on the application
via strings:

```handlebars
{{view "some"}}
{{each item in items itemViewClass="some"}}
```

They may also be fetched via a binding:

```handlebars
{{view view.someViewViaTheCurrentView}}
{{each itemViewClass=someViewViaAControllerProperty}}
```

In general, it is recommended that your Ember application avoid accessing
globals from a template.

##### New usage of Ember.Select

Most of Ember's provided views are already accessed via helpers. For example,
the [Ember.TextField](/api/classes/Ember.TextField.html) view is used via the
[input helper](/api/classes/Ember.Handlebars.helpers.html#method_input).

The [Ember.Select](/api/classes/Ember.Select.html) view has not been upgraded to
have a helper. Instead, it was suggested that you call it via the global
class name:

```handlebars
{{view Ember.Select content=manyItems}}
```

Since this lookup is now deprecated, the select view has been registered
on an application as `select`. The new usage is:

```handlebars
{{view "select" content=manyItems}}
```

See the updated [Ember.Select](/api/classes/Ember.Select.html) documentation
and the [built-in views guide](/guides/views/built-in-views) for more details
and examples.

##### Ember.js libraries and plugins

If the code triggering this deprecation is being fired from a library, that
library may need to update its suggested usage.

One solution for such a library is to provide mixins instead of classes:

```JavaScript
// usage is {{view "list"}}
var App.ListView = Ember.View.extend(ListView);
```

A more advanced solution is to use an initializer to register the plugin's
views on the the application:

```JavaScript
// usage is {{view "list"}}
Ember.Application.initializer({
  name: 'list-view',
  initialize: function(container, application) {
    container.register('view:list', ListView);
  }
});
```

More details on how to register an Ember.js framework component are available
in the [initializer API documentation](/api/classes/Ember.Application.html#toc_initializers)
and the [dependency injection guide](/guides/understanding-ember/dependency-injection-and-service-lookup).

#### Deprecate location: 'hash' paths that don't include a forward slash. e.g. #/foo NOT #foo

Prior to this release, if you were using `location: 'hash'` (which is the default), you were able to link to a route with a `location.hash` that didn't contain the expected leading forward slash. e.g. `#foo` instead of the correct `#/foo`. Very few, if any, should be impacted by this since the router always produces the correct form.

Doing so is ambiguous because you may also be trying to link to an element on the page who's id matches `<div id="foo">` and it also erroneously will create an extra history state if a user clicks on something that transitions to that route again, since it will change `location.hash === '#/foo'`.

This ability will be removed quickly to allow us to mimick the browser's behavior of scrolling the page to an element who's id matches, but in our case doing so after the transition ends and everything is rendered. Once this feature is added, you'll be able to link to id's even with doubled up hashes: `#/foo#some-id` as well as the expected `#some-id`.

### Deprecations Added in 1.9

#### More Consistent Handlebars Scope

In today's Ember, the `each` and `with` helpers come in two flavors: a "context-switching" flavor and a "named-parameter" flavor.

```handlebars
{{#each post in posts}}
  {{!-- the context in here is the same as the outside context,
        and `post` references the current iteration --}}
{{/each}}

{{#each posts}}
  {{!-- the context in here has shifted to the individual post.
        the outer context is no longer accessible --}}
{{/each}}

{{#with post as otherPost}}
  {{!-- the context in here is the same as the outside context }}
{{/with}}

{{#with post}}
  {{!-- the context in here has shifted to the post.
        the outer context is no longer accessible --}}
{{/with}}
```

This has proven to be one of the more confusing parts of the Ember templating system. It is also not clear to
beginners which to use, and when they choose the context-shifting form, they lose access to values in the outer
context that may be important.

Because the helper itself offers no clue about the context-shifting behavior, it is easy (even for more experienced
Ember developers) to get confused when skimming a template about which object a value refers to.

The context-shifting forms of `#each` and `#with` have been deprecated in favor of the named-parameter forms.

##### Transition Plan

To transition your code to the new syntax, you can change templates that look like this:

```handlebars
{{#each people}}
  <p>{{firstName}} {{lastName}}</p>
  <p>{{address}}</p>
{{/each}}
```

with:

```handlebars
{{#each person in people}}
  <p>{{person.firstName}} {{person.lastName}}</p>
  <p>{{person.address}}</p>
{{/each}}
```


In preparation for further work on HTMLBars, the context switching form of `{{each}}` is deprecated. This is mostly a "mechanical" refactor and dramatically
simplifies how to think about the context in your templates. This change should be entirely mechanical.

In prior versions you may have done one of the following:

```handlebars
<ul>
  {{#each}}
    <li>{{name}}</li>
  {{/each}}
</ul>
```

```handlebars
<ul>
  {{#each people}}
    <li>{{name}}</li>
  {{/each}}
</ul>
```

You should now be using:

```handlebars
<ul>
  {{#each person in people}}
    <li>{{person.name}}</li>
  {{/each}}
</ul>
```

### Deprecations Added in 1.10

#### Deprecate beforeObservers

beforeObservers are deprecated due to the negative performance implications they have for Ember internals and applications.

Typically they were used to have access to the old value of a property when it's about to change, but you can get same functionality in an even more efficient way with just a few lines of code:

```js
function fooObserver(obj){
  var newFoo = obj.get('foo');
  if (obj._oldFoo !== newFoo) {
    // do your stuff here
    obj._oldFoo = newFoo;
  }
}
addObserver(obj, 'foo', fooObserver);
fooObserver(obj); // Optionally call the observer immediately
```
