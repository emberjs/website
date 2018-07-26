---
title: The Ember Times - Issue No. 57
author: Amy Lam, Miguel Braga Gomes, Ryan Mark, Jessica Jordan, Robert Wagner, Chris Ng
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/07/27-the-ember-times-issue-57.html"
responsive: true
---

~ Γεια σου Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/07/27/the-ember-times-issue-57.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/07/27/issue-57) what has been going on in Emberland this week.

---

## [Ember Inspector - Help Shape The Future! 🔍](https://github.com/emberjs/ember-inspector)
We're pushing hard to make Ember Inspector the world class DevTools you deserve, and would love to get your input and help!
We would like to hear about feature requests and ideas you have, pain points you have experienced, and anything and everything
you can think of, that you would like to see make it into future iterations of Ember Inspector. Please check out the [discuss post](https://discuss.emberjs.com/t/ember-inspector-call-for-feature-requests-pain-points-and-contributors/15187)
and leave your thoughts, and feel free to stop by the `#ember-inspector` channel on Slack to chat about things or let us know you want
to help contribute!

---

## [Pointy single word components available 👈](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill)

Since last Monday single word component names are now possible with the **angle bracket invocation syntax**. Invoking components via angle brackets was already available, the novelty is that you can now use this syntax with single word components as well.

For example, the polyfil supports components names such as `<Button>`, `<Modal>` and `<Tab>`.

To find out more, check out the relevant RFC section [here](https://github.com/emberjs/rfcs/blob/master/text/0311-angle-bracket-invocation.md#tag-name)

---

## Readers' Questions: "What's the difference between ember-lifeline and ember-concurrency and which one should be used?" 🔄

This week's Readers' Question refers to two different Ember addons that make working with async easier. Since single page applications are often long lived, scheduled asynchronous work needs to be managed and cleaned up when not in use (e.g, when transitioning to another route). If we don’t, we can end up with asynchronous calls attempting to act on already destroyed elements which can trigger errors and memory leaks.

The [ember-lifeline](https://github.com/ember-lifeline/ember-lifeline) addon introduces several functional utility methods to help manage async states by associating async behavior to object instances. Ember provides the run loop to schedule work and exposes an [API](https://guides.emberjs.com/release/applications/run-loop/) that lifeline uses to override key lifecycle hooks and provides the necessary cleanup for you so that you don’t have to think about it. Lifeline also exposes a primitive, [disposables](https://github.com/ember-lifeline/ember-lifeline/#registerdisposable), which allows lifeline to clean up any resources that are outside of Ember's lifecyle.

The [ember-concurrency](https://github.com/machty/ember-concurrency) addon uses [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) to reduce the boilerplate code around maintaining concurrency while adding structure to async code by providing a [Task primitive](http://ember-concurrency.com/docs/task-function-syntax/). It uses a declarative API to ensure that only one instance of an operation is running at a time by enforcing logical boundaries.

There is _some_ overlap between the two (both have logic to run through a list of disposables/tasks), however each addon could be used independently or together to solve their respective challenges. To read more about each addon check out their respective repos:
- [ember-concurrency](https://github.com/machty/ember-concurrency)
- [ember-lifeline](https://github.com/ember-lifeline/ember-lifeline)

---

## [Get to Know Ember Data Internals Live and in Action 🎥](https://www.twitch.tv/runspired)

**Live streams** are amazing for sharing knowledge about the internals of your favorite libraries.
On his [Twitch channel](https://www.twitch.tv/runspired),
Ember Data contributor [@runspired](https://github.com/runspired) will take you on a **tour through Ember Data**
and highlight characteristics of the project.

The first stream about writing and refactoring Ember Data's test suite already went live past Sunday,
but there'll be more to come in the future! ✨
You can check out and comment on the [announcement thread on Twitter](https://twitter.com/Runspired/status/1020528036762988544).  and tune into [@runspired's stream channel](https://www.twitch.tv/runspired)
for future streaming sessions, broadcasting **every Tuesday & Friday** at **1pm Pacific Time / 4pm Eastern Time / 8pm UTC**.

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Have a suggestion for next week's Ember Times? Want to write for us? Pop into [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/)
on the Ember Community [Slack](https://ember-community-slackin.herokuapp.com/) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap!  ✨

Be kind,

Amy Lam, Miguel Braga Gomes, Ryan Mark, Jessica Jordan, Robert Wagner, Chris Ng, and the Learning Team
