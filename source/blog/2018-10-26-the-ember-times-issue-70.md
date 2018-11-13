---
title: The Ember Times - Issue No. 70
author: Jen Weber, Chris Ng, Ryan Mark, Amy Lam, Jessica Jordan, Kenneth Larsen, Alon Bukai
tags: Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/10/26-the-ember-times-issue-70.html"
responsive: true
---

G'day, Emberistas! 🐹

This week we have an Ember standard for i18n 🌍, more convenient **transitions** through your Ember apps with the **new Router Helpers & Element Modifiers RFC**, artisan ☕️ deprecations for **setting** your **component managers**, a **new version of Ember**, an exciting new Readers' Question 🤔 on the future of controllers, using GraphQL in Ember 💥, and more!

---

## [ember-i18n Deprecation and Release of ember-intl 🌐](https://twitter.com/MiguelCamba/status/1054699605865177089)

[@snewcomer](https://github.com/snewcomer) and [@cibernox](https://github.com/cibernox) [announced](https://twitter.com/MiguelCamba/status/1054699605865177089) a new way to internationalize Ember apps, [ember-i18n](https://github.com/jamesarosen/ember-i18n) is now deprecated in favour of [ember-intl](https://github.com/ember-intl/ember-intl)! This will provide Ember with a standard package for internationalization.

There are [many reasons](https://twitter.com/MiguelCamba/status/1054720978478084097) to make the change such as:
- Using the [**ICU message format**](https://formatjs.io/guides/message-syntax/) which is a standard in the i18n industry
- **Locale-aware** numbers, dates, times, currencies, decimals, and percentages!
- Uses the [**Native Intl API**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- Translations are way more powerful and **can contain logic** (like gender-dependent translations)
<!--alex ignore host-hostess-->
- Advanced [**addon support**](https://github.com/ember-intl/ember-intl/blob/master/docs/addon-support.md) to provide translations to the host app

There is even a [codemod](https://github.com/DockYard/ember-i18n-to-intl-migrator) to make the switch from ember-i18n to ember-intl easier! So [check it out](https://github.com/ember-intl/ember-intl) and make the switch today!

---

## [Route Me Through Space 🛰 and Time 🕰 with the Router Helpers RFC](https://github.com/emberjs/rfcs/pull/391)

Inspired by the [experimental addon ember-router-helpers](https://github.com/rwjblue/ember-router-helpers) a [**new RFC (Request for Comments)**](https://github.com/emberjs/rfcs/pull/391) illustrates a possible, new way to **route** through your Ember apps.

Several **new template helpers and element modifiers** for routing are proposed: This includes a `transition-to` element modifier for easy route-to-route transitions [surpassing some of the drawbacks](https://github.com/emberjs/rfcs/blob/new-router-helpers/text/0000-router-helpers.md#motivation) of the functionally similar `link-to` helper. But also the design of and the motivation behind new, useful helpers like `root-url`, `is-active` and `is-loading` among others are explained in great detail in the RFC itself.

Curious? Be sure to give the [proposal a read and make your thoughts known in the comments below!](https://github.com/emberjs/rfcs/pull/391)


---

## [Original & Artisan ☕️ Deprecations RFC for the setComponentManager API](https://github.com/emberjs/rfcs/pull/392)

The 🔥 brand-new **Custom Component Manager API** 🚒 [has been shipped with Ember 3.4](https://emberjs.com/blog/2018/10/07/ember-3-4-released.html#toc_changes-in-ember-js-3-4) and is now available as a low-level API granting addon authors more freedom to create **components from customized base classes**.

This week a [freshly brewed RFC](https://github.com/emberjs/rfcs/pull/392) with its first, important deprecation rolled in: The proposal suggests to replace the **string-based lookup** method for the `setComponentManager` function for a **factory-based** approach. This small change in the API provides quick wins 🏅 for future undertakings regarding tree shaking of Ember apps, module unification and more.

Read all about the motivation behind this deprecation in the [hand-crafted RFC on Github](https://github.com/emberjs/rfcs/pull/392).


---

## [No Graph Theory Required: Ember and GraphQL in Practice ⚡️](https://medium.com/kloeckner-i/ember-and-graphql-8aa15f7a2554)

Following his [EmberFest](https://emberfest.eu/schedule/#rocky-neurock) talk with [@chadian](https://github.com/chadian), [@jneurock](https://github.com/jneurock) blogged about their experience with GraphQL in Ember. If you are struggling with JSON API, or thinking about GraphQL, this article should give you an understanding of how to get started. They even created an [example repo](https://github.com/chadian/ember-graphql-examples) that includes an Ember app demonstrating GraphQL integration with four different clients. Check out the [article](https://medium.com/kloeckner-i/ember-and-graphql-8aa15f7a2554) and the [GraphQL website](https://graphql.org/learn/) to learn more!

---

## [Ember 3.5 is Out! 🚀](https://emberjs.com/blog/2018/10/15/ember-3-5-released.html)

Version 3.5 of Ember and it contains some pretty cool things. With this release, Ember Data has now released **their first LTS release ever** with Ember Data 3.4 and will now follow the same LTS cycle as Ember.

Ember Data 3.4 also released the new `RecordData` interfaces that give addon developers the much-needed API access with **more confidence and stability**.

With Ember CLI 3.5 you get Broccoli v2.0.0 that no longer uses your local `./tmp` in your project folder but the system `temp` directory instead. This can result in **build time improvements up to 32%**! 🏎

You can read all about all these new cool things and much more in the [release post](https://emberjs.com/blog/2018/10/15/ember-3-5-released.html).

---


## [Readers' Question: What is the Future 🚀 of Controllers?](https://discuss.emberjs.com/t/readers-questions-what-is-the-future-of-controllers-when-is-it-a-good-time-to-use-them-in-a-modern-ember-app/15708)

Ah, the age old question: "What is the future of controllers? When is it a good time to use them in a modern Ember app?" [@jenweber](https://github.com/jenweber) tackles this topic with some help from Framework Core Team member [@ef4](https://github.com/ef4). TLDR: do use them, don't lose any sleep over them, and help us decide their future. See this [Ember Discuss post](https://discuss.emberjs.com/t/readers-questions-what-is-the-future-of-controllers-when-is-it-a-good-time-to-use-them-in-a-modern-ember-app/15708) for the article and conversation!  

---


## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

This week we'd like to thank [@rwjblue](https://github.com/rwjblue), [@chadhietala](https://github.com/chadhietala), [@btecu](https://github.com/btecu), [@amyrlam](https://github.com/amyrlam), [@chrisrng](https://github.com/chrisrng), [@jessica-jordan](https://github.com/jessica-jordan), [@ynotdraw](https://github.com/ynotdraw), [@Alonski](https://github.com/Alonski), [@sivakumar-kailasam](https://github.com/sivakumar-kailasam), [@thorsteinsson](https://github.com/thorsteinsson), [@YoranBrondsema](https://github.com/YoranBrondsema), [@runspired](https://github.com/runspired), [@ctcpip](https://github.com/ctcpip), [@wagenet](https://github.com/wagenet), [@rondale-sc](https://github.com/rondale-sc), [@toddjordan](https://github.com/toddjordan), [@esbanarango](https://github.com/esbanarango), [@mansona](https://github.com/mansona), [@HenryVonfire](https://github.com/HenryVonfire), and [@cspanring](https://github.com/cspanring) for their contributions to Ember and related repositories! 💖

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

Jen Weber, Chris Ng, Ryan Mark, Amy Lam, Jessica Jordan, Kenneth Larsen, Alon Bukai and the Learning Team
