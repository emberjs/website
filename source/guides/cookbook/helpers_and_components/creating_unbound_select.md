# Creating an Unbound Select

### Problem

This problem comes up when you you are trying to render a big collection of records on the default `Ember.Select` view. This is because the amount of metamorph tags that are rendered too.

Another problem, very specific, is when you use the [Chosen plugin](http://harvesthq.github.io/chosen/), it fails to search the options, and that's because the metamorphs too.

### Solution

The best option is to remove the binding on all the `Ember.SelectOption` views, which are used by default for the `Ember.Select` view.

One way to achieve this, is to create two new views:

```js
Ember.UnboundOption = Ember.SelectOption.extend({
  templateName: 'unbound_option'
});

Ember.UnboundSelect = Ember.Select.extend({
  templateName: 'unbound_select'
});
```

Also you will need to create the templates for the views:

```handlebars
<script type="text/x-handlebars" data-template-name="unbound_option">
  {{unbound view.label}}
</script>

<script type="text/x-handlebars" data-template-name="unbound_select">
  {{each view.content itemViewClass="Ember.UnboundOption"}}
</script>
```

Then, all you need to do is to use `Ember.UnboundSelect` instead of `Ember.Select`:

```handlebars
{{view Ember.UnboundSelect content=bigCollection}}
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/jefufazo/2/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>

