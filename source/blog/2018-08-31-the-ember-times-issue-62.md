---
title: The Ember Times - Issue No. 62
author: Nick Schot, Frédéric Soumaré, Chris Ng, Alon Bukai, Edward Faulkner, Oli Griffiths, Kenneth Larsen, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/08/31-the-ember-times-issue-62.html"
responsive: true
---

Привет Emberistas! 🐹

Read either on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) what has been going on in Emberland this week.

Have a look into the next year of Ember with the **official 2018 Roadmap RFC** 🌆 and read up on plans for **Module Unification with Ember Addons** 🐹. We also **prompt** ❗️you to check out **Ember CLI Update** for fresh ✨ updates and last, but not least, we have a **brand-new 🔥 Readers' Question** 🌿 in for you this week:

---

## [RFC: Ember 2018 Roadmap 🛣](https://github.com/emberjs/rfcs/pull/364)

[Tom Dale](https://github.com/tomdale) published an [RFC](https://github.com/emberjs/rfcs/pull/364) for the Ember 2018 Roadmap based on the feedback collected from the [#EmberJS2018 call for blog posts](https://www.emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html) earlier this year. Tom identified 3 key goals for Ember in 2018 along with 2 real world use cases to focus on.

### Goals:

**1. Improve communication and streamline decision-making, and empower new leaders.**
Make users feel empowered to become contributors and at the same time expanding and refining the core team structure which includes mentoring new leaders and cross-pollinating knowledge between teams.

**2. Finish the major initiatives that we’ve already started.**
Add extension points to allow popular new tools to be quickly adopted in Ember apps and standardize around ES modules and npm packages to better enable the sharing of Ember tools with the wider JavaScript community.

**3. Ship a new edition, Ember Octane, focused on performance and productivity.**
Tell the story of modern Ember by shipping a new edition of Ember that has compatibility with new JavaScript language features like native classes, decorators, and async functions by default.

### Use Cases:

**1. Productivity apps**
Ember’s historical strength: sophisticated, highly interactive apps that users spend a lot of time in, getting things done.

**2. Content apps**
Text-heavy pages where the first load is critical. In performance-constrained environments, Ember’s strong conventions can help developers build faster apps by default.

Read more in the [rendered pull request on GitHub](https://github.com/emberjs/rfcs/blob/26c4d83fb66568e1087a05818fb39a307ebf8da8/text/0000-roadmap-2018.md).

---

## [RFC: I Promise You It's Good](https://github.com/fivetanley/rfcs/blob/deprecate-promise-object-save/text/0000-ember-data-return-promise-from-ds-model-save.md)
[A new proposal](https://github.com/fivetanley/rfcs/blob/deprecate-promise-object-save/text/0000-ember-data-return-promise-from-ds-model-save.md) by [Stanley Stuart](https://github.com/fivetanley) to return a promise from `DS.Model.save()` is ready for you to read and comment. 

The idea here is to make `DS.Model.save()` return an `RSVP.Promise` instead of a `PromiseObject`. This is to remove the dependency on promise proxies, improve async consistency and enable new functionality in Ember Data. 

The only drawback of this is if you are already relying on this behaviour you’ll probably have to refactor your code to either use patterns like `async/await` or `ember-concurrency`.

[Read the whole proposal](https://github.com/fivetanley/rfcs/blob/deprecate-promise-object-save/text/0000-ember-data-return-promise-from-ds-model-save.md) and share your thoughts.

---

## [Module Unification with Ember Addons](https://github.com/emberjs/rfcs/pull/367) 🎁
[Module Unification Packages](https://github.com/emberjs/rfcs/pull/367) is a new RFC, created by [@mixonic](https://github.com/mixonic), that sets out to describe how Ember apps and addons will migrate to the new [Module Unification](https://github.com/emberjs/rfcs/blob/master/text/0143-module-unification.md) structure from the classic structure. This RFC iterates on and is set to replace another RFC called [Module Unification Namespaces](https://github.com/emberjs/rfcs/pull/309) which had some syntax, like the `::` syntax, that proved problematic.

This RFC proposes to add a new `{{use}}` helper. This helper imports components from an addon into an application's template. This helper provides a subset of the functionality of the JavaScript imports that we are used to, albeit with a slightly different syntax.

An example: In this template the `{{use}}` helper imports a component `Widget` from the `gadget` addon.

```hbs
{{! invokes node_modules/gadget/src/ui/components/Widget/component.js }}

{{use Widget from 'gadget'}}
<Widget @options={{someOptions}} @value={{someValue}} />
```

Something else that is proposed in this RFC is the use of a template `prelude.hbs` that, **at compile time**, will be injected into every template in the app. This can be used to inject global components such as the widely used `{{t 'token'}}` component used for *internationalization*.

Services also get some **love** in this RFC. The suggestion is that all service injections from an addon to an app will need to be explicit about their source package. This results in more verbosity, but also greater clarity and opportunity for optimizations.

An example:

```js
export default Ember.Component.extend({

  // inject src/services/geo.js
  geo: inject(),

  // inject node_modules/ember-stripe-service/src/services/store.js
  checkoutService: inject('stripe', { package: 'ember-stripe-service' }),

  // inject node_modules/ember-simple-auth/src/services/session.js
  session: inject({ package: 'ember-simple-auth' })

});
```

There are also some proposals regarding `owner` APIs such as `owner.lookup()` and `owner.factoryFor()` which have also become more explicit.

All in all this, **very well written**, RFC is a great chance to learn about possible changes to Ember and the Module Unification structure.
If you have any concerns or questions feel free to ask in the [RFC issue](https://github.com/emberjs/rfcs/pull/367) and join in on the conversation by visiting `#st-module-unification` on the Ember.js Community Slack.

This RFC is not complete and is a bit rough around the edges but it is a step in the right direction and will hopefully be finalized soon so that we can start using it in an Ember version in the near future.

---

## [SECTION TITLE](#section-url)


---

## [Prompted To Update ✨](https://twitter.com/kellyselden/status/1034197684595257345)

<img src="/images/blog/emberjstimes/embercliupdate-codemod-prompts.png" alt="Terminal window showing Ember CLI Update's Codemod Prompts, including ember-modules-codemod, ember-qunit-codemod, ember-test-helpers-codemod, es5-getter-ember-codemod, qunit-dom-codemod" />

Your favorite tool for **updating your Ember app**, addon or Glimmer app to any desired version is back again to make your developer life even **easier**: 🌟[**Ember CLI Update**](https://github.com/ember-cli/ember-cli-update) now [offers you dedicated command-line prompts](https://twitter.com/kellyselden/status/1034197684595257345) to apply **as many codemods as you wish**. Simply run `ember-cli-update --run-codemods`, select which codemods to run and upgrade your Ember app to the next level! ⬆️

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


## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/smfoote" target="gh-user">@smfoote</a>, <a href="https://github.com/tomdale" target="gh-user">@tomdale</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/kpfefferle" target="gh-user">@kpfefferle</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/fivetanley" target="gh-user">@fivetanley</a>, <a href="https://github.com/jrjohnson" target="gh-user">@jrjohnson</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/luxferresum" target="gh-user">@luxferresum</a>, <a href="https://github.com/jherdman" target="gh-user">@jherdman</a>, <a href="https://github.com/jlami" target="gh-user">@jlami</a>, <a href="https://github.com/pbishop16" target="gh-user">@pbishop16</a>, <a href="https://github.com/hybridmuse" target="gh-user">@hybridmuse</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/dcombslinkedin" target="gh-user">@dcombslinkedin</a>, <a href="https://github.com/btecu" target="gh-user">@btecu</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/ef4" target="gh-user">@ef4</a>, <a href="https://github.com/hakilebara" target="gh-user">@hakilebara</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/danwenzel" target="gh-user">@danwenzel</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/acorncom" target="gh-user">@acorncom</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/jeffhertzler" target="gh-user">@jeffhertzler</a>, <a href="https://github.com/pablobm" target="gh-user">@pablobm</a>, <a href="https://github.com/cspanring" target="gh-user">@cspanring</a> and <a href="https://github.com/mansona" target="gh-user">@mansona</a> for their contributions to Ember and related repositories 💖!</p>

---

## [Readers' Questions: "Why does Ember use Broccoli and how is it different from Webpack, Rollup, Parcel?"](https://discuss.emberjs.com/t/readers-questions-why-does-ember-use-broccoli-and-how-is-it-different-from-webpack-rollup-parcel/15384)

 <div class="blog-row">
<img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

<p>The JavaScript ecosystem is full of <strong>solutions for packaging JavaScript apps</strong>, like Webpack, Rollup.js and Microbundle among others. But what differentiates one from the other? And what makes Broccoli so special to be part of Ember's build pipeline?</p>

<p>In this week's Readers' Question, Ember Learning Core team member <a href="https://github.com/jessica-jordan" target="jj">@jessica-jordan</a> will highlight the <strong>differences</strong> between some of the most <strong>popular JavaScript bundlers</strong> and explain why Ember CLI embraced <strong>Broccoli</strong> as its tool of choice early on. You can read her <a href="https://discuss.emberjs.com/t/readers-questions-why-does-ember-use-broccoli-and-how-is-it-different-from-webpack-rollup-parcel/15384" target="rq">full answer on the official Ember Forum.</a></p>

<p><a class="ember-button" href="https://discuss.emberjs.com/t/readers-questions-why-does-ember-use-broccoli-and-how-is-it-different-from-webpack-rollup-parcel/15384" target="rq">Read more</a></p>
<br/>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/) on Slack or tweet us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

Nick Schot, Frédéric Soumaré, Chris Ng, Alon Bukai, Edward Faulkner, Oli Griffiths, Kenneth Larsen, Jessica Jordan and the Learning Team
