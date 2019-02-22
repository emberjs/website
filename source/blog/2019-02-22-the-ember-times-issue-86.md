---
title: The Ember Times - Issue No. 86
author: Chris Ng, Gaurav Munjal, Amy Lam, Alon Bukai, Jessica Jordan, Jared Galanis the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2019
alias : "blog/2019/02/22-the-ember-times-issue-86.html"
responsive: true
---

สวัสดี Emberistas! 🐹

Fill out the 2019 Ember Community Survey 📝!

RFC's galore...
check out the two follow up RFCs to make Tracked Properties better  👣, 
an RFC to fully deprecate Partials 🥛...
RFCs to rename htmlSafe and deprecate with 🚫, 
a RFC Roundup Redux episode of Ember Weekend 🔈...

an Ember community experience 🤝, 

...and an exclusive interview with Ember contributor @cibernox 💬 !

---

## [2019 Ember Community Survey 📝](https://emberjs.com/blog/2019/02/19/ember-community-survey.html)

The official 2019 Ember Community Survey is here! We would like your help to learn about who is in the Ember community and how they work with the framework. 

This is the fifth year we're learning about the community's makeup and interests, and we look forward to sharing the results at [EmberConf 2019](http://emberconf.com/) on March 18th. Over 1300 participants took part in the survey in 2018 ([2018 survey results](https://www.emberjs.com/ember-community-survey-2018/)) and we are aiming for even more participation this year!

Completing the survey should take about 15 minutes. We've added a few new questions this year, while retaining opportunities to share feedback as free-form text. All submissions are completely anonymous, and demographic data about the community is not released in the same raw data files as the free-form text and other answers.

Submissions will be accepted until March 12th. More info about the survey can be found [here](https://emberjs.com/blog/2019/02/19/ember-community-survey.html). Why not fill it out now?!

<a class="ember-button ember-button--centered" href="https://emberjs.com/ember-community-survey-2019/">Take the Survey</a>

Please help us spread the word by sharing the [survey landing page](https://emberjs.com/ember-community-survey-2019) on your social network feeds, at meetups and around your office and other communities.

We look forward to your participation! If you have any immediate questions, feel free to email the survey team via [survey@emberjs.com](mailto:survey@emberjs.com), or ping us in [#dev-ember-learning](https://discordapp.com/channels/480462759797063690/480777444203429888) in [Discord](https://discordapp.com/invite/zT3asNS) chat.

---

## RFCs for [Decorator Support](https://github.com/emberjs/rfcs/pull/440) and [Tracked Property Classic Class Descriptor](https://github.com/emberjs/rfcs/pull/442) 👣

[@pzuraq](https://github.com/pzuraq) opened up a pair of RFCs that supplemented the recently merged [Tracked Properties RFC](https://github.com/emberjs/rfcs/pull/410).

The **Decorator Support RFC** is a follow up to the [Decorators RFC](https://github.com/emberjs/rfcs/blob/master/text/0408-decorators.md) since it was premised on decorators moving from stage 2 in the TC39 process to stage 3. However since decorators remained in stage 2, and have not been rejected, and that all parties were in agreement about the *invocation syntax* of decorators – decorators should present a minimal amount of risk to Ember and its users. The changes in the spec will mostly affect library and framework maintainers, but not end users in *most cases*. Ember will begin by supporting the latest version of the decorators transform provided by Babel.

The **Tracked Property Classic Class Descriptor RFC** adds the `descriptor` decorator for classic classes only which allows users to define native getters and setters (and other properties). This provides a clear 1-1 translation between native and classic syntax invocations as a way to add getters and setters to classic classes.

Read and comment on the [Decorator Support RFC](https://github.com/emberjs/rfcs/pull/440) or the [Tracked Property Classic Class Descriptor RFC](https://github.com/emberjs/rfcs/pull/442) on GitHub!

---

## [Let's Fully Deprecate Partials! 🥛](https://github.com/emberjs/rfcs/pull/449)
Partials in Ember have been around for quite some time. Today however they are considered bad practice and all of their functionality can be replaced with Components. There is an [Ember Template Lint rule](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-partial.md) against their use. There was a [Pre-RFC](https://github.com/emberjs/rfcs/issues/390) created a while ago that recommended deprecating partials. Today we finally have a full RFC to [Deprecate Partials](https://github.com/emberjs/rfcs/pull/449) written up by [@GavinJoyce](https://github.com/GavinJoyce). If you want to learn more about the deprecation or maybe the alternatives to partials [check out the RFC](https://github.com/gavinjoyce/rfcs/blob/gj/deprecate-partials/text/0000-template.md). Also be sure to chime in and voice your concerns or add a 👍🎉 to the [RFC itself](https://github.com/emberjs/rfcs/pull/449). 

---

## [Less Confused 🤷‍♀️🚫 with htmlSafe and with](https://github.com/emberjs/rfcs/pull/443)

Two new **Requests for Comments (RFC)** propose deprecations to better avoid confusion in Ember apps:
[One of the proposals](https://github.com/emberjs/rfcs/pull/443) aims to rename the `htmlSafe` template helper and util to `trustedHtml` in an effort to convey the mechanism of the util better.

[The second RFC](https://github.com/emberjs/rfcs/pull/445) proposes the deprecation of the `with` template helper acknowledging the rather recent [`let` helper](https://guides.emberjs.com/release/templates/built-in-helpers/#toc_built-in-block-helpers), that can now be used in templates instead of and with much clearer intent than `with`.

Be sure to check out the original proposals for [the renaming of htmlSafe](https://github.com/emberjs/rfcs/pull/443) and [the deprecation of the with helper](https://github.com/emberjs/rfcs/pull/445) and leave your comments below!

---

## [Ember Weekend RFC Roundup Redux Episode 🔈](https://twitter.com/emberweekend/status/1095017680892035072)

Don't miss [@rondale-sc](https://github.com/rondale-sc) and [@code0100fun](https://github.com/code0100fun) interviewing [@rwjblue](https://github.com/rwjblue) on Episode 128 of the Ember Weekend podcast [RFC Roundup Redux](http://emberweekend.com/episodes/rfc-roundup-reduce). They discussed the [auto-published unified RFC's repo](https://emberjs.github.io/rfcs/introduction.html), the [Glimmer Components RFC](https://emberjs.github.io/rfcs/0416-glimmer-components.html) and its implications for hooks, the [Render Element Modifiers RFC](https://emberjs.github.io/rfcs/0415-render-element-modifiers.html), including the official addon it proposes, and more!

---

## [An Ember Community Experience by Gaurav Munjal 💛](https://twitter.com/gaurav9576/status/1098298137507217408)

I had wanted to make some large breaking changes to [ember-simple-tree](https://github.com/btecu/ember-simple-tree),
in order to enable me to customize it to my liking. Given that it would break backward compatibility and existing applications, I figured my changes would never be accepted. So I forked it and released my version as ember-light-tree.

I was surprised when Bujorel Tecu AKA [@btecu](https://github.com/btecu), the author of ember-simple-tree,
contacted me and wanted to work together to include my changes. As a result, my changes are now in the latest version of
ember-simple-tree.

Even though we had to sacrifice technical backward compatibility, it was important to @btecu that we had a shared solution. One of the main strengths of Ember is how shared conventions enable developers to build on top of each other's work and improve the ecosystem for everyone. It's heartening to see this view echoed in the Ember addon community.

---

## [SECTION TITLE](#section-url)

---

## [SECTION TITLE](#section-url)

---

## ["I contribute to Ember" with Miguel Camba ✍️](https://discuss.emberjs.com/t/i-contribute-to-ember-with-miguel-camba/16193)

<div class="float-right padded portrait-frame">
  <img alt="Miguel Camba" title="Miguel Camba - Contributor to Ember" src="/images/blog/emberjstimes/miguelcamba.jpeg" />
</div>

In our 7th edition of the contributor interview series, community member **Miguel Camba**, also known as [@cibernox](https://github.com/cibernox) talks about his work on **powerful** addons, contributing by necessity and why the **silly pull request** is only **a myth**.

You can read the full interview on [the Ember Forum](https://discuss.emberjs.com/t/i-contribute-to-ember-with-miguel-camba/16193).

<a class="ember-button ember-button--centered" href="https://discuss.emberjs.com/t/i-contribute-to-ember-with-miguel-camba/16193">Read more</a>

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/cibernox" target="gh-user">@cibernox</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/mixonic" target="gh-user">@mixonic</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/XaserAcheron" target="gh-user">@XaserAcheron</a>, <a href="https://github.com/scalvert" target="gh-user">@scalvert</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/jaredgalanis" target="gh-user">@jaredgalanis</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/aklkv" target="gh-user">@aklkv</a>, <a href="https://github.com/bartocc" target="gh-user">@bartocc</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/EndangeredMassa" target="gh-user">@EndangeredMassa</a> and <a href="https://github.com/CodingItWrong" target="gh-user">@CodingItWrong</a> for their contributions to Ember and related repositories! 💖</p>

---

## [Got a Question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

## [#embertimes](https://emberjs.com/blog/tags/newsletter.html) 📰

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#support-ember-times](https://discordapp.com/channels/480462759797063690/485450546887786506) on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

Keep on top of what's been going on in Emberland this week by subscribing to our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/)! You can also find our posts on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html).

---


That's another wrap! ✨

Be kind,

Chris Ng, Gaurav Munjal, Amy Lam, Alon Bukai, Jessica Jordan, Jared Galanis, the crowd and the Learning Team
