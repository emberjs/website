---
id: ember-htmlbars.ember-handlebars-safestring
name: Use Ember.String.htmlSafe over Ember.Handlebars.SafeString
until: 3.0.0
since: 2.8
---
Creating safe strings. Before:

```js
import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  myString: computed(function(){
    return new Ember.Handlebars.SafeString(someString);
  });
})
```

After:

```js
import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  myString: computed(function(){
    return Ember.String.htmlSafe(someString);
  });
)};
```

Detecting safe strings. Before:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      let myString = this.get('myString');
      if (myString instanceof Ember.Handlebars.SafeString) {
        // ...
      }
    }
  }
});
```

After:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      let myString = this.get('myString');
      if (Ember.String.isHTMLSafe(myString)) {
        // ...
      }
    }
  }
});
```

If you're an addon maintainer, there is a polyfill for safe string detection ([ember-string-ishtmlsafe-polyfill](https://github.com/workmanw/ember-string-ishtmlsafe-polyfill))
that will help maintain backwards compatibility. Additionally, it's worth noting that `Ember.String.htmlSafe`
is supported back to pre-1.0, so there should be no concerns of backwards compatibility there.
