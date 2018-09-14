---
title: The Ember Times - Issue No. 64
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/09/14-the-ember-times-issue-64.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---

## [Everyone's Moved! 📦 Meet Your Ember 🐹 Friends on Discord 🗣](https://discord.gg/zT3asNS)

It's done! 👌 The **community chat has** finally **moved** over to [Discord](https://discordapp.com/)!
Even more **modern** than _IRC_ and _ICQ_ combined, you can now chat with other Emberistas from all around the globe in many different topic channels with **unlimited message history** 💌✨.

[Join today](https://discord.gg/zT3asNS) and be sure to get setup as described in the `#setup-profile` channel. To start chatting, request the _community-member_ role in `#discord-server-admin`, so the undaunted org admins can make sure THAT YOU ARE NOT A BOT BUT A REAL HUMAN JUST LIKE US HA-HA 🤖.

---

## [A Public Factory 🏭 for Your Models ](https://github.com/emberjs/rfcs/pull/372)

A brand-new 🔥 **Request For Comments (RFC)** makes addon authors' and Ember power users' 💪 hearts ♡ leap for joy:
The previously [deprecated Ember Data `store` method `modelFactoryFor`](https://github.com/emberjs/data/blob/v3.3.1/addon/-private/system/store.js#L2083) is making its comeback as an official, **public API**.
This new public method will allow users to provide any kind of `ModelClass` (and not only the default `DS.Model` provided by Ember Data) to applications if needed.

Curious? [**Read the full proposal**](https://github.com/emberjs/rfcs/pull/372) and leave your questions and suggestions in the comments below!

---

## [Element Modifier RFCs ⚛️](https://github.com/emberjs/rfcs/pull/373)

Ember Core Team member [@chadhietala](https://github.com/chadhietala) proposed 2 RFCs around Element Modifiers – one for the [Modifier Manager](https://github.com/emberjs/rfcs/pull/373) and the other for the [Element Modifier](https://github.com/emberjs/rfcs/pull/353) itself.

Element Modifiers provide stable access of the DOM node they are installed on. Unlike a component, there is no template/layout for an element modifier. Unlike a helper, an element modifier does not return a value. An element modifier is invoked in "element space". This is the space between `<` and `>` opening an HTML tag.

Here is an example of the element modifier syntax in action:
```
<button {{effect 'fade-in'}}>Save</button>
```

The [Modifier Manager RFC](https://github.com/emberjs/rfcs/pull/373) proposes to add a low level primitive for defining an element modifier which is responsible for coordinating the lifecycle events that occurs when invoking, installing and updating an element modifier. Most app developers would not need interact with the manager but it would allow the community to experiment with and iterate on this API outside of the core framework.

See more in the respective RFCs for [Element Modifier](https://github.com/emberjs/rfcs/pull/353) and [Modifier Manager](https://github.com/emberjs/rfcs/pull/373).

---

## [Even More Help Wanted 🚧 on Ember Data](https://twitter.com/Runspired/status/1038659570401337345)

We talked about contributing to Ember Data last week. This week there are even more ways to get involved! Help [@runspired](https://github.com/runspired) ship [ember-data/json-api-validator](https://github.com/ember-data/json-api-validator). He writes that this addon will enable you to write clearer normalization tests, catch those pesky and usually silent formatting issues, and leave you with actionable errors instead of head-scratching ones! Run the test suite or check out some of the repo issues [here](https://github.com/ember-data/json-api-validator/issues/).

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---


## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/mike-north" target="gh-user">@mike-north</a>, <a href="https://github.com/IzzatN" target="gh-user">@IzzatN</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/dcyriller" target="gh-user">@dcyriller</a>, <a href="https://github.com/nathanhammond" target="gh-user">@nathanhammond</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/nlfurniss" target="gh-user">@nlfurniss</a>, <a href="https://github.com/thorsteinsson" target="gh-user">@thorsteinsson</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/dnalagatla" target="gh-user">@dnalagatla</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>, <a href="https://github.com/22a" target="gh-user">@22a</a>, <a href="https://github.com/Kerrick" target="gh-user">@Kerrick</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/thereR4lights" target="gh-user">@thereR4lights</a> and <a href="https://github.com/dependabot[bot]" target="gh-user">@dependabot[bot]</a>
for their contributions to Ember and related repositories 💖!</p>

---

## [Got a Question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at #support-ember-times on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

the crowd and the Learning Team
