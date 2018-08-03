---
title: The Ember Times - Issue No. 55
author: Kenneth Larsen, Amy Lam, Miguel Braga Gomes, Ryan Mark, Sivakumar Kailasam, Jessica Jordan, Alon Bukai
tags: Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/07/13-the-ember-times-issue-55.html"
responsive: true
---

nuqneH Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/07/13/the-ember-times-issue-55.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/07/13/issue-55) what has been going on in Emberland this week.

This week you can learn about **updating** your Ember app 💁🏻. Learn from firsthand experience how to become an **addon maintainer** 💪. Get some tips on writing your own **RFCs** ✨. Check out the new **SEO tactics** of Ember 🔎 and last but not least learn about the potential move of Ember to a new **chat platform** 💬. Go ahead and enjoy!

---

## [Don't Worry, Ember CLI Got You Covered 💻](https://github.com/ember-cli/ember-cli-update)
The **number one** tool for updating Ember.js apps or addons just got **even better**. The [newest version](https://github.com/ember-cli/ember-cli-update/releases) of `ember-cli-update` now runs `qunit-dom-codemod` for you. This means that you, with close to no effort at all, can utilize this great addon for your tests.

And the cool thing is that `ember-cli-update` fetches new codemods **during runtime** - so no need to update to get this nice codemod! To run the codemod just type `ember-cli-update --run-codemods` and magic will take care of the rest for you.

You can visit the addon page for [ember-cli-update](https://github.com/ember-cli/ember-cli-update) to read all about it or visit [qunit-dom](https://github.com/simplabs/qunit-dom) to learn about all the nice features it provides.

---

## [Start Small - How I Became an Ember Addon Maintainer by Ryan Mark](https://github.com/tylerturdenpants) 💪

[ember-user-activity](https://github.com/elwayman02/ember-user-activity/) is a great addon.  It fit my needs and worked perfectly...until I needed to use **Fastboot**. Seeing how others had solved Fastboot related compatibility issues, I cloned [`ember-user-activity`](https://github.com/elwayman02/ember-user-activity/) and got to work. After a few suggested tweaks by the author, my PR was merged, and a new version was released.  A few weeks later, a new version of ember-cli was released. I've always updated my own app, but I had never done an addon.  Excited about this new **challenge**, I updated [`ember-user-activity`](https://github.com/elwayman02/ember-user-activity/) to the latest ember-cli version. Moments later, after submitting my PR, the author sent me an invitation to **collaborate**. The author asked if I could **help** him maintain the addon, and I **enthusiastically** agreed. As of today, I have published a handful of releases. Even though I didn't create the addon, I had **ownership**, and it was exciting to be a part of the addon **community**.

TL;DR, one of the easiest ways to contribute, and possibly becoming a collaborator/maintainer of an addon, is doing small, chore like work for the author. Authors, and even current maintainers, always appreciate the help. Not only does it keep the addon fresh, but often the addon needs a fix or two to be compatible, allowing for even more contributing.

Interested in contributing in a hurry? According to [@mixonic](https://twitter.com/mixonic), an Ember.js Core team member, the version of Ember.js used in [TodoMVC](http://todomvc.com/examples/emberjs/) has been out of date and he's asking for help. Check out the [conversation](https://github.com/tastejs/todomvc/pull/1790) and lend a helping hand!

---

## [Have you ever dreamt about creating your very own RFC? ✨](https://github.com/emberjs/rfcs/pulls)

If you've ever wondered how **Request for Comments** come about, now you have a great chance to peak into its thought process. It might look like they pop up overnight, but there is actually a lot of work and support that goes into them before they are ready.

As an example, our beloved contributor [@jenweber](https://github.com/jenweber) is doing an amazing job by putting together tutorials for `ember-cli`. 👏 More specifically these tutorials will explain basic commands and how to make your first addon.

In order for this specific RFC to be ready the following steps are being taken:

- Brainstorm about which parts of Ember need more documentation 🤔

- Find a co-inspirator to iterate your ideas with 👭

- Reach out to the CLI Teams to get more ideas and feedback 💡

- Get a couple of early reviewers 🤓

- Draft the RFC and get more feedback from all the stakeholders 📖 

- Make a proof of concept 👨‍💻 

- Publish it 🚀 

- ❔❔❔

- Profit 🤑

Not all the above steps are mandatory, but it gives you a pretty good notion of what might be involved.

And now that you know, why not stay tuned for this specific RFC and make your contribution? All comments and new writers are more than welcome! <a href='https://github.com/sivakumar-kailasam/cli-guides/pull/4' target='_blank'>Click here to learn more!</a> 📢

---

## [Find Ember on the Interwebs with the Power of SEO 🔎](https://embercommunity.slack.com/archives/CAHEZTMBK)

These past days, weeks and months lots of efforts have been focused on improving the
**discoverability of official Ember resources** including the website, the Guides or the API docs.
The visibility of these sites to various search engines 🔍 , for example, DuckDuckGo, Baidu, AOL Search, Dogpile or Google
plays a major role in how easy it is for developers to find the information they are looking for.
To improve Ember's visibility on the web, **Search-Engine Optimization (SEO)** of these pages is one of the most effective measures.

Simple, yet effective improvements for Ember sites included tests of functional redirects ([1](https://github.com/emberjs/website/pull/3394)) and fixes for broken links ([2](https://github.com/emberjs/website/pull/3271), [3](https://github.com/emberjs/website/pull/3183), [4](https://github.com/emberjs/website/pull/3182)).
Other high-impact efforts included a [new meta data structure for the new Guides](https://github.com/ember-learn/guides-app/pull/135)
and the continuous evaluation of web crawler data.

If you have previous experience with SEO and you're interested in casting some keyword magic ✨🎩 for Ember sites,
check out the [\#st-website](https://embercommunity.slack.com/archives/CAHEZTMBK) channel on the
[Ember Community Slack Chat](https://ember-community-slackin.herokuapp.com/)
and join other SEO analysts in their quest to make Ember the No. 1 search result on [Ask.com](https://ask.com/web?o=0&l=dir&qo=serpSearchTopBox&q=the+most+ambitious+JS+mvc+framework+must+have+a+cute+mascot).

---

## [RFC: Goodbye Slack, Hello Discord 💬](https://github.com/emberjs/rfcs/pull/345)

[@MelSumner](https://github.com/MelSumner) has proposed an [RFC](https://github.com/emberjs/rfcs/pull/345) recommending that the Ember community chat moves from Slack to Discord. Ever had a message on the Ember Slack disappear on you in a channel or DM? Discord stores chat logs forever, so losing history would no longer be an issue. Better communication and transparency FTW!

Our one gripe with the potential move is the confusion between [Discourse](https://discuss.emberjs.com/) and [Discord](https://discordapp.com/)... 😅

Discord is the chat host to [many open source projects](https://discordapp.com/open-source), such as Yarn, Vue.js, and Reactiflux.

Have some thoughts on the proposal? Get involved on the [RFC](https://github.com/emberjs/rfcs/pull/345)!

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/) 🤝

<p>This week we'd like to thank <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/thoov" target="gh-user">@thoov</a>, <a href="https://github.com/DanielRosenwasser" target="gh-user">@DanielRosenwasser</a>, <a href="https://github.com/stopdropandrew" target="gh-user">@stopdropandrew</a>, <a href="https://github.com/ijlee2" target="gh-user">@ijlee2</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/bmac" target="gh-user">@bmac</a>, <a href="https://github.com/pete-the-pete" target="gh-user">@pete-the-pete</a>, <a href="https://github.com/john-griffin" target="gh-user">@john-griffin</a>, <a href="https://github.com/gabrielgrant" target="gh-user">@gabrielgrant</a>, <a href="https://github.com/localpcguy" target="gh-user">@localpcguy</a>, <a href="https://github.com/kasunvp" target="gh-user">@kasunvp</a>, <a href="https://github.com/mike-north" target="gh-user">@mike-north</a>, <a href="https://github.com/twokul" target="gh-user">@twokul</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/jrock2004" target="gh-user">@jrock2004</a>, <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>, <a href="https://github.com/wagenet" target="gh-user">@wagenet</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/ThiefZero" target="gh-user">@ThiefZero</a>, <a href="https://github.com/jpadilla" target="gh-user">@jpadilla</a> and <a href="https://github.com/heqian" target="gh-user">@heqian</a> for their contributions to Ember and related repositories! 💕
</p>

---

## [Got a question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

## [The Ember Times is What We Make It 🙌](https://embercommunity.slack.com/messages/C8P6UPWNN/)

The **Ember Times** is a **weekly news editorial** featuring all the new things that are going on in Emberland.
[Subscribe to our e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) to get the next edition **right to your inbox**.
And if you've always wanted to be an OSS journalist yourself,
drop by [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/)
on the Ember Community [Slack Chat](https://ember-community-slackin.herokuapp.com/)
and **write** the next edition of the Ember Times **together with us**!


---


That's another wrap!  ✨

Be kind,

Kenneth Larsen, Amy Lam, Miguel Braga Gomes, Ryan Mark, Sivakumar Kailasam, Jessica Jordan, Alon Bukai and the Learning Team
