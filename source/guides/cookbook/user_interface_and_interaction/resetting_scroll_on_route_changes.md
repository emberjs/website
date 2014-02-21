### Problem

The page scroller keeps in the same position when you go from one page to another. For instance, if you scroll down a long list of displayed elements on a page and then you navigate to another page with another long list of elements, you should be able to notice that scroll position is not being reset.

### Solution

Add the following mixin to the affected Routes:

```js
App.ResetScroll = Ember.Mixin.create({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  }
});
```

Only if you need do something on the `activate` method you must call `this._super()` at the beginning:

```js
App.IndexRoute = Ember.Route.extend(App.ResetScroll, {
  //I need to do other things with activate
  activate: function() {
    this._super.apply(this, arguments); // Call super at the beginning
    // Your stuff
  }
});
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/kixowati/1/embed?html,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>
