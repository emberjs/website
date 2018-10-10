---
title: "Glimmer.js Progress Report"
responsive: true
author: Tom Dale
tags: Recent Posts, glimmer, 2017
---

At EmberConf in March of this year, [we announced Glimmer.js][ann-glimmer-js], a
library for building modern UI components optimized for the mobile web. I wanted
to give an update on what we've been working on since then.

[ann-glimmer-js]: https://emberjs.com/blog/2017/04/05/emberconf-2017-state-of-the-union.html#toc_introducing-glimmer-js 

There were two primary motivations for releasing Glimmer.js as a standalone project:

1. We wanted people who aren't "all in" on Ember to have a way to incrementally
   adopt part of the framework.
2. We wanted a laboratory where we could freely run experiments on what a
   next-generation component library might look like, without creating churn for
   Ember users.

Because Ember's rendering layer is built on top of the shared Glimmer VM,
successful experiments have a clear path to make their way upstream to Ember
users. And, once stabilized, we'd like Glimmer.js to be the default component
API for new Ember apps—but it's still too premature to set any timelines for
that today.

## Unlocking Experimentation

While Ember is known for incorporating the best ideas from across the JavaScript
ecosystem, it's important that we contribute back our own innovations, too.
Refining new ideas takes time and, often, a few false starts. How do we
reconcile the need to experiment with Ember's vaunted stability guarantees?

One of the themes we discussed in our keynote was a new focus on _unlocking
experimentation_, that is, allowing people to easily try out and share unproven
ideas on top of the stable Ember core.

Unlocking experimentation doesn't just allow for _more_ ideas; it also leads to
_better_ ideas, because you can try things without worrying about breaking
changes. With Glimmer.js, we wanted to eat our own experimental dogfood.

We've wanted to overhaul the component API in Ember for some time now. But
because components play such a central role, we knew that we _had_ to have a
tangible implementation for people to play with before we could credibly ask
them to comment on an RFC. And we knew that having an implementation would
almost certainly shake out problems with the design that we would need to
address.

Glimmer.js is our way to iterate on a new component API until we have something
we feel confident submitting to the Ember RFC process.

We've already received incredibly useful feedback from early adopters. In
addition, fellow core team member Chad Hietala and I have been on a team at
LinkedIn using Glimmer.js to build a production application.

