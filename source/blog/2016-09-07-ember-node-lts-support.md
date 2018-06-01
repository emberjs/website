---
title: Ember Node.js LTS Support
responsive: true
author: Nathan Hammond
tags: Recent Posts, Ember CLI, Node, 2016
---

Ember is committed to being a good steward of our collective codebases as part of the [Node.js](https://nodejs.org/en/) [ecosystem](https://www.npmjs.com/). In that spirit we will be following the [Node.js Long Term Support Schedule](https://github.com/nodejs/LTS#lts-schedule) to provide clear guarantees of which versions of Node.js we support and how long we will support them. We will test against the same set of releases which the Node.js Long-term Support Working Group says they support: any "Current", "Active LTS", or "Maintenance" releases.

### What does support mean?

All Ember projects can be expected to work in any of the supported Node.js versions and will support every documented feature. We will not maintain separate branches or classes of support for different Node.js support classifications. For example, Ember CLI can be expected to work just the same running on a "Maintenance" Node.js version as it does on a "Current" Node.js version. Not all of our projects presently align to this pattern but we will, over time, coalesce to this state.

Meeting this commitment does not come without cost and tough decisions. However, as maintainers of foundational libraries, we believe that it is in our best interest to validate the legitimacy of the Node.js LTS plans, help position Node.js as a reliable and dependable tool for all enterprises, and contribute toward improving the reputation of the ecosystem.

### How We Drop Support

To make it easier for us to deliver on our support promise we have adopted a policy that the `HEAD` of our `master` branches will be compatible with all versions of Node.js currently receiving support. For any Ember project on the day we drop support for a Node.js version the following things will happen:

- We will update the `engines` key inside of `package.json` to specify the versions supported by the project.
- We will update the testing targets to remove the newly-unsupported Node.js version from the list.
- We will begin accepting code without testing it against the newly-unsupported version of Node.js.

For projects with an unspecified release model we will release one last version of the project prior to those steps. The version number change will reflect [SemVer](http://semver.org/) with respect to the APIs of the project and not take into consideration removal of Node.js version support. This means that the release may show up as a "patch" version release. For example, if we're dropping support for Node.js 0.10 and have a project at version 1.3.3 we can drop Node.js 0.10 support when we release version 1.3.4.

For Ember CLI, which follows a six week release train model, we will continue to patch the currently released version and maintain compatibility. Those patches will not break compatibility with the Node.js versions that Ember CLI supported when it was released. The next six week release of Ember CLI will drop support for the newly-unsupported Node.js version. For example, if we release Ember CLI 2.8.0 on September 6, drop support for Node.js 0.10 on October 1, and discover a bug on October 5 necessitating a 2.8.1 patch release that release will support Node.js 0.10 even though we have officially dropped support. The first version which will not support Node.js 0.10 will be Ember CLI 2.9.0 scheduled to be released on October 17.

### Node.js 0.10 & Node.js 0.12

Over the next four months Node.js will remove the 0.10 and 0.12 versions from "Maintenance." We in the Ember community will follow suit. This means that on October 1, 2016 we will drop support for Node.js 0.10 and on January 1, 2017 we will drop support for Node.js 0.12.

Both of these versions are very long in the tooth and have had a good run but we're not sad to see them go. We're looking forward to getting to use [language features we've had for years in other environments](http://kangax.github.io/compat-table/es6/#node012).

### Recommended Version

We recommend that you use the most-recent "Active LTS" version of Node.js. At present that is [Node.js v4.5.0](https://nodejs.org/en/download/). This is not to say that you may not use other versions, but by rule the current "Active LTS" will receive the most attention during our testing cycles and be most broadly used within the community.

### Future Plans

We recognize that we don't have the privilege of unilaterally setting this as the default for the entire Node.js ecosystem. It is our hope that with leadership from our community we can encourage more of the Node.js ecosystem to commit to following the schedule laid out by the Node.js LTS Working Group.

We don't presently rely upon transpilation to support older versions of the Node.js runtime from a codebase using current JavaScript features. This may change in time but we don't yet believe the story for tooling and debugging of transpiled JavaScript for Node.js has reached the inflection point where the benefits outweigh the costs.

Further, if we find ourselves maintaining our own forks or depending upon legacy versions of much of the JavaScript ecosystem, we reserve the option to change our approach in the future. As always we will be paying close attention to the community's needs and will give at least a six month notice of any change to this stated support policy.

_Special thanks to [Hannah Wolfe](https://github.com/ErisDS) for helping direct us to this approach._