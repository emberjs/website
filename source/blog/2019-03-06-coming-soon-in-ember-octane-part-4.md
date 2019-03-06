---
title: 'Coming Soon in Ember Octane - Part 4: Modifiers'
author: Chris Garrett
tags: Recent Posts, 2019, Ember Octane, Modifiers
alias: 'blog/2019/03/06-coming-soon-in-ember-octane-part-4-modifiers.html'
responsive: true
---

(This post was originally published on [www.pzuraq.com](https://www.pzuraq.com/coming-soon-in-ember-octane-part-4-modifiers/))

Hello again, and welcome back! This is the fourth entry in the multipart _Coming Soon in Ember Octane_ series, where we're previewing some of the various features that are landing in Ember's upcoming Octane edition, including:

* [Native Classes (+Decorators)](https://www.pzuraq.com/coming-soon-in-ember-octane-part-1-native-classes/)
* [Angle Brackets & Named Arguments](https://www.pzuraq.com/coming-soon-in-ember-octane-part-2-angle-brackets-and-named-arguments/)
* [Tracked Properties](https://www.pzuraq.com/coming-soon-in-ember-octane-part-3-tracked-properties/)
* Modifiers _← this post_
* Glimmer Components

These aren't _all_ of the new features that will be part of Octane, just the ones that I'm most familiar with personally. This series is aimed at existing Ember users, but if you're new to Ember or tried Ember a while ago and want to see how things are changing, I'll be providing context on the existing features as we go along. These posts won't be doing deep dives on all the edge cases of the functionality, they are moreso meant as an overview of what's coming. If you're curious about what an _edition_ is exactly, you can check out a quick break down in [the first post in the series](https://www.pzuraq.com/coming-soon-in-ember-octane-part-1-native-classes/#whatareeditions).

Alright, now let's talk about modifiers, Ember's new tool for working with the DOM!

## What Are "Modifiers"
Modifiers are similar to Handlebars helpers, they are functions or classes that can be used in templates directly using `{{double-curlies}}`. The major difference with modifiers is that they are applied directly to _elements_:

```handlebars
<button {{on "click" this.handleClick}}>
  Hello, World!
</button>
```

Modifiers are used for manipulating or reading from the DOM somehow. For instance, the example above uses the [`on` modifier](https://github.com/buschtoens/ember-on-modifier#readme) to add a click handler to the `button` element it is modifying. In general modifiers act on the element they are modifying, but they could also act on the the subtree of that element.

Modifiers are not an entirely new concept in Ember. In fact, they've existed in some form or another since some of the earliest days of Ember, in the form of the `{{action}}` modifier, and the `{{bind-attr}}` modifier from the v1 era of the framework. However, it's never been possible before for users to make their _own_ modifiers. Now they're being given first class support to allow users more fidelity in how they interact with the DOM, and to allow DOM code to be more easily shared across components and other templates.

### The New `didInsertElement`
You may be thinking, don't lifecycle hooks solve the same problem? Can't I put logic like adding event listeners and measuring elements in `didInsertElement` or `didRender` on my component class and call it a day? Why do we need a new concept for this kind of logic?

There are a few reasons modifiers end up being a better solution for DOM manipulation in general:

1. **They allow targeting specific elements more easily.** Lifecycle hooks only allow you to work with the component's _root_ element, if it has one. If you want to target any other element in the component, it can be a lot of work. For instance, to do the same thing as our original example with the `on` modifier, we would have to use `querySelector` in our `didInsertElement` hook to find the `button` element:

```js
didInsertElement() {
  this.element
    .querySelector('button')
    .addEventListener('click', this.handleClick);
}
```

This type of code can get even trickier in larger components, where you may have multiple elements that need event listeners, or have elements that only exist conditionally:

```handlebars
<button>Hello, World!</button>

{{#if this.showTutorial}}
  <span class="tooltip">Click the button!</span>
{{/if}}
```

```js
didInsertElement() {
  this.element
    .querySelector('button')
    .addEventListener('click', this.handleClick);

  let tooltip = this.element.querySelector('.tooltip');

  if (tooltip) {
    tooltip.addEventListener('mouseover', this.toggleTooltip);
  }
}
```

We _could_ create new components instead, and this may make sense at times - for instance, the tooltip logic is something we'd likely want to reuse across the app. But in many cases, like our "Hello, world!" button, this would be a pretty heavy-handed solution, with a lot of boilerplate being generated for a very small amount of functionality. Compare this to modifiers, which can be applied directly to the elements that they operate on:

```handlebars
<button {{on "click" this.handleClick}}>
  Hello, World!
</button>

{{#if this.showTutorial}}
  <span class="tooltip" {{on "mouseover" this.toggleTooltip}}>
    Click the button!
  </span>
{{/if}}
```

This cleans things up considerably. We don't have to duplicate logic in the component and the template, only one `if` statement is needed, and we can easily see what event listeners are applied to which elements. No need to make more components!

2. **They allow related code to live in the same place.** The above example is even more complicated in actuality, because it's missing its _teardown_ logic. If we aren't careful, we could end up leaking event listeners, or in an inconsistent state when the `if` statement toggles. Here's what the _full_ logic for our component should look like:

```js
class HelloWorld extends Component {
  addTooltipListener() {
    // save the element so we can remove the listener later
    this._tooltip = this.element.querySelector('.tooltip');

    if (this._tooltip) {
      this._tooltip.addEventListener(
        'mouseover',
        this.toggleTooltip
      );
    }
  }

  removeTooltipListener() {
    if (this._tooltip) {
      this._tooltip.removeEventListener(
        'mouseover',
        this.toggleTooltip
      );
    }
  }

  didInsertElement() {
    this.element
      .querySelector('button')
      .addEventListener('click', this.handleClick);

    this.addTooltipListener();
  }

  didUpdate() {
    this.removeTooltipListener();
    this.addTooltipListener();
  }

  willDestroyElement() {
    this.element
      .querySelector('button')
      .removeEventListener('click', this.handleClick);

    this.removeTooltipListener();
  }

  // ...
}
```

As you can see, this is just a _bit_ convoluted. We have a lot of conditional code all over the place, _and_ we have mixing of concerns between the logic for the tooltip and the logic for the button. By contrast, modifiers have their own setup and teardown logic, completely self-contained. They also run on the insertion and destruction of the _element_ they are modifying, not the component, so we don't need to check for the element's existence to see if we should be doing anything. The modifier will run when `showTutorial` switches to true, and it'll be torn down when `showTutorial` switches to false.

3. **They make sharing code between components much easier.** Often times the same types of DOM manipulations need to be used in many components throughout an app, and _usually_ it isn't easy or natural to share them via class inheritance. On the other hand, utility functions generally feel very bloated and boilerplate heavy to use for these purposes, since they _must_ use state from the component and be integrated into its hooks. Addons like [`ember-lifeline`](https://github.com/ember-lifeline/ember-lifeline) do a good job at reducing the boilerplate, but it's still not ideal.

This is one of the remaining use cases for Ember's mixin functionality, and arguably modifiers solve it even more cleanly since the modifications are applied _where they happen_.

4. **They work with template-only components.** Currently you must always create a component class to do even simple DOM manipulation. With modifiers that's no longer necessary. In the future, this will mean more performance wins for simpler components, since they won't need a class instance.

5. **They work with tag-less components and Glimmer components.** Currently, tag-less components (components with `tagName: ''`) have lifecycle hooks, but they don't have the `this.element` property since they don't have a wrapping element. This means that manipulating the DOM in them is pretty hard, you generally have to add a unique `id` to an element and select by that. Glimmer components also don't have `this.element` since they don't have a wrapping element either (more on that next time), and on top of that, they also don't have _any_ lifecycle hooks beyond the `constructor` and `willDestroy`.

Modifiers disconnect the component class definition from DOM manipulation, which means that they work even without these APIs. In fact, they will work with any component API. This allows more thorough separation concerns, and makes transitioning forward from classic components to Glimmer components even easier.

These benefits are the reasoning behind introducing a new concept. We also aren't the only framework to have noticed the benefits of this pattern, most recently React's new Hooks API is accomplishing a lot of the same goals in a similar manner, especially the `useLayoutEffect` hook which is specifically for running [side-effecting](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) layout code. Ember modifiers fill a similar gap.

### So What Do They Look Like?
The usage side of modifiers has been defined since Ember v1. A modifier is the same syntax as a helper, but applied directly to an element instead of to an attribute:

```handlebars
<div
  {{my-modifier 'hello' 'world!'}}
  role={{my-helper 'some' 'value'}}
></div>
```

Notably, there is an `{{action}}` helper and an `{{action}}` modifier, which is why it appears like the action helper can be used in both places:

```handlebars
<!-- this is the action modifier -->
<div {{action this.handleClick}}></div>

<!-- this is the action helper -->
<div onclick={{action this.handleClick}}></div>
```

Modifiers run whenever the element is _inserted_ or _destroyed_, and whenever any of arguments to them change.

User defined modifiers haven't been finalized just yet. Instead, Ember has created a low level API, the _Modifier Manager_. This allows us to experiment with different APIs for modifiers in the addon ecosystem before committing to a specific API. There are two major design proposals (and many variations on them) for modifiers that have been floated around at the moment.

**NOTE: These are NOT actual Ember APIs. They can currently be implemented in addons (and definitely should be!), but they may change in the future before Ember picks recommended/standard APIs!**

1. **Class Based Modifiers**

These modifiers would be more fully featured, with an instance and state, and the ability to control each lifecycle event:

```js
export default class DarkMode extends Modifier {
  @service userSettings;

  didInsert(element, [darkModeClass]) {
    if (this.userSettings.darkModeEnabled) {
      this._previousDarkModeClass = darkModeClass;
      element.classList.add(darkModeClass);
    }
  }

  willDestroy(element) {
    element.classList.remove(this._previousDarkModeClass);
  }

  didUpdate() {
    this.willDestroy(...arguments);
    this.didInsert(...arguments);
  }
}
```

```handlebars
<!-- usage -->
<div {{dark-mode 'ui-dark'}}></div>
```

This API gives users the ability to have fine grained control over how they update the element each time the arguments change. In some cases, this level of control will be very useful for fine tuning performance, but in many cases (including this one) it may be more complicated than is necessary.

2. **Functional Modifiers**

These modifiers would use a functional API, similar to `useLayoutEffect` in React, where they would consist of a single function that returns a cleanup function (if needed):

```js
function darkMode(userSettings, element, [darkModeClass]) {
  if (userSettings.darkModeEnabled) {
    element.classList.add(darkModeClass);

    return () => {
      element.classList.remove(darkModeClass);
    };
  }
}

export default modifier(
  { services: ['userSettings'] },
  darkMode
);
```

```handlebars
<!-- usage -->
<div {{dark-mode 'ui-dark'}}></div>
```

The cleanup function would run _every_ time the modifier updates, so in some cases this won't be performant enough. In many cases though, like this one, the increased ergonomics of it will be worth the extra cost. This version would also clean up very nicely in the future if decorators are made available to functions and function parameters:

```js
@modifier
function darkMode(
  @service userSettings,
  element,
  [darkModeClass]
) {
  if (userSettings.darkModeEnabled) {
    element.classList.add(darkModeClass);

    return () => {
      element.classList.remove(darkModeClass);
    }
  }
}
```

In the end, it's likely that a couple different modifier APIs will be recommended for most use-cases. Custom modifier APIs that are created will also continue to be supported indefinitely, part of the power and flexibility of the manager pattern that Ember is now using for userland APIs.

### So, What Can I Use Now?
There are several addons that have created modifiers that you can use in your apps today, including:

* [`@ember/render-modifiers`](https://github.com/emberjs/ember-render-modifiers), an official Ember addon that includes:

1. `{{did-insert}}`
2. `{{did-update}}`
3. `{{will-destroy}}`

These modifiers are meant to be simple primitives that allow you to run code on each of the major lifecycle events that modifiers (and modifier managers) can have. They're also meant to help users refactor from classic components forward to Glimmer components, since Glimmer components don't have their own lifecycle hooks, though there are still some differences - notably, `{{did-update}}` does _not_ update every time the component rerenders, only when its arguments change.

* [`ember-on-modifier`](https://github.com/buschtoens/ember-on-modifier), created by Jan Buschtöns, allows you to add event listeners of any kind directly to elements. This means you can cleanup any `ember-lifeline` code you have lying around and switch on over!
* [`ember-ref-modifier`](https://github.com/lifeart/ember-ref-modifier), created by Alex Kanunnikov, mimics React's "ref" system for storing references to elements. This allows you to use them on your component directly if you need to, for more complicated component use cases.

If you're willing to work at a lower level and experiment with new APIs, you can also check out the [modifier-manager-polyfill](https://github.com/rwjblue/ember-modifier-manager-polyfill), but be warned that it is meant for _low level_ infrastructure, and shouldn't generally be used to write modifiers directly. The Modifier Manager API is still very new, and it'll take some time to solidify the userland APIs, but they'll be available soon!

### Putting It All Together
As always, we'll end with an example of a component before and after, to see how this new feature impacts real applications. This time we'll use an example from `ember-paper`, the Material UI addon for Ember, specifically [the paper-toast-inner component](https://github.com/miguelcobain/ember-paper/blob/14e3f0ffcaff3c4cfb9b93ff44f989da2a9a64dd/addon/components/paper-toast-inner.js), which uses the [Hammer.js](http://hammerjs.github.io) library for recognizing touch events.

We'll also be using _theoretical_ user APIs this time around, because the details of writing a component manager are definitely _not_ ergonomic.

**NOTE: These examples contain _PROPOSED_ APIs that have not been finalized, and could change in the future.**

Starting out, this is what our component looks like:

```js
import Component from '@ember/component';

import { run } from '@ember/runloop';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/paper-toast-inner';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import { invokeAction } from 'ember-invoke-action';

/**
 * @class PaperToastInner
 * @extends Ember.Component
 */
export default Component.extend(TransitionMixin, {
  layout,
  tagName: 'md-toast',

  // ...

  _setupHammer() {
    // Enable dragging the slider
    let containerManager = new Hammer.Manager(this.element, {
      dragLockToAxis: true,
      dragBlockHorizontal: true,
    });
    let swipe = new Hammer.Swipe({
      direction: Hammer.DIRECTION_ALL,
      threshold: 10,
    });
    let pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 10,
    });
    containerManager.add(swipe);
    containerManager.add(pan);
    containerManager
      .on('panstart', run.bind(this, this.dragStart))
      .on('panmove', run.bind(this, this.drag))
      .on('panend', run.bind(this, this.dragEnd))
      .on('swiperight swipeleft', run.bind(this, this.dragEnd));
    this._hammer = containerManager;
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('swipeToClose')) {
      this._setupHammer();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.get('swipeToClose') && !this._hammer) {
      // if it is enabled and we didn't init hammer yet
      this._setupHammer();
    } else if (!this.get('swipeToClose') && this._hammer) {
      // if it is disabled and we did init hammer already
      this._teardownHammer();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this._hammer) {
      this._teardownHammer();
    }
  },

  _teardownHammer() {
    this._hammer.destroy();
    delete this._hammer;
  },

  dragStart(event) {
    // ...
  },

  drag(event) {
    // ...
  },

  dragEnd() {
    // ...
  },
});
```

You'll notice that I've omitted some of the implementation details of the component so we can focus on the parts we're going to replace with modifiers. The same functionality can be refactored with two different functional modifiers - `if` and `hammer`:

```js
// /addon/modifiers/if.js
function _if(
  element,
  [conditional, modifier, ...rest],
  named) {
  if (Boolean(conditional)) {
    return modifier(element, rest, named);
  }
}

export default modifier(_if);
```

```js
// /addon/modifiers/hammer.js
const HAMMER_TYPE = {
  swipe: Hammer.Swipe,
  pan: Hammer.Pan,
  // remaining types...
};

const HAMMER_DIRECTION = {
  all: Hammer.DIRECTION_ALL,
  // remaining directions...
};

function hammer(element, positional, {
  recognizers = [],
  options = {},
  ...events
}) {
  let hammer = new Hammer.Manager(element, options);

  for (let { type, direction, ...rest } of recognizers) {
    let Recognizer = HAMMER_TYPE[type];
    direction = HAMMER_DIRECTION[direction];

    hammer.add(new Recognizer({ direction, ...rest }));
  }

  for (let event in events) {
    hammer.on(event, events[event]);
  }

  return () => {
    hammer.destroy();
  };
}

export default modifier(hammer);
```

The `if` modifier conditionally applies another modifier based on the the value passed to it, and the `hammer` modifier is a general purpose wrapper around the Hammer library. We can now use these modifiers without writing _any_ component code:

```js
import Component from '@ember/component';
import template from '../templates/components/paper-toast-inner';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

import { layout, tagName } from '@ember-decorators/component';

/**
 * @class PaperToastInner
 * @extends Ember.Component
 */
@tagName('')
@layout(template)
export default class PaperToastInner extends Component.extend(TransitionMixin) {
  // ...

  dragStart(event) {
    // ...
  }

  drag(event) {
    // ...
  }

  dragEnd() {
    // ...
  }
}
```

```handlebars
<md-toast
  {{if @swipeToClose hammer

    panstart=this.dragStart
    panmove=this.drag
    panend=this.dragEnd
    swiperight=this.dragEnd
    swipeleft=this.dragEnd

    recognizers=(arr
      (hash type="swipe" direction="all" threshold=10)
      (hash type="pan" direction="all" threshold=10)
    )

    options=(hash
      dragLockToAxis=true
      dragBlockHorizontal=true
    )
  }}
>
  ...
</md-toast>
```

As you can see, this is a fair amount less code overall. It's also code that is _very_ easy to reuse now, since all of the implementation concerns for Hammer have been extracted. We could also pre-apply some of the modifiers options directly, for instance if the horizontal-swipe settings are used commonly in the app:

```js
// /addon/modifiers/horizontal-swipe.js
import hammer from './hammer';

export default modifier((element, positional, named) => {
  return hammer(element, positional, {
    ...named,

    recognizers: [
      { type: 'swipe', direction: 'all', threshold: 10 }
      { type: 'pan', direction: 'all', threshold: 10 }
    ],

    options: {
      dragLockToAxis: true,
      dragBlockHorizontal: true,
    },
  });
});
```

```handlebars
<md-toast
  {{if @swipeToClose horizontalSwipe

    panstart=this.dragStart
    panmove=this.drag
    panend=this.dragEnd
    swiperight=this.dragEnd
    swipeleft=this.dragEnd
  }}
>
  ...
</md-toast>
```

## Conclusion
Modifiers are one of the most exciting features landing in Octane to me. They definitely are a shift in the mental model for DOM and lifecycle hooks, but in my experience so far the component's I've refactored with them are much easier to reason about, and much more composable. Nailing down the userland APIs is going to be an exciting and interesting part of the design, and I'm hoping we get some interesting new ideas from the community (and if anyone wants to implement either of the managers I've described, please do! The class based one has even been mostly spec'd out in [Chad Hietala's RFC](https://github.com/emberjs/rfcs/pull/353). Ping me in Discord if you want help!) Overall, I'm looking forward to seeing how they turn out 😄

That's all I have for this week! Next Friday will be the last post in this series - Glimmer components, the next generation of components in Ember.