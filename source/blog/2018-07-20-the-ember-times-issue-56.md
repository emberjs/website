---
title: The Ember Times - Issue No. 56
author: Kenneth Larsen, Amy Lam, Miguel Braga Gomes, Ryan Mark, Jessica Jordan, Alon Bukai
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/07/20-the-ember-times-issue-56.html"
responsive: true
---

Ia orana Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/07/20/the-ember-times-issue-56.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/07/20/issue-56) what has been going on in Emberland this week.

...

Check out what's been going in Emberland 🐹 these days:

## IDEAS
- Edward Faulkner@eaf4
Would you like to use dynamic import() to lazy-load deps into your Ember app right now? Here's a video showing how: https://eaf4.com/dynamic-import-into-your-ember-app/
- https://twitter.com/mixonic/status/1017487614121684992
- https://twitter.com/oligriffiths/status/1019257665925648390?s=19
---

## [Got Dependencies? 📦](https://github.com/ef4/ember-auto-import#dynamic-import)
We’ve previously highlighted the great `ember-auto-import` by the wizard,[Edward Faulkner](https://github.com/ef4) 🧙, as a way to import npm packages into your Ember app. With the latest update **it just got way cooler**.

As he demonstrates in this [nice screencast](https://eaf4.com/dynamic-import-into-your-ember-app/) with v1.2.0 you can now lazy load dependencies via `import()`! The dynamic `import()` will load the dependency as well as all its recursive dependencies via a separate Javascript file **at runtime**. That’s really awesome.

To get started, watch the screencast or dive into the [documentation](https://github.com/ef4/ember-auto-import#dynamic-import).

---

## [TodoMVC Ember.js Update ✨](https://github.com/tastejs/todomvc/pull/1790)

On our last edition, we mentioned that [@mixonic](https://github.com/mixonic) was looking for a helping hand to contribute on the TodoMVC Ember.js update. The [PR](https://github.com/tastejs/todomvc/pull/1790) is now closed and the bump to Ember 2.13.3 was a success, a big thank you from the community to everyone involved.

[TodoMVC](http://todomvc.com/) helps you decide what MV* framework to use on your projects by providing the classic todo app built in a number of different frameworks and therefore exposing each framework capabilities.

We all know which one is our favorite...🐹, so why not stop by and see it in action at [http://todomvc.com/emberjs](http://todomvc.com/examples/emberjs), or maybe become a [contributor](https://github.com/tastejs/todomvc/blob/master/contributing.md).

Have fun with the "Speed-dating of MV" frameworks"!

---

## [On the Heels of 3.2: Ember 3.3 Released 🎉](https://emberjs.com/blog/2018/07/16/ember-3-3-released.html)

<img class="float-right small transparent padded" alt="Release Bust Tomster" title="Ember Stable Release" src="/images/tomsters/3-release.png" />

Although you might remember a not too far away, [previous 3.2 release](https://emberjs.com/blog/2018/07/02/ember-3-2-released.html), this week the **latest 3.3 release** of Ember.js, Ember CLI and Ember Data has been [published](https://emberjs.com/blog/2018/07/16/ember-3-3-released.html).
This will guarantee that the publishing of Ember.js in particular stays in sync with the planned schedule of the overall release cycle.

The new minor release of Ember.js includes a switch that allows you to **include _jQuery_** into your app **optionally**,
by using the `jquery-integration` flag of [`@ember/optional-features`](https://github.com/emberjs/ember-optional-features).
There are also some more **new deprecations** that you shouldn't miss to make your Ember app ready for the future! ⏰
**Read more** about these and other details of the 3.3 release in [the official release blog post](https://emberjs.com/blog/2018/07/16/ember-3-3-released.html).

<a class="ember-button ember-button--centered" href="https://emberjs.com/blog/2018/07/16/ember-3-3-released.html" target="threedotthreerelease">Read more</a>

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)

---

## [RFC Roundup with @rwjblue](https://emberweekend.com/episodes/rfc-roundup-with-rwjblue)

The Ember Weekend podcast is back on the mic! Want to hear more about some recent RFCs? [@rwjblue](https://github.com/rwjblue) discusses [RFC #276: Named Arguments Syntax (`{{@foo}}`)](https://github.com/emberjs/rfcs/blob/master/text/0276-named-args.md), [RFC #213: Custom Components API](https://github.com/emberjs/rfcs/pull/213), and [RFC #311: Introduce `<AngleBracketInvocationSyntax />`](https://github.com/emberjs/rfcs/blob/master/text/0311-angle-bracket-invocation.md) in [Ember Weekend's latest podcast](https://emberweekend.com/episodes/rfc-roundup-with-rwjblue). Entertaining and informative! TIL "splatributes". Subscribe to Ember Weekend [here](https://itunes.apple.com/us/podcast/ember-weekend/id981719021) on iTunes. 🎙

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

<p>This week a warm thank you goes out to <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/ef4" target="gh-user">@ef4</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/Gabbyjose" target="gh-user">@Gabbyjose</a>, <a href="https://github.com/bmac" target="gh-user">@bmac</a>, <a href="https://github.com/jelhan" target="gh-user">@jelhan</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/2hu12" target="gh-user">@2hu12</a> and <a href="https://github.com/oligriffiths" target="gh-user">@oligriffiths</a>
</span> for their contributions to Ember and related repositories! 💕
</p>

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Have a suggestion for next week's Ember Times? Want to write for us? Pop into [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/)
on the Ember Community [Slack](https://ember-community-slackin.herokuapp.com/) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap!  ✨

Be kind,

the crowd and the Learning Team
