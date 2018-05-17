---
title: The Ember.js Times - Issue No. 47
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/05/18/the-emberjs-times-issue-47.html"
responsive: true
---

여보세요 Emberistas!

Again you can enjoy reading the Ember.js Times in both the [e-mail](https://the-emberjs-times.ongoodbits.com/2018/05/18/issue-47) and the [blog format](https://emberjs.com/blog/2018/05/18/the-emberjs-times-issue-47.html) to share it even better with your Ember friends.

....more intro

---

## [EMBER THINGS 🐹](#your-url-here)

---

## [EMBER DATA THINGS](#your-url-here)

- new RFC here: https://github.com/emberjs/rfcs/pull/332


---

## [EMBER LEARN THINGS](#your-url-here)

12 months in a year. 12 eggs in a dozen. 12 days to submit your blog posts for the [#EmberJS2018 Roadmap RFC](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html)! 📝

Need to beat writer's block? Listen to Ember Core team member [Chad Hietala](https://github.com/chadhietala) on The Changelog podcast, discussing [Ember four years later](https://changelog.com/podcast/293). And you can peruse blog posts from the community on [@zinyado's repo](https://github.com/zinyando/emberjs2018-posts) or the [#EmberJS2018 hashtag](https://twitter.com/search?q=%23EmberJS2018) on Twitter. Get your two cents in by May 30th.

---

## [RFC for removing `Ember.Evented`](https://github.com/emberjs/rfcs/pull/329)
There's an [RFC](https://github.com/emberjs/rfcs/pull/329) on removing usage of the `Ember.Evented` mixin in Ember Data specifically. This would also lead to the future removal of several lifecycle hooks and methods on `Model`s and other Ember Data classes. The use of `Ember.Evented` is mostly a legacy from pre 1.0 of Ember Data and is simply not needed anymore. You can follow the discussion and read all about the implications of this change on the [RFC pull request.](https://github.com/emberjs/rfcs/pull/329)

---

## [Recasting Call 🎬 for Templates](https://github.com/ember-template-lint/ember-template-recast)

Are you an Ember addon author who wants to be able to change the template of host apps? Or are you an Ember developer who tinkers with templates or template-related codemods? Then, the new Ember addon [ember-template-recast](https://github.com/ember-template-lint/ember-template-recast) is just for you.
Ember Template Recast allows you to transform templates easily in a non-destructive manner - this means, that you can modify specific parts of your templates while preserving formatting like whitespaces and linebreaks from your original template at the same time.

The `templateRecast` API is almost as straightforward as an `ember install`. Check it out:

```
const anExampleTemplate = `
{{list-item
  title="Ember"
}}`;

// create an abstraction of your template (AST)
let ast = templateRecast.parse(anExampleTemplate);

// modify your template
ast.body[0].hash[0].key = 'header';
ast.body[0].hash[0].value += ' is awesome';

// reprint your AST...
templateRecast.print(ast);

/* ...to return your modified template, formatting included 💁🏻
	{{list-item
	  header="Ember is awesome"
	}}
*/
```

Try it out [here](https://github.com/ember-template-lint/ember-template-recast) and transform your templates today ✨

---

## [SOMETHING ELSE HERE](#your-url-here)


---

## [SOMETHING ELSE HERE](#your-url-here)


---

## [Contributors' Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)


---

## [Readers’ Questions: “....”](#praying-for-a-question)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>...</p>

</div>

<div class="blog-row">
<a class="ember-button ember-button--centered" href="#">Read more</a>
</div>

**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core). And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

the crowd
