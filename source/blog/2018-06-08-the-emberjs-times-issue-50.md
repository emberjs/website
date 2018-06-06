---
title: The Ember.js Times - Issue No. 50
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, 2018
alias : "blog/2018/06/08/the-emberjs-times-issue-50.html"
responsive: true
---

... Emberistas!

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/06/08/the-emberjs-times-issue-50.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/06/08/issue-50) what has been going on in Emberland this week:
...

---

## [Lets Send SendAction Away!](#lets-send-send-action-away)
The time has come. `component#sendAction` has served the Ember community well for years but in a new [RFC by @cibernox](https://github.com/emberjs/rfcs/pull/335) he proposes to deprecate this feature. In the old days, before v1.13, `component#sendAction` was the only way to bubble up actions from components. Since v1.13 we have _closure actions_ which are more intuitive and flexible and they are the current recommended Ember Way™ for doing actions in components.

_Closure actions_ have been the recommended way to do actions in components for almost 3 years. Also `component#sendAction` is not even mentioned in the guides anymore so there is really little reason to keep it around. So look out for a new deprecation near you, coming soon!

If you want to learn more about why _closure actions_ are preferred over `component#sendAction` then you can check out [this blog post from 2016](http://miguelcamba.com/blog/2016/01/24/ember-closure-actions-in-depth).

If you want to join the RFC discussion you can check it out here: https://github.com/emberjs/rfcs/pull/335

---

## [SECTION TITLE](#section-url)



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

## [Got a question? Ask Readers' Questions!🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>...</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

That's another wrap!  ✨

Be kind,

the crowd and the Learning Team
