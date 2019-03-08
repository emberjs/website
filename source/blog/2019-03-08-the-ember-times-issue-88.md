---
title: The Ember Times - Issue No. 88
author: Amy Lam, Chris Ng, Anne-Greeth van Herwijnen, Kenneth Larsen, Jared Galanis, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2019
alias : "blog/2019/03/08-the-ember-times-issue-88.html"
responsive: true
---

👋 Emberistas! 🐹

Be heard by filling out the Ember Community Survey! 🗣 Check out a video preview of Ember.js Octane tech 🎥, the latest release of ember-ajax 🎉, learn how to contribute to Ember Times 📰, a new full-stack livestream series 📹, and read about angle bracket component invocation syntax for built-in components 📐!


## [Only a Few Days Left to Complete the Ember Community Survey 🚀](https://emberjs.com/ember-community-survey-2019/)

This upcoming **Tuesday, March 12th** is the deadline to complete the [Ember community survey](https://emberjs.com/ember-community-survey-2019/). If you have already answered the survey, thank you! 🎉 Don’t forget to poke a lot of people around you to complete it too!

If you have not yet completed it, please do. Your answer will give a better view on the Ember community and how it is used all around the world!

---

## [Ember.js Octane Tech Preview  🎥](https://www.youtube.com/watch?v=BV09blWlc64)

Check out an awesome new video preview by [@GavinJoyce](https://github.com/GavinJoyce) explaining some of the features and improvements available as part of **Ember Octane**!

The video briefly covers Module Unification and relevant changes to file structure in Ember Octane. Through examples [@GavinJoyce](https://github.com/GavinJoyce) reviews the difference between classic Ember components and Glimmer components in both angle bracket invocation syntax and classic invocation syntax. Also covered are Octane's use of tracked properties vs computed properties, outer vs inner html semantics (div wrapping), tagName(s), classNames, component arguments, splattributes and more.

[@GavinJoyce](https://github.com/GavinJoyce) also calls attention to some nice resources available for learning more details about what's involved in Ember Octane. Watch the [full video, here](https://www.youtube.com/watch?v=BV09blWlc64).

---

## [Release of ember-ajax v5.0.0 🎉](https://github.com/ember-cli/ember-ajax/blob/master/CHANGELOG.md#500-2019-03-05)

[@Turbo87](https://github.com/turbo87/) announced the [release of version 5.0.0](https://twitter.com/TobiasBieniek/status/1103051224180498434) of [ember-ajax](https://github.com/ember-cli/ember-ajax). In this update, we have a **breaking change** for the Error classes since the base class of the custom Error classes was changed to extend native `Error` instead of `EmberError`.

Furthermore, ember-ajax was also updated to use [ember-cli-babel](https://github.com/babel/ember-cli-babel) v7.x, which requires all apps that uses ember-ajax to use [Ember CLI 2.13 or above](https://github.com/ember-cli/ember-ajax#compatibility).

---

## [Learn to Contribute to Ember.js 🏫](https://www.kennethlarsen.org/how-to-contribute-to-the-ember-times/)

[@kennethlarsen](https://github.com/kennethlarsen) has released a new blog series that will **take you through contributing to the Ember.js ecosystem**. The series starts off with contributions that are non-advanced and does not require code and will finish with some more advanced code contributions.

In this first post **you'll learn how to contribute to The Ember Times**. It takes you through everything from picking a topic to requesting a review on your writing. Check out [the blog post](https://www.kennethlarsen.org/how-to-contribute-to-the-ember-times/) to get started.

---

## [Full-Stack Development with Ember and Rails Livestream Series 📹](https://www.twitch.tv/codingitwrong)

Josh Justice AKA [@CodingItWrong](https://github.com/codingitwrong) has a new livestream series on his [Twitch channel](https://www.twitch.tv/codingitwrong) where he **builds an application from scratch using Ember and Rails**. Why Ember for this series? Productivity and developer happiness! 💯

These videos will appeal to you if...

* You're a backend developer who hasn't worked with extensive JavaScript before. You'll see how Ember allows you to build rich UIs, without needing to learn a lot to get started.
* You have experience with another frontend framework. You can learn from Ember's approach and gain another perspective.
* You've used Ember in the past. You'll be excited to see recent happenings that make Ember *easier* to use than before.

Check out the [teaser video](https://www.youtube.com/watch?v=qCjUBVNng4w) for the series, [Part 1: Deployment, CI, and Dependencies](https://www.youtube.com/watch?v=8Sz2AuhWKe0&t=), [Part 2: Models with JSON:API](https://www.youtube.com/watch?v=gxA-dDw1Vqo), and [Part 3: UI Libraries and UX](https://www.youtube.com/watch?v=bqnrUCCPego). More videos will be released on [YouTube](https://www.youtube.com/channel/UCa-4tbLDX_lmq2f40L0paZw) over the next few Fridays. Better yet, tune into the livestream on [Twitch](https://www.twitch.tv/codingitwrong) Fridays at 2pm ET to chat and follow along live!

---

## [Angle Brackets for All Components 📐](https://github.com/emberjs/rfcs/pull/459)

A [new Request for Comments (RFC)](https://github.com/emberjs/rfcs/pull/459) is proposing to make **Angle Bracket Component Invocation Syntax** available for all components in an Ember application - including the **built-in componnents** `link-to`, `input` and `textarea`.

Currently, those cannot be invoked using the modern invocation syntax from Ember's upcoming edition **Octane**, but this proposal attempts to provide ways to do so and circumvent some of today's limiting APIs.

You can read more about the motivation and the detailed design of this change in [the original RFC](https://github.com/emberjs/rfcs/blob/angle-built-ins/text/0459-angle-bracket-built-in-components.md). Be sure to leave your thoughts!

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/chancancode" target="gh-user">@chancancode</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/simonihmig" target="gh-user">@simonihmig</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/efx" target="gh-user">@efx</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/MinThaMie" target="gh-user">@MinThaMie</a>, <a href="https://github.com/rajasegar" target="gh-user">@rajasegar</a>, <a href="https://github.com/yusufsagdic" target="gh-user">@yusufsagdic</a>, <a href="https://github.com/igorT" target="gh-user">@igorT</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/ming-codes" target="gh-user">@ming-codes</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/bazzel" target="gh-user">@bazzel</a>, <a href="https://github.com/muziejus" target="gh-user">@muziejus</a>, <a href="https://github.com/boris-petrov" target="gh-user">@boris-petrov</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a> for their contributions to Ember and related repositories! 💖</p>

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

Amy Lam, Chris Ng, Anne-Greeth van Herwijnen, Kenneth Larsen, Jared Galanis, Jessica Jordan and the Learning Team
