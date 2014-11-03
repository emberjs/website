By default the Router uses the browser's hash to load the starting state of your
application and will keep it in sync as you move around. At present, this relies
on a [hashchange](http://caniuse.com/hashchange) event existing in the browser.

Given the following router, entering `/#/posts/new` will take you to the `posts.new`
route.

```javascript
App.Router.map(function() {
  this.resource('posts', function() {
    this.route('new');
  });
});
```

If you want `/posts/new` to work instead, you can tell the Router to use the browser's
[history](http://caniuse.com/history) API. 

Keep in mind that your server must serve the Ember app from all the URLs defined in your 
`Router.map` function. 

```js
App.Router.reopen({
  location: 'history'
});
```

Finally, if you don't want the browser's URL to interact with your application
at all, you can disable the location API entirely. This is useful for
testing, or when you need to manage state with your Router, but temporarily
don't want it to muck with the URL (for example when you embed your
application in a larger page).

```js
App.Router.reopen({
  location: 'none'
});
```
