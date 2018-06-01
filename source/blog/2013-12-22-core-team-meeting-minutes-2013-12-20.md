---
title: Core Team Meeting Minutes - 2013/12/20
author: Trek Glowacki
tags: Core Team Meeting Minutes, Roadmap, 2013
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
@krisselden, @machty, @stefanpenner, @tomdale, @trek, @wagenet, @wycats

### Topics
#### Build Tools
@wycats has been communicating with @jo_liss about using 
[broccoli](https://github.com/joliss/broccoli/) as the basis for a build tools package.

#### Ember Data
Ember data is now less of an ORM and more of a pluggable framework for assembling
your own data communication layer for Ember.js applications (with some nice defaults for
people's whose APIs follow common patterns). However, the interface – especially on the 
"normal form" of return values – isn't well documented so people aren't able to easily jump in, 
try it, and offer feedback.

Resolutions:
  
  * @trek will start working on docs.
  * @tomdale, @wycats will publish an ember data update blog post.

#### Query Params
Some debate about the correct location for defining and handling query parameters
(controller vs route).

Resolutions:
  
  * a smaller group will handle that discussion

#### Pods
During the face-to-face we floated the idea of organizing an application's files in a
["pod" structure](/blog/2013/12/17/whats-coming-in-ember-in-2014.html#toc_pod-directory-structure). 
Feedback has been positive, but we want to get more real world stories about the pros and cons of
this structure.

Resolutions:
    
  * @trek will reach out to people said they've built in this style.
