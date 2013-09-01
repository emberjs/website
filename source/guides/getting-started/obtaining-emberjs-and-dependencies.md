TodoMVC has a few dependecnies:
  
  * [jQuery](http://code.jquery.com/jquery-1.10.2.min.js)
  * [Handlebars](http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-1.0.0.js)
  * [Ember.js 1.0](http://builds.emberjs.com/tags/v1.0.0/ember.js)
  * [Ember Data 1.0 alpha](http://emberjs.com.s3.amazonaws.com/getting-started/ember-data.js)

For this example, all of these resources should be stored in the folder `js/libs` located in the same location as `index.html`. Update your `index.html` to load these files by placing `<script>` tags just before your closing `</body>` tag in the following order:

```html
<!-- ... additional lines truncated for brevity ... -->
  <script src="js/libs/jquery.min.js"></script>
  <script src="js/libs/handlebars.js"></script>
  <script src="js/libs/ember.js"></script>
  <script src="js/libs/ember-data.js"></script>
</body>
<!-- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that all files have been referenced correctly and no errors occur.

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/ijefig/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>
 
### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/0880d6e21b83d916a02fd17163f58686a37b5b2c)
