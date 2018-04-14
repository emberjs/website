---
title: Ember Data 2.6 and 2.7 Beta Released
responsive: true
author: Brendan McLoughlin
tags: Ember Data, 2016
responsive: true
---

Ember Data 2.6, a minor version release of Ember Data, is
released. This release represents the work of over 22 direct
contributors, and over 85 commits.

Ember Data 2.7 beta.1, the branch of Ember Data that will be released
as stable in roughly six weeks, is also being released.

### Changes in Ember Data 2.6

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

Thanks to [@cibernox](https://github.com/cibernox) for
implementing this feature.

### Upcoming Features in Ember Data 2.7.beta-1

#### `ds-boolean-transform-allow-null` [#4022](https://github.com/emberjs/data/pull/4022)

Allow `null`/`undefined` values for boolean attributes via `attr('boolean', { allowNull: true })`

```js
// app/models/user.js
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  email: attr('string'),
  username: attr('string'),
  wantsWeeklyEmail: attr('boolean', { allowNull: true })
});
```

#### `ds-improved-ajax` [#3099](https://github.com/emberjs/data/pull/3099)

Though `ajax()` (and `ajaxOptions()`) of `DS.RESTAdapter` are marked as
private, they have been overwritten in many applications, since there is
currently no other way to customize the request.

This feature adds new public methods to `DS.RESTAdapter`, which allow to
customize the properties of a request:

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

``` js
// adapters/application.js
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

#### `ds-links-in-record-array` [#4263](https://github.com/emberjs/data/pull/4263)

This feature exposes a `links` object on a `RecordArray`. This can be used to load additional links when  present in the response JSON-API document.

```js
store.query('post', { isRecent: true }).then((posts) => {
  posts.get('links.next');
});
```

Thanks to [@danmcclain](https://github.com/danmcclain) for
implementing this feature.

For more details on changes in the 2.7 beta, please review the
[Ember Data 2.7.0-beta.1 CHANGELOG](https://github.com/emberjs/data/blob/v2.7.0-beta.1/CHANGELOG.md).
