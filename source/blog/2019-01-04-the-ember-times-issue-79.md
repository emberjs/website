---
title: The Ember Times - Issue No. 79
author: Jessica Jordan, Kenneth Larsen, the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2019/01/04-the-ember-times-issue-79.html"
responsive: true
---

Blein Vie Noa, Emberistas! 🐹🎆🎇

The new year starts off with loads of **new RFCs**! Read more about **extending** the **Ember Inspector** 👓🐹, and suggested **deprecations** of **Route render** methods and selected **ApplicationController properties** �! We also have a new RFC for a brand new look of emberjs.com...

---

## [SECTION TITLE](#section-url)


---

## [Website Redesign 🎨](https://github.com/emberjs/rfcs/pull/425)
The official Ember website is due for a new look and feel. That is why a [new RFC](https://github.com/wifelette/rfcs/blob/master/text/0425-website-redesign.md) proposes a **completely new look** 💅 for emberjs.com. A side effect of not having updated the look and feel of the website for some years is that for people who aren’t involved in the day-to-day of Ember development, it’s **easy to miss just how well the framework has kept up over the years**. 

The redesign aims to **modernize, update and improve all things website** so that the impression given to the general public matches reality.

There’s already a good discussion going on in the [RFC comment section](https://github.com/emberjs/rfcs/pull/425), and we would love to hear your thoughts as well.

---

## [Ember Inspector (Extended)](https://github.com/emberjs/rfcs/pull/417)

The [**Ember Inspector**](https://guides.emberjs.com/release/ember-inspector/) is _the_ dev tool for Ember developers debugging their apps. But how much cooler would it be, if Ember addons would have a way to extend the Inspector's feature set with their own tooling?
A new [RFC (Request for Comments) suggests to make the Ember Inspector extensible](https://github.com/thorsteinsson/rfcs/blob/extensible-inspector/text/0000-extensible-inspector.md) in such a way and could use community feedback!

Leave your thoughts and suggestions about an extensible Ember Inspector [below the original proposal](https://github.com/emberjs/rfcs/pull/417)!


---

## [Deprecating Route Induced Rendering 🎨](https://github.com/emberjs/rfcs/pull/418)

Do you remember `Route.render()` and `Route.renderTemplate()`? You might not. In fact, these route methods have been less and less emphasised in the Ember learning story and are not even mentioned in the [Ember Guides](https://guides.emberjs.com/release/) anymore. Although these APIs were useful in the past, nowadays a component-focussed approach allows Ember developers to omit them entirely.

Therefore, a **new RFC** suggests the **deprecation** of `Route#render` and `Route#renderTemplate`. You can read more about the motivation behind it and how to replace these methods in your application in [the original proposal](https://github.com/emberjs/rfcs/blob/ddbf21eaefae946a7e97573fec10334fb104e259/text/0418-deprecate-route-render-methods.md).

Questions? Suggestions? Leave them right in the [comments section of the RFC](https://github.com/emberjs/rfcs/pull/418)!

---

## [Deprecating Router Props on Application Controllers 🎛](https://github.com/emberjs/rfcs/pull/421)

With the introduction of [the Router Service](https://www.emberjs.com/api/ember/release/classes/RouterService) it's been easier than ever to check on current app state, e.g. the name of the active route, anywhere in your application. This also means that the current `ApplicationController#currentPath` and `ApplicationController#currentRouteName` API has become obsolete.

A **new RFC** proposes the [deprecation of these abundant properties](https://github.com/emberjs/rfcs/blob/a7ea6898280cd065cb5183d3245cceba3fd2e91b/text/0421-deprecate-application-controller-props.md) in the future. Be sure to [let your thoughts known in the proposal's comments section](https://github.com/emberjs/rfcs/pull/421)!


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

Jessica Jordan, Kenneth Larsen the crowd and the Learning Team
