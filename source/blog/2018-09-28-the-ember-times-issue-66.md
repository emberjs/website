---
title: The Ember Times - Issue No. XX
author: Bill Heaton, Chris Ng, Ryan Mark, Amy Lam, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/xxxx/xx/xx-the-ember-times-issue-XX.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---

## [SECTION TITLE](#section-url)


---

## [The Addon Test Is Right Where It Belongs ❤️](https://github.com/emberjs/rfcs/pull/378)

<!--alex ignore host-hostess-->
Spending too much time looking for the **test files** of your **in-repo addon**? Feeling too exhausted to maintain a large test suite in which addon and host app test cases are meshed together? It doesn't have to be this way.

Read more about how **collocated in-repo test files** are able to make your developer life easier in [this **shiny, new Request for Comments (RFC)**](https://github.com/emberjs/rfcs/pull/378). And as always, be sure to **leave your questions or ❤️ emojis** right below the RFC's pull request description! ✨


---

## [ember-cli-deprecation-workflow 1.0.0 Release 🎉](https://twitter.com/rwjblue/status/1045031033274605575)

This week, [@rwjblue](https://github.com/rwjblue) (with help from [@mixonic](https://github.com/mixonic), [@atsao](https://github.com/atsao), and [@gaurav0](https://github.com/Gaurav0)) released [1.0.0 of ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow/releases/tag/v1.0.0)!

[ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) is an addon geared towards making Ember upgrades easier by allowing you to work through deprecations without massive console noise from Ember 1.x and 2.x deprecations.

It silences the `console.log` noise or "deprecation spew" via configuration so that only unhandled deprecations will be displayed in your console. And now that the spew has settled down, you can process one deprecation at a time while ensuring that no new deprecations are introduced.

Check it out on the [GitHub repo](https://github.com/mixonic/ember-cli-deprecation-workflow)!

---

## [And Today's Special on The Router Menu: Query Params](https://github.com/emberjs/rfcs/pull/380)

Ever had the need to read **query params (QPs)** off a `Controller` and pass it down to a component to change its UI state depending on the QP value?

Ever had a hard time passing down QP values through layers and layers of components to do just that?

It doesn't have to be this way. Read [this new RFC](https://github.com/emberjs/rfcs/pull/380) about exposing QPs as a _computed property_ on the `RouterService`. It proposes that this `Service` can then be injected into components easily which makes laborious passing of QP data obsolete.

As always, **leave your comments** and appreciation [below the original proposal](https://github.com/emberjs/rfcs/pull/380) as long as it's **still under discussion**!

---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---

## [Issue Triage 🕵️](https://paper.dropbox.com/doc/Ember.js-Issue-Triage--ANXsBgi3NQNstI7fSMQIONfOAg-Bh6AEHTj1Bt4rXq0Awg4R)

<p>
  This week we had 5 volunteers helping 🚑 &nbsp;triage old issues that were inactive,
  we closed 9 and labelled 31 of 50 from last week that need a submitter response 🙀.
  Those 31 may be closed in the next week or two. Together, we addressed 17 issues
  that were inactive (and are still open 📂). We are beginning to establish a cadence
  again of a team addressing issue triage 🛠️ on Friday mornings.
</p>
<p>
  Thanks for your
  <a href="https://paper.dropbox.com/doc/Triage-2018-09-21--ANXmzEWQ5mVFnbfufGK81Tj5Ag-BIKVPVdJqOS8q46TxJQKu">
    triage contributions
  </a> over the past two weeks 🙏…
  <a href="https://github.com/yininge" target="gh-user">@yininge</a>,
  <a href="https://github.com/ryanlabouve" target="gh-user">@ryanlabouve</a>,
  <a href="https://github.com/yohanmishkin" target="gh-user">@yohanmishkin</a>,
  <a href="https://github.com/esbanarango" target="gh-user">@esbanarango</a>,
  <a href="https://github.com/hakilebara" target="gh-user">@hakilebara</a>, and
  <a href="https://github.com/pixelhandler" target="gh-user">@pixelhandler</a>.
</p>
<p>
  The <em>@emberjs/issues-team</em> objective is to increase signal-to-noise ratio of issues
  and 🐛 &nbsp;bugs so that the core team (and contributors) can take action to resolve bugs,
  and spend less effort sorting the issues queue. Currently there are about 67 open bugs, of
  those 25 had a reproduction (e.g. using <a href="https://ember-twiddle.com">ember-twiddle.com</a>), and one with a pull request - total count about 270. Our aim is to get down to 150 in the next
  couple months. If you'd like to help see the
  <a href="https://discordapp.com/channels/480462759797063690/480523776845414412">#issue-triage</a>
  room in the community Discord chat.
</p>

---

## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/chancancode" target="gh-user">@chancancode</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/simonihmig" target="gh-user">@simonihmig</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/iezer" target="gh-user">@iezer</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/pixelhandler" target="gh-user">@pixelhandler</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/acorncom" target="gh-user">@acorncom</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/jrjohnson" target="gh-user">@jrjohnson</a>, <a href="https://github.com/tmquinn" target="gh-user">@tmquinn</a>, <a href="https://github.com/BryanCrotaz" target="gh-user">@BryanCrotaz</a>, <a href="https://github.com/mfeckie" target="gh-user">@mfeckie</a>, <a href="https://github.com/bmac" target="gh-user">@bmac</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/SparshithNR" target="gh-user">@SparshithNR</a>, <a href="https://github.com/dcyriller" target="gh-user">@dcyriller</a>, <a href="https://github.com/gandalfar" target="gh-user">@gandalfar</a>, <a href="https://github.com/CodingItWrong" target="gh-user">@CodingItWrong</a>, <a href="https://github.com/ppcano" target="gh-user">@ppcano</a>, <a href="https://github.com/hybridmuse" target="gh-user">@hybridmuse</a> for their contributions to Ember and related repositories! 💖</p>

---

## [Got a Question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

## #embertimes

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at #support-ember-times on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter. 

Keep on top of what's been going on in Emberland this week by subscribing to our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/)! You can also find our posts on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html).

---


That's another wrap! ✨

Be kind,

Bill Heaton, Chris Ng, Ryan Mark, Amy Lam, Jessica Jordan and the Learning Team
