---
title: This Week in Ember.js 3
---

Only a few more days left, I hope everyone's had a great 2012,
while you get ready for the New Year, here's what's been happening in Ember.

READMORE

### DS.JSONSerializer
In the last post we talked about the changes in the serialization API's renaming methods
to remove the JSON specificity whilst adding hooks to manage relationship dirtiness.

We've now fully extracted all the JSON semantics from `DS.Serializer` into it's own class.
The `DS.JSONSerializer` is a subclass of `DS.Serializer` which implements
the JSON-specific semantics. The `RESTAdapter` now uses the `JSONSerializer` by
default so if you are using that there is no need to change anything in your application.

After some feedback we've also renamed `toData/fromData` to `serialize/deserialize`
for a more friendly API.

As always, check out [BREAKING_CHANGES](https://github.com/emberjs/data/blob/master/BREAKING_CHANGES.md)
for more information.

### Bound handlebars helpers
Ember.Handlebars just got a little bit smarter. `Ember.Handlebars.registerBoundHelper`
provides a way to easily create your own bound custom helpers.

#### Example:
```javascript
  Ember.Handlebars.registerBoundHelper('capitalize', function(value) {
    return value.toUpperCase();
  });
```
which can be used in your templates as follows:

```handlebars
  {{capitalize name}}
```

### Ember.Object.create behavior change

The new behavior will call computed property setters instead of overwriting them.  
We suggest using `Ember.Object.extend()` to create classes and use `create` to initialize
properties on your instance. The old behavior is available via `createWithMixins`.  
This change should increase object creation performance by 2x.

### Other changes of note
`reject` and `rejectProperty` methods have been added to `Ember.Enumerable`.

`Ember.none` and `Ember.empty` have been renamed to `Ember.isEmpty` and `Ember.isNone`
to keep with the Ember boolean naming convention.

### New Router API
The new router API is nearly complete, if you'd like to take a sneak-peek check it out
on the [new-router](https://github.com/emberjs/ember.js/tree/new-router) branch.
### Embedded Records
Tom and Yehuda are working on a massive refactor of the Ember Data library to fully
support embedded records amongst other goodies, check out the WIP on the
[embedded-records](https://github.com/emberjs/data/tree/embedded-records) branch.


### EmberCamp

The very first Ember Camp in SF is happening on the 15th February 2013.
[Sign up here](https://tito.io/tilde/ember-camp-2013), be quick, tickets are limited.

Looking to learn Ember? There's also an [Introduction to Ember](http://www.embertraining.com/)
event in the week leading up to Ember Camp.

Enjoy your holiday,  
Bradley Priest  
[@bradleypriest](https://twitter.com/bradleypriest)
