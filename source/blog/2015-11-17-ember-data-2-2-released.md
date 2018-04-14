---
title: Ember Data 2.2 and 2.3 Beta Released
author: Brendan McLoughlin
tags: Ember Data, 2015
responsive: true
---

Ember Data 2.2, a minor version release of Ember Data with bug fixes
only, is released today. This release represents the work of over 21
direct contributors, and over 140 commits.

Ember Data 2.3 beta.1, the branch of Ember Data that will be released
as stable in roughly six weeks, is also being released today.

### Changes in Ember Data 2.2

There are no new features introduced in Ember Data 2.2. Instead the
this release contains bugfixes and documentation improvements for
Ember Data.

See the [Ember Data 2.2.0 CHANGELOG](https://github.com/emberjs/data/blob/v2.2.0/CHANGELOG.md) for a full list of all changes.


### Ember Data 2.3 beta

Ember Data 2.3 beta is released today, and in six weeks it will become the
new stable version of Ember Data.

#### Ember CLI Addon

Previously the primary way of consuming Ember Data was using the bower
package. The existing Ember Data addon for Ember CLI added Ember Data
to the `bower.json` file. This often lead to some confusion because
updating the version of the Ember Data addon on `packages.json` would
not update the version of Ember Data included in your app.


Starting in the Ember Data 2.3.0 release, Ember Data will be packaged
and distributed as an Ember CLI addon. This will allow users to
consume Ember Data in the same way that they would any other
addon. Additionally, contributing to Ember Data should be easier as
building and testing the Ember Data project now follows Ember CLI
addon conventions.

Thanks to [fivetanley](https://github.com/fivetanley) for his hard
work in porting Ember Data to the addon infrastructure.

For more details on changes landing in 2.3, review the
[Ember Data 2.3.0-beta.1 CHANGELOG](https://github.com/emberjs/data/blob/v2.3.0-beta.1/CHANGELOG.md).
