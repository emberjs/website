---
title: Ember Data v1.0.0-beta.19.1 Released
author: Stanley Stuart
tags: Ember Data, 2015, Version 1.x
responsive: true
---

Ember Data 19.1 contains fixes for a few regressions. Thanks to everyone
who reported issues. Thanks to @bmac and @wecc for fixing!

- Fix a regression where a `DS.Model`'s `InternalModel` would not be set
  on init - @bmac [Pull Request](https://github.com/emberjs/data/pull/3262)
- Pass store to inverseFor in removeEmbeddedForeignKey #3270 - @wecc
  [Pull Request](https://github.com/emberjs/data/pull/3270)
