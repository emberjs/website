## Changing Scope

Sometimes you may want to invoke a section of your template with a context
different than the Ember.View. For example, instead of this:

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
context, by default, is the view's controller. By using the `{{#with}}`
helper, you can change the context of all of the Handlebars expressions
contained inside the block.
