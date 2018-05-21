---
title: Handlebars Version Compatibility
author: Robert Jackson
tags: Recent Posts, 2014, Handlebars
responsive: true
---

Handlebars 2.0 was released just a few weeks ago, and since its release we have received many
requests to update Ember to allow the use of the latest version.  Handlebars 2.0 contains
a number of changes the list below represents just a few that are likely to affect your
Ember application:

* Precompiler output has changed, which breaks compatibility with prior versions of the
  runtime and precompiled output.
* A JSON polyfill is required to run the compiler in IE8 and below. It's recommended
  that the precompiler be used in lieu of running the compiler on these legacy environments.
* Lines containing only block statements and whitespace are now removed. This matches the
  Mustache spec but may cause issues with code that expects whitespace to exist but would
  not otherwise.

For more information about the changes please review the [release notes](https://github.com/wycats/handlebars.js/blob/master/release-notes.md).

Since the release of Ember 1.0.0, Ember has required Handlebars 1.x. As each new version of
Handlebars has been released we have needed to update our version requirement to allow the 
latest and greatest. Thankfully, throughout this process we have been able to maintain backwards
compatibility with all versions of Handlebars since 1.0.0.

Unfortunately, Ember will not be able to maintain backwards compatibility to 1.x versions of Handlebars while
supporting 2.0. In Ember 1.9.0 (which will be released to beta on October 24th and stable on December 5th)
support for Handlebars 1.x will be removed, and support for Handlebars 2.0 introduced.

In order to facilitate users of our 1.9.0 builds we have published alpha versions of the
following template precompiler packages:

* ember-template-compiler (published to NPM as 1.9.0-alpha)
* ember-source (published to Rubygems as 1.9.0.alpha)

### Upgrading

To upgrade please use the following rough steps as a guide:

* Update Handlebars version to 2.X.
* Update template precompiler version to 1.9.0-alpha or later.
* Report any issues you have on our [issue tracker](https://github.com/emberjs/ember.js/issues).

#### Ember CLI Steps

If you happen to be using Ember CLI the following steps should work properly:

* `npm uninstall --save-dev broccoli-ember-hbs-template-compiler`
* `npm install --save-dev ember-cli-htmlbars@0.6.0`
* `rm -rf bower_components`
* `bower install --save handlebars#2.0.0`
* `bower install --save ember#1.9.1`
* `bower install`
