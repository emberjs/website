---
title: Core Team Meeting Minutes - 2014/08/01
author: Trek Glowacki
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

<!--   [@ebryn](https://twitter.com/ebryn),
  [@krisselden](https://twitter.com/krisselden),
  [@machty](https://twitter.com/machty),
  [@mixonic](https://twitter.com/mixonic)
  [@_mmun](https://twitter.com/_mmun),
  [@rwjblue](https://twitter.com/rwjblue),
  [@trek](https://twitter.com/trek),
  [@stefanpenner](https://twitter.com/stefanpenner),
  [@wagenet](https://twitter.com/wagenet),
  [@tomdale](https://twitter.com/tomdale),
  [@wifelette](https://twitter.com/wifelette),
  [@wycats](https://twitter.com/wycats) -->

[@krisselden](https://twitter.com/krisselden),
[@mixonic](https://twitter.com/mixonic)
[@_mmun](https://twitter.com/_mmun),
[@trek](https://twitter.com/trek),
[@stefanpenner](https://twitter.com/stefanpenner),
[@wagenet](https://twitter.com/wagenet),
[@tomdale](https://twitter.com/tomdale),
[@wycats](https://twitter.com/wycats)

### Revamp the Getting Started Guide
We're starting work to revamp
our [Getting Started Guide](http://emberjs.com/guides/getting-started/).
TodoMVC is just too small of an app to demonstrate enough topics. We were
holding off in hopes that there would be further progress on the [successor
to TodoMVC](https://github.com/tastejs/TasteApp) but this project has stalled.

We're investigating building a Github Issues viewer. Our goals are to better
highlight areas where Ember really shines compared to other frameworks: Deeply
nested view and data hierarchies, url-driven applications, intuitive
query paramater behaviors.

### Deprecating global view lookup from templates
As we move towards a world where ES6 syntax and modules
become viable we continue to deprecate some "old style"
globals lookup. The following uses will all trigger
deprecation warnings:

```javascript
{{view "App.SomeThing"}}
{{view Oh.ThisToo}}
{{#collection itemViewClass="Some.Wow"}}
{{#collection itemViewClass=Not.Yet}}
{{#each itemView="Ugh.Why"}}
{{#each itemView=Something.Something}}
{{view Ember.Select value=whut}}
```
