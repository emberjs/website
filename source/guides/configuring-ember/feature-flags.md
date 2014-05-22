## About Features

When a new feature is added to Ember they will be written in such a way that the
feature can be conditionally included in the generated build output and enabled
(or completely removed) based on whether a particular flag is present. This
allows newly developed features to be selectively released when they are
considered ready for production use.

## Feature Life-Cycle

When a new feature is flagged it is only available in canary builds (if enabled
at runtime). When it is time for the next beta cycle to be started (generally
6-12 week cycles) each feature will be evaluated and those features that are
ready will be enabled in the next `beta` (and subsequently automatically enabled
in all future canary builds).

If a given feature is deemed unstable it will be disabled in the next beta point
release, and not be included in the next stable release. It may still be included
in the next beta cycle if the issues/concerns have been resolved.

Once the beta cycle has completed the final release will include any features that
were enabled during that cycle. At this point the feature flags will be removed from
the canary and future beta branches, and the feature flag will no longer be used.

## Flagging Details

The flag status in the generated build output is controlled by the `features.json`
file in the root of the project. This file lists all features and their current
status.

A feature can have one of a few different statuses:

* `true` - The feature is **enabled**: the code behind the flag is always enabled in
  the generated build.
* `false` - The feature is **disabled**: the code behind the flag is not present in
  the generated build at all.
* `null` - The feature is **present** in the build output, but must be enabled at
  runtime (it is still behind feature flags).

The process of removing the feature flags from the resulting build output is
handled by `defeatureify`.

## Feature Listing ([`FEATURES.md`](https://github.com/emberjs/ember.js/blob/master/FEATURES.md))

When a new feature is added to the `canary` channel (aka `master` branch), an
entry is added to [`FEATURES.md`](https://github.com/emberjs/ember.js/blob/master/FEATURES.md)
explaining what the feature does (and linking the originating pull request).
This listing is kept current, and reflects what is available in each branch
(`stable`,`beta`, and `master`).

## Enabling At Runtime

The only time a feature can be enabled at runtime is if the
`features.json` for that build contains `null` (technically, anything other
than `true` or `false` will do, but `null` is the chosen value).

A global `EmberENV` object will be used to initialize the `Ember.ENV`
object, and any feature flags that are enabled/disabled under
`EmberENV.FEATURES` will be migrated to `Ember.FEATURES`; those features
will be enabled based on the flag value. **Ember only reads** the
`EmberENV` value upon initial load so setting this value after Ember has
been loaded will have no affect.

Example:

```javascript
EmberENV = {FEATURES: {'link-to': true}};
```

Additionally you can define `EmberENV.ENABLE_ALL_FEATURES` to force all
features to be enabled.
