---
title: 'Update on Module Unification'
author: Tom Dale
tags: Recent Posts, 2019, Ember Octane
responsive: true
---

<!-- alex disable fight laid burn -->

Ember's conventions for project layout and file naming are central to the
developer experience. It's crucial that we get both the technical and
ergonomic details right. I wanted to provide an update about Module
Unification and our plans for the file structure in Ember Octane.

**In short, we do not plan to ship Module Unification in Octane**. Instead,
Octane will ship with today's file system layout, with one change: support
for nested components in `<AngleBracket />` invocation syntax

Because Octane apps will continue with today's file system layout, we want to
address the largest barrier to `<AngleBracket />` adoption today: components
nested inside other directories.

For example, if you have a component located at
`app/components/icons/download-icon.js` (i.e., nested inside an `icons`
directory), you can invoke it with curly invocation syntax like this:

```handlebars
{{icons/download-icon}}
```

However, it's not possible to invoke the same nested component with angle
bracket syntax without resorting to clunky workarounds.

As proposed in the [Nested Invocations in Angle Bracket Syntax
RFC][nested-angle-brackets], we plan to address this by adding support for
nested components via the `::` separator.

[nested-angle-brackets]: https://github.com/emberjs/rfcs/pull/457

With this proposal, the component described above could be invoked with angle
bracket syntax like this:

```handlebars
<Icons::DownloadIcon />
```

Because this is a small change, it can be implemented quickly without
requiring us to delay the Ember Octane release.

## Status of Module Unification

Given that the Module Unification RFC was merged in late 2016, and we talked
about shipping Module Unification in the [2018 Roadmap RFC][roadmap-rfc],
it's fair to ask what happened and why we're making this decision now.

[roadmap-rfc]: https://emberjs.github.io/rfcs/0364-roadmap-2018.html

Heads up: this post gets long and detailed, so if you are only care about the
plan going forward, you can safely skip the rest.

In the spirit of transparency and overcommunication, though, I wanted to
share a little bit of the history and evolution of MU from my perspective.

Let's call the file system layout that Ember apps use today the "classic"
layout. While this structure has served us well, it also has several
shortcomings.

In the classic layout, files are grouped by type, not by name. Sometimes,
this means that closely related files (like a component and its template) are
separated from each other, and navigating between them can be frustrating.

Ideally, related files would be close to each other in the file system. For
example, you may want an Ember Data model and its associated serializer to be
co-located in the same directory.

Early on, Ember CLI implemented an experimental "pods" layout that grouped
files by name rather than by kind. For example, a `User` model and its
serializer would be grouped together in `app/user/`, as `model.js` and
`serializer.js` respectively.

Feedback from the community was that pods felt more productive than the
classic layout. However, pods had several problems that needed to be
addressed before it could be enabled by default.

The effort to address the design flaws of pods led to the [Module Unification
RFC][mu], a ground-up rethink of how the file system should work in Ember
apps. Importantly, this design grappled with overhauling Ember's resolver and
dependency injection systems as well, which was just as important as
shuffling around where particular files went on disk.

[mu]: https://emberjs.github.io/rfcs/0143-module-unification.html

The MU RFC was merged at the end of 2016, but new Ember apps are still
generated with the classic layout. So, why can't we flip the switch on
enabling Module Unification-style layout by default today?

Remember that MU described not just a new file system but a significant
overhaul of Ember's resolver. Implementing MU was a **huge** initiative that,
while often hidden, touched nearly every part of the framework. Despite this
large scope, and thanks to the incredible amount of time and energy our
community devoted to the work, MU implementation has made great progress, and
nearly everything needed to make Module Unification work has landed in Ember.

**Nearly** everything. When we merged the Roadmap RFC last year, there was one
last major piece of MU that still needed to be designed: component
namespacing, or how to refer to components that come from other addons in
templates.

While we had a plan, a shift in the JavaScript ecosystem sent us back to the
drawing board. And the harder we worked on solving this last piece, the more
we realized that fundamental aspects of the overall design needed to be
rethought.

### Namespaces and Scoped Packages

Besides files being spread out, another problem with the classic layout is
that everything goes into one big global pool of names.

So, for example, Ember Data defines a service called `store` that you can
inject into components and services. If you install another addon that also
has a service called `store`, there's no easy way to use both.

Similarly, if your app has a component called `small-button` and you install
an addon that also has a component called `small-button`, you have no way to
tell Ember which one you mean when you type `{{small-button}}` in a template.

