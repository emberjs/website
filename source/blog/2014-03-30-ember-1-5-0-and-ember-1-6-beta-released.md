---
title: Ember 1.5.0 and 1.6 Beta Released
author: Robert Jackson
tags: Releases, Recent Posts
---

We are pleased to announce that both Ember.js 1.5.0 and the first beta in the 1.6 series
have just been released. This comes as the fifth cycle of our six-week release
process that began just after 1.0 was released.

### New features in 1.5

#### Handlebars Logging of Primitive Values

This feature allows you to log primitive values (strings, numbers, etc) from within your
templates. Previously, the `{{log}}` helper only allowed usage of bound property lookup.

```javascript
{{log "**LOOKEY HERE**"}}
```

#### New Testing Helpers

##### Routing Helpers

A few new testing helpers have been added to make it easier to make assertions on the state
of routing in your application (for example to confirm clicking a given link results in a
redirect to a specific route).

New routing test helpers: `currentRouteName`, `currentPath`, and `currentURL`.

##### Trigger Event Helper

A new `triggerEvent` helper has been created to allow triggering of arbitrary events on an element.

```javascript
triggerEvent('#some-element-id', 'dblclick');
```

#### Ember.computed.readOnly

Generally, when you use `Ember.computed.oneWay` you would also need to call `readOnly` to ensure no data
propagates back up.

```javascript
// prior to Ember.computed.readOnly you would have to do the following:
Ember.computed.oneWay('foo').readOnly()

// in 1.5 you can use the following for the same result:
Ember.computed.readOnly('foo')
```

#### Ember.isBlank

A new shortcut for checking if a particular object is empty or an empty string:

```javascript
Ember.isBlank();                // true
Ember.isBlank(null);            // true
Ember.isBlank(undefined);       // true
Ember.isBlank('');              // true
Ember.isBlank([]);              // true
Ember.isBlank('\n\t');          // true
Ember.isBlank('  ');            // true
Ember.isBlank({});              // false
Ember.isBlank('\n\t Hello');    // false
Ember.isBlank('Hello world');   // false
Ember.isBlank([1,2,3]);         // false
```

#### Eager Updating URL

Previously, the URL in the address bar would only update at the very end up
the transition. This change causes the URL update to happen immediately unless
the transition was aborted/redirected within the same run loop, which provides
for a better UX 99% of the time.

#### Auto Location

Adds `auto` as a `location` option for the app's `Router`.

```javascript
App.Router.reopen({
  location: 'auto'
});
```

When used, Ember will select the best location option based off browser
support with the priority order: history, hash, none.

Clean pushState paths accessed by hashchange-only browsers will be redirected
to the hash-equivalent and vice versa so future transitions look consistent.

#### Bound Action Lookup

The `{{action}}` helper will now use a non-quoted parameter and perform a bound property
lookup against the action's target at the time the event is triggered. This allows usage
of a dynamic action name (determined by looking up the property).

#### Routes Inherit Model

Ember routes and leaf resources (without nested routes) will inherit the parent route's model.

Take the following example:

```javascript
App.Router.map(function(){
  this.resource('post', function(){
    this.route('edit');
  });
});

App.PostRoute = Ember.Route.extend({
  model: function(){
    return {title: 'ZOMG', text: 'AWESOME'};
  }
});

App.PostEditRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('post');
  }
});
```

Now in 1.5, you do not have to define the `model` hook for `PostEditRoute` as the default implementation
is to use the parent routes model.

#### Other Improvements

As usual, there are a ton of bug fixes and small improvements in this
release. You can see a list of all the changes in the CHANGELOG:

* [Ember.js 1.5.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.5.0/CHANGELOG.md)
* [Ember.js 1.6.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.6.0-beta.1/CHANGELOG.md)
