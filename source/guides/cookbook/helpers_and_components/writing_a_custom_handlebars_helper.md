### Problem
You have portions of your views layer that use the same or similar HTML in many places.

### Solution
Write a custom Handlebars helper that can be called from any template and gets updated when the model changes.

### Discussion

```html
<script type="text/x-handlebars">
   $ {{dollar model}}
</script>
```

```js
App = Ember.Application.create();

App.ApplicationRoute = Em.Route.extend({
  model: function() {
    return 980; // cents
  }
});

Ember.Handlebars.registerBoundHelper('dollar', function(cents) {
  var dollar = Math.floor(cents / 100);

  return dollar;
});
```

<a href="http://jsbin.com/IJIKIdi/embed?js,output">JS Bin</a>