---
title: The Ember.js Times - Issue No. 44
author: all the people
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/04/27/the-emberjs-times-issue-44.html"
responsive: true
---

ಹಲೋ Emberistas!

This week you may again enjoy the newsletter in both [the e-mail](https://the-emberjs-times.ongoodbits.com/)
and the [blog format](#) and share it even better with all your Ember friends.

In this edition we will tell you more about....

Here's a recap of what happened in Emberland these days ✨

---

## [All good from 10 to 4 in Ember CLI](https://github.com/ember-cli/ember-cli/pull/7791)

This week contributors to Ember CLI worked on improving the test suite by
[extending the list of Node versions](https://github.com/ember-cli/ember-cli/pull/7791) tested against.
This means that you will be able to user your favorite command line tool even
on the latest version of NodeJS smoothly and without any worries.

Also lots of efforts are underway to bring Treeshaking capabilities to your
Ember app very soon. Several contributons this week ([1](https://github.com/ember-cli/ember-cli/pull/7788),
[2](https://github.com/ember-cli/ember-cli/pull/7786),
[3](https://github.com/ember-cli/ember-cli/pull/7784)) aimed at improving the internal
packaging manager of Ember CLI. Wanna know more about the new exciting things
that are arriving for Ember CLI in 2018? Be sure to not miss the annual [roadmap for 2018](https://discuss.emberjs.com/t/ember-cli-2018-edition/14543)!

---

## [EMBER - Ember 3.1.1 Released](https://github.com/emberjs/ember.js/releases/tag/v3.1.1)
This week a patch for Ember was released. It includes several bug fixes but here are a few selected ones:

[A bug](https://github.com/emberjs/ember.js/issues/16379) was introduced in Ember 3.1 that caused `ariaRole` to not be appended if this was initially set as being `false`. The expected behaviour here is that if I initially set the `ariaRole` to false it should not be appended, but I might want to dynamically change this later on. This is now fixed with Ember 3.1.1.

After upgrading to 3.1 [some people](https://github.com/emberjs/ember.js/issues/16503) started seeing errors like `Cannot read property 'syscall' of null`. This was caused by `ComponentDefinitions` leaking heap space. This has as well been fixed in Ember 3.1.1.

Ember 3.1.1 contains several more fixes. You can go though them all in [the release change log.](https://github.com/emberjs/ember.js/releases/tag/v3.1.1)

---

## [Learning Team corner](https://emberjs.com/blog/2018/04/22/ember-learning-update.html)

The Learning Team met IRL at EmberConf and shared the results of that meeting on [the Ember blog](https://emberjs.com/blog/2018/04/22/ember-learning-update.html). Initiatives for the new year were grouped into two directions - User Support and Marketing.

The new guides app will be launching soon! The main difference is that is in an Ember app, making it easier for Ember folks to contribute. And because of [prember](https://github.com/ef4/prember), it's fully SEO-friendly! Deprecation for the old guides is happening [here](https://github.com/emberjs/guides#notice-this-repository-is-deprecated).

---

## [SECTION - ENTER YOUR TITLE HERE](enter-your-url-where-this-section-should-link-to-here)


---

## [SECTION - ENTER YOUR TITLE HERE](enter-your-url-where-this-section-should-link-to-here)

---

## [Contributor's Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)


---

## [Readers' Questions: ENTER QUESTION TITLE HERE](link-to-question)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />
  <p>...</p>
</div>

<a class="ember-button ember-button--centered" href="#link-to-question">Read more</a>

**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core). And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

lots of people
