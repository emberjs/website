---
title: Security Incident - AWS S3 Access Key Exposure
responsive: true
author: Tom Dale
tags: Security, 2016
---

On November 29th, 2016, the Ember security team was notified that version `2.11.0-beta.1` of the `ember-source` npm package inadvertently included a file that contained an AWS access key. This access key had permissions for full read/write access to the Ember S3 buckets.
These buckets are used to distribute pre-built versions of Ember.js and related libraries and host other static content:

- Ember.js via `builds.emberjs.com`
- Ember Data via `builds.emberjs.com`
- Backburner.js via `builds.emberjs.com`
- Handlebars.js via `builds.handlebarsjs.com.s3.amazonaws.com`
- RSVP.js via `rsvpjs-builds.s3.amazonaws.com`
- Router.js via `routerjs.builds.emberjs.com.s3-website-us-east-1.amazonaws.com`
- Ember guides and API documentation

While the vast majority of Ember users retrieve new releases from Bower or npm, the builds on S3 are frequently used with online tools like JSBin and Ember Twiddle or anywhere it is more convenient to add a `<script>` tag.

After performing a full audit, we concluded that the key was *not* accessed during the timeframe of the incident, and there was no evidence of unauthorized activities. Therefore, **no action is required on your part**. This notice is advisory and contains an incident description as well as our mitigation plans.

### Incident Report

At 4:13pm PST on November 29th, version `2.11.0-beta.1` of `ember-source` was published from the computer of a member of the Ember release team and inadvertently included the AWS access key.

At 9:25pm, a member of the Ember security team was privately notified of the key exposure. We immediately acknowledged the notification and began investigating the issue.

At 9:33pm, we confirmed the key exposure by installing the package from npm and examining its contents. We verified that there were no other Ember-related secrets included in the package other than the AWS access key.

At 10:26pm, we revoked access to the exposed access key. There was a delay between the incident verification and the key revocation because the individuals with administrator access to AWS were not at a computer when the report was received.

Once the access key was revoked, we began to assess if the compromised key had been used by an unauthorized user. Concurrently, we began auditing when the access key was introduced to the `ember-source` package.

The IAM Access Advisor in AWS indicated that the exposed access key only had permission to access S3 buckets, and that it had not been used in the past 376 days. We also verified that no previous releases contained the access key. This access key had not been used in over a year because we began publishing to S3 from our Continuous Integration server.

Because AWS indicates that the access key has not recently been used, and because it only had access to S3, we concluded that an unauthorized user had not been able to use the key before access was revoked. There was no indication that any files in our S3 buckets had been tampered with.

At this time, we decided against requesting that the affected package be yanked from npm. We know that yanked packages can cause sudden build failures and believed that any security risk had been mitigated by revoking the compromised access key.

We also audited the S3 access logs, which had been previously enabled. These logs did not indicate any unauthorized access. However, the logs themselves were stored in an S3 bucket that the compromised key had access to, so we did not consider them to be as reliable as the key's last accessed date, which an unauthorized user would be unable to alter.

### Mitigations

We have implemented or are planning to implement several mitigations to prevent exposures of this kind in the future.

1. We have begun removing permissions to access S3 from all IAM accounts associated with individual team members.
2. We no longer grant access to all S3 buckets to any one account.
3. We are migrating to a CI-deployed system so we will no longer need publish to npm or Bower from an individual's computer. We will have our Continuous Integration system (and only our CI system) publish new releases, as we do with the builds that are uploaded to S3.
4. We will modify the S3 permissions to be "append only," so our CI system can only upload new objects to S3, not delete or modify existing objects. This would prevent tampering with older releases and limit the extent of an attack if the keys are exposed in the future.
5. We are examining options for increasing the logging and auditability of our AWS infrastructure, such as enabling CloudTrail.

### Conclusion

We take the security of Ember and the applications you build with it very seriously. I sincerely apologize that we let this happen. We will work to improve our release process to prevent similar security lapses from happening in the future.

We are deeply appreciative that this mistake was responsibly disclosed so that we were able to revoke the access key before a malicious attacker took advantage of it.

I would like to extend a personal note of thanks to Marcelo Mira (@marcemira), who noticed the exposure and promptly reported the issue privately. This quick action prevented a bad situation from becoming much worse.

I'd also like to thank Godfrey Chan, who displayed exemplary professionalism, composure and diligence in quickly responding to the report late at night. He is a true asset to the team.

If you discover a security-related issue in Ember, we ask that you follow our [disclosure policy](/security/).

#### Additional Reading

* [Ember.js Security Policy Announcement](/blog/2013/04/05/announcing-the-ember-security-policy.html)
* [Ember.js Security Policy](/security/)
* [Ember.js Security Mailing List](https://groups.google.com/forum/#!forum/ember-security)
