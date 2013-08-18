Ember.js uses the [Handlebars templating library](http://www.handlebarsjs.com)
to power your app's user interface. Handlebars templates are just like
regular HTML, but also give you the ability to embed expressions that
change what is displayed.

We take Handlebars and extend it with many powerful features. It may
help to think of your Handlebars templates as an HTML-like DSL for
describing the user interface of your app. And, once you've told
Ember.js to render a given template on the screen, you don't need to
write any additional code to make sure it keeps up-to-date.

If you'd prefer an indentation-based alternative to Handlebars syntax, 
try [Emblem.js](http://www.emblemjs.com), but make sure you're comfortable
with Handlebars first!

### Defining Templates

If you're not using build tools, you can define your application's main
template inside your HTML by putting it inside a `<script>` tag, like so:

```html
<html>
  <body>
    <script type="text/x-handlebars">
      Hello, <strong>{{firstName}} {{lastName}}</strong>!
    </script>
  </body>
</html>
```

This template will be compiled automatically and become your
[application template](/guides/templates/the-application-template),
which will be displayed on the page when your app loads.

You can also define templates by name that can be used later. For
example, you may want to define a reusable control that is used in many
different places in your user interface. To tell Ember.js to save the
template for later, instead of displaying it immediately, you can add
the `data-template-name` attribute:

```html
<html>
  <head>
    <script type="text/x-handlebars" data-template-name="say-hello">
      <div class="my-cool-control">{{name}}</div>
    </script>
  </head>
</html>
```

If you are using build tools to manage your application's assets, most
will know how to precompile Handlebars templates and make them available
to Ember.js.

### Handlebars Expressions

Each template has an associated _controller_: this is where the template 
finds the properties that it displays.

You can display a property from your controller by wrapping the property
name in curly braces, like this:

```handlebars
Hello, <strong>{{firstName}} {{lastName}}</strong>!
```

This would look up the `firstName` and `lastName` properties from the
controller, insert them into the HTML described in the template, then
put them into the DOM.

By default, your top-most application template is bound to your `ApplicationController`:

```javascript
App.ApplicationController = Ember.Controller.extend({
  firstName: "Trek",
  lastName: "Glowacki"
});
```

The above template and controller would combine to display the following
rendered HTML:

```html
Hello, <strong>Trek Glowacki</strong>!
```

These expressions (and the other Handlebars features you will learn
about next) are _bindings aware_. That means that if the values used
by your templates ever change, your HTML will be updated automatically.

As your application grows in size, it will have many templates, each
bound to different controllers.
