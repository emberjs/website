---
title: The Ember Times - Issue No. 73
author: Melanie Sumner, Chris Ng, Jessica Jordan, Kenneth Larsen, Niels Rasmussen, Ryan Mark, Alon Bukai, Amy Lam
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/11/16-the-ember-times-issue-73.html"
responsive: true
---

Suilad Emberistas! 🐹

Last call for your **talk submissions** to **EmberConf 2019**! 📣 In this week's issue: eslint-plugin-ember v6.0.0 is out 🚓, watch all the talks from EmberFest 🎥, try out hot reloading in Ember ️🔥, and a sneak peak at **DecEmber** 😄...

---

## [Your Last Chance to Become a Speaker at EmberConf 2019 🎤](https://emberconf.com/become-a-speaker.html)

Never tried public speaking before, but you're curious to share your thoughts on something interesting you learned recently? Are you already an experienced meetup speaker and looking for the next stage? Have you spoken at conferences before and want to try something new?

No matter what your experience level is, we're looking for you to [**become a speaker at EmberConf 2019**](https://emberconf.com/become-a-speaker.html). The CFP (Call for Proposals) will be open for only another 2 days, so be sure to get your talk proposal in this very weekend **before Sunday, Nov 18, 2018 at 11:59pm MST**.

Out of ideas? Be sure to [check out the Brainstorm CFP](https://emberconf.com/cfp-brainstorm.html) to inspire yourself!
Not feeling ready yet? Be assured, that **you are ready** to tell us your story - we're convinced that you'll succeed! ✨

<div class="blog-row">
  <a class="ember-button" href="https://emberconf.com/become-a-speaker.html">Ok, let me check out the CFP</a>
</div>

---

## [eslint-plugin-ember v6.0.0 is Out! 🚓](https://twitter.com/TobiasBieniek/status/1062700572757946368)

[@Turbo87](https://github.com/Turbo87) announced the release of [v6.0.0](https://github.com/ember-cli/eslint-plugin-ember/releases/tag/v6.0.0) of [eslint-plugin-ember](https://github.com/ember-cli/eslint-plugin-ember), which is an [ESLint](https://eslint.org/) plugin that provides a set of rules for Ember applications based on commonly known good practices.

This new release includes several **breaking changes** to the `ember/recommended` configuration such as [no-restricted-resolver-tests](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-restricted-resolver-tests.md) and [no-ember-testing-in-module](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-ember-testing-in-module-scope.md). Check the [release notes](https://github.com/ember-cli/eslint-plugin-ember/releases/tag/v6.0.0) for the full list of breaking changes and enhancements.

Note: If you still use [ESLint 3](https://github.com/ember-cli/eslint-plugin-ember/pull/267) or [Node.js 4](https://github.com/ember-cli/eslint-plugin-ember/pull/255) **this release will not work** for you as this major version change drops support for both of them.

---

## [Videos from EmberFest Are Out! 🎉](https://www.youtube.com/playlist?list=PLN4SpDLOSVkSB9034lDNdP1JoNBGssax9)

The videos from EmberFest are **now available** on [YouTube](https://www.youtube.com/playlist?list=PLN4SpDLOSVkSB9034lDNdP1JoNBGssax9). This means that you can experience all of the great talks even though you weren’t there! (And you know, if you were there you can now re-live it all.)

If you don’t know where to start, then we highly recommend the [opening keynote by Tom Dale](https://www.youtube.com/watch?v=oRzmDobMZ_Q&t=0s&list=PLN4SpDLOSVkSB9034lDNdP1JoNBGssax9&index=2) and the [closing keynote by Melanie Sumner](https://www.youtube.com/watch?v=xP-kog04lng&list=PLN4SpDLOSVkSB9034lDNdP1JoNBGssax9&index=21).

Tom Dale spoke about what will happen next year when you generate a new Ember app. This involves super exciting things like the **module unification app structure**,  **angle bracket invocation**, **JavaScript classes**, **tracked properties** and much more. All of this is of course delivered with the usual Tom Dale dapperness and humor. Definitely worth a watch.

Melanie Sumner delivered a thoughtful talk about how other peoples' views on something you enjoy - especially when you’re a smaller community - can create uncertainty, and why it shouldn’t. It delivers a few helpful tools and encourages us to **observe**, **analyse** and **think** before responding to critical claims. The talk is a great reminder to consider how we talk to each other and to enjoy doing what we do, no matter what others may think.

If you want to browse through all of the great talks from EmberFest, check out the [YouTube playlist](https://www.youtube.com/watch?v=xP-kog04lng&list=PLN4SpDLOSVkSB9034lDNdP1JoNBGssax9&index=21).

---

## [Hot Reloading in Ember 🔃](https://github.com/lifeart/ember-ast-hot-load)

[ember-ast-hot-load](https://github.com/lifeart/ember-ast-hot-load) is a new attempt to bring component hot reloading into the Ember ecosystem!

Hot reloading only refreshes the components that were changed, without losing the state of the app. For example, if you are four routes deep into your app and save a change to a component, the updated component will appear on the page without full application reload.

Give [ember-ast-hot-load](https://github.com/lifeart/ember-ast-hot-load) a try today!

---

## [DecEmber is Almost Here! 📆](https://github.com/ember-learn/guides-source/labels/DecEmber)

Are you wondering what to do with all your vacation time in December? We got ya covered! The Core Learning Team is sponsoring Dec**Ember**, a hackathon event specifically targeted at learning team efforts. Look for special issues marked “Dec**Ember**” from December 1st-31st. Of course there will be **prizes**, too! Stay tuned for more details...

P.S. You can also register for [24 Pull Requests](https://24pullrequests.com/) - giving back little gifts of code for the holidays! ❄️

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/richard-viney" target="gh-user">@richard-viney</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/ctjhoa" target="gh-user">@ctjhoa</a>, <a href="https://github.com/bentleyjensen" target="gh-user">@bentleyjensen</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/nprasmussen" target="gh-user">@nprasmussen</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/marlonmarcos21" target="gh-user">@marlonmarcos21</a>, <a href="https://github.com/esquith" target="gh-user">@esquith</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/simonihmig" target="gh-user">@simonihmig</a>, <a href="https://github.com/acorncom" target="gh-user">@acorncom</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/pbishop16" target="gh-user">@pbishop16</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a> and <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>  for their contributions to Ember and related repositories! 💖</p>

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

Melanie Sumner, Chris Ng, Jessica Jordan, Kenneth Larsen, Niels Rasmussen, Ryan Mark, Alon Bukai, Amy Lam and the Learning Team
