## Conditionals

Sometimes you may only want to display part of your template if a property
exists. For example, let's say we have a view with a `person` property that
contains an object with `firstName` and `lastName` fields:

```javascript
App.SayHelloView = Ember.View.extend({
  person: Ember.Object.create({
    firstName: "Joy",
    lastName: "Clojure"
  })
});
```

In order to display part of the template only if the `person` object exists, we
can use the `{{#if}}` helper to conditionally render a block:

```handlebars
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{/if}}
```

Handlebars will not render the block if the argument passed evaluates to
`false`, `undefined`, `null` or `[]` (i.e., any "falsy" value).

If the expression evaluates to falsy, we can also display an alternate template
using `{{else}}`:

```handlebars
{{#if person}}
  Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
{{else}}
  Please log in.
{{/if}}
```

To only render a block if a value is falsy, use `{{#unless}}`:

```handlebars
{{#unless hasPaid}}
  You owe: ${{total}}
{{/unless}}
```

`{{#if}}` and `{{#unless}}` are examples of block expressions. These allow you
to invoke a helper with a portion of your template. Block expressions look like
normal expressions except that they contain a hash (#) before the helper name,
and require a closing expression.
