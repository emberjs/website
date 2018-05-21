---
title: Ember 1.0 RC6.1, RC5.1, RC4.1, RC3.1, RC2.1 RC1.1 Released
author: Tom Dale
tags: Releases, Security, 2013, Version 1.x
responsive: true
---

Because many Ember.js apps allow users to interact with private data, we
take security issues very seriously.

In fact, we're one of the few JavaScript projects that has a
[clearly outlined security policy](/security/) and a
[low-traffic mailing list exclusively for security
announcements](https://groups.google.com/forum/#!forum/ember-security).

We want developers to know that they can trust Ember enough to build
their businesses on top of it.

In that spirit, today we are announcing the release of Ember.js 1.0
RC6.1, RC5.1, RC4.1, RC3.1, RC2.1 and RC1.1. These are all security
releases that address a potential XSS security issue you can learn more
about by following this link:

* [CVE-2013-4170](https://groups.google.com/forum/#!topic/ember-security/dokLVwwxAdM)

It is recommended that you update immediately. In order to ease
upgrading, the only major change in each release is the security fix.

We would like to thank Mario Heiderich of [Cure53](https://cure53.de/)
for responsibly disclosing this issue, working with us on the patch
and the advisory, and having patience while we went through our
security procedure for the first time.

Like a smoke detector or fire extinguisher, having a security procedure
is something that you hope that you don't need; but when you need it,
you're glad you have it.

We hope that we can set an example for other projects in the JavaScript
world when it comes to taking security seriously. Initiatives like the
[Node Security Project](https://nodesecurity.io/) are a step in the
right direction.

We are very fortunate that this security issue is low severity. Due to
the sandboxed nature of the web browser, there are far fewer possible
exploit vectors for a JavaScript MVC framework to worry about than a
traditional server-side framework.

That being said, we will remain vigilant in ensuring that even small
security issues are taken care of properly. If you discover what you
believe may be a security issue in Ember.js, we ask that you follow
our [responsible disclosure policy](/security/).

Lastly, thanks to Yehuda Katz, Stefan Penner and Kris Selden, who
donated their valuable time to reviewing the patch, auditing other code
for similar vulnerabilities, and preparing the new releases.
