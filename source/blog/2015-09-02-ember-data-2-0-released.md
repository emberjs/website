---
title: Ember Data v2.0 Released and v2.1 Beta Released
author: Tom Dale and the Ember Data Team
tags: Ember Data, 2015
responsive: true
---

We are excited to announce the release of Ember Data 2.0, the
second stable release since 1.13 that includes significant improvements,
cleanup, and cruft removal.

[As previously discussed][ember-20], Ember Data releases occur in
lockstep with Ember, to help developers better reason about
compatibility between these libraries. Ember Data 2.0 is designed to be
used in tandem with Ember 2.0, and like Ember 2.0, we have used the
occasion of a new major version number to remove deprecated features and
clean up the code.

[ember-20]: http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html

**Ember Data 2.0 is about removing deprecated
functionality, not adding new features**. If you've already started
using Ember Data 1.13 and cleared the deprecations, you should find
upgrading to Ember Data 2.0 to be very straightforward.

### JSON API

In the [Ember Data 1.13 blog post][ember-data-1-13], we described how we
had overhauled Ember Data's internals to use JSON API from top to
bottom.

[ember-data-1-13]: http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html

Using JSON API dramatically simplified internal code and APIs, but I
want to emphasize that **moving to JSON API internally does not affect
your applications, and you are in no way required to use JSON API
yourself to upgrade to newer versions of Ember Data**.

The adapters that determine how your application talks to the backend
server remain unchanged, but this change should make the lives of
adapter authors much simpler going forward.

### Unsaved Deleted Records

There is one significant breaking change in the move from 1.13 to
2.0. The short version of this change is **locally deleted (unsaved)
records are no longer removed from RecordArrays and hasMany
arrays. Ember Data now removes the deleted record only after the
delete has been confirmed by the backend. There is also a
[new addon](https://github.com/ember-data/ember-data-live-filter-by)
to make it easier to implement the old behavior.**

In Ember Data 1.13, once a record was marked as deleted, it was removed from
all of the `RecordArrays` and `hasMany` arrays it belonged to. This made it
difficult to create UIs where users could "un-delete" records.

For example, imagine you are building a document viewer app using Ember Data.
You show the user a list of documents they have access to. When the user
deletes a document, you want it to remain in the list, but with a different
visual treatment to indicate that it has been deleted locally (i.e., not saved back to the server).

![Example UI with deleted document](/images/blog/2015-08-03-ember-data-2-0-released/deleted-document.png)

Building this UI was difficult because the record would be removed from the
list as soon as you called `deleteRecord()` on the model.

In Ember Data 2.0, this will be a lot easier because records are no longer
removed from hasMany relationships or RecordArrays until the delete has been
acknowledged by the adapter. Note that Although deleted records will be visible
in hasMany relationships, they will not be serialized when saving these
relationships back to the server.

To make the transition easier, the Ember Data team (with help from
[Clemens Müller](https://github.com/pangratz)) has released an addon called
[Ember Data Live filterBy](https://github.com/ember-data/ember-data-live-filter-by). This
allows the `filterBy` method on `RecordArray`s and `hasMany`
relationships to return a live filtered subset of the original
array. This can be used to filter out deleted but unsaved records to
preserve the old behavior, where records are removed from collections
as soon as they are deleted. This addon work with Ember Data 1.13 and Ember Data 2.0.

```js
App.PostController = Ember.Controller.extend({
  allPosts: function() {
    return this.store.peekAll('post');
  }.property()
  allUndeletedPosts: function() {
    return this.store.peekAll('post').filterBy('isDeleted', false, { live: true });
  }.property()
});
```

# Ember Data 2.1 Beta

Ember Data data 2.1 will be the first release following Ember's 6 week
release cycle. Rather then rush new features into the beta before they
are ready, Ember Data 2.1 will not contain any new features or
deprecations. Instead the Ember Data team is going to spend this cycle
fixing issues, updating documentation and planning features for future
2.x releases.

## CHANGELOGS

* [Ember Data 2.0.0 CHANGELOG][2.0-changelog]
* [Ember Data 2.1.0-beta.1 CHANGELOG][2.1-changelog]

[2.0-changelog]: https://github.com/emberjs/data/blob/v2.0.0/CHANGELOG.md
[2.1-changelog]: https://github.com/emberjs/data/blob/v2.1.0-beta.1/CHANGELOG.md
