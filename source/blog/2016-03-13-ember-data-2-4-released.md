---
title: Ember Data 2.4 and 2.5 Beta Released
author: Brendan McLoughlin
tags: Ember Data, Releases, 2016
responsive: true
---

Ember Data 2.4, a minor version release of Ember Data, is released today. This release represents the work of over 20 direct contributors, and over 76 commits.

Ember Data 2.5 beta.1, the branch of Ember Data that will be released as stable in roughly six weeks, is also being released today.

### Changes in Ember Data 2.4

#### Friendly Errors

[@nikz](https://github.com/nikz) has implemented
[RFC 101](https://github.com/emberjs/rfcs/pull/101) which provides
more context for `RESTAdapter` and `JSONAPIAdapter` errors in Ember
Data. Be sure to check out the
[pull request](https://github.com/emberjs/data/pull/3930) for more
details.

#### Importing Modules

[@pangratz](https://github.com/pangratz) [added public paths](https://github.com/emberjs/data/pull/4125) to make it easy to import the `DS.EmbeddedRecordsMixin` and `DS.Serializer` modules.

```js
// DS.EmbeddedRecordsMixin
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

// DS.Serializer
import Serializer from 'ember-data/serializer';
```

#### Fastboot Support

[@danmcclain](https://github.com/danmcclain) added [two](https://github.com/emberjs/data/pull/4111)
[commits](https://github.com/emberjs/data/pull/4113) to enable support
for Ember Data with the
[Ember CLI Fastboot addon](https://github.com/tildeio/ember-cli-fastboot).

For more details on changes in 2.4, review the
[Ember Data 2.4.0 CHANGELOG](https://github.com/emberjs/data/blob/v2.4.0/CHANGELOG.md).

### Upcoming Features in Ember Data 2.5.beta-1


#### `ds-finder-include`

The `ds-finder-include` feature allows an `include` query parameter to
be specified with using `store.findRecord()` and `store.findAll()` as
described in [RFC 99](https://github.com/emberjs/rfcs/pull/99). The
`include` parameter tells JSON-API servers which relationships to
sideload in a response. Thanks to
[@HeroicEric](https://github.com/HeroicEric) for implementing this
feature.

```js
// GET /articles/1?include=comments

var article = this.store.findRecord('article', 1, { include: 'comments' });
```

```js
// GET /articles?include=comments

var article = this.store.findAll('article', { include: 'comments' });
```

#### `ds-references`

The `ds-references` feature implements the references API as described
in [RFC 57](https://github.com/emberjs/rfcs/pull/57). References is a
low level API to perform meta-operations on records, has-many
relationships and belongs-to relationships:

  * get the current local data synchronously without triggering a fetch or producing a promise
  * notify the store that a fetch for a given record has begun, and provide a promise for its result
  * similarly, notify a record that a fetch for a given relationship has begun, and provide a promise for its result
  * retrieve server-provided metadata about a record or relationship

Consider the following `post` model:

```app/models/post.js
import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  comments: hasMany(),
  author: belongsTo()
});
```

The references API now allows the possibility to interact with the relationships:

```js
var post = store.peekRecord('post', 1);

// check if the author is already loaded, without triggering a request
if (post.belongsTo('author').value() !== null) {
  console.log(post.get("author.name"));
} else {
  // get the id of the author without triggering a request
  var authorId = post.belongsTo("author").id();

  // load the author
  post.belongsTo('author').load();
  console.log(`Loading author with id ${authorId}`);
}

// reload the author
post.belongsTo('author').reload();

// get all ids without triggering a request
var commentIds = post.hasMany('comments').ids();

// check if there are comments, without triggering a request
if (post.hasMany('comments').value() !== null) {
  var meta = post.hasMany('comments').meta();
  console.log(`${commentIds.length} comments out of ${meta.total}`);
} else {
  post.hasMany('comments').load();
}

// reload comments
post.hasMany('comments').reload();
```

Thanks to [@pangratz](https://github.com/pangratz) for implementing
this feature.


#### `ds-transform-pass-options`

The `ds-transform-pass-options` feature allows for smarter transforms
by passing the options object from `DS.attr([type], [options])` into
the transform.


##### Example
```app/models/post.js
export default DS.Model.extend({
  title: DS.attr('string'),
  markdown: DS.attr('markdown', {
    markdown: {
      gfm: false,
      sanitize: true
    }
  })
});
```

```app/transforms/markdown.js
export default DS.Transform.extend({
  serialize: function (deserialized, attributeMeta) {
    return deserialized.raw;
  },

  deserialize: function (serialized, attributeMeta) {
    var options = attributeMeta.options.markdown || {};

    return marked(serialized, options);
  }
});
```

Thanks to [@pangratz](https://github.com/pangratz) for implementing
this feature and [@knownasilya](https://github.com/knownasilya) for
proposing the [RFC](https://github.com/emberjs/rfcs/pull/1).



For more details on changes in the 2.5 beta, please review the
[Ember Data 2.5.0-beta.1 CHANGELOG](https://github.com/emberjs/data/blob/v2.5.0-beta.1/CHANGELOG.md).
