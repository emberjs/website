---
title: 'Coming Soon in Ember Octane - Part 1: Native Classes'
author: Chris Garrett
tags: Recent Posts, 2019, Ember Octane, Native Classes
alias: 'blog/2019/02/11-coming-soon-in-ember-octane-part-1-native-classes.html'
responsive: true
---

(This post was originally published on [www.pzuraq.com](https://www.pzuraq.com/coming-soon-in-ember-octane-part-1-native-classes/))

If you've been paying attention in Ember lately you may have heard the term "Octane" floating around here and there recently, and wondered what all the excitement was about. It may seem like a bit of a big deal - and that's because it kind of is! It's Ember's first new _edition_, proposed in the [Ember 2018 Roadmap](https://github.com/emberjs/rfcs/blob/master/text/0364-roadmap-2018.md), and represents a major shift in the mental model behind Ember.js and Ember applications. In this series, I'll be diving into some of the new features that are part of Octane (specifically the ones that are part of the _browser_ side of the framework) and giving a brief overview of how the feature works, and why the feature is being added. The features I'm planning on discussing are:

- Native Classes (+Decorators)
- Angle Bracket Syntax & Named Arguments
- Tracked Properties
- Modifiers
- Glimmer Components

There _are_ more features that are part of Octane, such as Ember's new file system layout (also known as Module Unification), template imports, and other build improvements, but these are a bit out of my scope - I've personally been focused on the story for developers in the browser, writing app and addon code, and how that's going to change.

This series is aimed at existing Ember users, but if you're new to Ember or tried Ember a while ago and want to see how things are changing, I'll be providing context on the existing features as we go along. These posts won't be doing deep dives on all the edge cases of the functionality, they are moreso meant as an overview of what's coming. If you can't already tell, I'm very excited about these new features and the future of Ember with them, and can't wait to see them land in master! So, let's dive in!

### What Are Editions?

Before we move onto Native Classes, let's talk about Ember Editions really quickly. Not many other frameworks have an equivalent for Editions, and they may seem a little confusing at first. So, what are they?

An Edition in Ember represents the culmination of all the changes that have happened in the framework since the last Edition. In a lot of other frameworks, this is like a new major version. It means we have significantly improved things, added new concepts and ideas, updated all the documentation and marketing materials, created new guides, battle-tested everything, and are confident that it is ready for mass adoption. In some ways, it's like a new release of a product version at a company - things have changed, and we're ready to blast out to the world that there's a whole "new" Ember!

You might be asking yourself, why not just use SemVer's major versions to do this? Usually when a framework releases a new major version, there are new APIs and features and there's lots of buzz and excitement about that. So, why not just release Ember v4 and be done with it?

The answer is in the way Ember treats and respects SemVer. We follow SemVer to the letter - patch versions include _only_ bugfixes, minor versions include _only_ new features and improvements, and major versions only _remove_ deprecated APIs. No new features are _ever_ introduced on a major Ember version. This makes updating your app much simpler - there's no need to rewrite a component or service, or update to the new ways of doing things, just remove the deprecated features (which issue console warnings when used) and you should be able to bump the version without problems.

In this model, new features are introduced gradually over the course of a single major version, allowing users to adopt them incrementally. This is amazing for app maintenance - instead of having a new major version be released and having to go update everything all at once, you can do it one piece at a time, as the new things are released.

However, because this is done incrementally it can also sometimes mean that the new experience isn't really all that polished. After all, the docs and guides have to continue supporting the existing features, and remain cohesive. Adding every new feature to them immediately could quickly make them overwhelming for new users. Additionally, sometimes features may be ready and complete in isolation, but really be part of a larger picture of new features that are still in the pipeline, and some folks would prefer to wait for all of the "new world" to land before adopting new features.

Editions are Ember's way to message to the community that the framework has synchronized, that all (or most) of the new features have shipped, and that it's time to update and adopt the new features. It's a tool that allows us to continue to use SemVer to signal _compatibility_ changes exclusively, and have a different tool for signaling _major updates and new features_. This allows us to keep our core value of stability without stagnation, and be able to show off cool new things at the same time!

Alright, now let's move onto those new features in Octane!

## Native Classes (+Decorators)

Native Javascript classes in Ember are near and dear to my heart. I first began exploring them almost 2 years ago now, when I first approached [@rwjblue](https://twitter.com/rwjblue) about the state of [ember-decorators](https://ember-decorators.github.io/ember-decorators/) ("ember-computed-decorators" at the time). I was tasked with building out our documentation internally, and wanted something more ergonomic than YUIDoc/JSDoc style tags and comments that required you to manually name and tag every single method, property, and parameter. I had heard from [@runspired](https://twitter.com/runspired) some time before that native classes actually _mostly_ worked with Ember already, and just needed a little bit of finagling to get all the way there.

It turned out that was half-true - native classes did work pretty well with Ember's own classes, but there were some pretty major changes we needed to make to get them to be just as ergonomic and usable as Ember's classic class syntax, which was beginning to look more and more dated by the day. These changes were ultimately _small_, but they were deep in the internals of Ember, and operating on them was an almost surgical process, with little room for error or regression.

Today, native classes are fully supported in Ember, with a rock solid public API and well defined, ergonomic behavior. However, they are one of those features that are part of a larger picture, specifically they require _class fields and decorators_ to be used effectively. Class fields are currently stage 3 in the TC39 process, which is generally supported by Ember for early adoption, but decorators remain at stage 2 after the January 2019 TC39 meeting. As we will discuss, decorators are crucial to using Native Classes effectively because Ember _has been using the decorator pattern all along_!

We have plans to continue working with TC39, along with the other major users of decorators (TypeScript, Angular, Vue, MobX, etc) to standardize and stabilize the syntax enough for us to land them in the framework, and while that may end up being some time after EmberConf, we already have the _behavior_ of decorators spec'd out and implemented behind a feature flag. They will be available to play around with by EmberConf, so you'll be able to try them out with native classes to see how they work. If you're impatient, you can also always use [ember-decorators](https://ember-decorators.github.io/ember-decorators/), which matches the behavior of the proposed decorators exactly.

Enough background, let's move onto some demonstrations!

### Classes in Action

Classes have existed since the very earliest versions of Ember, when it was still named SproutCore 2. Back in 2011, ES6 did not yet exist, and a true native class syntax wasn't even a remote possibility. Many frameworks ended up creating their own class-like wrappers around JavaScript's prototypical inheritance, Ember included. It looked very much like it looks today:

```js
// A person class defined in Ember v1
var Person = Ember.Object.extend({
  firstName: 'Steve',
  lastName: 'Rogers',

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  updateName: function(firstName, lastName) {
    this.set('firstName', firstName);
    this.set('lastName', lastName);
  },
});

// Make an instance of the class, overriding default values
let phoenix = Person.create({ firstName: 'Jean', lastName: 'Gray' });

// A person class defined with current class syntax
import EmberObject, { computed } from '@ember/object';

const Person = EmberObject.extend({
  firstName: 'Steve',
  lastName: 'Rogers',

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),

  updateName(firstName, lastName) {
    this.set('firstName', firstName);
    this.set('lastName', lastName);
  },
});

// Make an instance of the class, overriding default values
let phoenix = Person.create({ firstName: 'Jean', lastName: 'Gray' });
```

There are some noticeable differences here, but most of these are unrelated to changes in the class syntax. We now have the niceties of ES2018 such as template strings and object-method syntax, and we no longer need to use `get` to get values, but we do still need to use `set` (that's being addressed by a different feature, _tracked properties_, that I'll be discussing in a later post in this series). The only major change to the mechanics of classes is the change to the way we define computed properties - in the older style, we used the `.property()` notation which was available because we added it to `Function.prototype` (**very much an antipattern!**), and now we just use the `computed` function to wrap the getter directly.

Let's take a look at what this looks like when converted to native classes:

```js
import EmberObject, { computed } from '@ember/object';

class Person extends EmberObject {
  firstName = 'Steve';
  lastName = 'Rogers';

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  updateName(firstName, lastName) {
    this.set('firstName', firstName);
    this.set('lastName', lastName);
  }
}

// Make an instance of the class, overriding default values
let phoenix = Person.create({ firstName: 'Jean', lastName: 'Gray' });
```

Now that's much cleaner! We have far fewer opening and closing brackets, and we're using the native `get fullName()` syntax to define the getter meaning we don't have to remember that funky `computed()` syntax. Computed properties are decorators now, and assigned values are class fields. In fact, we can go one step further - we don't even need to extend from `EmberObject` anymore:

```js
import { computed, set } from '@ember/object';

class Person {
  firstName = 'Steve';
  lastName = 'Rogers';

  constructor(firstName, lastName) {
    this.updateName(firstName, lastName);
  }

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  updateName(firstName, lastName) {
    set(this, 'firstName', firstName);
    set(this, 'lastName', lastName);
  }
}

// Make an instance of the class, overriding default values
let phoenix = new Person('Jean', 'Gray');
```

We can completely drop the weight of using Ember's legacy class system and rely solely on native classes this way. This is awesome! In the future this means we'll be able to remove a large chunk of Ember's legacy code and leverage the platform instead, making our apps faster to load and easier to write.

Another thing you may have noticed in the above examples is that we're using the exact same import paths for everything, including `computed`. At first this may seem like a breaking change! How can `computed` be a modern class decorator _and_ be used in classic class syntax, without breaking anything? Shouldn't it be imported from a different location or something? In fact, it doesn't need to be at all. `computed` is fully compatible with _both_ classic classes and native classes, along with all existing computed property macros in Ember and the Ember addon ecosystem! This is perfectly valid syntax that will Just Work™️:

```js
import EmberObject, { computed, set } from '@ember/object';

const ClassicClassPerson = EmberObject.extend({
  firstName: 'Steve',
  lastName: 'Rogers',

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),

  updateName(firstName, lastName) {
    this.set('firstName', firstName);
    this.set('lastName', lastName);
  },
});

class NativeClassPerson {
  firstName = 'Steve';
  lastName = 'Rogers';

  constructor(firstName, lastName) {
    this.updateName(firstName, lastName);
  }

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  updateName(firstName, lastName) {
    set(this, 'firstName', firstName);
    set(this, 'lastName', lastName);
  }
}

// Make an instance of the class, overriding default values
let classicClassSpiderMan = ClassicClassPerson.create({
  firstName: 'Peter',
  lastName: 'Parker',
});

let nativeClassSpiderMan = new NativeClassPerson('Peter', 'Parker');
```

The reason this is possible is, behind the scenes, `computed` has _always_ been a decorator.

### Decorators Before @Decorators

You may be familiar with the proposed decorator syntax for JavaScript, but if not the basic gist is that you can "decorate" class fields and methods with additional behavior:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // memoizes the value, which caches it the first time
  // it is calculated and then always returns the cached value
  @memo
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

There are lots of potential uses for this functionality, such as a `@bound` decorator that binds a method to the instance (for use in event listeners and such) or an `@htmlSafe` decorator that sanitizes the return value of a function so it's safe to add it to the DOM.

Javascript is far from the first language to have this sort of functionality however. One great example of it is in Python, and one reason I especially like [some examples from their community](https://realpython.com/primer-on-python-decorators/#simple-decorators) is they show how you can use decorators _without their decorator syntax_:

```python
# Given this decorator:
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

# This function definition with the decorator syntax:
@my_decorator
def say_whee():
    print("Whee!")

# Is the same as doing this without it:
def say_whee():
    print("Whee!")

say_whee = my_decorator(say_whee)
```

The "decorator pattern" more generically is about taking an input of some type - a function, a class method, a field - and transforming it into something of the same (or similar) type, adding some extra functionality along the way. You don't need a special syntax to use the decorator pattern, it just makes it a bit more convenient! If you think about it this way, Ember's `computed()` function is _basically_ a decorator - it adds caching based on dependent keys to a getter function.

Leveraging this similarity, we were able to update that decorator functionality to match JavaScript's newly proposed API, which is how we're able to have it be compatible between both the classic and current syntax. The added side effect is that the _entire_ Ember ecosystem gets this upgrade all at once, with absolutely no extra work required!

### Decorators in Ember Octane

The changes proposed in the [Decorators RFC](https://github.com/emberjs/rfcs/blob/master/text/0408-decorators.md) boil down to:

- `@ember/object#computed` is now a decorator
- All of the macros available in `@ember/object/computed`, such as `alias`, `gte`, `bool`, etc. are decorators
- `@ember/service#inject` and `@ember/controller#inject` are decorators
- A new decorator, `@action`, has been added for function binding.

These cover all of the basic functionality provided by the current classic class syntax, with the exception of classic component customization (there's a mouthful!) and observers/event listeners. Because Ember Octane is introducing a new component class, `@glimmer/component`, that doesn't require the element/DOM APIs of classic components, it was decided that decorators for that functionality were not needed in the core of the framework. Likewise, observers and event listeners are not a recommended pattern anymore, so adding decorators for them didn't make much sense. Instead, users can rely on existing libraries like `ember-decorators` which cover these use cases if they need them.

### Putting It All Together

Alright, with that in mind, let's take on a bigger, more complete example! This is a component from [emberobserver.com](https://emberobserver.com/), one of the larger components I could find in the application ([source here](https://github.com/emberobserver/client/blob/343e7f39b035897e4db0b4be45ca3a1cd238eacc/app/components/addon-source-usages.js)):

```js
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';

export default Component.extend({
  visibleUsageCount: 25,

  showUsages: false,

  usages: null,

  regex: false,

  fileFilter: null,

  codeSearch: service(),

  visibleUsages: computed('visibleUsageCount', 'usages', function() {
    return this.usages.slice(0, this.visibleUsageCount);
  }),

  moreUsages: computed('visibleUsageCount', 'usages', function() {
    return this.visibleUsageCount < this.usages.length;
  }),

  fetchUsages: task(function*() {
    let usages = yield this.codeSearch.usages.perform(
      this.addon.id,
      this.query,
      this.regex
    );
    this.set('usages', filterByFilePath(usages, this.fileFilter));
  }).drop(),

  actions: {
    toggleUsages() {
      this.toggleProperty('showUsages');
      if (this.showUsages && this.usages === null) {
        this.fetchUsages.perform();
      }
    },

    viewMore() {
      this.set('visibleUsageCount', this.visibleUsageCount + 25);
    },
  },
});

function filterByFilePath(usages, filterTerm) {
  if (isEmpty(filterTerm)) {
    return usages;
  }
  let filterRegex;
  try {
    filterRegex = new RegExp(filterTerm);
  } catch (e) {
    return [];
  }
  return usages.filter(usage => {
    return usage.filename.match(filterRegex);
  });
}
```

And here is the same component, fully converted to native classes using Ember's built-in decorators and the and [ember-concurrency-decorators](https://github.com/machty/ember-concurrency-decorators) library:

```js
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { dropTask } from 'ember-concurrency-decorators';

export default class AddonSourceUsagesComponent extends Component {
  visibleUsageCount = 25;
  showUsages = false;
  usages = null;
  regex = false;
  fileFilter = null;

  @service codeSearch;

  @computed('visibleUsageCount', 'usages')
  get visibleUsages() {
    return this.usages.slice(0, this.visibleUsageCount);
  }

  @computed('visibleUsageCount', 'usages')
  get moreUsages() {
    return this.visibleUsageCount < this.usages.length;
  }

  @dropTask
  *fetchUsages() {
    let usages = yield this.codeSearch.usages.perform(
      this.addon.id,
      this.query,
      this.regex
    );
    this.set('usages', filterByFilePath(usages, this.fileFilter));
  }

  @action
  toggleUsages() {
    this.toggleProperty('showUsages');
    if (this.showUsages && this.usages === null) {
      this.fetchUsages.perform();
    }
  }

  @action
  viewMore() {
    this.set('visibleUsageCount', this.visibleUsageCount + 25);
  }
}

function filterByFilePath(usages, filterTerm) {
  if (isEmpty(filterTerm)) {
    return usages;
  }
  let filterRegex;
  try {
    filterRegex = new RegExp(filterTerm);
  } catch (e) {
    return [];
  }
  return usages.filter(usage => {
    return usage.filename.match(filterRegex);
  });
}
```

This is subjectively much cleaner and easier to read, but should still look pretty familiar to long-time Ember users.

### Native Class Benefits

Maybe you're not convinced by the new syntax - after all, it's not _that_ much different than what we have today. There are many other benefits that'll be coming thanks to native classes, and I'd like to touch on them briefly here:

#### Speed and performance enhancements

Relying on native features means that we can drop a significant chunk of Ember's internal framework code, meaning Ember will be that much lighter overall. In addition, since classes are easier to statically analyze, there may be more benefits unlocked by the VMs themselves in the future, increasing the speedup as time goes on.

#### Shared documentation and tooling

The rest of the JavaScript ecosystem is beginning to adopt classes as well, meaning we'll have a much larger community of shared libraries, documentation, and tooling to rely on. Today, new Ember users have to be taught the details of Ember's class system, but in the future JavaScript classes will be one of the first chapters in every JS manual, how-to-guide, and bootcamp. This means less time ramping developers up to speed.

In addition, tooling like IDEs (WebStorm, VSCode), typecheckers (Flow, TypeScript), and documentation generators (ESDoc, TypeDoc) will all benefit from the statically analyzable nature of classes. There's already lots of work happening to automate more and more tasks, meaning that writing codebases with classes will be that much easier.

#### True private state

Native class fields also add _private_ fields, which allow us to have truly private instance state for the first time (without using a `WeakMap`, which is highly unergonomic):

```js
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}

let person = new Person('Jessica', 'Jones');

console.log(person.fullName); // 'Jessica Jones'
console.log(person.#firstName) // ERROR
```

#### Fewer bugs and quirks

There are quite a few quirky behaviors of classic classes:

- Merged and concatenated properties (like `classNames` on components)
- Shared state between instances (e.g. if you do `EmberObject.extend({ foo: [] })`)
- Reopening class definitions to define static properties (`reopenClass`)
- The ability to reopen and redefine class methods and behaviors in general (still possible with native classes, but not nearly as easy)
- Mixin behavior in general, especially inheritance and `super`

All of these issues have been addressed in native classes. Some functionality was not needed, and other functionality was added to ensure that strange, counterintuitive behavior does not occur.

## Conclusion

That's all I have for today, I hope you're looking forward to being able to use native class syntax in Ember as much as I am! Tune in next week for a break down of the changes to Ember's templating syntax, including `<AngleBracketInvocation>` and `@namedArgs`!
