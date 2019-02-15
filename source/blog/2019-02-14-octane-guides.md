---
title: 'Community Update: Octane Documentation'
author: Melanie Sumner
tags: Recent Posts, 2019, Octane
responsive: true
---

The preview of the Octane edition of Ember is coming soon, and with all this work comes a lot of documentation. Since this requires coordination of many moving parts, we want to outline the approach we're taking, and outlining some ways that the community can contribute. 

## Preparation

In order to prepare for the new edition, the Learning Core Team spent time figuring out how to best transition the existing docs in such a way that was consistent with iterative innovation. 

One of the goals of improving the guides in general was to improve the learning flow in the guides (see [RFC #431](https://github.com/emberjs/rfcs/pull/431)). As such, we determined that a change to the table of contents was in order.   

## Updating the guides

As per the usual standard, we have planned out this work to be able to complete it in an iterative fashion. This was particularly important because we are updating guides as new features for the Octane release are merged into Ember. 

### Phases

This is roughly the planned phases of the documentation work.

Phase 1, Octane Guides, MVP: (see [Tracking issue](https://github.com/ember-learn/guides-source/issues/394))

1. Create octane branch of the guides for this work
1. Reorder the table of contents (as per the RFC)
1. Add in placeholders for any new sub-sections
1. Add or update content in each sub-section (prose, code samples) [https://github.com/ember-learn/guides-source/issues/394](https://github.com/ember-learn/guides-source/issues/394)
1. Review, Edit & re-arrange sub-sections before preview launches
1. Add re-direct URLs and remove old content

Then the Octane guides will be considered in MVP status and we will move forward to the next phase, which will include all of the sections that were identified in the table of contents RFC but were not included in the MVP. 

Through all of these phases, a preview of the Octane edition guides will be used to ensure that the documentation is staying on track with the intended features. 

While new content is being written and older content is being updated, **no existing content will be completely deleted.** Only _after_ we have fully reviewed the content and added the re-directs will outdated content be removed. This means that in the interim, some content may be available if the user has the URL, but it won't be linked from the table of contents. 

### Challenges
As with any ambitious undertaking, there are some related challenges. Here are a few we are currently facing: 

- some of the details around converting guides from classic syntax to new syntax
- the number of sub-sections for each guide section
- handling redirects for old content in a way that won't break existing deprecation messages

We expect to work through these challenges and have a process in place to handle them, but we should have a shared awareness that our approach may be tweaked as the next month goes on, to address these issues. 

## How you can help
We expect that the community will be willing to submit PRs to help make the documentation better- from checking for spelling or grammar errors, to adding code samples, and even more ambitiously, writing some prose. 

Thanks to our infrastructure upgrades in 2018, we are well-positioned to accept community participation in the documentation effort. Please see the open issues in the [guides source repository](https://github.com/ember-learn/guides-source/issues) and let us know in the #dev-ember-learning channel (on Discord) if you would like to work on an issue. 

All PRs for this should be made against the `octane` branch of the [guides repo](https://github.com/ember-learn/guides-source) and should follow the regular standards for pull requests to documentation, the most important being one issue per pull request. 

### Future of Contributing

The Learning Core Team is working to make it even easier to contribute. We are planning better contributing guides than we've ever had before, and you can be part of this process! We're adding a Contributing section to the website–participate in shaping this content by helping review/comment on [RFC #446](https://github.com/emberjs/rfcs/pull/446).


