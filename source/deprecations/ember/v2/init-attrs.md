---
id: ember-views.did-init-attrs
name: Ember.Component#didInitAttrs
until: 3.0.0
since: 2.6
---

Using `didInitAttrs` is deprecated in favour of using `init`. When `init` is called the attrs sent in with the component will be
available after calling `this._super(...arguments)`

Given a htmlbars template like this:

```handlebars
{{my-component handle="@tomdale"}}
```

Before:

```js
export default Ember.Component.extend({
  didInitAttrs() {
    this._super(...arguments);
    this.get('handle'); // @tomdale
  }
});
```

After:

```js
export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.get('handle'); // @tomdale
  }
});
```
