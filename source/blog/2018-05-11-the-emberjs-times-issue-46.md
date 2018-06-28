---
title: The Ember Times - Issue No. 46
author: Gaurav Munjal, Edward Faulkner, Sivakumar Kailasam, Kenneth Larsen, Amy Lam, Jessica Jordan
tags: Newsletter, Ember.js Times, 2018
alias : "blog/2018/05/11/the-emberjs-times-issue-46.html"
responsive: true
---

හෙලෝ Emberistas!

Again you can enjoy reading The Ember Times in both the [e-mail](https://the-emberjs-times.ongoodbits.com/2018/05/11/issue-46) and the [blog format](https://emberjs.com/blog/2018/05/11/the-emberjs-times-issue-46.html) to share it even better with your Ember friends.

This week we'll highlight a new RFC deprecating features from ancient The Ember Times and a sweet reminder for blogging about your best wishes for Ember and - last, but not least - we have a brand-new Readers' Question❓✨ for you!

---

## [Moar #EmberJS2018 blog posts wanted!](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html)

<div class="blog-row">
  <img class="float-left small transparent padded" alt="Original Tomster Mascot Image" title="Tomster loves your blog posts about Ember.js" src="/images/tomsters/original.png" />

  <p>We've already seen a lot of thoughtful blog posts from the Ember team's <a href="https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html" target="cta-blogs">call for community blog posts</a>. But we're hoping for more! Have something to say?</p>

<p>Write a blog post by <strong>May 30th</strong> to propose goals and direction for Ember in the remainder of 2018. The content of these posts will help the core team to draft their first Roadmap RFC.</p>
</div>

Looking for inspiration? Check out the [#EmberJS2018 hashtag](https://twitter.com/search?q=%23EmberJS2018) on Twitter or [@zinyado's repo collecting posts](https://github.com/zinyando/emberjs2018-posts) on GitHub.

---

## [Global resolution and more for Ember 🐹](https://github.com/emberjs/rfcs/pull/331)

[@Gaurav0](https://github.com/Gaurav0) has submitted an RFC to finally **deprecate the Globals resolver** and the related API. The Globals resolver is primarily a holdover from the early days of Ember when people used Ember without Ember CLI.

The API allowed the creation of an `App` global like this:

```
// app.js
var App = Ember.Application.create();
```

and the further setup of your Ember app based off this global:

```
// app.js
App.Router.map(function() {
  this.route('about');
});

App.AboutRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
```

Using Ember CLI as the build tool for Ember apps has been recommended for years and is widely adopted in the community. Yet, if you're an active user of the Globals resolver API you should definitely give the [original proposal for deprecating it](https://github.com/emberjs/rfcs/pull/331) a read and leave your thoughts on its use cases in the comments.


Furthermore, contributors to Ember this week worked on preventing memory leaks in tests ([1](https://github.com/emberjs/ember.js/pull/16620), [2](https://github.com/emberjs/ember-qunit/pull/328)), nifty bug fixes ([3](https://github.com/emberjs/ember.js/pull/16615), [4](https://github.com/emberjs/ember.js/pull/16613)) and more internal and devops-driven improvements ([5](https://github.com/emberjs/ember.js/pull/16617), [6](https://github.com/emberjs/ember.js/pull/16616), [7](https://github.com/emberjs/ember.js/pull/16582)).

---

## [Get involved with the new Ember guides](https://emberguides.stonecircle.io/release/)
The Learning Team has been working on a new and improved version of the Guides app. It's now made with Ember.js and is more shiny than ever. The Guides app is almost ready for a proper release, but before we do so, we would love for you to [try it out](https://emberguides.stonecircle.io/release/). If you find any issues then please [report them](https://github.com/ember-learn/guides-app/issues).

Or if you feel in a particulary good mood, look through existing issues in the [Guides app](https://github.com/ember-learn/guides-app/issues) or the [Guides source](https://github.com/ember-learn/guides-source/issues) and start contributing to the new guides.

---

## [Contributors' Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

Many thanks to <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/chancancode" target="gh-user">@chancancode</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/dfreeman" target="gh-user">@dfreeman</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a> and <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a> for contributing to Ember core projects this week. 💖

---

## [Readers’ Questions: “Why does Ember still use RSVP?”](https://discuss.emberjs.com/t/readers-questions-why-does-ember-still-use-rsvp/14736)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>This week's Readers’ Question revolves around Promises: Why does Ember ship with <code>RSVP.Promise</code> by default and why would it not rely on a regular Promise polyfill instead?</p>

<p>In his detailed write-up, Ember Core team member <a href="https://github.com/ef4" target="gh-user">@ef4</a> will answer everything you need to know about the origin of <code>RSVP</code> in Ember, what it has been and still is used for and if Ember will be going all in regarding native Promises in the future.
You can read <a href="https://discuss.emberjs.com/t/readers-questions-why-does-ember-still-use-rsvp/14736" target="embertimesq">the full answer</a> on the offical Ember forum.</p>
</div>

<div class="blog-row">
<a class="ember-button ember-button--centered" href="https://discuss.emberjs.com/t/readers-questions-why-does-ember-still-use-rsvp/14736" target="embertimesq">Read more</a>
</div>

**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core). And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

Gaurav Munjal, Edward Faulkner, Sivakumar Kailasam, Kenneth Larsen, Amy Lam, Jessica Jordan and the Learning Team
