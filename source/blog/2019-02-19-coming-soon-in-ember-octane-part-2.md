---
title: 'Coming Soon in Ember Octane - Part 2: Angle Brackets & Named Arguments'
author: Chris Garrett
tags: Recent Posts, 2019, Ember Octane, Angle Brackets, Named Arguments
alias: 'blog/2019/02/19-coming-soon-in-ember-octane-part-2-angle-brackets-and-named-arguments.html'
responsive: true
---

(This post was originally published on [www.pzuraq.com](https://www.pzuraq.com/coming-soon-in-ember-octane-part-2-angle-brackets-and-named-arguments/))

Hello again, and welcome back! This is the second part of the multipart _Coming Soon in Ember Octane_ series, where we're previewing some of the various features that are landing in Ember's upcoming Octane edition, including:

- [Native Classes (+Decorators)](https://emberjs.com/blog/2019/02/11/coming-soon-in-ember-octane-part-1.html)
- Angle Brackets & Named Arguments _← this post_
- Tracked Properties
- Modifiers
- Glimmer Components

These aren't _all_ of the new features that will be part of Octane, but they're the ones that I'm most familiar with personally, so I can give y'all the low down!

This series is aimed at existing Ember users, but if you're new to Ember or tried Ember a while ago and want to see how things are changing, I'll be providing context on the existing features as we go along. These posts won't be doing deep dives on all the edge cases of the functionality, they are moreso meant as an overview of what's coming. If you're curious about what an _edition_ is exactly, you can check out a quick break down in [the first post in the series](https://emberjs.com/blog/2019/02/11/coming-soon-in-ember-octane-part-1.html).

## Ember Templates: HTML++

One of the things that sets Ember apart from other component based frameworks is its strong focus on templates that _extend_ HTML with a declarative, LISP-like syntax. Unlike JSX, which allows direct usage of Javascript wherever you want, or other framework's templating languages like Vue or Angular that lean heavily on HTML, Ember's syntax balances a mix of expressiveness and declarativeness that keeps template code relatively simple and easy to read, but doesn't prevent you from accomplishing your goals with artificial constraints.

Ember templates draw their roots from the Handlebars templating language which used `{{doubleCurly}}` syntax to insert values into templates. For the first version of Ember, this templating language remained pretty basic. You could reference values in templates, render components, and use specialized helpers like `{{outlet}}` for routing, `{{if}}` for branching, and `{{each}}` for looping:

```handlebars
Hello, {{fullName}}!

{{#if hasTodos}}
  <ul>
    {{#each todos as |todo index|}}
      <li>
        {{todo-item-component todo=todo index=index}}
      </li>
    {{/each}}
  </ul>
{{else}}
  No todos!
{{/if}}
```

Things got more interesting as that language evolved, particularly when the ability to add _nested_ helpers was added, since this mean that helpers could be composed. Logic that previously _had_ to exist on classes in the form of computed properties could now exist in the template:

```handlebars
Hello, {{join (capitalize firstName) (capitalize lastName)}}!

{{#if (gt todos.length 0)}}
  <ul>
    {{#each todos as |todo index|}}
      <li>
        {{add index 1}}. {{todo-item-component todo=todo}}
      </li>
    {{/each}}
  </ul>
{{else}}
  No todos!
{{/if}}
```

Another major piece of functionality which was added was the ability for helpers and components to _yield_, which is similar to calling a callback with some values in Javascript:

```handlebars
<!-- todo-list.hbs -->
<ul>
  {{#each todos as |todo index|}}
    <li>
      {{yield (todo-item-component todo=todo) index}}
    </li>
  {{/each}}
</ul>
```

```handlebars
<!-- main.hbs -->
Hello, {{join (capitalize firstName) (capitalize lastName)}}!

{{#if (gt todos.length 0)}}
  {{#todo-list todos=todos as |item index|}}
    {{add index 1}}. {{item}}
  {{/todo-list}}
{{else}}
  No todos!
{{/if}}
```

Between these major improvements and many other minor improvements, Ember templates slowly became a first class language in their own right over the years. They continue to be, however, a language with a specific purpose - to write declarative HTML templates. While it would be possible to write extended business logic in templates directly, there comes a point where it's much more pain than it's worth. For instance, you can add local variables with the `{{let}}` helper, but since it requires you to yield to add the variable it quickly becomes more of a headache than it's worth, except in targeted circumstances:

```handlebars
{{#let 'Carol' as |firstName|}}
  {{#let 'Danvers' as |lastName|}}
    {{#let (join firstName lastName) as |fullName|}}
      ...
    {{/let}}
  {{/let}}
{{/let}}
```

You can see how quickly this would become a difficult to work with and reason about if you used it for all of the business logic a large app! In this way, Ember templates guide users to separate concerns when they reach a certain level of complexity, but give them enough freedom to avoid large amounts of boiler plate for small, mundane snippets of logic.

Still there were some nagging issues with this syntax:

- There's so many curlies! It can be hard to distinguish what's what between helpers and components and plain values being put into template, which makes reading template code difficult at times.
- It's so ambiguous! `{{fullname}}` probably means a variable, but it could be a component or a helper. And even if it's a variable, is it a local variable provided by a `yield`? Is it a variable on the component instance? Is it an _argument_ (a.k.a. property) provided to the component? Where are all these things coming from anyways?

Some of the ambiguity problem is going to be solved by template imports, which will allow you to directly import helpers and components for use just like you would in JavaScript code, but there are lots of other small issues in there. There are three major changes that are part of Ember Octane that address these issues:

1. Angle bracket syntax for components
2. Named argument syntax
3. Required `this` in templates

## Angle Bracket Syntax

Angle bracket syntax for components draws heavily from other templating languages. You can invoke a component by using the `CapitalCase` version of the component's name, and using angle brackets instead of curlies, like HTML. Arguments passed to the component must be prefixed with the `@` symbol, distinguishing them from HTML _attributes_ which can be applied directly like you would with standard HTML elements:

```handlebars
<!-- main.hbs -->
Hello, {{join (capitalize firstName) (capitalize lastName)}}!

{{#if (gt todos.length 0)}}
  <TodoList role="list" @todos={{todos}} as |Item index|>
    {{add index 1}}. <Item/>
  </TodoList>
{{else}}
  No todos!
{{/if}}
```

As you can see, this immediately gives the `TodoList` component some visual distinction from the rest of the template. We can tell that it's a separate type of _thing_ based on a quick glance, instead of having to think about the context we're in, and what helpers and variables exist in the template.

The ability to pass _arbitrary_ HTML attributes directly to components is also a huge time saver. This was a point of brittleness in components previously, since every new attribute required adding a new argument to the component, and binding that argument to the attribute. Another minor pain point was also addressed by this feature: single word component names are now completely allowed. `{{todo}}` was not a valid component name before, but `<Todo>` is now!

It's important to note that _positional parameters_ can't be used with angle bracket syntax. That's ok, because curly bracket syntax still exists, and most things that use positional parameters really feel more like helpers than components (e.g. `if`, `each`, etc). There are some exceptions, such as `link-to`, but these will likely be converted to a more angle bracket friendly form in time.

## Named Argument Syntax

As mentioned in the previous section, arguments that are passed to components are prefixed with the `@` symbol in Angle bracket syntax. Ember Octane leverages this in the component's templates by allowing users to directly refer to an argument using the same prefix:

```handlebars
<!-- todo-list.hbs -->
<ul>
  {{#each @todos as |todo index|}}
    <li>
      {{yield (todo-item-component todo=todo) index}}
    </li>
  {{/each}}
</ul>
```

We can immediately tell now by looking at this template that `@todos` is an argument that was passed to the component externally. This is in fact always true - there is _no way_ to modify the value referenced by `@todos` from the component class, it is the original, unmodified value. If there is some business logic that needs to happen in the class, for instance to filter the items, you can do this in a getter and refer to that instead:

```handlebars
<!-- todo-list.hbs -->
<ul>
  {{#each uncompletedTodos as |todo index|}}
    <li>
      {{yield (todo-item-component todo=todo) index}}
    </li>
  {{/each}}
</ul>
```

```js
// todo-list.js
export default class TodoList extends Component {
  @computed('todos.length')
  get uncompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }
}
```

This is a subtle change, but helps to reduce some of the ambiguity of our templates. Combined with the next change, requiring `this`, it makes a huge difference.

## Required `this` in Templates

The final major change in Octane-style templates is to require `this` when referring to the component instance and its state. This includes computed properties and normal properties:

```handlebars
<!-- main.hbs -->
Hello, {{join (capitalize this.firstName) (capitalize this.lastName)}}!

{{#if (gt this.todos.length 0)}}
  <TodoList role="list" @todos={{this.todos}} as |Item index|>
    {{add index 1}}. <Item/>
  </TodoList>
{{else}}
  No todos!
{{/if}}
```

This change is subtle, but instantly provides much more context in templates. We can now clearly tell what are _values_ provided by the component class, and what are helpers (`join`, `capitalize`, `gt`, `add`) or local variables provided in yields (`Item`, `index`). Combined with named argument syntax, it allows for almost all values in the template to have a clear point-of-origin, so users can follow them back to where they came from easily.

### Putting It All Together

Like last time, I'd like to show you a more complete example based on a real-life template, instead of having you just take my word for it based on a few small examples. This is a component from [emberobserver.com](https://emberobserver.com/), one with a fairly verbose template ([source here](https://github.com/emberobserver/client/blob/0c6058456803817673255fd91b0991d5a93916be/app/templates/components/large-search.hbs)):

```handlebars
<div class="large-search with-default-styling">
  <div class="search">
    <div class="search-wrapper">
      <input type="search"
             placeholder="Search for addons, maintainers and categories"
             autocomplete="off"
             id="search-input"
             spellcheck="false"
             value={{query}}
             oninput={{action (perform search) value="target.value"}}>
      {{#if query}}
        <button
          {{action clearSearch}}
          class="close-button test-clear-search">
          {{svg-icon "close"}}
        </button>
      {{/if}}
    </div>
    <div class="readme-toggle">
      {{input type="checkbox"
              class="test-search-readmes"
              id="search-readmes"
              checked=searchReadmes
              change=(action (perform toggleReadmeSearch))}}
      <label for="search-readmes">Search readmes</label>
    </div>
    <h6 class="no-results {{if hasSearchedAndNoResults 'showing'}}">
      No results found for "{{query}}"
    </h6>
  </div>

  {{#if results.length}}
    <h4 class="result-info test-result-info">
      Results for "{{query}}"
    </h4>
    {{#search-result-set
      results=results.displayingReadmes
      totalCount=results.totalReadmeCount
      fetchMore=fetchMoreReadmes
      title="Readmes"
      resultClass="readme-results"}}
      <ul class="readme-list">
        {{#each results.displayingReadmes as |addon|}}
          <li>
            {{addon-details addon=addon}}
            {{#each (get _results.readmeMatchMap addon.id) as |match|}}
              <div class="test-readme-match text-match">
                ...{{dom-purify match use-profiles=(hash html=true) hook='target-blank'}}...
              </div>
            {{/each}}
          </li>
        {{/each}}
      </ul>
    {{/search-result-set}}
    {{#search-result-set
      results=results.displayingCategories
      totalCount=results.totalCategoriesCount
      fetchMore=fetchMoreCategories
      title="Categories"
      resultClass="category-results"}}
      <ul>
        {{#each results.displayingCategories as |category|}}
          <li>
            {{#link-to "categories.show" category.slug}}
              <span class="bullet">&#9632;</span>
              <div>{{category.name}} ({{category.totalAddonCount}})</div>
            {{/link-to}}
          </li>
        {{/each}}
      </ul>
    {{/search-result-set}}
    {{#search-result-set
      results=results.displayingAddons
      totalCount=results.totalAddonsCount
      fetchMore=fetchMoreAddons
      title="Addons"
      resultClass="addon-results"}}
      {{addon-list addons=results.displayingAddons}}
    {{/search-result-set}}
    {{#search-result-set
      results=results.displayingMaintainers
      totalCount=results.totalMaintainersCount
      fetchMore=fetchMoreMaintainers
      title="Maintainers"
      resultClass="maintainer-results"}}
      <ul>
        {{#each results.displayingMaintainers as |maintainer|}}
          <li>
            {{#link-to "maintainers.show" maintainer.name}}
              <span class="bullet">&#9632;</span>
              <div>{{maintainer.name}}</div>
            {{/link-to}}
          </li>
        {{/each}}
      </ul>
    {{/search-result-set}}
  {{else if search.isRunning}}
    {{dot-spinner}}
  {{/if}}
</div>
```

And here is the same template rewritten with the various new features added in Octane:

```handlebars
<div class="large-search with-default-styling">
  <div class="search">
    <div class="search-wrapper">
      <input
        type="search"
        placeholder="Search for addons, maintainers and categories"
        autocomplete="off"
        id="search-input"
        spellcheck="false"
        value={{this.query}}
        oninput={{action (perform this.search) value="target.value"}}
      />
      {{#if this.query}}
        <button
          {{action this.clearSearch}}
          class="close-button test-clear-search"
        >
          {{svg-icon "close"}}
        </button>
      {{/if}}
    </div>
    <div class="readme-toggle">
      <Input
        @type="checkbox"
        @checked={{this.searchReadmes}}
        @change={{action (perform this.toggleReadmeSearch)}}

        id="search-readmes"
        class="test-search-readmes"
      />
      <label for="search-readmes">Search readmes</label>
    </div>
    <h6 class="no-results {{if this.hasSearchedAndNoResults 'showing'}}">
      No results found for "{{this.query}}"
    </h6>
  </div>

  {{#if this.results.length}}
    <h4 class="result-info test-result-info">
      Results for "{{this.query}}"
    </h4>

    <SearchResultSet
      @results={{this.results.displayingReadmes}}
      @totalCount={{this.results.totalReadmeCount}}
      @fetchMore={{this.fetchMoreReadmes}}
      @title="Readmes"
      @resultClass="readme-results"
    >
      <ul class="readme-list">
        {{#each this.results.displayingReadmes as |addon|}}
          <li>
            <AddonDetails @addon={{addon}} />

            {{#each (get this._results.readmeMatchMap addon.id) as |match|}}
              <div class="test-readme-match text-match">
                ...{{dom-purify match use-profiles=(hash html=true) hook='target-blank'}}...
              </div>
            {{/each}}
          </li>
        {{/each}}
      </ul>
    </SearchResultSet>

    <SearchResultSet
      @title="Categories"
      @results={{this.results.displayingCategories}}
      @totalCount={{this.results.totalCategoriesCount}}
      @fetchMore={{this.fetchMoreCategories}}
      @resultClass="category-results"
    >
      <ul>
        {{#each this.results.displayingCategories as |category|}}
          <li>
            {{#link-to "categories.show" category.slug}}
              <span class="bullet">&#9632;</span>
              <div>{{category.name}} ({{category.totalAddonCount}})</div>
            {{/link-to}}
          </li>
        {{/each}}
      </ul>
    </SearchResultSet>

    <SearchResultSet
      @title="Addons"
      @results={{this.results.displayingAddons}}
      @totalCount={{this.results.totalAddonsCount}}
      @fetchMore={{this.fetchMoreAddons}}
      @resultClass="addon-results"
    >
      <AddonList @addons={{this.results.displayingAddons}} />
    </SearchResultSet>

    <SearchResultSet
      @title="Maintainers"
      @results={{this.results.displayingMaintainers}}
      @totalCount={{this.results.totalMaintainersCount}}
      @fetchMore={{this.fetchMoreMaintainers}}
      @resultClass="maintainer-results"
    >
      <ul>
        {{#each this.results.displayingMaintainers as |maintainer|}}
          <li>
            {{#link-to "maintainers.show" maintainer.name}}
              <span class="bullet">&#9632;</span>
              <div>{{maintainer.name}}</div>
            {{/link-to}}
          </li>
        {{/each}}
      </ul>
    </SearchResultSet>
  {{else if this.search.isRunning}}
    <DotSpinner/>
  {{/if}}
</div>
```

In my opinion, this is much easier to skim through and get a general sense of quickly, with clear visual markers for the major different elements (components, helpers, plain HTML, and inserted values). Importantly, the core essence of Handlebars' declarative templating has not been lost - this still reads like HTML, and where there is dynamism it is a declarative sort of dynamism. We _aren't_ reading Javascript, we're reading LISP-y templates!

## Available Now

The title of this post is actually inaccurate - all of these features have already landed in Ember, and have been usable for some time! You can try them out now, and they're fully backwards compatible with older features and components.

The nature of Editions is that some of the new features land sooner rather than later, and we just haven't really had a chance to polish up the guides and the DX for learning all of them. Octane gives us a focal point that allows us to sum everything up, and update all of our learning materials and guides, but if you're interested in early adoption things have been landing in master for some time now!

## Conclusion

That's all I have for today! I'm sure you're eager to try out `<AngleBrackets>` in your app/addon now that you've seen it, so I'll wrap this up quick 😄 Next week I'll be posting about Tracked Properties, which are a major update to the way Ember tracks state changes, so be sure to come back then!
