Along with the records returned from your store, you'll likely need to handle some kind of metadata. *Metadata* is data that goes along with a specific *model* or *type* instead of a record.

Pagination is a common example of using metadata. Imagine a blog with far more posts than you can display at once. You might query it like so:

```js
var result = this.store.find("post", {
  limit: 10,
  offset: 0
});
```

To get different *pages* of data, you'd simply change your offset in increments of 10. So far, so good. But how do you know how many pages of data you have? Your server would need to return the total number of records as a piece of metadata.

By default, Ember Data's JSON deserializer looks for a `meta` key:

```js
{
  "post": {
    "id": 1,
    "title": "Progressive Enhancement is Dead",
    "comments": ["1", "2"],
    "links": {
      "user": "/people/tomdale"
    },
    // ...
  },

  "meta": {
    "total": 100
  }
}
```

The metadata for a specific type is then set to the contents of `meta`. You can access it either with `store.metadataFor`, which is updated any time any query is made against the same type:

```js
var meta = this.store.metadataFor("post");
```

Or you can access the metadata just for this query:

```js
var meta = result.get("content.meta");
```

Now, `meta.total` can be used to calculate how many pages of posts you'll have.

You can also customize metadata extraction by overriding the `extractMeta` method. For example, if instead of a `meta` object, your server simply returned:

```js
{
  "post": [
    // ...
  ],
  "total": 100
}
```

You could extract it like so:

```js
App.ApplicationSerializer = DS.RESTSerializer.extend({
  extractMeta: function(store, type, payload) {
    if (payload && payload.total) {
      store.setMetadataFor(type, { total: payload.total });  // sets the metadata for "post"
      delete payload.total;  // keeps ember data from trying to parse "total" as a record
    }
  }
});
```
