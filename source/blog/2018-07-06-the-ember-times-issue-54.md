---
title: The Ember Times - Issue No. 54
author: Sivakumar Kailasam, Jessica Jordan, Alon Bukai, Amy Lam, Kenneth Larsen
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/07/06/the-ember-times-issue-54.html"
responsive: true
---

привет Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/07/06/the-ember-times-issue-54.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/07/06/the-ember-times-issue-54) what has been going on in Emberland this week.


This week you can read all about the **📦 Ember 3.2** and how the **🐹 Core Team has reorganised**.
There's also a great tip on how you can improve your testing with the new and improved **🚀QUnit DOM**. 
At last, there's news about **👩‍💻 Twiddle** as well as a nice **📹 video on the Ember Styleguide**. Enjoy!

---

## [Organising the Organisers](https://emberjs.com/blog/2018/06/30/organizing-our-contributors.html)
The Ember Team has published a new blog post outlining some **structural changes** to the **Core teams**. It contains two changes: A new Steering Committee and a renaming of some of the existing teams.

The Steering Committee will be responsible for areas like community guidelines, managing Ember’s brand, dealing with legal questions and much more.

The renaming of the **Ember teams** means that moving forward, all the official teams will be known as Core teams: Ember.js Core, Ember CLI Core, Ember Data Core, and Ember Learning Core.

The intent here is to make it clear that all members of the teams are peers.

You can read all about the changes in the [Ember blog post](https://emberjs.com/blog/2018/06/30/organizing-our-contributors.html).

---

## [QUnit DOM on TypeScript for Easy-Peasy Assertions](https://github.com/simplabs/qunit-dom/pull/96)

Are you fond of writing tests in QUnit? Are you a fan of expressive test assertions? Do you 💙 **TypeScript**?
Then we'll guarantee you that this update to [qunit-dom](https://github.com/simplabs/qunit-dom) -
a library that helps you to write **high-level DOM assertions** - will make your heart beat faster 💕:

The library is now using TypeScript for compilation to ES5 and features lots of new type declarations,
making it possible for you to explore the [API](https://github.com/simplabs/qunit-dom/blob/master/API.md)
in your editor as you type.

Check out the [latest v0.7 release](https://github.com/simplabs/qunit-dom/blob/v0.7.0/CHANGELOG.md) to
get all the TypeScript neatness to your test suite today and type on! ⌨

---

## [Twiddle Your Thumbs No More](https://ember-twiddle.com/)

[Ember Twiddle](https://ember-twiddle.com/) support for the latest (v3.2.2) release of Ember and Ember Data is here! With the great efforts of [@Gaurav0](https://github.com/Gaurav0), [@rwjblue](https://github.com/rwjblue) and [@gokatz](https://github.com/gokatz) you can now use the latest and greatest in Ember Land in your favorite browser Ember environment.

Some cool updates are **new keyboard shortcuts** for `run now` and `save` as well as a shortcut for quickly commenting JavaScript code.
There are also some updates to the contribution guide and of course it now supports Ember 3.0 - 3.2 out of the box!

Ember Twiddle, currently at `v0.15.0` is a great tool that allows creating simple Ember apps to showcase ideas, bugs, issues, demos and more. It allows using addons with the included `twiddle.json` and has a built-in generator just like Ember-CLI. There are even different keyboard layouts such as Vim, Emacs, Sublime and more.

Now is a great time to check out this amazing tool!

---

## [Upgrade ⬆️ Your App up to 11 with Ember 3.2 🐹](https://www.emberjs.com/blog/2018/07/02/ember-3-2-released.html)

The time has come. The long awaited [version 3.2 release of Ember, Ember CLI and Ember Data](https://www.emberjs.com/blog/2018/07/02/ember-3-2-released.html) is out in the wild!

A little later than previously planned, this release makes up for the waiting with neat new features,
including the handy [let helper for on the spot creation of bindings in your templates](https://emberjs.github.io/rfcs/0286-block-let-template-helper.html) or
the ✨ testing assertion library [qunit-dom](https://github.com/simplabs/qunit-dom)
which is now added to your v3.2+ app on your very first `ember new`.

Ember Data's latest release
[removes](https://www.emberjs.com/blog/2018/07/02/ember-3-2-released.html#toc_ember-data-feature-flag-removal-2-of-4) several **stale feature flags** -
put into place to allow users an opt-in to experimental features which have now become outdated
to make way for more recent developments of the addon.
If you're relying on any of these features in your app, be sure to
**reach out** to the Ember Data team for support with the transition [by opening an issue here](https://github.com/emberjs/data/issues).

You can also check out the release blog post's **Deprecations** sections to ensure that you're app is prepared for the
next major release. Read all about 👀 it on the Ember Blog:

<div class="blog-row">
  <a class="ember-button"
    href="https://www.emberjs.com/blog/2018/07/02/ember-3-2-released.html"
    target="blog"
    aria-label="Read more about the 3.2 Ember release on the Ember blog">Read more</a>
</div>

---

## [Open Source Live](https://www.youtube.com/watch?v=Dx0vfMyQJMU&feature=youtu.be)
Now that the Guides and Deprecations have been moved into Ember apps, [emberjs.com](https://emberjs.com/) needs to be moved to an Ember app too! [Chris Manson](https://github.com/mansona) and [Melanie Sumner](https://github.com/MelSumner) recorded their **latest pairing session**, where they are working on **adding the beta** [ember-learn/ember-styleguide](https://github.com/ember-learn/ember-styleguide) to the new [ember-learn/ember-website](https://github.com/ember-learn/ember-website) (a rewrite of [emberjs/website](https://github.com/emberjs/website) in Ember, so as to make it easier to contribute to). Check out the video to learn more about Learning Team happenings and pair programming for knowledge sharing!

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

A warm thank you 💕 goes to [@krisselden](https://github.com/krisselden), [@Alonski](https://github.com/Alonski), [@kennethlarsen](https://github.com/kennethlarsen), [@jessica-jordan](https://github.com/jessica-jordan), [@MelSumner](https://github.com/MelSumner), [@pete-the-pete](https://github.com/pete-the-pete), [@hakilebara](https://github.com/hakilebara), [@teddyzeenny](https://github.com/teddyzeenny), and [@oskarrough](https://github.com/oskarrough).

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

Sivakumar Kailasam, Jessica Jordan, Alon Bukai, Amy Lam, Kenneth Larsen and the Learning Team
