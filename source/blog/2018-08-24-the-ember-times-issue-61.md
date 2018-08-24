---
title: The Ember Times - Issue No. 61
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/08/24/the-ember-times-issue-61.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE What about Ħelow?> Emberistas! 🐹

Read either on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) what has been going on in Emberland this week.

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---

## [Jazz Up Your Tags with Modifiers ✨](https://github.com/emberjs/rfcs/pull/353)

A new **Request for Comments (RFC)** might bring new life to your HTML tags:
The [proposal for Modifiers](https://github.com/emberjs/rfcs/blob/new-modifiers/text/0000-modifiers.md) presents a possible future API for components in Ember which allows to
add custom behaviour, like event listeners or styles, to DOM nodes in your components. **Reliable access to DOM nodes** will be guaranteed by the means of these **element modifiers**, alleviating issues with the `outerHTML` semantics [mentioned in the `this.bounds` RFC](https://github.com/emberjs/rfcs/pull/351#issuecomment-412123046) which proposed a new way of accessing the root element of future Ember components.

This **RFC is a successor** of the previous [RFC#112: Element Modifiers](https://github.com/emberjs/rfcs/pull/112) and aims to bring many of the previously mentioned ideas back into discussion.

Be sure to [read the original proposal over at Github](https://github.com/emberjs/rfcs/pull/353) and share your thoughts and questions in [the comments for the RFC's pull request](https://github.com/emberjs/rfcs/pull/353).

---

## [I'm willing to wait for it 🎶](https://github.com/emberjs/data/pull/5545)
A new PR has been merged to Ember Data that improves your use of `async ... await` while simultaneously detecting asynchronous test leaks in their data layer.

The feature works in non-production environments and they made sure that the test-waiter does not cause waiting by default in order to prevent breaking any apps that upgrade their version of Ember Data.

This new feature comes with two feature flags `store.shouldTrackAsyncRequests `  and `store.generateStackTracesForTrackedRequests`. To learn all about them and some more information on this new feature, be sure to check out [the pull request](https://github.com/emberjs/data/pull/5545).

---

## [Podcast: Melanie Sumner on empowering JavaScript engineers 💪](https://twitter.com/samselikoff/status/1032298098901639169)

This week [Sam Selikoff](https://github.com/samselikoff) interviewed Ember Core team member Melanie Sumner ([@MelSumner](https://github.com/MelSumner)) for [The EmberMap Podcast](https://embermap.com/). Melanie talked about her path from getting starting making Ember accessible to now being a leader in the Ember community as a core team member. Ember, for Melanie, was one of the first times in tech where she felt welcome. This is in huge part because of the welcoming Ember community

Melanie talked about empowering other people to feel included. This, to her, was the key to scaling yourself since you can only do so much as an individual. Inclusion to get other people involved will effectively create _“clones”_ of yourself. This is how she participates in a vision that is shared by helping create a community.

Melanie mentioned how she practices **Servant Leadership** which she described as “not asking anyone to do something that I wouldn’t do myself.” This goes with the ethos Ember represents which is to invest in the long term by working with others so that they may feel welcome and contribute back into the community.

Sam and Melanie then talked about the native accessibility story for Ember going through the [ARIA spec](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) and seeing if it makes sense to implement it in Ember. There are loads of opportunities here as even having a modal or select dropdown be both accessible and customizable would be a huge leap for web developers. Having that built into Ember by default will be a game changer.

Click the links below watch the full interview:
- 🎥 [EmberMap](https://embermap.com/topics/the-embermap-podcast/melanie-sumner-on-empowering-javascript-engineers)
- 🎙️ [iTunes](https://itunes.apple.com/us/podcast/the-embermap-podcast/id1288274408?mt=2)
- 📺 [YouTube](https://www.youtube.com/watch?v=KXFYNhNgn_Q)

---

## [Ember-Truth-Helpers was updated 🙌](https://github.com/jmurphyau/ember-truth-helpers)

`Ember-truth-helpers` is an Ember addon that provides helpers for truth logic in `if` and `unless` statements.
As of version `v2.1.0`, [@jamesarosen](https://github.com/jamesarosen) and [@jmurphyau](https://github.com/jmurphyau) added the `is-empty` helper to the library. 🎉
This will make our lives easier when checking for empty values in our templates.

You can take a closer look at the change [here](https://github.com/jmurphyau/ember-truth-helpers/commit/cd4147e4ed76dfc5cf585ea87c6e08fcf99b7e16). 👀

---

## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank our siblings for their contributions to Ember and related repositories 💖!</p>

---

## [Readers' Questions: "Why does Ember use Broccoli and how is it different from Webpack, Rollup, Parcel?"](#url-to-be-updated)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>The JavaScript ecosystem is full of <strong>bundlers</strong>, like Webpack, Rollup.js, Microbundle among others. But what differentiates one from the other? And what makes Broccoli so special to be part of Ember's build pipeline?</p>

<p>In this week's Readers' Question, Ember Learning Core team member <a href="https://github.com/jessica-jordan" target="jj">@jessica-jordan</a> will highlight the <strong>differences</strong> between some of the most <strong>popular JavaScript bundlers</strong> and explain why Ember CLI embraced <strong>Broccoli</strong> as its tool of choice early on. You can read her <a href="#url-to-be-updated" target="rq">full answer on the official Ember Forum</a>.</p>

<p><a class="ember-button" href="#url-to-be-updated" target="rq">Read more</a></p>
<br/>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/) on Slack or tweet us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

the crowd and the Learning Team
