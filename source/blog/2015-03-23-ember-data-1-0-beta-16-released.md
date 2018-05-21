---
title: Ember Data v1.0.0-beta.16 Released
author: Brendan McLoughlin
tags: Ember Data, 2015, Version 1.x
responsive: true
---


We are pleased to announce the release Ember Data 1.0.0-beta.16. It
includes many bug fixes as well as several new features. As always
this release can be obtained from npm (for use with ember-cli),
rubygems, or bower. The builds are also available as static files at
emberjs.com/builds

The 1.0.0-beta.16 release represents the effort of at least 31
contributors across over 112 commits.

## New Core Contributor

Contributor [Christoffer Persson][wecc] has been given collaborator
status and will help us triage issues, merge pull requests, and
contribute bug fixes and documentation. Christoffer has been extremely
active in triaging issues and contributing features and bug fixes to
the Ember Data project.

## Breaking Changes

### The store now passes snapshots instead of records to adapter methods

In 1.0.0-beta.15 Ember Data introduce the Snapshot API and began
passing snapshot instances into all serializers to prevent
side-effects from occurring when inspecting relationships for
serialization. This introduces some pain points in 3rd party adapters
and serializers since they could not easily create snapshot instances
without using private APIs. In Ember Data 1.0.0-beta.16 the
store will now pass snapshot instances into adapters methods instead
of record instances.

The following adapter methods now receive snapshots instead of records:

- `find(store, type, id, snapshot)`
- `findMany(store, type, ids, snapshots)`
- `findHasMany(store, snapshot, url, relationship)`
- `findBelongsTo(store, snapshot, url, relationship)`
- `createRecord(store, type, snapshot)`
- `updateRecord(store, type, snapshot)`
- `deleteRecord(store, type, snapshot)`

The signature of `buildURL(type, id, snapshot)` has also been updated to receive
snapshots instead of records.

This change removes the need for adapters to create snapshots manually using the
private API `record._createSnapshot()` to be able to pass snapshots to
serializers.

Snapshots are backwards-compatible with records (with deprecation warnings) and
it should be pretty straight forward to update current code to the public
Snapshot API:

```js
post.get('id')           => postSnapshot.id
post.get('title')        => postSnapshot.attr('title')
post.get('author')       => postSnapshot.belongsTo('author')
post.get('comments')     => postSnapshot.hasMany('comments')
post.constructor         => postSnapshot.type;
post.constructor.typeKey => postSnapshot.typeKey
```

If you need to access the underlying record of a snapshot you can do so by
accessing `snapshot.record`.

The full API reference of `DS.Snapshot` can be found [here](http://emberjs.com/api/data/classes/DS.Snapshot.html).

## Improvements


### Store as a Service

The store has now been registered as a service. So when you are using
Ember Data 1.0.0-beta.16 with Ember 1.10+ you can now inject the store
into any Ember object managed by the container.

```js
App.TweetComposerComponent = Ember.Component.extend({
  store: Ember.inject.service(),
  newTweet: function() {
    return this.get('store').createRecord('tweet', {});
  }
});
```

Please give a warm thanks to [martndemus][martndemus] for his
work implementing this feature!

### Mixins in Polymorphic Relationships

[Igor Terzic][igorT] Added support for using mixins in polymorphic
relationships. This allows Ember Data to reference Mixins instead of
Model classes as the type argument for relationships.

```js
App.Comment = DS.Model.extend({
  owner: belongsTo('commentable', { polymorphic: true })
});

App.CommentableMixin = Ember.Mixin.create({
  comments: hasMany('comment')
});
```

### Better Support for using multiple stores

[James Murphy][jmurphyau] landed an
[awesome PR](https://github.com/emberjs/data/pull/2617) that makes it
easier to use multiple stores in your Ember Application.

## Changelog

In addition to the major changes mentioned above this release also
includes many bug fixes and documentation updates. Be sure to check
out the change log for the full list of updates.

+ [Ember Data 1.0.0-beta.16 CHANGELOG](https://github.com/emberjs/data/blob/v1.0.0-beta.16/CHANGELOG.md)


<!-- Links -->
[wecc]: https://github.com/wecc
[martndemus]: https://github.com/martndemus
[jmurphyau]: https://github.com/jmurphyau
[igorT]: https://github.com/igorT
