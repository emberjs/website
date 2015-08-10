---
title: Ember Data v2.0 Released
author: Tom Dale and the Ember Data Team
tags: Recent Posts, Releases
---

Today we are excited to announce the release of Ember Data 2.0, the
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

[ember-data-1-13]: http://emberjs.com/blog/2013/05/03/ember-data-progress-update.html

Using JSON API dramatically simplified internal code and APIs, but I
want to emphasize that **moving to JSON API internally does not affect
your applications, and you are in no way required to use JSON API
yourself to upgrade to newer versions of Ember Data**.

The adapters that determine how your application talks to the backend
server remain unchanged, but this change should make the lives of
adapter authors much simpler going forward.

### Unsaved Deleted Records

There is one significant change being made in the move from 1.13 to 2.0.

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

If you want to preserve the old behavior, where records are removed from
collections as soon as they are deleted, `RecordArray`s and `hasMany`
relationships implement (since Ember Data 1.13.8) a `filterBy` method that
returns a live filtered subset of the original array.  This can be used to
filter out deleted but unsaved records.

```js
App.PostController = Ember.Controller.extend({
  allPosts: function() {
    return this.store.peekAll('post');
  }.property()
  allUndeletedPosts: function() {
    return this.store.peekAll('post').filterBy('isDeleted', false);
  }.property()
});
```
