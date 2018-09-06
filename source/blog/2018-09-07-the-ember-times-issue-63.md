---
title: The Ember Times - Issue No. 63
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/09/07-the-ember-times-issue-63.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

Read either on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) what has been going on in Emberland this week.

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---

## [SECTION TITLE](#section-url)


---

## [Meet Your Ember 🐹 Friends At Discord 🗨](https://discord.gg/zT3asNS)

The time has come: The **Ember Community is starting its big move over to [Discord](https://discord.gg/zT3asNS)**. As proposed in the [original and just recently accepted RFC (Request For Comments) for the migration](https://github.com/emberjs/rfcs/pull/345) you can now **chat** with your **Ember friends** 🐹👭👬👫 from all around the world on the Ember Discord server. This comes - among other benefits - with the advantage of **unlimited message history**.

[Check out the new community chat today](https://discord.gg/zT3asNS), be sure to **set up your profile** as described in the [#setup-profile channel]() and to join [#discord-server-admin]() to gain access to your favorite discussions 💬.

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

## New Computed Property RFCs Deprecating [volatile()](https://github.com/emberjs/rfcs/pull/370) and [readOnly()](https://github.com/emberjs/rfcs/pull/369) 2️⃣

[Chris Garrett](https://github.com/pzuraq) proposed two new RFCs on [computed properties](https://guides.emberjs.com/release/object-model/computed-properties/). Both RFCs are centered around deprecating functions to adjust the defaults to what the common use cases developers face and to better align with [native class syntax](https://github.com/emberjs/rfcs/pull/338).

The RFC to [deprecate computed overridability and readOnly()](https://github.com/emberjs/rfcs/pull/369) seeks to align computed properties to the native class syntax getters and setters by deprecating computed overridability (colloquially known as "clobbering") and make computeds read-only by default turning this uncommonly used feature to an opt-in using the overridable API.

Similarly, the RFC to [deprecate computed().volatile()](https://github.com/emberjs/rfcs/pull/370) was proposed to favour native accessors rather than relying on the volatile API to provide that functionality. This is to align what users expect versus what the framework does, which is almost exactly what the native accessors do except it swallows notification changes.

Join the conversation at the respective pull requests for [volatile()](https://github.com/emberjs/rfcs/pull/370) and [readOnly()](https://github.com/emberjs/rfcs/pull/369)!

---

## [A bigger Ember tent ⛺](https://discuss.emberjs.com/t/a-bigger-ember-tent/15383)

The expression 'Ember is a big tent' was recently used by [Tom Dale](https://github.com/tomdale) in response to an Ember developer when he asked if [Ember was still a welcoming community](https://discuss.emberjs.com/t/are-we-still-a-welcoming-community/15285).

With this topic in mind, Tom Dale shares the following thoughts:

- Everyone is encouraged to share their thoughts about the framework and the path it's taking, even if it is to disagree with the core team or with the community in general, the community will fail if people believe they have to stay silent.

- It is dangerous when developer communities create mantras that they repeat endlessly, as the original context around the why can get lost, and then people can tend to postulate the mantra without knowing its original purpose forgetting that underlying assumptions behind it can change.

- There is no 'right way' of building an Ember app, no one but the developer in question knows better what are the particular tools that are necessary to make the team more productive and a project a success.

- We, as Ember developers would be doing a disservice to ourselves if we don't follow along with other existing frameworks and the wider JavaScript ecosystem to borrow their ideas.

- We should put ourselves in other's shoes to understand the frustration other people experience and offer to help and provide constructive criticism, before getting defensive.

The big tent analogy used, meant that Ember is an open community that welcomes different individuals with different thoughts and opinions about the framework and the correct way of leveraging it for our own projects.

Although Ember comes with a set of defaults and guidelines, it is unrealistic to think that those same defaults fit every project in every situation.

Quoting Tom on his final reasoning: 'Let's make sure we're fostering a community that doesn't squish ideas.'

---


## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank our siblings for their contributions to Ember and related repositories 💖!</p>

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/) on Slack or tweet us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

the crowd and the Learning Team
