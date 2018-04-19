---
title: The Ember.js Times - Issue No. 43
author: Alon Bukai, Ryan Mark, Amy Lam, Ricardo Mendes, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/04/01/the-emberjs-times-issue-43.html"
responsive: true
---

Ola Emberistas!

This week we **try out another format** for the newsletter and bring it right to the
Ember blog, to make it accessible to even more Ember enthusiasts in the community.

And this week we not only have news about the **2018 roadmap for Ember CLI** for you,
but also highlights from the latest **Ember 3.1 release**. 
Last but not least, a **new Readers' Question** about a neat new syntax feature for you.

Here's what's happened this week 🐹 :

---

## [The Road Ahead for Ember CLI in 2018](https://discuss.emberjs.com/t/ember-cli-2018-edition/14543)

This week the Ember CLI team has published their **official roadmap** for the
command-line tool to keep the Ember community posted on which shiny new things
might be landing in an Ember app near you soon.

The current project goals for 2018 include a dedicated migration story to
[Module Unification](https://github.com/emberjs/rfcs/pull/143), enabling
[Treeshaking](https://github.com/ember-cli/rfcs/pull/110), adding service worker support
to the blueprint of Ember apps by default and many other exciting topics.

You can **read more** about the roadmap on the [Ember Forum](https://discuss.emberjs.com/t/ember-cli-2018-edition/14543)
and give your thoughts and suggestions in the discussion.

---

## [EMBER](/blog/2018/04/13/ember-3-1-released.html)

<div class="blog-row">
  <img class="transparent padded float-left small" src="/images/brand/ember_Ember-Light.png" alt="Ember Brand Logo" />

  <p>
    With <strong>Ember 3.1</strong> you now get <strong>ES5 getters</strong> for computed properties since our target browsers support ES5 getters.
    The motivation is to improve developer ergonomics and interoperability with other tooling and libraries.
    For the property to recompute you still need to use <code>this.set()</code> or <code>Ember.set()</code>.</p>
  <p>
    Yet, this doesn’t mean that <code>this.get()</code> is now deprecated. There’s actually still a lot of cases where you should use <code>this.get()</code> instead of the ES5 getter. 
    You can read all about it in the <a href="https://www.emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_es5-getters-for-computed-properties-1-of-3"><strong>release post</strong></a>.
  </p>
</div>

<a class="ember-button ember-button--centered href="/blog/2018/04/13/ember-3-1-released.html">Read more</a>

---

## [EMBER LEARN](yoururl)


[MAIN TEXT]

---

## [Ember CLI Update Updated 🐹 ⬆️](https://github.com/ember-cli/ember-cli-update#options)

**Ember CLI Update** which last week was brought in under the official ember-cli GitHub 
organization has gotten an update. It now has two new commands that will help you keep your apps updated and using the latest and greatest in Emberland.
These new commands are `--dry-run` and `--list-codemods`.
 
The first, `--dry-run`, will give you a quick explanation of what running the update will do. 
For example running 

```
ember-cli-update --dry-run
``` 

on an app running Ember v2.15.1 would output: `Would update from 2.15.1 to 3.1.2.`

The second, `--list-codemods`, will give you a list of the available codemods along with more info about them. 

Currently the codemods supported are: 
`ember-modules-codemod`, `ember-qunit-codemod`, `ember-test-helpers-codemod`, and `es5-getter-ember-codemod`. 
That last codemod helps your project use the native ES5 getters that were described up above.

A quick reminder that _ember-cli-update_ has been accepted to be the **official way** to **update Ember apps** 
so if you aren't currently using it, now is a great time to start!

---

## [Readers' Questions: When and how will we be able to use decorators in Ember apps?](https://discuss.emberjs.com/t/readers-question-when-will-we-be-able-to-use-decorators-in-ember-apps/14583))

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />
  <p>In this week's <strong>brand new</strong> Readers’ Question it's all about the new and cool and shiny that will 
  be coming to your Ember apps soon: When will we be able to make use of the <strong>decorator syntax</strong> when writing Ember apps? 
  </p>
 <p>In his detailed write-up <a href="https://github.com/pzuraq">@pzuraq</a> will answer everything you need to know about the current state of the decorators
  proposal itself and when you will be able to decorate your own application. Read the **full answer** 
  on the <a href="https://discuss.emberjs.com/t/readers-question-when-will-we-be-able-to-use-decorators-in-ember-apps/14583">offical Ember forum</a>.
</div>
<a class="ember-button ember-button--centered href="https://discuss.emberjs.com/t/readers-question-when-will-we-be-able-to-use-decorators-in-ember-apps/14583">Read more</a>

---

That's another wrap!  ✨

Be kind,

Alon Bukai, Amy Lam, Ryan Mark, Ricardo Mendes, Jessica Jordan and the Learning Team
