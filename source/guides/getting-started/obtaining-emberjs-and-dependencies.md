TodoMVC has a few dependencies:

  * [jQuery](http://code.jquery.com/jquery-1.11.2.min.js)
  * [Handlebars](http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v1.3.0.js)
  * [Ember.js](http://builds.emberjs.com/tags/v1.8.1/ember.js)
  * [Ember Data 1.0 beta](http://builds.emberjs.com/tags/v1.0.0-beta.11/ember-data.js)

For this example, all of these resources should be stored in the folder `js/libs` located in the same location as `index.html`. Update your `index.html` to load these files by placing `<script>` tags just before your closing `</body>` tag in the following order:

```html
<!-- ... additional lines truncated for brevity ... -->
  <script src="js/libs/jquery-1.11.2.min.js"></script>
  <script src="js/libs/handlebars-v1.3.0.js"></script>
  <script src="js/libs/ember.js"></script>
  <script src="js/libs/ember-data.js"></script>
</body>
<!-- ... additional lines truncated for brevity ... -->
```

Reload your web browser to ensure that all files have been referenced correctly and no errors occur.

If you are using a package manager, such as [bower](http://bower.io), make sure to checkout the [Getting Ember](/guides/getting-ember) guide for info on other ways to get Ember.js (this guide is dependant on ember-data v1.0 or greater so please be sure to use the latest beta).

### Live Preview
<a class="jsbin-embed" href="http://jsbin.com/ijefig/2/embed?live">Ember.js • TodoMVC</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Additional Resources

  * [Changes in this step in `diff` format](https://github.com/emberjs/quickstart-code-sample/commit/0880d6e21b83d916a02fd17163f58686a37b5b2c)
