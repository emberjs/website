---
title: Ember 1.6.1 Released
author: Robert Jackson
tags: Releases, 2014, 1, 1.6
responsive: true
---

Shortly after Ember 1.6.0 was released a regression was identified regarding custom error substates.
The error handling that was added to make debugging errors thrown in the Router's promise hooks
inadvertently caused the error substates to be completely ignored.

For more details review the following links:

* Failing [JSBin](http://emberjs.jsbin.com/juqij/2/edit?html,js,output) from the original [bug report](https://github.com/emberjs/ember.js/issues/5148).
* [Fixing PR](https://github.com/emberjs/ember.js/pull/5166)
* [Ember.js 1.6.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.6.1/CHANGELOG.md)
