---
title: 'Update on Module Unification & Octane'
author: Tom Dale
tags: Recent Posts, 2019, Ember Octane
responsive: true
---

Ember's conventions for project layout and file naming are central to the
developer experience. It's crucial that we get both the technical and
ergonomic details right. I wanted to provide an update about Module
Unification and our plans for the file structure in Ember Octane.

In short, we intend to make templates play nicely with JavaScript, so you can
use the `import` feature you already know and love. By having components and
helpers be modules you can import, we can simplify Module Unification so it's
easier to learn and use.

Here's an example of what I think template imports could look like:

```js
// src/ui/components/blog-post.gbs

import Component from '@glimmer/component';
import UserProfile from './user-profile';
import UserIcon from './icons/user';

export class BlogPost extends Component {
  blog = { title: 'Coming soon in Octane', authorId: '1234' }

  <template>
    <h1>{{this.blog.title}}</h1>
    <UserIcon />
    <UserProfile @userId={{this.blog.authorId}} />
  </template>
}
```

Here, we've imported two components—`UserProfile` and `UserIcon`—like we
would any other JavaScript module. We've also defined the component's
template in JavaScript, placing it in in a template tag within the class
body.

For templates that aren't associated with a component (such as route
templates), we could allow template tags to be exported from JavaScript as
well:

```js
// src/ui/routes/application.gbs

import NavBar from '../components/NavBar';

export default <template>
  <NavBar @darkMode={{true}} />
  <main>
    {{outlet}}
  </main>
</template>;
```

While the framework core team has reached consensus that template imports are
the path forward, please note that the syntax shown in the examples above is
hypothetical. While I'm personally a fan of the `<template>` tag syntax shown
here, others are not, and details like this are still being hammered out in
the RFC process and are highly likely to change.

Speaking for the framework core team, we are trying to get better at updating
the community when plans have changed but the _new_ plan isn't locked
in yet.

So, consider this one of those situations. We know Module Unification, [as
defined in the original MU RFC][mu], needs some changes before it's ready for
prime time. We are still figuring out exactly what those changes are, and
exactly the shape of the template imports design. Keep an eye on the [RFCs
repo][rfcs], where we'll be sharing these proposals as soon as they're ready.

[mu]: https://emberjs.github.io/rfcs/0143-module-unification.html
[rfcs]: https://github.com/emberjs/rfcs

The MU RFC was merged in late 2016. It's fair to ask why implementing MU has
taken this long, and why it took this long to realize we wanted to make
changes. In the spirit of transparency and overcommunication, I wanted to
share a little bit of the history and evolution of MU from my perspective.

## A Little History

Today, Ember apps use the "classic" file layout by default. While this layout
has served us well, it also has several shortcomings.

Because files are grouped by type, a component's template resides in one
directory (`app/templates/components`) while its JavaScript class resides in
another (`app/components`). Jumping between these two directories as they
grow can be frustrating, especially given how frequently Ember developers
need to switch back and forth between component class and template.

Early on, Ember CLI implemented an experimental "pods" layout that grouped
files by name rather than by kind. So, for example, a component's JavaScript
and template file would be grouped together in `app/component-name/`, as
`component.js` and `template.hbs` respectively.

User feedback was that pods felt more productive than the classic layout.
However, pods had several problems that needed to be addressed before it could
be enabled by default.

The effort to address the design flaws of pods led to the [Module Unification
RFC][mu], a ground-up rethink of how the file system should work in Ember
apps. Importantly, this design grappled with overhauling Ember's resolver and
dependency injection systems, which was as much or more important than
deciding the particular file system layout.

The MU RFC was merged at the end of 2016, but new Ember apps are still
generated with the classic layout. So, why is that? Why can't we flip the
switch on enabling Module Unification-style layout by default today?

Remember that MU described not just a new file system but a significant
overhaul of Ember's resolver. Implementing MU was a **huge** initiative that,
while often hidden, touched nearly every part of the framework. Despite this
large scope, and thanks to the incredible amount of time and energy our
community devoted to the work, MU implementation has made great progress, and
nearly everything needed to make Module Unification work has landed in Ember.

_Nearly_ everything. There's one last major piece needed to ship, and while
we were working on implementing MU, shifts in the JavaScript ecosystem took
place that sent us back to the drawing board.

### Namespaces and Scoped Packages

One of the problems with the classic layout is that everything goes into one
big global pool of names. So, for example, if your app has a component called
`small-button` and you install an addon that also has a component called
`small-button`, you have no way to tell Ember which one you mean when you
type `{{small-button}}` in a template.

One of the key benefits of the MU design is that names are no longer global,
but namespaced to the package where they come from. So, for example, if an
npm package called `ember-ui-library` contains a component called
`small-button`, I would refer to it in my template as
`{{ember-ui-library::small-button}}`.

This worked pretty well, with the downside that it could get quite verbose.
This was especially true when components were invoked with a block:

```hbs
{{#ember-ui-library::small-button}}
  ...
{{/ember-ui-library::small-button}}
```

Around the same time we were designing MU, [npm announced support for scoped
package names][scoped-packages]. Prior to this change, npm package names were
limited to alphanumeric characters and dashes. With this change, however,
packages could now start with an `@` and be prefixed with a user or
organization, like `@glimmer/component`.

[scoped-packages]: https://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages

While namespaced component invocations pushed the limits of verbosity,
combining them with scoped packages blew past that limit. We simply could not
bring ourselves to accept a syntax that commonly produced monstrosities like
this:

```hbs
{{#@my-company/ember-ui-library::small-button}}
  ...
{{/@my-company/ember-ui-library::small-button}}
```

