---
title: Ember.js Native Class Update - 2019 Edition
author: Chris Garrett
tags: Recent Posts, 2019, Native Classes
alias : "blog/2019/01/26-emberjs-native-class-update-2019-edition.html"
responsive: true
---

(This post was originally published on [www.pzuraq.com](https://www.pzuraq.com/emberjs-native-class-update-2019-edition/))

These are exciting times in Ember! With Ember Octane just around the corner, native class support has [officially landed in v3.6](https://emberjs.com/blog/2018/12/13/ember-3-6-released.html#toc_new-features-2) (with a [polyfill](https://github.com/pzuraq/ember-native-class-polyfill) supporting v3.4+), and the [Decorators RFC](https://github.com/emberjs/rfcs/blob/master/text/0408-decorators.md) has been merged and will be implemented soon (pending decorators moving to stage 3 in the January meeting). Some time ago, I wrote [an article](https://medium.com/build-addepar/es-classes-in-ember-js-63e948e9d78e) that detailed how to use native classes in Ember, along with best practices for writing them. Since then, some major changes have occured, and I wanted to give a quick update for early adopters and folks who are curious about them in general.

This post will focus on changes since the original article and current best practices.  We'll be talking about:

* [The Native Class Constructor Update RFC](#toc_native-class-constructor-update-rfc)
* [`new` vs. `create`](#toc_code-new-code-vs-code-create-code)
* [`constructor` vs. `init`](#toc_code-constructor-code-vs-code-init-code)
* [Class Fields vs. `extend()`](#toc_class-fields-vs-code-extend-code)
* [Avoid Class Field Arrow Functions](#toc_avoid-class-field-arrow-functions)
* [`super` vs. `_super()`](#toc_code-super-code-vs-code-_super-code)
* [When It's Ok to Use `extend()`](#toc_when-its-ok-to-use-code-extend-code)
* [Avoiding `reopen` and `reopenClass`](#toc_avoiding-code-reopen-code-and-code-reopenclass-code)
* [Avoiding `EmberObject`](#toc_avoiding-code-emberobject-code)
* [Misc. Class Tips](#toc_misc-class-tips)

If you're new to native classes in Ember, the most comprehensive and up-to-date documentation is the [official Ember Decorators documentation site](https://ember-decorators.github.io/ember-decorators/docs/native-class-basics), where you can find a detailed guide to all of the differences in native classes and an overview of native class features. The [MDN documentation on classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) is also a great resource for learning more about the basics of native classes and how things like inheritance in Javascript work in the first place (spoiler: it's sometimes just a _little_ bit confusing).

Alright, without further ado, let's get this inaugural blog post started!

## Native Class Constructor Update RFC

After the [original ES Class RFC](https://github.com/emberjs/rfcs/blob/master/text/0240-es-classes.md) was merged, it became clear that there were some major ergonomic issues with the behavior of `EmberObject`'s constructor. Specifically, the behavior led to default values always overwriting values passed to `create` (as discussed in the [Class Fields section](https://medium.com/build-addepar/es-classes-in-ember-js-63e948e9d78e#96a9) of the original article). This behavior was a constant stumbling block for new and current Ember users alike, so we made a [second RFC](https://github.com/emberjs/rfcs/blob/master/text/0337-native-class-constructor-update.md) that updated `EmberObject` to assign values passed in _last_.

This means that many of the workarounds that were used to assign class fields before are _no longer necessary_ 🎉. It is now best practice to assign default values to class fields:

```js
// before
class Person extends EmberObject {
  firstName = this.firstName || 'Bruce';
  lastName = this.lastName || 'Wayne';
}

class Person extends EmberObject {
  firstName = _.defaultTo(this.firstName, 'Bruce');
  lastName = _.defaultTo(this.lastName, 'Wayne');
}

class Person extends EmberObject {
  @argument firstName = 'Bruce';
  @argument lastName = 'Wayne';
}

// after
class Person extends EmberObject {
  firstName = 'Bruce';
  lastName = 'Wayne';
}
```

## `new` vs. `create`

As a consequence of the constructor update RFC, creating an instance of a class using `new EmberObject()` was made impossible. This was never a _public_ API, but did work previously, and some users had begun using it this way. For classes that extend `EmberObject`, you should continue to use `create()`:

```js
class Person extends EmberObject {
  firstName = 'Bruce';
  lastName = 'Wayne';
}

let person = Person.create({
  firstName: 'Carol',
  lastName: 'Danvers'
});
```

It's important to note that this **only applies to classes that extend `EmberObject`**! For classes that do not, you should define your own constructor and use `new`:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let person = new Person('Carol', 'Danvers');
```

## `constructor` vs. `init`

There were also two changes to the behavior of the `constructor` method in classes that extend `EmberObject`:

1. Injections are no longer available
2. Create params are no longer available

These both get assigned _after_ the object has been fully created, but _before_ `init` is called. So, they are both available in `init`. The official recommendation is to always use `init` when extending from any `EmberObject` based classes, since it will consistently have everything needed.

```js
// before
class Profile extends Component {
  @service store;

  // argument
  person = this.person || null;

  constructor() {
    super(...arguments);
    let details = this.store.queryRecord('details', this.person.id);
  }
}

// after
class Profile extends Component {
  @service store;

  // argument
  person = null;

  init() {
    super.init(...arguments);
    let details = this.store.queryRecord('details', this.person.id);
  }
}
```

## Class Fields vs. `extend()`

When extending using `extend()`, all values that were passed in to the method were assigned to the _prototype_ of the class.

```js
const Person = EmberObject.extend({
  sayHello() {
    console.log('hi!');
  },

  friends: [],
});

console.log(Person.prototype.hasOwnProperty('sayHello')); // true
console.log(Person.prototype.hasOwnProperty('friends')); // true
```

This led to the infamous "shared state" problem, where an object or array passed into a class definition would be shared between every instance of that class:

```js
let peterParker = Person.create();
let wandaMaximoff = Person.create();

peterParker.friends.push('Tony Stark');

console.log(wandaMaximoff.friends); // ['Tony Stark']
```

By contrast, when using `class ... extends`, only _methods_ and
_getters/setters_ are assigned to the prototype. Class fields are assigned to the
_instance_ of the class:

```js
class Person extends EmberObject {
  sayHello() {
    console.log('hi!');
  }

  friends = []
}

console.log(Person.prototype.hasOwnProperty('sayHello')); // true
console.log(Person.prototype.hasOwnProperty('friends')); // false

let peterParker = Person.create();

console.log(peterParker.hasOwnProperty('sayHello')) // false
console.log(peterParker.hasOwnProperty('friends')) // true
```

One common pattern that existed to avoid the shared state problem in classic classes was assigning values in the `init` hook of the class. With native class fields this is _not_ an issue. Class fields are assigned a new copy of their value for every instance, which means that there is no accidental sharing of state. The current best practice is to move any property assignments in `init` to class fields:

```js
// before
const Person = EmberObject.extend({
  init() {
    this.friends = [];
  }
});

// after
class Person extends EmberObject {
  friends = [];
}
```

One exception here is when you are assigning a value that was passed into the class constructor, for classes that do _not_ extend `EmberObject`, or when you are defining a value based on _other_ values:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Person {
  firstName = 'Thor';
  lastName = 'Odinson';

  constructor() {
    // fullName is based on firstName and lastName, so
    // it should be assigned in the constructor
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
```

The other exception is for static values that _should_ be constant. Creating a new instance of the value for each instance of the class is _usually_ a good thing, but in some cases this can be really bad for performance. For example, if you ever used the `layout` property to create a "single file component" with `ember-cli-handlebars-inline-precompile`, this will now create a new template per instance! This is why we created the `@layout` decorator in `ember-decorators`:

```js
import Component from '@ember/component';
import { layout } from '@ember-decorators/component';
import hbs from 'htmlbars-inline-precompile';

// before
export default Component.extend({
  // assigns the layout once to the prototype, so it's ok 👍
  layout: hbs`{{this.firstName}} {{this.lastName}}`,
});

// bad!
export default class PersonComponent extends Component {
  // creates a new instance of the layout for every component! 🛑
  layout = hbs`{{this.firstName}} {{this.lastName}}`;
}

// after
// creates one instance of the layout, and assigns it to the class 💯
@layout(hbs`{{this.firstName}} {{this.lastName}}`)
export default class PersonComponent extends Component {}
```

In cases where other types of values are static like this, consider create constants instead.

## Avoid Class Field Arrow Functions

This one is more of a general native classes rule, rather than an Ember specific one. However, it is a pattern that is becoming more and more common, and it's something that should be avoided. Specifically, developers in the wider Javascript community are using arrow functions to create bound instance methods on a class for things like event handlers:

```js
// do not copy this. This is an antipattern!
class Checkbox {
  onClick = () => {
    // handle click
  };

  constructor(element) {
    this.element = element;

    this.element.addEventListener('click', this.onClick);
  }
}
```

The reasons why this is problematic include:

1. It breaks inheritance and super, since class fields overwrite each other as the class is constructed
2. `arguments` does not behave the same as a normal method
3. It's difficult to mock in tests, since you can't change the function on the prototype of the class.

For more details, check out [this rationale](https://github.com/tc39/proposal-decorators/blob/master/bound-decorator-rationale.md) on the official decorators proposal.

Instead, you can use the `@action` decorator provided by Ember (and Ember Decorators), which binds a the handler lazily:

```js
class Checkbox {
  @action
  onClick() {
    // handle click
  };

  constructor(element) {
    this.element = element;

    this.element.addEventListener('click', this.onClick);
  }
}
```

## `super` vs. `_super()`

When using native classes, you should _never_ use `this._super()`. Unfortunately, there is not currently an assertion that prevents this (although we would like to add one), but there is a [linting rule](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-ember-super-in-es-classes.md) included with eslint-plugin-ember.

All instances of calls to `this._super()` can be replaced instead with the `super` keyword. `super` works a little bit differently than `this._super()` though. When called in a constructor, you use it directly:

```js
class Car extends Vehicle {
  constructor() {
    super(...arguments);

    this.wheels = 4;
  }
}
```

It's actually a syntax error if you don't use `super` this way in constructors. However, when not used from the constructor, `super` gives access to _all_ of the parent class's instance properties and methods, and you must call the method on it explicitly:

```js
class Car extends Vehicle {
  start() {
    super.start(...arguments);

    this.currentGear = 'drive';
  }
}
```

You can even call _other_ inherited methods using this, which is why you must specify it in the first place:

```js
class Car extends Vehicle {
  start() {
    super.ignition(...arguments);

    this.currentGear = 'drive';
  }
}
```

This design choice for `super` was really about embracing the nature of Javascript's prototypical inheritance, instead of choosing to mimic other languages like Java that have different inheritance patterns.

Finally, as with classic classes, you should generally pass all arguments through to the super calls for existing lifecycle hooks:

```js
class MultiSelectComponent extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);

    // setup component element
  }
}
```

## When It's Ok to Use `extend()`

One major part of the original classes RFC was ensuring that native classes that extend from `EmberObject` would be able to interoperate with classic class syntax, meaning that you would be able to continue using `.extend()` with them, without having to worry if a particular class was defined using native syntax or not. This was also the answer to how mixins would interoperate with native classes, since they don't have a native equivalent yet.

However, it is also possible to use this feature in other ways, some of which have become antipatterns over time. For instance, `ember-cli-typescript` has recommended that users define their classes like so:

```ts
// do not copy this. This is an antipattern!
export default class PersonComponent extends Component.extend({
  fullName: computed('firstName', 'lastName', {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  }),
}) {
  firstName = 'Diana';
  lastName = 'Prince';
}
```

This recommendation was made because the future of decorators in Ember was unclear at the time, and the Ember Typescript team wanted to ensure that users could write _safe_ code that wouldn't break at some point in the future. This was entirely reasonable, and really the best decision they could make at the time - this code is rock solid and _will not break_ or need to be updated until Ember v4 at the earliest (yay stability)!

However, now that the Decorators RFC has been accepted, and `ember-decorators` has converted to matching the behavior of the RFC, this pattern is no longer ideal. In fact, it will be harder to convert going forward, since the [native class codemod](https://github.com/scalvert/ember-es6-class-codemod) currently does not support this style of syntax - though it would definitely be possible to add, and we would love contributions!

So coming back to the original question - when should you use `.extend()`? There are only two cases where you should:

1. When you are passing mixins to a class defined with native class syntax:

   ```js
   export default class PersonComponent extends Component.extend(
     FullNameMixin,
     OtherMixin
   ) {
     firstName = 'Diana';
     lastName = 'Prince';
   }
   ```

2. When you are using classic class syntax to define a class:

   ```js
   export default Component.extend({
     fullName: computed({
       get() {
         return `${this.firstName} ${this.lastName}`;
       }
     }),

     firstName: 'Diana',
     lastName: 'Prince',
   });
   ```

We're working on [a linting rule](https://github.com/scalvert/eslint-plugin-ember-es6-class/issues/4) that will prevent this as well, but unfortunately this is not something we can assert against in Ember itself. In any case, you should definitely avoid mixing the two styles in all circumstances.

## Avoiding `.reopen()` and `.reopenClass()`

Native classes don't _really_ have equivalents to `EmberObject`s ability to reopen class definitions willy-nilly and mess around with internals. You can patch class prototypes _directly_, but that's a much messier process in general, and that's a _good_ thing - it turns out being able to completely redefine classes arbitrarily is not a great idea 🙃

However, there are legitimate use cases. In general, if you are relying on this behavior, you should _first_ try to find a way to refactor off of it without touching prototypes, constructors, etc. In the case of `.reopenClass()`, this will often times be as simple as adding `static` class fields and methods to the class definition, since that's almost always what the method is used for:

```js
// before
export default Component.extend({}).reopenClass({
  positionalParams: ['title', 'body']
});

// after
export default class BlogPostComponent extends Component {
  static positionalParams = ['title', 'body'];
}
```

In the cases where you _can't_ easily refactor away from `.reopen()` or `.reopenClass()`, it's generally recommended that you _do_ keep using them. Prototypes are _hard_ (as I've personally learned _many_ times throughout this process), and `EmberObject` and its methods are not deprecated, so they'll continue working for some time to come. You can take your time to think of better ways to refactor away from them, there's no rush!

## Avoiding `EmberObject`

Alright, so after reading through all of that you may be thinking "that is a _lot_ to remember", and you would be right. `EmberObject` works well with native classes, but there definitely are some oddities such as having to use `init` instead of `constructor`, `create` instead of `new`, etc. that may be hard to keep track of. If you'd prefer to _not_ have to deal with these things, you actually can _opt-out_ today!

All of Ember's decorators are completely compatible with _plain_ native classes. There is absolutely no need to extend `EmberObject`, and in fact it should be considered best practice to _avoid_ `EmberObject` whenever possible:

```js
// before
class Person extends EmberObject {
  firstName = null;
  lastName = null;

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

let person = Person.create({
  firstName: 'Carol',
  lastName: 'Danvers'
});

// after
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

let person = new Person('Carol', 'Danvers');
```

This means that any utility classes written using `EmberObject` can be rewritten and converted away from it. In fact, you should only need to remember the rules in this post for _framework primitives_, such as:

* Ember
  * `@ember/component`
  * `@ember/controller`
  * `@ember/helper`
  * `@ember/route`
  * `@ember/service`
* Ember Data
  * `@ember-data/adapter`
  * `@ember-data/model`
  * `@ember-data/serializer`

`@glimmer/component`, which was just accepted via RFC, will be implemented _without_ extending `EmberObject` which means you will not need to remember the rules and exceptions for newer components either. In general, when in doubt, use native classes!

## Misc. Class Tips

This section is for a few remaining tips/best practices that I have developed myself in using native classes. These recommendations are from my own personal experience, so take what you will from them.

### Always give you class a name!

Anonymous classes are a thing in JS:

```js
export default class {

}
```

While this may seem nice, if you do this everywhere it means that you're going to have hundreds of the same indistinguishable classes when you're trying to debug, especially in the memory debugger 😱 It also makes your codebase much less searchable. Always add a name, even if it seems redundant!

### Type your (framework) class names

In my experience, it generally makes sense to add the _framework_ type of a class to its name as well. That is, if it is a _Route_, _Controller_, _Component_, or _Service_, you would want to name it `UserRoute`, `UserController`, `UserComponent`, or `UserService` respectively so you don't have 4 different classes named `User`!

This is less of a hard and fast rule though. It generally doesn't make sense for Models for instance (`UserModel` sounds meh) or various utility classes. And if you prefer being able to omit `Component` from the name of every single component, maybe they're generally clear enough without it! Still, the fact that Routes and Controllers have so much overlap suggests you'll probably want to distinguish them, and for some reason I just feel the urge to add `Service` to the end of all my services.

Note that this only applies to _class names_, appending the type to the end of file names is definitely not a good idea.

### Don't rely on class field assignment order

Class fields get assigned in order, from top to bottom. This means that it's entirely possible for a class field to rely on the values of _other_ class fields:

```js
class Person {
  firstName = 'Tony';
  lastName = 'Stark';

  fullName = `${this.firstName} ${this.lastName}`;
}
```

This is a bad idea because it makes your class harder to refactor. Moving a field around can break your class in unexpected ways, and it might take minute to figure out what's going on. Class fields definitely _read_ declaratively, and the fact that they _do_ have an assignment order is actually rather odd in that sense - intuitively, you might expect them to all exist at once, like assigments on an object literal.

Note that this really only applies to class fields - once you're in a "hook" of some kind, like the `constructor` or `init`, it's safe to start using values. This is because moving the constructor around is safe, and functions are pretty easy to reason about locally (usually 😬):

```js
// EmberObject based class
import Component from '@ember/component';

class Person extends Component {
  init() {
    super.init(...arguments);
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  firstName = 'Tony';
  lastName = 'Stark';
}

// standard native classes
class Person {
  constructor() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  firstName = 'Tony';
  lastName = 'Stark';
}
```

Generally, derived state like this is handled better by getters/setters, so this should be avoided if possible by using those.

## Additional Resources

* [Ember Decorators Guides](https://ember-decorators.github.io/ember-decorators/docs/native-class-basics)
* [MDN Class Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [The Native Class Codemod (WIP)](https://github.com/scalvert/ember-es6-class-codemod)
* [Ember Native Class ESLint Plugin](https://github.com/scalvert/eslint-plugin-ember-es6-class)

And that's all folks! If you have more questions, join the [Ember Discord](https://www.emberjs.com/community/) and ask away, the `#e-decorators`, `#e-typescript`, `#st-native-classes`, and `#st-octane` channels are all great places to get some advice. Thanks for reading!
