---
title: The Ember.js Times - Issue No. 51
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, 2018
alias : "blog/2018/06/15/the-emberjs-times-issue-51.html"
responsive: true
---

... Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/06/15/the-emberjs-times-issue-51.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/06/15/issue-51) what has been going on in Emberland this week.
We have a couple of **fresh 🥒 Ember RFCs** (Request for Comments) in for you
...
---

## [New release of Ember Twiddle](https://ember-twiddle.com)

Ember Twiddle v0.14.0 was released on Monday June 4. It includes support for Ember 2.18, Babel 6, and new module imports.
The entire [changelog](https://github.com/ember-cli/ember-twiddle/releases/tag/v0.14.0) shows all the work that has gone into this.
The next version is also being worked on, supporting Ember 3.0 - Ember 3.2.
You can test that out now at [canary.ember-twiddle.com](https://canary.ember-twiddle.com).
Ember Twiddle is a playground website for developing small Ember applications backed by Github gists.

## [Is Your Components Not Pointy Enough?](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill)
[ember-angle-bracket-invocation-polyfill](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill) provides a polyfill for angle bracket invocation syntax as described in [RFC 311](https://github.com/emberjs/rfcs/pull/311).  It includes features such as invoking components via angle brackets using TitleCase, self-closing syntax, paths much more.

If you’re interested in using this the best documentation is in the RFC itself.
---

## [Back To the Future](https://github.com/rwjblue/ember-named-arguments-polyfill)
Another polyfill that is now available is [ember-named-arguments-polyfill](https://github.com/rwjblue/ember-named-arguments-polyfill) which polyfills the named arguments feature to work for Ember 2.10+.

This is helpful for add-on authors who want to leverage the named arguments feature for a cleaner template. So, components receiving an argument named `foo` can now do:
`{{@foo}}`. This allows you to easily distinguish arguments from local variables, computed properties and such.

---

## [SECTION TITLE](#section-url)

---

## [SECTION TITLE](#section-url)

---

## [SECTION TITLE](#section-url)

---

## [SECTION TITLE](#section-url)

---

## [Contributors' Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

<p>This week we'd like to thank ...
</p>

---

## [Readers' Questions: ??? 🤓](question-url)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>...</p>
</div>

<div class="blog-row">
  <a class="ember-button" href="#">Read more</a>
</div>

<div class="blog-row">
  <p><strong>Submit your own</strong> short and sweet <strong>question</strong> at <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>
</div>

## [The Ember.js Times is What We Make It](https://the-emberjs-times.ongoodbits.com/)

The Ember.js Times is a weekly news editorial featuring all the new things that are going on in Emberland.
[Subscribe to our e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) to get the next edition right into your inbox.
If you ❤️ what you're reading and you feel like a writer at heart,
drop by [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/convo/C4TD5JJ7R-1497022015.688894/) on the Ember Community Slack Chat to join the discussion or even become the co-author of a future edition!


---


That's another wrap!  ✨

Be kind,

the crowd and the Learning Team
