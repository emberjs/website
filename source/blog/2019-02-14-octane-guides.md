---
title: 'Community Update: Octane Documentation'
author: Melanie Sumner
tags: Recent Posts, 2019, Octane
responsive: true
---

Octane is coming soon, and with all this work comes a lot of documentation. Since this requires coordination of many moving parts, we want to outline the approach we're taking, and outlining some ways that the community can contribute. 

## Preparation

In order to prepare for the new edition, the Learning Core Team spent time figuring out how to best transition the existing docs in such a way that was consistent with iterative innovation. 

- Jen's [RFC](https://github.com/emberjs/rfcs/pull/431)
- Infrastructure support

## Updating the guides

As per the usual standard, we have planned out this work to be able to complete it in an iterative fashion. This was particularly important because we are updating guides as new features for the Octane release are merged into Ember. 

### Phases

This is roughly the planned phases of the documentation work: 
1 Reorder the TOC (as per the RFC)
1 Add in new sub-sections
1 Accept PRs for content in each sub-section
1 Edit & re-arrange before preview launches
1 Add re-direct URLs and remove old content

Through all of these phases, the guide preview will be used to ensure that the documentation is staying on track with the intended features. 

While new content is being written and older content is being updated, no existing content will be completely deleted. Only after we have reviewed the content and added the re-directs will content be removed. This means that some content may be available if the user has the URL, but it won't be linked from the table of contents. 

### Challenges
- converting concepts from classic syntax to new syntax
- what to do about temporarily needed guides
- handling redirects for old content

## How you can help
Thanks to our infrastructure upgrades in 2018, we are well-positioned to accept community participation in the documentation effort. Please see the open issues in https://github.com/ember-learn/guides-source/projects/4 and let us know in the #dev-ember-learning channel (on Discord) if you would like to work on an issue. 

All PRs for this should be made against the `octane` branch of the [guides repo](https://github.com/ember-learn/guides-source).

### Future of Contributing
- Jessica's [RFC](https://github.com/emberjs/rfcs/pull/446)
