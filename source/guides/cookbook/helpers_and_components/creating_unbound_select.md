# Creating an Unbound Select

### Problem

This problem comes up when you you are trying to render a big collection of records on the default `Ember.Select` view. This is because the amount of metamorph tags that are rendered too.

Another problem, very specific, is when you use the [Chosen plugin](http://harvesthq.github.io/chosen/), it fails to search the options, and that's because the metamorphs too.

### Solution

The best option is to remove the binding on all the `Ember.SelectOption` views, which are used by default for the `Ember.Select` view.

One way to achieve this, is to create two new views:

```js
Ember.UnboundOption = Ember.SelectOption.extend({
  template: Ember.Handlebars.compile('{{unbound view.label}}')
});

Ember.UnboundSelect = Ember.Select.extend({
  template: Ember.Handlebars.compile('{{each view.content itemViewClass="Ember.UnboundOption"}}')
});
```

Then, all you need to do is to use `Ember.UnboundSelect` instead of `Ember.Select`:

```handlebars
{{view Ember.UnboundSelect content=bigCollection}}
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/jefufazo/1/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>
