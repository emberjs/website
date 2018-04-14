---
title: Ember 1.4.0 and 1.5 Beta Released
author: Robert Jackson
tags: Releases, 1, 2014, 1.4, 1.5
responsive: true
---

We are pleased to announce that both Ember.js 1.4.0 and the first beta in the 1.5 series
have just been released. This comes as the fourth cycle of our six-week release
process that began just after 1.0 was released.

### New features in 1.4

#### Property Brace Expansion

In prior versions of Ember if you wanted to observe both `foo` and `bar` on `baz`
you would need to setup both `baz.foo` and `baz.bar` as dependent keys.

```javascript
var obj = Ember.Object.extend({
  baz: {foo: 'BLAMMO', bar: 'BLAZORZ'},

  something: function(){
    return this.get('baz.foo') + ' ' + this.get('baz.bar');
  }.property('baz.foo', 'baz.bar')
});
```

With the new property brace expansion, you could setup the computed properties dependencies
instead like:

```javascript
  something: function(){
    return this.get('baz.foo') + ' ' + this.get('baz.bar');
  }.property('baz.{foo,bar}')
```

This allows much less duplication/redundancy when your dependent keys are mostly similar.

See the original PR [#3538](https://github.com/emberjs/ember.js/pull/3538) for more details.

#### Ember.run.bind

`Ember.run.bind` provides a useful utility when integrating with non-Ember libraries
that provide asynchronous callbacks.

Ember utilizes a run-loop to batch and coalesce changes. This works by
marking the start and end of Ember-related JavaScript execution.

When using events such as a View's click handler, Ember wraps the event
handler in a run-loop, but when integrating with non-Ember libraries this
can be tedious.

For example, the following is rather verbose but is the correct way to combine
third-party events and Ember code.

```javascript
var that = this;
jQuery(window).on('resize', function(){
  Ember.run(function(){
    that.handleResize();
  });
});
```

To reduce the boilerplate, the following can be used to construct a
run-loop-wrapped callback handler.

```javascript
jQuery(window).on('resize', Ember.run.bind(this, this.handleResize));
```

For more details please reference the recently added [run-loop guide](/guides/understanding-ember/run-loop/)
(much thanks to [Brendan Briggs](https://github.com/bfbriggs)).

#### With Controller

The `{{with}}` helper can now accept a `controller` option. Adding `controller='something'`
instructs the `{{with}}` helper to create and use an instance of the specified controller
with the new context as its content.

This is very similar to using the `itemController` option with the `{{each}}` helper.

```handlebars
{{#with users.posts controller='userBlogPosts'}}
  {{!- The current context is wrapped in our controller instance }}
{{/with}}
```

In the above example, the template provided to the `{{with}}` block is now wrapped in the
`userBlogPost` controller, which provides a very elegant way to decorate the context with custom
functions/properties.

#### Lazily Bound Attributes

Previously, every attribute that was bound added some degree of cost (mostly associated with maintaining
the bindings/observers themselves). This lead us to limit the list of attributes that were automatically
bound for `Ember.TextField`, `Ember.TextArea`, and friends. This is a common source of frustration as
more and more people want to bind to HTML5 attributes, but find that to do so they must reopen the
`Ember.TextField` class and add the attributes they need.

This might look like:

```javascript
Ember.TextField.reopen({
  attributeBindings: ['autofocus']
});
```

Then from the template:

```handlebars
{{input autofocus=omgAutofocusMe}}
```

This certainly is not ideal, and causes many issues for people that expect it to "just work".

Thankfully, this has gotten MUCH better with the 1.4 release. In 1.4 any attribute bindings that do not
exist at the time the view is first rendered will not have observers setup (therefore removing the original
performance concern), but if/when the attribute is set on the view later (after the first render) an observer
is setup at that time.

This means that we are only creating observers for actual properties that are present, but we can list every
valid HTML attribute in the `attributeBindings` property so that you can simply use them without having to reopen
internal classes.

As of Ember 1.4 you should be able to use any HTML5 attribute with `{{input type="text"}}`, `{{textarea}}`, and
`{{checkbox}}`.

#### Other Improvements

As usual, there are a ton of bug fixes and small improvements in this
release. You can see a list of all the changes in the CHANGELOG:

* [Ember.js 1.4.0 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.4.0/CHANGELOG.md)
* [Ember.js 1.5.0-beta.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.5.0-beta.1/CHANGELOG.md)
