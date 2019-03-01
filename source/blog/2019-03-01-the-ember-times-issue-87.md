---
title: The Ember Times - Issue No. 87
author: Jessica Jordan, Kenneth Larsen, Chris Ng, Jared Galanis, Amy Lam
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2019
alias : "blog/2019/03/01-the-ember-times-issue-87.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

This week: **Take and share** the **2019 Ember Community Survey** 🐹, Ember 3.8 released 🚀, SFC & Template Import Primitives RFC 🔬
Dig through the **Classic Class Owner Tunnel RFC** 🕳,
**Contribution Guides RFC** in FCP ✏️
...and a brand-new **Readers' Question** 🤓 for you!

---

## [Let Your Voice Be Heard In The 2019 Ember Community Survey 🗣](https://emberjs.com/ember-community-survey-2019/)

With 2019 already under way the Ember Core team would like your help to learn about who is in the Ember community and how they work with the framework. [The 2019 Ember Community Survey](https://emberjs.com/ember-community-survey-2019/) is anonymous and only open until **March 12th**!

Be sure to [take survey today](https://emberjs.com/ember-community-survey-2019/) and **spread the word** among your colleagues and Ember friends!

<a class="ember-button ember-button--centered" href="https://emberjs.com/ember-community-survey-2019/">Take the survey</a>

---

## [Ember 3.8 Released 🚀](https://emberjs.com/blog/2019/02/27/ember-3-8-released.html)

New versions of Ember, Ember CLI and Ember Data have been released. Not only does this release contain features like the **Element Modifier Manager and the array helper** - it also marks 3.8 as a new LTS candidate. Both the features and the LTS information can be found in the [release post](https://emberjs.com/blog/2019/02/27/ember-3-8-released.html).

This release also contains 5 deprecations for Ember, so if you plan on upgrading to 3.8 please have a look at the [new deprecations](https://emberjs.com/blog/2019/02/27/ember-3-8-released.html#toc_deprecations-5).

---

## [RFC for Single-File Components & Template Import Primitives](https://github.com/emberjs/rfcs/pull/454) 🔬
[@tomdale](https://github.com/tomdale) recently opened up an RFC to explore adding single-file components and module imports in component templates!

The **SFC & Template Import Primitives RFC** proposes adding experimental low-level primitives for embedding templates in JavaScript and associating templates with component classes, two highly-requested features. 🎉

Rather than proposing specific formats for single-file components and template imports, the RFC proposes new low-level API's that addons can use to implement experimental 🧪 file formats.

Be sure to checkout and comment on the detailed design of the [SFC & Template Import Primitives RFC](https://github.com/emberjs/rfcs/pull/454) on Github!

---

## [Contribution Guides in FCP! 🖊️](https://github.com/emberjs/rfcs/pull/446)

[@jessica-jordan](https://github.com/jessica-jordan) proposed adding an official **Contribution Guide** which aims to improve the discoverability of Ember-related projects that require help by the community and outlines the general contribution workflow for these projects.

With the intent of making the Contribution Guides as beginner-friendly as possible, it will include a **summary** of the motivation of open-source and its meaning for Ember as an OSS project, a real-world example of **how to contribute code**, a guide on **how to file an issue**, and an **issue finder** inspired by the [What Can I Do for Mozilla landing page](https://whatcanidoformozilla.org/).

<!--alex ignore period-->
The [Contribution Guides RFC](https://github.com/emberjs/rfcs/pull/446) is in Final Comment Period (FCP) so check it out!

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [Classic Class Owner Tunnel RFC 🕳](https://github.com/emberjs/rfcs/pull/451)

[@pzuraq](https://github.com/pzuraq) opened an RFC around making `getOwner` and explicit injections work in classic class constructors since the [Native Class Constructor Update RFC](https://github.com/emberjs/rfcs/blob/master/text/0337-native-class-constructor-update.md) changed the way that classic classes were constructed.

The Classic Class Owner Tunnel RFC proposes to make _explicit_ injections work for the class’s constructor method. However, _implicit_ injections will still only be available during `init`, because they are passed in and assigned as `args`. The _implicit_ injections will be caught using development-mode assertions which would direct users to add the injection explicitly (ideally), or to use `init`.

Read the full details on the [Classic Class Owner Tunnel RFC](https://github.com/emberjs/rfcs/pull/451) on GitHub!

---

## [SECTION TITLE](#section-url)


---


## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/jaredgalanis" target="gh-user">@jaredgalanis</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/CodingItWrong" target="gh-user">@CodingItWrong</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/enomws" target="gh-user">@enomws</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/ondrejsevcik" target="gh-user">@ondrejsevcik</a>, <a href="https://github.com/mike-north" target="gh-user">@mike-north</a>, <a href="https://github.com/tschoartschi" target="gh-user">@tschoartschi</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/mixonic" target="gh-user">@mixonic</a>, <a href="https://github.com/jeanduplessis" target="gh-user">@jeanduplessis</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/fpauser" target="gh-user">@fpauser</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/BradLeftley" target="gh-user">@BradLeftley</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/yusufsagdic" target="gh-user">@yusufsagdic</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a> and <a href="https://github.com/scalvert" target="gh-user">@scalvert</a> for their contributions to Ember and related repositories! 💖</p>

---

## [Readers' Questions: "What are the benefits of using Ember Data over Ajax?" 🤓](https://discuss.emberjs.com/t/readers-questions-what-are-the-benefits-of-using-ember-data-over-ajax/16254)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>In <strong>this week's Readers' Question</strong> we're talking about a popular question asked by many Ember developers who are starting out: What are the benefits of using <strong>Ember Data</strong> over Ajax?
  Ember Learning team member <a href="https://github.com/jessica-jordan" target="jj">@jessica-jordan</a> highlights in her answer some of the plethora of advantages that a data management library like Ember Data offers for <strong>building easy-to-maintain</strong> applications that also <strong>scale well</strong>.</p>

  <p>
    <a class="ember-button" href="https://discuss.emberjs.com/t/readers-questions-what-are-the-benefits-of-using-ember-data-over-ajax/16254">Read more</a>
  </p>
</div>

<div class="blog-row">
  <p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>
</div>

---

## [#embertimes](https://emberjs.com/blog/tags/newsletter.html) 📰

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#support-ember-times](https://discordapp.com/channels/480462759797063690/485450546887786506) on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

Keep on top of what's been going on in Emberland this week by subscribing to our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/)! You can also find our posts on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html).

---


That's another wrap! ✨

Be kind,

Jessica Jordan, Kenneth Larsen, Chris Ng, Jared Galanis, Amy Lam and the Learning Team
