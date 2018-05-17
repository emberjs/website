---
title: The Ember.js Times - Issue No. 47
author: the crowd
tags: Recent Posts, Newsletter, Ember.js Times
alias : "blog/2018/05/18/the-emberjs-times-issue-47.html"
responsive: true
---

여보세요 Emberistas!

Again you can enjoy reading the Ember.js Times in both the [e-mail](https://the-emberjs-times.ongoodbits.com/2018/05/18/issue-47) and the [blog format](https://emberjs.com/blog/2018/05/18/the-emberjs-times-issue-47.html) to share it even better with your Ember friends.

....more intro

---

## [EMBER THINGS 🐹](#your-url-here)


---

## [Meta and Link all the Things](#https://github.com/emberjs/rfcs/pull/332)

This backwards compatible RFC allows `ember-data` users to associate optional `meta` and `links` on records alongside the top-level document `meta` (mandatory) and `links` (optional).  Sadly, `ember-data` currently stores this information only on relationships and not individual records.  The RFC design is pretty straightforward, designate that all `meta` and `links` :
	- will be honored in any resource encountered in a json-api compliant document
	- when defined on resource identifiers, for example links to resources within a relationship, will be ignored.
	- when defined on relationship objects will continue to function as they do today.
	- will be exposed as getters on instances of `DS.Model` and will default to null if nothing has been provided.
Similarly, `meta` and `links` will be exposed on instances of `DS.Snapshot`. Although `meta` and `links` are getters on `DS.Model`s, they will be exposed on `DS.Snapshot` as methods:
```js
class Snapshot {
    links() {}
	meta() {}
}
```
Interestingly, some apps have inadvertently achieved what this RFC purposes by moving `meta` and `links` into `attributes` during serialization and then exposing each of them via `DS.attr`., Therefore, this RFC gives `ember-data` an even more complete "out of the box experience" and will likely be a very welcomed addition to the library.  

Think differently? Tell @runspired what you think at https://github.com/emberjs/rfcs/pull/332

---

## [EMBER LEARN THINGS](#your-url-here)


---

## [SOMETHING ELSE HERE](#your-url-here)


---

## [SOMETHING ELSE HERE](#your-url-here)


---

## [SOMETHING ELSE HERE](#your-url-here)


---

## [Contributors' Corner](https://guides.emberjs.com/v3.1.0/contributing/repositories/)


---

## [Readers’ Questions: “....”](#praying-for-a-question)

<div class="blog-row">
  <img class="float-right small transparent padded" alt="Office Hours Tomster Mascot" title="Readers' Questions" src="/images/tomsters/officehours.png" />

  <p>...</p>

</div>

<div class="blog-row">
<a class="ember-button ember-button--centered" href="#">Read more</a>
</div>

**Submit your own** short and sweet **question** under [bit.ly/ask-ember-core](https://bit.ly/ask-ember-core). And don’t worry, there are no silly questions, we appreciate them all - promise! 🤞

---

That's another wrap!  ✨

Be kind,

the crowd
