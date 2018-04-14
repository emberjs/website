---
title: Ember Data 2.7 and 2.8 Beta Released
author: Brendan McLoughlin
tags: Ember Data, Releases, 2016
responsive: true
---

Ember Data 2.7, a minor version release of Ember Data, is
released. This release represents the work of over 27 direct
contributors, and over 103 commits.

Ember Data 2.8 beta.1, the branch of Ember Data that will be released
as stable in roughly six weeks, is also being released.

### Blueprint Changes

In Ember Data 2.5 there was a change made to the blueprints to use
module paths when importing instead of importing the default DS
namespace. At the time this was thought to be a minor change and did
not receive much scrutiny. However, in time the Ember Data team has
discovered that the changes to the import statements in the blueprints
have made it more confusing for both new and experienced Ember
developers.

In Ember Data 2.5 and Ember Data 2.6 the following generator command for building a model:

`ember generate model post content isDraft:boolean comments:has-many user:belongs-to`

It would generate the following blueprint:

```app/models/post.js
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  content: attr(),
  isDraft: attr('boolean'),
  comments: hasMany('comment'),
  user: belongsTo('user')
});
```

Ember Data 2.7 the same command will now generate the following blueprint:

```app/models/post.js
import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  isDraft: DS.attr('boolean'),
  comments: DS.hasMany('comment'),
  user: DS.belongsTo('user')
});
```

The main difference is the blueprints no longer use the paths to
import specific modules. We have found that encouraging users to omit
the paths results in better defaults for both new and experienced
Ember developers. The simpler `import DS from 'ember-data';` statement
has less room for typos and other errors and is easier to developers
to remember so they do not need reference documentation whenever they
want to add a new import.

This change *only* impacts the blueprints that are generated when
using the
[ember-cli generate](https://ember-cli.com/user-guide/#using-ember-cli)
command. Code that is written to use the path imports will still
continue to work and be supported until at least Ember Data 3.0.

The Ember Data team will also be releasing patch releases to Ember
Data 2.5 and 2.6 to update their blueprint generators to match Ember
Data 2.7.

### Changes in Ember Data 2.7

#### `ds-boolean-transform-allow-null` [#4022](https://github.com/emberjs/data/pull/4022)

Allow `null`/`undefined` values for boolean attributes via `attr('boolean', { allowNull: true })`

```app/models/user.js
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  username: DS.attr('string'),
  wantsWeeklyEmail: DS.attr('boolean', { allowNull: true })
});
```

#### `ds-links-in-record-array` [#4263](https://github.com/emberjs/data/pull/4263)

This feature exposes a `links` object on a `RecordArray`. This can be used to load additional links when  present in the response JSON-API document.

```js
store.query('post', { isRecent: true }).then((posts) => {
  posts.get('links.next');
});
```

Thanks to [@danmcclain](https://github.com/danmcclain) for
implementing this feature.

### Upcoming Features in Ember Data 2.8.beta-1

#### `ds-improved-ajax` [#3099](https://github.com/emberjs/data/pull/3099)

The `ds-improved-ajax` feature was originally planned to be released
in Ember Data 2.7. However, feedback from the beta found that many
people are overriding `ajax()` to change the protocol of the adapter
and the new methods added in made `ds-improved-ajax` made this usecase
harder to achieve. The Ember Data team has decided to delay the
`ds-improved-ajax` feature flag until the Ember Data 2.8 release while
improving the API for this usecase.

The `ds-improved-ajax` feature adds new public methods to
`DS.RESTAdapter`, which allow to customize the properties of a
request:

- `methodForRequest` to get the HTTP verb
- `urlForRequest` to get the URL
- `headersForRequest` to get the headers
- `dataForRequest` to get the data (query params or request body)

The `params` hash passed to those methods has all the properties with
which the corresponding `find`, `createRecord`, `findQuery`, ...  calls
have been invoked: `store`, `type`, `snapshot`(s), `id`(s) and `query`. The
`requestType` property indicates which method is requested; the possible
values are:

- `createRecord`
- `updateRecord`
- `deleteRecord`
- `query`
- `queryRecord`
- `findRecord`
- `findAll`
- `findMany`
- `findHasMany`
- `findBelongsTo`

Performing the actual AJAX request is handled by the `makeRequest`
method, which is similar to the existing `ajax` method: it makes the
request using `jQuery.ajax` and attaches success and failure handlers.

---

Say your API handles creation of resources via PUT, this can now be
customized as follows:

```adapters/application.js
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  methodForRequest(params) {
    if (params.requestType === 'createRecord') {
      return "PUT";
    }

    return this._super(...arguments);
  }
});
```

Thanks to [@pangratz](https://github.com/pangratz) for
implementing this feature.

For more details on changes in the 2.8 beta, please review the
[Ember Data 2.8.0-beta.1 CHANGELOG](https://github.com/emberjs/data/blob/v2.8.0-beta.1/CHANGELOG.md).
