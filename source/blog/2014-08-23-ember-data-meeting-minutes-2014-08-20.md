---
title: Ember Data Meeting Minutes - 2014/08/20
author: Stanley Stuart
tags: Core Team Meeting Minutes, 2014
responsive: true
---

Every week, the Ember Data team meets to discuss improvements and vision for
the Ember Data Project.

## Attendees

* Tom Dale (@tomdale)
* Igor Terzic (@terzicigor)
* Stanley Stuart (@fivetanley)

## Single Source of Truth

This was a fairly brief meeting and mostly involved a code review of Igor's
excellent work on the Single Source of Truth Branch. At a high level, the work
in this branch vastly simplifies many internals in Ember Data on how
relationships keep up to date. These changes will also bring many bugfixes
around inconsistencies related to relationships. You can read more about the
goals of this branch in "The Road to Ember Data 1.0" [blog post][road-to-1-oh].
You can read about the bug fixes referenced in the [pull request][ssot]. The
Single Source of Truth changes are expected to land in Ember Data v1.0.0-beta.10.

<!-- Links -->
[ssot]: https://github.com/emberjs/data/pull/2208
[road-to-1-oh]: http://emberjs.com/blog/2014/03/18/the-road-to-ember-data-1-0.html
