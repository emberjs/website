---
title: Ember CLI, 2018 Edition
author: Alex Navasardyan, Krati Ahuja, Tobias Bieniek
tags: Recent Posts, 2018
responsive: true
---

The Ember CLI team spent the day after EmberConf talking about our priorities
for the upcoming year. We meet annually, and this time around we decided to
publish the notes from our meeting to make sure our direction is transparent for
everyone in the community.

We [asked](https://discuss.emberjs.com/t/ember-cli-in-2018/14304) the Ember
community beforehand for feedback on the issues and pain points with Ember CLI.
We do want to thank everyone who participated. Your feedback is very valuable!

Here’s a summarized list of the most anticipated features, based on your
feedback:

- Module Unification
- Tree-shaking and code splitting
- Better PWA support (service workers)
- Build times (both first and subsequent)
- Broccoli and Ember CLI documentation
- The future of Ember Engines and Ember Fastboot

Along with the above, we also wanted to discuss:

- LTS policy for Ember CLI
- Dropping Node.js 4 support
- [ember-cli-update](https://github.com/kellyselden/ember-cli-update)

## Module Unification

[Matthew Beale](https://madhatted.com/), aka
[mixonic](https://github.com/mixonic), joined us this year to discuss the
remaining work needed for Module Unification to land. He also created a [quest
issue](https://github.com/emberjs/ember.js/issues/16373), which makes it easier
to track progress and seek help as it is a no small task. We will refer to
Module Unification as MU for brevity reasons.

To ensure a graceful transition to MU, we will support three compatibility
scenarios:

- MU application uses MU addon
- MU application uses an addon with a classic layout
- An application with a classic layout uses MU addon

These come with a list of changes:

- The `main` property in `package.json` will point to `src/index.js` to make the
Node module resolution algorithm work correctly for Ember addons from now on.
This ensures that an import such as `import Resolver from 'ember-resolver';`
will properly resolve to the addons `src/index.js` via normal node resolution
mechanisms. We can then use awesome editor plugins for auto-completion, eslint
plugins for validation, etc.
- The `addonMain` property in `package.json` will point to the add-on build file
(`index.js` until now)
- Addons will have classic and MU “dummy” application to run tests against
- Addons will be able to customize MU config
- Addons will be able to specify re-exports from MU add-on to classic
application

## Treeshaking and Code Splitting

[Webpack](https://webpack.js.org) and [Rollup](https://rollupjs.org/guide/en)
have become very popular nowadays, and they provide the forementioned
functionality out of the box. However, they both are assets bundlers whereas
Ember CLI has an opinionated build pipeline, and bundling of assets is just one
of the steps.

[Packager RFC](https://github.com/Ember-CLI/rfcs/pull/110) introduces a single
customizable method that receives all the content and is responsible for
emitting the final `dist/`. The implementation is in progress and once it is
finished, we can move to a more direct experimentation phase, and implement
several “packagers” using [Webpack](https://webpack.js.org) and
[Rollup](https://rollupjs.org/guide/en). These packagers would be able to
treeshake your code and dependencies and allow imports of ES6 modules to “just
work.” CJS imports will be a little more tricky as it is not as straightforward
to implement. In the meantime, there has been work to bridge this gap in
functionality.
[ember-cli-cjs-transform](https://github.com/rwjblue/ember-cli-cjs-transform)
has been updated to use Rollup itself, meaning it will take in all the files it
needs with one `app.import()`. It also incidentally works with ES6 module
projects as well.

[Kelly Selden](https://github.com/kellyselden) has been experimenting with
treeshaking and submitted several pull requests to Rollup
([rollup/rollup#1986](https://github.com/rollup/rollup/pull/1986) and
[rollup/rollup#2089](https://github.com/rollup/rollup/pull/2089)) to support the
needs of Ember.js applications.

## Service Workers Support

[Service
Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
are proxies between your web application and the network (if it is available).

Adding a service worker to your web application can help with overall
performance, but it’s rather easy to make a mistake while using it. The Service
Worker adds a complex cache layer. We want to make sure that Ember CLI users
have the right tools at hand to be able to test and verify the intended
behaviour. For example:

- Ensure that a service worker is wired to the right project
- Ensure that a service worker is invalidated for every build
- Ensure that `index.html` key is invalidated per build
- Ensure that a service worker caching works nicely with Fastboot caching of
`index.html`
- Ensure fingerprinting order is correct
- Ability to unregister a service worker (for example, `ember-macro-benchmark`)

In addition to the list above, there needs to be a solid testing story for both
consumers and Ember CLI add-ons, as well as proper documentation.

We invited [Marten Schilstra](https://github.com/martndemus) to join us to
discuss his opened [RFC](https://github.com/ember-cli/rfcs/pull/117) proposing
to add a service worker to the default application blueprint, which would
support offline caching `index.html`, JavaScript/CSS assets, and will be scoped
to `rootURL` configuration. Nothing has been decided yet, but we’re looking
forward to your feedback on the RFC.

## Broccoli, Butter, and Cheese

[Broccoli.js](http://broccolijs.com) - the asset pipeline tool that Ember CLI
uses to build Ember.js applications - has served us very well over the years.
However, the lack of documentation about how it works and how Ember CLI uses it
is painful for the Ember.js community. For instance, not many people know that
Ember CLI uses a fork of Broccoli.js for historical reasons. We want to fix that
this year. A high-level plan:

- Unfork Broccoli.js and integrate Ember CLI with the latest version
- Update the website and documentation
  - Define API surface better
  - List core plugins: User broccoli plugins, default set (rm, map, filter,
  reduce, etc.)
  - Make it easy for other people to contribute documentation
- Improve error messages and error reporting middleware
- Improve build performance (FS symlinks with virtual in-memory links, avoid
re-building plugins whose inputs haven’t changed, etc)
- Ability to use OS temporary directory (as opposed to `tmp` directory in the
project)

## Ember Fastboot

[Fastboot](https://www.ember-fastboot.com/) is the server side rendering
solution for Ember applications. It released its v1.0 in mid-2017. Since then
the developer experience has got better. Recently, [Jonathan
Jackson](https://twitter.com/rondale_sc) landed [rehydration of server side
rendered Ember apps in
FastBoot](https://github.com/ember-fastboot/ember-cli-fastboot#rehydration). It
is behind an experimental flag and Ember applications need to turn on the flag
in order to use it with Fastboot. A high level plan of Ember Fastboot includes:

- Getting rehydration to land on stable branch
- Improve documentation of Ember Fastboot with more real world examples of best
practices and usage
- Improve the error handling in rendering of Ember apps on server side during
development
- Better testing APIs for apps using Ember Fastboot with actually testing the
server side rendered content as well.
- Better support of developing Ember apps with Fastboot and mirage
- Improved integration with Ember data and Fetch.

## Ember CLI LTS

Following [the example of
Ember.js](https://emberjs.com/blog/2016/02/25/announcing-embers-first-lts.html),
Ember CLI will adopt an LTS release process. It will coincide with Ember.js LTS
releases.

LTS releases give the community a set schedule that works for users who prefer a
slower pace without hurting active iteration on features: on canary, you get
features as quickly as they land, but get no guarantees about those features; on
the stable release channel, you have to wait up to 12 weeks for features to
stabilize and make their way through the beta process, but you are rewarded with
[semver](https://semver.org/) guarantees.

LTS releases will provide a list of deprecation warnings to make upgrades to the
next version easier. To avoid a possible “wall of deprecations,” we will also
offer a way to silence them and fix at your own pace (similar to what
[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow)
does.)

The first LTS release will be announced in a separate blog post with all notable
changes.

## Node.js 4 Support

Ember CLI will drop support for Node.js 4 after the end-of-life date which is
April 30th, 2018. A separate quest issue will be opened.

## Ember CLI Update

Updating Ember CLI can be a tedious process, especially if one doesn’t do it
often. [Kelly Selden](https://github.com/kellyselden) wrote a tool that
automates upgrades and relies on [git](https://git-scm.com/) to do so: run
`ember update` or `ember-cli-update` and that’s all.

It has been out for some time now and we think it is time to make it an official
update tool for Ember.js applications and addons moving forward. Check it out
[here](https://github.com/kellyselden/ember-cli-update).

## Ember CLI Team

Working on open source projects is a ton of work, and we would like to thank
Nathan Hammond, Chad Hietala, and Jake Bixby for their commitment as they are
retiring from the Ember CLI subteam. They retain all the rights but will be
transitioned into “emeritus” status.

We would like to welcome [Alex Navasardyan](https://twitter.com/twokul) to the
Ember CLI team, who has already done a lot of work in the Ember CLI space and is
now finally an official member of the team.

Last but not least, we wanted to thank
[CrowdCompass](http://www.crowdcompass.com) and [Mark
Avery](https://github.com/webark) for hosting the Ember CLI team meeting (and
for very yummy donuts) on short notice.