One of the key benefits of the MU design is that names are no longer global,
but namespaced to the package where they come from. So, for example, if an
npm package called `ember-ui-library` contains a component called
`small-button`, the MU RFC proposed referring to it in your template like
this:

```handlebars
{{#ember-ui-library::small-button}}
  ...
{{/ember-ui-library::small-button}}
```

Around the same time we were designing MU, however, [npm announced support
for scoped package names][scoped-packages]. Prior to this change, npm package
names were limited to alphanumeric characters and dashes. Now, though,
packages could start with an `@` and contain a `/`, like
`@glimmer/component`.

[scoped-packages]: https://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages

Component invocations with scoped packages blew past the verbosity limit. We
simply could not bring ourselves to accept a syntax that commonly produced
code like this:

```handlebars
{{#@my-company/ember-ui-library::small-button}}
  ...
{{/@my-company/ember-ui-library::small-button}}
```

We also had concerns that this was confusing to scan visually, considering
that `@` already means a component argument and `/` already means a closing
tag.

While Ember had been using it for years, around this time JavaScript module
syntax (`import Post from './post'`) started gaining significant traction in
the wider ecosystem, along with tools like webpack that could use these
modules to perform code splitting.

After scoped npm packages scuttled our original plan for namespaced
components, we went back to the drawing board, and something similar to
JavaScript's `import` seemed like a promising solution. However, we
immediately hit some challenges while exploring this idea.

The concept of a "component" in Ember isn't a singular thing, but the union
of a template and a component class. With the component and template in
separate files, it isn't clear which one you're supposed to import. Because
of this, we wanted something where you would import a component by name
(`my-component`), not a specific file like in JavaScript.

But despite the differences, the overall concept of importing modules was
similar. We wanted to find a syntax that would give users who already knew
JavaScript an intuition about the similarities, while not making it look so
similar that people would be misled into thinking it was literally the same
thing.

We tried to find a balance between these two constraints with a syntax that
looked like this:

```handlebars
{{use component-name from 'package-name'}}
```

We hoped that it looked similar enough to JavaScript's `import` syntax to
give you a clue about what it was doing, but by adopting the `use` keyword
instead of `import`, signal that this was not exactly the same as JavaScript
modules.

Matthew Beale poured significant time into capturing all of these conflicting
constraints in the [Module Unification Packages RFC][mu-pkg], but, even after
months of discussion, we couldn't come to consensus and the RFC was never
merged.

[mu-pkg]: https://github.com/emberjs/rfcs/pull/367

Despite everyone agreeing this was an urgent problem, we couldn't convince
ourselves that having different module systems for JavaScript and templates
was a viable solution. Unfortunately, there wasn't an obvious alternative
plan, and not having an answer meant MU was indefinitely blocked until we
could figure out this last piece of the puzzle.

We felt stuck.

### Real-World Feedback

In the meantime, enough of Module Unification was shipping behind feature
flags (and in Glimmer.js) that we were able to get feedback from early
adopters. While overall people really liked the new file system and really
appreciated not dealing with frustrating name collisions, something felt
_off_.

One common theme in the feedback was that MU felt too rigid and frequently
got in the way of simple tasks. To understand why, it's important to
understand that MU is about more than a file system. MU is really a system
for _controlling scope_.

For example, a feature of MU is the ability to have private components that
don't leak into the rest of the app. If we have a component called
`list-paginator` and it has a child component called `paginator-control`, MU
allows us to organize them like this:

```
src
├── ui
│   ├── components
│   │   └── list-paginator
│   │       ├── paginator-control
│   │       │   ├── component.js
│   │       │   └── template.hbs
│   │       ├── component.js
│   │       └── template.js
```

In this example, the `list-paginator` template can invoke
`{{paginator-control}}` to render its child component. However, if you try to
invoke `{{paginator-control}}` from any template outside the `list-paginator`
directory, you'll get an error. In other words, `paginator-control` is
_local_ to `list-paginator`.

MU, then, is about scope, and controlling who has access to what. Where a
module lives in the MU file system determines what it can see to and who
else can see it.

This is a clever idea that eliminates a lot of boilerplate. If you have to
organize your files anyway, and if you want to group related things together
anyway, it makes sense to try to create a single system that solves
organization and scoping at the same time.

In practice, though, we ran into a few challenges:

1. This idea is not common in the JavaScript ecosystem, so the file system
   controlling scope isn't intuitive for new learners. They also have to
   memorize these naming rules, which are implicit and get quite complex.
