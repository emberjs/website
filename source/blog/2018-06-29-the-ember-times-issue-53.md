---
title: The Ember Times - Issue No. 53
author: Kenneth Larsen, Sivakumar Kailasam, Alon Bukai, Ryan Mark, Jen Weber, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/06/29/the-ember-times-issue-53.html"
responsive: true
---

Mholweni Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/06/29/the-ember-times-issue-53.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/06/29/the-ember-times-issue-53) what has been going on in Emberland this week.

And this week we not only have an insider tip on how to dramatically **reduce** your **app build times** 🕐 for you,
but we're also reporting back on **easy-peasy module imports** 🙌 and - last, but not least! - presenting you a **brand-new Readers' Question** 💯 in this edition of the Ember Times.
Check it out!

---

## [Need for Speed: Ember Edition - Speed Up Ember Builds](https://github.com/ember-cli/ember-cli/issues/7645)

<p>Have Ember CLI build times been causing you <span style="font-style: italic;">grief</span>? Do you want to shave 20 seconds from your rebuilds?</p>

[Tomasz Smykowski](https://github.com/tomaszs) has been experimenting with building on [SSD vs RAM Disk](https://emberjs-developer.quora.com/How-to-make-Ember-js-CLI-ember-s-32-times-faster). He has seen up to **32x** speed improvements! Speedups were found when upgrading to a faster processor and using an SSD.

Upgrading RAM wasn't found to be helpful however the biggest gain was found by using a **RAM disk** to hold the project folder which allowed 3x speed gains during builds. The drawback of this is that when the computer shuts down the RAM disk is wiped clean (so make sure you commit often!).
[Tobias Bieniek](https://github.com/Turbo87) chimed in that current efforts to integrate Broccoli 2 into Ember CLI are underway and that most platforms would get this speedup by default once the usually RAM Disk powered, system temporary folder instead of the current _in-project_ `tmp` folder is used due to the Broccoli update.

Look for this speedup soon in an Ember App near you!

---

## [Oh, No(de) He Didn't!](https://github.com/ef4/ember-auto-import)
[Edward Faulkner](https://github.com/ef4) has just released version 1.0 of `ember-auto-import`. This addon allows you to add dependencies using NPM or Yarn with **zero configuration**. It can be used both in apps and addons and deduplicates correctly across all addons and the app itself.

All you have to do is type `ember install ember-auto-import` and you’re ready to add whatever dependency you want to your project using NPM or yarn.

Read all about the version 1.0 release on the [forum](https://discuss.emberjs.com/t/ember-auto-import-1-0-released/14997).

---

## [Camping in Illinois with EmberCamp Chicago 🏕](http://embercamp.com/)

<img class="float-left extra-small transparent padded" alt="Chicago Zoey Mascot" title="Zoey Chicago Mascot" src="/images/tomsters/chicago-zoey.png" />

**EmberCamp Chicago** is coming! Join over one hundred other Emberistas ✨ for a one day camping trip ⛺️ to Chicago's Chase Tower
on September 21st!
Read more about the event on [the official website](http://embercamp.com/).

And also important:
Among the motto _"It's Easy In Ember"_ the event organizers are curious about **your talk ideas**; and more than happy
to support you in making your proposal a real success! 🌟
The [Call for Proposals](https://cfp.emberconf.com/events/embercamp-chicago-2018) for talk submissions is still **open until July 22**.
Unsure if you can **see yourself speaking** in the first place but curious what public speaking is about?

Find ideas,
inspiration, answers to your questions and support in the
[#topic-talks](https://embercommunity.slack.com/archives/C9RSE508J/p1530056392000168) channel
on the [Ember Community Slack](https://ember-community-slackin.herokuapp.com/), as well as in the [#women-in-ember](https://embercommunity.slack.com/archives/C0851DA22/p1530137047000189) chat room if
you're a developer who is also a lady 👩🏻‍💻 !

> "So, what do you want to be when you grow up?"
>
> "I don't know...I want go on adventures I think--not get stuck in one place. How about you?"

---

## [Transforms: More than Meets the Eye 👀](https://github.com/emberjs/rfcs/pull/343)

[@Alonski](https://github.com/Alonski) composed an RFC to deprecate the usage of Transforms in Ember Data.  The RFC gathered some attention. Although the core reason for the RFC was discussed, [a comment](https://github.com/emberjs/rfcs/pull/343#issuecomment-400382952) by <a href="https://github.com/runspired" target="gh-user">@runspired</a>, one of the maintainers of Ember Data, stands out from the rest:
Recently the Ember Data team has met and discussed deprecating the transforms, yet leaving them as a feature of the **current** model layer. **Current model layer?** There is another model layer? Yes! Because of the most recent [RecordData RFC](https://github.com/emberjs/rfcs/pull/293), Ember Data is now poised to accept alternative model layers.

If you are interested in what an alternative model layer looks like, check out [ember-m3](https://github.com/hjdivad/ember-m3). That's not all, the comments on this RFC also give us a glimpse into Ember Data's future - there are RFCs coming (not yet published) that  will eventually split up Ember Data into multiple packages.

Interested in the whole conversation? Checkout [@Alonski's](https://github.com/Alonski) RFC [here](https://github.com/emberjs/rfcs/pull/343).

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

<p>A warm thank you 💛 goes to <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/lennyburdette" target="gh-user">@lennyburdette</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/hakilebara" target="gh-user">@hakilebara</a>, <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a> and <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>
</span> for contributing to Ember and related repositories this week! 💕
</p>

---

## [Readers' Questions: “Can I start using Module Unification in my app?”](https://discuss.emberjs.com/t/readers-questions-can-i-start-using-module-unification-in-my-app/15029)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>This week's Readers' Question dives into the realm of cutting-edge Ember features: The avid Ember Times
  reader <code>sandstrom</code> asks if and how you're able to <strong>use Module Unification (MU)</strong> - a reformed way to structure your app's project directory - in your Ember application today.
  Is it true that you can have your own, MU-structured project already?</p>

   <p>In her detailed answer to this question, Ember Learning team member <a href="https://github.com/jenweber" target="githubjen">@jenweber</a> explains which <strong>benefits</strong> MU brings to your Ember app
   and also if it can be used today already. You can <a href="https://discuss.emberjs.com/t/readers-questions-can-i-start-using-module-unification-in-my-app/15029" target="rq2">read the full answer on the official Ember Forum</a>.</p>
  <p>
</div>

<div class="blog-row">
  <a class="ember-button" href="https://discuss.emberjs.com/t/readers-questions-can-i-start-using-module-unification-in-my-app/15029">Read more</a>
</div>

<div class="blog-row">
  <p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🙂</p>
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

Kenneth Larsen, Sivakumar Kailasam, Alon Bukai, Ryan Mark, Jen Weber, Jessica Jordan and the Learning Team
