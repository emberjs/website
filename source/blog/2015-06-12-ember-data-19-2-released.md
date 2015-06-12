---
title: Ember Data v1.0.0-beta.19.2 Released
author: Brendan McLoughlin
tags: Recent Posts, Releases
---

Ember Data 19.2 contains fixes for a 2 regressions identified in the
v1.0.0-beta.19 release. Thanks to everyone who reported issues.

- Fix an issue that impacting Ember CLI users and preventing Ember
Data from loading a custom store defined in `app/store.js`. Thanks to @cdoornink for [reporting the issue](https://github.com/emberjs/data/issues/3239).

- Fix an issue that was preventing currentState being set on records when they were created. Thanks to @jcope2013 for [reporting the issue](https://github.com/emberjs/data/issues/3308).

