---
title: Ember 1.2.0 and 1.3 Beta Released
author: Tom Dale
tags: Releases, 1, 1.2, 1.3, 2013, Substate
responsive: true
---

What better way to celebrate the holiday season than with two
brand-spankin' new releases of Ember.js?

Hot off the presses, we've got 1.2.0 and 1.3.0 beta on deck just for
you. Since we started following a [Chrome-like release
cycle](/blog/2013/09/06/new-ember-release-process.html), we'll have two
new releases for you every six weeks. 1.2.0 is the newest stable
release; 1.3.0 beta is the latest beta channel release.

Beta releases are intended to get more eyeballs on new
features that look ready to go, but may have bugs or edge cases that we
haven't yet sussed out.

### New in 1.2

#### Loading and Error Substates

While we'd all like to write apps that are fast and bullet-proof,
sometimes your backend may be slow to respond, or generate an error,
when your Ember app requests a model.

Dealing with those cases is much easier in Ember.js 1.2, thanks to
conventional loading and error routes.

To learn how to set these up, see [Loading and Error
Substates](/guides/routing/loading-and-error-substates/) section of the
guides.

#### Non-block form {{link-to}} helper

Previously, the `{{link-to}}` helper required that you use it in block
form:

```handlebars
{{#link-to "about"}}About Us{{/link-to}}
```

Ember 1.2 introduces a non-block form that is less verbose:

```handlebars
{{link-to "About Us" "about"}}
```

In the non-block form, the first argument is the text to wrap in an
`<a>` tag, and the second argument is the route to link to.

#### sortBy

All objects that implement the `Ember.Enumerable` protocol now have a
`sortBy` method that sorts the enumerable based on a property of each
of the members.

For an example, see [this JSBin](http://emberjs.jsbin.com/OFozANOz/1/).

#### Other Improvements

As usual, there are a ton of bug fixes and small improvements in this
release. You can see a list of all the changes in the CHANGELOG:

* [Ember.js 1.2.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.2.0/CHANGELOG)
* [Ember.js 1.3.0 beta 1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.3.0-beta.1/CHANGELOG.md)

A very big thank you to everyone who contributed, and a
special thank you to our release team that have collectively poured
hours of their free time into automating the infrastructure around the
release process.

As usual, you can always find the latest stable, beta, and canary
releases at [emberjs.com/builds](/builds).

While you're there, check out the new illustrations, courtesy of [Leah
Silber](https://twitter.com/wifelette) and [Design
Carnivore](http://designcarnivore.com/).
