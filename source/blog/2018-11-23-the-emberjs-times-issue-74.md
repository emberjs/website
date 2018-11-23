---
title: The Ember Times - Issue No. XX
author: Chris Ng, Amy Lam, Jessica Jordan, Kenneth Larsen, the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/11/23-the-ember-times-issue-74.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

Check out these new Ember Data public packages 📦, 
this week's work by dedicated contributors 💪 to the **Ember Guides**, 
chime in on the Ember in VSCode tutorial 💻,
Improvement to the tutorial 🗺️
<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---
## [RFC for @ember-data packages 📦](https://github.com/emberjs/rfcs/pull/395)

[@runspired](www.github.com/runspired) dropped a big RFC on [Ember Data](https://github.com/emberjs/data) packages. The RFC proposes **public** import path changes for `ember-data` and moving `ember-data` into the `@ember-data` namespace.

The motivations for these changes revolve around improving the [TypeScript](https://www.typescriptlang.org/) experience, reduce bike shedding, simplify the mental model, engage more contributors, improve CI time, and more! By breaking down the single large package into smaller consumable chunks, end users can pick and choose which parts they need and do not need as well as make the ecosystem easier to navigate.

There are [detailed designs](https://github.com/runspired/rfcs/blob/ember-data-packages-rfc/text/0000-ember-data-packages.md#detailed-design) on where each package will move towards so read more about it in the [RFC on GitHub](https://github.com/runspired/rfcs/blob/ember-data-packages-rfc/text/0000-ember-data-packages.md)!

---

## [With Learners in Mind: Improving the Ember Guides 🐹](https://discordapp.com/channels/480462759797063690/480777444203429888)

This week a set of contributions to the [Ember Guides](https://github.com/ember-learn/guides-source/) will make concepts like Ember Components, Ember Data among others much **easier to understand** for learners of the framework. The contributors [@zachgarwood](https://github.com/zachgarwood), [@ppcano](https://github.com/ppcano), [@LalithaRajanala](https://github.com/LalithaRajanala) and [@sduquej](https://github.com/sduquej) made sure that new concepts are introduced sufficiently and that instructions in the [Ember Tutorial](https://guides.emberjs.com/release/tutorial/ember-cli/) are as clear as possible ([1](https://github.com/ember-learn/guides-source/pull/284), [2](https://github.com/ember-learn/guides-source/pull/283), [3](https://github.com/ember-learn/guides-source/pull/282), [4](https://github.com/ember-learn/guides-source/pull/280), [5](https://github.com/ember-learn/guides-source/pull/240), [6](https://github.com/ember-learn/guides-source/pull/222)). **Thank you** so much for **your contributions** to the Guides! ❤️

If you want to help improve the Guides as well, please be sure to check out the [list of issues that need help](https://help-wanted.emberjs.com/learning?query=guides) or drop by the [#dev-ember-learning channel on Discord](https://discordapp.com/channels/480462759797063690/480777444203429888) to get started!

---

## [New and Improved Tutorial 🗺️](https://guides.emberjs.com/release/tutorial/ember-cli/)
One of the great ways to learn Ember is by building the `super-rentals` app by following the [tutorial in the guides](https://guides.emberjs.com/release/tutorial/ember-cli/). One of the things you’ll learn in that tutorial is how to integrate Google Maps into an Ember application. Sadly, some changes to Google Maps meant that now you would have to provide credit card information to embed it in your app.

Thankfully, **the amazing [@toddjordan](https://github.com/toddjordan)** has provided a great fix for this. He has switched the Google Maps part out of `super-rentals` and replaced it with the free alternative Leaflet Mapbox.

Thanks a lot of all of the hard work on this, [@toddjordan](https://github.com/toddjordan) ❤️

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [Use VSCode? Help Wanted 🚧](https://github.com/Microsoft/vscode-docs/issues/1509#issuecomment-440084989)

VSCode recently published [Using Ember in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/emberjs-tutorial) on their docs site! Ember **enthusiasts** are encouraged to [submit PRs](https://github.com/Microsoft/vscode-docs/issues/1509#issuecomment-440084989) to improve the tutorial, particularly to the [client-side debugging story](https://github.com/Microsoft/vscode-docs/blob/master/docs/nodejs/emberjs-tutorial.md#common-questions).

Looking for help to get started? Drop by [#dev-ember-learning](https://discordapp.com/channels/480462759797063690/480777444203429888) on the [Ember Community Chat](https://discordapp.com/invite/zT3asNS) and ask away!
---


## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/bobisjan" target="gh-user">@bobisjan</a>, <a href="https://github.com/SergeAstapov" target="gh-user">@SergeAstapov</a>, <a href="https://github.com/hjdivad" target="gh-user">@hjdivad</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/simonihmig" target="gh-user">@simonihmig</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/igorT" target="gh-user">@igorT</a>, <a href="https://github.com/thorsteinsson" target="gh-user">@thorsteinsson</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/NullVoxPopuli" target="gh-user">@NullVoxPopuli</a>, <a href="https://github.com/sduquej" target="gh-user">@sduquej</a>, <a href="https://github.com/zachgarwood" target="gh-user">@zachgarwood</a>, <a href="https://github.com/jaredgalanis" target="gh-user">@jaredgalanis</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/spruce" target="gh-user">@spruce</a> and <a href="https://github.com/LalithaRajanala" target="gh-user">@LalithaRajanala</a> for their contributions to Ember and related repositories! 💖</p>

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

Chris Ng, Amy Lam, Jessica Jordan, Kenneth Larsen, the crowd and the Learning Team
