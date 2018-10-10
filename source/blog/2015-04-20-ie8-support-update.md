---
title: Internet Explorer 8 Support Will Be Removed in Ember 2.0
author: Tom Dale
tags: Compatibility, Recent Posts, 2015
responsive: true
---

After reviewing [this thread][rfc-ie8], it seems clear that the vast majority of
Ember users who have responded, including people working at large
corporations, are comfortable with dropping IE8 support in Ember 2.0.
On the other hand, while there is enormous support for dropping IE9
support as well, a number of people still rely on support for IE9, and
the benefits of dropping IE9 in Ember 2.0 are not as strong.

After reviewing discussion on the RFC proposal, many in-person conversations with Ember
users in large companies, and reviewing the private data sent to us via
email, we have decided that Ember 2.0 will support IE9+.

So how are we going to manage this transition, and what should you do
if your business still requires IE8 support for the time being?

## 1.13 with Extended Browser Support

The core team will continue to periodically release point releases in
the 1.13 series to patch security bugs and browser compatibility
issues, including issues in IE8.

No new features will be added, and we should be clear that we do not
intend people to stay on this release unless they must support IE8. Our
Semantic Version guarantees mean that the vast majority of the
community should migrate to the 2.x series as soon as possible.

It is important to note that Ember 1.13 will come with deprecation
warnings for everything that we will break in Ember 2.0. As a result,
if you are running Ember 1.13 without any deprecation warnings, you
should be able to easily upgrade to Ember 2.0. And because of the
Semantic Versioning guarantees in the Ember 2.x series, it should be
relatively simple to upgrade from Ember 1.13 to the most recent version
of Ember 2.x when you are able to drop IE8 support.

For example, imagine you build the Ember app for Big Widget Enterprise
Co. that requires IE8 support. You upgrade to 1.13 (the last release in
the 1.x series) and, over time, refactor code to eliminate all
deprecation warnings. Periodically, you apply 1.13 patch releases to
maintain browser compatibility and to fix potential security issues.

Then, in April of 2016, management decides that enough customers have
moved off IE8 that you no longer need to support it. At that time,
Ember 2.6 will be the most recent stable release. Because 1.13 without
deprecation warnings is forwards-compatible with Ember 2.6, you can
upgrade from 1.13 to 2.6 with little hassle.

With the integration of Ember CLI and Ember Data into the Semantic
Versioning guarantees, many of your dependencies will follow a similar
upgrade path.

## Ecosystem

Of course, the above guarantees only apply to Ember, Ember Data, Ember
CLI, and the rest of the core-supported packages. Addon authors are
free to define their own support matrices. We encourage those who
depend on older browsers to contribute back by submitting PRs to the
addons they use with compatibility patches. Likewise, we encourage
authors of existing addons to work with users to offer a browser
compatibility matrix as close to the core projects as possible.

If you require support for IE8 (and as a result, Ember 1.13), make sure
to make your voice heard across the addon ecosystem.

That said, you should expect that new addons that come out after Ember
2.0 will not target Ember 1.13, and you should factor that into your
decision to remain on the 1.13 Extended Browser Support release of
Ember.

## FastBoot

FastBoot, our effort to bring server-side rendering to all Ember apps,
is designed to offer even users with slow, low-feature browsers a fast
experience. While most people think of this as a benefit to mobile
users, IE8 certainly qualifies as a slow, low-feature browser.

Because Ember applications are written "route first", any idiomatic
Ember content app that uses links as the primary mode of navigation
will be able to provide a passable experience for users with an
unsupported version of JavaScript, or no JavaScript at all.

It is worth noting that FastBoot, in the medium term, will have good
support for read-only content sites. However, while it is possible to
support forms pretty easily, forms without JavaScript (using cookie
authentication) introduce the prospect of CSRF attacks. A good solution
for FastBoot forms that is also secure is probably a longer-term
project. We would encourage the community to experiment with a secure
approach to forms that works with FastBoot.

## jQuery Compatibility

In our RFC, we mentioned that dropping IE8 will give us the opportunity
to remove jQuery as a strict dependency. We should have been clearer
that we have no intent to remove the Ember APIs that delegate to jQuery
(such a Ember.$ and this.$() inside components).

Because these APIs will remain in 2.0, both for ease of upgrade and
because we have not yet made the jQuery dependency optional, Semantic
Versioning prohibits us from removing them until at least Ember 3.0.

On a personal note, we rely on jQuery heavily in our own apps. We think
it's a great library that remains hugely valuable to smooth over clunky
DOM APIs and browser quirks (even in modern browsers). For those users
who need the absolute smallest payload size, we don't want to saddle
you with a dependency that you don't need. But we expect the majority
of users to continue using jQuery, and we have no plans to remove the
Ember/jQuery integration at this time.

Thank you again for everyone who took the time to help us make this
decision, and thank you so much for being a part of the Ember
community.

[rfc-ie8]: https://github.com/emberjs/rfcs/pull/45

