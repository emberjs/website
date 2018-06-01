---
title: The Ember.js Times - Issue No. 48
author: Miguel Gomes, Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Jessica Jordan, Jen Weber
tags: Newsletter, Ember.js Times, 2018
alias : "blog/2018/05/25/the-emberjs-times-issue-48.html"
responsive: true
---

你好 Emberistas!

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/05/25/the-emberjs-times-issue-48.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/05/25/issue-48) what has been going on in Emberland this week: We have some news for Ember CLI **bundled up** for you, as well as **documentation highlights** from the folks from `ember-cli-addon-docs`, a final reminder to hand in your Ember **Roadmap blog post** and a pretty big announcement from the Learning Team for you! 🙆🏾

---

## [What is your wish for Ember in 2018?🌟](https://emberjs.com/blog/2018/05/02/ember-2018-roadmap-call-for-posts.html)
There’s a week left of the Ember’s 2018 call for blog posts. There’s already been a lot of great blog posts from the community, but we’re hoping for more!

Write a blog post by **May 30th** to propose goals and direction for Ember in the remainder of 2018. The content of these posts will help the core team to draft their first Roadmap RFC.

Looking for inspiration? Check out the [#EmberJS2018 hashtag](https://twitter.com/search?q=%23EmberJS2018) on Twitter or [@zinyado’s repo collection posts](https://github.com/zinyando/emberjs2018-posts) on GitHub.


---

## [A Package out for delivery to Ember CLI 📦♥︎🐹](https://github.com/ember-cli/ember-cli/pull/7826)

Recently, lots of work has landed 🛬 in Ember CLI to bring the long-awaited **Packager feature** to life ([1](https://github.com/ember-cli/ember-cli/pull/7826), [2](https://github.com/ember-cli/ember-cli/pull/7818), [3](https://github.com/ember-cli/ember-cli/pull/7816), [4](https://github.com/ember-cli/ember-cli/pull/7796), [5](https://github.com/ember-cli/ember-cli/pull/7788)). The Packager will increase the **flexibility** of Ember's **build pipeline**, paving the way for other neat features like code splitting and tree shaking and finally allowing developers to further reduce the filesize of their applications by dramatic amounts.

Want a recap of what's in for the Packager feature? Be sure to check out both the  the [original RFC (Request for Comments) proposal](https://github.com/chadhietala/rfcs/blob/packager/active/0002-packager.md), as well as [this year's update](https://github.com/ember-cli/rfcs/blob/master/active/0051-packaging.md) that details the motivation behind it.
And want to know **when** it will finally land for an Ember app near you? Of course we'll let you know ASAP 🔜 in one of the upcoming editions of the Ember.js Times!

---

## [New Ember Guides launched 🚀](https://guides.emberjs.com/)

The new [guides.emberjs.com](https://guides.emberjs.com) is live, hooray!

The Guides are a cornerstone of the Ember experience, and one of our community's strengths is that anyone can get involved. So, it's important to make it easier for everyone to create content or functionality. For this reason, a team of contributors have been working for months to convert the Guides from a Ruby/Middleman app into an Ember app. Now, to help with content, contributors only need to work with markdown files, and to see how things would look on the website, they run an Ember app!

[ember-learn/guides-app](https://github.com/ember-learn/guides-app) contains the static site generator that pulls written content from [guides-source](https://github.com/ember-learn/guides-source) markdown files. The guides-app produces static HTML using [Prember](https://github.com/ef4/prember) and [FastBoot](https://www.ember-fastboot.com/). The app is currently served through Heroku who supports Ember in a big way by sponsoring hosting and advice. (Did you know that it takes a ton of back end infrastructure to run a front-end framework project? Other parts of our website rely on support from Fastly, like the API docs. We're thankful to have so many friends of open source 👨‍👩‍👧‍👦!)

Moving forward, the only part of our site that's not Ember is the website repo, which includes the home page, the blog, and some other odds and ends. Everything else has already been moved into Ember apps! If you want to help out, drop by the [#team-learning](https://embercommunity.slack.com/messages/C04KG57CF/) channel.

---

## [Shiny new ember-cli-addon-docs ✨](https://github.com/ember-learn/ember-cli-addon-docs)

The `ember-cli-addon-docs` are getting easier to use day-by-day, so there's no excuse to leave your software libraries undocumented anymore...

A real-world example of its usage is the `ember-decorators` documentation: <a href='http://ember-decorators.github.io/ember-decorators/latest/docs' target='_blank'>ember-decorators</a>, which was recently revamped by leveraging the add-on. Have a go at it and inspire yourself 👩‍🎨 to your own documentation!

Also, on the most recent releases, the following neatest features were made available:

- New **version selector**: good news for when you feel nostalgic about old documentation. Now you can add to your navigation a version selector control that will enable you to jump back and forth to different documentation versions with ease, check it out <a href='https://github.com/ember-learn/ember-cli-addon-docs/pull/156' target='_blank'>here</a>.

- _"Magic mirror, on the wall – who is the most beautiful documentation of all?"_: `ember-cli-addon-docs` has an even **prettier UI** now thanks to `ember-cli-tailwind`. If you are unfamiliar with Tailwind, do yourself a favour and deep dive into its power <a href='https://tailwindcss.com/' target='_blank'>here</a>.

---

## [Contributors' Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/qpowell" target="gh-user">@qpowell</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/csantero" target="gh-user">@csantero</a>, <a href="https://github.com/kevinansfield" target="gh-user">@kevinansfield</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/dexturr" target="gh-user">@dexturr</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/Willibaur" target="gh-user">@Willibaur</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/axyxnz" target="gh-user">@axyxnz</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/cibernox" target="gh-user">@cibernox</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/rondale-sc" target="gh-user">@rondale-sc</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/acorncom" target="gh-user">@acorncom</a>, <a href="https://github.com/Dan-Ste" target="gh-user">@Dan-Ste</a>, <a href="https://github.com/nickbender" target="gh-user">@nickbender</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/jaredgalanis" target="gh-user">@jaredgalanis</a>, <a href="https://github.com/robbiewain" target="gh-user">@robbiewain</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/Bestra" target="gh-user">@Bestra</a>, <a href="https://github.com/mschinis" target="gh-user">@mschinis</a> and <a href="https://github.com/localpcguy" target="gh-user">@localpcguy</a> for contributing to one or several of Ember's core projects❤️!
</p>

---

## [Got a question? Ask Readers' Questions!🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

That's another wrap!  ✨

Be kind,

Miguel Gomes, Kenneth Larsen, Sivakumar Kailasam, Amy Lam, Jessica Jordan, Jen Weber and the Learning Team
