---
title: Ember 1.0 Released
author: The Core Team
tags: Releases, 2013, Version 1.x, Router, Testing, Performance
responsive: true
---

Today, we're excited to announce the final release of Ember.js 1.0.

The first commit to the repository that would become Ember.js happened on April
30th, 2011, almost two and a half years ago.

At the time, Backbone.js was rocketing to popularity. In response to large
JavaScript frameworks like SproutCore, Cappuccino, and Dojo, which tried to
abstract away HTML, most web developers began rejecting any solution whose
source code they couldn't read over in an afternoon. The "microlibrary" frenzy
had hit full tilt.

However, we knew that as web browsers became more and more powerful, these
simplistic abstractions wouldn't scale up to the kind of apps that users would
begin to demand.

We realized that helping developers grapple with the complexity of building
100% JavaScript web applications could only happen if we embraced the tools
that they were most comfortable with: HTML and CSS.

Based on the current popularity of frameworks like Ember, Angular and Knockout,
it's clear that this strategy turned out to be the right one.

As we began work on Ember.js, however, we soon realized that there was a
fundamental problem. Just having templates that were bound to models was
not enough. We also needed to help developers decide _which_ templates and
models to display at any given time.

While struggling to figure out the best solution, we couldn't help but notice
that many JavaScript applications on the web felt broken. Basic things that
we had taken for granted for two decades all of a sudden stopped working.
Just clicking the browser's back button was enough to break many of these apps.

We realized that the solution to our problem had been sitting under our noses
all along: the URL is what web applications use to decide what to display!

We knew that we had to go back to the drawing board. We rebooted the entire
project mid-course to refocus on how to build JavaScript apps that not only
helped you architect large, multi-page applications, but helped you to do so
without breaking the basic building blocks of the web.

Over time, we've added even more features, like components, that help bring
solid UI architecture to the web. We are incredibly proud of the job that
the community has done to lay a solid foundation that we can build upon for the
years to come.

This 1.0 release is a promise from us: the pain that many experienced while we
were figuring out how to build a JavaScript framework for the future of the web
is now over. In keeping with the Semantic Versioning spec, there will be no
more intentional breaking changes until we release Ember 2.0, which we don't
anticipate happening for some time.

## Recent Developments

### Router Facelift

Over the past few months, Alex Matchneer has taken the Ember router to the next
level. Alex's changes focus on making the router an excellent tool for managing
complex asynchronous flows (like authentication), and you can learn all about it
in his recently completed guides:

* [Asynchronous Routing][1]
* [Preventing and Retrying Transitions][2]

[1]: /guides/routing/asynchronous-routing/
[2]: /guides/routing/preventing-and-retrying-transitions/

### Preparation for Modules

In the years since we started Ember, the JavaScript module ecosystem has become
increasingly mature.

Today, tools like [require.js][3] and module systems like [AMD][4], [Node][5],
and [ES6 Modules][6] continue to gain traction. Increasingly, people are using
named modules and module loaders rather than storing their code in globals.

To prepare for this future, all of the code lookup and naming conventions in
Ember.js now go through a single `Resolver`. The default `Resolver` still looks
for code under global namespaces, but [Ember App Kit][7] already provides an
alternative resolver that looks for code in AMD modules.

In the near future, we plan to roll in first-class support for modules into the
framework, based on the experiences of users of the increasingly popular Ember
App Kit.

[3]: http://requirejs.org/
[4]: https://github.com/amdjs/amdjs-api/wiki/AMD
[5]: http://nodejs.org/api/modules.html
[6]: https://github.com/square/es6-module-transpiler
[7]: https://github.com/stefanpenner/ember-app-kit/blob/master/vendor/loader.js#L41-L136

### Ember Testing

The Ember community has always been passionate about testing. Even at the earliest
meetups, testing was one of the most frequently asked-about topics, and testing
featured prominently in our thinking as we built out the new router.

As we got closer to Ember 1.0, we realized that we needed to provide an official
set of testing-framework agnostic testing helpers. The Ember Testing
package is the start of a longer-term focus on testing facilities that we plan
to improve even more in the 1.x timeframe.

You can see some of our thoughts for future improvements on the [Ember
Discussion Forum][8].

[8]: http://discuss.emberjs.com/t/ember-testing-improvements/1652

### Ember Inspector for Chrome

Teddy Zeenny's relentless work on the Ember Inspector has been some of the most
awe-inspiring work we've seen in open source.

The [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi) that ships with Ember 1.0 makes it easy to see how an
Ember application is laid out, and presents all of the naming conventions in an easy-to-read table.
If you're using Ember Data, it also lets you see all of the records that your application has loaded at
a glance.

