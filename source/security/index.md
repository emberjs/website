---
title: "Security Policy"
responsive: true
---

# Ember.js Security Policy

## Reporting a Bug

We take security very seriously. Thank you for taking the time to
responsibly disclose any issues you find.

All security bugs in Ember.js or Ember
Data should be reported by email to
[security@emberjs.com](mailto:security@emberjs.com). This list is
delivered to a subset of the core team who handle security issues. Your
email will be acknowledged within 24 hours, and you'll receive a more
detailed response to your email within 48 hours indicating the next
steps in handling your report. If you would like, you can encrypt your
report using [our public key](/security/public-key.txt).

This email address receives a large amount of spam, so be sure to use a
descriptive subject line to avoid having your report be missed. After
the initial reply to your report, the security team will endeavor to
keep you informed of the progress being made towards a fix and full
announcement. As recommended by
[RFPolicy](https://dl.packetstormsecurity.net/papers/general/rfpolicy-2.0.txt), these updates will
be sent at least every five days. In reality, this is more likely to be
every 24-48 hours.

If you have not received a reply to your email within 48 hours, or have
not heard from the security team for the past five days, there are a few
steps you can take:

1. Contact the current security coordinator ([Robert Jackson](mailto:ember-security@rwjblue.com))
   directly.
2. Contact the back-up contact ([Tom Dale](mailto:tom@tomdale.net)) directly.
3. Post on the [Ember.js discussion forums](http://discuss.emberjs.com/)
   or ask in #emberjs.

Please note that the discussion forums and [emberjs discord server](https://discordapp.com/invite/zT3asNS) are public
areas. When escalating in these venues, please do not discuss your
issue. Simply say that you’re trying to get a hold of someone from the
security team.

## Disclosure Policy

Ember.js has a 5 step disclosure policy.

1. The security report is received and is assigned a primary handler.
   This person will coordinate the fix and release process. The problem
   is confirmed and a list of all affected versions is determined. Code is
   audited to find any potential similar problems. Fixes are prepared for
   all releases which are still under maintenance. These fixes are **not**
   committed to the public repository but rather held locally pending the
   announcement.

2. A suggested embargo date for this vulnerability is chosen and a [CVE](http://cve.mitre.org/)(Common Vulnerabilities and Exposures (CVE®)) is assigned for the vulnerability.

3. On the embargo date, the Ember.js security mailing list is sent a copy of
   the announcement. The changes are pushed to the public repository and
   new builds are deployed to emberjs.com. Within 6 hours of the
   mailing list being notified, a copy of the advisory will be published on
   the [Ember.js blog](/blog).

4. Typically the embargo date will be set 72 hours from the time the CVE
   is issued. However, this may vary depending on the severity of
   the bug or difficulty in applying a fix.

5. This process can take some time, especially when coordination is
   required with maintainers of other projects. Every effort will be
   made to handle the bug in as timely a manner as possible, however it’s
   important that we follow the release process above to ensure that the
   disclosure is handled in a consistent manner.

## Receiving Security Updates

The best way to receive all the security announcements is to subscribe
to the [Ember.js security mailing list](https://groups.google.com/forum/#!forum/ember-security). The mailing list is very low
traffic, and it receives the public notifications the moment the embargo
is lifted.

No one outside the core team and the initial reporter will be
notified prior to the lifting of the embargo. We regret that we cannot
make exceptions to this policy for high traffic or important sites, as
any disclosure beyond the minimum required to coordinate a fix could
cause an early leak of the vulnerability.

## Comments on This Policy

If you have any suggestions to improve this policy, please send an email
to security@emberjs.com.
