---
title: Ember.js 1.11.1 Released
author: Robert Jackson
tags: Releases, 2015, Version 1.x
responsive: true
---

Today we are releasing Ember.js 1.11.1, a patch-level release of Ember that
fixes several regressions introduced in the 1.11.0 release.

### CollectionView with `attributeBindings`

During the 1.11.0 cycle much effort was put into making sure that `attributeBindings` used
the same logic that template bound attributes use.  Namely, that `attributeBindings` use
HTMLBars' attribute helpers instead of jQuery's.

Unfortunately, this work lead to an error when `CollectionView` instances were used with
`attributeBindings` specified.  This regression is fixed in 1.11.1.

### Invalid URLs

Refactoring in the router initialization process lead to a bug that caused the browsers URL
to become out of sync with the correct URL when the back button was pressed while using 
`HistoryLocation`.

This regression is fixed in 1.11.1.

### Handlebars Helper Issues

A couple regressions were fixed for Handlebars helpers with 1.11.1:

* The inverse template (aka `{{else}}` block) of Handlebars helpers was not properly accounted
  for during the HTMLBars transition. Using an `{{else}}` block with a Handlebars helper has
  not been function since 1.9.0.
* The main block could not be rendered even if `options.fn()` was called within the helper. This
regression was first introduced in 1.11.0-beta.4.

### Incorrect Assertion for {{each foos itemControler='bar'}}

During the 1.11.0 cycle an issue regarding `{{each}}` with prototype extensions disabled was reported.
The solution to that issue was to add a much more helpful assertion when an `ArrayController`'s model
did not have `Ember.Array` mixed into it. Unfortunately, this assertion also was triggered when the
model was simply `undefined`. The assertion has been updated to ignore falsey `model`'s in 1.11.1.


### {{render}} helper with View

In 1.11.0 using the `{{render}}` helper (i.e. `{{render 'post'}}`) when a `PostView` is present would not
provide the view with a template (it was assumed to be manually specified in the view via `templateName`
property). As of 1.11.1 you can specify the `templateName` in the `{{render}}` helpers view (just like in 1.11.0),
but if you do not the views template will be defaulted to a template with the same name as the view itself.

## Changelogs

+ [Ember.js 1.11.0 to 1.11.1 commit log](https://github.com/emberjs/ember.js/compare/v1.11.0...v1.11.1)
+ [Ember.js 1.11.1 CHANGELOG](https://github.com/emberjs/ember.js/releases/tag/v1.11.1)
