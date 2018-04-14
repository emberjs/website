---
title: Ember Data v1.0.0-beta.17/18 Released
author: Stanley Stuart
tags: Ember Data, 2015
responsive: true
---

Beta.17 and Beta.18 contained many bugfixes from the community! Please check
them out in the [CHANGELOG][changelog]. Thank you to everyone who submitted
patches!

While many bugs were stomped, some important changes are worth calling out:

# (Possibly) Breaking Deprecations

## record.constructor.typeKey is now record.constructor.modelName

In Ember Data, when you ask for a model, Ember Data looks its class up using
Ember's [Dependency Injection][dep-inj] API.  When the model class is looked
up, Ember Data stores the type on the model class.

For example, when the following code runs in your application:

```javascript
var post = this.store.getById('post', 1);
```

and Ember Data will store the string "post" on the model class:

```javascript
console.log(post.constructor.typeKey); // 'post'
```

Ember Data uses this `typeKey` property internally when creating and extracting
payloads in Serializers, and when locating models in Adapters. The `typeKey` is
also currently available on Snapshots, which are passed to adapter and
serializer methods. `typeKey` was previously always normalized to be a
camelCased string.

In Ember Data 1.0.0-beta.18, this property is now called `modelName`. In
addition, the `modelName` is a dasherized string. For example, if you had a
model called `TacoShop`, it would be stored on the model's constructor's
`modelName` property as `taco-shop`, whereas previously it would be stored as
`tacoShop`.

Accessing the `typeKey` property should still work, but will trigger
deprecation warnings.

If you don't have any custom serializers or adapters, you are good to go;
outgoing payloads and URLs shouldn't change. If you've overridden a method in
your subclass, remember to call `this._super`, or to normalize modelName in
your code. If you need to transform this string, you can use Ember.String's
[camelize][camelize] and [underscore][underscore] functions. Keep in mind you
can't change `modelName` on the model's constructor; it is **read-only** and
will trigger an assertion error if you try to override it.

We changed `typeKey` to `modelName` to allow us to align to dasherized strings
as Ember and Ember CLI also align with dasherized strings. Changing the name
allows us to make this change with a deprecation phase.

## DS.RESTSerializer.typeForRoot is now DS.RESTSerializer.modelNameFromPayloadKey

To gain more consistency in the naming change of  `typeKey` to `modelName`,
`typeForRoot` has been renamed to `modelNameFromPayloadKey`. The function
serves the same purpose, so this should be a quick refactor you can achieve via
search and replace in your project. While *calling* typeForRoot will trigger a
deprecation warning, overriding in a subclass won't.

# New Features

## DS.RESTSerializer.payloadKeyFromModelName

While `modelNameFromPayloadKey` returns a *model* for a JSON payload key,
`payloadKeyFromModelName` can be used to override the serialization of a model
*to the server.* For instance, you may have a Post model, but your server
expects a `message` as the root. You can override it like so:

```app/serializers/application.js
export default DS.RESTSerializer.extend({
  payloadKeyFromModelName: (modelName) {
    if (modelName === 'post') {
      return 'message';
    }
    return this._super(modelName);
  }
});
```

This would produce the following payload:

```json
{
  "message": {
    "id": "1",
    "title": "Action Cable comes with 3 Months of Free HBO"
  }
}
```

Another example is that ActiveModelSerializer uses this hook to convert a
dasherized `modelName` to an `under_scored` string.

While this was possible previously in Ember Data, we noticed that users used
several different hooks to achieve this goal, so it made sense to make one
unifying place for this kind of serialization.

## store.unloadAll() can now unload all models when not passed a modelName

Previously, `store.unloadAll` required a `modelName` argument to unload records
of a type.  Now, you can unload all records without calling `store.destroy`.
Thanks to [svox1](https://github.com/emberjs/data/pull/2999) for this pull
request!

## DS.RESTAdapter.buildURL refactored into different hooks

`buildURL` has been refactored into several hooks like `urlForFindQuery`. This
makes overriding methods like `buildURL` easier to reason about and easier to
change without breaking other request types. Thanks to
[thejameskyle](https://github.com/emberjs/data/pull/2966) for taking on this
refactor!

While beta.17 did introduce a regression, this has been fixed in beta.18.

<!-- Links -->
[dep-inj]: http://guides.emberjs.com/v1.10.0/understanding-ember/dependency-injection-and-service-lookup/
[camelize]: http://emberjs.com/api/classes/Ember.String.html#method_camelize
[underscore]: http://emberjs.com/api/classes/Ember.String.html#method_underscore
[changelog]: https://github.com/emberjs/data/blob/master/CHANGELOG.md
