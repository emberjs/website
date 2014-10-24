### Problem

You want to add analytics to your Ember application.

### Solution
Subscribe to the `didTransition` event inside your application router.

In the following examples we're using Google Analytics but it could be any other analytics product.
Add google analytic's base code to the html file that renders your ember app.

```html
<html lang="en">
<head>
  <title>My Ember Site</title>
  <script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXX-Y']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

  </script>
</head>
<body>

</body>
</html>
```

Then reopen the application router and add this function. It will be called when
`didTransition` is fired by the router.

```js
App.Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});
```

### Discussion

The `didTransition` event is responsible for notifying listeners of any URL
changes, in this example we are getting the path after the hash in the url so we
can notify Google Analytics about moving between areas of the site.


[JSBin Example](http://jsbin.com/xebevu)
