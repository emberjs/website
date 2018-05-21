---
title: The Road to Ember 3.0
responsive: true
author: Matthew Beale
tags: Recent Posts, roadmap, 3, 2017
---

Today the Ember.js Core Team is happy to announce our plans for the release of Ember 3.0. Ember 3.0 will arrive 2.5 years and 18 minor revisions after the release of Ember 2.0. The final release of the 2.x series will be Ember 2.18 on January 1st, 2018.

**Ember 3.0 removes public API deprecated in Ember 2.x releases.** 3.0 does not introduce new public APIs or breaking changes.

Traditionally, major releases of software are centered around marketing pitches and new functionality. In contrast, major releases of Ember are “garbage collection” releases. Ember APIs that were deprecated during 2.x but were still supported are purged from the codebase in 3.0. The APIs remaining in 3.0 reflect what we think of as the idiomatic way to build an Ember app.

Ember 2.0 was the project’s first attempt at a major release where the transition path for apps and addons was a priority. The community took several important lessons from the 2.0 release cycle, and these have shaped our plans for 3.0. Please take a moment to review our plans below.

## The Ember 3.0 release schedule

We’re announcing this release several months ahead of its final date so application authors and addons will have time to prepare for the transition. The specific schedule of releases leading to 3.0 will be as follows:

![Ember 3.0 release schedule](/images/blog/2017-10/ember-3-timeline.jpg)

- 2.16.0 stable released: October 9th 2017
- 2.17.0 stable released, 2.16 promoted LTS: November 20th 2017
- 2.18.0 stable released, 3.0-beta released: January 1st 2018
- 3.0.0 stable released, 2.18 promoted to LTS: February 12th 2018
- 3.4.0 stable released: July 30th 2018
- 3.5.0 stable release, 3.4 promoted to LTS: September 10th 2018

The above dates are projections based on our 6-week release cycle. This schedule has two notable departures from our standard release policies:

- Ember 2.18 will be made an additional LTS to maximize the opportunity for apps to transition to 3.x.
- Ember 3.4, and not 3.0, will be the first 3.x release promoted to an LTS.

Ember 2.18-LTS, the final release of Ember 2.x, will receive support for critical bugfixes until September 2018 and security fixes until February 2019. This is in alignment with our standard long-term support practices.

## Transitioning to 3.0

We’ve refined the release plan for Ember 3.0 based on the lessons of 2.0. The most important of those lessons is that there should be no last-minute deprecations during transition releases, and no intimate (unintentionally in common use) or private API churn around the transition.

To turn that lesson into practice, we’ve carefully tracked the addition of 3.0-targeted deprecations for each part of the framework:

- The last 3.0-targeted deprecation to Ember was in July 2017, Ember 2.14
- The last 3.0-targeted deprecation to Ember Data was in April 2017, Ember 2.13
- The last 3.0-targeted deprecation to Ember CLI was in April 2017, Ember 2.13

**No additional 3.0-targeted deprecations will be introduced.** This will prevent a last-minute rush to plan API changes for 3.0, and ensure that application authors behind on deprecation fixes don’t fall further behind than they already are. The single exception here is that we will add a deprecation message in development builds for IE9, IE10, and PhantomJS.

To further expand the migration window for 2.x applications to adopt 3.x, **we will be releasing an addon that provides support for Ember.js 2.x APIs into the 3.x series.** We’re committing to support that addon until Ember 3.4 (the first LTS candidate of the Ember 3.x cycle). If you want to contribute to this effort, you can find this package under the name `ember-2-legacy`.

## API Removals in 3.0

All APIs to be removed in Ember 3.0 are already deprecated today. By removing support for these features we achieve two goals for our major release. First, we make it simpler for Ember to strip code that supports these features if you don’t use them. Second, we make it possible for Ember to remove the code supporting these features entirely, opening the door to refactoring that improves the clarity and simplicity of our implementations.

The APIs removed in each of Ember.js, Ember Data, and Ember CLI are:

<hr>

### APIs Removed in Ember.js 3.0

Below we’ve listed some of the most significant API removals in Ember.js 3.0. For an exhaustive list of removals, see the [Ember.js 2.x deprecation guide](/deprecations/v2.x/).

#### Legacy registry and container access.

