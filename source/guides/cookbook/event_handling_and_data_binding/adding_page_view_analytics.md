### Problem

You want page view analytics for your Ember site.

### Solution

Reopen the router and overwrite the `didTransition` method call the analytics api inside the next Ember run loop.

```js
Ember.Router.reopen({
  didTransition: function(paths){
    this._super(paths);
    Ember.run.next(function(){
      path = window.location.pathname;
      _gaq.push(['_trackPageview', path]);
    });
  }
});
```

### Discussion

In this example we are hooking up Google Analytics but it could be Mixpanel, Kissmetrics or anyother analytic product.

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

Then reopen the router and over write the `didTransition` function. First we need to call super `this._super(paths)` to keep the exisiting behavor. Next we need to make a call to google's analytic API in the next Ember run loop `Ember.run.next()` passing along the windows location pathname.

```js
Ember.Router.reopen({
  didTransition: function(paths){
    this._super(paths);
    Ember.run.next(function(){
      path = window.location.pathname;
      _gaq.push(['_trackPageview', path]);
    });
  }
});
```

#### Example
Note: We are using `console.log` to simulate the data that would be sent to the analytic API. Since we are using jsbin which is inside an iframe, calling `window.location.pathname` dosen't give us the desired result so we are using a private method to show the page transitions path. 

<a class="jsbin-embed" href="http://emberjs.jsbin.com/UXaLERi/1/edit?js,console,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>