---
title: The Ember Times - Issue No. 57
author: Amy Lam, Miguel Braga Gomes, Ryan Mark, Sivakumar Kailasam, Jessica Jordan, Robert Wagner, Chris Ng
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/07/27-the-ember-times-issue-57.html"
responsive: true
---

~ Γεια σου Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/07/27/the-ember-times-issue-57.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/07/27/issue-57) what has been going on in Emberland this week.

---

## [Ember Inspector - Help shape the future! 🔍](https://github.com/emberjs/ember-inspector)

We're pushing hard to make Ember Inspector the world class DevTools you deserve, and would love to get your input and help!

We would like to hear about feature requests and ideas you have, pain points you have experienced, and anything and everything you can think of, that you would like to see make it into future iterations of Ember Inspector. Please check out the [discuss post](https://discuss.emberjs.com/t/ember-inspector-call-for-feature-requests-pain-points-and-contributors/15187) and leave your thoughts, and feel free to stop by the [#ember-inspector](https://embercommunity.slack.com/messages/C04ENQPFW/) channel on Slack to chat about things or let us know you want to help contribute!

---

## [Pointy single word components available 👈](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill)

Since last Monday single word component names are now possible with the **angle bracket invocation syntax**. Invoking components via angle brackets was already available, the novelty is that you can now use this syntax with single word components as well.

For example, the polyfill supports components names such as `<Button>`, `<Modal>` and `<Tab>`.

To find out more, check out the relevant RFC section [here](https://github.com/emberjs/rfcs/blob/master/text/0311-angle-bracket-invocation.md#tag-name).

---

## [Get to know Ember Data internals live and in action 🎥](https://www.twitch.tv/runspired)

**Live streams** are amazing for sharing knowledge about the internals of your favorite libraries. On his [Twitch channel](https://www.twitch.tv/runspired), Ember Data contributor [@runspired](https://github.com/runspired) will take you on a **tour through Ember Data** and highlight characteristics of the project.

The first stream about writing and refactoring Ember Data's test suite already went live past Sunday, but there'll be more to come in the future! ✨ You can check out and comment on the [announcement thread on Twitter](https://twitter.com/Runspired/status/1020528036762988544) and tune into [@runspired's stream channel](https://www.twitch.tv/runspired) for future streaming sessions, broadcasting **every Tuesday & Friday** at **1pm Pacific Time / 4pm Eastern Time / 8pm UTC**.

---

## [Ember + WebAssembly just got way easier](https://medium.com/@lukedeniston/ember-webassembly-just-got-way-easier-1e4ec6ca40ab)

Thanks to @ef4's [ember-auto-import](https://github.com/ef4/ember-auto-import), importing Wasm modules is now a breeze! [@luketheobscure](https://github.com/luketheobscure) wrote about his experience and created a [wasm-example app](https://github.com/luketheobscure/wasm-example) in Ember. Check out his writeup on [Medium](https://medium.com/@lukedeniston/ember-webassembly-just-got-way-easier-1e4ec6ca40ab).

---

## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank the work and effort made by <a href="https://github.com/mike-north" target="gh-user">@mike-north</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/bmac" target="gh-user">@bmac</a>, <a href="https://github.com/sumeetattree" target="gh-user">@sumeetattree</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/bgentry" target="gh-user">@bgentry</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/arthirm" target="gh-user">@arthirm</a>, <a href="https://github.com/astronomersiva" target="gh-user">@astronomersiva</a>, <a href="https://github.com/SparshithNR" target="gh-user">@SparshithNR</a>, <a href="https://github.com/dependabot[bot]" target="gh-user">@dependabot[bot]</a>, <a href="https://github.com/dfreeman" target="gh-user">@dfreeman</a>, <a href="https://github.com/savvymas" target="gh-user">@savvymas</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/ef4" target="gh-user">@ef4</a>, <a href="https://github.com/hakilebara" target="gh-user">@hakilebara</a>, <a href="https://github.com/maciej-ka" target="gh-user">@maciej-ka</a>, <a href="https://github.com/melaniespath" target="gh-user">@melaniespath</a> and <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>. We appreciate your contributions to Ember and related repositories 💖!</p>

---

## [Readers' Questions: "What's the difference between ember-lifeline and ember-concurrency and which one should be used?" 🤔](https://discuss.emberjs.com/t/readers-questions-whats-the-difference-between-ember-lifeline-and-ember-concurrency-and-which-one-should-be-used/15197)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>This week's Readers' Question operates <strong>asynchronously</strong>: Both <code>ember-concurrency</code> and
  <code>ember-lifeline</code> are popular addons for managing async behaviour in your Ember applications
  as smoothly as possible. But what's the <strong>difference</strong> between those two?

   <p>In his detailed answer to this question, Ember developer and writer <a href="https://github.com/chrisrng" target="githubchris">@chrisrng</a> presents the <strong>strengths of either addon</strong> to handle application state. You can <a href="https://discuss.emberjs.com/t/readers-questions-whats-the-difference-between-ember-lifeline-and-ember-concurrency-and-which-one-should-be-used/15197" target="rq3">read the full answer on the official Ember Forum</a>.</p>
  <p>
</div>

Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem? Ask away at [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core) and we'll present the answer in a future Ember Times. There are no silly questions! 🐹

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/) on Slack or tweet us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

Amy Lam, Miguel Braga Gomes, Ryan Mark, Sivakumar Kailasam, Jessica Jordan, Robert Wagner, Chris Ng, and the Learning Team
