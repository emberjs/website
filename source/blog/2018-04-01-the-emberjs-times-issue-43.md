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

## [Time to get your Ember release the ES5 way](/blog/2018/04/13/ember-3-1-released.html)

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

## Slack Stars
Ember Times would like to give a shoutout to <a href="https://github.com/runspired">@runspired</a> (Chris Thoburn), for being incredibly helpful and responsive in a majority of the Slack channels this last week. Chris is major contributor to the ember ecosystem and an integral part of the ember-data subteam.  He has been super supportive in helping community members migrate through the many versions of Ember data from 2.12 all the way to 3.2.0-beta.2.  Additionally Chris shares his intimate knowledge of the ember-data internals to make it easier for everyone to understand why things work in a particular way and to also shed some light on how ember-data will work in the future.  Thanks @runspired!

## We love Ember Times
Do you? If so, contribute!  [Ember Times](https://embercommunity.slack.com/channels/topic-embertimes) is always looking for people to help spread the word about all things Ember.  Drop by the Slack channel to say "hi!" and learn how to get started.        

## [Readers' Questions: When and how will we be able to use decorators in Ember apps?](https://discuss.emberjs.com/t/readers-question-when-will-we-be-able-to-use-decorators-in-ember-apps/14583))

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />
  <p>In this week's <strong>brand new</strong> Readers’ Question it's all about the new and cool and shiny that will
  be coming to your Ember apps soon: When will we be able to make use of the <strong>decorator syntax</strong> when writing Ember apps?
  </p>
 <p>In his detailed write-up <a href="https://github.com/pzuraq">@pzuraq</a> will answer everything you need to know about the current state of the decorators
  proposal itself and when you will be able to decorate your own application. Read the <strong>full answer</strong>
  on the <a href="https://discuss.emberjs.com/t/readers-question-when-will-we-be-able-to-use-decorators-in-ember-apps/14583">offical Ember forum</a>.
</div>
<a class="ember-button ember-button--centered href="https://discuss.emberjs.com/t/readers-question-when-will-we-be-able-to-use-decorators-in-ember-apps/14583">Read more</a>

---

## [Contributor's Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

<div  class="blog-row">
 <p>
  A shout out to all the amazing contributors who worked on Ember core projects this week:
  <a href="https://github.com/Dhaulagiri" target="gh-user">@Dhaulagiri</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/GavinJoyce" target="gh-user">@GavinJoyce</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/ctrlaltjustine" target="gh-user">@ctrlaltjustine</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/jheth" target="gh-user">@jheth</a>, <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>, <a href="https://github.com/EndangeredMassa" target="gh-user">@EndangeredMassa</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/efx" target="gh-user">@efx</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/Bestra" target="gh-user">@Bestra</a>, <a href="https://github.com/sdhull" target="gh-user">@sdhull</a>, <a href="https://github.com/karan-pathak" target="gh-user">@karan-pathak</a>, <a href="https://github.com/itzsaga" target="gh-user">@itzsaga</a>, <a href="https://github.com/jonnii" target="gh-user">@jonnii</a>, <a href="https://github.com/ajcolter" target="gh-user">@ajcolter</a>, <a href="https://github.com/strout" target="gh-user">@strout</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/lennyburdette" target="gh-user">@lennyburdette</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/arthirm" target="gh-user">@arthirm</a>, <a href="https://github.com/eliasmelgaco" target="gh-user">@eliasmelgaco</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/williamhaley" target="gh-user">@williamhaley</a>, <a href="https://github.com/rmminusrfslash" target="gh-user">@rmminusrfslash</a>, <a href="https://github.com/san650" target="gh-user">@san650</a> and <a href="https://github.com/mansona" target="gh-user">@mansona</a>.
  A warm thank you for all your efforts! ❤️
 </p>
</div>

---

That's another wrap!  ✨

Be kind,

Kenneth Larsen, Chris Garrett, Alon Bukai, Amy Lam, Ryan Mark, Ricardo Mendes, Jessica Jordan and the Learning Team

[Say More]: https://youtu.be/qfnkDyHVJzs?t=5h39m15s
