---
title: Introducing Subteams
responsive: true
author: Tom Dale
tags: Recent Posts, Announcement, Roadmap, 2016
---

I'm very happy to share with you our plan to scale Ember's day-to-day
decision-making and coordination—something we're calling Subteams. We mentioned
some of this in this year's EmberConf keynote, and wanted to expand on the
specific details.

Ember.js was once just a view layer for rendering templates in the
browser, but has grown to become a complete SDK for the web. With one
`npm install`, you get everything you need to create a modern web
application.

Making things simple for developers often means a lot of coordination
and decision-making behind the scenes. As the number of pieces making up
Ember has grown—encompassing not only Ember.js but Ember CLI, Ember
Data, the Ember Inspector, documentation, and more—we want to ensure
that the Core Team does not become a bottleneck for progress.

At the same time, we believe that having a strong vision that everyone
can rally behind is critical to building software that feels cohesive.
So how do we ensure that everyone is pulling their cart in the same
direction, without losing momentum?

We're taking a page from [Rust's
playbook](https://internals.rust-lang.org/t/announcing-the-subteams/2042)
and adopting the idea of Subteams. While we've often had informal teams
tackle specific tasks, this change formalizes that process and
officially recognizes the hard work of these contributors.

## Core Team

The Core Team serves as the leadership for the Ember project as a whole.
Its responsibilities include:

* **Setting the overall direction and vision for the project.** This means
  setting the core values that are used when making decisions about
  technical tradeoffs. The core team also leads the writing of RFCs around new
  initiatives.
* **Setting priorities and the release schedule.** Design bandwidth is limited,
  and it's dangerous to try to grow the framework too quickly; the core
  team makes some difficult decisions about which areas to prioritize for
  new design, based on the core values and target use cases.
  The regular release cycle, being one of the project's core values,
  applies to subteams as well.
* **Focusing on broad, cross-cutting concerns.** The Core Team is specifically
  designed to take a global view of the project, to make sure the pieces
  are fitting together in a coherent way.
* **Spinning up or shutting down subteams.** Over time, we may want to expand the
  set of subteams, and it may make sense to have temporary "strike
  teams" that focus on a particular, limited task.
* **Going/no-going features**. While the subteams make decisions on RFCs,
  the Core Team is responsible for pulling the trigger that moves a
  feature from canary to beta. This provides an extra check that
  features have adequately addressed cross-cutting concerns and that the
  implementation quality is high enough.

Each subteam is led by a Core Team liaison. This member is responsible for
keeping the Core Team apprised of progress on important initiatives,
identifying potential areas of concern early, and escalating cross-cutting
issues when needed.

## Ember CLI

**Slack channel**: #dev-ember-cli  
**Discourse category**: [Ember CLI](http://discuss.emberjs.com/c/ember-cli)

**Core Team Liaisons**: Stefan Penner & Robert Jackson  

**Members**:

* Katie Gengler
* Chad Hietala
* Jake Bixby
* Nathan Hammond
* Kelly Selden
* Tobias Bieniek

## Ember Data

**Slack channel**: #dev-ember-data  
**Discourse category**: [Ember
Data](http://discuss.emberjs.com/c/ember-data)  

**Core Team Liaison**: Igor Terzic  

**Members**:

* Clemens Müller
* Christoffer Persson
* Stanley Stuart
* Brendan McLoughlin

## Learning

**Slack channel**: #-learning  
**Discourse category**: [Learning](http://discuss.emberjs.com/c/learning)

While the Ember CLI and Ember Data subteams should be self-explanatory,
this one is the newest and may require some explanation.

We intentionally did not call this subteam _Documentation_,
because documentation is just one part of how new users learn to use
Ember. People start learning the second they land on the website
homepage, or when they see a presentation at their local user group.

We want to make holistic learning a central part of Ember. In addition to good
guides and API documentation, this means thinking about how members of
the community interact, how they get help, and how we introduce them to
new features added via the RFC process.

The Learning Subteam is responsible for the website, the guides, the API
docs and making sure the Core Team is aware of common pitfalls people
hit, like confusing error messages or APIs. We will take this
information and feed it back into the framework itself.

The best documentation is the documentation you never have to write. By
reducing complexity, making errors clearer, and smoothing the learning
curve, we can help Ember reach an entirely new audience.

**Core Team Liaison**: Leah Silber

**Members**:

* David Baker
* Ricardo Mendes
* Todd Jordan

## Thank You

You can find information on the subteams and their members at
<http://emberjs.com/team/>. We will keep this page up-to-date as people
come and go.

A big thank you to the members of these teams, who donate their time and
energy to make the web a better place. If you're interested in helping,
please reach out to one of the above team members for the best way to
get started.

We are excited at the pace at which Ember has grown, and we think it
uniquely solves the challenge of building modern web applications in a
way that doesn't push all of the complexity to the app developer. We
could not build as ambitiously without the dedication of these people.
Please join me in welcoming the new subteams, and in thanking for them
all of their hard work!

*Many thanks to the Rust Core Team and particularly Aaron Turon's [Governance
RFC](https://github.com/aturon/rfcs/blob/rust-governance/text/0000-rust-governance.md),
and [subteam
announcement](https://internals.rust-lang.org/t/announcing-the-subteams/2042),
from which parts of this post are adapted.*
