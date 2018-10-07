---
title: The Ember Times - Issue No. 60
author: Miguel Braga Gomes, Amy Lam, Ryan Mark, Kenneth Larsen, Jessica Jordan, Ricardo Mendes
tags: Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/08/17-the-ember-times-issue-60.html"
responsive: true
---

Olà Emberistas! 🐹

Read either on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) what has been going on in Emberland this week.

This week's Ember Times is all about **cool web fonts** 😎, community **chat** migrations and encouraging your inner **Ember Data RFC champion** 🛡. We also have lots of **Ember app wizardry** ✨ with `ember-cli-create`, a guide for using **learning resources** of all **Ember versions** efficiently and - last, but not least - a **brand-new Readers' Question** for you! 💁🏻

---

## [Taking Web Fonts to the Next Level 🔠](https://github.com/vitch/ember-cli-webfont)
Do you like web fonts? Of course you do! Then it’s a good thing that `ember-cli-webfonts` just released version 1.0 🎉

Now you can use the `webfonts-generator` to **easily generate web fonts** as part of your ember build process. By default the addon expects to find SVG files in `app/webfont-svg` but all of this can be customised alongside with class prefixes, base selectors, font names and much more.

All you have to do is run `ember install ember-cli-webfont ` and you’re ready to go. Check out the [Github repository](https://github.com/vitch/ember-cli-webfont) for more information.

---

## [Community Talk: Ember Discord RFC in Final Comment Period 📢](https://github.com/emberjs/rfcs/pull/345)

The **Request for Comments (RFC)** proposing a move of the community's real-time communication from
[Slack](https://ember-community-slackin.herokuapp.com/) to [Discord](https://discordapp.com/) has entered the **Final Comment Period (FCP)** and is most likely to close this weekend.

A plethora of comments and suggestions from the community have already come in about the proposed migration.
If you're interested to join the discussion yourself, please take your time to
read the [entire proposal here](https://github.com/MelSumner/rfcs/blob/feature/rfc-discord/text/0000-discord.md) and
the comments along the RFC which have [already been made](https://github.com/emberjs/rfcs/pull/345).

If you have new (and of course friendly! ❤️) information to add to the conversation, please do so [in the RFC's comments section](https://github.com/emberjs/rfcs/pull/345). And once again: Thank you all for all your feedback! ✨

---

## [Ember Data RFC champions wanted 💪](https://github.com/emberjs/rfcs/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3AT-ember-data+label%3A%22Needs+Champion%22)

On an Open Source diet? Or looking for moar? [@runspired](https://github.com/runspired) [tweets](https://twitter.com/Runspired/status/1030260354519982080) that Ember Data has a number of smaller "bite sized" RFC requests that need champions, and they'd love your help! Check it out [on GitHub](https://github.com/emberjs/rfcs/issues?q=is%3Aissue+is%3Aopen+label%3AT-ember-data+label%3A%22Needs+Champion%22).

---

## [A wizard to create Ember projects ✨‍](https://github.com/gossi/ember-cli-create)

[@Gossi](https://github.com/gossi) released `ember-cli-create`, a project that allows you to create new Ember projects using a simple UI.

It visually provides options to choose from when generating the scaffold, for example:

- Which type of project (addon or app)
- Features to be installed

Take a peek [here](https://github.com/gossi/ember-cli-create) 👀 or maybe ping [Gossi](https://twitter.com/unistyler) for questions, suggestions or appreciations. ❤️

---

## [Must Read for new hires on your Ember team! 🐹](https://medium.com/front-end-hacking/how-to-use-ember-2-code-in-your-ember-3-app-9ed15c28bad6)

[@jenweber](https://github.com/jenweber) breaks down the differences between Ember 2 and 3 in her latest [Medium post](https://medium.com/front-end-hacking/how-to-use-ember-2-code-in-your-ember-3-app-9ed15c28bad6) in an approachable and informative way! Share with coworkers, friends, and folks on the interweb that are new to Ember.

Ember 3 apps must use the new import-what-you-need approach. `this.get` is optional in Ember 3, except properties that are Promise proxies. (Note: If you haven't upgraded to Ember 3 yet, give [ember-cli-update](https://github.com/ember-cli/ember-cli-update#readme) a try to take advantage of codemods!) Testing is also somewhat different. Check out [@turbo87](https://github.com/turbo87/)'s [2018 EmberConf talk](https://www.youtube.com/watch?v=8D-O4cSteRk) for a deeper dive.

For the most up-to-date Ember reference material, check out the [Guides](https://guides.emberjs.com/release/), the official [Tutorials](https://guides.emberjs.com/release/tutorial/ember-cli/), and the [API docs](https://emberjs.com/api). Elsewhere on the web, stick with resources from 2016 and beyond to stay current. 💯

---


## [Contributors' Corner](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/camerondubas" target="gh-user">@camerondubas</a>, <a href="https://github.com/hakilebara" target="gh-user">@hakilebara</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/deanylev" target="gh-user">@deanylev</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/SparshithNR" target="gh-user">@SparshithNR</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/dcyriller" target="gh-user">@dcyriller</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a> and <a href="https://github.com/mschinis" target="gh-user">@mschinis</a> for their contributions to Ember and related repositories 💖!</p>

---

## [Readers’ Questions: “What is meant by the term ‘Data down, actions up’?” 🤔](https://discuss.emberjs.com/t/readers-questions-what-is-meant-by-the-term-data-down-actions-up/15311)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>This week's Readers' Question is all about best practices in Ember apps and one of the most popular design patterns - the <strong>"Data Down, Actions Up"
  paradigm</strong> - is explained in more detail. Read this week's answer by <a href="https://github.com/jessica-jordan" target="gh-jj">@jessica-jordan</a> on the <a href="https://discuss.emberjs.com/t/readers-questions-what-is-meant-by-the-term-data-down-actions-up/15311" target="discuss">official Ember Forum here</a>.</p>

<p><a class="ember-button" href="https://discuss.emberjs.com/t/readers-questions-what-is-meant-by-the-term-data-down-actions-up/15311" target="compmanager">Read more</a></p>
<br/>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/) on Slack or tweet us [@embertimes](https://twitter.com/embertimes) on Twitter.

---


That's another wrap! ✨

Be kind,

Miguel Braga Gomes, Amy Lam, Ryan Mark, Kenneth Larsen, Jessica Jordan, Ricardo Mendes and the Learning Team
