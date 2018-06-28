---
title: The Ember Times - Issue No. 53
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/06/29/the-ember-times-issue-53.html"
responsive: true
---

Mholweni Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/06/29/the-ember-times-issue-53.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/06/29/the-ember-times-issue-53) what has been going on in Emberland this week.

And this week we not only have an insider tip on how to dramatically **reduce** your **app build times** 🕐 for you,
but we're also reporting back on **easy-peasy module imports** 🙌 and - last, but not least! - presenting you a **brand-new Readers' Question** 💯 in this edition of the Ember Times. Check it out 🐹:

---

## [Need for Speed: Ember Edition - Speed Up Ember Builds](https://github.com/ember-cli/ember-cli/issues/7645)

Have Ember CLI build times been causing you *grief*? Do you want to shave 20 seconds from your rebuilds?

[Tomasz Smykowski](https://github.com/tomaszs) has been experimenting with building on [SSD vs RAM Disk](https://emberjs-developer.quora.com/How-to-make-Ember-js-CLI-ember-s-32-times-faster). He has seen up to **32x** speed improvements! Speedups were found when upgrading to a faster processor and using an SSD.

Upgrading RAM wasn't found to be helpful however the biggest gain was found by using a RAM disk to hold the project folder which allowed 3x speed gains during builds. The drawback of this is that when the computer shuts down the RAM disk is wiped clean (so make sure you commit often!).
[Tobias Bieniek](https://github.com/Turbo87) chimed in that current efforts to integrate Broccoli 2 into Ember CLI are underway and that most platforms would get this speedup by default once the usually RAM Disk powered, system temporary folder instead of the current _in-project_ `tmp` folder is used due to the Broccoli update.

Look for this speedup soon in an Ember App near you!
---

## [Oh, No(de) He Didn't!](https://github.com/ef4/ember-auto-import)
[Edward Faulkner](https://github.com/ef4) has just released version 1.0 of `ember-auto-import`. This addon allows you to add dependencies using NPM or Yarn with zero configuration. It can be used both in apps and addons and deduplicates correctly across all addons and the app itself.

All you have to do is type `ember install ember-auto-import` and you’re ready to add whatever dependency you want to your project using NPM or yarn.

Read all about the version 1.0 release on the [forum](https://discuss.emberjs.com/t/ember-auto-import-1-0-released/14997).

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

<p>This week we'd like to thank our parents for their contributions to Ember and related repositories! 💕
</p>

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

## [The Ember Times is What We Make It 🙌](https://embercommunity.slack.com/messages/C8P6UPWNN/)

The **Ember Times** is a **weekly news editorial** featuring all the new things that are going on in Emberland.
[Subscribe to our e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) to get the next edition **right to your inbox**.
And if you've always wanted to be an OSS journalist yourself,
drop by [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/)
on the Ember Community [Slack Chat](https://ember-community-slackin.herokuapp.com/)
and **write** the next edition of the Ember Times **together with us**!


---


That's another wrap!  ✨

Be kind,

the crowd and the Learning Team