A large undertaking of the 2.x cycle was to improve Ember’s boot process, enabling features like [Ember Fastboot](https://ember-fastboot.com/) and improving the performance of Ember’s dependency injection system.

In Ember 2.0 there was still no public API for registering dependencies or interacting with the DI container. Instead, you would often see code that referenced the `registry` or `container` properties on application objects or other objects instantiated by the framework. In Ember 3.0 these legacy systems will be removed in favor of APIs on the application object, application instance object, and the “owner” API.

For more details, please see the deprecation guide:

- [Initializer arity](/deprecations/v2.x/#toc_initializer-arity)
- [`Ember.Application#registry` / `Ember.ApplicationInstance#registry`](/deprecations/v2.x/#toc_ember-application-registry-ember-applicationinstance-registry)
- [`Ember.ApplicationInstance#container`](/deprecations/v2.x/#toc_ember-applicationinstance-container)
- [Injected `container` access](/deprecations/v2.x/#toc_injected-container-access)
- [Migrating from `_lookupFactory` to `factoryFor`](/deprecations/v2.x/#toc_migrating-from-_lookupfactory-to-factoryfor)

#### Legacy deprecate API

Ember’s deprecation APIs improved in 2.0. The goal was to provided more information to tools like [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) and the [Ember inspector](https://github.com/emberjs/ember-inspector). All calls to a deprecation API must now include an `id` and `until` parameter. This permits them to be filtered by tooling. In the 3.x series we plan to use this improved data to implement “svelte” builds of Ember, where deprecated but unused code paths in the framework are removed during an application build.

For more details, see the deprecation guide:

- [Function as test in `Ember.deprecate`, `Ember.warn`, `Ember.assert`](/deprecations/v2.x/#toc_function-as-test-in-ember-deprecate-ember-warn-ember-assert)
- [Ember debug function options](/deprecations/v2.x/#toc_ember-debug-function-options)

#### Legacy data binding API

For a long time, Ember has provided two systems for applications to perform data-binding in JavaScript. The first uses computed properties and it is still idiomatic today. For example, you’ll often see `Ember.computed.alias` in application code. This system remains without any deprecation.

The second system uses the `Ember.Binding` namespace or any property with the postfix of `Binding` on an object. For example:

```js
export default Ember.Component.extend({
  wowBinding: 'MyApp.wowObject',
  thingContainer: {},
  amazingBinding: Ember.Binding.oneWay('thingContainer.firstAmazingThing'),
  wasThisReallyTheAPIBinding: 'thingContainer.yesThisWasTheAPI'
});
```

This second system will be removed in Ember 3.0. For more details, see the deprecation guide:

- [`Ember.Binding`](/deprecations/v2.x/#toc_ember-binding)

#### Legacy {{render}} helper

Ember’s `{{render}}` helper presaged the idea of component-driven rendering architecture as we now know it. Despite this, it was also an API coupled to Ember’s `Controller` system, was subject to edge cases where the context of a template was difficult to discern, and additionally was entangled with Ember’s routing system. Through the 2.x cycle we’ve worked to ensure each use-case for `{{render}}` has a viable solution in Ember’s component-driven system.

Fully deprecated since Ember 2.11, in 3.0 the `{{render}}` helper will be removed. Please see the deprecation guide for more details:

- [`{{#render}}` helper with a block](/deprecations/v2.x/#toc_render-helper-with-block)
- [Model param in `{{render}}` helper](/deprecations/v2.x/#toc_model-param-in-code-render-code-helper)
- [`{{render}}` helper](/deprecations/v2.x/#toc_code-render-code-helper)
- [Rendering into a `{{render}}` helper that resolves to an `{{outlet}}`](/deprecations/v2.x/#toc_rendering-into-a-render-helper-that-resolves-to-an-outlet)

#### Legacy Ember.K utility

Ember has historically provided a short-to-type noop function for use as a stub on parent classes or in other situations where a noop might be useful. With the advent of ECMAScript 2015 [method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) and [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), this kind of utility has become more confusing than convenient.

In Ember 3.0 the `Ember.K` function will be removed. For more details, please see the deprecation guide:

- [`Ember.K`](/deprecations/v2.x/#toc_code-ember-k-code)

#### Consuming Ember through Bower

Ember.js 3.0 and later releases will no longer be published to bower. If you still use bower today, we strongly suggest you begin the migration of your dependencies to npm.

<hr>

### APIs Removed in Ember Data 3.0

Below we’ve listed the most notable Ember Data API removals in 3.0. For an exhaustive list see the [Ember](/deprecations/ember-data/v2.x/) [](/deprecations/ember-data/v2.x/)[Data 2.x deprecation guide](/deprecations/ember-data/v2.x/).

#### Using Ember-Data via globals

Ember Data deprecated access to `window.DS` early in 2.x. Instead, accessing the `DS` namespace object via ES modules is preferred. In general this makes Ember Data more like other addons in the Ember ecosystem.

To access Ember Data in applications we suggest importing the `DS` namespace. For example:

```js
import DS from 'ember-data';
```

Additionally, Ember Data 3.0 and later releases will no longer be published to bower. If you still use bower today, we strongly suggest you begin the migration of your dependencies to npm.

Please see the deprecation guide for some additional information:

- [Global version of](/deprecations/ember-data/v2.x/#toc_global-version-of-ds) [`DS`](/deprecations/ember-data/v2.x/#toc_global-version-of-ds)

#### Date.parse

In some legacy browsers, `Date.parse` does not support the ISO8601 standard date format. Ember Data provided a polyfill to make `Date.parse` consistent across environments.

During the 2.x cycle, none of these legacy browsers were supported. Despite this, Ember Data continued to replace `Date.parse` with its own polyfill. Partway through the 2.x cycle, Ember Data introduced the ability to opt-out of this polyfill and that change was made default for new Ember applications.

In Ember Data 3.0 the opt-out functionality will become a noop and the native `Date.parse` functionality will always be used. Additionally, the deprecated API `Ember.Date.parse` will be removed.

For more details see the deprecation guides:

- [`Ember.Date.parse`](/deprecations/ember-data/v2.x/#toc_ember-date-parse)
- [Date prototype extension](/deprecations/ember-data/v2.x/#toc_date-prototype-extension)

#### Relocated APIs

Several APIs have effectively been relocated in Ember Data during the 2.x series. In some cases these changes reflected the promotion of a private API to a public one, in other cases a subtle adjustment to the development model.

- `store.hasRecordForId` was introduced to replace `store.recordIsLoaded` ([deprecation guide](/deprecations/ember-data/v2.x/#toc_recordisloaded)).
- `store.adapterFor` was introduced to replace `store.lookupAdapter` ([deprecation guide](/deprecations/ember-data/v2.x/#toc_lookupadapter)).
- `store.serializerFor` was introduced to replace `store.lookupSerializer` ([deprecation guide](/deprecations/ember-data/v2.x/#toc_lookupserializer)).
- `model.serialize` was introduced to replace `store.serialize` ([deprecation guide](/deprecations/ember-data/v2.x/#toc_store-serialize)).

#### Unused initializers

Ember Data provided several initializers which have been consolidated into a single `ember-data` initializer. In 3.0, support for the legacy initializers (and for ordering other initializers based on their names) will be removed.

Please see the deprecation guide for more details:

- [Unused Initializers](/deprecations/ember-data/v2.x/#toc_unused-initializers)

<hr>

### APIs Removed in Ember CLI 3.0

Here we’ve listed the most notable Ember CLI API removals in 3.0. For an exhaustive list see the [Ember-CLI 2.x deprecation guide](/deprecations/ember-cli/v2.x/).

#### Base URL configuration

Ember CLI applications used to look for a `baseURL` property in an application’s `config/environment.js`. This value would be used to populated a `<base>` tag in the application’s `index.html`. This option provided a way to run an Ember app from a URL subdirectory without rewriting asset URLs.

Unfortunately the `<base>` tag strategy was fatally flawed. Amongst other issues discussed in the [`baseURL`](/blog/2016/04/28/baseURL.html) [deprecation blog post,](/blog/2016/04/28/baseURL.html) SVG fragments on a page with a `<base>` tag have poor support in several browsers. This problem, and others, lead to the `baseURL` option being deprecated in favor of more robust support and documentation of the `rootURL` option.

In Ember CLI 3.0, support for base URL configuration will be removed. For more details on how to migrate away from `baseURL`, see these resources:

- Blog post: [Upcoming deprecation of baseURL in Ember CLI 2.7](/blog/2016/04/28/baseURL.html)
- Deprecation guide: [Base URL](/deprecations/ember-cli/v2.x/#toc_base-url)

#### Legacy Brocfile.js

Ember CLI builds were originally configured in the file `Brocfile.js`. Early in the 2.x series use of this file was deprecated in favor of `ember-cli-build.js`. This new file allowed Ember CLI to pass default configuration to application builds and decoupled Ember CLI from Broccoli’s own configuration system.

In Ember 3.0, support for `Brocfile.js` will be removed. Please see the deprecation guide for more details:

- [Migrate from `Brocfile.js` to `ember-cli-build.js`](/deprecations/ember-cli/v2.x/#toc_migrate-from-brocfile-js-to-ember-cli-build-js)

<hr>

## Browser Support in 3.0

Ember 3.0 will drop support for Internet Explorer 9, IE 10, and PhantomJS. If you still require support for these browsers, Ember 2.18-LTS will maintain support for significant bug fixes until September 2018 and security fixes until February 2019. We encourage you to use this window of time to plan a transition for your users if you intend to upgrade to Ember 3.x.

Microsoft ended support for IE 9 (including security fixes) [in April of 2017](http://www.allyncs.com/docs/lifecyclesupport.html). IE 10 has global usage *below* that of IE9, partially because all operating systems running IE10 can support an upgrade to IE11 or another browser. Amongst Ember developers in the [2017 Ember Community Survey](/ember-community-survey-2017/#browser-requirements) only 2.9% expect to work on application supporting IE9 this spring. Providing a great web experience is difficult on these browsers, and supporting them makes it difficult for us to leverage modern JavaScript and web APIs.

Although there is still limited activity on its GitHub repo, PhantomJS is effectively unmaintained [as of April 2017](https://groups.google.com/forum/#!topic/phantomjs/9aI5d-LDuNE). In its place, Ember and other projects have started to use [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) for continuous integration and other use cases. If you have not already, we encourage you to migrate your own continuous integration systems to headless Chrome.

This decision to drop support for IE9, IE10, and PhantomJS is pending completion of a final comment period on [RFC 252: Browser Support Changes](https://github.com/emberjs/rfcs/pull/252). For more details, please see that RFC.

## Onward to 3.x

Ember 3.x presents us an opportunity to do more than simply remove code. We’re excited to take the conventions Ember developers are building with and continue to streamline the framework around them.

Around the release of Ember 2.0 there were several features we ambitiously hoped to land during the 2.x cycle. We're not planning to rush these features in at the last minute.

- **Routable components** were pitched as a way to remove controllers from Ember applications. Controllers are problematic for two reasons: They are singletons instances, which is often unexpected by developers, and they are a unique concept applied to a specific scenario in application architecture, making them difficult for new developers to learn. Despite these issues, removing controllers remains a challenging design problem that hinges on component API design (should we use today’s components or block on Glimmer components?) as well as query params and routing. We’ve removed most or all of the worst footguns around controllers during the 2.x cycle, and encourage you to use them without hesitation until we complete a migration path to something better.
- **Svelte builds** are a system we’ve discussed for some time. The general pattern is to ship less code to the browser, especially when that code is related to framework features that an application does not use. Migrating Ember itself to be distributed as an Ember CLI addon was the most complex step in the process of bringing svelte to applications. We’re happy to have that hurdle down and Robert Jackson is looking at our next steps.

Please visit our new [Ember Status board](/statusboard) to keep up with what we’re working on. Ember's 3.0 release is focused on removing legacy features, but that doesn't mean we're not working hard in other areas of the framework to deliver on improvement. **In fact, work on improvements to Ember has been effectively decoupled from the 3.x release, and we expect to see new features landing throughout the transition period.**

As a demonstration, here are some examples of new functionality we've
recently added to Ember without adding 3.0-targeted deprecations:

- **The JavaScript modules API for Ember.js**: In Ember.js 2.16 applications can import parts of Ember without going through a single namespace object. This creates opportunities to improve our documentation, editor tooling, and performance. Additionally in Ember 2.16, newly generated applications will use the new module import statements by default. See the [Ember 2.16-beta release post](/blog/2017/09/01/ember-2-15-released.html#toc_ember-js-modules-api) for more details.
- **Routing service phase I**: In Ember.js 2.15 we landed a new service that permits components to interact with the routing system. This service improves the general architecture of Ember apps and creates the opportunity for new kinds of analytics tracking. The first phase of development for the routing service landed in Ember 2.15, with the second phase to follow. See the [Ember 2.15 release post](/blog/2017/09/01/ember-2-15-released.html#toc_public-router-service-phase-1) for more details.
- **Newer versions of the Glimmer-VM rendering engine**: In Ember.js 2.15 the framework upgraded its internal dependency on the Glimmer-VM rendering engine. Included were features like Glimmer's "stack VM", improved assertion stripping, and an improved implementation of the `(component` helper. The Glimmer-VM team is committed to keeping Ember up to date with recent releases. This incremental approach to delivers improvements and optimizations with low risk of a major regression.

We look forward to sharing Ember 3.0-beta on January 1st. Thank you!
