---
title: Ember Security Releases
author: Robert Jackson
tags: Releases, Security, Recent Posts
---

The following new versions contain important security fixes:

* 1.4.0-beta.2 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.4.0-beta.1...v1.4.0-beta.2)
* 1.3.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.3.0...v1.3.1)
* 1.2.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.2.0...v1.2.1)
* 1.1.3 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.1.2...v1.1.3)
* 1.0.1 -- [Compare View](https://github.com/emberjs/ember.js/compare/v1.0.0...v1.0.1)


The security fixes are for the following vulnerabilities:

###CVE-2014-0013

**Potential XSS Exploit With User-Supplied Data When Binding Primitive Values**

When a primitive value is used as the Handlebars context, that value is not
properly escaped.  An example of this would be using the `{{each}}` helper to
iterate over an array of user-supplied strings and using `{{this}}` inside the
block to display each string.

In applications that contain templates whose context is a primitive value and
use the `{{this}}` keyword to display that value, a specially-crafted payload
could execute arbitrary JavaScript in the context of the current domain
("XSS").


###CVE-2014-0014

**Potential XSS Exploit With User-Supplied Data When Using {{group}} Helper**

When using the `{{group}}` helper, user supplied content in the template was not
being sanitized. Though the vulnerability exists in Ember.js proper, it is only
exposed via the use of an experimental plugin.

In applications that use the `{{group}}` helper, a specially-crafted payload
could execute arbitrary JavaScript in the context of the current domain
("XSS").

##Additional Reading

* [Ember.js Security Policy Announcement](http://emberjs.com/blog/2013/04/05/announcing-the-ember-security-policy.html)
* [Ember.js Security Policy](http://emberjs.com/security/)
* [Ember.js Security Group](https://groups.google.com/forum/#!forum/ember-security)

**Please update to the fixed versions as soon as possible.**
