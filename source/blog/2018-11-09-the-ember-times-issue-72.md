---
title: The Ember Times - Issue No. 72
author: Chris Ng, Amy Lam, Kenneth Larsen, Jessica Jordan, Ryan Mark
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/11/09-the-ember-times-issue-72.html"
responsive: true
---

Kedu Emberistas! 🐹

We need **Emberistas at JSConf EU**, so submit a talk to the newly opened CFP! 🗣️ There's an update to the **RFC about RFCs** 📜! You can also read about **more informative Routes** 🤓, watch a **tutorial** on how to **build** a live updating **league table** ⚽️ in Ember 3.5 📹, or **help** upgrade the **test coverage** of official Ember projects! ✍️

---

## [JSConf EU CFP is Now Open! 👐](https://2019.jsconf.eu/call-for-speakers/)

[JSConf EU](https://2019.jsconf.eu/), which will be held from **June 1 – 2 2019 in Berlin**, has officially opened their Call for Papers (CfP) for talks regarding JavaScript, the web, or a clever hack.

<!--alex ignore blind-->
This is a good opportunity for us, as Ember developers, to **showcase our work to the greater JavaScript community**. Similar to the [EmberConf process](https://www.emberjs.com/blog/2018/10/12/the-ember-times-issue-68.html#toc_a-href-https-emberconf-com-become-a-speaker-html-emberconf-2019-call-for-papers-a), the CfP starts out blind and later gets de-anonymized.

The call for speakers this year is **open until December 23rd**. JSConf’s sibling conference, CSSconf, even published a blog on [How to write a great talk proposal for a tech conference](https://blog.cssconf.eu/2014/06/12/how-to-write-a-great-talk-proposal-for-a-tech-conference/).

_”Pick the topic you feel most passionate about. This is your conference.”_  is the JSConf EU saying so [apply to be a speaker](https://2019.jsconf.eu/call-for-speakers/) today!

---

## [Yo Dawg, I Heard You Like RFCs 📜](https://github.com/emberjs/rfcs/pull/300)

There has been an update to the RFC (Request for Comments) about the RFC process itself. The RFC process has been crucial in defining **the future of Ember** and that is still the case. However, in the process of reading and merging all of these RFCs, the Core Team has discovered some shortcomings of the current RFC process as well as new requirements.

To solve some of these issues, the RFC proposes that new RFCs are assigned a **Core Champion** from the Core Team. It also suggests to merge [ember-cli/rfcs](https://github.com/ember-cli/rfcs) into [emberjs/rfcs](https://github.com/emberjs/rfcs).

There are more proposed solutions in [the RFC](https://github.com/emberjs/rfcs/blob/rfc-process-update/text/0300-rfc-process-update.md), which we recommend you to read through and to leave a comment with your thoughts.

---

## [Personalize Your Route's Metadata with the RouteInfo Metadata RFC 📝](https://github.com/emberjs/rfcs/pull/398)

Have you ever wanted to **track** specific keywords for a particular route in your Ember app, but didn't know how to do so in an elegant fashion? Have you tried to update the `document.title` of a page depending on the specific point of time at which a route was visited, but realized that this couldn't be done without some effort?

Then a brand-new **Request for Comments (RFC)** is just for you! The proposal [_RouteInfo Metadata_](https://github.com/emberjs/rfcs/pull/398) suggests a new way for reading and writing **application-specific metadata** to the corresponding _RouteInfo_ object. For more context on which information routes currently provide, be sure to also check out [the section about the RouteInfo type from the original RouterService RFC](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md#routeinfo-type).

And finally, read the full _RouteInfo Metadata_ proposal to learn more and leave your thoughts and questions in the [comments below the proposal](https://github.com/emberjs/rfcs/pull/398).

---

## [Premier League Video Tutorial ⚽️](https://twitter.com/gavinjoyce/status/1059533557130059779)

[@GavinJoyce](https://github.com/gavinjoyce) made an awesome [tutorial](https://www.youtube.com/watch?v=vYakop2d2RI) where he demonstrates how to build a live updating league table in the **latest Ember 3.5**! Code along with the video and you'll use [ember-cli-tailwind](https://github.com/embermap/ember-cli-tailwind) for styling, angle bracket invocation, `shuffle` from [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers) (TIL), [ember-math-helpers](https://github.com/shipshapecode/ember-math-helpers) and more.

Check out [ember-league-table.surge.sh](http://ember-league-table.surge.sh) to run the app and the [repo](https://github.com/GavinJoyce/ember-league-table) for the source code. Our advice? Share the tutorial with a friend, whether they call it football or soccer...

---

## [Help Wanted! We Need Your Testing Expertise 👨🏾‍🏫](https://github.com/ember-learn/ember-help-wanted/issues/22)

So many contributors have been putting great effort into shipping features, improvements and bug fixes for important Ember projects recently, including the [spick-and-span Ember Help Wanted App](https://help-wanted.emberjs.com/) and our most be-❤️(loved) [Ember API Docs](https://www.emberjs.com/api/ember/release).

But with lots of new changes, also comes lots of responsibility for **test coverage**; and your help is needed!
Help these amazing projects to get their test coverage up to par by **writing unit**, **integration** and **acceptance test**:

- [Ember Help Wanted Client](https://github.com/ember-learn/ember-help-wanted)
- [Ember Help Wanted Backend](https://github.com/ember-learn/ember-help-wanted-server)
- [Ember API Docs Client](https://github.com/ember-learn/ember-api-docs)
- [Ember JSON API Docs](https://github.com/ember-learn/ember-jsonapi-docs)

Questions? Looking for some guidance to get started? Pop by the [#dev-ember-learning](https://discordapp.com/channels/480462759797063690/480777444203429888) channel on [the Ember Community Chat](https://discordapp.com/invite/zT3asNS) and ask away!

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/dfreeman" target="gh-user">@dfreeman</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/mikrostew" target="gh-user">@mikrostew</a>, <a href="https://github.com/caseywatts" target="gh-user">@caseywatts</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/mattselden12" target="gh-user">@mattselden12</a>, <a href="https://github.com/chancancode" target="gh-user">@chancancode</a>, <a href="https://github.com/rondale-sc" target="gh-user">@rondale-sc</a>, <a href="https://github.com/acorncom" target="gh-user">@acorncom</a>, <a href="https://github.com/simonihmig" target="gh-user">@simonihmig</a>, <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/igorT" target="gh-user">@igorT</a>, <a href="https://github.com/spruce" target="gh-user">@spruce</a>, <a href="https://github.com/ahawkins" target="gh-user">@ahawkins</a>, <a href="https://github.com/yaxinr" target="gh-user">@yaxinr</a>, <a href="https://github.com/thorsteinsson" target="gh-user">@thorsteinsson</a>, <a href="https://github.com/mike-north" target="gh-user">@mike-north</a>, <a href="https://github.com/lifeart" target="gh-user">@lifeart</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/chengz" target="gh-user">@chengz</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/dipil-saud" target="gh-user">@dipil-saud</a>, <a href="https://github.com/scalvert" target="gh-user">@scalvert</a>, <a href="https://github.com/step2yeung" target="gh-user">@step2yeung</a>, <a href="https://github.com/gabrielcsapo" target="gh-user">@gabrielcsapo</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/wagenet" target="gh-user">@wagenet</a>, <a href="https://github.com/tomdale" target="gh-user">@tomdale</a> for their contributions to Ember and related repositories! 💖</p>

---

## [Got a Question? Ask Readers' Questions! 🤓](https://docs.google.com/forms/d/e/1FAIpQLScqu7Lw_9cIkRtAiXKitgkAo4xX_pV1pdCfMJgIr6Py1V-9Og/viewform)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>Wondering about something related to Ember, Ember Data, Glimmer, or addons in the Ember ecosystem, but don't know where to ask? Readers’ Questions are just for you!</p>

<p><strong>Submit your own</strong> short and sweet <strong>question</strong> under <a href="https://bit.ly/ask-ember-core" target="rq">bit.ly/ask-ember-core</a>. And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞</p>

</div>

---

## [#embertimes](https://emberjs.com/blog/tags/newsletter.html) 📰

Want to write for the Ember Times? Have a suggestion for next week's issue? Join us at [#support-ember-times](https://discordapp.com/channels/480462759797063690/485450546887786506) on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) or ping us [@embertimes](https://twitter.com/embertimes) on Twitter.

Keep on top of what's been going on in Emberland this week by subscribing to our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/)! You can also find our posts on the [Ember blog](https://emberjs.com/blog/tags/newsletter.html).

---


That's another wrap! ✨

Be kind,

Chris Ng, Amy Lam, Kenneth Larsen, Jessica Jordan, Ryan Mark and the Learning Team