[To quote DHH](http://david.heinemeierhansson.com/posts/6-why-theres-no-rails-inc):

> The best frameworks are in my opinion extracted, not envisioned. And the best
> way to extract is first to actually do.

If you notice that a lot of the items I describe below are performance-related,
that is at least partly due to our product's all-consuming focus on mobile load
times. We are extremely excited about some of the recent breakthroughs we've
made and have enjoyed proving out some of our more esoteric ideas in a real app.

## What's New in Glimmer

We've been really, really busy and I've got a ton of updates to share with you. This blog post
got pretty long, so here's the short version:

<strong>

1. We're adopting `<Capital />`-style component syntax.
2. We're adding support for customizing a component's DOM attributes with `...attributes`.
3. You'll be able to teleport your component's elements anywhere in the DOM with the built-in `{{in-element}}` helper.
4. We've now got what we think might just be the fastest component library in the running, with:
   1. Compiled binary bytecode
   2. Incremental rendering
   3. SSR with incremental rehydration
</strong>

### Adopting `<Capital />` Components

One of the most eagerly-awaited features of Glimmer.js is "angle bracket
components," or components that you invoke `<like-this />` instead of
`{{like-this}}`. I personally really like this syntax because it visually
disambiguates components from the dynamic data that flows through them.
It also unifies the attribute syntax between HTML and components:

```handlebars
{{! Ember }}
{{my-button title=title label=(t "Do Something")}}

{{! HTML }}
<button title={{title}} label={{t "Do Something"}}></button>

{{! Glimmer.js (today) }}
<my-button @title={{title}} @label={{t "Do Something"}} />
```

This syntax is how Glimmer.js works today. However, the more we discussed the
design and started using it in real projects, the more we believed that this
exact API was flawed and needed to be rethought.

First, a short history lesson. When we introduced components in Ember (back
before Ember 1.0!), we required them to include a dash (`-`) in their name. This
rule came from the then-new [Custom Elements spec][custom-elements], a key part
of the Web Components API.

[custom-elements]: https://www.w3.org/TR/custom-elements/#custom-element-conformance

Web Components have the problem of needing to disambiguate between built-in elements
and custom elements. What happens if I make a component called `<vr></vr>` and later
the browser adds a built-in Virtual Reality element with the same name?

The compromise was that custom elements must have a dash, keeping single-word
elements reserved for future versions of the HTML standard.

Of course, Ember components don't have the same problem, because they use
`{{` and `}}` as delimeters instead of `<` and `>`. Nonetheless, we preemptively adopted
this constraint because we assumed Web Components were going to take the world
by storm and at some point we would need to migrate Ember components to Web
Components.

As time has passed, though, it's become increasingly clear that the use cases
served by Web Components, wonderful as they are, do not have the full set of
functionality to replace everything that an Ember component (or React component,
etc.) needs to do.

Meanwhile, the more components I write, the more grating the naming restriction
feels. I hate the cognitive overhead of having to invent silly names like
`{{x-button}}` when a single word would be much more descriptive.

Unfortunately, this puts us in a bit of a pickle:

1. We want to drop the annoying `dasherized-component` requirement.
2. We want to adopt `<angle>` brackets syntax for components, but now we have
   the same naming collision hazard as Web Components.
3. People want to use Web Components in their apps, so how do we know if
   `<my-button>` means "create a custom element" or "create a Glimmer
   component"?

The core team has circled around different designs for *months*, and this topic
has dominated both our weekly calls and our in-person meetings.

At the most recent face-to-face meeting in Austin, we finally reached consensus
on a proposal that I'm really excited about.

How do you disambiguate between Glimmer components and HTML elements? Our
proposal is to borrow the same rule that React uses: *components always start
with a capital letter*.

Our above example turns into this:

```handlebars
{{! new Glimmer.js }}
<Button @title={{title}} @label={{t "Do Something"}} />
```

I love this for a few different reasons.

First, to me, the capital letter makes components _really_ stand out in the
template, and we can improve syntax highlighting in editor plugins to make it
stand out even more. It also makes it clear when you're invoking a Web Component
or not, whereas the original Glimmer.js syntax was ambiguous.

Second, I hate the friction of having to invent a two-word name. The app I work
on has at least three different conventions people use to prefix or suffix
components. It feels bad and makes templates look more noisy than they should.
When we switched from dasherized to capitals, it felt viscerally like an
improvement.

Third, for better or worse, many people consider React to be an "industry
standard" and aligning component naming makes Glimmer templates feel that much
more familiar. (Although do note that we are just adopting the naming
convention, not JSX itself!)

This change also helps us solve the problem of "fragment" or "tagless"
components, i.e., templates that don't have a single root element.

While we've supported this in Ember for a long time, we were nervous about the
potential for confusion if you typed something like `<my-button />` in a
template, which looks like a Web Component, and it didn't always correlate to a single
element in the DOM.

Today in Glimmer.js, it is a compile-time error if your component template
doesn't have a single root element. With `<Capital>` components, we will remove
this restriction and allow you to have whatever you want in your template.

One side-effect of this is that we will replace `this.element` (which today is a
reference to the component's root element) with `this.bounds.firstNode` and
`this.bounds.lastNode`, allowing you to traverse the range of DOM nodes
belonging to your component.

There are still some open questions about what, if any, sugar to provide for the
single-element case.

For example, we could make `this.element` available in just those cases,
although we're concerned that someone coming along and adding an extra element
to a template could subtly break any code relying on `this.element`. Another
proposal was to set `this.element` to the element with `...attributes` on it
(see below). We're looking forward to more design and discussion about how to
make this ergonomic without being error-prone.

### Component Attributes

Without getting into a full explanation of the difference between properties and
attributes in the DOM, suffice it to say that most web developers have a muddy mental
model at best. (And rightfully so—it took me forever to understand the difference.)

While you can get pretty far pretending properties and attributes are
interchangeable, eventually you are going to run into cases where you really
have to set a property or you really have to set an attribute.

Server-side rendering (SSR) complicates the issue because, of course, HTML can
*only* serialize attributes, not properties.

One drawback of both Ember and React's components is that they don't do a great
job of making it easy for consumers of components to set attributes.

Let's take React as an example (although, again, it applies just as much to
Ember). I want to write a reusable `HiResImage` component that anyone can
install from npm and use in their apps. It wraps an `<img>` element and renders
a low-resolution image by default, swapping in a high-resolution image when
clicked.

```HiResImage.jsx
import { Component } from 'react';

export default class HiResImage extends Component {
  render(props, state) {
    let showHiRes = () => { this.setState({ hiRes: true }); }
    let { src, hiResSrc } = props;
    let { hiRes } = state;

    return <img src={hiRes ? hiResSrc : src} onClick={showHiRes}>;
  }
}
```

Now we can use the component like this:

```HiResImage.jsx
<HiResImage src="corgi.jpg" hiResSrc="corgi@2x.jpg" />
```

But what happens if I want to set the width of the underlying `img` element via
its `width` attribute?

```HiResImage.jsx
<HiResImage width="100%" src="corgi.jpg" hiResSrc="corgi@2x.jpg" />
```

This won't work because the only attributes or properties that get set are the
ones we've manually listed in our `render()` method! The `width` attribute here
will just get ignored.

We have a few options, but none of them are that great.

* We could enumerate all of the possible valid `img` attributes that might get
  passed in, but that is error-prone (new attributes get added all the time) and
  takes a lot of code.
* We could use the spread operator (`...props`), but that will set *everything*
  passed in as an attribute, even "known" props that aren't attributes, like
  `hiResSrc`.
* If we're using Babel, we can use rest syntax in object destructuring to
  separate "known" and "unknown" props: `let { src, hiResSrc, ...attrs } =
  props`. But this requires non-trivial runtime work, and means any props passed
  in by accident will now be treated as an attribute.
* In Preact, the problem is even trickier because it will always set the `width`
  property no matter what, never the attribute. And setting the `width`
  *property* to `"100%"` results in an image zero pixels wide.

With Glimmer.js, you explicitly disambiguate between properties and attributes via
the presence of the `@` sigil. In symmetry with HTML, attributes do not have `@`,
while component arguments (`props` in React parlance) do:

```template.hbs
<HiResImage @src="corgi.jpg" @hiResSrc="corgi@2x.jpg" width="100%" />
```

In this example, `src` and `hiResSrc` are JavaScript values passed as arguments
to the component object, and `width` is serialized to a string and set as an
attribute.

"But wait," you ask, "if components aren't required to have a single root
element anymore, where do attributes go?"

With recent changes in Glimmer VM, we can now support an `...attributes` syntax
that we've colloquially started calling "splattributes" (because they "splat"
attributes from the outside onto an element).

