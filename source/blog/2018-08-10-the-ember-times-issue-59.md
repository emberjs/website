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

## [Knowing Boundaries with the Component Manager Bounds RFC](https://github.com/emberjs/rfcs/pull/351)

A new Request for Comments (RFC) is aiming to improve the flexibility of another previously
RFC'ed feature that is interesting for Ember addon authors who are passionate about `Components`.
The [Component Manager™ feature](https://emberjs.github.io/rfcs/0213-custom-components.html) which had
already had been accepted by the Ember community in the [spring of this year](https://github.com/emberjs/rfcs/pull/213#issuecomment-374981569) defines a **new low-level primitive** that would allow developers to create flexible and efficient **component base classes**
which can easily be extended from. This can for example be leveraged by UI addons that expose
components to their parent apps and which want to allow end users to extend from these base components themselves.

And today the saga of the Manager of Custom Components continues:
The author of the original RFC \#213 now presents a [follow-up](https://github.com/emberjs/rfcs/pull/351)
proposing the optional **exposure** of `bounds` - the DOM boundaries of a component - through the Component Manager feature.
This will allow any addon authors who would like to create custom components using the
Component Manager feature to get a hold of the **component's DOM**, provide end users access to it via
specific life cycle hooks and allowing DOM manipulation.

Curious to learn more? Be sure to check out the [original proposal](https://github.com/emberjs/rfcs/blob/4f541c350cd4f366eed66fa80ef320bb38656b20/text/0000-Component-Manager-Bounds.md)
and to not miss the [RFC Roundup Podcast session](https://emberweekend.com/episodes/rfc-roundup-with-rwjblue) over at
our friends' at Ember Weekend in which [@rwjblue](https://github.com/rwjblue) explains what the **RFC \#213** for the Component Manager is about.

<a class="ember-button ember-button--centered" href="https://github.com/emberjs/rfcs/blob/4f541c350cd4f366eed66fa80ef320bb38656b20/text/0000-Component-Manager-Bounds.md" target="compmanager">Read more</a>

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
