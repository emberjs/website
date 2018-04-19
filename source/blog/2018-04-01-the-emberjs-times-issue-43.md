---
title: The Ember.js Times - Issue No. 43
author: Alon Bukai, Ryan Mark, Amy Lam, Ricardo Mendes, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/04/01/the-emberjs-times-issue-43.html"
responsive: true
---

Ola Emberistas!

This week we try out another format for the newsletter and bring it right to the
Ember blog, to make it accessible to even more Ember enthusiasts in the community.

And this week we not only have news about the 2018 roadmap for Ember CLI for you,
but also highlights from the latest Ember 3.1 release.
Last but not least, a brand-new Readers' Question about contributions for you.

Here's what's happened this week 🐹 :

---

## [The Road Ahead for Ember CLI in 2018](https://discuss.emberjs.com/t/ember-cli-2018-edition/14543)

This week the Ember CLI team has published their *official roadmap* for the
command-line tool to keep the Ember community posted on which shiny new things
might be landing in an Ember app near you soon.

The current project goals for 2018 include a dedicated migration story to
[Module Unification](https://github.com/emberjs/rfcs/pull/143), enabling
[Treeshaking](https://github.com/ember-cli/rfcs/pull/110), adding service worker support
to the blueprint of Ember apps by default and many other exciting topics.

You can read more about the roadmap on the [Ember Forum](https://discuss.emberjs.com/t/ember-cli-2018-edition/14543)
and give your thoughts and suggestions in the discussion.

---

## [EMBER](/blog/2018/04/13/ember-3-1-released.html)

<div class="blog-row">
  <img class="transparent padded float-left small" src="/images/brand/ember_Ember-Light.png" alt="Ember Brand Logo" />

  <p>
    With Ember 3.1 you now get ES5 getters for computed properties since our target browsers support ES5 getters. The motivation is to improve developer ergonomics and interoperability with other tooling and libraries. For the property to recompute you still need to use this.set() or Ember.set().</p>
  <p>
    Yet, this doesn’t mean that this.get() is now deprecated. There’s actually still a lot of cases where you should use this.get() instead of the ES5 getter.
    You can read all about it in the <a href="https://www.emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_es5-getters-for-computed-properties-1-of-3">release post</a>.
  </p>
</div>

<a class="ember-button ember-button--centered href="/blog/2018/04/13/ember-3-1-released.html">Read more</a>

##[Say More](https://github.com/emberjs/rfcs/pull/327]

A new RFC has landed by [@jgwhite](https://github.com/jgwhite) titled "Semantic Test Selectors."  The motivation behind this RFC first appeared in the talk [Say More] at EmberConf 2018.  Basically the RFC describes, in 2 parts, how to write tests that "say more" about what the test is actually doing by writing less.  

Essentially the RFC proposes using labels, rather than selectors, to interact with elements in tests.  For example

```js
await fillIn('.login-form .field-email', 'alice@example.com');
await fillIn('.login-form .field-password', 'topsecret');
await click('.submit-btn');
```

becomes

```js
await fillIn('Email', 'alice@example.com');
await fillIn('Password', 'topsecret');
await click('Log in');
```
How do we get there?  One way is accessibility.  By delivering accessible, first-class ember apps by default, you instantly have semantic access to elements because they are labeled in a meaningful way.  As [@jgwhite](https://github.com/jgwhite)  eloquently puts it
> — <cite>if we want to access a UI element in a test, we do so as if we were using a screen reader.</cite>


Want to know more? The RFC is incredibly well written and it deserves a proper reading.  Head over to [issue 327](https://github.com/emberjs/rfcs/pull/327] to be part of an evolutionary way to test your Ember apps!
---

## [EMBER LEARN](yoururl)


[MAIN TEXT]

---

## [Readers' Questions: When and how will we be able to use decorators in Ember apps?](#yoururl)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />
  <p>In this week's brand new Readers’ Question it's all about the new and cool and shiny that will
  be coming to your Ember apps soon: When will we be able to make use of the decorator syntax when writing Ember apps?
  </p>
 <p>In his detailed write-up <a href="https://github.com/pzuraq">@pzuraq</a> will answer everything you need to know about the current state of the decorators
  proposal itself and when you will be able to decorate your own application. Read the full answer
  on the <a href="#">official Ember forum</a>.
</div>
<a class="ember-button ember-button--centered href="#">Read more</a>

---

## Slack Stars
Ember Times would like to give a shoutout to <a href="https://github.com/runspired">@runspired</a> (Chris Thoburn), for being incredibly helpful and responsive in a majority of the Slack channels this last week. Chris is major contributor to the ember ecosystem and an integral part of the ember-data subteam.  He has been super supportive in helping community members migrate through the many versions of Ember data from 2.12 all the way to 3.2.0-beta.2.  Additionally Chris shares his intimate knowledge of the ember-data internals to make it easier for everyone to understand why things work in a particular way and to also shed some light on how ember-data will work in the future.  Thanks @runspired!

## We love Ember Times
Do you? If so, contribute!  [Ember Times](https://embercommunity.slack.com/channels/topic-embertimes) is always looking for people to help spread the word about all things Ember.  Drop by the Slack channel to say "hi!" and learn how to get started.        

That's another wrap!  ✨

Be kind,

Alon Bukai, Amy Lam, Ryan Mark, Ricardo Mendes, Jessica Jordan and the Learning Team

[Say More]: https://youtu.be/qfnkDyHVJzs?t=5h39m15s