In our case, the Glimmer.js version of the `HiResImage` component might look like this:

```component.js
import Component, { tracked } from '@glimmer/component';

export default class HiResImage extends Component {
  @tracked hiRes = false;

  showHiRes() {
    this.hiRes = true;
  }
}
```

```template.hbs
{{#if hiRes}}
  <img src={{@hiResSrc}} ...attributes>
{{else}}
  <img src={{@src}} {{on click=(action showHiRes)}} ...attributes>
{{/if}}
```

Here, any attributes passed in on the invoking side will be "splatted" onto the
appropriate element.

So what happens if you try to pass attributes to a component that doesn't have
`...attributes`? At runtime, you'll get a hard error telling you that the
component should add `...attributes` to one or more elements. We can probably
produce compile-time errors in the majority of less dynamic cases, too.

### Portals

Typically, the component hierarchy maps directly to the DOM hierarchy, meaning
all of a component's elements are rendered inside a DOM element that belongs to
the parent component.

Occasionally, though, it can be helpful to break out of the current DOM tree and
render a component's content somewhere else. While there are many different use
cases, the most common one I've seen is for rendering modal dialogs.

This is easy to do now with the built-in `{{in-element}}` helper. This helper
will render the block you pass to it inside a foreign element. (In React-land,
this functionality is usually referred to as a portal, and as of React 16 is
included by default in `react-dom`.)

For example, if I had a `Modal` component and I wanted to always render its
content into a specially-styled element at the root of the body (with `position:
fixed`, say), I might write it like this:

```component.js
import Component from '@glimmer/component';

export default class Modal extends Component {
  modalElement = document.getElemenyById('modal');
}
```

```template.hbs
{{#in-element modalElement}}
  <h1>Modal</h1>
  {{yield}}
{{/in-element}}
```

Now in my app, I can invoke my `Modal` component as deep into the hierarchy as I
want, and the content will be rendered into the root modal element:

```template.hbs
{{#if hasErrors}}
  <Modal>
    <p>You dun goofed:</p>
    <ul>
      {{#each errors as |error|}}
        <li>{{error}}</li>
      {{/each}}
    </ul>
  </Modal>
{{/if}}
```

### Binary Templates

