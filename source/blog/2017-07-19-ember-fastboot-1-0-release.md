---
title: Ember FastBoot 1.0 Released
responsive: true
author: Tom Dale, Krati Ahuja
tags: Releases, fastboot, 2017
---

We are thrilled to share that we have released Ember FastBoot 1.0 (including ember-cli-fastboot addon, fastboot-app-server and other FastBoot libraries).

## What is Ember FastBoot?

[Ember FastBoot](http://www.ember-fastboot.com/) is a server-side rendering solution for ambitious Ember apps,
allowing your Ember apps to use principles of progressive enhancement, such as an initial render of your app without JavaScript.
It provides a complete solution for server-side rendering of your app from development to deployment.

FastBoot works by running your Ember app in Node and shipping the rendered HTML of your initial requested route in your index.html (which also contains scripts for your app to boot in browser) to the user.
This helps you show meaningful content to your user while the JavaScript is being downloaded, and also helps the initial page of your app to paint faster.
Once the JavaScript downloads and your Ember app in the browser boots, it takes over the initial rendered HTML.
It also helps the content in your Ember application to be accessible to everyone, even if they have JavaScript disabled.

FastBoot brings in an ecosystem to make it easier for your Ember apps to be built and deployed in a FastBoot-friendly way. To make your Ember app run in FastBoot, you simply need to install the `ember-cli-fastboot` addon and make sure your app runs in Node. After installing the addon, you can continue building and developing your app using the same Ember CLI commands as you would without FastBoot. FastBoot also provides an application server ([`fastboot-app-server`](https://github.com/ember-fastboot/fastboot-app-server)) to run and deploy your Ember app in a Node environment. It manages downloading the Ember app, starting multiple HTTP server processes, and detecting when new versions of the application have been deployed.


## Journey to Ember FastBoot 1.0

We have been working on making Ember FastBoot a 1.0 candidate for a long time. Early on, FastBoot worked by forking your Ember build and creating a different set of assets that were meant to be loaded and run in a Node environment. This meant that the assets being shipped to the browser and to Node contained almost the same content but they were packaged as different assets. It also meant that when developing your Ember app locally, for every incremental change, a developer had to wait for both assets to finish building before testing the change. With the help and feedback of early adopters in the community, we realized this strategy was turning out to be less developer-friendly.

Therefore, to make sure the developer experience for Ember apps with FastBoot is the same as a vanilla app using Ember CLI, we decided to change the strategy on how to build the assets that need to be loaded in Node. Instead of forking the build and creating two sets of assets (one for browser and one for Node), we decided to build an additional asset for FastBoot that will be loaded with the same assets that are sent to the browser. This asset will allow apps/addons to override/add any behavior for their app when running in Node. This helped to make sure the build times with FastBoot were the same as a vanilla app.

This also unlocked the potential to be able to run the server and browser versions of an app during development with a single command: the `ember serve` command Ember developers are already used to.

We also exposed an [additional public API](https://github.com/ember-cli/rfcs/pull/80) in Ember CLI that allowed FastBoot to serve index.html with server rendered template using `ember serve`. This API allows any other addon to tap into Ember CLI’s development-time Express server, not just FastBoot.

All of these changes meant that we had to make a hard decision to break some addons’ compatibility with FastBoot. There were many addons that were made FastBoot-compatible (during early adoption), and we tried very hard to make sure these continued to work with this change. However, there was no easy way to do so in all cases without compromising the developer experience. Therefore, we realized we had to break some addons that were already FastBoot-compatible. We have a [migration guide](https://gist.github.com/kratiahuja/d22de0fb1660cf0ef58f07a6bcbf1a1c) for addon authors to migrate to the new build strategy, and have already proactively reached out to many addon authors to help them resolve any compatibility issues

We’re sorry we had to make a backwards-incompatible change before the 1.0 release, but we hope you agree that the significant improvement to the developer experience is worth the pain.

By enhancing Ember CLI public API and taking advantage of those new capabilities, Ember developers that want to use FastBoot in their apps can now build their assets using `ember build`, serve and develop locally using `ember serve`. In the coming months, we will be exposing more declarative APIs in Ember CLI that will make it easy for app and addons to import assets that aren’t FastBoot-compatible.

## Thank You

With this, please check out the Ember FastBoot [website](http://ember-fastboot.com) to learn more on how to make your Ember apps work in FastBoot. If you find any issues, please open issues in the appropriate repository in [ember-fastboot](https://github.com/ember-fastboot).

This release wouldn’t have been possible without the help, support and feedback of the awesome Ember community. We also would not have been able to make FastBoot better without the vision and guidance of [Tom Dale](http://github.com/tomdale), [Stefan Penner](https://github.com/stefanpenner), [Robert Jackson](https://github.com/rwjblue) and the entire Ember CLI core team. Thanks to [Arjan Singh](https://github.com/arjansingh), [Dan McClain](https://github.com/danmcclain), [Hassan Abdel-Rahman](https://github.com/habdelra), [Kelly Selden](https://github.com/kellyselden), [Marco Otte-Witte](https://github.com/marcoow), [Patrick Fisher](https://github.com/pwfisher), [Ron White](https://github.com/ronco), [Simon Ihmig](https://github.com/simonihmig), [Tsubomi Imamura](https://github.com/tsubomii), [Travis Hoover](https://github.com/thoov) and many other contributors who helped along the way.
