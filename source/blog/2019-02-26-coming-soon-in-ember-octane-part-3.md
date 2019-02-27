---
title: 'Coming Soon in Ember Octane - Part 3: Tracked Properties'
author: Chris Garrett
tags: Recent Posts, 2019, Ember Octane, Tracked Properties
alias: 'blog/2019/02/26-coming-soon-in-ember-octane-part-3-tracked-properties.html'
responsive: true
---

(This post was originally published on [www.pzuraq.com](https://www.pzuraq.com/coming-soon-in-ember-octane-part-3-tracked-properties/))

Hello again, and welcome back! This is the third entry in the multipart _Coming Soon in Ember Octane_ series, where we're previewing some of the various features that are landing in Ember's upcoming Octane edition, including:

- [Native Classes (+Decorators)](https://www.pzuraq.com/coming-soon-in-ember-octane-part-1-native-classes/)
- [Angle Brackets & Named Arguments](https://www.pzuraq.com/coming-soon-in-ember-octane-part-2-angle-brackets-and-named-arguments/)
- Tracked Properties _← this post_
- Modifiers
- Glimmer Components

<!-- alex ignore dives -->
These aren't _all_ of the new features that will be part of Octane, just the ones that I'm most familiar with personally. This series is aimed at existing Ember users, but if you're new to Ember or tried Ember a while ago and want to see how things are changing, I'll be providing context on the existing features as we go along. These posts won't be doing deep dives on all the edge cases of the functionality, they are moreso meant as an overview of what's coming. If you're curious about what an _edition_ is exactly, you can check out a quick break down in [the first post in the series](https://www.pzuraq.com/coming-soon-in-ember-octane-part-1-native-classes/#whatareeditions).

On to tracked properties!

## Tracked Properties: Automatic `shouldComponentUpdate`

For most Ember users, typing out lists of dependencies should be second nature. Ember has never had the equivalent of React's `shouldComponentUpdate` or `React.memo`, instead relying on `set` (roughly equivalent to `setState`), and explicit property dependencies for computed properties:

```js
// components/clock.js
export default Component.extend({
  init() {
    setInterval(() => {
      this.set('date', new Date());
    }, 1000);
  },

  formattedTime: computed('date', function() {
    return moment(this.get('date')).format('h:mm:ss a');
  }),

  message: computed('formattedTime', function() {
    return `It is currently ${this.get('formattedTime')}!`;
  }),
});
```

<!-- alex ignore dirty -->
This system means that users don't usually have to _think_ about whether or not a component should update. If any values have updated, they will inform their dependencies, and Ember will know whether or not to rerender the template if something that has been marked as dirty was rendered before. This is similar to to React's new `useMemo` hook, but is used by _default_ for every value in an Ember app.

Better yet, it also means Ember can _minimize_ the amount that is rerendered - each individual value in the template can know whether or not it has been updated, meaning entire sections of the template (and components within those sections) can be skipped:

```handlebars
<!-- This wrapper component gets ignored completely during rerenders -->
<ClockWrapper theme="dark">
  <!-- This text node is the _only_ thing that gets touched -->
  {{this.message}}
</ClockWrapper>
```

This is also what enables Ember's [_dependency injection_ system](https://guides.emberjs.com/release/applications/services/). Instead of having to wrap every component in a Context/Provider that is updating the component's props, we can directly inject the instance of a service and passively watch it for changes, reducing a layer of indirection.

However, this all comes at a cost. We have to use `set` _everywhere_ to ensure that the system picks up changes (up until recently we also had to use `get` to get them, but thankfully that constraint was [mostly removed recently](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md)), and we have to type out these lists of dependencies for any derived values in the system. This can take quite a lot of time and effort, and requires diligence to maintain.

So, Ember's current system isn't quite "automatic" either. It's _conventional_ - by following the rules, you get the benefits of `shouldComponentUpdate` without having to work out the details yourself. It's pretty easy to follow those rules, because they _are_ simple and straightforward, but it still can be tedious and feels like boilerplate, and if there's an unofficial Ember motto it may be "get rid of the boilerplate!"

### Flip It Around!

Tracked properties are Ember's next iteration on this system. They address all of the above pain points, and then some. The way they work is by explicitly annotating all _trackable_ properties on a class, instead of annotating the dependencies for every single getter, effectively reversing where the annotation occurs. Trackable properties are any properties which:

1. Change over time and
2. May cause the DOM to update in response to those changes

For example, here's the `ClockComponent` class from earlier refactored with tracked properties:

```js
// components/clock.js
export default class ClockComponent extends Component {
  @tracked date;

  constructor() {
    setInterval(() => (this.date = new Date()), 1000);
  },

  get formattedTime() {
    return moment(this.date).format('h:mm:ss a');
  }

  get message() {
    return `It is currently ${this.formattedTime}!`;
  }
}
```

Notice that getters no longer need to be annotated at all, and we only have a single decorated property. This works because when Ember is rendering a value, like `{{this.message}}`, it watches for accesses to _any_ tracked properties. Later on, if one of those properties changes, it knows it needs to rerender that value and any components or helpers that consume it. No more dependency lists required! Now _that_ is automatic.

But the benefits go _beyond_ just removing all of that boilerplate.

#### Explicit Field Declarations

We now have an _explicit_ list of all trackable values on a class. This means that we can very quickly look at a class and see where the "important" values are, in a single declarative list:

```js
// components/person.js
export default class PersonComponent extends Component {
  @tracked firstName;
  @tracked lastName;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @action
  updateName(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

Before, it was not uncommon to have these values be _implicit_. Somewhere in the code flow, something would use `set`, and the value would suddenly exist:

```js
// components/person.js
export default Component.extend({
  // This computed property _implies_ that `firstName` and `lastName`
  // exist, but we don't know that without reading it.
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),

  actions: {
    // Likewise, this action sets `firstName` and `lastName`
    // which implies that they are used and watched, but we wouldn't
    // have known that unless we actually read the function body.
    updateName(firstName, lastName) {
      this.set('firstName', firstName);
      this.set('lastName', lastName);
    },
  },
});
```

It was often convention to assign default values to these fields so that they could be seen, but that convention was not enforced in any meaningful way and really just became another small amount of boilerplate.

#### Enforced Public API

We also have _control_ over what values are trackable. With `set`, it's possible to "reach" into objects and observe any values you want. This makes the previous problem that much worse!

```js
// utils/person.js

// This might be confusing at first - it looks like an empty class.
// What are its values? What is it used for? Maybe it has a `name`?
// `address`? Who knows!
export default EmberObject.extend({});
```

```js
// components/person.js
export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('person', Person.create());
  },

  fullName: computed('person.firstName', 'person.lastName', function() {
    return `${this.person.firstName} ${this.person.lastName}`;
  }),

  actions: {
    // Here we can see that set the `firstName` and `lastName`
    // properties, so now we have _some_ sense of what the "shape"
    // of a Person is.
    updateName(firstName, lastName) {
      this.set('person.firstName', firstName);
      this.set('person.lastName', lastName);
    },
  },
});
```

Because of this effect, _any_ external class can essentially expand a class's public API at any point in time simply because it's convenient. In large codebases, this can lead to the true definition of a class being spread out across many different files, actions, helper functions, and computed properties. In other words, it leads to spaghetti.

By comparison, for this to work at _all_ with tracked properties, `firstName` and `lastName` _must_ be annotated:

```js
// utils/person.js

