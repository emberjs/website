### Problem

The page scroller keeps in the same position when you go from one page to another. For instance, if you scroll down a long list of displayed elements on a page and then you navigate to another page with another long list of elements, you should be able to notice that scroll position is not being reset.

### Solution

Reopen the `Ember.Route` object and override the `enter`method:

```js
Ember.Route.reopen({
  enter: function() {
    this._super();
    window.scrollTo(0,0);
  }
});
```

#### Example

<a class="jsbin-embed" href="http://emberjs.jsbin.com/IxERoxoy/1/embed?html,css,js,output">Ember Starter Kit</a><script src="http://static.jsbin.com/js/embed.js"></script>