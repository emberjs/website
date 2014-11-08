If you need to enumerate over a list of objects, use Handlebars' `{{#each}}` helper:

```handlebars
<ul>
  {{#each person in people}}
    <li>Hello, {{person.name}}!</li>
  {{/each}}
</ul>
```

The template inside of the `{{#each}}` block will be repeated once for
each item in the array, with the each item set to the `person` keyword.

The above example will print a list like this:

```html
<ul>
  <li>Hello, Yehuda!</li>
  <li>Hello, Tom!</li>
  <li>Hello, Trek!</li>
</ul>
```

Like everything in Handlebars, the `{{#each}}` helper is bindings-aware.
If your application adds a new item to the array, or removes an item,
the DOM will be updated without having to write any code.

The `{{#each}}` helper can have a matching `{{else}}`.
The contents of this block will render if the collection is empty:

```handlebars
{{#each person in people}}
  Hello, {{person.name}}!
{{else}}
  Sorry, nobody is here.
{{/each}}
```
