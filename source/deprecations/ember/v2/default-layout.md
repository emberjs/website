---
id: ember-views.component.defaultLayout
name: Ember.Component#defaultLayout
until: 3.0.0
since: 2.1
---

Specifying a `defaultLayout` to a component is deprecated in favor of specifying `layout` directly. `defaultLayout` was
often used in order to allow inheriting components to fallback to their parents `defaultLayout` if a custom `layout` was
not provided. Due to the way a components layout is looked up naturally, this is true when using `layout` properties in
both locations. Changing the `layout` detection process allows initial render speed (with many components) to be
improved pretty significantly.

Before:

```javascript
// Ember < 2.1
import layout from '../templates/some-thing-lol';

export default Ember.Component.extend({
  defaultLayout: layout
});
```

After:

```javascript
// Ember 2.1 and later
import layout from '../templates/some-thing-lol';

export default Ember.Component.extend({
  layout: layout
});
```
