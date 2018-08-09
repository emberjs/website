---
title: The Ember Times - Issue No. XX
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/xxxx/xx/xx-the-ember-times-issue-XX.html"
responsive: true
---

<SAYING-HELLO-IN-YOUR-FAVORITE-LANGUAGE> Emberistas! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/xxxx/xx/xx/the-ember-times-issue-XX.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/xxxx/xx/xx/issue-XX) what has been going on in Emberland this week.

<SOME-INTRO-HERE-TO-KEEP-THEM-SUBSCRIBERS-READING>

---

## [A framework for ambitious Chrome Extensions ⚙](https://envoy.engineering/a-framework-for-ambitious-chrome-extensions-b08d1f4b944d)

[Esteban](https://github.com/esbanarango) wrote an article on how he used Ember to create Chrome Extensions by combining multiple addons from around the community. He found a ton of of great _starter_ and _boilerplate_ projects on [GitHub](www.github.com) and identified some key [ember-cli](https://github.com/ember-cli/ember-cli) projects that make working with [Chrome’s Extension API](https://developer.chrome.com/extensions/api_index) much easier.

Specifically, Esteban mentions 3 ember-cli addons: [ember-cli-deploy-chrome-app](https://github.com/rmachielse/ember-cli-deploy-chrome-app), [ember-cli-post-build-copy](https://github.com/tgsoverly/ember-cli-post-build-copy), and [ember-cli-concat](https://github.com/sir-dunxalot/ember-cli-concat) that was instrumental in creating ambitious Chrome Extensions using Ember. He leveraged [ember-concurrency](https://github.com/machty/ember-concurrency) ([or you can use ember-lifeline](https://discuss.emberjs.com/t/readers-questions-whats-the-difference-between-ember-lifeline-and-ember-concurrency-and-which-one-should-be-used/15197)) to deal with the callback design structure API that Chrome provides (which was promisified using [chrome-promise](https://github.com/tfoxy/chrome-promise)).

Read more about his journey at Esteban’s [blog post](https://envoy.engineering/a-framework-for-ambitious-chrome-extensions-b08d1f4b944d).

---

## [One Port to Rule Them All](https://github.com/ember-cli/ember-cli/releases/tag/v3.4.0-beta.2)
With `ember-cli@3.4.0-beta.2` you now have the ability to enable the live reloading server and the normal development app server to share a **single port**. With the current state of Ember CLI it opens two HTTP servers - one for the assets and one to support live reloading on file changes.

You can already test this by [getting the beta](https://github.com/ember-cli/ember-cli/releases/tag/v3.4.0-beta.2) and see if it works for you. Remember to also check the rest of the changelog for the beta. And if you're interested in the actual work for making the single port work the check out [the PR](https://github.com/ember-cli/ember-cli/pull/7940).

---

## [Mirage 1.0 🔜](https://github.com/samselikoff/ember-cli-mirage/releases/tag/v0.4.8)

[ember-cli-mirage](http://www.ember-cli-mirage.com/) is a popular client-side mock server to develop, test and prototype your app. [@samselikoff](https://github.com/samselikoff) has released Mirage 0.4.8. ✨ And there are only 9 bugs to close out before shipping Mirage 1.0! Please help with the march to 1.0 by upgrading to [v0.4.8](https://github.com/samselikoff/ember-cli-mirage/releases/tag/v0.4.8) today and reporting back any issues. Drop by [#ec-mirage](https://embercommunity.slack.com/messages/C0TG21RPW/) if you have any trouble upgrading! Hopefully, everything will be 200 🆗.

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

<p>This week we'd like to thank <a href="https://github.com/nlfurniss" target="gh-user">@nlfurniss</a>, <a href="https://github.com/smfoote" target="gh-user">@smfoote</a>, <a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a>, <a href="https://github.com/bekzod" target="gh-user">@bekzod</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/tylerturdenpants" target="gh-user">@tylerturdenpants</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/ryanto" target="gh-user">@ryanto</a>, <a href="https://github.com/teddyzeenny" target="gh-user">@teddyzeenny</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/apellerano-pw" target="gh-user">@apellerano-pw</a>, <a href="https://github.com/knownasilya" target="gh-user">@knownasilya</a>, <a href="https://github.com/dcyriller" target="gh-user">@dcyriller</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/dcombslinkedin" target="gh-user">@dcombslinkedin</a>, <a href="https://github.com/kanongil" target="gh-user">@kanongil</a>, <a href="https://github.com/kategengler" target="gh-user">@kategengler</a>, <a href="https://github.com/tomhazledine" target="gh-user">@tomhazledine</a> and <a href="https://github.com/indieNik" target="gh-user">@indieNik</a> for their contributions to Ember and related repositories 💖!</p>

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
