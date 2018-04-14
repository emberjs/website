---
title: Ember.js 1.9.1 Released
author: Tom Dale
tags: Releases, 2014
responsive: true
---

Today, the Ember team is pleased to announce the release of Ember.js
1.9.1. Ember 1.9.1 fixes one regression and introduces more conservative
escaping of attributes to help developers guard against inadvertent cross-site
scripting (XSS) vulnerabilities.

### {{view}} Helper & Instances

The 1.9.0 release introduced a regression where the Handlebars
`{{view}}` helper would only work with `Ember.View` subclasses, not
instances. In 1.9.1, passing a view instance to the helper has been
fully restored.

We intended to deprecate this functionality, not remove it entirely.
If your app was relying on this behavior, first, please accept our
apologies for the accidental regression. Second, please consider
refactoring your code to use components instead of views, as support for
this API will be removed in Ember 2.0.

### XSS Improvements for Bound Attributes

XSS vulnerabilities happen when you unintentionally put unescaped
user-supplied content into the DOM, creating a vector for attackers
to trick the browser into evaluating JavaScript that has the same access
to data as your legitimate JavaScript.

Since its inception, Ember.js has automatically guarded against these
attacks by HTML-escaping any bound data that goes into the DOM. For
example, given this model data:

```js
{
  "firstName": "<script type=javascript>alert('pwned!');</script>"
}
```

The following template would not be vulnerable to XSS:

```handlebars
Hello, {{firstName}}!
```

That's because Ember automatically replaces the &lt; and &gt; characters
with `&lt;` and `&gt;`.

However, there is still another potential exploit vector: bound attributes.

Let's say you display a profile for your users and allow them to supply
an arbitrary homepage that your app links to:

```app/templates/user.hbs
First Name: {{firstName}}
Homepage: <a {{bind-attr href=homepageUrl}}>{{homepageUrl}}</a>
```

While this template may look harmless at first glance, imagine a
malicious user provides the following data:

```js
{
  "firstName": "Guardians of Peace",
  "homepageUrl": "javascript:alert('Kim Jong Un is not to be
disrespected!')"
}
```

If the attacker can induce another user to click the profile link, you
will have inadvertently allowed their JavaScript to be evaluated in the
same origin as your trusted code.

As of Ember 1.9.1, we will automatically escape any bound `href`, `src`
or `background` attributes that contain a `javascript:` or `vbscript:`
protocol handler by prefixing their value with `unsafe:`.

We are also releasing a new beta version of Ember 1.10 that contains
even more targeted fixes. Thanks to the additional power the HTMLbars
parser gives us, these attributes will only be escaped on elements where
they trigger a top-level navigation and thus a potential exploit: `a`,
`body`, `link`, `iframe`, and `img`.

We'd like to thank Mano and Manoharan from Zoho for responsibly disclosing
this potential XSS vector and working with us to find a solution that makes
it as easy as possible for developers to write secure apps.

## Changelogs

+ [Ember.js 1.9.1 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.9.1/CHANGELOG.md)
+ [Ember.js 1.10.0-beta.2 CHANGELOG](https://github.com/emberjs/ember.js/blob/v1.10.0-beta.2/CHANGELOG.md)
