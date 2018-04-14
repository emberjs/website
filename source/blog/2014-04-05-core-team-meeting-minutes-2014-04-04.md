---
title: Core Team Meeting Minutes - 2014/04/04
author: Robert Jackson
tags: Core Team Meeting Minutes, 2014
responsive: true
---

Although most of our collaboration takes place on Github, IRC
(`#emberjs` on freenode.net), and our [Discourse site](http://discuss.emberjs.com/)
the [Ember.js Core Team](/team) meets privately every
Friday at 2pm EST/11am PST through Google Hangout for a weekly
discussion of all things Ember.

If you have a topic you'd like to see covered, contact your favorite
core team member and let them know!

#### Attendees
[@ebryn](https://twitter.com/ebryn), [@krisselden](https://twitter.com/krisselden), [@machty](https://twitter.com/machty),
[@rwjblue](https://twitter.com/rwjblue), [@wagenet](https://twitter.com/wagenet), [@tomdale](https://twitter.com/tomdale)

### Topics

### PR's/Issues To Review

* [BUGFIX beta Allow setting of `undefined` value to a `content` property](https://github.com/emberjs/ember.js/pull/4645)

  Fixes setting of `undefined` value to a content property. 

  Still, checking `obj[keyName] === value` in these [lines] (https://github.com/selvagsz/ember.js/blob/master/packages_es6/ember-metal/lib/property_set.js#L52-54) is bypassed in two cases

  * If the setter value is `undefined`
  * If the setter property lies inside the proxied content

  Using `get(obj, keyName)` might resolve. But was quite nervous to do that as it may involve some additional function calls

  +1 by @stefanpenner, but he requests @krisselden to review.

  **Resolution**

  Seems good, but @krisselden will review in further detail. Will attempt to have this update in 1.6.0-beta.2.

* [BUGFIX beta Ensure context is unchanged when using keywords with itemController.](https://github.com/emberjs/ember.js/pull/4636)

  Prior to this change the following code would bind `this` in the template block to the itemController's content (even
  though the keyword form of `{{each}}` is used).
  
  This change sets the child view's `_context` property to the current context when using the keyword form of `{{each}}`,
  and a couple of confirming tests to demonstrate using `itemController` specified in either the `ArrayController` or the
  template directly.
  
  [Failing JSBin](http://emberjs.jsbin.com/zokali/1/edit) | [Passing JSBin](http://emberjs.jsbin.com/kecen/1/edit)

  Fixes #4634.

  **Resolution**

  The intent of the `each foo in bar` syntax is specifically to preserve the current context. However, using `each foo in bar` syntax along
  with an `itemController` has always changed the inner templates context. This change seems good, but all context related changes
  require a bit of additional review. @krisselden to review further and +1/-1.

* [BUGFIX beta {{view}} helper no longer uses Ember.View global, instead uses container view:default](https://github.com/emberjs/ember.js/pull/4598)

  During the ES6-ify process @rwjblue left a comment mentioning that the {{view}} helper needs to not look up
  Ember.View globally. This PR fixes this by looking up view:default from the container (which Ember.View is
  registered at, by default).

  **Resolution**

  Looking up `view:default` in the container is definitely more appropriate than hard-coding to `Ember.View`.
  
  Merged.

* [BUGFIX beta Add better debugging for DefaultResolver.](https://github.com/emberjs/ember.js/pull/4655)

  Adds nice log entries if your application was created with `LOG_RESOLVER` set.
  
  Example log entries:
  
  ```
  [ ] route:application ..........................................  App.ApplicationRoute
  [✓] route:index ................................................  App.IndexRoute
  [ ] controller:application .....................................  App.ApplicationController
  ```
  
  Fixes #4654.
  
  Example [JSBin](http://emberjs.jsbin.com/maxum/1) (look at console)

  **Resolution**

  This adds good insight into exactly what the resolver is doing and what you need to implement to add
  custom behavior. In the future, a better API needs to be created to enable these logging options (hanging
  a bunch of properties off of the application instance is sub-optimal).

  Merged (will be in 1.6.0-beta.2).
  
* [FEATURE ember-handlebars-radio-buttons Implement radio buttons](https://github.com/emberjs/ember.js/pull/4352)

  This updates [#1235](https://github.com/emberjs/ember.js/pull/1235) to extend component, adds handlebar helpers,
  updates tests and documentation. I think a lot of people would be pleased to see radio buttons in the core and I 
  see a lot of developers at my company have a hard time with radio buttons when they first get started with Ember,
  so I think this would be a great addition to the core.

  **Resolution**

  We would prefer for this to live as an addon for a while to allow the community to test (and influence) the API.

* [Transitioning to a globbing route does not work](https://github.com/emberjs/ember.js/issues/4613)

  I think it's a corner case, so I don't know if this should work, or if you would fix that.
  Anyway, in my application, I'm defining a notFound route, hit when the user plays with the url and gives something wrong.
  I also want redirect to this route when the user try to access an unexisting record (ie the backend answer a 404). So I basically tried to define an error handler in the ApplicationRoute, and transitionTo('notFound'). Unfortunately it does not work. Though if I remove the globbing path, then it works for the redirection, but obviously not when entering unknown url.
  
  I made a jsbin reproducing it: [here](http://emberjs.jsbin.com/ucanam/4401/edit)

  **Resolution**

   It is possible to transition to a globbing route, but like any target route with a dynamic segment, you need to
   provide a object / param, which in this case can just be a string of the path you want to use for that globbed segment:

   `this.transitionTo('yargle', "MY/COOL/URL");`

   [JSBin](http://emberjs.jsbin.com/ucanam/4522/edit)
