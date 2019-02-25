---
title: Ember.js Face-to-Face Meeting Summary, Q4 2018
author: Jen Weber, Matthew Beale
tags: Announcement, Recent Posts
responsive: true
---

Last month, members of the [Ember.js Core Team](https://emberjs.com/team/) met in-person and remotely to review the direction that the framework API is headed, work through some architectural design questions, and figure out next steps. In this article, we’ll share a summary of the discussions and themes of the weekend.

## What happens in a F2F meeting?

"F2F" stands for face-to-face, a meeting where members of a core team get together to work on problems or brainstorm in a way that is difficult to do remotely or in one-hour meetings. Each of the core teams of Ember meets at least once a year, often right after EmberConf.

All core teams make an effort to keeps notes of their meetings, and you can find the agenda and notes (covering day one) for the framework F2F [in the core notes repo](https://github.com/emberjs/core-notes/blob/master/ember.js/2018-12/F2F-Ember-Core-Team-20181215.md).

Read on for a summary of what was covered.

## Octane RFC review

The F2F agenda focused on discussing and commenting on [open RFCs](https://github.com/emberjs/rfcs/pulls), especially those related to Ember “Octane”. Octane will be Ember’s first [edition release](https://github.com/emberjs/rfcs/pull/371), a minor version release of the framework accompanied by updated blueprints for new apps and documentation that focuses on new programming models. Octane will bring a new and improved developer experience to Ember. It will be a minor (non-breaking change) release of the framework that brings Ember’s newest and best features to the forefront.

Among the RFCs discussed were:

- Template Imports - The [Module Unification Packages RFC](https://github.com/emberjs/rfcs/pull/367) introduced a method to import components from an addon into a template. There is a lot of interest in unifying any import design with the semantics and syntax of JavaScript itself, and this was debated extensively. Keep your eyes peeled for an RFC discussing concrete API proposals!
- [Remove jQuery by default](https://github.com/emberjs/rfcs/pull/386) - Dropping jQuery from Ember’s default blueprint impacts other packages your app may use. Instead of jQuery being implicitly present, those packages must now explicitly require it. A large part of the feedback and discussion of this RFC was focused on the impacts this change has on other app dependencies. Additionally some libraries are dependent upon jQuery prefilters to modify every request to a server (for example to add an authorization header), and updates to the RFC were requested to address that. [Read our detailed feedback here](https://github.com/emberjs/rfcs/pull/386#issuecomment-449666712).
- [Glimmer Components](https://github.com/emberjs/rfcs/pull/416) and [Render Element Modifiers](https://github.com/emberjs/rfcs/pull/415) - The Glimmer Components RFC introduces an API for components that does not include any DOM-based hooks (for example `didInsertElement`). The "Render Element Modifiers" RFC is intended to bring those APIs back into Ember with a different approach. In the discussion we realized the APIs being suggested for this narrow case are extremely similar to the APIs you might want for modifiers as a general tool. Trying to bridge the gap between this use-case and a generalized design for invokable modifiers was brought up as a goal.
- [Editions](https://github.com/emberjs/rfcs/pull/371)
- [Tracked Properties](https://github.com/emberjs/rfcs/pull/410)
- [Decorators](https://github.com/emberjs/rfcs/pull/408)

One of the framework’s main strengths is that Ember apps have uncommon longevity compared to many other apps in the JavaScript ecosystem. We believe it’s important that these new features all work well as a whole unit, in terms of current user adoption, new learner experience, and technical performance. 

To learn more about Octane and how these RFCs work to support it, see the [2018 Roadmap RFC](https://github.com/emberjs/rfcs/pull/364) by Tom Dale, which introduces Octane, and the [Editions RFC](https://github.com/emberjs/rfcs/pull/371) by Dave Wasmer.

## Review of website improvement progress
There is an opportunity to refresh and renew more than our APIs. As previously described in [The Ember Times](https://the-emberjs-times.ongoodbits.com/), significant work is underway to improve the architecture, look, and feel of our public website, [emberjs.com](https://emberjs.com). Framework core team members received an update on the latest progress, which is now an [RFC open to public review](https://github.com/emberjs/rfcs/pull/425). Over the past year, many pieces of the multiple web apps that make up our public site have been refactored to use a central style guide and common UI components, making the upcoming visual refactor possible. This work has been done in [ember-styleguide](https://github.com/ember-learn/ember-styleguide). 

There has been major progress in accessibility, consistency, and better marketing messaging of the site, but there’s still more work to do! The Learning Team and the Website Strike team are on the job. Stay tuned for more updates in the new year.

## Action items
It’s safe to say that there’s a lot of work to do for the features and documentation that make up the Octane edition! To follow along or help out, see the [Octane Tracking Issue](https://github.com/emberjs/ember.js/issues/17234). The new architecture for the public site is a work in progress app found [here](https://github.com/ember-learn/ember-website).

## What’s next?
Before every [EmberConf](https://emberconf.com/), the largest gathering of Ember devs, there’s always a flurry of activity. It seems like the first quarter of 2019 might be the liveliest one yet! There are less than two months to go, and some big plans underway. Stay tuned for updates via [The Ember Times](https://the-emberjs-times.ongoodbits.com/), the [Ember.js Twitter](https://twitter.com/emberjs), and “watch” the [ember.js GitHub repository](https://github.com/emberjs/ember.js)... if you dare. 

Hope to see you in March at EmberConf!

