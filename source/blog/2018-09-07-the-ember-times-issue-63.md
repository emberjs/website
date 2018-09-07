---
title: The Ember Times - Issue No. 63
author: Jessica Jordan, Miguel Braga Gomes, Chris Ng, Kenneth Larsen, Amy Lam, Ryan Mark
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/09/07-the-ember-times-issue-63.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---

## [Meet your Ember 🐹 friends at Discord 🗨](https://discord.gg/zT3asNS)

The time has come: The **Ember Community is starting its big move over to [Discord](https://discord.gg/zT3asNS)**. As proposed in the [original and just recently accepted RFC (Request For Comments) for the migration](https://github.com/emberjs/rfcs/pull/345) you can now **chat** with your **Ember friends** 🐹👭👬👫 from all around the world on the Ember Discord server. This comes - among other benefits - with the advantage of **unlimited message history**.

[Check out the new community chat today](https://discord.gg/zT3asNS), be sure to **set up your profile** as described in the `#setup-profile` channel and to join `#discord-server-admin` to gain access to your favorite discussions 💬.

---

## [Ember Data: RecordData Meta Quest](https://github.com/emberjs/data/issues/5618)

The Ember Data team is looking for community help to bring RecordData to a stable release! You can read more about RecordData in [RFC #293](https://github.com/emberjs/rfcs/pull/293). RecordData codifies the internals of Ember Data, giving addon developers needed API access with more confidence and stability.

Community action items:

* Once [3.5.0-beta.2](https://github.com/emberjs/data/pull/5616) is released, configure your apps/addons to test against this version!
* Report errors encountered, and help triage/replicate as much as possible.
* Help refactor existing addons to utilize RecordData instead of likely-removed intimate APIs. For a good starter list, see Ember Data's [external-partner tests](https://github.com/emberjs/data/blob/master/.travis.yml#L87-L103).

---

## [RFC: Ember Editions](https://github.com/emberjs/rfcs/blob/9c7fe3f4e947b5f79050214334a98673494c25d7/text/0000-editions.md)
[@davewasmer](https://github.com/davewasmer) has written a RFC introducing the concepts of **editions**. The idea is that every few years Ember will declare a new edition of Ember that bundles up accumulated incremental improvements into a cohesive package.

The benefit of this being that this gives the Ember Community an opportunity to bring our documentation and marketing up-to-date to reflect the improvements we’ve made since the previous edition. According to the RFC, the right time to declare a new edition is when:

* A significant, coherent set of new features and APIs have all landed in the stable channel.
* Error messages and the developer ergonomics of those new features have been fully polished.
* Tooling (the Ember Inspector, blueprints, codemods, etc.) has been updated to work with these new features.
* API documentation, guides, tutorials, and example code has been updated to incorporate the new features.

Make sure to [read the entire RFC](https://github.com/emberjs/rfcs/blob/9c7fe3f4e947b5f79050214334a98673494c25d7/text/0000-editions.md) and [leave a comment with your thoughts](https://github.com/emberjs/rfcs/pull/371).

---

## New computed property RFCs deprecating [volatile()](https://github.com/emberjs/rfcs/pull/370) and [readOnly()](https://github.com/emberjs/rfcs/pull/369) 2️⃣

[@pzuraq](https://github.com/pzuraq) proposed two new RFCs on [computed properties](https://guides.emberjs.com/release/object-model/computed-properties/). Both RFCs are centered around deprecating functions to adjust the defaults to what the common use cases developers face and to better align with [native class syntax](https://github.com/emberjs/rfcs/pull/338).

The RFC to [deprecate computed overridability and readOnly()](https://github.com/emberjs/rfcs/pull/369) seeks to align computed properties to the native class syntax getters and setters by deprecating computed overridability (colloquially known as "clobbering") and make computeds read-only by default turning this uncommonly used feature to an opt-in using the overridable API.

Similarly, the RFC to [deprecate computed().volatile()](https://github.com/emberjs/rfcs/pull/370) was proposed to favour native accessors rather than relying on the volatile API to provide that functionality. This is to align what users expect a property does when it's value changes versus what the framework does, including notification changes.

Join the conversation at the respective pull requests for [volatile()](https://github.com/emberjs/rfcs/pull/370) and [readOnly()](https://github.com/emberjs/rfcs/pull/369)!

---

<!--alex ignore bigger-->
## [A bigger Ember tent ⛺](https://discuss.emberjs.com/t/a-bigger-ember-tent/15383)

The expression "Ember is a big tent" was recently used by [@tomdale](https://github.com/tomdale) in response to an Ember developer when he asked if [Ember was still a welcoming community](https://discuss.emberjs.com/t/are-we-still-a-welcoming-community/15285).

With this topic in mind, Tom Dale shares the following thoughts:

- Everyone is encouraged to share their thoughts about the framework and the path it's taking, even if it is to disagree with the core team or with the community in general, the community will fail if people believe they have to stay silent.

- It is dangerous when developer communities create mantras that they repeat endlessly, as the original context around the why can get lost, and then people can tend to postulate the mantra without knowing its original purpose forgetting that underlying assumptions behind it can change.

- There is no "right way" of building an Ember app, no one but the developer in question knows better what are the particular tools that are necessary to make the team more productive and a project a success.

- We, as Ember developers would be doing a disservice to ourselves if we don't follow along with other existing frameworks and the wider JavaScript ecosystem to borrow their ideas.

- We should put ourselves in other's shoes to understand the frustration other people experience and offer to help and provide constructive criticism, before getting defensive.

The big tent analogy used, meant that Ember is an open community that welcomes different individuals with different thoughts and opinions about the framework and the correct way of leveraging it for our own projects.

Although Ember comes with a set of defaults and guidelines, it is unrealistic to think that those same defaults fit every project in every situation.

Quoting Tom on his final reasoning: "Let's make sure we're fostering a community that doesn't squish ideas."

---

## [A special thank you to a long-time contributor 🙇](https://github.com/emberjs/website/pull/3541)

<!--alex ignore alumna-alumnus-->
This week we'd like to take a moment to say a huge thank you to an incredibly dedicated contributor:
[**Martin Muñoz (@mmun)**](https://github.com/mmun) who has not only been an active contributor to Ember for years, but also an Ember Core Team member [has joined the Ember _Alumna_ this week](https://github.com/emberjs/website/pull/3541).

Since [his first pull request to the ember.js repository](https://github.com/emberjs/ember.js/pull/9831) - submitting a bug fix for failing tests for the former `ember-views` package - Martin has been an actively contributing to Ember and related projects. In [June 2015 Martin joined the Ember Core Team](https://github.com/emberjs/website/commit/7e982770cafb7e42fce672e46f42887c093426e5#diff-0afb5ba76daf47aa6b21310bc1701cab) and dedicated his time to help Ember become the framework and the community we ❤️ today. We're grateful for all the hard work he had put into the project, but also for all the understanding, support and compassion he has shown to anyone in the community each day. With this we'd like to say once more: thank you, Martin!

---

## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/btecu" target="gh-user">@btecu</a>, <a href="https://github.com/cibernox" target="gh-user">@cibernox</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/Dhaulagiri" target="gh-user">@Dhaulagiri</a>, <a href="https://github.com/pieter-v" target="gh-user">@pieter-v</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/andrewpye" target="gh-user">@andrewpye</a>, <a href="https://github.com/blimmer" target="gh-user">@blimmer</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/kturney" target="gh-user">@kturney</a>, <a href="https://github.com/jrjohnson" target="gh-user">@jrjohnson</a>, <a href="https://github.com/happycollision" target="gh-user">@happycollision</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/nlfurniss" target="gh-user">@nlfurniss</a>, <a href="https://github.com/vitch" target="gh-user">@vitch</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/CodingItWrong" target="gh-user">@CodingItWrong</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/astronomersiva" target="gh-user">@astronomersiva</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/22a" target="gh-user">@22a</a>, <a href="https://github.com/dependabot[bot]" target="gh-user">@dependabot[bot]</a>, <a href="https://github.com/veelenga" target="gh-user">@veelenga</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a> and <a href="https://github.com/anotheredward" target="gh-user">@anotheredward</a> for their contributions to Ember and related repositories 💖!</p>

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

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

Jessica Jordan, Miguel Braga Gomes, Chris Ng, Kenneth Larsen, Amy Lam, Ryan Mark, and the Learning Team
