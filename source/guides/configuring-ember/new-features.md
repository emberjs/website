## New Ember Features

The Ember core team is strongly commited to maintaining backwards compatibility and following semantic versioning. However, occasionally there is a need to add new features to the framework. We implement these features in a backwards compatible way by wrapping and only exposing them to via [feature flags](/guides/configuring-ember/feature-flags/).
You can use these flags to selectively enable specific features as you see fit for your application.

This guide is a comprehensive list of the new features added to the Ember JS Framework since the 1.0 release. 

## List of Features

Please refer to this list to keep track of the latest developments of Ember JS.

### Feature: ember-routing-named-substates

```javascript
EmberENV = {FEATURES: {'ember-routing-named-substates': true}};
```

Add named substates; e.g. when resolving a loading or error substate to enter, Ember will take into account the name of the immediate child route that the error/loading action originated from, e.g. 'foo' if FooRoute, and try and enter foo_error or foo_loading if it exists. This also adds the ability for a top-level application_loading or application_error state to be entered for loading/error events emitted from ApplicationRoute.

#### Release with 1.x

Source: [Pull Request #3655](https://github.com/emberjs/ember.js/pull/3655)


### Feature: composable-computed-properties

```javascript
EmberENV = {FEATURES: {'composable-computed-properties': true}};
```

This feature allows you to combine (compose) different computed properties together. So it gives you a really nice "functional programming" like syntax to deal with complex expressions.

#### Release with 1.x
Source: [Pull Request #3696](https://github.com/emberjs/ember.js/pull/3696)

### Feature: query-params-new

```javascript
EmberENV = {FEATURES: {'query-params-new': true}};
```

Add query params support to the ember router. This is a rewrite of a previous attempt at an API for query params. You can define query param properties on route-driven controllers with the queryParams property, and any changes to those properties will cause the URL to update, and in the other direction, any URL changes to the query params will cause those controller properties to update.

#### Release with 1.x
Source: [Pull Request #4008](https://github.com/emberjs/ember.js/pull/4008)

### Feature: ember-routing-will-change-hooks

```javascript
EmberENV = {FEATURES: {'ember-routing-will-change-hooks': true}};
```

Finer-grained willTransition-esque actions:

- willLeave: fires on routes that will no longer be active after the transition

- willChangeModel: fires on routes that will still be active but will re-resolve their models
Both of these hooks act like willTransition in the sense that they give you an opportunity to abort the transition before it happens. Common use cases include animating things away or prompting to user to deal with unsaved changes.

#### Release with 1.x
Source: [Pull Request #4760](https://github.com/emberjs/ember.js/pull/4760)

### Feature: ember-metal-is-present

```javascript
EmberENV = {FEATURES: {'ember-metal-is-present': true}};
```

Adds Ember.isPresent as the inverse of Ember.isBlank. This convenience method can lead to more semantic and clearer code.

#### Release with 1.x
Source: [Pull Request #5136](https://github.com/emberjs/ember.js/pull/5136)

### Feature: property-brace-expansion-improvement

```javascript
EmberENV = {FEATURES: {'property-brace-expansion-improvement': true}};
```

Property brace expansion now allows multiple sets of braces to be used, as well as not restricting their location in the string.

#### Release with 1.x
Source: [Pull Request #4617](https://github.com/emberjs/ember.js/pull/4617)

### Feature: ember-runtime-proxy-mixin

```javascript
EmberENV = {FEATURES: {'ember-runtime-proxy-mixin': true}};
```

Makes the logic behind Ember.ObjectProxy into a Mixin that can be used when you cannot inherit from Ember.ObjectProxy directly.

#### Release with 1.x
Source: [Pull Request #5156](https://github.com/emberjs/ember.js/pull/5156)

### Feature: ember-routing-multi-current-when

```javascript
EmberENV = {FEATURES: {'ember-routing-multi-current-when': true}};
```

Allows the link-to helper's currentWhen property to accept multiple routes using a | delimiter, for more control over a link's active state.

#### Release with 1.x
Source: [Pull Request #3673](https://github.com/emberjs/ember.js/pull/3673)

### Feature: ember-runtime-item-controller-inline-class

```javascript
EmberENV = {FEATURES: {'ember-runtime-item-controller-inline-class': true}};
```

This feature allows you to specify a controller class inline for the itemController property of an array controller.

#### Release with 1.x
Source: [Pull Request #5301](https://github.com/emberjs/ember.js/pull/5301)
