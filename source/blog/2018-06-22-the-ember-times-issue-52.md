---
title: The Ember Times - Issue No. 52
author: Miguel Braga Gomes, Kenneth Larsen, Jessica Jordan
tags: Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/06/22/the-ember-times-issue-52.html"
responsive: true
---

Emberistas שלום! 🐹

Read either on the [Ember blog](https://www.emberjs.com/blog/2018/06/22/the-ember-times-issue-52.html) or in our [e-mail newsletter](https://the-emberjs-times.ongoodbits.com/2018/06/22/the-ember-times-issue-52) what has been going on in Emberland this week.

Those **Request for Comments (RFCs)** just keep coming and this is why we present **4 entirely new** proposals
that you shouldn't miss this week.
We also have an amazing **tutorial** for creating **accessible web applications** for you, to give you a head start in developing, shipping and testing your apps for **a11y** 👭

Check out what's been going in Emberland 🐹 these days:

---

## [An Object Upgrade with Class 🌟](https://github.com/emberjs/rfcs/pull/338)

<div class="blog-row">
  <img class="transparent padded pad-l0" alt="ES Class Syntax in Ember Code Example" title="Example Class Syntax in Ember" src="/images/blog/emberjstimes/esclassexample.png" />
</div>

For Ember the road ahead is beset with **native ES classes**.
Last summer the first [Request for Comments (RFC) for making ES classes](https://emberjs.github.io/rfcs/0240-es-classes.html)
a real thing in Ember had been merged and changed the future outlook for Ember's public API drastically.
The proposal crafted the idea of making the well-aged `EmberObject` model cross-compatible with the more modern ES Class syntax.
This paved the way for Ember to evolve with the latest state of the JavaScript ecosystem in mind.
Since then, early adopters in the community have been able to [experiment with ES Class syntax](http://ember-decorators.github.io/ember-decorators/latest/) in their apps
by making use of the addon `ember-decorators` - seeing the classy ✨ future of Ember for themselves.

Now the follow-up [Native Class Roadmap RFC](https://github.com/emberjs/rfcs/pull/338) from the author of [RFC#240](https://emberjs.github.io/rfcs/0240-es-classes.html) has made its debut.
It explains how several changes to the current API of `EmberObject`
- including an [update](#toc_a-href-https-github-com-emberjs-rfcs-pull-337-native-class-constructor-update-a) to how the `constructor` method operates -
will be necessary to make ES Classes true first-class citizens in the Ember ecosystem
and how `EmberObject` can be safely deprecated in the further future.
It highlights that this will reinvent Ember's **learning story** and
therefore it'll facilitate the **adoption** of the framework **in the wider JavaScript community**.

Still, not sure what all the fuzz is about? 🤔
Be sure to check out [this great introduction into ES Classes in Ember](https://medium.com/build-addepar/es-classes-in-ember-js-63e948e9d78e)
and the original [RFC proposal](https://github.com/emberjs/rfcs/pull/338) - we'd like to hear your thoughts! 💬

---

## [Native Class Constructor Update 🛠](https://github.com/emberjs/rfcs/pull/337)

In the same context as the [Native Class Roadmap](#toc_a-href-https-github-com-emberjs-rfcs-pull-338-an-object-upgrade-with-class-a) there is currently an open RFC proposing to change the behavior of `EmberObject`'s constructor.

Native class syntax with `EmberObject` has almost reached full feature parity, meaning soon Ember will be able to ship native classes.
However, early adopters of native classes have experienced some serious issues due to the current behaviour of the class constructor. The issue is caused by the fact that properties passed to `EmberObject.create` are assigned to the instance in the root class `constructor`. Due to the way that native class fields work, this means that they are assigned _before_ any subclasses' fields are assigned, causing subclass fields to overwrite any value passed to `create`.

The new implementation of the `EmberObject` would look like the following:

```js
class EmberObject {
  constructor(props) {
    // ..class setup things
  }

  static create(props) {
    let instance = new this(props);

    Object.assign(instance, props);
    instance.init();

    return instance;
  }
}
```

This would assign the properties _after_ all of the class fields for any subclasses have been assigned.

One thing worth mentioning is that the RFC claims that `EmberObject` might not be necessary in the future.
The RFC states that, in this possible scenario, users would drop `EmberObject` ideally for non-Ember classes (things that aren’t Components, Services, etc.) altogether and that they would use native classes only.

👉 As always, all comments to this [RFC](https://github.com/emberjs/rfcs/pull/337) are more than welcome, so let's help out in order to finalize it! ✨

---

## [New Tutorial on Accessibility](https://emberjs.com/blog/2018/06/17/ember-accessibility-and-a11y-tools.html)
Ever wondered how to write accessible Ember apps? Jen Weber wrote a [great tutorial](https://emberjs.com/blog/2018/06/17/ember-accessibility-and-a11y-tools.html) explaining all you need to get started. She takes you through setting up `ember-a11y-testing`, a tool made to do automated accessibility testing, adding accessibility checks to rendering tests and how to fix the issues found.

The tutorial ends with a nice section on what to do next. One thing is automated testing but as developers our responsibility is much bigger than that.

---

## [Hello, Link. Wake up. The Great Router wants to talk to you! 🎆](https://github.com/emberjs/rfcs/pull/339)

Ever wondered how many and in which order you have to pass in parameters to the popular `link-to` helper
to make your transition work?

With lots of inspiration 💭 from routing solutions in Reactland ⚛️ another new RFC made it in this week
to help you in this exact situation: It proposes the introduction of a `Link` component to Ember's public API.
With dedicated **named arguments** it should be clearer what your links have to do to make that **route transition** a success.

Would you like to see how linking in future Ember apps might become much clearer?
Then check out the [original proposal](https://github.com/emberjs/rfcs/pull/339) and leave **your thoughts** in the comments below!

---

## [Farewell, Ember.merge 👋...Ohai, Ember.assign 😍](https://github.com/emberjs/rfcs/pull/340)

Another RFC this week proposes the **deprecation** of the `Ember.merge` method in favor of the
functionally equivalent `Ember.assign`.
This means **less duplication** in Ember's codebase
and also less confusion on what either method does for any Ember users which is 💯.

Read the [full proposal](https://github.com/emberjs/rfcs/pull/340) to learn more about
the deprecation story and comment on the pull request what you think about it. 📣

---

## [Contributors' Corner](https://guides.emberjs.com/v3.2.0/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/chancancode" target="gh-user">@chancancode</a>, <a href="https://github.com/mfeckie" target="gh-user">@mfeckie</a>, <a href="https://github.com/krisselden" target="gh-user">@krisselden</a>, <a href="https://github.com/wagenet" target="gh-user">@wagenet</a>, <a href="https://github.com/rondale-sc" target="gh-user">@rondale-sc</a>, <a href="https://github.com/ampatspell" target="gh-user">@ampatspell</a>, <a href="https://github.com/kennethlarsen" target="gh-user">@kennethlarsen</a>, <a href="https://github.com/Mi6u3l" target="gh-user">@Mi6u3l</a>, <a href="https://github.com/GreatWizard" target="gh-user">@GreatWizard</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/jessica-jordan" target="gh-user">@jessica-jordan</a>, <a href="https://github.com/mdbiscan" target="gh-user">@mdbiscan</a>, <a href="https://github.com/yashwin" target="gh-user">@yashwin</a>, <a href="https://github.com/sivakumar-kailasam" target="gh-user">@sivakumar-kailasam</a>, <a href="https://github.com/andreavaghi" target="gh-user">@andreavaghi</a>, <a href="https://github.com/s-pylypenko-mobilunity" target="gh-user">@s-pylypenko-mobilunity</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/lhoBas" target="gh-user">@lhoBas</a>, <a href="https://github.com/dnalagatla" target="gh-user">@dnalagatla</a>, <a href="https://github.com/pcambra" target="gh-user">@pcambra</a>, <a href="https://github.com/knownasilya" target="gh-user">@knownasilya</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/gossi" target="gh-user">@gossi</a>, <a href="https://github.com/happycollision" target="gh-user">@happycollision</a>, <a href="https://github.com/lifeart" target="gh-user">@lifeart</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/cyk" target="gh-user">@cyk</a> and
<a href="https://github.com/pzuraq" target="gh-user">@pzuraq</a> for their contributions to Ember and related repositories! 💕
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

The **The Ember Times** is a **weekly news editorial** featuring all the new things that are going on in Emberland.
[Subscribe to our e-mail newsletter](https://the-emberjs-times.ongoodbits.com/) to get the next edition **right to your inbox**.
And if you've always wanted to be an OSS journalist yourself,
drop by [#topic-embertimes](https://embercommunity.slack.com/messages/C8P6UPWNN/)
on the Ember Community [Slack Chat](https://ember-community-slackin.herokuapp.com/)
and **write** the next edition of the Ember Times **together with us**!


---


That's another wrap!  ✨

Be kind,

Miguel Braga Gomes, Kenneth Larsen, Jessica Jordan and the Learning Team
