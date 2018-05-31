---
title: The Ember.js Times - Issue No. 49
author: Chris Manson, Amy Lam, Ryan Mark, Jessica Jordan
tags: Recent Posts, Newsletter, Ember.js Times, 2018
alias : "blog/2018/06/01/the-emberjs-times-issue-49.html"
responsive: true
---

<section class="breaking-news blog-row">
  <h3><a href="https://twitter.com/eaf4/status/1002258968910159873" target="npm">Breaking News: Just import from NPM! 🚨</a></h3>
  <p>Just before the editorial deadline we received reports from the Internet,
   that there is now a way to easily <code>npm install</code> a <strong>package</strong> and <strong>import</strong> it into your Ember app.
   The addon <a href="https://github.com/ef4/ember-auto-import" target="emberauto">ember-auto-import</a>
   will allow <strong>zero-configuration imports</strong> out of the box today
   and should be a suitable until the <a href="https://www.emberjs.com/blog/2018/05/25/the-emberjs-times-issue-48.html#toc_a-href-https-github-com-ember-cli-ember-cli-pull-7826-a-package-out-for-delivery-to-ember-cli-a" target="package">Packager feature</a> lands in Ember CLI.
   Reports also claim that addon author and Ember Core team member <a href="https://github.com/ef4" target="ed">@ef4</a> stated that <a href="https://twitter.com/eaf4/status/1002258968910159873" target="inspire">his work was heavily inspired</a> by a particular blog post series using the hashtag <a href="https://github.com/zinyando/emberjs2018-posts" target="ember18">EmberJS2018</a>.</p>
</section>

Привіт Emberistas!

