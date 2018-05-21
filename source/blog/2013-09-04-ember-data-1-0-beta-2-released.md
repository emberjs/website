---
title: Ember Data 1.0.0 Beta 2 Released
author: Yehuda Katz
tags: Releases, Ember Data, 2013, Version 1.x, Data
responsive: true
---

[Ember Data 1.0.0-beta.2][1] has been released.

The release fixes a number of bugs, and adds several new features:

* Fix a number of issues where the code still expected class names
  (`App.Post`) instead of module-friendly shorthand (`post`).
* Add `host` and `namespace` in the `RESTAdapter`
* Add `record.rollback()`
* Add support for `since` token from find all fetches
* Add `store.update(type, hash)` to update some, but not all attributes
* Improve subclassability of `RESTSerializer` and `RESTAdapter`

Thanks to Paul Chavard, Toran Billups, Bradley Priest, Kasper Tidemann, Yann Mainier,
Dali Zheng, Jeremy Green, Robert Jackson, Joe Bartels, Alexandre de Oliveria,
Floren Jaby, Gordon Hempton, Ivan Vanderbyl, Johannel Würbach, Márcio Júnior,
Nick Ragaz, Ricardo Mendes, Ryunosuke SATO, Sylvain Mina, and ssured

Thanks to everyone who has been porting adapters to Ember Data 1.0!

[1]: /builds/#/beta/latest
