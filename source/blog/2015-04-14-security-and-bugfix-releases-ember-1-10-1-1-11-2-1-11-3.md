---
title: Security and Bugfix Releases - Ember 1.10.1, 1.11.2, 1.11.3
author: Matthew Beale
tags: Releases, Security, 2015
responsive: true
---

Because developers trust Ember.js to handle sensitive customer data in
production, we take the security of the project extremely seriously. Ember
remains one of the few JavaScript projects that has a [clearly
outlined security policy](/security/) and a
[low-traffic mailing list exclusively for security
announcements](https://groups.google.com/forum/#!forum/ember-security).

## Security Releases: Ember.js 1.10.1, 1.11.2

Today we are announcing the release of Ember.js 1.10.1 and 1.11.2, which
contain an important security fix.

* 1.10.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.10.0...v1.10.1)
* 1.11.2 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.11.1...v1.11.2)
* Additionally the stable, beta, and master branches have all been patched

These releases contain a fix for an XSS vulnerability that
you can learn more about on our security mailing list:

* [CVE-2015-1866](https://groups.google.com/forum/#!topic/ember-security/nbntfs2EbRU)

It is recommended that you update immediately. In order to ease
upgrading, the only change in each release is the security fix.

We would like to thank Phillip Haines of [Zestia](http://zestia.com/)
for working with us on identifying the issue and on the advisory process.

If you discover what you believe may be a security issue in Ember.js, we
ask that you follow our [responsible disclosure
policy](/security/).

If you are using Ember.js in production, please consider subscribing to
our [security announcements mailing
list](https://groups.google.com/forum/#!forum/ember-security).  It is
extremely low-traffic and only contains announcements such as these.

#### Additional Reading

* [Ember.js Security Policy Announcement](/blog/2013/04/05/announcing-the-ember-security-policy.html)
* [Ember.js Security Policy](/security/)
* [Ember.js Security Group](https://groups.google.com/forum/#!forum/ember-security)

## Ember.js 1.11.3

Ember.js 1.11.3 has also been released with a fix for nested `{{render}}` helpers. This is
in addition to the security patch.

* 1.11.3 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.11.2...v1.11.3)
