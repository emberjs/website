---
title: The Ember Times - Issue No. 86
author: Chris Ng, Gaurav Munjal, Amy Lam, Jessica Jordan, the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2019
alias : "blog/2019/02/22-the-ember-times-issue-86.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

Check out the two follow up RFCs to make Tracked Properties better  👣, an Ember community experience 🤝...

...and an exclusive interview with Ember contributor @cibernox 💬 !

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## RFCs for [Decorator Support](https://github.com/emberjs/rfcs/pull/440) and [Tracked Property Classic Class Descriptor](https://github.com/emberjs/rfcs/pull/442) 👣

[@pzuraq](https://github.com/pzuraq) opened up a pair of RFCs that supplemented the recently merged [Tracked Properties RFC](https://github.com/emberjs/rfcs/pull/410).

The **Decorator Support RFC** is a follow up to the [Decorators RFC](https://github.com/emberjs/rfcs/blob/master/text/0408-decorators.md) since it was premised on decorators moving from stage 2 in the TC39 process to stage 3. However since decorators remained in stage 2, and have not been rejected, and that all parties were in agreement about the *invocation syntax* of decorators – decorators should present a minimal amount of risk to Ember and its users. The changes in the spec will mostly affect library and framework maintainers, but not end users in *most cases*. Ember will begin by supporting the latest version of the decorators transform provided by Babel.

The **Tracked Property Classic Class Descriptor RFC** adds the `descriptor` decorator for classic classes only which allows users to define native getters and setters (and other properties). This provides a clear 1-1 translation between native and classic syntax invocations as a way to add getters and setters to classic classes.

Read and comment on the [Decorator Support RFC](https://github.com/emberjs/rfcs/pull/440) or the [Tracked Property Classic Class Descriptor RFC](https://github.com/emberjs/rfcs/pull/442) on GitHub!

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [An Ember Community Experience by Gaurav Munjal 💛](https://twitter.com/gaurav9576/status/1098298137507217408)

I had wanted to make some large breaking changes to [ember-simple-tree](https://github.com/btecu/ember-simple-tree),
in order to enable me to customize it to my liking. Given that it would break backward compatibility and existing applications, I figured my changes would never be accepted. So I forked it and released my version as ember-light-tree.

I was surprised when Bujorel Tecu AKA [@btecu](https://github.com/btecu), the author of ember-simple-tree,
contacted me and wanted to work together to include my changes. As a result, my changes are now in the latest version of
ember-simple-tree.

Even though we had to sacrifice technical backward compatibility, it was important to @btecu that we had a shared solution. One of the main strengths of Ember is how shared conventions enable developers to build on top of each other's work and improve the ecosystem for everyone. It's heartening to see this view echoed in the Ember addon community.

---

## ["I contribute to Ember" with Miguel Camba ✍️](https://discuss.emberjs.com/t/i-contribute-to-ember-with-miguel-camba/16193)

<div class="float-right padded portrait-frame">
  <img alt="Miguel Camba" title="Miguel Camba - Contributor to Ember" src="/images/blog/emberjstimes/miguelcamba.jpeg" />
</div>

In our 7th edition of the contributor interview series, community member **Miguel Camba**, also known as [@cibernox](https://github.com/cibernox) talks about his work on **powerful** addons, contributing by necessity and why the **silly pull request** is only **a myth**.

You can read the full interview on [the Ember Forum](https://discuss.emberjs.com/t/i-contribute-to-ember-with-miguel-camba/16193).

<a class="ember-button ember-button--centered" href="https://discuss.emberjs.com/t/i-contribute-to-ember-with-miguel-camba/16193">Read more</a>

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

Chris Ng, Gaurav Munjal, Amy Lam, Jessica Jordan, the crowd and the Learning Team
