---
title: Ember 1.7.0 and 1.8 Beta Released
author: Alex Navasardyan
tags: Releases, 2014, Version 1.x
responsive: true
---

We are pleased to announce that both Ember.js 1.7.0 and the first beta in the 1.8 series
have been released. This comes as the seventh cycle of our release process that began just
after 1.0 was released.

This release brings bug fixes, potentially breaking changes and new features.

## New Features

### Nestable `this.route`

This change removes the restriction that only `this.resource` can have nested
child routes.

Prior to this change, using `this.resource` would reset the namespace and in order
to preserve it you had to do the following:

```javascript
this.resource('foo', function() {
  this.resource('foo.bar', function() {
    this.resource('foo.bar.baz', function() {
      // All this repetition to get an
      // intuitively-named FooBarBazRoute
    });
  });
});
```

`this.route` can be nested like `this.resource`, but unlike this.resource, the namespace
of child routes is appended rather than reset to a top-level namespace, allowing the above to be
written as:

```javascript
this.route('foo', function() {
  this.route('bar', function() {
    this.route('baz', function() {
       // uses FooBarBazRoute
       // generates foo.bar.baz.index
       // generates FooBarBazIndexRoute
     });
   });
});
```

Unnested `this.route` works the same way as before.

### Query Params

Thanks to the tireless work of [@machty](https://github.com/machty) and team, query params
support has finally landed and is a part of the 1.7.0 release!

Ember now has first class support for URL query parameters (e.g. `/?page=1&sort=last_name`).
With this API, each query param is bound to a property on a controller, such that changes made
to query params in the URL (e.g. user presses the back button) will update the controller property,
and vice versa.

The API handles many of tricky aspects of maintaining a binding to a URL, such as:

+ coalescing multiple controller property changes into a single URL update
+ correctly casting new URL query param values to the datatype expected by the controller property
  (e.g. `"true"` for a boolean property casts to `true`, `"123"` for a numeric property casts to `123`)
+ omitting default query param values from the URL so as to not unnecessarily clutter the URL
  with default values

Please read the [Query Params Guide](/guides/routing/query-params/) for more information.

## Breaking Changes and Deprecations

The following are a few deprecation warnings and breaking changes that have been included in 1.7.
Please review the new [Deprecations Page](http://emberjs.com/deprecations/) for more details.

### Controller's `model` property

On Controllers, the content property is now derived from model. This reduces many caveats
with model/content, and also sets a simple ground rule: Never set a controller's content,
rather always set its model.

### `bind-attr` and empty arrays

An empty array is treated as falsy value in `bind-attr` to be in consistent with `if` helper.
Breaking for apps that relies on the previous behaviour which treats an empty array as
truthy value in `bind-attr`.

## Other Improvements

`Ember` is now using `RSVP` 3.0.13 and brings fixes for `RSVP.hash` in IE8.

## Ember 1.8.0-beta.1

### Support for IE 6 and 7

Usage of Ember is deprecated for Internet Explorer 6 and 7, support will be removed
in the next major version.

### Refactored view layer

Internal implementation of the view layer has been refactored. Many of you remember
`script` tags in the DOM:

```html
<script id="metamorph-1-start" type="text/x-placeholder"></script>
<script id="metamorph-1-end" type="text/x-placeholder"></script>
```

That's how `Ember` knows how to update the values in the DOM. This refactor removes
the need for `script` tags.

### Actions lookup on controller

Some of you might remember that you could define action handlers in the root of the
controller, like so:

```javascript
App.HomeController = Ember.ObjectController.extend({
  someAction: function() {
    // handle the action
  }
});
```

A deprecation warning was added in late 2013 that would print a nice deprecation notice
if you happen to use an action name that was also found in the root of the controller.
Unfortunately, even with the deprecation, we still have the possibility to conflict
with controller level methods and properties.

To define action handler, you should place it under `actions` hash, like so:

```javascript
App.HomeController = Ember.ObjectController.extend({
  actions: {
    someAction: function() {
      // handle the action
    }
  }
});
```

This change will remove support for older action lookup in the root of the controller
completely, and finally allow usage of nearly any action name without the need to
check if that name was also used by the controller.

Also, this release introduces numerous bug fixes and small improvements. You can see a list of all the changes in the CHANGELOG:

+ [Ember.js 1.7.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.7.0/CHANGELOG.md)
+ [Ember.js 1.8.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.8.0-beta.1/CHANGELOG.md)
