---
title: Cleaning Up Github Issues
author: Peter Wagenet
tags: Recent Posts, 2014
responsive: true
---

If you've been following along, the Ember issues tracker has grown to over 200 active issues. While this is better than some other large OSS projects, it's still too large for us on the core team to easily keep track of. There are also a number of issues that are over six months old and even a year or two old.

Declaring straight-up issue bankruptcy is appealing, but does a disservice to everyone involved. There's a lot of useful information here for the core team and many of these issues are things we are actively working on solving. So we're attempting to cut down on the number of issues in a bit more targeted way.

In many cases these old issues stuck around because the solution was non-trivial and only a limited set of contributors was qualified to fix them. In some instances, a fix involves considerable internal refactoring that no one has yet had time to do and was hard to justify for just one fix.

To help keep things manageable, we'll be consolidating these types of issues into single meta issues. Over time we do intend to refactor and clean up different parts of the internals and knowing what bugs we need to fix while we're at it will be helpful. The original issues will be closed to help reduce overall noise, but we'll still make sure to consider them when doing our refactoring. Please continue to comment on the original issue so we can keep things organized.

In some cases, we may close issues without a meta if there is a clean workaround (we don't want you to have to use hacks) or if the issue is very minor. If you think we miscategorized an issue, please let us know. We're also still happy to receive PRs for these issues, though it's probably wise to double check with us first.

I hope we can make the issue tracker more useful and effective for everyone.