2. Similarly, ecosystem tools don't understand MU. We have to build custom
   integrations to get things like "Go to Definition" to work in IDEs or code
   splitting to work in webpack, that other libraries get for free.
3. JavaScript files in Ember use module syntax, which doesn't go through the
   MU system, adding to the confusion. Having one system in a component's
   JavaScript and another in its template is not ideal.
4. When file names and locations are so meaningful, it can be frustrating
   if you want to create a file that isn't part of the MU world. Tasks that
   are normally trivial, such as extracting utility functions into a separate
   file or grouping related files together in a directory, can easily turn
   into a battle where your build starts erroring because you're not playing
   by the MU rules.

### A Personal Anecdote

Personally, this last one was what really caused me to step back and
re-evaluate our plan for MU. It happened during a project at work where we
were using both Glimmer.js (with Module Unification) and Preact.

As the number of components grew, a co-worker created a directory called
`icons` in the Preact app to hold all of the components for rendering
different SVG icons. I'm sure it didn't take more than a few minutes to
create the directory, drag the appropriate component files in, and update the
paths everywhere those components were imported. (In fact, VS Code probably
updated the import paths automatically.)

When we tried to do the same thing in the Glimmer app, it was a much
different experience that turned into an hours-long slog. And despite all the
great things it _does_ do, MU doesn't really have a way to do this kind of
lightweight grouping.

We could have found a workaround. We could have extracted the SVG icon
components into a separate package, or created a higher-order component that
wrapped all of the child icon components. But it seemed ridiculous to burn so
much time looking for a "workaround" to perform a task that felt like it
should have been (and was, in Preact) trivial.

I knew, intellectually, the benefits of MU. I knew how carefully it was
designed to enforce structure and consistency as your application grew and
had different engineers of different experience levels working on it. (Indeed,
by the end of the project, I found the Glimmer app much easier to navigate,
while the Preact app had several inconsistently-followed conventions.)

But I never forgot how viscerally bad it felt to have my co-workers fight so
hard to do something that felt like it should be so easy.

So this was the status quo last year. We were all incredibly frustrated that
we couldn't make progress on the scoped package problem, but I was even more
overwhelmed trying to figure out what, if anything, to do about the negative
experiences my co-workers had had when using MU.

Discovering problems in a design you've been working on for so long is
painful, especially in cases like this where the majority of the work was
already complete, and we thought we were so close to the finish line.

Programming language and API design is really hard. Sometimes I read old RFCs
and marvel at how obvious the solution seems now, in contrast to the weeks,
months, or years I know it took to tease it out from the millions of possible
alternatives.

When you're trying to balance so many competing constraints, sometimes a
small change is all it takes to get you out of a design conundrum you've
struggled with for months. In this case, that change was angle bracket
component invocation.

One thing making JavaScript imports difficult to use with templates was the
constraint that components had to have a dash in their name. Unfortunately,
dashes aren't valid in JavaScript identifiers, so something like `import
some-component from './some-component'` produces a syntax error.

Angle bracket components, on the other hand, start with a capital letter to
disambiguate themselves from normal HTML tags: `<MyComponent />` instead of
`{{my-component}}`. Most importantly, there's no dash.

As the Ember community started using angle bracket syntax, early feedback was
very positive. All of a sudden, JavaScript import syntax was back on the
table.

### The Path Forward: Template Imports

Speaking for the Ember.js core team, we are trying to get better at updating
the community when plans have changed but the new plan isn't fully locked in
yet. So, consider this one of those situations.

We know that the exact plan for Module Unification (MU), as described in the
original RFC, will need to change. How it changes is not yet certain,
but we believe that some of the problems we wanted to solve with MU are
better solved with template imports.

With template imports, we intend to make templates play nicely with
JavaScript, so you can use the `import` feature you already know and love. By
having components and helpers be modules you can import, we can eliminate the
most complex parts of Module Unification so it's easier to learn and use.

We recently posted the [SFC & Template Imports RFC][template-imports-rfc],
which describes some of the low-level APIs needed in Ember to make template
imports possible.

[template-imports-rfc]: https://github.com/emberjs/rfcs/pull/454

Learning from past mistakes, this RFC focuses on the primitives so we can
quickly experiment, get feedback, and iterate on template import proposals in
addons, before stabilizing them in the core framework.

While the Ember.js core team has reached consensus that template imports are
the intended path forward, please note that the current RFC only covers
low-level primitives, not the API that would be used by Ember developers to
author templates.

Here is one example of a **very hypothetical** template imports syntax:

```hbs
---
import UserProfile from './user-profile';
import UserIcon from './icons/user';
---
<h1>{{this.blog.title}}</h1>
<UserIcon />
<UserProfile @userId={{this.blog.authorId}} />
```

The syntax is up in the air and will almost certainly be different from this
example. Regardless, it shows the benefit of template imports clearly: we've
imported two components—`UserProfile` and `UserIcon`—just like how we would
refer to any other JavaScript module. This makes it very easy for
everyone—from developer who are new to Ember, to IDEs, and other tooling in
the JavaScript ecosystem`—to understand what came from where.