It's crucial that web apps render instantly, or else users go elsewhere. When it
comes to improving web performance, one of the most frequent recommendations
you'll hear is to minimize the amount of total JavaScript in your app.

There are two reasons for this: not only does more JavaScript take longer to
download, just _parsing_ the JavaScript can become a noticeable bottleneck on
underpowered devices.

Complicating the advice to "use less JavaScript" is the fact that most modern
JavaScript libraries, including Angular, React, Vue and Svelte, compile
component templates (or JSX) to JavaScript, which gets embedded in application
code. Without aggressive hand optimization, more templates means more
JavaScript.

Ember used to do the same thing, compiling Handlebars templates into JavaScript
code that would first create and then update a component's DOM tree.

With Glimmer, however, we took a different approach. Instead of generating
JavaScript, today we compile templates into a JSON data structure of "opcodes,"
or rendering instructions. A small runtime evaluates these opcodes, translating
them into DOM creation, DOM updates, invocation of component hooks, etc.

Not only is [a JSON parser much faster than a full-blown JavaScript
parser](https://jsperf.com/json-parse-vs-eval-corrected/1), aggressively sharing
code in the Glimmer VM generates less on-device memory pressure and allows
JavaScript engines like V8 to more quickly generate JIT-optimized code.

Best of all, our compact JSON format is significantly smaller than the
equivalent compiled JavaScript. We received many reports of apps dropping 30-50%
in total (post-gzip!) size after upgrading to Ember 2.10, the first version to
use this JSON-based approach.

As exciting as this was, we knew that JSON was not the final word in compactly
and efficiently representing compiled templates.

At runtime, the Glimmer VM today gathers the JSON for each template and compiles
them into a final, internal representation that is just a large array of 32-bit
integers. After looking at traces of real-world Glimmer.js apps, we knew we
could improve boot times by precomputing this final compilation step at build
time.

Helpfully, browsers have become increasingly fluent at dealing with binary data,
largely driven by demanding multimedia use cases like audio, video, and 3D
graphics. And while JSON is fast to parse, as the old saw goes, no parse is faster
than *no* parse. What if we could serialize compiled templates into a binary format
that the VM could start executing _without a parse step_?

I'm no M. Night Shyamalan, so you've probably already guessed the ending here:
that's exactly what we've done. Recent versions of Glimmer VM include the
`@glimmer/bundle-compiler` package, our name for the compiler that produces a
binary "bundle" of all of your compiled templates.

We are planning to land support for binary templates as an opt-in in Glimmer.js
soon. (The feature is already landed in the low-level Glimmer VM but is not yet
exposed in a convenient way.)

One thing to note about the bundle compiler is that it requires knowing your
entire program statically at build time. The browser tends to be a pretty
dynamic environment, however, so Glimmer VM still supports "lazy compilation"
(i.e. compiling to JSON) as a first-class mode.

In the Ember ecosystem, apps and addons do very dynamic things (like register
components at runtime) which are incompatible with the bundle compiler. We want
to enable binary templates in Ember, but this is farther out because we will
need to figure out exactly what the constraints are and provide guidance for
app and addon authors.

In exchange for the (admittedly pretty incredible) performance benefits, binary
templates also introduce extra complexity.

Binary templates can't be inlined in HTML or JavaScript, so they must be fetched
as early as possible in the page lifecycle. No browser I tested yet supports
`<link rel="preload" as="fetch">`, which would allow a streaming HTML parser to
detect and fetch binary data very early in the page load. No tools or CDNs know
what the heck a `.gbx` file is (the file extension of compiled binaries), and
require manual configuration. You probably want H2 Push for this, but that's
its own can of worms.

Getting these optimally deployed will probably be painful for a while, but I have
faith that the Ember community will do what it does best and rally around a set
of shared, high quality solutions for dealing with this.

If you're curious about the details of how binary templates work, don't miss
Chad's [recent post about the optimizing
compiler](https://www.linkedin.com/pulse/glimmers-optimizing-compiler-chad-hietala/).

### Server-Side Rendering

Server-side rendering, or SSR, is a technique for rendering your components on
the server. It allows you to send meaningful HTML to a user's browser so that
they see something other than an empty white rectangle before your JavaScript
finishes loading.

Ember supports SSR through [FastBoot](https://ember-fastboot.com/), and Glimmer
VM is Ember's rendering engine, so you can probably guess that Glimmer already
has support for SSR, too.

That's true, but there are two shortcomings we want to address:

1. Running Glimmer.js apps in SSR mode is not as easy as it should be.
2. Today we take a performance hit because of how we serialize to HTML.

To address the first problem, we are going to make SSR a first-class API and
document exactly how you go from writing a Glimmer.js app to connecting it to a
Node HTTP server.

Second, after looking at profiles of our app running in SSR mode, we noticed
that there is some low-hanging fruit to pick in how we generate HTML.

Glimmer is able to run in Node because, internally, we use an abstraction for building
and modifying the DOM. Instead of calling `document.createElement(tagName)` directly, for
example, an opcode might instead call `this.dom.createElement(tagName)`, going through a DOM
construction helper.

In the browser, this just proxies to `document.createElement`, but in Node, we
instead use [simple-dom](https://github.com/ember-fastboot/simple-dom), a
lightweight implementation of a small subset of the DOM API—a "virtual DOM," if
you will. Once rendering is complete, we use simple-dom's built-in serializer to convert
the DOM tree to HTML and send it over the wire.

This approach has the huge advantage of keeping the DOM mutable, just like in
the browser. Particularly with FastBoot, where we wanted existing Ember apps to
be able to adopt SSR, this was an important compatibility feature.

The downside to preserving mutability is that it introduces a performance
double-whammy.

HTML is immutable, in the sense that once I write `<div>`, there's nothing I can
write later in the file to go back and add an attribute to that element. If the
DOM is mutable, then we have to wait for the entire document to settle before we
can serialize to HTML and start writing to the HTTP socket.

This delays the time to first byte (TTFB) by at least the time it takes to
render the entire page, even though many of the components may have finished
rendering hundreds of milliseconds previously.

The other performance hit is that we now have two (often large) trees to
traverse: first we walk the tree of components in the initial render, and then
we have to walk DOM tree during HTML serialization. This is predominantly a CPU
cost, but allocating all of these temporary "virtual DOM" nodes doesn't help
memory costs, either.

Chad has been doing some experiments with implementing a version of our DOM
abstraction that writes HTML directly to a stream. This solves both of the
above-mentioned performance pitfalls nicely.

By writing directly to the stream, the host Node environment can start flushing
bytes to the browser immediately in a background thread. And by writing strings
directly to the stream buffer, we can avoid allocating intermediate data
structures entirely.

For this to work, we have to introduce two requirements:

1. Components can only render once on the server, so any data fetching needs to
   happen *before* the initial render starts.
2. Internally, we need to order opcodes to align with HTML; that is, we need to
   ensure that we always create an element and set its attributes before
   attempting to append any child nodes. (Luckily for us, it happened to work
   this way already.)

We are hoping to test this approach in a real app in the next few weeks and
report back on the results. We are tentatively optimistic that this will result
in significant performance improvements, and suspect it may outperform even the
best SSR implementations of Virtual DOM-based libraries like React and Preact
because it requires fewer allocations.

### Rehydration

Rehydration is the ability of a client-side JavaScript app to "reconnect"
components to the DOM generated by server-side rendered HTML. In many ways, a
robust rehydration implementation is the holy grail that reunites the
progressive enhancement and "all JavaScript all the time" camps.

The server can serve up meaningful HTML, viewable even when JavaScript isn't
available, and that HTML gets "progressively enhanced" with interactivity once
the JavaScript loads and components rehydrate. But because components can _also_
still produce their own DOM, you retain all of the benefits of client-side
JavaScript, including the ability to work offline.

Glimmer supports rehydration natively via its [ElementBuilder][element-builder] abstraction.
In SSR mode, you can enable the [SerializeBuilder][serialize-builder], which includes additional
comment annotations for where dynamic sections start and end.

[element-builder]: https://github.com/glimmerjs/glimmer-vm/blob/72a1483/packages/@glimmer/runtime/lib/vm/element-builder.ts
[serialize-builder]: https://github.com/glimmerjs/glimmer-vm/blob/72a1483/packages/%40glimmer/node/lib/serialize-builder.ts

For example, given this template:

```handlebars
<span class="user__name">{{@user.name}}</span>
```

The serialized output would include comments indicating the dynamic portion:

```html
<span class="user__name"><!--%+block:0%-->Chad Hietala<!--%-block:0%--></span>
```

In the browser, Glimmer is configured to use the
[RehydrateBuilder][rehydrate-builder]. The RehydrateBuilder treats the existing
DOM as a stack, and as the VM requests new elements get created, it compares the
top of the "DOM stack" to the requested element. If it matches, the element is
reused and the DOM is not mutated at all. In the case of a mismatch, the
current block is cleared and the appropriate element is created and put in
its place. The comment annotations are also stripped during this process, so you
see a pristine DOM in your developer tools.

[rehydrate-builder]: https://github.com/glimmerjs/glimmer-vm/blob/72a1483/packages/%40glimmer/runtime/lib/vm/rehydrate-builder.ts#L20

We have rehydration working in our app, and we consider it to be a first-class
part of the Glimmer SSR story.

### Incremental Rendering

The thing about low-end mobile devices is that no matter how much you optimize,
performing the initial render of most modern web applications is going to be
slow. While it's important to chase the fastest raw performance possible (and we
certainly have with Glimmer!), on some devices it's just unavoidable to have
initial renders that take 500ms to over a second.

This produces a terrible user experience because it blocks the main thread. If
the user happens to be scrolling, their scroll suddenly starts to stutter.
Videos and animated GIFs freeze, the browser stops updating the layout, and
everything generally feels "janky."

The problem is that, by dominating the main thread for so long, we're not being
good citizens of the web. The CPU is a shared resource, and we're hogging it all
for ourselves for a huge chunk of time.

But what if we had a way to render a few components at a time, periodically
giving control back to the browser so it could handle scrolling, painting, etc.?

Glimmer's architecture is actually *perfectly* suited for this, because at the
end of the day it's just executing a linear sequence of operations. We can
execute each opcode, one by one, and pause execution if it starts taking too
long.

Best of all, because normal rendering and rehydration go through nearly
identical code paths, this technique applies whether you're creating fresh DOM
or just rehydrating DOM created from server-rendered HTML.

Incremental rehydration feels *amazing*, even on low-end devices on slow
networks. The server sends complete HTML, which the browser can incrementally
parse and render, even before CSS and JavaScript have started loading. Once the
JavaScript does finish loading, it can rehydrate arbitrarily complex DOM while
maintaining 60fps scrolling, never taking more than ~16ms before returning
execution to the browser.

We're using [`requestIdleCallback`][ric] in our app to drive rehydration, which
provides a "deadline" describing how much time we have to do work before causing
user-noticeable jank. We execute opcodes until we hit the deadline, then
schedule the VM to resume in another idle callback if there are additional
operations to execute. For browsers without `requestIdleCallback`, we can fall
back to `setTimeout` and approximate deadlines.

[ric]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback

## Wrapping Up

Except where noted, everything I've described above is available in raw,
low-level form in Glimmer VM today. We will be releasing a new version of
Glimmer.js imminently that includes the updated VM, including the change to
`<Capital />` components, fragment templates, etc.

Once that's done, our next task will be to make enabling binary templates, SSR,
rehydration, etc. as easy as possible.

We are also actively working on making Glimmer components available in Ember apps
via an addon, as well as updating Ember to use the latest version of Glimmer VM.
Once that lands, it should unlock the ability to use rehydration in FastBoot.

I hope this overview has got you as excited as I am. Glimmer's VM architecture
has been the gift that keeps on giving, and I've been surprised by how
relatively easy implementing the above features has been on top of the core
architecture.

Best of all, I don't think we've yet hit the end of the possibilities that
Glimmer unlocks. In this post, I've focused on features that are either done or
close to being done, and haven't yet mentioned some of the ideas we're excited
to try, like running Glimmer in a Web Worker, porting the core VM to
WebAssembly, and more. We've also been working closely with our browser
implementer friends to see what lessons can be applied to the web platform so
everyone benefits from our experimentation.

Lastly, I'd like to thank LinkedIn and Tilde for funding a great deal of the
implementation work. Not only is all of this work released under the open source
MIT license, we do all of our work out in the open on GitHub. I invite you to
follow along on the [Glimmer VM][glimmer-vm] and [Glimmer.js][glimmer.js]
repositories.

[glimmer-vm]: https://github.com/glimmerjs/glimmer-vm
[glimmer.js]: https://github.com/glimmerjs/glimmer.js

Thank you so much for reading this far, and I can't wait to get all of this cool
stuff into your hands. We are looking forward to seeing what the community can
build with these powerful primitives. We'll post again once we've released the
next version of Glimmer.js with these features integrated, so stay tuned to the
blog. And if you've got any questions or want to help out, leave a comment below
or come see us on GitHub!