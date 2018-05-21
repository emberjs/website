---
title: The Ember 2.x Project
author: Yehuda Katz
tags: Recent Posts, 2015, Version 2.x
responsive: true
---

For the past several years, when we've talked about "Ember releases", we were always talking about releases of the Ember codebase itself.

In practice, that has meant that in order to put together the full, recommended Ember stack, you needed to figure out not just what Ember version to use, but what versions of our other libraries and tools worked with it.

Starting with Ember 2.0, we will coordinate every release of Ember with releases of the main ecosystem tools maintained by the core team:

* Ember CLI
* Ember.js
* Ember Data
* Liquid Fire
* List View

**All of these tools will share a version number with Ember itself.** 

Upgrading to Ember 2.3 means that you'll get a new version of the Ember tools and a new version of Ember. You'll also get new versions of Liquid Fire, List View and Ember Data designed to work with (and tested against) Ember 2.3.

These projects will also ship betas alongside Ember itself, meaning that when Ember 2.3-beta.1 is released, there will be versions of Ember Data, Liquid Fire and List View released at the same time that are tested against the new beta.

**We are in the process of aligning the versions now; you should start to see releases of Ember Data and Liquid Fire numbered "2.0 beta" in the next few days.**

At a high level, the goal of these releases is for "upgrading to Ember 2.3" to mean upgrading Ember CLI to that version, and getting all of the improvements across all of the projects at once, without having to figure out how to separately upgrade each piece.

We expect that Semver and a shared community experience of upgrading at once will make this upgrade relatively painless, and will continue to work on improvements to the process that eliminates sources of pain due to upgrades. (See the [Release Cycle Improvements](https://github.com/emberjs/rfcs/blob/two-dot-x-improvements/active/0000-improved-release-cycle.md) RFC for more on improvements we already have planned for the 2.x cycle.)

### Frequently Asked Questions

While I tried to answer the most common questions I've heard from people, I'm sure I missed some.

> What does this mean for right now?

We have shipped Ember 2.0 beta, and are in the process of shipping "2.0 beta" versions of the remaining projects.

In practice, this means shipping a final version of the projects that will be compatible with Ember 1.13, and buttoning up any final changes that need to be made before they join Ember's semantic versioning pace.

There will be a separate blog post in the next few days describing precisely how this will affect Ember Data, but the short version is the same. There will be a final version of Ember Data that will be compatible with the versions that have been shipping all year, and then we will ship Ember Data 2.0 beta, aligned with Ember itself.

> Doesn't this mean that Ember is becoming a huge monolithic project that is now tightly coupled with all of these other projects?

No. The reason to share a version number is almost entirely about convenience and a less fragmented ecosystem. While it is technically true that Liquid Fire 2.4 will work fine with Ember 2.6, this means that applications will practically be on a smorgasboard of versions of the core libraries, making it harder to write tutorials and answer questions, even once it is clear what version of Ember a user is using.

What this means it that if a user is using Ember 2.4, and asks a question about animations or Ember Data, it is possible to answer the question without asking a half-dozen other questions to learn basic things about the user's environment.

Similarly, if you are looking at a tutorial that was built for Ember 2.4, you know that it will not be targeting a different version of the other core libraries, with the caveats that would bring.

> But doesn't this mean that upgrading Ember is a huge "big bang
upgrade" that will take an even longer amount of time to perform now that it's coupled with Ember CLI, Ember Data, and Liquid Fire?

While in principle upgrading Ember.js without one of the other libraries might seem like it would take less time, we don't think this is true in practice.

By aligning the release cycles and versions of the most common libraries, it is possible for upgrade guides to cover all of the instructions that you will need in one place, and you will be sharing an upgrade experience with the rest of the ecosystem.

When you ask a question in IRC, on GitHub Issues or on Stack Overflow about upgrading to Ember 2.4, the known caveats for the entire upgrade process will be well-known and well-trod.

This is not the case if you are trying to upgrade to Ember 2.5 while remaining on Ember CLI 2.2 with List View 2.3 and Liquid Fire 2.1. It **might** work out, but the number of people sharing the same combination will be very low, and the people maintaining the libraries might not even have considered that precise combination.

**In practice, the fact that all of these libraries share the same SemVer requirements should make upgrading across all five components more straight forward than trying to cobble together a multi-version stack yourself.**

> I don't agree with anything you said here and just want to pick and choose the versions of the libraries I want to use.

Go for it! The people maintaining each of these libraries want older versions of the libraries to work with newer versions of Ember, because it makes their jobs easier.

If you are deeply committed to upgrading a piece at a time, even though it will mean you will need to work out the details on your own, feel free to attempt it, and report bugs if you encounter any problems.

(There is one minor caveat. As of Ember 2.0, Liquid Fire and Ember Data make minor use of private Ember APIs. We intend to replace those APIs with public APIs within the first few releases.)