---
title: Ember Data 2.3 and 2.4 Beta Released
author: Brendan McLoughlin
tags: Ember Data, Releases, 2016
responsive: true
---

Ember Data 2.3, a minor version release of Ember Data, is released today. This release represents the work of over 32 direct contributors, and over 196 commits.

Ember Data 2.4 beta.1, the branch of Ember Data that will be released as stable in roughly six weeks, is also being released today.

### Changes in Ember Data 2.3

Ember Data 2.3 is now a full Ember CLI addon. Previous versions of
Ember Data required users to include both the *ember-data* package in
their project's `package.json` file and the *ember-data* package in
their project's `bower.json` file. This resulted in confusion because
updating *ember-data* in `package.json` would not update *ember-data*
in `bower.json`.

To upgrade Ember Data to version 2.3 in your Ember CLI projects please
do the following:

  1. remove the `ember-data` package from your `bower.json`
  2. update `ember-cli-shims` package to version `0.1.0`

```diff
   ...
   "dependencies": {
     "handlebars": "2.0.0",
     "ember": "~2.2.0",
-    "ember-cli-shims": "0.0.6",
+    "ember-cli-shims": "0.1.0",
     "ember-cli-test-loader": "ember-cli-test-loader#0.1.3",
-    "ember-data": "~1.13.12",
     "ember-load-initializers": "ember-cli/ember-load-initializers#0.1.5",
     ...
```

Then in your `package.json` update `ember-data` to `^2.3.0`

```diff
   ...
   "devDependencies": {
     ...
     "ember-cli-sri": "^2.0.0",
     "ember-cli-uglify": "^1.2.0",
-    "ember-data": "^2.2.1",
+    "ember-data": "^2.3.0",
     "ember-disable-proxy-controllers": "^1.0.1",
     ...
```

Thanks to [@fivetanley](https://github.com/fivetanley), for his heroic
efforts in converting Ember Data's build to Ember CLI's addon
infrastructure.


### Importing Modules

The Ember Data addon allows users to import modules directly into
their application instead of accessing modules top level `DS` namespace.

The following module paths are considered to be public API and will be supported until at least Ember Data 3.0:

```js
// DS.Model
import Model from 'ember-data/model';

// DS.RESTSerializer
import RESTSerializer from 'ember-data/serializers/rest';

// DS.JSONSerializer
import JSONSerializer from 'ember-data/serializers/json';

// DS.JSONAPISerializer
import JSONAPISerializer from 'ember-data/serializers/json-api';

// DS.JSONAPIAdapter
import JSONAPIAdapter from 'ember-data/adapters/json-api';

// DS.RESTAdapter
import RESTAdapter from 'ember-data/adapters/rest';

// DS.Adapter
import Adapter from 'ember-data/adapter';

// DS.Store
import Store from 'ember-data/store';

// DS.Transform
import Transform from 'ember-data/transform';

// DS.attr
import attr from 'ember-data/attr';

// DS.hasMany or DS.belongsTo
import { hasMany, belongsTo } from 'ember-data/relationships';
```

Modules that are not considered to be public API have been placed under the `ember-data/-private` path. Please do not import these modules into your app or test code as they may be changed or removed *without warning*.

Thanks to [@rwjblue](https://github.com/rwjblue) for implementing this
module API.

#### Notable Bug Fixes

##### [PR #4025 Use keyForRelationship for belongsTo and hasMany](https://github.com/emberjs/data/pull/4025/)
The `EmbeddedRecordsMixin` now uses [keyForRelationship](http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_keyForRelationship) to generate the serialized key for embedded relationships. Thanks to [@GCorbel](https://github.com/GCorbel) for this fix.

##### [PR #3866 Allow store.push to accept { data: null }](https://github.com/emberjs/data/pull/3866)
The JSONAPISerializer now correctly accepts `{"data": null}` as a valid response instead of throwing an unhelpful error message. Thanks to [@mitchlloyd](https://github.com/mitchlloyd) for the [bug report](https://github.com/emberjs/data/issues/3790).


See the [Ember Data 2.3.0 CHANGELOG](https://github.com/emberjs/data/blob/v2.3.0/CHANGELOG.md) for a full list of all changes.


### Ember Data 2.4 beta

Ember Data 2.4 beta is released today, and in six weeks it will become the
new stable version of Ember Data. This beta cycle introduces a single new feature.

#### Friendly Errors

[@nikz](https://github.com/nikz) has implemented
[RFC 101](https://github.com/emberjs/rfcs/pull/101) which provides
more context for `RESTAdapter` and `JSONAPIAdapter` errors in Ember
Data. Be sure to check out the
[pull request](https://github.com/emberjs/data/pull/3930) for more
details.

For more details on changes in 2.4, review the
[Ember Data 2.4.0-beta.1 CHANGELOG](https://github.com/emberjs/data/blob/v2.4.0-beta.1/CHANGELOG.md).


### Upcoming Features

Two new features recently landed on the Ember Data canary branch. They
each address add some long requested features to Ember Data. However,
before they can be enabled in a beta branch the Ember Data team would
like the community to try them out and provide feedback on their
implementations. These two feature flagged features are only available
on the master branch (sometimes called "canary") of Ember Data. To
test them out please update the version of Ember Data in package.json
to `emberjs/data#master` and add the feature to the `EmberENV`'s
`FEATURES` object in `config/environment.js`.

```config/environment.js
var ENV = {
  EmberENV: {
    FEATURES: {
      'ds-finder-include': true,
      'ds-references': true
    }
  }
};
```

For more information you can check out Ember's
[feature flags guide](https://guides.emberjs.com/v2.2.0/configuring-ember/feature-flags/).

#### `ds-finder-include`

The `ds-finder-include` feature allows an `include` query parameter to
be specified with using `store.findRecord()` and `store.findAll()` as
described in [RFC 99](https://github.com/emberjs/rfcs/pull/99). This
should make it easier to specify when backends should return
sideloaded relationships. Thanks to
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