Coming up next is asynchronous debugging to help make sense of some of the more
quirky behavior of Promises.

<img src="https://lh6.googleusercontent.com/TGLbr4UoyLqBNvZACqghquEMo5bVWWrlA8f_UkCf4F5etIcqNM0HcBLVRRCQHHLWwBilJbznxrk=s1280-h800-e365-rw">

### Performance, Performance, Performance

A number of community members, especially Kris Selden, Erik Bryn and Robin Ward
have done heroic work lately on performance.

Over the years, Ember's internals have been significantly sped up time and
time again, and we will continue to hone the performance of Ember going forward.

In the 1.x timeframe, we have a number of ideas that should significantly
improve rendering performance and decrease the amount of GC during rendering,
so keep an eye out!

### Docs, Docs, Docs

The early lack of good documentation for Ember seriously pained us, as we're all
big believers in the idea that user confusion should be considered a bug in the
framework.

Over the past year, we've significantly improved both the [API documentation][9]
and the [Guides][10]. Trek Glowacki has led up the effort, which has resulted in
comprehensive coverage of how to use Ember, an excellent, up-to-date Getting
Started Guide, and most recently, a Cookbook section for common scenarios.

For Ember 1.0, Trek led a documentation audit of all of the API documentation in
the entire codebase, which led to 1,700 new lines of documentation, and an
across-the-board freshening for new idioms and best practices.

[9]: /api
[10]: /guides

### Ember Data 1.0 Beta 1

With the release of Ember 1.0, we're glad to also release the first beta of
Ember Data 1.0.

Ember Data 1.0 is a reboot of our data layer. The focus of the effort (codenamed
`jj-abrams`, famous for franchise reboots) was:

* A more flexible codebase, able to handle streaming, custom JSON, and edits
  while saving with ease. If you've found Ember Data too inflexible for your
  backend in the past, try it again!
* Asynchronous operations are now all backed by promises. This will integrate
  better with Ember's own asynchronous handling, and make it easier to combine
  and pipeline asynchronous operations like `find` and `save`.
* Better support for modules. Ember.js itself now has good support for modules,
  through Ember App Kit's drop-in resolver, but Ember Data's reliance on global
  lookups (through `App.Post.find`, etc.) made Ember Data hard to use with
  modules. The Ember Data 1.0 API is much more friendly to modules, and
  therefore the future of Ember.js and the web platform.
* Much better documentation of Ember Data's APIs, including the adapter and
  serializer APIs. Flexible APIs are no good if it's impossible to learn about
  them.

If you're a current user of Ember Data, you may want to check out the
[Transition Guide][11]. If you have issues upgrading that aren't covered in the
guide, please let us know right away so we can improve it.

Note: If you aren't ready to upgrade just yet, we've released Ember Data 0.14,
which includes a number of useful performance optimization for Ember Data 0.13
but no breaking changes.

[11]: https://github.com/emberjs/data/blob/master/TRANSITION.md

## Community

The Ember community is amazing.

<blockquote class="twitter-tweet"><p>I love the Ember community</p>&mdash; Yehuda Katz (@wycats) <a href="https://twitter.com/wycats/statuses/372760498187427841">August 28, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

In addition to the insane amount of work that members of the Ember community
have been doing to prepare the Ember 1.0 release, the community has also been
churning out a number of awesome Ember-related projects.

* [Ember App Kit][12]: An effort by a number of members of the Ember community
  to work on tooling for Ember that will eventually become the core of official
  Ember tools.
* [Ember Tools][13]: Similar work by Ryan Florence, which will be merged into Ember
  App Kit as we begin to bring tooling into core.
* [Bootstrap for Ember][14]: Twitter Bootstrap wrapped in Ember components!
* [Ember Animated Outlet][15]: Support for animated `{{outlet}}`s and
  `{{link-to}}` on top of the current Ember by Sebastian Seilund of Billy's
  Billings.
* [Admin.js][16]: An awesome, flexible and configurable admin for your site
  written in Ember by Gordon Hempton. You can use it with an Ember app or just
  to provide an admin interface for your Rails, Django, PHP, or whatever app!
* [The Ember Hot Seat][17]: A regular podcast brought to you by DeVaris Brown.
  It regularly features members of the Ember Core Team and prominent members of
  the Ember community.
* [EmberWatch][23]: Philip Poot's EmberWatch Twitter account and website will
  keep you up-to-date on the latest projects and news.
