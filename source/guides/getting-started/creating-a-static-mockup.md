Before adding any code, we can roughly sketch out the layout of our application. In your text editor, create a new file and name it `index.html`. This file will contain the HTML templates of our completed application and trigger requests for the additional image, stylesheet, and JavaScript resources.

To start, add the following text to `index.html`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ember.js • TodoMVC</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <section id="todoapp">
      <header id="header">
        <h1>todos</h1>
        <input type="text" id="new-todo" placeholder="What needs to be done?" />
      </header>

      <section id="main">
        <ul id="todo-list">
          <li class="completed">
            <input type="checkbox" class="toggle">
            <label>Learn Ember.js</label><button class="destroy"></button>
          </li>
          <li>
            <input type="checkbox" class="toggle">
            <label>...</label><button class="destroy"></button>
          </li>
          <li>
            <input type="checkbox" class="toggle">
            <label>Profit!</label><button class="destroy"></button>
          </li>
        </ul>

        <input type="checkbox" id="toggle-all">
      </section>

      <footer id="footer">
        <span id="todo-count">
          <strong>2</strong> todos left
        </span>
        <ul id="filters">
          <li>
            <a href="all" class="selected">All</a>
          </li>
          <li>
            <a href="active">Active</a>
          </li>
          <li>
            <a href="completed">Completed</a>
          </li>
        </ul>

        <button id="clear-completed">
          Clear completed (1)
        </button>
      </footer>
    </section>

    <footer id="info">
      <p>Double-click to edit a todo</p>
    </footer>
  </body>
</html>
```

The associated [stylesheet](http://emberjs.com.s3.amazonaws.com/getting-started/style.css) and [background image](http://emberjs.com.s3.amazonaws.com/getting-started/bg.png) for this project should be downloaded and placed in the same directory as `index.html`

Open `index.html` in your web browser to ensure that all assets are loading correctly. You should see the TodoMVC application with three hard-coded `<li>` elements where the text of each todo will appear.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/uduyip/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script> 

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/4d91f9fa1f6be4f4675b54babd3074550095c930)
  * [TodoMVC stylesheet](http://emberjs.com.s3.amazonaws.com/getting-started/style.css)
  * [TodoMVC background image](http://emberjs.com.s3.amazonaws.com/getting-started/bg.png)
  
