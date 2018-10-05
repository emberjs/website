---
title: The Ember Times - Issue No. 67
author: Alon Bukai, Ryan Mark, Amy Lam, Chris Ng, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, Ember Times, 2018
alias : "blog/2018/10/05-the-ember-times-issue-67.html"
responsive: true
---

Hello, pleased to eat you, Emberistas! -Dracula 🦇

🍂 Fall is here and so is Hacktoberfest for Ember, CodeSandbox for Ember, and Storybook for Ember! We're also advertising **Help Wanted** for the new Ember CLI docs and the latest Ember Twiddle release! Read on in this week's issue...

---

## [Hacktoberfest 🎃🍻👨‍💻](https://hacktoberfest.digitalocean.com/)

Trick or treat! The fifth annual Hacktoberfest is here! Support open source and earn a limited edition T-shirt by making **five** pull requests this month to any public repos...why not all Ember ones?!

Looking for something to work on? Pop into the [#hacktoberfest](https://discordapp.com/channels/480462759797063690/496453502298750988) channel on the [Ember Community Discord](https://discordapp.com/invite/zT3asNS) and ask away with questions! Here are some issues to get you started:

* [ember-learn/cli-guides-source](https://github.com/ember-learn/cli-guides-source/issues)
* [ember-learn/ember-api-docs](https://github.com/ember-learn/ember-api-docs/labels/hacktoberfest)
* [ember-learn/ember-styleguide](https://github.com/ember-learn/ember-styleguide/issues?q=is%3Aissue+is%3Aopen+label%3Ahacktoberfest)
* [ember-learn/guides-source](https://github.com/ember-learn/guides-source/issues?q=is%3Aopen+is%3Aissue+label%3Ahacktoberfest)
* [emberjs/data](https://github.com/emberjs/data/labels/Hacktoberfest)
* [emberjs/website](https://github.com/emberjs/website/issues?q=is%3Aissue+is%3Aopen+label%3Ahacktoberfest)
* [kaliber5/ember-bootstrap](https://github.com/kaliber5/ember-bootstrap/labels/Hacktoberfest)

Want to help improve Ember Observer? Have a friend or coworker looking for their first open source pull request? A mere 977 addon repos on [emberobserver.com/lists/invalid-repo-url](https://emberobserver.com/lists/invalid-repo-url) are missing the `repository` key from their `package.json`. For more info, reference the [npm docs](https://docs.npmjs.com/files/package.json#repository), and some sample pull requests [[1](https://github.com/Addepar/addepar-ember-toolbox/pull/29), [2](https://github.com/Duder-onomy/ember-fetch-jsonp/pull/45)]...rinse and repeat for every addon repo. Thanks [@cah-danmonroe](https://github.com/cah-danmonroe) and [@ctpip](https://github.com/ctcpip) for getting this effort started! 💯

...and don't forget to register on the [Hacktoberfest site](https://hacktoberfest.digitalocean.com/). 👻

---

## [Come Play in the Ember CodeSandbox 🏖️🏰](https://medium.com/@mikenorth/ember-community-meet-codesandbox-10a43076b3fa)

[CodeSandbox](https://codesandbox.io) is an online code editor for **the Web**, and now for **Ember** as well! [@mike-north](https://github.com/mike-north) has done a lot of work to get Ember CLI working inside of CodeSandbox so that we can **develop, showcase, and share** live apps on the web!

What allowed this to happen is that CodeSandbox released server-side evaluated sandboxes, which now allows CLI Node apps to run and be served by the site.

Of course we want to give a shoutout to [@Gaurav0](https://github.com/Gaurav0) and the rest of the [Ember Twiddle](https://ember-twiddle.com/) team for their **amazing** work. The way Ember Twiddle works is by [emulating](https://github.com/ember-cli/ember-twiddle/blob/ac116eb20d1e6c2152313f865159c443a9e2bd6f/app/services/ember-cli.js#L261-L295) a node environment. With CodeSandbox, we get **real Ember CLI** out of the box.

There are of course a few issues that Mike is working on fixing, but we believe that this will be stable and usable soon. For example, `ember new app` doesn't work.

To try this out today just use this [starter kit](https://codesandbox.io/s/github/mike-north/ember-new-output) or if you are feeling **adventurous** try out this [TypeScript starter kit](https://codesandbox.io/s/github/mike-north/ember-new-output/tree/typescript).

To learn more make sure to check out the [blog post](https://medium.com/@mikenorth/ember-community-meet-codesandbox-10a43076b3fa) and follow [Mike on Twitter](https://twitter.com/michaellnorth/status/1047231228020023296) to stay updated!

---

## [Introducing: Storybook for Ember! 📖](https://github.com/storybooks/storybook/pull/4237)

With the [v4.0.0 alpha release](https://github.com/storybooks/storybook/releases/tag/v4.0.0-alpha.24) of Storybook, [@gabrielcsapo](https://github.com/gabrielcsapo) helped provide an exciting addition to Ember tooling - [adding Storybook support](https://github.com/storybooks/storybook/pull/4237)!

[Storybook](https://github.com/storybooks/storybook) is a separate UI **development environment** for your UI components. It allows you to explore your **component library**, work on a **single component in isolation**, and view the **different states of each component**. This enables developers to see the functioning UI of the component along with expectations on what to pass as arguments to that component to behave in a certain way.

There are plenty of [featured examples](https://storybook.js.org/examples/) that you can reference to see how Storybook works. We are excited to see the productivity and convenience this tool will bring to Ember!

---

## [Help Create the Freshest Ember CLI Docs 🥒](https://github.com/ember-learn/cli-guides-source/issues/3)

Do you ❤️ **Ember CLI**? And would you like to help the community to share this appreciation even further?
Then be sure, to check out this [**new Quest Issue** for writing the brand-new documentation for Ember CLI](https://github.com/ember-learn/cli-guides-source/issues/3)! 💛

**Help is needed** for anything ranging from copy-pasta-ing 🍝 to greenfield writing. To sign up and join the crowd, simply [add a comment to the Quest Issue](https://github.com/ember-learn/cli-guides-source/issues/3) and volunteer for a task.

---

## [Ember Twiddle to the Next Level 🐹🎢](https://ember-twiddle.com/)

Your favorite tool for **sharing** Ember specific **code examples** with your colleagues and friends is out with a brand-new patch release! [**Ember Twiddle v0.15.1**](https://github.com/ember-cli/ember-twiddle/releases/tag/v0.15.1) comes with **support** for the **latest version of Ember** and **ember-decorators**, improved installation instructions and much more.

In case you haven't twiddled yet, it's about time to [create your first Twiddle today](https://ember-twiddle.com/)! 📝

---

## [Contributors' Corner 👏](https://guides.emberjs.com/release/contributing/repositories/)

<p>This week we'd like to thank <a href="https://github.com/chadhietala" target="gh-user">@chadhietala</a>, <a href="https://github.com/kgautreaux" target="gh-user">@kgautreaux</a>, <a href="https://github.com/rwjblue" target="gh-user">@rwjblue</a>, <a href="https://github.com/simonihmig" target="gh-user">@simonihmig</a>, <a href="https://github.com/chrisrng" target="gh-user">@chrisrng</a>, <a href="https://github.com/jeffdaley" target="gh-user">@jeffdaley</a>, <a href="https://github.com/amyrlam" target="gh-user">@amyrlam</a>, <a href="https://github.com/RyanGee" target="gh-user">@RyanGee</a>, <a href="https://github.com/ftonato" target="gh-user">@ftonato</a>, <a href="https://github.com/ruandev" target="gh-user">@ruandev</a>, <a href="https://github.com/Alonski" target="gh-user">@Alonski</a>, <a href="https://github.com/patrickmcintire-viavi" target="gh-user">@patrickmcintire-viavi</a>, <a href="https://github.com/Dhaulagiri" target="gh-user">@Dhaulagiri</a>, <a href="https://github.com/runspired" target="gh-user">@runspired</a>, <a href="https://github.com/makepanic" target="gh-user">@makepanic</a>, <a href="https://github.com/hjdivad" target="gh-user">@hjdivad</a>, <a href="https://github.com/toddjordan" target="gh-user">@toddjordan</a>, <a href="https://github.com/kellyselden" target="gh-user">@kellyselden</a>, <a href="https://github.com/stefanpenner" target="gh-user">@stefanpenner</a>, <a href="https://github.com/Gaurav0" target="gh-user">@Gaurav0</a>, <a href="https://github.com/chiragpat" target="gh-user">@chiragpat</a>, <a href="https://github.com/rondale-sc" target="gh-user">@rondale-sc</a>, <a href="https://github.com/smfoote" target="gh-user">@smfoote</a>, <a href="https://github.com/HuggableSquare" target="gh-user">@HuggableSquare</a>, <a href="https://github.com/ynotdraw" target="gh-user">@ynotdraw</a>, <a href="https://github.com/localpcguy" target="gh-user">@localpcguy</a>, <a href="https://github.com/ybakos" target="gh-user">@ybakos</a>, <a href="https://github.com/nightire" target="gh-user">@nightire</a>, <a href="https://github.com/nummi" target="gh-user">@nummi</a>, <a href="https://github.com/josemarluedke" target="gh-user">@josemarluedke</a>, <a href="https://github.com/samselikoff" target="gh-user">@samselikoff</a>, <a href="https://github.com/patocallaghan" target="gh-user">@patocallaghan</a>, <a href="https://github.com/underoot" target="gh-user">@underoot</a>, <a href="https://github.com/BradenLawrence" target="gh-user">@BradenLawrence</a>, <a href="https://github.com/Akash4927" target="gh-user">@Akash4927</a>, <a href="https://github.com/mansona" target="gh-user">@mansona</a>, <a href="https://github.com/gokatz" target="gh-user">@gokatz</a>, <a href="https://github.com/jenweber" target="gh-user">@jenweber</a>, <a href="https://github.com/Parrryy" target="gh-user">@Parrryy</a>, <a href="https://github.com/John-E5" target="gh-user">@John-E5</a>, <a href="https://github.com/donofriov" target="gh-user">@donofriov</a> and <a href="https://github.com/CosmicWebServices" target="gh-user">@CosmicWebServices</a> for their contributions to Ember and related repositories! 💖</p>

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

Alon Bukai, Ryan Mark, Amy Lam, Chris Ng, Jessica Jordan and the Learning Team
