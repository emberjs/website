## Displaying a List of Items

If you need to enumerate over a list of objects, use Handlebar's `{{#each}}` helper:

```handlebars
<ul>
  {{#each people}}
    <li>Hello, {{name}}!</li>
  {{/each}}
</ul>
```

The template inside of the `{{#each}}` block will be repeated once for
each item in the array, with the context of the template set to the
current item.

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

There is an alternative form of `{{#each}}` that does not change the
scope of its inner template. This is useful for cases where you need to
access a property from the outer scope within the loop.

```handlebars
{{name}}'s Friends

<ul>
  {{#each friend in friends}}
    <li>{{name}}'s friend {{friend.name}}</li>
  {{/each}}
<ul>
```

This would print a list like this:

```html
Trek's Friends

<ul>
  <li>Trek's friend Yehuda</li>
  <li>Trek's friend Tom!</li>
</ul>
```

The `{{#each}}` helper can have a matching `{{else}}`.
The contents of this block will render if the collection is empty:

```handlebars
{{#each people}}
  Hello, {{name}}!
{{else}}
  Sorry, nobody is here.
{{/each}}  
```
