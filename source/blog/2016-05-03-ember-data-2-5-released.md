---
title: Ember Data 2.5 and 2.6 Beta Released
author: Brendan McLoughlin
tags: Ember Data, Releases, 2016
responsive: true
---

Ember Data 2.5, a minor version release of Ember Data, is released. This release represents the work of over 31 direct contributors, and over 137 commits.

Ember Data 2.6 beta.1, the branch of Ember Data that will be released as stable in roughly six weeks, is also being released.

### Changes in Ember Data 2.5

#### `ds-finder-include`

The `ds-finder-include` feature allows an `include` query parameter to
be specified using `store.findRecord()` and `store.findAll()` as
described in [RFC 99](https://github.com/emberjs/rfcs/pull/99). The
`include` parameter tells JSON-API servers which relationships to
sideload in a response, but it can also be used by custom adapters to
signal which relationships the backend can sideload to improve
performance.

Thanks to [@HeroicEric](https://github.com/HeroicEric) for
implementing this feature.

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



### Upcoming Features in Ember Data 2.6.beta-1

- `ds-serialize-ids-and-types`

Enables a new `ids-and-type` strategy (in addition to the already existing `ids` and `records`) for
serializing has many relationships using the `DS.EmbeddedRecordsMixin` that  will include both
`id` and `type` of each model as an object.

For instance, if a user has many pets, which is a polymorphic relationship, the generated payload would be:

```js
{
  "user": {
    "id": "1"
    "name": "Bertin Osborne",
    "pets": [
      { "id": "1", "type": "Cat" },
      { "id": "2", "type": "Parrot"}
    ]
  }
}
```

This is particularly useful for polymorphic relationships not backed
  by [STI](https://en.wikipedia.org/wiki/Single_Table_Inheritance)
  when just including the id of the records is not enough.


For more details on changes in the 2.6 beta, please review the
[Ember Data 2.6.0-beta.1 CHANGELOG](https://github.com/emberjs/data/blob/v2.6.0-beta.1/CHANGELOG.md).
