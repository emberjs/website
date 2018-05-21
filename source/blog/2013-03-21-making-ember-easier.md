---
title: Making Ember.js Easier
author: Tom Dale & Yehuda Katz
tags: Recent Posts, Community, 2013, Version 1.x
responsive: true
---

We frequently receive feedback from new developers about how frustrating
it can be to get started with Ember. Yesterday, one of the [most active
comment threads on Hacker
News](https://news.ycombinator.com/item?id=5406857) was largely about just that.

We hear you loud and clear. Ember.js is not easy to get started with, and we take that very seriously. We are all working nights and weekends to make the framework as approachable as humanly possible.

One of the Hacker News commenters, kanja, nailed it. In response to another commenter who felt like the negative reaction was strong:

> It's incredibly out of proportion - but people really want to use ember (because it promises all these great things!) and they're frustrated by the docs (because they're not really good for first time users) so this is kind of a flash point.

Absolutely right. Ember promises—and, we think, delivers—tremendous value. But ramping up to that point is not easy, and we received this feedback repeatedly and take it very seriously.

There was another common sentiment that we'd like to address:

> I have seen this sort of attitude from quite a few domain experts - if you didn't get it, you aren't smart enough and "don't deserve to be in our group."

That does not reflect our feelings at all. If people find it difficult to use the tools we've created, that's a failure on our part. Period.

To keep things in perspective, we froze the Ember 1.0 API a mere month ago, when we released the first 1.0 RC. Before that, we were focused on iterating the API based on feedback we received from our early adopters. We believe that our willingness to change the API allowed us to build a better product than our competitors that locked in their first attempts. But that also means that much of the effort that people put into writing tutorials and documentation, including our own, quickly became obsolete.

Thankfully, that period is over. As we said in our [EmberCamp keynote](https://www.youtube.com/watch?feature=player_detailpage&v=RYAD2arvysU#t=229s), our focus now is on stability and building the ecosystem.

Since EmberCamp, momentum has been incredible. We've seen the amount of material helping new users grow quickly.

To call out a few of the big ones:

* [Fire Up Ember.js PeepCode](https://peepcode.com/products/emberjs)
* [Ember RailsCast](http://railscasts.com/episodes/408-ember-part-1) (and [Part 2](http://railscasts.com/episodes/410-ember-part-2))
* [RC1 Introduction Screencast](http://www.toranbillups.com/blog/archive/2013/03/02/emberjs-rc1-introduction-screencast/) by Toran Billups
* [NetTuts' Getting into Ember.js series](http://net.tutsplus.com/tutorials/javascript-ajax/getting-into-ember-js/) by Rey Bango
* The guides on the Ember.js website have been dramatically expanded

Additionally, great open source examples built on top of RC1 are out in the wild, like [TodoMVC](https://github.com/addyosmani/todomvc/tree/gh-pages/examples/emberjs) and the "Big Kahuna," [Discourse](https://github.com/discourse/discourse).

We've also been working on tooling to make the process of developing Ember.js apps easier. For example, [Ryan Florence's ember-tools](https://github.com/rpflorence/ember-tools) significantly improves bootstrapping a new project, and the [Ember Inspector plugin for Chrome](https://github.com/tildeio/ember-extension) (which we [demoed at EmberCamp](https://www.youtube.com/watch?feature=player_detailpage&v=RYAD2arvysU#t=1924s)) should make debugging and understanding apps much easier.

But we know that these things aren't enough. Here are the specific steps we will be taking to improve the experience for developers getting started:

* We're actively working on a Getting Started Guide with live examples that walks the user through building a new application from scratch
* We're writing the script for a short screencast introducing the framework and illustrating how it works that will be prominently displayed on the homepage.
* We're continuing to improve our guides to talk through areas, like the naming conventions we use in Ember, that might be confusing for new developers.
* The Starter Kit will return, giving developers a one-click way to try out Ember. (We removed it temporarily to bring it up to date with the most recent idioms, but it will be coming back very soon. This was a hard decision, but leaving around an out of date starter kit seemed worse than removing it.)

We also understand that there are some features in Ember.js that consistently trip up developers new to the framework. The Handlebars `{{bindAttr}}` helper is a good example. We focus relentlessly on identifying and fixing these issues; you can see the start of an effort to improve this in the work that Yehuda has been doing on [htmlbars](http://github.com/tildeio/htmlbars), which will hopefully land in Ember 1.1.

We'd like to give a big thank you to all of the contributors who have helped make Ember so successful. We believe that a truly community-backed open source project is important. Although it takes time to build that community, versus being able to hire a full-time staff, we believe that in the long run it leads to a stronger, more robust project that can't be "Google Reader'd." Immunity to any one company going under or pulling support is baked right in.

Lastly, we'd love your help. If you think there's something we're missing, or if you'd like to volunteer to help, please let us know in [this Discourse thread](http://discuss.emberjs.com/t/ideas-for-improving-the-getting-started-experience/666).

All the best,  
Yehuda Katz & Tom Dale