// `firstName` and `lastName` are the only watchable values on
// `Person`. We can't prevent people from adding other properties,
// but they will have no effect on rerenders.
export default class Person {
  @tracked firstName;
  @tracked lastName;
}
```

```js
// components/person.js
export default class PersonComponent extends Component {
  person = new Person();

  get fullName() {
    return `${this.person.firstName} ${this.person.lastName}`;
  }

  // This works as expected, because the properties are tracked.
  @action
  updateName(firstName, lastName) {
    this.person.firstName = firstName;
    this.person.lastName = lastName;
  }

  // This adds the property, but does not trigger a rerender. If
  // we want it to trigger a rerender, we need to go and add
  // `middleName` as a tracked property to `Person`.
  @action
  updateMiddleName(middleName) {
    this.person.middleName = middleName;
  }
}
```

This means that we have an _enforced_ "public API" in effect. Users of the class cannot add values that were not intended to exist and then watch them, and this disincentives using the class for anything other than its intended purpose.

### Backwards Compatible

You may be looking at these examples and thinking, "This is great in _theory_, but I have a lot of computed properties in my app! How am I going to update them all?" Unfortunately, we can't just codemod you forward because of the implicit layer of definitions we talked about earlier. It's hard to know _where_ to add tracked properties, on which classes and objects they should be defined.

Luckily, tracked properties are _fully_ backwards compatible with computed properties and the `get`/`set` system, and they also work in classic class syntax. You can access a tracked property from a computed, and it will be picked up without having to add the dependency:

```js
// components/person.js
export default Component.extend({
  firstName: tracked(),
  lastName: null,

  // This computed property _implies_ that `firstName` and `lastName`
  // exist, but we don't know that without reading it.
  fullName: computed('lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),

  actions: {
    // Likewise, this action sets `firstName` and `lastName`
    // which implies that they are used and watched, but we wouldn't
    // have known that unless we actually read the function body.
    updateName(firstName, lastName) {
      this.firstName = firstName;
      this.set('lastName', lastName);
    },
  },
});
```

This means you can convert your applications one field at a time, in parts. It may take a while, but `computed()` isn't going anywhere anytime soon, giving you plenty of time and space to adopt tracked properties at your own pace.

### Putting It All Together

Alright, let's once again take the new feature and put it to use! This time I'm going to take an example from the excellent [ember-cli-flash](https://github.com/poteto/ember-cli-flash) addon which is used for showing flash messages. This example is a bit more involved than previous ones, since I really wanted to demonstrate just how much tracked properties can help to clean up not only component code, but utility code as well.

> Note: I've also edited down some of the classes to show only the parts relevant to tracked properties, and this is _not_ a full conversion as there may be more tracked values used in other contexts which I did not add.

```js
// ember-cli-flash/addon/flash/object.js
import Evented from '@ember/object/evented';
import EmberObject, { set, get } from '@ember/object';

export default EmberObject.extend(Evented, {
  exitTimer: null,
  exiting: false,
  isExitable: true,
  initializedTime: null,

  // ... class methods
});
```

```js
// ember-cli-flash/addon/components/flash-message.js
import { htmlSafe, classify } from '@ember/string';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { next, cancel } from '@ember/runloop';
import { computed, set, get, getWithDefault } from '@ember/object';
import { and, bool, readOnly, not } from '@ember/object/computed';
import layout from '../templates/components/flash-message';

export default Component.extend({
  layout,
  active: false,
  messageStyle: 'bootstrap',
  classNames: ['flash-message'],
  classNameBindings: ['alertType', 'active', 'exiting'],
  attributeBindings: ['aria-label', 'aria-describedby', 'role'],

  showProgress: readOnly('flash.showProgress'),
  notExiting: not('exiting'),
  showProgressBar: and('showProgress', 'notExiting'),
  exiting: readOnly('flash.exiting'),
  hasBlock: bool('template').readOnly(),

  alertType: computed('flash.type', {
    get() {
      const flashType = getWithDefault(this, 'flash.type', '');
      const messageStyle = getWithDefault(this, 'messageStyle', '');
      let prefix = 'alert alert-';

      if (messageStyle === 'foundation') {
        prefix = 'alert-box ';
      }

      return `${prefix}${flashType}`;
    },
  }),

  flashType: computed('flash.type', {
    get() {
      const flashType = getWithDefault(this, 'flash.type', '');

      return classify(flashType);
    },
  }),

  didInsertElement() {
    this._super(...arguments);
    const pendingSet = next(this, () => {
      set(this, 'active', true);
    });
    set(this, 'pendingSet', pendingSet);
  },

  progressDuration: computed('flash.showProgress', {
    get() {
      if (!get(this, 'flash.showProgress')) {
        return false;
      }

      const duration = getWithDefault(this, 'flash.timeout', 0);

      return htmlSafe(`transition-duration: ${duration}ms`);
    },
  }),

  click() {
    const destroyOnClick = getWithDefault(this, 'flash.destroyOnClick', true);

    if (destroyOnClick) {
      this._destroyFlashMessage();
    }
  },

  mouseEnter() {
    const flash = get(this, 'flash');
    if (isPresent(flash)) {
      flash.preventExit();
    }
  },

  mouseLeave() {
    const flash = get(this, 'flash');
    if (isPresent(flash) && !get(flash, 'exiting')) {
      flash.allowExit();
    }
  },

  willDestroy() {
    this._super(...arguments);
    this._destroyFlashMessage();
    cancel(get(this, 'pendingSet'));
  },

  // private
  _destroyFlashMessage() {
    const flash = getWithDefault(this, 'flash', false);

    if (flash) {
      flash.destroyMessage();
    }
  },

  actions: {
    close() {
      this._destroyFlashMessage();
    },
  },
});
```

You can see from this example the implicit state problem I mentioned earlier. We can see from the `FlashMessage` component that it definitely _expects_ the flash object to have quite a few values on it, but we aren't seeing them here. Let's update it to tracked properties and see how that changes things:

```js
// ember-cli-flash/addon/flash/object.js
import Evented from '@ember/object/evented';
import EmberObject, { set, get } from '@ember/object';

export default class FlashObject extends EmberObject.extend(Evented) {
  @tracked type = '';
  @tracked timeout = 0;
  @tracked showProgress = false;
  @tracked destroyOnClick = true;
  @tracked exiting = false;

  exitTimer = null;
  isExitable = true;
  initializedTime = null;

  // ... class methads
}
```

```js
// ember-cli-flash/addon/components/flash-message.js
import { htmlSafe, classify } from '@ember/string';
import Component from '@ember/component';
import { next, cancel } from '@ember/runloop';
import { and, bool, readOnly, not } from '@ember/object/computed';
import { layout, classNames, className } from '@ember-decorators/component';
import template from '../templates/components/flash-message';

@layout(template)
@classNames('flash-message')
export default class FlashMessage extends Component {
  // Arguments
  messageStyle = 'bootstrap';

  // Internal state
  @className
  @tracked
  active = false;

  @className
  @readOnly('flash.exiting')
  exiting;

  @not('exiting') notExiting;
  @and('flash.showProgress', 'notExiting') showProgressBar;
  @bool('template') hasBlock;

  #pendingSet;

  @className
  get alertType() {
    let prefix = this.messageStyle === 'foundation' ?
      'alert-box' :
      'alert alert-';

    return `${prefix}${this.flash.type}`;
  }

  get flashType() {
    return classify(this.flash.type);
  }

  get progressDuration() {
    if (!this.flash.showProgress) {
      return false;
    }

    return htmlSafe(`transition-duration: ${this.flash.timeout}ms`);
  }

  didInsertElement() {
    super.didInsertArguments(...arguments);
    this.#pendingSet = next(this, () => this.active = true);
  },

  click() {
    if (this.flash.destroyOnClick) {
      this.#destroyFlashMessage();
    }
  }

  mouseEnter() {
    if (this.flash) {
      this.flash.preventExit();
    }
  }

  mouseLeave() {
    if (this.flash && !this.flashexiting) {
      this.flash.allowExit();
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.#destroyFlashMessage();
    cancel(this.#pendingSet);
  }

  #destroyFlashMessage() {
    if (this.flash) {
      flash.destroyMessage();
    }
  }

  @action
  close() {
    this.#destroyFlashMessage();
  }
}
```

<!-- alex ignore dive -->
This reads much more clearly than before! We can now read the `FlashObject` class definition and know what properties external consumers, such as the `FlashMessage` component, will be watching and using. When we dive into the `FlashMessage` component, it's much less verbose and easier to read. Properties and getters are much more straightforward, and we can easily distinguish between properties that are used for rendering (`action`, which is tracked) and properties that are not (`#pendingSet` which is a private property used for tracking a runloop task). Additionally, we can still use computed property macros for convenience, and private fields and methods are a nice bonus here in native class syntax.

## Conclusion

That's all I have for today! Tracked properties are currently behind a feature flag on canary, and still being polished up. They should be available soon as we get the Octane preview up and running, I'll be sure to tweet about it when they are! In the meantime, thanks for reading, and stay tuned for next week's post on Element Modifiers!
