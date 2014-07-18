In Ember Data, the logic for communicating with a backend data store
lives in the `Adapter`. Ember Data's Adapter has some built-in
assumptions of how a [REST API](http://jsonapi.org/) should look. If
your backend conventions differ from these assumptions Ember Data
makes it easy to change its functionality by swapping out or extending
the default Adapter.

Some reasons for customizing an Adapter include using
`underscores_case` in your urls, using a medium other than REST to
communicate with your backend API or even using a
[local backend](https://github.com/rpflorence/ember-localstorage-adapter).

Extending Adapters is a natural process in Ember Data. Ember takes the
position that you should extend an adapter to add different
functionality instead of adding a flag. This results in code that is
more testable, easier to understand and reduces bloat for people who
may want to subclass your adapter.

If your backend has some consistent rules you can define an
`ApplicationAdapter`. The `ApplicationAdapter` will get priority over
the default Adapter, however it will still be superseded by model
specific Adapters.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  // Application specific overrides go here
});
```

If you have one model that has exceptional rules for communicating
with its backend than the others you can create a Model specific
Adapter by naming an adapter "ModelName" + "Adapter".

```js
App.PostAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});
```

By default Ember Data comes with several builtin adapters. Feel free
to use these adapters as a starting point for creating your own custom
adapter.

- [DS.Adapter](/api/data/classes/DS.Adapter.html) is the basic adapter
with no functionality. It is generally a good starting point if you
want to create an adapter that is radically different from the other
Ember adapters.

- [DS.FixtureAdapter](/api/data/classes/DS.FixtureAdapter.html) is an
adapter that loads records from memory. Its primarily used for
development and testing.

- [DS.RESTAdapter](/api/data/classes/DS.RESTAdapter.html) is the most
commonly extended adapter. The `RESTAdapter` allows your store to
communicate with an HTTP server by transmitting JSON via XHR. Most
Ember.js apps that consume a JSON API should use the REST adapter.

- [DS.ActiveModelAdapter](/api/data/classes/DS.ActiveModelAdapter.html)
is a specialized version of the `RESTAdapter` that is set up to work
out of the box with Rails-style REST APIs.


## Customizing the RESTAdapter

The [DS.RESTAdapter](/api/data/classes/DS.RESTAdapter.html) is the
most commonly extended adapter that ships with Ember Data. It has a
handful of hooks that are commonly used to extend it to work with
non-standard backends.

#### Endpoint Path Customization

The `namespace` property can be used to prefix requests with a
specific url namespace.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/1'
});
```

Requests for `App.Person` would now target `/api/1/people/1`.


#### Host Customization

By default the adapter will target the current domain. If you would
like to specify a new domain you can do so by setting the `host`
property on the adapter.

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://api.example.com'
});
```

Requests for `App.Person` would now target `https://api.example.com/people/1`.


#### Path Customization

By default the `RESTAdapter` will attempt to pluralize and camelCase
the model name to generate the path name. If this convention does not
conform to your backend you can override the `pathForType` method.

For example, if you did not want to pluralize model names and needed
underscore_case instead of camelCase you could override the
`pathForType` method like this:

```js
App.ApplicationAdapter = DS.RESTAdapter.extend({
  pathForType: function(type) {
    return Ember.String.underscore(type);
  }
});
```

Requests for `App.Person` would now target `/person/1`.
Requests for `App.UserProfile` would now target `/user_profile/1`.

#### Authoring Adapters

The `defaultSerializer` property can be used to specify the serializer
that will be used by this adapter. This is only used when a model
specific serializer or ApplicationSerializer are not defined.

In an application, it is often easier to specify an
`ApplicationSerializer`. However, if you are the author of a community
adapter it is important to remember to set this property to ensure
Ember does the right thing in the case a user of your adapter
does not specify an `ApplicationSerializer`.

```js
MyCustomAdapterAdapter = DS.RESTAdapter.extend({
  defaultSerializer: '-default'
});
```


## Community Adapters

If none of the builtin Ember Data Adapters work for your backend,
be sure to check out some of the community maintained Ember Data
Adapters. Some good places to look for Ember Data Adapters include:

- [GitHub](https://github.com/search?q=ember+data+adapter&ref=cmdform)
- [Bower](http://bower.io/search/?q=ember-data-)
