---
title: Launch of the new Ember CLI Guides
author: Jen Weber
tags: Announcement
responsive: true
---

The Ember Learning Team is excited to announce the launch of the new and improved [Ember CLI Guides](https://cli.emberjs.com)! So excited, in fact, that we want to share a case study of the tech behind the new site and open source project management. This release is main part of the work for ember-cli [RFC #120](https://github.com/ember-cli/rfcs/pull/120).

## What has changed?

What has changed with the launch of the new CLI Guides?

1. There is brand-new content, like a tutorial to help you write your first addon
2. The CLI Guides are now an Ember app, using the [Guidemaker](https://github.com/empress/guidemaker) addon
3. The branding is consistent with the rest of the [emberjs.com](https://emberjs.com) site, thanks to use of [ember-styleguide]() components and stylesheets
4. A _significant_ portion of the past content has been revised or rewritten. Outdated information is gone, and modern best practices are represented better

## Why was this project needed?

Like many Ember documentation apps of the past, the Ember CLI Guides were not an Ember app. Over the past two years, the Learning Team has been Emberifying such sites, making them easier to maintain and develop further. Now, the only one remaining is the [website](https://github.com/emberjs/website) repository, which contains static pages like the home page and the blog. The transformation is [currently underway](https://github.com/ember-learn/ember-website).

This CLI Guides project tackled a few additional critical issues, like correcting outdated content and revising the learning flow. The original CLI guides were written a long time ago, before the CLI itself was fully formed, so it is natural that some rearranging was needed.

## Creating apps with Guidemaker and Ember-Styleguide

With as many apps as the Learning Team manages, it's helpful to have a consistent structure, look, and feel. For the most part, this project could focus on written content rather than regular web app concerns. It was awesome! We did this by using Guidemaker and ember-styleguide.

[Guidemaker](https://github.com/empress/guidemaker) is an Ember Addon originally created by [Chris Manson](https://github.com/mansona). It helps quickly create sites with static content. It also handles versioned documentation, like that found in the [Ember Guides](https://guides.emberjs.com). Guidemaker uses Broccoli's asset compilation pipeline to turn a tree of Markdown files into html that can be served statically. By using Guidemaker, if we need to version the CLI docs in the future, that feature is ready to go overnight. It also means that contributors to one Guide should feel right at home helping with others.

[ember-styleguide](https://github.com/ember-learn/ember-styleguide) is a UI library that has components and stylesheets used across the Ember apps. It was created during a massive effort to improve the web accessibility of Ember's websites, led by [Melanie Sumner](https://github.com/MelSumner). Thanks to this project, if changes need to be made to typography, color schemes, styling, etc, they can be made in one place instead of in ten separate apps.

When you put Guidemaker together with ember-styleguide, you get a documentation app that instantly matches the rest of the Ember websites.

## How the project came together - a case study

When big projects like this land, the work that went into it is often a mystery. Then, when someone wants to try a big project of their own, they may underestimate the work involved or overlook some steps. We'll share the overall workflow and some lessons learned along the way.

### Step 1 - choosing a focus

The first step was some serious brainstorming by the Learning Team at the EmberConf face-to-face meeting in March 2018. At first, we discussed doing a major overhaul of the Ember.js Guides, but we quickly realized that the CLI Guides were what was most in need of attention. Although the Ember.js Guides could be improved, the content was up to date and accurate. The same could not be said of the CLI Guides, and so that made it one of our top priorities.

Time Commitment: If you count everyone who was part of brainstorming, it would be 60 hours! However, let's call it 4 for now.

### Step 2 - Project assessment

In mid-2018, [Sivakumar Kailasam]() and [Jen Weber]() did a thorough assessmet of the CLI Guides, reading them from start to finish. They kept a tracking doc of everything that they saw that was out of date or missing.

This stage also included a careful look at the separation of concerns. What belonged in the regular Ember.js Guides instead of the CLI Guides? It turned out that a lot of content was duplicated between them.

Initially, the plan was to revise content in place, and then turn it into an Ember app later down the road. A few PRs were made as the assessment was underway. However, with the scope of changes required to deliver a better learning experience, it seemed more time efficient to start with a blank slate and move relevant content over.

Time Commitment: around 10 hours.

### Step 2 - Getting buy-in

Before going all-out with an RFC, Siva and Jen gathered input from the Core Teams. For the project to be successful, they would need support from the CLI and Learning Core teams. The plan would include their ideas and cover their concerns too. They would need help from both teams and the key community contributors in order to make the project a success.

Time Commitment: 5 hours, spent on chats on Discord and attending meetings for both teams.

### Step 3 - Gathering community feedback

Next, it was time to draft an RFC, or Request for Comments. RFCs are the way that anyone in the community can contribute to a project's direction.

The most difficult part of writing the RFC was determining the table of contents and deciding how to transition from the old site to the new content. The table of contents define the overall learning flow, and the URLs that result must be maintained indefinitely.

Time Commitment: 8 hours for the first draft, 3 hours of reviews before publication, 4 hours of editing to incorporate community feedback

### Step 4 - Spiking the foundation

At the same time as the RFC, Jen, Chris, and Siva laid the foundation for the new CLI Guides. That included generating the project files to match the table of contents, setting up a staging app so people could see the progress easily, and drafting the "first impressions" written content.

The start of the project was spiked in order to allow for fast iteration and establish a consistent flow. The goal was to create a structure that other contributors could add too through PRs with small scope and time commitments.

Time commitment: 50+ hours

### Step 5 - Asking for help

Before asking for help, we needed a clear picture of what people could help with and how the workflow would be managed. We needed to make it as easy as possible to contribute to the project. A README described how to run the project. A [Quest issue](https://github.com/ember-learn/cli-guides/issues/3) was drafted that outlined all the tasks that needed to be done to reach MVP. Some basic CI tests were put into place to increase confidence that PRs did not have app-breaking bugs.

Next, a team of contributors and maintainers was formed. A call for contributors was made via Twitter and the Ember Discord, with a link to the Quest Issue.

Over the course of two months, 20+ people helped write content, move it over from the old CLI guides, review what other people had written, and more. Incomplete PRs were encouraged, and often merged without extensive review. This helped the project move forward quickly. Since the project wasn't in production yet, things like links, formatting, and spellchecks could be done in later editorial PRs.

Time Commitment: 10 hours to set things up to make it easy to contribute. 100+ hours of content writing and revising PRs. 40 hours of PR reviews. 5 hours for a final editorial proofread and editing.

### Step 6 - Deployment

The final steps were to share the app with others!

On November 25th, 2018, five weeks ahead of the initial "end of year" goal, the new CLI Guides were published to [cli.emberjs.com](https://cli.emberjs.com).

Then, the links throughout the Ember websites were updated to includ the new CLI guides. 

Finally, a map of redirects was created so that the new app could fully replace the old site. It was important to not break links from blog posts of the past.

Time Commitment: 8 hours, including PRs to other repositories. 3 hours for this blog post.

### Lessons learned

The main lesson learned was that a project like this works best when there is no one person who is the bottleneck. Partway through the project, [Gaurav Munjal](https://github.com/Gaurav0) noted that momentum had slowed, and asked what could be done. At that point, Jen was the only one regularly reviewing and merging PRs. As an experienced addon author and creator of Ember Twiddle, Gaurav generously agreed to help review PRs and keep the project moving!

This project could have gone better if there were more people from the outset who were available to support community members as they opened new PRs or asked questions.

### Total time commitment

Overall, this project took over 240 hours of work from everyone involved. This doesn't count the work that was done in the past to create the Guidemaker and Ember Styleguide tools that made the app itself quick and easy to create.

When you consider that most of the work was done by volunteers in their free time, in tiny bursts each week, it's amazing that anything like this could come together!

## Help wanted

The CLI Guides are far from finished. Please help by sharing your feedback, ideas, and new content!

Mainly, we need more documentation to help Ember Addon authors and contributors. Today, the best way to learn how to make anything beyond the most basic addon is to study the addons that other people have built. We can do better! Someone who can make an Ember app should have the resources to help them create an addon just as easily.

Developers of all experience levels are encouraged to open issues or help draft content to fill in the missing pieces. Visit the [cli-guides](https://github.com/ember-learn/cli-guides) repository on GitHub to help out!

## Thank you!

Finally, a _huge_ thank you to everyone who helped support this project.

- The many, many people who wrote the original CLI Guides!
- Writers: [cah-danmonroe](https://github.com/cah-danmonroe), [maxwondercorn](https://github.com/maxwondercorn), [BradenLawrence](https://github.com/BradenLawrence), [Gaurav0](https://github.com/Gaurav0), [karlbecker](https://github.com/karlbecker), [sandstrom](https://github.com/sandstrom), [makepanic](https://github.com/makepanic), [MichalBryxi](https://github.com/MichalBryxi)
- Reviewers: [Gaurav0](https://github.com/Gaurav0),[BradenLawrence](https://github.com/BradenLawrence), [sivakumar-kailasam](https://github.com/sivakumar-kailasam), [kategengler](https://github.com/kategengler), [acorncom](https://github.com/acorncom), [mansona](https://github.com/mansona), [chriskrycho](https://github.com/chriskrycho), [jessica-jordan](https://github.com/jessica-jordan), [sandstrom](https://github.com/sandstrom), [rwjblue](https://github.com/rwjblue), [locks](https://github.com/locks), [kellyselden](https://github.com/kellyselden), [Turbo87](https://github.com/Turbo87), [https://github.com/twokul](twokul), [sbatson5](https://github.com/sbatson5), [chilicoder](https://github.com/chilicoder), [oskarrough](https://github.com/oskarrough), [CodingItWrong](https://github.com/CodingItWrong), [nataliemok](https://github.com/nataliemok), [ef4](https://github.com/ef4)
- Application infrastructure: [mansona](https://github.com/mansona)
- Test suite: [aklkv](https://github.com/aklkv) 
- RFC commentors: [jrjohnson](https://github.com/jrjohnson), [Gaurav0](https://github.com/Gaurav0), [ynotdraw](https://github.com/ynotdraw), [karlbecker](https://github.com/karlbecker), [sandstrom](https://github.com/sandstrom)
- The 818 contributors to this project's open source dependencies (spooky, isn't it?)

