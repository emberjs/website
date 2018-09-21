---
title: The Ember Times - Issue No. 65
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/09/21-the-ember-times-issue-65.html"
responsive: true
---

Ahoj Emberistas! 🐹

In this week's edition we're sharing news about a fresh 🥒  RFC to deprecate `.property()`, exciting addon updates 🚀 for sparkles-component and ember-css-modules, and how Ember is a modern framework 🎉 - tell your friends! 

---

## [Deprecate All the Property 🏠 Modifiers ](https://github.com/emberjs/rfcs/pull/375)

Remember `.property()`?

```js
fullName: computed(function() {
  // ...
}).property('firstName', 'lastName'),
```

This **modifier** for **computed properties** in Ember has been around for quite a while.
And even though computed properties have already allowed to pass in dependent keys as an argument directly, e.g....

```js
fullName: computed('firstName', 'lastName', function() {
  // ...
}),
```

...the modifier hasn't been deprecated yet. The main obstacle for the deprecation has been
the one valid use of `.property()`: It is required for cp macros, such as `filter` or `map` which receive a callback function as their argument.

A **brand-new 🔥 Request for Comments (RFC)** 🚒 proposes to transition away from the usage of `.property` for these macros to allow the deprecation of the otherwise redundant API. Curious readers can **learn more** about the motivation and the design of this move [in the original proposal](https://github.com/pzuraq/emberjs-rfcs/blob/deprecate-computed-property-modifier/text/0000-deprecate-computed-property-modifier.md).

---

## [Published sparkles-component 1.1.0 ✨](https://twitter.com/rwjblue/status/1042162296854925314)

[@rwjblue](https://github.com/rwjblue) released version 1.1.0 of the [sparkles-component](https://github.com/rwjblue/sparkles-component) which includes [TypeScript](https://www.typescriptlang.org/) conversion of the library.

<!--alex ignore hooks destroy-->
The sparkles-component is an addon used to experiment with [glimmer component](https://github.com/glimmerjs/glimmer.js/tree/master/packages/%40glimmer/component) style APIs in Ember apps via existing public APIs. It supports most of the `@glimmer/component` API including lifecycle hooks (constructor, didInsertElement, didUpdate, destroy), @tracked properties, ES base class, and decorator support (with the release of 1.1.0, this supports consuming via TypeScript).

To learn more, [@rwjblue](https://github.com/rwjblue) together with [@mike-north](https://github.com/mike-north) live streamed converting the library from JavaScript to TypeScript. You can watch the [live replay on Twitch](https://www.twitch.tv/videos/311556611).

---

## [Ember Is a Modern Framework, Tell Your Friends 😄](https://dev.to/nullvoxpopuli/the-emberjs-of-the-future-today-12c)

<!--alex ignore hooks destroy-->
Community member [@NullVoxPopuli](https://github.com/NullVoxPopuli) has written a summary of a set of his favorite features that showcase how Ember is a modern framework, and can be attractive to people looking for all the shiny things. Check out [The EmberJS of the future... today!](https://dev.to/nullvoxpopuli/the-emberjs-of-the-future-today-12c) where he discusses async lifecycle hooks, syntax for components, testing, dependency injection, keyboard accessibility and more.

---

## [Boston-Built ember-css-modules 1.0 AKA "The Big Dig" Is Here 🏗](https://twitter.com/__dfreeman/status/1042837440417988610)

[salsify/ember-css-modules](https://github.com/salsify/ember-css-modules) has launched a 1.0 thanks to bug reports, feature ideas and pull requests from the community over the past couple years! ember-css-modules provides Ember-flavored support for [CSS Modules](https://github.com/css-modules/css-modules). With the addon, styling is a first-class citizen alongside templates and JavaScript, with one CSS file per component.

---

## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/anehx" target="gh-user">@anehx</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/balinterdi" target="gh-user">@balinterdi</a>, <a href="https://github.com/pixelhandler" target="gh-user">@pixelhandler</a>, <a href="https://github.com/dcyriller" target="gh-user">@dcyriller</a>, <a href="https://github.com/dcombslinkedin" target="gh-user">@dcombslinkedin</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/SparshithNR" target="gh-user">@SparshithNR</a>, <a href="https://github.com/quajo" target="gh-user">@quajo</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/smfoote" target="gh-user">@smfoote</a>, <a href="https://github.com/EndangeredMassa" target="gh-user">@EndangeredMassa</a>, <a href="https://github.com/jfdnc" target="gh-user">@jfdnc</a> and <a href="https://github.com/adityasrini" target="gh-user">@adityasrini</a> for their contributions to Ember and related repositories 💖!</p>

---

## [Got a Question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at #support-ember-times on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

Keep on top of what's been going on in Emberland this week by subscribing to our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/)! You can also find our posts on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html).

---


That's another wrap! ✨

Be kind,

Chris Ng, L. Preston Sego III, Amy Lam, Ryan Mark, Jessica Jordan and the Learning Team
