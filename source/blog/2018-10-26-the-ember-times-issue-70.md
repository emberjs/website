---
title: The Ember Times - Issue No. 70
author: Jessica Jordan,
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/10/26-the-ember-times-issue-70.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

More convenient **transitions** through your Ember apps with the **new Router Helpers & Element Modifiers RFC**, artisan ☕️ deprecations for **setting** your **component managers**,

---

## [SECTION TITLE](#section-url)


---

## [Route Me Through Space 🛰 and Time 🕰 with the Router Helpers RFC](https://github.com/emberjs/rfcs/pull/391)

Inspired by the [experimental addon ember-router-helpers](https://github.com/rwjblue/ember-router-helpers) a [**new RFC (Request for Comments)**](https://github.com/emberjs/rfcs/pull/391) illustrates a possible, new way to **route** through your Ember apps.

Several **new template helpers and element modifiers** for routing are proposed: This includes a `transition-to` element modifier for easy route-to-route transitions [surpassing some of the drawbacks](https://github.com/emberjs/rfcs/blob/new-router-helpers/text/0000-router-helpers.md#motivation) of the functionally similar `link-to` helper. But also the design of and the motivation behind new, useful helpers like `root-url`, `is-active` and `is-loading` among others are explained in great detail in the RFC itself.

Curious? Be sure to give the [proposal a read and let your thoughts known in the comments below!](https://github.com/emberjs/rfcs/pull/391)


---

## [Original & Artisan ☕️ Deprecations RFC for the setComponentManager API](https://github.com/emberjs/rfcs/pull/392)

The 🔥 brand-new **Custom Component Manager API** 🚒 [has been shipped with Ember 3.4](https://emberjs.com/blog/2018/10/07/ember-3-4-released.html#toc_changes-in-ember-js-3-4) and is now - as a low-level API granting addon authors more freedom to create **components from customized base classes**.

This week a [freshly brewed RFC](https://github.com/emberjs/rfcs/pull/392) with its first, important deprecation rolled in: The proposal suggests to replace the **string-based lookup** method for the `setComponentManager` function for a **factory-based** approach. This small change in the API provides quick wins 🏅 for future undertakings regarding tree shaking of Ember apps, module unification and more.

Read all about the motivation behind this deprecation in the [hand-crafted RFC on Github](https://github.com/emberjs/rfcs/pull/392).


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---


## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank our siblings for their contributions to Ember and related repositories! 💖</p>

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

Jessica Jordan, and the Learning Team
