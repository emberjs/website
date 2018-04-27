---
title: The Ember.js Times - Issue No. 44
author: Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Jen Weber, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/04/27/the-emberjs-times-issue-44.html"
responsive: true
---

ಹಲೋ Emberistas!

You can find our newsletter in both [the e-mail](https://the-emberjs-times.ongoodbits.com/)
and the [blog format](https://emberjs.com/blog/2018/04/27/the-emberjs-times-issue-44.html).
Share it even more easily with all your Ember friends!

In this edition, we will share updates for **Ember CLI**, what's upcoming
for Ember **documentation** very, very soon, and the latest **Ember patch** release that
neither you nor your apps should miss.

Here's a recap of what happened in Emberland these days ✨

---

## [Ember 3.1.1 Released 🐹✨](https://github.com/emberjs/ember.js/releases/tag/v3.1.1)
This week, a **patch** for Ember was released. It includes **several bug fixes**, but here are a few selected ones:

[A bug](https://github.com/emberjs/ember.js/issues/16379) was introduced in Ember 3.1 that caused `ariaRole` to not be appended if this was initially set as being `false`. The expected behaviour here is that if you initially set the `ariaRole` to false it should not be appended, but you might want to dynamically change this later on. This is now fixed with Ember 3.1.1.

After upgrading to 3.1 [some people](https://github.com/emberjs/ember.js/issues/16503) started seeing errors like `Cannot read property 'syscall' of null`. This was caused by `ComponentDefinitions` leaking heap space. This has been fixed in Ember 3.1.1.

Ember 3.1.1 contains several more fixes. You can go though them all in [the release change log.](https://github.com/emberjs/ember.js/releases/tag/v3.1.1)

> Look! I'm a beautiful butterfly! - Heimlich, A Bug's Life

<a class="ember-button ember-button--centered" href="https://github.com/emberjs/ember.js/releases/tag/v3.1.1">Read more</a>

---

## [All good from 10 to 4 in Ember CLI 🐹💻](https://github.com/ember-cli/ember-cli/pull/7791)

<img class="float-left small transparent padded" alt="Command Line Tomster" title="Ember CLI" src="/images/blog/emberjstimes/embercli-tomster.png" />

This week, contributors to Ember CLI worked on improving the test suite by
[extending the list of Node versions](https://github.com/ember-cli/ember-cli/pull/7791) tested against.
This means that you will be able to use your favorite command line tool
on the the latest version smoothly and without any worries.

Lots of efforts are underway to bring **Treeshaking capabilities** to your
Ember app very soon. Treeshaking is the removal of unused code in order
to decrease app bundle size. Several contributions this week ([1](https://github.com/ember-cli/ember-cli/pull/7788),
[2](https://github.com/ember-cli/ember-cli/pull/7786),
[3](https://github.com/ember-cli/ember-cli/pull/7784)) aimed at improving the internal
packaging manager of Ember CLI. Wanna know more about the new exciting things
that are on the horizon for Ember CLI in 2018? Do not miss the annual [roadmap for 2018](https://discuss.emberjs.com/t/ember-cli-2018-edition/14543) - it's worth the read!

Finally, `ember-cli-update` is **the way to update** your Ember apps, but our documentation
hasn't caught up! You can help by [contributing](https://github.com/ember-cli/ember-cli-update/issues/288)
to one of several official documentation resources, like the ember-cli website.
Also, more help is wanted in reminding `ember-cli-update` users when [a new version is out](https://github.com/ember-cli/ember-cli-update/issues/326).

We're looking forward to your upgrades! ✨

---

## [Learning Team Corner 🤓](https://emberjs.com/blog/2018/04/22/ember-learning-update.html)

The Learning Team met IRL at EmberConf and shared the results of that meeting on [the Ember blog](https://emberjs.com/blog/2018/04/22/ember-learning-update.html). Initiatives for the new year were grouped into two directions - User Support and Marketing.

Some big things are happening over the next few weeks for **The Guides**! A **new app** will be launching soon! [Chris
Manson](https://github.com/mansona) has been working on this project since November, together with a few other
contributors.

Many have been dreaming of it for years.
The main difference is that The Guides have been coverted to an Ember app (instead of a Ruby app),
making it easier for new people to contribute and for the team to maintain.
And, because of [prember](https://github.com/ef4/prember), it's **SEO-friendly**! Deprecation of the old guides app is happening [here](https://github.com/emberjs/guides#notice-this-repository-is-deprecated). Very soon, **Pull Requests** and Issues will be
**frozen**, and contributions to The Guides will continue in one of two new repositories. The WIP
[guides-app](https://github.com/ember-learn/guides-app) is the Ember app that will control layout and functionality,
while [guides-source](https://github.com/ember-learn/guides-source) contains the written content in the form
of versioned markdown files. In the future, most pull requests will be made to the guides-source to keep our content
up to date and continually improving.

The Learning Team and Friends appreciate your patience during the final launch steps.
As we tie up loose ends and move to production, we'll give updates via the
[Ember Community Slack](https://ember-community-slackin.herokuapp.com/)
\#\-team-learning and \#\-announcements channels.

---

## [Contributor's Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

<p>This week we'd like to thank these awesome contributors who worked on Ember core projects:
<a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/ef4" target="gh-user">@ef4</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/toranb" target="gh-user">@toranb</a>, <a href="https://github.com/st-h" target="gh-user">@st-h</a>, <a href="https://github.com/IzzatN" target="gh-user">@IzzatN</a>, <a href="https://github.com/GavinJoyce" target="gh-user">@GavinJoyce</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/skaterdav85" target="gh-user">@skaterdav85</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/lolmaus" target="gh-user">@lolmaus</a>, <a href="https://github.com/htwroclau" target="gh-user">@htwroclau</a>, <a href="https://github.com/ursm" target="gh-user">@ursm</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/pbishop16" target="gh-user">@pbishop16</a>, <a href="https://github.com/cibernox" target="gh-user">@cibernox</a>, <a href="https://github.com/snewcomer" target="gh-user">@snewcomer</a>, <a href="https://github.com/karan-pathak" target="gh-user">@karan-pathak</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/selvaa89" target="gh-user">@selvaa89</a>, <a href="https://github.com/xg-wang" target="gh-user">@xg-wang</a>, <a href="https://github.com/Techn1x" target="gh-user">@Techn1x</a>, <a href="https://github.com/thoov" target="gh-user">@thoov</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/amiller-gh" target="gh-user">@amiller-gh</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/knownasilya" target="gh-user">@knownasilya</a> and <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>. Thank you for your efforts! 💖</p>

---

## [More Questions & more Answers for Readers' Questions](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />
  <p>With learning team efforts being in overdrive this week,
  we want to take the chance to point you to some of previous, great answers to previous, great questions by Ember.js Times readers:</p>
  <ul>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-how-far-are-we-from-being-able-to-just-use-any-npm-package-via-the-import-statement/14462" target="readersq">
    Readers’ Questions #5: “How far are we from being able to just use any npm package via the import statement?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-is-it-bad-to-load-data-in-components/14521" target="readersq">
    Readers’ Questions #6: “Is it bad to load data in components?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-when-will-we-be-able-to-use-decorators-in-ember-apps/14583" target="readersq">
    Readers’ Questions #7: “When will we be able to use decorators in Ember apps?”</a></li>
  </ul>
</div>

Apart from that we’d like to ask you for **many more questions** to be answered in future editions of the Ember.js Times!

**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core). And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Jen Weber and Jessica Jordan
