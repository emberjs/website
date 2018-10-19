---
title: The Ember Times - Issue No. 69
author: Chris Ng, Alon Bukai, Kenneth Larsen, Jessica Jordan, Amy Lam, Ryan Mark
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/10/19-the-ember-times-issue-69.html"
responsive: true
---

Namaste Emberistas! 🐹

This week we're discussing 4️⃣ fresh RFCs 🥑: bringing truth helpers to Ember core ✍️, new error handling methods 🚨, jQuery-free Ember apps by default 😄, and some improvements to relationship links 🔗. We're also highlighting test coverage for docs when Ember is upgraded 🚧, the new ember-self-focused addon 👁‍🗨, the EmberConf 2019 CFP brainstorm 🧠⛈, and more...read on!

---

## [Help Yourselves to Default Template Helpers 🍽️](https://github.com/emberjs/rfcs/pull/388)
If you find yourself often reaching for the addon [ember-truth-helpers](https://github.com/jmurphyau/ember-truth-helpers) in your templates then this [new RFC by @cibernox](https://github.com/emberjs/rfcs/pull/388) is for you. This **Request for Comments (RFC)** proposes bringing in some of the **template helpers** in `ember-truth-helpers` into **Ember Core**. 

The reasoning behind this is that a few helpers from this addon are so common in Ember apps that it makes sense to add them into Ember Core itself to **reduce the friction** of needing to install an addon to get them.

Another reason that might even be more important is that this could open up **Glimmer VM low level optimizations** as the Glimmer VM itself would know about these helpers.

The proposed helpers to add to core are: `eq`, `not`, `and`, `or`, `gt` and `gte`, `lt` and `lte`.

Learn more about this RFC and [join the discussion](https://github.com/emberjs/rfcs/pull/388). 

---

## [A New Way to Error Handling 🚩](https://github.com/emberjs/rfcs/pull/384)

[A recent **Request for Comments (RFC)**](https://github.com/emberjs/rfcs/pull/384) from the magical **Ember Data** Land takes us on a journey through **error handling** in Ember: It proposes the addition of new error handling methods which do not affect the state of your data records to the [`DS.Errors`](https://www.emberjs.com/api/ember-data/release/classes/DS.Errors) class.

Read more about the new, proposed API and the motivation behind it [in the original proposal and feel free to discuss](https://github.com/emberjs/rfcs/pull/384)!

---

## [🍬 Sugar-, 🍞 Gluten- & jQuery-Free Ember Apps 🐹 by Default](https://github.com/emberjs/rfcs/pull/386)

Previous RFC-driven efforts already provided an **option** for you to **exclude jQuery** from your Ember app builds easily ([1](https://emberjs.github.io/rfcs/0294-optional-jquery.html), [2](https://www.emberjs.com/blog/2018/07/16/ember-3-3-released.html#toc_new-features-1), [3](https://github.com/ember-learn/guides-source/pull/64)). Now [a **follow-up RFC**](https://github.com/emberjs/rfcs/pull/386) takes the idea of **reducing the initial bundle size** of apps even further.

The new proposal envisions apps to provide an **easy opt-in** for the UI library, but to **exclude jQuery by default**. The RFC suggests that this will make it easier for developers and addon authors to provide smaller apps from the start and only include the dependency back in if it is _really_ needed.

Curious to know more? Here's the [full proposal](https://github.com/emberjs/rfcs/pull/386).

---

## [We've Got You Covered ⛑](https://github.com/emberjs/ember.js/pull/16910)
You might have noticed that sometimes when a new release of Ember is out some API documentation can disappear. This happens when code gets moved around in Ember, such as putting functions in their own modules, which makes it easy to make mistakes that impact the documentation parser. [@ef4](https://github.com/ef4) added [test coverage](https://github.com/emberjs/ember.js/pull/16910) for exactly these cases.

This means that when a new release is prepared these tests will most likely catch any unintentional documentation changes.

---

## [Using Relationships Links or Not? Your Call! 🔗](https://github.com/emberjs/rfcs/pull/387)

Fetching your data from a [JSON:API compliant](https://jsonapi.org/) backend? Not sure how to tell Ember Data **explicitly** to look up an included **relationship** in the payload itself vs. via an additional request using the response's `link` attribute?

Possibly, this will be much easier very soon! [Another new, Ember Data related RFC](https://github.com/emberjs/rfcs/pull/387) proposed the addition of a `shouldFindViaLink` method to the public API of REST **adapters**. According to the proposal, users may overwrite this method - which should return a _Boolean_ to indicate if Ember Data should look up relationship data via links or not - themselves for custom behavior and gain full control of their relational data loading.

You can **read more** about the design of this proposed API [**in the RFC itself**](https://github.com/emberjs/rfcs/pull/387)!

---

## [New Addon Release: ember-self-focused 👁️](https://github.com/linkedin/self-focused/tree/master/packages/ember-self-focused)

<!--alex ignore spa-->
User interface transitions that happen in a single-page application (SPA) are problematic for **screen reading software** since traditionally they are reliant on reading out the text on page load. Since there are some visual changes on the screen but the page does not reload in an SPA, it makes it difficult for screen reading software users to be aware of UI changes.

To solve this issue, [@sarbbottam](https://github.com/sarbbottam) released a brand new addon to enable screen reading software to speak the content of the new node by **focusing on the HTML node of the dynamic content**. The new addon [ember-self-focused](https://github.com/linkedin/self-focused/tree/master/packages/ember-self-focused) provides a **component** and a **service** to keep track of the HTML nodes to be focused.

Check out more in [@sarbbottam](https://github.com/sarbbottam)'s [blog post](https://engineering.linkedin.com/blog/2018/10/making-ember-applications--ui-transitions-screen-reader-friendly) or at the [GitHub repo](https://github.com/linkedin/self-focused/tree/master/packages/ember-self-focused)!

---

## [EmberConf 2019 CFP Brainstorm 📆](https://emberconf.com/cfp-brainstorm.html)

Interested in submitting a talk idea to **EmberConf**? Join the EmberConf team for an **interactive video brainstorm** on Tuesday, October 30th at 11:00am PT. They'll chat about the CFP, the topics they hope to see, and answer community questions about ideas and proposals. Mark your calendars and go to [the EmberConf website](https://emberconf.com/cfp-brainstorm.html) for more info!

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/btecu" target="gh-user">@btecu</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/ssutar" target="gh-user">@ssutar</a>, <a href="https://github.com/josemarluedke" target="gh-user">@josemarluedke</a>, <a href="https://github.com/KamiKillertO" target="gh-user">@KamiKillertO</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/wifelette" target="gh-user">@wifelette</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/devpuppy" target="gh-user">@devpuppy</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/pixelhandler" target="gh-user">@pixelhandler</a>, <a href="https://github.com/sduquej" target="gh-user">@sduquej</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/mydea" target="gh-user">@mydea</a>, <a href="https://github.com/mattdonnelly" target="gh-user">@mattdonnelly</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/gowthamrm" target="gh-user">@gowthamrm</a>, <a href="https://github.com/dcombslinkedin" target="gh-user">@dcombslinkedin</a>, <a href="https://github.com/SparshithNR" target="gh-user">@SparshithNR</a>, <a href="https://github.com/buschtoens" target="gh-user">@buschtoens</a>, <a href="https://github.com/chiragpat" target="gh-user">@chiragpat</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/esbanarango" target="gh-user">@esbanarango</a>, <a href="https://github.com/Ricool06" target="gh-user">@Ricool06</a>, <a href="https://github.com/aklkv" target="gh-user">@aklkv</a>, <a href="https://github.com/JonoLightning" target="gh-user">@JonoLightning</a>, <a href="https://github.com/LalithaRajanala" target="gh-user">@LalithaRajanala</a>, <a href="https://github.com/YoranBrondsema" target="gh-user">@YoranBrondsema</a>, <a href="https://github.com/worace" target="gh-user">@worace</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a> and <a href="https://github.com/joshmcrty" target="gh-user">@joshmcrty</a> for their contributions to Ember and related repositories! 💖</p>

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

Chris Ng, Alon Bukai, Kenneth Larsen, Ryan Mark, Amy Lam, Jessica Jordan and the Learning Team
