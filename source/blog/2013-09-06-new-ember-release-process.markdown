---
title: The Post-1.0 Release Cycle
author: Yehuda Katz
tags: Recent Posts, Process, 2013, Release Management, Roadmap
responsive: true
---

Now that we've shipped Ember 1.0 final, it's time to look forward to future 
releases.

The plan moving forward is to adopt a Chrome-like release cycle: more frequent releases with more clarity about where features are in the pipeline.

READMORE

### TL;DR

The Ember.js 1.x Schedule:

* Every six weeks: A new stable version of Ember.js.
* Every week: A new beta of the next version of Ember.js. When
  Ember 1.1 is released, the first beta of Ember 1.2 will be released
  at the same time.
* Every day: A new "canary" build, which is the last successful build of
  the day.
* Every successful build: The `ember-latest.js` build is updated

All builds will be available on the new [Ember.js Builds][1] section of the
Ember website.

[1]: /builds/

All new features will start out on master, behind a feature flag. Canary
and `latest` builds will ship with all experimental features, enable-able
at runtime.

Beta and Stable releases will only ship with features that the core team
believes are stable.

Read on for more details about how we plan to organize new features. If
you plan to contribute features to Ember.js, or are just interested in
the full nitty-gritty, you should check out the [Adding New
Features](/guides/contributing/adding-new-features) guide, which lays
out all of the mechanics for the process going forward.

### Feature Flags

Starting today, all new features on master that introduce new public APIs
will be wrapped in a feature flag. This will make it very easy for the core
team and the community to see which features are in development and how far
along they are.

```js
if (Ember.FEATURES.isEnabled('link-to')) {
  // implementation here
}
```

### Cross Browser Builds

Moving forward, builds will be tested (via Travis and SauceLabs) against
every supported browser. This means that we'll know whether a commit broke
the build on any browser we support.

### Ember Latest

Every time the build passes across all browsers, the `ember-latest` build
will be updated. This is the most bleeding of bleeding-edge builds.

You can get all of the latest builds at [http://emberjs.com/builds/#/canary/latest](/builds/#/canary/latest).

### Canary Builds

At the end of every day, `ember-latest` will be saved off to a canary build
for that day. That means that the last successful build of a given day will
be saved for posterity.

This is a bleeding-edge build with no manual testing applied, so use at
your own peril.

On the latest or canary builds, you can enable any experimental feature
using a flag:

```js
Ember.FEATURES['link-to'] = true;
Ember.FEATURES['router-facelift'] = true;
```

This means that latest and canary ship with all experimental features,
and will be bigger in byte-size than using beta or released builds.

### Beta Builds

Every six weeks, we will:

#### Branch Beta to Release

See more on the release branch below.

#### Branch Master to Beta

First, the core team will review all feature flags on `master`, and make
a Go/No-Go decision for each of them.

Any feature that is not ready to go will be stripped from the beta build.

Feature development will continue on master, and get another shot at the
next departing train, six weeks hence.

#### The Beta Branch

The `beta` branch is designed to get more eyeballs on new features that
look ready to go.

The only changes to the `beta` branch should be bug fixes and removing
features that looked ready originally but which aren't going to make the
cut for the next stable build.

You can get the latest successful build off of the beta branch at
[http://emberjs.com/builds/#/beta/latest](/builds/#/beta/latest).

### Release Build

Once the `beta` branch has gone through its paces, there will be another
Go/No-Go decision for each new feature still remaining on the branch.

This decision is made every six weeks, and the features that make the cut
will end up in the next release of Ember.js!

### New Release Management Team

A number of Ember contributors have really stepped up to automate the
process and build out tooling: Stanley Stuart (fivetanley), Robert
Jackson (rwjblue), Alex Navasardyan (twokul) and Thomas Boyt (tboyt).

They are now the (drumroll please) Ember.js release management team!

Thanks for all your hard work in making the new release process
possible.
