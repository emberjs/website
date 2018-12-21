---
title: The Ember Times - Issue No. 78
author: Chris Ng, Robert Wagner, Amy Lam, Ryan Mark, Jessica Jordan, Kenneth Larsen
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/12/21-the-ember-times-issue-78.html"
responsive: true
---

مرحبا Emberistas! 🐹

This week: Find out what's new in Ember Inspector and Extensible Ember Inspector 👨‍💻, read about the Glimmer Components RFC ✨, register for EmberConf 2019 📆, and a new RFC on Render Element Modifiers 🔨!

---

## [What's New in Ember Inspector and Extensible Ember Inspector 🐹](https://github.com/emberjs/rfcs/pull/417)

The Ember Inspector team has been working hard over the past few months to close out lots of
super old issues (some from several years ago!), as well as adding new
features to Ember Inspector. Thanks to [@nummi](https://github.com/nummi)
you can now more easily keep up with the changes being made as well! When
you open a new version of Ember Inspector, you'll now be shown an info tab
with all the changes since the last version.

![](https://imgur.com/BiqsmqV.png) 

We also did a few third party library swaps and updates, 
most notably switching from [ember-pikaday](https://github.com/adopted-ember-addons/ember-pikaday) to 
[ember-flatpickr](https://github.com/shipshapecode/ember-flatpickr)
and using [ember-table](https://github.com/Addepar/ember-table) for the data tab.

[@rwwagner90](https://github.com/rwwagner90) championed the date picker switch, which resolved several issues with
pikaday, and also removed our dependence on jQuery.

[@thorsteinsson](https://github.com/thorsteinsson) championed the ember-table
work and, as a result of the switch, you can now scroll the table horizontally! 🎉

Finally, we are working hard on the future of Ember Inspector, and have an RFC
up for making it extensible, which would allow for things like swapping out the
data tab to use Redux, etc. Please check out [the RFC](https://github.com/emberjs/rfcs/pull/417) and let us know your
thoughts!

---

## [RFC: Glimmer Components ✨](https://github.com/emberjs/rfcs/pull/416)

[@pzuraq](https://github.com/pzuraq) put up an RFC (Request for Comments) for supporting **Glimmer components** – which represent a simpler, more declarative and ergonomic approach to building components – into Ember’s public API. Glimmer components will be the new default app experience in [Ember Octane](https://github.com/emberjs/rfcs/blob/26c4d83fb66568e1087a05818fb39a307ebf8da8/text/0000-roadmap-2018.md#ember-octane).

Glimmer components aim to eliminate confusion with classic components, by aligning more closely with modern template syntax and features such as:

**Outer HTML Semantics** where there is no wrapping outer element by default and any dynamic values are explicitly stated in the template.

**Namespaced Arguments** by having Glimmer components assign their arguments to the `args` property on their instance, preventing namespace collisions.

**Immutable Arguments** for the `this.args` object, as mentioned above, which will normalize the way the data flows through the app. This will also promote the usage of the `{{@arg}}` syntax – which refers directly to the arguments passed into the invocation of the component – when appropriate since it is more predictable in nature.

<!--alex ignore hooks nuts-->
 **Minimal Classes** where Glimmer components won’t have any element/DOM based properties, hooks, event handler functions (which are provided instead by element modifiers) in order to reduce the mental model and enable users to be productive out of the box.

Read and comment on the [full RFC on GitHub](https://github.com/emberjs/rfcs/pull/416).

---

## [EmberConf Registration is Open! 💁‍♀️](https://emberconf.com/index.html)

2019 is rapidly approaching, and you've got one more thing to do before EOY: buy your EmberConf ticket! This year's Early-Bird discount is significant ($50), while supplies last or until 12/31. So before anything else, here's that big shiny button! 🆗

<div class="blog-row">
  <a class="ember-button" style="width:260px" href="https://emberconf.com/register.html">Register Now</a>
</div>

The program has been announced and is looking really great: so many new faces, and a bunch of familiar old ones! Be sure to check out the [full schedule](https://emberconf.com/schedule.html) for all the details. 

We're particularly excited about [Inclusiveness at EmberConf](https://emberconf.com/inclusiveness-at-emberconf.html) this year. In an industry lacking attendee and speaker diversity, EmberConf strives to be an exception. Highlights of this year's efforts include:
 
* [Scholarships for students and those in need](https://tilde.wufoo.com/forms/emberconf-2019-scholarships/)
* [People of Color (POC) breakfast, registration add-on](https://emberconf.com/register.html)
<!--alex ignore gals-men women-->
* [Women Helping Women luncheon, registration add-on](https://emberconf.com/register.html)
<!--alex ignore kids-->
* [Bring Your Kids to EmberConf](https://tilde.wufoo.com/forms/xjkro7b1nzxczy/)

---

## [New RFC: Render Element Modifiers 🔨](https://github.com/emberjs/rfcs/pull/415)
 
<!--alex ignore hooks-->
A new [RFC](https://github.com/pzuraq/emberjs-rfcs/blob/render-element-modifiers/text/0000-render-element-modifiers.md) is out by [@pzuraq](https://github.com/pzuraq) and it’s quite amazing. It proposes adding two new generic element modifiers, `{{did-render}}` and `{{will-destroy}}`, which users can use to run code during the most common phases of any element's lifecycle. If you’ve ever used any of the component hooks such as `didInsertElement` or `didRender`, this will most likely be quite handy for you, since we can focus on the setup and teardown code without worrying about the overall lifecycle.

The [RFC](https://github.com/pzuraq/emberjs-rfcs/blob/render-element-modifiers/text/0000-render-element-modifiers.md) is very detailed and has a lot of helpful code examples. Remember to leave your thoughts as a comment.

---

## [The Ember Mentorship Program 👨‍🎓👩‍🎓](https://www.emberjs.com/blog/2018/12/17/mentorship-program.html)

This week the new **Ember Mentorship Program** [has been officially announced](https://www.emberjs.com/blog/2018/12/17/mentorship-program.html)!
It aims to guide the next wave of Ember developers of all experience levels into the community. By making developers succeed in [public speaking](https://emberconf.com/mentorship-program.html#evangelism), finding their space [in a supportive peer group](https://emberconf.com/mentorship-program.html#women-helping-women) or [leveling up their engineering skills](https://emberconf.com/mentorship-program.html#general-mentorship) the program is meant **just for you**!

Learn all about [the Ember Mentorship Program and join the community](https://emberconf.com/mentorship-program.html)!

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/kratiahuja" target="gh-user">@kratiahuja</a>, <a href="https://github.com/sdhull" target="gh-user">@sdhull</a>, <a href="https://github.com/locks" target="gh-user">@locks</a>, <a href="https://github.com/smfoote" target="gh-user">@smfoote</a>, <a href="https://github.com/sonic1981" target="gh-user">@sonic1981</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/Turbo87" target="gh-user">@Turbo87</a>, <a href="https://github.com/hakilebara" target="gh-user">@hakilebara</a>, <a href="https://github.com/jacobq" target="gh-user">@jacobq</a>, <a href="https://github.com/MelSumner" target="gh-user">@MelSumner</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/rwwagner90" target="gh-user">@rwwagner90</a>, <a href="https://github.com/jeffdaley" target="gh-user">@jeffdaley</a>, <a href="https://github.com/wifelette" target="gh-user">@wifelette</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/scalvert" target="gh-user">@scalvert</a>, <a href="https://github.com/knownasilya" target="gh-user">@knownasilya</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a> and <a href="https://github.com/dcyriller" target="gh-user">@dcyriller</a> for their contributions to Ember and related repositories! 💖</p>

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

Chris Ng, Robert Wagner, Amy Lam, Ryan Mark, Jessica Jordan, Kenneth Larsen and the Learning Team
