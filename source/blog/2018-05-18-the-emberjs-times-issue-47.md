---
title: The Ember Times - Issue No. 47
author: Tobias Bieniek, Robert Jackson, Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Ryan Mark, Jessica Jordan
tags: Newsletter, Ember.js Times, 2018
alias : "blog/2018/05/18/the-emberjs-times-issue-47.html"
responsive: true
---

안녕하세요 Emberistas!

Again you can enjoy reading The Ember Times in both the [e-mail](https://the-emberjs-times.ongoodbits.com/2018/05/18/issue-47) and the [blog format](https://emberjs.com/blog/2018/05/18/the-emberjs-times-issue-47.html) to share it even better with your Ember friends.

This week we have **several RFCs** from the Ember Data 📟 project for you, as well as an **#EmberJS2018 countdown**, a new way to cast some **template transform magic** 🎩 and a recap of what has happened in Readers' Questions for you:

---

## [Meta and Link all the Things in Ember Data 🐹](https://github.com/emberjs/rfcs/pull/332)

This backwards compatible Request for Comments (RFC) allows `ember-data` users to associate optional `meta` and `links` on **records** alongside the top-level document `meta` (mandatory) and `links` (optional).  Sadly, `ember-data` currently stores this information only on relationships and not individual records.  

The RFC design is pretty straightforward and proposes that all `meta` and `links`:

- will be honored in any resource that is part of a [JSON API compliant](http://jsonapi.org/) document
- when defined on resource identifiers (e.g. links inside a relationhip that link to other resources) will be ignored
- when defined on relationship objects will continue to function as they do today
- will be exposed as getters on instances of `DS.Model` and will default to null if nothing has been provided

Similarly, `meta` and `links` will be exposed on instances of `DS.Snapshot`. Although `meta` and `links` are getters on `DS.Model`s, they will be exposed on `DS.Snapshot` as methods:

```js
class Snapshot {
    links() {}
	meta() {}
}
```

Interestingly, some apps have inadvertently achieved what this RFC purposes by moving `meta` and `links` into `attributes` during serialization and then exposing each of them via `DS.attr`. 
Therefore, this RFC gives `ember-data` an even more **complete "out of the box experience"** and will likely be a very welcomed addition to the library.  

Think differently? Tell [@runspired](https://github.com/runspired) what you think on the [original proposal](https://github.com/emberjs/rfcs/pull/332).

---

## [Only 12 more days of #EmberJS2018 ✍️💨](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html)

12 months in a year. 12 eggs in a dozen. 12 days to submit your blog posts for the [#EmberJS2018 Roadmap RFC](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html)! 📝

Need to beat writer's block? Listen to Ember Core team member [Chad Hietala](https://github.com/chadhietala) on The Changelog podcast, discussing [Ember four years later](https://changelog.com/podcast/293). And you can peruse blog posts from the community on [@zinyado's repo](https://github.com/zinyando/emberjs2018-posts) or the [#EmberJS2018 hashtag](https://twitter.com/search?q=%23EmberJS2018) on Twitter. Get your two cents in **by May 30th**.

---

## [More Ember Data: RFC for removing `Ember.Evented`](https://github.com/emberjs/rfcs/pull/329)

There's an RFC on removing usage of the `Ember.Evented` mixin in Ember Data specifically. This would also lead to the future **removal** of several **lifecycle hooks** and methods on `Model`s and other Ember Data classes.

The use of `Ember.Evented` is mostly a legacy from pre 1.0 of Ember Data and is simply not needed anymore. 
You can **follow the discussion** and read all about the implications of this change on the [RFC pull request](https://github.com/emberjs/rfcs/pull/329).

---

## [Recasting Call 🎬 for Templates](https://github.com/ember-template-lint/ember-template-recast)

<div class="blog-row">
  <img class="float-left small transparent padded" alt="Handlebars Logo Fading" title="Handlebars" src="/images/about/handlebars_fade.png" />

<p>Are you an Ember addon author who wants to be able to <strong>transform the template</strong> of host apps? Or are you an Ember developer who tinkers with templates or template-related codemods? Then, the new Ember addon <a href="https://github.com/ember-template-lint/ember-template-recast" target="recast">ember-template-recast</a> is just for you.</p>

<p>Ember Template Recast will allow you to transform templates easily in a <strong>non-destructive manner</strong> - this means, that you can modify specific parts of your templates while preserving everything else - incl. whitespace formatting and linebreaks - from your original template.</p>
</div>

The `templateRecast` API offers you methods for creating abstract syntax trees (AST) from your templates and vice versa and a way to [traverse](https://github.com/ember-template-lint/ember-template-recast#traverse) your templates and modify them along the way.

See it in action:

```js
const { transform } = require('ember-template-recast');

const template = `
{{my-component
  title="I less than 3 ember-template-recast"
}}
`;

let { code } = transform(template, env => {
  let { builders: b } = env.syntax;

  return {
    MustacheStatement() {
      return b.mustache(b.path('wat-wat'));
    },
  };
});

// ...et voilà, enjoy a modified template string 💁🏻
console.log(code); // => {{wat-wat}}
```

<p>The project is still cutting-edge experimental 👨🏾‍🔬, <del> but </del> and therefore pretty exciting! Try it out for yourself <a href="https://github.com/ember-template-lint/ember-template-recast" target="recast">here</a> and transform your templates today.✨</p>

---

## [Contributors' Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

<p>A big thank you goes to the people who contributed to Ember core projects this week: <a href="https://github.com/csantero" target="gh-user">@csantero</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/miguelcobain" target="gh-user">@miguelcobain</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/jimenglish81" target="gh-user">@jimenglish81</a>, <a href="https://github.com/josemarluedke" target="gh-user">@josemarluedke</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/dcombslinkedin" target="gh-user">@dcombslinkedin</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/efx" target="gh-user">@efx</a> and <a href="https://github.com/mansona" target="gh-user">@mansona</a>. 💕</p>


---

## [More Questions & more Answers for Readers' Questions](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>With learning team efforts concentrating on 🚢 something pretty exciting very soon,
  we want to take the chance to recap some of the previous, great answers to previous, great questions by Ember.js Times readers:</p>

  <ul>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-is-it-bad-to-load-data-in-components/14521" target="readersq">
    Readers’ Questions #6: “Is it bad to load data in components?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-when-will-we-be-able-to-use-decorators-in-ember-apps/14583" target="readersq">
    Readers’ Questions #7: “When will we be able to use decorators in Ember apps?”</a></li>
    <li><a href="https://discuss.emberjs.com/t/readers-questions-why-does-ember-still-use-rsvp/14736" target="readersq">
    Readers’ Questions #8: “Why does Ember still use RSVP?”</a></li>
  </ul>

</div>

**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core). And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

Tobias Bieniek, Robert Jackson, Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Ryan Mark, Jessica Jordan and the Learning Team
