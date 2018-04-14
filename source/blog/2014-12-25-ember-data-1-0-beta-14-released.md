---
title: Ember Data v1.0.0-beta.14 Released
author: Stanley Stuart
tags: Ember Data, 2014
responsive: true
---

Due to a hiccup during the publishing step while releasing beta.13,
we've removed beta.13 from npm and instead published beta.14. This
release is available to you whether you are using npm and ember-cli,
rubygems, or bower. Of course, the builds are always available as static
files at [emberjs.com/builds](http://emberjs.com/builds).

## Improvements

[Igor Terzic][igor], [David Hamilton][hjdivad], and [Stefan
Penner][stef] put in some great strides to improve performance around
how relationships work together in Ember Data. These performance changes
have wide-reaching effects into everything you do in Ember Data:
querying records, pushing records into the store, and creating records.
Since everyone on the Ember Data team works on real apps, we tested
these changes in our applications and saw improvements averaging 50% or
higher around pushing and creating records into the store.

## Breaking Changes

### `store.update()` has been deprecated

Calling `store.update()` has been deprecated in favor of `store.push()`
now
handling partial payloads:

```javascript
var post = store.push('post', {
  id: 1,
  title: 'Ember.js is fantastic',
  author: 'Tomster'
});

post.get('title'); // => 'Ember.js is fantastic'
post.get('author'); // => 'Tomster'

store.push('post', { id: 1, author: 'Tom Dale' });

post.get('title'); // => 'Ember.js is fantastic'
post.get('author'); // => 'Tom Dale'
```

This also means that properties missing in the payload will no longer be
reset,
but stay the same.

If you need to reset values to null, you should have your server
explicitly
send back null values in the payload:

```javascript
{
  "person": {
    "firstName": null,
    "lastName": null
    "role": "Computer Science Pioneer"
  }
}
```

If you cannot change your API and you desire this behavior, you can
create a
serializer and do the logic yourself:

```javascript
// app/serializers/person.js
// or App.PersonSerializer if you aren't using Ember CLI
export default DS.RESTSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = this._super(type, hash, prop);
    if (!hash.hasOwnProperty('firstName')){
      hash.firstName = null;
    }
    if (!hash.hasOwnProperty('lastName')){
      hash.lastName = null;
    }
    return hash;
  }
});
```

Or if you want to restore the old behavior for all of your models:

```javascript
// app/serializers/application.js
// or App.ApplicationSerializer
export default DS.RESTSerializer.extend({
  normalize: function(type, hash, prop) {
    hash = this._super(type, hash, prop);
    type.eachAttribute(function(key) {
      if (!hash.hasOwnProperty(key)) {
        hash[key] = null;
      }
    }, this);
    return hash;
  }
});
```

## Special Thanks

A special thanks to [Dockyard][dockyard] for sponsoring Igor during the
month of December!

<!-- Links -->
[igor]: https://twitter.com/terzicigor
[hjdivad]: https://twitter.com/hjdivad
[stef]: https://twitter.com/stefanpenner
[dockyard]: http://dockyard.com