This week we have a 🌟 Special Edition 🌟😲 for you: we'll take a look into the internals of the new
Ember Guides website, which has had a [complete make-over and relaunched this month](https://www.emberjs.com/blog/2018/05/25/the-emberjs-times-issue-48.html#toc_a-href-https-guides-emberjs-com-new-ember-guides-launched-a) to finally run on an amazing Ember app. This will finally make contributions through the Ember community immensely easier.✨

In this special edition of the Ember.js Times, [@real_ate](https://github.com/mansona) who championed the migration of the Guides will let us have a peek into [the new app's](https://github.com/ember-learn/guides-app) internals and into its Broccoli powered build pipeline. So get ready to hit your recommended daily intake of veggies 🥒🥕 and read on:

---

This is the second part of a 6 part series on how we rebuilt the new Ember Guides from the ground up
over the course of six months, converting it into an Ember app in the process. If you want to see
the first part in this series check it out [here](https://blog.stonecircle.io/the-right-way-to-build-the-ember-guides/). You
can keep track of the posts by following the RSS feed at the top of the page.

## Initial experiments

In the very early stages of the conversations about upgrading the Ember Guides to be a fully-fledged
Ember app, Ryan Tablada (a.k.a [@rtablada](https://github.com/rtablada)) pointed me towards an
experiment that he had started to get the ball rolling. It was called
[broccoli-blog-api](https://github.com/rtablada/broccoli-blog-api) and was designed to:

> translate a directory (or set of directories) of Markdown documents into a static JSONAPI

Having worked extensively with Broccoli many years ago (before ember-cli was the official build
system for Ember), I thought to myself "What's the worst that could happen" and jumped straight into
the code. The thing about Broccoli is that it's almost the opposite of "riding a bike" and you very
quickly forget everything about it if you haven't been using it for a while 😣

## Why Broccoli or JSON:API

Anyone who has been following Ember for any reasonable amount of time knows that Ember Data works
great with JSONAPI, and if your backend already speaks JSON:API and follows the spec you are
essentially ready to go! If you have ever needed to integrate a hand-rolled, bespoke API's endpoints
with Ember Data you know that it is essentially just a process of translating things into JSON:API
in Javascript before it goes into Ember Data. If you're using JSON:API upfront things are a lot
easier to deal with, and you get to make use of the simplicity of Ember Data.

Broccoli is an `asset pipeline` that deals very effectively with the file system. It is all Just
Javascript™️, so it is in theory quite easy to work with. One of the issues that makes Broccoli more
challenging to work with is the lack of documentation, or at least that used to be the case. Over
the last few months [Oli Griffiths](https://github.com/oligriffiths) has been very active in the
Broccoli community and has recently published a [Broccoli
Tutorial](https://github.com/oligriffiths/broccolijs-tutorial). There is also much work going on
behind the scenes to make Broccoli more straight-forward to work with and a much more powerful tool,
for example Oli is currently [working on an
experiment](https://github.com/ember-cli/ember-cli/pull/7798) to bring Broccoli 1.x support to
ember-cli which will (hopefully) make life much better for Windows developers. [Jen Weber](https://github.com/jenweber) is also working on updating the [ember-cli documentation](https://ember-cli.com/user-guide/) so
it should soon be a bit easier to know how to get started adding to ember-cli with Broccoli 🎉

Having made these original decisions, we ultimately decided to build something called [broccoli-static-site-json](https://github.com/stonecircle/broccoli-static-site-json) which as you can see has very similar goals to broccoli-blog-api:

> Simple Broccoli plugin that parses collections of markdown files and exposes them as JSON:API documents in the output tree, under the specified paths. It also supports the use of front-matter to define meta-data for each markdown file.

Since the early days of broccoli-static-site-json things have gotten a tiny bit more complicated (more flexibility usually means more complexity) but to understand the basics of how effective Broccoli has been for this use case we can go back and look at the files at the very first commit on the 7 Nov 2017. We are going to go into more detail below but if you want to follow along you can find the main index file [here](https://github.com/stonecircle/broccoli-static-site-json/blob/95cfe954e48da203eacba5fa154333cbc0b3a81d/index.js).

## The main plugin

The simple early experiment of the broccoli-static-site-json had an index.js file (the only active file at the time) with a total of 119 lines of code, the main active lines making up the `build()` of the Broccoli plugin just adding up to 50 lines of code, which is definitely small enough for us to deep dive into in this post. 💪

I'm going to give a very brief overview of the structure of a Broccoli plugin and then go into detail of each line of the main `build()` function.

### Structure of a Broccoli plugin
Here is a basic example of a plugin

```js
const Plugin = require('broccoli-plugin');

class BroccoliStaticSiteJson extends Plugin {
  constructor(folder, options) {
    // tell broccoli which "nodes" we're watching
    super([folder], options);
    this.options = {
      folder,
      contentFolder: 'content',
      ...options,
    };
    // don't know what this does
    Plugin.call(this, [folder], {
      annotation: options.annotation,
    });
  }

  build() {}
}

module.exports = BroccoliStaticSiteJson;
```

This isn't exactly the _most_ basic example of a plugin as it has some of the business logic and API of broccoli-static-site-json exposed. It is not 100% obvious by the above example but it is telling us that if we wanted to use this plugin we would do something like this:

```js
const jsonTree = new StaticSiteJson('input', {
  contentFolder: 'output-jsons',
})
```

This is just setting the local `folder` and the `contentFolder` in the options hash for the StaticSiteJson class and will eventually be how we tell the plugin to look for Markdown files in the `input` folder and put the output JSON:API files in `output-jsons`. The contentFolder is optional and will default to `content`.

When this is used in ember-cli or any other Broccoli pipeline the `build()` function is called. This is where most of the work happens.

### The build() function

Let's show the whole build function and then break it down piece by piece. Note: I've removed some things that aren't necessary for the explanation of this process like a few optional defensive programming steps, I just wanted to make this as easy to follow as possible.

```js
build() {
  // build content folder if it doesn't exist
  if (!existsSync(join(this.outputPath, this.options.contentFolder))) {
    mkdirSync(join(this.outputPath, this.options.contentFolder));
  }

  // build pages file
  if (existsSync(join(this.options.folder, 'pages.yml'))) {
    let pages = yaml.safeLoad(readFileSync(join(this.options.folder, 'pages.yml'), 'utf8'));

    writeFileSync(join(this.outputPath, this.options.contentFolder, 'pages.json'), JSON.stringify(TableOfContentsSerializer.serialize(pages)));
  }

  // build the tree of MD files
  const paths = walkSync(this.inputPaths);

  const mdFiles = paths.filter(path => extname(path) === '.md');

  const fileData = mdFiles.map(path => ({
    path,
    content: readFileSync(join(this.options.folder, path)),
  })).map(file => ({
    path: file.path,
    ...yamlFront.loadFront(file.content),
  }));

  fileData.forEach((file) => {
    const directory = dirname(join(this.outputPath, this.options.contentFolder, file.path));
    if (!existsSync(directory)) {
      mkdirSync(dirname(join(this.outputPath, this.options.contentFolder, file.path)));
    }

    const serialized = ContentSerializer.serialize(file);

    writeFileSync(join(this.outputPath, this.options.contentFolder, `${file.path}.json`), JSON.stringify(serialized));
  });
}
```

This may seem a bit scary but don't worry we will break it down, and hopefully it will all become clear.

#### Creating the output folder

The first piece is just a bit of house-cleaning. We want to make sure the output folder exists before we continue and if it doesn't we need to create it:

```js
// build content folder if it doesn't exist
if (!existsSync(join(this.outputPath, this.options.contentFolder))) {
  mkdirSync(join(this.outputPath, this.options.contentFolder));
}
```

One thing that you will notice right off the bat is that we are using functions like `exitsSync()`, `mkdirSync()` and `join()` which are all native NodeJS functions. You can see where they are coming from if you look at the top of the index.js file to see the require statements:

```js
const { extname, join, dirname } = require('path');
const {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} = require('fs');
```

you can read more about these functions on the official NodeJS documentation for [`fs`](https://nodejs.org/api/fs.html) and [`path`](https://nodejs.org/api/path.html)

#### Creating the Table of Contents from the pages file

Before I started building broccoli-static-site-json [Ricardo Mendes a.k.a. @locks](https://github.com/locks) and [Jared Galanis](https://github.com/jaredgalanis) had begun the process of building the Markdown sources directories that would allow us to manage different versions of the Ember Guides more effectively. One of the key aspects of this structure was that it included a [`pages.yml`](https://github.com/ember-learn/guides-source/blob/master/guides/v2.15.0/pages.yml) file that specified the Table of Contents (ToC) for any particular version of the Guides. What we needed to do as part of this process was to parse this YAML file and output a JSON:API based file in the output directory. Here is the code for that:

```js
// build pages file
if (existsSync(join(this.options.folder, 'pages.yml'))) {
  let pages = yaml.safeLoad(readFileSync(join(this.options.folder, 'pages.yml'), 'utf8'));

  writeFileSync(join(this.outputPath, this.options.contentFolder, 'pages.json'), JSON.stringify(TableOfContentsSerializer.serialize(pages)));
}
```

This snippet first checks to see if the input folder contains a `pages.yml` file and if it does it loads it using [js-yaml](https://www.npmjs.com/package/js-yaml). After it loads the data it writes a _serialized_ version of the file to the output folder, and the serialisation is done using [jsonapi-serializer](https://github.com/SeyZ/jsonapi-serializer) with the following serializer definition:

```js
const TableOfContentsSerializer = new Serializer('page', {
  id: 'url',
  attributes: [
    'title',
    'pages',
  ],
  keyForAttribute: 'cammelcase',
});
```

#### Building the tree of Markdown files
Next up is the main event, converting a nested structure of markdown files into a nested structure of JSON:API documents. This one will be simpler to follow if we take it in bite-sized chunks, let's start with just getting the Markdown files:

```js
const paths = walkSync(this.inputPaths);

const mdFiles = paths.filter(path => extname(path) === '.md');
```

This code uses [`walkSync`](https://github.com/joliss/node-walk-sync) to list all of the files under the inputPaths (what we passed in as the `folder` in the constructor), and then we filter that list of paths to find all files that end with `.md` so that we can find markdown files.

Next it's time to load each of those files into an array:

```js
const fileData = mdFiles.map(path => ({
  path,
  content: readFileSync(join(this.options.folder, path)),
})).map(file => ({
  path: file.path,
  ...yamlFront.loadFront(file.content),
}));
```

Using [`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) twice to convert a list of file _names_ into a data structure that contains everything that we need. The first map converts the file names into an array of objects that looks something like this:

```js
[{
  path: '/getting-started/index.md',
  content: `---
            title: Getting Started
            ---
            Getting started with Ember is easy. Ember projects are created ...`
}, {
  path: '/getting-started/quick-start.md',
  content: `---
            title: Quick Start
            ---
            This guide will teach you how to build a simple ...`
}]
```

As you can see each object remembers the path to the file that created and has the **full content** of the file loaded. In the second `map()` function we the use [`yaml-front-matter`](https://www.npmjs.com/package/yaml-front-matter) to load the optional extra YAML metadata into the object. You can read more about what front-matter is and what it can be used for [here](https://jekyllrb.com/docs/frontmatter/).

After the second `map()` function the `fileData` array looks like this:

```js
[{
  path: '/getting-started/index.md',
  title: 'Getting Started',
  __content: 'Getting started with Ember is easy. Ember projects are created ...'
}, {
  path: '/getting-started/quick-start.md',
  title: 'Quick Start',
  __content: 'This guide will teach you how to build a simple ...'
}]
```

This leaves us finally ready to serialise into JSON:API. Next we need to loop over the `fileData` array and write our JSON files out to disk:

```js
fileData.forEach((file) => {
  const directory = dirname(join(this.outputPath, this.options.contentFolder, file.path));
  if (!existsSync(directory)) {
    mkdirSync(dirname(join(this.outputPath, this.options.contentFolder, file.path)));
  }

  const serialized = ContentSerializer.serialize(file);

  writeFileSync(join(this.outputPath, this.options.contentFolder, `${file.path}.json`), JSON.stringify(serialized));
});
```

The first thing we do in this function is to make sure that the folder we want to write the file into actually exists. We need to check this on all files because we used `walkSync` earlier in this process and it is possible to have a very deeply nested folder structure.

Next we serialise the `file` object using another `jsonapi-serializer` and write the serialised document to disk. Here is the serialiser definition for the ContentSerializer which is only very slightly more complicated than the one for the Pages in the ToC:

```js
const ContentSerializer = new Serializer('content', {
  id: 'path',
  attributes: [
    '__content',
    'title',
  ],
  keyForAttribute(attr) {
    switch (attr) {
      case '__content':
        return 'content';
      default:
        return attr;
    }
  },
});
```

in this case we use `keyForAttribute()` to rename `__content` to just be `content`.

## Conclusion
I hope you enjoyed this deep-dive into the guts of broccoli-static-site-json. If you are interested in other places that make use of this system you can check out [Ember Casper Template](https://github.com/stonecircle/ember-casper-template) which also happens to be what is powering this Blog 🎉

As always you can reach out to me on [Twitter](https://twitter.com/real_ate), or you can find me on the Ember Community Slack as `@real_ate`

...


## [And last, but not least...](https://github.com/ember-learn/guides-app/graphs/contributors)

<p> We'd like to thank everyone who made the new Guides app possible! Big kudos to <a href="https://github.com/mansona" target="contributor">mansona</a>, <a href="https://github.com/sivakumar-kailasam" target="contributor">sivakumar-kailasam</a>, <a href="https://github.com/jenweber" target="contributor">jenweber</a>, <a href="https://github.com/rwwagner90" target="contributor">rwwagner90</a>, <a href="https://github.com/chrismou" target="contributor">chrismou</a>, <a href="https://github.com/localpcguy" target="contributor">localpcguy</a>, <a href="https://github.com/acorncom" target="contributor">acorncom</a>, and <a href="https://github.com/dopin" target="contributor">dopin</a> - we appreciate all your efforts you put into renewing one of our most favorite documentation sites! 💖
</p>


---

That's another wrap!  ✨

Be kind,

Chris Manson, Amy Lam, Ryan Mark, Jessica Jordan and the Learning Team
