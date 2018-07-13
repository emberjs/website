---
title: Requiring two-factor authentication on our GitHub organizations
author: Katie Gengler
tags: Recent Posts, Announcement, Security, 2018
responsive: true
---

As of today, we are requiring all members of Ember GitHub organizations to have [two-factor authentication (2FA)](https://authy.com/what-is-2fa/) enabled. 

The following are the relevant organizations:

- [Ember.js](https://github.com/emberjs)
- [ember-cli](https://github.com/ember-cli)
- [Glimmer.js](https://github.com/glimmerjs)
- [ember-data](https://github.com/ember-data)
- [Ember Learning Team](https://github.com/ember-learn)
- [ember-engines](https://github.com/ember-engines)
- [Ember FastBoot](https://github.com/ember-fastboot)

Only members of these organizations--those with potential write access--are required to have 2FA enabled. It is NOT required to open an issue, make a PR, or otherwise interact with the organizations on GitHub. However, we strongly recommend [enabling 2FA](https://help.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/), especially for any account with write access to public repos. 

When we enabled this requirement any members without 2FA enabled were automatically removed from the above organizations. If you were removed from one of those organizations today, please enable 2FA and contact `katie` in the [community slack](https://ember-community-slackin.herokuapp.com/) or your favorite organization admin to be re-invited.  

We have formalized this policy after self-auditing our security policies in the wake of [yesterday's npm incident](https://blog.npmjs.org/post/175824896885/incident-report-npm-inc-operations-incident-of). Because developers trust Ember.js to handle sensitive customer data in production, we take the security of the project extremely seriously. The Ember project maintains a [clearly outlined security policy](https://www.emberjs.com/security/). 

If you discover what you believe may be a security issue in Ember.js, we ask that you follow our [responsible disclosure policy](https://www.emberjs.com/security/#toc_disclosure-policy).

If you are using Ember.js in production, please consider subscribing to our [security announcements mailing list](https://groups.google.com/forum/#!forum/ember-security). It is extremely low-traffic and only contains high-priority security announcements.