While Ember had been using it for years, around this time JavaScript module
syntax (`import Post from './post'`) started gaining significant traction in
the wider ecosystem. After scoped npm packages scuttled our original plan for
namespaced components, we went back to the drawing board, and something
similar to JavaScript's `import` seemed like a promising solution.

However, we immediately hit some challenges while exploring this idea.

First, how much do we want to be like JavaScript? Should we create a
Handlebars-flavored version of JavaScript imports? Something about this just
felt _wrong_:

```hbs
{{import small-component from "@my-company/ember-ui-library"}}
```

It reads like JavaScript, at the expense of being incoherent when read as
Handlebars, whose syntax is a functional programming language in the spirit
of Lisp. We seriously considered it, but couldn't get past additional
problems like how to accommodate named exports (`import { thing }`) and
wildcard imports (`import *`).

Next, we thought about literally embedding JavaScript in templates, but again
there were syntactic incompatibilities between Handlebars and JavaScript.
Given the requirement that component names contain a dash (`-`) character,
but JavaScript identifiers aren't allowed to contain dashes, what exactly do
you type? `import small-component from '@my-company/ember-ui-library'` isn't
valid JavaScript.

We still felt stuck.

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
3. JavaScript files in Ember use native module syntax anyway, which doesn't
   go through the MU system, adding to the confusion. Having one system in
   a component's JavaScript and another in its template is not ideal.
4. When file names are so meaningful, it can be frustrating to figure out how
   to tell MU ignore a file that _isn't_ meaningful. Tasks that are trivial
   in other programming environments, such as grouping related components
   together, can easily turn into a battle where your build starts erroring
   because you can't figure out the right incantation of the MU rules.

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

We could have extracted the SVG icon components into a separate package. We
could have tried to create a higher-order component that wrapped all of the
child icon components. We could have found a workaround. But it seemed
ridiculous to burn so much time looking for a "workaround" to perform a task
that felt like it should have been (and was, in Preact) trivial.

I knew, intellectually, the benefits of MU. I knew how carefully it was
designed to enforce structure and consistency as your application grew and
had different engineers of different experience levels working on it. (Indeed,
by the end of the project, I found the Glimmer app much easier to navigate,
while the Preact app had several inconsistently-followed conventions.)

But I never forgot how viscerally bad it felt to have my co-workers fight so
hard to do something that felt like it should be so easy.

### The Path Forward

So this was the status quo last year. We were all incredibly frustrated that
we couldn't make progress on the scoped package problem, but I was even more
overwhelmed trying to figure out what, if anything, to do about the negative
experiences my co-workers had had when using MU.

Revisiting a design you've been working on for so long is painful, especially
in cases like this where the majority of the work is already complete. We
felt like we just had to solve the scoped package problem and we'd finally be
done.

Programming language and API design is hard. Really hard. Sometimes I read
old RFCs and marvel at how obvious the design seems now, after the weeks,
months, or years we spent teasing it out from the millions of possibilities
in front of us.

When you're trying to balance so many competing constraints, sometimes a
small change is all it takes to get you out of a design conundrum you've
struggled with for months. In this case, that change was angle bracket
component invocation.

As I mentioned above, it seemed obvious we couldn't use JavaScript for
template imports because components had to have a dash in their name. If we
wanted to import identifiers with a dash in the name, we'd have to invent our
own syntax.

Angle bracket components, on the other hand, start with a capital letter to
differentiate themselves from normal HTML tags, so they use PascalCase—and no
dash. As the Ember community started using angle bracket syntax, early
feedback was very positive. All of a sudden, JavaScript import syntax was
back on the table.

With the renewed excitement about template imports, it was a good time to
bring up the ergonomic concerns about MU.

Without template imports, we had to rely on MU to resolve component names,
meaning the files in the `src/ui/components` directory had to follow strict
rules. But _with_ template imports, users can just tell us which module on
disk they want. We can skip resolving components through MU altogether, and
let Ember users organize their component files however they want.

As frustrating as it was at the time, the inability to make progress on MU
may have been a blessing in disguise. It gave us time to land angle bracket
components, which allowed template imports to seem feasible again, which
allowed us to both solve the scoped package problem while loosening the
strictest MU rules.

I think the deadend we found ourselves in was a sign from the universe that
we needed to wait for the better design that was just around the corner. Time
will tell, but I think template imports are a much, much better design. And
this process also pushed us to explore single-file components, which I think
will be a surprisingly big productivity improvement for Ember developers.

I want to be clear: the is all just one person's recollection of events. The
reality of technical design is messy and feels a lot more like going around
in circles than the nice, clean, linear sequence I've presented here.

### What's Next

I recently posted the [SFC & Template Import Primitives
RFC](https://github.com/emberjs/rfcs/pull/454), which is the first of several
RFCs describing changes to MU or new features that complement MU. You should
see more RFCs related to this topic in the coming weeks.

I will also mention that, as a project, I think we've dramatically improved
how we design, implement, validate, and iterate on features since we
originally started the Module Unification RFC. The MU RFC is the last of the
proposals from the "mega-RFC" era, where we had a tendency to do a ton of
upfront design and implementation before we had any feedback from real users.

Nowadays, I think we're a lot better about making sure RFCs are relatively
small and focused on doing one thing and doing it well. We also tend to
prioritize exposing hooks or other primitives that let us test out new ideas
in addons. This allows us to improve designs based on real world feedback,
without the strict stability requirements that come with landing something in
the framework proper.

This has worked well for things like `ember-decorators` and
`@glimmer/component`, where real world feedback and the ability to make
breaking changes based on that feedback was critical. I'm hopeful that a
similar strategy for single-file components will be just as successful.

I'm so excited about Ember, our technical vision, and the newfound energy in
our community. In 2019, a thriving Ember is more important for the web than
ever. Thank you for being a part of our community, and I hope to see you at
EmberConf in a few weeks. It's gonna be a good one.