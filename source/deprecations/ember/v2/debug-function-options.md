---
id: ember-debug.deprecate-options-missing, ember-debug.deprecate-id-missing, ember-debug.deprecate-until-missing, ember-debug.warn-options-missing, ember-debug.warn-id-missing
name: Ember debug function options
until: 3.0.0
since: 2.1
---

Starting in Ember 2.1 various debug functions now require a third argument (commonly called `options`).

`id` is required by all methods listed below, and the deprecation related methods also require an `until` property.

* `Ember.deprecate`
* `Ember.deprecateFunc`
* `Ember.computed.deprecatingAlias`
* `Ember.warn`

The `id` property is intended to allow runtime debug handlers to uniquely identify the source, and the `until` property is used
to indicate the future version when the deprecated behavior will no longer exist.

The goal of these changes is to allow tools like
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) to make managing
these deprecations and warnings much easier (by matching on the `id` instead of the full deprecation/warn message).
