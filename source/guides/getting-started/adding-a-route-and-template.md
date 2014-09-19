Next, we will create an Ember.js application, a route ('`/`'), and convert our static mockup into a Handlebars template.

Inside your `js` directory, add a file for the application at `js/application.js` and a file for the router at `js/router.js`. You may place these files anywhere you like (even just putting all code into the same file), but this guide will assume you have separated them into their own files and named them as indicated.

Inside `js/application.js` add the following code:

```javascript
window.Todos = Ember.Application.create();
```

This will create a new instance of `Ember.Application` and make it available as a variable named `Todos` within your browser's JavaScript environment.

Inside `js/router.js` add the following code:

```javascript
Todos.Router.map(function() {
  this.resource('todos', { path: '/' });
});
```

This will tell Ember.js to detect when the application's URL matches `'/'` and to render the `todos` template.

Next, update your `index.html` to wrap the inner contents of `<body>` in a Handlebars script tag and include `js/application.js` and `js/router.js` after Ember.js and other javascript dependencies:

```html
<!-- ... additional lines truncated for brevity ... -->
<body>
  <script type="text/x-handlebars" data-template-name="todos">

    <section id="todoapp">
      {{! ... additional lines truncated for brevity ... }}
    </section>

    <footer id="info">
      <p>Double-click to edit a todo</p>
    </footer>

  </script>

  <!-- ... Ember.js and other javascript dependencies ... -->
  <script src="js/application.js"></script>
  <script src="js/router.js"></script>
</body>
<!-- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that all files have been referenced correctly and no errors occur.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/OKEMIJi/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/8775d1bf4c05eb82adf178be4429e5b868ac145b)
  * [Handlebars Guide](/guides/templates/handlebars-basics)
  * [Ember.Application Guide](/guides/application)
  * [Ember.Application API Documentation](/api/classes/Ember.Application.html)
