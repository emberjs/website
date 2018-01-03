---
id: ember-application.injected-container
name: Injected container access
until: 3.0.0
since: 2.3
---

`this.container` has been private API since at least Ember 1.0.0. Unfortunately, there was not a public API available
to use as an alternative.  In the Ember 2.1 cycle a number of public API's were added to instance initializers
that allowed access to the container and registry (see [here](http://emberjs.com/api/classes/ContainerProxyMixin.html)
and [here](http://emberjs.com/api/classes/RegistryProxyMixin.html) for details of the public API's), but this new public
API surface was not added to individual instances that were using `this.container` directly.

Ember 2.3 now provides a public API for usage from within any instances that were instantiated from the container.

This refactor is relatively straight forward for applications, but still leaves a few gaps for addons that want to function
without deprecation on all versions while still using the newer paradigms. [ember-getowner-polyfill](https://github.com/rwjblue/ember-getowner-polyfill)
was created for this exact reason.

Note that the `getOwner` API is natively available in Ember versions 2.3 and up, so you don't need to install a polyfill. Use it like you would use any other API, as in the `After:` example.

Before:

```js
// Ember < 2.3
import Ember from 'ember';

export default Ember.Helper.extend({
  init() {
    this._super(...arguments);

    this.customThing = this.container.lookup('custom:thing');
  }
});
```

After:

do an ember install of the polyfill.

```sh
ember install ember-getowner-polyfill
```

After it installs, use as follows:-

```js
// Ember < 2.3 needs the polyfill installed, Ember >= 2.3 available natively.
import Ember from 'ember';

export default Ember.Helper.extend({
  init() {
    this._super(...arguments);

    this.customThing = Ember.getOwner(this).lookup('custom:thing');
  }
});
```
