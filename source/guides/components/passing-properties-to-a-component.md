By default a component does not have access to properties in the
template scope in which it is used.

For example, imagine you have a `blog-post` component that is used to
display a blog post:

```handlebars
<script type="text/x-handlebars" id="components/blog-post">
  <h1>Component: {{title}}</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</script>
```

You can see that it has a `{{title}}` Handlebars expression to print the
value of the `title` property inside the `<h1>`.

Now imagine we have the following template and route:

```js
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return {
      title: "Rails is omakase"
    };
  }
});
```

```handlebars
{{! index.handlebars }}
<h1>Template: {{title}}</h1>
{{blog-post}}
```

Running this code, you will see that the first `<h1>` (from the outer
template) displays the `title` property, but the second `<h1>` (from
inside the component) is empty.

<a class="jsbin-embed" href="http://jsbin.com/japiv/1/embed?live">JS Bin</a>

We can fix this by making the `title` property available to the
component:

```handlebars
{{blog-post title=title}}
```

This will make the `title` property in the outer template scope
available inside the component's template using the same name, `title`.

<a class="jsbin-embed" href="http://jsbin.com/japiv/2/embed?live">JS Bin</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

If, in the above example, the model's `title` property was instead
called `name`, we would change the component usage to:

```
{{blog-post title=name}}
```

<a class="jsbin-embed" href="http://jsbin.com/japiv/3/embed?live">JS Bin</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

In other words, you are binding a named property from the outer scope to
a named property in the component scope, with the syntax
`componentProperty=outerProperty`.

It is important to note that the value of these properties is bound.
Whether you change the value on the model or inside the component, the
values stay in sync. In the following example, type some text in the
text field either in the outer template or inside the component and note
how they stay in sync.


<a class="jsbin-embed" href="http://jsbin.com/fehewu/embed?live">JS Bin</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

You can also bind properties from inside an `{{#each}}` loop. This will
create a component for each item and bind it to each model in the loop.

```handlebars
{{#each post in model}}
  {{blog-post title=post.title}}
{{/each}}
```
<a class="jsbin-embed" href="http://jsbin.com/yexeyi/embed?live">JS Bin</a>
<script src="http://static.jsbin.com/js/embed.js"></script>
