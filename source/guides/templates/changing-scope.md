Sometimes you may want to invoke a section of your template with a
different context.

For example, instead of repeating a long path, like in this example:

```handlebars
Welcome back, <b>{{person.firstName}} {{person.lastName}}</b>!
```

We can use the `{{#with}}` helper to clean it up:

```handlebars
{{#with person}}
  Welcome back, <b>{{firstName}} {{lastName}}</b>!
{{/with}}
```

`{{#with}}` changes the _context_ of the block you pass to it. The
context, by default, is the template's controller. By using the `{{#with}}`
helper, you can change the context of all of the Handlebars expressions
contained inside the block.

Note: it's possible to store the context within a variable for nested 
usage using the "as" keyword:

```handlebars
{{#with person as user}}
  {{#each book in books}}
    {{user.firstName}} has read {{book.name}}!
  {{/each}}
{{/with}}
```
