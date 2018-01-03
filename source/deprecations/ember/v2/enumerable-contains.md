---
id: ember-runtime.enumerable-contains
name: Enumerable#contains
until: 3.0.0
since: 2.8
---
The `Enumerable#contains` and `Array#contains` methods were deprecated in favor of `Enumerable#includes` and `Array#includes`
to stay in line with ES standards. See [RFC](https://github.com/emberjs/rfcs/blob/master/text/0136-contains-to-includes.md) for details.

`contains` and `includes` have similar behaviors. A notable exception is how `NaN` values are handled.
`contains` uses [Strict equality comparison algorithm](https://tc39.github.io/ecma262/#sec-strict-equality-comparison)
for testing inclusion while `includes` uses [SameValueZero algorithm](https://tc39.github.io/ecma262/#sec-samevaluezero).

Before:

```js
var arr = ['a', 'b', 'c', NaN, undefined, null];

arr.contains('b');        // true
arr.contains('d');        // false
arr.contains(NaN);        // false
arr.contains(null);       // false
arr.contains(undefined);  // false
```

After:

```js
var arr = ['a', 'b', 'c', NaN, undefined, null];

arr.includes('b');        // true
arr.includes('d');        // false
arr.includes(NaN);        // true
arr.includes(null);       // true
arr.includes(undefined);  // true
```

`includes` also allows a second optional parameter `startAt` to specify the index at which to begin searching:

```js
var arr = ['a', 'b', 'c', NaN];

arr.includes('c', 2);   // true
arr.includes('c', -2);  // true
```

Note that the second `startAt` parameter is only available for `Ember.Array` because `Ember.Enumerable` does not rely on index-ordered access.

`Enumerable#without` and `MutableEnumerable#addObject` use now internally `includes` instead of `contains`. This leads to some minor breaking changes:

Before:

```js
var arr = ['a', 'b'];

arr.addObject(NaN);       // ['a', 'b', NaN]
arr.addObject(NaN);       // ['a', 'b', NaN, NaN]
arr.without(NaN);         // ['a', 'b', NaN, NaN]
```

After:

```js
var arr = ['a', 'b'];

arr.addObject(NaN);       // ['a', 'b', NaN]
arr.addObject(NaN);       // ['a', 'b', NaN]
arr.without(NaN);         // ['a', 'b']
```

Addon authors should use [ember-runtime-enumerable-includes-polyfill](https://github.com/rwjblue/ember-runtime-enumerable-includes-polyfill)
to fix the deprecation in a backwards-compatible way.

Added in [PR #13553](https://github.com/emberjs/ember.js/pull/13553).
