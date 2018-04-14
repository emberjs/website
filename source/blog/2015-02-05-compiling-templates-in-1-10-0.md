---
title: "Compiling templates with Ember 1.10"
author: "Robert Jackson"
tags: Recent Posts, 2015
responsive: true
---

As many of you know, Ember 1.10 will be the first version of Ember that uses [HTMLBars](https://github.com/tildeio/htmlbars) as its templating engine. With this change you may need to change the way you compile your templates.

The HTMLBars API is evolving and not 1.0.0 yet, so to ensure that templates are compiled compatibly with your Ember version we have updated the Ember build system to generate a `ember-template-compiler.js` file alongside every build of Ember. This template compiler can be used server-side for precompilation or in the browser to compile templates on the fly. If you do not need to compile templates at runtime (in the browser) the `ember.debug.js` or `ember.prod.js` file alone is sufficient. There is no need to include a runtime dependency. This is a departure from previous versions, where you would always include either `handlebars.js` or `handlebars.runtime.js`.

Most of the time you will use a third party library like [ember-cli](https://github.com/ember-cli/ember-cli), [ember-cli-htmlbars](https://github.com/rondale-sc/ember-cli-htmlbars), or [grunt-ember-templates](https://github.com/dgeb/grunt-ember-templates) to precompile templates, but this post will discuss how libraries like this should work internally.

### Server Side Compilation

If possible, it is definitely a best practice to compile your templates server side. This is much faster due to less total size (you don't need the compiler on the client) and less work that the app needs to do.

#### Ember 1.0 through 1.9

In prior versions, you would typically use the `ember-template-compiler` NPM package that corresponded to your Ember version to precompile your templates. That might look something like the following:

```javascript
var fs = require('fs');
var compiler = require('ember-template-compiler');
var input = fs.readFileSync('path/to/template.hbs', { encoding: 'utf8' });
var template = compiler.precompile(input, false);
var output = 'export default Ember.Handlebars.template(' + template + ');';

fs.writeFileSync('path/to/output.js', output, { encoding: 'utf8' });
```

You would also need to include `handlebars.runtime.js` in your final build

#### Ember 1.10+

With Ember 1.10, you will use the `ember-template-compiler.js` file that is paired with your Ember version. If you use our [Bower repo](https://github.com/components/ember), [RubyGem](https://rubygems.org/gems/ember-source), or simply download Ember from our [builds site](http://emberjs.com/builds/) there is a `ember-template-compiler.js` in the same path as `ember.debug.js` and `ember.prod.js`.

You can use this template compiler directly  and without additional requirements. For example:

```javascript
var fs = require('fs');
var compiler = require('./bower_components/ember/ember-template-compiler');
var input = fs.readFileSync('path/to/template.hbs', { encoding: 'utf8' });
var template = compiler.precompile(input, false);
var output = 'export default Ember.HTMLBars.template(' + template + ');';

fs.writeFileSync('path/to/output.js', output, { encoding: 'utf8' });
```

As you will notice, the new API for server-side compilation is nearly identical to that of prior versions. The main change is the usage of the local `bower_components/ember/ember-template-compiler.js` file as opposed to the NPM module.

### Client Side Compilation

Generally speaking, you should avoid compiling templates on the client, but there are times that you cannot avoid this. Live demo apps like [JSBin](http://emberjs.jsbin.com) are one example.

### Ember 1.0 through 1.9

In prior versions of Ember you would need to ensure that the full version of [Handlebars.js](handlebarsjs.com) was present to allow compiling of templates. Perhaps something like the following in your `index.html`:

```html
<script src="assets/handlebars.js"></script>
<script src="assets/ember.prod.js"></script>
```

### Ember 1.10+

With Ember 1.10, you will include the `ember-template-compiler.js` for your specific Ember version.  Something like the following:

```html
<script src="assets/ember-template-compiler.js"></script>
<script src="assets/ember.prod.js"></script>
```

If you include the `ember.debug.js` file instead of a production file the compiler is still required.

### Template Compilation Build Tools

There are any number of build tool libraries that are intended to make the server side compilation of templates easier. Here are just a few (please let us know of others):

* [ember-cli-htmlbars](https://github.com/rondale-sc/ember-cli-htmlbars) - Can be used either as a standalone Broccoli plugin, or as an ember-cli addon.
* [grunt-ember-templates](https://github.com/dgeb/grunt-ember-templates) - Works as a Grunt plugin. To precompile HTMLBars templates, you must supply specific parameters to your task definition as mentioned in [this PR](https://github.com/dgeb/grunt-ember-templates/pull/77).
* [mimosa-ember-htmbars](https://github.com/dbashford/mimosa-ember-htmlbars) - A plugin for the [mimosa](http://mimosa.io/) build tool.
* [ember-rails](https://github.com/emberjs/ember-rails) - The Rails Asset Pipeline plugin supports HTMLBars templates.
