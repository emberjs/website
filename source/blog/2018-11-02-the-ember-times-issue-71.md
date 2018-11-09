---
title: The Ember Times - Issue No. 71
author: Chris Ng, Jessica Jordan, Ryan Mark, Kenneth Larsen, Alon Bukai, Amy Lam
tags: Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/11/02-the-ember-times-issue-71.html"
responsive: true
---

Bonjour Emberistas! 🐹

This week your **help is needed** to bring **tree-shaking** 🌳 to Ember apps! RFCs on **route actions** and **dynamic tags** are ready for **your comments** 📢. We're also highlighting **Ember for CodeSandbox** ✨, and the awesome **#30DaysOfEmber** 📆 series. Read on!

---

## [Make Tree-Shaking 🌲 Ready for Landing ✈️ - Your Help is Wanted!](https://twitter.com/kellyselden/status/1050717338595745792)

A promising approach to reduce the size of Ember apps dramatically is known as **tree-shaking**. This describes a way to **exclude any code** from your **bundle** which is ultimately not needed for your application to work as expected.

The [Packager RFC (Request for Comments) for bringing tree-shaking](https://github.com/ember-cli/rfcs/blob/master/active/0051-packaging.md#tree-shaking) to Ember apps [was accepted in April this year](https://github.com/ember-cli/rfcs/commit/567201627bcc6baa2d70103bd5b6f9e23e8ea0d9). Since then, lots of progress has already been made on the Ember & Ember CLI side of things. There is even [the experimental addon ember-cli-tree-shaker](https://github.com/kellyselden/ember-cli-tree-shaker) that has been a tangible product of recent efforts to allow you to try out tree shaking today. But there's still a lot more to do. **Your help is needed**!

If you're feeling up to the task to help tree-shaking land in Ember and you're curious to learn more about Ember CLI internals, be sure to **reach out** to [**@kellyselden** on either Twitter](https://twitter.com/kellyselden/status/1050717338595745792) or the [#topic-tree-shaking Discord channel](https://discordapp.com/channels/480462759797063690/502098552751915008) to get started!

---

## [Action! 🎬 Ember Route Actions for All](https://github.com/emberjs/rfcs/pull/394)

Actions in Ember are usually defined in a **controller**. However the addon [ember-route-action-helper](https://github.com/DockYard/ember-route-action-helper) has existed for some time and allows you to easily use actions, defined in the route, inside your templates. Some say that this allows less **dependance** on controllers. A new [RFC (Request for Comments) for Route Actions](https://github.com/emberjs/rfcs/pull/394) has been suggested by [@vasilakisfil](https://github.com/vasilakisfil) that proposes integrating this helper into **Ember core** for use in all apps without the need for the addon. 

It is important to state that the addon has a **warning** about using it and that controllers are still an **integral** part of Ember as explained last week in our [Readers' Question: What is the Future of Controllers](https://discuss.emberjs.com/t/readers-questions-what-is-the-future-of-controllers-when-is-it-a-good-time-to-use-them-in-a-modern-ember-app/15708).

If you would like to **chime in** and join the discussion be sure to check out this [RFC here](https://github.com/emberjs/rfcs/pull/394).

---

## [A New and Dynamic RFC](https://github.com/cibernox/rfcs/blob/dynamic-tag-names/text/0000-dynamic-tag-names.md)
[@cibernox](https://github.com/cibernox) has submitted a new RFC suggesting **dynamic tag names in glimmer templates**. In the transition from using inner-html semantics to using outer-html semantics in components there's one feature that has been lost: Being able to dynamically define the tag name of components.

To solve this issue the RFC proposes a new `element` helper that takes a tag name and generates a contextual component that, when invoked, renders the selected element. Like this:

```handlebars
{{#let (element "li") as |Tag|}}
  <Tag ...>...</Tag>
{{/let}}
```

You can try out [a working proof of concept on Github](https://github.com/tildeio/ember-element-helper) and you can read all the details about the [RFC in the proposal](https://github.com/cibernox/rfcs/blob/dynamic-tag-names/text/0000-dynamic-tag-names.md).

---

## [Ember for CodeSandbox! 🏖️](https://twitter.com/CompuIves/status/1057681015299366912)

[CodeSandbox](https://codesandbox.io/) is an online code editor that helps you create web applications, **from prototype to deployment**. It supports a variety of web frameworks, and with the latest release, now officially supports Ember. This was made possible thanks to a [pull request](https://github.com/CompuIves/codesandbox-client/pull/1113) by [@mike-north](https://github.com/mike-north).

Try it out today by clicking on **Ember** under _server templates_ when [creating a new sandbox](https://codesandbox.io/s/)!

<!--alex ignore execute-->
_Note: Ember is located under “server templates” because [server templates are sandboxes that execute on a server instead of the browser](https://twitter.com/CompuIves/status/1057689363239313408)._

---

## [The #30DaysOfEmber Series 📚](https://twitter.com/PoslinskiNet/status/1054446639719608320)

[@PoslinskiNet](https://github.com/PoslinskiNet) published a great learning series for those starting out with Ember. The #30DaysOfEmber series goes through **30 topics** ranging from [Computed Properties](https://slides.com/poslinski_net/30-days-of-ember#/6) to [Internationalization](https://slides.com/poslinski_net/30-days-of-ember#/36) with the aim of becoming familiar with Ember at the end of it.

If you haven’t yet, check out the [slides for #30DaysOfEmber](https://slides.com/poslinski_net/30-days-of-ember#/) or on [Twitter Moments](https://twitter.com/i/moments/1054409226968281089) today!

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/esquith" target="gh-user">@esquith</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/chengz" target="gh-user">@chengz</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/fiddler" target="gh-user">@fiddler</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/yaxinr" target="gh-user">@yaxinr</a>, <a href="https://github.com/spruce" target="gh-user">@spruce</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/sbatson5" target="gh-user">@sbatson5</a>, <a href="https://github.com/mike-north" target="gh-user">@mike-north</a>, <a href="https://github.com/scalvert" target="gh-user">@scalvert</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/tomdale" target="gh-user">@tomdale</a>, <a href="https://github.com/SergeAstapov" target="gh-user">@SergeAstapov</a>, <a href="https://github.com/abhilashlr" target="gh-user">@abhilashlr</a>, <a href="https://github.com/loganrosen" target="gh-user">@loganrosen</a>, <a href="https://github.com/sangm" target="gh-user">@sangm</a>, <a href="https://github.com/tschoartschi" target="gh-user">@tschoartschi</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/esbanarango" target="gh-user">@esbanarango</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/aklkv" target="gh-user">@aklkv</a>, <a href="https://github.com/caseywatts" target="gh-user">@caseywatts</a>, <a href="https://github.com/skyboyer" target="gh-user">@skyboyer</a>, <a href="https://github.com/jelhan" target="gh-user">@jelhan</a>, <a href="https://github.com/Parrryy" target="gh-user">@Parrryy</a>, <a href="https://github.com/theroncross" target="gh-user">@theroncross</a> for their contributions to Ember and related repositories! 💖</p>

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

Chris Ng, Jessica Jordan, Ryan Mark, Kenneth Larsen, Alon Bukai, Amy Lam and the Learning Team
