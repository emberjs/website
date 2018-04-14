---
title: Ember Data v1.0.0-beta.16.1 Released
author: Brendan McLoughlin
tags: Ember Data, 2015
responsive: true
---

Ember Data v1.0.0-beta.16.1 is a bugfix release that fixes 2
regressions reported with Ember Data v1.0.0-beta.16. As always
this release can be obtained from npm (for use with ember-cli),
rubygems, or bower. The builds are also available as static files at
[http://emberjs.com/builds](http://emberjs.com/builds).


#### store.adapterFor('application') Throwing Exceptions

[Kamal Fariz Mahyuddin][kamal] reported issue
[#2925](https://github.com/emberjs/data/issues/2925) where code that
attempted to use the store's [adapterFor][adapterFor] method to access
the `application` adapter was throwing an error with Ember Data
`v1.0.0-beta.16`. This has been fixed in Ember Data
`v1.0.0-beta.16.1`.

#### Incompatibility with Ember 1.10.0-beta.4

[Daniel Sudol][danielspaniel]
[reported](https://github.com/emberjs/data/issues/2927) that
`v1.0.0-beta.16` was throwing an error when it was loaded alongside
Ember `1.10.0-beta.4` due to Ember Data calling the wrong
registerHelper method on HTMLBars. This was tracked down to an issue
in [ember-inflector][ember-inflector] which comes bundled with Ember
Data. The issue has been fixed in `v1.5.0` of ember-inflector and
Ember Data `v1.0.0-beta.16.1` now includes the updated version.


#### Testing issues with 1.0.0-beta.16

[Peter Darrow][pmdarrow] called
[out some testing problems](https://github.com/emberjs/data/issues/2924)
with Ember Data `v1.0.0-beta.16`. This was concluded to be an issue
with `ember-qunit` not properly cleaning up Ember Data's store after
tests. [Robert Jackson][rwjblue] quickly fixed the issue and
recommends you update to `v0.3.0` of `ember-qunit` if you experience
this issue.

## Changelog

+ [Ember Data 1.0.0-beta.16.1 CHANGELOG](https://github.com/emberjs/data/blob/v1.0.0-beta.16.1/CHANGELOG.md)


<!-- Links -->
[kamal]: https://github.com/kamal
[danielspaniel]: https://github.com/danielspaniel
[pmdarrow]: https://github.com/pmdarrow
[rwjblue]: https://github.com/rwjblue
[adapterFor]: http://emberjs.com/api/data/classes/DS.Store.html#method_adapterFor
[ember-inflector]: https://github.com/stefanpenner/ember-inflector

