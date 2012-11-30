## Displaying a List of Items

If you need to enumerate over a list of objects, use Handlebar's `{{#each}}` helper:

```javascript
App.PeopleView = Ember.View.extend({
  people: [ { name: 'Yehuda' },
            { name: 'Tom' } ]
});
```

```handlebars
<ul>
  {{#each view.people}}
    <li>Hello, {{name}}!</li>
  {{/each}}
</ul>
```

This will print a list like this:

```html
<ul>
  <li>Hello, Yehuda!</li>
  <li>Hello, Tom!</li>
</ul>
```

If you want to create a view for every item in a list, just set it up as
follows:

```handlebars
{{#each App.peopleController}}
  {{#view App.PersonView}}
    {{firstName}} {{lastName}}
  {{/view}}
{{/each}}
```
