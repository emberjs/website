---
title: The Ember Times - Issue No. XX
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/xxxx/xx/xx-the-ember-times-issue-XX.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

Read either on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) what has been going on in Emberland this week.

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

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

## [Module Unification with Ember Addons](https://github.com/emberjs/rfcs/pull/367) 🎁
[Module Unification Packages](https://github.com/emberjs/rfcs/pull/367) is a new RFC, created by [@mixonic](https://github.com/mixonic), that sets out to describe how packages, **Ember Addons**, work and how apps and addons will migrate to the new [Module Unification](https://github.com/emberjs/rfcs/blob/master/text/0143-module-unification.md) structure from the classic structure. This RFC iterates on and is set to replace another RFC called [Module Unification Namespaces](https://github.com/emberjs/rfcs/pull/309) which had some syntax, like the `::` syntax, that proved problematic.

This RFC proposes to add a new `{{use}}` helper that will be used to call external components that are provided by addons. This helper is a subset of the javascript imports that we are used to. 

An example: In this template the `{{use}}` helper imports a component `Widget` from the `gadget` addon.

```hbs
{{! invokes node_modules/gadget/src/ui/components/Widget/component.js }}

{{use Widget from 'gadget'}}
<Widget @options=someOptions @value=someValue />
```

Something else that is proposed in this RFC is the use of a template `prelude.hbs` that, **at compile time**, will be injected into every template in the app. This can be used to inject global components such as the widely used `{{t 'token'}}` component used for *internationalization*. 

Services also get some **love** in this RFC. The suggestion is that all service calls to addons will become more verbose in that the injected service will need to provide where to inject from. 

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

There is also some proposals regarding `owner` APIs such as `owner.lookup()` and `owner.factoryFor()` which have also become more explicit.

All in all this, **very well written**, RFC is a great chance to learn about possible changes to Ember and the Module Unification structure.
If you have any concerns or questions feel free to ask in the [RFC issue](https://github.com/emberjs/rfcs/pull/367) and join in on the conversation.

This RFC is not complete and is a bit rough around the edges but it is a step in the right direction and will hopefully be finalized soon so that we can start using it in an Ember version in the near future.

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

## [SECTION TITLE](#section-url)


---

## [SECTION TITLE](#section-url)


---


## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank our siblings for their contributions to Ember and related repositories 💖!</p>

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/) on Slack or tweet us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

the crowd and the Learning Team
