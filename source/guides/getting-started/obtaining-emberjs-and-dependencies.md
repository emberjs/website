## Obtaining Ember.js and Dependencies

The latest release candidate (RC3) of Ember.js can be downloaded directly from [the Ember.js website](http://emberjs.com/).  Ember.js has two dependencies: jQuery and Handlebars. jQuery can be downloaded from at [http://jquery.com/](http://jquery.com/) and Handlebars can be downloaded at [http://handlebarsjs.com/](http://handlebarsjs.com/). This guide uses `ember-data` for managing model data. The latest development builds of Ember data can be downloaded at [http://builds.emberjs.com/](http://builds.emberjs.com/). The build compatible [with RC3 has the SHA `e324f0e`](http://builds.emberjs.com.s3.amazonaws.com/ember-data-e324f0e582fe180bb577f648b1b7247958db21d9.js).

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
