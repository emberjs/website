Now we'll add fixture data. Fixtures are a way to put sample data into an application before connecting the application to long-term persistence.

First, update `js/application.js` to indicate that your application's `ApplicationAdapter`
is an extension of the `DS.FixtureAdapter`. Adapters are responsible for communicating with a source of data for your application. Typically this will be a web service API, but in this case we are using an adapter designed to load fixture data:

```javascript
window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
```


Next, update the file at `js/models/todo.js` to include the following fixture data:

```javascript
// ... additional lines truncated for brevity ...
Todos.Todo.FIXTURES = [
 {
   id: 1,
   title: 'Learn Ember.js',
   isCompleted: true
 },
 {
   id: 2,
   title: '...',
   isCompleted: false
 },
 {
   id: 3,
   title: 'Profit!',
   isCompleted: false
 }
];
```

Reload your web browser to ensure that all files have been referenced correctly and no errors occur.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/Ovuw/1/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/a586fc9de92cad626ea816e9bb29445525678098)