* [Ember Weekly][24]: Ember Weekly, curated by the inimitable Owain
  Williams, packs all the Ember news that's fit to print into your inbox
  every week.
* And way more projects. Keep an eye out on this blog, or follow us on the
  official @emberjs Twitter account. We plan to feature more projects like these
  in the future.

[12]: https://github.com/stefanpenner/ember-app-kit
[13]: https://github.com/rpflorence/ember-tools
[14]: http://ember-addons.github.io/bootstrap-for-ember/dist/
[15]: https://github.com/billysbilling/ember-animated-outlet
[16]: http://adminjs.com/
[17]: http://emberhotseat.com/
[23]: https://twitter.com/EmberWatch
[24]: http://emberweekly.com/

We've also been grateful to be the beneficiary of large amounts of support from
a number of companies over the years.

* LivingSocial, which funded much of the original work on Ember Data.
* Yapp, whose employees have been working on Ember (and SproutCore before
  Ember) for years, and which has dedicated countless man-hours to making Ember
  better.
* Zendesk, an early user and contributor to Ember. Thank you for betting on
  Ember as early as you did.
* McGraw-Hill Education Labs, which has been funding Ember work for over a year,
  with great patience, resolve and vision.
* Tilde, which employs Tom, Yehuda, Peter and Leah, and which handles much of
  the (unseen) administrative work of the project.
* Billy's Billings, which has given Sebastian Selund time to work on Ember, and
  hosted the work on `ember-animated-outlet`, which will make its way into a
  future version of Ember.

Finally, a number of large open source projects have bet on Ember. These
projects contribute significantly to Ember's development, and also give Ember
users a place to look at large, real-world projects.

* [Travis CI][18]: A very early Ember adopter. The Ember project makes heavy use of
  Travis, so thank you!
* [Discourse][19]: The increasingly popular forum engine that now powers
  TalkingPointsMemo and BoingBoing. These guys have contributed heavily to Ember
  and its community.
* Balanced: Balanced is an [open-source][20], **open company**. They use Ember
  for their [dashboard][21].

[18]: https://travis-ci.org/
[19]: http://www.discourse.org/
[20]: https://github.com/balanced
[21]: https://github.com/balanced/balanced-dashboard

## Undefined Semantics

There are two areas of Ember.js that have semantics that may accidentally work
in some cases today, but are the source of a number of bugs, and which we don't
plan to support in the future.

### Observer Timing

At present, Ember observers sometimes fire synchronously, but sometimes fire
asynchronously. The only thing your code should rely on is that the observer
will fire **after** the property it observes has changed.

We plan to bring all observers into alignment with [Object.observe][25], a
future JavaScript feature. In the future, observers will **never** fire
synchronously. If you rely on specific timing, your code may break.

[25]: http://wiki.ecmascript.org/doku.php?id=harmony:observe

### Observing Properties of Framework Objects

In general, you should not observe properties of framework objects defined by
the framework that are not explicitly documented as observable. Some of these
observations may happen to work today, but may not work in the future.

For example, you should not observe the `element` property on an Ember view or
component. Instead, you should use the `didInsertElement` hook.

If you find yourself observing a framework-defined property that is not
documented as observable to work around an issue, **please** file an issue with
us so we can give you a publicly defined API.

## The Future

Despite our commitment to stability, we are not resting on our laurels. We have
an aggressive pipeline of new features planned, which we'll be announcing soon.

We're also switching our releases to follow a more Chrome-like model. This means
that you can expect a new release every six weeks. We'll have more details about
this soon.

## Thanks

Special thanks to a number of community members who have done heroic work
leading up to Ember 1.0:

* Eric Berry, for the new Cookbook section in the guides and examples
* Paul Chavard, for help reviewing Ember Data 1.0 Beta 1
* Domenic Denicola, for putting us on the right path with promises
* Dan Gebhardt, for website infrastructure
* David Hamilton, for the Array Computed feature
* Robert Jackson, for the new emberjs.com/builds
* Julien Knebel, for design work
* Alex Matchneer, for the async router guide
* Luke Melia, for `actions` namespacing, last minute bugfix work, and the Ember NYC community
* Alex Navasardyan, for inline examples on the homepage and design work
* Stanley Stuart, for testing infrastructure
* Igor Terzic, for help reviewing Ember Data 1.0 Beta 1
* Teddy Zeenny, for the Ember Inspector
* The 300 people who submitted code and documentation to Ember 1.0
* The 131 people who submitted code and documentation to Ember Data 1.0 Beta 1
* The 269 people who helped with [emberjs.com](http://emberjs.com)

Go forth and build great things!
