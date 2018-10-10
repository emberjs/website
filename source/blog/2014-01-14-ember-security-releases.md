---
title: Security Releases - Ember 1.0.1, 1.1.3, 1.2.1, and 1.3.1
author: Tom Dale
tags: Releases, Security, Version 1.x, 1.1, 1.2, 1.3, 2014
responsive: true
---

Because developers trust Ember.js to handle sensitive customer data in
production, we take the security of the project extremely seriously.  In
fact, we're one of the few JavaScript projects that has a [clearly
outlined security policy](/security/) and a
[low-traffic mailing list exclusively for security
announcements](https://groups.google.com/forum/#!forum/ember-security).

Today we are announcing the release of Ember.js 1.0.1, 1.1.3, 1.2.1,
1.3.1, and 1.4.0-beta.2 that contain important security fixes:

* 1.4.0-beta.2 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.4.0-beta.1...v1.4.0-beta.2)
* 1.3.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.3.0...v1.3.1)
* 1.2.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.2.0...v1.2.1)
* 1.1.3 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.1.2...v1.1.3)
* 1.0.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.0.0...v1.0.1)

These releases contain fixes for two potential XSS vulnerabilities that
you can learn more about by following these links:

* [CVE-2014-0013](https://groups.google.com/forum/#!topic/ember-security/2kpXXCxISS4)
* [CVE-2014-0014](https://groups.google.com/forum/#!topic/ember-security/PSE4RzTi6l4)

It is recommended that you update immediately. In order to ease
upgrading, the only major change in each release is the security fix
(other than 1.4.0-beta.2, which is a normal beta channel release with
the fixes rolled in).

We would like to thank Edward Faulkner of [CleriCare](http://clericare.com/)
for responsibly disclosing CVE-2014-0014 and working with us on the patch
and the advisory.

Additionally, I would like to extend a very deep thanks to Robert
Jackson of [DockYard](http://dockyard.com/) who dedicated his weekend
and significant amounts of time to auditing related code (which
lead to the discovery of CVE-2014-0013) and preparing the advisories,
patches, releases and this blog post.

I have always said that one of my favorite aspects of Ember.js is that
it is a truly community-driven project, and we all owe Robert a
significant debt of gratitude for helping us resolve this issue with the
diligence and attention to detail we've come to expect from him. Robert:
thank you.

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
