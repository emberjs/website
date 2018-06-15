---
title: The Ember.js Times - Issue No. 51
author: Gaurav Munjal, Melanie Sumner, Miguel Braga Gomes, Sivakumar Kailasam, Kenneth Larsen, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, 2018
alias : "blog/2018/06/15/the-emberjs-times-issue-51.html"
responsive: true
---

העלא Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/06/15/the-emberjs-times-issue-51.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/06/15/issue-51) what has been going on in Emberland this week.
We have a reminder for a RFC (Request for Comments) which has entered its **Final Comment Period (FCP)**,
as well as a look into the **Future of Ember** and an **engine**-powered **Roadmap** highlight for you.

This is what's happened in Emberland this week 🐹:

---

## [Back To the Future 🤖✨](https://github.com/rwjblue/ember-named-arguments-polyfill)
Another polyfill that is now available is [ember-named-arguments-polyfill](https://github.com/rwjblue/ember-named-arguments-polyfill) which polyfills the named arguments feature to work for Ember 2.10+.

This is helpful for add-on authors who want to leverage the named arguments feature for a cleaner template. So, components receiving an argument named `foo` can now do:
`{{@foo}}`. This allows you to easily distinguish arguments from local variables, computed properties and such.

Named arguments already landed in [Ember 3.1](https://www.emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_named-arguments-1-of-4) so this polyfill is for anyyone who didn't upgrade but still wants to use the feature.

---

## [The Future of Ember is now](https://blog.usejournal.com/emberjs2018-my-safari-into-the-future-e4f31a4902ea)

Quite recently **a plethora of RFCs (Request for Comments)** proposed ground-breaking, **new
features** for Ember. These included the proposals for [ES5 Getters](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md) and [named arguments for Components](https://github.com/emberjs/rfcs/blob/master/text/0276-named-args.md) which already found their way into the **previous 3.1 release** in a [stable fashion](https://www.emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_changes-in-ember-js-3-1).
But what about all the other cool things that we mentioned in previous editions of the Ember Times?
When are all of these proposal finally gonna land?

Features which haven't found their way into a stable release and have not been recommended by the [official Guides](https://github.com/ember-learn/guides-app) yet,
might in fact have landed already. Like a hidden gem they just sit there for a while, only noticed by a few,
but still ready to be tested and improved until they make it into a stable release.
And so it seems some of the most exciting API changes in Ember this year have still **gone unnoticed**:
But [AngleBracketComponents](#toc_a-href-https-github-com-rwjblue-ember-named-arguments-polyfill-back-to-the-future-a),
ES6 Classes, the new folder structure à la Module Unification and even Glimmer Components can be used in Ember apps today -
with a little help from feature flags, canary releases and the Ember addon ecosystem.

But **how** do you make the future of Ember happen in your apps today? If you're wondering about that, check out [this excellent How-To](https://blog.usejournal.com/emberjs2018-my-safari-into-the-future-e4f31a4902ea) by [@chrism](https://github.com/chrism/),
a **step-by-step guide** for those who want to **try out the future of Ember** in their applications.
Because you don't have to wait for the future of Ember until another day; the future of Ember is **now**.

<a class="ember-button ember-button--centered" href="https://blog.usejournal.com/emberjs2018-my-safari-into-the-future-e4f31a4902ea" target="futureofember">See It in Action</a>

---

## [Is Your Component Not Pointy Enough? 👈](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill)

[ember-angle-bracket-invocation-polyfill](https://github.com/rwjblue/ember-angle-bracket-invocation-polyfill) provides a polyfill for **angle bracket invocation syntax** as described in [RFC #311](https://github.com/emberjs/rfcs/pull/311).
It includes features such as invoking components via angle brackets using _TitleCase_, self-closing syntax, paths and much more.

If you’re interested in using this, the best documentation is [the RFC itself](https://emberjs.github.io/rfcs/0311-angle-bracket-invocation.html).

---

## [Start the Engine and Go for 1.0 🏍](https://discuss.emberjs.com/t/engines-1-0-roadmap/14914)

This week [the long-awaited Roadmap](https://discuss.emberjs.com/t/engines-1-0-roadmap/14914) leading to the **first major release of Ember Engines** has been published. It includes **a to-do list** of features and improvements that are required to land before a _v1.0_ becomes reality,
including support for loading route-less engines lazily and a refactor of the build pipeline to be powered by the [upcoming Packager feature in Ember CLI](https://github.com/ember-cli/rfcs/blob/master/active/0051-packaging.md).

If you're a user of Ember Engines yourself, be sure to not only join the [discussion on the Ember Forum](https://discuss.emberjs.com/t/engines-1-0-roadmap/14914),
but also **provide** the necessary **feedback** on [how you are using Ember Engines](https://airtable.com/shrZ4fnIa6ayNinHH)
to make the 1.0 Roadmap a real success. ✨

---

## [New release of Ember Twiddle](https://ember-twiddle.com)

**Ember Twiddle v0.14.0** was released on Monday, June 4. It includes support for Ember 2.18, Babel 6, and new module imports.
The entire [changelog](https://github.com/ember-cli/ember-twiddle/releases/tag/v0.14.0) shows all the work that has gone into this.
The next version is also being worked on, supporting Ember 3.0 - Ember 3.2.
You can **test out the new version** at [canary.ember-twiddle.com](https://canary.ember-twiddle.com) today.
Ember Twiddle is a **playground website** for developing small Ember applications backed by Github gists.

---

## [It's visibly time to deprecate isVisible 👀](https://github.com/emberjs/rfcs/pull/324)

A new RFC has been posted on deprecating `Component#isVisible`. The motivation is related to the confusion associated to setting the isVisible property on a component. Also, modern Ember applications are already avoiding using isVisible in favor of simpler conditionals in the template. Given that `Component#isVisible` is a public API, deprecating now would schedule for removal in the next major version release (4.0).

No sweat, other options are still available to hide elements, such as:

- `<div hidden={{boolean}}></div>`
- Wrapping the component in a template conditional `{{#if}}` statement.
- Using the Component's `classNames` and `classNameBindings`

A heads-up that this RFC has entered the FCP (Final Comment Period), so this week might be your last chance to comment on it!

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/xg-wang" target="gh-user">@xg-wang</a>, <a href="https://github.com/alexmasita" target="gh-user">@alexmasita</a>, <a href="https://github.com/Serabe" target="gh-user">@Serabe</a>, <a href="https://github.com/sandydoo" target="gh-user">@sandydoo</a>, <a href="https://github.com/mdbiscan" target="gh-user">@mdbiscan</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/andreavaghi" target="gh-user">@andreavaghi</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/nataliemok" target="gh-user">@nataliemok</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/pablobm" target="gh-user">@pablobm</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/kevinansfield" target="gh-user">@kevinansfield</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/mmun" target="gh-user">@mmun</a>, <a href="https://github.com/lbdm44" target="gh-user">@lbdm44</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/chrism" target="gh-user">@chrism</a>, <a href="https://github.com/givanse" target="gh-user">@givanse</a>, <a href="https://github.com/thoov" target="gh-user">@thoov</a>, <a href="https://github.com/cyk" target="gh-user">@cyk</a>, <a href="https://github.com/NullVoxPopuli" target="gh-user">@NullVoxPopuli</a>, <a href="https://github.com/dnachev" target="gh-user">@dnachev</a>, <a href="https://github.com/gokatz" target="gh-user">@gokatz</a>, <a href="https://github.com/knownasilya" target="gh-user">@knownasilya</a>, <a href="https://github.com/acorncom" target="gh-user">@acorncom</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/antidis" target="gh-user">@antidis</a>, <a href="https://github.com/dctalbot" target="gh-user">@dctalbot</a>, <a href="https://github.com/joehany" target="gh-user">@joehany</a>, <a href="https://github.com/rodrigoyoshida" target="gh-user">@rodrigoyoshida</a>, <a href="https://github.com/MattSwanson" target="gh-user">@MattSwanson</a> and <a href="https://github.com/progand" target="gh-user">@progand</a> for their contributions to Ember and related repositories! 💕
</p>

---

## [More Q&A for Readers' Questions 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>With core team efforts focusing in on important bug fixes for Ember itself, we want to take the chance to recap some of the <strong>previous, great answers</strong> to previous, <strong>great questions</strong> by Ember.js Times readers:</p>

  <ul>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-is-it-bad-to-load-data-in-components/14521" target="rquestion">Readers’ Questions #6: “Is it bad to load data in components?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-when-will-we-be-able-to-use-decorators-in-ember-apps/14583" target="rquestion">Readers’ Questions #7: “When will we be able to use decorators in Ember apps?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-why-does-ember-still-use-rsvp/14736" target="rquestion">Readers’ Questions #8: “Why does Ember still use RSVP?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-id-like-to-contribute-to-ember-how-can-i-get-started/14915" target="rquestion">Readers’ Questions #9: “I’d like to contribute to Ember. How can I get started?”</a></li>
  </ul>
</div>


<div class="blog-row">
  <p><strong>Submit your own</strong> short and sweet <strong>question</strong> at <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>
</div>

## [The Ember Times is What We Make It 🙌](https://the-emberjs-times.ongoodbits.com/)

The **Ember Times** is a **weekly news editorial** featuring all the new things that are going on in Emberland.
[Subscribe to our e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) to get the next edition **right to your inbox**.
If you ❤️ what you're reading and you feel like a **writer** at heart,
drop by [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/convo/C4TD5JJ7R-1497022015.688894/) on the Ember Community Slack Chat to join the discussion or even **become the co-author** of a future edition!


---


That's another wrap!  ✨

Be kind,

Gaurav Munjal, Melanie Sumner, Miguel Braga Gomes, Sivakumar Kailasam, Kenneth Larsen, Jessica Jordan and the Learning Team
