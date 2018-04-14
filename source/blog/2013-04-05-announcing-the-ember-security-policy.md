---
title: Announcing the Ember.js Security Policy
author: Tom Dale
tags: Recent Posts, Security, 2013, 1
responsive: true
---

We know that building your apps on top of a framework requires
trust, and that trust is never put to the test more than when security
vulnerabilities are discovered.

While we're very fortunate to work on an open source project that runs
in a sandboxed environment, the browser, we realize that even JavaScript
applications can be vulnerable to attacks from malicious third-parties.

Ember.js is designed to mitigate common forms of attack. For example,
all values rendered using Handlebars are automatically escaped to
prevent XSS attacks, and developers must explicitly opt in to outputting
raw HTML.

To ensure that Ember applications stay safe, today we're announcing the
[Ember.js Security Policy](/security), to help security researchers and
developers responsibly disclose potential vulnerabilities in Ember and
Ember Data.

We have also set up the [Ember.js security announcements mailing
list](https://groups.google.com/forum/#!forum/ember-security). This is
an extremely low-traffic mailing list reserved solely for announcing
security releases of the framework. If you're deploying Ember to
production, you or your security team may wish to subscribe.

To be clear, there are no vulnerabilities we're aware of at this time
and there is not a security release forthcoming. We just take security
extremely seriously and believe that having a procedure in place ahead of
time will allow us to respond most effectively should the
worst happen.

If you have any questions or concerns that are not addressed by the new
security policy, please email us at
[security@emberjs.com](mailto:security@emberjs.com).

I'd like to thank the Ruby on Rails security team, from whom our
security policy was lifted almost wholesale, for serving as a role model
for open source projects everywhere.

Lastly, my personal thanks to [Aaron "tenderlove"
Patterson](https://twitter.com/tenderlove) and [Tony "bascule"
Arcieri](https://twitter.com/bascule) for reviewing our policy and
answering many of my ignorant questions.

Let's stay safe out there.
