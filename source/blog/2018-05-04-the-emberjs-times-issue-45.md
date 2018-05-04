---
title: The Ember.js Times - Issue No. 45
author: Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Jen Weber, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/05/04/the-emberjs-times-issue-44.html"
responsive: true
---

Hey there Emberistas!

Lots of Ember programmers and writers have been busy this week and therefore we have several new data-driven RFCs, community efforts, and an outstanding update to Ember inspector to present to you.

As well as a sincere reminder to eat your veggies! 🥒🥕

---

## [I hope my build never lets me down again in Ember 🐹](https://github.com/emberjs/rfcs/pull/328)

Have you ever made a change in the source code of your Ember app and subsequently awaited
the reload of your app's browser tab, to no avail?
Seconds, minutes, a coffee later -
you might have checked your terminal window - then at last, finding that syntax error in your template
that led to a failing build and prevented the reload.

Sounds familiar? This week's RFC proposes the automatic inclusion of **<i>ember-cli-build-notifications</i>**
into new Ember apps. It's an addon providing system notifications for failing Ember app builds by default.

The RFC proposal also discusses several alternative techniques to improve developer ergonomics regarding
app builds. If you're curious, check out the [full RFC here](https://github.com/emberjs/rfcs/pull/328)
and leave your thoughts on it!

---

## [Listen to your Broccoli and it will tell you how to eat it](http://www.oligriffiths.com/broccolijs/)

You might already know that Broccoli takes care of your asset pipeline. But do you know **how** it works? [Oli Griffiths](https://twitter.com/oligriffiths) has made an [amazing tutorial](http://www.oligriffiths.com/broccolijs/) on *the asset pipeline for ambitious applications*. It takes you through the basic setup and guides you through the journey of sass preprocessing, debugging and fingerprints.

---

## [EMBER INSPECTOR COOL TITLE](url?)

![Ember Inspector Dark Mode Screenshot](/images/blog/emberjstimes/ember-inspector-dark.png)

---

## [Spring cleaning for Ember Data powered by RFCs 📟🐹](https://github.com/emberjs/rfcs/pull/329)

A particular RFC (Request for Comments) has entered the final comment period with incredible speed.
It proposes the **deprecation** of <em>ember-data</em>'s `Array.filter` method and explains
how this change will not only improve the maintainability of the
<i>ember-data</i> project but also impact the **performance** of Ember apps positively.

You can [read the full RFC here](https://github.com/emberjs/rfcs/pull/326) and
leave your comments for it.

If you're making use of `this.get('store').filter` in your app or addon,
check out the documentation of the <i>ember-data-filter</i> addon and
follow the dedicated [guide on how to refactor this easily](https://github.com/ember-data/ember-data-filter#recommended-refactor-guide).

In other <i>ember-data</i> news, another proposal focuses on removing usage of the `Ember.Evented` mixin
in <i>ember-data</i> specifically.
This would also lead to the future removal of several lifecycle hooks and methods
on e.g. `Model`s and other Ember Data classes. You can learn more about
the design of this proposed deprecation in [the original RFC](https://github.com/emberjs/rfcs/pull/329).

Also, this week contributors to Ember Data focused on already getting the [cleanup
work](https://github.com/emberjs/data/pull/5459) underway to leave the
soon-to-be deprecated `store.filter` behind for good.
Finally, a [bug fix](https://github.com/emberjs/data/pull/5461) for breaking up async relationships has landed. ✨


---

## [JEN'S BLOG POST ON ](your-main-url-here)

...

---

## [Learning Team Corner](your-main-url-here)

---


## [Contributor's Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

<p>This week a warm thank you goes to <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/mikeu" target="gh-user">@mikeu</a>, <a href="https://github.com/shearichard" target="gh-user">@shearichard</a>, <a href="https://github.com/frank06" target="gh-user">@frank06</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/SeanHealy33" target="gh-user">@SeanHealy33</a>, <a href="https://github.com/fivetanley" target="gh-user">@fivetanley</a>, <a href="https://github.com/bmac" target="gh-user">@bmac</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/chriskrycho" target="gh-user">@chriskrycho</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/josemarluedke" target="gh-user">@josemarluedke</a>, <a href="https://github.com/lifeart" target="gh-user">@lifeart</a>, <a href="https://github.com/lupestro" target="gh-user">@lupestro</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/greenkeeper[bot]" target="gh-user">@greenkeeper[bot]</a>, <a href="https://github.com/dcombslinkedin" target="gh-user">@dcombslinkedin</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/dgeb" target="gh-user">@dgeb</a>, <a href="https://github.com/anehx" target="gh-user">@anehx</a> and <a href="https://github.com/dfreeman" target="gh-user">@dfreeman</a> for contributing to Ember core projects this week 💖
</p>

---

## [Got a question? We’re looking forward to it!](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Do you wonder about something that is related to Ember, Ember Data, Glimmer, or addons in the Ember
  ecosystem, but you don't know where to ask? Readers’ Questions are just for you!</p>
</div>


**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core) and a member of the Ember team will answer your question in a future edition of the Ember.js Times. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Jen Weber, Jessica Jordan and the Learning Team