You can even imagine an (again, **very hypothetical**) single-file component
format that places the template right within the component's class. Here, a
unified imports solution feels especially natural:

```js
// src/ui/components/blog-post.gbs

import Component from '@glimmer/component';
import UserIcon from './icons/user';

export class BlogPost extends Component {
  blog = { title: 'Coming soon in Octane', authorId: '1234' };

  <template>
    <h1>{{this.blog.title}}</h1>
    <UserIcon />
    <UserProfile @userId={{this.blog.authorId}} />
  </template>
}
```

Again, the exact syntax is up in the air and will almost certainly be
different from this example. The benefit of exposing the low-level primitives
first is that we can try out multiple competing designs relatively easily
before comitting. And if you don't like what we eventually decide on, you can
build an alternative that is just as stable as the default implementation.

But note that template imports are not a replacement for MU. They don't help
with things like better isolation of an addon's services, or a more intuitive
file system layout. Instead, we hope that template imports will better solve
one aspect of MU, so the overall design can be simplified and its benefits
can shine through more clearly.

Template imports also give us a good opportunity to try to address the
ergonomic problems people reported when trying MU.

Without template imports, we had to rely on MU to resolve component names,
meaning the files in the `src/ui/components` directory had to follow strict
rules. But **with** template imports, users can just tell us which module on
disk they want. We can skip resolving components through MU altogether, and
let Ember users organize their component files however they want.

As frustrating as it was at the time, the inability to make progress on MU
may have been a blessing in disguise. It gave us time to implement angle
bracket syntax for components, which allowed template imports to seem
feasible again—which means we now have a solution that seems to address both
the scoped package problem and the ergonomics problem. Even better, template
imports make things like treeshaking and code-splitting in
[Embroider][embroider] much easier.

[embroider]: https://github.com/embroider-build/embroider

I believe the dead-end we found ourselves in was a sign from the universe
that something better was just around the corner. Time will tell, but my
hunch is that template imports solve these important problems much more
elegantly than what we had before. This process also pushed us to explore
single-file components, which I think will be a surprisingly big productivity
improvement for Ember developers.

While we're excited about template imports, we want to keep our promise to
finish what we started. We are prioritizing Ember Octane and making sure that
our first edition is a polished, cohesive experience. Only once Octane is out
the door will we turn our attention to new initiatives like template imports.

Hopefully, this post helps provide some context about the state of MU. Of
course, what I've written here is my personal, imperfect recollection of
events, simplified for clarity. The reality of technical design is messy and
feels a lot more like going around in circles than the tidy sequence I've
presented here.

I will also mention that, as a project, I think we've dramatically improved
how we design, implement, validate, and iterate on features since we
originally started the Module Unification RFC. The MU RFC is the last of the
proposals from the "mega-RFC" era, where we had a tendency to do a ton of
upfront design and implementation before we had any feedback from real users.

Nowadays, I think we're a lot better about making sure RFCs are relatively
small and focused on doing one thing. We also tend to prioritize exposing
hooks or other primitives that let us test out new ideas in addons. This
allows us to improve designs based on early feedback, without the strict
stability requirements that come with landing something in the framework
proper.

This has worked well for things like `ember-decorators` and Glimmer
components, where real world feedback and the ability to make breaking
changes based on that feedback was critical. I'm hopeful that a similar
strategy for template imports will be just as successful.

My sincere thanks to everyone who has worked so hard on MU and related
efforts. I'm proud to be part of a community that refuses to charge ahead
with something we know isn't right. Ember's longevity is, at least in part,
explained by our willingness to make these kinds of hard decisions.

I'm so excited about Ember, our roadmap, and the newfound energy in our
community. In 2019, a thriving Ember is more important for the web than ever.
Thank you for being a part of our community, and I hope to see you at
[EmberConf](https://emberconf.com) in a few weeks. It's gonna be a good one.
