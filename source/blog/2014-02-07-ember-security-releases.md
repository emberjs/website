---
title: Security Releases - Ember 1.2.2, and 1.3.2
author: Robert Jackson
tags: Releases, Security, Version 1.x, 1.2, 1.3, 2014
responsive: true
---

Because developers trust Ember.js to handle sensitive customer data in
production, we take the security of the project extremely seriously.  In
fact, we're one of the few JavaScript projects that has a [clearly
outlined security policy](/security/) and a
[low-traffic mailing list exclusively for security
announcements](https://groups.google.com/forum/#!forum/ember-security).

Today we are announcing the release of Ember.js 1.2.2,
1.3.2, and 1.4.0-beta.6 that contain an important security fix:

* 1.4.0-beta.6 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.4.0-beta.5...v1.4.0-beta.6)
* 1.3.2 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.3.1...v1.3.2)
* 1.2.2 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.2.1...v1.2.2)

These releases contain the fix for an XSS vulnerability that
you can learn more about on our security mailing list:

* [CVE-2014-0046](https://groups.google.com/forum/#!topic/ember-security/1h6FRgr8lXQ)

It is recommended that you update immediately. In order to ease
upgrading, the only major change in each release is the security fix
(other than 1.4.0-beta.6, which is a normal beta channel release with
the fix rolled in).

We would like to thank Hyder Ali of [Zoho](https://www.zoho.com)
for responsibly disclosing and working with us on the patch
and the advisory.

If you discover what you believe may be a security issue in Ember.js, we
ask that you follow our [responsible disclosure
policy](/security/).

If you are using Ember.js in production, please consider subscribing to
our [security announcements mailing
list](https://groups.google.com/forum/#!forum/ember-security).  It is
extremely low-traffic and only contains announcements such as these.

## Additional Reading

* [Ember.js Security Policy Announcement](/blog/2013/04/05/announcing-the-ember-security-policy.html)
* [Ember.js Security Policy](/security/)
* [Ember.js Security Group](https://groups.google.com/forum/#!forum/ember-security)
